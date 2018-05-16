/*
 Highcharts JS v6.0.2 (2017-10-20)
 Exporting module

 (c) 2010-2017 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(r){"object"===typeof module&&module.exports?module.exports=r:r(Highcharts)})(function(r){(function(f){var u=f.each,r=f.pick,h=f.win,m=h.document,a=f.seriesTypes,x=void 0!==m.createElement("a").download;f.setOptions({exporting:{csv:{columnHeaderFormatter:null,dateFormat:"%Y-%m-%d %H:%M:%S",itemDelimiter:",",lineDelimiter:"\n"},showTable:!1},lang:{downloadCSV:"Download CSV",downloadXLS:"Download XLS",viewData:"View data table"}});f.Chart.prototype.callbacks.push(function(k){f.addEvent(k,"render",
function(){k.options&&k.options.exporting&&k.options.exporting.showTable&&k.viewData()})});f.Chart.prototype.setUpKeyToAxis=function(){a.arearange&&(a.arearange.prototype.keyToAxis={low:"y",high:"y"})};f.Chart.prototype.getDataRows=function(){var k=this.options.exporting&&this.options.exporting.csv||{},c,e=this.xAxis,g={},t=[],l,d=[],n,v,a=function(b,c,g){if(k.columnHeaderFormatter){var d=k.columnHeaderFormatter(b,c,g);if(!1!==d)return d}return b instanceof f.Axis?b.options.title&&b.options.title.text||
(b.isDatetimeAxis?"DateTime":"Category"):b?b.name+(1<g?" ("+c+")":""):"Category"},p=[];n=0;this.setUpKeyToAxis();u(this.series,function(b){var c=b.options.keys||b.pointArrayMap||["y"],l=c.length,v=!b.requireSorting&&{},h={},t={},m=f.inArray(b.xAxis,e),q;u(c,function(c){var k=(b.keyToAxis&&b.keyToAxis[c]||c)+"Axis";h[c]=b[k]&&b[k].categories||[];t[c]=b[k]&&b[k].isDatetimeAxis});if(!1!==b.options.includeInCSVExport&&!1!==b.visible){f.find(p,function(b){return b[0]===m})||p.push([m,n]);for(q=0;q<l;)d.push(a(b,
c[q],c.length)),q++;u(b.points,function(d,e){var a=d.x,p;v&&(v[a]&&(a+="|"+e),v[a]=!0);q=0;g[a]||(g[a]=[],g[a].xValues=[]);g[a].x=d.x;g[a].xValues[m]=d.x;b.xAxis&&"name"!==b.exportKey||(g[a].name=d.name);for(;q<l;)e=c[q],p=d[e],g[a][n+q]=r(h[e][p],t[e]?f.dateFormat(k.dateFormat,p):null,p),q++});n+=q}});for(l in g)g.hasOwnProperty(l)&&t.push(g[l]);var h,m;l=[d];for(n=p.length;n--;)h=p[n][0],m=p[n][1],c=e[h],t.sort(function(b,c){return b.xValues[h]-c.xValues[h]}),v=a(c),l[0].splice(m,0,v),u(t,function(b){var d=
b.name;d||(c.isDatetimeAxis?(b.x instanceof Date&&(b.x=b.x.getTime()),d=f.dateFormat(k.dateFormat,b.x)):d=c.categories?r(c.names[b.x],c.categories[b.x],b.x):b.x);b.splice(m,0,d)});return l=l.concat(t)};f.Chart.prototype.getCSV=function(k){var c="",f=this.getDataRows(),g=this.options.exporting.csv,a=g.itemDelimiter,l=g.lineDelimiter;u(f,function(d,g){for(var e,h=d.length,n=k?(1.1).toLocaleString()[1]:".";h--;)e=d[h],"string"===typeof e&&(e='"'+e+'"'),"number"===typeof e&&","===n&&(e=e.toString().replace(".",
",")),d[h]=e;c+=d.join(a);g<f.length-1&&(c+=l)});return c};f.Chart.prototype.getTable=function(k){var c="\x3ctable\x3e\x3cthead\x3e",e=this.getDataRows();u(e,function(e,f){var a=f?"td":"th",d,g,h=k?(1.1).toLocaleString()[1]:".";c+="\x3ctr\x3e";for(g=0;g<e.length;g+=1)d=e[g],"number"===typeof d?(d=d.toString(),","===h&&(d=d.replace(".",h)),c+="\x3c"+a+' class\x3d"number"\x3e'+d+"\x3c/"+a+"\x3e"):c+="\x3c"+a+' class\x3d"text"\x3e'+(void 0===d?"":d)+"\x3c/"+a+"\x3e";c+="\x3c/tr\x3e";f||(c+="\x3c/thead\x3e\x3ctbody\x3e")});
return c+="\x3c/tbody\x3e\x3c/table\x3e"};f.Chart.prototype.fileDownload=function(a,c,e){var g;g=this.options.exporting.filename?this.options.exporting.filename:this.title?this.title.textStr.replace(/ /g,"-").toLowerCase():"chart";h.Blob&&h.navigator.msSaveOrOpenBlob?(a=new h.Blob(["\ufeff"+e],{type:"text/csv"}),h.navigator.msSaveOrOpenBlob(a,g+"."+c)):x?(e=m.createElement("a"),e.href=a,e.download=g+"."+c,this.container.appendChild(e),e.click(),e.remove()):f.error("The browser doesn't support downloading files")};
f.Chart.prototype.downloadCSV=function(){var a=this.getCSV(!0);this.fileDownload("data:text/csv,\ufeff"+encodeURIComponent(a),"csv",a,"text/csv")};f.Chart.prototype.downloadXLS=function(){var a='\x3chtml xmlns:o\x3d"urn:schemas-microsoft-com:office:office" xmlns:x\x3d"urn:schemas-microsoft-com:office:excel" xmlns\x3d"http://www.w3.org/TR/REC-html40"\x3e\x3chead\x3e\x3c!--[if gte mso 9]\x3e\x3cxml\x3e\x3cx:ExcelWorkbook\x3e\x3cx:ExcelWorksheets\x3e\x3cx:ExcelWorksheet\x3e\x3cx:Name\x3eArk1\x3c/x:Name\x3e\x3cx:WorksheetOptions\x3e\x3cx:DisplayGridlines/\x3e\x3c/x:WorksheetOptions\x3e\x3c/x:ExcelWorksheet\x3e\x3c/x:ExcelWorksheets\x3e\x3c/x:ExcelWorkbook\x3e\x3c/xml\x3e\x3c![endif]--\x3e\x3cstyle\x3etd{border:none;font-family: Calibri, sans-serif;} .number{mso-number-format:"0.00";} .text{ mso-number-format:"@";}\x3c/style\x3e\x3cmeta name\x3dProgId content\x3dExcel.Sheet\x3e\x3cmeta charset\x3dUTF-8\x3e\x3c/head\x3e\x3cbody\x3e'+
this.getTable(!0)+"\x3c/body\x3e\x3c/html\x3e";this.fileDownload("data:application/vnd.ms-excel;base64,"+h.btoa(unescape(encodeURIComponent(a))),"xls",a,"application/vnd.ms-excel")};f.Chart.prototype.viewData=function(){this.dataTableDiv||(this.dataTableDiv=m.createElement("div"),this.dataTableDiv.className="highcharts-data-table",this.renderTo.parentNode.insertBefore(this.dataTableDiv,this.renderTo.nextSibling));this.dataTableDiv.innerHTML=this.getTable()};var w=f.getOptions().exporting;w&&(f.extend(w.menuItemDefinitions,
{downloadCSV:{textKey:"downloadCSV",onclick:function(){this.downloadCSV()}},downloadXLS:{textKey:"downloadXLS",onclick:function(){this.downloadXLS()}},viewData:{textKey:"viewData",onclick:function(){this.viewData()}}}),w.buttons.contextButton.menuItems.push("separator","downloadCSV","downloadXLS","viewData"));a.map&&(a.map.prototype.exportKey="name");a.mapbubble&&(a.mapbubble.prototype.exportKey="name");a.treemap&&(a.treemap.prototype.exportKey="name")})(r)});