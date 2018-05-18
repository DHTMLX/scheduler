/*
@license
dhtmlxScheduler v.5.0.0 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
window.dhtmlXScheduler = window.scheduler = { version: "5.0.0" };

if (!window.dhtmlx) {
	dhtmlx = function(obj){
		for (var a in obj) dhtmlx[a]=obj[a];
		return dhtmlx; //simple singleton
	};
}
dhtmlx.extend_api=function(name,map,ext){
    var t = window[name];
    if (!t) return; //component not defined
    window[name]=function(obj){
        var that;

        if (obj && typeof obj == "object" && !obj.tagName){
            that = t.apply(this,(map._init?map._init(obj):arguments));
            //global settings
            for (var a in dhtmlx)
                if (map[a]) this[map[a]](dhtmlx[a]);
            //local settings
            for (var a in obj){
                if (map[a]) this[map[a]](obj[a]);
                else if (a.indexOf("on")===0){
                    this.attachEvent(a,obj[a]);
                }
            }
        } else
            that = t.apply(this,arguments);
        if (map._patch) map._patch(this);
        return that||this;
    };
    window[name].prototype=t.prototype;
    if (ext)
        dhtmlXHeir(window[name].prototype,ext);
};

dhtmlxAjax={
    get:function(url,callback){
        var t=new dtmlXMLLoaderObject(true);
        t.async=(arguments.length<3);
        t.waitCall=callback;
        t.loadXML(url);
        return t;
    },
    post:function(url,post,callback){
        var t=new dtmlXMLLoaderObject(true);
        t.async=(arguments.length<4);
        t.waitCall=callback;
        t.loadXML(url,true,post);
        return t;
    },
    getSync:function(url){
        return this.get(url,null,true);
    },
    postSync:function(url,post){
        return this.post(url,post,null,true);
    }
};

/**
 *     @desc: xmlLoader object
 *     @type: private
 *     @param: funcObject - xml parser function
 *     @param: object - jsControl object
 *     @param: async - sync/async mode (async by default)
 *     @param: rSeed - enable/disable random seed ( prevent IE caching)
 *     @topic: 0
 */
function dtmlXMLLoaderObject(funcObject, dhtmlObject, async, rSeed){
    this.xmlDoc="";

    if (typeof (async) != "undefined")
        this.async=async;
    else
        this.async=true;

    this.onloadAction=funcObject||null;
    this.mainObject=dhtmlObject||null;
    this.waitCall=null;
    this.rSeed=rSeed||false;
    return this;
}

window.dtmlXMLLoaderObject = dtmlXMLLoaderObject;

dtmlXMLLoaderObject.count = 0;

/**
 *     @desc: xml loading handler
 *     @type: private
 *     @param: dtmlObject - xmlLoader object
 *     @topic: 0
 */
dtmlXMLLoaderObject.prototype.waitLoadFunction=function(dhtmlObject){
    var once = true;
    this.check=function (){
        if ((dhtmlObject)&&(dhtmlObject.onloadAction)){
            if ((!dhtmlObject.xmlDoc.readyState)||(dhtmlObject.xmlDoc.readyState == 4)){
                if (!once)
                    return;

                once=false; //IE 5 fix
                dtmlXMLLoaderObject.count++;
                if (typeof dhtmlObject.onloadAction == "function")
                    dhtmlObject.onloadAction(dhtmlObject.mainObject, null, null, null, dhtmlObject);

                if (dhtmlObject.waitCall){
                    dhtmlObject.waitCall.call(this,dhtmlObject);
                    dhtmlObject.waitCall=null;
                }
            }
        }
    };
    return this.check;
};

/**
 *     @desc: return XML top node
 *     @param: tagName - top XML node tag name (not used in IE, required for Safari and Mozilla)
 *     @type: private
 *     @returns: top XML node
 *     @topic: 0
 */
dtmlXMLLoaderObject.prototype.getXMLTopNode=function(tagName, oldObj){
    var z;

    if (this.xmlDoc.responseXML){
        var temp = this.xmlDoc.responseXML.getElementsByTagName(tagName);
        if(temp.length === 0 && tagName.indexOf(":")!=-1)
            var temp = this.xmlDoc.responseXML.getElementsByTagName((tagName.split(":"))[1]);
        z = temp[0];
    } else
        z = this.xmlDoc.documentElement;

    if (z){
        this._retry=false;
        return z;
    }

    if (!this._retry&&_isIE){
        this._retry=true;
        var oldObj = this.xmlDoc;
        this.loadXMLString(this.xmlDoc.responseText.replace(/^[\s]+/,""), true);
        return this.getXMLTopNode(tagName, oldObj);
    }

    dhtmlxError.throwError("LoadXML", "Incorrect XML", [
        (oldObj||this.xmlDoc),
        this.mainObject
    ]);

    return document.createElement("div");
};

/**
 *     @desc: load XML from string
 *     @type: private
 *     @param: xmlString - xml string
 *     @topic: 0
 */
dtmlXMLLoaderObject.prototype.loadXMLString=function(xmlString, silent){

    if (!_isIE){
        var parser = new DOMParser();
        this.xmlDoc=parser.parseFromString(xmlString, "text/xml");
    } else {
        this.xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
        this.xmlDoc.async=this.async;
        this.xmlDoc.onreadystatechange = function(){};
        this.xmlDoc["loadXM"+"L"](xmlString);
    }

    if (silent)
        return;

    if (this.onloadAction)
        this.onloadAction(this.mainObject, null, null, null, this);

    if (this.waitCall){
        this.waitCall();
        this.waitCall=null;
    }
};
/**
 *     @desc: load XML
 *     @type: private
 *     @param: filePath - xml file path
 *     @param: postMode - send POST request
 *     @param: postVars - list of vars for post request
 *     @topic: 0
 */
dtmlXMLLoaderObject.prototype.loadXML=function(filePath, postMode, postVars, rpc){
    if (this.rSeed)
        filePath+=((filePath.indexOf("?") != -1) ? "&" : "?")+"a_dhx_rSeed="+(new Date()).valueOf();
    this.filePath=filePath;

    if ((!_isIE)&&(window.XMLHttpRequest))
        this.xmlDoc=new XMLHttpRequest();
    else {
        this.xmlDoc=new ActiveXObject("Microsoft.XMLHTTP");
    }

    if (this.async)
        this.xmlDoc.onreadystatechange=new this.waitLoadFunction(this);
    if (typeof postMode == "string")
        this.xmlDoc.open(postMode, filePath, this.async);
    else
        this.xmlDoc.open(postMode ? "POST" : "GET", filePath, this.async);

    if (rpc){
        this.xmlDoc.setRequestHeader("User-Agent", "dhtmlxRPC v0.1 ("+navigator.userAgent+")");
        this.xmlDoc.setRequestHeader("Content-type", "text/xml");
    }

    else if (postMode)
        this.xmlDoc.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    this.xmlDoc.setRequestHeader("X-Requested-With","XMLHttpRequest");
    this.xmlDoc.send(null||postVars);

    if (!this.async)
        (new this.waitLoadFunction(this))();
};
/**
 *     @desc: destructor, cleans used memory
 *     @type: private
 *     @topic: 0
 */
dtmlXMLLoaderObject.prototype.destructor=function(){
    this._filterXPath = null;
    this._getAllNamedChilds = null;
    this._retry = null;
    this.async = null;
    this.rSeed = null;
    this.filePath = null;
    this.onloadAction = null;
    this.mainObject = null;
    this.xmlDoc = null;
    this.doXPath = null;
    this.doXPathOpera = null;
    this.doXSLTransToObject = null;
    this.doXSLTransToString = null;
    this.loadXML = null;
    this.loadXMLString = null;
    // this.waitLoadFunction = null;
    this.doSerialization = null;
    this.xmlNodeToJSON = null;
    this.getXMLTopNode = null;
    this.setXSLParamValue = null;
    return null;
};

dtmlXMLLoaderObject.prototype.xmlNodeToJSON = function(node){
    var t={};
    for (var i=0; i<node.attributes.length; i++)
        t[node.attributes[i].name]=node.attributes[i].value;
    t["_tagvalue"]=node.firstChild?node.firstChild.nodeValue:"";
    for (var i=0; i<node.childNodes.length; i++){
        var name=node.childNodes[i].tagName;
        if (name){
            if (!t[name]) t[name]=[];
            t[name].push(this.xmlNodeToJSON(node.childNodes[i]));
        }
    }
    return t;
};

/**
 *     @desc: Convert string to it boolean representation
 *     @type: private
 *     @param: inputString - string for covertion
 *     @topic: 0
 */
function convertStringToBoolean(inputString){
    if (typeof (inputString) == "string")
        inputString=inputString.toLowerCase();

    switch (inputString){
        case "1":
        case "true":
        case "yes":
        case "y":
        case 1:
        case true:
            return true;
        default:
            return false;
    }
}

/**
 *     @desc: find out what symbol to use as url param delimiters in further params
 *     @type: private
 *     @param: str - current url string
 *     @topic: 0
 */
function getUrlSymbol(str){
    if (str.indexOf("?") != -1)
        return "&";
    else
        return "?";
}

function dhtmlDragAndDropObject(){
    if (window.dhtmlDragAndDrop)
        return window.dhtmlDragAndDrop;

    this.lastLanding=0;
    this.dragNode=0;
    this.dragStartNode=0;
    this.dragStartObject=0;
    this.tempDOMU=null;
    this.tempDOMM=null;
    this.waitDrag=0;
    window.dhtmlDragAndDrop=this;

    return this;
}

window.dhtmlDragAndDropObject = dhtmlDragAndDropObject;

dhtmlDragAndDropObject.prototype.removeDraggableItem=function(htmlNode){
    htmlNode.onmousedown=null;
    htmlNode.dragStarter=null;
    htmlNode.dragLanding=null;
};

dhtmlDragAndDropObject.prototype.addDraggableItem=function(htmlNode, dhtmlObject){
    htmlNode.onmousedown=this.preCreateDragCopy;
    htmlNode.dragStarter=dhtmlObject;
    this.addDragLanding(htmlNode, dhtmlObject);
};

dhtmlDragAndDropObject.prototype.addDragLanding=function(htmlNode, dhtmlObject){
    htmlNode.dragLanding=dhtmlObject;
};

dhtmlDragAndDropObject.prototype.preCreateDragCopy=function(e){
    if ((e||window.event) && (e||event).button == 2)
        return;

    if (window.dhtmlDragAndDrop.waitDrag){
        window.dhtmlDragAndDrop.waitDrag=0;
        document.body.onmouseup=window.dhtmlDragAndDrop.tempDOMU;
        document.body.onmousemove=window.dhtmlDragAndDrop.tempDOMM;
        return false;
    }

    if (window.dhtmlDragAndDrop.dragNode)
        window.dhtmlDragAndDrop.stopDrag(e);

    window.dhtmlDragAndDrop.waitDrag=1;
    window.dhtmlDragAndDrop.tempDOMU=document.body.onmouseup;
    window.dhtmlDragAndDrop.tempDOMM=document.body.onmousemove;
    window.dhtmlDragAndDrop.dragStartNode=this;
    window.dhtmlDragAndDrop.dragStartObject=this.dragStarter;
    document.body.onmouseup=window.dhtmlDragAndDrop.preCreateDragCopy;
    document.body.onmousemove=window.dhtmlDragAndDrop.callDrag;
    window.dhtmlDragAndDrop.downtime = new Date().valueOf();


    if ((e)&&(e.preventDefault)){
        e.preventDefault();
        return false;
    }
    return false;
};

dhtmlDragAndDropObject.prototype.callDrag=function(e){
    if (!e)
        e=window.event;
    var dragger=window.dhtmlDragAndDrop;
    if ((new Date()).valueOf()-dragger.downtime<100) return;

    //if ((e.button == 0)&&(_isIE))
    //	return dragger.stopDrag();

    if (!dragger.dragNode){
        if (dragger.waitDrag){
            dragger.dragNode=dragger.dragStartObject._createDragNode(dragger.dragStartNode, e);

            if (!dragger.dragNode)
                return dragger.stopDrag();

            dragger.dragNode.onselectstart=function(){return false;};
            dragger.gldragNode=dragger.dragNode;
            document.body.appendChild(dragger.dragNode);
            document.body.onmouseup=dragger.stopDrag;
            dragger.waitDrag=0;
            dragger.dragNode.pWindow=window;
            dragger.initFrameRoute();
        }
        else return dragger.stopDrag(e, true);
    }

    if (dragger.dragNode.parentNode != window.document.body && dragger.gldragNode){
        var grd = dragger.gldragNode;

        if (dragger.gldragNode.old)
            grd=dragger.gldragNode.old;

        //if (!document.all) dragger.calculateFramePosition();
        grd.parentNode.removeChild(grd);
        var oldBody = dragger.dragNode.pWindow;

        if (grd.pWindow &&	grd.pWindow.dhtmlDragAndDrop.lastLanding)
            grd.pWindow.dhtmlDragAndDrop.lastLanding.dragLanding._dragOut(grd.pWindow.dhtmlDragAndDrop.lastLanding);

        //		var oldp=dragger.dragNode.parentObject;
        if (_isIE){
            var div = document.createElement("div");
            div.innerHTML=dragger.dragNode.outerHTML;
            dragger.dragNode=div.childNodes[0];
        } else
            dragger.dragNode=dragger.dragNode.cloneNode(true);

        dragger.dragNode.pWindow=window;
        //		dragger.dragNode.parentObject=oldp;

        dragger.gldragNode.old=dragger.dragNode;
        document.body.appendChild(dragger.dragNode);
        oldBody.dhtmlDragAndDrop.dragNode=dragger.dragNode;
    }

    dragger.dragNode.style.left=e.clientX+15 + 
        (dragger.fx ? dragger.fx*(-1) : 0) +
        (document.body.scrollLeft||document.documentElement.scrollLeft)+"px";
    dragger.dragNode.style.top=e.clientY+3+
        (dragger.fy ? dragger.fy*(-1) : 0) +
        (document.body.scrollTop||document.documentElement.scrollTop)+"px";

    var z;
    if (!e.srcElement)
        z = e.target;
    else
        z=e.srcElement;
    dragger.checkLanding(z, e);
};

dhtmlDragAndDropObject.prototype.calculateFramePosition=function(n){
    //this.fx = 0, this.fy = 0;
    if (window.name){
        var el = parent.frames[window.name].frameElement.offsetParent;
        var fx = 0;
        var fy = 0;

        while (el){
            fx+=el.offsetLeft;
            fy+=el.offsetTop;
            el=el.offsetParent;
        }

        if ((parent.dhtmlDragAndDrop)){
            var ls = parent.dhtmlDragAndDrop.calculateFramePosition(1);
            fx+=ls.split('_')[0]*1;
            fy+=ls.split('_')[1]*1;
        }

        if (n)
            return fx+"_"+fy;
        else
            this.fx=fx;
        this.fy=fy;
    }
    return "0_0";
};

dhtmlDragAndDropObject.prototype.checkLanding=function(htmlObject, e){
    if ((htmlObject)&&(htmlObject.dragLanding)){
        if (this.lastLanding)
            this.lastLanding.dragLanding._dragOut(this.lastLanding);
        this.lastLanding=htmlObject;
        this.lastLanding=this.lastLanding.dragLanding._dragIn(this.lastLanding, this.dragStartNode, e.clientX,
            e.clientY, e);
        this.lastLanding_scr=(_isIE ? e.srcElement : e.target);
    } else {
        if ((htmlObject)&&(htmlObject.tagName != "BODY"))
            this.checkLanding(htmlObject.parentNode, e);
        else {
            if (this.lastLanding)
                this.lastLanding.dragLanding._dragOut(this.lastLanding, e.clientX, e.clientY, e);
            this.lastLanding=0;

            if (this._onNotFound)
                this._onNotFound();
        }
    }
};

dhtmlDragAndDropObject.prototype.stopDrag=function(e, mode){
    var dragger=window.dhtmlDragAndDrop;

    if (!mode){
        dragger.stopFrameRoute();
        var temp = dragger.lastLanding;
        dragger.lastLanding=null;

        if (temp)
            temp.dragLanding._drag(dragger.dragStartNode, dragger.dragStartObject, temp,
                (_isIE ? event.srcElement : e.target));
    }
    dragger.lastLanding=null;

    if ((dragger.dragNode)&&(dragger.dragNode.parentNode == document.body))
        dragger.dragNode.parentNode.removeChild(dragger.dragNode);
    dragger.dragNode=0;
    dragger.gldragNode=0;
    dragger.fx=0;
    dragger.fy=0;
    dragger.dragStartNode=0;
    dragger.dragStartObject=0;
    document.body.onmouseup=dragger.tempDOMU;
    document.body.onmousemove=dragger.tempDOMM;
    dragger.tempDOMU=null;
    dragger.tempDOMM=null;
    dragger.waitDrag=0;
};

dhtmlDragAndDropObject.prototype.stopFrameRoute=function(win){
    if (win)
        window.dhtmlDragAndDrop.stopDrag(1, 1);

    for (var i = 0; i < window.frames.length; i++){
        try{
            if ((window.frames[i] != win)&&(window.frames[i].dhtmlDragAndDrop))
                window.frames[i].dhtmlDragAndDrop.stopFrameRoute(window);
        } catch(e){}
    }

    try{
        if ((parent.dhtmlDragAndDrop)&&(parent != window)&&(parent != win))
            parent.dhtmlDragAndDrop.stopFrameRoute(window);
    } catch(e){}
};

dhtmlDragAndDropObject.prototype.initFrameRoute=function(win, mode){
    if (win){
        window.dhtmlDragAndDrop.preCreateDragCopy();
        window.dhtmlDragAndDrop.dragStartNode=win.dhtmlDragAndDrop.dragStartNode;
        window.dhtmlDragAndDrop.dragStartObject=win.dhtmlDragAndDrop.dragStartObject;
        window.dhtmlDragAndDrop.dragNode=win.dhtmlDragAndDrop.dragNode;
        window.dhtmlDragAndDrop.gldragNode=win.dhtmlDragAndDrop.dragNode;
        window.document.body.onmouseup=window.dhtmlDragAndDrop.stopDrag;
        window.waitDrag=0;

        if (((!_isIE)&&(mode))&&((!_isFF)||(_FFrv < 1.8)))
            window.dhtmlDragAndDrop.calculateFramePosition();
    }
    try{
        if ((parent.dhtmlDragAndDrop)&&(parent != window)&&(parent != win))
            parent.dhtmlDragAndDrop.initFrameRoute(window);
    }catch(e){}

    for (var i = 0; i < window.frames.length; i++){
        try{
            if ((window.frames[i] != win)&&(window.frames[i].dhtmlDragAndDrop))
                window.frames[i].dhtmlDragAndDrop.initFrameRoute(window, ((!win||mode) ? 1 : 0));
        } catch(e){}
    }
};

_isFF = false;
_isIE = false;
_isOpera = false;
_isKHTML = false;
_isMacOS = false;
_isChrome = false;
_FFrv = false;
_KHTMLrv = false;
_OperaRv = false;

if (navigator.userAgent.indexOf('Macintosh') != -1)
    _isMacOS=true;


if (navigator.userAgent.toLowerCase().indexOf('chrome')>-1)
    _isChrome=true;

if ((navigator.userAgent.indexOf('Safari') != -1)||(navigator.userAgent.indexOf('Konqueror') != -1)){
    _KHTMLrv = parseFloat(navigator.userAgent.substr(navigator.userAgent.indexOf('Safari')+7, 5));

    if (_KHTMLrv > 525){ //mimic FF behavior for Safari 3.1+
        _isFF=true;
        _FFrv = 1.9;
    } else
        _isKHTML=true;
} else if (navigator.userAgent.indexOf('Opera') != -1){
    _isOpera=true;
    _OperaRv=parseFloat(navigator.userAgent.substr(navigator.userAgent.indexOf('Opera')+6, 3));
}


else if (navigator.appName.indexOf("Microsoft") != -1){
    _isIE=true;
    if ((navigator.appVersion.indexOf("MSIE 8.0")!= -1 || navigator.appVersion.indexOf("MSIE 9.0")!= -1 || navigator.appVersion.indexOf("MSIE 10.0")!= -1 ) && document.compatMode != "BackCompat"){
        _isIE=8;
    }
} else if (navigator.appName  == 'Netscape' && navigator.userAgent.indexOf("Trident") != -1){
	//ie11
	_isIE=8;
} else {
    _isFF=true;
    _FFrv = parseFloat(navigator.userAgent.split("rv:")[1]);
}


//multibrowser Xpath processor
dtmlXMLLoaderObject.prototype.doXPath=function(xpathExp, docObj, namespace, result_type){
    if (_isKHTML || (!_isIE && !window.XPathResult))
        return this.doXPathOpera(xpathExp, docObj);

    if (_isIE){ //IE
        if (!docObj)
            if (!this.xmlDoc.nodeName)
                docObj=this.xmlDoc.responseXML;
            else
                docObj=this.xmlDoc;

        if (!docObj)
            dhtmlxError.throwError("LoadXML", "Incorrect XML", [
                (docObj||this.xmlDoc),
                this.mainObject
            ]);

        if (namespace)
            docObj.setProperty("SelectionNamespaces", "xmlns:xsl='"+namespace+"'"); //

        if (result_type == 'single'){
            return docObj.selectSingleNode(xpathExp);
        }
        else {
            return docObj.selectNodes(xpathExp)||new Array(0);
        }
    } else { //Mozilla
        var nodeObj = docObj;

        if (!docObj){
            if (!this.xmlDoc.nodeName){
                docObj=this.xmlDoc.responseXML;
            }
            else {
                docObj=this.xmlDoc;
            }
        }

        if (!docObj)
            dhtmlxError.throwError("LoadXML", "Incorrect XML", [
                (docObj||this.xmlDoc),
                this.mainObject
            ]);

        if (docObj.nodeName.indexOf("document") != -1){
            nodeObj=docObj;
        }
        else {
            nodeObj=docObj;
            docObj=docObj.ownerDocument;
        }
        var retType = XPathResult.ANY_TYPE;

        if (result_type == 'single')
            retType=XPathResult.FIRST_ORDERED_NODE_TYPE;
        var rowsCol = [];
        var col = docObj.evaluate(xpathExp, nodeObj, function(pref){
            return namespace;
        }, retType, null);

        if (retType == XPathResult.FIRST_ORDERED_NODE_TYPE){
            return col.singleNodeValue;
        }
        var thisColMemb = col.iterateNext();

        while (thisColMemb){
            rowsCol[rowsCol.length]=thisColMemb;
            thisColMemb=col.iterateNext();
        }
        return rowsCol;
    }
};

function _dhtmlxError(type, name, params){
    if (!this.catches)
        this.catches=[];

    return this;
}

_dhtmlxError.prototype.catchError=function(type, func_name){
    this.catches[type]=func_name;
};

_dhtmlxError.prototype.throwError=function(type, name, params){
    if (this.catches[type])
        return this.catches[type](type, name, params);

    if (this.catches["ALL"])
        return this.catches["ALL"](type, name, params);

    window.alert("Error type: "+arguments[0]+"\nDescription: "+arguments[1]);
    return null;
};

window.dhtmlxError=new _dhtmlxError();


//opera fake, while 9.0 not released
//multibrowser Xpath processor
dtmlXMLLoaderObject.prototype.doXPathOpera=function(xpathExp, docObj){
    //this is fake for Opera
    var z = xpathExp.replace(/[\/]+/gi, "/").split('/');
    var obj = null;
    var i = 1;

    if (!z.length)
        return [];

    if (z[0] == ".")
        obj=[docObj]; else if (z[0] === ""){
        obj=(this.xmlDoc.responseXML||this.xmlDoc).getElementsByTagName(z[i].replace(/\[[^\]]*\]/g, ""));
        i++;
    } else
        return [];

    for (i; i < z.length; i++)obj=this._getAllNamedChilds(obj, z[i]);

    if (z[i-1].indexOf("[") != -1)
        obj=this._filterXPath(obj, z[i-1]);
    return obj;
};

