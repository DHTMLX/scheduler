/*

@license
dhtmlxScheduler v.5.3.13 Standard

To use dhtmlxScheduler in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.

*/
Scheduler.plugin(function(scheduler){


function parseXMLOptions(loader, config){
	var items = scheduler.$ajax.xpath("//data/item", loader.xmlDoc);
	var ids = {};
	for (var i = 0; i < items.length; i++) {
		ids[items[i].getAttribute(config.map_to)] = true;
	}
	return ids;
}

function parseJSONOptions(loader, config){
	try{
		var items = JSON.parse(loader.xmlDoc.responseText);
		var ids = {};
		for (var i = 0; i < items.length; i++) {
			var option = items[i];

			ids[option.value || option.key || option.id] = true;
		}
		return ids;
	}catch(e){
		return null;
	}
}

scheduler.form_blocks["multiselect"]={
	render:function(sns) {
		var css = "dhx_multi_select_control dhx_multi_select_"+sns.name;
		if(!!sns.vertical){
			css += " dhx_multi_select_control_vertical";
		}

		var _result = "<div class='"+css+"' style='overflow: auto; height: "+sns.height+"px; position: relative;' >";
		for (var i=0; i<sns.options.length; i++) {
			_result += "<label><input type='checkbox' value='"+sns.options[i].key+"'/>"+sns.options[i].label+"</label>";
			if(!!sns.vertical) _result += '<br/>';
		}
		_result += "</div>";
		return _result;
	},
	set_value:function(node,value,ev,config){

		var _children = node.getElementsByTagName('input');
		for(var i=0;i<_children.length;i++) {
			_children[i].checked = false; //unchecking all inputs on the form
		}

		function _mark_inputs(ids) { // ids = [ 0: undefined, 1: undefined, 2: true, 'custom_name': false ... ]
			var _children = node.getElementsByTagName('input');
			for(var i=0;i<_children.length; i++) {
				_children[i].checked = !! ids[_children[i].value];
			}
		}

		var _ids = {};
		if (ev[config.map_to]) {
			var results = (ev[config.map_to] + "").split(config.delimiter || scheduler.config.section_delimiter || ",");
			for (var i = 0; i < results.length; i++) {
				_ids[results[i]] = true;
			}
			_mark_inputs(_ids);
		} else {
			if (scheduler._new_event || !config.script_url)
				return;
			var divLoading = document.createElement('div');
			divLoading.className = 'dhx_loading';
			divLoading.style.cssText = "position: absolute; top: 40%; left: 40%;";
			node.appendChild(divLoading);

			var url = [
				config.script_url,
				(config.script_url.indexOf("?") == -1 ? "?" : "&"),
				'dhx_crosslink_' + config.map_to + '=' + ev.id + '&uid=' + scheduler.uid()
			].join("");

			scheduler.$ajax.get(url, function(loader) {
				var options = parseJSONOptions(loader, config);
				if(!options){
					options = parseXMLOptions(loader, config);
				}
				_mark_inputs(options);
				node.removeChild(divLoading);
			});
		}
	},
	get_value:function(node,ev,config){
		var _result = [];
		var _children = node.getElementsByTagName("input");
		for(var i=0;i<_children.length;i++) {
			if(_children[i].checked)
				_result.push(_children[i].value);
		}
		return _result.join(config.delimiter || scheduler.config.section_delimiter || ",");
	},

	focus:function(node){
	}
};

});