ko.components.register('task-widget', {
    viewModel: function(params) {
    	this.tasks = params.tasks;
    	this.onCompleted = params.onCompleted;

    	this.taskCompleted = function(oTask){
    		if(typeof(this.onCompleted) == "function"){
    			this.onCompleted(oTask);
    		}
    	}
    },
    template: ['<div class="card flat-card card-orange">',
	            '<span class="label label-default card-top-left-corner-label">Task</span>',
	            '<div class="card-content">',
                    '<span data-bind="text:tasks.length"></span>',
                    '<div data-bind="if:tasks.length > 0">',
    	            	'<div data-bind="foreach:tasks">',
    	            		"<div>",
    			               	'<label class="classTaskLabel">',
    			               		'<input type="checkbox" data-bind="iTaskWidgetCheckbox:$data,parentRef: $parent"">',
    			               		'<span class="classSmLeftSpacing" data-bind="text:sTaskTitle"></span>',
    			               	'</label>',
    		               	'</div>',
    	               	'</div>',
                    '</div>',
                     '<div data-bind="if:tasks.length == 0">',
                        '<em class="text-center">No tasks for today</em>',
                    '</div>',
	            '</div>',
	        '</div>'].join("")
});


ko.bindingHandlers.iTaskWidgetCheckbox = {
	init: function (element, valueAccessor, allBindings) {
		var oTask = valueAccessor(),
			onCompleted = allBindings.get('onCompleted'),
			parentRef = allBindings.get('parentRef');

		$(element).prop("checked", oTask.bCompleted );

        $(element).iCheck({ 
        	checkboxClass: 'icheckbox_square-grey',
			radioClass: 'iradio_square-grey'
        }).on('ifChanged', function () {
        	var bCompleted = $(this).is(":checked");
        	
        	if(bCompleted){
        		parentRef.taskCompleted(oTask);
        	}
        });
    }
}; 