dtmlXMLLoaderObject.prototype._filterXPath=function(a, b){
    var c = [];
    var b = b.replace(/[^\[]*\[\@/g, "").replace(/[\[\]\@]*/g, "");

    for (var i = 0; i < a.length; i++)
        if (a[i].getAttribute(b))
            c[c.length]=a[i];

    return c;
};

dtmlXMLLoaderObject.prototype._getAllNamedChilds=function(a, b){
    var c = [];

    if (_isKHTML)
        b=b.toUpperCase();

    for (var i = 0; i < a.length; i++)for (var j = 0; j < a[i].childNodes.length; j++){
        if (_isKHTML){
            if (a[i].childNodes[j].tagName&&a[i].childNodes[j].tagName.toUpperCase() == b)
                c[c.length]=a[i].childNodes[j];
        }

        else if (a[i].childNodes[j].tagName == b)
            c[c.length]=a[i].childNodes[j];
    }

    return c;
};

function dhtmlXHeir(a, b){
    for (var c in b)
        if (typeof (b[c]) == "function")
            a[c]=b[c];
    return a;
}

if(typeof (window.dhtmlxEvent) == 'undefined'){
    window.dhtmlxEvent = function dhtmlxEvent(el, event, handler){
        if (el.addEventListener)
            el.addEventListener(event, handler, false);

        else if (el.attachEvent)
            el.attachEvent("on"+event, handler);
    };
}

//============= XSL Extension ===================================

dtmlXMLLoaderObject.prototype.xslDoc=null;
dtmlXMLLoaderObject.prototype.setXSLParamValue=function(paramName, paramValue, xslDoc){
    if (!xslDoc)
        xslDoc=this.xslDoc;

    if (xslDoc.responseXML)
        xslDoc=xslDoc.responseXML;
    var item =
        this.doXPath("/xsl:stylesheet/xsl:variable[@name='"+paramName+"']", xslDoc,
            "http:/\/www.w3.org/1999/XSL/Transform", "single");

    if (item)
        item.firstChild.nodeValue=paramValue;
};

dtmlXMLLoaderObject.prototype.doXSLTransToObject=function(xslDoc, xmlDoc){
    if (!xslDoc)
        xslDoc=this.xslDoc;

    if (xslDoc.responseXML)
        xslDoc=xslDoc.responseXML;

    if (!xmlDoc)
        xmlDoc=this.xmlDoc;

    if (xmlDoc.responseXML)
        xmlDoc=xmlDoc.responseXML;

    
    var result;
    //Mozilla
    if (!_isIE){
        if (!this.XSLProcessor){
            this.XSLProcessor=new XSLTProcessor();
            this.XSLProcessor.importStylesheet(xslDoc);
        }
        result = this.XSLProcessor.transformToDocument(xmlDoc);
    } else {
        result = new ActiveXObject("Msxml2.DOMDocument.3.0");
        try{
            xmlDoc.transformNodeToObject(xslDoc, result);
        }catch(e){
            result = xmlDoc.transformNode(xslDoc);
        }
    }
    return result;
};

dtmlXMLLoaderObject.prototype.doXSLTransToString=function(xslDoc, xmlDoc){
    var res = this.doXSLTransToObject(xslDoc, xmlDoc);
    if(typeof(res)=="string")
        return res;
    return this.doSerialization(res);
};

dtmlXMLLoaderObject.prototype.doSerialization=function(xmlDoc){
    if (!xmlDoc)
        xmlDoc=this.xmlDoc;
    if (xmlDoc.responseXML)
        xmlDoc=xmlDoc.responseXML;
    if (!_isIE){
        var xmlSerializer = new XMLSerializer();
        return xmlSerializer.serializeToString(xmlDoc);
    } else
        return xmlDoc.xml;
};

/**
 *   @desc:
 *   @type: private
 */
dhtmlxEventable=function(obj){
    obj.attachEvent=function(name, catcher, callObj){
        name='ev_'+name.toLowerCase();
        if (!this[name])
            this[name]=new this.eventCatcher(callObj||this);

        return(name+':'+this[name].addEvent(catcher)); //return ID (event name & event ID)
    };
    obj.callEvent=function(name, arg0){
        name='ev_'+name.toLowerCase();
        if (this[name])
            return this[name].apply(this, arg0);
        return true;
    };
    obj.checkEvent=function(name){
        return (!!this['ev_'+name.toLowerCase()]);
    };
    obj.eventCatcher=function(obj){
        var dhx_catch = [];
        var z = function(){
            var res = true;
            for (var i = 0; i < dhx_catch.length; i++){
                if (dhx_catch[i]){
                    var zr = dhx_catch[i].apply(obj, arguments);
                    res=res&&zr;
                }
            }
            return res;
        };
        z.addEvent=function(ev){
            if (typeof (ev) != "function")
                ev=eval(ev);
            if (ev)
                return dhx_catch.push(ev)-1;
            return false;
        };
        z.removeEvent=function(id){
            dhx_catch[id]=null;
        };
        return z;
    };
    obj.detachEvent=function(id){
        if (id){
            var list = id.split(':');           //get EventName and ID
            this[list[0]].removeEvent(list[1]); //remove event
        }
    };
    obj.detachAllEvents = function(){
        for (var name in this){
            if (name.indexOf("ev_")===0){
                this.detachEvent(name);
                this[name] = null;
            }
        }
    };
    obj = null;
};
scheduler.event = window.dhtmlxEvent;

scheduler.eventRemove = function(el, event, handler){
	if (el.removeEventListener)
		el.removeEventListener(event, handler, false);

	else if (el.detachEvent)
		el.detachEvent("on"+event, handler);
};

(function(){
	function isVisible(node){
		var display = false,
			visibility = false;
		if(window.getComputedStyle){
			var style = window.getComputedStyle(node, null);
			display = style["display"];
			visibility = style["visibility"];
		}else if(node.currentStyle){
			display = node.currentStyle["display"];
			visibility = node.currentStyle["visibility"];
		}

		var hiddenSection = false;
		var recurringSection = scheduler._locate_css({target:node}, "dhx_form_repeat", false);
		if(recurringSection){
			hiddenSection = !!(recurringSection.style.height == "0px");
		}
		hiddenSection = hiddenSection || !(node.offsetHeight);

		return (display != "none" && visibility != "hidden" && !hiddenSection);
	}

	function hasNonNegativeTabIndex(node){
		return !isNaN(node.getAttribute("tabindex")) && (node.getAttribute("tabindex")*1 >= 0);
	}

	function hasHref(node){
		var canHaveHref = {"a": true, "area": true};
		if(canHaveHref[node.nodeName.loLowerCase()]){
			return !!node.getAttribute("href");
		}
		return true;
	}

	function isEnabled(node){
		var canDisable = {"input":true, "select":true, "textarea":true, "button":true, "object":true};
		if(canDisable[node.nodeName.toLowerCase()]){
			return !node.hasAttribute("disabled");
		}

		return true;
	}


	scheduler._getFocusableNodes = function getFocusableNodes(root){
		var nodes = root.querySelectorAll([
			"a[href]",
			"area[href]",
			"input",
			"select",
			"textarea",
			"button",
			"iframe",
			"object",
			"embed",
			"[tabindex]",
			"[contenteditable]"
		].join(", "));

		var nodesArray = Array.prototype.slice.call(nodes, 0);
		for(var i = 0; i < nodesArray.length; i++){
			var node = nodesArray[i];
			var isValid = (hasNonNegativeTabIndex(node)  || isEnabled(node) || hasHref(node)) && isVisible(node);
			if(!isValid){
				nodesArray.splice(i, 1);
				i--;
			}
		}
		return nodesArray;
	};
})();

scheduler._trim = function(str){
	var func = String.prototype.trim || function(){ return this.replace(/^\s+|\s+$/g, ""); };
	return func.apply(str);
};

scheduler._isDate = function(obj){
	if (obj && typeof obj == "object") {
		return !!(obj.getFullYear && obj.getMonth && obj.getDate);
	} else {
		return false;
	}
};

scheduler._isObject = function(obj){
	return (obj && typeof obj == "object");
};
if(!window.dhtmlx)
	window.dhtmlx = {};

(function(){
	var _dhx_msg_cfg = null;
	function callback(config, result){
		setTimeout(function(){
			if(!config.box) return;

			var usercall = config.callback;
			modality(false);
			config.box.parentNode.removeChild(config.box);
			dhtmlx.callEvent("onAfterMessagePopup", [config.box]);
			_dhx_msg_cfg = config.box = null;

			if (usercall)
				usercall(result);
		},1);
	}

	function modal_key(e){
		if (_dhx_msg_cfg){
			e = e||event;
			var code = e.which||event.keyCode;
			var preventDefault = false;

			if (dhtmlx.message.keyboard){
				if (code == 13 || code == 32){
					// default behavior is to confirm/submit popup on space/enter
					// if browser focus is set on button element - do button click instead of default behavior
					var target = e.target || e.srcElement;
					if(scheduler._getClassName(target).indexOf("dhtmlx_popup_button") > -1 && target.click){
						target.click();
					}else{
						callback(_dhx_msg_cfg, true);
						preventDefault = true;
					}
				}

				if (code == 27){
					callback(_dhx_msg_cfg, false);
					preventDefault = true;
				}
			}

			if(preventDefault){
				if (e.preventDefault)
					e.preventDefault();
				return !(e.cancelBubble = true);
			}
			return;
		}
	}
	if (document.attachEvent)
		document.attachEvent("onkeydown", modal_key);
	else
		document.addEventListener("keydown", modal_key, true);
		
	function modality(mode){
		if(!modality.cover){
			modality.cover = document.createElement("div");
			//necessary for IE only
			modality.cover.onkeydown = modal_key;
			modality.cover.className = "dhx_modal_cover";
			document.body.appendChild(modality.cover);
		}
		var height =  document.body.scrollHeight;
		modality.cover.style.display = mode?"inline-block":"none";
	}

	function button(text, result, css){
		var buttonAriaAttrs = scheduler._waiAria.messageButtonAttrString(text);
		// css - for locale-independent class name
		var className = css ? css : (text || "");
		var button_css = "dhtmlx_"+(className).toLowerCase().replace(/ /g, "_")+"_button"; // dhtmlx_ok_button, dhtmlx_click_me_button
		return "<div "+buttonAriaAttrs+"class='dhtmlx_popup_button "+button_css+"' result='"+result+"' ><div>"+text+"</div></div>";
	}

	function info(text){
		if (!t.area){
			t.area = document.createElement("div");
			t.area.className = "dhtmlx_message_area";
			t.area.style[t.position]="5px";
			document.body.appendChild(t.area);
		}

		t.hide(text.id);
		var message = document.createElement("div");
		message.innerHTML = "<div>"+text.text+"</div>";
		message.className = "dhtmlx-info dhtmlx-" + text.type;
		message.onclick = function(){
			t.hide(text.id);
			text = null;
		};

		scheduler._waiAria.messageInfoAttr(message);

		if (t.position == "bottom" && t.area.firstChild)
			t.area.insertBefore(message,t.area.firstChild);
		else
			t.area.appendChild(message);
		
		if (text.expire > 0)
			t.timers[text.id]=window.setTimeout(function(){
				t.hide(text.id);
			}, text.expire);

		t.pull[text.id] = message;
		message = null;

		return text.id;
	}
	function _boxStructure(config, ok, cancel){
		var box = document.createElement("div");
		box.className = " dhtmlx_modal_box dhtmlx-"+config.type;
		box.setAttribute("dhxbox", 1);

		var contentId = scheduler.uid();
		scheduler._waiAria.messageModalAttr(box, contentId);

		var inner = '';

		var hasTitle = false;
		if (config.width)
			box.style.width = config.width;
		if (config.height)
			box.style.height = config.height;
		if (config.title) {
			inner += '<div class="dhtmlx_popup_title" id="'+contentId+'">' + config.title + '</div>';
			hasTitle = true;
		}

		inner+='<div class="dhtmlx_popup_text" '+(!hasTitle ? ' id="'+contentId+'" ' : "")+'><span>'+(config.content?'':config.text)+'</span></div><div  class="dhtmlx_popup_controls">';
		if (ok){
			var ok_text = (config.ok || scheduler.locale.labels.message_ok);
			//default value for compatibility with custom locales some people have
			if(ok_text === undefined) ok_text = "OK";
			inner += button(ok_text, true, "ok");
		}
		if (cancel){
			var cancel_text = (config.cancel || scheduler.locale.labels.message_cancel);
			if(cancel_text === undefined) cancel_text = "Cancel";
			inner += button(cancel_text, false, "cancel");
		}
		if (config.buttons){
			for (var i=0; i<config.buttons.length; i++)
				inner += button(config.buttons[i],i);
		}
		inner += '</div>';
		box.innerHTML = inner;

		if (config.content){
			var node = config.content;
			if (typeof node == "string") 
				node = document.getElementById(node);
			if (node.style.display == 'none')
				node.style.display = "";
			box.childNodes[config.title?1:0].appendChild(node);
		}

		box.onclick = function(e){
			e = e ||event;
			var source = e.target || e.srcElement;
			var className = scheduler._getClassName(source);
			if (!className) source = source.parentNode;

			className = scheduler._getClassName(source);

			if (className.split(" ")[0] == "dhtmlx_popup_button"){
				var result = source.getAttribute("result");
				result = (result == "true")||(result == "false"?false:result);
				callback(config, result);
			}
		};
		config.box = box;
		//if (ok||cancel)
		_dhx_msg_cfg = config;

		return box;
	}
	function _createBox(config, ok, cancel){
		var box = config.tagName ? config : _boxStructure(config, ok, cancel);
		
		if (!config.hidden)
			modality(true);
		document.body.appendChild(box);
		var x = Math.abs(Math.floor(((window.innerWidth||document.documentElement.offsetWidth) - box.offsetWidth)/2));
		var y = Math.abs(Math.floor(((window.innerHeight||document.documentElement.offsetHeight) - box.offsetHeight)/2));
		if (config.position == "top")
			box.style.top = "-3px";
		else
			box.style.top = y+'px';
		box.style.left = x+'px';
		//necessary for IE only
		box.onkeydown = modal_key;

		dhtmlx.modalbox.focus(box);

		if (config.hidden)
			dhtmlx.modalbox.hide(box);

		dhtmlx.callEvent("onMessagePopup", [box]);
		return box;
	}

	function alertPopup(config){
		return _createBox(config, true, false);
	}
	function confirmPopup(config){
		return _createBox(config, true, true);
	}
	function boxPopup(config){
		return _createBox(config);
	}
	function box_params(text, type, callback){
		if (typeof text != "object"){
			if (typeof type == "function"){
				callback = type;
				type = "";
			}
			text = {text:text, type:type, callback:callback };
		}
		return text;
	}
	function params(text, type, expire, id){
		if (typeof text != "object")
			text = {text:text, type:type, expire:expire, id:id};
		text.id = text.id||t.uid();
		text.expire = text.expire||t.expire;
		return text;
	}
	dhtmlx.alert = function(){
		var text = box_params.apply(this, arguments);
		text.type = text.type || "confirm";
		return alertPopup(text);
	};
	dhtmlx.confirm = function(){
		var text = box_params.apply(this, arguments);
		text.type = text.type || "alert";
		return confirmPopup(text);
	};
	dhtmlx.modalbox = function(){
		var text = box_params.apply(this, arguments);
		text.type = text.type || "alert";
		return boxPopup(text);
	};
	dhtmlx.modalbox.hide = function(node){
		while (node && node.getAttribute && !node.getAttribute("dhxbox"))
			node = node.parentNode;
		if (node){
			node.parentNode.removeChild(node);
			modality(false);
		}
	};

	dhtmlx.modalbox.focus = function(node){
		setTimeout(function(){
			var focusable = scheduler._getFocusableNodes(node);
			if(focusable.length){
				if(focusable[0].focus) focusable[0].focus();
			}
		}, 1);
	};

	var t = dhtmlx.message = function(text, type, expire, id){
		text = params.apply(this, arguments);
		text.type = text.type||"info";

		var subtype = text.type.split("-")[0];
		switch (subtype){
			case "alert":
				return alertPopup(text);
			case "confirm":
				return confirmPopup(text);
			case "modalbox":
				return boxPopup(text);
			default:
				return info(text);
		}
	};

	t.seed = (new Date()).valueOf();
	t.uid = function(){return t.seed++;};
	t.expire = 4000;
	t.keyboard = true;
	t.position = "top";
	t.pull = {};
	t.timers = {};

	t.hideAll = function(){
		for (var key in t.pull)
			t.hide(key);
	};
	t.hide = function(id){
		var obj = t.pull[id];
		if (obj && obj.parentNode){
			window.setTimeout(function(){
				obj.parentNode.removeChild(obj);
				obj = null;
			},2000);
			obj.className+=" hidden";
			
			if(t.timers[id])
				window.clearTimeout(t.timers[id]);
			delete t.pull[id];
		}
	};
})();
if(!dhtmlx.attachEvent){
	dhtmlxEventable(dhtmlx);
}
/**
 *	@desc: constructor, data processor object
 *	@param: serverProcessorURL - url used for update
 *	@type: public
 */
var dataProcessor = window.dataProcessor = function (serverProcessorURL) {
	this.serverProcessor = serverProcessorURL;
	this.action_param = "!nativeeditor_status";

	this.object = null;
	this.updatedRows = []; //ids of updated rows

	this.autoUpdate = true;
	this.updateMode = "cell";
	this._tMode = "GET";
	this._headers = null;
	this._payload = null;
	this.post_delim = "_";

	this._waitMode = 0;
	this._in_progress = {};//?
	this._invalid = {};
	this.mandatoryFields = [];
	this.messages = [];

	this.styles = {
		updated: "font-weight:bold;",
		inserted: "font-weight:bold;",
		deleted: "text-decoration : line-through;",
		invalid: "background-color:FFE0E0;",
		invalid_cell: "border-bottom:2px solid red;",
		error: "color:red;",
		clear: "font-weight:normal;text-decoration:none;"
	};

	this.enableUTFencoding(true);
	dhtmlxEventable(this);

	return this;
};

dataProcessor.prototype = {
	setTransactionMode: function (mode, total) {
		if (typeof mode == "object") {
			this._tMode = mode.mode || this._tMode;

			if (mode.headers !== undefined) {
				this._headers = mode.headers;
			}

			if (mode.payload !== undefined) {
				this._payload = mode.payload;
			}

		} else {
			this._tMode = mode;
			this._tSend = total;
		}

		if (this._tMode == "REST") {
			this._tSend = false;
			this._endnm = true;
		}

		if (this._tMode == "JSON") {
			this._tSend = false;
			this._endnm = true;
			this._headers = this._headers || {};
			this._headers["Content-type"] = "application/json";
		}
	},
	escape: function (data) {
		if (this._utf)
			return encodeURIComponent(data);
		else
			return escape(data);
	},
	/**
	 *	@desc: allows to set escaping mode
	 *	@param: true - utf based escaping, simple - use current page encoding
	 *	@type: public
	 */
	enableUTFencoding: function (mode) {
		this._utf = !!mode;
	},
	/**
	 *	@desc: allows to define, which column may trigger update
	 *	@param: val - array or list of true/false values
	 *	@type: public
	 */
	setDataColumns: function (val) {
		this._columns = (typeof val == "string") ? val.split(",") : val;
	},
	/**
	 *	@desc: get state of updating
	 *	@returns:   true - all in sync with server, false - some items not updated yet.
	 *	@type: public
	 */
	getSyncState: function () {
		return !this.updatedRows.length;
	},
	/**
	 *	@desc: enable/disable named field for data syncing, will use column ids for grid
	 *	@param:   mode - true/false
	 *	@type: public
	 */
	enableDataNames: function (mode) {
		this._endnm = !!mode;
	},
	/**
	 *	@desc: enable/disable mode , when only changed fields and row id send to the server side, instead of all fields in default mode
	 *	@param:   mode - true/false
	 *	@type: public
	 */
	enablePartialDataSend: function (mode) {
		this._changed = !!mode;
	},
	/**
	 *	@desc: set if rows should be send to server automaticaly
	 *	@param: mode - "row" - based on row selection changed, "cell" - based on cell editing finished, "off" - manual data sending
	 *	@type: public
	 */
	setUpdateMode: function (mode, dnd) {
		this.autoUpdate = (mode == "cell");
		this.updateMode = mode;
		this.dnd = dnd;
	},
	ignore: function (code, master) {
		this._silent_mode = true;
		code.call(master || window);
		this._silent_mode = false;
	},
	/**
	 *	@desc: mark row as updated/normal. check mandatory fields,initiate autoupdate (if turned on)
	 *	@param: rowId - id of row to set update-status for
	 *	@param: state - true for "updated", false for "not updated"
	 *	@param: mode - update mode name
	 *	@type: public
	 */
	setUpdated: function (rowId, state, mode) {
		if (this._silent_mode) return;
		var ind = this.findRow(rowId);

		mode = mode || "updated";
		var existing = this.obj.getUserData(rowId, this.action_param);
		if (existing && mode == "updated") mode = existing;
		if (state) {
			this.set_invalid(rowId, false); //clear previous error flag
			this.updatedRows[ind] = rowId;
			this.obj.setUserData(rowId, this.action_param, mode);
			if (this._in_progress[rowId])
				this._in_progress[rowId] = "wait";
		} else {
			if (!this.is_invalid(rowId)) {
				this.updatedRows.splice(ind, 1);
				this.obj.setUserData(rowId, this.action_param, "");
			}
		}

		//clear changed flag
		if (!state)
			this._clearUpdateFlag(rowId);

		this.markRow(rowId, state, mode);
		if (state && this.autoUpdate) this.sendData(rowId);
	},
	_clearUpdateFlag: function (id) {
	},
	markRow: function (id, state, mode) {
		var str = "";
		var invalid = this.is_invalid(id);
		if (invalid) {
			str = this.styles[invalid];
			state = true;
		}
		if (this.callEvent("onRowMark", [id, state, mode, invalid])) {
			//default logic
			str = this.styles[state ? mode : "clear"] + str;

			this.obj[this._methods[0]](id, str);

			if (invalid && invalid.details) {
				str += this.styles[invalid + "_cell"];
				for (var i = 0; i < invalid.details.length; i++)
					if (invalid.details[i])
						this.obj[this._methods[1]](id, i, str);
			}
		}
	},
	getState: function (id) {
		return this.obj.getUserData(id, this.action_param);
	},
	is_invalid: function (id) {
		return this._invalid[id];
	},
	set_invalid: function (id, mode, details) {
		if (details) mode = {
			value: mode, details: details, toString: function () {
				return this.value.toString();
			}
		};
		this._invalid[id] = mode;
	},
	/**
	 *	@desc: check mandatory fields and varify values of cells, initiate update (if specified)
	 *	@param: rowId - id of row to set update-status for
	 *	@type: public
	 */
	checkBeforeUpdate: function (rowId) {
		return true;
	},
	/**
	 *	@desc: send row(s) values to server
	 *	@param: rowId - id of row which data to send. If not specified, then all "updated" rows will be send
	 *	@type: public
	 */
	sendData: function (rowId) {
		if (this._waitMode && (this.obj.mytype == "tree" || this.obj._h2)) return;
		if (this.obj.editStop) this.obj.editStop();


		if (typeof rowId == "undefined" || this._tSend) return this.sendAllData();
		if (this._in_progress[rowId]) return false;

		this.messages = [];
		if (!this.checkBeforeUpdate(rowId) && this.callEvent("onValidationError", [rowId, this.messages])) return false;
		this._beforeSendData(this._getRowData(rowId), rowId);
	},
	_beforeSendData: function (data, rowId) {
		if (!this.callEvent("onBeforeUpdate", [rowId, this.getState(rowId), data])) return false;
		this._sendData(data, rowId);
	},
	serialize: function (data, id) {
		if (typeof data == "string")
			return data;
		if (typeof id != "undefined")
			return this.serialize_one(data, "");
		else {
			var stack = [];
			var keys = [];
			for (var key in data)
				if (data.hasOwnProperty(key)) {
					stack.push(this.serialize_one(data[key], key + this.post_delim));
					keys.push(key);
				}
			stack.push("ids=" + this.escape(keys.join(",")));
			if (dhtmlx.security_key)
				stack.push("dhx_security=" + dhtmlx.security_key);
			return stack.join("&");
		}
	},
	serialize_one: function (data, pref) {
		if (typeof data == "string")
			return data;
		var stack = [];
		for (var key in data)
			if (data.hasOwnProperty(key)) {
				if ((key == "id" || key == this.action_param) && this._tMode == "REST") continue;
				stack.push(this.escape((pref || "") + key) + "=" + this.escape(data[key]));
			}
		return stack.join("&");
	},
	_applyPayload: function (url) {
		var ajax = this.obj.$ajax;
		if (this._payload)
			for (var key in this._payload)
				url = url + ajax.urlSeparator(url) + this.escape(key) + "=" + this.escape(this._payload[key]);
		return url;
	},
	_sendData: function (a1, rowId) {
		if (!a1) return; //nothing to send
		if (!this.callEvent("onBeforeDataSending", rowId ? [rowId, this.getState(rowId), a1] : [null, null, a1])) return false;

		if (rowId)
			this._in_progress[rowId] = (new Date()).valueOf();

		var that = this;
		var back = function (xml) {
			var ids = [];
			if (rowId)
				ids.push(rowId);
			else if (a1)
				for (var key in a1)
					ids.push(key);

			return that.afterUpdate(that, xml, ids);
		};
		var ajax = this.obj.$ajax;

		var a3 = this.serverProcessor + (this._user ? (ajax.urlSeparator(this.serverProcessor) + ["dhx_user=" + this._user, "dhx_version=" + this.obj.getUserData(0, "version")].join("&")) : "");
		var a4 = this._applyPayload(a3);

		if (this._tMode == "GET") {
			ajax.query({
				url: a4 + ajax.urlSeparator(a4) + this.serialize(a1, rowId),
				method: "GET",
				callback: back,
				headers: this._headers
			});
		} else if (this._tMode == "POST") {
			ajax.query({
				url: a4,
				method: "POST",
				headers: this._headers,
				data: this.serialize(a1, rowId),
				callback: back
			});
		} else if (this._tMode == "JSON") {
			var action = a1[this.action_param];
			var data = {};
			for (var key in a1) data[key] = a1[key];
			delete data[this.action_param];
			delete data.id;
			delete data.gr_id;

			ajax.query({
				url: a4,
				method: "POST",
				headers: this._headers,
				callback: back,
				data: JSON.stringify({
					id: rowId,
					action: action,
					data: data
				})
			});
		}
		else if (this._tMode == "REST") {
			var state = this.getState(rowId);
			var url = a3.replace(/(\&|\?)editing\=true/, "");
			var data = "";
			var method = "post";

			if (state == "inserted") {
				data = this.serialize(a1, rowId);
			} else if (state == "deleted") {
				method = "DELETE";
				url = url + (url.slice(-1) == "/" ? "" : "/") + rowId;
			} else {
				method = "PUT";
				data = this.serialize(a1, rowId);
				url = url + (url.slice(-1) == "/" ? "" : "/") + rowId;
			}


			url = this._applyPayload(url);
			ajax.query({
				url: url,
				method: method,
				headers: this._headers,
				data: data,
				callback: back
			});
		}

		this._waitMode++;
	},
	sendAllData: function () {
		if (!this.updatedRows.length) return;

		this.messages = [];
		var valid = true;
		for (var i = 0; i < this.updatedRows.length; i++)
			valid &= this.checkBeforeUpdate(this.updatedRows[i]);
		if (!valid && !this.callEvent("onValidationError", ["", this.messages])) return false;

		if (this._tSend)
			this._sendData(this._getAllData());
		else
			for (var i = 0; i < this.updatedRows.length; i++)
				if (!this._in_progress[this.updatedRows[i]]) {
					if (this.is_invalid(this.updatedRows[i])) continue;
					this._beforeSendData(this._getRowData(this.updatedRows[i]), this.updatedRows[i]);
					if (this._waitMode && (this.obj.mytype == "tree" || this.obj._h2)) return; //block send all for tree
				}
	},

	_getAllData: function (rowId) {
		var out = {};
		var has_one = false;
		for (var i = 0; i < this.updatedRows.length; i++) {
			var id = this.updatedRows[i];
			if (this._in_progress[id] || this.is_invalid(id)) continue;
			var row = this._getRowData(id);
			if (!this.callEvent("onBeforeUpdate", [id, this.getState(id), row])) continue;
			out[id] = row;
			has_one = true;
			this._in_progress[id] = (new Date()).valueOf();
		}
		return has_one ? out : null;
	},


	/**
	 *	@desc: specify column which value should be varified before sending to server
	 *	@param: ind - column index (0 based)
	 *	@param: verifFunction - function (object) which should verify cell value (if not specified, then value will be compared to empty string). Two arguments will be passed into it: value and column name
	 *	@type: public
	 */
	setVerificator: function (ind, verifFunction) {
		this.mandatoryFields[ind] = verifFunction || (function (value) {
			return (value !== "");
		});
	},
	/**
	 *	@desc: remove column from list of those which should be verified
	 *	@param: ind - column Index (0 based)
	 *	@type: public
	 */
	clearVerificator: function (ind) {
		this.mandatoryFields[ind] = false;
	},


	findRow: function (pattern) {
		var i = 0;
		for (i = 0; i < this.updatedRows.length; i++)
			if (pattern == this.updatedRows[i]) break;
		return i;
	},


	/**
	 *	@desc: define custom actions
	 *	@param: name - name of action, same as value of action attribute
	 *	@param: handler - custom function, which receives a XMl response content for action
	 *	@type: private
	 */
	defineAction: function (name, handler) {
		if (!this._uActions) this._uActions = [];
		this._uActions[name] = handler;
	},


	/**
	 *	 @desc: used in combination with setOnBeforeUpdateHandler to create custom client-server transport system
	 *	 @param: sid - id of item before update
	 *	 @param: tid - id of item after up0ate
	 *	 @param: action - action name
	 *	 @type: public
	 *	 @topic: 0
	 */
	afterUpdateCallback: function (sid, tid, action, btag) {
		var marker = sid;
		var correct = (action != "error" && action != "invalid");
		if (!correct) this.set_invalid(sid, action);
		if ((this._uActions) && (this._uActions[action]) && (!this._uActions[action](btag)))
			return (delete this._in_progress[marker]);

		if (this._in_progress[marker] != "wait")
			this.setUpdated(sid, false);

		var soid = sid;

		switch (action) {
			case "inserted":
			case "insert":
				if (tid != sid) {
					this.setUpdated(sid, false);
					this.obj[this._methods[2]](sid, tid);
					sid = tid;
				}
				break;
			case "delete":
			case "deleted":
				this.obj.setUserData(sid, this.action_param, "true_deleted");
				this.obj[this._methods[3]](sid);
				delete this._in_progress[marker];
				return this.callEvent("onAfterUpdate", [sid, action, tid, btag]);
		}

		if (this._in_progress[marker] != "wait") {
			if (correct) this.obj.setUserData(sid, this.action_param, '');
			delete this._in_progress[marker];
		} else {
			delete this._in_progress[marker];
			this.setUpdated(tid, true, this.obj.getUserData(sid, this.action_param));
		}

		this.callEvent("onAfterUpdate", [soid, action, tid, btag]);
	},

	/**
	 *	@desc: response from server
	 *	@param: xml - XMLLoader object with response XML
	 *	@type: private
	 */
	afterUpdate: function (that, xml, id) {
		var ajax = this.obj.$ajax;
		//try to use json first
		if (window.JSON) {
			var tag;

			try {
				tag = JSON.parse(xml.xmlDoc.responseText);
			} catch (e) {

				// empty response also can be processed by json handler
				if (!xml.xmlDoc.responseText.length) {
					tag = {};
				}
			}

			if (tag) {
				var action = tag.action || this.getState(id) || "updated";
				var sid = tag.sid || id[0];
				var tid = tag.tid || id[0];
				that.afterUpdateCallback(sid, tid, action, tag);
				that.finalizeUpdate();
				return;
			}
		}
		//xml response
		var top = ajax.xmltop("data", xml.xmlDoc); //fix incorrect content type in IE
		if (!top) return this.cleanUpdate(id);
		var atag = ajax.xpath("//data/action", top);
		if (!atag.length) return this.cleanUpdate(id);

		for (var i = 0; i < atag.length; i++) {
			var btag = atag[i];
			var action = btag.getAttribute("type");
			var sid = btag.getAttribute("sid");
			var tid = btag.getAttribute("tid");

			that.afterUpdateCallback(sid, tid, action, btag);
		}
		that.finalizeUpdate();
	},
	cleanUpdate: function (id) {
		if (id)
			for (var i = 0; i < id.length; i++)
				delete this._in_progress[id[i]];
	},
	finalizeUpdate: function () {
		if (this._waitMode) this._waitMode--;

		if ((this.obj.mytype == "tree" || this.obj._h2) && this.updatedRows.length)
			this.sendData();
		this.callEvent("onAfterUpdateFinish", []);
		if (!this.updatedRows.length)
			this.callEvent("onFullSync", []);
	},


	/**
	 *	@desc: initializes data-processor
	 *	@param: anObj - dhtmlxGrid object to attach this data-processor to
	 *	@type: public
	 */
	init: function (anObj) {
		this.obj = anObj;
		if (this.obj._dp_init)
			this.obj._dp_init(this);
	},


	setOnAfterUpdate: function (ev) {
		this.attachEvent("onAfterUpdate", ev);
	},
	enableDebug: function (mode) {
	},
	setOnBeforeUpdateHandler: function (func) {
		this.attachEvent("onBeforeDataSending", func);
	},


	/* starts autoupdate mode
		@param interval
			time interval for sending update requests
	*/
	setAutoUpdate: function (interval, user) {
		interval = interval || 2000;

		this._user = user || (new Date()).valueOf();
		this._need_update = false;
		//this._loader = null;
		this._update_busy = false;

		this.attachEvent("onAfterUpdate", function (sid, action, tid, xml_node) {
			this.afterAutoUpdate(sid, action, tid, xml_node);
		});
		this.attachEvent("onFullSync", function () {
			this.fullSync();
		});

		var self = this;
		window.setInterval(function () {
			self.loadUpdate();
		}, interval);
	},


	/* process updating request answer
		if status == collision version is depricated
		set flag for autoupdating immidiatly
	*/
	afterAutoUpdate: function (sid, action, tid, xml_node) {
		if (action == 'collision') {
			this._need_update = true;
			return false;
		} else {
			return true;
		}
	},


	/* callback function for onFillSync event
		call update function if it's need
	*/
	fullSync: function () {
		if (this._need_update) {
			this._need_update = false;
			this.loadUpdate();
		}
		return true;
	},


	/* sends query to the server and call callback function
	*/
	getUpdates: function (url, callback) {
		var ajax = this.obj.$ajax;
		if (this._update_busy)
			return false;
		else
			this._update_busy = true;

		//this._loader = this._loader || new dtmlXMLLoaderObject(true);

		//this._loader.async=true;
		//this._loader.waitCall=callback;
		//this._loader.loadXML(url);
		ajax.get(url, callback);

	},


	/* returns xml node value
		@param node
			xml node
	*/
	_v: function (node) {
		if (node.firstChild) return node.firstChild.nodeValue;
		return "";
	},


	/* returns values array of xml nodes array
		@param arr
			array of xml nodes
	*/
	_a: function (arr) {
		var res = [];
		for (var i = 0; i < arr.length; i++) {
			res[i] = this._v(arr[i]);
		}
		return res;
	},


	/* loads updates and processes them
	*/
	loadUpdate: function () {
		var ajax = this.obj.$ajax;
		var self = this;
		var version = this.obj.getUserData(0, "version");
		var url = this.serverProcessor + ajax.urlSeparator(this.serverProcessor) + ["dhx_user=" + this._user, "dhx_version=" + version].join("&");
		url = url.replace("editing=true&", "");
		this.getUpdates(url, function (xml) {
			var vers = ajax.xpath("//userdata", xml);
			self.obj.setUserData(0, "version", self._v(vers[0]));

			var upds = ajax.xpath("//update", xml);
			if (upds.length) {
				self._silent_mode = true;

				for (var i = 0; i < upds.length; i++) {
					var status = upds[i].getAttribute('status');
					var id = upds[i].getAttribute('id');
					var parent = upds[i].getAttribute('parent');
					switch (status) {
						case 'inserted':
							self.callEvent("insertCallback", [upds[i], id, parent]);
							break;
						case 'updated':
							self.callEvent("updateCallback", [upds[i], id, parent]);
							break;
						case 'deleted':
							self.callEvent("deleteCallback", [upds[i], id, parent]);
							break;
					}
				}

				self._silent_mode = false;
			}

			self._update_busy = false;
			self = null;
		});
	}
};

//(c)dhtmlx ltd. www.dhtmlx.com
if (window.dataProcessor && !dataProcessor.prototype.init_original){
	dataProcessor.prototype.init_original=dataProcessor.prototype.init;
	dataProcessor.prototype.init=function(obj){
		this.init_original(obj);
		obj._dataprocessor=this;

		this.setTransactionMode("POST",true);
		this.serverProcessor+=(this.serverProcessor.indexOf("?")!=-1?"&":"?")+"editing=true";
	};
}

dhtmlxError.catchError("LoadXML", function(a, b, c){
	var message = c[0].responseText;

	switch (scheduler.config.ajax_error){
		case "alert":
			window.alert(message);
			break;
		case "console":
			window.console.log(message);
			break;
		default:
			break;
	}
});

(function(){

	var htmlTags = new RegExp("<(?:.|\n)*?>", "gm");
	var extraSpaces = new RegExp(" +", "gm");

	function stripHTMLLite(htmlText){
		return (htmlText + "")
			.replace(htmlTags, " ").
			replace(extraSpaces, " ");
	}

	var singleQuotes = new RegExp("'", "gm");
	function escapeQuotes(text){
		return (text + "").replace(singleQuotes, "&#39;");
	}

	scheduler._waiAria = {
		getAttributeString: function(attr){
			var attributes = [" "];
			for(var i in attr){
				if(typeof attr[i] != "function" && typeof attr[i] != "object") {
					var text = escapeQuotes(stripHTMLLite(attr[i]));
					attributes.push(i + "='" + text + "'");
				}
			}
			attributes.push(" ");
			return attributes.join(" ");
		},
		setAttributes: function(div, values){
			for(var i in values){
				div.setAttribute(i, stripHTMLLite(values[i]));
			}
			return div;
		},

		labelAttr: function(div, content){
			return this.setAttributes(div, {"aria-label": content});
		},
		label: function(label){
			return scheduler._waiAria.getAttributeString({"aria-label": label});
		},

		// day/week/units

		hourScaleAttr: function(div, content){
			this.labelAttr(div, content);

		},
		monthCellAttr: function(div, date){
			this.labelAttr(div, scheduler.templates.day_date(date));
		},

		navBarDateAttr: function(div, content){
			this.labelAttr(div, content);
		},
		dayHeaderAttr: function(div, content){
			this.labelAttr(div, content);
		},

		dayColumnAttr: function(div, date){
			this.dayHeaderAttr(div, scheduler.templates.day_date(date));
		},

		headerButtonsAttributes: function(div, label){
			return this.setAttributes(div, {"role":"button", "aria-label":label});
		},

		headerToggleState: function(div, isActive){
			return this.setAttributes(div, {"aria-pressed": isActive ? "true" : "false"});
		},


		getHeaderCellAttr:function(dateString){

			return scheduler._waiAria.getAttributeString({"aria-label": dateString});
		},


		eventAttr: function(event, div){
			this._eventCommonAttr(event, div);
		},


		_eventCommonAttr: function(event, div){
			div.setAttribute("aria-label", stripHTMLLite(scheduler.templates.tooltip_text(event.start_date, event.end_date, event)));

			if(scheduler.config.readonly){
				div.setAttribute("aria-readonly", true);

			}

			if(event.$dataprocessor_class){
				div.setAttribute("aria-busy", true);
			}


			div.setAttribute("aria-selected",
				(scheduler.getState().select_id == event.id) ? "true" : "false");
		},

		setEventBarAttr: function(event, div){
			this._eventCommonAttr(event, div);
		},

		_getAttributes: function(attributeSetter, arg){
			var result = {
				setAttribute:function(name, value){
					this[name] = value;
				}
			};

			attributeSetter.apply(this, [arg, result]);
			return result;

		},

		eventBarAttrString: function(event){
			return this.getAttributeString(this._getAttributes(this.setEventBarAttr, event));
		},



		agendaHeadAttrString :function(){
			return this.getAttributeString({role: "row"});
		},
		agendaHeadDateString :function(label){
			return this.getAttributeString({role: "columnheader", "aria-label": label});
		},
		agendaHeadDescriptionString :function(label){
			return this.agendaHeadDateString(label);
		},
		agendaDataAttrString: function(){
			return this.getAttributeString({role: "grid"});
		},
		agendaEventAttrString: function(event){
			var attrs = this._getAttributes(this._eventCommonAttr, event);

			attrs["role"] = "row";

			return this.getAttributeString(attrs);

		},
		agendaDetailsBtnString: function(){
			return this.getAttributeString({"role":"button", "aria-label":scheduler.locale.labels.icon_details});
		},


		gridAttrString: function(){
			return this.getAttributeString({role: "grid"});
		},

		gridRowAttrString: function(event){
			return this.agendaEventAttrString(event);
		},

		gridCellAttrString: function(event, column, value){
			return this.getAttributeString({"role":"gridcell", "aria-label": [
				(column.label === undefined ? column.id : column.label),
				": ",
				value
			]});
		},

		mapAttrString: function(){
			return this.gridAttrString();
		},
		mapRowAttrString: function(event){
			return this.gridRowAttrString(event);
		},
		mapDetailsBtnString: function(){
			return this.agendaDetailsBtnString();
		},

		minicalHeader: function(div, headerId){
			this.setAttributes(div, {
				"id":headerId+"",
				"aria-live":"assertice",
				"aria-atomic":"true"

			});
		},
		minicalGrid: function(div, headerId){
			this.setAttributes(div, {
				"aria-labelledby":headerId+"",
				"role":"grid"
			});
		},
		minicalRow: function(div){
			this.setAttributes(div, {
				"role":"row"
			});
		},
		minicalDayCell: function(div, date){
			var selected = (date.valueOf() < scheduler._max_date.valueOf() && date.valueOf() >= scheduler._min_date.valueOf());
			this.setAttributes(div, {
				"role":"gridcell",
				"aria-label": scheduler.templates.day_date(date),
				"aria-selected": selected ? "true" : "false"
			});
		},
		minicalHeadCell: function(div){
			this.setAttributes(div, {
				"role":"columnheader"
			});
		},


		weekAgendaDayCell: function(div, date){
			var header = div.querySelector(".dhx_wa_scale_bar");
			var content = div.querySelector(".dhx_wa_day_data");
			var headerId = scheduler.uid() + "";
			this.setAttributes(header, { "id": headerId});
			this.setAttributes(content, { "aria-labelledby": headerId});

		},
		weekAgendaEvent: function(div, event){
			this.eventAttr(event, div);
		},

		lightboxHiddenAttr: function(div){
			div.setAttribute("aria-hidden", "true");
		},

		lightboxVisibleAttr: function(div){
			div.setAttribute("aria-hidden", "false");
		},

		lightboxSectionButtonAttrString: function(label){
			return this.getAttributeString({"role":"button", "aria-label":label, "tabindex":"0"});
		},

		yearHeader: function(div, headerId){
			this.setAttributes(div, {
				"id":headerId+""
			});
		},
		yearGrid: function(div, headerId){
			this.minicalGrid(div, headerId);
		},
		yearHeadCell: function(div){
			return this.minicalHeadCell(div);
		},
		yearRow: function(div){
			return this.minicalRow(div);
		},
		yearDayCell: function(div){
			this.setAttributes(div, {
				"role":"gridcell"
			});
		},

		lightboxAttr: function(div){
			div.setAttribute("role", "dialog");
			div.setAttribute("aria-hidden", "true");
			div.firstChild.setAttribute("role", "heading");
		},

		lightboxButtonAttrString:function(buttonName){
			return this.getAttributeString({"role":"button", "aria-label":scheduler.locale.labels[buttonName], "tabindex":"0"});
		},
		eventMenuAttrString: function(iconName){
			return this.getAttributeString({"role":"button", "aria-label":scheduler.locale.labels[iconName]});
		},
		lightboxHeader: function(div, headerText){
			div.setAttribute("aria-label", headerText);
		},

		lightboxSelectAttrString: function(time_option){
			var label = "";

			switch (time_option) {
				case "%Y":
					label = scheduler.locale.labels.year;
					break;
				case "%m":
					label = scheduler.locale.labels.month;
					break;
				case "%d":
					label = scheduler.locale.labels.day;
					break;
				case "%H:%i":
					label = scheduler.locale.labels.hour + " " + scheduler.locale.labels.minute;
					break;
				default:
					break;
			}

			return scheduler._waiAria.getAttributeString({"aria-label": label});
		},


		messageButtonAttrString: function(buttonLabel){
			return "tabindex='0' role='button' aria-label='"+buttonLabel+"'";
		},

		messageInfoAttr: function(div){
			div.setAttribute("role", "alert");
			//div.setAttribute("tabindex", "-1");
		},

		messageModalAttr: function(div, uid){
			div.setAttribute("role", "dialog");
			if(uid){
				div.setAttribute("aria-labelledby", uid);
			}

			//	div.setAttribute("tabindex", "-1");
		},

		quickInfoAttr: function(div){
			div.setAttribute("role", "dialog");
		},

		quickInfoHeaderAttrString: function(){
			return " role='heading' ";
		},

		quickInfoHeader: function(div, header){
			div.setAttribute("aria-label", header);
		},

		quickInfoButtonAttrString: function(label){
			return scheduler._waiAria.getAttributeString({"role":"button", "aria-label":label, "tabindex":"0"});
		},

		tooltipAttr: function(div){
			div.setAttribute("role", "tooltip");
		},

		tooltipVisibleAttr: function(div){
			div.setAttribute("aria-hidden", "false");
		},

		tooltipHiddenAttr: function(div){
			div.setAttribute("aria-hidden", "true");
		}
	};

	function isDisabled(){
		return !scheduler.config.wai_aria_attributes;
	}

	for(var i in scheduler._waiAria){
		scheduler._waiAria[i] = (function(payload){
			return function(){
				if(isDisabled()){
					return " ";
				}
				return payload.apply(this, arguments);
			};
		})(scheduler._waiAria[i]);
	}


})();

dhtmlxEventable(scheduler);

scheduler._detachDomEvent = function(el, event, handler){
	if (el.removeEventListener){
		el.removeEventListener(event, handler, false);

	}else if (el.detachEvent){
		el.detachEvent("on"+event, handler);
	}
};

scheduler._init_once = function(){

	var oldSize = getWindowSize();
	dhtmlxEvent(window,"resize",function() {
		if (!isAttachedNode(scheduler._obj))
			return;

		window.clearTimeout(scheduler._resize_timer);
		scheduler._resize_timer = window.setTimeout(function () {
			var newSize = getWindowSize();

			// ie7-8 triggers "resize" when window's elements are resized, it messes container-autoresize extension
			// check if it's actually resized
			if (!equals(oldSize, newSize)) {
				if (!isAttachedNode(scheduler._obj))
					return;

				if (scheduler.callEvent("onSchedulerResize", [])) {
					scheduler.update_view();
					scheduler.callEvent("onAfterSchedulerResize", []);
				}
			}
			oldSize = newSize;
		}, 20);

	});

	function isAttachedNode(container){
		var root = document.body;

		while(container && container != root){
			container = container.parentNode;
		}

		return !!(root == container);
	}

	function getWindowSize(){
		return {
			w : window.innerWidth || document.documentElement.clientWidth,
			h : window.innerHeight || document.documentElement.clientHeight
		};
	}
	function equals(a,b){
		return a.w == b.w && a.h == b.h;
	}

	scheduler._init_once = function(){};
};
scheduler.init=function(id,date,mode){
	date=date||(scheduler._currentDate());
	mode=mode||"week";

	if(this._obj){
		this.unset_actions();
	}

	this._obj=(typeof id == "string")?document.getElementById(id):id;
	this.$container = this._obj;
	if(this.config.wai_aria_attributes && this.config.wai_aria_application_role){
		this.$container.setAttribute("role", "application");
	}

	//hook for terrace skin
	if (this._skin_init)
		scheduler._skin_init();

	scheduler.date.init();


	this._els=[];
	this._scroll=true;
	this._quirks=(_isIE && document.compatMode == "BackCompat");
	this._quirks7=(_isIE && navigator.appVersion.indexOf("MSIE 8")==-1);

	this.get_elements();
	this.init_templates();
	this.set_actions();

	this._init_once();
	this._init_touch_events();

	this.set_sizes();
	scheduler.callEvent('onSchedulerReady', []);
	this.setCurrentView(date,mode);

};

scheduler.xy={
	min_event_height:40,
	scale_width:50,
	scroll_width:18,
	scale_height:20,
	month_scale_height:20,
	menu_width:25,
	margin_top:0,
	margin_left:0,
	editor_width:140,
	month_head_height:22,
	event_header_height: 14
};
scheduler.keys={
	edit_save:13,
	edit_cancel:27
};
scheduler.set_sizes=function(){
	var w = this._x = this._obj.clientWidth-this.xy.margin_left;
	var h = this._y = this._obj.clientHeight-this.xy.margin_top;
	
	//not-table mode always has scroll - need to be fixed in future
	var scale_x=this._table_view?0:(this.xy.scale_width+this.xy.scroll_width);
	var scale_s=this._table_view?-1:this.xy.scale_width;

	var materialScalePlaceholder = this.$container.querySelector(".dhx_cal_scale_placeholder");
	if(scheduler._is_material_skin()){
		if(!materialScalePlaceholder) {
			materialScalePlaceholder = document.createElement("div");
			materialScalePlaceholder.className = "dhx_cal_scale_placeholder";
			this.$container.insertBefore(materialScalePlaceholder, this._els["dhx_cal_header"][0]);
		}
		materialScalePlaceholder.style.display = "block";
		this.set_xy(materialScalePlaceholder,w,this.xy.scale_height + 1,0,this.xy.nav_height+(this._quirks?-1:1));

	}else{
		if(materialScalePlaceholder){
			materialScalePlaceholder.parentNode.removeChild(materialScalePlaceholder);
		}
	}

	this.set_xy(this._els["dhx_cal_navline"][0],w,this.xy.nav_height,0,0);
	this.set_xy(this._els["dhx_cal_header"][0],w-scale_x,this.xy.scale_height,scale_s,this.xy.nav_height+(this._quirks?-1:1));
	//to support alter-skin, we need a way to alter height directly from css
	var actual_height = this._els["dhx_cal_navline"][0].offsetHeight;
	if (actual_height > 0) this.xy.nav_height = actual_height;
	
	var data_y=this.xy.scale_height+this.xy.nav_height+(this._quirks?-2:0);
	this.set_xy(this._els["dhx_cal_data"][0],w,h-(data_y+2),0,data_y+2);
};
scheduler.set_xy=function(node,w,h,x,y){
	node.style.width=Math.max(0,w)+"px";
	node.style.height=Math.max(0,h)+"px";
	if (arguments.length>3){
		node.style.left=x+"px";
		node.style.top=y+"px";	
	}
};
scheduler.get_elements=function(){
	//get all child elements as named hash
	var els=this._obj.getElementsByTagName("DIV");
	for (var i=0; i < els.length; i++){
		var class_name= scheduler._getClassName(els[i]);
		var attr_value = els[i].getAttribute("name") || "";
		if (class_name) class_name = class_name.split(" ")[0];
		if (!this._els[class_name]) this._els[class_name]=[];
		this._els[class_name].push(els[i]);
		
		//check if name need to be changed
		var label = scheduler.locale.labels[attr_value||class_name];
		if (typeof label !== "string" && attr_value && !els[i].innerHTML)
			 label = attr_value.split("_")[0];
		if (label) {
			this._waiAria.labelAttr(els[i], label);
			els[i].innerHTML = label;
		}
	}
};

scheduler.unset_actions = function(){
	for (var a in this._els)
		if (this._click[a])
			for (var i=0; i < this._els[a].length; i++)
				this._els[a][i].onclick = null;
	this._obj.onselectstart = null;
	this._obj.onmousemove = null;
	this._obj.onmousedown = null;
	this._obj.onmouseup = null;
	this._obj.ondblclick = null;
	this._obj.oncontextmenu = null;
};

scheduler.set_actions=function(){
	for (var a in this._els)
		if (this._click[a])
			for (var i=0; i < this._els[a].length; i++)
				this._els[a][i].onclick=scheduler._click[a];
	this._obj.onselectstart=function(e){ return false; };
	this._obj.onmousemove=function(e){
		if (!scheduler._temp_touch_block)
			scheduler._on_mouse_move(e||event);
	};
	this._obj.onmousedown=function(e){
		if (!scheduler._ignore_next_click)
			scheduler._on_mouse_down(e||event);
	};
	this._obj.onmouseup=function(e){
		if (!scheduler._ignore_next_click)
			scheduler._on_mouse_up(e||event);
	};
	this._obj.ondblclick=function(e){
		scheduler._on_dbl_click(e||event);
	};
	this._obj.oncontextmenu = function(e) {
		var ev = e||event;
		var src = ev.target||ev.srcElement;
		var returnValue = scheduler.callEvent("onContextMenu", [scheduler._locate_event(src), ev]);
		return returnValue;
	};
};
scheduler.select=function(id){
	if (this._select_id==id) return;
	scheduler._close_not_saved();
	this.editStop(false);
	this.unselect();
	this._select_id = id;
	this.updateEvent(id);
};
scheduler.unselect=function(id){
	if (id && id!=this._select_id) return;
	var t=this._select_id;
	this._select_id = null;
	if (t && this.getEvent(t)) this.updateEvent(t);
};
scheduler.getState=function(){
	return {
		mode: this._mode,
		date: new Date(this._date),
		min_date: new Date(this._min_date),
		max_date: new Date(this._max_date),
		editor_id: this._edit_id,
		lightbox_id: this._lightbox_id,
		new_event: this._new_event,
		select_id: this._select_id,
		expanded: this.expanded,
		drag_id: this._drag_id,
		drag_mode: this._drag_mode
	};
};
scheduler._click={
	dhx_cal_data:function(e){
		//in case of touch disable click processing
		if (scheduler._ignore_next_click){
			if (e.preventDefault)
				e.preventDefault();
			e.cancelBubble = true;
			scheduler._ignore_next_click = false;
			return false;
		}

		var trg = e?e.target:event.srcElement;
		var id = scheduler._locate_event(trg);
		
		e = e || event;

		if (!id) {
			scheduler.callEvent("onEmptyClick",[scheduler.getActionData(e).date, e]);
		} else {
			if ( !scheduler.callEvent("onClick",[id,e]) || scheduler.config.readonly ) return;
		}

		if (id && scheduler.config.select) {

			scheduler.select(id);
			var mask = scheduler._getClassName(trg);
			if (mask.indexOf("_icon")!=-1)
				scheduler._click.buttons[mask.split(" ")[1].replace("icon_","")](id);
		} else{
			scheduler._close_not_saved();
			if (new Date().valueOf()-(scheduler._new_event||0) > 500){
				scheduler.unselect();
			}
		}
	},
	dhx_cal_prev_button:function(){
		scheduler._click.dhx_cal_next_button(0,-1);
	},
	dhx_cal_next_button:function(dummy,step){
		scheduler.setCurrentView(scheduler.date.add( //next line changes scheduler._date , but seems it has not side-effects
			scheduler.date[scheduler._mode+"_start"](scheduler._date),(step||1),scheduler._mode));
	},
	dhx_cal_today_button:function(){
		if (scheduler.callEvent("onBeforeTodayDisplayed", [])) {
			scheduler.setCurrentView(scheduler._currentDate());
		}
	},
	dhx_cal_tab:function(){
		var name = this.getAttribute("name");
		var mode = name.substring(0, name.search("_tab"));
		scheduler.setCurrentView(scheduler._date,mode);
	},
	buttons:{
		"delete":function(id){
			var c = scheduler.locale.labels.confirm_deleting;
			scheduler._dhtmlx_confirm(c, scheduler.locale.labels.title_confirm_deleting, function(){ scheduler.deleteEvent(id); });
		},
		edit:function(id){ scheduler.edit(id); },
		save:function(id){ scheduler.editStop(true); },
		details:function(id){ scheduler.showLightbox(id); },
		cancel:function(id){ scheduler.editStop(false); }
	}
};
scheduler._dhtmlx_confirm = function(message, title, callback) {
	if (!message)
		return callback();
	var opts = { text: message };
	if (title)
		opts.title = title;
	if (callback) {
		opts.callback = function(result) {
			if (result)
				callback();
		};
	}
	dhtmlx.confirm(opts);
};
scheduler.addEventNow=function(start,end,e){
	var base = {};
	if (scheduler._isObject(start) && !scheduler._isDate(start)){
		base = start;
		start = null;
	}
	
	var d = (this.config.event_duration||this.config.time_step)*60000;
	if (!start) start = base.start_date||Math.round((scheduler._currentDate()).valueOf()/d)*d;
	var start_date = new Date(start);
	if (!end){
		var start_hour = this.config.first_hour;
		if (start_hour > start_date.getHours()){
			start_date.setHours(start_hour);
			start = start_date.valueOf();
		}
		end = start.valueOf()+d;
	}
	var end_date = new Date(end);

	// scheduler.addEventNow(new Date(), new Date()) + collision though get_visible events defect (such event was not retrieved)
	if(start_date.valueOf() == end_date.valueOf())
		end_date.setTime(end_date.valueOf()+d);

	base.start_date = base.start_date||start_date;
	base.end_date =  base.end_date||end_date;
	base.text = base.text||this.locale.labels.new_event;
	base.id = this._drag_id = base.id || this.uid();
	this._drag_mode="new-size";

	this._loading=true;
	var eventId = this.addEvent(base);
	this.callEvent("onEventCreated",[this._drag_id,e]);
	this._loading=false;
	
	this._drag_event={}; //dummy , to trigger correct event updating logic
	this._on_mouse_up(e);
	return eventId;
};
scheduler._on_dbl_click=function(e,src){
	src = src||(e.target||e.srcElement);
	if (this.config.readonly) return;
	var name = scheduler._getClassName(src).split(" ")[0];
	switch(name){
		case "dhx_scale_holder":
		case "dhx_scale_holder_now":
		case "dhx_month_body":
		case "dhx_wa_day_data":
			if (!scheduler.config.dblclick_create) break;
			this.addEventNow(this.getActionData(e).date,null,e);
			break;
		case "dhx_cal_event":
		case "dhx_wa_ev_body":
		case "dhx_agenda_line":
		case "dhx_grid_event":
		case "dhx_cal_event_line":
		case "dhx_cal_event_clear":
			var id = this._locate_event(src);
			if (!this.callEvent("onDblClick",[id,e])) return;
			if (this.config.details_on_dblclick || this._table_view || !this.getEvent(id)._timed || !this.config.select)
				this.showLightbox(id);
			else
				this.edit(id);
			break;
		case "dhx_time_block":
		case "dhx_cal_container":
			return;
		default:
			var t = this["dblclick_"+name];
			if (t) {
				t.call(this,e);
			}
			else {
				if (src.parentNode && src != this)
					return scheduler._on_dbl_click(e,src.parentNode);
			}
			break;
	}
};
//column index by mouse x-coordinate
scheduler._get_column_index = function(x_pos){
	var column = 0;
	if (this._cols){

		var width = 0;

		var i = 0;
		while (width + this._cols[i] < x_pos && i < this._cols.length){
			width += this._cols[i];
			i++;
		}

		column = i + (this._cols[i] ? ((x_pos - width)/ this._cols[i]) : 0);

		if (this._ignores){

			if(column >= this._cols.length){
				while(column >= 1 && this._ignores[Math.floor(column)]){
					column--;
				}
			}

		}
	}
	return column;
};
//transform mouse coordinates to day-time indexes of week based view
scheduler._week_indexes_from_pos = function(pos){
	//"get position" can be invoked before columns are loaded into the units view(e.g. by onMouseMove handler in key_nav.js)
	if(!this._cols){
		return pos;
	}else{
		var column = this._get_column_index(pos.x);
		pos.x=Math.min(this._cols.length-1, Math.max(0,Math.ceil(column)-1));

		pos.y=Math.max(0,Math.ceil(pos.y*60/(this.config.time_step*this.config.hour_size_px))-1)+this.config.first_hour*(60/this.config.time_step);
		return pos;
	}
};

scheduler._mouse_coords=function(ev){
	var pos;
	var b=document.body;
	var d = document.documentElement;
	if (!_isIE && (ev.pageX || ev.pageY))
	    pos={x:ev.pageX, y:ev.pageY};
	else pos={
	    x:ev.clientX + (b.scrollLeft||d.scrollLeft||0) - b.clientLeft,
	    y:ev.clientY + (b.scrollTop||d.scrollTop||0) - b.clientTop
	};

	//apply layout
	pos.x-=this.$domHelpers.getAbsoluteLeft(this._obj)+(this._table_view?0:this.xy.scale_width);
	pos.y-=this.$domHelpers.getAbsoluteTop(this._obj)+this.xy.nav_height+(this._dy_shift||0)+this.xy.scale_height-this._els["dhx_cal_data"][0].scrollTop;
	pos.ev = ev;

	var handler = this["mouse_"+this._mode];
	if (handler){
		pos = handler.call(this,pos);
	}else{
		//transform to date
		if (!this._table_view) {
			pos = this._week_indexes_from_pos(pos);
		} else {
			var column = this._get_column_index(pos.x);
			if (!this._cols || !this._colsS) // agenda/map views
				return pos;
			var dy=0;
			for (dy=1; dy < this._colsS.heights.length; dy++)
				if (this._colsS.heights[dy]>pos.y) break;

			pos.y=Math.ceil( (Math.max(0, column)+Math.max(0,dy-1)*7)*24*60/this.config.time_step );

			if (scheduler._drag_mode || this._mode == "month")
				pos.y=(Math.max(0,Math.ceil(column)-1)+Math.max(0,dy-1)*7)*24*60/this.config.time_step;

			//we care about ignored days only during event moving in month view
			if (this._drag_mode == "move"){
				if (scheduler._ignores_detected && scheduler.config.preserve_length){
					pos._ignores = true;
					//get real lengtn of event
					if (!this._drag_event._event_length)
						this._drag_event._event_length = this._get_real_event_length(this._drag_event.start_date, this._drag_event.end_date, { x_step:1, x_unit:"day"});
				}
			}

			pos.x=0;
		}
	}

	pos.timestamp = +new Date();

	return pos;
};
scheduler._close_not_saved=function(){
	if (new Date().valueOf()-(scheduler._new_event||0) > 500 && scheduler._edit_id){
		var c=scheduler.locale.labels.confirm_closing;

		scheduler._dhtmlx_confirm(c, scheduler.locale.labels.title_confirm_closing, function() { scheduler.editStop(scheduler.config.positive_closing); });
		if(c){
			this._drag_id = this._drag_pos = this._drag_mode = null;
		}
	}
};
scheduler._correct_shift=function(start, back){
	return start-=((new Date(scheduler._min_date)).getTimezoneOffset()-(new Date(start)).getTimezoneOffset())*60000*(back?-1:1);	
};

scheduler._is_pos_changed = function(old_pos, new_pos){
	function diff(old_val, new_val, acc){
		return !!(Math.abs(old_val - new_val) > acc);
	}

	if(!(old_pos && this._drag_pos)){
		return true;
	}
	var delay = 100,
		d_pos = 5;

	// start drag only if passed some time since mouse down, or if mouse position changed sufficiently
	return !!(this._drag_pos.has_moved || !this._drag_pos.timestamp || (new_pos.timestamp - this._drag_pos.timestamp > delay) || diff(old_pos.ev.clientX, new_pos.ev.clientX, d_pos) || diff(old_pos.ev.clientY, new_pos.ev.clientY, d_pos));
};

scheduler._correct_drag_start_date = function(start){
	var obj;
	if (scheduler.matrix)
		obj = scheduler.matrix[scheduler._mode];
	obj = obj  || { x_step:1, x_unit:"day" };

	start = new Date(start);
	var len = 1;
	if(obj._start_correction || obj._end_correction)
		len = (obj.last_hour||0)*60 - (start.getHours()*60+start.getMinutes()) || 1;

	return start*1 + (scheduler._get_fictional_event_length(start, len, obj)  - len);
};
scheduler._correct_drag_end_date = function(start, duration){
	var obj;
	if (scheduler.matrix)
		obj = scheduler.matrix[scheduler._mode];
	obj = obj  || { x_step:1, x_unit:"day" };

	var end = start*1 + scheduler._get_fictional_event_length(start, duration, obj);
	return new Date(end*1 - (scheduler._get_fictional_event_length(end, -1, obj, -1) + 1));
};

scheduler._on_mouse_move=function(e){
	if (this._drag_mode){
		var pos=this._mouse_coords(e);
		if (this._is_pos_changed(this._drag_pos, pos)){
			var start, end;
			if (this._edit_id!=this._drag_id)
				this._close_not_saved();

			if(!this._drag_mode)
				return;

			var mousedownPos = null;
			if(this._drag_pos && !this._drag_pos.has_moved){
				mousedownPos = this._drag_pos;
				mousedownPos.has_moved = true;
			}

			this._drag_pos = pos;

			this._drag_pos.has_moved = true;

			if (this._drag_mode=="create"){

				// use mouse down position as a starting point for drag-create
				if(mousedownPos){
					pos = mousedownPos;
				}

				this._close_not_saved();
				this.unselect(this._select_id);
				this._loading=true; //will be ignored by dataprocessor
				
				start = this._get_date_from_pos(pos).valueOf();

				if (!this._drag_start) {
					var res = this.callEvent("onBeforeEventCreated", [e, this._drag_id]);
					if (!res){
						this._loading=false;
						return;

					}

					this._loading=false;
					this._drag_start=start;
					return;
				}

				end = start;
				if (end == this._drag_start) {
				}

				var start_date = new Date(this._drag_start);
				var end_date = new Date(end);
				if ( (this._mode == "day" || this._mode == "week") &&
					(start_date.getHours() == end_date.getHours() &&
					start_date.getMinutes() == end_date.getMinutes()) ) {
						end_date = new Date(this._drag_start+1000);
				}

				
				this._drag_id=this.uid();
				this.addEvent(start_date, end_date, this.locale.labels.new_event, this._drag_id, pos.fields);
				
				this.callEvent("onEventCreated",[this._drag_id,e]);
				this._loading=false;
				this._drag_mode="new-size";
				
			}


			var ev=this.getEvent(this._drag_id);
			var obj;
			if (scheduler.matrix)
				obj = scheduler.matrix[scheduler._mode];
			obj = obj  || { x_step:1, x_unit:"day" };

			if (this._drag_mode=="move"){
				start = this._min_date.valueOf()+(pos.y*this.config.time_step+pos.x*24*60 -(scheduler._move_pos_shift||0) )*60000;
				if (!pos.custom && this._table_view) start+=this.date.time_part(ev.start_date)*1000;
				start = this._correct_shift(start);

				if (pos._ignores && this.config.preserve_length && this._table_view){

					start = scheduler._correct_drag_start_date(start);
					end = scheduler._correct_drag_end_date(start,this._drag_event._event_length);

				} else
					end = ev.end_date.valueOf()-(ev.start_date.valueOf()-start);
			} else { // resize
				start = ev.start_date.valueOf();
				end = ev.end_date.valueOf();
				if (this._table_view) {
					var resize_date = this._min_date.valueOf()+pos.y*this.config.time_step*60000 + (pos.custom?0:24*60*60000);
					if (this._mode == "month") {
						resize_date = this._correct_shift(resize_date, false);
						if( this._drag_from_start ) {
							var day = 24*60*60000;
							if( resize_date <= scheduler.date.date_part(new Date(end+day-1)).valueOf() ) // to get end time as 23:59:59 and then the day start
								start = resize_date - day;
						} else {
							end = resize_date;
						}
					} else {
						if(this.config.preserve_length) {
							if (pos.resize_from_start) {
								start = scheduler._correct_drag_start_date(resize_date);
							} else {
								end = scheduler._correct_drag_end_date(resize_date, 0);
							}
						}
						else {
							if (pos.resize_from_start) {
								start = resize_date;
							} else {
								end = resize_date;
							}
						}
					}
				} else {
					var end_day_start = this.date.date_part(new Date(ev.end_date.valueOf() - 1)).valueOf();
					var end_day_date = new Date(end_day_start);

					end = end_day_start + pos.y*this.config.time_step*60000;
					end = end + ((new Date(end)).getTimezoneOffset() - end_day_date.getTimezoneOffset()) * 60000;
					this._els["dhx_cal_data"][0].style.cursor="s-resize";
					if (this._mode == "week" || this._mode == "day")
						end = this._correct_shift(end);
				}
				if (this._drag_mode == "new-size") {
					if (end <= this._drag_start){
						var shift = pos.shift||((this._table_view && !pos.custom)?24*60*60000:0);
						start = end-(pos.shift?0:shift);
						end = this._drag_start+(shift||(this.config.time_step*60000));
					} else {
						start = this._drag_start;
					}
				} else {
					if (end<=start)
						end=start+this.config.time_step*60000;
				}
			}
			var new_end = new Date(end-1);			
			var new_start = new Date(start);
			//deny drag out of visible scheduler scale in timeline view
			if(this._drag_mode=="move" && scheduler.config.limit_drag_out &&
				(+new_start < +scheduler._min_date || +end > +scheduler._max_date)){

				if(+ev.start_date < +scheduler._min_date || +ev.end_date > +scheduler._max_date){
					// not move event if it's already outside time scale
					new_start = new Date(ev.start_date);
					end = new Date(ev.end_date);
				}else{

					var duration = end - new_start;

					if(+new_start < +scheduler._min_date){
						new_start = new Date(scheduler._min_date);
						if (pos._ignores && this.config.preserve_length && this._table_view){
							new_start = new Date(scheduler._correct_drag_start_date(new_start));
							if(obj._start_correction)
								new_start = new Date(new_start.valueOf() + obj._start_correction);
							end = new Date(new_start*1 + this._get_fictional_event_length(new_start, this._drag_event._event_length, obj));
						}else{
							end = new Date(+new_start + duration);
						}
					}else{
						end = new Date(scheduler._max_date);

						if (pos._ignores && this.config.preserve_length && this._table_view){
							if(obj._end_correction)
								end = new Date(end.valueOf() - obj._end_correction);
							end = new Date(end*1 - this._get_fictional_event_length(end, 0, obj, true));
							new_start = new Date(end*1 - this._get_fictional_event_length(end, this._drag_event._event_length, obj, true));
							if(this._ignores_detected){
								new_start = scheduler.date.add(new_start, obj.x_step, obj.x_unit);
								end = new Date(end*1 - this._get_fictional_event_length(end, 0, obj, true));
								end = scheduler.date.add(end, obj.x_step, obj.x_unit);
							}

						}else{
							new_start = new Date(+end - duration);
						}

					}

				}
				var new_end = new Date(end-1);
			}



			// fix event dates when resized to bottom of the column (day/week views)
			if(!this._table_view &&
				!scheduler.config.all_timed &&
				((!scheduler._get_section_view() && pos.x != this._get_event_sday({start_date: new Date(end), end_date:new Date(end)})) || new Date(end).getHours() >= this.config.last_hour)){
				var duration = end - new_start;
				var day = this._min_date.valueOf()+(pos.x*24*60)*60000;
				end = scheduler.date.date_part(new Date(day));
				end.setHours(this.config.last_hour);
				new_end = new Date(end-1);
				if(this._drag_mode == "move"){
					new_start = new Date(+end - duration);
				}
			}

			//prevent out-of-borders situation for day|week view
			if ( this._table_view || (new_end.getDate()==new_start.getDate() && new_end.getHours()<this.config.last_hour) || scheduler._allow_dnd ){
				ev.start_date=new_start;
				ev.end_date=new Date(end);
				if (this.config.update_render){
					//fix for repaint after dnd and scroll issue, #231
					var sx = scheduler._els["dhx_cal_data"][0].scrollTop;
					this.update_view();
					scheduler._els["dhx_cal_data"][0].scrollTop = sx;
				} else
					this.updateEvent(this._drag_id);
			}
			if (this._table_view) {
				this.for_rendered(this._drag_id,function(r){
					r.className+=" dhx_in_move dhx_cal_event_drag";
				});
			}

			this.callEvent("onEventDrag", [this._drag_id, this._drag_mode, e]);
		}
	}  else {
		if (scheduler.checkEvent("onMouseMove")){
			var id = this._locate_event(e.target||e.srcElement);
			this.callEvent("onMouseMove",[id,e]);
		}
	}
};
scheduler._on_mouse_down=function(e,src) {
	// on Mac we do not get onmouseup event when clicking right mouse button leaving us in dnd state
	// let's ignore right mouse button then
	if (e.button == 2)
		return;

	if (this.config.readonly || this._drag_mode) return;
	src = src||(e.target||e.srcElement);
	var classname = scheduler._getClassName(src).split(" ")[0];

	switch (classname) {
		case "dhx_cal_event_line":
		case "dhx_cal_event_clear":
			if (this._table_view)
				this._drag_mode="move"; //item in table mode
			break;
		case "dhx_event_move":
		case "dhx_wa_ev_body":
			this._drag_mode="move";
			break;
		case "dhx_event_resize":
			this._drag_mode="resize";
			var fullClass = scheduler._getClassName(src);
			if((fullClass).indexOf("dhx_event_resize_end") < 0){
				scheduler._drag_from_start = true;
			}else{
				scheduler._drag_from_start = false;
			}
			break;
		case "dhx_scale_holder":
		case "dhx_scale_holder_now":
		case "dhx_month_body":
		case "dhx_matrix_cell":
		case "dhx_marked_timespan":
			this._drag_mode="create";
			break;
		case "":
			if (src.parentNode)
				return scheduler._on_mouse_down(e,src.parentNode);
			break;
		default:
			if (!scheduler.checkEvent("onMouseDown") || scheduler.callEvent("onMouseDown", [classname, e])) {
				if (src.parentNode && src != this && classname != "dhx_body") {
					return scheduler._on_mouse_down(e,src.parentNode);
				}
			}
			this._drag_mode=null;
			this._drag_id=null;
			break;
	}
	if (this._drag_mode){
		var id = this._locate_event(src);
		if (!this.config["drag_"+this._drag_mode] || !this.callEvent("onBeforeDrag",[id, this._drag_mode, e]))
			this._drag_mode=this._drag_id=0;
		else {
			this._drag_id= id;

			if (this._edit_id!=this._drag_id || (this._edit_id && this._drag_mode == "create"))
				this._close_not_saved();
			if(!this._drag_mode)
				return;

			this._drag_event = scheduler._lame_clone(this.getEvent(this._drag_id) || {});
			this._drag_pos = this._mouse_coords(e);
		}
	}
	this._drag_start=null;
};


scheduler._get_private_properties = function(event){
	var fields = {};
	for(var i in event){
		if(i.indexOf("_") === 0){
			fields[i] = true;
		}
	}
	return fields;
};
scheduler._clear_temporary_properties = function(clean, flagged_event){
	var initial = this._get_private_properties(clean);
	var current_state = this._get_private_properties(flagged_event);
	for(var i in current_state){
		if(!initial[i]){
			delete flagged_event[i];
		}
	}
};


scheduler._on_mouse_up=function(e){
	if (e && e.button == 2 && this._mobile) return;
	if (this._drag_mode && this._drag_id){
		this._els["dhx_cal_data"][0].style.cursor="default";
		//drop

		var drag_id = this._drag_id;
		var mode = this._drag_mode;

		var moved = !this._drag_pos || this._drag_pos.has_moved;

		var ev=this.getEvent(this._drag_id);
		if (moved && (this._drag_event._dhx_changed || !this._drag_event.start_date || ev.start_date.valueOf()!=this._drag_event.start_date.valueOf() || ev.end_date.valueOf()!=this._drag_event.end_date.valueOf())){
			var is_new=(this._drag_mode=="new-size");
			if (!this.callEvent("onBeforeEventChanged",[ev, e, is_new, this._drag_event])){
				if (is_new) 
					this.deleteEvent(ev.id, true);
				else {
					this._drag_event._dhx_changed = false;
					this._clear_temporary_properties(ev, this._drag_event);
					scheduler._lame_copy(ev, this._drag_event);
					this.updateEvent(ev.id);
				}
			} else {

				this._drag_id = this._drag_mode = null;
				if (is_new && this.config.edit_on_create){
					this.unselect();
					this._new_event=new Date();//timestamp of creation
					//if selection disabled - force lightbox usage
					if (this._table_view || this.config.details_on_create || !this.config.select || !this.isOneDayEvent(this.getEvent(drag_id))) {
						scheduler.callEvent("onDragEnd", [drag_id, mode, e]);
						return this.showLightbox(drag_id);
					}
					this._drag_pos = true; //set flag to trigger full redraw
					this._select_id = this._edit_id = drag_id;
				} else {
					if (!this._new_event)
						this.callEvent(is_new?"onEventAdded":"onEventChanged",[drag_id,this.getEvent(drag_id)]);
				}
			}
		}
		if (this._drag_pos && (this._drag_pos.has_moved || this._drag_pos === true)) {
			this._drag_id = this._drag_mode = null; // set null to prevent _sorder recalculation for drag event
			this.render_view_data(); //redraw even if there is no real changes - necessary for correct positioning item after drag
		}
		scheduler.callEvent("onDragEnd", [drag_id, mode, e]);
	}
	this._drag_id = null;
	this._drag_mode=null;
	this._drag_pos=null;
};

scheduler._trigger_dyn_loading = function(){
	if (this._load_mode && this._load()){
		this._render_wait = true;
		return true;
	}else{
		return false;
	}
};
scheduler.update_view=function(){
	this._reset_ignores();

	var view = this[this._mode + "_view"];
	if(view){
		view(true);
	}else{
		this._reset_scale();
	}

	if (this._trigger_dyn_loading()){
		return true;
	}
	this.render_view_data();
};

scheduler.isViewExists = function(mode){
	return !!(scheduler[mode+ "_view"] ||
		(scheduler.date[mode+ "_start"] && scheduler.templates[mode+ "_date"] && scheduler.templates[mode+ "_scale_date"]));
};

scheduler._set_aria_buttons_attrs = function(){
	var buttonGroups = ["dhx_cal_next_button", "dhx_cal_prev_button", "dhx_cal_tab", "dhx_cal_today_button"];
	for(var i = 0; i < buttonGroups.length; i++){
		var group = this._els[buttonGroups[i]];
		for(var j = 0; group && j < group.length; j++ ){
			var name = group[j].getAttribute("name");
			var label = this.locale.labels[buttonGroups[i]];
			if(name){
				label = this.locale.labels[name] || label;


			}
			if(buttonGroups[i] == "dhx_cal_next_button"){
				label = this.locale.labels.next;
			}else if(buttonGroups[i] == "dhx_cal_prev_button"){
				label = this.locale.labels.prev;
			}
			this._waiAria.headerButtonsAttributes(group[j], label || "");
		}
	}
};

scheduler.updateView = function(date, mode) {
	date = date || this._date;
	mode = mode || this._mode;
	var dhx_cal_data = 'dhx_cal_data';

	var container = this._obj;
	var oldClass = "dhx_scheduler_" + this._mode;
	var newClass = "dhx_scheduler_" + mode;

	if (!this._mode || (container.className.indexOf(oldClass) == -1)){
		container.className += " " + newClass;
	} else {
		container.className = container.className.replace(oldClass, newClass);
	}

	var dhx_multi_day = 'dhx_multi_day';

	var prev_scroll = (this._mode == mode && this.config.preserve_scroll) ? this._els[dhx_cal_data][0].scrollTop : false; // saving current scroll

	var multidayScroll;
	if(this._els[dhx_multi_day] && this._els[dhx_multi_day][0]){
		multidayScroll = this._els[dhx_multi_day][0].scrollTop;
	}

	//hide old custom view
	if (this[this._mode + "_view"] && mode && this._mode != mode)
		this[this._mode + "_view"](false);

	this._close_not_saved();
	
	if (this._els[dhx_multi_day]) {
		this._els[dhx_multi_day][0].parentNode.removeChild(this._els[dhx_multi_day][0]);
		this._els[dhx_multi_day] = null;
	}

	this._mode = mode;
	this._date = date;
	this._table_view = (this._mode == "month");

	this._dy_shift = 0;//correction for multiday section in week/day views


	this._set_aria_buttons_attrs();

	var tabs = this._els["dhx_cal_tab"];
	if(tabs){//calendar can work without view tabs
		for (var i = 0; i < tabs.length; i++) {
			var tab = tabs[i];

			var name = tab.className;
			name = name.replace(/ active/g, "");
			if (tab.getAttribute("name") == this._mode + "_tab"){
				name = name + " active";
				this._waiAria.headerToggleState(tab, true);
			}else{
				this._waiAria.headerToggleState(tab, false);
			}

			tab.className = name;
		}
	}
	//show new view
	this.update_view();

	if (typeof prev_scroll == "number") // if we are updating or working with the same view scrollTop should be saved
		this._els[dhx_cal_data][0].scrollTop = prev_scroll; // restoring original scroll

	if(typeof multidayScroll == "number" && this._els[dhx_multi_day] && this._els[dhx_multi_day][0]){
		this._els[dhx_multi_day][0].scrollTop = multidayScroll;
	}

};
scheduler.setCurrentView = function(date, mode) {
	if (!this.callEvent("onBeforeViewChange", [this._mode, this._date, mode || this._mode, date || this._date])) return;
	this.updateView(date, mode);
	this.callEvent("onViewChange", [this._mode, this._date]);
};
scheduler._render_x_header = function(i,left,d,h, offset_top){
	offset_top = offset_top || 0;
	//header scale	
	var head=document.createElement("div");
	head.className = "dhx_scale_bar";

	if(this.templates[this._mode+"_scalex_class"]){
		//'_scalex_class' - timeline already have similar template, use the same name
		head.className += ' ' + this.templates[this._mode+"_scalex_class"](d);
	}

	var width = this._cols[i]-1;

	if (this._mode == "month" && i === 0 && this.config.left_border) {
		head.className += " dhx_scale_bar_border";
		left = left+1;
	}
	this.set_xy(head, width, this.xy.scale_height-2, left, offset_top);//-1 for border

	var columnHeaderText = this.templates[this._mode+"_scale_date"](d,this._mode); //TODO - move in separate method
	head.innerHTML = columnHeaderText;

	this._waiAria.dayHeaderAttr(head, columnHeaderText);

	h.appendChild(head);
};

scheduler._get_columns_num = function(from, to){
	var count = 7;
	if (!scheduler._table_view){
		var count_n = scheduler.date["get_"+scheduler._mode+"_end"];
		if (count_n) to = count_n(from);
		count = Math.round((to.valueOf()-from.valueOf())/(1000*60*60*24));
	}
	return count;
};
scheduler._get_timeunit_start = function(){
	//start date of currently displayed time unit(day, week,...)
	return this.date[this._mode+"_start"](new Date(this._date.valueOf()));
};

scheduler._get_view_end = function(){
	var dd = this._get_timeunit_start();
	var ed = scheduler.date.add(dd, 1, this._mode);
	if (!scheduler._table_view){
		var count_n = scheduler.date["get_"+scheduler._mode+"_end"];
		if (count_n) ed = count_n(dd);
	}
	return ed;
};
scheduler._calc_scale_sizes = function(width, from, to){
	//calculates number of displayed columns(days/units/month view cols) and their widths
	var summ = width; //border delta
	var count = this._get_columns_num(from, to);

	this._process_ignores(from, count, "day", 1);
	var realcount = count - this._ignores_detected;

	for (var i=0; i<count; i++){
		if (this._ignores[i]){
			this._cols[i] = 0;
			realcount++;
		} else {
			this._cols[i]=Math.floor(summ/(realcount-i));
		}
		summ-=this._cols[i];
		this._colsS[i]=(this._cols[i-1]||0)+(this._colsS[i-1]||(this._table_view?0:this.xy.scale_width+2));
	}
	this._colsS['col_length'] = count;

	this._colsS[count] = (this._cols[count-1]+this._colsS[count-1]) || 0;
};
scheduler._set_scale_col_size = function(div, width, left){
	var c = this.config;
	this.set_xy(div, width-1, c.hour_size_px*(c.last_hour-c.first_hour), left+this.xy.scale_width+1, 0);//-1 for border
};

scheduler._render_scales = function(header, data_area){
	//render columns in week/units view, or header in month view
	var sd = new Date(scheduler._min_date),
		ed = new Date(scheduler._max_date),
		today = this.date.date_part( scheduler._currentDate());

	var summ = parseInt(header.style.width,10); //border delta
	var d = new Date(this._min_date);
	var count = this._get_columns_num(sd, ed);
	this._calc_scale_sizes(summ, sd, ed);
	var left=0;

	header.innerHTML = "";
	for (var i=0; i<count; i++){
		if (!this._ignores[i]){
			this._render_x_header(i,left,d,header);
		}
		if (!this._table_view){
			var scales=document.createElement("div");
			var cls = "dhx_scale_holder";
			if (d.valueOf() == today.valueOf()) cls = "dhx_scale_holder_now";

			if (this._ignores_detected && this._ignores[i]){
				cls += " dhx_scale_ignore";
			}

			scales.className = cls+" "+this.templates.week_date_class(d,today);
			this._waiAria.dayColumnAttr(scales, d);
			this._set_scale_col_size(scales, this._cols[i], left);

			data_area.appendChild(scales);
			this.callEvent("onScaleAdd",[scales, d]);
		}

		left+=this._cols[i];
		d=this.date.add(d,1,"day");
		d = this.date.day_start(d);
	}
};

scheduler._reset_scale=function(){
	//current mode doesn't support scales
	//we mustn't call reset_scale for such modes, so it just to be sure
	if (!this.templates[this._mode + "_date"]) return;

	var h = this._els["dhx_cal_header"][0];
	var data_area = this._els["dhx_cal_data"][0];
	var c = this.config;

	h.innerHTML = "";
	//data_area.scrollTop = 0; //fix flickering in FF; makes IE8 flicker instead
	data_area.innerHTML = "";

	var str = ((c.readonly || (!c.drag_resize)) ? " dhx_resize_denied" : "") + ((c.readonly || (!c.drag_move)) ? " dhx_move_denied" : "");
	data_area.className = "dhx_cal_data" + str;

	this._scales = {};
	this._cols = [];	//store for data section
	this._colsS = {height: 0};
	this._dy_shift = 0;

	this.set_sizes();

	var d,sd,today;
	var dd = this._get_timeunit_start(),
		ed = scheduler._get_view_end();

	d = sd = this._table_view ? scheduler.date.week_start(dd) : dd;


	this._min_date=d;

	var navBarDateStr = this.templates[this._mode+"_date"](dd,ed,this._mode);
	this._els["dhx_cal_date"][0].innerHTML = navBarDateStr;
	this._waiAria.navBarDateAttr(this._els["dhx_cal_date"][0] ,navBarDateStr);


	this._max_date = ed;
	scheduler._render_scales(h, data_area);

	if (this._table_view) // month view
		this._reset_month_scale(data_area,dd,sd);
	else{
		this._reset_hours_scale(data_area,dd,sd);
		if (c.multi_day) {
			var dhx_multi_day = 'dhx_multi_day';

			if(this._els[dhx_multi_day]) {
				this._els[dhx_multi_day][0].parentNode.removeChild(this._els[dhx_multi_day][0]);
				this._els[dhx_multi_day] = null;
			}
			
			var navline = this._els["dhx_cal_navline"][0];
			var top = navline.offsetHeight + this._els["dhx_cal_header"][0].offsetHeight+1;
			
			var c1 = document.createElement("div");
			c1.className = dhx_multi_day;
			c1.style.visibility="hidden";
			this.set_xy(c1, Math.max(this._colsS[this._colsS.col_length]+this.xy.scroll_width - 2, 0), 0, 0, top); // 2 extra borders, dhx_header has -1 bottom margin
			data_area.parentNode.insertBefore(c1,data_area);
			
			var c2 = c1.cloneNode(true);
			c2.className = dhx_multi_day+"_icon";
			c2.style.visibility="hidden";
			this.set_xy(c2, this.xy.scale_width, 0, 0, top); // dhx_header has -1 bottom margin
			
			c1.appendChild(c2);
			this._els[dhx_multi_day]=[c1,c2];
			this._els[dhx_multi_day][0].onclick = this._click.dhx_cal_data;
		}
	}
};
scheduler._reset_hours_scale=function(b,dd,sd){
	var c=document.createElement("div");
	c.className="dhx_scale_holder";
	
	var date = new Date(1980,1,1,this.config.first_hour,0,0);
	for (var i=this.config.first_hour*1; i < this.config.last_hour; i++) {
		var cc=document.createElement("div");
		cc.className="dhx_scale_hour";
		cc.style.height=this.config.hour_size_px+"px";
		var width = this.xy.scale_width;
		if (this.config.left_border) {
			cc.className += " dhx_scale_hour_border";
		}
		cc.style.width = width + "px";

		var content = scheduler.templates.hour_scale(date);
		cc.innerHTML = content;
		this._waiAria.hourScaleAttr(cc, content);

		c.appendChild(cc);
		date=this.date.add(date,1,"hour");
	}
	b.appendChild(c);
	if (this.config.scroll_hour)
		b.scrollTop = this.config.hour_size_px*(this.config.scroll_hour-this.config.first_hour);
};

scheduler._currentDate = function(){
	if(scheduler.config.now_date){
		return new Date(scheduler.config.now_date);
	}
	return new Date();
};

scheduler._reset_ignores = function(){
	this._ignores={};
	this._ignores_detected = 0;
};

scheduler._process_ignores = function(sd, n, mode, step, preserve){
	this._reset_ignores();
	var ignore = scheduler["ignore_"+this._mode];

	if (ignore){
		var ign_date = new Date(sd);
		for (var i=0; i<n; i++){
			if (ignore(ign_date)){
				this._ignores_detected += 1;
				this._ignores[i] = true;
				if (preserve)
					n++;
			}
			ign_date = scheduler.date.add(ign_date, step, mode);
			if(scheduler.date[mode + '_start'])
				ign_date = scheduler.date[mode + '_start'](ign_date);
		}
	}
};

scheduler._render_month_scale = function(div, dd/*month start*/, sd/*view start*/, rows ){
	//renders month view layout

	var ed=scheduler.date.add(dd,1,"month"),
		view_start = new Date(sd);
	var cd = scheduler._currentDate();
	this.date.date_part(cd);
	this.date.date_part(sd);

	rows = rows || Math.ceil(Math.round((ed.valueOf()-sd.valueOf()) / (60*60*24*1000) ) / 7);
	var tdwidths=[];

	for (var i=0; i<=7; i++) {
		var cell_width = ((this._cols[i]||0)-1);
		if (i === 0 && this.config.left_border) {
			cell_width = cell_width - 1;
		}
		tdwidths[i] = cell_width + "px";
	}

	function getCellHeight(row){
		var h = scheduler._colsS.height;
		if(scheduler._colsS.heights[row + 1] !== undefined ){
			h = scheduler._colsS.heights[row + 1] - (scheduler._colsS.heights[row]||0);
		}
		return h;
	}


	var cellheight = 0;

	var table = document.createElement("table");
	table.setAttribute("cellpadding", "0");
	table.setAttribute("cellspacing", "0");

	var tableBody = document.createElement("tbody");
	table.appendChild(tableBody);

	var rendered_dates = [];
	for (var i=0; i<rows; i++){
		var row = document.createElement("tr");
		tableBody.appendChild(row);
		var row_height = Math.max(getCellHeight(i) - scheduler.xy.month_head_height, 0);
		for (var j=0; j<7; j++) {
			var cell = document.createElement("td");
			row.appendChild(cell);

			var cls = "";
			if (sd<dd)
				cls='dhx_before';
			else if (sd>=ed)
				cls='dhx_after';
			else if (sd.valueOf()==cd.valueOf())
				cls='dhx_now';

			if (this._ignores_detected && this._ignores[j]){
				cls += " dhx_scale_ignore";
			}

			cell.className = cls + " " + this.templates.month_date_class(sd, cd);

			var body_class = "dhx_month_body";
			var head_class = "dhx_month_head";
			if (j === 0 && this.config.left_border) {
				body_class += " dhx_month_body_border";
				head_class += " dhx_month_head_border";
			}
			if (!this._ignores_detected || !this._ignores[j]){

				this._waiAria.monthCellAttr(cell, sd);

				var cellHead = document.createElement("div");
				cellHead.className = head_class;
				cellHead.innerHTML = this.templates.month_day(sd);
				cell.appendChild(cellHead);

				var cellBody = document.createElement("div");
				cellBody.className = body_class;
				cellBody.style.height = row_height + "px";
				cellBody.style.width = tdwidths[j];
				cell.appendChild(cellBody);

			} else {
				cell.appendChild(document.createElement("div"));
				cell.appendChild(document.createElement("div"));
			}
			rendered_dates.push(sd);
			var bf1 = sd.getDate();
			sd=this.date.add(sd,1,"day");
			if (sd.getDate() - bf1 > 1)
				sd = new Date(sd.getFullYear(), sd.getMonth(), bf1 + 1, 12, 0);
		}

		scheduler._colsS.heights[i] = cellheight;
		cellheight += getCellHeight(i);
	}

	this._min_date = view_start;
	this._max_date = sd;

	div.innerHTML = "";
	div.appendChild(table);

	this._scales = {};
	var divs = div.getElementsByTagName('div');
	for (var i=0; i<rendered_dates.length; i++) { // [header, body, header, body, ...]
		var div = divs[(i*2)+1];
		var date = rendered_dates[i];
		this._scales[+date] = div;
	}
	for (var i=0; i<rendered_dates.length; i++) {
		var date = rendered_dates[i];
		this.callEvent("onScaleAdd", [this._scales[+date], date]);
	}



	return this._max_date;
};

scheduler._reset_month_scale=function(b,dd,sd,rows){
	//recalculates rows height and redraws month layout
	var ed=scheduler.date.add(dd,1,"month");
	
	//trim time part for comparation reasons
	var cd = scheduler._currentDate();
	this.date.date_part(cd);
	this.date.date_part(sd);

	rows = rows || Math.ceil(Math.round((ed.valueOf()-sd.valueOf()) / (60*60*24*1000) ) / 7);

	var height = (Math.floor(b.clientHeight/rows) - this.xy.month_head_height);
	
	this._colsS.height = height + this.xy.month_head_height;
	this._colsS.heights = [];

	return scheduler._render_month_scale(b, dd, sd, rows);

};
scheduler.getLabel = function(property, key) {
	var sections = this.config.lightbox.sections;
	for (var i=0; i<sections.length; i++) {
		if(sections[i].map_to == property) {
			var options = sections[i].options;
			for (var j=0; j<options.length; j++) {
				if(options[j].key == key) {
					return options[j].label;
				}
			}
		}
	}
	return "";
};
scheduler.updateCollection = function(list_name, collection) {
	var list = scheduler.serverList(list_name);
	if (!list) return false;
	list.splice(0, list.length);
	list.push.apply(list, collection || []);
	scheduler.callEvent("onOptionsLoad", []);
	scheduler.resetLightbox();
	return true;
};
scheduler._lame_clone = function(object, cache) {
	var i, t, result; // iterator, types array, result

	cache = cache || [];

	for (i=0; i<cache.length; i+=2)
		if(object === cache[i])
			return cache[i+1];

	if (object && typeof object == "object") {
		result = {};
		t = [Array,Date,Number,String,Boolean];
		for (i=0; i<t.length; i++) {
			if (object instanceof t[i])
				result = i ? new t[i](object) : new t[i](); // first one is array
		}
		cache.push(object, result);
		for (i in object) {
			if (Object.prototype.hasOwnProperty.apply(object, [i]))
				result[i] = scheduler._lame_clone(object[i], cache);
		}
	}
	return result || object;
};
scheduler._lame_copy = function(target, source) {
	for (var key in source) {
		if (source.hasOwnProperty(key)) {
			target[key] = source[key];
		}
	}
	return target;
};
scheduler._get_date_from_pos = function(pos) {
	var start=this._min_date.valueOf()+(pos.y*this.config.time_step+(this._table_view?0:pos.x)*24*60)*60000;
	return new Date(this._correct_shift(start));
};
// n_ev - native event
scheduler.getActionData = function(n_ev) {
	var pos = this._mouse_coords(n_ev);
	return {
		date:this._get_date_from_pos(pos),
		section:pos.section
	};
};
scheduler._focus = function(node, select){
	if (node && node.focus){
		if (this._mobile){
			window.setTimeout(function(){
				node.focus();
			},10);
		} else {
			try {
				if (select && node.select && node.offsetWidth) {
					node.select();
				}
				node.focus();
			} catch (e) {
			}
		}
	}
};

//non-linear scales
scheduler._get_real_event_length=function(sd, fd, obj){
	var ev_length = fd -sd;
	var hours = (obj._start_correction + obj._end_correction)||0;
	var ignore = this["ignore_"+this._mode];

	var start_slot = 0,
		end_slot;
	if (obj.render){
		start_slot = this._get_date_index(obj, sd);
		end_slot = this._get_date_index(obj, fd);
	} else{
		end_slot = Math.round(ev_length/60/60/1000/24);
	}

	var last_column = true;
	while (start_slot < end_slot){
		var check = scheduler.date.add(fd, -obj.x_step, obj.x_unit);
		if (ignore && ignore(fd) && (!last_column || (last_column && ignore(check) ))){
			ev_length -= (fd-check);

		}else{
			last_column = false;
			ev_length -= hours;
		}


		fd = check;
		end_slot--;
	}
	return ev_length;
};
scheduler._get_fictional_event_length=function(end_date, ev_length, obj, back){
	var sd = new Date(end_date);
	var dir = back ? -1 : 1;

	//get difference caused by first|last hour
	if (obj._start_correction || obj._end_correction){
		var today;
		if (back)
			today = (sd.getHours()*60+sd.getMinutes()) - (obj.first_hour||0)*60;
		else
			today = (obj.last_hour||0)*60 - (sd.getHours()*60+sd.getMinutes());
		var per_day = (obj.last_hour - obj.first_hour)*60;
		var days = Math.ceil( (ev_length / (60*1000) - today ) / per_day);
		if(days < 0) days = 0;
		ev_length += days * (24*60 - per_day) * 60 * 1000;
	}

	var fd = new Date(end_date*1+ev_length*dir);
	var ignore = this["ignore_"+this._mode];

	var start_slot = 0,
		end_slot;
	if (obj.render){
		start_slot = this._get_date_index(obj, sd);
		end_slot = this._get_date_index(obj, fd);
	} else{
		end_slot = Math.round(ev_length/60/60/1000/24);
	}

	while (start_slot*dir <= end_slot*dir){
		var check = scheduler.date.add(sd, obj.x_step*dir, obj.x_unit);
		if (ignore && ignore(sd)){
			ev_length += (check-sd)*dir;
			end_slot += dir;
		}

		sd = check;
		start_slot+=dir;
	}
	
	return ev_length;
};

scheduler._get_section_view = function(){
	if(this.matrix && this.matrix[this._mode]){
		return this.matrix[this._mode];
	}else if(this._props && this._props[this._mode]){
		return this._props[this._mode];
	}
	return null;
};

scheduler._get_section_property = function(){
	if(this.matrix && this.matrix[this._mode]){
		return this.matrix[this._mode].y_property;
	}else if(this._props && this._props[this._mode]){
		return this._props[this._mode].map_to;
	}
	return null;
};

scheduler._is_initialized = function(){
	var state = this.getState();
	return (this._obj && state.date && state.mode);
};
scheduler._is_lightbox_open = function(){
	var state = this.getState();
	return state.lightbox_id !== null && state.lightbox_id !== undefined;
};

scheduler._getClassName = function(node){
	if(!node) return "";

	var className = node.className || "";
	if(className.baseVal)//'className' exist but not a string - IE svg element in DOM
		className = className.baseVal;

	if(!className.indexOf)
		className = '';

	return className || "";
};
scheduler.$domHelpers = {
	/**
	 *     @desc: Calculate absolute position of html object
	 *     @type: private
	 *     @param: htmlObject - html object
	 *     @topic: 0
	 */
	getAbsoluteLeft: function getAbsoluteLeft(htmlObject){
		return this.getOffset(htmlObject).left;
	},
	/**
	 *     @desc: Calculate absolute position of html object
	 *     @type: private
	 *     @param: htmlObject - html object
	 *     @topic: 0
	 */
	getAbsoluteTop: function getAbsoluteTop(htmlObject){
		return this.getOffset(htmlObject).top;
	},

	getOffsetSum: function getOffsetSum(elem) {
		var top=0, left=0;
		while(elem) {
			top = top + parseInt(elem.offsetTop);
			left = left + parseInt(elem.offsetLeft);
			elem = elem.offsetParent;
		}
		return {top: top, left: left};
	},

	getOffsetRect: function getOffsetRect(elem) {
		var box = elem.getBoundingClientRect();

		var top = 0,
			left = 0;

		// https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent#Mobile_Tablet_or_Desktop
		if (!/Mobi/.test(navigator.userAgent)) {
			var body = document.body;
			var docElem = document.documentElement;
			var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
			var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
			var clientTop = docElem.clientTop || body.clientTop || 0;
			var clientLeft = docElem.clientLeft || body.clientLeft || 0;

			top  = box.top +  scrollTop - clientTop;
			left = box.left + scrollLeft - clientLeft;
		}else {
			// incorrect left coordinate on mobile zoom
			// https://bugs.chromium.org/p/chromium/issues/detail?id=489206

			var dummy = document.createElement("div");
			dummy.style.position="absolute";
			dummy.style.left="0px";
			dummy.style.top="0px";
			dummy.style.width="1px";
			dummy.style.height = "1px";

			document.body.appendChild(dummy);
			var dummyBox = dummy.getBoundingClientRect();
			top  = box.top - dummyBox.top;
			left = box.left - dummyBox.left;

			dummy.parentNode.removeChild(dummy);
		}

		return { top: Math.round(top), left: Math.round(left) };
	},

	getOffset: function getOffset(elem) {
		if (elem.getBoundingClientRect) {
			return this.getOffsetRect(elem);
		} else {
			return this.getOffsetSum(elem);
		}
	}
};


scheduler.$env = {
	isIE: (navigator.userAgent.indexOf("MSIE") >= 0 || navigator.userAgent.indexOf("Trident") >= 0),
	isIE6: (!window.XMLHttpRequest && navigator.userAgent.indexOf("MSIE") >= 0),
	isIE7: (navigator.userAgent.indexOf("MSIE 7.0") >= 0 && navigator.userAgent.indexOf("Trident") < 0),
	isIE8: (navigator.userAgent.indexOf("MSIE 8.0") >= 0 && navigator.userAgent.indexOf("Trident") >= 0),
	isOpera: (navigator.userAgent.indexOf("Opera") >= 0),
	isChrome: (navigator.userAgent.indexOf("Chrome") >= 0),
	isKHTML: (navigator.userAgent.indexOf("Safari") >= 0 || navigator.userAgent.indexOf("Konqueror") >= 0),
	isFF: (navigator.userAgent.indexOf("Firefox") >= 0),
	isIPad: (navigator.userAgent.search(/iPad/gi) >= 0),
	isEdge: (navigator.userAgent.indexOf("Edge")!=-1)
};
scheduler.$ajax = {

	_obj: scheduler,
	// if false - dhxr param will added to prevent caching on client side (default),
	// if true - do not add extra params
	cache: true,

	// default method for load/loadStruct, post/get allowed
	method: "get",

	parse: function(data) {
		if (typeof data !== "string") return data;

		var obj;
		data = data.replace(/^[\s]+/,"");
		if (window.DOMParser && !scheduler.$env.isIE) { // ff,ie9
			obj = (new window.DOMParser()).parseFromString(data, "text/xml");
		} else if (window.ActiveXObject !== window.undefined) {
			obj = new window.ActiveXObject("Microsoft.XMLDOM");
			obj.async = "false";
			obj.loadXML(data);
		}
		return obj;
	},
	xmltop: function(tagname, xhr, obj) {
		if (typeof xhr.status == "undefined" || xhr.status < 400) {
			var xml = (!xhr.responseXML) ? this.parse(xhr.responseText || xhr) : (xhr.responseXML || xhr);
			if (xml && xml.documentElement !== null && !xml.getElementsByTagName("parsererror").length) {
				return xml.getElementsByTagName(tagname)[0];
			}
		}
		if (obj !== -1) this._obj.callEvent("onLoadXMLError",["Incorrect XML", arguments[1], obj]);
		return document.createElement("DIV");
	},
	xpath: function(xpathExp, docObj) {
		if (!docObj.nodeName) docObj = docObj.responseXML || docObj;
		if (scheduler.$env.isIE) {
			return docObj.selectNodes(xpathExp)||[];
		} else {
			var rows = [];
			var first;
			var col = (docObj.ownerDocument||docObj).evaluate(xpathExp, docObj, null, XPathResult.ANY_TYPE, null);

			while (true){
				first = col.iterateNext();
				if(first){
					rows.push(first);
				}else{
					break;
				}
			}
			return rows;
		}
	},
	query: function(config) {
		this._call(
			(config.method || "GET"),
			config.url,
			config.data || "",
			(config.async || true),
			config.callback,
			null,
			config.headers
		);
	},
	get: function(url, onLoad) {
		this._call("GET", url, null, true, onLoad);
	},
	getSync: function(url) {
		return this._call("GET", url, null, false);
	},
	put: function(url, postData, onLoad) {
		this._call("PUT", url, postData, true, onLoad);
	},
	del: function(url, postData, onLoad) {
		this._call("DELETE", url, postData, true, onLoad);
	},
	post: function(url, postData, onLoad) {
		if (arguments.length == 1) {
			postData = "";
		} else if (arguments.length == 2 && (typeof(postData) == "function" || typeof(window[postData]) == "function")) {
			onLoad = postData;
			postData = "";
		} else {
			postData = String(postData);
		}
		this._call("POST", url, postData, true, onLoad);
	},
	postSync: function(url, postData) {
		postData = (postData === null ? "" : String(postData));
		return this._call("POST", url, postData, false);
	},
	getLong: function(url, onLoad) {
		this._call("GET", url, null, true, onLoad, {url:url});
	},
	postLong: function(url, postData, onLoad) {
		if (arguments.length == 2 && (typeof(postData) == "function" || typeof(window[postData]))) {
			onLoad = postData;
			postData = "";
		}
		this._call("POST", url, postData, true, onLoad, {url:url, postData:postData});
	},
	_call: function(method, url, postData, async, onLoad, longParams, headers) {
		var scheduler = this._obj;
		var t = (window.XMLHttpRequest && !scheduler.$env.isIE ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"));
		var isQt = (navigator.userAgent.match(/AppleWebKit/) !== null && navigator.userAgent.match(/Qt/) !== null && navigator.userAgent.match(/Safari/) !== null);


		if (!!async) {
			t.onreadystatechange = function() {
				if ((t.readyState == 4) || (isQt && t.readyState == 3)) { // what for long response and status 404?
					if (t.status != 200 || t.responseText === "")
						if (!scheduler.callEvent("onAjaxError", [t])) return;

					window.setTimeout(function(){
						if (typeof(onLoad) == "function") {
							onLoad.apply(window, [{xmlDoc:t, filePath:url}]); // dhtmlx-compat, response.xmlDoc.responseXML/responseText
						}
						if (longParams) {
							if (typeof(longParams.postData) != "undefined") {
								this.postLong(longParams.url, longParams.postData, onLoad);
							} else {
								this.getLong(longParams.url, onLoad);
							}
						}
						onLoad = null;
						t = null;
					},1);
				}
			};
		}

		if (method == "GET" && !this.cache) {
			url += (url.indexOf("?")>=0?"&":"?")+"dhxr"+new Date().getTime()+"=1";
		}

		t.open(method, url, async);

		if (headers){
			for (var key in headers)
				t.setRequestHeader(key, headers[key]);
		} else if (method.toUpperCase() == "POST" || method == "PUT" || method == "DELETE") {
			t.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		} else if (method == "GET") {
			postData = null;
		}

		t.setRequestHeader("X-Requested-With", "XMLHttpRequest");

		t.send(postData);

		if (!async) return {xmlDoc:t, filePath:url}; // dhtmlx-compat, response.xmlDoc.responseXML/responseText

	},
	urlSeparator: function(str){
		if (str.indexOf("?") != -1)
			return "&";
		else
			return "?";
	}
};
scheduler.date={
	init:function(){
		var s = scheduler.locale.date.month_short;
		var t = scheduler.locale.date.month_short_hash = {};
		for (var i = 0; i < s.length; i++)
			t[s[i]]=i;

		var s = scheduler.locale.date.month_full;
		var t = scheduler.locale.date.month_full_hash = {};
		for (var i = 0; i < s.length; i++)
			t[s[i]]=i;
	},
	date_part:function(date){
		var old = new Date(date);
		date.setHours(0);
		date.setMinutes(0);
		date.setSeconds(0);
		date.setMilliseconds(0);
		if (date.getHours() && //shift to yesterday on dst
			(date.getDate() < old.getDate() || date.getMonth() < old.getMonth() || date.getFullYear() < old.getFullYear()) )
			date.setTime(date.getTime() + 60 * 60 * 1000 * (24 - date.getHours()));
		return date;
	},
	time_part:function(date){
		return (date.valueOf()/1000 - date.getTimezoneOffset()*60)%86400;
	},
	week_start:function(date){
		var shift=date.getDay();
		if (scheduler.config.start_on_monday){
			if (shift===0) shift=6;
			else shift--;
		}
		return this.date_part(this.add(date,-1*shift,"day"));
	},
	month_start:function(date){
		date.setDate(1);
		return this.date_part(date);
	},
	year_start:function(date){
		date.setMonth(0);
		return this.month_start(date);
	},
	day_start:function(date){
		return this.date_part(date);
	},
	_add_days:function(date, inc){
		var ndate = new Date(date.valueOf());

		ndate.setDate(ndate.getDate() + inc);

		// Workaround for Safari/iOS timezone bug, ref:OKZ-149693
		if(inc == Math.round(inc) && inc > 0){
			var datesDiff = +ndate - +date,
				rest = datesDiff % (24*60*60*1000);
			if(rest && date.getTimezoneOffset() == ndate.getTimezoneOffset()){
				var hours = rest / (60* 60 * 1000);
				ndate.setTime(ndate.getTime() + (24 - hours) * 60 * 60 * 1000);
			}
		}

		if (inc >= 0 && (!date.getHours() && ndate.getHours()) &&//shift to yesterday on dst
			(ndate.getDate() < date.getDate() || ndate.getMonth() < date.getMonth() || ndate.getFullYear() < date.getFullYear()) )
			ndate.setTime(ndate.getTime() + 60 * 60 * 1000 * (24 - ndate.getHours()));
		return ndate;
	},
	add:function(date,inc,mode){
		var ndate=new Date(date.valueOf());
		switch(mode){
			case "day":
				ndate = scheduler.date._add_days(ndate, inc);
				break;
			case "week":
				ndate = scheduler.date._add_days(ndate, inc * 7);
				break;
			case "month": ndate.setMonth(ndate.getMonth()+inc); break;
			case "year": ndate.setYear(ndate.getFullYear()+inc); break;
			case "hour":
				/*
				 setHour(getHour() + inc) and setMinutes gives weird result when is applied on a Daylight Saving time switch
				 setTime seems working as expected
				*/
				ndate.setTime(ndate.getTime() + inc * 60 * 60 * 1000);
				break;
			case "minute":
				ndate.setTime(ndate.getTime() + inc * 60 * 1000);
				break;
			default:
				return scheduler.date["add_"+mode](date,inc,mode);
		}
		return ndate;
	},
	to_fixed:function(num){
		if (num<10)	return "0"+num;
		return num;
	},
	copy:function(date){
		return new Date(date.valueOf());
	},
	date_to_str:function(format,utc){
		format=format.replace(/%[a-zA-Z]/g,function(a){
			switch(a){
				case "%d": return "\"+scheduler.date.to_fixed(date.getDate())+\"";
				case "%m": return "\"+scheduler.date.to_fixed((date.getMonth()+1))+\"";
				case "%j": return "\"+date.getDate()+\"";
				case "%n": return "\"+(date.getMonth()+1)+\"";
				case "%y": return "\"+scheduler.date.to_fixed(date.getFullYear()%100)+\""; 
				case "%Y": return "\"+date.getFullYear()+\"";
				case "%D": return "\"+scheduler.locale.date.day_short[date.getDay()]+\"";
				case "%l": return "\"+scheduler.locale.date.day_full[date.getDay()]+\"";
				case "%M": return "\"+scheduler.locale.date.month_short[date.getMonth()]+\"";
				case "%F": return "\"+scheduler.locale.date.month_full[date.getMonth()]+\"";
				case "%h": return "\"+scheduler.date.to_fixed((date.getHours()+11)%12+1)+\"";
				case "%g": return "\"+((date.getHours()+11)%12+1)+\"";
				case "%G": return "\"+date.getHours()+\"";
				case "%H": return "\"+scheduler.date.to_fixed(date.getHours())+\"";
				case "%i": return "\"+scheduler.date.to_fixed(date.getMinutes())+\"";
				case "%a": return "\"+(date.getHours()>11?\"pm\":\"am\")+\"";
				case "%A": return "\"+(date.getHours()>11?\"PM\":\"AM\")+\"";
				case "%s": return "\"+scheduler.date.to_fixed(date.getSeconds())+\"";
				case "%W": return "\"+scheduler.date.to_fixed(scheduler.date.getISOWeek(date))+\"";
				default: return a;
			}
		});
		if (utc) format=format.replace(/date\.get/g,"date.getUTC");
		return new Function("date","return \""+format+"\";");
	},
	str_to_date:function(format,utc){
		var splt="var temp=date.match(/[a-zA-Z]+|[0-9]+/g);";
		var mask=format.match(/%[a-zA-Z]/g);
		for (var i=0; i<mask.length; i++){
			switch(mask[i]){
				case "%j":
				case "%d": splt+="set[2]=temp["+i+"]||1;";
					break;
				case "%n":
				case "%m": splt+="set[1]=(temp["+i+"]||1)-1;";
					break;
				case "%y": splt+="set[0]=temp["+i+"]*1+(temp["+i+"]>50?1900:2000);";
					break;
				case "%g":
				case "%G":
				case "%h": 
				case "%H":
							splt+="set[3]=temp["+i+"]||0;";
					break;
				case "%i":
							splt+="set[4]=temp["+i+"]||0;";
					break;
				case "%Y": splt+="set[0]=temp["+i+"]||0;";
					break;
				case "%a":					
				case "%A": splt+="set[3]=set[3]%12+((temp["+i+"]||'').toLowerCase()=='am'?0:12);";
					break;					
				case "%s": splt+="set[5]=temp["+i+"]||0;";
					break;
				case "%M": splt+="set[1]=scheduler.locale.date.month_short_hash[temp["+i+"]]||0;";
					break;
				case "%F": splt+="set[1]=scheduler.locale.date.month_full_hash[temp["+i+"]]||0;";
					break;
				default:
					break;
			}
		}
		var code ="set[0],set[1],set[2],set[3],set[4],set[5]";
		if (utc) code =" Date.UTC("+code+")";
		return new Function("date","var set=[0,0,1,0,0,0]; "+splt+" return new Date("+code+");");
	},
	getISOWeek: function(ndate) {
		if(!ndate) return false;
		ndate = this.date_part(new Date(ndate));
		var nday = ndate.getDay();
		if (nday === 0) {
			nday = 7;
		}
		var first_thursday = new Date(ndate.valueOf());
		first_thursday.setDate(ndate.getDate() + (4 - nday));
		var year_number = first_thursday.getFullYear(); // year of the first Thursday
		var ordinal_date = Math.round( (first_thursday.getTime() - new Date(year_number, 0, 1).getTime()) / 86400000); //ordinal date of the first Thursday - 1 (so not really ordinal date)
		var week_number = 1 + Math.floor( ordinal_date / 7);
		return week_number;
	},
	getUTCISOWeek: function(ndate){
		return this.getISOWeek(this.convert_to_utc(ndate));
	},
	convert_to_utc: function(date) {
		return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
	}
};
scheduler.locale = {
	date:{
		month_full:["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		month_short:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		day_full:["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		day_short:["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
	},
	labels:{
		dhx_cal_today_button:"Today",
		day_tab:"Day",
		week_tab:"Week",
		month_tab:"Month",
		new_event:"New event",
		icon_save:"Save",
		icon_cancel:"Cancel",
		icon_details:"Details",
		icon_edit:"Edit",
		icon_delete:"Delete",
		confirm_closing:"",//Your changes will be lost, are your sure ?
		confirm_deleting:"Event will be deleted permanently, are you sure?",
		section_description:"Description",
		section_time:"Time period",
		full_day:"Full day",

		/*recurring events*/
		confirm_recurring:"Do you want to edit the whole set of repeated events?",
		section_recurring:"Repeat event",
		button_recurring:"Disabled",
		button_recurring_open:"Enabled",
		button_edit_series: "Edit series",
		button_edit_occurrence: "Edit occurrence",

		/*agenda view extension*/
		agenda_tab:"Agenda",
		date:"Date",
		description:"Description",

		/*year view extension*/
		year_tab:"Year",

		/* week agenda extension */
		week_agenda_tab: "Agenda",

		/*grid view extension*/
		grid_tab: "Grid",

		/* touch tooltip*/
		drag_to_create:"Drag to create",
		drag_to_move:"Drag to move",

		/* dhtmlx message default buttons */
		message_ok:"OK",
		message_cancel:"Cancel",

		/* wai aria labels for non-text controls */
		next: "Next",
		prev: "Previous",
		year: "Year",
		month: "Month",
		day: "Day",
		hour:"Hour",
		minute: "Minute"
	}
};


/*
%e	Day of the month without leading zeros (01..31)
%d	Day of the month, 2 digits with leading zeros (01..31)
%j	Day of the year, 3 digits with leading zeros (001..366)
%a	A textual representation of a day, two letters
%W	A full textual representation of the day of the week

%c	Numeric representation of a month, without leading zeros (0..12)
%m	Numeric representation of a month, with leading zeros (00..12)
%b	A short textual representation of a month, three letters (Jan..Dec)
%M	A full textual representation of a month, such as January or March (January..December)

%y	A two digit representation of a year (93..03)
%Y	A full numeric representation of a year, 4 digits (1993..03)
*/

scheduler.config={
	default_date: "%j %M %Y",
	month_date: "%F %Y",
	load_date: "%Y-%m-%d",
	week_date: "%l",
	day_date: "%D, %F %j",
	hour_date: "%H:%i",
	month_day: "%d",
	xml_date: "%m/%d/%Y %H:%i",
	api_date: "%d-%m-%Y %H:%i",
	preserve_length:true,
	time_step: 5,

	start_on_monday: 1,
	first_hour: 0,
	last_hour: 24,
	readonly: false,
	drag_resize: 1,
	drag_move: 1,
	drag_create: 1,
	dblclick_create: 1,
	edit_on_create: 1,
	details_on_create: 0,
	resize_month_events:false,
	resize_month_timed:false,

	cascade_event_display: false,
	cascade_event_count: 4,
	cascade_event_margin: 30,

	multi_day:true,
	multi_day_height_limit: 0,

	drag_lightbox: true,
	preserve_scroll: true,
	select: true,

	server_utc: false,
	touch:true,
	touch_tip:true,
	touch_drag:500,
	quick_info_detached:true,

	positive_closing: false,

	drag_highlight: true,
	limit_drag_out: false,
	icons_edit: ["icon_save", "icon_cancel"],
	icons_select: ["icon_details", "icon_edit", "icon_delete"],
	buttons_left: ["dhx_save_btn", "dhx_cancel_btn"],
	buttons_right: ["dhx_delete_btn"],
	lightbox: {
		sections: [
			{name: "description", map_to: "text", type: "textarea", focus: true},
			{name: "time", height: 72, type: "time", map_to: "auto"}
		]
	},
	highlight_displayed_event: true,
	left_border: false,

	ajax_error: "alert",//"ignore"|"console"
	delay_render: 0,
	timeline_swap_resize: true,
	wai_aria_attributes: true,
	wai_aria_application_role: true
};

scheduler.config.buttons_left.$inital = scheduler.config.buttons_left.join();
scheduler.config.buttons_right.$inital = scheduler.config.buttons_right.join();

scheduler.templates={};
scheduler.init_templates=function(){
	var labels = scheduler.locale.labels;
	labels.dhx_save_btn 	= labels.icon_save;
	labels.dhx_cancel_btn 	= labels.icon_cancel;
	labels.dhx_delete_btn 	= labels.icon_delete;


	var d=scheduler.date.date_to_str;
	var c=scheduler.config;
	var f = function(a,b){
		for (var c in b)
			if (!a[c]) a[c]=b[c];
	};
	f(scheduler.templates,{
		day_date:d(c.default_date),
		month_date:d(c.month_date),
		week_date:function(d1,d2){
			return scheduler.templates.day_date(d1)+" &ndash; "+scheduler.templates.day_date(scheduler.date.add(d2,-1,"day"));
		},
		day_scale_date:d(c.default_date),
		month_scale_date:d(c.week_date),
		week_scale_date:d(c.day_date),
		hour_scale:d(c.hour_date),
		time_picker:d(c.hour_date),
		event_date:d(c.hour_date),
		month_day:d(c.month_day),
		xml_date:scheduler.date.str_to_date(c.xml_date,c.server_utc),
		load_format:d(c.load_date),
		xml_format:d(c.xml_date,c.server_utc),
		api_date:scheduler.date.str_to_date(c.api_date),
		event_header:function(start,end,ev){
			return scheduler.templates.event_date(start)+" - "+scheduler.templates.event_date(end);
		},
		event_text:function(start,end,ev){
			return ev.text;
		},
		event_class:function(start,end,ev){
			return "";
		},
		month_date_class:function(d){
			return "";
		},
		week_date_class:function(d){
			return "";
		},
		event_bar_date:function(start,end,ev){
			return scheduler.templates.event_date(start)+" ";
		},
		event_bar_text:function(start,end,ev){
			return ev.text;
		},
		month_events_link : function(date, count){
			return "<a>View more("+count+" events)</a>";
		},
		drag_marker_class : function(start, end, event){
			return "";
		},
		drag_marker_content : function(start, end, event){
			return "";
		},
		/* Could be redifined */
		tooltip_date_format: scheduler.date.date_to_str("%Y-%m-%d %H:%i"),
		tooltip_text: function(start, end, event) {
			return "<b>Event:</b> " + event.text + "<br/><b>Start date:</b> " + scheduler.templates.tooltip_date_format(start) + "<br/><b>End date:</b> " + scheduler.templates.tooltip_date_format(end);
		}

	});
	this.callEvent("onTemplatesReady",[]);
};

scheduler.uid = function() {
	if (!this._seed) this._seed = (new Date()).valueOf();
	return this._seed++;
};
scheduler._events = {};
scheduler.clearAll = function() {
	this._events = {};
	this._loaded = {};

	this._edit_id = null;
	this._select_id = null;
	this._drag_id = null;
	this._drag_mode = null;
	this._drag_pos = null;

	this.clear_view();
	this.callEvent("onClearAll", []);
};
scheduler.addEvent = function(start_date, end_date, text, id, extra_data) {
	if (!arguments.length)
		return this.addEventNow();
	var ev = start_date;
	if (arguments.length != 1) {
		ev = extra_data || {};
		ev.start_date = start_date;
		ev.end_date = end_date;
		ev.text = text;
		ev.id = id;
	}
	ev.id = ev.id || scheduler.uid();
	ev.text = ev.text || "";

	if (typeof ev.start_date == "string")  ev.start_date = this.templates.api_date(ev.start_date);
	if (typeof ev.end_date == "string")  ev.end_date = this.templates.api_date(ev.end_date);

	var d = (this.config.event_duration || this.config.time_step) * 60000;
	if (ev.start_date.valueOf() == ev.end_date.valueOf())
		ev.end_date.setTime(ev.end_date.valueOf() + d);

	ev._timed = this.isOneDayEvent(ev);

	var is_new = !this._events[ev.id];
	this._events[ev.id] = ev;
	this.event_updated(ev);
	if (!this._loading)
		this.callEvent(is_new ? "onEventAdded" : "onEventChanged", [ev.id, ev]);
	return ev.id;
};
scheduler.deleteEvent = function(id, silent) {
	var ev = this._events[id];
	if (!silent && (!this.callEvent("onBeforeEventDelete", [id, ev]) || !this.callEvent("onConfirmedBeforeEventDelete", [id, ev])))
		return;
	if (ev) {
		this._select_id = null;
		delete this._events[id];
		this.event_updated(ev);

		if(this._drag_id == ev.id){
			this._drag_id = null;
			this._drag_mode=null;
			this._drag_pos=null;
		}
	}

	this.callEvent("onEventDeleted", [id, ev]);
};
scheduler.getEvent = function(id) {
	return this._events[id];
};
scheduler.setEvent = function(id, hash) {
	if(!hash.id)
		hash.id = id;

	this._events[id] = hash;
};
scheduler.for_rendered = function(id, method) {
	for (var i = this._rendered.length - 1; i >= 0; i--)
		if (this._rendered[i].getAttribute("event_id") == id)
			method(this._rendered[i], i);
};
scheduler.changeEventId = function(id, new_id) {
	if (id == new_id) return;
	var ev = this._events[id];
	if (ev) {
		ev.id = new_id;
		this._events[new_id] = ev;
		delete this._events[id];
	}
	this.for_rendered(id, function(r) {
		r.setAttribute("event_id", new_id);
	});
	if (this._select_id == id) this._select_id = new_id;
	if (this._edit_id == id) this._edit_id = new_id;
	//if (this._drag_id==id) this._drag_id=new_id;
	this.callEvent("onEventIdChange", [id, new_id]);
};

(function() {
	var attrs = ["text", "Text", "start_date", "StartDate", "end_date", "EndDate"];
	var create_getter = function(name) {
		return function(id) { return (scheduler.getEvent(id))[name]; };
	};
	var create_setter = function(name) {
		return function(id, value) {
			var ev = scheduler.getEvent(id);
			ev[name] = value;
			ev._changed = true;
			ev._timed = this.isOneDayEvent(ev);
			scheduler.event_updated(ev, true);
		};
	};
	for (var i = 0; i < attrs.length; i += 2) {
		scheduler["getEvent" + attrs[i + 1]] = create_getter(attrs[i]);
		scheduler["setEvent" + attrs[i + 1]] = create_setter(attrs[i]);
	}
})();

scheduler.event_updated = function(ev, force) {
	if (this.is_visible_events(ev))
		this.render_view_data();
	else
		this.clear_event(ev.id);
};
scheduler.is_visible_events = function(ev) {
	//if in displayed dates
	var in_visible_range = (ev.start_date.valueOf() < this._max_date.valueOf() && this._min_date.valueOf() < ev.end_date.valueOf());

	if(in_visible_range){

		//end dates are not between last/first hours
		var evFirstHour = ev.start_date.getHours(),
			evLastHour = ev.end_date.getHours() + (ev.end_date.getMinutes()/60),
			lastHour = this.config.last_hour,
			firstHour = this.config.first_hour;

		var end_dates_visible = (this._table_view || !((evLastHour > lastHour || evLastHour < firstHour) && (evFirstHour >= lastHour || evFirstHour < firstHour)));

		if(end_dates_visible){
			return true;
		}else{

			//event is bigger than area hidden between last/first hours
			var event_duration = (ev.end_date.valueOf() - ev.start_date.valueOf()) / (1000*60*60),//hours
				hidden_duration = 24 - (this.config.last_hour - this.config.first_hour);

			return !!((event_duration > hidden_duration) || (evFirstHour < lastHour && evLastHour >= firstHour));

		}
	}else{
		return false;
	}
};
scheduler.isOneDayEvent = function(ev) {
	var delta = ev.end_date.getDate() - ev.start_date.getDate();

	if (!delta)
		return ev.start_date.getMonth() == ev.end_date.getMonth() && ev.start_date.getFullYear() == ev.end_date.getFullYear();
	else {
		if (delta < 0)  delta = Math.ceil((ev.end_date.valueOf() - ev.start_date.valueOf()) / (24 * 60 * 60 * 1000));
		return (delta == 1 && !ev.end_date.getHours() && !ev.end_date.getMinutes() && (ev.start_date.getHours() || ev.start_date.getMinutes() ));
	}

};
scheduler.get_visible_events = function(only_timed) {
	//not the best strategy for sure
	var stack = [];

	for (var id in this._events)
		if (this.is_visible_events(this._events[id]))
			if (!only_timed || this._events[id]._timed)
				if (this.filter_event(id, this._events[id]))
					stack.push(this._events[id]);

	return stack;
};
scheduler.filter_event = function(id, ev) {
	var filter = this["filter_" + this._mode];
	return (filter) ? filter(id, ev) : true;
};
scheduler._is_main_area_event = function(ev){
	return !!ev._timed;
};
scheduler.render_view_data = function(evs, hold) {
	var full = false;
	if (!evs) {
		full = true;
		if (this._not_render) {
			this._render_wait = true;
			return;
		}
		this._render_wait = false;

		this.clear_view();
		evs = this.get_visible_events(!(this._table_view || this.config.multi_day));
	}
	for(var i= 0, len = evs.length; i < len; i++){
		this._recalculate_timed(evs[i]);
	}

	if (this.config.multi_day && !this._table_view) {

		var tvs = [];
		var tvd = [];
		for (var i = 0; i < evs.length; i++) {
			if (this._is_main_area_event(evs[i]))
				tvs.push(evs[i]); 
			else
				tvd.push(evs[i]);
		}

		// multiday events
		this._rendered_location = this._els['dhx_multi_day'][0];
		this._table_view = true;
		this.render_data(tvd, hold);
		this._table_view = false;

		// normal events
		this._rendered_location = this._els['dhx_cal_data'][0];
		this._table_view = false;
		this.render_data(tvs, hold);

	} else {
		this._rendered_location = this._els['dhx_cal_data'][0];
		this.render_data(evs, hold);
	}

	if(full){
		this.callEvent("onDataRender", []);
	}
};


scheduler._view_month_day = function(e){
	var date = scheduler.getActionData(e).date;
	if(!scheduler.callEvent("onViewMoreClick", [date]))
		return;
	scheduler.setCurrentView(date, "day");
};

scheduler._render_month_link = function(ev){
	var parent = this._rendered_location;
	var toRender = this._lame_clone(ev);

	//render links in each cell of multiday events
	for(var d = ev._sday; d < ev._eday; d++){

		toRender._sday = d;
		toRender._eday = d+1;

		var date = scheduler.date;
		var curr = scheduler._min_date;
		curr = date.add(curr, toRender._sweek, "week");
		curr = date.add(curr, toRender._sday, "day");
		var count = scheduler.getEvents(curr, date.add(curr, 1, "day")).length;

		var pos = this._get_event_bar_pos(toRender);
		var widt = (pos.x2 - pos.x);

		var el = document.createElement("div");
		el.onclick = function(e){scheduler._view_month_day(e||event);};
		el.className = "dhx_month_link";
		el.style.top = pos.y + "px";
		el.style.left = pos.x + "px";
		el.style.width = widt + "px";
		el.innerHTML = scheduler.templates.month_events_link(curr, count);
		this._rendered.push(el);

		parent.appendChild(el);
	}
};

scheduler._recalculate_timed = function(id){
	if(!id) return;
	var ev;
	if(typeof(id) != "object")
		ev = this._events[id];
	else
		ev = id;
	if(!ev) return;
	ev._timed = scheduler.isOneDayEvent(ev);
};
scheduler.attachEvent("onEventChanged", scheduler._recalculate_timed);
scheduler.attachEvent("onEventAdded", scheduler._recalculate_timed);

scheduler.render_data = function(evs, hold) {
	evs = this._pre_render_events(evs, hold);

	for (var i = 0; i < evs.length; i++)
		if (this._table_view){
			if(scheduler._mode != 'month'){
				this.render_event_bar(evs[i]);//may be multiday section on other views
			}else{

				var max_evs = scheduler.config.max_month_events;
				if(max_evs !== max_evs*1 || evs[i]._sorder < max_evs){
					//of max number events per month cell is set and event can be rendered
					this.render_event_bar(evs[i]);
				}else if(max_evs !== undefined && evs[i]._sorder == max_evs){
					//render 'view more' links
					scheduler._render_month_link(evs[i]);
				}else{
					//do not render events with ordinal number > maximum events per cell
				}
			}



		}else
			this.render_event(evs[i]);
};

scheduler._get_first_visible_cell = function(cells) {
	for (var i = 0; i < cells.length; i++) {
		if ((cells[i].className || "").indexOf("dhx_scale_ignore") == -1) {
			return cells[i];
		}
	}
	// if no visible cell found, return cells[0] to be more tolerant, since it's the original logic
	return cells[0];
};

scheduler._pre_render_events = function(evs, hold) {
	var hb = this.xy.bar_height;
	var h_old = this._colsS.heights;
	var h = this._colsS.heights = [0, 0, 0, 0, 0, 0, 0];
	var data = this._els["dhx_cal_data"][0];

	if (!this._table_view)
		evs = this._pre_render_events_line(evs, hold); //ignore long events for now
	else
		evs = this._pre_render_events_table(evs, hold);

	if (this._table_view) {
		if (hold)
			this._colsS.heights = h_old;
		else {
			var evl = data.firstChild;
			if (evl.rows) {
				for (var i = 0; i < evl.rows.length; i++) {
					h[i]++;
					var cells = evl.rows[i].cells;
					var cellHeight = this._colsS.height - this.xy.month_head_height;
					if ((h[i]) * hb > cellHeight) { // 22 - height of cell's header
						//we have overflow, update heights

						var cHeight = cellHeight;
						if(this.config.max_month_events*1 !== this.config.max_month_events || h[i] <= this.config.max_month_events){
							cHeight = h[i] * hb;
						}else if( (this.config.max_month_events + 1) * hb > cellHeight){
							cHeight = (this.config.max_month_events + 1) * hb;
						}

						for (var j = 0; j < cells.length; j++) {
							cells[j].childNodes[1].style.height = cHeight + "px";
						}
					//	h[i] = (h[i - 1] || 0) + cells[0].offsetHeight;
					}

					h[i] = (h[i - 1] || 0) + scheduler._get_first_visible_cell(cells).offsetHeight;
				}
				h.unshift(0);
				if (evl.parentNode.offsetHeight < evl.parentNode.scrollHeight && !scheduler._colsS.scroll_fix && scheduler.xy.scroll_width) {

					var scale_settings = scheduler._colsS,
						sum_width = scale_settings[scale_settings.col_length],
						row_heights = scale_settings.heights.slice();

					sum_width -= (scheduler.xy.scroll_width || 0);
					this._calc_scale_sizes(sum_width, this._min_date, this._max_date);
					scheduler._colsS.heights = row_heights;

					this.set_xy(this._els["dhx_cal_header"][0], sum_width, this.xy.scale_height);
					scheduler._render_scales(this._els["dhx_cal_header"][0]);
					scheduler._render_month_scale(this._els["dhx_cal_data"][0], this._get_timeunit_start(), this._min_date);

					scale_settings.scroll_fix = true;
				}
			} else {
				if (!evs.length && this._els["dhx_multi_day"][0].style.visibility == "visible")
					h[0] = -1;
				if (evs.length || h[0] == -1) {
					//shift days to have space for multiday events
					var childs = evl.parentNode.childNodes;

					// +1 so multiday events would have 2px from top and 2px from bottom by default
					var full_multi_day_height = (h[0] + 1) * hb + 1;

					var used_multi_day_height = full_multi_day_height;
					var used_multi_day_height_css = full_multi_day_height + "px";
					if (this.config.multi_day_height_limit) {
						used_multi_day_height = Math.min(full_multi_day_height, this.config.multi_day_height_limit) ;
						used_multi_day_height_css = used_multi_day_height + "px";
					}

					data.style.top = (this._els["dhx_cal_navline"][0].offsetHeight + this._els["dhx_cal_header"][0].offsetHeight + used_multi_day_height ) + 'px';
					data.style.height = (this._obj.offsetHeight - parseInt(data.style.top, 10) - (this.xy.margin_top || 0)) + 'px';

					var multi_day_section = this._els["dhx_multi_day"][0];
					multi_day_section.style.height = used_multi_day_height_css;
					multi_day_section.style.visibility = (h[0] == -1 ? "hidden" : "visible");

					// icon
					var multi_day_icon = this._els["dhx_multi_day"][1];
					multi_day_icon.style.height = used_multi_day_height_css;
					multi_day_icon.style.visibility = (h[0] == -1 ? "hidden" : "visible");
					multi_day_icon.className = h[0] ? "dhx_multi_day_icon" : "dhx_multi_day_icon_small";
					this._dy_shift = (h[0] + 1) * hb;
					if(this.config.multi_day_height_limit){
						this._dy_shift = Math.min(this.config.multi_day_height_limit, this._dy_shift);
					}
					h[0] = 0;

					if (used_multi_day_height != full_multi_day_height) {
						data.style.top = (parseInt(data.style.top) + 2) + "px";

						multi_day_section.style.overflowY = "auto";
					//	multi_day_section.style.width = (parseInt(this._els["dhx_cal_navline"][0].style.width)) + "px";

						multi_day_icon.style.position = "fixed";
						multi_day_icon.style.top = "";
						multi_day_icon.style.left = "";
					}
				}
			}
		}
	}

	return evs;
};
scheduler._get_event_sday = function(ev) {
	// get day in current view
	// use rounding for 23 or 25 hour days on DST
	var datePart = this.date.day_start(new Date(ev.start_date));
	return Math.round((datePart.valueOf() - this._min_date.valueOf()) / (24 * 60 * 60 * 1000));
};
scheduler._get_event_mapped_end_date = function(ev) {
	var end_date = ev.end_date;
	if (this.config.separate_short_events) {
		var ev_duration = (ev.end_date - ev.start_date) / 60000; // minutes
		if (ev_duration < this._min_mapped_duration) {
			end_date = this.date.add(end_date, this._min_mapped_duration - ev_duration, "minute");
		}
	}
	return end_date;
};
scheduler._pre_render_events_line = function(evs, hold){
	evs.sort(function(a, b) {
		if (a.start_date.valueOf() == b.start_date.valueOf())
			return a.id > b.id ? 1 : -1;
		return a.start_date > b.start_date ? 1 : -1;
	});
	var days = []; //events by weeks
	var evs_originals = [];

	this._min_mapped_duration = Math.ceil(this.xy.min_event_height * 60 / this.config.hour_size_px);  // values could change along the way

	for (var i = 0; i < evs.length; i++) {
		var ev = evs[i];

		//check date overflow
		var sd = ev.start_date;
		var ed = ev.end_date;
		//check scale overflow
		var sh = sd.getHours();
		var eh = ed.getHours();

		ev._sday = this._get_event_sday(ev); // sday based on event start_date
		if (this._ignores[ev._sday]){
			//ignore event
			evs.splice(i,1);
			i--;
			continue;
		}

		if (!days[ev._sday]) days[ev._sday] = [];

		if (!hold) {
			ev._inner = false;

			var stack = days[ev._sday];

			while (stack.length) {
				var t_ev = stack[stack.length - 1];
				var t_end_date = this._get_event_mapped_end_date(t_ev);
				if (t_end_date.valueOf() <= ev.start_date.valueOf()) {
					stack.splice(stack.length - 1, 1);
				} else {
					break;
				}
			}
			var slot_index = stack.length;
			var sorderSet = false;
			for (var j = 0; j < stack.length; j++) {
				var t_ev = stack[j];
				var t_end_date = this._get_event_mapped_end_date(t_ev);
				if (t_end_date.valueOf() <= ev.start_date.valueOf()) {
					sorderSet = true;
					ev._sorder = t_ev._sorder;
					slot_index = j;
					ev._inner = true;
					break;
				}
			}

			if (stack.length)
				stack[stack.length - 1]._inner = true;

			if (!sorderSet) {
				if (stack.length) {
					if (stack.length <= stack[stack.length - 1]._sorder) {
						if (!stack[stack.length - 1]._sorder)
							ev._sorder = 0;
						else
							for (j = 0; j < stack.length; j++) {
								var _is_sorder = false;
								for (var k = 0; k < stack.length; k++) {
									if (stack[k]._sorder == j) {
										_is_sorder = true;
										break;
									}
								}
								if (!_is_sorder) {
									ev._sorder = j;
									break;
								}
							}
						ev._inner = true;
					} else {
						var _max_sorder = stack[0]._sorder;
						for (j = 1; j < stack.length; j++) {
							if (stack[j]._sorder > _max_sorder)
								_max_sorder = stack[j]._sorder;
						}
						ev._sorder = _max_sorder + 1;
						ev._inner = false;
					}

				} else
					ev._sorder = 0;
			}

			stack.splice(slot_index, slot_index == stack.length ? 0 : 1, ev);

			if (stack.length > (stack.max_count || 0)) {
				stack.max_count = stack.length;
				ev._count = stack.length;
			} else {
				ev._count = (ev._count) ? ev._count : 1;
			}
		}

		if (sh < this.config.first_hour || eh >= this.config.last_hour) {
			// Need to create copy of event as we will be changing it's start/end date
			// e.g. first_hour = 11 and event.start_date hours = 9. Need to preserve that info
			evs_originals.push(ev);
			evs[i] = ev = this._copy_event(ev);

			if (sh < this.config.first_hour) {
				ev.start_date.setHours(this.config.first_hour);
				ev.start_date.setMinutes(0);
			}
			if (eh >= this.config.last_hour) {
				ev.end_date.setMinutes(0);
				ev.end_date.setHours(this.config.last_hour);
			}

			if (ev.start_date > ev.end_date || sh == this.config.last_hour) {
				evs.splice(i, 1);
				i--;
				continue;
			}
		}
	}
	if (!hold) {
		for (var i = 0; i < evs.length; i++) {
			evs[i]._count = days[evs[i]._sday].max_count;
		}
		for (var i = 0; i < evs_originals.length; i++)
			evs_originals[i]._count = days[evs_originals[i]._sday].max_count;
	}

	return evs;
};
scheduler._time_order = function(evs) {
	evs.sort(function(a, b) {
		if (a.start_date.valueOf() == b.start_date.valueOf()) {
			if (a._timed && !b._timed) return 1;
			if (!a._timed && b._timed) return -1;
			return a.id > b.id ? 1 : -1;
		}
		return a.start_date > b.start_date ? 1 : -1;
	});
};
scheduler._pre_render_events_table = function(evs, hold) { // max - max height of week slot
	this._time_order(evs);
	var out = [];
	var weeks = [
		[],
		[],
		[],
		[],
		[],
		[],
		[]
	]; //events by weeks
	var max = this._colsS.heights;
	var start_date;
	var cols = this._cols.length;
	var chunks_info = {};

	for (var i = 0; i < evs.length; i++) {
		var ev = evs[i];
		var id = ev.id;
		if (!chunks_info[id]) {
			chunks_info[id] = {
				first_chunk: true,
				last_chunk: true
			};
		}
		var chunk_info = chunks_info[id];
		var sd = (start_date || ev.start_date);
		var ed = ev.end_date;
		//trim events which are crossing through current view
		if (sd < this._min_date) {
			chunk_info.first_chunk = false;
			sd = this._min_date;
		}
		if (ed > this._max_date) {
			chunk_info.last_chunk = false;
			ed = this._max_date;
		}

		var locate_s = this.locate_holder_day(sd, false, ev);
		ev._sday = locate_s % cols;

		//skip single day events for ignored dates
		if (this._ignores[ev._sday] && ev._timed) continue;

		var locate_e = this.locate_holder_day(ed, true, ev) || cols;
		ev._eday = (locate_e % cols) || cols; //cols used to fill full week, when event end on monday
		ev._length = locate_e - locate_s;

		//3600000 - compensate 1 hour during winter|summer time shift
		ev._sweek = Math.floor((this._correct_shift(sd.valueOf(), 1) - this._min_date.valueOf()) / (60 * 60 * 1000 * 24 * cols));

		//current slot
		var stack = weeks[ev._sweek];
		//check order position
		var stack_line;

		for (stack_line = 0; stack_line < stack.length; stack_line++)
			if (stack[stack_line]._eday <= ev._sday)
				break;

		if (!ev._sorder || !hold) {
			ev._sorder = stack_line;
		}

		if (ev._sday + ev._length <= cols) {
			start_date = null;
			out.push(ev);
			stack[stack_line] = ev;
			//get max height of slot
			max[ev._sweek] = stack.length - 1;
			ev._first_chunk = chunk_info.first_chunk;
			ev._last_chunk = chunk_info.last_chunk;
		} else { // split long event in chunks
			var copy = this._copy_event(ev);
			copy.id = ev.id;
			copy._length = cols - ev._sday;
			copy._eday = cols;
			copy._sday = ev._sday;
			copy._sweek = ev._sweek;
			copy._sorder = ev._sorder;
			copy.end_date = this.date.add(sd, copy._length, "day");
			copy._first_chunk = chunk_info.first_chunk;
			if (chunk_info.first_chunk) {
				chunk_info.first_chunk = false;
			}

			out.push(copy);
			stack[stack_line] = copy;
			start_date = copy.end_date;
			//get max height of slot
			max[ev._sweek] = stack.length - 1;
			i--;
			continue;  //repeat same step
		}
	}
	return out;
};
scheduler._copy_dummy = function() {
	var a = new Date(this.start_date);
	var b = new Date(this.end_date);
	this.start_date = a;
	this.end_date = b;
};
scheduler._copy_event = function(ev) {
	this._copy_dummy.prototype = ev;
	return new this._copy_dummy();
	//return {start_date:ev.start_date, end_date:ev.end_date, text:ev.text, id:ev.id}
};
scheduler._rendered = [];
scheduler.clear_view = function() {
	for (var i = 0; i < this._rendered.length; i++) {
		var obj = this._rendered[i];
		if (obj.parentNode) obj.parentNode.removeChild(obj);
	}
	this._rendered = [];
};
scheduler.updateEvent = function(id) {
	var ev = this.getEvent(id);
	this.clear_event(id);

	if (ev && this.is_visible_events(ev) && this.filter_event(id, ev) && (this._table_view || this.config.multi_day || ev._timed)) {
		if (this.config.update_render){
			this.render_view_data(); 
		}else{
			if(this.getState().mode == "month" && !this.getState().drag_id && !this.isOneDayEvent(ev)){
				this.render_view_data();
			}else{
				this.render_view_data([ev], true);
			}
		}
	}
};
scheduler.clear_event = function(id) {
	this.for_rendered(id, function(node, i) {
		if (node.parentNode)
			node.parentNode.removeChild(node);
		scheduler._rendered.splice(i, 1);
	});
};
scheduler._y_from_date = function(date){
	var sm = date.getHours() * 60 + date.getMinutes();
	return ((Math.round((sm * 60 * 1000 - this.config.first_hour * 60 * 60 * 1000) * this.config.hour_size_px / (60 * 60 * 1000))) % (this.config.hour_size_px * 24)); //42px/hour
};
scheduler._calc_event_y = function(ev, min_height){
	min_height = min_height || 0;
	var sm = ev.start_date.getHours() * 60 + ev.start_date.getMinutes();
	var em = (ev.end_date.getHours() * 60 + ev.end_date.getMinutes()) || (scheduler.config.last_hour * 60);
	var top = this._y_from_date(ev.start_date);

	var height = Math.max(min_height, (em - sm) * this.config.hour_size_px / 60); //42px/hour
	return {
		top: top,
		height: height
	};
};
scheduler.render_event = function(ev) {
	var menu = scheduler.xy.menu_width;
	var menu_offset = (this.config.use_select_menu_space) ? 0 : menu;
	if (ev._sday < 0) return; //can occur in case of recurring event during time shift

	var parent = scheduler.locate_holder(ev._sday);	
	if (!parent) return; //attempt to render non-visible event

	var pos_y = this._calc_event_y(ev, scheduler.xy.min_event_height);
	var top = pos_y.top,
		height = pos_y.height;

	var ev_count = ev._count || 1;
	var ev_sorder = ev._sorder || 0;

	var width = Math.floor((parent.clientWidth - menu_offset) / ev_count);
	var left = ev_sorder * width + 1;
	if (!ev._inner) width = width * (ev_count - ev_sorder);
	if (this.config.cascade_event_display) {
		var limit = this.config.cascade_event_count;
		var margin = this.config.cascade_event_margin;
		left = ev_sorder % limit * margin;
		var right = (ev._inner) ? (ev_count - ev_sorder - 1) % limit * margin / 2 : 0;
		width = Math.floor(parent.clientWidth - menu_offset - left - right);
	}

	var d = this._render_v_bar(ev, menu_offset + left, top, width, height, ev._text_style, scheduler.templates.event_header(ev.start_date, ev.end_date, ev), scheduler.templates.event_text(ev.start_date, ev.end_date, ev));
	this._waiAria.eventAttr(ev, d);
	this._rendered.push(d);
	parent.appendChild(d);

	left = left + parseInt(parent.style.left, 10) + menu_offset;

	if (this._edit_id == ev.id) {

		d.style.zIndex = 1; //fix overlapping issue
		width = Math.max(width - 4, scheduler.xy.editor_width);
		d = document.createElement("div");
		d.setAttribute("event_id", ev.id);

		this._waiAria.eventAttr(ev, d);

		this.set_xy(d, width, height - 20, left, top + (scheduler.xy.event_header_height || 14));
		d.className = "dhx_cal_event dhx_cal_editor";

		if(ev.color){
			d.style.backgroundColor = ev.color;
		}
		var tplClass = scheduler.templates.event_class(ev.start_date, ev.end_date, ev);

		if(tplClass){
			d.className += " " + tplClass;
		}
		var d2 = document.createElement("div");
		this.set_xy(d2, width - 6, height - 26);
		d2.style.cssText += ";margin:2px 2px 2px 2px;overflow:hidden;";

		d.appendChild(d2);
		this._els["dhx_cal_data"][0].appendChild(d);
		this._rendered.push(d);

		d2.innerHTML = "<textarea class='dhx_cal_editor'>" + ev.text + "</textarea>";
		if (this._quirks7) d2.firstChild.style.height = height - 12 + "px"; //IEFIX
		this._editor = d2.firstChild;
		this._editor.onkeydown = function(e) {
			if ((e || event).shiftKey) return true;
			var code = (e || event).keyCode;
			if (code == scheduler.keys.edit_save) scheduler.editStop(true);
			if (code == scheduler.keys.edit_cancel) scheduler.editStop(false);

			if(code == scheduler.keys.edit_save || code == scheduler.keys.edit_cancel){
				if(e.preventDefault) e.preventDefault();
			}

		};
		this._editor.onselectstart = function (e) {
			(e || event).cancelBubble = true;
			return true;
		};
		scheduler._focus(d2.firstChild, true);
		//IE and opera can add x-scroll during focusing
		this._els["dhx_cal_data"][0].scrollLeft = 0;
	}
	if (this.xy.menu_width !== 0 && this._select_id == ev.id) {
		if (this.config.cascade_event_display && this._drag_mode)
			d.style.zIndex = 1; //fix overlapping issue for cascade view in case of dnd of selected event
		var icons = this.config["icons_" + ((this._edit_id == ev.id) ? "edit" : "select")];
		var icons_str = "";
		var bg_color = (ev.color ? ("background-color: " + ev.color + ";") : "");
		var color = (ev.textColor ? ("color: " + ev.textColor + ";") : "");

		var ariaAttr;
		for (var i = 0; i < icons.length; i++) {
			ariaAttr = this._waiAria.eventMenuAttrString(icons[i]);
			icons_str += "<div class='dhx_menu_icon " + icons[i] + "' style='" + bg_color + "" + color + "' title='" + this.locale.labels[icons[i]] + "'"+ariaAttr+"></div>";
		}
		var obj = this._render_v_bar(ev, left - menu + 1, top, menu, icons.length * 20 + 26 - 2, "", "<div style='" + bg_color + "" + color + "' class='dhx_menu_head'></div>", icons_str, true);
		obj.style.left = left - menu + 1;
		this._els["dhx_cal_data"][0].appendChild(obj);
		this._rendered.push(obj);
	}
	if(this.config.drag_highlight && this._drag_id == ev.id){
		this.highlightEventPosition(ev);
	}
};
scheduler._render_v_bar = function (ev, x, y, w, h, style, contentA, contentB, bottom) {
	var d = document.createElement("div");
	var id = ev.id;
	var cs = (bottom) ? "dhx_cal_event dhx_cal_select_menu" : "dhx_cal_event";

	var state = scheduler.getState();
	if(state.drag_id == ev.id){
		cs += " dhx_cal_event_drag";
	}

	if(state.select_id == ev.id){
		cs += " dhx_cal_event_selected";
	}

	var cse = scheduler.templates.event_class(ev.start_date, ev.end_date, ev);
	if (cse) cs = cs + " " + cse;

	if(this.config.cascade_event_display) {
		cs += " dhx_cal_event_cascade";
	}

	var bg_color = (ev.color ? ("background-color:" + ev.color + ";") : "");
	var color = (ev.textColor ? ("color:" + ev.textColor + ";") : "");

	var borderBox = scheduler._border_box_bvents();

	var borderBoxWidth = w - 2;
	var boxWidth = borderBox ? borderBoxWidth : (w-4),
		headerWidth = borderBox ? borderBoxWidth : (w-6),
		bodyWidth = borderBox ? borderBoxWidth : (w-(this._quirks?4:14)),
		footerWidth = borderBox ? (borderBoxWidth - 2) : (w-8);

	var bodyHeight = borderBox ? (h - this.xy.event_header_height - 1) : (h-(this._quirks?20:30) + 1);

	var html = '<div event_id="' + id + '" class="' + cs + '" style="position:absolute; top:' + y + 'px; left:' + x + 'px; width:' + boxWidth + 'px; height:' + h + 'px;' + (style || "") + '"></div>';
	d.innerHTML = html;

	var container = d.cloneNode(true).firstChild;

	if (!bottom && scheduler.renderEvent(container, ev, w, h, contentA, contentB)) {
		return container;
	} else {
		container = d.firstChild;

		var inner_html = '<div class="dhx_event_move dhx_header" style=" width:' + headerWidth + 'px;' + bg_color + '" >&nbsp;</div>';
		inner_html += '<div class="dhx_event_move dhx_title" style="' + bg_color + '' + color + '">' + contentA + '</div>';
		inner_html += '<div class="dhx_body" style=" width:' + bodyWidth + 'px; height:' + bodyHeight + 'px;' + bg_color + '' + color + '">' + contentB + '</div>'; // +2 css specific, moved from render_event

		var footer_class = "dhx_event_resize dhx_footer";
		if (bottom)
			footer_class = "dhx_resize_denied " + footer_class;

		inner_html += '<div class="' + footer_class + '" style=" width:' + footerWidth + 'px;' + (bottom ? ' margin-top:-1px;' : '') + '' + bg_color + '' + color + '" ></div>';

		container.innerHTML = inner_html;
	}

	return container;
};
scheduler.renderEvent = function(){
	return false;
};
scheduler.locate_holder = function(day) {
	if (this._mode == "day") return this._els["dhx_cal_data"][0].firstChild; //dirty
	return this._els["dhx_cal_data"][0].childNodes[day];
};
scheduler.locate_holder_day = function(date, past) {
	var day = Math.floor((this._correct_shift(date, 1) - this._min_date) / (60 * 60 * 24 * 1000));
	//when locating end data of event , we need to use next day if time part was defined
	if (past && this.date.time_part(date)) day++;
	return day;
};



scheduler._get_dnd_order = function(order, ev_height, max_height){
	if(!this._drag_event)
		return order;
	if(!this._drag_event._orig_sorder)
		this._drag_event._orig_sorder = order;
	else
		order = this._drag_event._orig_sorder;

	var evTop = ev_height * order;
	while((evTop + ev_height) > max_height){
		order--;
		evTop -= ev_height;
	}
	order = Math.max(order, 0);
	return order;
};
//scheduler._get_event_bar_pos = function(sday, eday, week, drag){
scheduler._get_event_bar_pos = function(ev){
	var x = this._colsS[ev._sday];
	var x2 = this._colsS[ev._eday];
	if (x2 == x) x2 = this._colsS[ev._eday + 1];
	var hb = this.xy.bar_height;

	var order = ev._sorder;
	if(ev.id == this._drag_id){
		var cellHeight = this._colsS.heights[ev._sweek + 1] - this._colsS.heights[ev._sweek]- this.xy.month_head_height;//22 for month head height
		order = scheduler._get_dnd_order(order, hb, cellHeight);
	}
	var y_event_offset =  order * hb;
	var y = this._colsS.heights[ev._sweek] + (this._colsS.height ? (this.xy.month_scale_height + 2) : 2 ) + y_event_offset;
	return {x:x, x2:x2, y:y};
};

scheduler.render_event_bar = function (ev) {
	var parent = this._rendered_location;
	var pos = this._get_event_bar_pos(ev);

	var y = pos.y;
	var x = pos.x;
	var x2 = pos.x2;
	
	// resize for month mutliday events
	var resize_handle = "";

	//events in ignored dates

	if (!x2) return;

	var resizable = scheduler.config.resize_month_events && this._mode == "month" &&
		(!ev._timed || scheduler.config.resize_month_timed);

	var d = document.createElement("div");
	var left_chunk = (ev.hasOwnProperty("_first_chunk") && ev._first_chunk),
		right_chunk = (ev.hasOwnProperty("_last_chunk") && ev._last_chunk);

	var resize_left = resizable && (ev._timed || left_chunk);
	var resize_right = resizable && (ev._timed || right_chunk);

	var cs = "dhx_cal_event_clear";
	if (!ev._timed || resizable) {
		cs = "dhx_cal_event_line";
	}
	if(left_chunk){
		cs += " dhx_cal_event_line_start";
	}
	if(right_chunk){
		cs += " dhx_cal_event_line_end";
	}
	if(resize_left){
		resize_handle += "<div class='dhx_event_resize dhx_event_resize_start'></div>";
	}
	if(resize_right){
		resize_handle += "<div class='dhx_event_resize dhx_event_resize_end'></div>";
	}

	var cse = scheduler.templates.event_class(ev.start_date, ev.end_date, ev);
	if (cse){
		cs += " " + cse;
	}

	var bg_color = (ev.color ? ("background:" + ev.color + ";") : "");
	var color = (ev.textColor ? ("color:" + ev.textColor + ";") : "");

	var style_text = [
		"position:absolute",
		"top:" + y + "px",
		"left:" + x + "px",
		"width:" + (x2 - x - 15) + "px",
		color,
		bg_color,
		(ev._text_style || "")
	].join(";");

	var html = "<div event_id='" + ev.id + "' class='"+ cs + "' style='"+style_text+"'"+this._waiAria.eventBarAttrString(ev)+">";
	if (resizable) {
		html += resize_handle;
	}
	if(scheduler.getState().mode == "month"){
		ev = scheduler.getEvent(ev.id); // ev at this point could be a part (row in a month view) of a larger event
	}

	if (ev._timed)
		html += scheduler.templates.event_bar_date(ev.start_date, ev.end_date, ev);
	html += scheduler.templates.event_bar_text(ev.start_date, ev.end_date, ev) + '</div>';
	html += '</div>';

	d.innerHTML = html;

	this._rendered.push(d.firstChild);
	parent.appendChild(d.firstChild);
};

scheduler._locate_event = function(node) {
	var id = null;
	while (node && !id && node.getAttribute) {
		id = node.getAttribute("event_id");
		node = node.parentNode;
	}
	return id;
};

scheduler._locate_css = function(e, classname, strict){
	if(strict === undefined)
		strict = true;

	var trg = e.target || e.srcElement;
	var css = '';

	while (trg){
		css = scheduler._getClassName(trg);

		if(css){
			var ind = css.indexOf(classname);
			if (ind >= 0){
				if (!strict)
					return trg;

				//check that we have exact match
				var left = (ind === 0) || (!scheduler._trim(css.charAt(ind - 1)));
				var right = ((ind + classname.length >= css.length)) || (!scheduler._trim(css.charAt(ind + classname.length)));

				if (left && right)
					return trg;
			}
		}

		trg=trg.parentNode;
	}
	return null;
};

scheduler.edit = function(id) {
	if (this._edit_id == id) return;
	this.editStop(false, id);
	this._edit_id = id;
	this.updateEvent(id);
};
scheduler.editStop = function(mode, id) {
	if (id && this._edit_id == id) return;
	var ev = this.getEvent(this._edit_id);
	if (ev) {
		if (mode) ev.text = this._editor.value;
		this._edit_id = null;
		this._editor = null;
		this.updateEvent(ev.id);
		this._edit_stop_event(ev, mode);
	}
};
scheduler._edit_stop_event = function(ev, mode) {
	if (this._new_event) {
		if (!mode) {
			if (ev) // in case of custom lightbox user can already delete event
				this.deleteEvent(ev.id, true);
		} else {
			this.callEvent("onEventAdded", [ev.id, ev]);
		}
		this._new_event = null;
	} else {
		if (mode){
			this.callEvent("onEventChanged", [ev.id, ev]);
		}
	}
};

scheduler.getEvents = function(from, to) {
	var result = [];
	for (var a in this._events) {
		var ev = this._events[a];
		if (ev && ( (!from && !to) || (ev.start_date < to && ev.end_date > from) ))
			result.push(ev);
	}
	return result;
};
scheduler.getRenderedEvent = function(id) {
	if (!id)
		return;
	var rendered_events = scheduler._rendered;
	for (var i=0; i<rendered_events.length; i++) {
		var rendered_event = rendered_events[i];
		if (rendered_event.getAttribute("event_id") == id) {
			return rendered_event;
		}
	}
	return null;
};
scheduler.showEvent = function(id, mode) {
	var ev = (typeof id == "number" || typeof id == "string") ? scheduler.getEvent(id) : id;
	mode = mode||scheduler._mode;

	if (!ev || (this.checkEvent("onBeforeEventDisplay") && !this.callEvent("onBeforeEventDisplay", [ev, mode])))
		return;

	var scroll_hour = scheduler.config.scroll_hour;
	scheduler.config.scroll_hour = ev.start_date.getHours();
	var preserve_scroll = scheduler.config.preserve_scroll;
	scheduler.config.preserve_scroll = false;

	var original_color = ev.color;
	var original_text_color = ev.textColor;
	if (scheduler.config.highlight_displayed_event) {
		ev.color = scheduler.config.displayed_event_color;
		ev.textColor = scheduler.config.displayed_event_text_color;
	}

	scheduler.setCurrentView(new Date(ev.start_date), mode);

	ev.color = original_color;
	ev.textColor = original_text_color;
	scheduler.config.scroll_hour = scroll_hour;
	scheduler.config.preserve_scroll = preserve_scroll;

	if (scheduler.matrix && scheduler.matrix[mode]) {
		var rendered_event = scheduler.getRenderedEvent(ev.id);
		if(rendered_event)
			scheduler._els.dhx_cal_data[0].scrollTop = scheduler.$domHelpers.getAbsoluteTop(rendered_event) - scheduler.$domHelpers.getAbsoluteTop(scheduler._els.dhx_cal_data[0]) - 20;
	}

	scheduler.callEvent("onAfterEventDisplay", [ev, mode]);
};

scheduler._append_drag_marker = function(m){
	if(m.parentNode) return;
	var zone = scheduler._els["dhx_cal_data"][0];

	var scale = zone.lastChild;
	var className = scheduler._getClassName(scale);
	if(className.indexOf("dhx_scale_holder") < 0 && scale.previousSibling){
		scale = scale.previousSibling;
	}

	className = scheduler._getClassName(scale);
	if (scale && className.indexOf("dhx_scale_holder") === 0) {
		scale.appendChild(m);
	}
};

scheduler._update_marker_position = function(m, event){
	var size = scheduler._calc_event_y(event, 0);
	m.style.top = size.top + "px";
	m.style.height = size.height + "px";
};

scheduler.highlightEventPosition = function(event){
	var m = document.createElement("div");

	m.setAttribute("event_id", event.id);
	this._rendered.push(m);
	this._update_marker_position(m, event);

	var css = this.templates.drag_marker_class(event.start_date, event.end_date, event);
	var html = this.templates.drag_marker_content(event.start_date, event.end_date, event);
	m.className = "dhx_drag_marker";
	if(css)
		m.className += " " + css;
	if(html)
		m.innerHTML = html;
	this._append_drag_marker(m);
};
scheduler._loaded = {};
scheduler._load = function(url, from) {
	url = url || this._load_url;

	if(!url){
		//if scheduler.setLoadMode is called before scheduler.init, initial rendering will invoke data loading while url is undefined
		return;
	}

	url += (url.indexOf("?") == -1 ? "?" : "&") + "timeshift=" + (new Date()).getTimezoneOffset();
	if (this.config.prevent_cache)    url += "&uid=" + this.uid();
	var to;
	from = from || this._date;

	if (this._load_mode) {
		var lf = this.templates.load_format;

		from = this.date[this._load_mode + "_start"](new Date(from.valueOf()));
		while (from > this._min_date) from = this.date.add(from, -1, this._load_mode);
		to = from;

		var cache_line = true;
		while (to < this._max_date) {
			to = this.date.add(to, 1, this._load_mode);
			if (this._loaded[lf(from)] && cache_line)
				from = this.date.add(from, 1, this._load_mode); else cache_line = false;
		}

		var temp_to = to;
		do {
			to = temp_to;
			temp_to = this.date.add(to, -1, this._load_mode);
		} while (temp_to > from && this._loaded[lf(temp_to)]);

		if (to <= from)
			return false; //already loaded

		scheduler.$ajax.get(url + "&from=" + lf(from) + "&to=" + lf(to), function(l) {scheduler.on_load(l);});

		while (from < to) {
			this._loaded[lf(from)] = true;
			from = this.date.add(from, 1, this._load_mode);
		}
	} else
		scheduler.$ajax.get(url, function(l) {scheduler.on_load(l);});
	this.callEvent("onXLS", []);
	return true;
};
scheduler.on_load = function(loader) {
	var evs;
	var error = false;
	if (this._process && this._process != "xml") {
		try{
			evs = this[this._process].parse(loader.xmlDoc.responseText);
		}catch (e){
			error = true;
		}
	} else {
		evs = this._magic_parser(loader);
		if(!evs){
			error = true;
		}
	}
	
	if(error || (loader.xmlDoc.status && loader.xmlDoc.status >= 400)){
		this.callEvent("onLoadError", [loader.xmlDoc]);
		evs = [];
	}
	
	scheduler._process_loading(evs);

	this.callEvent("onXLE", []);
};
scheduler._process_loading = function(evs) {
	this._loading = true;
	this._not_render = true;
	for (var i = 0; i < evs.length; i++) {
		if (!this.callEvent("onEventLoading", [evs[i]])) continue;
		this.addEvent(evs[i]);
	}
	this._not_render = false;
	if (this._render_wait) this.render_view_data();

	this._loading = false;
	if (this._after_call) this._after_call();
	this._after_call = null;
};
scheduler._init_event = function(event) {
	event.text = (event.text || event._tagvalue) || "";
	event.start_date = scheduler._init_date(event.start_date);
	event.end_date = scheduler._init_date(event.end_date);
};

scheduler._init_date = function(date){
	if(!date)
		return null;
	if(typeof date == "string")
		return scheduler.templates.xml_date(date);
	else return new Date(date);
};

scheduler.json = {};
scheduler.json.parse = function(data) {
	if (typeof data == "string") {
		if(window.JSON){
			scheduler._temp = JSON.parse(data);
		}else{
			scheduler._temp = eval("(" + data + ")");
		}

		data = (scheduler._temp) ? scheduler._temp.data || scheduler._temp.d || scheduler._temp : [];
	}

	if (data.dhx_security)
		dhtmlx.security_key = data.dhx_security;

	var collections = (scheduler._temp && scheduler._temp.collections) ? scheduler._temp.collections : {};
	var collections_loaded = false;
	for (var key in collections) {
		if (collections.hasOwnProperty(key)) {
			collections_loaded = true;
			var collection = collections[key];
			var arr = scheduler.serverList[key];
			if (!arr) continue;
			arr.splice(0, arr.length); //clear old options
			for (var j = 0; j < collection.length; j++) {
				var option = collection[j];
				var obj = { key: option.value, label: option.label }; // resulting option object
				for (var option_key in option) {
					if (option.hasOwnProperty(option_key)) {
						if (option_key == "value" || option_key == "label")
							continue;
						obj[option_key] = option[option_key]; // obj['value'] = option['value']
					}
				}
				arr.push(obj);
			}
		}
	}
	if (collections_loaded)
		scheduler.callEvent("onOptionsLoad", []);

	var evs = [];
	for (var i = 0; i < data.length; i++) {
		var event = data[i];
		scheduler._init_event(event);
		evs.push(event);
	}
	return evs;
};
scheduler.parse = function(data, type) {
	this._process = type;
	this.on_load({xmlDoc: {responseText: data}});
};
scheduler.load = function(url, call) {
	if (typeof call == "string") {
		this._process = call;
		call = arguments[2];
	}

	this._load_url = url;
	this._after_call = call;
	this._load(url, this._date);
};
//possible values - day,week,month,year,all
scheduler.setLoadMode = function(mode) {
	if (mode == "all") mode = "";
	this._load_mode = mode;
};

scheduler.serverList = function(name, array) {
	if (array) {
		this.serverList[name] = array.slice(0);
		return this.serverList[name];
	}
	this.serverList[name] = (this.serverList[name] || []);
	return this.serverList[name];
};
scheduler._userdata = {};
scheduler._magic_parser = function(loader) {
	var xml;
	if (!loader.getXMLTopNode) { //from a string
		//var xml_string = loader.xmlDoc.responseText;
		//loader = new dtmlXMLLoaderObject(function() {});
		//loader.loadXMLString(xml_string);
        loader = scheduler.$ajax.parse(loader);
	}

	//xml = loader.getXMLTopNode("data");
	xml = scheduler.$ajax.xmltop("data", loader.xmlDoc);
	if (xml.tagName != "data") return null;//not an xml
	var skey = xml.getAttribute("dhx_security");
	if (skey)
		dhtmlx.security_key = skey;

	var opts = scheduler.$ajax.xpath("//coll_options", loader.xmlDoc);
	for (var i = 0; i < opts.length; i++) {
		var bind = opts[i].getAttribute("for");
		var arr = this.serverList[bind];
		if (!arr) continue;
		arr.splice(0, arr.length);	//clear old options
		var itms = scheduler.$ajax.xpath(".//item", opts[i]);
		for (var j = 0; j < itms.length; j++) {
			var itm = itms[j];
			var attrs = itm.attributes;
			var obj = { key: itms[j].getAttribute("value"), label: itms[j].getAttribute("label")};
			for (var k = 0; k < attrs.length; k++) {
				var attr = attrs[k];
				if (attr.nodeName == "value" || attr.nodeName == "label")
					continue;
				obj[attr.nodeName] = attr.nodeValue;
			}
			arr.push(obj);
		}
	}
	if (opts.length)
		scheduler.callEvent("onOptionsLoad", []);

	var ud = scheduler.$ajax.xpath("//userdata", loader.xmlDoc);
	for (var i = 0; i < ud.length; i++) {
		var udx = this._xmlNodeToJSON(ud[i]);
		this._userdata[udx.name] = udx.text;
	}

	var evs = [];
	xml = scheduler.$ajax.xpath("//event", loader.xmlDoc);

	for (var i = 0; i < xml.length; i++) {
		var ev = evs[i] = this._xmlNodeToJSON(xml[i]);
		scheduler._init_event(ev);
	}
	return evs;
};
scheduler._xmlNodeToJSON = function(node) {
	var t = {};
	for (var i = 0; i < node.attributes.length; i++)
		t[node.attributes[i].name] = node.attributes[i].value;

	for (var i = 0; i < node.childNodes.length; i++) {
		var child = node.childNodes[i];
		if (child.nodeType == 1)
			t[child.tagName] = child.firstChild ? child.firstChild.nodeValue : "";
	}

	if (!t.text) t.text = node.firstChild ? node.firstChild.nodeValue : "";

	return t;
};
scheduler.attachEvent("onXLS", function() {
	if (this.config.show_loading === true) {
		var t;
		t = this.config.show_loading = document.createElement("div");
		t.className = 'dhx_loading';
		t.style.left = Math.round((this._x - 128) / 2) + "px";
		t.style.top = Math.round((this._y - 15) / 2) + "px";
		this._obj.appendChild(t);
	}
});
scheduler.attachEvent("onXLE", function() {
	var t = this.config.show_loading;
	if (t && typeof t == "object") {
			this._obj.removeChild(t);
			this.config.show_loading = true;
		}
});

scheduler.ical={
	parse:function(str){
		var data = str.match(RegExp(this.c_start+"[^\f]*"+this.c_end,""));
		if (!data.length) return;

		// mpl: handle bad unfolding
		data[0]=data[0].replace(/[\r\n]+ /g,"");

		//unfolding 
		data[0]=data[0].replace(/[\r\n]+(?=[a-z \t])/g," ");
		//drop property
		data[0]=data[0].replace(/\;[^:\r\n]*:/g,":");
		
		
		var incoming=[];
		var match;
		var event_r = RegExp("(?:"+this.e_start+")([^\f]*?)(?:"+this.e_end+")","g");
		while ((match=event_r.exec(data)) !== null){
			var e={};
			var param;
			var param_r = /[^\r\n]+[\r\n]+/g;
			while ((param=param_r.exec(match[1])) !== null)
				this.parse_param(param.toString(),e);
			if (e.uid && !e.id) e.id = e.uid; //fallback to UID, when ID is not defined
			incoming.push(e);	
		}
		return incoming;
	},
	parse_param:function(str,obj){
		var d = str.indexOf(":"); 
			if (d==-1) return;
		
		var name = str.substr(0,d).toLowerCase();
		var value = str.substr(d+1).replace(/\\\,/g,",").replace(/[\r\n]+$/,"");
		if (name=="summary")
			name="text";
		else if (name=="dtstart"){
			name = "start_date";
			value = this.parse_date(value,0,0);
		}
		else if (name=="dtend"){
			name = "end_date";
			value = this.parse_date(value,0,0);
		}
		obj[name]=value;
	},
	parse_date:function(value,dh,dm){
		var t = value.split("T");	
		if (t[1]){
			dh=t[1].substr(0,2);
			dm=t[1].substr(2,2);
		}
		var dy = t[0].substr(0,4);
		var dn = parseInt(t[0].substr(4,2),10)-1;
		var dd = t[0].substr(6,2);
		if (scheduler.config.server_utc && !t[1]) { // if no hours/minutes were specified == full day event
			return new Date(Date.UTC(dy,dn,dd,dh,dm)) ;
		}
		return new Date(dy,dn,dd,dh,dm);
	},
	c_start:"BEGIN:VCALENDAR",
	e_start:"BEGIN:VEVENT",
	e_end:"END:VEVENT",
	c_end:"END:VCALENDAR"	
};
scheduler._lightbox_controls = {};
scheduler.formSection = function(name){
	var config = this.config.lightbox.sections;
	var i =0;
	for (i; i < config.length; i++)
		if (config[i].name == name)
			break;
	var section = config[i];
	if (!scheduler._lightbox)
		scheduler.getLightbox();
	var header = document.getElementById(section.id);
	var node = header.nextSibling;

	var result = {
		section: section,
		header: header,
		node: node,
		getValue:function(ev){
			return scheduler.form_blocks[section.type].get_value(node, (ev||{}), section);
		},
		setValue:function(value, ev){
			return scheduler.form_blocks[section.type].set_value(node, value, (ev||{}), section);
		}
	};

	var handler = scheduler._lightbox_controls["get_"+section.type+"_control"];
	return handler?handler(result):result;
};
scheduler._lightbox_controls.get_template_control = function(result) {
	result.control = result.node;
	return result;
};
scheduler._lightbox_controls.get_select_control = function(result) {
	result.control = result.node.getElementsByTagName('select')[0];
	return result;
};
scheduler._lightbox_controls.get_textarea_control = function(result) {
	result.control = result.node.getElementsByTagName('textarea')[0];
	return result;
};
scheduler._lightbox_controls.get_time_control = function(result) {
	result.control = result.node.getElementsByTagName('select'); // array
	return result;
};

scheduler._lightbox_controls.defaults = {
	template: {
		height:30
	},
	textarea: {
		height: 200
	},
	select: {
		height: 23
	},
	time: {
		height: 20
	}
};


scheduler.form_blocks={
	template:{
		render: function(sns){
			var defaults = scheduler._lightbox_controls.defaults.template;
			var defaultHeight = defaults ? defaults.height : 30;
			var height=(sns.height||defaultHeight||30)+"px";
			return "<div class='dhx_cal_ltext dhx_cal_template' style='height:"+height+";'></div>";
		},
		set_value:function(node,value,ev,config){
			node.innerHTML = value||"";
		},
		get_value:function(node,ev,config){
			return node.innerHTML||"";
		},
		focus: function(node){
		}
	},
	textarea:{
		render:function(sns){
			var defaults = scheduler._lightbox_controls.defaults.textarea;
			var defaultHeight = defaults ? defaults.height : 200;
			var height=(sns.height||defaultHeight||"130")+"px";
			return "<div class='dhx_cal_ltext' style='height:"+height+";'><textarea></textarea></div>";
		},
		set_value:function(node,value,ev){
			scheduler.form_blocks.textarea._get_input(node).value=value||"";
		},
		get_value:function(node,ev){
			return scheduler.form_blocks.textarea._get_input(node).value;
		},
		focus:function(node){
			var a = scheduler.form_blocks.textarea._get_input(node);
			scheduler._focus(a, true);
		},
		_get_input: function(node){
			return node.getElementsByTagName("textarea")[0];
		}
	},
	select:{
		render:function(sns){
			var defaults = scheduler._lightbox_controls.defaults.select;
			var defaultHeight = defaults ? defaults.height : 23;
			var height=(sns.height||defaultHeight||"23")+"px";
			var html="<div class='dhx_cal_ltext' style='height:"+height+";'><select style='width:100%;'>";
			for (var i=0; i < sns.options.length; i++)
				html+="<option value='"+sns.options[i].key+"'>"+sns.options[i].label+"</option>";
			html+="</select></div>";
			return html;
		},
		set_value:function(node,value,ev,sns){
			var select = node.firstChild;
			if (!select._dhx_onchange && sns.onchange) {
				select.onchange = sns.onchange;
				select._dhx_onchange = true;
			}
			if (typeof value == "undefined")
				value = (select.options[0]||{}).value;
			select.value=value||"";
		},
		get_value:function(node,ev){
			return node.firstChild.value;
		},
		focus:function(node){
			var a=node.firstChild; scheduler._focus(a, true); 
		}
	},
	time:{
		render:function(sns) {
			if (!sns.time_format) {
				// default order
				sns.time_format = ["%H:%i", "%d", "%m", "%Y"];
			}
			// map: default order => real one
			sns._time_format_order = {};
			var time_format = sns.time_format;

			var cfg = scheduler.config;
			var dt = scheduler.date.date_part(scheduler._currentDate());
			var last = 24*60, first = 0;
			if(scheduler.config.limit_time_select){
				last = 60*cfg.last_hour+1;
				first = 60*cfg.first_hour;
				dt.setHours(cfg.first_hour);
			}
			var html = "";

			for (var p = 0; p < time_format.length; p++) {
				var time_option = time_format[p];

				// adding spaces between selects
				if (p > 0) {
					html += " ";
				}
				var selectBoxClass = "";
				var options = "";
				switch (time_option) {
					case "%Y":
						selectBoxClass = "dhx_lightbox_year_select";
						sns._time_format_order[3] = p;
						//year
						var year = dt.getFullYear()-5; //maybe take from config?
						for (var i=0; i < 10; i++)
							options+="<option value='"+(year+i)+"'>"+(year+i)+"</option>";
						break;
					case "%m":
						selectBoxClass = "dhx_lightbox_month_select";
						sns._time_format_order[2] = p;
						//month
						for (var i=0; i < 12; i++)
							options+="<option value='"+i+"'>"+this.locale.date.month_full[i]+"</option>";
						break;
					case "%d":
						selectBoxClass = "dhx_lightbox_day_select";
						sns._time_format_order[1] = p;
						//days
						for (var i=1; i < 32; i++)
							options+="<option value='"+i+"'>"+i+"</option>";
						break;
					case "%H:%i":
						selectBoxClass = "dhx_lightbox_time_select";
						sns._time_format_order[0] = p;
						//hours
						var i = first;
						var tdate = dt.getDate();
						sns._time_values = [];

						while(i<last){
							var time=this.templates.time_picker(dt);
							options+="<option value='"+i+"'>"+time+"</option>";
							sns._time_values.push(i);
							dt.setTime(dt.valueOf()+this.config.time_step*60*1000);
							var diff = (dt.getDate()!=tdate)?1:0; // moved or not to the next day
							i=diff*24*60+dt.getHours()*60+dt.getMinutes();
						}
						break;
				}

				if(options){

					var ariaAttrs = scheduler._waiAria.lightboxSelectAttrString(time_option);
					var readonly = sns.readonly ? "disabled='disabled'" : "";
					html += "<select class='"+selectBoxClass+"' "+readonly + ariaAttrs+">"+options+"</select> ";
				}
			}
			var defaults = scheduler._lightbox_controls.defaults.select;
			var defaultHeight = defaults ? defaults.height : 23;
			var height = defaultHeight || 30;
			return "<div style='height:"+height+"px;padding-top:0px;font-size:inherit;' class='dhx_section_time'>"+html+"<span style='font-weight:normal; font-size:10pt;'> &nbsp;&ndash;&nbsp; </span>"+html+"</div>";
		},
		set_value:function(node,value,ev,config){
			var cfg = scheduler.config;
			var s=node.getElementsByTagName("select");
			var map = config._time_format_order;
			var start_date, end_date;

			if(cfg.full_day) {
				if (!node._full_day){
					var html = "<label class='dhx_fullday'><input type='checkbox' name='full_day' value='true'> "+scheduler.locale.labels.full_day+"&nbsp;</label></input>";
					if (!scheduler.config.wide_form)
						html = node.previousSibling.innerHTML+html;
					node.previousSibling.innerHTML=html;
					node._full_day=true;
				}
				var input=node.previousSibling.getElementsByTagName("input")[0];
				input.checked = (scheduler.date.time_part(ev.start_date)===0 && scheduler.date.time_part(ev.end_date)===0);

				s[map[0]].disabled=input.checked;
				s[ map[0] + s.length/2 ].disabled=input.checked;

				input.onclick = function(){ 
					if(input.checked) {
						var obj = {};
						scheduler.form_blocks.time.get_value(node,obj,config);

						start_date = scheduler.date.date_part(obj.start_date);
						end_date = scheduler.date.date_part(obj.end_date);

						if (+end_date == +start_date || (+end_date >= +start_date && (ev.end_date.getHours() !== 0 || ev.end_date.getMinutes() !== 0)))
							end_date = scheduler.date.add(end_date, 1, "day");
					}else{
						start_date = null;
						end_date = null;
					}

					s[map[0]].disabled=input.checked;
					s[ map[0] + s.length/2 ].disabled=input.checked;
					
					_fill_lightbox_select(s,0,start_date||ev.start_date);
					_fill_lightbox_select(s,4,end_date||ev.end_date);
				};
			}
			
			if(cfg.auto_end_date && cfg.event_duration) {
				var _update_lightbox_select = function () {
					start_date = new Date(s[map[3]].value,s[map[2]].value,s[map[1]].value,0,s[map[0]].value);
					end_date = new Date(start_date.getTime() + (scheduler.config.event_duration * 60 * 1000));
					_fill_lightbox_select(s, 4, end_date);
				};
				for(var i=0; i<4; i++) {
					s[i].onchange = _update_lightbox_select;
				}
			}
			
			function _fill_lightbox_select(s,i,d) {
				var time_values = config._time_values;
				var direct_value = d.getHours()*60+d.getMinutes();
				var fixed_value = direct_value;
				var value_found = false;
				for (var k=0; k<time_values.length; k++) {
					var t_v = time_values[k];
					if (t_v === direct_value) {
						value_found = true;
						break;
					}
					if (t_v < direct_value)
						fixed_value = t_v;
				}

				s[i+map[0]].value=(value_found)?direct_value:fixed_value;
				if(!(value_found || fixed_value)){
					s[i+map[0]].selectedIndex = -1;//show empty select in FF
				}
				s[i+map[1]].value=d.getDate();
				s[i+map[2]].value=d.getMonth();
				s[i+map[3]].value=d.getFullYear();
			}

			_fill_lightbox_select(s,0,ev.start_date);
			_fill_lightbox_select(s,4,ev.end_date);
		},
		get_value:function(node, ev, config) {
			var s = node.getElementsByTagName("select");
			var map = config._time_format_order;

			ev.start_date=new Date(s[map[3]].value,s[map[2]].value,s[map[1]].value,0,s[map[0]].value);
			ev.end_date=new Date(s[map[3]+4].value,s[map[2]+4].value,s[map[1]+4].value,0,s[map[0]+4].value);

			if(!(s[map[3]].value && s[map[3]+4].value)){
				// use the previous date if start/end years are empty (outside lightbox range)
				var original = scheduler.getEvent(scheduler._lightbox_id);
				if(original){
					ev.start_date = original.start_date;
					ev.end_date = original.end_date;
				}
			}

			if (ev.end_date<=ev.start_date) 
				ev.end_date=scheduler.date.add(ev.start_date,scheduler.config.time_step,"minute");
			return {
				start_date: new Date(ev.start_date),
				end_date: new Date(ev.end_date)
			};
		},
		focus:function(node){
			scheduler._focus(node.getElementsByTagName("select")[0]); 
		}
	}
};
scheduler.showCover=function(box){
	if (box){
		box.style.display="block";

		var scroll_top = window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop;
		var scroll_left = window.pageXOffset||document.body.scrollLeft||document.documentElement.scrollLeft;

		var view_height = window.innerHeight||document.documentElement.clientHeight;

		if(scroll_top) // if vertical scroll on window
			box.style.top=Math.round(scroll_top+Math.max((view_height-box.offsetHeight)/2, 0))+"px";
		else // vertical scroll on body
			box.style.top=Math.round(Math.max(((view_height-box.offsetHeight)/2), 0) + 9)+"px"; // +9 for compatibility with auto tests

		// not quite accurate but used for compatibility reasons
		if(document.documentElement.scrollWidth > document.body.offsetWidth) // if horizontal scroll on the window
			box.style.left=Math.round(scroll_left+(document.body.offsetWidth-box.offsetWidth)/2)+"px";
		else // horizontal scroll on the body
			box.style.left=Math.round((document.body.offsetWidth-box.offsetWidth)/2)+"px";
	}
    this.show_cover();
};
scheduler.showLightbox=function(id){
	if (!id) return;
	if (!this.callEvent("onBeforeLightbox",[id])) {
		if (this._new_event)
			this._new_event = null;
		return;
	}
	var box = this.getLightbox();
	this.showCover(box);
	this._fill_lightbox(id,box);
	this._waiAria.lightboxVisibleAttr(box);
	this.callEvent("onLightbox",[id]);
};
scheduler._fill_lightbox = function(id, box) {
	var ev = this.getEvent(id);
	var s = box.getElementsByTagName("span");
	var lightboxHeader = [];

	if (scheduler.templates.lightbox_header) {
		lightboxHeader.push("");
		var headerContent = scheduler.templates.lightbox_header(ev.start_date, ev.end_date, ev);
		lightboxHeader.push(headerContent);
		s[1].innerHTML = "";
		s[2].innerHTML = headerContent;
	} else {
		var headerDate = this.templates.event_header(ev.start_date, ev.end_date, ev);
		var headerTitle = (this.templates.event_bar_text(ev.start_date, ev.end_date, ev) || "").substr(0, 70); //IE6 fix;

		lightboxHeader.push(headerDate);
		lightboxHeader.push(headerTitle);
		s[1].innerHTML = headerDate;
		s[2].innerHTML = headerTitle;
	}

	this._waiAria.lightboxHeader(box,  lightboxHeader.join(" "));

	var sns = this.config.lightbox.sections;
	for (var i = 0; i < sns.length; i++) {
		var current_sns = sns[i];
		var node = scheduler._get_lightbox_section_node(current_sns);
		var block = this.form_blocks[current_sns.type];
		var value = (ev[current_sns.map_to] !== undefined) ? ev[current_sns.map_to] : current_sns.default_value;
		block.set_value.call(this, node, value, ev, current_sns);
		if (sns[i].focus)
			block.focus.call(this, node);
	}

	scheduler._lightbox_id = id;
};

scheduler._get_lightbox_section_node = function(section){
	return document.getElementById(section.id).nextSibling;
};

scheduler._lightbox_out=function(ev){
	var sns = this.config.lightbox.sections;
	for (var i=0; i < sns.length; i++) {
		var node = document.getElementById(sns[i].id);
		node=(node?node.nextSibling:node);
		var block=this.form_blocks[sns[i].type];
		var res=block.get_value.call(this,node,ev, sns[i]);
		if (sns[i].map_to!="auto")
			ev[sns[i].map_to]=res;
	}
	return ev;
};
scheduler._empty_lightbox=function(data){
	var id=scheduler._lightbox_id;
	var ev=this.getEvent(id);
	var box=this.getLightbox();

	this._lame_copy(ev, data);

	this.setEvent(ev.id,ev);
	this._edit_stop_event(ev,true);
	this.render_view_data();
};
scheduler.hide_lightbox=function(id){
	scheduler.endLightbox(false, this.getLightbox());
};
scheduler.hideCover=function(box){
	if (box) box.style.display="none";
	this.hide_cover();
};
scheduler.hide_cover=function(){
	if (this._cover) 
		this._cover.parentNode.removeChild(this._cover);
	this._cover=null;
};
scheduler.show_cover=function(){
	if(this._cover)
		return;

	this._cover=document.createElement("div");
	this._cover.className="dhx_cal_cover";
	var _document_height = ((document.height !== undefined) ? document.height : document.body.offsetHeight);
	var _scroll_height = ((document.documentElement) ? document.documentElement.scrollHeight : 0);
	this._cover.style.height = Math.max(_document_height, _scroll_height) + 'px';
	document.body.appendChild(this._cover);
};
scheduler.save_lightbox=function(){
	var data = this._lightbox_out({}, this._lame_copy(this.getEvent(this._lightbox_id)));
	if (this.checkEvent("onEventSave") && !this.callEvent("onEventSave",[this._lightbox_id, data, this._new_event]))
		return;
	this._empty_lightbox(data);
	this.hide_lightbox();
};
scheduler.startLightbox = function(id, box){
	this._lightbox_id = id;
	this._custom_lightbox = true;

	this._temp_lightbox = this._lightbox;
	this._lightbox = box;
	this.showCover(box);
};
scheduler.endLightbox = function(mode, box){
	var box = box || scheduler.getLightbox();

	var event = scheduler.getEvent(this._lightbox_id);
	if(event)
		this._edit_stop_event(event, mode);
	if (mode)
		scheduler.render_view_data();
	this.hideCover(box);

	if (this._custom_lightbox){
		this._lightbox = this._temp_lightbox;
		this._custom_lightbox = false;
	}
	this._temp_lightbox = this._lightbox_id = null; // in case of custom lightbox user only calls endLightbox so we need to reset _lightbox_id
	this._waiAria.lightboxHiddenAttr(box);
	this.callEvent("onAfterLightbox",[]);
};
scheduler.resetLightbox = function(){
	if (scheduler._lightbox && !scheduler._custom_lightbox)
		scheduler._lightbox.parentNode.removeChild(scheduler._lightbox);
	scheduler._lightbox = null;
};
scheduler.cancel_lightbox=function(){
	this.callEvent("onEventCancel",[this._lightbox_id, this._new_event]);
	this.hide_lightbox();
};
scheduler._init_lightbox_events=function(){
	this.getLightbox().onclick=function(e){
		var src=e?e.target:event.srcElement;
		if (!src.className) src=src.previousSibling;

		if(src && src.className && scheduler._getClassName(src).indexOf("dhx_btn_set") > -1){
			// assistive software (e.g. jaws) can dispatch event on the top element of a button
			src = src.querySelector("[dhx_button]");
			if(!src) return;
		}

		var className = scheduler._getClassName(src);

		if (src && className)
			switch(className){
				case "dhx_save_btn":
					scheduler.save_lightbox();
					break;
				case "dhx_delete_btn":
					var c=scheduler.locale.labels.confirm_deleting;

					scheduler._dhtmlx_confirm(c, scheduler.locale.labels.title_confirm_deleting, function(){
						scheduler.deleteEvent(scheduler._lightbox_id);
						scheduler._new_event = null; //clear flag, if it was unsaved event
						scheduler.hide_lightbox();
					});

					break;
				case "dhx_cancel_btn":
					scheduler.cancel_lightbox();
					break;

				default:
					if (src.getAttribute("dhx_button")) {
						scheduler.callEvent("onLightboxButton", [className, src, e]);
					} else {
						var index, block, sec;
						if (className.indexOf("dhx_custom_button") != -1) {
							if (className.indexOf("dhx_custom_button_") != -1) {
								index = src.parentNode.getAttribute("index");
								sec = src.parentNode.parentNode;
							} else {
								index = src.getAttribute("index");
								sec = src.parentNode;
								src = src.firstChild;
							}
						}
						if (index) {
							block = scheduler.form_blocks[scheduler.config.lightbox.sections[index].type];
							block.button_click(index, src, sec, sec.nextSibling);
						}
					}
					break;
			}
	};
	this.getLightbox().onkeydown=function(e){
		var event = e || window.event;
		var target = e.target || e.srcElement;
		var buttonTarget = target.querySelector("[dhx_button]");

		if(!buttonTarget){
			buttonTarget = target.parentNode.querySelector(".dhx_custom_button, .dhx_readonly");
		}

		switch((e||event).keyCode){
			case 32:{//space
				if ((e||event).shiftKey) return;
				if(buttonTarget && buttonTarget.click){
					buttonTarget.click();
				}
				break;
			}
			case scheduler.keys.edit_save:
				if ((e||event).shiftKey) return;
				if(buttonTarget && buttonTarget.click){
					buttonTarget.click();
				}else{
					scheduler.save_lightbox();
				}
				break;
			case scheduler.keys.edit_cancel:
				scheduler.cancel_lightbox();
				break;
			default:
				break;
		}

	};
};
scheduler.setLightboxSize=function(){
	var d = this._lightbox;
	if (!d) return;

	var con = d.childNodes[1];
	con.style.height="0px";
	con.style.height=con.scrollHeight+"px";
	d.style.height=con.scrollHeight+scheduler.xy.lightbox_additional_height+"px";
	con.style.height=con.scrollHeight+"px"; //it is incredible , how ugly IE can be
};

scheduler._init_dnd_events = function(){
	dhtmlxEvent(document.body, "mousemove", scheduler._move_while_dnd);
	dhtmlxEvent(document.body, "mouseup", scheduler._finish_dnd);
	scheduler._init_dnd_events = function(){};
};
scheduler._move_while_dnd = function(e){
	if (scheduler._dnd_start_lb){
		if (!document.dhx_unselectable){
			document.body.className += " dhx_unselectable";
			document.dhx_unselectable = true;
		}
		var lb = scheduler.getLightbox();
		var now = (e&&e.target)?[e.pageX, e.pageY]:[event.clientX, event.clientY];
		lb.style.top = scheduler._lb_start[1]+now[1]-scheduler._dnd_start_lb[1]+"px";
		lb.style.left = scheduler._lb_start[0]+now[0]-scheduler._dnd_start_lb[0]+"px";
	}
};
scheduler._ready_to_dnd = function(e){
	var lb = scheduler.getLightbox();
	scheduler._lb_start = [parseInt(lb.style.left,10), parseInt(lb.style.top,10)];
	scheduler._dnd_start_lb = (e&&e.target)?[e.pageX, e.pageY]:[event.clientX, event.clientY];
};
scheduler._finish_dnd = function(){
	if (scheduler._lb_start){
		scheduler._lb_start = scheduler._dnd_start_lb = false;
		document.body.className = document.body.className.replace(" dhx_unselectable","");
		document.dhx_unselectable = false;
	}
};
scheduler.getLightbox=function(){ //scheduler.config.wide_form=true;
	if (!this._lightbox){
		var d=document.createElement("div");
		d.className="dhx_cal_light";
		if (scheduler.config.wide_form)
			d.className+=" dhx_cal_light_wide";
		if (scheduler.form_blocks.recurring)
			d.className+=" dhx_cal_light_rec";
			
		if (/msie|MSIE 6/.test(navigator.userAgent))
			d.className+=" dhx_ie6";
		d.style.visibility="hidden";
		var html = this._lightbox_template;

		var buttons = this.config.buttons_left;

		var ariaAttr = "";
		for (var i = 0; i < buttons.length; i++) {
			ariaAttr = this._waiAria.lightboxButtonAttrString(buttons[i]);
			html += "<div "+ariaAttr+" class='dhx_btn_set dhx_left_btn_set " + buttons[i] + "_set'><div dhx_button='1' class='" + buttons[i] + "'></div><div>" + scheduler.locale.labels[buttons[i]] + "</div></div>";
		}

		buttons = this.config.buttons_right;
		for (var i = 0; i < buttons.length; i++) {
			ariaAttr = this._waiAria.lightboxButtonAttrString(buttons[i]);
			html += "<div "+ariaAttr+" class='dhx_btn_set dhx_right_btn_set " + buttons[i] + "_set' style='float:right;'><div dhx_button='1' class='" + buttons[i] + "'></div><div>" + scheduler.locale.labels[buttons[i]] + "</div></div>";
		}

		html+="</div>";
		d.innerHTML=html;
		if (scheduler.config.drag_lightbox){
			d.firstChild.onmousedown = scheduler._ready_to_dnd;
			d.firstChild.onselectstart = function(){ return false; };
			d.firstChild.style.cursor = "move";
			scheduler._init_dnd_events();

		}

		this._waiAria.lightboxAttr(d);

		document.body.insertBefore(d,document.body.firstChild);
		this._lightbox=d;
		
		var sns=this.config.lightbox.sections;
		html="";
		for (var i=0; i < sns.length; i++) {
			var block=this.form_blocks[sns[i].type];
			if (!block) continue; //ignore incorrect blocks
			sns[i].id="area_"+this.uid();
			var button = "";
			if (sns[i].button){
				var ariaAttr = scheduler._waiAria.lightboxSectionButtonAttrString(this.locale.labels["button_"+sns[i].button]);
			 	button = "<div "+ariaAttr+" class='dhx_custom_button' index='"+i+"'><div class='dhx_custom_button_"+sns[i].button+"'></div><div>"+this.locale.labels["button_"+sns[i].button]+"</div></div>";
			 }
			
			if (this.config.wide_form){
				html+="<div class='dhx_wrap_section'>";
			}
			
			var label_name = this.locale.labels["section_"+sns[i].name];
			if(typeof label_name !== "string"){
				label_name = sns[i].name;
			}
			html+="<div id='"+sns[i].id+"' class='dhx_cal_lsection'>"+button+ "<label>"+label_name+"</label></div>"+block.render.call(this,sns[i]);
			html+="</div>";
		}

		var ds=d.getElementsByTagName("div");
		for (var i=0; i<ds.length; i++) {
			var t_ds = ds[i];
			var className = scheduler._getClassName(t_ds);
			if (className == "dhx_cal_larea") {
				t_ds.innerHTML = html;
				break;
			}
		}

		// bind labels to lightbox inputs
		scheduler._bindLightboxLabels(sns);

		//sizes
		this.setLightboxSize();

		this._init_lightbox_events(this);
		d.style.display="none";
		d.style.visibility="visible";
	}
	return this._lightbox;
};

scheduler._bindLightboxLabels = function(sections){
	// link section labels to controls using label[for] attribute and label.onclick=control.focus as a fallback
	// label[for] is preferable for accessibility reasons

	for(var i = 0; i < sections.length; i++){
		var section = sections[i];
		if(!section.id || !document.getElementById(section.id))
			continue;

		var labelBlock = document.getElementById(section.id);
		var label = labelBlock.querySelector("label");

		var inputBlock = scheduler._get_lightbox_section_node(section);
		while(inputBlock && !inputBlock.querySelector){
			inputBlock = inputBlock.nextSibling;
		}

		var fallback = true;

		if(inputBlock) {
			var input = inputBlock.querySelector("input, select, textarea");
			if(input){
				section.inputId = input.id || "input_" + scheduler.uid();
				if(!input.id)
					input.id = section.inputId;
				label.setAttribute("for", section.inputId);
				fallback = false;
			}
		}

		// use control.focus if failed to bind input using label[for]
		if(fallback){
			var control = scheduler.form_blocks[section.type];
			if(control.focus){
				label.onclick = (function(section){
					return function(){

						var block = scheduler.form_blocks[section.type];
						var node = scheduler._get_lightbox_section_node(section);

						if(block && block.focus)
							block.focus.call(scheduler, node);
					};
				})(section);
			}
		}
	}
};

scheduler.attachEvent("onEventIdChange", function(old_id, new_id){
	if(this._lightbox_id == old_id)
		this._lightbox_id = new_id;
});

scheduler._lightbox_template="<div class='dhx_cal_ltitle'><span class='dhx_mark'>&nbsp;</span><span class='dhx_time'></span><span class='dhx_title'></span></div><div class='dhx_cal_larea'></div>";

scheduler._init_touch_events = function(){
	var mobile = this.config.touch  &&
		( (navigator.userAgent.indexOf("Mobile")!=-1)   ||
			(navigator.userAgent.indexOf("iPad")!=-1)       ||
			(navigator.userAgent.indexOf("Android")!=-1)    ||
			(navigator.userAgent.indexOf("Touch")!=-1));

	if(mobile){
		this.xy.scroll_width = 0;
		this._mobile = true;
	}

	if(this.config.touch){

		var touchEventsSupported = true;
		try {
			document.createEvent("TouchEvent");
		} catch (e) {
			touchEventsSupported = false;
		}

		if (touchEventsSupported) {
			this._touch_events(["touchmove", "touchstart", "touchend"], function (ev) {
				if (ev.touches && ev.touches.length > 1) return null;
				if (ev.touches[0])
					return {
						target: ev.target,
						pageX: ev.touches[0].pageX,
						pageY: ev.touches[0].pageY,
						clientX: ev.touches[0].clientX,
						clientY: ev.touches[0].clientY
					};
				else
					return ev;
			}, function () {
				return false;
			});
		} else if (window.PointerEvent || window.navigator.pointerEnabled) {
			this._touch_events(["pointermove", "pointerdown", "pointerup"], function (ev) {
				if (ev.pointerType == "mouse") return null;
				return ev;
			}, function (ev) {
				return (!ev || (ev.pointerType == "mouse" ));
			});
		} else if (window.navigator.msPointerEnabled) {
			this._touch_events(["MSPointerMove", "MSPointerDown", "MSPointerUp"], function (ev) {
				if (ev.pointerType == ev.MSPOINTER_TYPE_MOUSE) return null;
				return ev;
			}, function (ev) {
				return (!ev || ev.pointerType == ev.MSPOINTER_TYPE_MOUSE);
			});
		}
	}
};

scheduler._touch_events = function(names, accessor, ignore){
	//webkit on android need to be handled separately
	var a_webkit = (navigator.userAgent.indexOf("Android")!=-1) && (navigator.userAgent.indexOf("WebKit")!=-1);
	var source, tracker, timer, drag_mode, scroll_mode, action_mode;
	var dblclicktime = 0;

	function attachTouchEvent(element, name, callback){
		//touch gestures must be disabled when ligthbox is opened
		element.addEventListener(name, function(e){
			if(scheduler._is_lightbox_open()){
				return true;
			}else{
				if (ignore(e)) return;
				return callback(e);
			}
		}, { passive: false });
	}

	function check_direction_swipe(s_ev, e_ev, step, max_dy){
		if (!s_ev || !e_ev) return false;

		var t = s_ev.target;
		while(t && t != scheduler._obj){
			t = t.parentNode;
		}
		if(t != scheduler._obj){
			//swipe outside scheduler
			return false;
		}

		var dy = Math.abs(s_ev.pageY - e_ev.pageY);
		var dx = Math.abs(s_ev.pageX - e_ev.pageX);
		if (dy < max_dy && dx>step && (!dy || (dx/dy > 3))){
			if (s_ev.pageX > e_ev.pageX) {
				scheduler._click.dhx_cal_next_button();
			}else {
				scheduler._click.dhx_cal_prev_button();
			}
			return true;
		}
		return false;
	}

	function doMouseMove(e){
		if (ignore(e)) return;
		var dnd = scheduler.getState().drag_mode,
			timeline = scheduler.matrix ? scheduler.matrix[scheduler._mode] : false;

		var original_render = scheduler.render_view_data;
		if(dnd == 'create' && timeline){
			//suppress full redraw of timeline on creating event
			scheduler.render_view_data = function() {
				var id = scheduler.getState().drag_id;
				var ev = scheduler.getEvent(id);
				var property = timeline.y_property;

				var evs = scheduler.getEvents(ev.start_date, ev.end_date);
				for(var i = 0; i < evs.length; i++){
					if(evs[i][property] != ev[property]){
						evs.splice(i, 1);
						i--;
					}
				}
				ev._sorder = evs.length - 1;
				ev._count = evs.length;

				this.render_data([ev], scheduler.getState().mode);

			};
		}

		scheduler._on_mouse_move(e);

		if(dnd == 'create' && timeline){
			scheduler.render_view_data = original_render;
		}

		if (e.preventDefault)
			e.preventDefault();
		e.cancelBubble = true;
		return false;
	}

	// touchmove
	attachTouchEvent(document.body, names[0], function(e){
		if (ignore(e)) return;

		var acc = accessor(e);
		if(!acc) return;
		if (drag_mode){
			doMouseMove(acc);

			if (e.preventDefault)
				e.preventDefault();
			e.cancelBubble = true;
			scheduler._update_global_tip();
			return false;
		}
		//if (tracker && a_webkit){
		//	check_direction_swipe(tracker, accessor(e), 0);
		//}

		tracker = accessor(e);
		//ignore common and scrolling moves
		if (!action_mode) return;

		//multitouch		
		if (!tracker){
			scroll_mode = true;
			return;
		}

		//target changed - probably in scroll mode

		if (source.target != tracker.target || (Math.abs(source.pageX - tracker.pageX) > 5) || (Math.abs(source.pageY - tracker.pageY) > 5)){
			scroll_mode = true;
			clearTimeout(timer);
		}

	});

	attachTouchEvent(this._els["dhx_cal_data"][0], "scroll", drag_cancel);
	attachTouchEvent(this._els["dhx_cal_data"][0], "touchcancel", drag_cancel);
	attachTouchEvent(this._els["dhx_cal_data"][0], "contextmenu", function(e){
		if (ignore(e)) return;
		if (action_mode){
			if (e && e.preventDefault)
				e.preventDefault();
			(e||event).cancelBubble = true;
			return false;
		}
	});

	// touchstart
	attachTouchEvent(this._obj, names[1], function(e){
		if (ignore(e)) return;
		scheduler._pointerDragId = e.pointerId;

		var fake_event;
		drag_mode = scroll_mode = false;
		action_mode = true;
		fake_event = tracker = accessor(e);

		if (!fake_event){
			scroll_mode = true;
			return;
		}

		//dbl click
		var now = new Date();

		if (!scroll_mode && !drag_mode && now - dblclicktime < 250){
			scheduler._click.dhx_cal_data(fake_event);
			window.setTimeout(function(){
				fake_event.type = "dblclick";
				scheduler._on_dbl_click(fake_event);
			}, 50);
			
			if (e.preventDefault)
				e.preventDefault();
			e.cancelBubble = true;
			scheduler._block_next_stop = true;
			return false;
		}
		dblclicktime = now;

		//drag
		
		if (scroll_mode || drag_mode || !scheduler.config.touch_drag)
			return;

		var actTask = scheduler._locate_event(document.activeElement);
		var fakeTask = scheduler._locate_event(fake_event.target);
		var sourceTask = source? scheduler._locate_event(source.target) : null;

		if(actTask && fakeTask && actTask == fakeTask && actTask != sourceTask)
		{
			if(e.preventDefault) {
				e.preventDefault();
			}
			e.cancelBubble = true;
			scheduler._ignore_next_click = false;
			scheduler._click.dhx_cal_data(fake_event);
			source = fake_event;
			return false;
		}
		//there is no target
		timer = setTimeout(function(){

			drag_mode = true;
			var target = source.target;
			var className = scheduler._getClassName(target);
			if (target && className.indexOf("dhx_body") != -1)
				target = target.previousSibling;

			scheduler._on_mouse_down(source, target);
			if (scheduler._drag_mode && scheduler._drag_mode != "create"){
				//var pos = -1;
				scheduler.for_rendered(scheduler._drag_id, function(node, i) {
				//	pos = node.getBoundingClientRect().top;
					node.style.display='none';
					scheduler._rendered.splice(i, 1);
				});
				/*if (pos>=0){
					var step = scheduler.config.time_step;
					scheduler._move_pos_shift = step* Math.round((fake_event.pageY - pos)*60/(scheduler.config.hour_size_px*step));
				}*/
			}

			if (scheduler.config.touch_tip) {
				scheduler._show_global_tip();
			}
			scheduler.updateEvent(scheduler._drag_id);
		},scheduler.config.touch_drag);

		source = fake_event;
	});
	function drag_cancel(e){
		if (ignore(e)) return;
		scheduler._hide_global_tip();
		if (drag_mode){
			scheduler._on_mouse_up( accessor(e||event) );
			scheduler._temp_touch_block = false;
		}
		scheduler._drag_id = null;
		scheduler._drag_mode=null;
		scheduler._drag_pos=null;
		scheduler._pointerDragId = null;
		clearTimeout(timer);
		drag_mode = action_mode = false;
		scroll_mode = true;
	}

	// touch end
	attachTouchEvent(this._els["dhx_cal_data"][0], names[2], function(e){
		if (ignore(e)) return;

		if (!drag_mode && check_direction_swipe(source, tracker, 200, 100)) {
			scheduler._block_next_stop = true;
		}
		
		if (drag_mode) {
			scheduler._ignore_next_click = true;
			setTimeout(function(){
				scheduler._ignore_next_click = false;
			}, 100);
		}

		drag_cancel(e);
		if (scheduler._block_next_stop){
			scheduler._block_next_stop = false;
			if (e.preventDefault)
				e.preventDefault();
			e.cancelBubble = true;
			return false;	
		}
	});	

	dhtmlxEvent(document.body, names[2], drag_cancel);
};

scheduler._show_global_tip = function(){
	scheduler._hide_global_tip();

	var toptip = scheduler._global_tip = document.createElement("div");
	toptip.className='dhx_global_tip';

	scheduler._update_global_tip(1);

	document.body.appendChild(toptip);
};
scheduler._update_global_tip = function(init){
	var toptip = scheduler._global_tip;
	if (toptip){
		var time = "";
		if (scheduler._drag_id && !init){
			var ev = scheduler.getEvent(scheduler._drag_id);
			if (ev)
				time = "<div>" + (ev._timed ? scheduler.templates.event_header(ev.start_date, ev.end_date, ev):scheduler.templates.day_date(ev.start_date, ev.end_date, ev)) + "</div>";
		}

		if (scheduler._drag_mode == "create" || scheduler._drag_mode == "new-size")
			toptip.innerHTML = (scheduler.locale.labels.drag_to_create || "Drag to create")+time;
		else
			toptip.innerHTML = (scheduler.locale.labels.drag_to_move || "Drag to move")+time;
	}
};
scheduler._hide_global_tip = function(){
	var toptip = scheduler._global_tip;
	if (toptip && toptip.parentNode){
		toptip.parentNode.removeChild(toptip);
		scheduler._global_tip = 0;
	}
};

scheduler._dp_init=function(dp){
	dp._methods=["_set_event_text_style","","_dp_change_event_id","_dp_hook_delete"];

	this._dp_change_event_id = function(id, new_id){
		if(!scheduler.getEvent(id))
			return;

		scheduler.changeEventId(id, new_id);
	};

	this._dp_hook_delete = function(id, new_id){
		if(!scheduler.getEvent(id))
			return;

		if(id != new_id){
			if(this.getUserData(id, dp.action_param) == "true_deleted")
				this.setUserData(id, dp.action_param, "updated");

			this.changeEventId(id, new_id);
		}
		return this.deleteEvent(new_id, true);
	};
	this.attachEvent("onEventAdded",function(id){
		if (!this._loading && this._validId(id))
			dp.setUpdated(id,true,"inserted");
	});
	this.attachEvent("onConfirmedBeforeEventDelete", function(id){
		if (!this._validId(id)) return;
		var z=dp.getState(id);
        
		if (z=="inserted" || this._new_event) {  dp.setUpdated(id,false);		return true; }
		if (z=="deleted")  return false;
    	if (z=="true_deleted")  return true;
    	
		dp.setUpdated(id,true,"deleted");
      	return false;
	});
	this.attachEvent("onEventChanged",function(id){
		if (!this._loading && this._validId(id))
			dp.setUpdated(id,true,"updated");
	});

	scheduler.attachEvent("onClearAll", function(){
		// clear dataprocessor state when scheduler is reset
		dp._in_progress={};
		dp._invalid={};
		dp.updatedRows = [];
		dp._waitMode = 0;
	});

	dp._objToJson = function(obj, data, prefix){
		prefix = prefix || "";
		data = data || {};
		
		for (var a in obj){
			if (a.indexOf("_") === 0) continue;
			if (obj[a] && obj[a].getUTCFullYear) //not very good, but will work
				data[prefix+a] = this.obj.templates.xml_format(obj[a]);
			else {
				if (obj[a] && typeof obj[a] == "object")
					dp._objToJson(obj[a], data, prefix+a+".");
				else
					data[prefix+a] = obj[a];
			}
		}
		
		return data;
	};
	dp._getRowData=function(id,pref){
		var ev=this.obj.getEvent(id);
		return this._objToJson(ev);
	};
	dp._clearUpdateFlag=function(){};
	
	dp.attachEvent("insertCallback", scheduler._update_callback);
	dp.attachEvent("updateCallback", scheduler._update_callback);
	dp.attachEvent("deleteCallback", function(upd, id) {
		if (this.obj.getEvent(id)){
			this.obj.setUserData(id, this.action_param, "true_deleted");
			this.obj.deleteEvent(id);
		} else if (this.obj._add_rec_marker)
			this.obj._update_callback(upd, id);
	});
		
};

scheduler._validId=function(id){
	return true;
};

scheduler.setUserData=function(id,name,value){
	if (id){
		var ev = this.getEvent(id);
		if(ev) ev[name]=value;
	}else{
		this._userdata[name]=value;
	}
};
scheduler.getUserData=function(id,name){
	if (id){
		var ev = this.getEvent(id);
		if(ev)
			return ev[name];
		else
			return null;
	}else{
		return this._userdata[name];
	}
};
scheduler._set_event_text_style=function(id,style){
	if(!scheduler.getEvent(id))
		return;

	this.for_rendered(id,function(r){
		r.style.cssText+=";"+style;
	});
	var ev = this.getEvent(id);
	ev["_text_style"]=style;
	this.event_updated(ev);
};

scheduler._update_callback = function(upd,id){
	var data		=	scheduler._xmlNodeToJSON(upd.firstChild);

	//fix for updates of recurring events
	if (data.rec_type == "none") data.rec_pattern = "none";
	data.text		=	data.text||data._tagvalue;
	data.start_date	=	scheduler.templates.xml_date(data.start_date);
	data.end_date	=	scheduler.templates.xml_date(data.end_date);
	
	scheduler.addEvent(data);
	if (scheduler._add_rec_marker)
		scheduler.setCurrentView();
};
scheduler._skin_settings = {
	fix_tab_position: [1,0],
	use_select_menu_space: [1,0],
	wide_form: [1,0],

	hour_size_px: [44,42],
	displayed_event_color: ["#ff4a4a", "ffc5ab"],
	displayed_event_text_color: ["#ffef80", "7e2727"]
};

scheduler._skin_xy = {
	lightbox_additional_height: [90,50],
	nav_height: [59,22],
	bar_height: [24,20]
};

scheduler._is_material_skin = function(){
	return ((scheduler.skin + "").indexOf("material") > -1);
};

scheduler._border_box_bvents = function(){
	return scheduler._is_material_skin();
};

scheduler._configure = function(col, data, skin){
	for (var key in data)
		if (typeof col[key] == "undefined")
			col[key] = data[key][skin];
};
scheduler._skin_init = function(){
	if (!scheduler.skin){
		var links = document.getElementsByTagName("link");
		for (var i = 0; i < links.length; i++) {
			var res = links[i].href.match("dhtmlxscheduler_([a-z]+).css");
			if (res){
				scheduler.skin = res[1];
				break;
			}
		}
	}

	
	
	var set = 0;
	if (scheduler.skin && (scheduler.skin === "classic" || scheduler.skin === "glossy")) set = 1;

	if(scheduler._is_material_skin()){
		var defaultButtonsLeft = scheduler.config.buttons_left.$inital;
		var defaultButtonsRight = scheduler.config.buttons_right.$inital;
		if(defaultButtonsLeft && scheduler.config.buttons_left.slice().join() == defaultButtonsLeft &&
			defaultButtonsRight && scheduler.config.buttons_right.slice().join() == defaultButtonsRight){
			var tmp = scheduler.config.buttons_left.slice();
			scheduler.config.buttons_left = scheduler.config.buttons_right.slice();
			scheduler.config.buttons_right = tmp;
		}
		scheduler.xy.event_header_height = 18;
		scheduler.xy.menu_width = 25;
		scheduler.xy.week_agenda_scale_height = 35;
		scheduler.xy.map_icon_width = 38;
		scheduler._lightbox_controls.defaults.textarea.height = 64;
		scheduler._lightbox_controls.defaults.time.height = 'auto';
	}

	//apply skin related settings
	this._configure(scheduler.config, scheduler._skin_settings, set);
	this._configure(scheduler.xy, scheduler._skin_xy, set);

	if (scheduler.skin === "flat"){
		scheduler.xy.scale_height = 35;
		scheduler.templates.hour_scale = function(date){
			var min = date.getMinutes();
			min = min < 10 ? "0"+min : min;
			var html = "<span class='dhx_scale_h'>"+ date.getHours() +"</span>"+
				"<span class='dhx_scale_m'>&nbsp;"+ min +"</span>";
			return html;
		};
	}

	//classic skin need not any further customization
	if (set) return;
	
	
	var minic = scheduler.config.minicalendar;
	if (minic) minic.padding = 14;

	scheduler.templates.event_bar_date = function(start,end,ev) {
		return "• <b>"+scheduler.templates.event_date(start)+"</b> ";
	};

	//scheduler._lightbox_template="<div class='dhx_cal_ltitle'><span class='dhx_mark'>&nbsp;</span><span class='dhx_time'></span><span class='dhx_title'></span><div class='dhx_close_icon'></div></div><div class='dhx_cal_larea'></div>";
	scheduler.attachEvent("onTemplatesReady", function() {

		var date_to_str = scheduler.date.date_to_str("%d");
		if(!scheduler.templates._old_month_day){
			scheduler.templates._old_month_day = scheduler.templates.month_day;
		}
		var old_month_day = scheduler.templates._old_month_day;
		scheduler.templates.month_day = function(date) {
			if (this._mode == "month") {
				var label = date_to_str(date);
				if (date.getDate() == 1) {
					label = scheduler.locale.date.month_full[date.getMonth()] + " " + label;
				}
				if (+date == +scheduler.date.date_part(this._currentDate())) {
					label = scheduler.locale.labels.dhx_cal_today_button + " " + label;
				}
				return label;
			} else {
				return old_month_day.call(this, date);
			}
		};


		if (scheduler.config.fix_tab_position){
			var navline_divs = scheduler._els["dhx_cal_navline"][0].getElementsByTagName('div');
			var minical = null;
			var tabs = [];
			var last = 211;
			var positions = [
				14,
				75,
				136
			];
			var inc = 14;

			if(scheduler._is_material_skin()){
				positions = [16, 103, 192];
				last = 294;
				inc = -1;
			}

			for (var i=0; i<navline_divs.length; i++) {
				var div = navline_divs[i];
				var name = div.getAttribute("name");
				if (name) { // mode tab
					div.style.right = "auto";
					switch (name) {
						case "day_tab":
							div.style.left = positions[0] + "px";
							div.className += " dhx_cal_tab_first";
							break;
						case "week_tab":
							div.style.left = positions[1] + "px";
							break;
						case "month_tab":
							div.style.left = positions[2] + "px";
							div.className += " dhx_cal_tab_last";
							break;
						default:
							div.style.left = last+"px";
							div.className += " dhx_cal_tab_standalone";
							last = last + inc + div.offsetWidth;
							break;
					}
					div.className += " " + name;
				}else{
					if((div.className || "").indexOf("dhx_minical_icon") === 0 &&
						div.parentNode == scheduler._els["dhx_cal_navline"][0]){
						// if default minicalendar icon
						minical = div;
					}
				}
			}

			if(minical){
				minical.style.left = last+"px";
			}
		}

	});
	scheduler._skin_init = function(){};
};


if (window.jQuery){

(function( $ ){

	var methods = [];
	$.fn.dhx_scheduler = function(config){
		if (typeof(config) === 'string') {
			if (methods[config] ) {
				return methods[config].apply(this, []);
			}else {
				$.error('Method ' +  config + ' does not exist on jQuery.dhx_scheduler');
			}
		} else {
			var views = [];
			this.each(function() {
				if (this && this.getAttribute){
					if (!this.getAttribute("dhxscheduler")){
						for (var key in config)
							if (key!="data")
								scheduler.config[key] = config[key];

						if (!this.getElementsByTagName("div").length){
							this.innerHTML = '<div class="dhx_cal_navline"><div class="dhx_cal_prev_button">&nbsp;</div><div class="dhx_cal_next_button">&nbsp;</div><div class="dhx_cal_today_button"></div><div class="dhx_cal_date"></div><div class="dhx_cal_tab" name="day_tab" style="right:204px;"></div><div class="dhx_cal_tab" name="week_tab" style="right:140px;"></div><div class="dhx_cal_tab" name="month_tab" style="right:76px;"></div></div><div class="dhx_cal_header"></div><div class="dhx_cal_data"></div>';
							this.className += " dhx_cal_container";
						}
						scheduler.init(this, scheduler.config.date, scheduler.config.mode);
						if (config.data)
							scheduler.parse(config.data);

						views.push(scheduler);
					}
				}
			});

			if (views.length === 1) return views[0];
			return views;
		}
	};
	

	

})(jQuery);

}
(function(){

	var setCurrentView = scheduler.setCurrentView,
		updateView = scheduler.updateView;
	var update_view_timer = null,
		curr_view_timer = null;

	var lazy_setCurrentView = function(date, mode){
		var self = this;
		window.clearTimeout(curr_view_timer);
		window.clearTimeout(update_view_timer);

		var oldDate = self._date,
			oldMode = self._mode;
		updateFlags(this, date, mode);

		curr_view_timer = setTimeout(function(){

			if (!self.callEvent("onBeforeViewChange", [oldMode, oldDate, mode || self._mode, date || self._date])){
				updateFlags(self, oldDate, oldMode);
				return;
			}

			updateView.call(self, date, mode);
			self.callEvent("onViewChange", [self._mode, self._date]);

			window.clearTimeout(update_view_timer);
			curr_view_timer = 0;
		}, scheduler.config.delay_render);
	};
	var lazy_updateView = function(date, mode){
		var self = this,
			ars = arguments;

		updateFlags(this, date, mode);

		window.clearTimeout(update_view_timer);
		update_view_timer = setTimeout(function(){
			if(curr_view_timer)
				return;

			updateView.apply(self, ars);
		}, scheduler.config.delay_render);
	};
	function updateFlags(scheduler, date, mode){
		if(date)
			scheduler._date = date;
		if(mode)
			scheduler._mode = mode;

	}
	scheduler.attachEvent("onSchedulerReady", function(){
		if(scheduler.config.delay_render){
			scheduler.setCurrentView = lazy_setCurrentView;
			scheduler.updateView = lazy_updateView;
		}else{
			scheduler.setCurrentView = setCurrentView;
			scheduler.updateView = updateView;
		}
	});

})();