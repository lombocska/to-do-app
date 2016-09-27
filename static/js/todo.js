// retrieve data
var todo = todo || {},
		data = JSON.parse(localStorage.getItem("todoData"));



(function(todo, data, $) {

	// defaults object, key-value
	var defaults = {
			todoTask: "todo-task",
			todoHeader: "task-header",
			taskId: "task-",
			formId: "todo-form",
			dataAttribute: "data",
			deleteDiv: "delete-div"
		},

	// where the addtask drop the new task
	  codes = {
	  	"1" : "#cards",
	  };


	// intialize the todo argument
	todo.init = function (options) {

		options = options || {};
		//all of the objects are added to the target object
		options = $.extend({}, defaults, options);

		// can be used to iterate over any collection, whether it is an object
		$.each(data, function (index, params) {
			generateElement(params);
		});

		// iterate the over .class or #id (actually the cards id)
		$.each(codes, function (index,value){
			// Create targets for draggable elements
			$(value).droppable({
				drop: function (event, ui) {
					var element = ui.helper,
							css_id = element.attr("id"),
							id = css_id.replace(options.taskId, ""),
							object = data[id];

					console.log(data[id]);

					removeElement(object);

					object.code = index;

					generateElement(object);

					data[id] = object;
					localStorage.setItem("todoData", JSON.stringify(data));


				}
			});
		});


	};


	//Add Task
	var generateElement = function(params) {
		var parent = $(codes[params.code]),
				wrapper,
				wrapperTitle;

		console.log(parent);

		if (!parent)
			return;

		wrapper = $("<div />", {
			"class" : defaults.todoTask,
			"id" : defaults.taskId + params.id,
			"data" : params.id
		}).appendTo(parent);


		wrapperTitle = $("<div />", {
			"class" : defaults.todoHeader,
			"text" : params.title
		}).appendTo(wrapper);



	};


	// Form
	todo.add = function() {
		var inputs = $("#" + defaults.formId + " :input"),
				errorMessage = "Title can not be empty",
				id,
				title,
				description,
				date,
				tempData;

		if (inputs.length !==4)
			return;

		title = inputs[0].value;
		description = inputs[1].value;
		date = inputs[2].value;

		if (!title) {
			generateDialog(errorMessage);
			return;
		}

		id = new Date().getTime();

		tempData = {
			id: id,
			code: "1",
			title: title,

		};

		//Saving element in local storage
		data[id] = tempData;
		localStorage.setItem("todoData", JSON.stringify(data));

		//Generate Todo Element
		generateElement(tempData);

		//Reset Form
		inputs[0].value = "";
		inputs[1].value = "";
		inputs[2].value = "";

	};


	todo.clear = function () {
		data = {};
		localStorage.setItem("todoData", JSON.stringify(data));
		$("." + defaults.todoTask).remove();
	};

})(todo, data, jQuery);
