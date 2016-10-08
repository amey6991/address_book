function ActivityDashboard (iStaffID) {
	var self = this;

	this.iStaffID = iStaffID;

	var sViewCookie = readCookie("cookie"+iStaffID+"sView") ? readCookie("cookie"+iStaffID+"sView") : "day";
	var bLockApplied = readCookie("cookie"+iStaffID+"LockApplied") == 1;
	var aShowActivityItemTypes = readCookie("cookie"+iStaffID+"aShowActivityItemTypes") ? JSON.parse(readCookie("cookie"+iStaffID+"aShowActivityItemTypes")) : [1,3,4,5,6];
	var iFilterPatientID = readCookie("cookie"+iStaffID+"iFilterPatientID") > 0 ? readCookie("cookie"+iStaffID+"iFilterPatientID") : null;
	var bHideCompleted = readCookie("cookie"+iStaffID+"bHideCompleted") == 1;

	this.sView = ko.observable(sViewCookie);
	this.loadingItems = ko.observable(true);
	this.bLockApplied = ko.observable(bLockApplied);
	this.bHideCompleted = ko.observable(bHideCompleted);
	this.bEnableTaskItems = bEnableTaskItems;

	// Dates
	this.dDate = ko.observable(moment().format("DD-MM-YYYY"));
	this.dStartDate = ko.observable(moment());
	this.dEndDate = ko.observable(moment());
	this.iLastFetchTimestamp = null;
	this.sDateDisplayFormat = "Do MMM, YYYY";

	this.dMomentDate = ko.pureComputed(function() {
	    return moment(self.dDate(), "DD-MM-YYYY");
	}, this.dDate);

	this.dateRangeTitle = ko.pureComputed(function() {
		if(this.sView() == "day"){
			return this.dMomentDate().format(this.sDateDisplayFormat);
		}

		if(this.sView() == "week"){
			var dDate = moment(self.dDate(),"DD-MM-YYYY");

			return dDate.day(0).format(this.sDateDisplayFormat)+" to "+dDate.day(6).format(this.sDateDisplayFormat);
		}
	}, this);

	this.setStartDate = function (dDate) {
		var date = moment(),
			view = this.sView();

		if(view == "day"){
			date = moment(dDate, "DD-MM-YYYY");
		}

		if(view == "week"){
			date = moment(dDate, "DD-MM-YYYY").day(0);
		}

		this.dStartDate(date);
	}

	this.setEndDate = function (dDate) {
		var date = moment(),
			view = this.sView();

		if(view == "day"){
			date = moment(dDate, "DD-MM-YYYY");
		}

		if(view == "week"){
			date = moment(dDate, "DD-MM-YYYY").day(6);
		}

		this.dEndDate(date);
	}

	this.aUnsortedActivityBoardItems = ko.observableArray([]);
	this.aTasks = ko.observableArray([]);
	
	this.iPendingTasks = ko.pureComputed(function(){
		return $.grep(self.aTasks(), function(oItem){
			return oItem.bCompleted == false;
		}).length;
	},this);

	this.iCompletedTasks = ko.pureComputed(function(){
		return $.grep(self.aTasks(), function(oItem){
			return oItem.bCompleted;
		}).length;
	},this);
	
	// Filters
	this.aShowActivityItemTypes  = ko.observableArray(aShowActivityItemTypes);
	this.iFilterPatientID = ko.observable(iFilterPatientID);

	this.getTaskWidgetActivityDashboardItem = function (aTasks){
		var oTask = new ActivityDashboardItem();

		oTask.iTypeID = 7;
		oTask.iPatientID = 0;
		oTask.aTasks = [];
		oTask.oMetaData = {};

		$.each(aTasks, function(index, oItemTask) {
			if(index == 0){
				oTask.tActivityTime = oItemTask.tActivityTime;
				oTask.dStartDateTime = oItemTask.dStartDateTime;
			} else if(index == aTasks.length - 1){
				oTask.dEndDateTime = oItemTask.dEndDateTime;
				oTask.dtAddedOn = oItemTask.dtAddedOn;
			}

			if(!oItemTask.bCompleted){
				oTask.bCompleted = false;
			}

			oTask.aTasks.push(oItemTask.oMetaData.oTask);
		});

		return oTask;
	}

	this.aActivityBoardItems = ko.pureComputed(function () {
		var items = this.aUnsortedActivityBoardItems(),
			aShowActivityItemTypes = self.aShowActivityItemTypes(),
			iFilterPatientID = self.iFilterPatientID();

		items = $.grep(items, function(oItem){
			var bHideCompleted = self.bHideCompleted();

			if(bHideCompleted && oItem.bCompleted){
				return false;
			}

			if(aShowActivityItemTypes.indexOf(oItem.iTypeID) == -1){
				return false;
			}

			if(iFilterPatientID > 0 && iFilterPatientID != oItem.iPatientID){
				return false;
			}

			// Hidding Canceled Action plan
			if(oItem.iTypeID == 3 && oItem.bCompleted){
				return false;
			}

			return true
		});

		// Adding Tasks in one
		var aTasks = $.grep(items, function(oItem) {
			return oItem.iTypeID == 6;
		});

		this.aTasks(aTasks);

		items = $.grep(items, function(oItem){
			// Hidding Canceled Action plan
			if(oItem.iTypeID == 6){
				return false;
			}

			return true
		});

		// Moving Action plan on top
		var aActionPlanItems = [], aOtherItems = [];

		$.each(items, function(index, oItem) {
			if(oItem.iTypeID == 3){
				aActionPlanItems.push(oItem);
			} else {
				aOtherItems.push(oItem);
			}
		});

		// Sort other items by time
		aOtherItems = ko.observableArray(aOtherItems).sort(this.sortActivityItemsByDatetimeAndType)();
		
		// Brining Action plan at top
		return aActionPlanItems.concat(aOtherItems);
	}, this);

	this.aActivityBoardItemsCount = ko.observableArray([]);

	this.aActivityBoardItems.subscribe(function () {
		this.rerenderMasonryGrid();
	}, this);

	this.aUnsortedActivityBoardItems.subscribe(function () {
		// Get Count of Completed and Pending Items
		var aItems = self.aActivityBoardItems(),
			aItemTypeCounts = [];

		$.each(this.aActivityBoardItemTypes, function(index, oItemType) {
			var iTypeID = oItemType['iTypeID'];

			aItemTypeCounts[iTypeID] = {'iTypeID': iTypeID,'iCompleted': 0,'iTotal': 0};
		});

		$.each(aItems, function(index, oItem) {
			var iTypeID = oItem['iTypeID'];

			if(oItem.bCompleted){
				aItemTypeCounts[iTypeID]['iCompleted'] += 1;
			}

			aItemTypeCounts[iTypeID]['iTotal'] += 1;
		});

		this.aActivityBoardItemsCount(aItemTypeCounts);
	}, this);

	// Week View
	this.aActivityBoardWeekColumns = ko.pureComputed(function() {
		return self.getActivityBoardWeekColumns();
	}, this);

	this.getActivityItems = function (iStaffID, dLastFetchTimestamp) {
		this.loadingItems(true);
		var bAddItem = dLastFetchTimestamp != undefined
			aExistingItems = bAddItem ? this.aUnsortedActivityBoardItems() : [],
			sView = self.sView();

		if(sView == "day"){
			var data = {
				dStartDate: moment(this.dDate(),"DD-MM-YYYY").format("DD-MM-YYYY"),
				dEndDate: moment(this.dDate(),"DD-MM-YYYY").format("DD-MM-YYYY"),
			};
		} else {
			var data = {
				dStartDate: moment(this.dDate(), "DD-MM-YYYY").day(0).format("DD-MM-YYYY"),
				dEndDate: moment(this.dDate(), "DD-MM-YYYY").day(6).format("DD-MM-YYYY"),
			};
		}

		if(bAddItem){
			data['dLastFetchTimestamp'] = dLastFetchTimestamp;
		}

		var d = new Date;
		self.iLastFetchTimestamp = d.getTime()/1000;

		$.get('apiv2/activityBoardItem/'+this.iStaffID, data, function(data) {
			var items = [];
			
			$.each(data, function(index, oItem) {
				items.push(new ActivityDashboardItem(oItem));
			});

			self.aUnsortedActivityBoardItems(aExistingItems.concat(items));

			self.loadingItems(false);
		});
	}

	this.activityCardRendered = function () {
		// If Week view then Adjust height of Activity Column
		if(self.sView() == "week"){
			var $columns = $(".classWeekActivityColumn"),
				max = 0;

			$columns.height("auto");

			$columns.each(function(index, el) {
				var height = $(el).height();

				if(height > max){
					max = height;
				}
			});

			$columns.height(max);
		}
	}

	this.sortActivityItemsByDatetimeAndType = function (item1, item2) {
		var item1Date = moment(item1.dStartDateTime),
			item2Date = moment(item2.dStartDateTime);

		if(item1.iTypeID == 3){
			return -1;
		}

		if(item2.iTypeID == 3){
			return -1;
		}

		if(item1Date > item2Date){
			return 1;
		} else if(item1Date < item2Date){
			return -1;
		} else {
			return 0;
		}
	}

	this.viewRenderedCallback = function () {
		var bodyHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
			narbarHeight = $(".navbar-custom").outerHeight(true),
			activityDashboardHeader = $(".classActivityDashboardHeader").outerHeight(true),
			columnHeaderContainerHeight = $(".classWeekActivityColumnHeaderContainer").outerHeight(true),
			sView = self.sView(),
			scrollbarPosition = sView == "day" ? "inside":"outside",
			iFilterContainerHeight = $(".classActivityFilterContainer").outerHeight(true),
			iActivityFilterSeperator = $(".classActivityFilterSeperator").outerHeight(true),
			iMedixcelFooterHeight = $(".classMedixcelFooter").outerHeight(true);

		$(".classWeekActivityColumnContainer").mCustomScrollbar({
			setHeight: (bodyHeight -iMedixcelFooterHeight - narbarHeight - activityDashboardHeader - iFilterContainerHeight - columnHeaderContainerHeight -iActivityFilterSeperator - 10),
			scrollInertia: 300,
			theme: "dark-thin",
			scrollbarPosition: scrollbarPosition
		});

		if(sView == "day"){
			self.initializeDayViewGrid();
		}
	}

	this.markNotificationAsRead = function (oActivityBoardItem) {
		if(oActivityBoardItem.iTypeID == 2){
			jQuery.post('ajaxEhr.php', {
				sFlag: 'changeNotificationStatus',
				status: 1,
				receiver_user_id: oActivityBoardItem.oMetaData.iReceiverUserID,
				notification_id: oActivityBoardItem.oMetaData.iNotificationID,
				selected_category: 0,
				user_type_id: 0,
				is_wellness_provider: 0,
			}, function(data) {
				if(data['result'] == 1){
					// Removing Notification once marked as read
					var index = self.aActivityBoardItems().indexOf(oActivityBoardItem);
					if(index >= 0){
						self.aActivityBoardItems.splice(index,1);
					}
				}
			});
		}
	}

	this.taskCompleted = function  (oTaskItem) {
		$.ajax({
			url: 'apiv2/task/'+oTaskItem.oMetaData.oTask.iTaskID+"/complete",
			type: 'POST',
			data: {
				iCompleted: 1,
				iCompletedBy: self.iStaffID
			}
		})
		.done(function(oTask) {
			if(oTask.bCompleted){
				var index = self.aTasks().indexOf(oTaskItem);
				if(index >= 0){
					self.aTasks.splice(index,1);
				}
			}
		});
	}

	this.taskCompletedByWidget = function  (oCompletedTask) {
		var iCompletedTaskID = oCompletedTask.iTaskID;

		$.ajax({
			url: 'apiv2/task/'+iCompletedTaskID+"/complete",
			type: 'POST',
			data: {
				iCompleted: 1,
				iCompletedBy: self.iStaffID
			}
		})
		.done(function(oTask) {
			if(oTask.bCompleted){
				var aUnsortedActivityBoardItems = self.aUnsortedActivityBoardItems();

				$.each(aUnsortedActivityBoardItems, function(index, aItem) {
					if(aItem && aItem.iTypeID == 6 && aItem.oMetaData.oTask.iTaskID == iCompletedTaskID){
						self.aUnsortedActivityBoardItems.splice(index,1);
					}
				});
			}
		});
	}

	this.oModalActionPlan = ko.observable({});

	this.viewActionPlan = function(iActionPlanID){
		$.ajax({
			url: 'apiv2/action-plans/'+iActionPlanID,
		})
		.done(function(oActionPlan) {
			oActionPlan.dStartDate = moment(oActionPlan.dStartDate).format("DD-MM-YYYY");
			oActionPlan.dTargetDate = moment(oActionPlan.dTargetDate).format("DD-MM-YYYY");

			self.oModalActionPlan(oActionPlan);

			$('#idActionPlanModal').modal('show');
		});
		
	}

	this.rerenderMasonryGrid = function () {
		if(document.getElementById("idDayView")){
			ko.cleanNode(document.getElementById("idDayView"));
			ko.applyBindings(oActivityDashboard, document.getElementById("idDayView"));
			self.initializeDayViewGrid();
		}
	}

	this.initializeDayViewGrid = function () {
		var selector = "#idDayActivityItemContainer";
			$grid = $(selector);

		if($grid.data("salvattoreGridAttached") != true){
			$grid.data('salvattoreGridAttached', true);
			salvattore.registerGrid(document.getElementById("idDayActivityItemContainer"));
		}
	}

	this.refresh = function () {
		var dLastTimeStamp = null,
			aItems = self.aActivityBoardItems();

		// Get last added on time
		if(aItems.length){
			oItem = aItems[aItems.length-1];
			dLastTimeStamp = oItem.dtAddedOn;
		}

		this.getActivityItems(this.iStaffID, self.iLastFetchTimestamp);
	}

	this.lockFilter = function () {
		var sView = self.sView(),
			iStaffID = self.iStaffID;

		createCookie("cookie"+iStaffID+"sView", sView);
		createCookie("cookie"+iStaffID+"LockApplied", 1);
		createCookie("cookie"+iStaffID+"aShowActivityItemTypes", JSON.stringify(self.aShowActivityItemTypes()));
		createCookie("cookie"+iStaffID+"iFilterPatientID", self.iFilterPatientID());
		console.log(self.bHideCompleted() == true ? 1 : 0);
		createCookie("cookie"+iStaffID+"bHideCompleted", self.bHideCompleted() == true ? 1 : 0);

		this.bLockApplied(true);
	}

	this.unlockFilter = function () {
		eraseCookie("cookie"+iStaffID+"sView");
		eraseCookie("cookie"+iStaffID+"LockApplied");
		eraseCookie("cookie"+iStaffID+"aShowActivityItemTypes");
		eraseCookie("cookie"+iStaffID+"iFilterPatientID");
		eraseCookie("cookie"+iStaffID+"bHideCompleted");

		this.bLockApplied(false);
	}

	this.dDate.subscribe(function(newValue) {
		self.setStartDate(self.dDate());
		self.setEndDate(self.dDate());

		self.getActivityItems(this.iStaffID);
	});

	this.sView.subscribe(function(newValue) {
		self.setStartDate(self.dDate());
		self.setEndDate(self.dDate());

		self.getActivityItems(this.iStaffID);
		
		if(newValue == "day"){
			self.rerenderMasonryGrid();
		}
	});

	this.getActivityBoardWeekColumns = function () {
		var rows = [], aItems = this.aActivityBoardItems(), days = [0,1,2,3,4,5,6];

		$.each(days, function(index, day) {
			var weekDate = self.dStartDate().weekday(day).format(self.sDateDisplayFormat);
			var data = {'date':weekDate, 'day': day, 'items': []};

			$.each(aItems, function(index, aItem) {
				var itemDate = moment(aItem.dStartDateTime).format(self.sDateDisplayFormat);
				
				if(itemDate == weekDate){
					data['items'].push(aItem);
				}
			});

			rows.push(data);
		});

	    return rows;
	}

	if(this.bEnableTaskItems == 1){
		this.aActivityBoardItemTypes = [
			{'iTypeID': 1, 'sName':'Appointment', 'sCardClassName':"card-blue"},
			{'iTypeID': 2, 'sName':'Notification', 'sCardClassName':"card-red"},
			{'iTypeID': 3, 'sName':'Action Plan', 'sCardClassName':"card-yellow"},
			{'iTypeID': 4, 'sName':'Recommendation', 'sCardClassName':"card-green"},
			{'iTypeID': 5, 'sName':'Follow Up', 'sCardClassName':"card-red"},
			{'iTypeID': 6, 'sName':'Task', 'sCardClassName':"card-orange"},
			{'iTypeID': 7, 'sName':'Tasks', 'sCardClassName':"card-orange"}
		];
	} else {
		this.aActivityBoardItemTypes = [
			{'iTypeID': 1, 'sName':'Appointment', 'sCardClassName':"card-blue"},
			{'iTypeID': 2, 'sName':'Notification', 'sCardClassName':"card-red"},
			{'iTypeID': 3, 'sName':'Action Plan', 'sCardClassName':"card-yellow"},
			{'iTypeID': 4, 'sName':'Recommendation', 'sCardClassName':"card-green"},
			{'iTypeID': 5, 'sName':'Follow Up', 'sCardClassName':"card-red"}
		];
	}

	$(".classActivityFilterContainer > .hidden").removeClass('hidden');

	this.getActivityItems(this.iStaffID);
}

