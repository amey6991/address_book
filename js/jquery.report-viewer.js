var reportViewer = function(iReportId, jsonConfig) {
    this.reportId   = iReportId;
    this.config     = jsonConfig;
    this.dataUrl    = null;
    this.exportUrl  = null;
    this.dataTable  = {};
    this.countSelector = "[data-count-viewer='"+iReportId+"']";
    this.selector   = "#reportDataTable"+iReportId;
    this.jQSelector = jQuery(this.selector);
    this.filterDisplayAreaSelector = "[data-filter-display][data-report-id='"+ iReportId +"']";

    this.setConfig = function(config){
    	this.config = config;
    }

    this.setDataUrl = function(url){
    	this.dataUrl = url;
    }

    this.setExportUrl = function(url){
    	this.exportUrl = url;
    }

    this.init = function(){
    	var dataTableConfig = this.getDataTableConfig();
    	var that = this;

    	this.dataTable = this.jQSelector.on('xhr.dt', function ( e, settings, json ) {
			jQuery(that.countSelector).text(json.recordsFiltered);
	    }).DataTable(dataTableConfig);


		jQuery(document).on('click', '[data-export-screen]', function(e){
			e.preventDefault();
			var setting = that.getDataTableParams();
			
			var $this = jQuery(this),
				data  = setting.oAjaxData;

			data['type'] 	  = $this.data('type');
			data['report_id'] = that.reportId;
            data['export_all'] = 0;
            data['nocache'] = (new Date()).getTime();

			window.location = $this.attr('href')+'?'+jQuery.param(data);
		});

		jQuery(document).on('click', '[data-export-all]', function(e){
			e.preventDefault();
			var setting = that.getDataTableParams();
			
			var $this = jQuery(this),
				dataExport  = setting.oAjaxData;

			dataExport['type'] 	  = $this.data('type');
			dataExport['report_id'] = that.reportId;
			dataExport['export_all'] = 1;
            dataExport['nocache'] = (new Date()).getTime();

			window.location = $this.attr('href')+'?'+jQuery.param(dataExport);
		});

		// Applying filter
		jQuery(document).on('click', '[data-filter-btn][data-report-id="'+this.reportId+'"]',function (e) {
			e.preventDefault();

			var filters = that.getFilterValues(that.reportId);

			that.applyFilterToDataTable(filters);
			
			that.displayFilters(filters);
		});


        // Reset filter
        jQuery(document).on('click', '[data-reset-filter-btn][data-report-id="'+this.reportId+'"]',function (e) {
            e.preventDefault();

            that.resetFilter();
        });
    }

    this.getConfigPaginationLength = function(){
    	var paginationLength = 20;

    	if(this.config.pagination && this.config.pagination.enabled && this.config.pagination['length'] ){
    		paginationLength = this.config.pagination['length'];
    	}

    	return paginationLength;
    }

    this.getColumnForDisplay = function(){
    	var columnsToDisplay = {};

    	jQuery.each(this.config.table.columns, function(slug, column){
    		if(!column.hasOwnProperty('displayInView') || column.displayInView){
    			columnsToDisplay[slug] = column;
    		}
    	});

    	return columnsToDisplay;
    }

    this.getDataTableConfig = function(){
    	var sortableColumns = [{"orderable": false}];

		jQuery.each(this.getColumnForDisplay(), function(slug, config){
			var isSortable = config.hasOwnProperty('isSortable') && config.isSortable;
			sortableColumns.push({"orderable": isSortable, "name": slug });
		});

    	return {
    		processing: true,
			serverSide: true,
			sDom: "rtp",
			ajax: this.dataUrl+"?report_id="+this.reportId,
			iDisplayLength: this.getConfigPaginationLength(),
			columns: sortableColumns
    	};
    }

    this.setPaginationLength = function(iLength){
		if(iLength > 0){
			var setting = this.getDataTableParams();
			setting._iDisplayLength = iLength;
			setting.oInstance.fnDraw();
		}
    }


    this.getDataTablePaginationLength = function () {
    	var setting = this.getDataTableParams();
    	return setting._iDisplayLength;
    }


    this.getDataTableParams = function () {
		return $(this.selector).dataTable().fnSettings();
    }


    this.getFilterValues = function (reportId) {
    	var filterElementsSelector = "[data-filter][data-report-id='"+reportId+"']";
		var filters = [];

		// Gather all column with type string, date, time, enum
		jQuery(filterElementsSelector+"[data-type='string']").each(function () {
			var $this = jQuery(this),
				columnName = $this.data('column'),
				value = $this.val(),
				type = $this.data('type');

            filters.push({ column: columnName, type: type, value: value});
		});

		jQuery(filterElementsSelector+"[data-type='date']").each(function () {
			var $this = jQuery(this),
				columnName = $this.data('column'),
				value = $this.val(),
				type = $this.data('type');

			filters.push({ column: columnName, type: type, value: value });
		});

		jQuery(filterElementsSelector+"[data-type='time']").each(function () {
			var $this = jQuery(this),
				columnName = $this.data('column'),
				value = $this.val(),
				type = $this.data('type');

			filters.push({ column: columnName, type: type, value: value });
		});

		jQuery(filterElementsSelector+"[data-type='enum']").each(function () {
			var $this = jQuery(this),
				columnName = $this.data('column'),
				$operator = jQuery("[data-filter][data-column='"+columnName+"'][data-report-id='"+reportId+"']"),
                operation = $this.find('option:selected').data('operation');

            if(operation == false || operation == undefined){
                operation = "";
            }

			filters.push({ column: columnName, type: $this.data('type'), value: $this.val(), operator: operation });
		});

		// Gather all column with type int
		jQuery(filterElementsSelector+"[data-type='int']").each(function () {
			var $this = jQuery(this),
				columnName = $this.data('column'),
				value = $this.val(),
				$operator = jQuery("[data-operator][data-column='"+columnName+"'][data-report-id='"+reportId+"']");

			filters.push({ column: columnName, type: "int", value: value, operator: $operator.val() });
		});

		// Gather all column with type date range
		var dateRangeColumns = [];
		jQuery(filterElementsSelector+"[data-type='date-range']").each(function () {
			var column = $(this).data('column');

			if( jQuery.inArray(column, dateRangeColumns) < 0){
				dateRangeColumns.push(column);
			}
		});

		jQuery.each(dateRangeColumns, function (index, columnName) {
			var rangeElements = jQuery(filterElementsSelector+"[data-type='date-range'][data-column='"+columnName+"']");
			
			var dateRangeData = {column: columnName, type: "date-range"};

			rangeElements.each(function (index,ele) {
				var $ele = jQuery(ele);

				dateRangeData[$ele.data('range-type')] = $ele.val();
			});

			filters.push(dateRangeData);
		});

		// Gather all column with type time range
		var timeRangeColumns = [];
		jQuery(filterElementsSelector+"[data-type='time-range']").each(function () {
			var column = $(this).data('column');

			if(jQuery.inArray(column, timeRangeColumns) < 0){
				timeRangeColumns.push(column);
			}
		});

		jQuery.each(timeRangeColumns, function (index, columnName) {
			var rangeElements = jQuery(filterElementsSelector+"[data-type='time-range'][data-column='"+columnName+"']");
			
			var timeRangeData = {column: columnName, type: "time-range"}

			rangeElements.each(function (index,ele) {
				var $ele = jQuery(ele);

				timeRangeData[$ele.data('range-type')] = $ele.val();
			});

			filters.push(timeRangeData);
		});

		return filters;
    }


    this.applyFilterToDataTable = function(filters){
    	var that  = this;

    	jQuery.each(filters, function (index, filter) {
    		var columnIndex = that.getDataTableColumnIndex(filter.column);
    		switch(filter.type){
    			case "string":
    			case "date":
    			case "time":
    			case "enum":
    					that.dataTable.columns( columnIndex ).search( filter.value, filter.operator );
    				break;

    			case "int":
    					that.dataTable.columns( columnIndex ).search( filter.value, filter.operator );
    				break;

    			case "date-range":
    					that.dataTable.columns( columnIndex ).search( filter.from , filter.to );
    				break;

    			case "time-range":
    					that.dataTable.columns( columnIndex ).search( filter.from , filter.to );
    				break;
    		}
    	});

    	if(filters.length > 0){
    		that.dataTable.draw();
    	}
    }


    this.getDataTableColumnIndex = function (column) {
    	var settings = jQuery(this.selector).dataTable().fnSettings();
		var aoColumns = settings.aoColumns;

		var columnIndex = null;

		jQuery.each(aoColumns, function(index, config){
			if(config['name'] && config['name'] == column){
				columnIndex = config.idx;
			}
		});

		return columnIndex;
    }


    this.displayFilters = function (filters) {
    	var that = this;

    	jQuery(this.filterDisplayAreaSelector).empty();

		jQuery.each(filters, function (index, filter) {
			that.displayFilter(filter);
		});
    }

    this.displayFilter = function (filter) {
    	var filterDisplayArea = jQuery(this.filterDisplayAreaSelector),
    		filterTextContainer = filterDisplayArea.find("[data-column='"+filter.column+"']");

    	switch(filter.type){
    		case "string":
    				if(filter.value == ""){
    					if(filterTextContainer.length){
    						filterTextContainer.remove();
    					}
    				} else {
    					var stringFilterTypeText = this.getStringFilterType(filter.column);

    					if(stringFilterTypeText == "matches_exactly"){
    						stringFilterTypeText = " : ";
    					} else {
    						stringFilterTypeText = stringFilterTypeText.replace(/_/g," ");
    					}

    					filterDisplayArea.append([
    						"<p data-column='"+filter.column+"'>",
    							"<strong>"+this.getColumnNameBySlug(filter.column)+"</strong> "+stringFilterTypeText+" '"+filter.value+"'",
    						"</p>"
    					].join(""));
    				}
    			break;

    		case "date":
    		case "time":
                    if(filter.value == ""){
                        if(filterTextContainer.length){
                            filterTextContainer.remove();
                        }
                    } else {
                        filterDisplayArea.append([
                            "<p data-column='"+filter.column+"'>",
                                "<strong>"+this.getColumnNameBySlug(filter.column)+"</strong>: "+filter.value,
                            "</p>"
                        ].join(""));
                    }
                break;

    		case "enum":
                    if(filter.value == ""){
                        if(filterTextContainer.length){
                            filterTextContainer.remove();
                        }
                    } else {
    				    //Get Display text of selectbox
                        displayText = jQuery("[data-filter][data-report-id='"+this.reportId+"'][data-type='enum'][data-column='"+filter.column+"']").find("option:selected").text();

                        filterDisplayArea.append([
                            "<p data-column='"+filter.column+"'>",
                                "<strong>"+this.getColumnNameBySlug(filter.column)+"</strong>: "+displayText,
                            "</p>"
                        ].join(""));
                    }
    			break;

    		case "date-range":
    		case "time-range":
    				if(filter.from == "" && filter.to == ""){
    					if(filterTextContainer.length){
    						filterTextContainer.remove();
    					}
    				} else {

    					if(filter.from == ""){
	    					filterDisplayArea.append([
	    						"<p data-column='"+filter.column+"'>",
	    							"<strong>"+this.getColumnNameBySlug(filter.column)+"</strong> before "+filter.to,
	    						"</p>"
	    					].join(""));
    					} else if(filter.to == "") {
    						filterDisplayArea.append([
	    						"<p data-column='"+filter.column+"'>",
	    							"<strong>"+this.getColumnNameBySlug(filter.column)+"</strong> after "+filter.from,
	    						"</p>"
	    					].join(""));
    					} else {
    						filterDisplayArea.append([
	    						"<p data-column='"+filter.column+"'>",
	    							"<strong>"+this.getColumnNameBySlug(filter.column)+"</strong> between "+ filter.from +" and "+ filter.to,
	    						"</p>"
	    					].join(""));
    					}	

    				}
    			break;
    		case "int":
    				if(filter.value == ""){
    					if(filterTextContainer.length){
    						filterTextContainer.remove();
    					}
    				} else {
    					filterDisplayArea.append([
    						"<p data-column='"+filter.column+"'>",
    							"<strong>"+this.getColumnNameBySlug(filter.column)+"</strong> "+filter.operator+" "+filter.value,
    						"</p>"
    					].join(""));
    				}
    			break;
    	}
    }


    this.getColumnNameBySlug = function (slug) {
    	var columnConfig = this.getDataTableColumnConfig(slug);


        if( columnConfig && columnConfig.hasOwnProperty('sTitle') ){
    	   return columnConfig['sTitle'];
        } else {
           return slug;
        }
        
    }


    this.getDataTableColumnConfig = function (slug) {
    	var aoColumns = this.getDataTableParams()['aoColumns'];

    	var config = null;

    	jQuery.each(aoColumns, function (index, columnConfig) {
    		if(columnConfig['name'] == slug){
    			config = columnConfig;
    		}
    	});

    	return config;
    }


    this.getDatabaseColumnConfig = function (column) {
        var columns = this.config.table.columns;

        var columnConfig = {};

        jQuery.each(columns, function (slug, config) {
            if(column == slug){
                columnConfig = config;
            }
        });

        return columnConfig;
    }


    this.getStringFilterType = function (slug) {
    	var columnConfig = this.config.table.columns[slug];

    	var filterType = "contains";

    	if( columnConfig.hasOwnProperty('filter') && columnConfig.filter.hasOwnProperty('search_type') ){
    		filterType =  columnConfig.filter.search_type;
    	}

    	return filterType;
    }


    this.resetFilter = function () {
        // Reset all filter input
        var filterElementsSelector = "[data-filter][data-report-id='"+this.reportId+"']",
            that = this;

        // Reset all
        jQuery(filterElementsSelector+"[data-type='string']").val("");
        jQuery(filterElementsSelector+"[data-type='date']").val("");
        jQuery(filterElementsSelector+"[data-type='time']").val("");
        jQuery(filterElementsSelector+"[data-type='enum']").val("");
        jQuery(filterElementsSelector+"[data-type='date-range']").val("");
        jQuery(filterElementsSelector+"[data-type='time-range']").val("");
        jQuery(filterElementsSelector+"[data-type='int']").each(function () {
            var $this     = jQuery(this),
                $operator = jQuery("[data-operator][data-column='"+$this.data('column')+"'][data-report-id='"+that.reportId+"']");
            
            $this.val("");
            $operator.val( $operator.find("option:first").val() );
        });

        //Remove all display text
        jQuery(this.filterDisplayAreaSelector).empty();
        
        var settings = this.getDataTableParams();

        jQuery.each(settings.aoPreSearchCols, function (index, columnConfig) {
            columnConfig.bRegex = false;
            columnConfig.sSearch = "";
        });

       this.dataTable.draw();
    }


    this.getEnumColumnOptions = function(column){
        var config = this.getDatabaseColumnConfig(column);
        if(config.hasOwnProperty('filter') && config.filter.hasOwnProperty('options')){
            return config.filter.options;
        } else if(config.hasOwnProperty('options')) {
            return config.options;
        }

        return [];
    }

};