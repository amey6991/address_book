function TaskManagerDashboard (iStaffID,iUserID) {
	var self = this;

	this.iStaffID = iStaffID;
	this.iUserID = iUserID;
	this.allTasks = ko.observableArray([]);
	this.openedTask = ko.observable(new Task());

	// Filters
	this.bDisplayCompletedTasks = ko.observable(true);
	this.dFilterStartDate = ko.observable("");
	this.dFilterEndDate = ko.observable("");

	this.addTask = function () {
		$.ajax({
			url: 'apiv2/tasks',
			type: 'POST',
			data: {iAddedBy: self.iUserID}
		})
		.done(function(oTask) {
			self.allTasks.push(new Task(oTask));
			self.allTasks.push(new Task());

			$("#id"+oTask.iTaskID+"TaskRow").find('.classTaskTitleControl').focus();
		});
	}

	this.fetchAllTasks = function () {
		$.ajax({
			url: 'apiv2/tasks',
			data: {
				iStaffID: self.iStaffID
			}
		})
		.done(function(aTasks) {
			var aTaskLists = [];

			$.each(aTasks, function(index, oTask) {
				aTaskLists.push(new Task(oTask));
			});

			aTaskLists.push(new Task());

			self.allTasks(aTaskLists);
		});
	}

	this.deleteTask = function (oTask) {
		$.ajax({
			url: 'apiv2/tasks/'+oTask.iTaskID,
			type: 'DELETE',
		})
		.done(function(bResult) {
			if(bResult){
				self.allTasks.remove(oTask);
			}
		});
	}

	this.changeTaskCompletionStatus = function (oTask) {
		$.ajax({
			url: 'apiv2/task/'+oTask.iTaskID+"/complete",
			type: 'POST',
			data: {
				iCompleted: oTask.bComplete() ? 1 : 0,
				iCompletedBy: self.iStaffID
			}
		});
	}

	this.showTask = function (oTask) {
		var $selector = $(".classTaskManagerWindow"),
			taskViewerOpened = $(".classTaskManagerWindow").hasClass('classTaskViewerOpen');

		if( taskViewerOpened && self.openedTask().iTaskID == oTask.iTaskID){
			$selector.removeClass('classTaskViewerOpen');
			$(document).trigger('taskViewerClosed');
		} else {
			self.openedTask(oTask);

			$selector.addClass('classTaskViewerOpen');
			$(document).trigger('taskViewerOpened');
		}
	}

	this.updateOpenedTask = function (bReset) {
		var openedTask = self.openedTask(),
			tasks = self.allTasks();

		// Go over each tasks and update the new task
		$.each(tasks, function(iIndex, task) {
			if(task.iTaskID == openedTask.iTaskID){
				self.allTasks.replace(task, openedTask);
				tasks[iIndex].saveCurrentState();
			}
		});

		if(bReset === true){
			self.openedTask(new Task);
		}
	}

	this.openedTask.subscribe(function () {
		self.updateOpenedTask();
	});

	this.taskTitleKeyPressed = function (task, event) {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if(keycode == '13'){
			self.addTask();
		} if(keycode == '8' && task.sTaskTitle() == ""){
			self.deleteTask(task);
		} else {
        	task.saveCurrentState();
		}
	}

	this.tasks = ko.pureComputed(function () {
		return ko.utils.arrayFilter(self.allTasks(), function(oTask) {
			var bDisplay = true,
				bDisplayCompletedTasks = self.bDisplayCompletedTasks(),
				dFilterStartDate = self.dFilterStartDate(),
				dFilterEndDate = self.dFilterEndDate(),
				dtCompletionDatetime = oTask.dtCompletionDatetime();

			if(!bDisplayCompletedTasks && oTask.bCompleted()){
				bDisplay = false;
			}

			if(bDisplayCompletedTasks && (dFilterStartDate !== "" || dFilterEndDate !== "")){
				if(dtCompletionDatetime !== ""){
					var mCompletionDatetime = moment(dtCompletionDatetime, "YYYY-MM-DD");

					if(dFilterStartDate !== ""){
						var mFilterStartDate = moment(dFilterStartDate, "DD-MM-YYYY");

						if(! (mCompletionDatetime >= mFilterStartDate)){
							bDisplay = false;
						}

					}

					if(dFilterEndDate !== ""){
						var mFilterEndDate = moment(dFilterEndDate, "DD-MM-YYYY");

						if(! (mCompletionDatetime <= mFilterEndDate)){
							bDisplay = false;
						}
					}
				} else {
					bDisplay = false;
				}
			}


			return bDisplay;
        })
	}, this);

	this.fetchAllTasks();
}