function ActivityDashboardItem(oItem) {
	if(oItem){
		this.iTypeID = oItem.iTypeID;
		this.dStartDateTime = oItem.dStartDateTime;
		this.dEndDateTime = oItem.dEndDateTime;
		this.dtAddedOn = oItem.dtAddedOn;
		this.iPatientID = oItem.iPatientID;
		this.bCompleted = oItem.bCompleted;

		this.tActivityTime = moment(oItem.dStartDateTime).format("h:mm A");

		this.oMetaData = oItem.oMetaData;
	} else {
		this.iTypeID = 0;
		this.dStartDateTime = moment();
		this.dEndDateTime = moment();
		this.iPatientID = 0;
		this.bCompleted = true;

		this.tActivityTime = moment().format("h:mm A");

		this.oMetaData = {};
	}

	this.sActivityItemDueDate = "";

	if(this.iTypeID == 3 && this.dEndDateTime){
		var dToday = moment(),
			dDate = moment(this.dEndDateTime);

		if(dToday.format("DD-MM-YYYY") == dDate.format("DD-MM-YYYY")){
			this.sActivityItemDueDate = "Due Today";
		} else if(dToday.add(1, 'days').format("DD-MM-YYYY") == dDate.add(1, 'days').format("DD-MM-YYYY")) {
			this.sActivityItemDueDate = "Due Tomorrow";
		} else if(dToday.format("YYYY") == dDate.format("YYYY")){
			this.sActivityItemDueDate = "Due on "+dDate.format("Do MMM");
		} else {
			this.sActivityItemDueDate = "Due on "+dDate.format("Do MMM, YYYY");
		}
	}

}

