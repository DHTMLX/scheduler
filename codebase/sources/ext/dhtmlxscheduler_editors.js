/*

@license
dhtmlxScheduler v.5.3.13 Standard

To use dhtmlxScheduler in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.

*/
Scheduler.plugin(function(scheduler){

scheduler.form_blocks['combo']={
	render:function(sns) {
		if (!sns.cached_options)
			sns.cached_options = {};
		var res = '';
		res += "<div class='"+sns.type+"' style='height:"+(sns.height||20)+"px;' ></div>";
		return res;
	},
	set_value:function(node,value,ev,config){
		(function(){
			resetCombo();
			var id = scheduler.attachEvent("onAfterLightbox",function(){
				// otherwise destructor will never be called after form reset(e.g. in readonly event mode)
				resetCombo();
				scheduler.detachEvent(id);
			});
			function resetCombo(){
				if(node._combo && node._combo.DOMParent) {
					var combo = node._combo;
					if(combo.unload){
						combo.unload();
					}else if(combo.destructor){
						combo.destructor();
					}
					// dhtmlxCombo 4.1.0 bug
					combo.DOMParent = combo.DOMelem = null;
				}
			}
		})();
		window.dhx_globalImgPath = config.image_path||'/';
		node._combo = new dhtmlXCombo(node, config.name, node.offsetWidth-8);
		if (config.onchange)
			node._combo.attachEvent("onChange", config.onchange);

		if (config.options_height)
			node._combo.setOptionHeight(config.options_height);
		var combo = node._combo;
		combo.enableFilteringMode(config.filtering, config.script_path||null, !!config.cache);

		if (!config.script_path) { // script-side filtration is used
			var all_options = [];
			for (var i = 0; i < config.options.length; i++) {
				var option = config.options[i];
				var single_option = [
					option.key,
					option.label,
					option.css
				];
				all_options.push(single_option);
			}
			combo.addOption(all_options);
			if (ev[config.map_to]) {
				var index = combo.getIndexByValue(ev[config.map_to]);
				combo.selectOption(index);
			}
		} else { // server-side filtration is used
			var selected_id = ev[config.map_to];
			if (selected_id) {
				if (config.cached_options[selected_id]) {
					combo.addOption(selected_id, config.cached_options[selected_id]);
					combo.disable(1);
					combo.selectOption(0);
					combo.disable(0);
				} else {
					scheduler.$ajax.get(config.script_path+"?id="+selected_id+"&uid="+scheduler.uid(), function(result){
						var responseText = result.xmlDoc.responseText;
						var label;
						try{
							var res = JSON.parse(responseText);
							label = res.options[0].text;
						}catch(e){
							var option = scheduler.$ajax.xpath("//option", result.xmlDoc)[0];
							label = option.childNodes[0].nodeValue;
						}
						config.cached_options[selected_id] = label;
						combo.addOption(selected_id, label);
						combo.disable(1);
						combo.selectOption(0);
						combo.disable(0);
					});
				}
			} else {
				combo.setComboValue("");
			}
		}
	},
	get_value:function(node,ev,config) {
		var selected_id = node._combo.getSelectedValue(); // value = key
		if (config.script_path) {
			config.cached_options[selected_id] = node._combo.getSelectedText();
		}
		return selected_id;
	},
	focus:function(node){
	}
};

scheduler.form_blocks['radio']={
	render:function(sns) {
		var res = '';
		res += "<div class='dhx_cal_ltext dhx_cal_radio"+"' style='height:"+sns.height+"px;' >";
		for (var i=0; i<sns.options.length; i++) {
			var id = scheduler.uid();
			res += "<input id='"+id+"' type='radio' name='"+sns.name+"' value='"+sns.options[i].key+"'><label for='"+id+"'>"+" "+sns.options[i].label+"</label>";
			if(sns.vertical)
				res += "<br/>";
		}
		res += "</div>";

		return res;
	},
	set_value:function(node,value,ev,config){
		var radiobuttons = node.getElementsByTagName('input');
		for (var i = 0; i < radiobuttons.length; i++) {
			radiobuttons[i].checked = false;
			var checked_value = ev[config.map_to]||value;
			if (radiobuttons[i].value == checked_value) {
				radiobuttons[i].checked = true;
			}
		}
	},
	get_value:function(node,ev,config){
		var radiobuttons = node.getElementsByTagName('input');
		for(var i=0; i<radiobuttons.length; i++) {
			if(radiobuttons[i].checked) {
				return radiobuttons[i].value;
			}
		}
	},
	focus:function(node){
	}
};

scheduler.form_blocks['checkbox']={
	render:function(sns) {
		if (scheduler.config.wide_form)
			return '<div class="dhx_cal_wide_checkbox" '+(sns.height?("style='height:"+sns.height+"px;'"):"")+'></div>';
		else
			return '';
	},
	set_value:function(node,value,ev,config){
		node=document.getElementById(config.id);
		var id = scheduler.uid();
		var isChecked = (typeof config.checked_value != "undefined") ? value == config.checked_value : !!value;
		node.className += " dhx_cal_checkbox";
		var check_html = "<input id='"+id+"' type='checkbox' value='true' name='"+config.name+"'"+((isChecked)?"checked='true'":'')+"'>";
		var label_html = "<label for='"+id+"'>"+(scheduler.locale.labels["section_"+config.name]||config.name)+"</label>";
		if (scheduler.config.wide_form){
			node.innerHTML = label_html;
			node.nextSibling.innerHTML=check_html;
		} else
			node.innerHTML=check_html+label_html;

		if (config.handler) {
			var checkbox = node.getElementsByTagName('input')[0];
			checkbox.onclick = config.handler;
		}
	},
	get_value:function(node,ev,config){
		node=document.getElementById(config.id);
		var checkbox = node.getElementsByTagName('input')[0]; // moved to the header
		if (!checkbox)
			checkbox = node.nextSibling.getElementsByTagName('input')[0];
		return (checkbox.checked)?(config.checked_value||true):(config.unchecked_value||false);
	},
	focus:function(node){
	}
};


});