function Task (oTask) {
	var self = this;
	
	if(oTask){
		this.iTaskID = oTask.iTaskID;

		if(typeof(oTask.sTaskTitle) == "function"){
			this.sTaskTitle = ko.observable(oTask.sTaskTitle());
		} else {
			this.sTaskTitle = ko.observable(oTask.sTaskTitle);
		}

		if(typeof(oTask.sTaskDescription) == "function"){
			this.sTaskDescription = ko.observable(oTask.sTaskDescription());
		} else {
			this.sTaskDescription = ko.observable(oTask.sTaskDescription);
		}


		this.dStartDate = oTask.dStartDate;

		var dEndDate = typeof(oTask.dEndDate) == "function" ? oTask.dEndDate() : oTask.dEndDate;
		this.dEndDate = ko.observable(dEndDate);

		if(dEndDate == "" || dEndDate == "0000-00-00"){
			this.dTaskDate = ko.observable("");
		} else {
			this.dTaskDate = ko.observable(moment(dEndDate, "YYYY-MM-DD").format("DD-MM-YYYY"));
		}

		if(typeof(oTask.iAssignedTo) == "function"){
			this.iAssignedTo = ko.observable(oTask.iAssignedTo());
		} else {
			this.iAssignedTo = ko.observable(oTask.iAssignedTo);
		}

		this.oAssignedTo = ko.observable( typeof(oTask.oAssignedTo) == "function" ? oTask.oAssignedTo() : oTask.oAssignedTo);

		if(typeof(oTask.bCompleted) == "function"){
			this.bCompleted = ko.observable(oTask.bCompleted());
		} else {
			this.bCompleted = ko.observable(oTask.bCompleted);
		}

		var dtCompletionDatetime = typeof(oTask.dtCompletionDatetime) == "function" ? oTask.dtCompletionDatetime() : oTask.dtCompletionDatetime;

		if(dtCompletionDatetime == "" || dtCompletionDatetime == "0000-00-00 00:00:00"){
			this.dtCompletionDatetime = ko.observable("");
		} else {
			this.dtCompletionDatetime = ko.observable(dtCompletionDatetime);
		}


		this.iAddedBy = oTask.iAddedBy;
		this.dAddedOn = oTask.dAddedOn;
	} else {
		this.iTaskID = 0;
		this.sTaskTitle = ko.observable("");
		this.sTaskDescription = ko.observable("");
		this.dStartDate = "";
		this.dEndDate = ko.observable("");
		this.dTaskDate = ko.observable("");
		
		this.iAssignedTo = ko.observable(0);
		this.oAssignedTo = ko.observable(null);

		this.bCompleted = ko.observable(false);
		this.dtCompletionDatetime = ko.observable("");
		this.iAddedBy = 0;
		this.dAddedOn = "";
	}

	this.dTaskDate.subscribe(function (newDate) {
		if(newDate == ""){
			self.dEndDate("0000-00-00");
		} else {
			self.dEndDate(moment(newDate, "DD-MM-YYYY").format("YYYY-MM-DD"));
		}
	});

	// Saving State

	this.saveStateTimer = null;

	this.saveCurrentState = function () {
		// Save current state only if task has task id
		if(self.iTaskID){
			// Clear existing timout if task is about to be saved
			if(this.saveStateTimer){
				clearTimeout(this.saveStateTimer);
				this.saveStateTimer = null;
			}

			this.saveStateTimer = setTimeout(function () {
				$.ajax({
		    		url: 'apiv2/tasks',
					type: 'POST',
		    		data: {
		    			iTaskID: self.iTaskID,
						sTaskTitle: self.sTaskTitle(),
						sTaskDescription: self.sTaskDescription(),
						dStartDate: self.dStartDate,
						dEndDate: self.dEndDate(),
						iAssignedTo: self.iAssignedTo(),
						bCompleted: self.bCompleted(),
						dtCompletionDatetime: self.dtCompletionDatetime(),
						iAddedBy: self.iAddedBy,
						dAddedOn: self.dAddedOn
		    		}
		    	});
			}, 500);
		}
	}

	this.changeTaskCompletionStatus = function () {
		$.ajax({
			url: 'apiv2/task/'+self.iTaskID+"/complete",
			type: 'POST',
			data: {
				iCompleted: self.bCompleted() ? 1 : 0,
				iCompletedBy: oTaskManagerDashboard.iUserID
			}
		}).done(function(oUpdatedTask) {
			if(oUpdatedTask.dtCompletionDatetime){
				self.dtCompletionDatetime(oUpdatedTask.dtCompletionDatetime);
			} else {
				self.dtCompletionDatetime("");
			}
		});
	}

	this.assignTo = function (iStaffID) {
		$.ajax({
			url: 'apiv2/task/'+self.iTaskID+"/assign",
			type: 'POST',
			data: {
				iAssignTo: iStaffID ? iStaffID : 0,
				iAssignedBy: oTaskManagerDashboard.iUserID
			}
		}).done(function(oUpdatedTask) {
			self.oAssignedTo(oUpdatedTask.oAssignedTo);
		});
	}

	this.sTaskTitle.subscribe(function () {
		self.saveCurrentState();
	});

	this.sTaskDescription.subscribe(function () {
		self.saveCurrentState();
	});

	this.dEndDate.subscribe(function () {
		self.saveCurrentState();
	});

	this.iAssignedTo.subscribe(function (iStaffID) {
		self.assignTo(iStaffID);
	});

	this.bCompleted.subscribe(function () {
		self.changeTaskCompletionStatus();
	});

	this.dEndDate.subscribe(function () {
		self.saveCurrentState();
	});
}