ko.bindingHandlers.iCheckCheckbox = {
	init: function (element, valueAccessor, allBindings) {
		var aShowActivityItemTypes = allBindings.get('aShowActivityItemTypes'),
			value = valueAccessor();

		$(element).prop( "checked", aShowActivityItemTypes().indexOf(value) > -1 );

        $(element).iCheck({ 
        	checkboxClass: 'icheckbox_square-grey',
			radioClass: 'iradio_square-grey'
        });

        $(element).on('ifChanged', function () {
        	var iIndex = aShowActivityItemTypes().indexOf(value);

        	if($(this).is(":checked")){
        		if(iIndex == -1){
        			aShowActivityItemTypes.push(value);
        		}
        	} else {
        		if(iIndex > -1){
        			aShowActivityItemTypes.splice(iIndex, 1);
        		}
        	}
        });
    }
}; 

ko.bindingHandlers.iTaskCompletionCheckbox = {
	init: function (element, valueAccessor, allBindings) {
		var oTask = valueAccessor(),
			onCompleted = allBindings.get('onCompleted');

		$(element).prop("checked", oTask.bCompleted );

        $(element).iCheck({ 
        	checkboxClass: 'icheckbox_square-grey',
			radioClass: 'iradio_square-grey'
        }).on('ifChanged', function () {
        	var bCompleted = $(this).is(":checked");

        	if(typeof(onCompleted) == 'function'){
        		onCompleted();
        	}
        });
    }
}; 

function createCookie(name, value, days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }

    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}