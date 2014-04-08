function rest(){ //this creates a scope for this script
	var _restList;
	var loopcounter;
	$(function(){//on load function
			loopcounter = 0;
			$.getJSON("server-REST.json", function(json){
				//console.log(json);
				json.forEach(function(entry){
					//console.log(entry);
					var html = "<option value='"+loopcounter+"'>"+entry.url+"</option>";
					//console.log(html);
					$("#rest_list").append($(html));
					loopcounter++;
				});
				init(json);
			});
		});

	function init(rest_list){ //initialize page
		_restList = rest_list
		$("#rest_list").unbind().change(onRestSelected);
		//hide things which need to be hidden
		$("#args").hide();
		$("#json").hide();
		$("#try").hide();
		$("#comm").hide();
	}
	
	function onRestSelected(){
		if(!_restList){ //make sure gameList has been intialized.
			return;
		}
		//rehide the args div
		$("#args").hide();
		$("#json").hide();
		$("#comm").hide();
		//console.log($(this).val());
		var selected = _restList[$(this).val()];
		
		//console.log(selected.method);
		$("#req_method").text(selected.method);
		
		$("#desc").text(selected.description);
		if (selected.method == "POST"){
			if(selected.type == "FORM"){
				$("#args").show();
				handleArgs(selected.args);
			}else if(selected.type == "JSON"){
				$("#json").show();
				//$("#jsonText").clear();
				$("#jsonText").val(JSON.stringify(selected.template, null, '\t'));
			}
		}
		
		$("#try").show().unbind().click(onTryClick);
		
	}
	
	function handleArgs(args){
		$("#args").empty();
		$.each(args,function(index, arg){
			//print the name and description for this object
			//console.log(arg);
			$("#args").append("<h6>Description: "+ arg.description+"</h6>");
			switch (arg.type){
			case "STRING":
				$("#args").append("<form>"+arg.name+": <input type='text' id='"+arg.name+"'></form>");
				break;
			case "BOOLEAN":
				$("#args").append("<form>"+arg.name+": <input type='checkbox' id='"+arg.name+"'></form>");
				break;
			case "INTEGER":
				$("#args").append("<form>"+arg.name
							+": <input type='number' style = 'height:25px;width:100'  id='"
							+arg.name+"'></form>");
				break;
			case "ENUMERATION":
				$("#args").append("<form>"+arg.name+": <select id ='"+arg.name+"'></select></form>");
				$.each(arg.values,function(index,value){
					var html = "<option value='"+value+"'>"+value+"</option>";
					$("#"+arg.name).append(html);
				});
				break;
			}
		});
	}
	
	function onTryClick(){
		var selected = _restList[$("#rest_list").val()];
		if(selected.method == "POST"){
			$("#request").show();
			if(selected.type == "FORM"){
				var data = getArgsData(selected);
				$("#request").val(JSON.stringify(data, null, '\t'));
				$.post(selected.url, $.param(data),doneHandler, "text").fail(failHandler);
			}else if(selected.type == "JSON"){
				//console.log("" + $("#jsonText").val()):
				//var check = $("#jsonText").val();
				//console.log(JSON.parse(check));
				$("#request").val($("#jsonText").val());
				$.post(selected.url,$("#jsonText").val(),doneHandler,"json").fail(failHandler);
			}else{
				
				$.post(selected.url,"",doneHandler,"text").fail(failHandler);
			}
		}else if(selected.method == "GET"){
			$("#request").hide();
			$.get(selected.url, null, doneHandler, "json").fail(failHandler);
		
		}else{
			console.log("error in onTryClick: selected.method");
		}
	}
	
	function getArgsData(selected){
		var data = {}
		for(var i=0;i<selected.args.length;i++){
			console.log("Value: "+ $("#"+selected.args[i].name).is(":checked"));
			//retrieve the value from the form
			if(selected.args[i].type == "BOOLEAN")
				data[selected.args[i].name]=$("#"+selected.args[i].name).is(":checked"); 
			else{
				data[selected.args[i].name]=$("#"+selected.args[i].name).val(); 		
			}
		}
		console.log("data: "+JSON.stringify(data, null, "\t"));
		return data;
	}
	
	function doneHandler(data, textStatus, jqXHR) {
    	console.log("success!");
    	$("#comm").show();
    	$("#response").val(JSON.stringify(data,null,'\t'));
	}

	function failHandler(jqXHR, textStatus, errorThrown) {
		console.error("AJAX request failed: " + errorThrown);
	}
	
	
}rest();






