ko.bindingHandlers.iCheckCheckbox = {
	init: function (element, valueAccessor, allBindings) {
		var task = allBindings.get('task'),
			value = valueAccessor();

		$(element).prop( "checked", task.bCompleted() );

        $(element).iCheck({ 
        	checkboxClass: 'icheckbox_square-red',
			radioClass: 'iradio_square-red'
        });

        $(element).on('ifChanged', function () {
    		task.bCompleted($(this).is(":checked"));
        });
    }
}; 

ko.bindingHandlers.bsPopover = {
	init: function (element, valueAccessor, allBindings) {
		var task = allBindings.get('bsPopover');

        $(element).popover({
        	placement: "left",
        	html: true,
        	content: getTemplateContentForTask(task),
        	template: getTemplateForTask(task),
        	title: ""
        }).on('shown.bs.popover', function (event) {
        	 $(".classTaskAssignBtn").not(event.currentTarget).popover("hide");

        	var $selector = $("#idTaskAssignControl"+task.iTaskID),
        		iAssignedTo = task.iAssignedTo();

        	if(iAssignedTo > 0){
        		var oStaff = getStaffByStaffID(iAssignedTo);
        		
        		if(oStaff && typeof(oStaff) == "object"){
        			$selector.append('<option id="'+oStaff.iStaffID+'">'+oStaff.sStaffName+'</option>');
				}
        	}

			$selector.select2({
				width: '100%',
				placeholder: 'Select Staff Member',
				allowClear: true,
				minimumInputLength: 3,
				dropdownParent: $selector.closest('.popover'),
				width: 'resolve',
				ajax: {
				    url: "ajaxEhr.php?sFlag=SearchStaff",
				    data: function (params) {
						return {
							sStaffName: params.term
						};
				    },
			        processResults: function (data, params) {
			        	var results = [];

			        	$.each(data, function(index, staff) {
			        		results.push({
			        			id: staff.staff_id,
			        			text: staff.staff_name
			        		});
			        	});

						return { results: results };
				    }
				}
			}).on('change', function() {
				var value = $(this).val() ? $(this).val() : 0;

				if(value == 0){
					$(event.currentTarget).popover("hide");
				}

				task.iAssignedTo(value);

			}).on('unselect', function() {
				task.iAssignedTo(0);
			});

			if(task.iAssignedTo() == 0){
				$selector.select2('open');
			}
		});
		
		setTimeout(function () {
			$(element).attr('title', 'Assign Task');
		}, 200);
    },
}; 

function getTemplateForTask (oTask) {
	return [
		'<div class="popover" role="tooltip">',
			'<div class="arrow"></div>',
			'<div class="popover-content">',
			'</div>',
		'</div>'
	].join("");
}

function getTemplateContentForTask (oTask) {
	return [
		"<p>Assign To:</p>",
		"<select class='form-control classTaskAssignControl' id='idTaskAssignControl"+oTask.iTaskID+"'></select>"
	].join("");
}

function getStaffByStaffID (iStaffID) {
	if(iStaffID > 0){
		var oStaff = null;
		$.ajax({
			url: 'ajaxEhr.php',
			data: {
				iStaffID: iStaffID,
				sFlag: "getStaffByStaffID"
			},
			async: false
		})
		.done(function(data) {
			oStaff = data;
		});

		return oStaff;
	} else {
		return null;
	}
}

$('body').on('click', function (e) {
    //did not click a popover toggle, or icon in popover toggle, or popover
    if ($(e.target).data('toggle') !== 'popover'
        && $(e.target).parents('[data-toggle="popover"]').length === 0
        && $(e.target).parents('.popover.in').length === 0) { 
        $('[data-toggle="popover"]').popover('hide');
    	$(".popover.in").remove();
    }
});

ko.bindingHandlers.editableText = {
    init: function(element, valueAccessor) {
        $(element).on('blur', function() {
            var observable = valueAccessor();
            observable( $(this).text() );
        });
    },
    update: function(element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        $(element).text(value);
    }
};

ko.bindingHandlers.taskDate = {
    init: function(element, valueAccessor, allBindings) {
		var oTask = allBindings.get('taskDate');

        $(element).datepicker({
        	format: "dd-mm-yyyy",
        	clearBtn: true,
        	todayHighlight : true,
        	autoclose: true
        }).on('clearDate', function() {
        	oTask().dTaskDate("");
        });;
    },
    update: function (element, valueAccessor, allBindings) {
		var oTask = allBindings.get('taskDate');

        $(element).datepicker("setDate", oTask().dTaskDate());
    }
};


ko.bindingHandlers.taskDateFilter = {
    init: function(element, valueAccessor, allBindings) {
		var taskDateFilter = allBindings.get('taskDateFilter');

        $(element).datepicker({
        	format: "dd-mm-yyyy",
        	clearBtn: true,
        	todayHighlight : true,
        	autoclose: true
        }).on('clearDate', function() {
        	taskDateFilter("");
        });;
    }
};