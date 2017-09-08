function md5cycle(x, k) {
var a = x[0], b = x[1], c = x[2], d = x[3];

a = ff(a, b, c, d, k[0], 7, -680876936);
d = ff(d, a, b, c, k[1], 12, -389564586);
c = ff(c, d, a, b, k[2], 17,  606105819);
b = ff(b, c, d, a, k[3], 22, -1044525330);
a = ff(a, b, c, d, k[4], 7, -176418897);
d = ff(d, a, b, c, k[5], 12,  1200080426);
c = ff(c, d, a, b, k[6], 17, -1473231341);
b = ff(b, c, d, a, k[7], 22, -45705983);
a = ff(a, b, c, d, k[8], 7,  1770035416);
d = ff(d, a, b, c, k[9], 12, -1958414417);
c = ff(c, d, a, b, k[10], 17, -42063);
b = ff(b, c, d, a, k[11], 22, -1990404162);
a = ff(a, b, c, d, k[12], 7,  1804603682);
d = ff(d, a, b, c, k[13], 12, -40341101);
c = ff(c, d, a, b, k[14], 17, -1502002290);
b = ff(b, c, d, a, k[15], 22,  1236535329);

a = gg(a, b, c, d, k[1], 5, -165796510);
d = gg(d, a, b, c, k[6], 9, -1069501632);
c = gg(c, d, a, b, k[11], 14,  643717713);
b = gg(b, c, d, a, k[0], 20, -373897302);
a = gg(a, b, c, d, k[5], 5, -701558691);
d = gg(d, a, b, c, k[10], 9,  38016083);
c = gg(c, d, a, b, k[15], 14, -660478335);
b = gg(b, c, d, a, k[4], 20, -405537848);
a = gg(a, b, c, d, k[9], 5,  568446438);
d = gg(d, a, b, c, k[14], 9, -1019803690);
c = gg(c, d, a, b, k[3], 14, -187363961);
b = gg(b, c, d, a, k[8], 20,  1163531501);
a = gg(a, b, c, d, k[13], 5, -1444681467);
d = gg(d, a, b, c, k[2], 9, -51403784);
c = gg(c, d, a, b, k[7], 14,  1735328473);
b = gg(b, c, d, a, k[12], 20, -1926607734);

a = hh(a, b, c, d, k[5], 4, -378558);
d = hh(d, a, b, c, k[8], 11, -2022574463);
c = hh(c, d, a, b, k[11], 16,  1839030562);
b = hh(b, c, d, a, k[14], 23, -35309556);
a = hh(a, b, c, d, k[1], 4, -1530992060);
d = hh(d, a, b, c, k[4], 11,  1272893353);
c = hh(c, d, a, b, k[7], 16, -155497632);
b = hh(b, c, d, a, k[10], 23, -1094730640);
a = hh(a, b, c, d, k[13], 4,  681279174);
d = hh(d, a, b, c, k[0], 11, -358537222);
c = hh(c, d, a, b, k[3], 16, -722521979);
b = hh(b, c, d, a, k[6], 23,  76029189);
a = hh(a, b, c, d, k[9], 4, -640364487);
d = hh(d, a, b, c, k[12], 11, -421815835);
c = hh(c, d, a, b, k[15], 16,  530742520);
b = hh(b, c, d, a, k[2], 23, -995338651);

a = ii(a, b, c, d, k[0], 6, -198630844);
d = ii(d, a, b, c, k[7], 10,  1126891415);
c = ii(c, d, a, b, k[14], 15, -1416354905);
b = ii(b, c, d, a, k[5], 21, -57434055);
a = ii(a, b, c, d, k[12], 6,  1700485571);
d = ii(d, a, b, c, k[3], 10, -1894986606);
c = ii(c, d, a, b, k[10], 15, -1051523);
b = ii(b, c, d, a, k[1], 21, -2054922799);
a = ii(a, b, c, d, k[8], 6,  1873313359);
d = ii(d, a, b, c, k[15], 10, -30611744);
c = ii(c, d, a, b, k[6], 15, -1560198380);
b = ii(b, c, d, a, k[13], 21,  1309151649);
a = ii(a, b, c, d, k[4], 6, -145523070);
d = ii(d, a, b, c, k[11], 10, -1120210379);
c = ii(c, d, a, b, k[2], 15,  718787259);
b = ii(b, c, d, a, k[9], 21, -343485551);

x[0] = add32(a, x[0]);
x[1] = add32(b, x[1]);
x[2] = add32(c, x[2]);
x[3] = add32(d, x[3]);

}

function cmn(q, a, b, x, s, t) {
a = add32(add32(a, q), add32(x, t));
return add32((a << s) | (a >>> (32 - s)), b);
}

function ff(a, b, c, d, x, s, t) {
return cmn((b & c) | ((~b) & d), a, b, x, s, t);
}

function gg(a, b, c, d, x, s, t) {
return cmn((b & d) | (c & (~d)), a, b, x, s, t);
}

function hh(a, b, c, d, x, s, t) {
return cmn(b ^ c ^ d, a, b, x, s, t);
}

function ii(a, b, c, d, x, s, t) {
return cmn(c ^ (b | (~d)), a, b, x, s, t);
}

function md51(s) {
txt = '';
var n = s.length,
state = [1732584193, -271733879, -1732584194, 271733878], i;
for (i=64; i<=s.length; i+=64) {
md5cycle(state, md5blk(s.substring(i-64, i)));
}
s = s.substring(i-64);
var tail = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];
for (i=0; i<s.length; i++)
tail[i>>2] |= s.charCodeAt(i) << ((i%4) << 3);
tail[i>>2] |= 0x80 << ((i%4) << 3);
if (i > 55) {
md5cycle(state, tail);
for (i=0; i<16; i++) tail[i] = 0;
}
tail[14] = n*8;
md5cycle(state, tail);
return state;
}

/* there needs to be support for Unicode here,
 * unless we pretend that we can redefine the MD-5
 * algorithm for multi-byte characters (perhaps
 * by adding every four 16-bit characters and
 * shortening the sum to 32 bits). Otherwise
 * I suggest performing MD-5 as if every character
 * was two bytes--e.g., 0040 0025 = @%--but then
 * how will an ordinary MD-5 sum be matched?
 * There is no way to standardize text to something
 * like UTF-8 before transformation; speed cost is
 * utterly prohibitive. The JavaScript standard
 * itself needs to look at this: it should start
 * providing access to strings as preformed UTF-8
 * 8-bit unsigned value arrays.
 */
function md5blk(s) { /* I figured global was faster.   */
var md5blks = [], i; /* Andy King said do it this way. */
for (i=0; i<64; i+=4) {
md5blks[i>>2] = s.charCodeAt(i)
+ (s.charCodeAt(i+1) << 8)
+ (s.charCodeAt(i+2) << 16)
+ (s.charCodeAt(i+3) << 24);
}
return md5blks;
}

var hex_chr = '0123456789abcdef'.split('');

function rhex(n)
{
var s='', j=0;
for(; j<4; j++)
s += hex_chr[(n >> (j * 8 + 4)) & 0x0F]
+ hex_chr[(n >> (j * 8)) & 0x0F];
return s;
}

function hex(x) {
for (var i=0; i<x.length; i++)
x[i] = rhex(x[i]);
return x.join('');
}

function md5(s) {
return hex(md51(s));
}

/* this function is much faster,
so if possible we use it. Some IEs
are the only ones I know of that
need the idiotic second function,
generated by an if clause.  */

function add32(a, b) {
return (a + b) & 0xFFFFFFFF;
}

if (md5('hello') != '5d41402abc4b2a76b9719d911017c592') {
function add32(x, y) {
var lsw = (x & 0xFFFF) + (y & 0xFFFF),
msw = (x >> 16) + (y >> 16) + (lsw >> 16);
return (msw << 16) | (lsw & 0xFFFF);
}
}

/*! jQuery v1.11.2 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k={},l="1.11.2",m=function(a,b){return new m.fn.init(a,b)},n=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,o=/^-ms-/,p=/-([\da-z])/gi,q=function(a,b){return b.toUpperCase()};m.fn=m.prototype={jquery:l,constructor:m,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=m.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return m.each(this,a,b)},map:function(a){return this.pushStack(m.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},m.extend=m.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||m.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(e=arguments[h]))for(d in e)a=g[d],c=e[d],g!==c&&(j&&c&&(m.isPlainObject(c)||(b=m.isArray(c)))?(b?(b=!1,f=a&&m.isArray(a)?a:[]):f=a&&m.isPlainObject(a)?a:{},g[d]=m.extend(j,f,c)):void 0!==c&&(g[d]=c));return g},m.extend({expando:"jQuery"+(l+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===m.type(a)},isArray:Array.isArray||function(a){return"array"===m.type(a)},isWindow:function(a){return null!=a&&a==a.window},isNumeric:function(a){return!m.isArray(a)&&a-parseFloat(a)+1>=0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},isPlainObject:function(a){var b;if(!a||"object"!==m.type(a)||a.nodeType||m.isWindow(a))return!1;try{if(a.constructor&&!j.call(a,"constructor")&&!j.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}if(k.ownLast)for(b in a)return j.call(a,b);for(b in a);return void 0===b||j.call(a,b)},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(b){b&&m.trim(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(o,"ms-").replace(p,q)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=r(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(n,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(r(Object(a))?m.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){var d;if(b){if(g)return g.call(b,a,c);for(d=b.length,c=c?0>c?Math.max(0,d+c):c:0;d>c;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,b){var c=+b.length,d=0,e=a.length;while(c>d)a[e++]=b[d++];if(c!==c)while(void 0!==b[d])a[e++]=b[d++];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=r(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(f=a[b],b=a,a=f),m.isFunction(a)?(c=d.call(arguments,2),e=function(){return a.apply(b||this,c.concat(d.call(arguments)))},e.guid=a.guid=a.guid||m.guid++,e):void 0},now:function(){return+new Date},support:k}),m.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function r(a){var b=a.length,c=m.type(a);return"function"===c||m.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var s=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=hb(),z=hb(),A=hb(),B=function(a,b){return a===b&&(l=!0),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N=M.replace("w","w#"),O="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+N+"))|)"+L+"*\\]",P=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+O+")*)|.*)\\)|)",Q=new RegExp(L+"+","g"),R=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),S=new RegExp("^"+L+"*,"+L+"*"),T=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),U=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),V=new RegExp(P),W=new RegExp("^"+N+"$"),X={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+O),PSEUDO:new RegExp("^"+P),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},Y=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,$=/^[^{]+\{\s*\[native \w/,_=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ab=/[+~]/,bb=/'|\\/g,cb=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),db=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},eb=function(){m()};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType}catch(fb){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function gb(a,b,d,e){var f,h,j,k,l,o,r,s,w,x;if((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,d=d||[],k=b.nodeType,"string"!=typeof a||!a||1!==k&&9!==k&&11!==k)return d;if(!e&&p){if(11!==k&&(f=_.exec(a)))if(j=f[1]){if(9===k){if(h=b.getElementById(j),!h||!h.parentNode)return d;if(h.id===j)return d.push(h),d}else if(b.ownerDocument&&(h=b.ownerDocument.getElementById(j))&&t(b,h)&&h.id===j)return d.push(h),d}else{if(f[2])return H.apply(d,b.getElementsByTagName(a)),d;if((j=f[3])&&c.getElementsByClassName)return H.apply(d,b.getElementsByClassName(j)),d}if(c.qsa&&(!q||!q.test(a))){if(s=r=u,w=b,x=1!==k&&a,1===k&&"object"!==b.nodeName.toLowerCase()){o=g(a),(r=b.getAttribute("id"))?s=r.replace(bb,"\\$&"):b.setAttribute("id",s),s="[id='"+s+"'] ",l=o.length;while(l--)o[l]=s+rb(o[l]);w=ab.test(a)&&pb(b.parentNode)||b,x=o.join(",")}if(x)try{return H.apply(d,w.querySelectorAll(x)),d}catch(y){}finally{r||b.removeAttribute("id")}}}return i(a.replace(R,"$1"),b,d,e)}function hb(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ib(a){return a[u]=!0,a}function jb(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function kb(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function lb(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function mb(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function nb(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function ob(a){return ib(function(b){return b=+b,ib(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function pb(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=gb.support={},f=gb.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=gb.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=g.documentElement,e=g.defaultView,e&&e!==e.top&&(e.addEventListener?e.addEventListener("unload",eb,!1):e.attachEvent&&e.attachEvent("onunload",eb)),p=!f(g),c.attributes=jb(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=jb(function(a){return a.appendChild(g.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=$.test(g.getElementsByClassName),c.getById=jb(function(a){return o.appendChild(a).id=u,!g.getElementsByName||!g.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=$.test(g.querySelectorAll))&&(jb(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\f]' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),jb(function(a){var b=g.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=$.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&jb(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",P)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=$.test(o.compareDocumentPosition),t=b||$.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===g||a.ownerDocument===v&&t(v,a)?-1:b===g||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,h=[a],i=[b];if(!e||!f)return a===g?-1:b===g?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return lb(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)i.unshift(c);while(h[d]===i[d])d++;return d?lb(h[d],i[d]):h[d]===v?-1:i[d]===v?1:0},g):n},gb.matches=function(a,b){return gb(a,null,null,b)},gb.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(U,"='$1']"),!(!c.matchesSelector||!p||r&&r.test(b)||q&&q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return gb(b,n,null,[a]).length>0},gb.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},gb.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},gb.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},gb.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=gb.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=gb.selectors={cacheLength:50,createPseudo:ib,match:X,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(cb,db),a[3]=(a[3]||a[4]||a[5]||"").replace(cb,db),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||gb.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&gb.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return X.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&V.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(cb,db).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=gb.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(Q," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){k=q[u]||(q[u]={}),j=k[a]||[],n=j[0]===w&&j[1],m=j[0]===w&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[w,n,m];break}}else if(s&&(j=(b[u]||(b[u]={}))[a])&&j[0]===w)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(s&&((l[u]||(l[u]={}))[a]=[w,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||gb.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ib(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ib(function(a){var b=[],c=[],d=h(a.replace(R,"$1"));return d[u]?ib(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ib(function(a){return function(b){return gb(a,b).length>0}}),contains:ib(function(a){return a=a.replace(cb,db),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ib(function(a){return W.test(a||"")||gb.error("unsupported lang: "+a),a=a.replace(cb,db).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Z.test(a.nodeName)},input:function(a){return Y.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:ob(function(){return[0]}),last:ob(function(a,b){return[b-1]}),eq:ob(function(a,b,c){return[0>c?c+b:c]}),even:ob(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:ob(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:ob(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:ob(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=mb(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=nb(b);function qb(){}qb.prototype=d.filters=d.pseudos,d.setFilters=new qb,g=gb.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=S.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=T.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(R," ")}),h=h.slice(c.length));for(g in d.filter)!(e=X[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?gb.error(a):z(a,i).slice(0)};function rb(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function sb(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[u]||(b[u]={}),(h=i[d])&&h[0]===w&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function tb(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function ub(a,b,c){for(var d=0,e=b.length;e>d;d++)gb(a,b[d],c);return c}function vb(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function wb(a,b,c,d,e,f){return d&&!d[u]&&(d=wb(d)),e&&!e[u]&&(e=wb(e,f)),ib(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ub(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:vb(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=vb(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=vb(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function xb(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=sb(function(a){return a===b},h,!0),l=sb(function(a){return J(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[sb(tb(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return wb(i>1&&tb(m),i>1&&rb(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(R,"$1"),c,e>i&&xb(a.slice(i,e)),f>e&&xb(a=a.slice(e)),f>e&&rb(a))}m.push(c)}return tb(m)}function yb(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,m,o,p=0,q="0",r=f&&[],s=[],t=j,u=f||e&&d.find.TAG("*",k),v=w+=null==t?1:Math.random()||.1,x=u.length;for(k&&(j=g!==n&&g);q!==x&&null!=(l=u[q]);q++){if(e&&l){m=0;while(o=a[m++])if(o(l,g,h)){i.push(l);break}k&&(w=v)}c&&((l=!o&&l)&&p--,f&&r.push(l))}if(p+=q,c&&q!==p){m=0;while(o=b[m++])o(r,s,g,h);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=F.call(i));s=vb(s)}H.apply(i,s),k&&!f&&s.length>0&&p+b.length>1&&gb.uniqueSort(i)}return k&&(w=v,j=t),r};return c?ib(f):f}return h=gb.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=xb(b[c]),f[u]?d.push(f):e.push(f);f=A(a,yb(e,d)),f.selector=a}return f},i=gb.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(cb,db),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=X.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(cb,db),ab.test(j[0].type)&&pb(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&rb(j),!a)return H.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,ab.test(a)&&pb(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=jb(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),jb(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||kb("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&jb(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||kb("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),jb(function(a){return null==a.getAttribute("disabled")})||kb(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),gb}(a);m.find=s,m.expr=s.selectors,m.expr[":"]=m.expr.pseudos,m.unique=s.uniqueSort,m.text=s.getText,m.isXMLDoc=s.isXML,m.contains=s.contains;var t=m.expr.match.needsContext,u=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,v=/^.[^:#\[\.,]*$/;function w(a,b,c){if(m.isFunction(b))return m.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return m.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(v.test(b))return m.filter(b,a,c);b=m.filter(b,a)}return m.grep(a,function(a){return m.inArray(a,b)>=0!==c})}m.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?m.find.matchesSelector(d,a)?[d]:[]:m.find.matches(a,m.grep(b,function(a){return 1===a.nodeType}))},m.fn.extend({find:function(a){var b,c=[],d=this,e=d.length;if("string"!=typeof a)return this.pushStack(m(a).filter(function(){for(b=0;e>b;b++)if(m.contains(d[b],this))return!0}));for(b=0;e>b;b++)m.find(a,d[b],c);return c=this.pushStack(e>1?m.unique(c):c),c.selector=this.selector?this.selector+" "+a:a,c},filter:function(a){return this.pushStack(w(this,a||[],!1))},not:function(a){return this.pushStack(w(this,a||[],!0))},is:function(a){return!!w(this,"string"==typeof a&&t.test(a)?m(a):a||[],!1).length}});var x,y=a.document,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=m.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a.charAt(0)&&">"===a.charAt(a.length-1)&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||x).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof m?b[0]:b,m.merge(this,m.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:y,!0)),u.test(c[1])&&m.isPlainObject(b))for(c in b)m.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}if(d=y.getElementById(c[2]),d&&d.parentNode){if(d.id!==c[2])return x.find(a);this.length=1,this[0]=d}return this.context=y,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):m.isFunction(a)?"undefined"!=typeof x.ready?x.ready(a):a(m):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),m.makeArray(a,this))};A.prototype=m.fn,x=m(y);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};m.extend({dir:function(a,b,c){var d=[],e=a[b];while(e&&9!==e.nodeType&&(void 0===c||1!==e.nodeType||!m(e).is(c)))1===e.nodeType&&d.push(e),e=e[b];return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),m.fn.extend({has:function(a){var b,c=m(a,this),d=c.length;return this.filter(function(){for(b=0;d>b;b++)if(m.contains(this,c[b]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=t.test(a)||"string"!=typeof a?m(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&m.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?m.unique(f):f)},index:function(a){return a?"string"==typeof a?m.inArray(this[0],m(a)):m.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(m.unique(m.merge(this.get(),m(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){do a=a[b];while(a&&1!==a.nodeType);return a}m.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return m.dir(a,"parentNode")},parentsUntil:function(a,b,c){return m.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return m.dir(a,"nextSibling")},prevAll:function(a){return m.dir(a,"previousSibling")},nextUntil:function(a,b,c){return m.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return m.dir(a,"previousSibling",c)},siblings:function(a){return m.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return m.sibling(a.firstChild)},contents:function(a){return m.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:m.merge([],a.childNodes)}},function(a,b){m.fn[a]=function(c,d){var e=m.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=m.filter(d,e)),this.length>1&&(C[a]||(e=m.unique(e)),B.test(a)&&(e=e.reverse())),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return m.each(a.match(E)||[],function(a,c){b[c]=!0}),b}m.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):m.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(c=a.memory&&l,d=!0,f=g||0,g=0,e=h.length,b=!0;h&&e>f;f++)if(h[f].apply(l[0],l[1])===!1&&a.stopOnFalse){c=!1;break}b=!1,h&&(i?i.length&&j(i.shift()):c?h=[]:k.disable())},k={add:function(){if(h){var d=h.length;!function f(b){m.each(b,function(b,c){var d=m.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&f(c)})}(arguments),b?e=h.length:c&&(g=d,j(c))}return this},remove:function(){return h&&m.each(arguments,function(a,c){var d;while((d=m.inArray(c,h,d))>-1)h.splice(d,1),b&&(e>=d&&e--,f>=d&&f--)}),this},has:function(a){return a?m.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],e=0,this},disable:function(){return h=i=c=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,c||k.disable(),this},locked:function(){return!i},fireWith:function(a,c){return!h||d&&!i||(c=c||[],c=[a,c.slice?c.slice():c],b?i.push(c):j(c)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!d}};return k},m.extend({Deferred:function(a){var b=[["resolve","done",m.Callbacks("once memory"),"resolved"],["reject","fail",m.Callbacks("once memory"),"rejected"],["notify","progress",m.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return m.Deferred(function(c){m.each(b,function(b,f){var g=m.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&m.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?m.extend(a,d):d}},e={};return d.pipe=d.then,m.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&m.isFunction(a.promise)?e:0,g=1===f?a:m.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&m.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;m.fn.ready=function(a){return m.ready.promise().done(a),this},m.extend({isReady:!1,readyWait:1,holdReady:function(a){a?m.readyWait++:m.ready(!0)},ready:function(a){if(a===!0?!--m.readyWait:!m.isReady){if(!y.body)return setTimeout(m.ready);m.isReady=!0,a!==!0&&--m.readyWait>0||(H.resolveWith(y,[m]),m.fn.triggerHandler&&(m(y).triggerHandler("ready"),m(y).off("ready")))}}});function I(){y.addEventListener?(y.removeEventListener("DOMContentLoaded",J,!1),a.removeEventListener("load",J,!1)):(y.detachEvent("onreadystatechange",J),a.detachEvent("onload",J))}function J(){(y.addEventListener||"load"===event.type||"complete"===y.readyState)&&(I(),m.ready())}m.ready.promise=function(b){if(!H)if(H=m.Deferred(),"complete"===y.readyState)setTimeout(m.ready);else if(y.addEventListener)y.addEventListener("DOMContentLoaded",J,!1),a.addEventListener("load",J,!1);else{y.attachEvent("onreadystatechange",J),a.attachEvent("onload",J);var c=!1;try{c=null==a.frameElement&&y.documentElement}catch(d){}c&&c.doScroll&&!function e(){if(!m.isReady){try{c.doScroll("left")}catch(a){return setTimeout(e,50)}I(),m.ready()}}()}return H.promise(b)};var K="undefined",L;for(L in m(k))break;k.ownLast="0"!==L,k.inlineBlockNeedsLayout=!1,m(function(){var a,b,c,d;c=y.getElementsByTagName("body")[0],c&&c.style&&(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),typeof b.style.zoom!==K&&(b.style.cssText="display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",k.inlineBlockNeedsLayout=a=3===b.offsetWidth,a&&(c.style.zoom=1)),c.removeChild(d))}),function(){var a=y.createElement("div");if(null==k.deleteExpando){k.deleteExpando=!0;try{delete a.test}catch(b){k.deleteExpando=!1}}a=null}(),m.acceptData=function(a){var b=m.noData[(a.nodeName+" ").toLowerCase()],c=+a.nodeType||1;return 1!==c&&9!==c?!1:!b||b!==!0&&a.getAttribute("classid")===b};var M=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,N=/([A-Z])/g;function O(a,b,c){if(void 0===c&&1===a.nodeType){var d="data-"+b.replace(N,"-$1").toLowerCase();if(c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:M.test(c)?m.parseJSON(c):c}catch(e){}m.data(a,b,c)}else c=void 0}return c}function P(a){var b;for(b in a)if(("data"!==b||!m.isEmptyObject(a[b]))&&"toJSON"!==b)return!1;
return!0}function Q(a,b,d,e){if(m.acceptData(a)){var f,g,h=m.expando,i=a.nodeType,j=i?m.cache:a,k=i?a[h]:a[h]&&h;if(k&&j[k]&&(e||j[k].data)||void 0!==d||"string"!=typeof b)return k||(k=i?a[h]=c.pop()||m.guid++:h),j[k]||(j[k]=i?{}:{toJSON:m.noop}),("object"==typeof b||"function"==typeof b)&&(e?j[k]=m.extend(j[k],b):j[k].data=m.extend(j[k].data,b)),g=j[k],e||(g.data||(g.data={}),g=g.data),void 0!==d&&(g[m.camelCase(b)]=d),"string"==typeof b?(f=g[b],null==f&&(f=g[m.camelCase(b)])):f=g,f}}function R(a,b,c){if(m.acceptData(a)){var d,e,f=a.nodeType,g=f?m.cache:a,h=f?a[m.expando]:m.expando;if(g[h]){if(b&&(d=c?g[h]:g[h].data)){m.isArray(b)?b=b.concat(m.map(b,m.camelCase)):b in d?b=[b]:(b=m.camelCase(b),b=b in d?[b]:b.split(" ")),e=b.length;while(e--)delete d[b[e]];if(c?!P(d):!m.isEmptyObject(d))return}(c||(delete g[h].data,P(g[h])))&&(f?m.cleanData([a],!0):k.deleteExpando||g!=g.window?delete g[h]:g[h]=null)}}}m.extend({cache:{},noData:{"applet ":!0,"embed ":!0,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(a){return a=a.nodeType?m.cache[a[m.expando]]:a[m.expando],!!a&&!P(a)},data:function(a,b,c){return Q(a,b,c)},removeData:function(a,b){return R(a,b)},_data:function(a,b,c){return Q(a,b,c,!0)},_removeData:function(a,b){return R(a,b,!0)}}),m.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=m.data(f),1===f.nodeType&&!m._data(f,"parsedAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=m.camelCase(d.slice(5)),O(f,d,e[d])));m._data(f,"parsedAttrs",!0)}return e}return"object"==typeof a?this.each(function(){m.data(this,a)}):arguments.length>1?this.each(function(){m.data(this,a,b)}):f?O(f,a,m.data(f,a)):void 0},removeData:function(a){return this.each(function(){m.removeData(this,a)})}}),m.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=m._data(a,b),c&&(!d||m.isArray(c)?d=m._data(a,b,m.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=m.queue(a,b),d=c.length,e=c.shift(),f=m._queueHooks(a,b),g=function(){m.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return m._data(a,c)||m._data(a,c,{empty:m.Callbacks("once memory").add(function(){m._removeData(a,b+"queue"),m._removeData(a,c)})})}}),m.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?m.queue(this[0],a):void 0===b?this:this.each(function(){var c=m.queue(this,a,b);m._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&m.dequeue(this,a)})},dequeue:function(a){return this.each(function(){m.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=m.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=m._data(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var S=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,T=["Top","Right","Bottom","Left"],U=function(a,b){return a=b||a,"none"===m.css(a,"display")||!m.contains(a.ownerDocument,a)},V=m.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===m.type(c)){e=!0;for(h in c)m.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,m.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(m(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},W=/^(?:checkbox|radio)$/i;!function(){var a=y.createElement("input"),b=y.createElement("div"),c=y.createDocumentFragment();if(b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",k.leadingWhitespace=3===b.firstChild.nodeType,k.tbody=!b.getElementsByTagName("tbody").length,k.htmlSerialize=!!b.getElementsByTagName("link").length,k.html5Clone="<:nav></:nav>"!==y.createElement("nav").cloneNode(!0).outerHTML,a.type="checkbox",a.checked=!0,c.appendChild(a),k.appendChecked=a.checked,b.innerHTML="<textarea>x</textarea>",k.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue,c.appendChild(b),b.innerHTML="<input type='radio' checked='checked' name='t'/>",k.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,k.noCloneEvent=!0,b.attachEvent&&(b.attachEvent("onclick",function(){k.noCloneEvent=!1}),b.cloneNode(!0).click()),null==k.deleteExpando){k.deleteExpando=!0;try{delete b.test}catch(d){k.deleteExpando=!1}}}(),function(){var b,c,d=y.createElement("div");for(b in{submit:!0,change:!0,focusin:!0})c="on"+b,(k[b+"Bubbles"]=c in a)||(d.setAttribute(c,"t"),k[b+"Bubbles"]=d.attributes[c].expando===!1);d=null}();var X=/^(?:input|select|textarea)$/i,Y=/^key/,Z=/^(?:mouse|pointer|contextmenu)|click/,$=/^(?:focusinfocus|focusoutblur)$/,_=/^([^.]*)(?:\.(.+)|)$/;function ab(){return!0}function bb(){return!1}function cb(){try{return y.activeElement}catch(a){}}m.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,n,o,p,q,r=m._data(a);if(r){c.handler&&(i=c,c=i.handler,e=i.selector),c.guid||(c.guid=m.guid++),(g=r.events)||(g=r.events={}),(k=r.handle)||(k=r.handle=function(a){return typeof m===K||a&&m.event.triggered===a.type?void 0:m.event.dispatch.apply(k.elem,arguments)},k.elem=a),b=(b||"").match(E)||[""],h=b.length;while(h--)f=_.exec(b[h])||[],o=q=f[1],p=(f[2]||"").split(".").sort(),o&&(j=m.event.special[o]||{},o=(e?j.delegateType:j.bindType)||o,j=m.event.special[o]||{},l=m.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&m.expr.match.needsContext.test(e),namespace:p.join(".")},i),(n=g[o])||(n=g[o]=[],n.delegateCount=0,j.setup&&j.setup.call(a,d,p,k)!==!1||(a.addEventListener?a.addEventListener(o,k,!1):a.attachEvent&&a.attachEvent("on"+o,k))),j.add&&(j.add.call(a,l),l.handler.guid||(l.handler.guid=c.guid)),e?n.splice(n.delegateCount++,0,l):n.push(l),m.event.global[o]=!0);a=null}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,n,o,p,q,r=m.hasData(a)&&m._data(a);if(r&&(k=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=_.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=m.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,n=k[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),i=f=n.length;while(f--)g=n[f],!e&&q!==g.origType||c&&c.guid!==g.guid||h&&!h.test(g.namespace)||d&&d!==g.selector&&("**"!==d||!g.selector)||(n.splice(f,1),g.selector&&n.delegateCount--,l.remove&&l.remove.call(a,g));i&&!n.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||m.removeEvent(a,o,r.handle),delete k[o])}else for(o in k)m.event.remove(a,o+b[j],c,d,!0);m.isEmptyObject(k)&&(delete r.handle,m._removeData(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,l,n,o=[d||y],p=j.call(b,"type")?b.type:b,q=j.call(b,"namespace")?b.namespace.split("."):[];if(h=l=d=d||y,3!==d.nodeType&&8!==d.nodeType&&!$.test(p+m.event.triggered)&&(p.indexOf(".")>=0&&(q=p.split("."),p=q.shift(),q.sort()),g=p.indexOf(":")<0&&"on"+p,b=b[m.expando]?b:new m.Event(p,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=q.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+q.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:m.makeArray(c,[b]),k=m.event.special[p]||{},e||!k.trigger||k.trigger.apply(d,c)!==!1)){if(!e&&!k.noBubble&&!m.isWindow(d)){for(i=k.delegateType||p,$.test(i+p)||(h=h.parentNode);h;h=h.parentNode)o.push(h),l=h;l===(d.ownerDocument||y)&&o.push(l.defaultView||l.parentWindow||a)}n=0;while((h=o[n++])&&!b.isPropagationStopped())b.type=n>1?i:k.bindType||p,f=(m._data(h,"events")||{})[b.type]&&m._data(h,"handle"),f&&f.apply(h,c),f=g&&h[g],f&&f.apply&&m.acceptData(h)&&(b.result=f.apply(h,c),b.result===!1&&b.preventDefault());if(b.type=p,!e&&!b.isDefaultPrevented()&&(!k._default||k._default.apply(o.pop(),c)===!1)&&m.acceptData(d)&&g&&d[p]&&!m.isWindow(d)){l=d[g],l&&(d[g]=null),m.event.triggered=p;try{d[p]()}catch(r){}m.event.triggered=void 0,l&&(d[g]=l)}return b.result}},dispatch:function(a){a=m.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(m._data(this,"events")||{})[a.type]||[],k=m.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=m.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,g=0;while((e=f.handlers[g++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(e.namespace))&&(a.handleObj=e,a.data=e.data,c=((m.event.special[e.origType]||{}).handle||e.handler).apply(f.elem,i),void 0!==c&&(a.result=c)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!=this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(e=[],f=0;h>f;f++)d=b[f],c=d.selector+" ",void 0===e[c]&&(e[c]=d.needsContext?m(c,this).index(i)>=0:m.find(c,this,null,[i]).length),e[c]&&e.push(d);e.length&&g.push({elem:i,handlers:e})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},fix:function(a){if(a[m.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=Z.test(e)?this.mouseHooks:Y.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new m.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=f.srcElement||y),3===a.target.nodeType&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,g.filter?g.filter(a,f):a},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button,g=b.fromElement;return null==a.pageX&&null!=b.clientX&&(d=a.target.ownerDocument||y,e=d.documentElement,c=d.body,a.pageX=b.clientX+(e&&e.scrollLeft||c&&c.scrollLeft||0)-(e&&e.clientLeft||c&&c.clientLeft||0),a.pageY=b.clientY+(e&&e.scrollTop||c&&c.scrollTop||0)-(e&&e.clientTop||c&&c.clientTop||0)),!a.relatedTarget&&g&&(a.relatedTarget=g===a.target?b.toElement:g),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==cb()&&this.focus)try{return this.focus(),!1}catch(a){}},delegateType:"focusin"},blur:{trigger:function(){return this===cb()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return m.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):void 0},_default:function(a){return m.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=m.extend(new m.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?m.event.trigger(e,null,b):m.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},m.removeEvent=y.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){var d="on"+b;a.detachEvent&&(typeof a[d]===K&&(a[d]=null),a.detachEvent(d,c))},m.Event=function(a,b){return this instanceof m.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?ab:bb):this.type=a,b&&m.extend(this,b),this.timeStamp=a&&a.timeStamp||m.now(),void(this[m.expando]=!0)):new m.Event(a,b)},m.Event.prototype={isDefaultPrevented:bb,isPropagationStopped:bb,isImmediatePropagationStopped:bb,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=ab,a&&(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=ab,a&&(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=ab,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},m.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){m.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!m.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),k.submitBubbles||(m.event.special.submit={setup:function(){return m.nodeName(this,"form")?!1:void m.event.add(this,"click._submit keypress._submit",function(a){var b=a.target,c=m.nodeName(b,"input")||m.nodeName(b,"button")?b.form:void 0;c&&!m._data(c,"submitBubbles")&&(m.event.add(c,"submit._submit",function(a){a._submit_bubble=!0}),m._data(c,"submitBubbles",!0))})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&m.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){return m.nodeName(this,"form")?!1:void m.event.remove(this,"._submit")}}),k.changeBubbles||(m.event.special.change={setup:function(){return X.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(m.event.add(this,"propertychange._change",function(a){"checked"===a.originalEvent.propertyName&&(this._just_changed=!0)}),m.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1),m.event.simulate("change",this,a,!0)})),!1):void m.event.add(this,"beforeactivate._change",function(a){var b=a.target;X.test(b.nodeName)&&!m._data(b,"changeBubbles")&&(m.event.add(b,"change._change",function(a){!this.parentNode||a.isSimulated||a.isTrigger||m.event.simulate("change",this.parentNode,a,!0)}),m._data(b,"changeBubbles",!0))})},handle:function(a){var b=a.target;return this!==b||a.isSimulated||a.isTrigger||"radio"!==b.type&&"checkbox"!==b.type?a.handleObj.handler.apply(this,arguments):void 0},teardown:function(){return m.event.remove(this,"._change"),!X.test(this.nodeName)}}),k.focusinBubbles||m.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){m.event.simulate(b,a.target,m.event.fix(a),!0)};m.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=m._data(d,b);e||d.addEventListener(a,c,!0),m._data(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=m._data(d,b)-1;e?m._data(d,b,e):(d.removeEventListener(a,c,!0),m._removeData(d,b))}}}),m.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(f in a)this.on(f,b,c,a[f],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=bb;else if(!d)return this;return 1===e&&(g=d,d=function(a){return m().off(a),g.apply(this,arguments)},d.guid=g.guid||(g.guid=m.guid++)),this.each(function(){m.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,m(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=bb),this.each(function(){m.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){m.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?m.event.trigger(a,b,c,!0):void 0}});function db(a){var b=eb.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}var eb="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",fb=/ jQuery\d+="(?:null|\d+)"/g,gb=new RegExp("<(?:"+eb+")[\\s/>]","i"),hb=/^\s+/,ib=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,jb=/<([\w:]+)/,kb=/<tbody/i,lb=/<|&#?\w+;/,mb=/<(?:script|style|link)/i,nb=/checked\s*(?:[^=]|=\s*.checked.)/i,ob=/^$|\/(?:java|ecma)script/i,pb=/^true\/(.*)/,qb=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,rb={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:k.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},sb=db(y),tb=sb.appendChild(y.createElement("div"));rb.optgroup=rb.option,rb.tbody=rb.tfoot=rb.colgroup=rb.caption=rb.thead,rb.th=rb.td;function ub(a,b){var c,d,e=0,f=typeof a.getElementsByTagName!==K?a.getElementsByTagName(b||"*"):typeof a.querySelectorAll!==K?a.querySelectorAll(b||"*"):void 0;if(!f)for(f=[],c=a.childNodes||a;null!=(d=c[e]);e++)!b||m.nodeName(d,b)?f.push(d):m.merge(f,ub(d,b));return void 0===b||b&&m.nodeName(a,b)?m.merge([a],f):f}function vb(a){W.test(a.type)&&(a.defaultChecked=a.checked)}function wb(a,b){return m.nodeName(a,"table")&&m.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function xb(a){return a.type=(null!==m.find.attr(a,"type"))+"/"+a.type,a}function yb(a){var b=pb.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function zb(a,b){for(var c,d=0;null!=(c=a[d]);d++)m._data(c,"globalEval",!b||m._data(b[d],"globalEval"))}function Ab(a,b){if(1===b.nodeType&&m.hasData(a)){var c,d,e,f=m._data(a),g=m._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;e>d;d++)m.event.add(b,c,h[c][d])}g.data&&(g.data=m.extend({},g.data))}}function Bb(a,b){var c,d,e;if(1===b.nodeType){if(c=b.nodeName.toLowerCase(),!k.noCloneEvent&&b[m.expando]){e=m._data(b);for(d in e.events)m.removeEvent(b,d,e.handle);b.removeAttribute(m.expando)}"script"===c&&b.text!==a.text?(xb(b).text=a.text,yb(b)):"object"===c?(b.parentNode&&(b.outerHTML=a.outerHTML),k.html5Clone&&a.innerHTML&&!m.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):"input"===c&&W.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):"option"===c?b.defaultSelected=b.selected=a.defaultSelected:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}}m.extend({clone:function(a,b,c){var d,e,f,g,h,i=m.contains(a.ownerDocument,a);if(k.html5Clone||m.isXMLDoc(a)||!gb.test("<"+a.nodeName+">")?f=a.cloneNode(!0):(tb.innerHTML=a.outerHTML,tb.removeChild(f=tb.firstChild)),!(k.noCloneEvent&&k.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||m.isXMLDoc(a)))for(d=ub(f),h=ub(a),g=0;null!=(e=h[g]);++g)d[g]&&Bb(e,d[g]);if(b)if(c)for(h=h||ub(a),d=d||ub(f),g=0;null!=(e=h[g]);g++)Ab(e,d[g]);else Ab(a,f);return d=ub(f,"script"),d.length>0&&zb(d,!i&&ub(a,"script")),d=h=e=null,f},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,l,n=a.length,o=db(b),p=[],q=0;n>q;q++)if(f=a[q],f||0===f)if("object"===m.type(f))m.merge(p,f.nodeType?[f]:f);else if(lb.test(f)){h=h||o.appendChild(b.createElement("div")),i=(jb.exec(f)||["",""])[1].toLowerCase(),l=rb[i]||rb._default,h.innerHTML=l[1]+f.replace(ib,"<$1></$2>")+l[2],e=l[0];while(e--)h=h.lastChild;if(!k.leadingWhitespace&&hb.test(f)&&p.push(b.createTextNode(hb.exec(f)[0])),!k.tbody){f="table"!==i||kb.test(f)?"<table>"!==l[1]||kb.test(f)?0:h:h.firstChild,e=f&&f.childNodes.length;while(e--)m.nodeName(j=f.childNodes[e],"tbody")&&!j.childNodes.length&&f.removeChild(j)}m.merge(p,h.childNodes),h.textContent="";while(h.firstChild)h.removeChild(h.firstChild);h=o.lastChild}else p.push(b.createTextNode(f));h&&o.removeChild(h),k.appendChecked||m.grep(ub(p,"input"),vb),q=0;while(f=p[q++])if((!d||-1===m.inArray(f,d))&&(g=m.contains(f.ownerDocument,f),h=ub(o.appendChild(f),"script"),g&&zb(h),c)){e=0;while(f=h[e++])ob.test(f.type||"")&&c.push(f)}return h=null,o},cleanData:function(a,b){for(var d,e,f,g,h=0,i=m.expando,j=m.cache,l=k.deleteExpando,n=m.event.special;null!=(d=a[h]);h++)if((b||m.acceptData(d))&&(f=d[i],g=f&&j[f])){if(g.events)for(e in g.events)n[e]?m.event.remove(d,e):m.removeEvent(d,e,g.handle);j[f]&&(delete j[f],l?delete d[i]:typeof d.removeAttribute!==K?d.removeAttribute(i):d[i]=null,c.push(f))}}}),m.fn.extend({text:function(a){return V(this,function(a){return void 0===a?m.text(this):this.empty().append((this[0]&&this[0].ownerDocument||y).createTextNode(a))},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=wb(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=wb(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?m.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||m.cleanData(ub(c)),c.parentNode&&(b&&m.contains(c.ownerDocument,c)&&zb(ub(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++){1===a.nodeType&&m.cleanData(ub(a,!1));while(a.firstChild)a.removeChild(a.firstChild);a.options&&m.nodeName(a,"select")&&(a.options.length=0)}return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return m.clone(this,a,b)})},html:function(a){return V(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a)return 1===b.nodeType?b.innerHTML.replace(fb,""):void 0;if(!("string"!=typeof a||mb.test(a)||!k.htmlSerialize&&gb.test(a)||!k.leadingWhitespace&&hb.test(a)||rb[(jb.exec(a)||["",""])[1].toLowerCase()])){a=a.replace(ib,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(m.cleanData(ub(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,m.cleanData(ub(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,l=this.length,n=this,o=l-1,p=a[0],q=m.isFunction(p);if(q||l>1&&"string"==typeof p&&!k.checkClone&&nb.test(p))return this.each(function(c){var d=n.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(l&&(i=m.buildFragment(a,this[0].ownerDocument,!1,this),c=i.firstChild,1===i.childNodes.length&&(i=c),c)){for(g=m.map(ub(i,"script"),xb),f=g.length;l>j;j++)d=i,j!==o&&(d=m.clone(d,!0,!0),f&&m.merge(g,ub(d,"script"))),b.call(this[j],d,j);if(f)for(h=g[g.length-1].ownerDocument,m.map(g,yb),j=0;f>j;j++)d=g[j],ob.test(d.type||"")&&!m._data(d,"globalEval")&&m.contains(h,d)&&(d.src?m._evalUrl&&m._evalUrl(d.src):m.globalEval((d.text||d.textContent||d.innerHTML||"").replace(qb,"")));i=c=null}return this}}),m.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){m.fn[a]=function(a){for(var c,d=0,e=[],g=m(a),h=g.length-1;h>=d;d++)c=d===h?this:this.clone(!0),m(g[d])[b](c),f.apply(e,c.get());return this.pushStack(e)}});var Cb,Db={};function Eb(b,c){var d,e=m(c.createElement(b)).appendTo(c.body),f=a.getDefaultComputedStyle&&(d=a.getDefaultComputedStyle(e[0]))?d.display:m.css(e[0],"display");return e.detach(),f}function Fb(a){var b=y,c=Db[a];return c||(c=Eb(a,b),"none"!==c&&c||(Cb=(Cb||m("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=(Cb[0].contentWindow||Cb[0].contentDocument).document,b.write(),b.close(),c=Eb(a,b),Cb.detach()),Db[a]=c),c}!function(){var a;k.shrinkWrapBlocks=function(){if(null!=a)return a;a=!1;var b,c,d;return c=y.getElementsByTagName("body")[0],c&&c.style?(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),typeof b.style.zoom!==K&&(b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",b.appendChild(y.createElement("div")).style.width="5px",a=3!==b.offsetWidth),c.removeChild(d),a):void 0}}();var Gb=/^margin/,Hb=new RegExp("^("+S+")(?!px)[a-z%]+$","i"),Ib,Jb,Kb=/^(top|right|bottom|left)$/;a.getComputedStyle?(Ib=function(b){return b.ownerDocument.defaultView.opener?b.ownerDocument.defaultView.getComputedStyle(b,null):a.getComputedStyle(b,null)},Jb=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ib(a),g=c?c.getPropertyValue(b)||c[b]:void 0,c&&(""!==g||m.contains(a.ownerDocument,a)||(g=m.style(a,b)),Hb.test(g)&&Gb.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0===g?g:g+""}):y.documentElement.currentStyle&&(Ib=function(a){return a.currentStyle},Jb=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ib(a),g=c?c[b]:void 0,null==g&&h&&h[b]&&(g=h[b]),Hb.test(g)&&!Kb.test(b)&&(d=h.left,e=a.runtimeStyle,f=e&&e.left,f&&(e.left=a.currentStyle.left),h.left="fontSize"===b?"1em":g,g=h.pixelLeft+"px",h.left=d,f&&(e.left=f)),void 0===g?g:g+""||"auto"});function Lb(a,b){return{get:function(){var c=a();if(null!=c)return c?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d,e,f,g,h;if(b=y.createElement("div"),b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",d=b.getElementsByTagName("a")[0],c=d&&d.style){c.cssText="float:left;opacity:.5",k.opacity="0.5"===c.opacity,k.cssFloat=!!c.cssFloat,b.style.backgroundClip="content-box",b.cloneNode(!0).style.backgroundClip="",k.clearCloneStyle="content-box"===b.style.backgroundClip,k.boxSizing=""===c.boxSizing||""===c.MozBoxSizing||""===c.WebkitBoxSizing,m.extend(k,{reliableHiddenOffsets:function(){return null==g&&i(),g},boxSizingReliable:function(){return null==f&&i(),f},pixelPosition:function(){return null==e&&i(),e},reliableMarginRight:function(){return null==h&&i(),h}});function i(){var b,c,d,i;c=y.getElementsByTagName("body")[0],c&&c.style&&(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),b.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",e=f=!1,h=!0,a.getComputedStyle&&(e="1%"!==(a.getComputedStyle(b,null)||{}).top,f="4px"===(a.getComputedStyle(b,null)||{width:"4px"}).width,i=b.appendChild(y.createElement("div")),i.style.cssText=b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",i.style.marginRight=i.style.width="0",b.style.width="1px",h=!parseFloat((a.getComputedStyle(i,null)||{}).marginRight),b.removeChild(i)),b.innerHTML="<table><tr><td></td><td>t</td></tr></table>",i=b.getElementsByTagName("td"),i[0].style.cssText="margin:0;border:0;padding:0;display:none",g=0===i[0].offsetHeight,g&&(i[0].style.display="",i[1].style.display="none",g=0===i[0].offsetHeight),c.removeChild(d))}}}(),m.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var Mb=/alpha\([^)]*\)/i,Nb=/opacity\s*=\s*([^)]*)/,Ob=/^(none|table(?!-c[ea]).+)/,Pb=new RegExp("^("+S+")(.*)$","i"),Qb=new RegExp("^([+-])=("+S+")","i"),Rb={position:"absolute",visibility:"hidden",display:"block"},Sb={letterSpacing:"0",fontWeight:"400"},Tb=["Webkit","O","Moz","ms"];function Ub(a,b){if(b in a)return b;var c=b.charAt(0).toUpperCase()+b.slice(1),d=b,e=Tb.length;while(e--)if(b=Tb[e]+c,b in a)return b;return d}function Vb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=m._data(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&U(d)&&(f[g]=m._data(d,"olddisplay",Fb(d.nodeName)))):(e=U(d),(c&&"none"!==c||!e)&&m._data(d,"olddisplay",e?c:m.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}function Wb(a,b,c){var d=Pb.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Xb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=m.css(a,c+T[f],!0,e)),d?("content"===c&&(g-=m.css(a,"padding"+T[f],!0,e)),"margin"!==c&&(g-=m.css(a,"border"+T[f]+"Width",!0,e))):(g+=m.css(a,"padding"+T[f],!0,e),"padding"!==c&&(g+=m.css(a,"border"+T[f]+"Width",!0,e)));return g}function Yb(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=Ib(a),g=k.boxSizing&&"border-box"===m.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=Jb(a,b,f),(0>e||null==e)&&(e=a.style[b]),Hb.test(e))return e;d=g&&(k.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Xb(a,b,c||(g?"border":"content"),d,f)+"px"}m.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Jb(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":k.cssFloat?"cssFloat":"styleFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=m.camelCase(b),i=a.style;if(b=m.cssProps[h]||(m.cssProps[h]=Ub(i,h)),g=m.cssHooks[b]||m.cssHooks[h],void 0===c)return g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b];if(f=typeof c,"string"===f&&(e=Qb.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(m.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||m.cssNumber[h]||(c+="px"),k.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),!(g&&"set"in g&&void 0===(c=g.set(a,c,d)))))try{i[b]=c}catch(j){}}},css:function(a,b,c,d){var e,f,g,h=m.camelCase(b);return b=m.cssProps[h]||(m.cssProps[h]=Ub(a.style,h)),g=m.cssHooks[b]||m.cssHooks[h],g&&"get"in g&&(f=g.get(a,!0,c)),void 0===f&&(f=Jb(a,b,d)),"normal"===f&&b in Sb&&(f=Sb[b]),""===c||c?(e=parseFloat(f),c===!0||m.isNumeric(e)?e||0:f):f}}),m.each(["height","width"],function(a,b){m.cssHooks[b]={get:function(a,c,d){return c?Ob.test(m.css(a,"display"))&&0===a.offsetWidth?m.swap(a,Rb,function(){return Yb(a,b,d)}):Yb(a,b,d):void 0},set:function(a,c,d){var e=d&&Ib(a);return Wb(a,c,d?Xb(a,b,d,k.boxSizing&&"border-box"===m.css(a,"boxSizing",!1,e),e):0)}}}),k.opacity||(m.cssHooks.opacity={get:function(a,b){return Nb.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=m.isNumeric(b)?"alpha(opacity="+100*b+")":"",f=d&&d.filter||c.filter||"";c.zoom=1,(b>=1||""===b)&&""===m.trim(f.replace(Mb,""))&&c.removeAttribute&&(c.removeAttribute("filter"),""===b||d&&!d.filter)||(c.filter=Mb.test(f)?f.replace(Mb,e):f+" "+e)}}),m.cssHooks.marginRight=Lb(k.reliableMarginRight,function(a,b){return b?m.swap(a,{display:"inline-block"},Jb,[a,"marginRight"]):void 0}),m.each({margin:"",padding:"",border:"Width"},function(a,b){m.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+T[d]+b]=f[d]||f[d-2]||f[0];return e}},Gb.test(a)||(m.cssHooks[a+b].set=Wb)}),m.fn.extend({css:function(a,b){return V(this,function(a,b,c){var d,e,f={},g=0;if(m.isArray(b)){for(d=Ib(a),e=b.length;e>g;g++)f[b[g]]=m.css(a,b[g],!1,d);return f}return void 0!==c?m.style(a,b,c):m.css(a,b)},a,b,arguments.length>1)},show:function(){return Vb(this,!0)},hide:function(){return Vb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){U(this)?m(this).show():m(this).hide()})}});function Zb(a,b,c,d,e){return new Zb.prototype.init(a,b,c,d,e)
}m.Tween=Zb,Zb.prototype={constructor:Zb,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(m.cssNumber[c]?"":"px")},cur:function(){var a=Zb.propHooks[this.prop];return a&&a.get?a.get(this):Zb.propHooks._default.get(this)},run:function(a){var b,c=Zb.propHooks[this.prop];return this.pos=b=this.options.duration?m.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Zb.propHooks._default.set(this),this}},Zb.prototype.init.prototype=Zb.prototype,Zb.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=m.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){m.fx.step[a.prop]?m.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[m.cssProps[a.prop]]||m.cssHooks[a.prop])?m.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Zb.propHooks.scrollTop=Zb.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},m.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},m.fx=Zb.prototype.init,m.fx.step={};var $b,_b,ac=/^(?:toggle|show|hide)$/,bc=new RegExp("^(?:([+-])=|)("+S+")([a-z%]*)$","i"),cc=/queueHooks$/,dc=[ic],ec={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=bc.exec(b),f=e&&e[3]||(m.cssNumber[a]?"":"px"),g=(m.cssNumber[a]||"px"!==f&&+d)&&bc.exec(m.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,m.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function fc(){return setTimeout(function(){$b=void 0}),$b=m.now()}function gc(a,b){var c,d={height:a},e=0;for(b=b?1:0;4>e;e+=2-b)c=T[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function hc(a,b,c){for(var d,e=(ec[b]||[]).concat(ec["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function ic(a,b,c){var d,e,f,g,h,i,j,l,n=this,o={},p=a.style,q=a.nodeType&&U(a),r=m._data(a,"fxshow");c.queue||(h=m._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,n.always(function(){n.always(function(){h.unqueued--,m.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[p.overflow,p.overflowX,p.overflowY],j=m.css(a,"display"),l="none"===j?m._data(a,"olddisplay")||Fb(a.nodeName):j,"inline"===l&&"none"===m.css(a,"float")&&(k.inlineBlockNeedsLayout&&"inline"!==Fb(a.nodeName)?p.zoom=1:p.display="inline-block")),c.overflow&&(p.overflow="hidden",k.shrinkWrapBlocks()||n.always(function(){p.overflow=c.overflow[0],p.overflowX=c.overflow[1],p.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],ac.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(q?"hide":"show")){if("show"!==e||!r||void 0===r[d])continue;q=!0}o[d]=r&&r[d]||m.style(a,d)}else j=void 0;if(m.isEmptyObject(o))"inline"===("none"===j?Fb(a.nodeName):j)&&(p.display=j);else{r?"hidden"in r&&(q=r.hidden):r=m._data(a,"fxshow",{}),f&&(r.hidden=!q),q?m(a).show():n.done(function(){m(a).hide()}),n.done(function(){var b;m._removeData(a,"fxshow");for(b in o)m.style(a,b,o[b])});for(d in o)g=hc(q?r[d]:0,d,n),d in r||(r[d]=g.start,q&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function jc(a,b){var c,d,e,f,g;for(c in a)if(d=m.camelCase(c),e=b[d],f=a[c],m.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=m.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function kc(a,b,c){var d,e,f=0,g=dc.length,h=m.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=$b||fc(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:m.extend({},b),opts:m.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:$b||fc(),duration:c.duration,tweens:[],createTween:function(b,c){var d=m.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(jc(k,j.opts.specialEasing);g>f;f++)if(d=dc[f].call(j,a,k,j.opts))return d;return m.map(k,hc,j),m.isFunction(j.opts.start)&&j.opts.start.call(a,j),m.fx.timer(m.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}m.Animation=m.extend(kc,{tweener:function(a,b){m.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],ec[c]=ec[c]||[],ec[c].unshift(b)},prefilter:function(a,b){b?dc.unshift(a):dc.push(a)}}),m.speed=function(a,b,c){var d=a&&"object"==typeof a?m.extend({},a):{complete:c||!c&&b||m.isFunction(a)&&a,duration:a,easing:c&&b||b&&!m.isFunction(b)&&b};return d.duration=m.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in m.fx.speeds?m.fx.speeds[d.duration]:m.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){m.isFunction(d.old)&&d.old.call(this),d.queue&&m.dequeue(this,d.queue)},d},m.fn.extend({fadeTo:function(a,b,c,d){return this.filter(U).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=m.isEmptyObject(a),f=m.speed(b,c,d),g=function(){var b=kc(this,m.extend({},a),f);(e||m._data(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=m.timers,g=m._data(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&cc.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&m.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=m._data(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=m.timers,g=d?d.length:0;for(c.finish=!0,m.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),m.each(["toggle","show","hide"],function(a,b){var c=m.fn[b];m.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(gc(b,!0),a,d,e)}}),m.each({slideDown:gc("show"),slideUp:gc("hide"),slideToggle:gc("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){m.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),m.timers=[],m.fx.tick=function(){var a,b=m.timers,c=0;for($b=m.now();c<b.length;c++)a=b[c],a()||b[c]!==a||b.splice(c--,1);b.length||m.fx.stop(),$b=void 0},m.fx.timer=function(a){m.timers.push(a),a()?m.fx.start():m.timers.pop()},m.fx.interval=13,m.fx.start=function(){_b||(_b=setInterval(m.fx.tick,m.fx.interval))},m.fx.stop=function(){clearInterval(_b),_b=null},m.fx.speeds={slow:600,fast:200,_default:400},m.fn.delay=function(a,b){return a=m.fx?m.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a,b,c,d,e;b=y.createElement("div"),b.setAttribute("className","t"),b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",d=b.getElementsByTagName("a")[0],c=y.createElement("select"),e=c.appendChild(y.createElement("option")),a=b.getElementsByTagName("input")[0],d.style.cssText="top:1px",k.getSetAttribute="t"!==b.className,k.style=/top/.test(d.getAttribute("style")),k.hrefNormalized="/a"===d.getAttribute("href"),k.checkOn=!!a.value,k.optSelected=e.selected,k.enctype=!!y.createElement("form").enctype,c.disabled=!0,k.optDisabled=!e.disabled,a=y.createElement("input"),a.setAttribute("value",""),k.input=""===a.getAttribute("value"),a.value="t",a.setAttribute("type","radio"),k.radioValue="t"===a.value}();var lc=/\r/g;m.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=m.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,m(this).val()):a,null==e?e="":"number"==typeof e?e+="":m.isArray(e)&&(e=m.map(e,function(a){return null==a?"":a+""})),b=m.valHooks[this.type]||m.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=m.valHooks[e.type]||m.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(lc,""):null==c?"":c)}}}),m.extend({valHooks:{option:{get:function(a){var b=m.find.attr(a,"value");return null!=b?b:m.trim(m.text(a))}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(k.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&m.nodeName(c.parentNode,"optgroup"))){if(b=m(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=m.makeArray(b),g=e.length;while(g--)if(d=e[g],m.inArray(m.valHooks.option.get(d),f)>=0)try{d.selected=c=!0}catch(h){d.scrollHeight}else d.selected=!1;return c||(a.selectedIndex=-1),e}}}}),m.each(["radio","checkbox"],function(){m.valHooks[this]={set:function(a,b){return m.isArray(b)?a.checked=m.inArray(m(a).val(),b)>=0:void 0}},k.checkOn||(m.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var mc,nc,oc=m.expr.attrHandle,pc=/^(?:checked|selected)$/i,qc=k.getSetAttribute,rc=k.input;m.fn.extend({attr:function(a,b){return V(this,m.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){m.removeAttr(this,a)})}}),m.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===K?m.prop(a,b,c):(1===f&&m.isXMLDoc(a)||(b=b.toLowerCase(),d=m.attrHooks[b]||(m.expr.match.bool.test(b)?nc:mc)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=m.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void m.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=m.propFix[c]||c,m.expr.match.bool.test(c)?rc&&qc||!pc.test(c)?a[d]=!1:a[m.camelCase("default-"+c)]=a[d]=!1:m.attr(a,c,""),a.removeAttribute(qc?c:d)},attrHooks:{type:{set:function(a,b){if(!k.radioValue&&"radio"===b&&m.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),nc={set:function(a,b,c){return b===!1?m.removeAttr(a,c):rc&&qc||!pc.test(c)?a.setAttribute(!qc&&m.propFix[c]||c,c):a[m.camelCase("default-"+c)]=a[c]=!0,c}},m.each(m.expr.match.bool.source.match(/\w+/g),function(a,b){var c=oc[b]||m.find.attr;oc[b]=rc&&qc||!pc.test(b)?function(a,b,d){var e,f;return d||(f=oc[b],oc[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,oc[b]=f),e}:function(a,b,c){return c?void 0:a[m.camelCase("default-"+b)]?b.toLowerCase():null}}),rc&&qc||(m.attrHooks.value={set:function(a,b,c){return m.nodeName(a,"input")?void(a.defaultValue=b):mc&&mc.set(a,b,c)}}),qc||(mc={set:function(a,b,c){var d=a.getAttributeNode(c);return d||a.setAttributeNode(d=a.ownerDocument.createAttribute(c)),d.value=b+="","value"===c||b===a.getAttribute(c)?b:void 0}},oc.id=oc.name=oc.coords=function(a,b,c){var d;return c?void 0:(d=a.getAttributeNode(b))&&""!==d.value?d.value:null},m.valHooks.button={get:function(a,b){var c=a.getAttributeNode(b);return c&&c.specified?c.value:void 0},set:mc.set},m.attrHooks.contenteditable={set:function(a,b,c){mc.set(a,""===b?!1:b,c)}},m.each(["width","height"],function(a,b){m.attrHooks[b]={set:function(a,c){return""===c?(a.setAttribute(b,"auto"),c):void 0}}})),k.style||(m.attrHooks.style={get:function(a){return a.style.cssText||void 0},set:function(a,b){return a.style.cssText=b+""}});var sc=/^(?:input|select|textarea|button|object)$/i,tc=/^(?:a|area)$/i;m.fn.extend({prop:function(a,b){return V(this,m.prop,a,b,arguments.length>1)},removeProp:function(a){return a=m.propFix[a]||a,this.each(function(){try{this[a]=void 0,delete this[a]}catch(b){}})}}),m.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!m.isXMLDoc(a),f&&(b=m.propFix[b]||b,e=m.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=m.find.attr(a,"tabindex");return b?parseInt(b,10):sc.test(a.nodeName)||tc.test(a.nodeName)&&a.href?0:-1}}}}),k.hrefNormalized||m.each(["href","src"],function(a,b){m.propHooks[b]={get:function(a){return a.getAttribute(b,4)}}}),k.optSelected||(m.propHooks.selected={get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null}}),m.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){m.propFix[this.toLowerCase()]=this}),k.enctype||(m.propFix.enctype="encoding");var uc=/[\t\r\n\f]/g;m.fn.extend({addClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j="string"==typeof a&&a;if(m.isFunction(a))return this.each(function(b){m(this).addClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(E)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(uc," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=m.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j=0===arguments.length||"string"==typeof a&&a;if(m.isFunction(a))return this.each(function(b){m(this).removeClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(E)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(uc," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?m.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(m.isFunction(a)?function(c){m(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=m(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===K||"boolean"===c)&&(this.className&&m._data(this,"__className__",this.className),this.className=this.className||a===!1?"":m._data(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(uc," ").indexOf(b)>=0)return!0;return!1}}),m.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){m.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),m.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var vc=m.now(),wc=/\?/,xc=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;m.parseJSON=function(b){if(a.JSON&&a.JSON.parse)return a.JSON.parse(b+"");var c,d=null,e=m.trim(b+"");return e&&!m.trim(e.replace(xc,function(a,b,e,f){return c&&b&&(d=0),0===d?a:(c=e||b,d+=!f-!e,"")}))?Function("return "+e)():m.error("Invalid JSON: "+b)},m.parseXML=function(b){var c,d;if(!b||"string"!=typeof b)return null;try{a.DOMParser?(d=new DOMParser,c=d.parseFromString(b,"text/xml")):(c=new ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b))}catch(e){c=void 0}return c&&c.documentElement&&!c.getElementsByTagName("parsererror").length||m.error("Invalid XML: "+b),c};var yc,zc,Ac=/#.*$/,Bc=/([?&])_=[^&]*/,Cc=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Dc=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Ec=/^(?:GET|HEAD)$/,Fc=/^\/\//,Gc=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,Hc={},Ic={},Jc="*/".concat("*");try{zc=location.href}catch(Kc){zc=y.createElement("a"),zc.href="",zc=zc.href}yc=Gc.exec(zc.toLowerCase())||[];function Lc(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(m.isFunction(c))while(d=f[e++])"+"===d.charAt(0)?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Mc(a,b,c,d){var e={},f=a===Ic;function g(h){var i;return e[h]=!0,m.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Nc(a,b){var c,d,e=m.ajaxSettings.flatOptions||{};for(d in b)void 0!==b[d]&&((e[d]?a:c||(c={}))[d]=b[d]);return c&&m.extend(!0,a,c),a}function Oc(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===e&&(e=a.mimeType||b.getResponseHeader("Content-Type"));if(e)for(g in h)if(h[g]&&h[g].test(e)){i.unshift(g);break}if(i[0]in c)f=i[0];else{for(g in c){if(!i[0]||a.converters[g+" "+i[0]]){f=g;break}d||(d=g)}f=f||d}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function Pc(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}m.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:zc,type:"GET",isLocal:Dc.test(yc[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Jc,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":m.parseJSON,"text xml":m.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Nc(Nc(a,m.ajaxSettings),b):Nc(m.ajaxSettings,a)},ajaxPrefilter:Lc(Hc),ajaxTransport:Lc(Ic),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=m.ajaxSetup({},b),l=k.context||k,n=k.context&&(l.nodeType||l.jquery)?m(l):m.event,o=m.Deferred(),p=m.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!j){j={};while(b=Cc.exec(f))j[b[1].toLowerCase()]=b[2]}b=j[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?f:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return i&&i.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||zc)+"").replace(Ac,"").replace(Fc,yc[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=m.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(c=Gc.exec(k.url.toLowerCase()),k.crossDomain=!(!c||c[1]===yc[1]&&c[2]===yc[2]&&(c[3]||("http:"===c[1]?"80":"443"))===(yc[3]||("http:"===yc[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=m.param(k.data,k.traditional)),Mc(Hc,k,b,v),2===t)return v;h=m.event&&k.global,h&&0===m.active++&&m.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!Ec.test(k.type),e=k.url,k.hasContent||(k.data&&(e=k.url+=(wc.test(e)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=Bc.test(e)?e.replace(Bc,"$1_="+vc++):e+(wc.test(e)?"&":"?")+"_="+vc++)),k.ifModified&&(m.lastModified[e]&&v.setRequestHeader("If-Modified-Since",m.lastModified[e]),m.etag[e]&&v.setRequestHeader("If-None-Match",m.etag[e])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+Jc+"; q=0.01":""):k.accepts["*"]);for(d in k.headers)v.setRequestHeader(d,k.headers[d]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(d in{success:1,error:1,complete:1})v[d](k[d]);if(i=Mc(Ic,k,b,v)){v.readyState=1,h&&n.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,i.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,c,d){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),i=void 0,f=d||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,c&&(u=Oc(k,v,c)),u=Pc(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(m.lastModified[e]=w),w=v.getResponseHeader("etag"),w&&(m.etag[e]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,h&&n.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),h&&(n.trigger("ajaxComplete",[v,k]),--m.active||m.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return m.get(a,b,c,"json")},getScript:function(a,b){return m.get(a,void 0,b,"script")}}),m.each(["get","post"],function(a,b){m[b]=function(a,c,d,e){return m.isFunction(c)&&(e=e||d,d=c,c=void 0),m.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),m._evalUrl=function(a){return m.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},m.fn.extend({wrapAll:function(a){if(m.isFunction(a))return this.each(function(b){m(this).wrapAll(a.call(this,b))});if(this[0]){var b=m(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&1===a.firstChild.nodeType)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return this.each(m.isFunction(a)?function(b){m(this).wrapInner(a.call(this,b))}:function(){var b=m(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=m.isFunction(a);return this.each(function(c){m(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){m.nodeName(this,"body")||m(this).replaceWith(this.childNodes)}).end()}}),m.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0||!k.reliableHiddenOffsets()&&"none"===(a.style&&a.style.display||m.css(a,"display"))},m.expr.filters.visible=function(a){return!m.expr.filters.hidden(a)};var Qc=/%20/g,Rc=/\[\]$/,Sc=/\r?\n/g,Tc=/^(?:submit|button|image|reset|file)$/i,Uc=/^(?:input|select|textarea|keygen)/i;function Vc(a,b,c,d){var e;if(m.isArray(b))m.each(b,function(b,e){c||Rc.test(a)?d(a,e):Vc(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==m.type(b))d(a,b);else for(e in b)Vc(a+"["+e+"]",b[e],c,d)}m.param=function(a,b){var c,d=[],e=function(a,b){b=m.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=m.ajaxSettings&&m.ajaxSettings.traditional),m.isArray(a)||a.jquery&&!m.isPlainObject(a))m.each(a,function(){e(this.name,this.value)});else for(c in a)Vc(c,a[c],b,e);return d.join("&").replace(Qc,"+")},m.fn.extend({serialize:function(){return m.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=m.prop(this,"elements");return a?m.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!m(this).is(":disabled")&&Uc.test(this.nodeName)&&!Tc.test(a)&&(this.checked||!W.test(a))}).map(function(a,b){var c=m(this).val();return null==c?null:m.isArray(c)?m.map(c,function(a){return{name:b.name,value:a.replace(Sc,"\r\n")}}):{name:b.name,value:c.replace(Sc,"\r\n")}}).get()}}),m.ajaxSettings.xhr=void 0!==a.ActiveXObject?function(){return!this.isLocal&&/^(get|post|head|put|delete|options)$/i.test(this.type)&&Zc()||$c()}:Zc;var Wc=0,Xc={},Yc=m.ajaxSettings.xhr();a.attachEvent&&a.attachEvent("onunload",function(){for(var a in Xc)Xc[a](void 0,!0)}),k.cors=!!Yc&&"withCredentials"in Yc,Yc=k.ajax=!!Yc,Yc&&m.ajaxTransport(function(a){if(!a.crossDomain||k.cors){var b;return{send:function(c,d){var e,f=a.xhr(),g=++Wc;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)void 0!==c[e]&&f.setRequestHeader(e,c[e]+"");f.send(a.hasContent&&a.data||null),b=function(c,e){var h,i,j;if(b&&(e||4===f.readyState))if(delete Xc[g],b=void 0,f.onreadystatechange=m.noop,e)4!==f.readyState&&f.abort();else{j={},h=f.status,"string"==typeof f.responseText&&(j.text=f.responseText);try{i=f.statusText}catch(k){i=""}h||!a.isLocal||a.crossDomain?1223===h&&(h=204):h=j.text?200:404}j&&d(h,i,j,f.getAllResponseHeaders())},a.async?4===f.readyState?setTimeout(b):f.onreadystatechange=Xc[g]=b:b()},abort:function(){b&&b(void 0,!0)}}}});function Zc(){try{return new a.XMLHttpRequest}catch(b){}}function $c(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}m.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return m.globalEval(a),a}}}),m.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),m.ajaxTransport("script",function(a){if(a.crossDomain){var b,c=y.head||m("head")[0]||y.documentElement;return{send:function(d,e){b=y.createElement("script"),b.async=!0,a.scriptCharset&&(b.charset=a.scriptCharset),b.src=a.url,b.onload=b.onreadystatechange=function(a,c){(c||!b.readyState||/loaded|complete/.test(b.readyState))&&(b.onload=b.onreadystatechange=null,b.parentNode&&b.parentNode.removeChild(b),b=null,c||e(200,"success"))},c.insertBefore(b,c.firstChild)},abort:function(){b&&b.onload(void 0,!0)}}}});var _c=[],ad=/(=)\?(?=&|$)|\?\?/;m.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=_c.pop()||m.expando+"_"+vc++;return this[a]=!0,a}}),m.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(ad.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&ad.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=m.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(ad,"$1"+e):b.jsonp!==!1&&(b.url+=(wc.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||m.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,_c.push(e)),g&&m.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),m.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||y;var d=u.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=m.buildFragment([a],b,e),e&&e.length&&m(e).remove(),m.merge([],d.childNodes))};var bd=m.fn.load;m.fn.load=function(a,b,c){if("string"!=typeof a&&bd)return bd.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=m.trim(a.slice(h,a.length)),a=a.slice(0,h)),m.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(f="POST"),g.length>0&&m.ajax({url:a,type:f,dataType:"html",data:b}).done(function(a){e=arguments,g.html(d?m("<div>").append(m.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,e||[a.responseText,b,a])}),this},m.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){m.fn[b]=function(a){return this.on(b,a)}}),m.expr.filters.animated=function(a){return m.grep(m.timers,function(b){return a===b.elem}).length};var cd=a.document.documentElement;function dd(a){return m.isWindow(a)?a:9===a.nodeType?a.defaultView||a.parentWindow:!1}m.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=m.css(a,"position"),l=m(a),n={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=m.css(a,"top"),i=m.css(a,"left"),j=("absolute"===k||"fixed"===k)&&m.inArray("auto",[f,i])>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),m.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(n.top=b.top-h.top+g),null!=b.left&&(n.left=b.left-h.left+e),"using"in b?b.using.call(a,n):l.css(n)}},m.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){m.offset.setOffset(this,a,b)});var b,c,d={top:0,left:0},e=this[0],f=e&&e.ownerDocument;if(f)return b=f.documentElement,m.contains(b,e)?(typeof e.getBoundingClientRect!==K&&(d=e.getBoundingClientRect()),c=dd(f),{top:d.top+(c.pageYOffset||b.scrollTop)-(b.clientTop||0),left:d.left+(c.pageXOffset||b.scrollLeft)-(b.clientLeft||0)}):d},position:function(){if(this[0]){var a,b,c={top:0,left:0},d=this[0];return"fixed"===m.css(d,"position")?b=d.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),m.nodeName(a[0],"html")||(c=a.offset()),c.top+=m.css(a[0],"borderTopWidth",!0),c.left+=m.css(a[0],"borderLeftWidth",!0)),{top:b.top-c.top-m.css(d,"marginTop",!0),left:b.left-c.left-m.css(d,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||cd;while(a&&!m.nodeName(a,"html")&&"static"===m.css(a,"position"))a=a.offsetParent;return a||cd})}}),m.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c=/Y/.test(b);m.fn[a]=function(d){return V(this,function(a,d,e){var f=dd(a);return void 0===e?f?b in f?f[b]:f.document.documentElement[d]:a[d]:void(f?f.scrollTo(c?m(f).scrollLeft():e,c?e:m(f).scrollTop()):a[d]=e)},a,d,arguments.length,null)}}),m.each(["top","left"],function(a,b){m.cssHooks[b]=Lb(k.pixelPosition,function(a,c){return c?(c=Jb(a,b),Hb.test(c)?m(a).position()[b]+"px":c):void 0})}),m.each({Height:"height",Width:"width"},function(a,b){m.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){m.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return V(this,function(b,c,d){var e;return m.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?m.css(b,c,g):m.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),m.fn.size=function(){return this.length},m.fn.andSelf=m.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return m});var ed=a.jQuery,fd=a.$;return m.noConflict=function(b){return a.$===m&&(a.$=fd),b&&a.jQuery===m&&(a.jQuery=ed),m},typeof b===K&&(a.jQuery=a.$=m),m});

/*! jQuery UI - v1.12.1 - 2017-01-30
* http://jqueryui.com
* Includes: widget.js, data.js, disable-selection.js, jquery-1-7.js, scroll-parent.js, widgets/sortable.js, widgets/mouse.js, effect.js, effects/effect-blind.js, effects/effect-bounce.js, effects/effect-clip.js, effects/effect-drop.js, effects/effect-explode.js, effects/effect-fade.js, effects/effect-fold.js, effects/effect-highlight.js, effects/effect-puff.js, effects/effect-pulsate.js, effects/effect-scale.js, effects/effect-shake.js, effects/effect-size.js, effects/effect-slide.js, effects/effect-transfer.js
* Copyright jQuery Foundation and other contributors; Licensed MIT */

(function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)})(function(t){t.ui=t.ui||{},t.ui.version="1.12.1";var e=0,i=Array.prototype.slice;t.cleanData=function(e){return function(i){var s,n,o;for(o=0;null!=(n=i[o]);o++)try{s=t._data(n,"events"),s&&s.remove&&t(n).triggerHandler("remove")}catch(a){}e(i)}}(t.cleanData),t.widget=function(e,i,s){var n,o,a,r={},l=e.split(".")[0];e=e.split(".")[1];var h=l+"-"+e;return s||(s=i,i=t.Widget),t.isArray(s)&&(s=t.extend.apply(null,[{}].concat(s))),t.expr[":"][h.toLowerCase()]=function(e){return!!t.data(e,h)},t[l]=t[l]||{},n=t[l][e],o=t[l][e]=function(t,e){return this._createWidget?(arguments.length&&this._createWidget(t,e),void 0):new o(t,e)},t.extend(o,n,{version:s.version,_proto:t.extend({},s),_childConstructors:[]}),a=new i,a.options=t.widget.extend({},a.options),t.each(s,function(e,s){return t.isFunction(s)?(r[e]=function(){function t(){return i.prototype[e].apply(this,arguments)}function n(t){return i.prototype[e].apply(this,t)}return function(){var e,i=this._super,o=this._superApply;return this._super=t,this._superApply=n,e=s.apply(this,arguments),this._super=i,this._superApply=o,e}}(),void 0):(r[e]=s,void 0)}),o.prototype=t.widget.extend(a,{widgetEventPrefix:n?a.widgetEventPrefix||e:e},r,{constructor:o,namespace:l,widgetName:e,widgetFullName:h}),n?(t.each(n._childConstructors,function(e,i){var s=i.prototype;t.widget(s.namespace+"."+s.widgetName,o,i._proto)}),delete n._childConstructors):i._childConstructors.push(o),t.widget.bridge(e,o),o},t.widget.extend=function(e){for(var s,n,o=i.call(arguments,1),a=0,r=o.length;r>a;a++)for(s in o[a])n=o[a][s],o[a].hasOwnProperty(s)&&void 0!==n&&(e[s]=t.isPlainObject(n)?t.isPlainObject(e[s])?t.widget.extend({},e[s],n):t.widget.extend({},n):n);return e},t.widget.bridge=function(e,s){var n=s.prototype.widgetFullName||e;t.fn[e]=function(o){var a="string"==typeof o,r=i.call(arguments,1),l=this;return a?this.length||"instance"!==o?this.each(function(){var i,s=t.data(this,n);return"instance"===o?(l=s,!1):s?t.isFunction(s[o])&&"_"!==o.charAt(0)?(i=s[o].apply(s,r),i!==s&&void 0!==i?(l=i&&i.jquery?l.pushStack(i.get()):i,!1):void 0):t.error("no such method '"+o+"' for "+e+" widget instance"):t.error("cannot call methods on "+e+" prior to initialization; "+"attempted to call method '"+o+"'")}):l=void 0:(r.length&&(o=t.widget.extend.apply(null,[o].concat(r))),this.each(function(){var e=t.data(this,n);e?(e.option(o||{}),e._init&&e._init()):t.data(this,n,new s(o,this))})),l}},t.Widget=function(){},t.Widget._childConstructors=[],t.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{classes:{},disabled:!1,create:null},_createWidget:function(i,s){s=t(s||this.defaultElement||this)[0],this.element=t(s),this.uuid=e++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=t(),this.hoverable=t(),this.focusable=t(),this.classesElementLookup={},s!==this&&(t.data(s,this.widgetFullName,this),this._on(!0,this.element,{remove:function(t){t.target===s&&this.destroy()}}),this.document=t(s.style?s.ownerDocument:s.document||s),this.window=t(this.document[0].defaultView||this.document[0].parentWindow)),this.options=t.widget.extend({},this.options,this._getCreateOptions(),i),this._create(),this.options.disabled&&this._setOptionDisabled(this.options.disabled),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:function(){return{}},_getCreateEventData:t.noop,_create:t.noop,_init:t.noop,destroy:function(){var e=this;this._destroy(),t.each(this.classesElementLookup,function(t,i){e._removeClass(i,t)}),this.element.off(this.eventNamespace).removeData(this.widgetFullName),this.widget().off(this.eventNamespace).removeAttr("aria-disabled"),this.bindings.off(this.eventNamespace)},_destroy:t.noop,widget:function(){return this.element},option:function(e,i){var s,n,o,a=e;if(0===arguments.length)return t.widget.extend({},this.options);if("string"==typeof e)if(a={},s=e.split("."),e=s.shift(),s.length){for(n=a[e]=t.widget.extend({},this.options[e]),o=0;s.length-1>o;o++)n[s[o]]=n[s[o]]||{},n=n[s[o]];if(e=s.pop(),1===arguments.length)return void 0===n[e]?null:n[e];n[e]=i}else{if(1===arguments.length)return void 0===this.options[e]?null:this.options[e];a[e]=i}return this._setOptions(a),this},_setOptions:function(t){var e;for(e in t)this._setOption(e,t[e]);return this},_setOption:function(t,e){return"classes"===t&&this._setOptionClasses(e),this.options[t]=e,"disabled"===t&&this._setOptionDisabled(e),this},_setOptionClasses:function(e){var i,s,n;for(i in e)n=this.classesElementLookup[i],e[i]!==this.options.classes[i]&&n&&n.length&&(s=t(n.get()),this._removeClass(n,i),s.addClass(this._classes({element:s,keys:i,classes:e,add:!0})))},_setOptionDisabled:function(t){this._toggleClass(this.widget(),this.widgetFullName+"-disabled",null,!!t),t&&(this._removeClass(this.hoverable,null,"ui-state-hover"),this._removeClass(this.focusable,null,"ui-state-focus"))},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_classes:function(e){function i(i,o){var a,r;for(r=0;i.length>r;r++)a=n.classesElementLookup[i[r]]||t(),a=e.add?t(t.unique(a.get().concat(e.element.get()))):t(a.not(e.element).get()),n.classesElementLookup[i[r]]=a,s.push(i[r]),o&&e.classes[i[r]]&&s.push(e.classes[i[r]])}var s=[],n=this;return e=t.extend({element:this.element,classes:this.options.classes||{}},e),this._on(e.element,{remove:"_untrackClassesElement"}),e.keys&&i(e.keys.match(/\S+/g)||[],!0),e.extra&&i(e.extra.match(/\S+/g)||[]),s.join(" ")},_untrackClassesElement:function(e){var i=this;t.each(i.classesElementLookup,function(s,n){-1!==t.inArray(e.target,n)&&(i.classesElementLookup[s]=t(n.not(e.target).get()))})},_removeClass:function(t,e,i){return this._toggleClass(t,e,i,!1)},_addClass:function(t,e,i){return this._toggleClass(t,e,i,!0)},_toggleClass:function(t,e,i,s){s="boolean"==typeof s?s:i;var n="string"==typeof t||null===t,o={extra:n?e:i,keys:n?t:e,element:n?this.element:t,add:s};return o.element.toggleClass(this._classes(o),s),this},_on:function(e,i,s){var n,o=this;"boolean"!=typeof e&&(s=i,i=e,e=!1),s?(i=n=t(i),this.bindings=this.bindings.add(i)):(s=i,i=this.element,n=this.widget()),t.each(s,function(s,a){function r(){return e||o.options.disabled!==!0&&!t(this).hasClass("ui-state-disabled")?("string"==typeof a?o[a]:a).apply(o,arguments):void 0}"string"!=typeof a&&(r.guid=a.guid=a.guid||r.guid||t.guid++);var l=s.match(/^([\w:-]*)\s*(.*)$/),h=l[1]+o.eventNamespace,c=l[2];c?n.on(h,c,r):i.on(h,r)})},_off:function(e,i){i=(i||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.off(i).off(i),this.bindings=t(this.bindings.not(e).get()),this.focusable=t(this.focusable.not(e).get()),this.hoverable=t(this.hoverable.not(e).get())},_delay:function(t,e){function i(){return("string"==typeof t?s[t]:t).apply(s,arguments)}var s=this;return setTimeout(i,e||0)},_hoverable:function(e){this.hoverable=this.hoverable.add(e),this._on(e,{mouseenter:function(e){this._addClass(t(e.currentTarget),null,"ui-state-hover")},mouseleave:function(e){this._removeClass(t(e.currentTarget),null,"ui-state-hover")}})},_focusable:function(e){this.focusable=this.focusable.add(e),this._on(e,{focusin:function(e){this._addClass(t(e.currentTarget),null,"ui-state-focus")},focusout:function(e){this._removeClass(t(e.currentTarget),null,"ui-state-focus")}})},_trigger:function(e,i,s){var n,o,a=this.options[e];if(s=s||{},i=t.Event(i),i.type=(e===this.widgetEventPrefix?e:this.widgetEventPrefix+e).toLowerCase(),i.target=this.element[0],o=i.originalEvent)for(n in o)n in i||(i[n]=o[n]);return this.element.trigger(i,s),!(t.isFunction(a)&&a.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented())}},t.each({show:"fadeIn",hide:"fadeOut"},function(e,i){t.Widget.prototype["_"+e]=function(s,n,o){"string"==typeof n&&(n={effect:n});var a,r=n?n===!0||"number"==typeof n?i:n.effect||i:e;n=n||{},"number"==typeof n&&(n={duration:n}),a=!t.isEmptyObject(n),n.complete=o,n.delay&&s.delay(n.delay),a&&t.effects&&t.effects.effect[r]?s[e](n):r!==e&&s[r]?s[r](n.duration,n.easing,o):s.queue(function(i){t(this)[e](),o&&o.call(s[0]),i()})}}),t.widget,t.extend(t.expr[":"],{data:t.expr.createPseudo?t.expr.createPseudo(function(e){return function(i){return!!t.data(i,e)}}):function(e,i,s){return!!t.data(e,s[3])}}),t.fn.extend({disableSelection:function(){var t="onselectstart"in document.createElement("div")?"selectstart":"mousedown";return function(){return this.on(t+".ui-disableSelection",function(t){t.preventDefault()})}}(),enableSelection:function(){return this.off(".ui-disableSelection")}}),"1.7"===t.fn.jquery.substring(0,3)&&(t.each(["Width","Height"],function(e,i){function s(e,i,s,o){return t.each(n,function(){i-=parseFloat(t.css(e,"padding"+this))||0,s&&(i-=parseFloat(t.css(e,"border"+this+"Width"))||0),o&&(i-=parseFloat(t.css(e,"margin"+this))||0)}),i}var n="Width"===i?["Left","Right"]:["Top","Bottom"],o=i.toLowerCase(),a={innerWidth:t.fn.innerWidth,innerHeight:t.fn.innerHeight,outerWidth:t.fn.outerWidth,outerHeight:t.fn.outerHeight};t.fn["inner"+i]=function(e){return void 0===e?a["inner"+i].call(this):this.each(function(){t(this).css(o,s(this,e)+"px")})},t.fn["outer"+i]=function(e,n){return"number"!=typeof e?a["outer"+i].call(this,e):this.each(function(){t(this).css(o,s(this,e,!0,n)+"px")})}}),t.fn.addBack=function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))}),t.fn.scrollParent=function(e){var i=this.css("position"),s="absolute"===i,n=e?/(auto|scroll|hidden)/:/(auto|scroll)/,o=this.parents().filter(function(){var e=t(this);return s&&"static"===e.css("position")?!1:n.test(e.css("overflow")+e.css("overflow-y")+e.css("overflow-x"))}).eq(0);return"fixed"!==i&&o.length?o:t(this[0].ownerDocument||document)},t.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());var s=!1;t(document).on("mouseup",function(){s=!1}),t.widget("ui.mouse",{version:"1.12.1",options:{cancel:"input, textarea, button, select, option",distance:1,delay:0},_mouseInit:function(){var e=this;this.element.on("mousedown."+this.widgetName,function(t){return e._mouseDown(t)}).on("click."+this.widgetName,function(i){return!0===t.data(i.target,e.widgetName+".preventClickEvent")?(t.removeData(i.target,e.widgetName+".preventClickEvent"),i.stopImmediatePropagation(),!1):void 0}),this.started=!1},_mouseDestroy:function(){this.element.off("."+this.widgetName),this._mouseMoveDelegate&&this.document.off("mousemove."+this.widgetName,this._mouseMoveDelegate).off("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(e){if(!s){this._mouseMoved=!1,this._mouseStarted&&this._mouseUp(e),this._mouseDownEvent=e;var i=this,n=1===e.which,o="string"==typeof this.options.cancel&&e.target.nodeName?t(e.target).closest(this.options.cancel).length:!1;return n&&!o&&this._mouseCapture(e)?(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){i.mouseDelayMet=!0},this.options.delay)),this._mouseDistanceMet(e)&&this._mouseDelayMet(e)&&(this._mouseStarted=this._mouseStart(e)!==!1,!this._mouseStarted)?(e.preventDefault(),!0):(!0===t.data(e.target,this.widgetName+".preventClickEvent")&&t.removeData(e.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(t){return i._mouseMove(t)},this._mouseUpDelegate=function(t){return i._mouseUp(t)},this.document.on("mousemove."+this.widgetName,this._mouseMoveDelegate).on("mouseup."+this.widgetName,this._mouseUpDelegate),e.preventDefault(),s=!0,!0)):!0}},_mouseMove:function(e){if(this._mouseMoved){if(t.ui.ie&&(!document.documentMode||9>document.documentMode)&&!e.button)return this._mouseUp(e);if(!e.which)if(e.originalEvent.altKey||e.originalEvent.ctrlKey||e.originalEvent.metaKey||e.originalEvent.shiftKey)this.ignoreMissingWhich=!0;else if(!this.ignoreMissingWhich)return this._mouseUp(e)}return(e.which||e.button)&&(this._mouseMoved=!0),this._mouseStarted?(this._mouseDrag(e),e.preventDefault()):(this._mouseDistanceMet(e)&&this._mouseDelayMet(e)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,e)!==!1,this._mouseStarted?this._mouseDrag(e):this._mouseUp(e)),!this._mouseStarted)},_mouseUp:function(e){this.document.off("mousemove."+this.widgetName,this._mouseMoveDelegate).off("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,e.target===this._mouseDownEvent.target&&t.data(e.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(e)),this._mouseDelayTimer&&(clearTimeout(this._mouseDelayTimer),delete this._mouseDelayTimer),this.ignoreMissingWhich=!1,s=!1,e.preventDefault()},_mouseDistanceMet:function(t){return Math.max(Math.abs(this._mouseDownEvent.pageX-t.pageX),Math.abs(this._mouseDownEvent.pageY-t.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}}),t.widget("ui.sortable",t.ui.mouse,{version:"1.12.1",widgetEventPrefix:"sort",ready:!1,options:{appendTo:"parent",axis:!1,connectWith:!1,containment:!1,cursor:"auto",cursorAt:!1,dropOnEmpty:!0,forcePlaceholderSize:!1,forceHelperSize:!1,grid:!1,handle:!1,helper:"original",items:"> *",opacity:!1,placeholder:!1,revert:!1,scroll:!0,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1e3,activate:null,beforeStop:null,change:null,deactivate:null,out:null,over:null,receive:null,remove:null,sort:null,start:null,stop:null,update:null},_isOverAxis:function(t,e,i){return t>=e&&e+i>t},_isFloating:function(t){return/left|right/.test(t.css("float"))||/inline|table-cell/.test(t.css("display"))},_create:function(){this.containerCache={},this._addClass("ui-sortable"),this.refresh(),this.offset=this.element.offset(),this._mouseInit(),this._setHandleClassName(),this.ready=!0},_setOption:function(t,e){this._super(t,e),"handle"===t&&this._setHandleClassName()},_setHandleClassName:function(){var e=this;this._removeClass(this.element.find(".ui-sortable-handle"),"ui-sortable-handle"),t.each(this.items,function(){e._addClass(this.instance.options.handle?this.item.find(this.instance.options.handle):this.item,"ui-sortable-handle")})},_destroy:function(){this._mouseDestroy();for(var t=this.items.length-1;t>=0;t--)this.items[t].item.removeData(this.widgetName+"-item");return this},_mouseCapture:function(e,i){var s=null,n=!1,o=this;return this.reverting?!1:this.options.disabled||"static"===this.options.type?!1:(this._refreshItems(e),t(e.target).parents().each(function(){return t.data(this,o.widgetName+"-item")===o?(s=t(this),!1):void 0}),t.data(e.target,o.widgetName+"-item")===o&&(s=t(e.target)),s?!this.options.handle||i||(t(this.options.handle,s).find("*").addBack().each(function(){this===e.target&&(n=!0)}),n)?(this.currentItem=s,this._removeCurrentsFromItems(),!0):!1:!1)},_mouseStart:function(e,i,s){var n,o,a=this.options;if(this.currentContainer=this,this.refreshPositions(),this.helper=this._createHelper(e),this._cacheHelperProportions(),this._cacheMargins(),this.scrollParent=this.helper.scrollParent(),this.offset=this.currentItem.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},t.extend(this.offset,{click:{left:e.pageX-this.offset.left,top:e.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.helper.css("position","absolute"),this.cssPosition=this.helper.css("position"),this.originalPosition=this._generatePosition(e),this.originalPageX=e.pageX,this.originalPageY=e.pageY,a.cursorAt&&this._adjustOffsetFromHelper(a.cursorAt),this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]},this.helper[0]!==this.currentItem[0]&&this.currentItem.hide(),this._createPlaceholder(),a.containment&&this._setContainment(),a.cursor&&"auto"!==a.cursor&&(o=this.document.find("body"),this.storedCursor=o.css("cursor"),o.css("cursor",a.cursor),this.storedStylesheet=t("<style>*{ cursor: "+a.cursor+" !important; }</style>").appendTo(o)),a.opacity&&(this.helper.css("opacity")&&(this._storedOpacity=this.helper.css("opacity")),this.helper.css("opacity",a.opacity)),a.zIndex&&(this.helper.css("zIndex")&&(this._storedZIndex=this.helper.css("zIndex")),this.helper.css("zIndex",a.zIndex)),this.scrollParent[0]!==this.document[0]&&"HTML"!==this.scrollParent[0].tagName&&(this.overflowOffset=this.scrollParent.offset()),this._trigger("start",e,this._uiHash()),this._preserveHelperProportions||this._cacheHelperProportions(),!s)for(n=this.containers.length-1;n>=0;n--)this.containers[n]._trigger("activate",e,this._uiHash(this));return t.ui.ddmanager&&(t.ui.ddmanager.current=this),t.ui.ddmanager&&!a.dropBehaviour&&t.ui.ddmanager.prepareOffsets(this,e),this.dragging=!0,this._addClass(this.helper,"ui-sortable-helper"),this._mouseDrag(e),!0},_mouseDrag:function(e){var i,s,n,o,a=this.options,r=!1;for(this.position=this._generatePosition(e),this.positionAbs=this._convertPositionTo("absolute"),this.lastPositionAbs||(this.lastPositionAbs=this.positionAbs),this.options.scroll&&(this.scrollParent[0]!==this.document[0]&&"HTML"!==this.scrollParent[0].tagName?(this.overflowOffset.top+this.scrollParent[0].offsetHeight-e.pageY<a.scrollSensitivity?this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop+a.scrollSpeed:e.pageY-this.overflowOffset.top<a.scrollSensitivity&&(this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop-a.scrollSpeed),this.overflowOffset.left+this.scrollParent[0].offsetWidth-e.pageX<a.scrollSensitivity?this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft+a.scrollSpeed:e.pageX-this.overflowOffset.left<a.scrollSensitivity&&(this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft-a.scrollSpeed)):(e.pageY-this.document.scrollTop()<a.scrollSensitivity?r=this.document.scrollTop(this.document.scrollTop()-a.scrollSpeed):this.window.height()-(e.pageY-this.document.scrollTop())<a.scrollSensitivity&&(r=this.document.scrollTop(this.document.scrollTop()+a.scrollSpeed)),e.pageX-this.document.scrollLeft()<a.scrollSensitivity?r=this.document.scrollLeft(this.document.scrollLeft()-a.scrollSpeed):this.window.width()-(e.pageX-this.document.scrollLeft())<a.scrollSensitivity&&(r=this.document.scrollLeft(this.document.scrollLeft()+a.scrollSpeed))),r!==!1&&t.ui.ddmanager&&!a.dropBehaviour&&t.ui.ddmanager.prepareOffsets(this,e)),this.positionAbs=this._convertPositionTo("absolute"),this.options.axis&&"y"===this.options.axis||(this.helper[0].style.left=this.position.left+"px"),this.options.axis&&"x"===this.options.axis||(this.helper[0].style.top=this.position.top+"px"),i=this.items.length-1;i>=0;i--)if(s=this.items[i],n=s.item[0],o=this._intersectsWithPointer(s),o&&s.instance===this.currentContainer&&n!==this.currentItem[0]&&this.placeholder[1===o?"next":"prev"]()[0]!==n&&!t.contains(this.placeholder[0],n)&&("semi-dynamic"===this.options.type?!t.contains(this.element[0],n):!0)){if(this.direction=1===o?"down":"up","pointer"!==this.options.tolerance&&!this._intersectsWithSides(s))break;this._rearrange(e,s),this._trigger("change",e,this._uiHash());break}return this._contactContainers(e),t.ui.ddmanager&&t.ui.ddmanager.drag(this,e),this._trigger("sort",e,this._uiHash()),this.lastPositionAbs=this.positionAbs,!1},_mouseStop:function(e,i){if(e){if(t.ui.ddmanager&&!this.options.dropBehaviour&&t.ui.ddmanager.drop(this,e),this.options.revert){var s=this,n=this.placeholder.offset(),o=this.options.axis,a={};o&&"x"!==o||(a.left=n.left-this.offset.parent.left-this.margins.left+(this.offsetParent[0]===this.document[0].body?0:this.offsetParent[0].scrollLeft)),o&&"y"!==o||(a.top=n.top-this.offset.parent.top-this.margins.top+(this.offsetParent[0]===this.document[0].body?0:this.offsetParent[0].scrollTop)),this.reverting=!0,t(this.helper).animate(a,parseInt(this.options.revert,10)||500,function(){s._clear(e)})}else this._clear(e,i);return!1}},cancel:function(){if(this.dragging){this._mouseUp(new t.Event("mouseup",{target:null})),"original"===this.options.helper?(this.currentItem.css(this._storedCSS),this._removeClass(this.currentItem,"ui-sortable-helper")):this.currentItem.show();for(var e=this.containers.length-1;e>=0;e--)this.containers[e]._trigger("deactivate",null,this._uiHash(this)),this.containers[e].containerCache.over&&(this.containers[e]._trigger("out",null,this._uiHash(this)),this.containers[e].containerCache.over=0)}return this.placeholder&&(this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]),"original"!==this.options.helper&&this.helper&&this.helper[0].parentNode&&this.helper.remove(),t.extend(this,{helper:null,dragging:!1,reverting:!1,_noFinalSort:null}),this.domPosition.prev?t(this.domPosition.prev).after(this.currentItem):t(this.domPosition.parent).prepend(this.currentItem)),this},serialize:function(e){var i=this._getItemsAsjQuery(e&&e.connected),s=[];return e=e||{},t(i).each(function(){var i=(t(e.item||this).attr(e.attribute||"id")||"").match(e.expression||/(.+)[\-=_](.+)/);i&&s.push((e.key||i[1]+"[]")+"="+(e.key&&e.expression?i[1]:i[2]))}),!s.length&&e.key&&s.push(e.key+"="),s.join("&")},toArray:function(e){var i=this._getItemsAsjQuery(e&&e.connected),s=[];return e=e||{},i.each(function(){s.push(t(e.item||this).attr(e.attribute||"id")||"")}),s},_intersectsWith:function(t){var e=this.positionAbs.left,i=e+this.helperProportions.width,s=this.positionAbs.top,n=s+this.helperProportions.height,o=t.left,a=o+t.width,r=t.top,l=r+t.height,h=this.offset.click.top,c=this.offset.click.left,u="x"===this.options.axis||s+h>r&&l>s+h,d="y"===this.options.axis||e+c>o&&a>e+c,p=u&&d;return"pointer"===this.options.tolerance||this.options.forcePointerForContainers||"pointer"!==this.options.tolerance&&this.helperProportions[this.floating?"width":"height"]>t[this.floating?"width":"height"]?p:e+this.helperProportions.width/2>o&&a>i-this.helperProportions.width/2&&s+this.helperProportions.height/2>r&&l>n-this.helperProportions.height/2},_intersectsWithPointer:function(t){var e,i,s="x"===this.options.axis||this._isOverAxis(this.positionAbs.top+this.offset.click.top,t.top,t.height),n="y"===this.options.axis||this._isOverAxis(this.positionAbs.left+this.offset.click.left,t.left,t.width),o=s&&n;return o?(e=this._getDragVerticalDirection(),i=this._getDragHorizontalDirection(),this.floating?"right"===i||"down"===e?2:1:e&&("down"===e?2:1)):!1},_intersectsWithSides:function(t){var e=this._isOverAxis(this.positionAbs.top+this.offset.click.top,t.top+t.height/2,t.height),i=this._isOverAxis(this.positionAbs.left+this.offset.click.left,t.left+t.width/2,t.width),s=this._getDragVerticalDirection(),n=this._getDragHorizontalDirection();return this.floating&&n?"right"===n&&i||"left"===n&&!i:s&&("down"===s&&e||"up"===s&&!e)},_getDragVerticalDirection:function(){var t=this.positionAbs.top-this.lastPositionAbs.top;return 0!==t&&(t>0?"down":"up")},_getDragHorizontalDirection:function(){var t=this.positionAbs.left-this.lastPositionAbs.left;return 0!==t&&(t>0?"right":"left")},refresh:function(t){return this._refreshItems(t),this._setHandleClassName(),this.refreshPositions(),this},_connectWith:function(){var t=this.options;return t.connectWith.constructor===String?[t.connectWith]:t.connectWith},_getItemsAsjQuery:function(e){function i(){r.push(this)}var s,n,o,a,r=[],l=[],h=this._connectWith();if(h&&e)for(s=h.length-1;s>=0;s--)for(o=t(h[s],this.document[0]),n=o.length-1;n>=0;n--)a=t.data(o[n],this.widgetFullName),a&&a!==this&&!a.options.disabled&&l.push([t.isFunction(a.options.items)?a.options.items.call(a.element):t(a.options.items,a.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),a]);for(l.push([t.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):t(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]),s=l.length-1;s>=0;s--)l[s][0].each(i);return t(r)},_removeCurrentsFromItems:function(){var e=this.currentItem.find(":data("+this.widgetName+"-item)");this.items=t.grep(this.items,function(t){for(var i=0;e.length>i;i++)if(e[i]===t.item[0])return!1;return!0})},_refreshItems:function(e){this.items=[],this.containers=[this];var i,s,n,o,a,r,l,h,c=this.items,u=[[t.isFunction(this.options.items)?this.options.items.call(this.element[0],e,{item:this.currentItem}):t(this.options.items,this.element),this]],d=this._connectWith();if(d&&this.ready)for(i=d.length-1;i>=0;i--)for(n=t(d[i],this.document[0]),s=n.length-1;s>=0;s--)o=t.data(n[s],this.widgetFullName),o&&o!==this&&!o.options.disabled&&(u.push([t.isFunction(o.options.items)?o.options.items.call(o.element[0],e,{item:this.currentItem}):t(o.options.items,o.element),o]),this.containers.push(o));for(i=u.length-1;i>=0;i--)for(a=u[i][1],r=u[i][0],s=0,h=r.length;h>s;s++)l=t(r[s]),l.data(this.widgetName+"-item",a),c.push({item:l,instance:a,width:0,height:0,left:0,top:0})},refreshPositions:function(e){this.floating=this.items.length?"x"===this.options.axis||this._isFloating(this.items[0].item):!1,this.offsetParent&&this.helper&&(this.offset.parent=this._getParentOffset());var i,s,n,o;for(i=this.items.length-1;i>=0;i--)s=this.items[i],s.instance!==this.currentContainer&&this.currentContainer&&s.item[0]!==this.currentItem[0]||(n=this.options.toleranceElement?t(this.options.toleranceElement,s.item):s.item,e||(s.width=n.outerWidth(),s.height=n.outerHeight()),o=n.offset(),s.left=o.left,s.top=o.top);if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(i=this.containers.length-1;i>=0;i--)o=this.containers[i].element.offset(),this.containers[i].containerCache.left=o.left,this.containers[i].containerCache.top=o.top,this.containers[i].containerCache.width=this.containers[i].element.outerWidth(),this.containers[i].containerCache.height=this.containers[i].element.outerHeight();return this},_createPlaceholder:function(e){e=e||this;var i,s=e.options;s.placeholder&&s.placeholder.constructor!==String||(i=s.placeholder,s.placeholder={element:function(){var s=e.currentItem[0].nodeName.toLowerCase(),n=t("<"+s+">",e.document[0]);return e._addClass(n,"ui-sortable-placeholder",i||e.currentItem[0].className)._removeClass(n,"ui-sortable-helper"),"tbody"===s?e._createTrPlaceholder(e.currentItem.find("tr").eq(0),t("<tr>",e.document[0]).appendTo(n)):"tr"===s?e._createTrPlaceholder(e.currentItem,n):"img"===s&&n.attr("src",e.currentItem.attr("src")),i||n.css("visibility","hidden"),n},update:function(t,n){(!i||s.forcePlaceholderSize)&&(n.height()||n.height(e.currentItem.innerHeight()-parseInt(e.currentItem.css("paddingTop")||0,10)-parseInt(e.currentItem.css("paddingBottom")||0,10)),n.width()||n.width(e.currentItem.innerWidth()-parseInt(e.currentItem.css("paddingLeft")||0,10)-parseInt(e.currentItem.css("paddingRight")||0,10)))}}),e.placeholder=t(s.placeholder.element.call(e.element,e.currentItem)),e.currentItem.after(e.placeholder),s.placeholder.update(e,e.placeholder)},_createTrPlaceholder:function(e,i){var s=this;e.children().each(function(){t("<td>&#160;</td>",s.document[0]).attr("colspan",t(this).attr("colspan")||1).appendTo(i)})},_contactContainers:function(e){var i,s,n,o,a,r,l,h,c,u,d=null,p=null;for(i=this.containers.length-1;i>=0;i--)if(!t.contains(this.currentItem[0],this.containers[i].element[0]))if(this._intersectsWith(this.containers[i].containerCache)){if(d&&t.contains(this.containers[i].element[0],d.element[0]))continue;d=this.containers[i],p=i}else this.containers[i].containerCache.over&&(this.containers[i]._trigger("out",e,this._uiHash(this)),this.containers[i].containerCache.over=0);if(d)if(1===this.containers.length)this.containers[p].containerCache.over||(this.containers[p]._trigger("over",e,this._uiHash(this)),this.containers[p].containerCache.over=1);else{for(n=1e4,o=null,c=d.floating||this._isFloating(this.currentItem),a=c?"left":"top",r=c?"width":"height",u=c?"pageX":"pageY",s=this.items.length-1;s>=0;s--)t.contains(this.containers[p].element[0],this.items[s].item[0])&&this.items[s].item[0]!==this.currentItem[0]&&(l=this.items[s].item.offset()[a],h=!1,e[u]-l>this.items[s][r]/2&&(h=!0),n>Math.abs(e[u]-l)&&(n=Math.abs(e[u]-l),o=this.items[s],this.direction=h?"up":"down"));if(!o&&!this.options.dropOnEmpty)return;if(this.currentContainer===this.containers[p])return this.currentContainer.containerCache.over||(this.containers[p]._trigger("over",e,this._uiHash()),this.currentContainer.containerCache.over=1),void 0;o?this._rearrange(e,o,null,!0):this._rearrange(e,null,this.containers[p].element,!0),this._trigger("change",e,this._uiHash()),this.containers[p]._trigger("change",e,this._uiHash(this)),this.currentContainer=this.containers[p],this.options.placeholder.update(this.currentContainer,this.placeholder),this.containers[p]._trigger("over",e,this._uiHash(this)),this.containers[p].containerCache.over=1}},_createHelper:function(e){var i=this.options,s=t.isFunction(i.helper)?t(i.helper.apply(this.element[0],[e,this.currentItem])):"clone"===i.helper?this.currentItem.clone():this.currentItem;return s.parents("body").length||t("parent"!==i.appendTo?i.appendTo:this.currentItem[0].parentNode)[0].appendChild(s[0]),s[0]===this.currentItem[0]&&(this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}),(!s[0].style.width||i.forceHelperSize)&&s.width(this.currentItem.width()),(!s[0].style.height||i.forceHelperSize)&&s.height(this.currentItem.height()),s},_adjustOffsetFromHelper:function(e){"string"==typeof e&&(e=e.split(" ")),t.isArray(e)&&(e={left:+e[0],top:+e[1]||0}),"left"in e&&(this.offset.click.left=e.left+this.margins.left),"right"in e&&(this.offset.click.left=this.helperProportions.width-e.right+this.margins.left),"top"in e&&(this.offset.click.top=e.top+this.margins.top),"bottom"in e&&(this.offset.click.top=this.helperProportions.height-e.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var e=this.offsetParent.offset();return"absolute"===this.cssPosition&&this.scrollParent[0]!==this.document[0]&&t.contains(this.scrollParent[0],this.offsetParent[0])&&(e.left+=this.scrollParent.scrollLeft(),e.top+=this.scrollParent.scrollTop()),(this.offsetParent[0]===this.document[0].body||this.offsetParent[0].tagName&&"html"===this.offsetParent[0].tagName.toLowerCase()&&t.ui.ie)&&(e={top:0,left:0}),{top:e.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:e.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"===this.cssPosition){var t=this.currentItem.position();return{top:t.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:t.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var e,i,s,n=this.options;"parent"===n.containment&&(n.containment=this.helper[0].parentNode),("document"===n.containment||"window"===n.containment)&&(this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,"document"===n.containment?this.document.width():this.window.width()-this.helperProportions.width-this.margins.left,("document"===n.containment?this.document.height()||document.body.parentNode.scrollHeight:this.window.height()||this.document[0].body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]),/^(document|window|parent)$/.test(n.containment)||(e=t(n.containment)[0],i=t(n.containment).offset(),s="hidden"!==t(e).css("overflow"),this.containment=[i.left+(parseInt(t(e).css("borderLeftWidth"),10)||0)+(parseInt(t(e).css("paddingLeft"),10)||0)-this.margins.left,i.top+(parseInt(t(e).css("borderTopWidth"),10)||0)+(parseInt(t(e).css("paddingTop"),10)||0)-this.margins.top,i.left+(s?Math.max(e.scrollWidth,e.offsetWidth):e.offsetWidth)-(parseInt(t(e).css("borderLeftWidth"),10)||0)-(parseInt(t(e).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,i.top+(s?Math.max(e.scrollHeight,e.offsetHeight):e.offsetHeight)-(parseInt(t(e).css("borderTopWidth"),10)||0)-(parseInt(t(e).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top])
},_convertPositionTo:function(e,i){i||(i=this.position);var s="absolute"===e?1:-1,n="absolute"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&t.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,o=/(html|body)/i.test(n[0].tagName);return{top:i.top+this.offset.relative.top*s+this.offset.parent.top*s-("fixed"===this.cssPosition?-this.scrollParent.scrollTop():o?0:n.scrollTop())*s,left:i.left+this.offset.relative.left*s+this.offset.parent.left*s-("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():o?0:n.scrollLeft())*s}},_generatePosition:function(e){var i,s,n=this.options,o=e.pageX,a=e.pageY,r="absolute"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&t.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,l=/(html|body)/i.test(r[0].tagName);return"relative"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&this.scrollParent[0]!==this.offsetParent[0]||(this.offset.relative=this._getRelativeOffset()),this.originalPosition&&(this.containment&&(e.pageX-this.offset.click.left<this.containment[0]&&(o=this.containment[0]+this.offset.click.left),e.pageY-this.offset.click.top<this.containment[1]&&(a=this.containment[1]+this.offset.click.top),e.pageX-this.offset.click.left>this.containment[2]&&(o=this.containment[2]+this.offset.click.left),e.pageY-this.offset.click.top>this.containment[3]&&(a=this.containment[3]+this.offset.click.top)),n.grid&&(i=this.originalPageY+Math.round((a-this.originalPageY)/n.grid[1])*n.grid[1],a=this.containment?i-this.offset.click.top>=this.containment[1]&&i-this.offset.click.top<=this.containment[3]?i:i-this.offset.click.top>=this.containment[1]?i-n.grid[1]:i+n.grid[1]:i,s=this.originalPageX+Math.round((o-this.originalPageX)/n.grid[0])*n.grid[0],o=this.containment?s-this.offset.click.left>=this.containment[0]&&s-this.offset.click.left<=this.containment[2]?s:s-this.offset.click.left>=this.containment[0]?s-n.grid[0]:s+n.grid[0]:s)),{top:a-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.scrollParent.scrollTop():l?0:r.scrollTop()),left:o-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():l?0:r.scrollLeft())}},_rearrange:function(t,e,i,s){i?i[0].appendChild(this.placeholder[0]):e.item[0].parentNode.insertBefore(this.placeholder[0],"down"===this.direction?e.item[0]:e.item[0].nextSibling),this.counter=this.counter?++this.counter:1;var n=this.counter;this._delay(function(){n===this.counter&&this.refreshPositions(!s)})},_clear:function(t,e){function i(t,e,i){return function(s){i._trigger(t,s,e._uiHash(e))}}this.reverting=!1;var s,n=[];if(!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem),this._noFinalSort=null,this.helper[0]===this.currentItem[0]){for(s in this._storedCSS)("auto"===this._storedCSS[s]||"static"===this._storedCSS[s])&&(this._storedCSS[s]="");this.currentItem.css(this._storedCSS),this._removeClass(this.currentItem,"ui-sortable-helper")}else this.currentItem.show();for(this.fromOutside&&!e&&n.push(function(t){this._trigger("receive",t,this._uiHash(this.fromOutside))}),!this.fromOutside&&this.domPosition.prev===this.currentItem.prev().not(".ui-sortable-helper")[0]&&this.domPosition.parent===this.currentItem.parent()[0]||e||n.push(function(t){this._trigger("update",t,this._uiHash())}),this!==this.currentContainer&&(e||(n.push(function(t){this._trigger("remove",t,this._uiHash())}),n.push(function(t){return function(e){t._trigger("receive",e,this._uiHash(this))}}.call(this,this.currentContainer)),n.push(function(t){return function(e){t._trigger("update",e,this._uiHash(this))}}.call(this,this.currentContainer)))),s=this.containers.length-1;s>=0;s--)e||n.push(i("deactivate",this,this.containers[s])),this.containers[s].containerCache.over&&(n.push(i("out",this,this.containers[s])),this.containers[s].containerCache.over=0);if(this.storedCursor&&(this.document.find("body").css("cursor",this.storedCursor),this.storedStylesheet.remove()),this._storedOpacity&&this.helper.css("opacity",this._storedOpacity),this._storedZIndex&&this.helper.css("zIndex","auto"===this._storedZIndex?"":this._storedZIndex),this.dragging=!1,e||this._trigger("beforeStop",t,this._uiHash()),this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.cancelHelperRemoval||(this.helper[0]!==this.currentItem[0]&&this.helper.remove(),this.helper=null),!e){for(s=0;n.length>s;s++)n[s].call(this,t);this._trigger("stop",t,this._uiHash())}return this.fromOutside=!1,!this.cancelHelperRemoval},_trigger:function(){t.Widget.prototype._trigger.apply(this,arguments)===!1&&this.cancel()},_uiHash:function(e){var i=e||this;return{helper:i.helper,placeholder:i.placeholder||t([]),position:i.position,originalPosition:i.originalPosition,offset:i.positionAbs,item:i.currentItem,sender:e?e.element:null}}});var n="ui-effects-",o="ui-effects-style",a="ui-effects-animated",r=t;t.effects={effect:{}},function(t,e){function i(t,e,i){var s=u[e.type]||{};return null==t?i||!e.def?null:e.def:(t=s.floor?~~t:parseFloat(t),isNaN(t)?e.def:s.mod?(t+s.mod)%s.mod:0>t?0:t>s.max?s.max:t)}function s(i){var s=h(),n=s._rgba=[];return i=i.toLowerCase(),f(l,function(t,o){var a,r=o.re.exec(i),l=r&&o.parse(r),h=o.space||"rgba";return l?(a=s[h](l),s[c[h].cache]=a[c[h].cache],n=s._rgba=a._rgba,!1):e}),n.length?("0,0,0,0"===n.join()&&t.extend(n,o.transparent),s):o[i]}function n(t,e,i){return i=(i+1)%1,1>6*i?t+6*(e-t)*i:1>2*i?e:2>3*i?t+6*(e-t)*(2/3-i):t}var o,a="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",r=/^([\-+])=\s*(\d+\.?\d*)/,l=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(t){return[t[1],t[2],t[3],t[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(t){return[2.55*t[1],2.55*t[2],2.55*t[3],t[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(t){return[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(t){return[parseInt(t[1]+t[1],16),parseInt(t[2]+t[2],16),parseInt(t[3]+t[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(t){return[t[1],t[2]/100,t[3]/100,t[4]]}}],h=t.Color=function(e,i,s,n){return new t.Color.fn.parse(e,i,s,n)},c={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},u={"byte":{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},d=h.support={},p=t("<p>")[0],f=t.each;p.style.cssText="background-color:rgba(1,1,1,.5)",d.rgba=p.style.backgroundColor.indexOf("rgba")>-1,f(c,function(t,e){e.cache="_"+t,e.props.alpha={idx:3,type:"percent",def:1}}),h.fn=t.extend(h.prototype,{parse:function(n,a,r,l){if(n===e)return this._rgba=[null,null,null,null],this;(n.jquery||n.nodeType)&&(n=t(n).css(a),a=e);var u=this,d=t.type(n),p=this._rgba=[];return a!==e&&(n=[n,a,r,l],d="array"),"string"===d?this.parse(s(n)||o._default):"array"===d?(f(c.rgba.props,function(t,e){p[e.idx]=i(n[e.idx],e)}),this):"object"===d?(n instanceof h?f(c,function(t,e){n[e.cache]&&(u[e.cache]=n[e.cache].slice())}):f(c,function(e,s){var o=s.cache;f(s.props,function(t,e){if(!u[o]&&s.to){if("alpha"===t||null==n[t])return;u[o]=s.to(u._rgba)}u[o][e.idx]=i(n[t],e,!0)}),u[o]&&0>t.inArray(null,u[o].slice(0,3))&&(u[o][3]=1,s.from&&(u._rgba=s.from(u[o])))}),this):e},is:function(t){var i=h(t),s=!0,n=this;return f(c,function(t,o){var a,r=i[o.cache];return r&&(a=n[o.cache]||o.to&&o.to(n._rgba)||[],f(o.props,function(t,i){return null!=r[i.idx]?s=r[i.idx]===a[i.idx]:e})),s}),s},_space:function(){var t=[],e=this;return f(c,function(i,s){e[s.cache]&&t.push(i)}),t.pop()},transition:function(t,e){var s=h(t),n=s._space(),o=c[n],a=0===this.alpha()?h("transparent"):this,r=a[o.cache]||o.to(a._rgba),l=r.slice();return s=s[o.cache],f(o.props,function(t,n){var o=n.idx,a=r[o],h=s[o],c=u[n.type]||{};null!==h&&(null===a?l[o]=h:(c.mod&&(h-a>c.mod/2?a+=c.mod:a-h>c.mod/2&&(a-=c.mod)),l[o]=i((h-a)*e+a,n)))}),this[n](l)},blend:function(e){if(1===this._rgba[3])return this;var i=this._rgba.slice(),s=i.pop(),n=h(e)._rgba;return h(t.map(i,function(t,e){return(1-s)*n[e]+s*t}))},toRgbaString:function(){var e="rgba(",i=t.map(this._rgba,function(t,e){return null==t?e>2?1:0:t});return 1===i[3]&&(i.pop(),e="rgb("),e+i.join()+")"},toHslaString:function(){var e="hsla(",i=t.map(this.hsla(),function(t,e){return null==t&&(t=e>2?1:0),e&&3>e&&(t=Math.round(100*t)+"%"),t});return 1===i[3]&&(i.pop(),e="hsl("),e+i.join()+")"},toHexString:function(e){var i=this._rgba.slice(),s=i.pop();return e&&i.push(~~(255*s)),"#"+t.map(i,function(t){return t=(t||0).toString(16),1===t.length?"0"+t:t}).join("")},toString:function(){return 0===this._rgba[3]?"transparent":this.toRgbaString()}}),h.fn.parse.prototype=h.fn,c.hsla.to=function(t){if(null==t[0]||null==t[1]||null==t[2])return[null,null,null,t[3]];var e,i,s=t[0]/255,n=t[1]/255,o=t[2]/255,a=t[3],r=Math.max(s,n,o),l=Math.min(s,n,o),h=r-l,c=r+l,u=.5*c;return e=l===r?0:s===r?60*(n-o)/h+360:n===r?60*(o-s)/h+120:60*(s-n)/h+240,i=0===h?0:.5>=u?h/c:h/(2-c),[Math.round(e)%360,i,u,null==a?1:a]},c.hsla.from=function(t){if(null==t[0]||null==t[1]||null==t[2])return[null,null,null,t[3]];var e=t[0]/360,i=t[1],s=t[2],o=t[3],a=.5>=s?s*(1+i):s+i-s*i,r=2*s-a;return[Math.round(255*n(r,a,e+1/3)),Math.round(255*n(r,a,e)),Math.round(255*n(r,a,e-1/3)),o]},f(c,function(s,n){var o=n.props,a=n.cache,l=n.to,c=n.from;h.fn[s]=function(s){if(l&&!this[a]&&(this[a]=l(this._rgba)),s===e)return this[a].slice();var n,r=t.type(s),u="array"===r||"object"===r?s:arguments,d=this[a].slice();return f(o,function(t,e){var s=u["object"===r?t:e.idx];null==s&&(s=d[e.idx]),d[e.idx]=i(s,e)}),c?(n=h(c(d)),n[a]=d,n):h(d)},f(o,function(e,i){h.fn[e]||(h.fn[e]=function(n){var o,a=t.type(n),l="alpha"===e?this._hsla?"hsla":"rgba":s,h=this[l](),c=h[i.idx];return"undefined"===a?c:("function"===a&&(n=n.call(this,c),a=t.type(n)),null==n&&i.empty?this:("string"===a&&(o=r.exec(n),o&&(n=c+parseFloat(o[2])*("+"===o[1]?1:-1))),h[i.idx]=n,this[l](h)))})})}),h.hook=function(e){var i=e.split(" ");f(i,function(e,i){t.cssHooks[i]={set:function(e,n){var o,a,r="";if("transparent"!==n&&("string"!==t.type(n)||(o=s(n)))){if(n=h(o||n),!d.rgba&&1!==n._rgba[3]){for(a="backgroundColor"===i?e.parentNode:e;(""===r||"transparent"===r)&&a&&a.style;)try{r=t.css(a,"backgroundColor"),a=a.parentNode}catch(l){}n=n.blend(r&&"transparent"!==r?r:"_default")}n=n.toRgbaString()}try{e.style[i]=n}catch(l){}}},t.fx.step[i]=function(e){e.colorInit||(e.start=h(e.elem,i),e.end=h(e.end),e.colorInit=!0),t.cssHooks[i].set(e.elem,e.start.transition(e.end,e.pos))}})},h.hook(a),t.cssHooks.borderColor={expand:function(t){var e={};return f(["Top","Right","Bottom","Left"],function(i,s){e["border"+s+"Color"]=t}),e}},o=t.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}}(r),function(){function e(e){var i,s,n=e.ownerDocument.defaultView?e.ownerDocument.defaultView.getComputedStyle(e,null):e.currentStyle,o={};if(n&&n.length&&n[0]&&n[n[0]])for(s=n.length;s--;)i=n[s],"string"==typeof n[i]&&(o[t.camelCase(i)]=n[i]);else for(i in n)"string"==typeof n[i]&&(o[i]=n[i]);return o}function i(e,i){var s,o,a={};for(s in i)o=i[s],e[s]!==o&&(n[s]||(t.fx.step[s]||!isNaN(parseFloat(o)))&&(a[s]=o));return a}var s=["add","remove","toggle"],n={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};t.each(["borderLeftStyle","borderRightStyle","borderBottomStyle","borderTopStyle"],function(e,i){t.fx.step[i]=function(t){("none"!==t.end&&!t.setAttr||1===t.pos&&!t.setAttr)&&(r.style(t.elem,i,t.end),t.setAttr=!0)}}),t.fn.addBack||(t.fn.addBack=function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))}),t.effects.animateClass=function(n,o,a,r){var l=t.speed(o,a,r);return this.queue(function(){var o,a=t(this),r=a.attr("class")||"",h=l.children?a.find("*").addBack():a;h=h.map(function(){var i=t(this);return{el:i,start:e(this)}}),o=function(){t.each(s,function(t,e){n[e]&&a[e+"Class"](n[e])})},o(),h=h.map(function(){return this.end=e(this.el[0]),this.diff=i(this.start,this.end),this}),a.attr("class",r),h=h.map(function(){var e=this,i=t.Deferred(),s=t.extend({},l,{queue:!1,complete:function(){i.resolve(e)}});return this.el.animate(this.diff,s),i.promise()}),t.when.apply(t,h.get()).done(function(){o(),t.each(arguments,function(){var e=this.el;t.each(this.diff,function(t){e.css(t,"")})}),l.complete.call(a[0])})})},t.fn.extend({addClass:function(e){return function(i,s,n,o){return s?t.effects.animateClass.call(this,{add:i},s,n,o):e.apply(this,arguments)}}(t.fn.addClass),removeClass:function(e){return function(i,s,n,o){return arguments.length>1?t.effects.animateClass.call(this,{remove:i},s,n,o):e.apply(this,arguments)}}(t.fn.removeClass),toggleClass:function(e){return function(i,s,n,o,a){return"boolean"==typeof s||void 0===s?n?t.effects.animateClass.call(this,s?{add:i}:{remove:i},n,o,a):e.apply(this,arguments):t.effects.animateClass.call(this,{toggle:i},s,n,o)}}(t.fn.toggleClass),switchClass:function(e,i,s,n,o){return t.effects.animateClass.call(this,{add:i,remove:e},s,n,o)}})}(),function(){function e(e,i,s,n){return t.isPlainObject(e)&&(i=e,e=e.effect),e={effect:e},null==i&&(i={}),t.isFunction(i)&&(n=i,s=null,i={}),("number"==typeof i||t.fx.speeds[i])&&(n=s,s=i,i={}),t.isFunction(s)&&(n=s,s=null),i&&t.extend(e,i),s=s||i.duration,e.duration=t.fx.off?0:"number"==typeof s?s:s in t.fx.speeds?t.fx.speeds[s]:t.fx.speeds._default,e.complete=n||i.complete,e}function i(e){return!e||"number"==typeof e||t.fx.speeds[e]?!0:"string"!=typeof e||t.effects.effect[e]?t.isFunction(e)?!0:"object"!=typeof e||e.effect?!1:!0:!0}function s(t,e){var i=e.outerWidth(),s=e.outerHeight(),n=/^rect\((-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto)\)$/,o=n.exec(t)||["",0,i,s,0];return{top:parseFloat(o[1])||0,right:"auto"===o[2]?i:parseFloat(o[2]),bottom:"auto"===o[3]?s:parseFloat(o[3]),left:parseFloat(o[4])||0}}t.expr&&t.expr.filters&&t.expr.filters.animated&&(t.expr.filters.animated=function(e){return function(i){return!!t(i).data(a)||e(i)}}(t.expr.filters.animated)),t.uiBackCompat!==!1&&t.extend(t.effects,{save:function(t,e){for(var i=0,s=e.length;s>i;i++)null!==e[i]&&t.data(n+e[i],t[0].style[e[i]])},restore:function(t,e){for(var i,s=0,o=e.length;o>s;s++)null!==e[s]&&(i=t.data(n+e[s]),t.css(e[s],i))},setMode:function(t,e){return"toggle"===e&&(e=t.is(":hidden")?"show":"hide"),e},createWrapper:function(e){if(e.parent().is(".ui-effects-wrapper"))return e.parent();var i={width:e.outerWidth(!0),height:e.outerHeight(!0),"float":e.css("float")},s=t("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),n={width:e.width(),height:e.height()},o=document.activeElement;try{o.id}catch(a){o=document.body}return e.wrap(s),(e[0]===o||t.contains(e[0],o))&&t(o).trigger("focus"),s=e.parent(),"static"===e.css("position")?(s.css({position:"relative"}),e.css({position:"relative"})):(t.extend(i,{position:e.css("position"),zIndex:e.css("z-index")}),t.each(["top","left","bottom","right"],function(t,s){i[s]=e.css(s),isNaN(parseInt(i[s],10))&&(i[s]="auto")}),e.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),e.css(n),s.css(i).show()},removeWrapper:function(e){var i=document.activeElement;return e.parent().is(".ui-effects-wrapper")&&(e.parent().replaceWith(e),(e[0]===i||t.contains(e[0],i))&&t(i).trigger("focus")),e}}),t.extend(t.effects,{version:"1.12.1",define:function(e,i,s){return s||(s=i,i="effect"),t.effects.effect[e]=s,t.effects.effect[e].mode=i,s},scaledDimensions:function(t,e,i){if(0===e)return{height:0,width:0,outerHeight:0,outerWidth:0};var s="horizontal"!==i?(e||100)/100:1,n="vertical"!==i?(e||100)/100:1;return{height:t.height()*n,width:t.width()*s,outerHeight:t.outerHeight()*n,outerWidth:t.outerWidth()*s}},clipToBox:function(t){return{width:t.clip.right-t.clip.left,height:t.clip.bottom-t.clip.top,left:t.clip.left,top:t.clip.top}},unshift:function(t,e,i){var s=t.queue();e>1&&s.splice.apply(s,[1,0].concat(s.splice(e,i))),t.dequeue()},saveStyle:function(t){t.data(o,t[0].style.cssText)},restoreStyle:function(t){t[0].style.cssText=t.data(o)||"",t.removeData(o)},mode:function(t,e){var i=t.is(":hidden");return"toggle"===e&&(e=i?"show":"hide"),(i?"hide"===e:"show"===e)&&(e="none"),e},getBaseline:function(t,e){var i,s;switch(t[0]){case"top":i=0;break;case"middle":i=.5;break;case"bottom":i=1;break;default:i=t[0]/e.height}switch(t[1]){case"left":s=0;break;case"center":s=.5;break;case"right":s=1;break;default:s=t[1]/e.width}return{x:s,y:i}},createPlaceholder:function(e){var i,s=e.css("position"),o=e.position();return e.css({marginTop:e.css("marginTop"),marginBottom:e.css("marginBottom"),marginLeft:e.css("marginLeft"),marginRight:e.css("marginRight")}).outerWidth(e.outerWidth()).outerHeight(e.outerHeight()),/^(static|relative)/.test(s)&&(s="absolute",i=t("<"+e[0].nodeName+">").insertAfter(e).css({display:/^(inline|ruby)/.test(e.css("display"))?"inline-block":"block",visibility:"hidden",marginTop:e.css("marginTop"),marginBottom:e.css("marginBottom"),marginLeft:e.css("marginLeft"),marginRight:e.css("marginRight"),"float":e.css("float")}).outerWidth(e.outerWidth()).outerHeight(e.outerHeight()).addClass("ui-effects-placeholder"),e.data(n+"placeholder",i)),e.css({position:s,left:o.left,top:o.top}),i},removePlaceholder:function(t){var e=n+"placeholder",i=t.data(e);i&&(i.remove(),t.removeData(e))},cleanUp:function(e){t.effects.restoreStyle(e),t.effects.removePlaceholder(e)},setTransition:function(e,i,s,n){return n=n||{},t.each(i,function(t,i){var o=e.cssUnit(i);o[0]>0&&(n[i]=o[0]*s+o[1])}),n}}),t.fn.extend({effect:function(){function i(e){function i(){l.removeData(a),t.effects.cleanUp(l),"hide"===s.mode&&l.hide(),r()}function r(){t.isFunction(h)&&h.call(l[0]),t.isFunction(e)&&e()}var l=t(this);s.mode=u.shift(),t.uiBackCompat===!1||o?"none"===s.mode?(l[c](),r()):n.call(l[0],s,i):(l.is(":hidden")?"hide"===c:"show"===c)?(l[c](),r()):n.call(l[0],s,r)}var s=e.apply(this,arguments),n=t.effects.effect[s.effect],o=n.mode,r=s.queue,l=r||"fx",h=s.complete,c=s.mode,u=[],d=function(e){var i=t(this),s=t.effects.mode(i,c)||o;i.data(a,!0),u.push(s),o&&("show"===s||s===o&&"hide"===s)&&i.show(),o&&"none"===s||t.effects.saveStyle(i),t.isFunction(e)&&e()};return t.fx.off||!n?c?this[c](s.duration,h):this.each(function(){h&&h.call(this)}):r===!1?this.each(d).each(i):this.queue(l,d).queue(l,i)},show:function(t){return function(s){if(i(s))return t.apply(this,arguments);var n=e.apply(this,arguments);return n.mode="show",this.effect.call(this,n)}}(t.fn.show),hide:function(t){return function(s){if(i(s))return t.apply(this,arguments);var n=e.apply(this,arguments);return n.mode="hide",this.effect.call(this,n)}}(t.fn.hide),toggle:function(t){return function(s){if(i(s)||"boolean"==typeof s)return t.apply(this,arguments);var n=e.apply(this,arguments);return n.mode="toggle",this.effect.call(this,n)}}(t.fn.toggle),cssUnit:function(e){var i=this.css(e),s=[];return t.each(["em","px","%","pt"],function(t,e){i.indexOf(e)>0&&(s=[parseFloat(i),e])}),s},cssClip:function(t){return t?this.css("clip","rect("+t.top+"px "+t.right+"px "+t.bottom+"px "+t.left+"px)"):s(this.css("clip"),this)},transfer:function(e,i){var s=t(this),n=t(e.to),o="fixed"===n.css("position"),a=t("body"),r=o?a.scrollTop():0,l=o?a.scrollLeft():0,h=n.offset(),c={top:h.top-r,left:h.left-l,height:n.innerHeight(),width:n.innerWidth()},u=s.offset(),d=t("<div class='ui-effects-transfer'></div>").appendTo("body").addClass(e.className).css({top:u.top-r,left:u.left-l,height:s.innerHeight(),width:s.innerWidth(),position:o?"fixed":"absolute"}).animate(c,e.duration,e.easing,function(){d.remove(),t.isFunction(i)&&i()})}}),t.fx.step.clip=function(e){e.clipInit||(e.start=t(e.elem).cssClip(),"string"==typeof e.end&&(e.end=s(e.end,e.elem)),e.clipInit=!0),t(e.elem).cssClip({top:e.pos*(e.end.top-e.start.top)+e.start.top,right:e.pos*(e.end.right-e.start.right)+e.start.right,bottom:e.pos*(e.end.bottom-e.start.bottom)+e.start.bottom,left:e.pos*(e.end.left-e.start.left)+e.start.left})}}(),function(){var e={};t.each(["Quad","Cubic","Quart","Quint","Expo"],function(t,i){e[i]=function(e){return Math.pow(e,t+2)}}),t.extend(e,{Sine:function(t){return 1-Math.cos(t*Math.PI/2)},Circ:function(t){return 1-Math.sqrt(1-t*t)},Elastic:function(t){return 0===t||1===t?t:-Math.pow(2,8*(t-1))*Math.sin((80*(t-1)-7.5)*Math.PI/15)},Back:function(t){return t*t*(3*t-2)},Bounce:function(t){for(var e,i=4;((e=Math.pow(2,--i))-1)/11>t;);return 1/Math.pow(4,3-i)-7.5625*Math.pow((3*e-2)/22-t,2)}}),t.each(e,function(e,i){t.easing["easeIn"+e]=i,t.easing["easeOut"+e]=function(t){return 1-i(1-t)},t.easing["easeInOut"+e]=function(t){return.5>t?i(2*t)/2:1-i(-2*t+2)/2}})}();var l=t.effects;t.effects.define("blind","hide",function(e,i){var s={up:["bottom","top"],vertical:["bottom","top"],down:["top","bottom"],left:["right","left"],horizontal:["right","left"],right:["left","right"]},n=t(this),o=e.direction||"up",a=n.cssClip(),r={clip:t.extend({},a)},l=t.effects.createPlaceholder(n);r.clip[s[o][0]]=r.clip[s[o][1]],"show"===e.mode&&(n.cssClip(r.clip),l&&l.css(t.effects.clipToBox(r)),r.clip=a),l&&l.animate(t.effects.clipToBox(r),e.duration,e.easing),n.animate(r,{queue:!1,duration:e.duration,easing:e.easing,complete:i})}),t.effects.define("bounce",function(e,i){var s,n,o,a=t(this),r=e.mode,l="hide"===r,h="show"===r,c=e.direction||"up",u=e.distance,d=e.times||5,p=2*d+(h||l?1:0),f=e.duration/p,g=e.easing,m="up"===c||"down"===c?"top":"left",_="up"===c||"left"===c,v=0,b=a.queue().length;for(t.effects.createPlaceholder(a),o=a.css(m),u||(u=a["top"===m?"outerHeight":"outerWidth"]()/3),h&&(n={opacity:1},n[m]=o,a.css("opacity",0).css(m,_?2*-u:2*u).animate(n,f,g)),l&&(u/=Math.pow(2,d-1)),n={},n[m]=o;d>v;v++)s={},s[m]=(_?"-=":"+=")+u,a.animate(s,f,g).animate(n,f,g),u=l?2*u:u/2;l&&(s={opacity:0},s[m]=(_?"-=":"+=")+u,a.animate(s,f,g)),a.queue(i),t.effects.unshift(a,b,p+1)}),t.effects.define("clip","hide",function(e,i){var s,n={},o=t(this),a=e.direction||"vertical",r="both"===a,l=r||"horizontal"===a,h=r||"vertical"===a;s=o.cssClip(),n.clip={top:h?(s.bottom-s.top)/2:s.top,right:l?(s.right-s.left)/2:s.right,bottom:h?(s.bottom-s.top)/2:s.bottom,left:l?(s.right-s.left)/2:s.left},t.effects.createPlaceholder(o),"show"===e.mode&&(o.cssClip(n.clip),n.clip=s),o.animate(n,{queue:!1,duration:e.duration,easing:e.easing,complete:i})}),t.effects.define("drop","hide",function(e,i){var s,n=t(this),o=e.mode,a="show"===o,r=e.direction||"left",l="up"===r||"down"===r?"top":"left",h="up"===r||"left"===r?"-=":"+=",c="+="===h?"-=":"+=",u={opacity:0};t.effects.createPlaceholder(n),s=e.distance||n["top"===l?"outerHeight":"outerWidth"](!0)/2,u[l]=h+s,a&&(n.css(u),u[l]=c+s,u.opacity=1),n.animate(u,{queue:!1,duration:e.duration,easing:e.easing,complete:i})}),t.effects.define("explode","hide",function(e,i){function s(){b.push(this),b.length===u*d&&n()}function n(){p.css({visibility:"visible"}),t(b).remove(),i()}var o,a,r,l,h,c,u=e.pieces?Math.round(Math.sqrt(e.pieces)):3,d=u,p=t(this),f=e.mode,g="show"===f,m=p.show().css("visibility","hidden").offset(),_=Math.ceil(p.outerWidth()/d),v=Math.ceil(p.outerHeight()/u),b=[];for(o=0;u>o;o++)for(l=m.top+o*v,c=o-(u-1)/2,a=0;d>a;a++)r=m.left+a*_,h=a-(d-1)/2,p.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-a*_,top:-o*v}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:_,height:v,left:r+(g?h*_:0),top:l+(g?c*v:0),opacity:g?0:1}).animate({left:r+(g?0:h*_),top:l+(g?0:c*v),opacity:g?1:0},e.duration||500,e.easing,s)}),t.effects.define("fade","toggle",function(e,i){var s="show"===e.mode;t(this).css("opacity",s?0:1).animate({opacity:s?1:0},{queue:!1,duration:e.duration,easing:e.easing,complete:i})}),t.effects.define("fold","hide",function(e,i){var s=t(this),n=e.mode,o="show"===n,a="hide"===n,r=e.size||15,l=/([0-9]+)%/.exec(r),h=!!e.horizFirst,c=h?["right","bottom"]:["bottom","right"],u=e.duration/2,d=t.effects.createPlaceholder(s),p=s.cssClip(),f={clip:t.extend({},p)},g={clip:t.extend({},p)},m=[p[c[0]],p[c[1]]],_=s.queue().length;l&&(r=parseInt(l[1],10)/100*m[a?0:1]),f.clip[c[0]]=r,g.clip[c[0]]=r,g.clip[c[1]]=0,o&&(s.cssClip(g.clip),d&&d.css(t.effects.clipToBox(g)),g.clip=p),s.queue(function(i){d&&d.animate(t.effects.clipToBox(f),u,e.easing).animate(t.effects.clipToBox(g),u,e.easing),i()}).animate(f,u,e.easing).animate(g,u,e.easing).queue(i),t.effects.unshift(s,_,4)}),t.effects.define("highlight","show",function(e,i){var s=t(this),n={backgroundColor:s.css("backgroundColor")};"hide"===e.mode&&(n.opacity=0),t.effects.saveStyle(s),s.css({backgroundImage:"none",backgroundColor:e.color||"#ffff99"}).animate(n,{queue:!1,duration:e.duration,easing:e.easing,complete:i})}),t.effects.define("size",function(e,i){var s,n,o,a=t(this),r=["fontSize"],l=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"],h=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"],c=e.mode,u="effect"!==c,d=e.scale||"both",p=e.origin||["middle","center"],f=a.css("position"),g=a.position(),m=t.effects.scaledDimensions(a),_=e.from||m,v=e.to||t.effects.scaledDimensions(a,0);t.effects.createPlaceholder(a),"show"===c&&(o=_,_=v,v=o),n={from:{y:_.height/m.height,x:_.width/m.width},to:{y:v.height/m.height,x:v.width/m.width}},("box"===d||"both"===d)&&(n.from.y!==n.to.y&&(_=t.effects.setTransition(a,l,n.from.y,_),v=t.effects.setTransition(a,l,n.to.y,v)),n.from.x!==n.to.x&&(_=t.effects.setTransition(a,h,n.from.x,_),v=t.effects.setTransition(a,h,n.to.x,v))),("content"===d||"both"===d)&&n.from.y!==n.to.y&&(_=t.effects.setTransition(a,r,n.from.y,_),v=t.effects.setTransition(a,r,n.to.y,v)),p&&(s=t.effects.getBaseline(p,m),_.top=(m.outerHeight-_.outerHeight)*s.y+g.top,_.left=(m.outerWidth-_.outerWidth)*s.x+g.left,v.top=(m.outerHeight-v.outerHeight)*s.y+g.top,v.left=(m.outerWidth-v.outerWidth)*s.x+g.left),a.css(_),("content"===d||"both"===d)&&(l=l.concat(["marginTop","marginBottom"]).concat(r),h=h.concat(["marginLeft","marginRight"]),a.find("*[width]").each(function(){var i=t(this),s=t.effects.scaledDimensions(i),o={height:s.height*n.from.y,width:s.width*n.from.x,outerHeight:s.outerHeight*n.from.y,outerWidth:s.outerWidth*n.from.x},a={height:s.height*n.to.y,width:s.width*n.to.x,outerHeight:s.height*n.to.y,outerWidth:s.width*n.to.x};n.from.y!==n.to.y&&(o=t.effects.setTransition(i,l,n.from.y,o),a=t.effects.setTransition(i,l,n.to.y,a)),n.from.x!==n.to.x&&(o=t.effects.setTransition(i,h,n.from.x,o),a=t.effects.setTransition(i,h,n.to.x,a)),u&&t.effects.saveStyle(i),i.css(o),i.animate(a,e.duration,e.easing,function(){u&&t.effects.restoreStyle(i)})})),a.animate(v,{queue:!1,duration:e.duration,easing:e.easing,complete:function(){var e=a.offset();0===v.opacity&&a.css("opacity",_.opacity),u||(a.css("position","static"===f?"relative":f).offset(e),t.effects.saveStyle(a)),i()}})}),t.effects.define("scale",function(e,i){var s=t(this),n=e.mode,o=parseInt(e.percent,10)||(0===parseInt(e.percent,10)?0:"effect"!==n?0:100),a=t.extend(!0,{from:t.effects.scaledDimensions(s),to:t.effects.scaledDimensions(s,o,e.direction||"both"),origin:e.origin||["middle","center"]},e);e.fade&&(a.from.opacity=1,a.to.opacity=0),t.effects.effect.size.call(this,a,i)}),t.effects.define("puff","hide",function(e,i){var s=t.extend(!0,{},e,{fade:!0,percent:parseInt(e.percent,10)||150});t.effects.effect.scale.call(this,s,i)}),t.effects.define("pulsate","show",function(e,i){var s=t(this),n=e.mode,o="show"===n,a="hide"===n,r=o||a,l=2*(e.times||5)+(r?1:0),h=e.duration/l,c=0,u=1,d=s.queue().length;for((o||!s.is(":visible"))&&(s.css("opacity",0).show(),c=1);l>u;u++)s.animate({opacity:c},h,e.easing),c=1-c;s.animate({opacity:c},h,e.easing),s.queue(i),t.effects.unshift(s,d,l+1)}),t.effects.define("shake",function(e,i){var s=1,n=t(this),o=e.direction||"left",a=e.distance||20,r=e.times||3,l=2*r+1,h=Math.round(e.duration/l),c="up"===o||"down"===o?"top":"left",u="up"===o||"left"===o,d={},p={},f={},g=n.queue().length;for(t.effects.createPlaceholder(n),d[c]=(u?"-=":"+=")+a,p[c]=(u?"+=":"-=")+2*a,f[c]=(u?"-=":"+=")+2*a,n.animate(d,h,e.easing);r>s;s++)n.animate(p,h,e.easing).animate(f,h,e.easing);n.animate(p,h,e.easing).animate(d,h/2,e.easing).queue(i),t.effects.unshift(n,g,l+1)}),t.effects.define("slide","show",function(e,i){var s,n,o=t(this),a={up:["bottom","top"],down:["top","bottom"],left:["right","left"],right:["left","right"]},r=e.mode,l=e.direction||"left",h="up"===l||"down"===l?"top":"left",c="up"===l||"left"===l,u=e.distance||o["top"===h?"outerHeight":"outerWidth"](!0),d={};t.effects.createPlaceholder(o),s=o.cssClip(),n=o.position()[h],d[h]=(c?-1:1)*u+n,d.clip=o.cssClip(),d.clip[a[l][1]]=d.clip[a[l][0]],"show"===r&&(o.cssClip(d.clip),o.css(h,d[h]),d.clip=s,d[h]=n),o.animate(d,{queue:!1,duration:e.duration,easing:e.easing,complete:i})});var l;t.uiBackCompat!==!1&&(l=t.effects.define("transfer",function(e,i){t(this).transfer(e,i)}))});
/*!
 * jQuery UI Touch Punch 0.2.3
 *
 * Copyright 2011–2014, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
!function(a){function f(a,b){if(!(a.originalEvent.touches.length>1)){a.preventDefault();var c=a.originalEvent.changedTouches[0],d=document.createEvent("MouseEvents");d.initMouseEvent(b,!0,!0,window,1,c.screenX,c.screenY,c.clientX,c.clientY,!1,!1,!1,!1,0,null),a.target.dispatchEvent(d)}}if(a.support.touch="ontouchend"in document,a.support.touch){var e,b=a.ui.mouse.prototype,c=b._mouseInit,d=b._mouseDestroy;b._touchStart=function(a){var b=this;!e&&b._mouseCapture(a.originalEvent.changedTouches[0])&&(e=!0,b._touchMoved=!1,f(a,"mouseover"),f(a,"mousemove"),f(a,"mousedown"))},b._touchMove=function(a){e&&(this._touchMoved=!0,f(a,"mousemove"))},b._touchEnd=function(a){e&&(f(a,"mouseup"),f(a,"mouseout"),this._touchMoved||f(a,"click"),e=!1)},b._mouseInit=function(){var b=this;b.element.bind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),c.call(b)},b._mouseDestroy=function(){var b=this;b.element.unbind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),d.call(b)}}}(jQuery);
/*!
 * Bootstrap v3.3.4 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";var b=a.fn.jquery.split(" ")[0].split(".");if(b[0]<2&&b[1]<9||1==b[0]&&9==b[1]&&b[2]<1)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")}(jQuery),+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){return a(b.target).is(this)?b.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.3.4",d.TRANSITION_DURATION=150,d.prototype.close=function(b){function c(){g.detach().trigger("closed.bs.alert").remove()}var e=a(this),f=e.attr("data-target");f||(f=e.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,""));var g=a(f);b&&b.preventDefault(),g.length||(g=e.closest(".alert")),g.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(g.removeClass("in"),a.support.transition&&g.hasClass("fade")?g.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.3.4",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),setTimeout(a.proxy(function(){d[e](null==f[b]?this.options[b]:f[b]),"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")&&(c.prop("checked")&&this.$element.hasClass("active")?a=!1:b.find(".active").removeClass("active")),a&&c.prop("checked",!this.$element.hasClass("active")).trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active"));a&&this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target);d.hasClass("btn")||(d=d.closest(".btn")),b.call(d,"toggle"),c.preventDefault()}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(b){a(b.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(b.type))})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",a.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.3.4",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(a){if(!/input|textarea/i.test(a.target.tagName)){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()}},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.getItemForDirection=function(a,b){var c=this.getItemIndex(b),d="prev"==a&&0===c||"next"==a&&c==this.$items.length-1;if(d&&!this.options.wrap)return b;var e="prev"==a?-1:1,f=(c+e)%this.$items.length;return this.$items.eq(f)},c.prototype.to=function(a){var b=this,c=this.getItemIndex(this.$active=this.$element.find(".item.active"));return a>this.$items.length-1||0>a?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){b.to(a)}):c==a?this.pause().cycle():this.slide(a>c?"next":"prev",this.$items.eq(a))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){return this.sliding?void 0:this.slide("next")},c.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},c.prototype.slide=function(b,d){var e=this.$element.find(".item.active"),f=d||this.getItemForDirection(b,e),g=this.interval,h="next"==b?"left":"right",i=this;if(f.hasClass("active"))return this.sliding=!1;var j=f[0],k=a.Event("slide.bs.carousel",{relatedTarget:j,direction:h});if(this.$element.trigger(k),!k.isDefaultPrevented()){if(this.sliding=!0,g&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var l=a(this.$indicators.children()[this.getItemIndex(f)]);l&&l.addClass("active")}var m=a.Event("slid.bs.carousel",{relatedTarget:j,direction:h});return a.support.transition&&this.$element.hasClass("slide")?(f.addClass(b),f[0].offsetWidth,e.addClass(h),f.addClass(h),e.one("bsTransitionEnd",function(){f.removeClass([b,h].join(" ")).addClass("active"),e.removeClass(["active",h].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger(m)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(e.removeClass("active"),f.addClass("active"),this.sliding=!1,this.$element.trigger(m)),g&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this};var e=function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}};a(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){var c,d=b.attr("data-target")||(c=b.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");return a(d)}function c(b){return this.each(function(){var c=a(this),e=c.data("bs.collapse"),f=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b);!e&&f.toggle&&/show|hide/.test(b)&&(f.toggle=!1),e||c.data("bs.collapse",e=new d(this,f)),"string"==typeof b&&e[b]()})}var d=function(b,c){this.$element=a(b),this.options=a.extend({},d.DEFAULTS,c),this.$trigger=a('[data-toggle="collapse"][href="#'+b.id+'"],[data-toggle="collapse"][data-target="#'+b.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};d.VERSION="3.3.4",d.TRANSITION_DURATION=350,d.DEFAULTS={toggle:!0},d.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},d.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b,e=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(e&&e.length&&(b=e.data("bs.collapse"),b&&b.transitioning))){var f=a.Event("show.bs.collapse");if(this.$element.trigger(f),!f.isDefaultPrevented()){e&&e.length&&(c.call(e,"hide"),b||e.data("bs.collapse",null));var g=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var h=function(){this.$element.removeClass("collapsing").addClass("collapse in")[g](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return h.call(this);var i=a.camelCase(["scroll",g].join("-"));this.$element.one("bsTransitionEnd",a.proxy(h,this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])}}}},d.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var e=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(e,this)).emulateTransitionEnd(d.TRANSITION_DURATION):e.call(this)}}},d.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},d.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(c,d){var e=a(d);this.addAriaAndCollapsedClass(b(e),e)},this)).end()},d.prototype.addAriaAndCollapsedClass=function(a,b){var c=a.hasClass("in");a.attr("aria-expanded",c),b.toggleClass("collapsed",!c).attr("aria-expanded",c)};var e=a.fn.collapse;a.fn.collapse=c,a.fn.collapse.Constructor=d,a.fn.collapse.noConflict=function(){return a.fn.collapse=e,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(d){var e=a(this);e.attr("data-target")||d.preventDefault();var f=b(e),g=f.data("bs.collapse"),h=g?"toggle":e.data();c.call(f,h)})}(jQuery),+function(a){"use strict";function b(b){b&&3===b.which||(a(e).remove(),a(f).each(function(){var d=a(this),e=c(d),f={relatedTarget:this};e.hasClass("open")&&(e.trigger(b=a.Event("hide.bs.dropdown",f)),b.isDefaultPrevented()||(d.attr("aria-expanded","false"),e.removeClass("open").trigger("hidden.bs.dropdown",f)))}))}function c(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.3.4",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=c(e),g=f.hasClass("open");if(b(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click",b);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),f.toggleClass("open").trigger("shown.bs.dropdown",h)}return!1}},g.prototype.keydown=function(b){if(/(38|40|27|32)/.test(b.which)&&!/input|textarea/i.test(b.target.tagName)){var d=a(this);if(b.preventDefault(),b.stopPropagation(),!d.is(".disabled, :disabled")){var e=c(d),g=e.hasClass("open");if(!g&&27!=b.which||g&&27==b.which)return 27==b.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.disabled):visible a",i=e.find('[role="menu"]'+h+', [role="listbox"]'+h);if(i.length){var j=i.index(b.target);38==b.which&&j>0&&j--,40==b.which&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",b).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f,g.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="menu"]',g.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="listbox"]',g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.3.4",c.TRANSITION_DURATION=300,c.BACKDROP_TRANSITION_DURATION=150,c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var d=this,e=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(e),this.isShown||e.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){d.$element.one("mouseup.dismiss.bs.modal",function(b){a(b.target).is(d.$element)&&(d.ignoreBackdropClick=!0)})}),this.backdrop(function(){var e=a.support.transition&&d.$element.hasClass("fade");d.$element.parent().length||d.$element.appendTo(d.$body),d.$element.show().scrollTop(0),d.adjustDialog(),e&&d.$element[0].offsetWidth,d.$element.addClass("in").attr("aria-hidden",!1),d.enforceFocus();var f=a.Event("shown.bs.modal",{relatedTarget:b});e?d.$dialog.one("bsTransitionEnd",function(){d.$element.trigger("focus").trigger(f)}).emulateTransitionEnd(c.TRANSITION_DURATION):d.$element.trigger("focus").trigger(f)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(c.TRANSITION_DURATION):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},c.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$body.removeClass("modal-open"),a.resetAdjustments(),a.resetScrollbar(),a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var d=this,e=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var f=a.support.transition&&e;if(this.$backdrop=a('<div class="modal-backdrop '+e+'" />').appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),f&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;f?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var g=function(){d.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):g()}else b&&b()},c.prototype.handleUpdate=function(){this.adjustDialog()},c.prototype.adjustDialog=function(){var a=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&a?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!a?this.scrollbarWidth:""})},c.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},c.prototype.checkScrollbar=function(){var a=window.innerWidth;if(!a){var b=document.documentElement.getBoundingClientRect();a=b.right-Math.abs(b.left)}this.bodyIsOverflowing=document.body.clientWidth<a,this.scrollbarWidth=this.measureScrollbar()},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.init("tooltip",a,b)};c.VERSION="3.3.4",c.TRANSITION_DURATION=150,c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){if(this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(this.options.viewport.selector||this.options.viewport),this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c&&c.$tip&&c.$tip.is(":visible")?void(c.hoverState="in"):(c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show())},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide()},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var d=a.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!d)return;var e=this,f=this.tip(),g=this.getUID(this.type);this.setContent(),f.attr("id",g),this.$element.attr("aria-describedby",g),this.options.animation&&f.addClass("fade");var h="function"==typeof this.options.placement?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,i=/\s?auto?\s?/i,j=i.test(h);j&&(h=h.replace(i,"")||"top"),f.detach().css({top:0,left:0,display:"block"}).addClass(h).data("bs."+this.type,this),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element);var k=this.getPosition(),l=f[0].offsetWidth,m=f[0].offsetHeight;if(j){var n=h,o=this.options.container?a(this.options.container):this.$element.parent(),p=this.getPosition(o);h="bottom"==h&&k.bottom+m>p.bottom?"top":"top"==h&&k.top-m<p.top?"bottom":"right"==h&&k.right+l>p.width?"left":"left"==h&&k.left-l<p.left?"right":h,f.removeClass(n).addClass(h)}var q=this.getCalculatedOffset(h,k,l,m);this.applyPlacement(q,h);var r=function(){var a=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==a&&e.leave(e)};a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",r).emulateTransitionEnd(c.TRANSITION_DURATION):r()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top=b.top+g,b.left=b.left+h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=/top|bottom/.test(c),m=l?2*k.left-e+i:2*k.top-f+j,n=l?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(m,d[0][n],l)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c?"left":"top",50*(1-a/b)+"%").css(c?"top":"left","")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(b){function d(){"in"!=e.hoverState&&f.detach(),e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),b&&b()}var e=this,f=a(this.$tip),g=a.Event("hide.bs."+this.type);return this.$element.trigger(g),g.isDefaultPrevented()?void 0:(f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one("bsTransitionEnd",d).emulateTransitionEnd(c.TRANSITION_DURATION):d(),this.hoverState=null,this)},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName,e=c.getBoundingClientRect();null==e.width&&(e=a.extend({},e,{width:e.right-e.left,height:e.bottom-e.top}));var f=d?{top:0,left:0}:b.offset(),g={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()},h=d?{width:a(window).width(),height:a(window).height()}:null;return a.extend({},e,g,h,f)},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.width&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){return this.$tip=this.$tip||a(this.options.template)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){var a=this;clearTimeout(this.timeout),this.hide(function(){a.$element.off("."+a.type).removeData("bs."+a.type)})};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.3.4",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){this.$body=a(document.body),this.$scrollElement=a(a(c).is(document.body)?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",a.proxy(this.process,this)),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.3.4",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b=this,c="offset",d=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),a.isWindow(this.$scrollElement[0])||(c="position",d=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var b=a(this),e=b.data("target")||b.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[c]().top+d,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){b.offsets.push(this[0]),b.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<e[0])return this.activeTarget=null,this.clear();for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(void 0===e[a+1]||b<e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,this.clear();var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")},b.prototype.clear=function(){a(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.3.4",c.TRANSITION_DURATION=150,c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){
var e=c.find(".active:last a"),f=a.Event("hide.bs.tab",{relatedTarget:b[0]}),g=a.Event("show.bs.tab",{relatedTarget:e[0]});if(e.trigger(f),b.trigger(g),!g.isDefaultPrevented()&&!f.isDefaultPrevented()){var h=a(d);this.activate(b.closest("li"),c),this.activate(h,h.parent(),function(){e.trigger({type:"hidden.bs.tab",relatedTarget:b[0]}),b.trigger({type:"shown.bs.tab",relatedTarget:e[0]})})}}},c.prototype.activate=function(b,d,e){function f(){g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),h?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu").length&&b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),e&&e()}var g=d.find("> .active"),h=e&&a.support.transition&&(g.length&&g.hasClass("fade")||!!d.find("> .fade").length);g.length&&h?g.one("bsTransitionEnd",f).emulateTransitionEnd(c.TRANSITION_DURATION):f(),g.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this};var e=function(c){c.preventDefault(),b.call(a(this),"show")};a(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',e).on("click.bs.tab.data-api",'[data-toggle="pill"]',e)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.3.4",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getState=function(a,b,c,d){var e=this.$target.scrollTop(),f=this.$element.offset(),g=this.$target.height();if(null!=c&&"top"==this.affixed)return c>e?"top":!1;if("bottom"==this.affixed)return null!=c?e+this.unpin<=f.top?!1:"bottom":a-d>=e+g?!1:"bottom";var h=null==this.affixed,i=h?e:f.top,j=h?g:b;return null!=c&&c>=e?"top":null!=d&&i+j>=a-d?"bottom":!1},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=this.$element.height(),d=this.options.offset,e=d.top,f=d.bottom,g=a(document.body).height();"object"!=typeof d&&(f=e=d),"function"==typeof e&&(e=d.top(this.$element)),"function"==typeof f&&(f=d.bottom(this.$element));var h=this.getState(g,b,e,f);if(this.affixed!=h){null!=this.unpin&&this.$element.css("top","");var i="affix"+(h?"-"+h:""),j=a.Event(i+".bs.affix");if(this.$element.trigger(j),j.isDefaultPrevented())return;this.affixed=h,this.unpin="bottom"==h?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix","affixed")+".bs.affix")}"bottom"==h&&this.$element.offset({top:g-b-f})}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},null!=d.offsetBottom&&(d.offset.bottom=d.offsetBottom),null!=d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery);
// OpenLayers. See https://openlayers.org/
// License: https://raw.githubusercontent.com/openlayers/openlayers/master/LICENSE.md
// Version: v4.2.0
;(function (root, factory) {
  if (typeof exports === "object") {
    module.exports = factory();
  } else if (typeof define === "function" && define.amd) {
    define([], factory);
  } else {
    root.ol = factory();
  }
}(this, function () {
  var OPENLAYERS = {};
  var k,aa=this;function t(a,b){var c=OPENLAYERS;a=a.split(".");c=c||aa;a[0]in c||!c.execScript||c.execScript("var "+a[0]);for(var d;a.length&&(d=a.shift());)a.length||void 0===b?c[d]&&c[d]!==Object.prototype[d]?c=c[d]:c=c[d]={}:c[d]=b};var ea,fa;function ia(a,b){return a>b?1:a<b?-1:0}function ja(a,b){return 0<=a.indexOf(b)}function ka(a,b,c){var d=a.length;if(a[0]<=b)return 0;if(!(b<=a[d-1]))if(0<c)for(c=1;c<d;++c){if(a[c]<b)return c-1}else if(0>c)for(c=1;c<d;++c){if(a[c]<=b)return c}else for(c=1;c<d;++c){if(a[c]==b)return c;if(a[c]<b)return a[c-1]-b<b-a[c]?c-1:c}return d-1}function la(a,b){var c=Array.isArray(b)?b:[b],d=c.length;for(b=0;b<d;b++)a[a.length]=c[b]}function ma(a,b){b=a.indexOf(b);-1<b&&a.splice(b,1)}
function na(a,b){for(var c=a.length>>>0,d,e=0;e<c;e++)if(d=a[e],b(d,e,a))return d;return null}function pa(a,b){var c=a.length;if(c!==b.length)return!1;for(var d=0;d<c;d++)if(a[d]!==b[d])return!1;return!0}function qa(a){var b=ra,c=a.length,d=Array(a.length),e;for(e=0;e<c;e++)d[e]={index:e,value:a[e]};d.sort(function(a,c){return b(a.value,c.value)||a.index-c.index});for(e=0;e<a.length;e++)a[e]=d[e].value}function sa(a,b){var c;return a.every(function(d,e){c=e;return!b(d,e,a)})?-1:c}
function ta(a,b){var c=b||ia;return a.every(function(b,e){if(!e)return!0;b=c(a[e-1],b);return!(0<b||0===b)})};function v(a,b){a.prototype=Object.create(b.prototype);a.prototype.constructor=a}function ua(){}function w(a){return a.Vo||(a.Vo=++va)}var va=0;function wa(a){this.message="Assertion failed. See https://openlayers.org/en/v4.2.0/doc/errors/#"+a+" for details.";this.code=a;this.name="AssertionError"}v(wa,Error);function xa(a,b){if(!a)throw new wa(b);};function ya(a,b,c,d){this.ca=a;this.$=b;this.da=c;this.ia=d}function za(a,b,c){return a.ca<=b&&b<=a.$&&a.da<=c&&c<=a.ia}function Aa(a,b){return a.ca==b.ca&&a.da==b.da&&a.$==b.$&&a.ia==b.ia}function Ba(a,b){return a.ca<=b.$&&a.$>=b.ca&&a.da<=b.ia&&a.ia>=b.da};function Ca(a,b,c){return Math.min(Math.max(a,b),c)}var Da=function(){var a;"cosh"in Math?a=Math.cosh:a=function(a){a=Math.exp(a);return(a+1/a)/2};return a}();function Ea(a){xa(0<a,29);return Math.pow(2,Math.ceil(Math.log(a)/Math.LN2))}function Fa(a,b,c,d,e,f){var g=e-c,h=f-d;if(g||h){var l=((a-c)*g+(b-d)*h)/(g*g+h*h);1<l?(c=e,d=f):0<l&&(c+=g*l,d+=h*l)}return Ga(a,b,c,d)}function Ga(a,b,c,d){a=c-a;b=d-b;return a*a+b*b}function Ha(a){return a*Math.PI/180}function Ia(a,b){a%=b;return 0>a*b?a+b:a}
function Ja(a,b,c){return a+c*(b-a)};function Ka(a,b,c){void 0===c&&(c=[0,0]);c[0]=a[0]+2*b;c[1]=a[1]+2*b;return c}function La(a,b,c){void 0===c&&(c=[0,0]);c[0]=a[0]*b+.5|0;c[1]=a[1]*b+.5|0;return c}function Ma(a,b){if(Array.isArray(a))return a;void 0===b?b=[a,a]:b[0]=b[1]=a;return b};function Na(a){for(var b=Oa(),c=0,d=a.length;c<d;++c)Pa(b,a[c]);return b}function Qa(a,b,c){return c?(c[0]=a[0]-b,c[1]=a[1]-b,c[2]=a[2]+b,c[3]=a[3]+b,c):[a[0]-b,a[1]-b,a[2]+b,a[3]+b]}function Ra(a,b){return b?(b[0]=a[0],b[1]=a[1],b[2]=a[2],b[3]=a[3],b):a.slice()}function Sa(a,b,c){b=b<a[0]?a[0]-b:a[2]<b?b-a[2]:0;a=c<a[1]?a[1]-c:a[3]<c?c-a[3]:0;return b*b+a*a}function Ta(a,b){return Ua(a,b[0],b[1])}function Va(a,b){return a[0]<=b[0]&&b[2]<=a[2]&&a[1]<=b[1]&&b[3]<=a[3]}
function Ua(a,b,c){return a[0]<=b&&b<=a[2]&&a[1]<=c&&c<=a[3]}function Wa(a,b){var c=a[1],d=a[2],e=a[3],f=b[0];b=b[1];var g=0;f<a[0]?g|=16:f>d&&(g|=4);b<c?g|=8:b>e&&(g|=2);g||(g=1);return g}function Oa(){return[Infinity,Infinity,-Infinity,-Infinity]}function Xa(a,b,c,d,e){return e?(e[0]=a,e[1]=b,e[2]=c,e[3]=d,e):[a,b,c,d]}function Ya(a){return Xa(Infinity,Infinity,-Infinity,-Infinity,a)}function Za(a,b){var c=a[0];a=a[1];return Xa(c,a,c,a,b)}function $a(a,b,c,d,e){e=Ya(e);return ab(e,a,b,c,d)}
function bb(a,b){return a[0]==b[0]&&a[2]==b[2]&&a[1]==b[1]&&a[3]==b[3]}function cb(a,b){b[0]<a[0]&&(a[0]=b[0]);b[2]>a[2]&&(a[2]=b[2]);b[1]<a[1]&&(a[1]=b[1]);b[3]>a[3]&&(a[3]=b[3]);return a}function Pa(a,b){b[0]<a[0]&&(a[0]=b[0]);b[0]>a[2]&&(a[2]=b[0]);b[1]<a[1]&&(a[1]=b[1]);b[1]>a[3]&&(a[3]=b[1])}function ab(a,b,c,d,e){for(;c<d;c+=e){var f=a,g=b[c],h=b[c+1];f[0]=Math.min(f[0],g);f[1]=Math.min(f[1],h);f[2]=Math.max(f[2],g);f[3]=Math.max(f[3],h)}return a}
function db(a,b,c){var d;return(d=b.call(c,eb(a)))||(d=b.call(c,gb(a)))||(d=b.call(c,hb(a)))?d:(d=b.call(c,ib(a)))?d:!1}function jb(a){var b=0;kb(a)||(b=lb(a)*mb(a));return b}function eb(a){return[a[0],a[1]]}function gb(a){return[a[2],a[1]]}function nb(a){return[(a[0]+a[2])/2,(a[1]+a[3])/2]}
function ob(a,b,c,d,e){var f=b*d[0]/2;d=b*d[1]/2;b=Math.cos(c);var g=Math.sin(c);c=f*b;f*=g;b*=d;var h=d*g,l=a[0],m=a[1];a=l-c+h;d=l-c-h;g=l+c-h;c=l+c+h;var h=m-f-b,l=m-f+b,n=m+f+b,f=m+f-b;return Xa(Math.min(a,d,g,c),Math.min(h,l,n,f),Math.max(a,d,g,c),Math.max(h,l,n,f),e)}function mb(a){return a[3]-a[1]}function pb(a,b,c){c=c?c:Oa();qb(a,b)&&(c[0]=a[0]>b[0]?a[0]:b[0],c[1]=a[1]>b[1]?a[1]:b[1],c[2]=a[2]<b[2]?a[2]:b[2],c[3]=a[3]<b[3]?a[3]:b[3]);return c}function ib(a){return[a[0],a[3]]}
function hb(a){return[a[2],a[3]]}function lb(a){return a[2]-a[0]}function qb(a,b){return a[0]<=b[2]&&a[2]>=b[0]&&a[1]<=b[3]&&a[3]>=b[1]}function kb(a){return a[2]<a[0]||a[3]<a[1]}function rb(a,b){var c=(a[2]-a[0])/2*(b-1);b=(a[3]-a[1])/2*(b-1);a[0]-=c;a[2]+=c;a[1]-=b;a[3]+=b}
function sb(a,b,c){a=[a[0],a[1],a[0],a[3],a[2],a[1],a[2],a[3]];b(a,a,2);var d=[a[0],a[2],a[4],a[6]],e=[a[1],a[3],a[5],a[7]];b=Math.min.apply(null,d);a=Math.min.apply(null,e);d=Math.max.apply(null,d);e=Math.max.apply(null,e);return Xa(b,a,d,e,c)};var tb="function"===typeof Object.assign?Object.assign:function(a,b){if(!a||null===a)throw new TypeError("Cannot convert undefined or null to object");for(var c=Object(a),d=1,e=arguments.length;d<e;++d){var f=arguments[d];if(void 0!==f&&null!==f)for(var g in f)f.hasOwnProperty(g)&&(c[g]=f[g])}return c};function ub(a){for(var b in a)delete a[b]}function vb(a){var b=[],c;for(c in a)b.push(a[c]);return b}function wb(a){for(var b in a)return!1;return!b};/*

 Latitude/longitude spherical geodesy formulae taken from
 http://www.movable-type.co.uk/scripts/latlong.html
 Licensed under CC-BY-3.0.
*/
function xb(a){this.radius=a}xb.prototype.a=function(a){for(var b=0,c=a.length,d=a[c-1][0],e=a[c-1][1],f=0;f<c;f++)var g=a[f][0],h=a[f][1],b=b+Ha(g-d)*(2+Math.sin(Ha(e))+Math.sin(Ha(h))),d=g,e=h;return b*this.radius*this.radius/2};xb.prototype.b=function(a,b){var c=Ha(a[1]),d=Ha(b[1]),e=(d-c)/2;a=Ha(b[0]-a[0])/2;c=Math.sin(e)*Math.sin(e)+Math.sin(a)*Math.sin(a)*Math.cos(c)*Math.cos(d);return 2*this.radius*Math.atan2(Math.sqrt(c),Math.sqrt(1-c))};
xb.prototype.offset=function(a,b,c){var d=Ha(a[1]);b/=this.radius;var e=Math.asin(Math.sin(d)*Math.cos(b)+Math.cos(d)*Math.sin(b)*Math.cos(c));return[180*(Ha(a[0])+Math.atan2(Math.sin(c)*Math.sin(b)*Math.cos(d),Math.cos(b)-Math.sin(d)*Math.sin(e)))/Math.PI,180*e/Math.PI]};var yb=new xb(6370997);var zb={};zb.degrees=2*Math.PI*yb.radius/360;zb.ft=.3048;zb.m=1;zb["us-ft"]=1200/3937;var Ab=null;function Bb(a){this.mb=a.code;this.a=a.units;this.f=void 0!==a.extent?a.extent:null;this.g=void 0!==a.worldExtent?a.worldExtent:null;this.b=void 0!==a.axisOrientation?a.axisOrientation:"enu";this.c=void 0!==a.global?a.global:!1;this.i=!(!this.c||!this.f);this.o=a.getPointResolution;this.j=null;this.l=a.metersPerUnit;var b=a.code,c=Ab||window.proj4;"function"==typeof c&&(b=c.defs(b),void 0!==b&&(void 0!==b.axis&&void 0===a.axisOrientation&&(this.b=b.axis),void 0===a.metersPerUnit&&(this.l=b.to_meter),
void 0===a.units&&(this.a=b.units)))}k=Bb.prototype;k.Jk=function(){return this.mb};k.G=function(){return this.f};k.Un=function(){return this.a};k.sc=function(){return this.l||zb[this.a]};k.tl=function(){return this.g};k.dm=function(){return this.c};k.$p=function(a){this.c=a;this.i=!(!a||!this.f)};k.Vn=function(a){this.f=a;this.i=!(!this.c||!a)};k.kq=function(a){this.g=a};k.Zp=function(a){this.o=a};function Cb(a){Bb.call(this,{code:a,units:"m",extent:Db,global:!0,worldExtent:Eb,getPointResolution:function(a,c){return a/Da(c[1]/6378137)}})}v(Cb,Bb);var Fb=6378137*Math.PI,Db=[-Fb,-Fb,Fb,Fb],Eb=[-180,-85,180,85],Gb="EPSG:3857 EPSG:102100 EPSG:102113 EPSG:900913 urn:ogc:def:crs:EPSG:6.18:3:3857 urn:ogc:def:crs:EPSG::3857 http://www.opengis.net/gml/srs/epsg.xml#3857".split(" ").map(function(a){return new Cb(a)});
function Hb(a,b,c){var d=a.length;c=1<c?c:2;void 0===b&&(2<c?b=a.slice():b=Array(d));for(var e=0;e<d;e+=c){b[e]=Fb*a[e]/180;var f=6378137*Math.log(Math.tan(Math.PI*(a[e+1]+90)/360));f>Fb?f=Fb:f<-Fb&&(f=-Fb);b[e+1]=f}return b}function Ib(a,b,c){var d=a.length;c=1<c?c:2;void 0===b&&(2<c?b=a.slice():b=Array(d));for(var e=0;e<d;e+=c)b[e]=180*a[e]/Fb,b[e+1]=360*Math.atan(Math.exp(a[e+1]/6378137))/Math.PI-90;return b};var Jb=new xb(6378137);function Kb(a,b){Bb.call(this,{code:a,units:"degrees",extent:Lb,axisOrientation:b,global:!0,metersPerUnit:Mb,worldExtent:Lb})}v(Kb,Bb);var Lb=[-180,-90,180,90],Mb=Math.PI*Jb.radius/180,Nb=[new Kb("CRS:84"),new Kb("EPSG:4326","neu"),new Kb("urn:ogc:def:crs:EPSG::4326","neu"),new Kb("urn:ogc:def:crs:EPSG:6.6:4326","neu"),new Kb("urn:ogc:def:crs:OGC:1.3:CRS84"),new Kb("urn:ogc:def:crs:OGC:2:84"),new Kb("http://www.opengis.net/gml/srs/epsg.xml#4326","neu"),new Kb("urn:x-ogc:def:crs:EPSG:4326","neu")];var Ob={};var Pb={};function Qb(a,b,c){a=a.mb;b=b.mb;a in Pb||(Pb[a]={});Pb[a][b]=c}function Rb(a,b){var c;a in Pb&&b in Pb[a]&&(c=Pb[a][b]);return c};function Sb(a,b,c){a=Tb(a);var d=a.o;d?b=d(b,c):"degrees"!=a.a&&(d=Vb(a,Tb("EPSG:4326")),b=[c[0]-b/2,c[1],c[0]+b/2,c[1],c[0],c[1]-b/2,c[0],c[1]+b/2],b=d(b,b,2),b=(yb.b(b.slice(0,2),b.slice(2,4))+yb.b(b.slice(4,6),b.slice(6,8)))/2,a=a.sc(),void 0!==a&&(b/=a));return b}function Wb(a){a.forEach(Xb);a.forEach(function(b){a.forEach(function(a){b!==a&&Qb(b,a,Yb)})})}function Zb(){Nb.forEach(function(a){Gb.forEach(function(b){Qb(a,b,Hb);Qb(b,a,Ib)})})}function Xb(a){Ob[a.mb]=a;Qb(a,a,Yb)}
function $b(a){return a?"string"===typeof a?Tb(a):a:Tb("EPSG:3857")}function ac(a,b,c,d){a=Tb(a);b=Tb(b);Qb(a,b,cc(c));Qb(b,a,cc(d))}function cc(a){return function(b,c,d){var e=b.length;d=void 0!==d?d:2;c=void 0!==c?c:Array(e);var f;for(f=0;f<e;f+=d){var g=a([b[f],b[f+1]]);c[f]=g[0];c[f+1]=g[1];for(g=d-1;2<=g;--g)c[f+g]=b[f+g]}return c}}
function Tb(a){var b=null;if(a instanceof Bb)b=a;else if("string"===typeof a){var b=Ob[a]||null,c=Ab||window.proj4;b||"function"!=typeof c||void 0===c.defs(a)||(b=new Bb({code:a}),Xb(b))}return b}function dc(a,b){if(a===b)return!0;var c=a.a===b.a;return a.mb===b.mb?c:Vb(a,b)===Yb&&c}function ec(a,b){a=Tb(a);b=Tb(b);return Vb(a,b)}
function Vb(a,b){var c=a.mb,d=b.mb,e=Rb(c,d);if(!e){var f=Ab||window.proj4;if("function"==typeof f){var g=f.defs(c),h=f.defs(d);void 0!==g&&void 0!==h&&(g===h?Wb([b,a]):(e=f(d,c),ac(b,a,e.forward,e.inverse)),e=Rb(c,d))}}e||(e=fc);return e}function fc(a,b){if(void 0!==b&&a!==b){for(var c=0,d=a.length;c<d;++c)b[c]=a[c];a=b}return a}function Yb(a,b){if(void 0!==b){for(var c=0,d=a.length;c<d;++c)b[c]=a[c];a=b}else a=a.slice();return a}function gc(a,b,c){return ec(b,c)(a,void 0,a.length)}
function hc(a,b,c){b=ec(b,c);return sb(a,b)}function ic(){Wb(Gb);Wb(Nb);Zb()}ic();function jc(a,b,c,d){return void 0!==d?(d[0]=a,d[1]=b,d[2]=c,d):[a,b,c]}function kc(a){var b=a[0],c=Array(b),d=1<<b-1,e;for(e=0;e<b;++e){var f=48;a[1]&d&&(f+=1);a[2]&d&&(f+=2);c[e]=String.fromCharCode(f);d>>=1}return c.join("")};function lc(a){this.minZoom=void 0!==a.minZoom?a.minZoom:0;this.b=a.resolutions;xa(ta(this.b,function(a,b){return b-a}),17);this.maxZoom=this.b.length-1;this.i=void 0!==a.origin?a.origin:null;this.c=null;void 0!==a.origins&&(this.c=a.origins,xa(this.c.length==this.b.length,20));var b=a.extent;void 0===b||this.i||this.c||(this.i=ib(b));xa(!this.i&&this.c||this.i&&!this.c,18);this.f=null;void 0!==a.tileSizes&&(this.f=a.tileSizes,xa(this.f.length==this.b.length,19));this.g=void 0!==a.tileSize?a.tileSize:
this.f?null:256;xa(!this.g&&this.f||this.g&&!this.f,22);this.v=void 0!==b?b:null;this.a=null;this.j=[0,0];void 0!==a.sizes?this.a=a.sizes.map(function(a){return new ya(Math.min(0,a[0]),Math.max(a[0]-1,-1),Math.min(0,a[1]),Math.max(a[1]-1,-1))},this):b&&mc(this,b)}var nc=[0,0,0];k=lc.prototype;k.Rf=function(a,b,c){a=oc(this,a,b);for(var d=a.ca,e=a.$;d<=e;++d)for(var f=a.da,g=a.ia;f<=g;++f)c([b,d,f])};
function pc(a,b,c,d,e){e=a.Aa(b,e);for(b=b[0]-1;b>=a.minZoom;){if(c.call(null,b,oc(a,e,b,d)))return!0;--b}return!1}k.G=function(){return this.v};k.Ti=function(){return this.maxZoom};k.Ui=function(){return this.minZoom};k.Pc=function(a){return this.i?this.i:this.c[a]};k.Da=function(a){return this.b[a]};k.Vi=function(){return this.b};function qc(a,b,c,d){return b[0]<a.maxZoom?(d=a.Aa(b,d),oc(a,d,b[0]+1,c)):null}
function rc(a,b,c,d){sc(a,b[0],b[1],c,!1,nc);var e=nc[1],f=nc[2];sc(a,b[2],b[3],c,!0,nc);a=nc[1];b=nc[2];void 0!==d?(d.ca=e,d.$=a,d.da=f,d.ia=b):d=new ya(e,a,f,b);return d}function oc(a,b,c,d){return rc(a,b,a.Da(c),d)}function tc(a,b){var c=a.Pc(b[0]),d=a.Da(b[0]);a=Ma(a.gb(b[0]),a.j);return[c[0]+(b[1]+.5)*a[0]*d,c[1]+(b[2]+.5)*a[1]*d]}k.Aa=function(a,b){var c=this.Pc(a[0]),d=this.Da(a[0]),e=Ma(this.gb(a[0]),this.j),f=c[0]+a[1]*e[0]*d;a=c[1]+a[2]*e[1]*d;return Xa(f,a,f+e[0]*d,a+e[1]*d,b)};
k.Be=function(a,b,c){return sc(this,a[0],a[1],b,!1,c)};function sc(a,b,c,d,e,f){var g=a.tc(d),h=d/a.Da(g),l=a.Pc(g);a=Ma(a.gb(g),a.j);b=h*Math.floor((b-l[0])/d+(e?.5:0))/a[0];c=h*Math.floor((c-l[1])/d+(e?0:.5))/a[1];e?(b=Math.ceil(b)-1,c=Math.ceil(c)-1):(b=Math.floor(b),c=Math.floor(c));return jc(g,b,c,f)}k.bg=function(a,b,c){return sc(this,a[0],a[1],this.Da(b),!1,c)};k.gb=function(a){return this.g?this.g:this.f[a]};k.tc=function(a,b){return Ca(ka(this.b,a,b||0),this.minZoom,this.maxZoom)};
function mc(a,b){for(var c=a.b.length,d=Array(c),e=a.minZoom;e<c;++e)d[e]=oc(a,b,e);a.a=d};function vc(a){var b=a.j;b||(b=wc(a),a.j=b);return b}function xc(a){var b={};tb(b,a?a:{});void 0===b.extent&&(b.extent=Tb("EPSG:3857").G());b.resolutions=yc(b.extent,b.maxZoom,b.tileSize);delete b.maxZoom;return new lc(b)}function yc(a,b,c){b=void 0!==b?b:42;var d=mb(a);a=lb(a);c=Ma(void 0!==c?c:256);c=Math.max(a/c[0],d/c[1]);b+=1;d=Array(b);for(a=0;a<b;++a)d[a]=c/Math.pow(2,a);return d}function wc(a,b,c){a=zc(a);b=yc(a,b,c);return new lc({extent:a,origin:ib(a),resolutions:b,tileSize:c})}
function zc(a){a=Tb(a);var b=a.G();b||(a=180*zb.degrees/a.sc(),b=Xa(-a,-a,a,a));return b};function Ac(a){this.b=a.html;this.a=a.tileRanges?a.tileRanges:null}Ac.prototype.i=function(){return this.b};function Bc(a){return function(b){if(b)return[Ca(b[0],a[0],a[2]),Ca(b[1],a[1],a[3])]}}function Cc(a){return a};function Dc(a){function b(b){var c=a.listener,e=a.lh||a.target;a.nh&&Ec(a);return c.call(e,b)}return a.mh=b}function Fc(a,b,c,d){for(var e,f=0,g=a.length;f<g;++f)if(e=a[f],e.listener===b&&e.lh===c)return d&&(e.deleteIndex=f),e}function Gc(a,b){return(a=a.fb)?a[b]:void 0}function Hc(a){var b=a.fb;b||(b=a.fb={});return b}function Ic(a,b){var c=Gc(a,b);if(c){for(var d=0,e=c.length;d<e;++d)a.removeEventListener(b,c[d].mh),ub(c[d]);c.length=0;if(c=a.fb)delete c[b],Object.keys(c).length||delete a.fb}}
function y(a,b,c,d,e){var f=Hc(a),g=f[b];g||(g=f[b]=[]);(f=Fc(g,c,d,!1))?e||(f.nh=!1):(f={lh:d,nh:!!e,listener:c,target:a,type:b},a.addEventListener(b,Dc(f)),g.push(f));return f}function Jc(a,b,c,d){return y(a,b,c,d,!0)}function Kc(a,b,c,d){(a=Gc(a,b))&&(c=Fc(a,c,d,!0))&&Ec(c)}function Ec(a){if(a&&a.target){a.target.removeEventListener(a.type,a.mh);var b=Gc(a.target,a.type);if(b){var c="deleteIndex"in a?a.deleteIndex:b.indexOf(a);-1!==c&&b.splice(c,1);b.length||Ic(a.target,a.type)}ub(a)}}
function Lc(a){var b=Hc(a),c;for(c in b)Ic(a,c)};function Mc(){}Mc.prototype.Jb=!1;function Nc(a){a.Jb||(a.Jb=!0,a.ka())}Mc.prototype.ka=ua;function Oc(a){this.type=a;this.target=null}Oc.prototype.preventDefault=Oc.prototype.stopPropagation=function(){this.qp=!0};function Pc(a){a.stopPropagation()};function Qc(){this.Ua={};this.ra={};this.oa={}}v(Qc,Mc);Qc.prototype.addEventListener=function(a,b){var c=this.oa[a];c||(c=this.oa[a]=[]);-1===c.indexOf(b)&&c.push(b)};
Qc.prototype.b=function(a){var b="string"===typeof a?new Oc(a):a;a=b.type;b.target=this;var c=this.oa[a];if(c){a in this.ra||(this.ra[a]=0,this.Ua[a]=0);++this.ra[a];for(var d=0,e=c.length;d<e;++d)if(!1===c[d].call(this,b)||b.qp){var f=!1;break}--this.ra[a];if(!this.ra[a]){b=this.Ua[a];for(delete this.Ua[a];b--;)this.removeEventListener(a,ua);delete this.ra[a]}return f}};Qc.prototype.ka=function(){Lc(this)};function Rc(a,b){return b?b in a.oa:0<Object.keys(a.oa).length}
Qc.prototype.removeEventListener=function(a,b){var c=this.oa[a];c&&(b=c.indexOf(b),a in this.Ua?(c[b]=ua,++this.Ua[a]):(c.splice(b,1),c.length||delete this.oa[a]))};function Sc(){Qc.call(this);this.i=0}v(Sc,Qc);k=Sc.prototype;k.s=function(){++this.i;this.b("change")};k.L=function(){return this.i};k.J=function(a,b,c){if(Array.isArray(a)){for(var d=a.length,e=Array(d),f=0;f<d;++f)e[f]=y(this,a[f],b,c);return e}return y(this,a,b,c)};k.once=function(a,b,c){if(Array.isArray(a)){for(var d=a.length,e=Array(d),f=0;f<d;++f)e[f]=Jc(this,a[f],b,c);return e}return Jc(this,a,b,c)};
k.K=function(a,b,c){if(Array.isArray(a))for(var d=0,e=a.length;d<e;++d)Kc(this,a[d],b,c);else Kc(this,a,b,c)};function Tc(a){Sc.call(this);w(this);this.S={};void 0!==a&&this.H(a)}v(Tc,Sc);var Uc={};function Vc(a){return Uc.hasOwnProperty(a)?Uc[a]:Uc[a]="change:"+a}k=Tc.prototype;k.get=function(a){var b;this.S.hasOwnProperty(a)&&(b=this.S[a]);return b};k.O=function(){return Object.keys(this.S)};k.N=function(){return tb({},this.S)};function Wc(a,b,c){var d=Vc(b);a.b(new Xc(d,b,c));a.b(new Xc("propertychange",b,c))}k.set=function(a,b,c){c?this.S[a]=b:(c=this.S[a],this.S[a]=b,c!==b&&Wc(this,a,c))};
k.H=function(a,b){for(var c in a)this.set(c,a[c],b)};k.P=function(a,b){if(a in this.S){var c=this.S[a];delete this.S[a];b||Wc(this,a,c)}};function Xc(a,b,c){Oc.call(this,a);this.key=b;this.oldValue=c}v(Xc,Oc);function Yc(a,b){Tc.call(this);this.c=!!(b||{}).unique;this.a=a?a:[];if(this.c)for(a=0,b=this.a.length;a<b;++a)Zc(this,this.a[a],a);$c(this)}v(Yc,Tc);k=Yc.prototype;k.clear=function(){for(;0<this.dc();)this.pop()};k.fg=function(a){var b;var c=0;for(b=a.length;c<b;++c)this.push(a[c]);return this};k.forEach=function(a,b){this.a.forEach(a,b)};k.tm=function(){return this.a};k.item=function(a){return this.a[a]};k.dc=function(){return this.get(ad)};
k.He=function(a,b){this.c&&Zc(this,b);this.a.splice(a,0,b);$c(this);this.b(new bd("add",b))};k.pop=function(){return this.Hg(this.dc()-1)};k.push=function(a){this.c&&Zc(this,a);var b=this.dc();this.He(b,a);return this.dc()};k.remove=function(a){var b=this.a,c;var d=0;for(c=b.length;d<c;++d)if(b[d]===a)return this.Hg(d)};k.Hg=function(a){var b=this.a[a];this.a.splice(a,1);$c(this);this.b(new bd("remove",b));return b};
k.Wp=function(a,b){var c=this.dc();if(a<c)this.c&&Zc(this,b,a),c=this.a[a],this.a[a]=b,this.b(new bd("remove",c)),this.b(new bd("add",b));else{for(;c<a;++c)this.He(c,void 0);this.He(a,b)}};function $c(a){a.set(ad,a.a.length)}function Zc(a,b,c){for(var d=0,e=a.a.length;d<e;++d)if(a.a[d]===b&&d!==c)throw new wa(58);}var ad="length";function bd(a,b){Oc.call(this,a);this.element=b}v(bd,Oc);var cd=/^#(?:[0-9a-f]{3}){1,2}$/i,dd=/^([a-z]*)$/i;function ed(a){return Array.isArray(a)?a:fd(a)}function gd(a){if("string"!==typeof a){var b=a[0];b!=(b|0)&&(b=b+.5|0);var c=a[1];c!=(c|0)&&(c=c+.5|0);var d=a[2];d!=(d|0)&&(d=d+.5|0);a="rgba("+b+","+c+","+d+","+(void 0===a[3]?1:a[3])+")"}return a}
var fd=function(){var a={},b=0;return function(c){if(a.hasOwnProperty(c))var d=a[c];else{if(1024<=b){d=0;for(var e in a)d++&3||(delete a[e],--b)}d=c;dd.exec(d)&&(e=document.createElement("div"),e.style.color=d,document.body.appendChild(e),d=getComputedStyle(e).color,document.body.removeChild(e));if(cd.exec(d)){var f=d.length-1;xa(3==f||6==f,54);var g=3==f?1:2;f=parseInt(d.substr(1+0*g,g),16);e=parseInt(d.substr(1+1*g,g),16);d=parseInt(d.substr(1+2*g,g),16);1==g&&(f=(f<<4)+f,e=(e<<4)+e,d=(d<<4)+d);
f=[f,e,d,1]}else d.indexOf("rgba(")?d.indexOf("rgb(")?xa(!1,14):(d=d.slice(4,-1).split(",").map(Number),d.push(1),f=hd(d)):(d=d.slice(5,-1).split(",").map(Number),f=hd(d));d=f;a[c]=d;++b}return d}}();function hd(a){var b=[];b[0]=Ca(a[0]+.5|0,0,255);b[1]=Ca(a[1]+.5|0,0,255);b[2]=Ca(a[2]+.5|0,0,255);b[3]=Ca(a[3],0,1);return b};function id(a){return"string"===typeof a||a instanceof CanvasPattern||a instanceof CanvasGradient?a:gd(a)};function jd(a,b){var c=document.createElement("CANVAS");a&&(c.width=a);b&&(c.height=b);return c.getContext("2d")}function kd(a,b){var c=b.parentNode;c&&c.replaceChild(a,b)}function ld(a){a&&a.parentNode&&a.parentNode.removeChild(a)};function md(a){Tc.call(this);this.element=a.element?a.element:null;this.a=this.R=null;this.v=[];this.render=a.render?a.render:ua;a.target&&this.f(a.target)}v(md,Tc);md.prototype.ka=function(){ld(this.element);Tc.prototype.ka.call(this)};md.prototype.g=function(){return this.a};
md.prototype.setMap=function(a){this.a&&ld(this.element);for(var b=0,c=this.v.length;b<c;++b)Ec(this.v[b]);this.v.length=0;if(this.a=a)(this.R?this.R:a.D).appendChild(this.element),this.render!==ua&&this.v.push(y(a,"postrender",this.render,this)),a.render()};md.prototype.f=function(a){this.R="string"===typeof a?document.getElementById(a):a};function nd(a){a=a?a:{};this.I=document.createElement("UL");this.u=document.createElement("LI");this.I.appendChild(this.u);this.u.style.display="none";this.c=void 0!==a.collapsed?a.collapsed:!0;this.o=void 0!==a.collapsible?a.collapsible:!0;this.o||(this.c=!1);var b=void 0!==a.className?a.className:"ol-attribution",c=void 0!==a.tipLabel?a.tipLabel:"Attributions",d=void 0!==a.collapseLabel?a.collapseLabel:"\u00bb";"string"===typeof d?(this.D=document.createElement("span"),this.D.textContent=d):this.D=
d;d=void 0!==a.label?a.label:"i";"string"===typeof d?(this.C=document.createElement("span"),this.C.textContent=d):this.C=d;var e=this.o&&!this.c?this.D:this.C,d=document.createElement("button");d.setAttribute("type","button");d.title=c;d.appendChild(e);y(d,"click",this.Vm,this);c=document.createElement("div");c.className=b+" ol-unselectable ol-control"+(this.c&&this.o?" ol-collapsed":"")+(this.o?"":" ol-uncollapsible");c.appendChild(this.I);c.appendChild(d);md.call(this,{element:c,render:a.render?
a.render:od,target:a.target});this.B=!0;this.l={};this.j={};this.T={}}v(nd,md);
function od(a){if(a=a.frameState){var b,c,d,e,f,g=a.layerStatesArray,h=tb({},a.attributions),l={},m={},n=a.viewState.projection;var p=0;for(b=g.length;p<b;p++)if(e=g[p].layer.ha()){var q=w(e).toString();if(f=e.j){var r=0;for(c=f.length;r<c;r++){var u=f[r];var x=w(u).toString();if(!(x in h)){if(d=a.usedTiles[q]){var B=e.Ta(n);a:{var E=void 0;var A,L=u,oa=B,ha=n;if(L.a){for(E in d)if(E in L.a){var B=d[E];var ga=0;for(A=L.a[E].length;ga<A;++ga){var z=L.a[E][ga];if(Ba(z,B)){E=!0;break a}var M=oc(oa,zc(ha),
parseInt(E,10)),ba=M.$-M.ca+1;if(B.ca<M.ca||B.$>M.$)if(Ba(z,new ya(Ia(B.ca,ba),Ia(B.$,ba),B.da,B.ia))||B.$-B.ca+1>ba&&Ba(z,M)){E=!0;break a}}}E=!1}else E=!0}}else E=!1;E?(x in l&&delete l[x],E=u.b,E in m||(m[E]=!0,h[x]=u)):l[x]=u}}}}b=[h,l];p=b[0];b=b[1];for(var da in this.l)da in p?(this.j[da]||(this.l[da].style.display="",this.j[da]=!0),delete p[da]):da in b?(this.j[da]&&(this.l[da].style.display="none",delete this.j[da]),delete b[da]):(ld(this.l[da]),delete this.l[da],delete this.j[da]);for(da in p)r=
document.createElement("LI"),r.innerHTML=p[da].b,this.I.appendChild(r),this.l[da]=r,this.j[da]=!0;for(da in b)r=document.createElement("LI"),r.innerHTML=b[da].b,r.style.display="none",this.I.appendChild(r),this.l[da]=r;da=!wb(this.j)||!wb(a.logos);this.B!=da&&(this.element.style.display=da?"":"none",this.B=da);da&&wb(this.j)?this.element.classList.add("ol-logo-only"):this.element.classList.remove("ol-logo-only");a=a.logos;da=this.T;for(ca in da)ca in a||(ld(da[ca]),delete da[ca]);for(var fb in a)if(b=
a[fb],b instanceof HTMLElement&&(this.u.appendChild(b),da[fb]=b),!(fb in da)){var ca=new Image;ca.src=fb;""===b?p=ca:(p=document.createElement("a"),p.href=b,p.appendChild(ca));this.u.appendChild(p);da[fb]=p}this.u.style.display=wb(a)?"none":""}else this.B&&(this.element.style.display="none",this.B=!1)}k=nd.prototype;k.Vm=function(a){a.preventDefault();pd(this)};function pd(a){a.element.classList.toggle("ol-collapsed");a.c?kd(a.D,a.C):kd(a.C,a.D);a.c=!a.c}k.Um=function(){return this.o};
k.Xm=function(a){this.o!==a&&(this.o=a,this.element.classList.toggle("ol-uncollapsible"),!a&&this.c&&pd(this))};k.Wm=function(a){this.o&&this.c!==a&&pd(this)};k.Tm=function(){return this.c};function qd(a){return Math.pow(a,3)}function rd(a){return 1-qd(1-a)}function sd(a){return 3*a*a-2*a*a*a}function td(a){return a};function ud(a){a=a?a:{};var b=void 0!==a.className?a.className:"ol-rotate",c=void 0!==a.label?a.label:"\u21e7";this.c=null;"string"===typeof c?(this.c=document.createElement("span"),this.c.className="ol-compass",this.c.textContent=c):(this.c=c,this.c.classList.add("ol-compass"));var d=a.tipLabel?a.tipLabel:"Reset rotation",c=document.createElement("button");c.className=b+"-reset";c.setAttribute("type","button");c.title=d;c.appendChild(this.c);y(c,"click",ud.prototype.D,this);d=document.createElement("div");
d.className=b+" ol-unselectable ol-control";d.appendChild(c);b=a.render?a.render:vd;this.o=a.resetNorth?a.resetNorth:void 0;md.call(this,{element:d,render:b,target:a.target});this.l=void 0!==a.duration?a.duration:250;this.j=void 0!==a.autoHide?a.autoHide:!0;this.u=void 0;this.j&&this.element.classList.add("ol-hidden")}v(ud,md);ud.prototype.D=function(a){a.preventDefault();this.o?this.o():(a=this.a.Z())&&void 0!==a.Qa()&&(0<this.l?a.animate({rotation:0,duration:this.l,easing:rd}):a.Oe(0))};
function vd(a){if(a=a.frameState){a=a.viewState.rotation;if(a!=this.u){var b="rotate("+a+"rad)";if(this.j){var c=this.element.classList.contains("ol-hidden");c||a?c&&a&&this.element.classList.remove("ol-hidden"):this.element.classList.add("ol-hidden")}this.c.style.msTransform=b;this.c.style.webkitTransform=b;this.c.style.transform=b}this.u=a}};function wd(a){a=a?a:{};var b=void 0!==a.className?a.className:"ol-zoom",c=void 0!==a.delta?a.delta:1,d=void 0!==a.zoomInLabel?a.zoomInLabel:"+",e=void 0!==a.zoomOutLabel?a.zoomOutLabel:"\u2212",f=void 0!==a.zoomInTipLabel?a.zoomInTipLabel:"Zoom in",g=void 0!==a.zoomOutTipLabel?a.zoomOutTipLabel:"Zoom out",h=document.createElement("button");h.className=b+"-in";h.setAttribute("type","button");h.title=f;h.appendChild("string"===typeof d?document.createTextNode(d):d);y(h,"click",wd.prototype.j.bind(this,
c));d=document.createElement("button");d.className=b+"-out";d.setAttribute("type","button");d.title=g;d.appendChild("string"===typeof e?document.createTextNode(e):e);y(d,"click",wd.prototype.j.bind(this,-c));c=document.createElement("div");c.className=b+" ol-unselectable ol-control";c.appendChild(h);c.appendChild(d);md.call(this,{element:c,target:a.target});this.c=void 0!==a.duration?a.duration:250}v(wd,md);
wd.prototype.j=function(a,b){b.preventDefault();if(b=this.a.Z()){var c=b.Pa();c&&(a=b.constrainResolution(c,a),0<this.c?(b.Ic()&&b.ed(),b.animate({resolution:a,duration:this.c,easing:rd})):b.Vc(a))}};function xd(a){a=a?a:{};var b=new Yc;(void 0!==a.zoom?a.zoom:1)&&b.push(new wd(a.zoomOptions));(void 0!==a.rotate?a.rotate:1)&&b.push(new ud(a.rotateOptions));(void 0!==a.attribution?a.attribution:1)&&b.push(new nd(a.attributionOptions));return b};function yd(a){a=a?a:{};this.c=void 0!==a.className?a.className:"ol-full-screen";var b=void 0!==a.label?a.label:"\u2922";this.o="string"===typeof b?document.createTextNode(b):b;b=void 0!==a.labelActive?a.labelActive:"\u00d7";this.l="string"===typeof b?document.createTextNode(b):b;var c=a.tipLabel?a.tipLabel:"Toggle full-screen",b=document.createElement("button");b.className=this.c+"-"+zd();b.setAttribute("type","button");b.title=c;b.appendChild(this.o);y(b,"click",this.C,this);c=document.createElement("div");
c.className=this.c+" ol-unselectable ol-control "+(Ad()?"":"ol-unsupported");c.appendChild(b);md.call(this,{element:c,target:a.target});this.D=void 0!==a.keys?a.keys:!1;this.j=a.source}v(yd,md);
yd.prototype.C=function(a){a.preventDefault();Ad()&&(a=this.a)&&(zd()?document.exitFullscreen?document.exitFullscreen():document.msExitFullscreen?document.msExitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitExitFullscreen&&document.webkitExitFullscreen():(a=this.j?"string"===typeof this.j?document.getElementById(this.j):this.j:a.jd(),this.D?a.mozRequestFullScreenWithKeys?a.mozRequestFullScreenWithKeys():a.webkitRequestFullscreen?a.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT):
Bd(a):Bd(a)))};yd.prototype.u=function(){var a=this.element.firstElementChild,b=this.a;zd()?(a.className=this.c+"-true",kd(this.l,this.o)):(a.className=this.c+"-false",kd(this.o,this.l));b&&b.Ad()};yd.prototype.setMap=function(a){md.prototype.setMap.call(this,a);a&&this.v.push(y(document,Cd(),this.u,this))};
function Ad(){var a=document.body;return!!(a.webkitRequestFullscreen||a.mozRequestFullScreen&&document.mozFullScreenEnabled||a.msRequestFullscreen&&document.msFullscreenEnabled||a.requestFullscreen&&document.fullscreenEnabled)}function zd(){return!!(document.webkitIsFullScreen||document.mozFullScreen||document.msFullscreenElement||document.fullscreenElement)}
function Bd(a){a.requestFullscreen?a.requestFullscreen():a.msRequestFullscreen?a.msRequestFullscreen():a.mozRequestFullScreen?a.mozRequestFullScreen():a.webkitRequestFullscreen&&a.webkitRequestFullscreen()}var Cd=function(){var a;return function(){if(!a){var b=document.body;b.webkitRequestFullscreen?a="webkitfullscreenchange":b.mozRequestFullScreen?a="mozfullscreenchange":b.msRequestFullscreen?a="MSFullscreenChange":b.requestFullscreen&&(a="fullscreenchange")}return a}}();function Dd(a){a=a?a:{};var b=document.createElement("DIV");b.className=void 0!==a.className?a.className:"ol-mouse-position";md.call(this,{element:b,render:a.render?a.render:Ed,target:a.target});y(this,Vc(Fd),this.Ym,this);a.coordinateFormat&&this.kj(a.coordinateFormat);a.projection&&this.$h(a.projection);this.u=void 0!==a.undefinedHTML?a.undefinedHTML:"";this.l=b.innerHTML;this.o=this.j=this.c=null}v(Dd,md);
function Ed(a){a=a.frameState;a?this.c!=a.viewState.projection&&(this.c=a.viewState.projection,this.j=null):this.c=null;Gd(this,this.o)}k=Dd.prototype;k.Ym=function(){this.j=null};k.xh=function(){return this.get(Hd)};k.Zh=function(){return this.get(Fd)};k.Ll=function(a){this.o=this.a.xe(a);Gd(this,this.o)};k.Ml=function(){Gd(this,null);this.o=null};k.setMap=function(a){md.prototype.setMap.call(this,a);a&&(a=a.a,this.v.push(y(a,"mousemove",this.Ll,this),y(a,"mouseout",this.Ml,this)))};
k.kj=function(a){this.set(Hd,a)};k.$h=function(a){this.set(Fd,Tb(a))};function Gd(a,b){var c=a.u;if(b&&a.c){if(!a.j){var d=a.Zh();a.j=d?Vb(a.c,d):fc}if(b=a.a.Wa(b))a.j(b,b),c=(c=a.xh())?c(b):b.toString()}a.l&&c==a.l||(a.element.innerHTML=c,a.l=c)}var Fd="projection",Hd="coordinateFormat";function Id(a,b,c){Oc.call(this,a);this.map=b;this.frameState=void 0!==c?c:null}v(Id,Oc);function Jd(a,b,c,d,e){Id.call(this,a,b,e);this.originalEvent=c;this.pixel=b.xe(c);this.coordinate=b.Wa(this.pixel);this.dragging=void 0!==d?d:!1}v(Jd,Id);Jd.prototype.preventDefault=function(){Id.prototype.preventDefault.call(this);this.originalEvent.preventDefault()};Jd.prototype.stopPropagation=function(){Id.prototype.stopPropagation.call(this);this.originalEvent.stopPropagation()};var Kd=["experimental-webgl","webgl","webkit-3d","moz-webgl"];function Ld(a,b){var c,d,e=Kd.length;for(d=0;d<e;++d)try{if(c=a.getContext(Kd[d],b))return c}catch(f){}return null};var Md,Nd="undefined"!==typeof navigator?navigator.userAgent.toLowerCase():"",Od=-1!==Nd.indexOf("firefox"),Pd=-1!==Nd.indexOf("safari")&&-1==Nd.indexOf("chrom"),Qd=-1!==Nd.indexOf("webkit")&&-1==Nd.indexOf("edge"),Rd=-1!==Nd.indexOf("macintosh"),Sd=window.devicePixelRatio||1,Td=!1,Ud=function(){if(!("HTMLCanvasElement"in window))return!1;try{var a=document.createElement("CANVAS").getContext("2d");return a?(void 0!==a.setLineDash&&(Td=!0),!0):!1}catch(b){return!1}}(),Vd="DeviceOrientationEvent"in
window,Wd="geolocation"in navigator,Xd="ontouchstart"in window,Yd="PointerEvent"in window,Zd=!!navigator.msPointerEnabled,$d=!1,ae,be=[];if("WebGLRenderingContext"in window)try{var ce=Ld(document.createElement("CANVAS"),{failIfMajorPerformanceCaveat:!0});ce&&($d=!0,ae=ce.getParameter(ce.MAX_TEXTURE_SIZE),be=ce.getSupportedExtensions())}catch(a){}Md=$d;fa=be;ea=ae;var de={Iq:"singleclick",xq:"click",yq:"dblclick",Bq:"pointerdrag",Eq:"pointermove",Aq:"pointerdown",Hq:"pointerup",Gq:"pointerover",Fq:"pointerout",Cq:"pointerenter",Dq:"pointerleave",zq:"pointercancel"};function ee(a,b,c,d,e){Jd.call(this,a,b,c.b,d,e);this.b=c}v(ee,Jd);function fe(a,b){this.b=a;this.f=b};function ge(a){fe.call(this,a,{mousedown:this.fm,mousemove:this.gm,mouseup:this.jm,mouseover:this.im,mouseout:this.hm});this.a=a.i;this.i=[]}v(ge,fe);function he(a,b){a=a.i;var c=b.clientX;b=b.clientY;for(var d=0,e=a.length,f;d<e&&(f=a[d]);d++){var g=Math.abs(b-f[1]);if(25>=Math.abs(c-f[0])&&25>=g)return!0}return!1}function ie(a){var b=je(a,a),c=b.preventDefault;b.preventDefault=function(){a.preventDefault();c()};b.pointerId=1;b.isPrimary=!0;b.pointerType="mouse";return b}k=ge.prototype;
k.fm=function(a){if(!he(this,a)){(1).toString()in this.a&&this.cancel(a);var b=ie(a);this.a[(1).toString()]=a;ke(this.b,"pointerdown",b,a)}};k.gm=function(a){if(!he(this,a)){var b=ie(a);ke(this.b,"pointermove",b,a)}};k.jm=function(a){if(!he(this,a)){var b=this.a[(1).toString()];b&&b.button===a.button&&(b=ie(a),ke(this.b,"pointerup",b,a),delete this.a[(1).toString()])}};k.im=function(a){if(!he(this,a)){var b=ie(a);le(this.b,b,a)}};k.hm=function(a){if(!he(this,a)){var b=ie(a);me(this.b,b,a)}};
k.cancel=function(a){var b=ie(a);this.b.cancel(b,a);delete this.a[(1).toString()]};function ne(a){fe.call(this,a,{MSPointerDown:this.om,MSPointerMove:this.pm,MSPointerUp:this.sm,MSPointerOut:this.qm,MSPointerOver:this.rm,MSPointerCancel:this.nm,MSGotPointerCapture:this.lm,MSLostPointerCapture:this.mm});this.a=a.i;this.i=["","unavailable","touch","pen","mouse"]}v(ne,fe);function oe(a,b){var c=b;"number"===typeof b.pointerType&&(c=je(b,b),c.pointerType=a.i[b.pointerType]);return c}k=ne.prototype;
k.om=function(a){this.a[a.pointerId.toString()]=a;var b=oe(this,a);ke(this.b,"pointerdown",b,a)};k.pm=function(a){var b=oe(this,a);ke(this.b,"pointermove",b,a)};k.sm=function(a){var b=oe(this,a);ke(this.b,"pointerup",b,a);delete this.a[a.pointerId.toString()]};k.qm=function(a){var b=oe(this,a);me(this.b,b,a)};k.rm=function(a){var b=oe(this,a);le(this.b,b,a)};k.nm=function(a){var b=oe(this,a);this.b.cancel(b,a);delete this.a[a.pointerId.toString()]};
k.mm=function(a){this.b.b(new pe("lostpointercapture",a,a))};k.lm=function(a){this.b.b(new pe("gotpointercapture",a,a))};function qe(a){fe.call(this,a,{pointerdown:this.ip,pointermove:this.jp,pointerup:this.mp,pointerout:this.kp,pointerover:this.lp,pointercancel:this.hp,gotpointercapture:this.ul,lostpointercapture:this.em})}v(qe,fe);k=qe.prototype;k.ip=function(a){re(this.b,a)};k.jp=function(a){re(this.b,a)};k.mp=function(a){re(this.b,a)};k.kp=function(a){re(this.b,a)};k.lp=function(a){re(this.b,a)};k.hp=function(a){re(this.b,a)};k.em=function(a){re(this.b,a)};k.ul=function(a){re(this.b,a)};function pe(a,b,c){Oc.call(this,a);this.b=b;a=c?c:{};this.buttons=se(a);this.pressure=te(a,this.buttons);this.bubbles="bubbles"in a?a.bubbles:!1;this.cancelable="cancelable"in a?a.cancelable:!1;this.view="view"in a?a.view:null;this.detail="detail"in a?a.detail:null;this.screenX="screenX"in a?a.screenX:0;this.screenY="screenY"in a?a.screenY:0;this.clientX="clientX"in a?a.clientX:0;this.clientY="clientY"in a?a.clientY:0;this.ctrlKey="ctrlKey"in a?a.ctrlKey:!1;this.altKey="altKey"in a?a.altKey:!1;this.shiftKey=
"shiftKey"in a?a.shiftKey:!1;this.metaKey="metaKey"in a?a.metaKey:!1;this.button="button"in a?a.button:0;this.relatedTarget="relatedTarget"in a?a.relatedTarget:null;this.pointerId="pointerId"in a?a.pointerId:0;this.width="width"in a?a.width:0;this.height="height"in a?a.height:0;this.tiltX="tiltX"in a?a.tiltX:0;this.tiltY="tiltY"in a?a.tiltY:0;this.pointerType="pointerType"in a?a.pointerType:"";this.isPrimary="isPrimary"in a?a.isPrimary:!1;b.preventDefault&&(this.preventDefault=function(){b.preventDefault()})}
v(pe,Oc);function se(a){if(a.buttons||ue)a=a.buttons;else switch(a.which){case 1:a=1;break;case 2:a=4;break;case 3:a=2;break;default:a=0}return a}function te(a,b){var c=0;a.pressure?c=a.pressure:c=b?.5:0;return c}var ue=!1;try{ue=1===(new MouseEvent("click",{buttons:1})).buttons}catch(a){};function ve(a,b){fe.call(this,a,{touchstart:this.rq,touchmove:this.qq,touchend:this.pq,touchcancel:this.oq});this.a=a.i;this.j=b;this.i=void 0;this.g=0;this.c=void 0}v(ve,fe);k=ve.prototype;k.ij=function(){this.g=0;this.c=void 0};
function we(a,b,c){b=je(b,c);b.pointerId=c.identifier+2;b.bubbles=!0;b.cancelable=!0;b.detail=a.g;b.button=0;b.buttons=1;b.width=c.webkitRadiusX||c.radiusX||0;b.height=c.webkitRadiusY||c.radiusY||0;b.pressure=c.webkitForce||c.force||.5;b.isPrimary=a.i===c.identifier;b.pointerType="touch";b.clientX=c.clientX;b.clientY=c.clientY;b.screenX=c.screenX;b.screenY=c.screenY;return b}
function xe(a,b,c){function d(){b.preventDefault()}var e=Array.prototype.slice.call(b.changedTouches),f=e.length,g;for(g=0;g<f;++g){var h=we(a,b,e[g]);h.preventDefault=d;c.call(a,b,h)}}
k.rq=function(a){var b=a.touches,c=Object.keys(this.a),d=c.length;if(d>=b.length){var e=[],f;for(f=0;f<d;++f){var g=c[f];var h=this.a[g];var l;if(!(l=1==g))a:{for(var m=b.length,n=0;n<m;n++)if(l=b[n],l.identifier===g-2){l=!0;break a}l=!1}l||e.push(h.out)}for(f=0;f<e.length;++f)this.Kf(a,e[f])}b=a.changedTouches[0];c=Object.keys(this.a).length;if(!c||1===c&&(1).toString()in this.a)this.i=b.identifier,void 0!==this.c&&clearTimeout(this.c);ye(this,a);this.g++;xe(this,a,this.cp)};
k.cp=function(a,b){this.a[b.pointerId]={target:b.target,out:b,Wi:b.target};var c=this.b;b.bubbles=!0;ke(c,"pointerover",b,a);c=this.b;b.bubbles=!1;ke(c,"pointerenter",b,a);ke(this.b,"pointerdown",b,a)};k.qq=function(a){a.preventDefault();xe(this,a,this.km)};
k.km=function(a,b){var c=this.a[b.pointerId];if(c){var d=c.out,e=c.Wi;ke(this.b,"pointermove",b,a);d&&e!==b.target&&(d.relatedTarget=b.target,b.relatedTarget=e,d.target=e,b.target?(me(this.b,d,a),le(this.b,b,a)):(b.target=e,b.relatedTarget=null,this.Kf(a,b)));c.out=b;c.Wi=b.target}};k.pq=function(a){ye(this,a);xe(this,a,this.sq)};
k.sq=function(a,b){ke(this.b,"pointerup",b,a);this.b.out(b,a);ze(this.b,b,a);delete this.a[b.pointerId];b.isPrimary&&(this.i=void 0,this.c=setTimeout(this.ij.bind(this),200))};k.oq=function(a){xe(this,a,this.Kf)};k.Kf=function(a,b){this.b.cancel(b,a);this.b.out(b,a);ze(this.b,b,a);delete this.a[b.pointerId];b.isPrimary&&(this.i=void 0,this.c=setTimeout(this.ij.bind(this),200))};
function ye(a,b){var c=a.j.i;b=b.changedTouches[0];if(a.i===b.identifier){var d=[b.clientX,b.clientY];c.push(d);setTimeout(function(){ma(c,d)},2500)}};function Ae(a){Qc.call(this);this.g=a;this.i={};this.f={};this.a=[];Yd?Be(this,new qe(this)):Zd?Be(this,new ne(this)):(a=new ge(this),Be(this,a),Xd&&Be(this,new ve(this,a)));a=this.a.length;for(var b,c=0;c<a;c++)b=this.a[c],Ce(this,Object.keys(b.f))}v(Ae,Qc);function Be(a,b){var c=Object.keys(b.f);c&&(c.forEach(function(a){var c=b.f[a];c&&(this.f[a]=c.bind(b))},a),a.a.push(b))}Ae.prototype.c=function(a){var b=this.f[a.type];b&&b(a)};
function Ce(a,b){b.forEach(function(a){y(this.g,a,this.c,this)},a)}function De(a,b){b.forEach(function(a){Kc(this.g,a,this.c,this)},a)}function je(a,b){for(var c={},d,e=0,f=Ee.length;e<f;e++)d=Ee[e][0],c[d]=a[d]||b[d]||Ee[e][1];return c}function ze(a,b,c){b.bubbles=!1;ke(a,"pointerleave",b,c)}Ae.prototype.out=function(a,b){a.bubbles=!0;ke(this,"pointerout",a,b)};Ae.prototype.cancel=function(a,b){ke(this,"pointercancel",a,b)};
function me(a,b,c){a.out(b,c);var d=b.target,e=b.relatedTarget;d&&e&&d.contains(e)||ze(a,b,c)}function le(a,b,c){b.bubbles=!0;ke(a,"pointerover",b,c);var d=b.target,e=b.relatedTarget;d&&e&&d.contains(e)||(b.bubbles=!1,ke(a,"pointerenter",b,c))}function ke(a,b,c,d){a.b(new pe(b,d,c))}function re(a,b){a.b(new pe(b.type,b,b))}Ae.prototype.ka=function(){for(var a=this.a.length,b,c=0;c<a;c++)b=this.a[c],De(this,Object.keys(b.f));Qc.prototype.ka.call(this)};
var Ee=[["bubbles",!1],["cancelable",!1],["view",null],["detail",null],["screenX",0],["screenY",0],["clientX",0],["clientY",0],["ctrlKey",!1],["altKey",!1],["shiftKey",!1],["metaKey",!1],["button",0],["relatedTarget",null],["buttons",0],["pointerId",0],["width",0],["height",0],["pressure",0],["tiltX",0],["tiltY",0],["pointerType",""],["hwTimestamp",0],["isPrimary",!1],["type",""],["target",null],["currentTarget",null],["which",0]];function Fe(a,b){Qc.call(this);this.i=a;this.j=0;this.o=!1;this.f=[];this.D=b?b*Sd:Sd;this.c=null;a=this.i.a;this.S=0;this.u={};this.g=new Ae(a);this.a=null;this.l=y(this.g,"pointerdown",this.Ol,this);this.v=y(this.g,"pointermove",this.Lp,this)}v(Fe,Qc);function Ge(a,b){var c=new ee("click",a.i,b);a.b(c);a.j?(clearTimeout(a.j),a.j=0,c=new ee("dblclick",a.i,b),a.b(c)):a.j=setTimeout(function(){this.j=0;var a=new ee("singleclick",this.i,b);this.b(a)}.bind(a),250)}
function He(a,b){"pointerup"==b.type||"pointercancel"==b.type?delete a.u[b.pointerId]:"pointerdown"==b.type&&(a.u[b.pointerId]=!0);a.S=Object.keys(a.u).length}k=Fe.prototype;k.Jh=function(a){He(this,a);var b=new ee("pointerup",this.i,a);this.b(b);this.o||a.button||Ge(this,this.c);this.S||(this.f.forEach(Ec),this.f.length=0,this.o=!1,this.c=null,Nc(this.a),this.a=null)};
k.Ol=function(a){He(this,a);var b=new ee("pointerdown",this.i,a);this.b(b);this.c=a;this.f.length||(this.a=new Ae(document),this.f.push(y(this.a,"pointermove",this.Hm,this),y(this.a,"pointerup",this.Jh,this),y(this.g,"pointercancel",this.Jh,this)))};k.Hm=function(a){if(Ie(this,a)){this.o=!0;var b=new ee("pointerdrag",this.i,a,this.o);this.b(b)}a.preventDefault()};k.Lp=function(a){this.b(new ee(a.type,this.i,a,!(!this.c||!Ie(this,a))))};
function Ie(a,b){return Math.abs(b.clientX-a.c.clientX)>a.D||Math.abs(b.clientY-a.c.clientY)>a.D}k.ka=function(){this.v&&(Ec(this.v),this.v=null);this.l&&(Ec(this.l),this.l=null);this.f.forEach(Ec);this.f.length=0;this.a&&(Nc(this.a),this.a=null);this.g&&(Nc(this.g),this.g=null);Qc.prototype.ka.call(this)};function Ke(a,b){this.l=a;this.c=b;this.b=[];this.i=[];this.a={}}Ke.prototype.clear=function(){this.b.length=0;this.i.length=0;ub(this.a)};function Le(a){var b=a.b,c=a.i,d=b[0];1==b.length?(b.length=0,c.length=0):(b[0]=b.pop(),c[0]=c.pop(),Me(a,0));b=a.c(d);delete a.a[b];return d}Ke.prototype.f=function(a){xa(!(this.c(a)in this.a),31);var b=this.l(a);return Infinity!=b?(this.b.push(a),this.i.push(b),this.a[this.c(a)]=!0,Ne(this,0,this.b.length-1),!0):!1};
function Me(a,b){for(var c=a.b,d=a.i,e=c.length,f=c[b],g=d[b],h=b;b<e>>1;){var l=2*b+1,m=2*b+2,l=m<e&&d[m]<d[l]?m:l;c[b]=c[l];d[b]=d[l];b=l}c[b]=f;d[b]=g;Ne(a,h,b)}function Ne(a,b,c){var d=a.b;a=a.i;for(var e=d[c],f=a[c];c>b;){var g=c-1>>1;if(a[g]>f)d[c]=d[g],a[c]=a[g],c=g;else break}d[c]=e;a[c]=f}
function Oe(a){var b=a.l,c=a.b,d=a.i,e=0,f=c.length,g;for(g=0;g<f;++g){var h=c[g];var l=b(h);Infinity==l?delete a.a[a.c(h)]:(d[e]=l,c[e++]=h)}c.length=e;d.length=e;for(b=(a.b.length>>1)-1;0<=b;b--)Me(a,b)};function Pe(a,b){Ke.call(this,function(b){return a.apply(null,b)},function(a){return a[0].bb()});this.v=b;this.j=0;this.g={}}v(Pe,Ke);Pe.prototype.f=function(a){var b=Ke.prototype.f.call(this,a);b&&y(a[0],"change",this.o,this);return b};Pe.prototype.o=function(a){a=a.target;var b=a.getState();if(2===b||3===b||4===b||5===b)Kc(a,"change",this.o,this),a=a.bb(),a in this.g&&(delete this.g[a],--this.j),this.v()};
function Qe(a,b,c){for(var d=0,e,f;a.j<b&&d<c&&0<a.b.length;)e=Le(a)[0],f=e.bb(),0!==e.getState()||f in a.g||(a.g[f]=!0,++a.j,++d,e.load())};function Re(a){return function(b,c,d){if(void 0!==b)return b=ka(a,b,d),b=Ca(b+c,0,a.length-1),c=Math.floor(b),b!=c&&c<a.length-1?a[c]/Math.pow(a[c]/a[c+1],b-c):a[c]}}function Se(a,b,c){return function(d,e,f){if(void 0!==d)return d=Math.max(Math.floor(Math.log(b/d)/Math.log(a)+(-f/2+.5))+e,0),void 0!==c&&(d=Math.min(d,c)),b/Math.pow(a,d)}};function Te(a){if(void 0!==a)return 0}function Ue(a,b){if(void 0!==a)return a+b}function Ve(a){var b=2*Math.PI/a;return function(a,d){if(void 0!==a)return a=Math.floor((a+d)/b+.5)*b}}function We(){var a=Ha(5);return function(b,c){if(void 0!==b)return Math.abs(b+c)<=a?0:b+c}};function Xe(a,b){a=void 0!==b?a.toFixed(b):""+a;b=a.indexOf(".");b=-1===b?a.length:b;return 2<b?a:Array(3-b).join("0")+a}function Ye(a){a=(""+a).split(".");for(var b=["1","3"],c=0;c<Math.max(a.length,b.length);c++){var d=parseInt(a[c]||"0",10),e=parseInt(b[c]||"0",10);if(d>e)return 1;if(e>d)return-1}return 0};function Ze(a,b){a[0]+=b[0];a[1]+=b[1];return a}function $e(a,b){var c=b.pd(),d=b.wa();b=d[0];var d=d[1],e=a[0]-b;a=a[1]-d;e||a||(e=1);var f=Math.sqrt(e*e+a*a);return[b+c*e/f,d+c*a/f]}function af(a,b){var c=a[0];a=a[1];var d=b[0],e=b[1];b=d[0];var d=d[1],f=e[0],e=e[1],g=f-b,h=e-d,c=g||h?(g*(c-b)+h*(a-d))/(g*g+h*h||0):0;0>=c?(a=b,c=d):1<=c?(a=f,c=e):(a=b+c*g,c=d+c*h);return[a,c]}
function bf(a,b,c){b=Ia(b+180,360)-180;var d=Math.abs(3600*b);c=c||0;var e=Math.pow(10,c),f=Math.floor(d/3600),g=Math.floor((d-3600*f)/60),d=Math.ceil((d-3600*f-60*g)*e)/e;60<=d&&(d=0,g+=1);60<=g&&(g=0,f+=1);return f+"\u00b0 "+Xe(g)+"\u2032 "+Xe(d,c)+"\u2033"+(b?" "+a.charAt(0>b?1:0):"")}function cf(a,b,c){return a?b.replace("{x}",a[0].toFixed(c)).replace("{y}",a[1].toFixed(c)):""}function df(a,b){for(var c=!0,d=a.length-1;0<=d;--d)if(a[d]!=b[d]){c=!1;break}return c}
function ef(a,b){var c=Math.cos(b);b=Math.sin(b);var d=a[1]*c+a[0]*b;a[0]=a[0]*c-a[1]*b;a[1]=d;return a}function gf(a,b){a[0]*=b;a[1]*=b}function hf(a,b){var c=a[0]-b[0];a=a[1]-b[1];return c*c+a*a}function jf(a,b){return Math.sqrt(hf(a,b))}function kf(a,b){return hf(a,af(a,b))}function lf(a,b){return cf(a,"{x}, {y}",b)};function mf(){return!0}function nf(){return!1};function of(){Tc.call(this);this.l=Oa();this.v=-1;this.f={};this.o=this.g=0}v(of,Tc);k=of.prototype;k.Ab=function(a,b){b=b?b:[NaN,NaN];this.Kb(a[0],a[1],b,Infinity);return b};k.sb=function(a){return this.Mc(a[0],a[1])};k.Mc=nf;k.G=function(a){this.v!=this.i&&(this.l=this.se(this.l),this.v=this.i);var b=this.l;a?(a[0]=b[0],a[1]=b[1],a[2]=b[2],a[3]=b[3]):a=b;return a};k.Rb=function(a){return this.Vd(a*a)};k.tb=function(a,b){this.Dc(ec(a,b));return this};function pf(a,b,c,d,e,f){for(var g=f?f:[],h=0;b<c;b+=d){var l=a[b],m=a[b+1];g[h++]=e[0]*l+e[2]*m+e[4];g[h++]=e[1]*l+e[3]*m+e[5]}f&&g.length!=h&&(g.length=h);return g}function qf(a,b,c,d,e,f,g){for(var h=g?g:[],l=0,m;b<c;b+=d)for(h[l++]=a[b]+e,h[l++]=a[b+1]+f,m=b+2;m<b+d;++m)h[l++]=a[m];g&&h.length!=l&&(h.length=l);return h};function rf(){of.call(this);this.ja="XY";this.a=2;this.A=null}v(rf,of);function sf(a){var b;"XY"==a?b=2:"XYZ"==a||"XYM"==a?b=3:"XYZM"==a&&(b=4);return b}k=rf.prototype;k.Mc=nf;k.se=function(a){return $a(this.A,0,this.A.length,this.a,a)};k.ac=function(){return this.A.slice(0,this.a)};k.ga=function(){return this.A};k.bc=function(){return this.A.slice(this.A.length-this.a)};k.cc=function(){return this.ja};
k.Vd=function(a){this.o!=this.i&&(ub(this.f),this.g=0,this.o=this.i);if(0>a||this.g&&a<=this.g)return this;var b=a.toString();if(this.f.hasOwnProperty(b))return this.f[b];var c=this.hd(a);if(c.ga().length<this.A.length)return this.f[b]=c;this.g=a;return this};k.hd=function(){return this};k.qa=function(){return this.a};function tf(a,b,c){a.a=sf(b);a.ja=b;a.A=c}
function uf(a,b,c,d){if(b)c=sf(b);else{for(b=0;b<d;++b)if(c.length)c=c[0];else{a.ja="XY";a.a=2;return}c=c.length;var e;2==c?e="XY":3==c?e="XYZ":4==c&&(e="XYZM");b=e}a.ja=b;a.a=c}k.Dc=function(a){this.A&&(a(this.A,this.A,this.a),this.s())};
k.rotate=function(a,b){var c=this.ga();if(c){var d=c.length,e=this.qa(),f=c?c:[],g=Math.cos(a);a=Math.sin(a);var h=b[0];b=b[1];for(var l=0,m=0;m<d;m+=e){var n=c[m]-h,p=c[m+1]-b;f[l++]=h+n*g-p*a;f[l++]=b+n*a+p*g;for(n=m+2;n<m+e;++n)f[l++]=c[n]}c&&f.length!=l&&(f.length=l);this.s()}};
k.scale=function(a,b,c){var d=b;void 0===d&&(d=a);var e=c;e||(e=nb(this.G()));if(c=this.ga()){b=c.length;for(var f=this.qa(),g=c?c:[],h=e[0],e=e[1],l=0,m=0;m<b;m+=f){var n=c[m]-h,p=c[m+1]-e;g[l++]=h+a*n;g[l++]=e+d*p;for(n=m+2;n<m+f;++n)g[l++]=c[n]}c&&g.length!=l&&(g.length=l);this.s()}};k.translate=function(a,b){var c=this.ga();c&&(qf(c,0,c.length,this.qa(),a,b,c),this.s())};function vf(a,b,c,d){for(var e=0,f=a[c-d],g=a[c-d+1];b<c;b+=d)var h=a[b],l=a[b+1],e=e+(g*h-f*l),f=h,g=l;return e/2}function wf(a,b,c,d){var e=0,f;var g=0;for(f=c.length;g<f;++g){var h=c[g],e=e+vf(a,b,h,d);b=h}return e};function xf(a,b,c,d,e,f,g){var h=a[b],l=a[b+1],m=a[c]-h,n=a[c+1]-l;if(m||n)if(f=((e-h)*m+(f-l)*n)/(m*m+n*n),1<f)b=c;else if(0<f){for(e=0;e<d;++e)g[e]=Ja(a[b+e],a[c+e],f);g.length=d;return}for(e=0;e<d;++e)g[e]=a[b+e];g.length=d}function yf(a,b,c,d,e){var f=a[b],g=a[b+1];for(b+=d;b<c;b+=d){var h=a[b],l=a[b+1],f=Ga(f,g,h,l);f>e&&(e=f);f=h;g=l}return e}function zf(a,b,c,d,e){var f;var g=0;for(f=c.length;g<f;++g){var h=c[g];e=yf(a,b,h,d,e);b=h}return e}
function Af(a,b,c,d,e,f,g,h,l,m,n){if(b==c)return m;if(!e){var p=Ga(g,h,a[b],a[b+1]);if(p<m){for(n=0;n<d;++n)l[n]=a[b+n];l.length=d;return p}return m}for(var q=n?n:[NaN,NaN],r=b+d;r<c;)if(xf(a,r-d,r,d,g,h,q),p=Ga(g,h,q[0],q[1]),p<m){m=p;for(n=0;n<d;++n)l[n]=q[n];l.length=d;r+=d}else r+=d*Math.max((Math.sqrt(p)-Math.sqrt(m))/e|0,1);if(f&&(xf(a,c-d,b,d,g,h,q),p=Ga(g,h,q[0],q[1]),p<m)){m=p;for(n=0;n<d;++n)l[n]=q[n];l.length=d}return m}
function Bf(a,b,c,d,e,f,g,h,l,m,n){n=n?n:[NaN,NaN];var p;var q=0;for(p=c.length;q<p;++q){var r=c[q];m=Af(a,b,r,d,e,f,g,h,l,m,n);b=r}return m};function Cf(a,b){var c=0,d;var e=0;for(d=b.length;e<d;++e)a[c++]=b[e];return c}function Df(a,b,c,d){var e;var f=0;for(e=c.length;f<e;++f){var g=c[f],h;for(h=0;h<d;++h)a[b++]=g[h]}return b}function Ef(a,b,c,d,e){e=e?e:[];var f=0,g;var h=0;for(g=c.length;h<g;++h)b=Df(a,b,c[h],d),e[f++]=b;e.length=f;return e};function Ff(a,b,c,d,e){e=void 0!==e?e:[];for(var f=0;b<c;b+=d)e[f++]=a.slice(b,b+d);e.length=f;return e}function Gf(a,b,c,d,e){e=void 0!==e?e:[];var f=0,g;var h=0;for(g=c.length;h<g;++h){var l=c[h];e[f++]=Ff(a,b,l,d,e[f]);b=l}e.length=f;return e};function Hf(a,b,c,d,e,f,g){var h=(c-b)/d;if(3>h){for(;b<c;b+=d)f[g++]=a[b],f[g++]=a[b+1];return g}var l=Array(h);l[0]=1;l[h-1]=1;c=[b,c-d];for(var m=0,n;0<c.length;){var p=c.pop(),q=c.pop(),r=0,u=a[q],x=a[q+1],B=a[p],E=a[p+1];for(n=q+d;n<p;n+=d){var A=Fa(a[n],a[n+1],u,x,B,E);A>r&&(m=n,r=A)}r>e&&(l[(m-b)/d]=1,q+d<m&&c.push(q,m),m+d<p&&c.push(m,p))}for(n=0;n<h;++n)l[n]&&(f[g++]=a[b+n*d],f[g++]=a[b+n*d+1]);return g}
function If(a,b,c,d,e,f,g,h){var l;var m=0;for(l=c.length;m<l;++m){var n=c[m];a:{var p=a,q=n,r=d,u=e,x=f,B=g;if(b!=q){var E=u*Math.round(p[b]/u),A=u*Math.round(p[b+1]/u);b+=r;x[B++]=E;x[B++]=A;do{var L=u*Math.round(p[b]/u);g=u*Math.round(p[b+1]/u);b+=r;if(b==q){x[B++]=L;x[B++]=g;g=B;break a}}while(L==E&&g==A);for(;b<q;){var oa=u*Math.round(p[b]/u);var ha=u*Math.round(p[b+1]/u);b+=r;if(oa!=L||ha!=g){var ga=L-E,z=g-A,M=oa-E,ba=ha-A;ga*ba==z*M&&(0>ga&&M<ga||ga==M||0<ga&&M>ga)&&(0>z&&ba<z||z==ba||0<z&&
ba>z)||(x[B++]=L,x[B++]=g,E=L,A=g);L=oa;g=ha}}x[B++]=L;x[B++]=g}g=B}h.push(g);b=n}return g};function Jf(a,b){rf.call(this);this.c=this.j=-1;this.ma(a,b)}v(Jf,rf);k=Jf.prototype;k.clone=function(){var a=new Jf(null);Kf(a,this.ja,this.A.slice());return a};k.Kb=function(a,b,c,d){if(d<Sa(this.G(),a,b))return d;this.c!=this.i&&(this.j=Math.sqrt(yf(this.A,0,this.A.length,this.a,0)),this.c=this.i);return Af(this.A,0,this.A.length,this.a,this.j,!0,a,b,c,d)};k.qn=function(){return vf(this.A,0,this.A.length,this.a)};k.X=function(){return Ff(this.A,0,this.A.length,this.a)};
k.hd=function(a){var b=[];b.length=Hf(this.A,0,this.A.length,this.a,a,b,0);a=new Jf(null);Kf(a,"XY",b);return a};k.U=function(){return"LinearRing"};k.Xa=function(){};k.ma=function(a,b){a?(uf(this,b,a,1),this.A||(this.A=[]),this.A.length=Df(this.A,0,a,this.a),this.s()):Kf(this,"XY",null)};function Kf(a,b,c){tf(a,b,c);a.s()};function C(a,b){rf.call(this);this.ma(a,b)}v(C,rf);k=C.prototype;k.clone=function(){var a=new C(null);a.ba(this.ja,this.A.slice());return a};k.Kb=function(a,b,c,d){var e=this.A;a=Ga(a,b,e[0],e[1]);if(a<d){d=this.a;for(b=0;b<d;++b)c[b]=e[b];c.length=d;return a}return d};k.X=function(){return this.A?this.A.slice():[]};k.se=function(a){return Za(this.A,a)};k.U=function(){return"Point"};k.Xa=function(a){return Ua(a,this.A[0],this.A[1])};
k.ma=function(a,b){a?(uf(this,b,a,0),this.A||(this.A=[]),this.A.length=Cf(this.A,a),this.s()):this.ba("XY",null)};k.ba=function(a,b){tf(this,a,b);this.s()};function Lf(a,b,c,d,e){return!db(e,function(e){return!Mf(a,b,c,d,e[0],e[1])})}function Mf(a,b,c,d,e,f){for(var g=0,h=a[c-d],l=a[c-d+1];b<c;b+=d){var m=a[b],n=a[b+1];l<=f?n>f&&0<(m-h)*(f-l)-(e-h)*(n-l)&&g++:n<=f&&0>(m-h)*(f-l)-(e-h)*(n-l)&&g--;h=m;l=n}return!!g}function Nf(a,b,c,d,e,f){if(!c.length||!Mf(a,b,c[0],d,e,f))return!1;var g;b=1;for(g=c.length;b<g;++b)if(Mf(a,c[b-1],c[b],d,e,f))return!1;return!0};function Of(a,b,c,d,e,f,g){var h,l=e[f+1],m=[],n=c[0];var p=a[n-d];var q=a[n-d+1];for(h=b;h<n;h+=d){var r=a[h];var u=a[h+1];if(l<=q&&u<=l||q<=l&&l<=u)p=(l-q)/(u-q)*(r-p)+p,m.push(p);p=r;q=u}n=NaN;q=-Infinity;m.sort(ia);p=m[0];h=1;for(u=m.length;h<u;++h){r=m[h];var x=Math.abs(r-p);x>q&&(p=(p+r)/2,Nf(a,b,c,d,p,l)&&(n=p,q=x));p=r}isNaN(n)&&(n=e[f]);return g?(g.push(n,l),g):[n,l]};function Pf(a,b,c,d,e,f){for(var g=[a[b],a[b+1]],h=[],l;b+d<c;b+=d){h[0]=a[b+d];h[1]=a[b+d+1];if(l=e.call(f,g,h))return l;g[0]=h[0];g[1]=h[1]}return!1};function Qf(a,b,c,d,e){var f=ab(Oa(),a,b,c,d);return qb(e,f)?Va(e,f)||f[0]>=e[0]&&f[2]<=e[2]||f[1]>=e[1]&&f[3]<=e[3]?!0:Pf(a,b,c,d,function(a,b){var c=!1,d=Wa(e,a),f=Wa(e,b);if(1===d||1===f)c=!0;else{var g=e[0],h=e[1],r=e[2],u=e[3],x=b[0];b=b[1];a=(b-a[1])/(x-a[0]);f&2&&!(d&2)&&(c=x-(b-u)/a,c=c>=g&&c<=r);c||!(f&4)||d&4||(c=b-(x-r)*a,c=c>=h&&c<=u);c||!(f&8)||d&8||(c=x-(b-h)/a,c=c>=g&&c<=r);c||!(f&16)||d&16||(c=b-(x-g)*a,c=c>=h&&c<=u)}return c}):!1}
function Rf(a,b,c,d,e){var f=c[0];if(!(Qf(a,b,f,d,e)||Mf(a,b,f,d,e[0],e[1])||Mf(a,b,f,d,e[0],e[3])||Mf(a,b,f,d,e[2],e[1])||Mf(a,b,f,d,e[2],e[3])))return!1;if(1===c.length)return!0;b=1;for(f=c.length;b<f;++b)if(Lf(a,c[b-1],c[b],d,e))return!1;return!0};function Sf(a,b,c,d){for(var e=0,f=a[c-d],g=a[c-d+1];b<c;b+=d)var h=a[b],l=a[b+1],e=e+(h-f)*(l+g),f=h,g=l;return 0<e}function Tf(a,b,c,d){var e=0;d=void 0!==d?d:!1;var f;var g=0;for(f=b.length;g<f;++g){var h=b[g],e=Sf(a,e,h,c);if(!g){if(d&&e||!d&&!e)return!1}else if(d&&!e||!d&&e)return!1;e=h}return!0}
function Uf(a,b,c,d,e){e=void 0!==e?e:!1;var f;var g=0;for(f=c.length;g<f;++g){var h=c[g],l=Sf(a,b,h,d);if(g?e&&!l||!e&&l:e&&l||!e&&!l)for(var l=a,m=h,n=d;b<m-n;){var p;for(p=0;p<n;++p){var q=l[b+p];l[b+p]=l[m-n+p];l[m-n+p]=q}b+=n;m-=n}b=h}return b}function Vf(a,b,c,d){var e=0,f;var g=0;for(f=b.length;g<f;++g)e=Uf(a,e,b[g],c,d);return e};function D(a,b){rf.call(this);this.c=[];this.u=-1;this.D=null;this.I=this.C=this.B=-1;this.j=null;this.ma(a,b)}v(D,rf);k=D.prototype;k.pk=function(a){this.A?la(this.A,a.ga()):this.A=a.ga().slice();this.c.push(this.A.length);this.s()};k.clone=function(){var a=new D(null);a.ba(this.ja,this.A.slice(),this.c.slice());return a};
k.Kb=function(a,b,c,d){if(d<Sa(this.G(),a,b))return d;this.C!=this.i&&(this.B=Math.sqrt(zf(this.A,0,this.c,this.a,0)),this.C=this.i);return Bf(this.A,0,this.c,this.a,this.B,!0,a,b,c,d)};k.Mc=function(a,b){return Nf(this.ec(),0,this.c,this.a,a,b)};k.tn=function(){return wf(this.ec(),0,this.c,this.a)};k.X=function(a){if(void 0!==a){var b=this.ec().slice();Uf(b,0,this.c,this.a,a)}else b=this.A;return Gf(b,0,this.c,this.a)};k.Bb=function(){return this.c};
function Wf(a){if(a.u!=a.i){var b=nb(a.G());a.D=Of(a.ec(),0,a.c,a.a,b,0);a.u=a.i}return a.D}k.Tk=function(){return new C(Wf(this))};k.Zk=function(){return this.c.length};k.Ch=function(a){if(0>a||this.c.length<=a)return null;var b=new Jf(null);Kf(b,this.ja,this.A.slice(a?this.c[a-1]:0,this.c[a]));return b};k.Sd=function(){var a=this.ja,b=this.A,c=this.c,d=[],e=0,f;var g=0;for(f=c.length;g<f;++g){var h=c[g],l=new Jf(null);Kf(l,a,b.slice(e,h));d.push(l);e=h}return d};
k.ec=function(){if(this.I!=this.i){var a=this.A;Tf(a,this.c,this.a)?this.j=a:(this.j=a.slice(),this.j.length=Uf(this.j,0,this.c,this.a));this.I=this.i}return this.j};k.hd=function(a){var b=[],c=[];b.length=If(this.A,0,this.c,this.a,Math.sqrt(a),b,0,c);a=new D(null);a.ba("XY",b,c);return a};k.U=function(){return"Polygon"};k.Xa=function(a){return Rf(this.ec(),0,this.c,this.a,a)};
k.ma=function(a,b){a?(uf(this,b,a,2),this.A||(this.A=[]),a=Ef(this.A,0,a,this.a,this.c),this.A.length=a.length?a[a.length-1]:0,this.s()):this.ba("XY",null,this.c)};k.ba=function(a,b,c){tf(this,a,b);this.c=c;this.s()};function Xf(a,b,c,d){var e=d?d:32;d=[];var f;for(f=0;f<e;++f)la(d,a.offset(b,c,2*Math.PI*f/e));d.push(d[0],d[1]);a=new D(null);a.ba("XY",d,[d.length]);return a}function Yf(a){var b=a[0],c=a[1],d=a[2];a=a[3];b=[b,c,b,a,d,a,d,c,b,c];c=new D(null);c.ba("XY",b,[b.length]);return c}
function Zf(a,b,c){var d=b?b:32,e=a.qa();b=a.ja;for(var f=new D(null,b),d=e*(d+1),e=Array(d),g=0;g<d;g++)e[g]=0;f.ba(b,e,[e.length]);$f(f,a.wa(),a.pd(),c);return f}function $f(a,b,c,d){var e=a.ga(),f=a.ja,g=a.qa(),h=a.Bb(),l=e.length/g-1;d=d?d:0;for(var m,n,p=0;p<=l;++p)n=p*g,m=d+2*Ia(p,l)*Math.PI/l,e[n]=b[0]+c*Math.cos(m),e[n+1]=b[1]+c*Math.sin(m);a.ba(f,e,h)};function F(a){Tc.call(this);a=tb({},a);this.o=[0,0];this.c=[];this.wf=this.wf.bind(this);this.v=$b(a.projection);ag(this,a)}v(F,Tc);
function ag(a,b){var c={};c.center=void 0!==b.center?b.center:null;var d=void 0!==b.minZoom?b.minZoom:0;var e=void 0!==b.maxZoom?b.maxZoom:28;var f=void 0!==b.zoomFactor?b.zoomFactor:2;if(void 0!==b.resolutions){e=b.resolutions;var g=e[0];var h=e[e.length-1];e=Re(e)}else{g=$b(b.projection);h=g.G();var l=(h?Math.max(lb(h),mb(h)):360*zb.degrees/g.sc())/256/Math.pow(2,0),m=l/Math.pow(2,28);g=b.maxResolution;void 0!==g?d=0:g=l/Math.pow(f,d);h=b.minResolution;void 0===h&&(h=void 0!==b.maxZoom?void 0!==
b.maxResolution?g/Math.pow(f,e):l/Math.pow(f,e):m);e=d+Math.floor(Math.log(g/h)/Math.log(f));h=g/Math.pow(f,e-d);e=Se(f,g,e-d)}a.a=g;a.f=h;a.C=f;a.j=b.resolutions;a.l=d;(void 0!==b.enableRotation?b.enableRotation:1)?(d=b.constrainRotation,d=void 0===d||!0===d?We():!1===d?Ue:"number"===typeof d?Ve(d):Ue):d=Te;a.g={center:void 0!==b.extent?Bc(b.extent):Cc,resolution:e,rotation:d};void 0!==b.resolution?c.resolution=b.resolution:void 0!==b.zoom&&(c.resolution=a.constrainResolution(a.a,b.zoom-a.l));c.rotation=
void 0!==b.rotation?b.rotation:0;a.H(c);a.D=b}function bg(a,b){var c=tb({},a.D);void 0!==c.resolution?c.resolution=a.Pa():c.zoom=a.Hh();c.center=a.wa();c.rotation=a.Qa();return tb({},c,b)}k=F.prototype;
k.animate=function(a){var b=Date.now(),c=this.wa().slice(),d=this.Pa(),e=this.Qa(),f=arguments.length;if(1<f&&"function"===typeof arguments[f-1]){var g=arguments[f-1];--f}for(var h=[],l=0;l<f;++l){var m=arguments[l],n={start:b,complete:!1,anchor:m.anchor,duration:void 0!==m.duration?m.duration:1E3,easing:m.easing||sd};m.center&&(n.Rg=c,n.Tg=m.center,c=n.Tg);void 0!==m.zoom?(n.tf=d,n.zd=this.constrainResolution(this.a,m.zoom-this.l,0),d=n.zd):m.resolution&&(n.tf=d,n.zd=m.resolution,d=n.zd);void 0!==
m.rotation&&(n.Sg=e,n.uf=m.rotation,e=n.uf);n.callback=g;b+=n.duration;h.push(n)}this.c.push(h);cg(this,0,1);this.wf()};k.Ic=function(){return 0<dg(this)[0]};k.Rk=function(){return 0<dg(this)[1]};k.ed=function(){cg(this,0,-dg(this)[0]);for(var a=0,b=this.c.length;a<b;++a){var c=this.c[a];c[0].callback&&c[0].callback(!1)}this.c.length=0};
k.wf=function(){void 0!==this.u&&(cancelAnimationFrame(this.u),this.u=void 0);if(this.Ic()){for(var a=Date.now(),b=!1,c=this.c.length-1;0<=c;--c){for(var d=this.c[c],e=!0,f=0,g=d.length;f<g;++f){var h=d[f];if(!h.complete){b=a-h.start;b=0<h.duration?b/h.duration:1;1<=b?(h.complete=!0,b=1):e=!1;b=h.easing(b);if(h.Rg){var l=h.Rg[0],m=h.Rg[1];this.set("center",[l+b*(h.Tg[0]-l),m+b*(h.Tg[1]-m)])}h.tf&&h.zd&&(l=1===b?h.zd:h.tf+b*(h.zd-h.tf),h.anchor&&this.set("center",eg(this,l,h.anchor)),this.set("resolution",
l));void 0!==h.Sg&&void 0!==h.uf&&(b=1===b?h.uf:h.Sg+b*(h.uf-h.Sg),h.anchor&&this.set("center",fg(this,b,h.anchor)),this.set("rotation",b));b=!0;if(!h.complete)break}}e&&(this.c[c]=null,cg(this,0,-1),(d=d[0].callback)&&d(!0))}this.c=this.c.filter(Boolean);b&&void 0===this.u&&(this.u=requestAnimationFrame(this.wf))}};function fg(a,b,c){var d=a.wa();if(void 0!==d){var e=[d[0]-c[0],d[1]-c[1]];ef(e,b-a.Qa());Ze(e,c)}return e}
function eg(a,b,c){var d,e=a.wa();a=a.Pa();void 0!==e&&void 0!==a&&(d=[c[0]-b*(c[0]-e[0])/a,c[1]-b*(c[1]-e[1])/a]);return d}function gg(a){var b=[100,100];a='.ol-viewport[data-view="'+w(a)+'"]';if(a=document.querySelector(a))a=getComputedStyle(a),b[0]=parseInt(a.width,10),b[1]=parseInt(a.height,10);return b}k.Ec=function(a){return this.g.center(a)};k.constrainResolution=function(a,b,c){return this.g.resolution(a,b||0,c||0)};k.constrainRotation=function(a,b){return this.g.rotation(a,b||0)};k.wa=function(){return this.get("center")};
function dg(a,b){return void 0!==b?(b[0]=a.o[0],b[1]=a.o[1],b):a.o.slice()}k.dd=function(a){a=a||gg(this);var b=this.wa();xa(b,1);var c=this.Pa();xa(void 0!==c,2);var d=this.Qa();xa(void 0!==d,3);return ob(b,c,d,a)};k.Nm=function(){return this.a};k.Pm=function(){return this.f};k.Om=function(){return this.Ce(this.f)};k.eq=function(a){ag(this,bg(this,{maxZoom:a}))};k.Qm=function(){return this.Ce(this.a)};k.fq=function(a){ag(this,bg(this,{minZoom:a}))};k.Rm=function(){return this.v};k.Pa=function(){return this.get("resolution")};
k.Sm=function(){return this.j};k.ze=function(a,b){b=b||gg(this);return Math.max(lb(a)/b[0],mb(a)/b[1])};function hg(a){var b=a.a,c=Math.log(b/a.f)/Math.log(2);return function(a){return b/Math.pow(2,a*c)}}k.Qa=function(){return this.get("rotation")};function ig(a){var b=a.a,c=Math.log(b/a.f)/Math.log(2);return function(a){return Math.log(b/a)/Math.log(2)/c}}k.getState=function(){var a=this.wa(),b=this.v,c=this.Pa(),d=this.Qa();return{center:a.slice(),projection:void 0!==b?b:null,resolution:c,rotation:d}};
k.Hh=function(){var a,b=this.Pa();void 0!==b&&(a=this.Ce(b));return a};k.Ce=function(a){if(a>=this.f&&a<=this.a){var b=this.l||0;if(this.j){var c=ka(this.j,a,1);b+=c;if(c==this.j.length-1)return b;var d=this.j[c];c=d/this.j[c+1]}else d=this.a,c=this.C;b+=Math.log(d/a)/Math.log(c)}return b};
k.Qf=function(a,b){b=b||{};var c=b.size;c||(c=gg(this));if(a instanceof rf)if("Circle"===a.U()){a=a.G();var d=Yf(a);d.rotate(this.Qa(),nb(a))}else d=a;else xa(Array.isArray(a),24),xa(!kb(a),25),d=Yf(a);var e=b.padding?b.padding:[0,0,0,0],f=void 0!==b.constrainResolution?b.constrainResolution:!0,g=void 0!==b.nearest?b.nearest:!1,h;void 0!==b.minResolution?h=b.minResolution:void 0!==b.maxZoom?h=this.constrainResolution(this.a,b.maxZoom-this.l,0):h=0;var l=d.ga(),m=this.Qa();a=Math.cos(-m);var m=Math.sin(-m),
n=Infinity,p=Infinity,q=-Infinity,r=-Infinity;d=d.qa();for(var u=0,x=l.length;u<x;u+=d)var B=l[u]*a-l[u+1]*m,E=l[u]*m+l[u+1]*a,n=Math.min(n,B),p=Math.min(p,E),q=Math.max(q,B),r=Math.max(r,E);c=this.ze([n,p,q,r],[c[0]-e[1]-e[3],c[1]-e[0]-e[2]]);c=isNaN(c)?h:Math.max(c,h);f&&(h=this.constrainResolution(c,0,0),!g&&h<c&&(h=this.constrainResolution(h,-1,0)),c=h);m=-m;h=(n+q)/2+(e[1]-e[3])/2*c;e=(p+r)/2+(e[0]-e[2])/2*c;a=[h*a-e*m,e*a+h*m];e=b.callback?b.callback:ua;void 0!==b.duration?this.animate({resolution:c,
center:a,duration:b.duration,easing:b.easing},e):(this.Vc(c),this.ob(a),setTimeout(e.bind(void 0,!0),0))};k.uk=function(a,b,c){var d=this.Qa(),e=Math.cos(-d),d=Math.sin(-d),f=a[0]*e-a[1]*d;a=a[1]*e+a[0]*d;var g=this.Pa(),f=f+(b[0]/2-c[0])*g;a+=(c[1]-b[1]/2)*g;d=-d;this.ob([f*e-a*d,a*e+f*d])};function jg(a){return!!a.wa()&&void 0!==a.Pa()}k.rotate=function(a,b){void 0!==b&&(b=fg(this,a,b),this.ob(b));this.Oe(a)};k.ob=function(a){this.set("center",a);this.Ic()&&this.ed()};
function cg(a,b,c){a.o[b]+=c;a.s()}k.Vc=function(a){this.set("resolution",a);this.Ic()&&this.ed()};k.Oe=function(a){this.set("rotation",a);this.Ic()&&this.ed()};k.lq=function(a){a=this.constrainResolution(this.a,a-this.l,0);this.Vc(a)};function kg(a,b,c){this.f=a;this.c=b;this.g=c;this.b=[];this.a=this.i=0}function lg(a){a.b.length=0;a.i=0;a.a=0}function mg(a){if(6>a.b.length)return!1;var b=Date.now()-a.g,c=a.b.length-3;if(a.b[c+2]<b)return!1;for(var d=c-3;0<d&&a.b[d+2]>b;)d-=3;b=a.b[c+2]-a.b[d+2];if(b<1E3/60)return!1;var e=a.b[c]-a.b[d],c=a.b[c+1]-a.b[d+1];a.i=Math.atan2(c,e);a.a=Math.sqrt(e*e+c*c)/b;return a.a>a.c};function ng(a){Tc.call(this);this.v=null;this.Ha(!0);this.handleEvent=a.handleEvent}v(ng,Tc);ng.prototype.c=function(){return this.get("active")};ng.prototype.f=function(){return this.v};ng.prototype.Ha=function(a){this.set("active",a)};ng.prototype.setMap=function(a){this.v=a};function og(a,b,c,d){if(void 0!==b){var e=a.Qa(),f=a.wa();void 0!==e&&f&&0<d?a.animate({rotation:b,anchor:c,duration:d,easing:rd}):a.rotate(b,c)}}
function pg(a,b,c,d){var e=a.Pa();b=a.constrainResolution(e,b,0);if(c&&void 0!==b&&b!==e){var f=a.wa();c=eg(a,b,c);c=a.Ec(c);c=[(b*f[0]-e*c[0])/(b-e),(b*f[1]-e*c[1])/(b-e)]}qg(a,b,c,d)}function qg(a,b,c,d){if(b){var e=a.Pa(),f=a.wa();void 0!==e&&f&&b!==e&&d?a.animate({resolution:b,anchor:c,duration:d,easing:rd}):(c&&(c=eg(a,b,c),a.ob(c)),a.Vc(b))}};function rg(a){a=a?a:{};this.a=a.delta?a.delta:1;ng.call(this,{handleEvent:sg});this.g=void 0!==a.duration?a.duration:250}v(rg,ng);function sg(a){var b=!1,c=a.originalEvent;if("dblclick"==a.type){var b=a.coordinate,c=c.shiftKey?-this.a:this.a,d=a.map.Z();pg(d,c,b,this.g);a.preventDefault();b=!0}return!b};function tg(a){a=a.originalEvent;return a.altKey&&!(a.metaKey||a.ctrlKey)&&a.shiftKey}function ug(a){a=a.originalEvent;return!a.button&&!(Qd&&Rd&&a.ctrlKey)}function vg(a){return"pointermove"==a.type}function wg(a){return"singleclick"==a.type}function xg(a){a=a.originalEvent;return!a.altKey&&!(a.metaKey||a.ctrlKey)&&!a.shiftKey}function yg(a){a=a.originalEvent;return!a.altKey&&!(a.metaKey||a.ctrlKey)&&a.shiftKey}
function Ag(a){a=a.originalEvent.target.tagName;return"INPUT"!==a&&"SELECT"!==a&&"TEXTAREA"!==a}function Bg(a){xa(a.b,56);return"mouse"==a.b.pointerType}function Cg(a){a=a.b;return a.isPrimary&&0===a.button};function Dg(a){a=a?a:{};ng.call(this,{handleEvent:a.handleEvent?a.handleEvent:Eg});this.yf=a.handleDownEvent?a.handleDownEvent:nf;this.If=a.handleDragEvent?a.handleDragEvent:ua;this.Jf=a.handleMoveEvent?a.handleMoveEvent:ua;this.sk=a.handleUpEvent?a.handleUpEvent:nf;this.D=!1;this.na={};this.o=[]}v(Dg,ng);function Fg(a){for(var b=a.length,c=0,d=0,e=0;e<b;e++)c+=a[e].clientX,d+=a[e].clientY;return[c/b,d/b]}
function Eg(a){if(!(a instanceof ee))return!0;var b=!1,c=a.type;if("pointerdown"===c||"pointerdrag"===c||"pointerup"===c)c=a.b,"pointerup"==a.type?delete this.na[c.pointerId]:"pointerdown"==a.type?this.na[c.pointerId]=c:c.pointerId in this.na&&(this.na[c.pointerId]=c),this.o=vb(this.na);this.D?"pointerdrag"==a.type?this.If(a):"pointerup"==a.type&&(this.D=this.sk(a)&&0<this.o.length):"pointerdown"==a.type?(this.D=a=this.yf(a),b=this.Xc(a)):"pointermove"==a.type&&this.Jf(a);return!b}
Dg.prototype.Xc=function(a){return a};function Gg(a){Dg.call(this,{handleDownEvent:Hg,handleDragEvent:Ig,handleUpEvent:Jg});a=a?a:{};this.a=a.kinetic;this.g=null;this.u=a.condition?a.condition:xg;this.j=!1}v(Gg,Dg);function Ig(a){var b=this.o,c=Fg(b);if(b.length==this.l){if(this.a&&this.a.b.push(c[0],c[1],Date.now()),this.g){var d=this.g[0]-c[0],e=c[1]-this.g[1];a=a.map.Z();var f=a.getState(),d=[d,e];gf(d,f.resolution);ef(d,f.rotation);Ze(d,f.center);d=a.Ec(d);a.ob(d)}}else this.a&&lg(this.a);this.g=c;this.l=b.length}
function Jg(a){var b=a.map;a=b.Z();if(this.o.length)return this.a&&lg(this.a),this.g=null,!0;if(!this.j&&this.a&&mg(this.a)){var c=this.a;c=(c.c-c.a)/c.f;var d=this.a.i,e=a.wa(),e=b.Ja(e),b=b.Wa([e[0]-c*Math.cos(d),e[1]-c*Math.sin(d)]);a.animate({center:a.Ec(b),duration:500,easing:rd})}cg(a,1,-1);return!1}
function Hg(a){if(0<this.o.length&&this.u(a)){var b=a.map.Z();this.g=null;this.D||cg(b,1,1);dg(b)[0]&&b.ob(a.frameState.viewState.center);this.a&&lg(this.a);this.j=1<this.o.length;return!0}return!1}Gg.prototype.Xc=nf;function Kg(a){a=a?a:{};Dg.call(this,{handleDownEvent:Lg,handleDragEvent:Mg,handleUpEvent:Ng});this.g=a.condition?a.condition:tg;this.a=void 0;this.j=void 0!==a.duration?a.duration:250}v(Kg,Dg);function Mg(a){if(Bg(a)){var b=a.map,c=b.Z();if(c.g.rotation!==Te){b=b.Ob();a=a.pixel;a=Math.atan2(b[1]/2-a[1],a[0]-b[0]/2);if(void 0!==this.a){var b=a-this.a,d=c.Qa();og(c,d-b)}this.a=a}}}
function Ng(a){if(!Bg(a))return!0;a=a.map.Z();cg(a,1,-1);var b=a.Qa(),c=this.j,b=a.constrainRotation(b,0);og(a,b,void 0,c);return!1}function Lg(a){return Bg(a)&&ug(a)&&this.g(a)?(cg(a.map.Z(),1,1),this.a=void 0,!0):!1}Kg.prototype.Xc=nf;function Og(a){this.Gc=null;this.a=document.createElement("div");this.a.style.position="absolute";this.a.className="ol-box "+a;this.i=this.c=this.b=null}v(Og,Mc);Og.prototype.ka=function(){this.setMap(null)};function Pg(a){var b=a.c,c=a.i;a=a.a.style;a.left=Math.min(b[0],c[0])+"px";a.top=Math.min(b[1],c[1])+"px";a.width=Math.abs(c[0]-b[0])+"px";a.height=Math.abs(c[1]-b[1])+"px"}
Og.prototype.setMap=function(a){if(this.b){this.b.C.removeChild(this.a);var b=this.a.style;b.left=b.top=b.width=b.height="inherit"}(this.b=a)&&this.b.C.appendChild(this.a)};function Qg(a){var b=a.c,c=a.i,b=[b,[b[0],c[1]],c,[c[0],b[1]]].map(a.b.Wa,a.b);b[4]=b[0].slice();a.Gc?a.Gc.ma([b]):a.Gc=new D([b])}Og.prototype.V=function(){return this.Gc};function Rg(a){Dg.call(this,{handleDownEvent:Sg,handleDragEvent:Tg,handleUpEvent:Ug});a=a?a:{};this.a=new Og(a.className||"ol-dragbox");this.u=void 0!==a.minArea?a.minArea:64;this.g=null;this.C=a.condition?a.condition:mf;this.l=a.boxEndCondition?a.boxEndCondition:Vg}v(Rg,Dg);function Vg(a,b,c){a=c[0]-b[0];b=c[1]-b[1];return a*a+b*b>=this.u}function Tg(a){if(Bg(a)){var b=this.a,c=a.pixel;b.c=this.g;b.i=c;Qg(b);Pg(b);this.b(new Wg(Xg,a.coordinate,a))}}Rg.prototype.V=function(){return this.a.V()};
Rg.prototype.j=ua;function Ug(a){if(!Bg(a))return!0;this.a.setMap(null);this.l(a,this.g,a.pixel)&&(this.j(a),this.b(new Wg(Yg,a.coordinate,a)));return!1}function Sg(a){if(Bg(a)&&ug(a)&&this.C(a)){this.g=a.pixel;this.a.setMap(a.map);var b=this.a,c=this.g;b.c=this.g;b.i=c;Qg(b);Pg(b);this.b(new Wg(Zg,a.coordinate,a));return!0}return!1}var Zg="boxstart",Xg="boxdrag",Yg="boxend";function Wg(a,b,c){Oc.call(this,a);this.coordinate=b;this.mapBrowserEvent=c}v(Wg,Oc);function $g(a){a=a?a:{};var b=a.condition?a.condition:yg;this.B=void 0!==a.duration?a.duration:200;this.I=void 0!==a.out?a.out:!1;Rg.call(this,{condition:b,className:a.className||"ol-dragzoom"})}v($g,Rg);
$g.prototype.j=function(){var a=this.v,b=a.Z(),c=a.Ob(),d=this.V().G();if(this.I){var e=b.dd(c),d=[a.Ja(eb(d)),a.Ja(hb(d))],a=Ya(void 0),f;var g=0;for(f=d.length;g<f;++g)Pa(a,d[g]);d=b.ze(a,c);rb(e,1/d);d=e}c=b.constrainResolution(b.ze(d,c));e=nb(d);e=b.Ec(e);b.animate({resolution:c,center:e,duration:this.B,easing:rd})};function ah(a){ng.call(this,{handleEvent:bh});a=a||{};this.a=function(a){return xg(a)&&Ag(a)};this.g=a.condition?a.condition:this.a;this.j=void 0!==a.duration?a.duration:100;this.o=void 0!==a.pixelDelta?a.pixelDelta:128}v(ah,ng);
function bh(a){var b=!1;if("keydown"==a.type){var c=a.originalEvent.keyCode;if(this.g(a)&&(40==c||37==c||39==c||38==c)){var b=a.map.Z(),d=b.Pa()*this.o,e=0,f=0;40==c?f=-d:37==c?e=-d:39==c?e=d:f=d;d=[e,f];ef(d,b.Qa());c=this.j;if(e=b.wa())d=b.Ec([e[0]+d[0],e[1]+d[1]]),c?b.animate({duration:c,easing:td,center:d}):b.ob(d);a.preventDefault();b=!0}}return!b};function ch(a){ng.call(this,{handleEvent:dh});a=a?a:{};this.g=a.condition?a.condition:Ag;this.a=a.delta?a.delta:1;this.j=void 0!==a.duration?a.duration:100}v(ch,ng);function dh(a){var b=!1;if("keydown"==a.type||"keypress"==a.type){var c=a.originalEvent.charCode;!this.g(a)||43!=c&&45!=c||(b=43==c?this.a:-this.a,c=a.map.Z(),pg(c,b,void 0,this.j),a.preventDefault(),b=!0)}return!b};function eh(a){ng.call(this,{handleEvent:fh});a=a||{};this.j=0;this.D=void 0!==a.duration?a.duration:250;this.na=void 0!==a.timeout?a.timeout:80;this.C=void 0!==a.useAnchor?a.useAnchor:!0;this.R=a.constrainResolution||!1;this.a=null;this.l=this.o=this.u=this.g=void 0}v(eh,ng);
function fh(a){var b=a.type;if("wheel"!==b&&"mousewheel"!==b)return!0;a.preventDefault();var b=a.map,c=a.originalEvent;this.C&&(this.a=a.coordinate);if("wheel"==a.type){var d=c.deltaY;Od&&c.deltaMode===WheelEvent.DOM_DELTA_PIXEL&&(d/=Sd);c.deltaMode===WheelEvent.DOM_DELTA_LINE&&(d*=40)}else"mousewheel"==a.type&&(d=-c.wheelDeltaY,Pd&&(d/=3));if(0===d)return!1;a=Date.now();void 0===this.g&&(this.g=a);if(!this.o||400<a-this.g)this.o=4>Math.abs(d)?gh:hh;if(this.o===gh){b=b.Z();this.l?clearTimeout(this.l):
cg(b,1,1);this.l=setTimeout(this.B.bind(this),400);var c=b.Pa()*Math.pow(2,d/300),e=b.f,f=b.a,g=0;c<e?(c=Math.max(c,e/1.5),g=1):c>f&&(c=Math.min(c,1.5*f),g=-1);if(this.a){var h=eg(b,c,this.a);b.ob(b.Ec(h))}b.Vc(c);!g&&this.R&&b.animate({resolution:b.constrainResolution(c,0<d?-1:1),easing:rd,anchor:this.a,duration:this.D});0<g?b.animate({resolution:e,easing:rd,anchor:this.a,duration:500}):0>g&&b.animate({resolution:f,easing:rd,anchor:this.a,duration:500});this.g=a;return!1}this.j+=d;d=Math.max(this.na-
(a-this.g),0);clearTimeout(this.u);this.u=setTimeout(this.I.bind(this,b),d);return!1}eh.prototype.B=function(){this.l=void 0;cg(this.v.Z(),1,-1)};eh.prototype.I=function(a){a=a.Z();a.Ic()&&a.ed();pg(a,-Ca(this.j,-1,1),this.a,this.D);this.o=void 0;this.j=0;this.a=null;this.u=this.g=void 0};eh.prototype.T=function(a){this.C=a;a||(this.a=null)};var gh="trackpad",hh="wheel";function ih(a){Dg.call(this,{handleDownEvent:jh,handleDragEvent:kh,handleUpEvent:lh});a=a||{};this.g=null;this.j=void 0;this.a=!1;this.l=0;this.C=void 0!==a.threshold?a.threshold:.3;this.u=void 0!==a.duration?a.duration:250}v(ih,Dg);
function kh(a){var b=0,c=this.o[0],d=this.o[1],c=Math.atan2(d.clientY-c.clientY,d.clientX-c.clientX);void 0!==this.j&&(b=c-this.j,this.l+=b,!this.a&&Math.abs(this.l)>this.C&&(this.a=!0));this.j=c;a=a.map;c=a.Z();if(c.g.rotation!==Te){var d=a.a.getBoundingClientRect(),e=Fg(this.o);e[0]-=d.left;e[1]-=d.top;this.g=a.Wa(e);this.a&&(d=c.Qa(),a.render(),og(c,d+b,this.g))}}
function lh(a){if(2>this.o.length){a=a.map.Z();cg(a,1,-1);if(this.a){var b=a.Qa(),c=this.g,d=this.u,b=a.constrainRotation(b,0);og(a,b,c,d)}return!1}return!0}function jh(a){return 2<=this.o.length?(a=a.map,this.g=null,this.j=void 0,this.a=!1,this.l=0,this.D||cg(a.Z(),1,1),!0):!1}ih.prototype.Xc=nf;function mh(a){Dg.call(this,{handleDownEvent:nh,handleDragEvent:oh,handleUpEvent:ph});a=a?a:{};this.l=a.constrainResolution||!1;this.g=null;this.u=void 0!==a.duration?a.duration:400;this.a=void 0;this.j=1}v(mh,Dg);
function oh(a){var b=1,c=this.o[0],d=this.o[1],e=c.clientX-d.clientX,c=c.clientY-d.clientY,e=Math.sqrt(e*e+c*c);void 0!==this.a&&(b=this.a/e);this.a=e;a=a.map;var e=a.Z(),d=e.Pa(),f=e.a,g=e.f,c=d*b;c>f?(b=f/d,c=f):c<g&&(b=g/d,c=g);1!=b&&(this.j=b);b=a.a.getBoundingClientRect();d=Fg(this.o);d[0]-=b.left;d[1]-=b.top;this.g=a.Wa(d);a.render();qg(e,c,this.g)}
function ph(a){if(2>this.o.length){a=a.map.Z();cg(a,1,-1);var b=a.Pa();if(this.l||b<a.f||b>a.a){var c=this.g,d=this.u,b=a.constrainResolution(b,0,this.j-1);qg(a,b,c,d)}return!1}return!0}function nh(a){return 2<=this.o.length?(a=a.map,this.g=null,this.a=void 0,this.j=1,this.D||cg(a.Z(),1,1),!0):!1}mh.prototype.Xc=nf;function qh(a){a=a?a:{};var b=new Yc,c=new kg(-.005,.05,100);(void 0!==a.altShiftDragRotate?a.altShiftDragRotate:1)&&b.push(new Kg);(void 0!==a.doubleClickZoom?a.doubleClickZoom:1)&&b.push(new rg({delta:a.zoomDelta,duration:a.zoomDuration}));(void 0!==a.dragPan?a.dragPan:1)&&b.push(new Gg({kinetic:c}));(void 0!==a.pinchRotate?a.pinchRotate:1)&&b.push(new ih);(void 0!==a.pinchZoom?a.pinchZoom:1)&&b.push(new mh({constrainResolution:a.constrainResolution,duration:a.zoomDuration}));if(void 0!==a.keyboard?
a.keyboard:1)b.push(new ah),b.push(new ch({delta:a.zoomDelta,duration:a.zoomDuration}));(void 0!==a.mouseWheelZoom?a.mouseWheelZoom:1)&&b.push(new eh({constrainResolution:a.constrainResolution,duration:a.zoomDuration}));(void 0!==a.shiftDragZoom?a.shiftDragZoom:1)&&b.push(new $g({duration:a.zoomDuration}));return b};function sh(a){Tc.call(this);var b=tb({},a);b.opacity=void 0!==a.opacity?a.opacity:1;b.visible=void 0!==a.visible?a.visible:!0;b.zIndex=void 0!==a.zIndex?a.zIndex:0;b.maxResolution=void 0!==a.maxResolution?a.maxResolution:Infinity;b.minResolution=void 0!==a.minResolution?a.minResolution:0;this.H(b);this.a={layer:this,Je:!0}}v(sh,Tc);
function th(a){a.a.opacity=Ca(a.hc(),0,1);a.a.yj=a.$f();a.a.visible=a.Mb();a.a.extent=a.G();a.a.zIndex=a.Ba();a.a.maxResolution=a.fc();a.a.minResolution=Math.max(a.gc(),0);return a.a}k=sh.prototype;k.G=function(){return this.get("extent")};k.fc=function(){return this.get("maxResolution")};k.gc=function(){return this.get("minResolution")};k.hc=function(){return this.get("opacity")};k.Mb=function(){return this.get("visible")};k.Ba=function(){return this.get("zIndex")};
k.vc=function(a){this.set("extent",a)};k.Ac=function(a){this.set("maxResolution",a)};k.Bc=function(a){this.set("minResolution",a)};k.wc=function(a){this.set("opacity",a)};k.xc=function(a){this.set("visible",a)};k.Vb=function(a){this.set("zIndex",a)};function uh(a){var b=a||{};a=tb({},b);delete a.layers;b=b.layers;sh.call(this,a);this.f=[];this.c={};y(this,Vc(vh),this.Hl,this);b?Array.isArray(b)?b=new Yc(b.slice(),{unique:!0}):xa(b instanceof Yc,43):b=new Yc(void 0,{unique:!0});this.xi(b)}v(uh,sh);k=uh.prototype;k.Fd=function(){};k.Fe=function(){this.Mb()&&this.s()};
k.Hl=function(){this.f.forEach(Ec);this.f.length=0;var a=this.qd();this.f.push(y(a,"add",this.Gl,this),y(a,"remove",this.Il,this));for(var b in this.c)this.c[b].forEach(Ec);ub(this.c);var a=a.a,c;b=0;for(c=a.length;b<c;b++){var d=a[b];this.c[w(d).toString()]=[y(d,"propertychange",this.Fe,this),y(d,"change",this.Fe,this)]}this.s()};k.Gl=function(a){a=a.element;var b=w(a).toString();this.c[b]=[y(a,"propertychange",this.Fe,this),y(a,"change",this.Fe,this)];this.s()};
k.Il=function(a){a=w(a.element).toString();this.c[a].forEach(Ec);delete this.c[a];this.s()};k.qd=function(){return this.get(vh)};k.xi=function(a){this.set(vh,a)};
k.Yf=function(a){var b=void 0!==a?a:[],c=b.length;this.qd().forEach(function(a){a.Yf(b)});a=th(this);var d;for(d=b.length;c<d;c++){var e=b[c];e.opacity*=a.opacity;e.visible=e.visible&&a.visible;e.maxResolution=Math.min(e.maxResolution,a.maxResolution);e.minResolution=Math.max(e.minResolution,a.minResolution);void 0!==a.extent&&(e.extent=void 0!==e.extent?pb(e.extent,a.extent):a.extent)}return b};k.$f=function(){return"ready"};var vh="layers";function wh(a){var b=tb({},a);delete b.source;sh.call(this,b);this.v=this.l=this.o=null;a.map&&this.setMap(a.map);y(this,Vc("source"),this.Ul,this);this.Wc(a.source?a.source:null)}v(wh,sh);function xh(a,b){return a.visible&&b>=a.minResolution&&b<a.maxResolution}k=wh.prototype;k.Yf=function(a){a=a?a:[];a.push(th(this));return a};k.ha=function(){return this.get("source")||null};k.$f=function(){var a=this.ha();return a?a.getState():"undefined"};k.Tn=function(){this.s()};
k.Ul=function(){this.v&&(Ec(this.v),this.v=null);var a=this.ha();a&&(this.v=y(a,"change",this.Tn,this));this.s()};k.setMap=function(a){this.o&&(Ec(this.o),this.o=null);a||this.s();this.l&&(Ec(this.l),this.l=null);a&&(this.o=y(a,"precompose",function(a){var b=th(this);b.Je=!1;b.zIndex=Infinity;a.frameState.layerStatesArray.push(b);a.frameState.layerStates[w(this)]=b},this),this.l=y(this,"change",a.render,a),this.s())};k.Wc=function(a){this.set("source",a)};function yh(){this.b={};this.a=0}yh.prototype.clear=function(){this.b={};this.a=0};yh.prototype.get=function(a,b,c){a=b+":"+a+":"+(c?gd(c):"null");return a in this.b?this.b[a]:null};yh.prototype.set=function(a,b,c,d){this.b[b+":"+a+":"+(c?gd(c):"null")]=d;++this.a};var zh=new yh;var Ah=Array(6);function Bh(){return[1,0,0,1,0,0]}function Ch(a){return Dh(a,1,0,0,1,0,0)}function Eh(a,b){var c=a[0],d=a[1],e=a[2],f=a[3],g=a[4],h=a[5],l=b[0],m=b[1],n=b[2],p=b[3],q=b[4];b=b[5];a[0]=c*l+e*m;a[1]=d*l+f*m;a[2]=c*n+e*p;a[3]=d*n+f*p;a[4]=c*q+e*b+g;a[5]=d*q+f*b+h;return a}function Dh(a,b,c,d,e,f,g){a[0]=b;a[1]=c;a[2]=d;a[3]=e;a[4]=f;a[5]=g;return a}function Fh(a,b){a[0]=b[0];a[1]=b[1];a[2]=b[2];a[3]=b[3];a[4]=b[4];a[5]=b[5];return a}
function Gh(a,b){var c=b[0],d=b[1];b[0]=a[0]*c+a[2]*d+a[4];b[1]=a[1]*c+a[3]*d+a[5];return b}function Hh(a,b){var c=Math.cos(b);b=Math.sin(b);Eh(a,Dh(Ah,c,b,-b,c,0,0))}function Ih(a,b,c){return Eh(a,Dh(Ah,b,0,0,c,0,0))}function Jh(a,b,c){Eh(a,Dh(Ah,1,0,0,1,b,c))}function Kh(a,b,c,d,e,f,g,h){var l=Math.sin(f);f=Math.cos(f);a[0]=d*f;a[1]=e*l;a[2]=-d*l;a[3]=e*f;a[4]=g*d*f-h*d*l+b;a[5]=g*e*l+h*e*f+c;return a}
function Lh(a){var b=a[0]*a[3]-a[1]*a[2];xa(!!b,32);var c=a[0],d=a[1],e=a[2],f=a[3],g=a[4],h=a[5];a[0]=f/b;a[1]=-d/b;a[2]=-e/b;a[3]=c/b;a[4]=(e*h-f*g)/b;a[5]=-(c*h-d*g)/b;return a};function Mh(a,b){this.o=b;this.c={};this.v={}}v(Mh,Mc);function Nh(a){var b=a.viewState,c=a.coordinateToPixelTransform,d=a.pixelToCoordinateTransform;Kh(c,a.size[0]/2,a.size[1]/2,1/b.resolution,-1/b.resolution,-b.rotation,-b.center[0],-b.center[1]);Lh(Fh(d,c))}k=Mh.prototype;k.ka=function(){for(var a in this.c)Nc(this.c[a])};function Oh(){if(32<zh.a){var a=0,b;for(b in zh.b){var c=zh.b[b];a++&3||Rc(c)||(delete zh.b[b],--zh.a)}}}
k.Ea=function(a,b,c,d,e,f,g){function h(a,c){var f=w(a).toString(),g=b.layerStates[w(c)].Je;if(!(f in b.skippedFeatureUids)||g)return d.call(e,a,g?c:null)}var l,m=b.viewState,n=m.resolution,p=m.projection,m=a;if(p.i){var p=p.G(),q=lb(p),r=a[0];if(r<p[0]||r>p[2])m=[r+q*Math.ceil((p[0]-r)/q),a[1]]}p=b.layerStatesArray;for(q=p.length-1;0<=q;--q){var u=p[q],r=u.layer;if(xh(u,n)&&f.call(g,r)&&(u=Ph(this,r),r.ha()&&(l=u.Ea(r.ha().u?m:a,b,c,h,e)),l))return l}};
k.Ei=function(a,b,c,d,e){return void 0!==this.Ea(a,b,c,mf,this,d,e)};function Ph(a,b){var c=w(b).toString();if(c in a.c)return a.c[c];b=b.Fd(a);a.c[c]=b;a.v[c]=y(b,"change",a.Fl,a);return b}k.Fl=function(){this.o.render()};k.Jg=ua;k.Rp=function(a,b){for(var c in this.c)if(!(b&&c in b.layerStates)){a=c;var d=this.c[a];delete this.c[a];Ec(this.v[a]);delete this.v[a];Nc(d)}};function Qh(a,b){for(var c in a.c)if(!(c in b.layerStates)){b.postRenderFunctions.push(a.Rp.bind(a));break}}
function ra(a,b){return a.zIndex-b.zIndex};function Rh(a,b,c,d,e){Oc.call(this,a);this.vectorContext=b;this.frameState=c;this.context=d;this.glContext=e}v(Rh,Oc);var Sh=[0,0,0,1],Th=[],Uh=[0,0,0,1];function Vh(a,b,c,d){b&&(a.translate(c,d),a.rotate(b),a.translate(-c,-d))};function Wh(){}k=Wh.prototype;k.zb=function(){};k.rd=function(){};k.Zb=function(){};k.te=function(){};k.ue=function(){};k.mc=function(){};k.nc=function(){};k.oc=function(){};k.pc=function(){};k.qc=function(){};k.rc=function(){};k.yc=function(){};k.Ma=function(){};k.Ub=function(){};k.Cb=function(){};function Xh(a,b,c,d,e){this.i=a;this.u=b;this.c=c;this.S=d;this.Yb=e;this.M=this.b=this.a=this.Ua=this.R=this.I=null;this.na=this.T=this.l=this.B=this.C=this.D=0;this.fa=!1;this.f=this.fb=0;this.pa=!1;this.oa=0;this.Ia="";this.va=this.Jb=0;this.Sa=!1;this.j=this.$a=0;this.ra=this.o=this.g=null;this.v=[];this.xb=Bh()}v(Xh,Wh);
function Yh(a,b,c){if(a.M){b=pf(b,0,c,2,a.S,a.v);c=a.i;var d=a.xb,e=c.globalAlpha;1!=a.l&&(c.globalAlpha=e*a.l);var f=a.fb;a.fa&&(f+=a.Yb);var g;var h=0;for(g=b.length;h<g;h+=2){var l=b[h]-a.D,m=b[h+1]-a.C;a.pa&&(l=Math.round(l),m=Math.round(m));if(f||1!=a.f){var n=l+a.D,p=m+a.C;Kh(d,n,p,a.f,a.f,f,-n,-p);c.setTransform.apply(c,d)}c.drawImage(a.M,a.T,a.na,a.oa,a.B,l,m,a.oa,a.B)}(f||1!=a.f)&&c.setTransform(1,0,0,1,0,0);1!=a.l&&(c.globalAlpha=e)}}
function Zh(a,b,c,d){var e=0;if(a.ra&&""!==a.Ia){a.g&&$h(a,a.g);a.o&&ai(a,a.o);var f=a.ra,g=a.i,h=a.Ua;h?(h.font!=f.font&&(h.font=g.font=f.font),h.textAlign!=f.textAlign&&(h.textAlign=g.textAlign=f.textAlign),h.textBaseline!=f.textBaseline&&(h.textBaseline=g.textBaseline=f.textBaseline)):(g.font=f.font,g.textAlign=f.textAlign,g.textBaseline=f.textBaseline,a.Ua={font:f.font,textAlign:f.textAlign,textBaseline:f.textBaseline});b=pf(b,e,c,d,a.S,a.v);f=a.i;g=a.$a;for(a.Sa&&(g+=a.Yb);e<c;e+=d){var h=b[e]+
a.Jb,l=b[e+1]+a.va;if(g||1!=a.j){var m=Kh(a.xb,h,l,a.j,a.j,g,-h,-l);f.setTransform.apply(f,m)}a.o&&f.strokeText(a.Ia,h,l);a.g&&f.fillText(a.Ia,h,l)}(g||1!=a.j)&&f.setTransform(1,0,0,1,0,0)}}function bi(a,b,c,d,e,f){var g=a.i;a=pf(b,c,d,e,a.S,a.v);g.moveTo(a[0],a[1]);b=a.length;f&&(b-=2);for(c=2;c<b;c+=2)g.lineTo(a[c],a[c+1]);f&&g.closePath();return d}function ci(a,b,c,d,e){var f;var g=0;for(f=d.length;g<f;++g)c=bi(a,b,c,d[g],e,!0);return c}k=Xh.prototype;
k.Zb=function(a){if(qb(this.c,a.G())){if(this.a||this.b){this.a&&$h(this,this.a);this.b&&ai(this,this.b);var b=this.S;var c=this.v,d=a.ga();b=d?pf(d,0,d.length,a.qa(),b,c):null;c=b[2]-b[0];d=b[3]-b[1];c=Math.sqrt(c*c+d*d);d=this.i;d.beginPath();d.arc(b[0],b[1],c,0,2*Math.PI);this.a&&d.fill();this.b&&d.stroke()}""!==this.Ia&&Zh(this,a.wa(),2,2)}};k.rd=function(a){this.Ma(a.Fa(),a.Ga());this.Ub(a.Y());this.Cb(a.Na())};
k.zb=function(a){switch(a.U()){case "Point":this.qc(a);break;case "LineString":this.mc(a);break;case "Polygon":this.rc(a);break;case "MultiPoint":this.oc(a);break;case "MultiLineString":this.nc(a);break;case "MultiPolygon":this.pc(a);break;case "GeometryCollection":this.ue(a);break;case "Circle":this.Zb(a)}};k.te=function(a,b){(a=(0,b.Za)(a))&&qb(this.c,a.G())&&(this.rd(b),this.zb(a))};k.ue=function(a){a=a.a;var b;var c=0;for(b=a.length;c<b;++c)this.zb(a[c])};
k.qc=function(a){var b=a.ga();a=a.qa();this.M&&Yh(this,b,b.length);""!==this.Ia&&Zh(this,b,b.length,a)};k.oc=function(a){var b=a.ga();a=a.qa();this.M&&Yh(this,b,b.length);""!==this.Ia&&Zh(this,b,b.length,a)};k.mc=function(a){if(qb(this.c,a.G())){if(this.b){ai(this,this.b);var b=this.i,c=a.ga();b.beginPath();bi(this,c,0,c.length,a.qa(),!1);b.stroke()}""!==this.Ia&&(a=di(a),Zh(this,a,2,2))}};
k.nc=function(a){var b=a.G();if(qb(this.c,b)){if(this.b){ai(this,this.b);var b=this.i,c=a.ga(),d=0,e=a.Bb(),f=a.qa();b.beginPath();var g;var h=0;for(g=e.length;h<g;++h)d=bi(this,c,d,e[h],f,!1);b.stroke()}""!==this.Ia&&(a=ei(a),Zh(this,a,a.length,2))}};k.rc=function(a){if(qb(this.c,a.G())){if(this.b||this.a){this.a&&$h(this,this.a);this.b&&ai(this,this.b);var b=this.i;b.beginPath();ci(this,a.ec(),0,a.Bb(),a.qa());this.a&&b.fill();this.b&&b.stroke()}""!==this.Ia&&(a=Wf(a),Zh(this,a,2,2))}};
k.pc=function(a){if(qb(this.c,a.G())){if(this.b||this.a){this.a&&$h(this,this.a);this.b&&ai(this,this.b);var b=this.i,c=fi(a),d=0,e=a.c,f=a.qa(),g;b.beginPath();var h=0;for(g=e.length;h<g;++h)d=ci(this,c,d,e[h],f);this.a&&b.fill();this.b&&b.stroke()}""!==this.Ia&&(a=gi(a),Zh(this,a,a.length,2))}};function $h(a,b){var c=a.i,d=a.I;d?d.fillStyle!=b.fillStyle&&(d.fillStyle=c.fillStyle=b.fillStyle):(c.fillStyle=b.fillStyle,a.I={fillStyle:b.fillStyle})}
function ai(a,b){var c=a.i,d=a.R;d?(d.lineCap!=b.lineCap&&(d.lineCap=c.lineCap=b.lineCap),Td&&!pa(d.lineDash,b.lineDash)&&c.setLineDash(d.lineDash=b.lineDash),d.lineJoin!=b.lineJoin&&(d.lineJoin=c.lineJoin=b.lineJoin),d.lineWidth!=b.lineWidth&&(d.lineWidth=c.lineWidth=b.lineWidth),d.miterLimit!=b.miterLimit&&(d.miterLimit=c.miterLimit=b.miterLimit),d.strokeStyle!=b.strokeStyle&&(d.strokeStyle=c.strokeStyle=b.strokeStyle)):(c.lineCap=b.lineCap,Td&&c.setLineDash(b.lineDash),c.lineJoin=b.lineJoin,c.lineWidth=
b.lineWidth,c.miterLimit=b.miterLimit,c.strokeStyle=b.strokeStyle,a.R={lineCap:b.lineCap,lineDash:b.lineDash,lineJoin:b.lineJoin,lineWidth:b.lineWidth,miterLimit:b.miterLimit,strokeStyle:b.strokeStyle})}
k.Ma=function(a,b){a?(a=a.b,this.a={fillStyle:id(a?a:Sh)}):this.a=null;if(b){a=b.a;var c=b.f,d=b.i,e=b.g,f=b.j,g=b.c;b=b.o;this.b={lineCap:void 0!==c?c:"round",lineDash:d?d:Th,lineDashOffset:e?e:0,lineJoin:void 0!==f?f:"round",lineWidth:this.u*(void 0!==g?g:1),miterLimit:void 0!==b?b:10,strokeStyle:id(a?a:Uh)}}else this.b=null};
k.Ub=function(a){if(a){var b=a.Hc(),c=a.Y(1),d=a.Oc(),e=a.ic();this.D=b[0];this.C=b[1];this.B=e[1];this.M=c;this.l=a.f;this.T=d[0];this.na=d[1];this.fa=a.l;this.fb=a.g;this.f=a.a;this.pa=a.v;this.oa=e[0]}else this.M=null};
k.Cb=function(a){if(a){var b=a.Fa();b?(b=b.b,this.g={fillStyle:id(b?b:Sh)}):this.g=null;var c=a.Ga();if(c){var b=c.a,d=c.f,e=c.i,f=c.g,g=c.j,h=c.c,c=c.o;this.o={lineCap:void 0!==d?d:"round",lineDash:e?e:Th,lineDashOffset:f?f:0,lineJoin:void 0!==g?g:"round",lineWidth:void 0!==h?h:1,miterLimit:void 0!==c?c:10,strokeStyle:id(b?b:Uh)}}else this.o=null;var b=a.a,d=a.i,e=a.c,f=a.o,g=a.f,h=a.b,c=a.Na(),l=a.g;a=a.j;this.ra={font:void 0!==b?b:"10px sans-serif",textAlign:void 0!==l?l:"center",textBaseline:void 0!==
a?a:"middle"};this.Ia=void 0!==c?c:"";this.Jb=void 0!==d?this.u*d:0;this.va=void 0!==e?this.u*e:0;this.Sa=void 0!==f?f:!1;this.$a=void 0!==g?g:0;this.j=this.u*(void 0!==h?h:1)}else this.Ia=""};function hi(a,b){Mh.call(this,0,b);this.i=jd();this.b=this.i.canvas;this.b.style.width="100%";this.b.style.height="100%";this.b.style.display="block";this.b.className="ol-unselectable";a.insertBefore(this.b,a.childNodes[0]||null);this.a=!0;this.f=Bh()}v(hi,Mh);
function ii(a,b,c){var d=a.o,e=a.i;if(Rc(d,b)){var f=c.extent,g=c.pixelRatio,h=c.viewState.rotation,l=c.viewState,m=c.pixelRatio/l.resolution;a=Kh(a.f,a.b.width/2,a.b.height/2,m,-m,-l.rotation,-l.center[0],-l.center[1]);d.b(new Rh(b,new Xh(e,g,f,a,h),c,e,null))}}hi.prototype.U=function(){return"canvas"};
hi.prototype.Jg=function(a){if(a){var b=this.i,c=a.pixelRatio,d=Math.round(a.size[0]*c),e=Math.round(a.size[1]*c);this.b.width!=d||this.b.height!=e?(this.b.width=d,this.b.height=e):b.clearRect(0,0,d,e);c=a.viewState.rotation;Nh(a);ii(this,"precompose",a);var f=a.layerStatesArray;qa(f);c&&(b.save(),Vh(b,c,d/2,e/2));var d=a.viewState.resolution,g,e=0;for(g=f.length;e<g;++e){var h=f[e];var l=h.layer;l=Ph(this,l);xh(h,d)&&"ready"==h.yj&&l.sd(a,h)&&l.S(a,h,b)}c&&b.restore();ii(this,"postcompose",a);this.a||
(this.b.style.display="",this.a=!0);Qh(this,a);a.postRenderFunctions.push(Oh)}else this.a&&(this.b.style.display="none",this.a=!1)};hi.prototype.Di=function(a,b,c,d,e,f){var g=b.viewState.resolution,h=b.layerStatesArray,l=h.length;a=Gh(b.pixelToCoordinateTransform,a.slice());for(--l;0<=l;--l){var m=h[l];var n=m.layer;if(xh(m,g)&&e.call(f,n)&&(m=Ph(this,n).u(a,b,c,d)))return m}};var ji=["Polygon","Circle","LineString","Image","Text"];function ki(){};function li(a){this.b=a};function mi(a){this.b=a}v(mi,li);mi.prototype.U=function(){return 35632};function ni(a){this.b=a}v(ni,li);ni.prototype.U=function(){return 35633};function oi(){this.b="precision mediump float;varying vec2 a;varying vec2 b;varying float c;varying float d;uniform float m;uniform vec4 n;uniform vec4 o;uniform vec2 p;void main(void){vec2 windowCenter=vec2((a.x+1.0)/2.0*p.x*d,(a.y+1.0)/2.0*p.y*d);vec2 windowOffset=vec2((b.x+1.0)/2.0*p.x*d,(b.y+1.0)/2.0*p.y*d);float radius=length(windowCenter-windowOffset);float dist=length(windowCenter-gl_FragCoord.xy);if(dist>radius+c){if(o.a==0.0){gl_FragColor=n;}else{gl_FragColor=o;}gl_FragColor.a=gl_FragColor.a-(dist-(radius+c));}else if(n.a==0.0){gl_FragColor=o;if(dist<radius-c){gl_FragColor.a=gl_FragColor.a-(radius-c-dist);}} else{gl_FragColor=n;float strokeDist=radius-c;float antialias=2.0*d;if(dist>strokeDist){gl_FragColor=o;}else if(dist>=strokeDist-antialias){float step=smoothstep(strokeDist-antialias,strokeDist,dist);gl_FragColor=mix(n,o,step);}} gl_FragColor.a=gl_FragColor.a*m;if(gl_FragColor.a<=0.0){discard;}}"}
v(oi,mi);var pi=new oi;
function qi(){this.b="varying vec2 a;varying vec2 b;varying float c;varying float d;attribute vec2 e;attribute float f;attribute float g;uniform mat4 h;uniform mat4 i;uniform mat4 j;uniform float k;uniform float l;void main(void){mat4 offsetMatrix=i*j;a=vec4(h*vec4(e,0.0,1.0)).xy;d=l;float lineWidth=k*l;c=lineWidth/2.0;if(lineWidth==0.0){lineWidth=2.0*l;}vec2 offset;float radius=g+3.0*l;if(f==0.0){offset=vec2(-1.0,1.0);}else if(f==1.0){offset=vec2(-1.0,-1.0);}else if(f==2.0){offset=vec2(1.0,-1.0);}else{offset=vec2(1.0,1.0);}gl_Position=h*vec4(e+offset*radius,0.0,1.0)+offsetMatrix*vec4(offset*lineWidth,0.0,0.0);b=vec4(h*vec4(e.x+g,e.y,0.0,1.0)).xy;if(distance(a,b)>20000.0){gl_Position=vec4(a,0.0,1.0);}}"}
v(qi,ni);var ri=new qi;function si(a,b){this.B=a.getUniformLocation(b,"n");this.oa=a.getUniformLocation(b,"k");this.c=a.getUniformLocation(b,"j");this.f=a.getUniformLocation(b,"i");this.a=a.getUniformLocation(b,"m");this.ra=a.getUniformLocation(b,"l");this.i=a.getUniformLocation(b,"h");this.I=a.getUniformLocation(b,"p");this.R=a.getUniformLocation(b,"o");this.j=a.getAttribLocation(b,"f");this.b=a.getAttribLocation(b,"e");this.S=a.getAttribLocation(b,"g")};function ti(){return[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}function ui(a,b){a[0]=b[0];a[1]=b[1];a[4]=b[2];a[5]=b[3];a[12]=b[4];a[13]=b[5];return a};function vi(a,b){this.origin=nb(b);this.xb=Bh();this.Sa=Bh();this.$a=Bh();this.Jb=ti();this.b=[];this.o=null;this.i=[];this.f=[];this.a=[];this.l=null;this.g=void 0}v(vi,Wh);
vi.prototype.La=function(a,b,c,d,e,f,g,h,l,m,n){var p=a.b;if(this.g){var q=p.isEnabled(p.STENCIL_TEST);var r=p.getParameter(p.STENCIL_FUNC);var u=p.getParameter(p.STENCIL_VALUE_MASK);var x=p.getParameter(p.STENCIL_REF);var B=p.getParameter(p.STENCIL_WRITEMASK);var E=p.getParameter(p.STENCIL_FAIL);var A=p.getParameter(p.STENCIL_PASS_DEPTH_PASS);var L=p.getParameter(p.STENCIL_PASS_DEPTH_FAIL);p.enable(p.STENCIL_TEST);p.clear(p.STENCIL_BUFFER_BIT);p.stencilMask(255);p.stencilFunc(p.ALWAYS,1,255);p.stencilOp(p.KEEP,
p.KEEP,p.REPLACE);this.g.La(a,b,c,d,e,f,g,h,l,m,n);p.stencilMask(0);p.stencilFunc(p.NOTEQUAL,1,255)}wi(a,34962,this.l);wi(a,34963,this.o);f=this.rf(p,a,e,f);var oa=Ch(this.xb);Ih(oa,2/(c*e[0]),2/(c*e[1]));Hh(oa,-d);Jh(oa,-(b[0]-this.origin[0]),-(b[1]-this.origin[1]));b=Ch(this.$a);Ih(b,2/e[0],2/e[1]);e=Ch(this.Sa);d&&Hh(e,-d);p.uniformMatrix4fv(f.i,!1,ui(this.Jb,oa));p.uniformMatrix4fv(f.f,!1,ui(this.Jb,b));p.uniformMatrix4fv(f.c,!1,ui(this.Jb,e));p.uniform1f(f.a,g);if(l){m?a=this.ve(p,a,h,l,n):(p.clear(p.COLOR_BUFFER_BIT|
p.DEPTH_BUFFER_BIT),this.Od(p,a,h,!0),a=(a=l(null))?a:void 0);var ha=a}else this.Od(p,a,h,!1);this.sf(p,f);this.g&&(q||p.disable(p.STENCIL_TEST),p.clear(p.STENCIL_BUFFER_BIT),p.stencilFunc(r,x,u),p.stencilMask(B),p.stencilOp(E,L,A));return ha};function xi(a,b,c,d){a.drawElements(4,d-c,b.g?5125:5123,c*(b.g?4:2))};var yi=[0,0,0,1],zi=[],Ai=[0,0,0,1];function Bi(a,b,c,d,e,f){a=(c-a)*(f-b)-(e-a)*(d-b);return a<=Ci&&a>=-Ci?void 0:0<a}var Ci=Number.EPSILON||2.220446049250313E-16;function Di(a){this.b=void 0!==a?a:[];this.a=Ei}var Ei=35044;function Fi(a,b){vi.call(this,0,b);this.v=null;this.j=[];this.u=[];this.S=0;this.c={fillColor:null,strokeColor:null,lineDash:null,lineDashOffset:void 0,lineWidth:void 0,s:!1}}v(Fi,vi);k=Fi.prototype;
k.Zb=function(a,b){var c=a.pd(),d=a.qa();if(c){this.i.push(this.b.length);this.f.push(b);this.c.s&&(this.u.push(this.b.length),this.c.s=!1);this.S=c;a=a.ga();a=qf(a,0,2,d,-this.origin[0],-this.origin[1]);b=this.a.length;var c=this.b.length,e=b/4,f;for(f=0;2>f;f+=d)this.a[b++]=a[f],this.a[b++]=a[f+1],this.a[b++]=0,this.a[b++]=this.S,this.a[b++]=a[f],this.a[b++]=a[f+1],this.a[b++]=1,this.a[b++]=this.S,this.a[b++]=a[f],this.a[b++]=a[f+1],this.a[b++]=2,this.a[b++]=this.S,this.a[b++]=a[f],this.a[b++]=
a[f+1],this.a[b++]=3,this.a[b++]=this.S,this.b[c++]=e,this.b[c++]=e+1,this.b[c++]=e+2,this.b[c++]=e+2,this.b[c++]=e+3,this.b[c++]=e,e+=4}else this.c.s&&(this.j.pop(),this.j.length&&(d=this.j[this.j.length-1],this.c.fillColor=d[0],this.c.strokeColor=d[1],this.c.lineWidth=d[2],this.c.s=!1))};k.Db=function(){this.l=new Di(this.a);this.o=new Di(this.b);this.i.push(this.b.length);!this.u.length&&0<this.j.length&&(this.j=[]);this.b=this.a=null};
k.Eb=function(a){var b=this.l,c=this.o;return function(){Gi(a,b);Gi(a,c)}};k.rf=function(a,b,c,d){var e=Hi(b,pi,ri);if(this.v)var f=this.v;else this.v=f=new si(a,e);b.Qc(e);a.enableVertexAttribArray(f.b);a.vertexAttribPointer(f.b,2,5126,!1,16,0);a.enableVertexAttribArray(f.j);a.vertexAttribPointer(f.j,1,5126,!1,16,8);a.enableVertexAttribArray(f.S);a.vertexAttribPointer(f.S,1,5126,!1,16,12);a.uniform2fv(f.I,c);a.uniform1f(f.ra,d);return f};
k.sf=function(a,b){a.disableVertexAttribArray(b.b);a.disableVertexAttribArray(b.j);a.disableVertexAttribArray(b.S)};
k.Od=function(a,b,c){if(wb(c)){var d=this.i[this.i.length-1];for(c=this.u.length-1;0<=c;--c){var e=this.u[c];var f=this.j[c];a.uniform4fv(this.v.B,f[0]);Ii(this,a,f[1],f[2]);xi(a,b,e,d);d=e}}else{var g=this.i.length-2;f=d=this.i[g+1];for(e=this.u.length-1;0<=e;--e){var h=this.j[e];a.uniform4fv(this.v.B,h[0]);Ii(this,a,h[1],h[2]);for(h=this.u[e];0<=g&&this.i[g]>=h;){var l=this.i[g];var m=this.f[g];m=w(m).toString();c[m]&&(d!==f&&xi(a,b,d,f),f=l);g--;d=l}d!==f&&xi(a,b,d,f);d=f=h}}};
k.ve=function(a,b,c,d,e){var f,g;var h=this.i.length-2;var l=this.i[h+1];for(f=this.u.length-1;0<=f;--f){var m=this.j[f];a.uniform4fv(this.v.B,m[0]);Ii(this,a,m[1],m[2]);for(g=this.u[f];0<=h&&this.i[h]>=g;){m=this.i[h];var n=this.f[h];var p=w(n).toString();if(void 0===c[p]&&n.V()&&(void 0===e||qb(e,n.V().G()))&&(a.clear(a.COLOR_BUFFER_BIT|a.DEPTH_BUFFER_BIT),xi(a,b,m,l),l=d(n)))return l;h--;l=m}}};function Ii(a,b,c,d){b.uniform4fv(a.v.R,c);b.uniform1f(a.v.oa,d)}
k.Ma=function(a,b){if(b){var c=b.i;this.c.lineDash=c?c:zi;c=b.g;this.c.lineDashOffset=c?c:0;c=b.a;c instanceof CanvasGradient||c instanceof CanvasPattern?c=Ai:c=ed(c).map(function(a,b){return 3!=b?a/255:a})||Ai;b=b.c;b=void 0!==b?b:1}else c=[0,0,0,0],b=0;a=a?a.b:[0,0,0,0];a instanceof CanvasGradient||a instanceof CanvasPattern?a=yi:a=ed(a).map(function(a,b){return 3!=b?a/255:a})||yi;this.c.strokeColor&&pa(this.c.strokeColor,c)&&this.c.fillColor&&pa(this.c.fillColor,a)&&this.c.lineWidth===b||(this.c.s=
!0,this.c.fillColor=a,this.c.strokeColor=c,this.c.lineWidth=b,this.j.push([a,c,b]))};function Ji(){this.b="precision mediump float;varying vec2 a;varying float b;uniform float k;uniform sampler2D l;void main(void){vec4 texColor=texture2D(l,a);gl_FragColor.rgb=texColor.rgb;float alpha=texColor.a*b*k;if(alpha==0.0){discard;}gl_FragColor.a=alpha;}"}v(Ji,mi);var Ki=new Ji;
function Li(){this.b="varying vec2 a;varying float b;attribute vec2 c;attribute vec2 d;attribute vec2 e;attribute float f;attribute float g;uniform mat4 h;uniform mat4 i;uniform mat4 j;void main(void){mat4 offsetMatrix=i;if(g==1.0){offsetMatrix=i*j;}vec4 offsets=offsetMatrix*vec4(e,0.0,0.0);gl_Position=h*vec4(c,0.0,1.0)+offsets;a=d;b=f;}"}v(Li,ni);var Mi=new Li;
function Ni(a,b){this.c=a.getUniformLocation(b,"j");this.f=a.getUniformLocation(b,"i");this.a=a.getUniformLocation(b,"k");this.i=a.getUniformLocation(b,"h");this.v=a.getAttribLocation(b,"e");this.u=a.getAttribLocation(b,"f");this.b=a.getAttribLocation(b,"c");this.D=a.getAttribLocation(b,"g");this.C=a.getAttribLocation(b,"d")};function Oi(a,b){this.j=a;this.b=b;this.a={};this.c={};this.i={};this.l=this.v=this.f=this.o=null;(this.g=ja(fa,"OES_element_index_uint"))&&b.getExtension("OES_element_index_uint");y(this.j,"webglcontextlost",this.Xo,this);y(this.j,"webglcontextrestored",this.Yo,this)}v(Oi,Mc);
function wi(a,b,c){var d=a.b,e=c.b,f=String(w(c));if(f in a.a)d.bindBuffer(b,a.a[f].buffer);else{var g=d.createBuffer();d.bindBuffer(b,g);var h;34962==b?h=new Float32Array(e):34963==b&&(h=a.g?new Uint32Array(e):new Uint16Array(e));d.bufferData(b,h,c.a);a.a[f]={lc:c,buffer:g}}}function Gi(a,b){var c=a.b;b=String(w(b));var d=a.a[b];c.isContextLost()||c.deleteBuffer(d.buffer);delete a.a[b]}k=Oi.prototype;
k.ka=function(){Lc(this.j);var a=this.b;if(!a.isContextLost()){for(var b in this.a)a.deleteBuffer(this.a[b].buffer);for(b in this.i)a.deleteProgram(this.i[b]);for(b in this.c)a.deleteShader(this.c[b]);a.deleteFramebuffer(this.f);a.deleteRenderbuffer(this.l);a.deleteTexture(this.v)}};k.Wo=function(){return this.b};
function Pi(a){if(!a.f){var b=a.b,c=b.createFramebuffer();b.bindFramebuffer(b.FRAMEBUFFER,c);var d=Qi(b,1,1),e=b.createRenderbuffer();b.bindRenderbuffer(b.RENDERBUFFER,e);b.renderbufferStorage(b.RENDERBUFFER,b.DEPTH_COMPONENT16,1,1);b.framebufferTexture2D(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_2D,d,0);b.framebufferRenderbuffer(b.FRAMEBUFFER,b.DEPTH_ATTACHMENT,b.RENDERBUFFER,e);b.bindTexture(b.TEXTURE_2D,null);b.bindRenderbuffer(b.RENDERBUFFER,null);b.bindFramebuffer(b.FRAMEBUFFER,null);a.f=c;
a.v=d;a.l=e}return a.f}function Ri(a,b){var c=String(w(b));if(c in a.c)return a.c[c];var d=a.b,e=d.createShader(b.U());d.shaderSource(e,b.b);d.compileShader(e);return a.c[c]=e}function Hi(a,b,c){var d=w(b)+"/"+w(c);if(d in a.i)return a.i[d];var e=a.b,f=e.createProgram();e.attachShader(f,Ri(a,b));e.attachShader(f,Ri(a,c));e.linkProgram(f);return a.i[d]=f}k.Xo=function(){ub(this.a);ub(this.c);ub(this.i);this.l=this.v=this.f=this.o=null};k.Yo=function(){};
k.Qc=function(a){if(a==this.o)return!1;this.b.useProgram(a);this.o=a;return!0};function Si(a,b,c){var d=a.createTexture();a.bindTexture(a.TEXTURE_2D,d);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.LINEAR);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR);void 0!==b&&a.texParameteri(3553,10242,b);void 0!==c&&a.texParameteri(3553,10243,c);return d}function Qi(a,b,c){var d=Si(a,void 0,void 0);a.texImage2D(a.TEXTURE_2D,0,a.RGBA,b,c,0,a.RGBA,a.UNSIGNED_BYTE,null);return d}
function Ti(a,b){var c=Si(a,33071,33071);a.texImage2D(a.TEXTURE_2D,0,a.RGBA,a.RGBA,a.UNSIGNED_BYTE,b);return c};function Ui(a,b){vi.call(this,0,b);this.C=this.D=void 0;this.S=[];this.v=[];this.oa=void 0;this.j=[];this.c=[];this.I=this.ra=void 0;this.B=null;this.fb=this.fa=this.na=this.T=this.Ua=this.R=void 0;this.va=[];this.u=[];this.pa=void 0}v(Ui,vi);k=Ui.prototype;k.Eb=function(a){var b=this.l,c=this.o,d=this.va,e=this.u,f=a.b;return function(){if(!f.isContextLost()){var g;var h=0;for(g=d.length;h<g;++h)f.deleteTexture(d[h]);h=0;for(g=e.length;h<g;++h)f.deleteTexture(e[h])}Gi(a,b);Gi(a,c)}};
function Vi(a,b,c,d){var e=a.D,f=a.C,g=a.oa,h=a.ra,l=a.I,m=a.R,n=a.Ua,p=a.T,q=a.na?1:0,r=-a.fa,u=a.fb,x=a.pa,B=Math.cos(r),r=Math.sin(r),E=a.b.length,A=a.a.length,L;for(L=0;L<c;L+=d){var oa=b[L]-a.origin[0];var ha=b[L+1]-a.origin[1];var ga=A/8;var z=-u*e;var M=-u*(g-f);a.a[A++]=oa;a.a[A++]=ha;a.a[A++]=z*B-M*r;a.a[A++]=z*r+M*B;a.a[A++]=n/l;a.a[A++]=(p+g)/h;a.a[A++]=m;a.a[A++]=q;z=u*(x-e);M=-u*(g-f);a.a[A++]=oa;a.a[A++]=ha;a.a[A++]=z*B-M*r;a.a[A++]=z*r+M*B;a.a[A++]=(n+x)/l;a.a[A++]=(p+g)/h;a.a[A++]=
m;a.a[A++]=q;z=u*(x-e);M=u*f;a.a[A++]=oa;a.a[A++]=ha;a.a[A++]=z*B-M*r;a.a[A++]=z*r+M*B;a.a[A++]=(n+x)/l;a.a[A++]=p/h;a.a[A++]=m;a.a[A++]=q;z=-u*e;M=u*f;a.a[A++]=oa;a.a[A++]=ha;a.a[A++]=z*B-M*r;a.a[A++]=z*r+M*B;a.a[A++]=n/l;a.a[A++]=p/h;a.a[A++]=m;a.a[A++]=q;a.b[E++]=ga;a.b[E++]=ga+1;a.b[E++]=ga+2;a.b[E++]=ga;a.b[E++]=ga+2;a.b[E++]=ga+3}}k.oc=function(a,b){this.i.push(this.b.length);this.f.push(b);b=a.ga();Vi(this,b,b.length,a.qa())};
k.qc=function(a,b){this.i.push(this.b.length);this.f.push(b);b=a.ga();Vi(this,b,b.length,a.qa())};k.Db=function(a){a=a.b;this.S.push(this.b.length);this.v.push(this.b.length);this.l=new Di(this.a);this.o=new Di(this.b);var b={};Wi(this.va,this.j,b,a);Wi(this.u,this.c,b,a);this.oa=this.C=this.D=void 0;this.c=this.j=null;this.I=this.ra=void 0;this.b=null;this.fb=this.fa=this.na=this.T=this.Ua=this.R=void 0;this.a=null;this.pa=void 0};
function Wi(a,b,c,d){var e,f=b.length;for(e=0;e<f;++e){var g=b[e];var h=w(g).toString();h in c?g=c[h]:(g=Ti(d,g),c[h]=g);a[e]=g}}
k.rf=function(a,b){var c=Hi(b,Ki,Mi);if(this.B)var d=this.B;else this.B=d=new Ni(a,c);b.Qc(c);a.enableVertexAttribArray(d.b);a.vertexAttribPointer(d.b,2,5126,!1,32,0);a.enableVertexAttribArray(d.v);a.vertexAttribPointer(d.v,2,5126,!1,32,8);a.enableVertexAttribArray(d.C);a.vertexAttribPointer(d.C,2,5126,!1,32,16);a.enableVertexAttribArray(d.u);a.vertexAttribPointer(d.u,1,5126,!1,32,24);a.enableVertexAttribArray(d.D);a.vertexAttribPointer(d.D,1,5126,!1,32,28);return d};
k.sf=function(a,b){a.disableVertexAttribArray(b.b);a.disableVertexAttribArray(b.v);a.disableVertexAttribArray(b.C);a.disableVertexAttribArray(b.u);a.disableVertexAttribArray(b.D)};
k.Od=function(a,b,c,d){var e=d?this.u:this.va;d=d?this.v:this.S;if(wb(c)){var f;c=0;var g=e.length;for(f=0;c<g;++c){a.bindTexture(3553,e[c]);var h=d[c];xi(a,b,f,h);f=h}}else for(f=g=0,h=e.length;f<h;++f){a.bindTexture(3553,e[f]);for(var l=0<f?d[f-1]:0,m=d[f],n=l;g<this.i.length&&this.i[g]<=m;){var p=w(this.f[g]).toString();void 0!==c[p]?(n!==l&&xi(a,b,n,l),l=n=g===this.i.length-1?m:this.i[g+1]):l=g===this.i.length-1?m:this.i[g+1];g++}n!==l&&xi(a,b,n,l)}};
k.ve=function(a,b,c,d,e){var f,g,h=this.i.length-1;for(f=this.u.length-1;0<=f;--f){a.bindTexture(3553,this.u[f]);var l=0<f?this.v[f-1]:0;for(g=this.v[f];0<=h&&this.i[h]>=l;){var m=this.i[h];var n=this.f[h];var p=w(n).toString();if(void 0===c[p]&&n.V()&&(void 0===e||qb(e,n.V().G()))&&(a.clear(a.COLOR_BUFFER_BIT|a.DEPTH_BUFFER_BIT),xi(a,b,m,g),g=d(n)))return g;g=m;h--}}};
k.Ub=function(a){var b=a.Hc(),c=a.Y(1),d=a.ye(),e=a.qg(1),f=a.f,g=a.Oc(),h=a.l,l=a.g,m=a.ic();a=a.a;if(this.j.length){var n=this.j[this.j.length-1];w(n)!=w(c)&&(this.S.push(this.b.length),this.j.push(c))}else this.j.push(c);this.c.length?(n=this.c[this.c.length-1],w(n)!=w(e)&&(this.v.push(this.b.length),this.c.push(e))):this.c.push(e);this.D=b[0];this.C=b[1];this.oa=m[1];this.ra=d[1];this.I=d[0];this.R=f;this.Ua=g[0];this.T=g[1];this.fa=l;this.na=h;this.fb=a;this.pa=m[0]};function Xi(a,b,c){var d=b-c;return a[0]===a[d]&&a[1]===a[d+1]&&3<(b-0)/c?!!vf(a,0,b,c):!1};function Yi(){this.b="precision mediump float;varying float a;varying vec2 b;varying float c;uniform float m;uniform vec4 n;uniform vec2 o;uniform float p;void main(void){if(a>0.0){vec2 windowCoords=vec2((b.x+1.0)/2.0*o.x*p,(b.y+1.0)/2.0*o.y*p);if(length(windowCoords-gl_FragCoord.xy)>c*p){discard;}} gl_FragColor=n;float alpha=n.a*m;if(alpha==0.0){discard;}gl_FragColor.a=alpha;}"}v(Yi,mi);var Zi=new Yi;
function $i(){this.b="varying float a;varying vec2 b;varying float c;attribute vec2 d;attribute vec2 e;attribute vec2 f;attribute float g;uniform mat4 h;uniform mat4 i;uniform mat4 j;uniform float k;uniform float l;bool nearlyEquals(in float value,in float ref){float epsilon=0.000000000001;return value>=ref-epsilon&&value<=ref+epsilon;}void alongNormal(out vec2 offset,in vec2 nextP,in float turnDir,in float direction){vec2 dirVect=nextP-e;vec2 normal=normalize(vec2(-turnDir*dirVect.y,turnDir*dirVect.x));offset=k/2.0*normal*direction;}void miterUp(out vec2 offset,out float round,in bool isRound,in float direction){float halfWidth=k/2.0;vec2 tangent=normalize(normalize(f-e)+normalize(e-d));vec2 normal=vec2(-tangent.y,tangent.x);vec2 dirVect=f-e;vec2 tmpNormal=normalize(vec2(-dirVect.y,dirVect.x));float miterLength=abs(halfWidth/dot(normal,tmpNormal));offset=normal*direction*miterLength;round=0.0;if(isRound){round=1.0;}else if(miterLength>l+k){offset=halfWidth*tmpNormal*direction;}} bool miterDown(out vec2 offset,in vec4 projPos,in mat4 offsetMatrix,in float direction){bool degenerate=false;vec2 tangent=normalize(normalize(f-e)+normalize(e-d));vec2 normal=vec2(-tangent.y,tangent.x);vec2 dirVect=d-e;vec2 tmpNormal=normalize(vec2(-dirVect.y,dirVect.x));vec2 longOffset,shortOffset,longVertex;vec4 shortProjVertex;float halfWidth=k/2.0;if(length(f-e)>length(d-e)){longOffset=tmpNormal*direction*halfWidth;shortOffset=normalize(vec2(dirVect.y,-dirVect.x))*direction*halfWidth;longVertex=f;shortProjVertex=h*vec4(d,0.0,1.0);}else{shortOffset=tmpNormal*direction*halfWidth;longOffset=normalize(vec2(dirVect.y,-dirVect.x))*direction*halfWidth;longVertex=d;shortProjVertex=h*vec4(f,0.0,1.0);}vec4 p1=h*vec4(longVertex,0.0,1.0)+offsetMatrix*vec4(longOffset,0.0,0.0);vec4 p2=projPos+offsetMatrix*vec4(longOffset,0.0,0.0);vec4 p3=shortProjVertex+offsetMatrix*vec4(-shortOffset,0.0,0.0);vec4 p4=shortProjVertex+offsetMatrix*vec4(shortOffset,0.0,0.0);float denom=(p4.y-p3.y)*(p2.x-p1.x)-(p4.x-p3.x)*(p2.y-p1.y);float firstU=((p4.x-p3.x)*(p1.y-p3.y)-(p4.y-p3.y)*(p1.x-p3.x))/denom;float secondU=((p2.x-p1.x)*(p1.y-p3.y)-(p2.y-p1.y)*(p1.x-p3.x))/denom;float epsilon=0.000000000001;if(firstU>epsilon&&firstU<1.0-epsilon&&secondU>epsilon&&secondU<1.0-epsilon){shortProjVertex.x=p1.x+firstU*(p2.x-p1.x);shortProjVertex.y=p1.y+firstU*(p2.y-p1.y);offset=shortProjVertex.xy;degenerate=true;}else{float miterLength=abs(halfWidth/dot(normal,tmpNormal));offset=normal*direction*miterLength;}return degenerate;}void squareCap(out vec2 offset,out float round,in bool isRound,in vec2 nextP,in float turnDir,in float direction){round=0.0;vec2 dirVect=e-nextP;vec2 firstNormal=normalize(dirVect);vec2 secondNormal=vec2(turnDir*firstNormal.y*direction,-turnDir*firstNormal.x*direction);vec2 hypotenuse=normalize(firstNormal-secondNormal);vec2 normal=vec2(turnDir*hypotenuse.y*direction,-turnDir*hypotenuse.x*direction);float length=sqrt(c*c*2.0);offset=normal*length;if(isRound){round=1.0;}} void main(void){bool degenerate=false;float direction=float(sign(g));mat4 offsetMatrix=i*j;vec2 offset;vec4 projPos=h*vec4(e,0.0,1.0);bool round=nearlyEquals(mod(g,2.0),0.0);a=0.0;c=k/2.0;b=projPos.xy;if(nearlyEquals(mod(g,3.0),0.0)||nearlyEquals(mod(g,17.0),0.0)){alongNormal(offset,f,1.0,direction);}else if(nearlyEquals(mod(g,5.0),0.0)||nearlyEquals(mod(g,13.0),0.0)){alongNormal(offset,d,-1.0,direction);}else if(nearlyEquals(mod(g,23.0),0.0)){miterUp(offset,a,round,direction);}else if(nearlyEquals(mod(g,19.0),0.0)){degenerate=miterDown(offset,projPos,offsetMatrix,direction);}else if(nearlyEquals(mod(g,7.0),0.0)){squareCap(offset,a,round,f,1.0,direction);}else if(nearlyEquals(mod(g,11.0),0.0)){squareCap(offset,a,round,d,-1.0,direction);}if(!degenerate){vec4 offsets=offsetMatrix*vec4(offset,0.0,0.0);gl_Position=projPos+offsets;}else{gl_Position=vec4(offset,0.0,1.0);}}"}
v($i,ni);var aj=new $i;function bj(a,b){this.B=a.getUniformLocation(b,"n");this.oa=a.getUniformLocation(b,"k");this.R=a.getUniformLocation(b,"l");this.c=a.getUniformLocation(b,"j");this.f=a.getUniformLocation(b,"i");this.a=a.getUniformLocation(b,"m");this.ra=a.getUniformLocation(b,"p");this.i=a.getUniformLocation(b,"h");this.I=a.getUniformLocation(b,"o");this.g=a.getAttribLocation(b,"g");this.o=a.getAttribLocation(b,"d");this.l=a.getAttribLocation(b,"f");this.b=a.getAttribLocation(b,"e")};function cj(a,b){vi.call(this,0,b);this.v=null;this.u=[];this.j=[];this.c={strokeColor:null,lineCap:void 0,lineDash:null,lineDashOffset:void 0,lineJoin:void 0,lineWidth:void 0,miterLimit:void 0,s:!1}}v(cj,vi);
function dj(a,b,c,d){var e,f=a.a.length,g=a.b.length,h="bevel"===a.c.lineJoin?0:"miter"===a.c.lineJoin?1:2,l="butt"===a.c.lineCap?0:"square"===a.c.lineCap?1:2,m=Xi(b,c,d),n=g,p=1;for(e=0;e<c;e+=d){var q=f/7;var r=u;var u=x||[b[e],b[e+1]];if(e)if(e===c-d){if(m)var x=B;else r=r||[0,0],f=ej(a,r,u,[0,0],p*fj*(l||1),f),f=ej(a,r,u,[0,0],-p*fj*(l||1),f),a.b[g++]=q,a.b[g++]=n-1,a.b[g++]=n,a.b[g++]=n,a.b[g++]=q+1,a.b[g++]=q,l&&(f=ej(a,r,u,[0,0],p*gj*l,f),f=ej(a,r,u,[0,0],-p*gj*l,f),a.b[g++]=q+2,a.b[g++]=q,
a.b[g++]=q+1,a.b[g++]=q+1,a.b[g++]=q+3,a.b[g++]=q+2);break}else x=[b[e+d],b[e+d+1]];else{x=[b[e+d],b[e+d+1]];if(c-0===2*d&&pa(u,x))break;if(m){r=[b[c-2*d],b[c-2*d+1]];var B=x}else{l&&(f=ej(a,[0,0],u,x,p*hj*l,f),f=ej(a,[0,0],u,x,-p*hj*l,f),a.b[g++]=q+2,a.b[g++]=q,a.b[g++]=q+1,a.b[g++]=q+1,a.b[g++]=q+3,a.b[g++]=q+2);f=ej(a,[0,0],u,x,p*ij*(l||1),f);f=ej(a,[0,0],u,x,-p*ij*(l||1),f);n=f/7-1;continue}}var E=Bi(r[0],r[1],u[0],u[1],x[0],x[1])?-1:1;f=ej(a,r,u,x,E*jj*(h||1),f);f=ej(a,r,u,x,E*kj*(h||1),f);f=
ej(a,r,u,x,-E*lj*(h||1),f);0<e&&(a.b[g++]=q,a.b[g++]=n-1,a.b[g++]=n,a.b[g++]=q+2,a.b[g++]=q,a.b[g++]=0<p*E?n:n-1);a.b[g++]=q;a.b[g++]=q+2;a.b[g++]=q+1;n=q+2;p=E;h&&(f=ej(a,r,u,x,E*mj*h,f),a.b[g++]=q+1,a.b[g++]=q+3,a.b[g++]=q)}m&&(q=q||f/7,E=Sf([r[0],r[1],u[0],u[1],x[0],x[1]],0,6,2)?1:-1,f=ej(a,r,u,x,E*jj*(h||1),f),ej(a,r,u,x,-E*lj*(h||1),f),a.b[g++]=q,a.b[g++]=n-1,a.b[g++]=n,a.b[g++]=q+1,a.b[g++]=q,a.b[g++]=0<p*E?n:n-1)}
function ej(a,b,c,d,e,f){a.a[f++]=b[0];a.a[f++]=b[1];a.a[f++]=c[0];a.a[f++]=c[1];a.a[f++]=d[0];a.a[f++]=d[1];a.a[f++]=e;return f}function nj(a,b,c,d){c-=b;return c<2*d?!1:c===2*d?!pa([a[b],a[b+1]],[a[b+d],a[b+d+1]]):!0}k=cj.prototype;k.mc=function(a,b){var c=a.ga();a=a.qa();nj(c,0,c.length,a)&&(c=qf(c,0,c.length,a,-this.origin[0],-this.origin[1]),this.c.s&&(this.j.push(this.b.length),this.c.s=!1),this.i.push(this.b.length),this.f.push(b),dj(this,c,c.length,a))};
k.nc=function(a,b){var c=this.b.length,d=a.Bb();d.unshift(0);var e=a.ga();a=a.qa();var f;if(1<d.length){var g=1;for(f=d.length;g<f;++g)if(nj(e,d[g-1],d[g],a)){var h=qf(e,d[g-1],d[g],a,-this.origin[0],-this.origin[1]);dj(this,h,h.length,a)}}this.b.length>c&&(this.i.push(c),this.f.push(b),this.c.s&&(this.j.push(c),this.c.s=!1))};
function oj(a,b,c,d){Xi(b,b.length,d)||(b.push(b[0]),b.push(b[1]));dj(a,b,b.length,d);if(c.length){var e;b=0;for(e=c.length;b<e;++b)Xi(c[b],c[b].length,d)||(c[b].push(c[b][0]),c[b].push(c[b][1])),dj(a,c[b],c[b].length,d)}}function pj(a,b,c){c=void 0===c?a.b.length:c;a.i.push(c);a.f.push(b);a.c.s&&(a.j.push(c),a.c.s=!1)}k.Db=function(){this.l=new Di(this.a);this.o=new Di(this.b);this.i.push(this.b.length);!this.j.length&&0<this.u.length&&(this.u=[]);this.b=this.a=null};
k.Eb=function(a){var b=this.l,c=this.o;return function(){Gi(a,b);Gi(a,c)}};
k.rf=function(a,b,c,d){var e=Hi(b,Zi,aj);if(this.v)var f=this.v;else this.v=f=new bj(a,e);b.Qc(e);a.enableVertexAttribArray(f.o);a.vertexAttribPointer(f.o,2,5126,!1,28,0);a.enableVertexAttribArray(f.b);a.vertexAttribPointer(f.b,2,5126,!1,28,8);a.enableVertexAttribArray(f.l);a.vertexAttribPointer(f.l,2,5126,!1,28,16);a.enableVertexAttribArray(f.g);a.vertexAttribPointer(f.g,1,5126,!1,28,24);a.uniform2fv(f.I,c);a.uniform1f(f.ra,d);return f};
k.sf=function(a,b){a.disableVertexAttribArray(b.o);a.disableVertexAttribArray(b.b);a.disableVertexAttribArray(b.l);a.disableVertexAttribArray(b.g)};
k.Od=function(a,b,c,d){var e=a.getParameter(a.DEPTH_FUNC),f=a.getParameter(a.DEPTH_WRITEMASK);d||(a.enable(a.DEPTH_TEST),a.depthMask(!0),a.depthFunc(a.NOTEQUAL));if(wb(c)){var g=this.i[this.i.length-1];for(c=this.j.length-1;0<=c;--c){var h=this.j[c];var l=this.u[c];qj(this,a,l[0],l[1],l[2]);xi(a,b,h,g);a.clear(a.DEPTH_BUFFER_BIT);g=h}}else{var m=this.i.length-2;l=g=this.i[m+1];for(h=this.j.length-1;0<=h;--h){var n=this.u[h];qj(this,a,n[0],n[1],n[2]);for(n=this.j[h];0<=m&&this.i[m]>=n;){var p=this.i[m];
var q=this.f[m];q=w(q).toString();c[q]&&(g!==l&&(xi(a,b,g,l),a.clear(a.DEPTH_BUFFER_BIT)),l=p);m--;g=p}g!==l&&(xi(a,b,g,l),a.clear(a.DEPTH_BUFFER_BIT));g=l=n}}d||(a.disable(a.DEPTH_TEST),a.clear(a.DEPTH_BUFFER_BIT),a.depthMask(f),a.depthFunc(e))};
k.ve=function(a,b,c,d,e){var f,g;var h=this.i.length-2;var l=this.i[h+1];for(f=this.j.length-1;0<=f;--f){var m=this.u[f];qj(this,a,m[0],m[1],m[2]);for(g=this.j[f];0<=h&&this.i[h]>=g;){m=this.i[h];var n=this.f[h];var p=w(n).toString();if(void 0===c[p]&&n.V()&&(void 0===e||qb(e,n.V().G()))&&(a.clear(a.COLOR_BUFFER_BIT|a.DEPTH_BUFFER_BIT),xi(a,b,m,l),l=d(n)))return l;h--;l=m}}};function qj(a,b,c,d,e){b.uniform4fv(a.v.B,c);b.uniform1f(a.v.oa,d);b.uniform1f(a.v.R,e)}
k.Ma=function(a,b){a=b.f;this.c.lineCap=void 0!==a?a:"round";a=b.i;this.c.lineDash=a?a:zi;a=b.g;this.c.lineDashOffset=a?a:0;a=b.j;this.c.lineJoin=void 0!==a?a:"round";a=b.a;a instanceof CanvasGradient||a instanceof CanvasPattern?a=Ai:a=ed(a).map(function(a,b){return 3!=b?a/255:a})||Ai;var c=b.c,c=void 0!==c?c:1;b=b.o;b=void 0!==b?b:10;this.c.strokeColor&&pa(this.c.strokeColor,a)&&this.c.lineWidth===c&&this.c.miterLimit===b||(this.c.s=!0,this.c.strokeColor=a,this.c.lineWidth=c,this.c.miterLimit=b,
this.u.push([a,c,b]))};var ij=3,fj=5,hj=7,gj=11,jj=13,kj=17,lj=19,mj=23;function rj(){this.b="precision mediump float;uniform vec4 e;uniform float f;void main(void){gl_FragColor=e;float alpha=e.a*f;if(alpha==0.0){discard;}gl_FragColor.a=alpha;}"}v(rj,mi);var sj=new rj;function tj(){this.b="attribute vec2 a;uniform mat4 b;uniform mat4 c;uniform mat4 d;void main(void){gl_Position=b*vec4(a,0.0,1.0);}"}v(tj,ni);var uj=new tj;
function vj(a,b){this.B=a.getUniformLocation(b,"e");this.c=a.getUniformLocation(b,"d");this.f=a.getUniformLocation(b,"c");this.a=a.getUniformLocation(b,"f");this.i=a.getUniformLocation(b,"b");this.b=a.getAttribLocation(b,"a")};function wj(a){a=a||{};this.a=void 0!==a.color?a.color:null;this.f=a.lineCap;this.i=void 0!==a.lineDash?a.lineDash:null;this.g=a.lineDashOffset;this.j=a.lineJoin;this.o=a.miterLimit;this.c=a.width;this.b=void 0}k=wj.prototype;k.clone=function(){var a=this.a;return new wj({color:a&&a.slice?a.slice():a||void 0,lineCap:this.f,lineDash:this.i?this.i.slice():void 0,lineDashOffset:this.g,lineJoin:this.j,miterLimit:this.o,width:this.c})};k.No=function(){return this.a};k.Vk=function(){return this.f};
k.Oo=function(){return this.i};k.Wk=function(){return this.g};k.Xk=function(){return this.j};k.bl=function(){return this.o};k.Po=function(){return this.c};k.Qo=function(a){this.a=a;this.b=void 0};k.aq=function(a){this.f=a;this.b=void 0};k.setLineDash=function(a){this.i=a;this.b=void 0};k.bq=function(a){this.g=a;this.b=void 0};k.cq=function(a){this.j=a;this.b=void 0};k.gq=function(a){this.o=a;this.b=void 0};k.jq=function(a){this.c=a;this.b=void 0};function xj(a){this.b=this.a=this.i=void 0;this.f=void 0===a?!0:a;this.c=0}function yj(a){var b=a.b;if(b){var c=b.next,d=b.ub;c&&(c.ub=d);d&&(d.next=c);a.b=c||d;a.i===a.a?(a.b=void 0,a.i=void 0,a.a=void 0):a.i===b?a.i=a.b:a.a===b&&(a.a=d?a.b.ub:a.b);a.c--}}function zj(a){a.b=a.i;if(a.b)return a.b.data}function Aj(a){if(a.b&&a.b.next)return a.b=a.b.next,a.b.data}function Bj(a){if(a.b&&a.b.next)return a.b.next.data}function Cj(a){if(a.b&&a.b.ub)return a.b=a.b.ub,a.b.data}
function Dj(a){if(a.b&&a.b.ub)return a.b.ub.data}function Ej(a){if(a.b)return a.b.data}xj.prototype.concat=function(a){if(a.b){if(this.b){var b=this.b.next;this.b.next=a.i;a.i.ub=this.b;b.ub=a.a;a.a.next=b;this.c+=a.c}else this.b=a.b,this.i=a.i,this.a=a.a,this.c=a.c;a.b=void 0;a.i=void 0;a.a=void 0;a.c=0}};var Fj={$d:function(){}};
(function(a){function b(a,e,f,g,h){f=f||0;g=g||a.length-1;for(h=h||d;g>f;){if(600<g-f){var l=g-f+1,m=e-f+1,n=Math.log(l),p=.5*Math.exp(2*n/3),n=.5*Math.sqrt(n*p*(l-p)/l)*(0>m-l/2?-1:1);b(a,e,Math.max(f,Math.floor(e-m*p/l+n)),Math.min(g,Math.floor(e+(l-m)*p/l+n)),h)}l=a[e];m=f;p=g;c(a,f,e);for(0<h(a[g],l)&&c(a,f,g);m<p;){c(a,m,p);m++;for(p--;0>h(a[m],l);)m++;for(;0<h(a[p],l);)p--}0===h(a[f],l)?c(a,f,p):(p++,c(a,p,g));p<=e&&(f=p+1);e<=p&&(g=p-1)}}function c(a,b,c){var d=a[b];a[b]=a[c];a[c]=d}function d(a,
b){return a<b?-1:a>b?1:0}function e(a,b){if(!(this instanceof e))return new e(a,b);this.Hf=Math.max(4,a||9);this.fh=Math.max(2,Math.ceil(.4*this.Hf));b&&this.ek(b);this.clear()}function f(a,b){g(a,0,a.children.length,b,a)}function g(a,b,c,d,e){e||(e=u(null));e.ca=Infinity;e.da=Infinity;e.$=-Infinity;e.ia=-Infinity;for(var f;b<c;b++)f=a.children[b],h(e,a.ib?d(f):f);return e}function h(a,b){a.ca=Math.min(a.ca,b.ca);a.da=Math.min(a.da,b.da);a.$=Math.max(a.$,b.$);a.ia=Math.max(a.ia,b.ia)}function l(a,
b){return a.ca-b.ca}function m(a,b){return a.da-b.da}function n(a){return(a.$-a.ca)*(a.ia-a.da)}function p(a){return a.$-a.ca+(a.ia-a.da)}function q(a,b){return a.ca<=b.ca&&a.da<=b.da&&b.$<=a.$&&b.ia<=a.ia}function r(a,b){return b.ca<=a.$&&b.da<=a.ia&&b.$>=a.ca&&b.ia>=a.da}function u(a){return{children:a,height:1,ib:!0,ca:Infinity,da:Infinity,$:-Infinity,ia:-Infinity}}function x(a,b,c,d,e){for(var f=[b,c],g;f.length;)c=f.pop(),b=f.pop(),c-b<=d||(g=b+Math.ceil((c-b)/d/2)*d,B(a,g,b,c,e),f.push(b,g,
g,c))}var B=b;e.prototype={all:function(){return this.$g(this.data,[])},search:function(a){var b=this.data,c=[],d=this.wb;if(!r(a,b))return c;for(var e=[],f,g,h,l;b;){f=0;for(g=b.children.length;f<g;f++)h=b.children[f],l=b.ib?d(h):h,r(a,l)&&(b.ib?c.push(h):q(a,l)?this.$g(h,c):e.push(h));b=e.pop()}return c},load:function(a){if(!a||!a.length)return this;if(a.length<this.fh){for(var b=0,c=a.length;b<c;b++)this.Ca(a[b]);return this}a=this.bh(a.slice(),0,a.length-1,0);this.data.children.length?this.data.height===
a.height?this.hh(this.data,a):(this.data.height<a.height&&(b=this.data,this.data=a,a=b),this.eh(a,this.data.height-a.height-1,!0)):this.data=a;return this},Ca:function(a){a&&this.eh(a,this.data.height-1);return this},clear:function(){this.data=u([]);return this},remove:function(a,b){if(!a)return this;for(var c=this.data,d=this.wb(a),e=[],f=[],g,h,l,m;c||e.length;){c||(c=e.pop(),h=e[e.length-1],g=f.pop(),m=!0);if(c.ib){a:{l=a;var n=c.children,p=b;if(p){for(var r=0;r<n.length;r++)if(p(l,n[r])){l=r;
break a}l=-1}else l=n.indexOf(l)}if(-1!==l){c.children.splice(l,1);e.push(c);this.ck(e);break}}m||c.ib||!q(c,d)?h?(g++,c=h.children[g],m=!1):c=null:(e.push(c),f.push(g),g=0,h=c,c=c.children[0])}return this},wb:function(a){return a},Lf:l,Mf:m,toJSON:function(){return this.data},$g:function(a,b){for(var c=[];a;)a.ib?b.push.apply(b,a.children):c.push.apply(c,a.children),a=c.pop();return b},bh:function(a,b,c,d){var e=c-b+1,g=this.Hf;if(e<=g){var h=u(a.slice(b,c+1));f(h,this.wb);return h}d||(d=Math.ceil(Math.log(e)/
Math.log(g)),g=Math.ceil(e/Math.pow(g,d-1)));h=u([]);h.ib=!1;h.height=d;var e=Math.ceil(e/g),g=e*Math.ceil(Math.sqrt(g)),l;for(x(a,b,c,g,this.Lf);b<=c;b+=g){var m=Math.min(b+g-1,c);x(a,b,m,e,this.Mf);for(l=b;l<=m;l+=e){var n=Math.min(l+e-1,m);h.children.push(this.bh(a,l,n,d-1))}}f(h,this.wb);return h},bk:function(a,b,c,d){for(var e,f,g,h,l,m,p,q;;){d.push(b);if(b.ib||d.length-1===c)break;p=q=Infinity;e=0;for(f=b.children.length;e<f;e++)g=b.children[e],l=n(g),m=(Math.max(g.$,a.$)-Math.min(g.ca,a.ca))*
(Math.max(g.ia,a.ia)-Math.min(g.da,a.da))-l,m<q?(q=m,p=l<p?l:p,h=g):m===q&&l<p&&(p=l,h=g);b=h||b.children[0]}return b},eh:function(a,b,c){var d=this.wb;c=c?a:d(a);var d=[],e=this.bk(c,this.data,b,d);e.children.push(a);for(h(e,c);0<=b;)if(d[b].children.length>this.Hf)this.jk(d,b),b--;else break;this.Zj(c,d,b)},jk:function(a,b){var c=a[b],d=c.children.length,e=this.fh;this.$j(c,e,d);d=this.ak(c,e,d);d=u(c.children.splice(d,c.children.length-d));d.height=c.height;d.ib=c.ib;f(c,this.wb);f(d,this.wb);
b?a[b-1].children.push(d):this.hh(c,d)},hh:function(a,b){this.data=u([a,b]);this.data.height=a.height+1;this.data.ib=!1;f(this.data,this.wb)},ak:function(a,b,c){var d,e;var f=e=Infinity;for(d=b;d<=c-b;d++){var h=g(a,0,d,this.wb);var l=g(a,d,c,this.wb);var m=Math.max(0,Math.min(h.$,l.$)-Math.max(h.ca,l.ca))*Math.max(0,Math.min(h.ia,l.ia)-Math.max(h.da,l.da));h=n(h)+n(l);if(m<f){f=m;var p=d;e=h<e?h:e}else m===f&&h<e&&(e=h,p=d)}return p},$j:function(a,b,c){var d=a.ib?this.Lf:l,e=a.ib?this.Mf:m,f=this.ah(a,
b,c,d);b=this.ah(a,b,c,e);f<b&&a.children.sort(d)},ah:function(a,b,c,d){a.children.sort(d);d=this.wb;var e=g(a,0,b,d),f=g(a,c-b,c,d),l=p(e)+p(f),m;for(m=b;m<c-b;m++){var n=a.children[m];h(e,a.ib?d(n):n);l+=p(e)}for(m=c-b-1;m>=b;m--)n=a.children[m],h(f,a.ib?d(n):n),l+=p(f);return l},Zj:function(a,b,c){for(;0<=c;c--)h(b[c],a)},ck:function(a){for(var b=a.length-1,c;0<=b;b--)0===a[b].children.length?0<b?(c=a[b-1].children,c.splice(c.indexOf(a[b]),1)):this.clear():f(a[b],this.wb)},ek:function(a){var b=
["return a"," - b",";"];this.Lf=new Function("a","b",b.join(a[0]));this.Mf=new Function("a","b",b.join(a[1]));this.wb=new Function("a","return {minX: a"+a[0]+", minY: a"+a[1]+", maxX: a"+a[2]+", maxY: a"+a[3]+"};")}};a["default"]=e})(Fj.$d=Fj.$d||{});Fj.$d=Fj.$d.default;function Gj(a){this.a=Fj.$d(a);this.b={}}k=Gj.prototype;k.Ca=function(a,b){a={ca:a[0],da:a[1],$:a[2],ia:a[3],value:b};this.a.Ca(a);this.b[w(b)]=a};k.load=function(a,b){for(var c=Array(b.length),d=0,e=b.length;d<e;d++){var f=a[d],g=b[d],f={ca:f[0],da:f[1],$:f[2],ia:f[3],value:g};c[d]=f;this.b[w(g)]=f}this.a.load(c)};k.remove=function(a){a=w(a);var b=this.b[a];delete this.b[a];return null!==this.a.remove(b)};function Hj(a,b,c){var d=a.b[w(c)];bb([d.ca,d.da,d.$,d.ia],b)||(a.remove(c),a.Ca(b,c))}
function Ij(a){return a.a.all().map(function(a){return a.value})}function Jj(a,b){return a.a.search({ca:b[0],da:b[1],$:b[2],ia:b[3]}).map(function(a){return a.value})}k.forEach=function(a,b){return Kj(Ij(this),a,b)};function Lj(a,b,c,d){return Kj(Jj(a,b),c,d)}function Kj(a,b,c){for(var d,e=0,f=a.length;e<f&&!(d=b.call(c,a[e]));e++);return d}k.clear=function(){this.a.clear();this.b={}};k.G=function(a){var b=this.a.data;return Xa(b.ca,b.da,b.$,b.ia,a)};
k.concat=function(a){this.a.load(a.a.all());for(var b in a.b)this.b[b|0]=a.b[b|0]};function Mj(a,b){vi.call(this,0,b);this.g=new cj(0,b);this.v=null;this.u=[];this.c=[];this.j={fillColor:null,s:!1}}v(Mj,vi);
function Nj(a,b,c,d){var e=new xj,f=new Gj;b=Oj(a,b,d,e,f,!0);if(c.length){var g,h=[];var l=0;for(g=c.length;l<g;++l){var m={list:new xj,$:void 0,Mg:new Gj};h.push(m);m.$=Oj(a,c[l],d,m.list,m.Mg,!1)}h.sort(function(a,b){return b.$[0]===a.$[0]?a.$[1]-b.$[1]:b.$[0]-a.$[0]});for(l=0;l<h.length;++l){c=h[l].list;g=d=zj(c);do{if(Pj(g,f).length){var n=!0;break}g=Aj(c)}while(d!==g);n||(Qj(c,h[l].Mg,!0),Rj(c,h[l].$[0],e,b[0],f)&&(f.concat(h[l].Mg),Qj(e,f,!1)))}}else Qj(e,f,!1);Sj(a,e,f)}
function Oj(a,b,c,d,e,f){var g,h=a.a.length/2,l,m=[],n=[];if(f===Sf(b,0,b.length,c)){var p=l=Tj(a,b[0],b[1],h++);f=b[0];var q=b[1];var r=c;for(g=b.length;r<g;r+=c){var u=Tj(a,b[r],b[r+1],h++);n.push(Uj(p,u,d));m.push([Math.min(p.x,u.x),Math.min(p.y,u.y),Math.max(p.x,u.x),Math.max(p.y,u.y)]);b[r]>f&&(f=b[r],q=b[r+1]);p=u}}else for(r=b.length-c,p=l=Tj(a,b[r],b[r+1],h++),f=b[r],q=b[r+1],r-=c,g=0;r>=g;r-=c)u=Tj(a,b[r],b[r+1],h++),n.push(Uj(p,u,d)),m.push([Math.min(p.x,u.x),Math.min(p.y,u.y),Math.max(p.x,
u.x),Math.max(p.y,u.y)]),b[r]>f&&(f=b[r],q=b[r+1]),p=u;n.push(Uj(u,l,d));m.push([Math.min(p.x,u.x),Math.min(p.y,u.y),Math.max(p.x,u.x),Math.max(p.y,u.y)]);e.load(m,n);return[f,q]}function Qj(a,b,c){var d=zj(a),e=d,f=Aj(a),g=!1;do{var h=c?Bi(f.W.x,f.W.y,e.W.x,e.W.y,e.aa.x,e.aa.y):Bi(e.aa.x,e.aa.y,e.W.x,e.W.y,f.W.x,f.W.y);void 0===h?(Vj(e,f,a,b),g=!0,f===d&&(d=Bj(a)),f=e,Cj(a)):e.W.Fb!==h&&(e.W.Fb=h,g=!0);e=f;f=Aj(a)}while(e!==d);return g}
function Rj(a,b,c,d,e){for(var f=zj(a);f.W.x!==b;)f=Aj(a);b=f.W;d={x:d,y:b.y,hb:-1};var g=Infinity,h;var l=Pj({aa:b,W:d},e,!0);var m=0;for(h=l.length;m<h;++m){var n=l[m],p=Wj(b,d,n.aa,n.W,!0),q=Math.abs(b.x-p[0]);if(q<g&&void 0!==Bi(b.x,b.y,n.aa.x,n.aa.y,n.W.x,n.W.y)){g=q;var r={x:p[0],y:p[1],hb:-1};f=n}}if(Infinity===g)return!1;l=f.W;if(0<g&&(f=Xj(b,r,f.W,e),f.length))for(r=Infinity,m=0,h=f.length;m<h;++m)if(g=f[m],n=Math.atan2(b.y-g.y,d.x-g.x),n<r||n===r&&g.x<l.x)r=n,l=g;for(f=zj(c);f.W.x!==l.x||
f.W.y!==l.y;)f=Aj(c);d={x:b.x,y:b.y,hb:b.hb,Fb:void 0};m={x:f.W.x,y:f.W.y,hb:f.W.hb,Fb:void 0};Bj(a).aa=d;Uj(b,f.W,a,e);Uj(m,d,a,e);f.W=m;a.f&&a.b&&(a.i=a.b,a.a=a.b.ub);c.concat(a);return!0}
function Sj(a,b,c){for(var d=!1,e=Yj(b,c);3<b.c;)if(e){if(!Zj(a,b,c,e,d)&&!Qj(b,c,d)&&!ak(a,b,c,!0))break}else if(!Zj(a,b,c,e,d)&&!Qj(b,c,d)&&!ak(a,b,c))if(e=Yj(b,c)){var d=b,f=2*d.c,g=Array(f),h=zj(d),l=h,m=0;do g[m++]=l.aa.x,g[m++]=l.aa.y,l=Aj(d);while(l!==h);d=!Sf(g,0,f,2);Qj(b,c,d)}else{e=a;d=b;f=g=zj(d);do{h=Pj(f,c);if(h.length){g=h[0];h=Wj(f.aa,f.W,g.aa,g.W);h=Tj(e,h[0],h[1],e.a.length/2);l=new xj;m=new Gj;Uj(h,f.W,l,m);f.W=h;Hj(c,[Math.min(f.aa.x,h.x),Math.min(f.aa.y,h.y),Math.max(f.aa.x,h.x),
Math.max(f.aa.y,h.y)],f);for(f=Aj(d);f!==g;)Uj(f.aa,f.W,l,m),c.remove(f),yj(d),f=Ej(d);Uj(g.aa,h,l,m);g.aa=h;Hj(c,[Math.min(g.W.x,h.x),Math.min(g.W.y,h.y),Math.max(g.W.x,h.x),Math.max(g.W.y,h.y)],g);Qj(d,c,!1);Sj(e,d,c);Qj(l,m,!1);Sj(e,l,m);break}f=Aj(d)}while(f!==g);break}3===b.c&&(e=a.b.length,a.b[e++]=Dj(b).aa.hb,a.b[e++]=Ej(b).aa.hb,a.b[e++]=Bj(b).aa.hb)}
function Zj(a,b,c,d,e){var f=a.b.length,g=zj(b),h=Dj(b),l=g,m=Aj(b),n=Bj(b),p=!1;do{var q=l.aa;var r=l.W;var u=m.W;if(!1===r.Fb){var x=e?bk(n.W,u,r,q,h.aa):bk(h.aa,q,r,u,n.W);!d&&Pj({aa:q,W:u},c).length||!x||Xj(q,r,u,c,!0).length||!d&&!1!==q.Fb&&!1!==u.Fb&&Sf([h.aa.x,h.aa.y,q.x,q.y,r.x,r.y,u.x,u.y,n.W.x,n.W.y],0,10,2)!==!e||(a.b[f++]=q.hb,a.b[f++]=r.hb,a.b[f++]=u.hb,Vj(l,m,b,c),m===g&&(g=n),p=!0)}h=Dj(b);l=Ej(b);m=Aj(b);n=Bj(b)}while(l!==g&&3<b.c);return p}
function ak(a,b,c,d){var e=zj(b);Aj(b);var f=e,g=Aj(b),h=!1;do{var l=Wj(f.aa,f.W,g.aa,g.W,d);if(l){var h=a.b.length,m=a.a.length/2,n=Cj(b);yj(b);c.remove(n);var p=n===e;d?(l[0]===f.aa.x&&l[1]===f.aa.y?(Cj(b),l=f.aa,g.aa=l,c.remove(f),p=p||f===e):(l=g.W,f.W=l,c.remove(g),p=p||g===e),yj(b)):(l=Tj(a,l[0],l[1],m),f.W=l,g.aa=l,Hj(c,[Math.min(f.aa.x,f.W.x),Math.min(f.aa.y,f.W.y),Math.max(f.aa.x,f.W.x),Math.max(f.aa.y,f.W.y)],f),Hj(c,[Math.min(g.aa.x,g.W.x),Math.min(g.aa.y,g.W.y),Math.max(g.aa.x,g.W.x),
Math.max(g.aa.y,g.W.y)],g));a.b[h++]=n.aa.hb;a.b[h++]=n.W.hb;a.b[h++]=l.hb;h=!0;if(p)break}f=Dj(b);g=Aj(b)}while(f!==e);return h}function Yj(a,b){var c=zj(a),d=c;do{if(Pj(d,b).length)return!1;d=Aj(a)}while(d!==c);return!0}function Tj(a,b,c,d){var e=a.a.length;a.a[e++]=b;a.a[e++]=c;return{x:b,y:c,hb:d,Fb:void 0}}
function Uj(a,b,c,d){var e={aa:a,W:b},f={ub:void 0,next:void 0,data:e},g=c.b;if(g){var h=g.next;f.ub=g;f.next=h;g.next=f;h&&(h.ub=f);g===c.a&&(c.a=f)}else c.i=f,c.a=f,c.f&&(f.next=f,f.ub=f);c.b=f;c.c++;d&&d.Ca([Math.min(a.x,b.x),Math.min(a.y,b.y),Math.max(a.x,b.x),Math.max(a.y,b.y)],e);return e}function Vj(a,b,c,d){Ej(c)===b&&(yj(c),a.W=b.W,d.remove(b),Hj(d,[Math.min(a.aa.x,a.W.x),Math.min(a.aa.y,a.W.y),Math.max(a.aa.x,a.W.x),Math.max(a.aa.y,a.W.y)],a))}
function Xj(a,b,c,d,e){var f,g,h=[],l=Jj(d,[Math.min(a.x,b.x,c.x),Math.min(a.y,b.y,c.y),Math.max(a.x,b.x,c.x),Math.max(a.y,b.y,c.y)]);d=0;for(f=l.length;d<f;++d)for(g in l[d]){var m=l[d][g];"object"!==typeof m||e&&!m.Fb||m.x===a.x&&m.y===a.y||m.x===b.x&&m.y===b.y||m.x===c.x&&m.y===c.y||-1!==h.indexOf(m)||!Mf([a.x,a.y,b.x,b.y,c.x,c.y],0,6,2,m.x,m.y)||h.push(m)}return h}
function Pj(a,b,c){var d=a.aa,e=a.W;b=Jj(b,[Math.min(d.x,e.x),Math.min(d.y,e.y),Math.max(d.x,e.x),Math.max(d.y,e.y)]);var f=[],g;var h=0;for(g=b.length;h<g;++h){var l=b[h];a!==l&&(c||l.aa!==e||l.W!==d)&&Wj(d,e,l.aa,l.W,c)&&f.push(l)}return f}
function Wj(a,b,c,d,e){var f=(d.y-c.y)*(b.x-a.x)-(d.x-c.x)*(b.y-a.y);if(f&&(d=((d.x-c.x)*(a.y-c.y)-(d.y-c.y)*(a.x-c.x))/f,c=((b.x-a.x)*(a.y-c.y)-(b.y-a.y)*(a.x-c.x))/f,!e&&d>Ci&&d<1-Ci&&c>Ci&&c<1-Ci||e&&0<=d&&1>=d&&0<=c&&1>=c))return[a.x+d*(b.x-a.x),a.y+d*(b.y-a.y)]}
function bk(a,b,c,d,e){if(void 0===b.Fb||void 0===d.Fb)return!1;var f=(c.x-d.x)*(b.y-d.y)>(c.y-d.y)*(b.x-d.x);e=(e.x-d.x)*(b.y-d.y)<(e.y-d.y)*(b.x-d.x);a=(a.x-b.x)*(d.y-b.y)>(a.y-b.y)*(d.x-b.x);c=(c.x-b.x)*(d.y-b.y)<(c.y-b.y)*(d.x-b.x);b=b.Fb?c||a:c&&a;return(d.Fb?e||f:e&&f)&&b}k=Mj.prototype;
k.pc=function(a,b){var c=a.c,d=a.qa(),e=this.b.length,f=this.g.b.length;a=a.ga();var g,h,l;var m=h=0;for(g=c.length;m<g;++m){var n=c[m];if(0<n.length){var p=qf(a,h,n[0],d,-this.origin[0],-this.origin[1]);if(p.length){var q=[];h=1;for(l=n.length;h<l;++h)if(n[h]!==n[h-1]){var r=qf(a,n[h-1],n[h],d,-this.origin[0],-this.origin[1]);q.push(r)}oj(this.g,p,q,d);Nj(this,p,q,d)}}h=n[n.length-1]}this.b.length>e&&(this.i.push(e),this.f.push(b),this.j.s&&(this.c.push(e),this.j.s=!1));this.g.b.length>f&&pj(this.g,
b,f)};k.rc=function(a,b){var c=a.Bb(),d=a.qa();if(0<c.length){a=a.ga().map(Number);var e=qf(a,0,c[0],d,-this.origin[0],-this.origin[1]);if(e.length){var f=[],g;var h=1;for(g=c.length;h<g;++h)if(c[h]!==c[h-1]){var l=qf(a,c[h-1],c[h],d,-this.origin[0],-this.origin[1]);f.push(l)}this.i.push(this.b.length);this.f.push(b);this.j.s&&(this.c.push(this.b.length),this.j.s=!1);pj(this.g,b);oj(this.g,e,f,d);Nj(this,e,f,d)}}};
k.Db=function(a){this.l=new Di(this.a);this.o=new Di(this.b);this.i.push(this.b.length);this.g.Db(a);!this.c.length&&0<this.u.length&&(this.u=[]);this.b=this.a=null};k.Eb=function(a){var b=this.l,c=this.o,d=this.g.Eb(a);return function(){Gi(a,b);Gi(a,c);d()}};k.rf=function(a,b){var c=Hi(b,sj,uj);if(this.v)var d=this.v;else this.v=d=new vj(a,c);b.Qc(c);a.enableVertexAttribArray(d.b);a.vertexAttribPointer(d.b,2,5126,!1,8,0);return d};k.sf=function(a,b){a.disableVertexAttribArray(b.b)};
k.Od=function(a,b,c,d){var e=a.getParameter(a.DEPTH_FUNC),f=a.getParameter(a.DEPTH_WRITEMASK);d||(a.enable(a.DEPTH_TEST),a.depthMask(!0),a.depthFunc(a.NOTEQUAL));if(wb(c)){var g=this.i[this.i.length-1];for(c=this.c.length-1;0<=c;--c){var h=this.c[c];var l=this.u[c];a.uniform4fv(this.v.B,l);xi(a,b,h,g);g=h}}else{var m=this.i.length-2;l=g=this.i[m+1];for(h=this.c.length-1;0<=h;--h){var n=this.u[h];a.uniform4fv(this.v.B,n);for(n=this.c[h];0<=m&&this.i[m]>=n;){var p=this.i[m];var q=this.f[m];q=w(q).toString();
c[q]&&(g!==l&&(xi(a,b,g,l),a.clear(a.DEPTH_BUFFER_BIT)),l=p);m--;g=p}g!==l&&(xi(a,b,g,l),a.clear(a.DEPTH_BUFFER_BIT));g=l=n}}d||(a.disable(a.DEPTH_TEST),a.clear(a.DEPTH_BUFFER_BIT),a.depthMask(f),a.depthFunc(e))};
k.ve=function(a,b,c,d,e){var f,g;var h=this.i.length-2;var l=this.i[h+1];for(f=this.c.length-1;0<=f;--f){var m=this.u[f];a.uniform4fv(this.v.B,m);for(g=this.c[f];0<=h&&this.i[h]>=g;){m=this.i[h];var n=this.f[h];var p=w(n).toString();if(void 0===c[p]&&n.V()&&(void 0===e||qb(e,n.V().G()))&&(a.clear(a.COLOR_BUFFER_BIT|a.DEPTH_BUFFER_BIT),xi(a,b,m,l),l=d(n)))return l;h--;l=m}}};
k.Ma=function(a,b){a=a?a.b:[0,0,0,0];a instanceof CanvasGradient||a instanceof CanvasPattern?a=yi:a=ed(a).map(function(a,b){return 3!=b?a/255:a})||yi;this.j.fillColor&&pa(a,this.j.fillColor)||(this.j.fillColor=a,this.j.s=!0,this.u.push(a));b?this.g.Ma(null,b):this.g.Ma(null,new wj({color:[0,0,0,0],lineWidth:0}))};function ck(){}ck.prototype.La=function(){};function dk(a,b,c){this.f=b;this.g=a;this.c=c;this.a={}}v(dk,ki);function ek(a,b){var c=[],d;for(d in a.a){var e=a.a[d],f;for(f in e)c.push(e[f].Eb(b))}return function(){for(var a=c.length,b,d=0;d<a;d++)b=c[d].apply(this,arguments);return b}}function fk(a,b){for(var c in a.a){var d=a.a[c],e;for(e in d)d[e].Db(b)}}dk.prototype.b=function(a,b){var c=void 0!==a?a.toString():"0";a=this.a[c];void 0===a&&(a={},this.a[c]=a);c=a[b];void 0===c&&(c=new gk[b](this.g,this.f),a[b]=c);return c};
dk.prototype.i=function(){return wb(this.a)};dk.prototype.La=function(a,b,c,d,e,f,g,h){var l=Object.keys(this.a).map(Number);l.sort(ia);var m,n;var p=0;for(m=l.length;p<m;++p){var q=this.a[l[p].toString()];var r=0;for(n=ji.length;r<n;++r){var u=q[ji[r]];void 0!==u&&u.La(a,b,c,d,e,f,g,h,void 0,!1)}}};
function hk(a,b,c,d,e,f,g,h,l,m,n){var p=ik,q=Object.keys(a.a).map(Number);q.sort(function(a,b){return b-a});var r,u;var x=0;for(r=q.length;x<r;++x){var B=a.a[q[x].toString()];for(u=ji.length-1;0<=u;--u){var E=B[ji[u]];if(void 0!==E&&(E=E.La(b,c,d,e,p,f,g,h,l,m,n)))return E}}}
dk.prototype.Ea=function(a,b,c,d,e,f,g,h,l,m){var n=b.b;n.bindFramebuffer(n.FRAMEBUFFER,Pi(b));var p;void 0!==this.c&&(p=Qa(Za(a),d*this.c));return hk(this,b,a,d,e,g,h,l,function(a){var b=new Uint8Array(4);n.readPixels(0,0,1,1,n.RGBA,n.UNSIGNED_BYTE,b);if(0<b[3]&&(a=m(a)))return a},!0,p)};
function jk(a,b,c,d,e,f,g,h){var l=c.b;l.bindFramebuffer(l.FRAMEBUFFER,Pi(c));return void 0!==hk(a,c,b,d,e,f,g,h,function(){var a=new Uint8Array(4);l.readPixels(0,0,1,1,l.RGBA,l.UNSIGNED_BYTE,a);return 0<a[3]},!1)}var ik=[1,1],gk={Circle:Fi,Image:Ui,LineString:cj,Polygon:Mj,Text:ck};function kk(a,b,c,d,e,f,g){this.b=a;this.i=b;this.a=f;this.c=g;this.j=e;this.g=d;this.f=c;this.o=this.l=this.v=null}v(kk,Wh);k=kk.prototype;k.rd=function(a){this.Ma(a.Fa(),a.Ga());this.Ub(a.Y())};
k.zb=function(a){switch(a.U()){case "Point":this.qc(a,null);break;case "LineString":this.mc(a,null);break;case "Polygon":this.rc(a,null);break;case "MultiPoint":this.oc(a,null);break;case "MultiLineString":this.nc(a,null);break;case "MultiPolygon":this.pc(a,null);break;case "GeometryCollection":this.ue(a,null);break;case "Circle":this.Zb(a,null)}};k.te=function(a,b){(a=(0,b.Za)(a))&&qb(this.a,a.G())&&(this.rd(b),this.zb(a))};k.ue=function(a){a=a.a;var b;var c=0;for(b=a.length;c<b;++c)this.zb(a[c])};
k.qc=function(a,b){var c=this.b,d=(new dk(1,this.a)).b(0,"Image");d.Ub(this.v);d.qc(a,b);d.Db(c);d.La(this.b,this.i,this.f,this.g,this.j,this.c,1,{},void 0,!1);d.Eb(c)()};k.oc=function(a,b){var c=this.b,d=(new dk(1,this.a)).b(0,"Image");d.Ub(this.v);d.oc(a,b);d.Db(c);d.La(this.b,this.i,this.f,this.g,this.j,this.c,1,{},void 0,!1);d.Eb(c)()};
k.mc=function(a,b){var c=this.b,d=(new dk(1,this.a)).b(0,"LineString");d.Ma(null,this.o);d.mc(a,b);d.Db(c);d.La(this.b,this.i,this.f,this.g,this.j,this.c,1,{},void 0,!1);d.Eb(c)()};k.nc=function(a,b){var c=this.b,d=(new dk(1,this.a)).b(0,"LineString");d.Ma(null,this.o);d.nc(a,b);d.Db(c);d.La(this.b,this.i,this.f,this.g,this.j,this.c,1,{},void 0,!1);d.Eb(c)()};
k.rc=function(a,b){var c=this.b,d=(new dk(1,this.a)).b(0,"Polygon");d.Ma(this.l,this.o);d.rc(a,b);d.Db(c);d.La(this.b,this.i,this.f,this.g,this.j,this.c,1,{},void 0,!1);d.Eb(c)()};k.pc=function(a,b){var c=this.b,d=(new dk(1,this.a)).b(0,"Polygon");d.Ma(this.l,this.o);d.pc(a,b);d.Db(c);d.La(this.b,this.i,this.f,this.g,this.j,this.c,1,{},void 0,!1);d.Eb(c)()};
k.Zb=function(a,b){var c=this.b,d=(new dk(1,this.a)).b(0,"Circle");d.Ma(this.l,this.o);d.Zb(a,b);d.Db(c);d.La(this.b,this.i,this.f,this.g,this.j,this.c,1,{},void 0,!1);d.Eb(c)()};k.Ub=function(a){this.v=a};k.Ma=function(a,b){this.l=a;this.o=b};function lk(){this.c=0;this.b={};this.i=this.a=null}k=lk.prototype;k.clear=function(){this.c=0;this.b={};this.i=this.a=null};k.forEach=function(a,b){for(var c=this.a;c;)a.call(b,c.Yc,c.uc,this),c=c.Nb};k.get=function(a){a=this.b[a];xa(!!a,15);if(a===this.i)return a.Yc;a===this.a?(this.a=this.a.Nb,this.a.vd=null):(a.Nb.vd=a.vd,a.vd.Nb=a.Nb);a.Nb=null;a.vd=this.i;this.i=this.i.Nb=a;return a.Yc};
k.pop=function(){var a=this.a;delete this.b[a.uc];a.Nb&&(a.Nb.vd=null);this.a=a.Nb;this.a||(this.i=null);--this.c;return a.Yc};k.replace=function(a,b){this.get(a);this.b[a].Yc=b};k.set=function(a,b){xa(!(a in this.b),16);b={uc:a,Nb:null,vd:this.i,Yc:b};this.i?this.i.Nb=b:this.a=b;this.i=b;this.b[a]=b;++this.c};function mk(a,b){Mh.call(this,0,b);this.b=document.createElement("CANVAS");this.b.style.width="100%";this.b.style.height="100%";this.b.style.display="block";this.b.className="ol-unselectable";a.insertBefore(this.b,a.childNodes[0]||null);this.S=this.D=0;this.C=jd();this.l=!0;this.i=Ld(this.b,{antialias:!0,depth:!0,failIfMajorPerformanceCaveat:!0,preserveDrawingBuffer:!1,stencil:!0});this.f=new Oi(this.b,this.i);y(this.b,"webglcontextlost",this.Yn,this);y(this.b,"webglcontextrestored",this.Zn,this);
this.a=new lk;this.u=null;this.j=new Ke(function(a){var b=a[1];a=a[2];var c=b[0]-this.u[0],b=b[1]-this.u[1];return 65536*Math.log(a)+Math.sqrt(c*c+b*b)/a}.bind(this),function(a){return a[0].bb()});this.B=function(){if(this.j.b.length){Oe(this.j);var a=Le(this.j);nk(this,a[0],a[3],a[4])}return!1}.bind(this);this.g=0;ok(this)}v(mk,Mh);
function nk(a,b,c,d){var e=a.i,f=b.bb();if(a.a.b.hasOwnProperty(f))a=a.a.get(f),e.bindTexture(3553,a.Ib),9729!=a.Ph&&(e.texParameteri(3553,10240,9729),a.Ph=9729),9729!=a.Rh&&(e.texParameteri(3553,10241,9729),a.Rh=9729);else{var g=e.createTexture();e.bindTexture(3553,g);if(0<d){var h=a.C.canvas,l=a.C;a.D!==c[0]||a.S!==c[1]?(h.width=c[0],h.height=c[1],a.D=c[0],a.S=c[1]):l.clearRect(0,0,c[0],c[1]);l.drawImage(b.Y(),d,d,c[0],c[1],0,0,c[0],c[1]);e.texImage2D(3553,0,6408,6408,5121,h)}else e.texImage2D(3553,
0,6408,6408,5121,b.Y());e.texParameteri(3553,10240,9729);e.texParameteri(3553,10241,9729);e.texParameteri(3553,10242,33071);e.texParameteri(3553,10243,33071);a.a.set(f,{Ib:g,Ph:9729,Rh:9729})}}function pk(a,b,c){var d=a.o;if(Rc(d,b)){a=a.f;var e=c.viewState;d.b(new Rh(b,new kk(a,e.center,e.resolution,e.rotation,c.size,c.extent,c.pixelRatio),c,null,a))}}k=mk.prototype;k.ka=function(){var a=this.i;a.isContextLost()||this.a.forEach(function(b){b&&a.deleteTexture(b.Ib)});Nc(this.f);Mh.prototype.ka.call(this)};
k.xk=function(a,b){a=this.i;for(var c;1024<this.a.c-this.g;){if(c=this.a.a.Yc)a.deleteTexture(c.Ib);else if(+this.a.a.uc==b.index)break;else--this.g;this.a.pop()}};k.U=function(){return"webgl"};k.Yn=function(a){a.preventDefault();this.a.clear();this.g=0;a=this.c;for(var b in a)a[b].mg()};k.Zn=function(){ok(this);this.o.render()};function ok(a){a=a.i;a.activeTexture(33984);a.blendFuncSeparate(770,771,1,771);a.disable(2884);a.disable(2929);a.disable(3089);a.disable(2960)}
k.Jg=function(a){var b=this.f,c=this.i;if(c.isContextLost())return!1;if(!a)return this.l&&(this.b.style.display="none",this.l=!1),!1;this.u=a.focus;this.a.set((-a.index).toString(),null);++this.g;pk(this,"precompose",a);var d=[],e=a.layerStatesArray;qa(e);var f=a.viewState.resolution,g;var h=0;for(g=e.length;h<g;++h){var l=e[h];if(xh(l,f)&&"ready"==l.yj){var m=Ph(this,l.layer);m.ng(a,l,b)&&d.push(l)}}e=a.size[0]*a.pixelRatio;f=a.size[1]*a.pixelRatio;if(this.b.width!=e||this.b.height!=f)this.b.width=
e,this.b.height=f;c.bindFramebuffer(36160,null);c.clearColor(0,0,0,0);c.clear(16384);c.enable(3042);c.viewport(0,0,this.b.width,this.b.height);h=0;for(g=d.length;h<g;++h)l=d[h],m=Ph(this,l.layer),m.Gi(a,l,b);this.l||(this.b.style.display="",this.l=!0);Nh(a);1024<this.a.c-this.g&&a.postRenderFunctions.push(this.xk.bind(this));this.j.b.length&&(a.postRenderFunctions.push(this.B),a.animate=!0);pk(this,"postcompose",a);Qh(this,a);a.postRenderFunctions.push(Oh)};
k.Ea=function(a,b,c,d,e,f,g){if(this.i.isContextLost())return!1;var h=b.viewState,l=b.layerStatesArray,m;for(m=l.length-1;0<=m;--m){var n=l[m];var p=n.layer;if(xh(n,h.resolution)&&f.call(g,p)&&(n=Ph(this,p).Ea(a,b,c,d,e)))return n}};k.Ei=function(a,b,c,d,e){c=!1;if(this.i.isContextLost())return!1;var f=b.viewState,g=b.layerStatesArray,h;for(h=g.length-1;0<=h;--h){var l=g[h],m=l.layer;if(xh(l,f.resolution)&&d.call(e,m)&&(c=Ph(this,m).Ue(a,b)))return!0}return c};
k.Di=function(a,b,c,d,e){if(this.i.isContextLost())return!1;var f=b.viewState,g=b.layerStatesArray,h;for(h=g.length-1;0<=h;--h){var l=g[h];var m=l.layer;if(xh(l,f.resolution)&&e.call(d,m)&&(l=Ph(this,m).lg(a,b,c,d)))return l}};var qk=["canvas","webgl"];
function G(a){Tc.call(this);var b=rk(a);this.Cf=void 0!==a.loadTilesWhileAnimating?a.loadTilesWhileAnimating:!1;this.Df=void 0!==a.loadTilesWhileInteracting?a.loadTilesWhileInteracting:!1;this.If=void 0!==a.pixelRatio?a.pixelRatio:Sd;this.yf=b.logos;this.pa=function(){this.j=void 0;this.Sp.call(this,Date.now())}.bind(this);this.Yb=Bh();this.Jf=Bh();this.ad=0;this.I=this.R=this.T=this.g=this.c=null;this.a=document.createElement("DIV");this.a.className="ol-viewport"+(Xd?" ol-touch":"");this.a.style.position=
"relative";this.a.style.overflow="hidden";this.a.style.width="100%";this.a.style.height="100%";this.a.style.msTouchAction="none";this.a.style.touchAction="none";this.C=document.createElement("DIV");this.C.className="ol-overlaycontainer";this.a.appendChild(this.C);this.D=document.createElement("DIV");this.D.className="ol-overlaycontainer-stopevent";for(var c="click dblclick mousedown touchstart MSPointerDown pointerdown mousewheel wheel".split(" "),d=0,e=c.length;d<e;++d)y(this.D,c[d],Pc);this.a.appendChild(this.D);
this.Sa=new Fe(this,a.moveTolerance);for(var f in de)y(this.Sa,de[f],this.Ih,this);this.va=b.keyboardEventTarget;this.u=null;y(this.a,"wheel",this.ld,this);y(this.a,"mousewheel",this.ld,this);this.l=b.controls;this.o=b.interactions;this.v=b.overlays;this.rg={};this.B=new b.Up(this.a,this);this.na=null;this.xb=[];this.$a=new Pe(this.ql.bind(this),this.Wl.bind(this));this.fa={};y(this,Vc("layergroup"),this.El,this);y(this,Vc("view"),this.Xl,this);y(this,Vc("size"),this.Tl,this);y(this,Vc("target"),
this.Vl,this);this.H(b.values);this.l.forEach(function(a){a.setMap(this)},this);y(this.l,"add",function(a){a.element.setMap(this)},this);y(this.l,"remove",function(a){a.element.setMap(null)},this);this.o.forEach(function(a){a.setMap(this)},this);y(this.o,"add",function(a){a.element.setMap(this)},this);y(this.o,"remove",function(a){a.element.setMap(null)},this);this.v.forEach(this.kh,this);y(this.v,"add",function(a){this.kh(a.element)},this);y(this.v,"remove",function(a){var b=a.element.g;void 0!==
b&&delete this.rg[b.toString()];a.element.setMap(null)},this)}v(G,Tc);k=G.prototype;k.kk=function(a){this.l.push(a)};k.lk=function(a){this.o.push(a)};k.ih=function(a){this.Kc().qd().push(a)};k.jh=function(a){this.v.push(a)};k.kh=function(a){var b=a.g;void 0!==b&&(this.rg[b.toString()]=a);a.setMap(this)};
k.ka=function(){Nc(this.Sa);Nc(this.B);Kc(this.a,"wheel",this.ld,this);Kc(this.a,"mousewheel",this.ld,this);this.f&&(window.removeEventListener("resize",this.f,!1),this.f=void 0);this.j&&(cancelAnimationFrame(this.j),this.j=void 0);this.Le(null);Tc.prototype.ka.call(this)};k.we=function(a,b,c){if(this.c)return a=this.Wa(a),c=c?c:{},this.B.Ea(a,this.c,void 0!==c.hitTolerance?c.hitTolerance*this.c.pixelRatio:0,b,null,c.layerFilter?c.layerFilter:mf,null)};
k.Im=function(a,b,c,d,e){if(this.c)return this.B.Di(a,this.c,b,void 0!==c?c:null,d?d:mf,void 0!==e?e:null)};k.Yl=function(a,b){if(!this.c)return!1;a=this.Wa(a);b=b?b:{};return this.B.Ei(a,this.c,void 0!==b.hitTolerance?b.hitTolerance*this.c.pixelRatio:0,b.layerFilter?b.layerFilter:mf,null)};k.Tf=function(a){return this.Wa(this.xe(a))};k.xe=function(a){var b=this.a.getBoundingClientRect();a=a.changedTouches?a.changedTouches[0]:a;return[a.clientX-b.left,a.clientY-b.top]};k.ag=function(){return this.get("target")};
k.jd=function(){var a=this.ag();return void 0!==a?"string"===typeof a?document.getElementById(a):a:null};k.Wa=function(a){var b=this.c;return b?Gh(b.pixelToCoordinateTransform,a.slice()):null};k.Lk=function(){return this.l};k.fl=function(){return this.v};k.el=function(a){a=this.rg[a.toString()];return void 0!==a?a:null};k.Sk=function(){return this.o};k.Kc=function(){return this.get("layergroup")};k.Xh=function(){return this.Kc().qd()};
k.Ja=function(a){var b=this.c;return b?Gh(b.coordinateToPixelTransform,a.slice(0,2)):null};k.Ob=function(){return this.get("size")};k.Z=function(){return this.get("view")};k.sl=function(){return this.a};k.ql=function(a,b,c,d){var e=this.c;if(!(e&&b in e.wantedTiles&&e.wantedTiles[b][a.bb()]))return Infinity;a=c[0]-e.focus[0];c=c[1]-e.focus[1];return 65536*Math.log(d)+Math.sqrt(a*a+c*c)/d};k.ld=function(a,b){a=new Jd(b||a.type,this,a);this.Ih(a)};
k.Ih=function(a){if(this.c){this.na=a.coordinate;a.frameState=this.c;var b=this.o.a,c;if(!1!==this.b(a))for(c=b.length-1;0<=c;c--){var d=b[c];if(d.c()&&!d.handleEvent(a))break}}};k.Rl=function(){var a=this.c,b=this.$a;if(b.b.length){var c=16,d=c;if(a){var e=a.viewHints;e[0]&&(c=this.Cf?8:0,d=2);e[1]&&(c=this.Df?8:0,d=2)}b.j<c&&(Oe(b),Qe(b,c,d))}b=this.xb;c=0;for(d=b.length;c<d;++c)b[c](this,a);b.length=0};k.Tl=function(){this.render()};
k.Vl=function(){var a;this.ag()&&(a=this.jd());if(this.u){for(var b=0,c=this.u.length;b<c;++b)Ec(this.u[b]);this.u=null}a?(a.appendChild(this.a),a=this.va?this.va:a,this.u=[y(a,"keydown",this.ld,this),y(a,"keypress",this.ld,this)],this.f||(this.f=this.Ad.bind(this),window.addEventListener("resize",this.f,!1))):(ld(this.a),this.f&&(window.removeEventListener("resize",this.f,!1),this.f=void 0));this.Ad()};k.Wl=function(){this.render()};k.Lh=function(){this.render()};
k.Xl=function(){this.T&&(Ec(this.T),this.T=null);this.R&&(Ec(this.R),this.R=null);var a=this.Z();a&&(this.a.setAttribute("data-view",w(a)),this.T=y(a,"propertychange",this.Lh,this),this.R=y(a,"change",this.Lh,this));this.render()};k.El=function(){this.I&&(this.I.forEach(Ec),this.I=null);var a=this.Kc();a&&(this.I=[y(a,"propertychange",this.render,this),y(a,"change",this.render,this)]);this.render()};k.Tp=function(){this.j&&cancelAnimationFrame(this.j);this.pa()};
k.render=function(){void 0===this.j&&(this.j=requestAnimationFrame(this.pa))};k.Mp=function(a){return this.l.remove(a)};k.Np=function(a){return this.o.remove(a)};k.Pp=function(a){return this.Kc().qd().remove(a)};k.Qp=function(a){return this.v.remove(a)};
k.Sp=function(a){var b,c=this.Ob(),d=this.Z(),e=Oa(),f=this.c,g=null;if(void 0!==c&&0<c[0]&&0<c[1]&&d&&jg(d)){var g=dg(d,this.c?this.c.viewHints:void 0),h=this.Kc().Yf(),l={};var m=0;for(b=h.length;m<b;++m)l[w(h[m].layer)]=h[m];m=d.getState();g={animate:!1,attributions:{},coordinateToPixelTransform:this.Yb,extent:e,focus:this.na?this.na:m.center,index:this.ad++,layerStates:l,layerStatesArray:h,logos:tb({},this.yf),pixelRatio:this.If,pixelToCoordinateTransform:this.Jf,postRenderFunctions:[],size:c,
skippedFeatureUids:this.fa,tileQueue:this.$a,time:a,usedTiles:{},viewState:m,viewHints:g,wantedTiles:{}}}g&&(g.extent=ob(m.center,m.resolution,m.rotation,g.size,e));this.c=g;this.B.Jg(g);g&&(g.animate&&this.render(),Array.prototype.push.apply(this.xb,g.postRenderFunctions),!f||this.g&&(kb(this.g)||bb(g.extent,this.g))||(this.b(new Id("movestart",this,f)),this.g=Ya(this.g)),!this.g||g.viewHints[0]||g.viewHints[1]||bb(g.extent,this.g)||(this.b(new Id("moveend",this,g)),Ra(g.extent,this.g)));this.b(new Id("postrender",
this,g));setTimeout(this.Rl.bind(this),0)};k.qj=function(a){this.set("layergroup",a)};k.Qg=function(a){this.set("size",a)};k.Le=function(a){this.set("target",a)};k.iq=function(a){this.set("view",a)};k.xj=function(a){a=w(a).toString();this.fa[a]=!0;this.render()};
k.Ad=function(){var a=this.jd();if(a){var b=getComputedStyle(a);this.Qg([a.offsetWidth-parseFloat(b.borderLeftWidth)-parseFloat(b.paddingLeft)-parseFloat(b.paddingRight)-parseFloat(b.borderRightWidth),a.offsetHeight-parseFloat(b.borderTopWidth)-parseFloat(b.paddingTop)-parseFloat(b.paddingBottom)-parseFloat(b.borderBottomWidth)])}else this.Qg(void 0)};k.Cj=function(a){a=w(a).toString();delete this.fa[a];this.render()};
function rk(a){var b=null;void 0!==a.keyboardEventTarget&&(b="string"===typeof a.keyboardEventTarget?document.getElementById(a.keyboardEventTarget):a.keyboardEventTarget);var c={},d={};if(void 0===a.logo||"boolean"===typeof a.logo&&a.logo)d["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAAHGAAABxgEXwfpGAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAhNQTFRF////AP//AICAgP//AFVVQECA////K1VVSbbbYL/fJ05idsTYJFtbbcjbJllmZszWWMTOIFhoHlNiZszTa9DdUcHNHlNlV8XRIVdiasrUHlZjIVZjaMnVH1RlIFRkH1RkH1ZlasvYasvXVsPQH1VkacnVa8vWIVZjIFRjVMPQa8rXIVVkXsXRsNveIFVkIFZlIVVj3eDeh6GmbMvXH1ZkIFRka8rWbMvXIFVkIFVjIFVkbMvWH1VjbMvWIFVlbcvWIFVla8vVIFVkbMvWbMvVH1VkbMvWIFVlbcvWIFVkbcvVbMvWjNPbIFVkU8LPwMzNIFVkbczWIFVkbsvWbMvXIFVkRnB8bcvW2+TkW8XRIFVkIlZlJVloJlpoKlxrLl9tMmJwOWd0Omh1RXF8TneCT3iDUHiDU8LPVMLPVcLPVcPQVsPPVsPQV8PQWMTQWsTQW8TQXMXSXsXRX4SNX8bSYMfTYcfTYsfTY8jUZcfSZsnUaIqTacrVasrVa8jTa8rWbI2VbMvWbcvWdJObdcvUdszUd8vVeJaee87Yfc3WgJyjhqGnitDYjaarldPZnrK2oNbborW5o9bbo9fbpLa6q9ndrL3ArtndscDDutzfu8fJwN7gwt7gxc/QyuHhy+HizeHi0NfX0+Pj19zb1+Tj2uXk29/e3uLg3+Lh3+bl4uXj4ufl4+fl5Ofl5ufl5ujm5+jmySDnBAAAAFp0Uk5TAAECAgMEBAYHCA0NDg4UGRogIiMmKSssLzU7PkJJT1JTVFliY2hrdHZ3foSFhYeJjY2QkpugqbG1tre5w8zQ09XY3uXn6+zx8vT09vf4+Pj5+fr6/P39/f3+gz7SsAAAAVVJREFUOMtjYKA7EBDnwCPLrObS1BRiLoJLnte6CQy8FLHLCzs2QUG4FjZ5GbcmBDDjxJBXDWxCBrb8aM4zbkIDzpLYnAcE9VXlJSWlZRU13koIeW57mGx5XjoMZEUqwxWYQaQbSzLSkYGfKFSe0QMsX5WbjgY0YS4MBplemI4BdGBW+DQ11eZiymfqQuXZIjqwyadPNoSZ4L+0FVM6e+oGI6g8a9iKNT3o8kVzNkzRg5lgl7p4wyRUL9Yt2jAxVh6mQCogae6GmflI8p0r13VFWTHBQ0rWPW7ahgWVcPm+9cuLoyy4kCJDzCm6d8PSFoh0zvQNC5OjDJhQopPPJqph1doJBUD5tnkbZiUEqaCnB3bTqLTFG1bPn71kw4b+GFdpLElKIzRxxgYgWNYc5SCENVHKeUaltHdXx0dZ8uBI1hJ2UUDgq82CM2MwKeibqAvSO7MCABq0wXEPiqWEAAAAAElFTkSuQmCC"]=
"https://openlayers.org/";else{var e=a.logo;"string"===typeof e?d[e]="":e instanceof HTMLElement?d[w(e).toString()]=e:e&&(xa("string"==typeof e.href,44),xa("string"==typeof e.src,45),d[e.src]=e.href)}e=a.layers instanceof uh?a.layers:new uh({layers:a.layers});c.layergroup=e;c.target=a.target;c.view=void 0!==a.view?a.view:new F;var e=Mh,f;void 0!==a.renderer?(Array.isArray(a.renderer)?f=a.renderer:"string"===typeof a.renderer?f=[a.renderer]:xa(!1,46),0<=f.indexOf("dom")&&(f=f.concat(qk))):f=qk;var g;
var h=0;for(g=f.length;h<g;++h){var l=f[h];if("canvas"==l){if(Ud){e=hi;break}}else if("webgl"==l&&Md){e=mk;break}}void 0!==a.controls?Array.isArray(a.controls)?f=new Yc(a.controls.slice()):(xa(a.controls instanceof Yc,47),f=a.controls):f=xd();void 0!==a.interactions?Array.isArray(a.interactions)?h=new Yc(a.interactions.slice()):(xa(a.interactions instanceof Yc,48),h=a.interactions):h=qh();void 0!==a.overlays?Array.isArray(a.overlays)?a=new Yc(a.overlays.slice()):(xa(a.overlays instanceof Yc,49),a=
a.overlays):a=new Yc;return{controls:f,interactions:h,keyboardEventTarget:b,logos:d,overlays:a,Up:e,values:c}};function sk(a){Tc.call(this);this.g=a.id;this.l=void 0!==a.insertFirst?a.insertFirst:!0;this.v=void 0!==a.stopEvent?a.stopEvent:!0;this.c=document.createElement("DIV");this.c.className="ol-overlay-container ol-selectable";this.c.style.position="absolute";this.autoPan=void 0!==a.autoPan?a.autoPan:!1;this.j=a.autoPanAnimation||{};this.o=void 0!==a.autoPanMargin?a.autoPanMargin:20;this.a={re:"",Ie:"",nf:"",vf:"",visible:!0};this.f=null;y(this,Vc(tk),this.zl,this);y(this,Vc(uk),this.Jl,this);y(this,Vc(vk),
this.Nl,this);y(this,Vc(wk),this.Pl,this);y(this,Vc(xk),this.Ql,this);void 0!==a.element&&this.lj(a.element);this.rj(void 0!==a.offset?a.offset:[0,0]);this.uj(void 0!==a.positioning?a.positioning:"top-left");void 0!==a.position&&this.Ne(a.position)}v(sk,Tc);k=sk.prototype;k.Rd=function(){return this.get(tk)};k.Jm=function(){return this.g};k.Me=function(){return this.get(uk)};k.Dh=function(){return this.get(vk)};k.Yh=function(){return this.get(wk)};k.Eh=function(){return this.get(xk)};
k.zl=function(){for(var a=this.c;a.lastChild;)a.removeChild(a.lastChild);(a=this.Rd())&&this.c.appendChild(a)};k.Jl=function(){this.f&&(ld(this.c),Ec(this.f),this.f=null);var a=this.Me();a&&(this.f=y(a,"postrender",this.render,this),yk(this),a=this.v?a.D:a.C,this.l?a.insertBefore(this.c,a.childNodes[0]||null):a.appendChild(this.c))};k.render=function(){yk(this)};k.Nl=function(){yk(this)};
k.Pl=function(){yk(this);if(this.get(wk)&&this.autoPan){var a=this.Me();if(a&&a.jd()){var b=zk(a.jd(),a.Ob()),c=this.Rd(),d=c.offsetWidth,e=getComputedStyle(c),d=d+(parseInt(e.marginLeft,10)+parseInt(e.marginRight,10)),e=c.offsetHeight,f=getComputedStyle(c),e=e+(parseInt(f.marginTop,10)+parseInt(f.marginBottom,10)),g=zk(c,[d,e]),c=this.o;Va(b,g)||(d=g[0]-b[0],e=b[2]-g[2],f=g[1]-b[1],g=b[3]-g[3],b=[0,0],0>d?b[0]=d-c:0>e&&(b[0]=Math.abs(e)+c),0>f?b[1]=f-c:0>g&&(b[1]=Math.abs(g)+c),0===b[0]&&0===b[1])||
(c=a.Z().wa(),c=a.Ja(c),b=[c[0]+b[0],c[1]+b[1]],a.Z().animate({center:a.Wa(b),duration:this.j.duration,easing:this.j.easing}))}}};k.Ql=function(){yk(this)};k.lj=function(a){this.set(tk,a)};k.setMap=function(a){this.set(uk,a)};k.rj=function(a){this.set(vk,a)};k.Ne=function(a){this.set(wk,a)};function zk(a,b){var c=a.getBoundingClientRect();a=c.left+window.pageXOffset;c=c.top+window.pageYOffset;return[a,c,a+b[0],c+b[1]]}k.uj=function(a){this.set(xk,a)};
function Ak(a,b){a.a.visible!==b&&(a.c.style.display=b?"":"none",a.a.visible=b)}
function yk(a){var b=a.Me(),c=a.Yh();if(b&&b.c&&c){var c=b.Ja(c),d=b.Ob(),b=a.c.style,e=a.Dh(),f=a.Eh();Ak(a,!0);var g=e[0],e=e[1];if("bottom-right"==f||"center-right"==f||"top-right"==f)""!==a.a.Ie&&(a.a.Ie=b.left=""),g=Math.round(d[0]-c[0]-g)+"px",a.a.nf!=g&&(a.a.nf=b.right=g);else{""!==a.a.nf&&(a.a.nf=b.right="");if("bottom-center"==f||"center-center"==f||"top-center"==f)g-=a.c.offsetWidth/2;g=Math.round(c[0]+g)+"px";a.a.Ie!=g&&(a.a.Ie=b.left=g)}if("bottom-left"==f||"bottom-center"==f||"bottom-right"==
f)""!==a.a.vf&&(a.a.vf=b.top=""),c=Math.round(d[1]-c[1]-e)+"px",a.a.re!=c&&(a.a.re=b.bottom=c);else{""!==a.a.re&&(a.a.re=b.bottom="");if("center-left"==f||"center-center"==f||"center-right"==f)e-=a.c.offsetHeight/2;c=Math.round(c[1]+e)+"px";a.a.vf!=c&&(a.a.vf=b.top=c)}}else Ak(a,!1)}var tk="element",uk="map",vk="offset",wk="position",xk="positioning";function Bk(a){function b(a){a=h.Tf(a);l.a.Z().ob(a);window.removeEventListener("mousemove",c);window.removeEventListener("mouseup",b)}function c(a){a=h.Tf({clientX:a.clientX-n.offsetWidth/2,clientY:a.clientY+n.offsetHeight/2});m.Ne(a)}a=a?a:{};this.j=void 0!==a.collapsed?a.collapsed:!0;this.o=void 0!==a.collapsible?a.collapsible:!0;this.o||(this.j=!1);var d=void 0!==a.className?a.className:"ol-overviewmap",e=void 0!==a.tipLabel?a.tipLabel:"Overview map",f=void 0!==a.collapseLabel?a.collapseLabel:
"\u00ab";"string"===typeof f?(this.u=document.createElement("span"),this.u.textContent=f):this.u=f;f=void 0!==a.label?a.label:"\u00bb";"string"===typeof f?(this.D=document.createElement("span"),this.D.textContent=f):this.D=f;var g=this.o&&!this.j?this.u:this.D,f=document.createElement("button");f.setAttribute("type","button");f.title=e;f.appendChild(g);y(f,"click",this.an,this);this.C=document.createElement("DIV");this.C.className="ol-overviewmap-map";var h=this.c=new G({controls:new Yc,interactions:new Yc,
view:a.view});a.layers&&a.layers.forEach(function(a){h.ih(a)},this);e=document.createElement("DIV");e.className="ol-overviewmap-box";e.style.boxSizing="border-box";this.l=new sk({position:[0,0],positioning:"bottom-left",element:e});this.c.jh(this.l);e=document.createElement("div");e.className=d+" ol-unselectable ol-control"+(this.j&&this.o?" ol-collapsed":"")+(this.o?"":" ol-uncollapsible");e.appendChild(this.C);e.appendChild(f);md.call(this,{element:e,render:a.render?a.render:Ck,target:a.target});
var l=this,m=this.l,n=this.l.Rd();n.addEventListener("mousedown",function(){window.addEventListener("mousemove",c);window.addEventListener("mouseup",b)})}v(Bk,md);k=Bk.prototype;k.setMap=function(a){var b=this.a;a!==b&&(b&&((b=b.Z())&&Kc(b,Vc("rotation"),this.Ge,this),this.c.Le(null)),md.prototype.setMap.call(this,a),a&&(this.c.Le(this.C),this.v.push(y(a,"propertychange",this.Kl,this)),this.c.Xh().dc()||this.c.qj(a.Kc()),a=a.Z()))&&(y(a,Vc("rotation"),this.Ge,this),jg(a)&&(this.c.Ad(),Dk(this)))};
k.Kl=function(a){"view"===a.key&&((a=a.oldValue)&&Kc(a,Vc("rotation"),this.Ge,this),a=this.a.Z(),y(a,Vc("rotation"),this.Ge,this))};k.Ge=function(){this.c.Z().Oe(this.a.Z().Qa())};function Ck(){var a=this.a,b=this.c;if(a.c&&b.c){var c=a.Ob(),a=a.Z().dd(c),d=b.Ob(),c=b.Z().dd(d),e=b.Ja(ib(a)),f=b.Ja(gb(a)),b=Math.abs(e[0]-f[0]),e=Math.abs(e[1]-f[1]),f=d[0],d=d[1];b<.1*f||e<.1*d||b>.75*f||e>.75*d?Dk(this):Va(c,a)||(a=this.c,c=this.a.Z(),a.Z().ob(c.wa()))}Ek(this)}
function Dk(a){var b=a.a;a=a.c;var c=b.Ob(),b=b.Z().dd(c);a=a.Z();rb(b,1/(.1*Math.pow(2,Math.log(7.5)/Math.LN2/2)));a.Qf(b)}function Ek(a){var b=a.a,c=a.c;if(b.c&&c.c){var d=b.Ob(),e=b.Z(),f=c.Z(),c=e.Qa(),b=a.l,g=a.l.Rd(),h=e.dd(d),d=f.Pa(),e=eb(h),f=hb(h);if(a=a.a.Z().wa()){var l=[e[0]-a[0],e[1]-a[1]];ef(l,c);Ze(l,a)}b.Ne(l);g&&(g.style.width=Math.abs((e[0]-f[0])/d)+"px",g.style.height=Math.abs((f[1]-e[1])/d)+"px")}}k.an=function(a){a.preventDefault();Fk(this)};
function Fk(a){a.element.classList.toggle("ol-collapsed");a.j?kd(a.u,a.D):kd(a.D,a.u);a.j=!a.j;var b=a.c;a.j||b.c||(b.Ad(),Dk(a),Jc(b,"postrender",function(){Ek(this)},a))}k.$m=function(){return this.o};k.cn=function(a){this.o!==a&&(this.o=a,this.element.classList.toggle("ol-uncollapsible"),!a&&this.j&&Fk(this))};k.bn=function(a){this.o&&this.j!==a&&Fk(this)};k.Zm=function(){return this.j};k.gl=function(){return this.c};function Gk(a){a=a?a:{};var b=void 0!==a.className?a.className:"ol-scale-line";this.o=document.createElement("DIV");this.o.className=b+"-inner";this.c=document.createElement("DIV");this.c.className=b+" ol-unselectable";this.c.appendChild(this.o);this.u=null;this.l=void 0!==a.minWidth?a.minWidth:64;this.j=!1;this.B=void 0;this.D="";md.call(this,{element:this.c,render:a.render?a.render:Hk,target:a.target});y(this,Vc(Ik),this.T,this);this.I(a.units||"metric")}v(Gk,md);var Jk=[1,2,5];Gk.prototype.C=function(){return this.get(Ik)};
function Hk(a){(a=a.frameState)?this.u=a.viewState:this.u=null;Kk(this)}Gk.prototype.T=function(){Kk(this)};Gk.prototype.I=function(a){this.set(Ik,a)};
function Kk(a){var b=a.u;if(b){var c=b.projection,d=c.sc(),b=Sb(c,b.resolution,b.center)*d,d=a.l*b,c="",e=a.C();"degrees"==e?(c=zb.degrees,b/=c,d<c/60?(c="\u2033",b*=3600):d<c?(c="\u2032",b*=60):c="\u00b0"):"imperial"==e?.9144>d?(c="in",b/=.0254):1609.344>d?(c="ft",b/=.3048):(c="mi",b/=1609.344):"nautical"==e?(b/=1852,c="nm"):"metric"==e?.001>d?(c="\u03bcm",b*=1E6):1>d?(c="mm",b*=1E3):1E3>d?c="m":(c="km",b/=1E3):"us"==e?.9144>d?(c="in",b*=39.37):1609.344>d?(c="ft",b/=.30480061):(c="mi",b/=1609.3472):
xa(!1,33);for(var e=3*Math.floor(Math.log(a.l*b)/Math.log(10)),f;;){f=Jk[(e%3+3)%3]*Math.pow(10,Math.floor(e/3));d=Math.round(f/b);if(isNaN(d)){a.c.style.display="none";a.j=!1;return}if(d>=a.l)break;++e}b=f+" "+c;a.D!=b&&(a.o.innerHTML=b,a.D=b);a.B!=d&&(a.o.style.width=d+"px",a.B=d);a.j||(a.c.style.display="",a.j=!0)}else a.j&&(a.c.style.display="none",a.j=!1)}var Ik="units";function Lk(a){a=a?a:{};this.c=void 0;this.j=Mk;this.D=this.l=0;this.I=null;this.na=!1;this.T=void 0!==a.duration?a.duration:200;var b=void 0!==a.className?a.className:"ol-zoomslider",c=document.createElement("button");c.setAttribute("type","button");c.className=b+"-thumb ol-unselectable";var d=document.createElement("div");d.className=b+" ol-unselectable ol-control";d.appendChild(c);this.o=new Ae(d);y(this.o,"pointerdown",this.yl,this);y(this.o,"pointermove",this.wl,this);y(this.o,"pointerup",this.xl,
this);y(d,"click",this.vl,this);y(c,"click",Pc);md.call(this,{element:d,render:a.render?a.render:Nk})}v(Lk,md);Lk.prototype.ka=function(){Nc(this.o);md.prototype.ka.call(this)};var Mk=0;k=Lk.prototype;k.setMap=function(a){md.prototype.setMap.call(this,a);a&&a.render()};
function Nk(a){if(a.frameState){if(!this.na){var b=this.element,c=b.offsetWidth,d=b.offsetHeight,e=b.firstElementChild,f=getComputedStyle(e),b=e.offsetWidth+parseFloat(f.marginRight)+parseFloat(f.marginLeft),e=e.offsetHeight+parseFloat(f.marginTop)+parseFloat(f.marginBottom);this.I=[b,e];c>d?(this.j=1,this.D=c-b):(this.j=Mk,this.l=d-e);this.na=!0}a=a.frameState.viewState.resolution;a!==this.c&&(this.c=a,Ok(this,a))}}
k.vl=function(a){var b=this.a.Z();a=Pk(this,Ca(1===this.j?(a.offsetX-this.I[0]/2)/this.D:(a.offsetY-this.I[1]/2)/this.l,0,1));b.animate({resolution:b.constrainResolution(a),duration:this.T,easing:rd})};k.yl=function(a){this.u||a.b.target!==this.element.firstElementChild||(cg(this.a.Z(),1,1),this.C=a.clientX,this.B=a.clientY,this.u=!0)};
k.wl=function(a){if(this.u){var b=this.element.firstElementChild;this.c=Pk(this,Ca(1===this.j?(a.clientX-this.C+parseInt(b.style.left,10))/this.D:(a.clientY-this.B+parseInt(b.style.top,10))/this.l,0,1));this.a.Z().Vc(this.c);Ok(this,this.c);this.C=a.clientX;this.B=a.clientY}};k.xl=function(){if(this.u){var a=this.a.Z();cg(a,1,-1);a.animate({resolution:a.constrainResolution(this.c),duration:this.T,easing:rd});this.u=!1;this.B=this.C=void 0}};
function Ok(a,b){b=1-ig(a.a.Z())(b);var c=a.element.firstElementChild;1==a.j?c.style.left=a.D*b+"px":c.style.top=a.l*b+"px"}function Pk(a,b){return hg(a.a.Z())(1-b)};function Qk(a){a=a?a:{};this.c=a.extent?a.extent:null;var b=void 0!==a.className?a.className:"ol-zoom-extent",c=void 0!==a.label?a.label:"E",d=void 0!==a.tipLabel?a.tipLabel:"Fit to extent",e=document.createElement("button");e.setAttribute("type","button");e.title=d;e.appendChild("string"===typeof c?document.createTextNode(c):c);y(e,"click",this.j,this);c=document.createElement("div");c.className=b+" ol-unselectable ol-control";c.appendChild(e);md.call(this,{element:c,target:a.target})}v(Qk,md);
Qk.prototype.j=function(a){a.preventDefault();a=this.a.Z();var b=this.c?this.c:a.v.G();a.Qf(b)};function Rk(a){Tc.call(this);a=a?a:{};this.a=null;y(this,Vc(Sk),this.vm,this);this.gg(void 0!==a.tracking?a.tracking:!1)}v(Rk,Tc);k=Rk.prototype;k.ka=function(){this.gg(!1);Tc.prototype.ka.call(this)};
k.ap=function(a){if(null!==a.alpha){var b=Ha(a.alpha);this.set(Tk,b);"boolean"===typeof a.absolute&&a.absolute?this.set(Uk,b):"number"===typeof a.webkitCompassHeading&&-1!=a.webkitCompassAccuracy&&this.set(Uk,Ha(a.webkitCompassHeading))}null!==a.beta&&this.set(Vk,Ha(a.beta));null!==a.gamma&&this.set(Wk,Ha(a.gamma));this.s()};k.Fk=function(){return this.get(Tk)};k.Ik=function(){return this.get(Vk)};k.Ok=function(){return this.get(Wk)};k.um=function(){return this.get(Uk)};k.Th=function(){return this.get(Sk)};
k.vm=function(){if(Vd){var a=this.Th();a&&!this.a?this.a=y(window,"deviceorientation",this.ap,this):a||null===this.a||(Ec(this.a),this.a=null)}};k.gg=function(a){this.set(Sk,a)};var Tk="alpha",Vk="beta",Wk="gamma",Uk="heading",Sk="tracking";function Xk(a){this.f=a.opacity;this.l=a.rotateWithView;this.g=a.rotation;this.a=a.scale;this.v=a.snapToPixel}k=Xk.prototype;k.Ze=function(){return this.f};k.$e=function(){return this.l};k.af=function(){return this.g};k.bf=function(){return this.a};k.Ae=function(){return this.v};k.td=function(a){this.f=a};k.cf=function(a){this.g=a};k.ud=function(a){this.a=a};function Yk(a){this.D=this.u=this.c=null;this.Va=void 0!==a.fill?a.fill:null;this.oa=[0,0];this.o=a.points;this.b=void 0!==a.radius?a.radius:a.radius1;this.i=a.radius2;this.j=void 0!==a.angle?a.angle:0;this.Ya=void 0!==a.stroke?a.stroke:null;this.B=this.ra=this.C=null;this.S=a.atlasManager;Zk(this,this.S);Xk.call(this,{opacity:1,rotateWithView:void 0!==a.rotateWithView?a.rotateWithView:!1,rotation:void 0!==a.rotation?a.rotation:0,scale:1,snapToPixel:void 0!==a.snapToPixel?a.snapToPixel:!0})}
v(Yk,Xk);k=Yk.prototype;k.clone=function(){var a=new Yk({fill:this.Fa()?this.Fa().clone():void 0,points:this.o,radius:this.b,radius2:this.i,angle:this.j,snapToPixel:this.v,stroke:this.Ga()?this.Ga().clone():void 0,rotation:this.g,rotateWithView:this.l,atlasManager:this.S});a.td(this.f);a.ud(this.a);return a};k.Hc=function(){return this.C};k.Pi=function(){return this.j};k.Fa=function(){return this.Va};k.qg=function(){return this.D};k.Y=function(){return this.u};k.ye=function(){return this.B};
k.Ye=function(){return 2};k.Oc=function(){return this.oa};k.Qi=function(){return this.o};k.Ri=function(){return this.b};k.Fh=function(){return this.i};k.ic=function(){return this.ra};k.Ga=function(){return this.Ya};k.Nh=function(){};k.load=function(){};k.Bj=function(){};
function Zk(a,b){var c="",d="",e=0,f=null,g=0;if(a.Ya){var h=a.Ya.a;null===h&&(h=Uh);h=id(h);g=a.Ya.c;void 0===g&&(g=1);f=a.Ya.i;Td||(f=null);d=a.Ya.j;void 0===d&&(d="round");c=a.Ya.f;void 0===c&&(c="round");e=a.Ya.o;void 0===e&&(e=10)}var l=2*(a.b+g)+1,c={strokeStyle:h,zj:g,size:l,lineCap:c,lineDash:f,lineJoin:d,miterLimit:e};if(void 0===b){var m=jd(l,l);a.u=m.canvas;b=l=a.u.width;a.rh(c,m,0,0);a.Va?a.D=a.u:(m=jd(c.size,c.size),a.D=m.canvas,a.qh(c,m,0,0))}else l=Math.round(l),(d=!a.Va)&&(m=a.qh.bind(a,
c)),a.Ya?(e=a.Ya,void 0===e.b&&(e.b="s",e.b=e.a?"string"===typeof e.a?e.b+e.a:e.b+w(e.a).toString():e.b+"-",e.b+=","+(void 0!==e.f?e.f.toString():"-")+","+(e.i?e.i.toString():"-")+","+(void 0!==e.g?e.g:"-")+","+(void 0!==e.j?e.j:"-")+","+(void 0!==e.o?e.o.toString():"-")+","+(void 0!==e.c?e.c.toString():"-")),e=e.b):e="-",a.Va?(f=a.Va,void 0===f.a&&(f.a=f.b instanceof CanvasPattern||f.b instanceof CanvasGradient?w(f.b).toString():"f"+(f.b?gd(f.b):"-")),f=f.a):f="-",a.c&&e==a.c[1]&&f==a.c[2]&&a.b==
a.c[3]&&a.i==a.c[4]&&a.j==a.c[5]&&a.o==a.c[6]||(a.c=["r"+e+f+(void 0!==a.b?a.b.toString():"-")+(void 0!==a.i?a.i.toString():"-")+(void 0!==a.j?a.j.toString():"-")+(void 0!==a.o?a.o.toString():"-"),e,f,a.b,a.i,a.j,a.o]),m=b.add(a.c[0],l,l,a.rh.bind(a,c),m),a.u=m.image,a.oa=[m.offsetX,m.offsetY],b=m.image.width,a.D=d?m.Zl:a.u;a.C=[l/2,l/2];a.ra=[l,l];a.B=[b,b]}
k.rh=function(a,b,c,d){b.setTransform(1,0,0,1,0,0);b.translate(c,d);b.beginPath();var e=this.o;if(Infinity===e)b.arc(a.size/2,a.size/2,this.b,0,2*Math.PI,!0);else{var f=void 0!==this.i?this.i:this.b;f!==this.b&&(e*=2);for(c=0;c<=e;c++){d=2*c*Math.PI/e-Math.PI/2+this.j;var g=c%2?f:this.b;b.lineTo(a.size/2+g*Math.cos(d),a.size/2+g*Math.sin(d))}}this.Va&&(c=this.Va.b,null===c&&(c=Sh),b.fillStyle=id(c),b.fill());this.Ya&&(b.strokeStyle=a.strokeStyle,b.lineWidth=a.zj,a.lineDash&&b.setLineDash(a.lineDash),
b.lineCap=a.lineCap,b.lineJoin=a.lineJoin,b.miterLimit=a.miterLimit,b.stroke());b.closePath()};
k.qh=function(a,b,c,d){b.setTransform(1,0,0,1,0,0);b.translate(c,d);b.beginPath();c=this.o;if(Infinity===c)b.arc(a.size/2,a.size/2,this.b,0,2*Math.PI,!0);else{d=void 0!==this.i?this.i:this.b;d!==this.b&&(c*=2);var e;for(e=0;e<=c;e++){var f=2*e*Math.PI/c-Math.PI/2+this.j;var g=e%2?d:this.b;b.lineTo(a.size/2+g*Math.cos(f),a.size/2+g*Math.sin(f))}}b.fillStyle=Sh;b.fill();this.Ya&&(b.strokeStyle=a.strokeStyle,b.lineWidth=a.zj,a.lineDash&&b.setLineDash(a.lineDash),b.stroke());b.closePath()};function $k(a){a=a||{};Yk.call(this,{points:Infinity,fill:a.fill,radius:a.radius,snapToPixel:a.snapToPixel,stroke:a.stroke,atlasManager:a.atlasManager})}v($k,Yk);$k.prototype.clone=function(){var a=new $k({fill:this.Fa()?this.Fa().clone():void 0,stroke:this.Ga()?this.Ga().clone():void 0,radius:this.b,snapToPixel:this.v,atlasManager:this.S});a.td(this.f);a.ud(this.a);return a};$k.prototype.Uc=function(a){this.b=a;Zk(this,this.S)};function al(a){a=a||{};this.b=void 0!==a.color?a.color:null;this.a=void 0}al.prototype.clone=function(){var a=this.b;return new al({color:a&&a.slice?a.slice():a||void 0})};al.prototype.i=function(){return this.b};al.prototype.c=function(a){this.b=a;this.a=void 0};function bl(a){a=a||{};this.Gc=null;this.Za=cl;void 0!==a.geometry&&this.Ra(a.geometry);this.Va=void 0!==a.fill?a.fill:null;this.M=void 0!==a.image?a.image:null;this.Ya=void 0!==a.stroke?a.stroke:null;this.Ia=void 0!==a.text?a.text:null;this.Fj=a.zIndex}k=bl.prototype;
k.clone=function(){var a=this.V();a&&a.clone&&(a=a.clone());return new bl({geometry:a,fill:this.Fa()?this.Fa().clone():void 0,image:this.Y()?this.Y().clone():void 0,stroke:this.Ga()?this.Ga().clone():void 0,text:this.Na()?this.Na().clone():void 0,zIndex:this.Ba()})};k.V=function(){return this.Gc};k.Pk=function(){return this.Za};k.Fa=function(){return this.Va};k.pf=function(a){this.Va=a};k.Y=function(){return this.M};k.Og=function(a){this.M=a};k.Ga=function(){return this.Ya};
k.qf=function(a){this.Ya=a};k.Na=function(){return this.Ia};k.xd=function(a){this.Ia=a};k.Ba=function(){return this.Fj};k.Ra=function(a){"function"===typeof a?this.Za=a:"string"===typeof a?this.Za=function(b){return b.get(a)}:a?a&&(this.Za=function(){return a}):this.Za=cl;this.Gc=a};k.Vb=function(a){this.Fj=a};function dl(a){if("function"!==typeof a){if(Array.isArray(a))var b=a;else xa(a instanceof bl,41),b=[a];a=function(){return b}}return a}var el=null;
function fl(){if(!el){var a=new al({color:"rgba(255,255,255,0.4)"}),b=new wj({color:"#3399CC",width:1.25});el=[new bl({image:new $k({fill:a,stroke:b,radius:5}),fill:a,stroke:b})]}return el}
function gl(){var a={},b=[255,255,255,1],c=[0,153,255,1];a.Polygon=[new bl({fill:new al({color:[255,255,255,.5]})})];a.MultiPolygon=a.Polygon;a.LineString=[new bl({stroke:new wj({color:b,width:5})}),new bl({stroke:new wj({color:c,width:3})})];a.MultiLineString=a.LineString;a.Circle=a.Polygon.concat(a.LineString);a.Point=[new bl({image:new $k({radius:6,fill:new al({color:c}),stroke:new wj({color:b,width:1.5})}),zIndex:Infinity})];a.MultiPoint=a.Point;a.GeometryCollection=a.Polygon.concat(a.LineString,
a.Point);return a}function cl(a){return a.V()};function H(a){Tc.call(this);this.a=void 0;this.c="geometry";this.g=null;this.j=void 0;this.f=null;y(this,Vc(this.c),this.Ee,this);void 0!==a&&(a instanceof of||!a?this.Ra(a):this.H(a))}v(H,Tc);k=H.prototype;k.clone=function(){var a=new H(this.N());a.Tc(this.c);var b=this.V();b&&a.Ra(b.clone());(b=this.g)&&a.hg(b);return a};k.V=function(){return this.get(this.c)};k.wm=function(){return this.a};k.Qk=function(){return this.c};k.xm=function(){return this.g};k.Lc=function(){return this.j};k.Al=function(){this.s()};
k.Ee=function(){this.f&&(Ec(this.f),this.f=null);var a=this.V();a&&(this.f=y(a,"change",this.Al,this));this.s()};k.Ra=function(a){this.set(this.c,a)};k.hg=function(a){this.j=(this.g=a)?hl(a):void 0;this.s()};k.jc=function(a){this.a=a;this.s()};k.Tc=function(a){Kc(this,Vc(this.c),this.Ee,this);this.c=a;y(this,Vc(this.c),this.Ee,this);this.Ee()};
function hl(a){var b;if("function"===typeof a)2==a.length?b=function(b){return a(this,b)}:b=a;else{if(Array.isArray(a))var c=a;else xa(a instanceof bl,41),c=[a];b=function(){return c}}return b};var il=document.implementation.createDocument("","",null);function jl(a,b){return il.createElementNS(a,b)}function kl(a,b){return ll(a,b,[]).join("")}function ll(a,b,c){if(a.nodeType==Node.CDATA_SECTION_NODE||a.nodeType==Node.TEXT_NODE)b?c.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g,"")):c.push(a.nodeValue);else for(a=a.firstChild;a;a=a.nextSibling)ll(a,b,c);return c}function ml(a){return a instanceof Document}function nl(a){return a instanceof Node}
function pl(a){return(new DOMParser).parseFromString(a,"application/xml")}function ql(a,b){return function(c,d){c=a.call(b,c,d);void 0!==c&&la(d[d.length-1],c)}}function rl(a,b){return function(c,d){c=a.call(void 0!==b?b:this,c,d);void 0!==c&&d[d.length-1].push(c)}}function sl(a,b){return function(c,d){c=a.call(void 0!==b?b:this,c,d);void 0!==c&&(d[d.length-1]=c)}}
function tl(a){return function(b,c){var d=a.call(this,b,c);if(void 0!==d){c=c[c.length-1];b=b.localName;var e;b in c?e=c[b]:e=c[b]=[];e.push(d)}}}function I(a,b){return function(c,d){var e=a.call(this,c,d);void 0!==e&&(d[d.length-1][void 0!==b?b:c.localName]=e)}}function J(a,b){return function(c,d,e){a.call(void 0!==b?b:this,c,d,e);e[e.length-1].node.appendChild(c)}}
function vl(a){var b,c;return function(d,e,f){if(!b){b={};var g={};g[d.localName]=a;b[d.namespaceURI]=g;c=wl(d.localName)}xl(b,c,e,f)}}function wl(a,b){return function(c,d,e){c=d[d.length-1].node;d=a;void 0===d&&(d=e);e=b;void 0===b&&(e=c.namespaceURI);return jl(e,d)}}var yl=wl();function zl(a,b){for(var c=b.length,d=Array(c),e=0;e<c;++e)d[e]=a[b[e]];return d}function K(a,b,c){c=void 0!==c?c:{};var d;var e=0;for(d=a.length;e<d;++e)c[a[e]]=b;return c}
function Al(a,b,c,d){for(b=b.firstElementChild;b;b=b.nextElementSibling){var e=a[b.namespaceURI];void 0!==e&&(e=e[b.localName])&&e.call(d,b,c)}}function N(a,b,c,d,e){d.push(a);Al(b,c,d,e);return d.pop()}function xl(a,b,c,d,e,f){for(var g=(void 0!==e?e:c).length,h,l,m=0;m<g;++m)h=c[m],void 0!==h&&(l=b.call(f,h,d,void 0!==e?e[m]:void 0),void 0!==l&&a[l.namespaceURI][l.localName].call(f,l,h,d))}function Bl(a,b,c,d,e,f,g){e.push(a);xl(b,c,d,e,f,g);e.pop()};function Cl(a,b,c,d){return function(e,f,g){var h=new XMLHttpRequest;h.open("GET","function"===typeof a?a(e,f,g):a,!0);"arraybuffer"==b.U()&&(h.responseType="arraybuffer");h.onload=function(){if(!h.status||200<=h.status&&300>h.status){var a=b.U();if("json"==a||"text"==a)var e=h.responseText;else"xml"==a?(e=h.responseXML)||(e=pl(h.responseText)):"arraybuffer"==a&&(e=h.response);e?c.call(this,b.Oa(e,{featureProjection:g}),b.kb(e)):d.call(this)}else d.call(this)}.bind(this);h.onerror=function(){d.call(this)}.bind(this);
h.send()}}function Dl(a,b){return Cl(a,b,function(a){this.cd(a)},ua)};function El(){this.f=this.defaultDataProjection=null}function Fl(a,b,c){var d;c&&(d={dataProjection:c.dataProjection?c.dataProjection:a.kb(b),featureProjection:c.featureProjection});return Gl(a,d)}function Gl(a,b){return tb({dataProjection:a.defaultDataProjection,featureProjection:a.f},b)}
function Hl(a,b,c){var d=c?Tb(c.featureProjection):null,e=c?Tb(c.dataProjection):null,f;d&&e&&!dc(d,e)?a instanceof of?f=(b?a.clone():a).tb(b?d:e,b?e:d):f=hc(a,e,d):f=a;if(b&&c&&void 0!==c.decimals){var g=Math.pow(10,c.decimals);f===a&&(f=f.clone());f.Dc(function(a){for(var b=0,c=a.length;b<c;++b)a[b]=Math.round(a[b]*g)/g;return a})}return f};function Il(){El.call(this)}v(Il,El);function Jl(a){return"string"===typeof a?(a=JSON.parse(a))?a:null:null!==a?a:null}k=Il.prototype;k.U=function(){return"json"};k.Tb=function(a,b){return this.Rc(Jl(a),Fl(this,a,b))};k.Oa=function(a,b){return this.yg(Jl(a),Fl(this,a,b))};k.Sc=function(a,b){return this.Cg(Jl(a),Fl(this,a,b))};k.kb=function(a){return this.Fg(Jl(a))};k.Bd=function(a,b){return JSON.stringify(this.Zc(a,b))};k.Wb=function(a,b){return JSON.stringify(this.he(a,b))};
k.$c=function(a,b){return JSON.stringify(this.je(a,b))};function Kl(a,b,c,d,e,f){var g=NaN,h=NaN,l=(c-b)/d;if(1===l)g=a[b],h=a[b+1];else if(2==l)g=(1-e)*a[b]+e*a[b+d],h=(1-e)*a[b+1]+e*a[b+d+1];else if(l){var h=a[b],l=a[b+1],m=0,g=[0],n;for(n=b+d;n<c;n+=d){var p=a[n],q=a[n+1],m=m+Math.sqrt((p-h)*(p-h)+(q-l)*(q-l));g.push(m);h=p;l=q}c=e*m;l=0;m=g.length;for(n=!1;l<m;)e=l+(m-l>>1),h=+ia(g[e],c),0>h?l=e+1:(m=e,n=!h);e=n?l:~l;0>e?(c=(c-g[-e-2])/(g[-e-1]-g[-e-2]),b+=(-e-2)*d,g=Ja(a[b],a[b+d],c),h=Ja(a[b+1],a[b+d+1],c)):(g=a[b+e*d],h=a[b+e*d+1])}return f?(f[0]=
g,f[1]=h,f):[g,h]}function Ll(a,b,c,d,e,f){if(c==b)return null;if(e<a[b+d-1])return f?(c=a.slice(b,b+d),c[d-1]=e,c):null;if(a[c-1]<e)return f?(c=a.slice(c-d,c),c[d-1]=e,c):null;if(e==a[b+d-1])return a.slice(b,b+d);b/=d;for(c/=d;b<c;)f=b+c>>1,e<a[(f+1)*d-1]?c=f:b=f+1;c=a[b*d-1];if(e==c)return a.slice((b-1)*d,(b-1)*d+d);f=(e-c)/(a[(b+1)*d-1]-c);c=[];var g;for(g=0;g<d-1;++g)c.push(Ja(a[(b-1)*d+g],a[b*d+g],f));c.push(e);return c}
function Ml(a,b,c,d,e,f){var g=0;if(f)return Ll(a,g,b[b.length-1],c,d,e);if(d<a[c-1])return e?(a=a.slice(0,c),a[c-1]=d,a):null;if(a[a.length-1]<d)return e?(a=a.slice(a.length-c),a[c-1]=d,a):null;e=0;for(f=b.length;e<f;++e){var h=b[e];if(g!=h){if(d<a[g+c-1])break;else if(d<=a[h-1])return Ll(a,g,h,c,d,!1);g=h}}return null};function O(a,b){rf.call(this);this.c=null;this.u=this.D=this.j=-1;this.ma(a,b)}v(O,rf);k=O.prototype;k.mk=function(a){this.A?la(this.A,a):this.A=a.slice();this.s()};k.clone=function(){var a=new O(null);a.ba(this.ja,this.A.slice());return a};k.Kb=function(a,b,c,d){if(d<Sa(this.G(),a,b))return d;this.u!=this.i&&(this.D=Math.sqrt(yf(this.A,0,this.A.length,this.a,0)),this.u=this.i);return Af(this.A,0,this.A.length,this.a,this.D,!1,a,b,c,d)};
k.Ck=function(a,b){return Pf(this.A,0,this.A.length,this.a,a,b)};k.nn=function(a,b){return"XYM"!=this.ja&&"XYZM"!=this.ja?null:Ll(this.A,0,this.A.length,this.a,a,void 0!==b?b:!1)};k.X=function(){return Ff(this.A,0,this.A.length,this.a)};k.wh=function(a,b){return Kl(this.A,0,this.A.length,this.a,a,b)};k.pn=function(){var a=this.A,b=this.a,c=a[0],d=a[1],e=0,f;for(f=0+b;f<this.A.length;f+=b)var g=a[f],h=a[f+1],e=e+Math.sqrt((g-c)*(g-c)+(h-d)*(h-d)),c=g,d=h;return e};
function di(a){a.j!=a.i&&(a.c=a.wh(.5,a.c),a.j=a.i);return a.c}k.hd=function(a){var b=[];b.length=Hf(this.A,0,this.A.length,this.a,a,b,0);a=new O(null);a.ba("XY",b);return a};k.U=function(){return"LineString"};k.Xa=function(a){return Qf(this.A,0,this.A.length,this.a,a)};k.ma=function(a,b){a?(uf(this,b,a,1),this.A||(this.A=[]),this.A.length=Df(this.A,0,a,this.a),this.s()):this.ba("XY",null)};k.ba=function(a,b){tf(this,a,b);this.s()};function P(a,b){rf.call(this);this.c=[];this.j=this.u=-1;this.ma(a,b)}v(P,rf);k=P.prototype;k.nk=function(a){this.A?la(this.A,a.ga().slice()):this.A=a.ga().slice();this.c.push(this.A.length);this.s()};k.clone=function(){var a=new P(null);a.ba(this.ja,this.A.slice(),this.c.slice());return a};k.Kb=function(a,b,c,d){if(d<Sa(this.G(),a,b))return d;this.j!=this.i&&(this.u=Math.sqrt(zf(this.A,0,this.c,this.a,0)),this.j=this.i);return Bf(this.A,0,this.c,this.a,this.u,!1,a,b,c,d)};
k.rn=function(a,b,c){return"XYM"!=this.ja&&"XYZM"!=this.ja||!this.A.length?null:Ml(this.A,this.c,this.a,a,void 0!==b?b:!1,void 0!==c?c:!1)};k.X=function(){return Gf(this.A,0,this.c,this.a)};k.Bb=function(){return this.c};k.Yk=function(a){if(0>a||this.c.length<=a)return null;var b=new O(null);b.ba(this.ja,this.A.slice(a?this.c[a-1]:0,this.c[a]));return b};
k.gd=function(){var a=this.A,b=this.c,c=this.ja,d=[],e=0,f;var g=0;for(f=b.length;g<f;++g){var h=b[g],l=new O(null);l.ba(c,a.slice(e,h));d.push(l);e=h}return d};function ei(a){var b=[],c=a.A,d=0,e=a.c;a=a.a;var f;var g=0;for(f=e.length;g<f;++g){var h=e[g],d=Kl(c,d,h,a,.5);la(b,d);d=h}return b}k.hd=function(a){var b=[],c=[],d=this.A,e=this.c,f=this.a,g=0,h=0,l;var m=0;for(l=e.length;m<l;++m){var n=e[m],h=Hf(d,g,n,f,a,b,h);c.push(h);g=n}b.length=h;a=new P(null);a.ba("XY",b,c);return a};k.U=function(){return"MultiLineString"};
k.Xa=function(a){a:{var b=this.A,c=this.c,d=this.a,e=0,f;var g=0;for(f=c.length;g<f;++g){if(Qf(b,e,c[g],d,a)){a=!0;break a}e=c[g]}a=!1}return a};k.ma=function(a,b){a?(uf(this,b,a,2),this.A||(this.A=[]),a=Ef(this.A,0,a,this.a,this.c),this.A.length=a.length?a[a.length-1]:0,this.s()):this.ba("XY",null,this.c)};k.ba=function(a,b,c){tf(this,a,b);this.c=c;this.s()};function Nl(a,b){var c=a.ja,d=[],e=[],f;var g=0;for(f=b.length;g<f;++g){var h=b[g];g||(c=h.ja);la(d,h.ga());e.push(d.length)}a.ba(c,d,e)};function Q(a,b){rf.call(this);this.ma(a,b)}v(Q,rf);k=Q.prototype;k.qk=function(a){this.A?la(this.A,a.ga()):this.A=a.ga().slice();this.s()};k.clone=function(){var a=new Q(null);a.ba(this.ja,this.A.slice());return a};k.Kb=function(a,b,c,d){if(d<Sa(this.G(),a,b))return d;var e=this.A,f=this.a,g;var h=0;for(g=e.length;h<g;h+=f){var l=Ga(a,b,e[h],e[h+1]);if(l<d){d=l;for(l=0;l<f;++l)c[l]=e[h+l];c.length=f}}return d};k.X=function(){return Ff(this.A,0,this.A.length,this.a)};
k.il=function(a){var b=this.A?this.A.length/this.a:0;if(0>a||b<=a)return null;b=new C(null);b.ba(this.ja,this.A.slice(a*this.a,(a+1)*this.a));return b};k.Zd=function(){var a=this.A,b=this.ja,c=this.a,d=[],e;var f=0;for(e=a.length;f<e;f+=c){var g=new C(null);g.ba(b,a.slice(f,f+c));d.push(g)}return d};k.U=function(){return"MultiPoint"};k.Xa=function(a){var b=this.A,c=this.a,d;var e=0;for(d=b.length;e<d;e+=c){var f=b[e];var g=b[e+1];if(Ua(a,f,g))return!0}return!1};
k.ma=function(a,b){a?(uf(this,b,a,1),this.A||(this.A=[]),this.A.length=Df(this.A,0,a,this.a),this.s()):this.ba("XY",null)};k.ba=function(a,b){tf(this,a,b);this.s()};function R(a,b){rf.call(this);this.c=[];this.u=-1;this.D=null;this.I=this.C=this.B=-1;this.j=null;this.ma(a,b)}v(R,rf);k=R.prototype;k.rk=function(a){if(this.A){var b=this.A.length;la(this.A,a.ga());a=a.Bb().slice();var c;var d=0;for(c=a.length;d<c;++d)a[d]+=b}else this.A=a.ga().slice(),a=a.Bb().slice(),this.c.push();this.c.push(a);this.s()};k.clone=function(){for(var a=new R(null),b=this.c.length,c=Array(b),d=0;d<b;++d)c[d]=this.c[d].slice();Ol(a,this.ja,this.A.slice(),c);return a};
k.Kb=function(a,b,c,d){if(d<Sa(this.G(),a,b))return d;if(this.C!=this.i){var e=this.c,f=0,g=0,h;var l=0;for(h=e.length;l<h;++l)var m=e[l],g=zf(this.A,f,m,this.a,g),f=m[m.length-1];this.B=Math.sqrt(g);this.C=this.i}e=fi(this);f=this.c;g=this.a;l=this.B;h=0;var m=[NaN,NaN],n;var p=0;for(n=f.length;p<n;++p){var q=f[p];d=Bf(e,h,q,g,l,!0,a,b,c,d,m);h=q[q.length-1]}return d};
k.Mc=function(a,b){a:{var c=fi(this),d=this.c,e=0;if(d.length){var f;var g=0;for(f=d.length;g<f;++g){var h=d[g];if(Nf(c,e,h,this.a,a,b)){a=!0;break a}e=h[h.length-1]}}a=!1}return a};k.sn=function(){var a=fi(this),b=this.c,c=0,d=0,e;var f=0;for(e=b.length;f<e;++f)var g=b[f],d=d+wf(a,c,g,this.a),c=g[g.length-1];return d};
k.X=function(a){if(void 0!==a){var b=fi(this).slice();Vf(b,this.c,this.a,a)}else b=this.A;a=b;b=this.c;var c=this.a,d=0,e=[],f=0,g;var h=0;for(g=b.length;h<g;++h){var l=b[h];e[f++]=Gf(a,d,l,c,e[f]);d=l[l.length-1]}e.length=f;return e};
function gi(a){if(a.u!=a.i){var b=a.A,c=a.c,d=a.a,e=0,f=[],g;var h=0;for(g=c.length;h<g;++h){var l=c[h],e=$a(b,e,l[0],d);f.push((e[0]+e[2])/2,(e[1]+e[3])/2);e=l[l.length-1]}b=fi(a);c=a.c;d=a.a;h=0;g=[];l=0;for(e=c.length;l<e;++l){var m=c[l];g=Of(b,h,m,d,f,2*l,g);h=m[m.length-1]}a.D=g;a.u=a.i}return a.D}k.Uk=function(){var a=new Q(null);a.ba("XY",gi(this).slice());return a};
function fi(a){if(a.I!=a.i){var b=a.A;a:{var c=a.c;var d;var e=0;for(d=c.length;e<d;++e)if(!Tf(b,c[e],a.a,void 0)){c=!1;break a}c=!0}c?a.j=b:(a.j=b.slice(),a.j.length=Vf(a.j,a.c,a.a));a.I=a.i}return a.j}k.hd=function(a){var b=[],c=[],d=this.A,e=this.c,f=this.a;a=Math.sqrt(a);var g=0,h=0,l;var m=0;for(l=e.length;m<l;++m){var n=e[m],p=[],h=If(d,g,n,f,a,b,h,p);c.push(p);g=n[n.length-1]}b.length=h;d=new R(null);Ol(d,"XY",b,c);return d};
k.jl=function(a){if(0>a||this.c.length<=a)return null;if(a){var b=this.c[a-1];b=b[b.length-1]}else b=0;a=this.c[a].slice();var c=a[a.length-1];if(b){var d;var e=0;for(d=a.length;e<d;++e)a[e]-=b}e=new D(null);e.ba(this.ja,this.A.slice(b,c),a);return e};k.Td=function(){var a=this.ja,b=this.A,c=this.c,d=[],e=0,f,g;var h=0;for(f=c.length;h<f;++h){var l=c[h].slice(),m=l[l.length-1];if(e){var n=0;for(g=l.length;n<g;++n)l[n]-=e}n=new D(null);n.ba(a,b.slice(e,m),l);d.push(n);e=m}return d};k.U=function(){return"MultiPolygon"};
k.Xa=function(a){a:{var b=fi(this),c=this.c,d=this.a,e=0,f;var g=0;for(f=c.length;g<f;++g){var h=c[g];if(Rf(b,e,h,d,a)){a=!0;break a}e=h[h.length-1]}a=!1}return a};k.ma=function(a,b){if(a){uf(this,b,a,3);this.A||(this.A=[]);b=this.A;var c=this.a,d=this.c,e=0,d=d?d:[],f=0,g;var h=0;for(g=a.length;h<g;++h)e=Ef(b,e,a[h],c,d[f]),d[f++]=e,e=e[e.length-1];d.length=f;d.length?(a=d[d.length-1],this.A.length=a.length?a[a.length-1]:0):this.A.length=0;this.s()}else Ol(this,"XY",null,this.c)};
function Ol(a,b,c,d){tf(a,b,c);a.c=d;a.s()}function Pl(a,b){var c=a.ja,d=[],e=[],f;var g=0;for(f=b.length;g<f;++g){var h=b[g];g||(c=h.ja);var l=d.length;var m=h.Bb();var n;var p=0;for(n=m.length;p<n;++p)m[p]+=l;la(d,h.ga());e.push(m)}Ol(a,c,d,e)};function Ql(a){a=a?a:{};El.call(this);this.b=a.geometryName}v(Ql,Il);
function Rl(a,b){if(!a)return null;if("number"===typeof a.x&&"number"===typeof a.y)var c="Point";else if(a.points)c="MultiPoint";else if(a.paths)c=1===a.paths.length?"LineString":"MultiLineString";else if(a.rings){var d=a.rings,e=Sl(a),f=[],g=[];c=[];var h;var l=0;for(h=d.length;l<h;++l)f.length=0,Df(f,0,d[l],e.length),Sf(f,0,f.length,e.length)?g.push([d[l]]):c.push(d[l]);for(;c.length;){d=c.shift();e=!1;for(l=g.length-1;0<=l;l--)if(Va((new Jf(g[l][0])).G(),(new Jf(d)).G())){g[l].push(d);e=!0;break}e||
g.push([d.reverse()])}a=tb({},a);1===g.length?(c="Polygon",a.rings=g[0]):(c="MultiPolygon",a.rings=g)}return Hl((0,Tl[c])(a),!1,b)}function Sl(a){var b="XY";!0===a.hasZ&&!0===a.hasM?b="XYZM":!0===a.hasZ?b="XYZ":!0===a.hasM&&(b="XYM");return b}function Ul(a){a=a.ja;return{hasZ:"XYZ"===a||"XYZM"===a,hasM:"XYM"===a||"XYZM"===a}}
var Tl={Point:function(a){return void 0!==a.m&&void 0!==a.z?new C([a.x,a.y,a.z,a.m],"XYZM"):void 0!==a.z?new C([a.x,a.y,a.z],"XYZ"):void 0!==a.m?new C([a.x,a.y,a.m],"XYM"):new C([a.x,a.y])},LineString:function(a){return new O(a.paths[0],Sl(a))},Polygon:function(a){return new D(a.rings,Sl(a))},MultiPoint:function(a){return new Q(a.points,Sl(a))},MultiLineString:function(a){return new P(a.paths,Sl(a))},MultiPolygon:function(a){return new R(a.rings,Sl(a))}},Vl={Point:function(a){var b=a.X(),c;a=a.ja;
"XYZ"===a?c={x:b[0],y:b[1],z:b[2]}:"XYM"===a?c={x:b[0],y:b[1],m:b[2]}:"XYZM"===a?c={x:b[0],y:b[1],z:b[2],m:b[3]}:"XY"===a?c={x:b[0],y:b[1]}:xa(!1,34);return c},LineString:function(a){var b=Ul(a);return{hasZ:b.hasZ,hasM:b.hasM,paths:[a.X()]}},Polygon:function(a){var b=Ul(a);return{hasZ:b.hasZ,hasM:b.hasM,rings:a.X(!1)}},MultiPoint:function(a){var b=Ul(a);return{hasZ:b.hasZ,hasM:b.hasM,points:a.X()}},MultiLineString:function(a){var b=Ul(a);return{hasZ:b.hasZ,hasM:b.hasM,paths:a.X()}},MultiPolygon:function(a){var b=
Ul(a);a=a.X(!1);for(var c=[],d=0;d<a.length;d++)for(var e=a[d].length-1;0<=e;e--)c.push(a[d][e]);return{hasZ:b.hasZ,hasM:b.hasM,rings:c}}};k=Ql.prototype;k.Rc=function(a,b){var c=Rl(a.geometry,b),d=new H;this.b&&d.Tc(this.b);d.Ra(c);b&&b.dg&&a.attributes[b.dg]&&d.jc(a.attributes[b.dg]);a.attributes&&d.H(a.attributes);return d};k.yg=function(a,b){b=b?b:{};if(a.features){var c=[],d=a.features,e;b.dg=a.objectIdFieldName;a=0;for(e=d.length;a<e;++a)c.push(this.Rc(d[a],b));return c}return[this.Rc(a,b)]};
k.Cg=function(a,b){return Rl(a,b)};k.Fg=function(a){return a.spatialReference&&a.spatialReference.wkid?Tb("EPSG:"+a.spatialReference.wkid):null};function Wl(a,b){return(0,Vl[a.U()])(Hl(a,!0,b),b)}k.je=function(a,b){return Wl(a,Gl(this,b))};k.Zc=function(a,b){b=Gl(this,b);var c={},d=a.V();d&&(c.geometry=Wl(d,b));d=a.N();delete d[a.c];c.attributes=wb(d)?{}:d;b&&b.featureProjection&&(c.spatialReference={wkid:Tb(b.featureProjection).mb.split(":").pop()});return c};
k.he=function(a,b){b=Gl(this,b);var c=[],d;var e=0;for(d=a.length;e<d;++e)c.push(this.Zc(a[e],b));return{features:c}};function Xl(a){this.kc=a};function Yl(a,b){this.kc=a;this.b=Array.prototype.slice.call(arguments,1);xa(2<=this.b.length,57)}v(Yl,Xl);function Zl(a){var b=["And"].concat(Array.prototype.slice.call(arguments));Yl.apply(this,b)}v(Zl,Yl);function $l(a,b,c){this.kc="BBOX";this.geometryName=a;this.extent=b;this.srsName=c}v($l,Xl);function am(a,b){this.kc=a;this.b=b}v(am,Xl);function bm(a,b,c){am.call(this,"During",a);this.a=b;this.i=c}v(bm,am);function cm(a,b,c,d){am.call(this,a,b);this.i=c;this.a=d}v(cm,am);function dm(a,b,c){cm.call(this,"PropertyIsEqualTo",a,b,c)}v(dm,cm);function em(a,b){cm.call(this,"PropertyIsGreaterThan",a,b)}v(em,cm);function fm(a,b){cm.call(this,"PropertyIsGreaterThanOrEqualTo",a,b)}v(fm,cm);function gm(a,b,c,d){this.kc=a;this.geometryName=b||"the_geom";this.geometry=c;this.srsName=d}v(gm,Xl);function hm(a,b,c){gm.call(this,"Intersects",a,b,c)}v(hm,gm);function im(a,b,c){am.call(this,"PropertyIsBetween",a);this.a=b;this.i=c}v(im,am);function jm(a,b,c,d,e,f){am.call(this,"PropertyIsLike",a);this.c=b;this.g=void 0!==c?c:"*";this.f=void 0!==d?d:".";this.i=void 0!==e?e:"!";this.a=f}v(jm,am);function km(a){am.call(this,"PropertyIsNull",a)}v(km,am);function lm(a,b){cm.call(this,"PropertyIsLessThan",a,b)}v(lm,cm);function mm(a,b){cm.call(this,"PropertyIsLessThanOrEqualTo",a,b)}v(mm,cm);function nm(a){this.kc="Not";this.condition=a}v(nm,Xl);function om(a,b,c){cm.call(this,"PropertyIsNotEqualTo",a,b,c)}v(om,cm);function pm(a){var b=["Or"].concat(Array.prototype.slice.call(arguments));Yl.apply(this,b)}v(pm,Yl);function qm(a,b,c){gm.call(this,"Within",a,b,c)}v(qm,gm);function rm(a){var b=[null].concat(Array.prototype.slice.call(arguments));return new (Function.prototype.bind.apply(Zl,b))}function sm(a,b,c){return new $l(a,b,c)};function tm(a){of.call(this);this.a=a?a:null;um(this)}v(tm,of);function vm(a){var b=[],c;var d=0;for(c=a.length;d<c;++d)b.push(a[d].clone());return b}function wm(a){var b;if(a.a){var c=0;for(b=a.a.length;c<b;++c)Kc(a.a[c],"change",a.s,a)}}function um(a){var b;if(a.a){var c=0;for(b=a.a.length;c<b;++c)y(a.a[c],"change",a.s,a)}}k=tm.prototype;k.clone=function(){var a=new tm(null);a.oj(this.a);return a};
k.Kb=function(a,b,c,d){if(d<Sa(this.G(),a,b))return d;var e=this.a,f;var g=0;for(f=e.length;g<f;++g)d=e[g].Kb(a,b,c,d);return d};k.Mc=function(a,b){var c=this.a,d;var e=0;for(d=c.length;e<d;++e)if(c[e].Mc(a,b))return!0;return!1};k.se=function(a){Ya(a);for(var b=this.a,c=0,d=b.length;c<d;++c)cb(a,b[c].G());return a};k.Vf=function(){return vm(this.a)};
k.Vd=function(a){this.o!=this.i&&(ub(this.f),this.g=0,this.o=this.i);if(0>a||this.g&&a<this.g)return this;var b=a.toString();if(this.f.hasOwnProperty(b))return this.f[b];var c=[],d=this.a,e=!1,f;var g=0;for(f=d.length;g<f;++g){var h=d[g],l=h.Vd(a);c.push(l);l!==h&&(e=!0)}if(e)return a=new tm(null),wm(a),a.a=c,um(a),a.s(),this.f[b]=a;this.g=a;return this};k.U=function(){return"GeometryCollection"};k.Xa=function(a){var b=this.a,c;var d=0;for(c=b.length;d<c;++d)if(b[d].Xa(a))return!0;return!1};
k.rotate=function(a,b){for(var c=this.a,d=0,e=c.length;d<e;++d)c[d].rotate(a,b);this.s()};k.scale=function(a,b,c){c||(c=nb(this.G()));for(var d=this.a,e=0,f=d.length;e<f;++e)d[e].scale(a,b,c);this.s()};k.oj=function(a){a=vm(a);wm(this);this.a=a;um(this);this.s()};k.Dc=function(a){var b=this.a,c;var d=0;for(c=b.length;d<c;++d)b[d].Dc(a);this.s()};k.translate=function(a,b){var c=this.a,d;var e=0;for(d=c.length;e<d;++e)c[e].translate(a,b);this.s()};k.ka=function(){wm(this);of.prototype.ka.call(this)};function xm(a){a=a?a:{};El.call(this);this.defaultDataProjection=Tb(a.defaultDataProjection?a.defaultDataProjection:"EPSG:4326");a.featureProjection&&(this.f=Tb(a.featureProjection));this.b=a.geometryName}v(xm,Il);function ym(a,b){return a?Hl((0,zm[a.type])(a),!1,b):null}function Am(a,b){return(0,Bm[a.U()])(Hl(a,!0,b),b)}
var zm={Point:function(a){return new C(a.coordinates)},LineString:function(a){return new O(a.coordinates)},Polygon:function(a){return new D(a.coordinates)},MultiPoint:function(a){return new Q(a.coordinates)},MultiLineString:function(a){return new P(a.coordinates)},MultiPolygon:function(a){return new R(a.coordinates)},GeometryCollection:function(a,b){a=a.geometries.map(function(a){return ym(a,b)});return new tm(a)}},Bm={Point:function(a){return{type:"Point",coordinates:a.X()}},LineString:function(a){return{type:"LineString",
coordinates:a.X()}},Polygon:function(a,b){if(b)var c=b.rightHanded;return{type:"Polygon",coordinates:a.X(c)}},MultiPoint:function(a){return{type:"MultiPoint",coordinates:a.X()}},MultiLineString:function(a){return{type:"MultiLineString",coordinates:a.X()}},MultiPolygon:function(a,b){if(b)var c=b.rightHanded;return{type:"MultiPolygon",coordinates:a.X(c)}},GeometryCollection:function(a,b){return{type:"GeometryCollection",geometries:a.a.map(function(a){var c=tb({},b);delete c.featureProjection;return Am(a,
c)})}},Circle:function(){return{type:"GeometryCollection",geometries:[]}}};k=xm.prototype;k.Rc=function(a,b){a="Feature"===a.type?a:{type:"Feature",geometry:a};b=ym(a.geometry,b);var c=new H;this.b&&c.Tc(this.b);c.Ra(b);void 0!==a.id&&c.jc(a.id);a.properties&&c.H(a.properties);return c};k.yg=function(a,b){if("FeatureCollection"===a.type){var c=[];a=a.features;var d;var e=0;for(d=a.length;e<d;++e)c.push(this.Rc(a[e],b))}else c=[this.Rc(a,b)];return c};k.Cg=function(a,b){return ym(a,b)};
k.Fg=function(a){a=a.crs;var b;a?"name"==a.type?b=Tb(a.properties.name):"EPSG"==a.type?b=Tb("EPSG:"+a.properties.code):xa(!1,36):b=this.defaultDataProjection;return b};k.Zc=function(a,b){b=Gl(this,b);var c={type:"Feature"},d=a.a;void 0!==d&&(c.id=d);(d=a.V())?c.geometry=Am(d,b):c.geometry=null;b=a.N();delete b[a.c];wb(b)?c.properties=null:c.properties=b;return c};k.he=function(a,b){b=Gl(this,b);var c=[],d;var e=0;for(d=a.length;e<d;++e)c.push(this.Zc(a[e],b));return{type:"FeatureCollection",features:c}};
k.je=function(a,b){return Am(a,Gl(this,b))};function Cm(){this.i=new XMLSerializer;El.call(this)}v(Cm,El);k=Cm.prototype;k.U=function(){return"xml"};k.Tb=function(a,b){return ml(a)?Dm(this,a,b):nl(a)?this.xg(a,b):"string"===typeof a?(a=pl(a),Dm(this,a,b)):null};function Dm(a,b,c){a=Em(a,b,c);return 0<a.length?a[0]:null}k.xg=function(){return null};k.Oa=function(a,b){return ml(a)?Em(this,a,b):nl(a)?this.zc(a,b):"string"===typeof a?(a=pl(a),Em(this,a,b)):[]};
function Em(a,b,c){var d=[];for(b=b.firstChild;b;b=b.nextSibling)b.nodeType==Node.ELEMENT_NODE&&la(d,a.zc(b,c));return d}k.Sc=function(a,b){if(ml(a))return null;if(nl(a))return this.aj(a,b);"string"===typeof a&&pl(a);return null};k.aj=function(){return null};k.kb=function(a){return ml(a)?this.Eg(a):nl(a)?this.kf(a):"string"===typeof a?(a=pl(a),this.Eg(a)):null};k.Eg=function(){return this.defaultDataProjection};k.kf=function(){return this.defaultDataProjection};
k.Bd=function(a,b){return this.i.serializeToString(this.Vg(a,b))};k.Vg=function(){return null};k.Wb=function(a,b){a=this.Xb(a,b);return this.i.serializeToString(a)};k.Xb=function(){return null};k.$c=function(a,b){a=this.ie(a,b);return this.i.serializeToString(a)};k.ie=function(){return null};function Fm(a){a=a?a:{};this.featureType=a.featureType;this.featureNS=a.featureNS;this.srsName=a.srsName;this.schemaLocation="";this.b={};this.b["http://www.opengis.net/gml"]={featureMember:sl(Fm.prototype.be),featureMembers:sl(Fm.prototype.be)};Cm.call(this)}v(Fm,Cm);var Gm=/^[\s\xa0]*$/;k=Fm.prototype;
k.be=function(a,b){var c=a.localName,d=null;if("FeatureCollection"==c)"http://www.opengis.net/wfs"===a.namespaceURI?d=N([],this.b,a,b,this):d=N(null,this.b,a,b,this);else if("featureMembers"==c||"featureMember"==c){var e=b[0],f=e.featureType,g=e.featureNS,h;if(!f&&a.childNodes){f=[];g={};var l=0;for(h=a.childNodes.length;l<h;++l){var m=a.childNodes[l];if(1===m.nodeType){var n=m.nodeName.split(":").pop();if(-1===f.indexOf(n)){var p="",q=0,m=m.namespaceURI,r;for(r in g){if(g[r]===m){p=r;break}++q}p||
(p="p"+q,g[p]=m);f.push(p+":"+n)}}}"featureMember"!=c&&(e.featureType=f,e.featureNS=g)}"string"===typeof g&&(l=g,g={},g.p0=l);var e={},f=Array.isArray(f)?f:[f],u;for(u in g){n={};l=0;for(h=f.length;l<h;++l)(-1===f[l].indexOf(":")?"p0":f[l].split(":")[0])===u&&(n[f[l].split(":").pop()]="featureMembers"==c?rl(this.wg,this):sl(this.wg,this));e[g[u]]=n}"featureMember"==c?d=N(void 0,e,a,b):d=N([],e,a,b)}null===d&&(d=[]);return d};
k.gf=function(a,b){var c=b[0];c.srsName=a.firstElementChild.getAttribute("srsName");if(a=N(null,this.Zg,a,b,this))return Hl(a,!1,c)};
k.wg=function(a,b){var c;(c=a.getAttribute("fid"))||(c=a.getAttributeNS("http://www.opengis.net/gml","id")||"");var d={},e;for(a=a.firstElementChild;a;a=a.nextElementSibling){var f=a.localName;if(0===a.childNodes.length||1===a.childNodes.length&&(3===a.firstChild.nodeType||4===a.firstChild.nodeType)){var g=kl(a,!1);Gm.test(g)&&(g=void 0);d[f]=g}else"boundedBy"!==f&&(e=f),d[f]=this.gf(a,b)}b=new H(d);e&&b.Tc(e);c&&b.jc(c);return b};
k.fj=function(a,b){if(a=this.ff(a,b))return b=new C(null),b.ba("XYZ",a),b};k.dj=function(a,b){if(a=N([],this.Nj,a,b,this))return new Q(a)};k.cj=function(a,b){if(a=N([],this.Mj,a,b,this))return b=new P(null),Nl(b,a),b};k.ej=function(a,b){if(a=N([],this.Oj,a,b,this))return b=new R(null),Pl(b,a),b};k.Xi=function(a,b){Al(this.Rj,a,b,this)};k.Mh=function(a,b){Al(this.Kj,a,b,this)};k.Yi=function(a,b){Al(this.Sj,a,b,this)};k.hf=function(a,b){if(a=this.ff(a,b))return b=new O(null),b.ba("XYZ",a),b};
k.wp=function(a,b){if(a=N(null,this.ke,a,b,this))return a};k.bj=function(a,b){if(a=this.ff(a,b))return b=new Jf(null),Kf(b,"XYZ",a),b};k.jf=function(a,b){if((a=N([null],this.zf,a,b,this))&&a[0]){b=new D(null);var c=a[0],d=[c.length],e;var f=1;for(e=a.length;f<e;++f)la(c,a[f]),d.push(c.length);b.ba("XYZ",c,d);return b}};k.ff=function(a,b){return N(null,this.ke,a,b,this)};k.Nj={"http://www.opengis.net/gml":{pointMember:rl(Fm.prototype.Xi),pointMembers:rl(Fm.prototype.Xi)}};
k.Mj={"http://www.opengis.net/gml":{lineStringMember:rl(Fm.prototype.Mh),lineStringMembers:rl(Fm.prototype.Mh)}};k.Oj={"http://www.opengis.net/gml":{polygonMember:rl(Fm.prototype.Yi),polygonMembers:rl(Fm.prototype.Yi)}};k.Rj={"http://www.opengis.net/gml":{Point:rl(Fm.prototype.ff)}};k.Kj={"http://www.opengis.net/gml":{LineString:rl(Fm.prototype.hf)}};k.Sj={"http://www.opengis.net/gml":{Polygon:rl(Fm.prototype.jf)}};k.le={"http://www.opengis.net/gml":{LinearRing:sl(Fm.prototype.wp)}};
k.aj=function(a,b){return(a=this.gf(a,[Fl(this,a,b?b:{})]))?a:null};k.zc=function(a,b){var c={featureType:this.featureType,featureNS:this.featureNS};b&&tb(c,Fl(this,a,b));return this.be(a,[c])||[]};k.kf=function(a){return Tb(this.srsName?this.srsName:a.firstElementChild.getAttribute("srsName"))};function Hm(a){a=kl(a,!1);return Im(a)}function Im(a){if(a=/^\s*(true|1)|(false|0)\s*$/.exec(a))return void 0!==a[1]||!1}function Jm(a){a=kl(a,!1);a=Date.parse(a);return isNaN(a)?void 0:a/1E3}function Km(a){a=kl(a,!1);return Lm(a)}function Lm(a){if(a=/^\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)\s*$/i.exec(a))return parseFloat(a[1])}function Mm(a){a=kl(a,!1);return Nm(a)}function Nm(a){if(a=/^\s*(\d+)\s*$/.exec(a))return parseInt(a[1],10)}function S(a){return kl(a,!1).trim()}
function Om(a,b){Pm(a,b?"1":"0")}function Qm(a,b){a.appendChild(il.createTextNode(b.toPrecision()))}function Rm(a,b){a.appendChild(il.createTextNode(b.toString()))}function Pm(a,b){a.appendChild(il.createTextNode(b))};function Sm(a){a=a?a:{};Fm.call(this,a);this.l=void 0!==a.surface?a.surface:!1;this.c=void 0!==a.curve?a.curve:!1;this.g=void 0!==a.multiCurve?a.multiCurve:!0;this.j=void 0!==a.multiSurface?a.multiSurface:!0;this.schemaLocation=a.schemaLocation?a.schemaLocation:"http://www.opengis.net/gml http://schemas.opengis.net/gml/3.1.1/profiles/gmlsfProfile/1.0.0/gmlsf.xsd"}v(Sm,Fm);k=Sm.prototype;k.Ap=function(a,b){if(a=N([],this.Lj,a,b,this))return b=new P(null),Nl(b,a),b};
k.Bp=function(a,b){if(a=N([],this.Pj,a,b,this))return b=new R(null),Pl(b,a),b};k.ph=function(a,b){Al(this.Hj,a,b,this)};k.Aj=function(a,b){Al(this.Uj,a,b,this)};k.Ep=function(a,b){return N([null],this.Qj,a,b,this)};k.Hp=function(a,b){return N([null],this.Tj,a,b,this)};k.Fp=function(a,b){return N([null],this.zf,a,b,this)};k.zp=function(a,b){return N([null],this.ke,a,b,this)};k.cm=function(a,b){(a=N(void 0,this.le,a,b,this))&&b[b.length-1].push(a)};
k.yk=function(a,b){(a=N(void 0,this.le,a,b,this))&&(b[b.length-1][0]=a)};k.gj=function(a,b){if((a=N([null],this.Vj,a,b,this))&&a[0]){b=new D(null);var c=a[0],d=[c.length],e;var f=1;for(e=a.length;f<e;++f)la(c,a[f]),d.push(c.length);b.ba("XYZ",c,d);return b}};k.Zi=function(a,b){if(a=N([null],this.Ij,a,b,this))return b=new O(null),b.ba("XYZ",a),b};k.vp=function(a,b){a=N([null],this.Jj,a,b,this);return Xa(a[1][0],a[1][1],a[2][0],a[2][1])};
k.xp=function(a,b){var c=kl(a,!1),d=/^\s*([+\-]?\d*\.?\d+(?:[eE][+\-]?\d+)?)\s*/;a=[];for(var e;e=d.exec(c);)a.push(parseFloat(e[1])),c=c.substr(e[0].length);if(""===c){b=b[0].srsName;c="enu";b&&(c=Tb(b).b);if("neu"===c)for(b=0,c=a.length;b<c;b+=3)d=a[b],a[b]=a[b+1],a[b+1]=d;b=a.length;2==b&&a.push(0);if(b)return a}};
k.Bg=function(a,b){var c=kl(a,!1).replace(/^\s*|\s*$/g,""),d=b[0].srsName,e=a.parentNode.getAttribute("srsDimension");b="enu";d&&(b=Tb(d).b);c=c.split(/\s+/);d=2;a.getAttribute("srsDimension")?d=Nm(a.getAttribute("srsDimension")):a.getAttribute("dimension")?d=Nm(a.getAttribute("dimension")):e&&(d=Nm(e));for(var f,g=[],h=0,l=c.length;h<l;h+=d)a=parseFloat(c[h]),e=parseFloat(c[h+1]),f=3===d?parseFloat(c[h+2]):0,"en"===b.substr(0,2)?g.push(a,e,f):g.push(e,a,f);return g};
k.ke={"http://www.opengis.net/gml":{pos:sl(Sm.prototype.xp),posList:sl(Sm.prototype.Bg)}};k.zf={"http://www.opengis.net/gml":{interior:Sm.prototype.cm,exterior:Sm.prototype.yk}};
k.Zg={"http://www.opengis.net/gml":{Point:sl(Fm.prototype.fj),MultiPoint:sl(Fm.prototype.dj),LineString:sl(Fm.prototype.hf),MultiLineString:sl(Fm.prototype.cj),LinearRing:sl(Fm.prototype.bj),Polygon:sl(Fm.prototype.jf),MultiPolygon:sl(Fm.prototype.ej),Surface:sl(Sm.prototype.gj),MultiSurface:sl(Sm.prototype.Bp),Curve:sl(Sm.prototype.Zi),MultiCurve:sl(Sm.prototype.Ap),Envelope:sl(Sm.prototype.vp)}};k.Lj={"http://www.opengis.net/gml":{curveMember:rl(Sm.prototype.ph),curveMembers:rl(Sm.prototype.ph)}};
k.Pj={"http://www.opengis.net/gml":{surfaceMember:rl(Sm.prototype.Aj),surfaceMembers:rl(Sm.prototype.Aj)}};k.Hj={"http://www.opengis.net/gml":{LineString:rl(Fm.prototype.hf),Curve:rl(Sm.prototype.Zi)}};k.Uj={"http://www.opengis.net/gml":{Polygon:rl(Fm.prototype.jf),Surface:rl(Sm.prototype.gj)}};k.Vj={"http://www.opengis.net/gml":{patches:sl(Sm.prototype.Ep)}};k.Ij={"http://www.opengis.net/gml":{segments:sl(Sm.prototype.Hp)}};k.Jj={"http://www.opengis.net/gml":{lowerCorner:rl(Sm.prototype.Bg),upperCorner:rl(Sm.prototype.Bg)}};
k.Qj={"http://www.opengis.net/gml":{PolygonPatch:sl(Sm.prototype.Fp)}};k.Tj={"http://www.opengis.net/gml":{LineStringSegment:sl(Sm.prototype.zp)}};function Tm(a,b,c){var d=c[c.length-1];c=d.hasZ;d=d.srsName;b=b.X();for(var e=b.length,f=Array(e),g,h=0;h<e;++h){g=b[h];var l=h,m=c,n="enu";d&&(n=Tb(d).b);n="en"===n.substr(0,2)?g[0]+" "+g[1]:g[1]+" "+g[0];m&&(n+=" "+(g[2]||0));f[l]=n}Pm(a,f.join(" "))}
k.ni=function(a,b,c){var d=c[c.length-1].srsName;d&&a.setAttribute("srsName",d);d=jl(a.namespaceURI,"pos");a.appendChild(d);c=c[c.length-1];a=c.hasZ;var e=c.srsName;c="enu";e&&(c=Tb(e).b);b=b.X();c="en"===c.substr(0,2)?b[0]+" "+b[1]:b[1]+" "+b[0];a&&(c+=" "+(b[2]||0));Pm(d,c)};var Um={"http://www.opengis.net/gml":{lowerCorner:J(Pm),upperCorner:J(Pm)}};k=Sm.prototype;
k.jn=function(a,b,c){var d=c[c.length-1].srsName;d&&a.setAttribute("srsName",d);Bl({node:a},Um,yl,[b[0]+" "+b[1],b[2]+" "+b[3]],c,["lowerCorner","upperCorner"],this)};k.ki=function(a,b,c){var d=c[c.length-1].srsName;d&&a.setAttribute("srsName",d);d=jl(a.namespaceURI,"posList");a.appendChild(d);Tm(d,b,c)};k.hn=function(a,b){a=b[b.length-1];b=a.node;var c=a.exteriorWritten;void 0===c&&(a.exteriorWritten=!0);return jl(b.namespaceURI,void 0!==c?"interior":"exterior")};
k.Se=function(a,b,c){var d=c[c.length-1],e=d.hasZ,d=d.srsName;"PolygonPatch"!==a.nodeName&&d&&a.setAttribute("srsName",d);"Polygon"===a.nodeName||"PolygonPatch"===a.nodeName?(b=b.Sd(),Bl({node:a,hasZ:e,srsName:d},Vm,this.hn,b,c,void 0,this)):"Surface"===a.nodeName&&(e=jl(a.namespaceURI,"patches"),a.appendChild(e),a=jl(e.namespaceURI,"PolygonPatch"),e.appendChild(a),this.Se(a,b,c))};
k.Re=function(a,b,c){var d=c[c.length-1].srsName;"LineStringSegment"!==a.nodeName&&d&&a.setAttribute("srsName",d);"LineString"===a.nodeName||"LineStringSegment"===a.nodeName?(d=jl(a.namespaceURI,"posList"),a.appendChild(d),Tm(d,b,c)):"Curve"===a.nodeName&&(d=jl(a.namespaceURI,"segments"),a.appendChild(d),a=jl(d.namespaceURI,"LineStringSegment"),d.appendChild(a),this.Re(a,b,c))};
k.mi=function(a,b,c){var d=c[c.length-1],e=d.hasZ,f=d.srsName,d=d.surface;f&&a.setAttribute("srsName",f);b=b.Td();Bl({node:a,hasZ:e,srsName:f,surface:d},Wm,this.o,b,c,void 0,this)};k.kn=function(a,b,c){var d=c[c.length-1],e=d.srsName,d=d.hasZ;e&&a.setAttribute("srsName",e);b=b.Zd();Bl({node:a,hasZ:d,srsName:e},Xm,wl("pointMember"),b,c,void 0,this)};
k.li=function(a,b,c){var d=c[c.length-1],e=d.hasZ,f=d.srsName,d=d.curve;f&&a.setAttribute("srsName",f);b=b.gd();Bl({node:a,hasZ:e,srsName:f,curve:d},Ym,this.o,b,c,void 0,this)};k.oi=function(a,b,c){var d=jl(a.namespaceURI,"LinearRing");a.appendChild(d);this.ki(d,b,c)};k.pi=function(a,b,c){var d=this.a(b,c);d&&(a.appendChild(d),this.Se(d,b,c))};k.ln=function(a,b,c){var d=jl(a.namespaceURI,"Point");a.appendChild(d);this.ni(d,b,c)};
k.ji=function(a,b,c){var d=this.a(b,c);d&&(a.appendChild(d),this.Re(d,b,c))};k.od=function(a,b,c){var d=c[c.length-1],e=tb({},d);e.node=a;var f;Array.isArray(b)?d.dataProjection?f=hc(b,d.featureProjection,d.dataProjection):f=b:f=Hl(b,!0,d);Bl(e,Zm,this.a,[f],c,void 0,this)};
k.ii=function(a,b,c){var d=b.a;d&&a.setAttribute("fid",d);var d=c[c.length-1],e=d.featureNS,f=b.c;d.lb||(d.lb={},d.lb[e]={});var g=b.N();b=[];var h=[];for(m in g){var l=g[m];null!==l&&(b.push(m),h.push(l),m==f||l instanceof of?m in d.lb[e]||(d.lb[e][m]=J(this.od,this)):m in d.lb[e]||(d.lb[e][m]=J(Pm)))}var m=tb({},d);m.node=a;Bl(m,d.lb,wl(void 0,e),h,c,b)};
var Wm={"http://www.opengis.net/gml":{surfaceMember:J(Sm.prototype.pi),polygonMember:J(Sm.prototype.pi)}},Xm={"http://www.opengis.net/gml":{pointMember:J(Sm.prototype.ln)}},Ym={"http://www.opengis.net/gml":{lineStringMember:J(Sm.prototype.ji),curveMember:J(Sm.prototype.ji)}},Vm={"http://www.opengis.net/gml":{exterior:J(Sm.prototype.oi),interior:J(Sm.prototype.oi)}},Zm={"http://www.opengis.net/gml":{Curve:J(Sm.prototype.Re),MultiCurve:J(Sm.prototype.li),Point:J(Sm.prototype.ni),MultiPoint:J(Sm.prototype.kn),
LineString:J(Sm.prototype.Re),MultiLineString:J(Sm.prototype.li),LinearRing:J(Sm.prototype.ki),Polygon:J(Sm.prototype.Se),MultiPolygon:J(Sm.prototype.mi),Surface:J(Sm.prototype.Se),MultiSurface:J(Sm.prototype.mi),Envelope:J(Sm.prototype.jn)}},$m={MultiLineString:"lineStringMember",MultiCurve:"curveMember",MultiPolygon:"polygonMember",MultiSurface:"surfaceMember"};Sm.prototype.o=function(a,b){return jl("http://www.opengis.net/gml",$m[b[b.length-1].node.nodeName])};
Sm.prototype.a=function(a,b){var c=b[b.length-1];b=c.multiSurface;var d=c.surface,e=c.curve,c=c.multiCurve;Array.isArray(a)?a="Envelope":(a=a.U(),"MultiPolygon"===a&&!0===b?a="MultiSurface":"Polygon"===a&&!0===d?a="Surface":"LineString"===a&&!0===e?a="Curve":"MultiLineString"===a&&!0===c&&(a="MultiCurve"));return jl("http://www.opengis.net/gml",a)};
Sm.prototype.ie=function(a,b){b=Gl(this,b);var c=jl("http://www.opengis.net/gml","geom"),d={node:c,hasZ:this.hasZ,srsName:this.srsName,curve:this.c,surface:this.l,multiSurface:this.j,multiCurve:this.g};b&&tb(d,b);this.od(c,a,[d]);return c};
Sm.prototype.Xb=function(a,b){b=Gl(this,b);var c=jl("http://www.opengis.net/gml","featureMembers");c.setAttributeNS("http://www.w3.org/2001/XMLSchema-instance","xsi:schemaLocation",this.schemaLocation);var d={srsName:this.srsName,hasZ:this.hasZ,curve:this.c,surface:this.l,multiSurface:this.j,multiCurve:this.g,featureNS:this.featureNS,featureType:this.featureType};b&&tb(d,b);b=[d];var e=b[b.length-1],d=e.featureType,f=e.featureNS,g={};g[f]={};g[f][d]=J(this.ii,this);e=tb({},e);e.node=c;Bl(e,g,wl(d,
f),a,b);return c};function an(a){a=a?a:{};Fm.call(this,a);this.b["http://www.opengis.net/gml"].featureMember=rl(Fm.prototype.be);this.schemaLocation=a.schemaLocation?a.schemaLocation:"http://www.opengis.net/gml http://schemas.opengis.net/gml/2.1.2/feature.xsd"}v(an,Fm);k=an.prototype;
k.$i=function(a,b){a=kl(a,!1).replace(/^\s*|\s*$/g,"");var c=b[0].srsName;b="enu";c&&(c=Tb(c))&&(b=c.b);a=a.trim().split(/\s+/);for(var d,e,f=[],g=0,h=a.length;g<h;g++)e=a[g].split(/,+/),c=parseFloat(e[0]),d=parseFloat(e[1]),e=3===e.length?parseFloat(e[2]):0,"en"===b.substr(0,2)?f.push(c,d,e):f.push(d,c,e);return f};k.tp=function(a,b){a=N([null],this.Gj,a,b,this);return Xa(a[1][0],a[1][1],a[1][3],a[1][4])};k.am=function(a,b){(a=N(void 0,this.le,a,b,this))&&b[b.length-1].push(a)};
k.bp=function(a,b){(a=N(void 0,this.le,a,b,this))&&(b[b.length-1][0]=a)};k.ke={"http://www.opengis.net/gml":{coordinates:sl(an.prototype.$i)}};k.zf={"http://www.opengis.net/gml":{innerBoundaryIs:an.prototype.am,outerBoundaryIs:an.prototype.bp}};k.Gj={"http://www.opengis.net/gml":{coordinates:rl(an.prototype.$i)}};
k.Zg={"http://www.opengis.net/gml":{Point:sl(Fm.prototype.fj),MultiPoint:sl(Fm.prototype.dj),LineString:sl(Fm.prototype.hf),MultiLineString:sl(Fm.prototype.cj),LinearRing:sl(Fm.prototype.bj),Polygon:sl(Fm.prototype.jf),MultiPolygon:sl(Fm.prototype.ej),Box:sl(an.prototype.tp)}};
k.jg=function(a,b){var c=b[b.length-1];b=c.multiSurface;var d=c.surface,c=c.multiCurve;Array.isArray(a)?a="Envelope":(a=a.U(),"MultiPolygon"===a&&!0===b?a="MultiSurface":"Polygon"===a&&!0===d?a="Surface":"MultiLineString"===a&&!0===c&&(a="MultiCurve"));return jl("http://www.opengis.net/gml",a)};k.ai=function(a,b,c){var d=c[c.length-1],e=tb({},d);e.node=a;var f;Array.isArray(b)?d.dataProjection?f=hc(b,d.featureProjection,d.dataProjection):f=b:f=Hl(b,!0,d);Bl(e,bn,this.jg,[f],c,void 0,this)};
k.Pe=function(a,b,c){var d=c[c.length-1].srsName;"LineStringSegment"!==a.nodeName&&d&&a.setAttribute("srsName",d);"LineString"===a.nodeName||"LineStringSegment"===a.nodeName?(d=cn(a.namespaceURI),a.appendChild(d),dn(d,b,c)):"Curve"===a.nodeName&&(d=jl(a.namespaceURI,"segments"),a.appendChild(d),a=jl(d.namespaceURI,"LineStringSegment"),d.appendChild(a),this.Pe(a,b,c))};function cn(a){a=jl(a,"coordinates");a.setAttribute("decimal",".");a.setAttribute("cs",",");a.setAttribute("ts"," ");return a}
function dn(a,b,c){var d=c[c.length-1];c=d.hasZ;d=d.srsName;b=b.X();for(var e=b.length,f=Array(e),g,h=0;h<e;++h)g=b[h],f[h]=en(g,d,c);Pm(a,f.join(" "))}
k.Qe=function(a,b,c){var d=c[c.length-1],e=d.hasZ,d=d.srsName;"PolygonPatch"!==a.nodeName&&d&&a.setAttribute("srsName",d);"Polygon"===a.nodeName||"PolygonPatch"===a.nodeName?(b=b.Sd(),Bl({node:a,hasZ:e,srsName:d},fn,this.dn,b,c,void 0,this)):"Surface"===a.nodeName&&(e=jl(a.namespaceURI,"patches"),a.appendChild(e),a=jl(e.namespaceURI,"PolygonPatch"),e.appendChild(a),this.Qe(a,b,c))};
k.dn=function(a,b){a=b[b.length-1];b=a.node;var c=a.exteriorWritten;void 0===c&&(a.exteriorWritten=!0);return jl(b.namespaceURI,void 0!==c?"innerBoundaryIs":"outerBoundaryIs")};k.gi=function(a,b,c){var d=jl(a.namespaceURI,"LinearRing");a.appendChild(d);this.ci(d,b,c)};function en(a,b,c){var d="enu";b&&(d=Tb(b).b);b="en"===d.substr(0,2)?a[0]+","+a[1]:a[1]+","+a[0];c&&(b+=","+(a[2]||0));return b}
k.di=function(a,b,c){var d=c[c.length-1],e=d.hasZ,f=d.srsName,d=d.curve;f&&a.setAttribute("srsName",f);b=b.gd();Bl({node:a,hasZ:e,srsName:f,curve:d},gn,this.a,b,c,void 0,this)};k.fi=function(a,b,c){var d=c[c.length-1];c=d.hasZ;var e=d.srsName;e&&a.setAttribute("srsName",e);d=cn(a.namespaceURI);a.appendChild(d);a=b.X();a=en(a,e,c);Pm(d,a)};
k.fn=function(a,b,c){var d=c[c.length-1],e=d.hasZ;(d=d.srsName)&&a.setAttribute("srsName",d);b=b.Zd();Bl({node:a,hasZ:e,srsName:d},hn,wl("pointMember"),b,c,void 0,this)};k.gn=function(a,b,c){var d=jl(a.namespaceURI,"Point");a.appendChild(d);this.fi(d,b,c)};k.bi=function(a,b,c){var d=this.jg(b,c);d&&(a.appendChild(d),this.Pe(d,b,c))};k.ci=function(a,b,c){var d=c[c.length-1].srsName;d&&a.setAttribute("srsName",d);d=cn(a.namespaceURI);a.appendChild(d);dn(d,b,c)};
k.ei=function(a,b,c){var d=c[c.length-1],e=d.hasZ,f=d.srsName,d=d.surface;f&&a.setAttribute("srsName",f);b=b.Td();Bl({node:a,hasZ:e,srsName:f,surface:d},jn,this.a,b,c,void 0,this)};k.hi=function(a,b,c){var d=this.jg(b,c);d&&(a.appendChild(d),this.Qe(d,b,c))};k.en=function(a,b,c){var d=c[c.length-1].srsName;d&&a.setAttribute("srsName",d);Bl({node:a},kn,yl,[b[0]+" "+b[1],b[2]+" "+b[3]],c,["lowerCorner","upperCorner"],this)};
var bn={"http://www.opengis.net/gml":{Curve:J(an.prototype.Pe),MultiCurve:J(an.prototype.di),Point:J(an.prototype.fi),MultiPoint:J(an.prototype.fn),LineString:J(an.prototype.Pe),MultiLineString:J(an.prototype.di),LinearRing:J(an.prototype.ci),Polygon:J(an.prototype.Qe),MultiPolygon:J(an.prototype.ei),Surface:J(an.prototype.Qe),MultiSurface:J(an.prototype.ei),Envelope:J(an.prototype.en)}},fn={"http://www.opengis.net/gml":{outerBoundaryIs:J(an.prototype.gi),innerBoundaryIs:J(an.prototype.gi)}},hn={"http://www.opengis.net/gml":{pointMember:J(an.prototype.gn)}},
gn={"http://www.opengis.net/gml":{lineStringMember:J(an.prototype.bi),curveMember:J(an.prototype.bi)}};an.prototype.a=function(a,b){return jl("http://www.opengis.net/gml",ln[b[b.length-1].node.nodeName])};var ln={MultiLineString:"lineStringMember",MultiCurve:"curveMember",MultiPolygon:"polygonMember",MultiSurface:"surfaceMember"},jn={"http://www.opengis.net/gml":{surfaceMember:J(an.prototype.hi),polygonMember:J(an.prototype.hi)}},kn={"http://www.opengis.net/gml":{lowerCorner:J(Pm),upperCorner:J(Pm)}};function mn(a){a=a?a:{};Cm.call(this);this.defaultDataProjection=Tb("EPSG:4326");this.b=a.readExtensions}v(mn,Cm);var nn=[null,"http://www.topografix.com/GPX/1/0","http://www.topografix.com/GPX/1/1"];function on(a,b,c,d){a.push(parseFloat(c.getAttribute("lon")),parseFloat(c.getAttribute("lat")));"ele"in d?(a.push(d.ele),delete d.ele,b.hasZ=!0):a.push(0);"time"in d?(a.push(d.time),delete d.time,b.hasM=!0):a.push(0);return a}
function pn(a,b,c){var d="XY",e=2;a.hasZ&&a.hasM?(d="XYZM",e=4):a.hasZ?(d="XYZ",e=3):a.hasM&&(d="XYM",e=3);if(4!==e){var f;var g=0;for(f=b.length/4;g<f;g++)b[g*e]=b[4*g],b[g*e+1]=b[4*g+1],a.hasZ&&(b[g*e+2]=b[4*g+2]),a.hasM&&(b[g*e+2]=b[4*g+3]);b.length=b.length/4*e;if(c)for(g=0,f=c.length;g<f;g++)c[g]=c[g]/4*e}return d}function qn(a,b){var c=b[b.length-1],d=a.getAttribute("href");null!==d&&(c.link=d);Al(rn,a,b)}function sn(a,b){b[b.length-1].extensionsNode_=a}
function tn(a,b){var c=b[0];if(a=N({flatCoordinates:[],layoutOptions:{}},un,a,b)){b=a.flatCoordinates;delete a.flatCoordinates;var d=a.layoutOptions;delete a.layoutOptions;var d=pn(d,b),e=new O(null);e.ba(d,b);Hl(e,!1,c);c=new H(e);c.H(a);return c}}
function vn(a,b){var c=b[0];if(a=N({flatCoordinates:[],ends:[],layoutOptions:{}},wn,a,b)){b=a.flatCoordinates;delete a.flatCoordinates;var d=a.ends;delete a.ends;var e=a.layoutOptions;delete a.layoutOptions;var e=pn(e,b,d),f=new P(null);f.ba(e,b,d);Hl(f,!1,c);c=new H(f);c.H(a);return c}}function xn(a,b){var c=b[0];if(b=N({},yn,a,b)){var d={};a=on([],d,a,b);d=pn(d,a);a=new C(a,d);Hl(a,!1,c);c=new H(a);c.H(b);return c}}
var zn={rte:tn,trk:vn,wpt:xn},An=K(nn,{rte:rl(tn),trk:rl(vn),wpt:rl(xn)}),rn=K(nn,{text:I(S,"linkText"),type:I(S,"linkType")}),un=K(nn,{name:I(S),cmt:I(S),desc:I(S),src:I(S),link:qn,number:I(Mm),extensions:sn,type:I(S),rtept:function(a,b){var c=N({},Bn,a,b);c&&(b=b[b.length-1],on(b.flatCoordinates,b.layoutOptions,a,c))}}),Bn=K(nn,{ele:I(Km),time:I(Jm)}),wn=K(nn,{name:I(S),cmt:I(S),desc:I(S),src:I(S),link:qn,number:I(Mm),type:I(S),extensions:sn,trkseg:function(a,b){var c=b[b.length-1];Al(Cn,a,b);c.ends.push(c.flatCoordinates.length)}}),
Cn=K(nn,{trkpt:function(a,b){var c=N({},Dn,a,b);c&&(b=b[b.length-1],on(b.flatCoordinates,b.layoutOptions,a,c))}}),Dn=K(nn,{ele:I(Km),time:I(Jm)}),yn=K(nn,{ele:I(Km),time:I(Jm),magvar:I(Km),geoidheight:I(Km),name:I(S),cmt:I(S),desc:I(S),src:I(S),link:qn,sym:I(S),type:I(S),fix:I(S),sat:I(Mm),hdop:I(Km),vdop:I(Km),pdop:I(Km),ageofdgpsdata:I(Km),dgpsid:I(Mm),extensions:sn});
function En(a,b){b||(b=[]);for(var c=0,d=b.length;c<d;++c){var e=b[c];if(a.b){var f=e.get("extensionsNode_")||null;a.b(e,f)}e.set("extensionsNode_",void 0)}}mn.prototype.xg=function(a,b){if(!ja(nn,a.namespaceURI))return null;var c=zn[a.localName];if(!c)return null;a=c(a,[Fl(this,a,b)]);if(!a)return null;En(this,[a]);return a};mn.prototype.zc=function(a,b){return ja(nn,a.namespaceURI)?"gpx"==a.localName&&(a=N([],An,a,[Fl(this,a,b)]))?(En(this,a),a):[]:[]};
function Fn(a,b,c){a.setAttribute("href",b);b=c[c.length-1].properties;Bl({node:a},Gn,yl,[b.linkText,b.linkType],c,Hn)}function In(a,b,c){var d=c[c.length-1],e=d.node.namespaceURI,f=d.properties;a.setAttributeNS(null,"lat",b[1]);a.setAttributeNS(null,"lon",b[0]);switch(d.geometryLayout){case "XYZM":b[3]&&(f.time=b[3]);case "XYZ":b[2]&&(f.ele=b[2]);break;case "XYM":b[2]&&(f.time=b[2])}b="rtept"==a.nodeName?Jn[e]:Kn[e];d=zl(f,b);Bl({node:a,properties:f},Ln,yl,d,c,b)}
var Hn=["text","type"],Gn=K(nn,{text:J(Pm),type:J(Pm)}),Mn=K(nn,"name cmt desc src link number type rtept".split(" ")),Nn=K(nn,{name:J(Pm),cmt:J(Pm),desc:J(Pm),src:J(Pm),link:J(Fn),number:J(Rm),type:J(Pm),rtept:vl(J(In))}),Jn=K(nn,["ele","time"]),On=K(nn,"name cmt desc src link number type trkseg".split(" ")),Rn=K(nn,{name:J(Pm),cmt:J(Pm),desc:J(Pm),src:J(Pm),link:J(Fn),number:J(Rm),type:J(Pm),trkseg:vl(J(function(a,b,c){Bl({node:a,geometryLayout:b.ja,properties:{}},Pn,Qn,b.X(),c)}))}),Qn=wl("trkpt"),
Pn=K(nn,{trkpt:J(In)}),Kn=K(nn,"ele time magvar geoidheight name cmt desc src link sym type fix sat hdop vdop pdop ageofdgpsdata dgpsid".split(" ")),Ln=K(nn,{ele:J(Qm),time:J(function(a,b){b=new Date(1E3*b);a.appendChild(il.createTextNode(b.getUTCFullYear()+"-"+Xe(b.getUTCMonth()+1)+"-"+Xe(b.getUTCDate())+"T"+Xe(b.getUTCHours())+":"+Xe(b.getUTCMinutes())+":"+Xe(b.getUTCSeconds())+"Z"))}),magvar:J(Qm),geoidheight:J(Qm),name:J(Pm),cmt:J(Pm),desc:J(Pm),src:J(Pm),link:J(Fn),sym:J(Pm),type:J(Pm),fix:J(Pm),
sat:J(Rm),hdop:J(Qm),vdop:J(Qm),pdop:J(Qm),ageofdgpsdata:J(Qm),dgpsid:J(Rm)}),Sn={Point:"wpt",LineString:"rte",MultiLineString:"trk"};function Tn(a,b){if(a=a.V())if(a=Sn[a.U()])return jl(b[b.length-1].node.namespaceURI,a)}
var Un=K(nn,{rte:J(function(a,b,c){var d=c[0],e=b.N();a={node:a,properties:e};if(b=b.V())b=Hl(b,!0,d),a.geometryLayout=b.ja,e.rtept=b.X();d=Mn[c[c.length-1].node.namespaceURI];e=zl(e,d);Bl(a,Nn,yl,e,c,d)}),trk:J(function(a,b,c){var d=c[0],e=b.N();a={node:a,properties:e};if(b=b.V())b=Hl(b,!0,d),e.trkseg=b.gd();d=On[c[c.length-1].node.namespaceURI];e=zl(e,d);Bl(a,Rn,yl,e,c,d)}),wpt:J(function(a,b,c){var d=c[0],e=c[c.length-1];e.properties=b.N();if(b=b.V())b=Hl(b,!0,d),e.geometryLayout=b.ja,In(a,b.X(),
c)})});mn.prototype.Xb=function(a,b){b=Gl(this,b);var c=jl("http://www.topografix.com/GPX/1/1","gpx");c.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xsi","http://www.w3.org/2001/XMLSchema-instance");c.setAttributeNS("http://www.w3.org/2001/XMLSchema-instance","xsi:schemaLocation","http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd");c.setAttribute("version","1.1");c.setAttribute("creator","OpenLayers");Bl({node:c},Un,Tn,a,[b]);return c};function Vn(){El.call(this)}v(Vn,El);function Wn(a){return"string"===typeof a?a:""}k=Vn.prototype;k.U=function(){return"text"};k.Tb=function(a,b){return this.ae(Wn(a),Gl(this,b))};k.Oa=function(a,b){return this.zg(Wn(a),Gl(this,b))};k.Sc=function(a,b){return this.wd(Wn(a),Gl(this,b))};k.kb=function(){return this.defaultDataProjection};k.Bd=function(a,b){return this.ge(a,Gl(this,b))};k.Wb=function(a,b){return this.Wg(a,Gl(this,b))};k.$c=function(a,b){return this.Cd(a,Gl(this,b))};function Xn(a){a=a?a:{};El.call(this);this.defaultDataProjection=Tb("EPSG:4326");this.b=a.altitudeMode?a.altitudeMode:"none"}v(Xn,Vn);var Yn=/^B(\d{2})(\d{2})(\d{2})(\d{2})(\d{5})([NS])(\d{3})(\d{5})([EW])([AV])(\d{5})(\d{5})/,Zn=/^H.([A-Z]{3}).*?:(.*)/,$n=/^HFDTE(\d{2})(\d{2})(\d{2})/,ao=/\r\n|\r|\n/;k=Xn.prototype;
k.ae=function(a,b){var c=this.b,d=a.split(ao);a={};var e=[],f=2E3,g=0,h=1,l=-1,m;var n=0;for(m=d.length;n<m;++n){var p=d[n],q;if("B"==p.charAt(0)){if(q=Yn.exec(p)){var p=parseInt(q[1],10),r=parseInt(q[2],10),u=parseInt(q[3],10),x=parseInt(q[4],10)+parseInt(q[5],10)/6E4;"S"==q[6]&&(x=-x);var B=parseInt(q[7],10)+parseInt(q[8],10)/6E4;"W"==q[9]&&(B=-B);e.push(B,x);"none"!=c&&e.push("gps"==c?parseInt(q[11],10):"barometric"==c?parseInt(q[12],10):0);q=Date.UTC(f,g,h,p,r,u);q<l&&(q=Date.UTC(f,g,h+1,p,r,
u));e.push(q/1E3);l=q}}else"H"==p.charAt(0)&&((q=$n.exec(p))?(h=parseInt(q[1],10),g=parseInt(q[2],10)-1,f=2E3+parseInt(q[3],10)):(q=Zn.exec(p))&&(a[q[1]]=q[2].trim()))}if(!e.length)return null;d=new O(null);d.ba("none"==c?"XYM":"XYZM",e);b=new H(Hl(d,!1,b));b.H(a);return b};k.zg=function(a,b){return(a=this.ae(a,b))?[a]:[]};k.ge=function(){};k.Wg=function(){};k.Cd=function(){};k.wd=function(){};function bo(a,b,c,d,e,f){Qc.call(this);this.j=null;this.M=a?a:new Image;null!==d&&(this.M.crossOrigin=d);this.c=f?document.createElement("CANVAS"):null;this.g=f;this.f=null;this.i=e;this.a=c;this.o=b;this.l=!1;2==this.i&&co(this)}v(bo,Qc);function co(a){var b=jd(1,1);try{b.drawImage(a.M,0,0),b.getImageData(0,0,1,1)}catch(c){a.l=!0}}bo.prototype.v=function(){this.i=3;this.f.forEach(Ec);this.f=null;this.b("change")};
bo.prototype.u=function(){this.i=2;this.a&&(this.M.width=this.a[0],this.M.height=this.a[1]);this.a=[this.M.width,this.M.height];this.f.forEach(Ec);this.f=null;co(this);if(!this.l&&null!==this.g){this.c.width=this.M.width;this.c.height=this.M.height;var a=this.c.getContext("2d");a.drawImage(this.M,0,0);for(var b=a.getImageData(0,0,this.M.width,this.M.height),c=b.data,d=this.g[0]/255,e=this.g[1]/255,f=this.g[2]/255,g=0,h=c.length;g<h;g+=4)c[g]*=d,c[g+1]*=e,c[g+2]*=f;a.putImageData(b,0,0)}this.b("change")};
bo.prototype.Y=function(){return this.c?this.c:this.M};bo.prototype.load=function(){if(0==this.i){this.i=1;this.f=[Jc(this.M,"error",this.v,this),Jc(this.M,"load",this.u,this)];try{this.M.src=this.o}catch(a){this.v()}}};function eo(a){a=a||{};this.o=void 0!==a.anchor?a.anchor:[.5,.5];this.u=null;this.i=void 0!==a.anchorOrigin?a.anchorOrigin:"top-left";this.C=void 0!==a.anchorXUnits?a.anchorXUnits:"fraction";this.B=void 0!==a.anchorYUnits?a.anchorYUnits:"fraction";this.ra=void 0!==a.crossOrigin?a.crossOrigin:null;var b=void 0!==a.img?a.img:null,c=void 0!==a.imgSize?a.imgSize:null,d=a.src;xa(!(void 0!==d&&b),4);xa(!b||b&&c,5);void 0!==d&&d.length||!b||(d=b.src||w(b).toString());xa(void 0!==d&&0<d.length,6);var e=void 0!==
a.src?0:2;this.j=void 0!==a.color?ed(a.color):null;var f=this.ra,g=this.j,h=zh.get(d,f,g);h||(h=new bo(b,d,c,f,e,g),zh.set(d,f,g,h));this.b=h;this.oa=void 0!==a.offset?a.offset:[0,0];this.c=void 0!==a.offsetOrigin?a.offsetOrigin:"top-left";this.S=null;this.D=void 0!==a.size?a.size:null;Xk.call(this,{opacity:void 0!==a.opacity?a.opacity:1,rotation:void 0!==a.rotation?a.rotation:0,scale:void 0!==a.scale?a.scale:1,snapToPixel:void 0!==a.snapToPixel?a.snapToPixel:!0,rotateWithView:void 0!==a.rotateWithView?
a.rotateWithView:!1})}v(eo,Xk);k=eo.prototype;
k.clone=function(){var a=this.Y(1);if(2===this.b.i)if("IMG"===a.tagName.toUpperCase())var b=a.cloneNode(!0);else{b=document.createElement("canvas");var c=b.getContext("2d");b.width=a.width;b.height=a.height;c.drawImage(a,0,0)}return new eo({anchor:this.o.slice(),anchorOrigin:this.i,anchorXUnits:this.C,anchorYUnits:this.B,crossOrigin:this.ra,color:this.j&&this.j.slice?this.j.slice():this.j||void 0,img:b?b:void 0,imgSize:b?this.b.a.slice():void 0,src:b?void 0:this.b.o,offset:this.oa.slice(),offsetOrigin:this.c,
size:null!==this.D?this.D.slice():void 0,opacity:this.f,scale:this.a,snapToPixel:this.v,rotation:this.g,rotateWithView:this.l})};
k.Hc=function(){if(this.u)return this.u;var a=this.o,b=this.ic();if("fraction"==this.C||"fraction"==this.B){if(!b)return null;a=this.o.slice();"fraction"==this.C&&(a[0]*=b[0]);"fraction"==this.B&&(a[1]*=b[1])}if("top-left"!=this.i){if(!b)return null;a===this.o&&(a=this.o.slice());if("top-right"==this.i||"bottom-right"==this.i)a[0]=-a[0]+b[0];if("bottom-left"==this.i||"bottom-right"==this.i)a[1]=-a[1]+b[1]}return this.u=a};k.Lo=function(){return this.j};k.Y=function(a){return this.b.Y(a)};k.ye=function(){return this.b.a};
k.Ye=function(){return this.b.i};k.qg=function(){var a=this.b;if(!a.j)if(a.l){var b=a.a[0],c=a.a[1],d=jd(b,c);d.fillRect(0,0,b,c);a.j=d.canvas}else a.j=a.M;return a.j};k.Oc=function(){if(this.S)return this.S;var a=this.oa;if("top-left"!=this.c){var b=this.ic(),c=this.b.a;if(!b||!c)return null;a=a.slice();if("top-right"==this.c||"bottom-right"==this.c)a[0]=c[0]-b[0]-a[0];if("bottom-left"==this.c||"bottom-right"==this.c)a[1]=c[1]-b[1]-a[1]}return this.S=a};k.Mo=function(){return this.b.o};
k.ic=function(){return this.D?this.D:this.b.a};k.Nh=function(a,b){return y(this.b,"change",a,b)};k.load=function(){this.b.load()};k.Bj=function(a,b){Kc(this.b,"change",a,b)};function fo(a){a=a||{};this.a=a.font;this.f=a.rotation;this.o=a.rotateWithView;this.b=a.scale;this.Ia=a.text;this.g=a.textAlign;this.j=a.textBaseline;this.Va=void 0!==a.fill?a.fill:new al({color:"#333"});this.Ya=void 0!==a.stroke?a.stroke:null;this.i=void 0!==a.offsetX?a.offsetX:0;this.c=void 0!==a.offsetY?a.offsetY:0}k=fo.prototype;
k.clone=function(){return new fo({font:this.a,rotation:this.f,rotateWithView:this.o,scale:this.b,text:this.Na(),textAlign:this.g,textBaseline:this.j,fill:this.Fa()?this.Fa().clone():void 0,stroke:this.Ga()?this.Ga().clone():void 0,offsetX:this.i,offsetY:this.c})};k.Nk=function(){return this.a};k.cl=function(){return this.i};k.dl=function(){return this.c};k.Fa=function(){return this.Va};k.Ro=function(){return this.o};k.So=function(){return this.f};k.To=function(){return this.b};k.Ga=function(){return this.Ya};
k.Na=function(){return this.Ia};k.nl=function(){return this.g};k.ol=function(){return this.j};k.nj=function(a){this.a=a};k.sj=function(a){this.i=a};k.tj=function(a){this.c=a};k.pf=function(a){this.Va=a};k.Uo=function(a){this.f=a};k.Si=function(a){this.b=a};k.qf=function(a){this.Ya=a};k.xd=function(a){this.Ia=a};k.vj=function(a){this.g=a};k.hq=function(a){this.j=a};function go(a){a=a?a:{};Cm.call(this);ho||(io=[255,255,255,1],jo=new al({color:io}),ko=[20,2],lo=mo="pixels",no=[64,64],oo="https://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png",po=.5,qo=new eo({anchor:ko,anchorOrigin:"bottom-left",anchorXUnits:mo,anchorYUnits:lo,crossOrigin:"anonymous",rotation:0,scale:po,size:no,src:oo}),ro="NO_IMAGE",so=new wj({color:io,width:1}),to=new wj({color:[51,51,51,1],width:2}),uo=new fo({font:"bold 16px Helvetica",fill:jo,stroke:to,scale:.8}),vo=new bl({fill:jo,
image:qo,text:uo,stroke:so,zIndex:0}),ho=[vo]);this.defaultDataProjection=Tb("EPSG:4326");this.a=a.defaultStyle?a.defaultStyle:ho;this.c=void 0!==a.extractStyles?a.extractStyles:!0;this.j=void 0!==a.writeStyles?a.writeStyles:!0;this.b={};this.g=void 0!==a.showPointNames?a.showPointNames:!0}var ho,io,jo,ko,mo,lo,no,oo,po,qo,ro,so,to,uo,vo;v(go,Cm);
var wo=["http://www.google.com/kml/ext/2.2"],xo=[null,"http://earth.google.com/kml/2.0","http://earth.google.com/kml/2.1","http://earth.google.com/kml/2.2","http://www.opengis.net/kml/2.2"],yo={fraction:"fraction",pixels:"pixels",insetPixels:"pixels"};
function zo(a,b){var c=[0,0],d="start";if(a.Y()){var e=a.Y().ye();null===e&&(e=no);2==e.length&&(d=a.Y().a,c[0]=d*e[0]/2,c[1]=-d*e[1]/2,d="left")}null!==a.Na()?(e=a.Na(),a=e.clone(),a.nj(e.a||uo.a),a.Si(e.b||uo.b),a.pf(e.Fa()||uo.Fa()),a.qf(e.Ga()||to)):a=uo.clone();a.xd(b);a.sj(c[0]);a.tj(c[1]);a.vj(d);return new bl({text:a})}
function Ao(a,b,c,d,e){return function(){var f=e,g="";f&&this.V()&&(f="Point"===this.V().U());f&&(g=this.get("name"),f=f&&g);if(a)return f?(f=zo(a[0],g),a.concat(f)):a;if(b){var h=Bo(b,c,d);return f?(f=zo(h[0],g),h.concat(f)):h}return f?(f=zo(c[0],g),c.concat(f)):c}}function Bo(a,b,c){return Array.isArray(a)?a:"string"===typeof a?(!(a in c)&&"#"+a in c&&(a="#"+a),Bo(c[a],b,c)):b}
function Co(a){a=kl(a,!1);if(a=/^\s*#?\s*([0-9A-Fa-f]{8})\s*$/.exec(a))return a=a[1],[parseInt(a.substr(6,2),16),parseInt(a.substr(4,2),16),parseInt(a.substr(2,2),16),parseInt(a.substr(0,2),16)/255]}function Do(a){a=kl(a,!1);for(var b=[],c=/^\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)\s*,\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)(?:\s*,\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?))?\s*/i,d;d=c.exec(a);)b.push(parseFloat(d[1]),parseFloat(d[2]),d[3]?parseFloat(d[3]):0),a=a.substr(d[0].length);if(""===a)return b}
function Eo(a){var b=kl(a,!1).trim();return a.baseURI&&"about:blank"!==a.baseURI?(new URL(b,a.baseURI)).href:b}function Fo(a){return Km(a)}function Go(a,b){return N(null,Ho,a,b)}function Io(a,b){if(b=N({A:[],Ej:[]},Jo,a,b)){a=b.A;b=b.Ej;var c;var d=0;for(c=Math.min(a.length,b.length);d<c;++d)a[4*d+3]=b[d];b=new O(null);b.ba("XYZM",a);return b}}function Ko(a,b){var c=N({},Lo,a,b);if(a=N(null,Mo,a,b))return b=new O(null),b.ba("XYZ",a),b.H(c),b}
function No(a,b){var c=N({},Lo,a,b);if(a=N(null,Mo,a,b))return b=new D(null),b.ba("XYZ",a,[a.length]),b.H(c),b}
function Oo(a,b){a=N([],Po,a,b);if(!a)return null;if(!a.length)return new tm(a);var c=!0,d=a[0].U(),e;var f=1;for(e=a.length;f<e;++f)if(b=a[f],b.U()!=d){c=!1;break}if(c)if("Point"==d){var g=a[0];c=g.ja;d=g.ga();f=1;for(e=a.length;f<e;++f)b=a[f],la(d,b.ga());g=new Q(null);g.ba(c,d);Qo(g,a)}else"LineString"==d?(g=new P(null),Nl(g,a),Qo(g,a)):"Polygon"==d?(g=new R(null),Pl(g,a),Qo(g,a)):"GeometryCollection"==d?g=new tm(a):xa(!1,37);else g=new tm(a);return g}
function Ro(a,b){var c=N({},Lo,a,b);if(a=N(null,Mo,a,b))return b=new C(null),b.ba("XYZ",a),b.H(c),b}function So(a,b){var c=N({},Lo,a,b);if((a=N([null],To,a,b))&&a[0]){b=new D(null);var d=a[0],e=[d.length],f;var g=1;for(f=a.length;g<f;++g)la(d,a[g]),e.push(d.length);b.ba("XYZ",d,e);b.H(c);return b}}
function Uo(a,b){b=N({},Vo,a,b);if(!b)return null;a="fillStyle"in b?b.fillStyle:jo;var c=b.fill;void 0===c||c||(a=null);c="imageStyle"in b?b.imageStyle:qo;c==ro&&(c=void 0);var d="textStyle"in b?b.textStyle:uo,e="strokeStyle"in b?b.strokeStyle:so;b=b.outline;void 0===b||b||(e=null);return[new bl({fill:a,image:c,stroke:e,text:d,zIndex:void 0})]}
function Qo(a,b){var c=b.length,d=Array(b.length),e=Array(b.length),f,g;var h=g=!1;for(f=0;f<c;++f){var l=b[f];d[f]=l.get("extrude");e[f]=l.get("altitudeMode");h=h||void 0!==d[f];g=g||e[f]}h&&a.set("extrude",d);g&&a.set("altitudeMode",e)}function Wo(a,b){Al(Xo,a,b)}function Yo(a,b){Al(Zo,a,b)}
var $o=K(xo,{displayName:I(S),value:I(S)}),Xo=K(xo,{Data:function(a,b){var c=a.getAttribute("name");Al($o,a,b);a=b[b.length-1];null!==c?a[c]=a.value:null!==a.displayName&&(a[a.displayName]=a.value)},SchemaData:function(a,b){Al(ap,a,b)}}),Zo=K(xo,{LatLonAltBox:function(a,b){if(a=N({},bp,a,b))b=b[b.length-1],b.extent=[parseFloat(a.west),parseFloat(a.south),parseFloat(a.east),parseFloat(a.north)],b.altitudeMode=a.altitudeMode,b.minAltitude=parseFloat(a.minAltitude),b.maxAltitude=parseFloat(a.maxAltitude)},
Lod:function(a,b){if(a=N({},cp,a,b))b=b[b.length-1],b.minLodPixels=parseFloat(a.minLodPixels),b.maxLodPixels=parseFloat(a.maxLodPixels),b.minFadeExtent=parseFloat(a.minFadeExtent),b.maxFadeExtent=parseFloat(a.maxFadeExtent)}}),bp=K(xo,{altitudeMode:I(S),minAltitude:I(Km),maxAltitude:I(Km),north:I(Km),south:I(Km),east:I(Km),west:I(Km)}),cp=K(xo,{minLodPixels:I(Km),maxLodPixels:I(Km),minFadeExtent:I(Km),maxFadeExtent:I(Km)}),Lo=K(xo,{extrude:I(Hm),altitudeMode:I(S)}),Ho=K(xo,{coordinates:sl(Do)}),To=
K(xo,{innerBoundaryIs:function(a,b){(a=N(void 0,dp,a,b))&&b[b.length-1].push(a)},outerBoundaryIs:function(a,b){(a=N(void 0,ep,a,b))&&(b[b.length-1][0]=a)}}),Jo=K(xo,{when:function(a,b){b=b[b.length-1].Ej;a=kl(a,!1);a=Date.parse(a);b.push(isNaN(a)?0:a)}},K(wo,{coord:function(a,b){b=b[b.length-1].A;a=kl(a,!1);(a=/^\s*([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s+([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s+([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s*$/i.exec(a))?b.push(parseFloat(a[1]),parseFloat(a[2]),parseFloat(a[3]),
0):b.push(0,0,0,0)}})),Mo=K(xo,{coordinates:sl(Do)}),fp=K(xo,{href:I(Eo)},K(wo,{x:I(Km),y:I(Km),w:I(Km),h:I(Km)})),gp=K(xo,{Icon:I(function(a,b){return(a=N({},fp,a,b))?a:null}),heading:I(Km),hotSpot:I(function(a){var b=a.getAttribute("xunits"),c=a.getAttribute("yunits");var d="insetPixels"!==b?"insetPixels"!==c?"bottom-left":"top-left":"insetPixels"!==c?"bottom-right":"top-right";return{x:parseFloat(a.getAttribute("x")),Xg:yo[b],y:parseFloat(a.getAttribute("y")),Yg:yo[c],origin:d}}),scale:I(Fo)}),
dp=K(xo,{LinearRing:sl(Go)}),hp=K(xo,{color:I(Co),scale:I(Fo)}),ip=K(xo,{color:I(Co),width:I(Km)}),Po=K(xo,{LineString:rl(Ko),LinearRing:rl(No),MultiGeometry:rl(Oo),Point:rl(Ro),Polygon:rl(So)}),jp=K(wo,{Track:rl(Io)}),lp=K(xo,{ExtendedData:Wo,Region:Yo,Link:function(a,b){Al(kp,a,b)},address:I(S),description:I(S),name:I(S),open:I(Hm),phoneNumber:I(S),visibility:I(Hm)}),kp=K(xo,{href:I(Eo)}),ep=K(xo,{LinearRing:sl(Go)}),mp=K(xo,{Style:I(Uo),key:I(S),styleUrl:I(Eo)}),op=K(xo,{ExtendedData:Wo,Region:Yo,
MultiGeometry:I(Oo,"geometry"),LineString:I(Ko,"geometry"),LinearRing:I(No,"geometry"),Point:I(Ro,"geometry"),Polygon:I(So,"geometry"),Style:I(Uo),StyleMap:function(a,b){if(a=N(void 0,np,a,b))b=b[b.length-1],Array.isArray(a)?b.Style=a:"string"===typeof a?b.styleUrl=a:xa(!1,38)},address:I(S),description:I(S),name:I(S),open:I(Hm),phoneNumber:I(S),styleUrl:I(Eo),visibility:I(Hm)},K(wo,{MultiTrack:I(function(a,b){if(a=N([],jp,a,b))return b=new P(null),Nl(b,a),b},"geometry"),Track:I(Io,"geometry")})),
pp=K(xo,{color:I(Co),fill:I(Hm),outline:I(Hm)}),ap=K(xo,{SimpleData:function(a,b){var c=a.getAttribute("name");null!==c&&(a=S(a),b[b.length-1][c]=a)}}),Vo=K(xo,{IconStyle:function(a,b){if(a=N({},gp,a,b)){b=b[b.length-1];var c="Icon"in a?a.Icon:{},d=!("Icon"in a)||0<Object.keys(c).length,e,f=c.href;f?e=f:d&&(e=oo);var f="bottom-left",g=a.hotSpot;if(g){var h=[g.x,g.y];var l=g.Xg;var m=g.Yg;f=g.origin}else e===oo?(h=ko,l=mo,m=lo):/^http:\/\/maps\.(?:google|gstatic)\.com\//.test(e)&&(h=[.5,0],m=l="fraction");
var n,g=c.x,p=c.y;void 0!==g&&void 0!==p&&(n=[g,p]);var q,g=c.w,c=c.h;void 0!==g&&void 0!==c&&(q=[g,c]);var r,c=a.heading;void 0!==c&&(r=Ha(c));a=a.scale;d?(e==oo&&(q=no,void 0===a&&(a=po)),e=new eo({anchor:h,anchorOrigin:f,anchorXUnits:l,anchorYUnits:m,crossOrigin:"anonymous",offset:n,offsetOrigin:"bottom-left",rotation:r,scale:a,size:q,src:e}),b.imageStyle=e):b.imageStyle=ro}},LabelStyle:function(a,b){(a=N({},hp,a,b))&&(b[b.length-1].textStyle=new fo({fill:new al({color:"color"in a?a.color:io}),
scale:a.scale}))},LineStyle:function(a,b){(a=N({},ip,a,b))&&(b[b.length-1].strokeStyle=new wj({color:"color"in a?a.color:io,width:"width"in a?a.width:1}))},PolyStyle:function(a,b){if(a=N({},pp,a,b)){b=b[b.length-1];b.fillStyle=new al({color:"color"in a?a.color:io});var c=a.fill;void 0!==c&&(b.fill=c);a=a.outline;void 0!==a&&(b.outline=a)}}}),np=K(xo,{Pair:function(a,b){if(a=N({},mp,a,b)){var c=a.key;c&&"normal"==c&&((c=a.styleUrl)&&(b[b.length-1]=c),(a=a.Style)&&(b[b.length-1]=a))}}});k=go.prototype;
k.vg=function(a,b){var c=K(xo,{Document:ql(this.vg,this),Folder:ql(this.vg,this),Placemark:rl(this.Dg,this),Style:this.Jp.bind(this),StyleMap:this.Ip.bind(this)});if(a=N([],c,a,b,this))return a};k.Dg=function(a,b){var c=N({geometry:null},op,a,b);if(c){var d=new H;a=a.getAttribute("id");null!==a&&d.jc(a);b=b[0];(a=c.geometry)&&Hl(a,!1,b);d.Ra(a);delete c.geometry;this.c&&d.hg(Ao(c.Style,c.styleUrl,this.a,this.b,this.g));delete c.Style;d.H(c);return d}};
k.Jp=function(a,b){var c=a.getAttribute("id");null!==c&&(b=Uo(a,b))&&(a=a.baseURI&&"about:blank"!==a.baseURI?(new URL("#"+c,a.baseURI)).href:"#"+c,this.b[a]=b)};k.Ip=function(a,b){var c=a.getAttribute("id");null!==c&&(b=N(void 0,np,a,b))&&(a=a.baseURI&&"about:blank"!==a.baseURI?(new URL("#"+c,a.baseURI)).href:"#"+c,this.b[a]=b)};k.xg=function(a,b){return ja(xo,a.namespaceURI)?(a=this.Dg(a,[Fl(this,a,b)]))?a:null:null};
k.zc=function(a,b){if(!ja(xo,a.namespaceURI))return[];var c=a.localName;if("Document"==c||"Folder"==c)return(c=this.vg(a,[Fl(this,a,b)]))?c:[];if("Placemark"==c)return(b=this.Dg(a,[Fl(this,a,b)]))?[b]:[];if("kml"==c){c=[];for(a=a.firstElementChild;a;a=a.nextElementSibling){var d=this.zc(a,b);d&&la(c,d)}return c}return[]};k.Cp=function(a){if(ml(a))return qp(this,a);if(nl(a))return rp(this,a);if("string"===typeof a)return a=pl(a),qp(this,a)};
function qp(a,b){for(b=b.firstChild;b;b=b.nextSibling)if(b.nodeType==Node.ELEMENT_NODE){var c=rp(a,b);if(c)return c}}function rp(a,b){var c;for(c=b.firstElementChild;c;c=c.nextElementSibling)if(ja(xo,c.namespaceURI)&&"name"==c.localName)return S(c);for(c=b.firstElementChild;c;c=c.nextElementSibling)if(b=c.localName,ja(xo,c.namespaceURI)&&("Document"==b||"Folder"==b||"Placemark"==b||"kml"==b)&&(b=rp(a,c)))return b}
k.Dp=function(a){var b=[];ml(a)?la(b,sp(this,a)):nl(a)?la(b,tp(this,a)):"string"===typeof a&&(a=pl(a),la(b,sp(this,a)));return b};function sp(a,b){var c=[];for(b=b.firstChild;b;b=b.nextSibling)b.nodeType==Node.ELEMENT_NODE&&la(c,tp(a,b));return c}
function tp(a,b){var c,d=[];for(c=b.firstElementChild;c;c=c.nextElementSibling)if(ja(xo,c.namespaceURI)&&"NetworkLink"==c.localName){var e=N({},lp,c,[]);d.push(e)}for(c=b.firstElementChild;c;c=c.nextElementSibling)b=c.localName,!ja(xo,c.namespaceURI)||"Document"!=b&&"Folder"!=b&&"kml"!=b||la(d,tp(a,c));return d}k.Gp=function(a){var b=[];ml(a)?la(b,up(this,a)):nl(a)?la(b,this.lf(a)):"string"===typeof a&&(a=pl(a),la(b,up(this,a)));return b};
function up(a,b){var c=[];for(b=b.firstChild;b;b=b.nextSibling)b.nodeType==Node.ELEMENT_NODE&&la(c,a.lf(b));return c}k.lf=function(a){var b,c=[];for(b=a.firstElementChild;b;b=b.nextElementSibling)if(ja(xo,b.namespaceURI)&&"Region"==b.localName){var d=N({},Zo,b,[]);c.push(d)}for(b=a.firstElementChild;b;b=b.nextElementSibling)a=b.localName,!ja(xo,b.namespaceURI)||"Document"!=a&&"Folder"!=a&&"kml"!=a||la(c,this.lf(b));return c};
function vp(a,b){b=ed(b);b=[255*(4==b.length?b[3]:1),b[2],b[1],b[0]];var c;for(c=0;4>c;++c){var d=parseInt(b[c],10).toString(16);b[c]=1==d.length?"0"+d:d}Pm(a,b.join(""))}function wp(a,b,c){a={node:a};var d=b.U();if("GeometryCollection"==d){var e=b.Vf();var f=xp}else"MultiPoint"==d?(e=b.Zd(),f=yp):"MultiLineString"==d?(e=b.gd(),f=zp):"MultiPolygon"==d?(e=b.Td(),f=Ap):xa(!1,39);Bl(a,Bp,f,e,c)}function Cp(a,b,c){Bl({node:a},Dp,Ep,[b],c)}
function Fp(a,b,c){var d={node:a};b.a&&a.setAttribute("id",b.a);a=b.N();var e={address:1,description:1,name:1,open:1,phoneNumber:1,styleUrl:1,visibility:1};e[b.c]=1;var f=Object.keys(a||{}).sort().filter(function(a){return!e[a]});if(0<f.length){var g=zl(a,f);Bl(d,Gp,Hp,[{names:f,values:g}],c)}if(f=b.Lc())if(f=f.call(b,0))f=Array.isArray(f)?f[0]:f,this.j&&(a.Style=f),(f=f.Na())&&(a.name=f.Na());f=Ip[c[c.length-1].node.namespaceURI];a=zl(a,f);Bl(d,Gp,yl,a,c,f);a=c[0];(b=b.V())&&(b=Hl(b,!0,a));Bl(d,
Gp,xp,[b],c)}function Jp(a,b,c){var d=b.ga();a={node:a};a.layout=b.ja;a.stride=b.qa();Bl(a,Kp,Lp,[d],c)}function Mp(a,b,c){b=b.Sd();var d=b.shift();a={node:a};Bl(a,Np,Op,b,c);Bl(a,Np,Pp,[d],c)}function Qp(a,b){Qm(a,Math.round(1E6*b)/1E6)}
var Rp=K(xo,["Document","Placemark"]),Up=K(xo,{Document:J(function(a,b,c){Bl({node:a},Sp,Tp,b,c,void 0,this)}),Placemark:J(Fp)}),Sp=K(xo,{Placemark:J(Fp)}),Vp=K(xo,{Data:J(function(a,b,c){a.setAttribute("name",b.name);a={node:a};b=b.value;"object"==typeof b?(null!==b&&b.displayName&&Bl(a,Vp,yl,[b.displayName],c,["displayName"]),null!==b&&b.value&&Bl(a,Vp,yl,[b.value],c,["value"])):Bl(a,Vp,yl,[b],c,["value"])}),value:J(function(a,b){Pm(a,b)}),displayName:J(function(a,b){a.appendChild(il.createCDATASection(b))})}),
Wp={Point:"Point",LineString:"LineString",LinearRing:"LinearRing",Polygon:"Polygon",MultiPoint:"MultiGeometry",MultiLineString:"MultiGeometry",MultiPolygon:"MultiGeometry",GeometryCollection:"MultiGeometry"},Xp=K(xo,["href"],K(wo,["x","y","w","h"])),Yp=K(xo,{href:J(Pm)},K(wo,{x:J(Qm),y:J(Qm),w:J(Qm),h:J(Qm)})),Zp=K(xo,["scale","heading","Icon","hotSpot"]),aq=K(xo,{Icon:J(function(a,b,c){a={node:a};var d=Xp[c[c.length-1].node.namespaceURI],e=zl(b,d);Bl(a,Yp,yl,e,c,d);d=Xp[wo[0]];e=zl(b,d);Bl(a,Yp,
$p,e,c,d)}),heading:J(Qm),hotSpot:J(function(a,b){a.setAttribute("x",b.x);a.setAttribute("y",b.y);a.setAttribute("xunits",b.Xg);a.setAttribute("yunits",b.Yg)}),scale:J(Qp)}),bq=K(xo,["color","scale"]),cq=K(xo,{color:J(vp),scale:J(Qp)}),dq=K(xo,["color","width"]),eq=K(xo,{color:J(vp),width:J(Qm)}),Dp=K(xo,{LinearRing:J(Jp)}),Bp=K(xo,{LineString:J(Jp),Point:J(Jp),Polygon:J(Mp),GeometryCollection:J(wp)}),Ip=K(xo,"name open visibility address phoneNumber description styleUrl Style".split(" ")),Gp=K(xo,
{ExtendedData:J(function(a,b,c){a={node:a};var d=b.names;b=b.values;for(var e=d.length,f=0;f<e;f++)Bl(a,Vp,fq,[{name:d[f],value:b[f]}],c)}),MultiGeometry:J(wp),LineString:J(Jp),LinearRing:J(Jp),Point:J(Jp),Polygon:J(Mp),Style:J(function(a,b,c){a={node:a};var d={},e=b.Fa(),f=b.Ga(),g=b.Y();b=b.Na();g instanceof eo&&(d.IconStyle=g);b&&(d.LabelStyle=b);f&&(d.LineStyle=f);e&&(d.PolyStyle=e);b=gq[c[c.length-1].node.namespaceURI];d=zl(d,b);Bl(a,hq,yl,d,c,b)}),address:J(Pm),description:J(Pm),name:J(Pm),
open:J(Om),phoneNumber:J(Pm),styleUrl:J(Pm),visibility:J(Om)}),Kp=K(xo,{coordinates:J(function(a,b,c){c=c[c.length-1];var d=c.layout;c=c.stride;var e;"XY"==d||"XYM"==d?e=2:"XYZ"==d||"XYZM"==d?e=3:xa(!1,34);var f,g=b.length,h="";if(0<g){h+=b[0];for(d=1;d<e;++d)h+=","+b[d];for(f=c;f<g;f+=c)for(h+=" "+b[f],d=1;d<e;++d)h+=","+b[f+d]}Pm(a,h)})}),Np=K(xo,{outerBoundaryIs:J(Cp),innerBoundaryIs:J(Cp)}),iq=K(xo,{color:J(vp)}),gq=K(xo,["IconStyle","LabelStyle","LineStyle","PolyStyle"]),hq=K(xo,{IconStyle:J(function(a,
b,c){a={node:a};var d={},e=b.ic(),f=b.ye(),g={href:b.b.o};if(e){g.w=e[0];g.h=e[1];var h=b.Hc(),l=b.Oc();l&&f&&l[0]&&l[1]!==e[1]&&(g.x=l[0],g.y=f[1]-(l[1]+e[1]));h&&h[0]&&h[1]!==e[1]&&(d.hotSpot={x:h[0],Xg:"pixels",y:e[1]-h[1],Yg:"pixels"})}d.Icon=g;e=b.a;1!==e&&(d.scale=e);(b=b.g)&&(d.heading=b);b=Zp[c[c.length-1].node.namespaceURI];d=zl(d,b);Bl(a,aq,yl,d,c,b)}),LabelStyle:J(function(a,b,c){a={node:a};var d={},e=b.Fa();e&&(d.color=e.b);(b=b.b)&&1!==b&&(d.scale=b);b=bq[c[c.length-1].node.namespaceURI];
d=zl(d,b);Bl(a,cq,yl,d,c,b)}),LineStyle:J(function(a,b,c){a={node:a};var d=dq[c[c.length-1].node.namespaceURI];b=zl({color:b.a,width:b.c},d);Bl(a,eq,yl,b,c,d)}),PolyStyle:J(function(a,b,c){Bl({node:a},iq,jq,[b.b],c)})});function $p(a,b,c){return jl(wo[0],"gx:"+c)}function Tp(a,b){return jl(b[b.length-1].node.namespaceURI,"Placemark")}function xp(a,b){if(a)return jl(b[b.length-1].node.namespaceURI,Wp[a.U()])}
var jq=wl("color"),Lp=wl("coordinates"),fq=wl("Data"),Hp=wl("ExtendedData"),Op=wl("innerBoundaryIs"),yp=wl("Point"),zp=wl("LineString"),Ep=wl("LinearRing"),Ap=wl("Polygon"),Pp=wl("outerBoundaryIs");
go.prototype.Xb=function(a,b){b=Gl(this,b);var c=jl(xo[4],"kml");c.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:gx",wo[0]);c.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xsi","http://www.w3.org/2001/XMLSchema-instance");c.setAttributeNS("http://www.w3.org/2001/XMLSchema-instance","xsi:schemaLocation","http://www.opengis.net/kml/2.2 https://developers.google.com/kml/schema/kml22gx.xsd");var d={node:c},e={};1<a.length?e.Document=a:1==a.length&&(e.Placemark=a[0]);a=Rp[c.namespaceURI];
e=zl(e,a);Bl(d,Up,yl,e,[b],a,this);return c};Fj.Dd=function(){};
(function(a){function b(a){this.lc=ArrayBuffer.isView&&ArrayBuffer.isView(a)?a:new Uint8Array(a||0);this.type=this.ea=0;this.length=this.lc.length}function c(a,b,c){var e=c.lc;var f=e[c.ea++];var g=(f&112)>>4;if(128>f)return d(a,g,b);f=e[c.ea++];g|=(f&127)<<3;if(128>f)return d(a,g,b);f=e[c.ea++];g|=(f&127)<<10;if(128>f)return d(a,g,b);f=e[c.ea++];g|=(f&127)<<17;if(128>f)return d(a,g,b);f=e[c.ea++];g|=(f&127)<<24;if(128>f)return d(a,g,b);f=e[c.ea++];if(128>f)return d(a,g|(f&1)<<31,b);throw Error("Expected varint not more than 10 bytes");
}function d(a,b,c){return c?4294967296*b+(a>>>0):4294967296*(b>>>0)+(a>>>0)}var e={read:function(a,b,c,d,e){var f=8*e-d-1;var g=(1<<f)-1,h=g>>1,l=-7;e=c?e-1:0;var m=c?-1:1,x=a[b+e];e+=m;c=x&(1<<-l)-1;x>>=-l;for(l+=f;0<l;c=256*c+a[b+e],e+=m,l-=8);f=c&(1<<-l)-1;c>>=-l;for(l+=d;0<l;f=256*f+a[b+e],e+=m,l-=8);if(0===c)c=1-h;else{if(c===g)return f?NaN:Infinity*(x?-1:1);f+=Math.pow(2,d);c-=h}return(x?-1:1)*f*Math.pow(2,c-d)},write:function(a,b,c,d,e,n){var f,g=8*n-e-1,h=(1<<g)-1,l=h>>1,m=23===e?Math.pow(2,
-24)-Math.pow(2,-77):0;n=d?0:n-1;var B=d?1:-1,E=0>b||0===b&&0>1/b?1:0;b=Math.abs(b);isNaN(b)||Infinity===b?(b=isNaN(b)?1:0,d=h):(d=Math.floor(Math.log(b)/Math.LN2),1>b*(f=Math.pow(2,-d))&&(d--,f*=2),b=1<=d+l?b+m/f:b+m*Math.pow(2,1-l),2<=b*f&&(d++,f/=2),d+l>=h?(b=0,d=h):1<=d+l?(b=(b*f-1)*Math.pow(2,e),d+=l):(b=b*Math.pow(2,l-1)*Math.pow(2,e),d=0));for(;8<=e;a[c+n]=b&255,n+=B,b/=256,e-=8);d=d<<e|b;for(g+=e;0<g;a[c+n]=d&255,n+=B,d/=256,g-=8);a[c+n-B]|=128*E}};b.c=0;b.i=1;b.b=2;b.a=5;b.prototype={Ag:function(a,
b,c){for(c=c||this.length;this.ea<c;){var d=this.Ka(),e=d>>3,f=this.ea;this.type=d&7;a(e,b,this);this.ea===f&&this.mq(d)}return b},yp:function(){var a=e.read(this.lc,this.ea,!0,23,4);this.ea+=4;return a},up:function(){var a=e.read(this.lc,this.ea,!0,52,8);this.ea+=8;return a},Ka:function(a){var b=this.lc;var d=b[this.ea++];var e=d&127;if(128>d)return e;d=b[this.ea++];e|=(d&127)<<7;if(128>d)return e;d=b[this.ea++];e|=(d&127)<<14;if(128>d)return e;d=b[this.ea++];e|=(d&127)<<21;if(128>d)return e;d=b[this.ea];
return c(e|(d&15)<<28,a,this)},Kp:function(){return this.Ka(!0)},ce:function(){var a=this.Ka();return 1===a%2?(a+1)/-2:a/2},sp:function(){return!!this.Ka()},Gg:function(){for(var a=this.Ka()+this.ea,b=this.lc,c="",d=this.ea;d<a;){var e=b[d],n=null,p=239<e?4:223<e?3:191<e?2:1;if(d+p>a)break;if(1===p)128>e&&(n=e);else if(2===p){var q=b[d+1];128===(q&192)&&(n=(e&31)<<6|q&63,127>=n&&(n=null))}else if(3===p){q=b[d+1];var r=b[d+2];128===(q&192)&&128===(r&192)&&(n=(e&15)<<12|(q&63)<<6|r&63,2047>=n||55296<=
n&&57343>=n)&&(n=null)}else if(4===p){q=b[d+1];r=b[d+2];var u=b[d+3];128===(q&192)&&128===(r&192)&&128===(u&192)&&(n=(e&15)<<18|(q&63)<<12|(r&63)<<6|u&63,65535>=n||1114112<=n)&&(n=null)}null===n?(n=65533,p=1):65535<n&&(n-=65536,c+=String.fromCharCode(n>>>10&1023|55296),n=56320|n&1023);c+=String.fromCharCode(n);d+=p}this.ea=a;return c},mq:function(a){a&=7;if(a===b.c)for(;127<this.lc[this.ea++];);else if(a===b.b)this.ea=this.Ka()+this.ea;else if(a===b.a)this.ea+=4;else if(a===b.i)this.ea+=8;else throw Error("Unimplemented type: "+
a);}};a["default"]=b})(Fj.Dd=Fj.Dd||{});Fj.Dd=Fj.Dd.default;Fj.xf={};Fj.xf.Bf=function(){};
(function(a){function b(a,b){this.layers=a.Ag(l,{},b)}function c(a,b){this.x=a;this.y=b}function d(a,b,c,d,f){this.properties={};this.extent=c;this.type=0;this.Cc=a;this.Ef=-1;this.ne=d;this.pe=f;a.Ag(e,this,b)}function e(a,b,c){if(1==a)b.id=c.Ka();else if(2==a)for(a=c.Ka()+c.ea;c.ea<a;){var d=b.ne[c.Ka()],e=b.pe[c.Ka()];b.properties[d]=e}else 3==a?b.type=c.Ka():4==a&&(b.Ef=c.ea)}function f(a,b){this.version=1;this.name=null;this.extent=4096;this.length=0;this.Cc=a;this.ne=[];this.pe=[];this.me=[];
a.Ag(g,this,b);this.length=this.me.length}function g(a,b,c){15===a?b.version=c.Ka():1===a?b.name=c.Gg():5===a?b.extent=c.Ka():2===a?b.me.push(c.ea):3===a?b.ne.push(c.Gg()):4===a&&b.pe.push(h(c))}function h(a){for(var b=null,c=a.Ka()+a.ea;a.ea<c;)b=a.Ka()>>3,b=1===b?a.Gg():2===b?a.yp():3===b?a.up():4===b?a.Kp():5===b?a.Ka():6===b?a.ce():7===b?a.sp():null;return b}function l(a,b,c){3===a&&(a=new m(c,c.Ka()+c.ea),a.length&&(b[a.name]=a))}c.prototype={clone:function(){return new c(this.x,this.y)},add:function(a){return this.clone().Yj(a)},
rotate:function(a){return this.clone().hk(a)},round:function(){return this.clone().ik()},angle:function(){return Math.atan2(this.y,this.x)},Yj:function(a){this.x+=a.x;this.y+=a.y;return this},hk:function(a){var b=Math.cos(a);a=Math.sin(a);var c=a*this.x+b*this.y;this.x=b*this.x-a*this.y;this.y=c;return this},ik:function(){this.x=Math.round(this.x);this.y=Math.round(this.y);return this}};c.Kq=function(a){return a instanceof c?a:Array.isArray(a)?new c(a[0],a[1]):a};d.b=["Unknown","Point","LineString",
"Polygon"];d.prototype.Oh=function(){var a=this.Cc;a.ea=this.Ef;for(var b=a.Ka()+a.ea,d=1,e=0,f=0,g=0,h=[],l;a.ea<b;)if(e||(e=a.Ka(),d=e&7,e>>=3),e--,1===d||2===d)f+=a.ce(),g+=a.ce(),1===d&&(l&&h.push(l),l=[]),l.push(new c(f,g));else if(7===d)l&&l.push(l[0].clone());else throw Error("unknown command "+d);l&&h.push(l);return h};d.prototype.bbox=function(){var a=this.Cc;a.ea=this.Ef;for(var b=a.Ka()+a.ea,c=1,d=0,e=0,f=0,g=Infinity,h=-Infinity,l=Infinity,m=-Infinity;a.ea<b;)if(d||(d=a.Ka(),c=d&7,d>>=
3),d--,1===c||2===c)e+=a.ce(),f+=a.ce(),e<g&&(g=e),e>h&&(h=e),f<l&&(l=f),f>m&&(m=f);else if(7!==c)throw Error("unknown command "+c);return[g,l,h,m]};var m=f;f.prototype.feature=function(a){if(0>a||a>=this.me.length)throw Error("feature index out of bounds");this.Cc.ea=this.me[a];a=this.Cc.Ka()+this.Cc.ea;return new d(this.Cc,a,this.extent,this.ne,this.pe)};var n=m;a["default"]={Bf:b,Wj:d,Xj:n};a.Bf=b;a.Wj=d;a.Xj=n})(Fj.xf=Fj.xf||{});function kq(a,b,c,d,e){this.g=e;this.i=a;this.b=b;this.f=c;this.c=d}k=kq.prototype;k.get=function(a){return this.c[a]};k.Bb=function(){return this.f};k.G=function(){this.a||(this.a="Point"===this.i?Za(this.b):$a(this.b,0,this.b.length,2));return this.a};k.Wn=function(){return this.g};k.ec=function(){return this.b};k.ga=kq.prototype.ec;k.V=function(){return this};k.Xn=function(){return this.c};k.Vd=kq.prototype.V;k.qa=function(){return 2};k.Lc=ua;k.U=function(){return this.i};function lq(a){El.call(this);a=a?a:{};this.defaultDataProjection=new Bb({code:"",units:"tile-pixels"});this.b=a.featureClass?a.featureClass:kq;this.a=a.geometryName;this.i=a.layerName?a.layerName:"layer";this.c=a.layers?a.layers:null}v(lq,El);k=lq.prototype;k.U=function(){return"arraybuffer"};
k.Oa=function(a,b){var c=this.c;a=new Fj.Dd(a);a=new Fj.xf.Bf(a);var d=[],e=this.b,f;for(f in a.layers)if(!c||-1!=c.indexOf(f)){var g=a.layers[f];for(var h=0,l=g.length;h<l;++h){if(e===kq){var m=void 0;var n=g.feature(h),p=f,q=n.Oh(),r=[],u=[];mq(q,u,r);var x=n.type;1===x?m=1===q.length?"Point":"MultiPoint":2===x?m=1===q.length?"LineString":"MultiLineString":3===x&&(m="Polygon");q=n.properties;q[this.i]=p;m=new this.b(m,u,r,q,n.id)}else{x=g.feature(h);u=f;r=b;m=new this.b;n=x.id;p=x.properties;p[this.i]=
u;this.a&&m.Tc(this.a);u=void 0;q=x.type;if(0===q)u=null;else{var x=x.Oh(),B=[],E=[];mq(x,E,B);1===q?u=1===x.length?new C(null):new Q(null):2===q?1===x.length?u=new O(null):u=new P(null):3===q&&(u=new D(null));u.ba("XY",E,B)}r=Hl(u,!1,Gl(this,r));m.Ra(r);m.jc(n);m.H(p)}d.push(m)}}return d};k.kb=function(){return this.defaultDataProjection};k.mn=function(a){this.c=a};
function mq(a,b,c){for(var d=0,e=0,f=a.length;e<f;++e){var g=a[e],h;var l=0;for(h=g.length;l<h;++l){var m=g[l];b.push(m.x,m.y)}d+=2*l;c.push(d)}}k.Tb=function(){};k.Sc=function(){};k.Bd=function(){};k.$c=function(){};k.Wb=function(){};function nq(){Cm.call(this);this.defaultDataProjection=Tb("EPSG:4326")}v(nq,Cm);function oq(a,b){b[b.length-1].fe[a.getAttribute("k")]=a.getAttribute("v")}
var pq=[null],qq=K(pq,{nd:function(a,b){b[b.length-1].md.push(a.getAttribute("ref"))},tag:oq}),sq=K(pq,{node:function(a,b){var c=b[0],d=b[b.length-1],e=a.getAttribute("id"),f=[parseFloat(a.getAttribute("lon")),parseFloat(a.getAttribute("lat"))];d.Sh[e]=f;a=N({fe:{}},rq,a,b);wb(a.fe)||(f=new C(f),Hl(f,!1,c),c=new H(f),c.jc(e),c.H(a.fe),d.features.push(c))},way:function(a,b){var c=b[0],d=a.getAttribute("id");a=N({md:[],fe:{}},qq,a,b);b=b[b.length-1];for(var e=[],f=0,g=a.md.length;f<g;f++)la(e,b.Sh[a.md[f]]);
a.md[0]==a.md[a.md.length-1]?(f=new D(null),f.ba("XY",e,[e.length])):(f=new O(null),f.ba("XY",e));Hl(f,!1,c);c=new H(f);c.jc(d);c.H(a.fe);b.features.push(c)}}),rq=K(pq,{tag:oq});nq.prototype.zc=function(a,b){b=Fl(this,a,b);return"osm"==a.localName&&(a=N({Sh:{},features:[]},sq,a,[b]),a.features)?a.features:[]};nq.prototype.Vg=function(){};nq.prototype.Xb=function(){};nq.prototype.ie=function(){};function tq(a){return a.getAttributeNS("http://www.w3.org/1999/xlink","href")};function uq(){}uq.prototype.read=function(a){return ml(a)?this.a(a):nl(a)?this.b(a):"string"===typeof a?(a=pl(a),this.a(a)):null};function vq(){}v(vq,uq);vq.prototype.a=function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType==Node.ELEMENT_NODE)return this.b(a);return null};vq.prototype.b=function(a){return(a=N({},wq,a,[]))?a:null};
var xq=[null,"http://www.opengis.net/ows/1.1"],wq=K(xq,{ServiceIdentification:I(function(a,b){return N({},yq,a,b)}),ServiceProvider:I(function(a,b){return N({},zq,a,b)}),OperationsMetadata:I(function(a,b){return N({},Aq,a,b)})}),Cq=K(xq,{DeliveryPoint:I(S),City:I(S),AdministrativeArea:I(S),PostalCode:I(S),Country:I(S),ElectronicMailAddress:I(S)}),Dq=K(xq,{Value:tl(function(a){return S(a)})}),Eq=K(xq,{AllowedValues:I(function(a,b){return N({},Dq,a,b)})}),Gq=K(xq,{Phone:I(function(a,b){return N({},
Fq,a,b)}),Address:I(function(a,b){return N({},Cq,a,b)})}),Iq=K(xq,{HTTP:I(function(a,b){return N({},Hq,a,b)})}),Hq=K(xq,{Get:tl(function(a,b){var c=tq(a);if(c)return N({href:c},Jq,a,b)}),Post:void 0}),Kq=K(xq,{DCP:I(function(a,b){return N({},Iq,a,b)})}),Aq=K(xq,{Operation:function(a,b){var c=a.getAttribute("name");(a=N({},Kq,a,b))&&(b[b.length-1][c]=a)}}),Fq=K(xq,{Voice:I(S),Facsimile:I(S)}),Jq=K(xq,{Constraint:tl(function(a,b){var c=a.getAttribute("name");if(c)return N({name:c},Eq,a,b)})}),Lq=K(xq,
{IndividualName:I(S),PositionName:I(S),ContactInfo:I(function(a,b){return N({},Gq,a,b)})}),yq=K(xq,{Title:I(S),ServiceTypeVersion:I(S),ServiceType:I(S)}),zq=K(xq,{ProviderName:I(S),ProviderSite:I(tq),ServiceContact:I(function(a,b){return N({},Lq,a,b)})});function Mq(a,b,c,d){var e;void 0!==d?e=d:e=[];for(var f=d=0;f<b;){var g=a[f++];e[d++]=a[f++];e[d++]=g;for(g=2;g<c;++g)e[d++]=a[f++]}e.length=d};function Nq(a){a=a?a:{};El.call(this);this.defaultDataProjection=Tb("EPSG:4326");this.b=a.factor?a.factor:1E5;this.a=a.geometryLayout?a.geometryLayout:"XY"}v(Nq,Vn);function Oq(a,b,c){var d,e=Array(b);for(d=0;d<b;++d)e[d]=0;var f;var g=0;for(f=a.length;g<f;)for(d=0;d<b;++d,++g){var h=a[g],l=h-e[d];e[d]=h;a[g]=l}return Pq(a,c?c:1E5)}function Qq(a,b,c){var d,e=Array(b);for(d=0;d<b;++d)e[d]=0;a=Rq(a,c?c:1E5);var f;c=0;for(f=a.length;c<f;)for(d=0;d<b;++d,++c)e[d]+=a[c],a[c]=e[d];return a}
function Pq(a,b){b=b?b:1E5;var c;var d=0;for(c=a.length;d<c;++d)a[d]=Math.round(a[d]*b);b=0;for(d=a.length;b<d;++b)c=a[b],a[b]=0>c?~(c<<1):c<<1;b="";d=0;for(c=a.length;d<c;++d){for(var e,f=a[d],g="";32<=f;)e=(32|f&31)+63,g+=String.fromCharCode(e),f>>=5;g+=String.fromCharCode(f+63);b+=g}return b}
function Rq(a,b){b=b?b:1E5;var c=[],d=0,e=0,f;var g=0;for(f=a.length;g<f;++g){var h=a.charCodeAt(g)-63,d=d|(h&31)<<e;32>h?(c.push(d),e=d=0):e+=5}a=0;for(d=c.length;a<d;++a)e=c[a],c[a]=e&1?~(e>>1):e>>1;a=0;for(d=c.length;a<d;++a)c[a]/=b;return c}k=Nq.prototype;k.ae=function(a,b){a=this.wd(a,b);return new H(a)};k.zg=function(a,b){return[this.ae(a,b)]};k.wd=function(a,b){var c=sf(this.a);a=Qq(a,c,this.b);Mq(a,a.length,c,a);c=Ff(a,0,a.length,c);return Hl(new O(c,this.a),!1,Gl(this,b))};
k.ge=function(a,b){if(a=a.V())return this.Cd(a,b);xa(!1,40);return""};k.Wg=function(a,b){return this.ge(a[0],b)};k.Cd=function(a,b){a=Hl(a,!0,Gl(this,b));b=a.ga();a=a.qa();Mq(b,b.length,a,b);return Oq(b,a,this.b)};function Sq(a){a=a?a:{};El.call(this);this.a=a.layerName;this.b=a.layers?a.layers:null;this.defaultDataProjection=Tb(a.defaultDataProjection?a.defaultDataProjection:"EPSG:4326")}v(Sq,Il);function Tq(a,b){var c=[],d,e;var f=0;for(e=a.length;f<e;++f){var g=a[f];0<f&&c.pop();0<=g?d=b[g]:d=b[~g].slice().reverse();c.push.apply(c,d)}a=0;for(b=c.length;a<b;++a)c[a]=c[a].slice();return c}
function Uq(a,b,c,d,e,f,g){a=a.geometries;var h=[],l;var m=0;for(l=a.length;m<l;++m)h[m]=Vq(a[m],b,c,d,e,f,g);return h}function Vq(a,b,c,d,e,f,g){var h=a.type,l=Wq[h];c="Point"===h||"MultiPoint"===h?l(a,c,d):l(a,b);b=new H;b.Ra(Hl(c,!1,g));void 0!==a.id&&b.jc(a.id);a=a.properties;e&&(a||(a={}),a[e]=f);a&&b.H(a);return b}
Sq.prototype.yg=function(a,b){if("Topology"==a.type){var c=null,d=null;if(a.transform){var e=a.transform;c=e.scale;d=e.translate}var f=a.arcs;if(e){e=c;var g=d,h;var l=0;for(h=f.length;l<h;++l){var m,n=f[l],p=e,q=g,r=0,u=0;var x=0;for(m=n.length;x<m;++x){var B=n[x];r+=B[0];u+=B[1];B[0]=r;B[1]=u;Xq(B,p,q)}}}e=[];a=a.objects;var g=this.a,E;for(E in a)this.b&&-1==this.b.indexOf(E)||("GeometryCollection"===a[E].type?(l=a[E],e.push.apply(e,Uq(l,f,c,d,g,E,b))):(l=a[E],e.push(Vq(l,f,c,d,g,E,b))));return e}return[]};
function Xq(a,b,c){a[0]=a[0]*b[0]+c[0];a[1]=a[1]*b[1]+c[1]}Sq.prototype.Fg=function(){return this.defaultDataProjection};
var Wq={Point:function(a,b,c){a=a.coordinates;b&&c&&Xq(a,b,c);return new C(a)},LineString:function(a,b){a=Tq(a.arcs,b);return new O(a)},Polygon:function(a,b){var c=[],d;var e=0;for(d=a.arcs.length;e<d;++e)c[e]=Tq(a.arcs[e],b);return new D(c)},MultiPoint:function(a,b,c){a=a.coordinates;var d;if(b&&c){var e=0;for(d=a.length;e<d;++e)Xq(a[e],b,c)}return new Q(a)},MultiLineString:function(a,b){var c=[],d;var e=0;for(d=a.arcs.length;e<d;++e)c[e]=Tq(a.arcs[e],b);return new P(c)},MultiPolygon:function(a,
b){var c=[],d,e;var f=0;for(e=a.arcs.length;f<e;++f){var g=a.arcs[f];var h=[];var l=0;for(d=g.length;l<d;++l)h[l]=Tq(g[l],b);c[f]=h}return new R(c)}};k=Sq.prototype;k.Zc=function(){};k.he=function(){};k.je=function(){};k.Cg=function(){};k.Rc=function(){};function Yq(a){a=a?a:{};this.c=a.featureType;this.a=a.featureNS;this.b=a.gmlFormat?a.gmlFormat:new Sm;this.o=a.schemaLocation?a.schemaLocation:Zq["1.1.0"];Cm.call(this)}v(Yq,Cm);var Zq={"1.1.0":"http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd","1.0.0":"http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/wfs.xsd"};
Yq.prototype.zc=function(a,b){var c={featureType:this.c,featureNS:this.a};tb(c,Fl(this,a,b?b:{}));b=[c];this.b.b["http://www.opengis.net/gml"].featureMember=rl(Fm.prototype.be);(a=N([],this.b.b,a,b,this.b))||(a=[]);return a};Yq.prototype.j=function(a){if(ml(a))return $q(a);if(nl(a))return N({},ar,a,[]);if("string"===typeof a)return a=pl(a),$q(a)};Yq.prototype.g=function(a){if(ml(a))return br(this,a);if(nl(a))return cr(this,a);if("string"===typeof a)return a=pl(a),br(this,a)};
function br(a,b){for(b=b.firstChild;b;b=b.nextSibling)if(b.nodeType==Node.ELEMENT_NODE)return cr(a,b)}var dr={"http://www.opengis.net/gml":{boundedBy:I(Fm.prototype.gf,"bounds")}};function cr(a,b){var c={},d=Nm(b.getAttribute("numberOfFeatures"));c.numberOfFeatures=d;return N(c,dr,b,[],a.b)}
var er={"http://www.opengis.net/wfs":{totalInserted:I(Mm),totalUpdated:I(Mm),totalDeleted:I(Mm)}},fr={"http://www.opengis.net/ogc":{FeatureId:rl(function(a){return a.getAttribute("fid")})}},gr={"http://www.opengis.net/wfs":{Feature:function(a,b){Al(fr,a,b)}}},ar={"http://www.opengis.net/wfs":{TransactionSummary:I(function(a,b){return N({},er,a,b)},"transactionSummary"),InsertResults:I(function(a,b){return N([],gr,a,b)},"insertIds")}};
function $q(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType==Node.ELEMENT_NODE)return N({},ar,a,[])}var hr={"http://www.opengis.net/wfs":{PropertyName:J(Pm)}};function ir(a,b){var c=jl("http://www.opengis.net/ogc","Filter"),d=jl("http://www.opengis.net/ogc","FeatureId");c.appendChild(d);d.setAttribute("fid",b);a.appendChild(c)}function jr(a,b){a=(a?a:"feature")+":";return b.indexOf(a)?a+b:b}
var kr={"http://www.opengis.net/wfs":{Insert:J(function(a,b,c){var d=c[c.length-1],e=d.gmlVersion,d=jl(d.featureNS,d.featureType);a.appendChild(d);if(2===e){a=an.prototype;(e=b.a)&&d.setAttribute("fid",e);var e=c[c.length-1],f=e.featureNS,g=b.c;e.lb||(e.lb={},e.lb[f]={});var h=b.N();b=[];var l=[];for(n in h){var m=h[n];null!==m&&(b.push(n),l.push(m),n==g||m instanceof of?n in e.lb[f]||(e.lb[f][n]=J(a.ai,a)):n in e.lb[f]||(e.lb[f][n]=J(Pm)))}var n=tb({},e);n.node=d;Bl(n,e.lb,wl(void 0,f),l,c,b)}else Sm.prototype.ii(d,
b,c)}),Update:J(function(a,b,c){var d=c[c.length-1];xa(void 0!==b.a,27);var e=d.featurePrefix,f=d.featureNS;a.setAttribute("typeName",jr(e,d.featureType));a.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:"+e,f);e=b.a;if(void 0!==e){for(var f=b.O(),g=[],h=0,l=f.length;h<l;h++){var m=b.get(f[h]);void 0!==m&&g.push({name:f[h],value:m})}Bl({gmlVersion:d.gmlVersion,node:a,hasZ:d.hasZ,srsName:d.srsName},kr,wl("Property"),g,c);ir(a,e)}}),Delete:J(function(a,b,c){c=c[c.length-1];xa(void 0!==b.a,26);
var d=c.featurePrefix,e=c.featureNS;a.setAttribute("typeName",jr(d,c.featureType));a.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:"+d,e);b=b.a;void 0!==b&&ir(a,b)}),Property:J(function(a,b,c){var d=jl("http://www.opengis.net/wfs","Name"),e=c[c.length-1].gmlVersion;a.appendChild(d);Pm(d,b.name);void 0!==b.value&&null!==b.value&&(d=jl("http://www.opengis.net/wfs","Value"),a.appendChild(d),b.value instanceof of?2===e?an.prototype.ai(d,b.value,c):Sm.prototype.od(d,b.value,c):Pm(d,b.value))}),
Native:J(function(a,b){b.vq&&a.setAttribute("vendorId",b.vq);void 0!==b.Vp&&a.setAttribute("safeToIgnore",b.Vp);void 0!==b.value&&Pm(a,b.value)})}};function lr(a,b,c){var d={node:a};b.b.forEach(function(a){Bl(d,mr,wl(a.kc),[a],c)})}function nr(a,b){void 0!==b.a&&a.setAttribute("matchCase",b.a.toString());or(a,b.b);pr(a,""+b.i)}function qr(a,b,c){a=jl("http://www.opengis.net/ogc",a);Pm(a,c);b.appendChild(a)}function or(a,b){qr("PropertyName",a,b)}function pr(a,b){qr("Literal",a,b)}
function rr(a,b){var c=jl("http://www.opengis.net/gml","TimeInstant");a.appendChild(c);a=jl("http://www.opengis.net/gml","timePosition");c.appendChild(a);Pm(a,b)}
var mr={"http://www.opengis.net/wfs":{Query:J(function(a,b,c){var d=c[c.length-1],e=d.featurePrefix,f=d.featureNS,g=d.propertyNames,h=d.srsName;a.setAttribute("typeName",e?jr(e,b):b);h&&a.setAttribute("srsName",h);f&&a.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:"+e,f);b=tb({},d);b.node=a;Bl(b,hr,wl("PropertyName"),g,c);if(d=d.filter)g=jl("http://www.opengis.net/ogc","Filter"),a.appendChild(g),Bl({node:g},mr,wl(d.kc),[d],c)})},"http://www.opengis.net/ogc":{During:J(function(a,b){var c=jl("http://www.opengis.net/fes",
"ValueReference");Pm(c,b.b);a.appendChild(c);c=jl("http://www.opengis.net/gml","TimePeriod");a.appendChild(c);a=jl("http://www.opengis.net/gml","begin");c.appendChild(a);rr(a,b.a);a=jl("http://www.opengis.net/gml","end");c.appendChild(a);rr(a,b.i)}),And:J(lr),Or:J(lr),Not:J(function(a,b,c){b=b.condition;Bl({node:a},mr,wl(b.kc),[b],c)}),BBOX:J(function(a,b,c){c[c.length-1].srsName=b.srsName;or(a,b.geometryName);Sm.prototype.od(a,b.extent,c)}),Intersects:J(function(a,b,c){c[c.length-1].srsName=b.srsName;
or(a,b.geometryName);Sm.prototype.od(a,b.geometry,c)}),Within:J(function(a,b,c){c[c.length-1].srsName=b.srsName;or(a,b.geometryName);Sm.prototype.od(a,b.geometry,c)}),PropertyIsEqualTo:J(nr),PropertyIsNotEqualTo:J(nr),PropertyIsLessThan:J(nr),PropertyIsLessThanOrEqualTo:J(nr),PropertyIsGreaterThan:J(nr),PropertyIsGreaterThanOrEqualTo:J(nr),PropertyIsNull:J(function(a,b){or(a,b.b)}),PropertyIsBetween:J(function(a,b){or(a,b.b);var c=jl("http://www.opengis.net/ogc","LowerBoundary");a.appendChild(c);
pr(c,""+b.a);c=jl("http://www.opengis.net/ogc","UpperBoundary");a.appendChild(c);pr(c,""+b.i)}),PropertyIsLike:J(function(a,b){a.setAttribute("wildCard",b.g);a.setAttribute("singleChar",b.f);a.setAttribute("escapeChar",b.i);void 0!==b.a&&a.setAttribute("matchCase",b.a.toString());or(a,b.b);pr(a,""+b.c)})}};
Yq.prototype.l=function(a){var b=jl("http://www.opengis.net/wfs","GetFeature");b.setAttribute("service","WFS");b.setAttribute("version","1.1.0");if(a){a.handle&&b.setAttribute("handle",a.handle);a.outputFormat&&b.setAttribute("outputFormat",a.outputFormat);void 0!==a.maxFeatures&&b.setAttribute("maxFeatures",a.maxFeatures);a.resultType&&b.setAttribute("resultType",a.resultType);void 0!==a.startIndex&&b.setAttribute("startIndex",a.startIndex);void 0!==a.count&&b.setAttribute("count",a.count);var c=
a.filter;if(a.bbox){xa(a.geometryName,12);var d=sm(a.geometryName,a.bbox,a.srsName);c?c=rm(c,d):c=d}}b.setAttributeNS("http://www.w3.org/2001/XMLSchema-instance","xsi:schemaLocation",this.o);c={node:b,srsName:a.srsName,featureNS:a.featureNS?a.featureNS:this.a,featurePrefix:a.featurePrefix,geometryName:a.geometryName,filter:c,propertyNames:a.propertyNames?a.propertyNames:[]};xa(Array.isArray(a.featureTypes),11);a=a.featureTypes;c=[c];d=tb({},c[c.length-1]);d.node=b;Bl(d,mr,wl("Query"),a,c);return b};
Yq.prototype.v=function(a,b,c,d){var e=[],f=jl("http://www.opengis.net/wfs","Transaction"),g=d.version?d.version:"1.1.0",h="1.0.0"===g?2:3;f.setAttribute("service","WFS");f.setAttribute("version",g);if(d){var l=d.gmlOptions?d.gmlOptions:{};d.handle&&f.setAttribute("handle",d.handle)}f.setAttributeNS("http://www.w3.org/2001/XMLSchema-instance","xsi:schemaLocation",Zq[g]);a&&(g={node:f,featureNS:d.featureNS,featureType:d.featureType,featurePrefix:d.featurePrefix,gmlVersion:h,hasZ:d.hasZ,srsName:d.srsName},
tb(g,l),Bl(g,kr,wl("Insert"),a,e));b&&(g={node:f,featureNS:d.featureNS,featureType:d.featureType,featurePrefix:d.featurePrefix,gmlVersion:h,hasZ:d.hasZ,srsName:d.srsName},tb(g,l),Bl(g,kr,wl("Update"),b,e));c&&Bl({node:f,featureNS:d.featureNS,featureType:d.featureType,featurePrefix:d.featurePrefix,gmlVersion:h,srsName:d.srsName},kr,wl("Delete"),c,e);d.nativeElements&&Bl({node:f,featureNS:d.featureNS,featureType:d.featureType,featurePrefix:d.featurePrefix,gmlVersion:h,srsName:d.srsName},kr,wl("Native"),
d.nativeElements,e);return f};Yq.prototype.Eg=function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType==Node.ELEMENT_NODE)return this.kf(a);return null};Yq.prototype.kf=function(a){if(a.firstElementChild&&a.firstElementChild.firstElementChild)for(a=a.firstElementChild.firstElementChild,a=a.firstElementChild;a;a=a.nextElementSibling)if(0!==a.childNodes.length&&(1!==a.childNodes.length||3!==a.firstChild.nodeType)){var b=[{}];this.b.gf(a,b);return Tb(b.pop().srsName)}return null};function sr(a){a=a?a:{};El.call(this);this.b=void 0!==a.splitCollection?a.splitCollection:!1}v(sr,Vn);function tr(a){a=a.X();return a.length?a.join(" "):""}function ur(a){a=a.X();for(var b=[],c=0,d=a.length;c<d;++c)b.push(a[c].join(" "));return b.join(",")}function vr(a){var b=[];a=a.Sd();for(var c=0,d=a.length;c<d;++c)b.push("("+ur(a[c])+")");return b.join(",")}
function wr(a){var b=a.U(),c=(0,xr[b])(a),b=b.toUpperCase();if(a instanceof rf){a=a.ja;var d="";if("XYZ"===a||"XYZM"===a)d+="Z";if("XYM"===a||"XYZM"===a)d+="M";a=d;0<a.length&&(b+=" "+a)}return c.length?b+"("+c+")":b+" EMPTY"}
var xr={Point:tr,LineString:ur,Polygon:vr,MultiPoint:function(a){var b=[];a=a.Zd();for(var c=0,d=a.length;c<d;++c)b.push("("+tr(a[c])+")");return b.join(",")},MultiLineString:function(a){var b=[];a=a.gd();for(var c=0,d=a.length;c<d;++c)b.push("("+ur(a[c])+")");return b.join(",")},MultiPolygon:function(a){var b=[];a=a.Td();for(var c=0,d=a.length;c<d;++c)b.push("("+vr(a[c])+")");return b.join(",")},GeometryCollection:function(a){var b=[];a=a.Vf();for(var c=0,d=a.length;c<d;++c)b.push(wr(a[c]));return b.join(",")}};
k=sr.prototype;k.ae=function(a,b){return(a=this.wd(a,b))?(b=new H,b.Ra(a),b):null};k.zg=function(a,b){var c=[];a=this.wd(a,b);this.b&&"GeometryCollection"==a.U()?c=a.a:c=[a];b=[];for(var d=0,e=c.length;d<e;++d)a=new H,a.Ra(c[d]),b.push(a);return b};k.wd=function(a,b){a=new yr(new zr(a));Ar(a);return(a=Br(a))?Hl(a,!1,b):null};k.ge=function(a,b){return(a=a.V())?this.Cd(a,b):""};
k.Wg=function(a,b){if(1==a.length)return this.ge(a[0],b);for(var c=[],d=0,e=a.length;d<e;++d)c.push(a[d].V());a=new tm(c);return this.Cd(a,b)};k.Cd=function(a,b){return wr(Hl(a,!0,b))};function zr(a){this.a=a;this.b=-1}
function Cr(a){var b=a.a.charAt(++a.b),c={position:a.b,value:b};if("("==b)c.type=2;else if(","==b)c.type=5;else if(")"==b)c.type=3;else if("0"<=b&&"9">=b||"."==b||"-"==b){c.type=4;var b=a.b,d=!1,e=!1;do{if("."==f)d=!0;else if("e"==f||"E"==f)e=!0;var f=a.a.charAt(++a.b)}while("0"<=f&&"9">=f||"."==f&&(void 0===d||!d)||!e&&("e"==f||"E"==f)||e&&("-"==f||"+"==f));a=parseFloat(a.a.substring(b,a.b--));c.value=a}else if("a"<=b&&"z">=b||"A"<=b&&"Z">=b){c.type=1;b=a.b;do f=a.a.charAt(++a.b);while("a"<=f&&"z">=
f||"A"<=f&&"Z">=f);a=a.a.substring(b,a.b--).toUpperCase();c.value=a}else{if(" "==b||"\t"==b||"\r"==b||"\n"==b)return Cr(a);if(""===b)c.type=6;else throw Error("Unexpected character: "+b);}return c}function yr(a){this.i=a;this.a="XY"}function Ar(a){a.b=Cr(a.i)}function Dr(a,b){(b=a.b.type==b)&&Ar(a);return b}
function Br(a){var b=a.b;if(Dr(a,1)){var b=b.value,c="XY",d=a.b;1==a.b.type&&(d=d.value,"Z"===d?c="XYZ":"M"===d?c="XYM":"ZM"===d&&(c="XYZM"),"XY"!==c&&Ar(a));a.a=c;if("GEOMETRYCOLLECTION"==b){a:{if(Dr(a,2)){b=[];do b.push(Br(a));while(Dr(a,5));if(Dr(a,3)){a=b;break a}}else if(Er(a)){a=[];break a}throw Error(Fr(a));}return new tm(a)}d=Gr[b];c=Hr[b];if(!d||!c)throw Error("Invalid geometry type: "+b);b=d.call(a);return new c(b,a.a)}throw Error(Fr(a));}k=yr.prototype;
k.tg=function(){if(Dr(this,2)){var a=Ir(this);if(Dr(this,3))return a}else if(Er(this))return null;throw Error(Fr(this));};k.sg=function(){if(Dr(this,2)){var a=Jr(this);if(Dr(this,3))return a}else if(Er(this))return[];throw Error(Fr(this));};k.ug=function(){if(Dr(this,2)){var a=Kr(this);if(Dr(this,3))return a}else if(Er(this))return[];throw Error(Fr(this));};
k.fp=function(){if(Dr(this,2)){var a;if(2==this.b.type)for(a=[this.tg()];Dr(this,5);)a.push(this.tg());else a=Jr(this);if(Dr(this,3))return a}else if(Er(this))return[];throw Error(Fr(this));};k.ep=function(){if(Dr(this,2)){var a=Kr(this);if(Dr(this,3))return a}else if(Er(this))return[];throw Error(Fr(this));};k.gp=function(){if(Dr(this,2)){for(var a=[this.ug()];Dr(this,5);)a.push(this.ug());if(Dr(this,3))return a}else if(Er(this))return[];throw Error(Fr(this));};
function Ir(a){for(var b=[],c=a.a.length,d=0;d<c;++d){var e=a.b;if(Dr(a,4))b.push(e.value);else break}if(b.length==c)return b;throw Error(Fr(a));}function Jr(a){for(var b=[Ir(a)];Dr(a,5);)b.push(Ir(a));return b}function Kr(a){for(var b=[a.sg()];Dr(a,5);)b.push(a.sg());return b}function Er(a){var b=1==a.b.type&&"EMPTY"==a.b.value;b&&Ar(a);return b}function Fr(a){return"Unexpected `"+a.b.value+"` at position "+a.b.position+" in `"+a.i.a+"`"}
var Hr={POINT:C,LINESTRING:O,POLYGON:D,MULTIPOINT:Q,MULTILINESTRING:P,MULTIPOLYGON:R},Gr={POINT:yr.prototype.tg,LINESTRING:yr.prototype.sg,POLYGON:yr.prototype.ug,MULTIPOINT:yr.prototype.fp,MULTILINESTRING:yr.prototype.ep,MULTIPOLYGON:yr.prototype.gp};function Lr(){this.version=void 0}v(Lr,uq);Lr.prototype.a=function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType==Node.ELEMENT_NODE)return this.b(a);return null};Lr.prototype.b=function(a){this.version=a.getAttribute("version").trim();return(a=N({version:this.version},Mr,a,[]))?a:null};function Nr(a,b){return N({},Or,a,b)}function Pr(a,b){return N({},Qr,a,b)}function Rr(a,b){if(b=Nr(a,b))return a=[Nm(a.getAttribute("width")),Nm(a.getAttribute("height"))],b.size=a,b}
function Sr(a,b){return N([],Tr,a,b)}
var Ur=[null,"http://www.opengis.net/wms"],Mr=K(Ur,{Service:I(function(a,b){return N({},Vr,a,b)}),Capability:I(function(a,b){return N({},Wr,a,b)})}),Wr=K(Ur,{Request:I(function(a,b){return N({},Xr,a,b)}),Exception:I(function(a,b){return N([],Yr,a,b)}),Layer:I(function(a,b){return N({},Zr,a,b)})}),Vr=K(Ur,{Name:I(S),Title:I(S),Abstract:I(S),KeywordList:I(Sr),OnlineResource:I(tq),ContactInformation:I(function(a,b){return N({},$r,a,b)}),Fees:I(S),AccessConstraints:I(S),LayerLimit:I(Mm),MaxWidth:I(Mm),
MaxHeight:I(Mm)}),$r=K(Ur,{ContactPersonPrimary:I(function(a,b){return N({},as,a,b)}),ContactPosition:I(S),ContactAddress:I(function(a,b){return N({},bs,a,b)}),ContactVoiceTelephone:I(S),ContactFacsimileTelephone:I(S),ContactElectronicMailAddress:I(S)}),as=K(Ur,{ContactPerson:I(S),ContactOrganization:I(S)}),bs=K(Ur,{AddressType:I(S),Address:I(S),City:I(S),StateOrProvince:I(S),PostCode:I(S),Country:I(S)}),Yr=K(Ur,{Format:rl(S)}),Zr=K(Ur,{Name:I(S),Title:I(S),Abstract:I(S),KeywordList:I(Sr),CRS:tl(S),
EX_GeographicBoundingBox:I(function(a,b){var c=N({},cs,a,b);if(c){a=c.westBoundLongitude;b=c.southBoundLatitude;var d=c.eastBoundLongitude,c=c.northBoundLatitude;if(void 0!==a&&void 0!==b&&void 0!==d&&void 0!==c)return[a,b,d,c]}}),BoundingBox:tl(function(a){var b=[Lm(a.getAttribute("minx")),Lm(a.getAttribute("miny")),Lm(a.getAttribute("maxx")),Lm(a.getAttribute("maxy"))],c=[Lm(a.getAttribute("resx")),Lm(a.getAttribute("resy"))];return{crs:a.getAttribute("CRS"),extent:b,res:c}}),Dimension:tl(function(a){return{name:a.getAttribute("name"),
units:a.getAttribute("units"),unitSymbol:a.getAttribute("unitSymbol"),"default":a.getAttribute("default"),multipleValues:Im(a.getAttribute("multipleValues")),nearestValue:Im(a.getAttribute("nearestValue")),current:Im(a.getAttribute("current")),values:S(a)}}),Attribution:I(function(a,b){return N({},ds,a,b)}),AuthorityURL:tl(function(a,b){if(b=Nr(a,b))return b.name=a.getAttribute("name"),b}),Identifier:tl(S),MetadataURL:tl(function(a,b){if(b=Nr(a,b))return b.type=a.getAttribute("type"),b}),DataURL:tl(Nr),
FeatureListURL:tl(Nr),Style:tl(function(a,b){return N({},es,a,b)}),MinScaleDenominator:I(Km),MaxScaleDenominator:I(Km),Layer:tl(function(a,b){var c=b[b.length-1],d=N({},Zr,a,b);if(d)return b=Im(a.getAttribute("queryable")),void 0===b&&(b=c.queryable),d.queryable=void 0!==b?b:!1,b=Nm(a.getAttribute("cascaded")),void 0===b&&(b=c.cascaded),d.cascaded=b,b=Im(a.getAttribute("opaque")),void 0===b&&(b=c.opaque),d.opaque=void 0!==b?b:!1,b=Im(a.getAttribute("noSubsets")),void 0===b&&(b=c.noSubsets),d.noSubsets=
void 0!==b?b:!1,(b=Lm(a.getAttribute("fixedWidth")))||(b=c.fixedWidth),d.fixedWidth=b,(a=Lm(a.getAttribute("fixedHeight")))||(a=c.fixedHeight),d.fixedHeight=a,["Style","CRS","AuthorityURL"].forEach(function(a){a in c&&(d[a]=(d[a]||[]).concat(c[a]))}),"EX_GeographicBoundingBox BoundingBox Dimension Attribution MinScaleDenominator MaxScaleDenominator".split(" ").forEach(function(a){a in d||(d[a]=c[a])}),d})}),ds=K(Ur,{Title:I(S),OnlineResource:I(tq),LogoURL:I(Rr)}),cs=K(Ur,{westBoundLongitude:I(Km),
eastBoundLongitude:I(Km),southBoundLatitude:I(Km),northBoundLatitude:I(Km)}),Xr=K(Ur,{GetCapabilities:I(Pr),GetMap:I(Pr),GetFeatureInfo:I(Pr)}),Qr=K(Ur,{Format:tl(S),DCPType:tl(function(a,b){return N({},fs,a,b)})}),fs=K(Ur,{HTTP:I(function(a,b){return N({},gs,a,b)})}),gs=K(Ur,{Get:I(Nr),Post:I(Nr)}),es=K(Ur,{Name:I(S),Title:I(S),Abstract:I(S),LegendURL:tl(Rr),StyleSheetURL:I(Nr),StyleURL:I(Nr)}),Or=K(Ur,{Format:I(S),OnlineResource:I(tq)}),Tr=K(Ur,{Keyword:rl(S)});function hs(a){a=a?a:{};this.a="http://mapserver.gis.umn.edu/mapserver";this.b=new an;this.c=a.layers?a.layers:null;Cm.call(this)}v(hs,Cm);
hs.prototype.zc=function(a,b){var c={};b&&tb(c,Fl(this,a,b));c=[c];a.setAttribute("namespaceURI",this.a);var d=a.localName;b=[];if(a.childNodes.length){if("msGMLOutput"==d)for(var e=0,f=a.childNodes.length;e<f;e++){var g=a.childNodes[e];if(g.nodeType===Node.ELEMENT_NODE){var h=c[0],l=g.localName.replace("_layer","");if(!this.c||ja(this.c,l)){l+="_feature";h.featureType=l;h.featureNS=this.a;var m={};m[l]=rl(this.b.wg,this.b);h=K([h.featureNS,null],m);g.setAttribute("namespaceURI",this.a);(g=N([],h,
g,c,this.b))&&la(b,g)}}}"FeatureCollection"==d&&(a=N([],this.b.b,a,[{}],this.b))&&(b=a)}return b};hs.prototype.Vg=function(){};hs.prototype.Xb=function(){};hs.prototype.ie=function(){};function is(){this.i=new vq}v(is,uq);is.prototype.a=function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType==Node.ELEMENT_NODE)return this.b(a);return null};is.prototype.b=function(a){var b=a.getAttribute("version").trim(),c=this.i.b(a);if(!c)return null;c.version=b;return(c=N(c,js,a,[]))?c:null};function ks(a){var b=S(a).split(" ");if(b&&2==b.length&&(a=+b[0],b=+b[1],!isNaN(a)&&!isNaN(b)))return[a,b]}
var ls=[null,"http://www.opengis.net/wmts/1.0"],ms=[null,"http://www.opengis.net/ows/1.1"],js=K(ls,{Contents:I(function(a,b){return N({},ns,a,b)})}),ns=K(ls,{Layer:tl(function(a,b){return N({},os,a,b)}),TileMatrixSet:tl(function(a,b){return N({},ps,a,b)})}),os=K(ls,{Style:tl(function(a,b){if(b=N({},qs,a,b))return a="true"===a.getAttribute("isDefault"),b.isDefault=a,b}),Format:tl(S),TileMatrixSetLink:tl(function(a,b){return N({},rs,a,b)}),Dimension:tl(function(a,b){return N({},ss,a,b)}),ResourceURL:tl(function(a){var b=
a.getAttribute("format"),c=a.getAttribute("template");a=a.getAttribute("resourceType");var d={};b&&(d.format=b);c&&(d.template=c);a&&(d.resourceType=a);return d})},K(ms,{Title:I(S),Abstract:I(S),WGS84BoundingBox:I(function(a,b){a=N([],ts,a,b);if(2==a.length)return Na(a)}),Identifier:I(S)})),qs=K(ls,{LegendURL:tl(function(a){var b={};b.format=a.getAttribute("format");b.href=tq(a);return b})},K(ms,{Title:I(S),Identifier:I(S)})),rs=K(ls,{TileMatrixSet:I(S),TileMatrixSetLimits:I(function(a,b){return N([],
us,a,b)})}),us=K(ls,{TileMatrixLimits:rl(function(a,b){return N({},vs,a,b)})}),vs=K(ls,{TileMatrix:I(S),MinTileRow:I(Mm),MaxTileRow:I(Mm),MinTileCol:I(Mm),MaxTileCol:I(Mm)}),ss=K(ls,{Default:I(S),Value:tl(S)},K(ms,{Identifier:I(S)})),ts=K(ms,{LowerCorner:rl(ks),UpperCorner:rl(ks)}),ps=K(ls,{WellKnownScaleSet:I(S),TileMatrix:tl(function(a,b){return N({},ws,a,b)})},K(ms,{SupportedCRS:I(S),Identifier:I(S)})),ws=K(ls,{TopLeftCorner:I(ks),ScaleDenominator:I(Km),TileWidth:I(Mm),TileHeight:I(Mm),MatrixWidth:I(Mm),
MatrixHeight:I(Mm)},K(ms,{Identifier:I(S)}));function xs(a){Tc.call(this);a=a||{};this.a=null;this.f=fc;this.c=void 0;y(this,Vc("projection"),this.Am,this);y(this,Vc("tracking"),this.Bm,this);void 0!==a.projection&&this.Wh(a.projection);void 0!==a.trackingOptions&&this.wj(a.trackingOptions);this.Ke(void 0!==a.tracking?a.tracking:!1)}v(xs,Tc);k=xs.prototype;k.ka=function(){this.Ke(!1);Tc.prototype.ka.call(this)};k.Am=function(){var a=this.Uh();a&&(this.f=Vb(Tb("EPSG:4326"),a),this.a&&this.set("position",this.f(this.a)))};
k.Bm=function(){if(Wd){var a=this.Vh();a&&void 0===this.c?this.c=navigator.geolocation.watchPosition(this.np.bind(this),this.op.bind(this),this.Gh()):a||void 0===this.c||(navigator.geolocation.clearWatch(this.c),this.c=void 0)}};
k.np=function(a){a=a.coords;this.set("accuracy",a.accuracy);this.set("altitude",null===a.altitude?void 0:a.altitude);this.set("altitudeAccuracy",null===a.altitudeAccuracy?void 0:a.altitudeAccuracy);this.set("heading",null===a.heading?void 0:Ha(a.heading));this.a?(this.a[0]=a.longitude,this.a[1]=a.latitude):this.a=[a.longitude,a.latitude];var b=this.f(this.a);this.set("position",b);this.set("speed",null===a.speed?void 0:a.speed);a=Xf(Jb,this.a,a.accuracy);a.Dc(this.f);this.set("accuracyGeometry",a);
this.s()};k.op=function(a){a.type="error";this.Ke(!1);this.b(a)};k.Dk=function(){return this.get("accuracy")};k.Ek=function(){return this.get("accuracyGeometry")||null};k.Gk=function(){return this.get("altitude")};k.Hk=function(){return this.get("altitudeAccuracy")};k.ym=function(){return this.get("heading")};k.zm=function(){return this.get("position")};k.Uh=function(){return this.get("projection")};k.ll=function(){return this.get("speed")};k.Vh=function(){return this.get("tracking")};k.Gh=function(){return this.get("trackingOptions")};
k.Wh=function(a){this.set("projection",Tb(a))};k.Ke=function(a){this.set("tracking",a)};k.wj=function(a){this.set("trackingOptions",a)};function ys(a,b,c){rf.call(this);this.Ng(a,b?b:0,c)}v(ys,rf);k=ys.prototype;k.clone=function(){var a=new ys(null);tf(a,this.ja,this.A.slice());a.s();return a};k.Kb=function(a,b,c,d){var e=this.A;a-=e[0];var f=b-e[1];b=a*a+f*f;if(b<d){if(b)for(d=this.pd()/Math.sqrt(b),c[0]=e[0]+d*a,c[1]=e[1]+d*f,d=2;d<this.a;++d)c[d]=e[d];else for(d=0;d<this.a;++d)c[d]=e[d];c.length=this.a;return b}return d};k.Mc=function(a,b){var c=this.A;a-=c[0];b-=c[1];return a*a+b*b<=zs(this)};
k.wa=function(){return this.A.slice(0,this.a)};k.se=function(a){var b=this.A,c=b[this.a]-b[0];return Xa(b[0]-c,b[1]-c,b[0]+c,b[1]+c,a)};k.pd=function(){return Math.sqrt(zs(this))};function zs(a){var b=a.A[a.a]-a.A[0];a=a.A[a.a+1]-a.A[1];return b*b+a*a}k.U=function(){return"Circle"};k.Xa=function(a){var b=this.G();return qb(a,b)?(b=this.wa(),a[0]<=b[0]&&a[2]>=b[0]||a[1]<=b[1]&&a[3]>=b[1]?!0:db(a,this.sb,this)):!1};
k.ob=function(a){var b=this.a,c=a.slice();c[b]=c[0]+(this.A[b]-this.A[0]);var d;for(d=1;d<b;++d)c[b+d]=a[d];tf(this,this.ja,c);this.s()};k.Ng=function(a,b,c){if(a){uf(this,c,a,0);this.A||(this.A=[]);c=this.A;a=Cf(c,a);c[a++]=c[0]+b;var d;b=1;for(d=this.a;b<d;++b)c[a++]=c[b];c.length=a}else tf(this,"XY",null);this.s()};k.X=function(){};k.ma=function(){};k.Uc=function(a){this.A[this.a]=this.A[0]+a;this.s()};function As(a,b,c){for(var d=[],e=a(0),f=a(1),g=b(e),h=b(f),l=[f,e],m=[h,g],n=[1,0],p={},q=1E5,r,u,x,B,E;0<--q&&0<n.length;)x=n.pop(),e=l.pop(),g=m.pop(),f=x.toString(),f in p||(d.push(g[0],g[1]),p[f]=!0),B=n.pop(),f=l.pop(),h=m.pop(),E=(x+B)/2,r=a(E),u=b(r),Fa(u[0],u[1],g[0],g[1],h[0],h[1])<c?(d.push(h[0],h[1]),f=B.toString(),p[f]=!0):(n.push(B,E,E,x),m.push(h,u,u,g),l.push(f,r,r,e));return d}function Bs(a,b,c,d,e){var f=Tb("EPSG:4326");return As(function(d){return[a,b+(c-b)*d]},ec(f,d),e)}
function Cs(a,b,c,d,e){var f=Tb("EPSG:4326");return As(function(d){return[b+(c-b)*d,a]},ec(f,d),e)};function Ds(a){a=a||{};this.j=this.v=null;this.f=this.o=Infinity;this.g=this.l=-Infinity;this.ra=this.oa=Infinity;this.R=this.I=-Infinity;this.Jb=void 0!==a.targetSize?a.targetSize:100;this.fb=void 0!==a.maxLines?a.maxLines:100;this.i=[];this.c=[];this.pa=void 0!==a.strokeStyle?a.strokeStyle:Es;this.D=this.u=void 0;this.a=this.b=this.S=null;1==a.showLabels&&(this.na=a.lonLabelFormatter?a.lonLabelFormatter:bf.bind(this,"EW"),this.Ua=a.latLabelFormatter?a.latLabelFormatter:bf.bind(this,"NS"),this.fa=
void 0==a.lonLabelPosition?0:a.lonLabelPosition,this.T=void 0==a.latLabelPosition?1:a.latLabelPosition,this.B=void 0!==a.lonLabelStyle?a.lonLabelStyle:new fo({font:"12px Calibri,sans-serif",textBaseline:"bottom",fill:new al({color:"rgba(0,0,0,1)"}),stroke:new wj({color:"rgba(255,255,255,1)",width:3})}),this.C=void 0!==a.latLabelStyle?a.latLabelStyle:new fo({font:"12px Calibri,sans-serif",textAlign:"end",fill:new al({color:"rgba(0,0,0,1)"}),stroke:new wj({color:"rgba(255,255,255,1)",width:3})}),this.b=
[],this.a=[]);this.setMap(void 0!==a.map?a.map:null)}var Es=new wj({color:"rgba(0,0,0,0.2)"}),Fs=[90,45,30,20,10,5,2,1,.5,.2,.1,.05,.01,.005,.002,.001];function Gs(a,b,c,d,e,f,g){var h=g;c=Bs(b,c,d,a.j,e);h=void 0!==a.i[h]?a.i[h]:new O(null);h.ba("XY",c);qb(h.G(),f)&&(a.b&&(c=g,d=h.ga(),f=[d[0],Ca(f[1]+Math.abs(f[1]-f[3])*a.fa,Math.max(f[1],d[1]),Math.min(f[3],d[d.length-1]))],c=a.b[c]?a.b[c].Qd:new C(null),c.ma(f),a.b[g]={Qd:c,text:a.na(b)}),a.i[g++]=h);return g}
function Hs(a,b,c,d,e){var f=e;c=Cs(b,a.g,a.f,a.j,c);f=void 0!==a.c[f]?a.c[f]:new O(null);f.ba("XY",c);if(qb(f.G(),d)){if(a.a){c=e;var g=f.ga();d=[Ca(d[0]+Math.abs(d[0]-d[2])*a.T,Math.max(d[0],g[0]),Math.min(d[2],g[g.length-2])),g[1]];c=a.a[c]?a.a[c].Qd:new C(null);c.ma(d);a.a[e]={Qd:c,text:a.Ua(b)}}a.c[e++]=f}return e}k=Ds.prototype;k.Cm=function(){return this.v};k.al=function(){return this.i};k.hl=function(){return this.c};
k.Kh=function(a){var b=a.vectorContext,c=a.frameState,d=c.extent;a=c.viewState;var e=a.center,f=a.projection,g=a.resolution;a=c.pixelRatio;a=g*g/(4*a*a);if(!this.j||!dc(this.j,f)){var h=Tb("EPSG:4326"),l=f.G(),m=f.g,n=hc(m,h,f),p=m[2],q=m[1],r=m[0],u=n[3],x=n[2],B=n[1],n=n[0];this.o=m[3];this.f=p;this.l=q;this.g=r;this.oa=u;this.ra=x;this.I=B;this.R=n;this.u=ec(h,f);this.D=ec(f,h);this.S=this.D(nb(l));this.j=f}f.i&&(f=f.G(),h=lb(f),c=c.focus[0],c<f[0]||c>f[2])&&(c=h*Math.ceil((f[0]-c)/h),d=[d[0]+
c,d[1],d[2]+c,d[3]]);c=this.S[0];f=this.S[1];h=-1;m=Math.pow(this.Jb*g,2);p=[];q=[];g=0;for(l=Fs.length;g<l;++g){r=Fs[g]/2;p[0]=c-r;p[1]=f-r;q[0]=c+r;q[1]=f+r;this.u(p,p);this.u(q,q);r=Math.pow(q[0]-p[0],2)+Math.pow(q[1]-p[1],2);if(r<=m)break;h=Fs[g]}g=h;if(-1==g)this.i.length=this.c.length=0,this.b&&(this.b.length=0),this.a&&(this.a.length=0);else{c=this.D(e);e=c[0];c=c[1];f=this.fb;h=[Math.max(d[0],this.R),Math.max(d[1],this.I),Math.min(d[2],this.ra),Math.min(d[3],this.oa)];h=hc(h,this.j,"EPSG:4326");
m=h[3];q=h[1];e=Math.floor(e/g)*g;p=Ca(e,this.g,this.f);l=Gs(this,p,q,m,a,d,0);for(h=0;p!=this.g&&h++<f;)p=Math.max(p-g,this.g),l=Gs(this,p,q,m,a,d,l);p=Ca(e,this.g,this.f);for(h=0;p!=this.f&&h++<f;)p=Math.min(p+g,this.f),l=Gs(this,p,q,m,a,d,l);this.i.length=l;this.b&&(this.b.length=l);c=Math.floor(c/g)*g;e=Ca(c,this.l,this.o);l=Hs(this,e,a,d,0);for(h=0;e!=this.l&&h++<f;)e=Math.max(e-g,this.l),l=Hs(this,e,a,d,l);e=Ca(c,this.l,this.o);for(h=0;e!=this.o&&h++<f;)e=Math.min(e+g,this.o),l=Hs(this,e,a,
d,l);this.c.length=l;this.a&&(this.a.length=l)}b.Ma(null,this.pa);a=0;for(e=this.i.length;a<e;++a)g=this.i[a],b.zb(g);a=0;for(e=this.c.length;a<e;++a)g=this.c[a],b.zb(g);if(this.b)for(a=0,e=this.b.length;a<e;++a)g=this.b[a],this.B.xd(g.text),b.Cb(this.B),b.zb(g.Qd);if(this.a)for(a=0,e=this.a.length;a<e;++a)g=this.a[a],this.C.xd(g.text),b.Cb(this.C),b.zb(g.Qd)};
k.setMap=function(a){this.v&&(this.v.K("postcompose",this.Kh,this),this.v.render());a&&(a.J("postcompose",this.Kh,this),a.render());this.v=a};function Is(a,b,c,d,e){Qc.call(this);this.f=e;this.extent=a;this.a=c;this.resolution=b;this.state=d}v(Is,Qc);Is.prototype.s=function(){this.b("change")};Is.prototype.G=function(){return this.extent};Is.prototype.getState=function(){return this.state};function Js(a,b,c,d,e,f,g){Is.call(this,a,b,c,0,d);this.j=e;this.M=new Image;null!==f&&(this.M.crossOrigin=f);this.c={};this.i=null;this.state=0;this.g=g}v(Js,Is);k=Js.prototype;k.Y=function(a){if(void 0!==a){var b;a=w(a);if(a in this.c)return this.c[a];wb(this.c)?b=this.M:b=this.M.cloneNode(!1);return this.c[a]=b}return this.M};k.Fm=function(){this.state=3;this.i.forEach(Ec);this.i=null;this.s()};
k.Gm=function(){void 0===this.resolution&&(this.resolution=mb(this.extent)/this.M.height);this.state=2;this.i.forEach(Ec);this.i=null;this.s()};k.load=function(){if(0==this.state||3==this.state)this.state=1,this.s(),this.i=[Jc(this.M,"error",this.Fm,this),Jc(this.M,"load",this.Gm,this)],this.g(this,this.j)};k.Og=function(a){this.M=a};function Ks(a,b,c,d,e,f){this.c=f?f:null;Is.call(this,a,b,c,f?0:2,d);this.i=e}v(Ks,Is);Ks.prototype.g=function(a){this.state=a?3:2;this.s()};Ks.prototype.load=function(){0==this.state&&(this.state=1,this.s(),this.c(this.g.bind(this)))};Ks.prototype.Y=function(){return this.i};function Ls(a,b){Qc.call(this);this.ta=a;this.state=b;this.i=null;this.key=""}v(Ls,Qc);Ls.prototype.s=function(){this.b("change")};Ls.prototype.bb=function(){return this.key+"/"+this.ta};function Ms(a){if(!a.i)return a;var b=a.i;do{if(2==b.getState())return b;b=b.i}while(b);return a}Ls.prototype.f=function(){return this.ta};Ls.prototype.getState=function(){return this.state};function Ns(a,b){a.state=b;a.s()};function Os(a,b,c,d,e){Ls.call(this,a,b);this.g=c;this.M=new Image;null!==d&&(this.M.crossOrigin=d);this.c=null;this.j=e}v(Os,Ls);k=Os.prototype;k.ka=function(){1==this.state&&Ps(this);this.i&&Nc(this.i);this.state=5;this.s();Ls.prototype.ka.call(this)};k.Y=function(){return this.M};k.bb=function(){return this.g};k.Dm=function(){this.state=3;this.M=Qs;Ps(this);this.s()};k.Em=function(){this.state=this.M.naturalWidth&&this.M.naturalHeight?2:4;Ps(this);this.s()};
k.load=function(){if(0==this.state||3==this.state)this.state=1,this.s(),this.c=[Jc(this.M,"error",this.Dm,this),Jc(this.M,"load",this.Em,this)],this.j(this,this.g)};function Ps(a){a.c.forEach(Ec);a.c=null}var Qs=new Image;Qs.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";function Rs(a){a=a?a:{};ng.call(this,{handleEvent:mf});this.g=a.formatConstructors?a.formatConstructors:[];this.o=a.projection?Tb(a.projection):null;this.a=null;this.target=a.target?a.target:null}v(Rs,ng);function Ss(a){a=a.dataTransfer.files;var b;var c=0;for(b=a.length;c<b;++c){var d=a.item(c);var e=new FileReader;e.addEventListener("load",this.j.bind(this,d));e.readAsText(d)}}function Ts(a){a.stopPropagation();a.preventDefault();a.dataTransfer.dropEffect="copy"}
Rs.prototype.j=function(a,b){b=b.target.result;var c=this.v,d=this.o;d||(d=c.Z().v);var c=this.g,e=[],f;var g=0;for(f=c.length;g<f;++g){var h=new c[g];var l={featureProjection:d};try{e=h.Oa(b,l)}catch(m){e=null}if(e&&0<e.length)break}this.b(new Us(Vs,a,e,d))};function Ws(a){var b=a.v;b&&(b=a.target?a.target:b.a,a.a=[y(b,"drop",Ss,a),y(b,"dragenter",Ts,a),y(b,"dragover",Ts,a),y(b,"drop",Ts,a)])}Rs.prototype.Ha=function(a){ng.prototype.Ha.call(this,a);a?Ws(this):Xs(this)};
Rs.prototype.setMap=function(a){Xs(this);ng.prototype.setMap.call(this,a);this.c()&&Ws(this)};function Xs(a){a.a&&(a.a.forEach(Ec),a.a=null)}var Vs="addfeatures";function Us(a,b,c,d){Oc.call(this,a);this.features=c;this.file=b;this.projection=d}v(Us,Oc);function Ys(a){a=a?a:{};Dg.call(this,{handleDownEvent:Zs,handleDragEvent:$s,handleUpEvent:at});this.l=a.condition?a.condition:yg;this.a=this.g=void 0;this.j=0;this.u=void 0!==a.duration?a.duration:400}v(Ys,Dg);
function $s(a){if(Bg(a)){var b=a.map,c=b.Ob(),d=a.pixel;a=d[0]-c[0]/2;d=c[1]/2-d[1];c=Math.atan2(d,a);a=Math.sqrt(a*a+d*d);b=b.Z();b.g.rotation!==Te&&void 0!==this.g&&(d=c-this.g,og(b,b.Qa()-d));this.g=c;void 0!==this.a&&(c=this.a*(b.Pa()/a),qg(b,c));void 0!==this.a&&(this.j=this.a/a);this.a=a}}
function at(a){if(!Bg(a))return!0;a=a.map.Z();cg(a,1,-1);var b=this.j-1,c=a.Qa(),c=a.constrainRotation(c,0);og(a,c,void 0,void 0);var c=a.Pa(),d=this.u,c=a.constrainResolution(c,0,b);qg(a,c,void 0,d);this.j=0;return!1}function Zs(a){return Bg(a)&&this.l(a)?(cg(a.map.Z(),1,1),this.a=this.g=void 0,!0):!1};function bt(a,b,c,d){this.fb=a;this.Ua=b;this.overlaps=d;this.c=0;this.resolution=c;this.ra=this.oa=null;this.a=[];this.coordinates=[];this.T=Bh();this.b=[];this.B=null;this.fa=Bh();this.na=Bh()}v(bt,Wh);
function ct(a,b,c,d,e,f,g){var h=a.coordinates.length,l=a.Sf();g&&(c+=e);g=[b[c],b[c+1]];var m=[NaN,NaN],n=!0,p;for(p=c+e;p<d;p+=e){m[0]=b[p];m[1]=b[p+1];var q=Wa(l,m);q!==r?(n&&(a.coordinates[h++]=g[0],a.coordinates[h++]=g[1]),a.coordinates[h++]=m[0],a.coordinates[h++]=m[1],n=!1):1===q?(a.coordinates[h++]=m[0],a.coordinates[h++]=m[1],n=!1):n=!0;g[0]=m[0];g[1]=m[1];var r=q}if(f&&n||p===c+e)a.coordinates[h++]=g[0],a.coordinates[h++]=g[1];return h}
function dt(a,b){a.oa=[0,b,0];a.a.push(a.oa);a.ra=[0,b,0];a.b.push(a.ra)}bt.prototype.Va=function(a,b){if(this.R){var c=Gh(this.T,this.R.slice());a.translate(c[0],c[1]);a.rotate(b)}a.fill();this.R&&a.setTransform.apply(a,this.na)};
function et(a,b,c,d,e,f,g,h,l){if(a.B&&pa(d,a.T))var m=a.B;else a.B||(a.B=[]),m=pf(a.coordinates,0,a.coordinates.length,2,d,a.B),Fh(a.T,d);d=!wb(f);for(var n=0,p=g.length,q=0,r,u=a.fa,x=a.na,B,E,A,L,oa=0,ha=0,ga=a.a!=g||a.overlaps?0:200;n<p;){var z=g[n];switch(z[0]){case 0:q=z[1];d&&f[w(q).toString()]||!q.V()?n=z[2]:void 0===l||qb(l,q.V().G())?++n:n=z[2]+1;break;case 1:oa>ga&&(a.Va(b,e),oa=0);ha>ga&&(b.stroke(),ha=0);oa||ha||(b.beginPath(),B=E=NaN);++n;break;case 2:q=z[1];r=m[q];z=m[q+1];A=m[q+2]-
r;q=m[q+3]-z;q=Math.sqrt(A*A+q*q);b.moveTo(r+q,z);b.arc(r,z,q,0,2*Math.PI,!0);++n;break;case 3:b.closePath();++n;break;case 4:q=z[1];r=z[2];var M=z[3];var ba=z[4]*c;var da=z[5]*c;var fb=z[6],ca=z[7],Ub=z[8],uc=z[9];var bc=z[10];A=z[11];L=z[12];var Je=z[13],zg=z[14];for(bc&&(A+=e);q<r;q+=2){z=m[q]-ba;bc=m[q+1]-da;Je&&(z=Math.round(z),bc=Math.round(bc));if(1!=L||A){var ff=z+ba,rh=bc+da;Kh(u,ff,rh,L,L,A,-ff,-rh);b.setTransform.apply(b,u)}ff=b.globalAlpha;1!=ca&&(b.globalAlpha=ff*ca);var rh=zg+Ub>M.width?
M.width-Ub:zg,Bq=fb+uc>M.height?M.height-uc:fb;b.drawImage(M,Ub,uc,rh,Bq,z,bc,rh*c,Bq*c);1!=ca&&(b.globalAlpha=ff);(1!=L||A)&&b.setTransform.apply(b,x)}++n;break;case 5:q=z[1];r=z[2];da=z[3];fb=z[4]*c;ca=z[5]*c;A=z[6];L=z[7]*c;M=z[8];ba=z[9];for((bc=z[10])&&(A+=e);q<r;q+=2){z=m[q]+fb;bc=m[q+1]+ca;if(1!=L||A)Kh(u,z,bc,L,L,A,-z,-bc),b.setTransform.apply(b,u);Ub=da.split("\n");uc=Ub.length;1<uc?(Je=Math.round(1.5*b.measureText("M").width),bc-=(uc-1)/2*Je):Je=0;for(zg=0;zg<uc;zg++)ff=Ub[zg],ba&&b.strokeText(ff,
z,bc),M&&b.fillText(ff,z,bc),bc+=Je;(1!=L||A)&&b.setTransform.apply(b,x)}++n;break;case 6:if(h&&(q=z[1],q=h(q)))return q;++n;break;case 7:ga?oa++:a.Va(b,e);++n;break;case 8:q=z[1];r=z[2];z=m[q];bc=m[q+1];A=z+.5|0;L=bc+.5|0;if(A!==B||L!==E)b.moveTo(z,bc),B=A,E=L;for(q+=2;q<r;q+=2)if(z=m[q],bc=m[q+1],A=z+.5|0,L=bc+.5|0,q==r-2||A!==B||L!==E)b.lineTo(z,bc),B=A,E=L;++n;break;case 9:a.R=z[2];oa&&(a.Va(b,e),oa=0,ha&&(b.stroke(),ha=0));b.fillStyle=z[1];++n;break;case 10:var q=void 0!==z[8]?z[8]:!0,ul=z[9];
r=z[2];ha&&(b.stroke(),ha=0);b.strokeStyle=z[1];b.lineWidth=q?r*c:r;b.lineCap=z[3];b.lineJoin=z[4];b.miterLimit=z[5];Td&&(r=z[6],A=z[7],q&&c!==ul&&(r=r.map(function(a){return a*c/ul}),A*=c/ul,z[6]=r,z[7]=A,z[9]=c),b.lineDashOffset=A,b.setLineDash(r));++n;break;case 11:b.font=z[1];b.textAlign=z[2];b.textBaseline=z[3];++n;break;case 12:ga?ha++:b.stroke();++n;break;default:++n}}oa&&a.Va(b,e);ha&&b.stroke()}bt.prototype.La=function(a,b,c,d,e){et(this,a,b,c,d,e,this.a,void 0,void 0)};
function ft(a){var b=a.b;b.reverse();var c,d=b.length,e=-1;for(c=0;c<d;++c){var f=b[c];var g=f[0];if(6==g)e=c;else if(0==g){f[2]=c;f=a.b;for(g=c;e<g;){var h=f[e];f[e]=f[g];f[g]=h;++e;--g}e=-1}}}function gt(a,b){a.oa[2]=a.a.length;a.oa=null;a.ra[2]=a.b.length;a.ra=null;b=[6,b];a.a.push(b);a.b.push(b)}bt.prototype.Te=ua;bt.prototype.Sf=function(){return this.Ua};function ht(a,b,c,d){bt.call(this,a,b,c,d);this.M=this.I=null;this.C=this.D=this.S=this.u=this.v=this.l=this.o=this.j=this.g=this.f=this.i=void 0}v(ht,bt);
ht.prototype.qc=function(a,b){if(this.M){dt(this,b);var c=a.ga(),d=this.coordinates.length;a=ct(this,c,0,c.length,a.qa(),!1,!1);this.a.push([4,d,a,this.M,this.i,this.f,this.g,this.j,this.o,this.l,this.v,this.u,this.S,this.D,this.C]);this.b.push([4,d,a,this.I,this.i,this.f,this.g,this.j,this.o,this.l,this.v,this.u,this.S,this.D,this.C]);gt(this,b)}};
ht.prototype.oc=function(a,b){if(this.M){dt(this,b);var c=a.ga(),d=this.coordinates.length;a=ct(this,c,0,c.length,a.qa(),!1,!1);this.a.push([4,d,a,this.M,this.i,this.f,this.g,this.j,this.o,this.l,this.v,this.u,this.S,this.D,this.C]);this.b.push([4,d,a,this.I,this.i,this.f,this.g,this.j,this.o,this.l,this.v,this.u,this.S,this.D,this.C]);gt(this,b)}};ht.prototype.Te=function(){ft(this);this.f=this.i=void 0;this.M=this.I=null;this.C=this.D=this.u=this.v=this.l=this.o=this.j=this.S=this.g=void 0};
ht.prototype.Ub=function(a){var b=a.Hc(),c=a.ic(),d=a.qg(1),e=a.Y(1),f=a.Oc();this.i=b[0];this.f=b[1];this.I=d;this.M=e;this.g=c[1];this.j=a.f;this.o=f[0];this.l=f[1];this.v=a.l;this.u=a.g;this.S=a.a;this.D=a.v;this.C=c[0]};function it(a,b,c,d){bt.call(this,a,b,c,d);this.f=null;this.i={Md:void 0,Gd:void 0,Hd:null,Id:void 0,Jd:void 0,Kd:void 0,Ld:void 0,eg:0,strokeStyle:void 0,lineCap:void 0,lineDash:null,lineDashOffset:void 0,lineJoin:void 0,lineWidth:void 0,miterLimit:void 0}}v(it,bt);function jt(a,b,c,d,e){var f=a.coordinates.length;b=ct(a,b,c,d,e,!1,!1);f=[8,f,b];a.a.push(f);a.b.push(f);return d}k=it.prototype;k.Sf=function(){this.f||(this.f=Ra(this.Ua),0<this.c&&Qa(this.f,this.resolution*(this.c+1)/2,this.f));return this.f};
function kt(a){var b=a.i,c=b.strokeStyle,d=b.lineCap,e=b.lineDash,f=b.lineDashOffset,g=b.lineJoin,h=b.lineWidth,l=b.miterLimit;b.Md==c&&b.Gd==d&&pa(b.Hd,e)&&b.Id==f&&b.Jd==g&&b.Kd==h&&b.Ld==l||(b.eg!=a.coordinates.length&&(a.a.push([12]),b.eg=a.coordinates.length),a.a.push([10,c,h,d,g,l,e,f,!0,1],[1]),b.Md=c,b.Gd=d,b.Hd=e,b.Id=f,b.Jd=g,b.Kd=h,b.Ld=l)}
k.mc=function(a,b){var c=this.i,d=c.lineWidth;void 0!==c.strokeStyle&&void 0!==d&&(kt(this),dt(this,b),this.b.push([10,c.strokeStyle,c.lineWidth,c.lineCap,c.lineJoin,c.miterLimit,c.lineDash,c.lineDashOffset,!0,1],[1]),c=a.ga(),jt(this,c,0,c.length,a.qa()),this.b.push([12]),gt(this,b))};
k.nc=function(a,b){var c=this.i,d=c.lineWidth;if(void 0!==c.strokeStyle&&void 0!==d){kt(this);dt(this,b);this.b.push([10,c.strokeStyle,c.lineWidth,c.lineCap,c.lineJoin,c.miterLimit,c.lineDash,c.lineDashOffset,!0,1],[1]);c=a.Bb();d=a.ga();a=a.qa();var e=0,f;var g=0;for(f=c.length;g<f;++g)e=jt(this,d,e,c[g],a);this.b.push([12]);gt(this,b)}};k.Te=function(){this.i.eg!=this.coordinates.length&&this.a.push([12]);ft(this);this.i=null};
k.Ma=function(a,b){a=b.a;this.i.strokeStyle=id(a?a:Uh);a=b.f;this.i.lineCap=void 0!==a?a:"round";a=b.i;this.i.lineDash=a?a:Th;a=b.g;this.i.lineDashOffset=a?a:0;a=b.j;this.i.lineJoin=void 0!==a?a:"round";a=b.c;this.i.lineWidth=void 0!==a?a:1;b=b.o;this.i.miterLimit=void 0!==b?b:10;this.i.lineWidth>this.c&&(this.c=this.i.lineWidth,this.f=null)};function lt(a,b,c,d){bt.call(this,a,b,c,d);this.f=null;this.i={oh:void 0,Md:void 0,Gd:void 0,Hd:null,Id:void 0,Jd:void 0,Kd:void 0,Ld:void 0,fillStyle:void 0,strokeStyle:void 0,lineCap:void 0,lineDash:null,lineDashOffset:void 0,lineJoin:void 0,lineWidth:void 0,miterLimit:void 0}}v(lt,bt);
function mt(a,b,c,d,e){var f=a.i,g=void 0!==f.fillStyle,f=void 0!=f.strokeStyle,h=d.length,l=[1];a.a.push(l);a.b.push(l);for(l=0;l<h;++l){var m=d[l],n=a.coordinates.length;c=ct(a,b,c,m,e,!0,!f);c=[8,n,c];a.a.push(c);a.b.push(c);f&&(c=[3],a.a.push(c),a.b.push(c));c=m}b=[7];a.b.push(b);g&&a.a.push(b);f&&(g=[12],a.a.push(g),a.b.push(g));return c}k=lt.prototype;
k.Zb=function(a,b){var c=this.i,d=c.strokeStyle;if(void 0!==c.fillStyle||void 0!==d){nt(this,a);dt(this,b);this.b.push([9,gd(Sh)]);void 0!==c.strokeStyle&&this.b.push([10,c.strokeStyle,c.lineWidth,c.lineCap,c.lineJoin,c.miterLimit,c.lineDash,c.lineDashOffset,!0,1]);var e=a.ga(),d=this.coordinates.length;ct(this,e,0,e.length,a.qa(),!1,!1);a=[1];d=[2,d];this.a.push(a,d);this.b.push(a,d);a=[7];this.b.push(a);void 0!==c.fillStyle&&this.a.push(a);void 0!==c.strokeStyle&&(c=[12],this.a.push(c),this.b.push(c));
gt(this,b)}};k.rc=function(a,b){var c=this.i;nt(this,a);dt(this,b);this.b.push([9,gd(Sh)]);void 0!==c.strokeStyle&&this.b.push([10,c.strokeStyle,c.lineWidth,c.lineCap,c.lineJoin,c.miterLimit,c.lineDash,c.lineDashOffset,!0,1]);var c=a.Bb(),d=a.ec();mt(this,d,0,c,a.qa());gt(this,b)};
k.pc=function(a,b){var c=this.i,d=c.strokeStyle;if(void 0!==c.fillStyle||void 0!==d){nt(this,a);dt(this,b);this.b.push([9,gd(Sh)]);void 0!==c.strokeStyle&&this.b.push([10,c.strokeStyle,c.lineWidth,c.lineCap,c.lineJoin,c.miterLimit,c.lineDash,c.lineDashOffset,!0,1]);c=a.c;d=fi(a);a=a.qa();var e=0,f;var g=0;for(f=c.length;g<f;++g)e=mt(this,d,e,c[g],a);gt(this,b)}};
k.Te=function(){ft(this);this.i=null;var a=this.fb;if(a){var b=this.coordinates,c;var d=0;for(c=b.length;d<c;++d)b[d]=a*Math.round(b[d]/a)}};k.Sf=function(){this.f||(this.f=Ra(this.Ua),0<this.c&&Qa(this.f,this.resolution*(this.c+1)/2,this.f));return this.f};
k.Ma=function(a,b){var c=this.i;a?(a=a.b,c.fillStyle=id(a?a:Sh)):c.fillStyle=void 0;b?(a=b.a,c.strokeStyle=id(a?a:Uh),a=b.f,c.lineCap=void 0!==a?a:"round",a=b.i,c.lineDash=a?a.slice():Th,a=b.g,c.lineDashOffset=a?a:0,a=b.j,c.lineJoin=void 0!==a?a:"round",a=b.c,c.lineWidth=void 0!==a?a:1,b=b.o,c.miterLimit=void 0!==b?b:10,c.lineWidth>this.c&&(this.c=c.lineWidth,this.f=null)):(c.strokeStyle=void 0,c.lineCap=void 0,c.lineDash=null,c.lineDashOffset=void 0,c.lineJoin=void 0,c.lineWidth=void 0,c.miterLimit=
void 0)};function nt(a,b){var c=a.i,d=c.fillStyle,e=c.strokeStyle,f=c.lineCap,g=c.lineDash,h=c.lineDashOffset,l=c.lineJoin,m=c.lineWidth,n=c.miterLimit;if(void 0!==d&&("string"!==typeof d||c.oh!=d)){var p=[9,d];"string"!==typeof d&&(b=b.G(),p.push([b[0],b[3]]));a.a.push(p);c.oh=c.fillStyle}void 0===e||c.Md==e&&c.Gd==f&&pa(c.Hd,g)&&c.Id==h&&c.Jd==l&&c.Kd==m&&c.Ld==n||(a.a.push([10,e,m,f,l,n,g,h,!0,1]),c.Md=e,c.Gd=f,c.Hd=g,c.Id=h,c.Jd=l,c.Kd=m,c.Ld=n)};function ot(a,b,c,d){bt.call(this,a,b,c,d);this.C=this.D=this.S=null;this.Ia="";this.o=this.j=0;this.l=void 0;this.u=this.v=0;this.g=this.f=this.i=null}v(ot,bt);
ot.prototype.yc=function(a,b,c,d,e,f){if(""!==this.Ia&&this.g&&(this.i||this.f)){if(this.i){e=this.i;var g=this.S;if(!g||g.fillStyle!=e.fillStyle){var h=[9,e.fillStyle];this.a.push(h);this.b.push(h);g?g.fillStyle=e.fillStyle:this.S={fillStyle:e.fillStyle}}}this.f&&(e=this.f,g=this.D,g&&g.lineCap==e.lineCap&&g.lineDash==e.lineDash&&g.lineDashOffset==e.lineDashOffset&&g.lineJoin==e.lineJoin&&g.lineWidth==e.lineWidth&&g.miterLimit==e.miterLimit&&g.strokeStyle==e.strokeStyle||(h=[10,e.strokeStyle,e.lineWidth,
e.lineCap,e.lineJoin,e.miterLimit,e.lineDash,e.lineDashOffset,!1,1],this.a.push(h),this.b.push(h),g?(g.lineCap=e.lineCap,g.lineDash=e.lineDash,g.lineDashOffset=e.lineDashOffset,g.lineJoin=e.lineJoin,g.lineWidth=e.lineWidth,g.miterLimit=e.miterLimit,g.strokeStyle=e.strokeStyle):this.D={lineCap:e.lineCap,lineDash:e.lineDash,lineDashOffset:e.lineDashOffset,lineJoin:e.lineJoin,lineWidth:e.lineWidth,miterLimit:e.miterLimit,strokeStyle:e.strokeStyle}));e=this.g;g=this.C;g&&g.font==e.font&&g.textAlign==
e.textAlign&&g.textBaseline==e.textBaseline||(h=[11,e.font,e.textAlign,e.textBaseline],this.a.push(h),this.b.push(h),g?(g.font=e.font,g.textAlign=e.textAlign,g.textBaseline=e.textBaseline):this.C={font:e.font,textAlign:e.textAlign,textBaseline:e.textBaseline});dt(this,f);e=this.coordinates.length;a=ct(this,a,b,c,d,!1,!1);a=[5,e,a,this.Ia,this.j,this.o,this.v,this.u,!!this.i,!!this.f,this.l];this.a.push(a);this.b.push(a);gt(this,f)}};
ot.prototype.Cb=function(a){if(a){var b=a.Fa();b?(b=b.b,b=id(b?b:Sh),this.i?this.i.fillStyle=b:this.i={fillStyle:b}):this.i=null;var c=a.Ga();if(c){var b=c.a,d=c.f,e=c.i,f=c.g,g=c.j,h=c.c,c=c.o,d=void 0!==d?d:"round",e=e?e.slice():Th,f=void 0!==f?f:0,g=void 0!==g?g:"round",h=void 0!==h?h:1,c=void 0!==c?c:10,b=id(b?b:Uh);if(this.f){var l=this.f;l.lineCap=d;l.lineDash=e;l.lineDashOffset=f;l.lineJoin=g;l.lineWidth=h;l.miterLimit=c;l.strokeStyle=b}else this.f={lineCap:d,lineDash:e,lineDashOffset:f,lineJoin:g,
lineWidth:h,miterLimit:c,strokeStyle:b}}else this.f=null;var m=a.a,b=a.i,d=a.c,e=a.o,h=a.f,c=a.b,f=a.Na(),g=a.g,l=a.j;a=void 0!==m?m:"10px sans-serif";g=void 0!==g?g:"center";l=void 0!==l?l:"middle";this.g?(m=this.g,m.font=a,m.textAlign=g,m.textBaseline=l):this.g={font:a,textAlign:g,textBaseline:l};this.Ia=void 0!==f?f:"";this.j=void 0!==b?b:0;this.o=void 0!==d?d:0;this.l=void 0!==e?e:!1;this.v=void 0!==h?h:0;this.u=void 0!==c?c:1}else this.Ia=""};function pt(a,b,c,d,e){this.v=a;this.c=b;this.o=d;this.l=c;this.f=e;this.a={};this.g=jd(1,1);this.j=Bh()}v(pt,ki);var qt={0:[[!0]]};function rt(a,b,c){var d,e=Math.floor(a.length/2);if(b>=e)for(d=e;d<b;d++)a[d][c]=!0;else if(b<e)for(d=b+1;d<e;d++)a[d][c]=!0}
function st(a){if(void 0!==qt[a])return qt[a];for(var b=2*a+1,c=Array(b),d=0;d<b;d++)c[d]=Array(b);for(var b=a,e=d=0;b>=d;)rt(c,a+b,a+d),rt(c,a+d,a+b),rt(c,a-d,a+b),rt(c,a-b,a+d),rt(c,a-b,a-d),rt(c,a-d,a-b),rt(c,a+d,a-b),rt(c,a+b,a-d),d++,e+=1+2*d,0<2*(e-b)+1&&(--b,e+=1-2*b);return qt[a]=c}function tt(a){for(var b in a.a){var c=a.a[b],d;for(d in c)c[d].Te()}}
pt.prototype.Ea=function(a,b,c,d,e,f){d=Math.round(d);var g=2*d+1,h=Kh(this.j,d+.5,d+.5,1/b,-1/b,-c,-a[0],-a[1]),l=this.g;l.canvas.width!==g||l.canvas.height!==g?(l.canvas.width=g,l.canvas.height=g):l.clearRect(0,0,g,g);if(void 0!==this.f){var m=Oa();Pa(m,a);Qa(m,b*(this.f+d),m)}var n=st(d);return ut(this,l,h,c,e,function(a){for(var b=l.getImageData(0,0,g,g).data,c=0;c<g;c++)for(var d=0;d<g;d++)if(n[c][d]&&0<b[4*(d*g+c)+3]){if(a=f(a))return a;l.clearRect(0,0,g,g);return}},m)};
function vt(a,b){var c=a.c;a=c[0];var d=c[1],e=c[2],c=c[3];a=[a,d,a,c,e,c,e,d];pf(a,0,8,2,b,a);return a}pt.prototype.b=function(a,b){var c=void 0!==a?a.toString():"0";a=this.a[c];void 0===a&&(a={},this.a[c]=a);c=a[b];void 0===c&&(c=new wt[b](this.v,this.c,this.l,this.o),a[b]=c);return c};pt.prototype.i=function(){return wb(this.a)};
pt.prototype.La=function(a,b,c,d,e,f){var g=Object.keys(this.a).map(Number);g.sort(ia);var h=vt(this,c);a.save();a.beginPath();a.moveTo(h[0],h[1]);a.lineTo(h[2],h[3]);a.lineTo(h[4],h[5]);a.lineTo(h[6],h[7]);a.clip();f=f?f:ji;var l,m,h=0;for(l=g.length;h<l;++h){var n=this.a[g[h].toString()];var p=0;for(m=f.length;p<m;++p){var q=n[f[p]];void 0!==q&&q.La(a,b,c,d,e)}}a.restore()};
function ut(a,b,c,d,e,f,g){var h=Object.keys(a.a).map(Number);h.sort(function(a,b){return b-a});var l,m;var n=0;for(l=h.length;n<l;++n){var p=a.a[h[n].toString()];for(m=ji.length-1;0<=m;--m){var q=p[ji[m]];if(void 0!==q&&(q=et(q,b,1,c,d,e,q.b,f,g)))return q}}}var wt={Circle:lt,Image:ht,LineString:it,Polygon:lt,Text:ot};function xt(a){Sc.call(this);this.a=a}v(xt,Sc);xt.prototype.Ea=ua;xt.prototype.Ue=nf;xt.prototype.Nf=function(a,b,c){return function(d,e){return yt(a,b,d,e,function(a){c[d]||(c[d]={});c[d][a.ta.toString()]=a})}};xt.prototype.na=function(a){2===a.target.getState()&&zt(this)};function At(a,b){var c=b.getState();2!=c&&3!=c&&y(b,"change",a.na,a);0==c&&(b.load(),c=b.getState());return 2==c}function zt(a){var b=a.a;b.Mb()&&"ready"==b.$f()&&a.s()}
function Bt(a,b){b.Ki()&&a.postRenderFunctions.push(function(a,b,e){b=w(a).toString();a.fd(e.viewState.projection,e.usedTiles[b])}.bind(null,b))}function Ct(a,b){if(b){var c;var d=0;for(c=b.length;d<c;++d){var e=b[d];a[w(e).toString()]=e}}}function Dt(a,b){b=b.D;void 0!==b&&("string"===typeof b?a.logos[b]="":b&&(xa("string"==typeof b.href,44),xa("string"==typeof b.src,45),a.logos[b.src]=b.href))}
function Et(a,b,c,d){b=w(b).toString();c=c.toString();b in a?c in a[b]?(a=a[b][c],d.ca<a.ca&&(a.ca=d.ca),d.$>a.$&&(a.$=d.$),d.da<a.da&&(a.da=d.da),d.ia>a.ia&&(a.ia=d.ia)):a[b][c]=d:(a[b]={},a[b][c]=d)}
function Ft(a,b,c,d,e,f,g,h,l,m){var n=w(b).toString();n in a.wantedTiles||(a.wantedTiles[n]={});var p=a.wantedTiles[n];a=a.tileQueue;var q=c.minZoom,r,u,x;for(x=g;x>=q;--x){var B=oc(c,f,x,B);var E=c.Da(x);for(r=B.ca;r<=B.$;++r)for(u=B.da;u<=B.ia;++u)if(g-x<=h){var A=b.Nc(x,r,u,d,e);0==A.getState()&&(p[A.bb()]=!0,A.bb()in a.a||a.f([A,n,tc(c,A.ta),E]));l&&l.call(m,A)}else b.Ug(x,r,u,e)}};function Gt(a){xt.call(this,a);this.fa=Bh()}v(Gt,xt);function Ht(a,b,c){var d=b.pixelRatio,e=b.size[0]*d,f=b.size[1]*d,g=b.viewState.rotation,h=ib(c),l=hb(c),m=gb(c);c=eb(c);Gh(b.coordinateToPixelTransform,h);Gh(b.coordinateToPixelTransform,l);Gh(b.coordinateToPixelTransform,m);Gh(b.coordinateToPixelTransform,c);a.save();Vh(a,-g,e/2,f/2);a.beginPath();a.moveTo(h[0]*d,h[1]*d);a.lineTo(l[0]*d,l[1]*d);a.lineTo(m[0]*d,m[1]*d);a.lineTo(c[0]*d,c[1]*d);a.clip();Vh(a,g,e/2,f/2)}
function It(a,b,c,d,e){var f=a.a;if(Rc(f,b)){var g=d.size[0]*d.pixelRatio,h=d.size[1]*d.pixelRatio,l=d.viewState.rotation;Vh(c,-l,g/2,h/2);a=e?e:Jt(a,d,0);f.b(new Rh(b,new Xh(c,d.pixelRatio,d.extent,a,d.viewState.rotation),d,c,null));Vh(c,l,g/2,h/2)}}Gt.prototype.u=function(a,b,c,d){if(this.Ea(a,b,0,mf,this))return c.call(d,this.a,null)};Gt.prototype.ef=function(a,b,c,d){It(this,"postcompose",a,b,d)};
function Jt(a,b,c){var d=b.viewState,e=b.pixelRatio,f=e/d.resolution;return Kh(a.fa,e*b.size[0]/2,e*b.size[1]/2,f,-f,-d.rotation,-d.center[0]+c,-d.center[1])};function Kt(a,b){return w(a)-w(b)}function Lt(a,b){a=.5*a/b;return a*a}function Mt(a,b,c,d,e,f){var g=!1,h;if(h=c.Y()){var l=h.Ye();2==l||3==l?h.Bj(e,f):(0==l&&h.load(),h.Nh(e,f),g=!0)}if(e=(0,c.Za)(b))d=e.Vd(d),(0,Nt[d.U()])(a,d,c,b);return g}
var Nt={Point:function(a,b,c,d){var e=c.Y();if(e){if(2!=e.Ye())return;var f=a.b(c.Ba(),"Image");f.Ub(e);f.qc(b,d)}if(e=c.Na())a=a.b(c.Ba(),"Text"),a.Cb(e),a.yc(b.ga(),0,2,2,b,d)},LineString:function(a,b,c,d){var e=c.Ga();if(e){var f=a.b(c.Ba(),"LineString");f.Ma(null,e);f.mc(b,d)}if(e=c.Na())a=a.b(c.Ba(),"Text"),a.Cb(e),a.yc(di(b),0,2,2,b,d)},Polygon:function(a,b,c,d){var e=c.Fa(),f=c.Ga();if(e||f){var g=a.b(c.Ba(),"Polygon");g.Ma(e,f);g.rc(b,d)}if(e=c.Na())a=a.b(c.Ba(),"Text"),a.Cb(e),a.yc(Wf(b),
0,2,2,b,d)},MultiPoint:function(a,b,c,d){var e=c.Y();if(e){if(2!=e.Ye())return;var f=a.b(c.Ba(),"Image");f.Ub(e);f.oc(b,d)}if(e=c.Na())a=a.b(c.Ba(),"Text"),a.Cb(e),c=b.ga(),a.yc(c,0,c.length,b.qa(),b,d)},MultiLineString:function(a,b,c,d){var e=c.Ga();if(e){var f=a.b(c.Ba(),"LineString");f.Ma(null,e);f.nc(b,d)}if(e=c.Na())a=a.b(c.Ba(),"Text"),a.Cb(e),c=ei(b),a.yc(c,0,c.length,2,b,d)},MultiPolygon:function(a,b,c,d){var e=c.Fa(),f=c.Ga();if(f||e){var g=a.b(c.Ba(),"Polygon");g.Ma(e,f);g.pc(b,d)}if(e=
c.Na())a=a.b(c.Ba(),"Text"),a.Cb(e),c=gi(b),a.yc(c,0,c.length,2,b,d)},GeometryCollection:function(a,b,c,d){b=b.a;var e;var f=0;for(e=b.length;f<e;++f)(0,Nt[b[f].U()])(a,b[f],c,d)},Circle:function(a,b,c,d){var e=c.Fa(),f=c.Ga();if(e||f){var g=a.b(c.Ba(),"Circle");g.Ma(e,f);g.Zb(b,d)}if(e=c.Na())a=a.b(c.Ba(),"Text"),a.Cb(e),a.yc(b.wa(),0,2,2,b,d)}};function Ot(a){Gt.call(this,a);this.c=!1;this.v=-1;this.l=NaN;this.j=Oa();this.f=this.o=null;this.g=jd()}v(Ot,Gt);
Ot.prototype.S=function(a,b,c){var d=a.extent,e=a.pixelRatio,f=b.Je?a.skippedFeatureUids:{},g=a.viewState,h=g.projection,g=g.rotation,l=h.G(),m=this.a.ha(),n=Jt(this,a,0);It(this,"precompose",c,a,n);var p=b.extent,q=void 0!==p;q&&Ht(c,a,p);if((p=this.f)&&!p.i()){var r=0,u=0;if(Rc(this.a,"render")){var x=c.canvas.width;var B=c.canvas.height;if(g){var E=Math.round(Math.sqrt(x*x+B*B)),r=(E-x)/2,u=(E-B)/2;x=B=E}this.g.canvas.width=x;this.g.canvas.height=B;x=this.g}else x=c;B=x.globalAlpha;x.globalAlpha=
b.opacity;x!=c&&x.translate(r,u);var E=a.size[0]*e,A=a.size[1]*e;Vh(x,-g,E/2,A/2);p.La(x,e,n,g,f);if(m.u&&h.i&&!Va(l,d)){for(var h=d[0],m=lb(l),L=0;h<l[0];)--L,n=m*L,n=Jt(this,a,n),p.La(x,e,n,g,f),h+=m;L=0;for(h=d[2];h>l[2];)++L,n=m*L,n=Jt(this,a,n),p.La(x,e,n,g,f),h-=m;n=Jt(this,a,0)}Vh(x,g,E/2,A/2);x!=c&&(It(this,"render",x,a,n),c.drawImage(x.canvas,-r,-u),x.translate(-r,-u));x.globalAlpha=B}q&&c.restore();this.ef(c,a,b,n)};
Ot.prototype.Ea=function(a,b,c,d,e){if(this.f){var f=this.a,g={};return this.f.Ea(a,b.viewState.resolution,b.viewState.rotation,c,{},function(a){var b=w(a).toString();if(!(b in g))return g[b]=!0,d.call(e,a,f)})}};Ot.prototype.D=function(){zt(this)};
Ot.prototype.sd=function(a){function b(a){var b=a.Lc();if(b)var d=b.call(a,m);else(b=c.f)&&(d=b(a,m));if(d){if(d){b=!1;if(Array.isArray(d))for(var e=0,f=d.length;e<f;++e)b=Mt(q,a,d[e],Lt(m,n),this.D,this)||b;else b=Mt(q,a,d,Lt(m,n),this.D,this)||b;a=b}else a=!1;this.c=this.c||a}}var c=this.a,d=c.ha();Ct(a.attributions,d.j);Dt(a,d);var e=a.viewHints[0],f=a.viewHints[1],g=c.T,h=c.na;if(!this.c&&!g&&e||!h&&f)return!0;var l=a.extent,h=a.viewState,e=h.projection,m=h.resolution,n=a.pixelRatio,f=c.i,p=c.c,
g=c.get(Pt);void 0===g&&(g=Kt);l=Qa(l,p*m);p=h.projection.G();d.u&&h.projection.i&&!Va(p,a.extent)&&(a=Math.max(lb(l)/2,lb(p)),l[0]=p[0]-a,l[2]=p[2]+a);if(!this.c&&this.l==m&&this.v==f&&this.o==g&&Va(this.j,l))return!0;this.f=null;this.c=!1;var q=new pt(.5*m/n,l,m,d.T,c.c);d.Yd(l,m,e);if(g){var r=[];d.$b(l,function(a){r.push(a)},this);r.sort(g);r.forEach(b,this)}else d.$b(l,b,this);tt(q);this.l=m;this.v=f;this.o=g;this.j=l;this.f=q;return!0};function Qt(){this.b="precision mediump float;varying vec2 a;uniform float f;uniform sampler2D g;void main(void){vec4 texColor=texture2D(g,a);gl_FragColor.rgb=texColor.rgb;gl_FragColor.a=texColor.a*f;}"}v(Qt,mi);var Rt=new Qt;function St(){this.b="varying vec2 a;attribute vec2 b;attribute vec2 c;uniform mat4 d;uniform mat4 e;void main(void){gl_Position=e*vec4(b,0.,1.);a=(d*vec4(c,0.,1.)).st;}"}v(St,ni);var Tt=new St;
function Ut(a,b){this.i=a.getUniformLocation(b,"f");this.c=a.getUniformLocation(b,"e");this.g=a.getUniformLocation(b,"d");this.f=a.getUniformLocation(b,"g");this.b=a.getAttribLocation(b,"b");this.a=a.getAttribLocation(b,"c")};function Vt(a,b){xt.call(this,b);this.c=a;this.T=new Di([-1,-1,0,0,1,-1,1,0,-1,1,0,1,1,1,1,1]);this.g=this.Ib=null;this.j=void 0;this.v=Bh();this.S=Bh();this.C=ti();this.u=null}v(Vt,xt);
function Wt(a,b,c){var d=a.c.i;if(void 0===a.j||a.j!=c){b.postRenderFunctions.push(function(a,b,c){a.isContextLost()||(a.deleteFramebuffer(b),a.deleteTexture(c))}.bind(null,d,a.g,a.Ib));b=Qi(d,c,c);var e=d.createFramebuffer();d.bindFramebuffer(36160,e);d.framebufferTexture2D(36160,36064,3553,b,0);a.Ib=b;a.g=e;a.j=c}else d.bindFramebuffer(36160,a.g)}
Vt.prototype.Gi=function(a,b,c){Xt(this,"precompose",c,a);wi(c,34962,this.T);var d=c.b,e=Hi(c,Rt,Tt);if(this.u)var f=this.u;else this.u=f=new Ut(d,e);c.Qc(e)&&(d.enableVertexAttribArray(f.b),d.vertexAttribPointer(f.b,2,5126,!1,16,0),d.enableVertexAttribArray(f.a),d.vertexAttribPointer(f.a,2,5126,!1,16,8),d.uniform1i(f.f,0));d.uniformMatrix4fv(f.g,!1,ui(this.C,this.v));d.uniformMatrix4fv(f.c,!1,ui(this.C,this.S));d.uniform1f(f.i,b.opacity);d.bindTexture(3553,this.Ib);d.drawArrays(5,0,4);Xt(this,"postcompose",
c,a)};function Xt(a,b,c,d){a=a.a;if(Rc(a,b)){var e=d.viewState;a.b(new Rh(b,new kk(c,e.center,e.resolution,e.rotation,d.size,d.extent,d.pixelRatio),d,null,c))}}Vt.prototype.mg=function(){this.g=this.Ib=null;this.j=void 0};function Yt(a,b){Vt.call(this,a,b);this.l=!1;this.R=-1;this.I=NaN;this.D=Oa();this.o=this.f=this.B=null}v(Yt,Vt);k=Yt.prototype;k.Gi=function(a,b,c){this.o=b;var d=a.viewState,e=this.f,f=a.size,g=a.pixelRatio,h=this.c.i;e&&!e.i()&&(h.enable(h.SCISSOR_TEST),h.scissor(0,0,f[0]*g,f[1]*g),e.La(c,d.center,d.resolution,d.rotation,f,g,b.opacity,b.Je?a.skippedFeatureUids:{}),h.disable(h.SCISSOR_TEST))};k.ka=function(){var a=this.f;a&&(ek(a,this.c.f)(),this.f=null);Vt.prototype.ka.call(this)};
k.Ea=function(a,b,c,d,e){if(this.f&&this.o){c=b.viewState;var f=this.a,g={};return this.f.Ea(a,this.c.f,c.center,c.resolution,c.rotation,b.size,b.pixelRatio,this.o.opacity,{},function(a){var b=w(a).toString();if(!(b in g))return g[b]=!0,d.call(e,a,f)})}};k.Ue=function(a,b){if(this.f&&this.o){var c=b.viewState;return jk(this.f,a,this.c.f,c.resolution,c.rotation,b.pixelRatio,this.o.opacity,b.skippedFeatureUids)}return!1};
k.lg=function(a,b,c,d){a=Gh(b.pixelToCoordinateTransform,a.slice());if(this.Ue(a,b))return c.call(d,this.a,null)};k.Hi=function(){zt(this)};
k.ng=function(a,b,c){function d(a){var b=a.Lc();if(b)var c=b.call(a,m);else(b=e.f)&&(c=b(a,m));if(c){if(c){b=!1;if(Array.isArray(c))for(var d=c.length-1;0<=d;--d)b=Mt(q,a,c[d],Lt(m,n),this.Hi,this)||b;else b=Mt(q,a,c,Lt(m,n),this.Hi,this)||b;a=b}else a=!1;this.l=this.l||a}}var e=this.a;b=e.ha();Ct(a.attributions,b.j);Dt(a,b);var f=a.viewHints[0],g=a.viewHints[1],h=e.T,l=e.na;if(!this.l&&!h&&f||!l&&g)return!0;var g=a.extent,h=a.viewState,f=h.projection,m=h.resolution,n=a.pixelRatio,h=e.i,p=e.c,l=e.get(Pt);
void 0===l&&(l=Kt);g=Qa(g,p*m);if(!this.l&&this.I==m&&this.R==h&&this.B==l&&Va(this.D,g))return!0;this.f&&a.postRenderFunctions.push(ek(this.f,c));this.l=!1;var q=new dk(.5*m/n,g,e.c);b.Yd(g,m,f);if(l){var r=[];b.$b(g,function(a){r.push(a)},this);r.sort(l);r.forEach(d,this)}else b.$b(g,d,this);fk(q,c);this.I=m;this.R=h;this.B=l;this.D=g;this.f=q;return!0};function T(a){a=a?a:{};var b=tb({},a);delete b.style;delete b.renderBuffer;delete b.updateWhileAnimating;delete b.updateWhileInteracting;wh.call(this,b);this.c=void 0!==a.renderBuffer?a.renderBuffer:100;this.u=null;this.f=void 0;this.g(a.style);this.T=void 0!==a.updateWhileAnimating?a.updateWhileAnimating:!1;this.na=void 0!==a.updateWhileInteracting?a.updateWhileInteracting:!1}v(T,wh);T.prototype.Fd=function(a){var b=null,c=a.U();"canvas"===c?b=new Ot(this):"webgl"===c&&(b=new Yt(a,this));return b};
T.prototype.D=function(){return this.u};T.prototype.C=function(){return this.f};T.prototype.g=function(a){this.u=void 0!==a?a:fl;this.f=null===a?void 0:dl(this.u);this.s()};var Pt="renderOrder";function Zt(){return[[-Infinity,-Infinity,Infinity,Infinity]]};function $t(a){Tc.call(this);this.c=Tb(a.projection);this.j=au(a.attributions);this.D=a.logo;this.na=void 0!==a.state?a.state:"ready";this.u=void 0!==a.wrapX?a.wrapX:!1}v($t,Tc);function au(a){if("string"===typeof a)return[new Ac({html:a})];if(a instanceof Ac)return[a];if(Array.isArray(a)){for(var b=a.length,c=Array(b),d=0;d<b;d++){var e=a[d];c[d]="string"===typeof e?new Ac({html:e}):e}return c}return null}k=$t.prototype;k.Ea=ua;k.ya=function(){return this.j};k.xa=function(){return this.D};k.za=function(){return this.c};
k.getState=function(){return this.na};k.sa=function(){this.s()};k.ua=function(a){this.j=au(a);this.s()};function bu(a,b){a.na=b;a.s()};function U(a){a=a||{};$t.call(this,{attributions:a.attributions,logo:a.logo,projection:void 0,state:"ready",wrapX:void 0!==a.wrapX?a.wrapX:!0});this.B=ua;this.C=a.format;this.T=void 0==a.overlaps?!0:a.overlaps;this.I=a.url;a.loader?this.B=a.loader:void 0!==this.I&&(xa(this.C,7),this.B=Dl(this.I,this.C));this.fa=a.strategy?a.strategy:Zt;var b=void 0!==a.useSpatialIndex?a.useSpatialIndex:!0;this.a=b?new Gj:null;this.R=new Gj;this.g={};this.o={};this.l={};this.v={};this.f=null;if(a.features instanceof
Yc){var c=a.features;var d=c.a}else Array.isArray(a.features)&&(d=a.features);b||c||(c=new Yc(d));d&&cu(this,d);c&&du(this,c)}v(U,$t);k=U.prototype;k.yb=function(a){var b=w(a).toString();if(eu(this,b,a)){fu(this,b,a);var c=a.V();c?(b=c.G(),this.a&&this.a.Ca(b,a)):this.g[b]=a;this.b(new gu("addfeature",a))}this.s()};function fu(a,b,c){a.v[b]=[y(c,"change",a.Oi,a),y(c,"propertychange",a.Oi,a)]}
function eu(a,b,c){var d=!0,e=c.a;void 0!==e?e.toString()in a.o?d=!1:a.o[e.toString()]=c:(xa(!(b in a.l),30),a.l[b]=c);return d}k.cd=function(a){cu(this,a);this.s()};function cu(a,b){var c,d=[],e=[],f=[];var g=0;for(c=b.length;g<c;g++){var h=b[g];var l=w(h).toString();eu(a,l,h)&&e.push(h)}g=0;for(c=e.length;g<c;g++)h=e[g],l=w(h).toString(),fu(a,l,h),(b=h.V())?(l=b.G(),d.push(l),f.push(h)):a.g[l]=h;a.a&&a.a.load(d,f);g=0;for(c=e.length;g<c;g++)a.b(new gu("addfeature",e[g]))}
function du(a,b){var c=!1;y(a,"addfeature",function(a){c||(c=!0,b.push(a.feature),c=!1)});y(a,"removefeature",function(a){c||(c=!0,b.remove(a.feature),c=!1)});y(b,"add",function(a){c||(c=!0,this.yb(a.element),c=!1)},a);y(b,"remove",function(a){c||(c=!0,this.Gb(a.element),c=!1)},a);a.f=b}
k.clear=function(a){if(a){for(var b in this.v)this.v[b].forEach(Ec);this.f||(this.v={},this.o={},this.l={})}else if(this.a){this.a.forEach(this.Ig,this);for(var c in this.g)this.Ig(this.g[c])}this.f&&this.f.clear();this.a&&this.a.clear();this.R.clear();this.g={};this.b(new gu("clear"));this.s()};k.sh=function(a,b){if(this.a)return this.a.forEach(a,b);if(this.f)return this.f.forEach(a,b)};function hu(a,b,c){a.$b([b[0],b[1],b[0],b[1]],function(a){if(a.V().sb(b))return c.call(void 0,a)})}
k.$b=function(a,b,c){if(this.a)return Lj(this.a,a,b,c);if(this.f)return this.f.forEach(b,c)};k.th=function(a,b,c){return this.$b(a,function(d){if(d.V().Xa(a)&&(d=b.call(c,d)))return d})};k.Ah=function(){return this.f};k.Xe=function(){if(this.f)var a=this.f.a;else this.a&&(a=Ij(this.a),wb(this.g)||la(a,vb(this.g)));return a};k.zh=function(a){var b=[];hu(this,a,function(a){b.push(a)});return b};k.Uf=function(a){return Jj(this.a,a)};
k.vh=function(a,b){var c=a[0],d=a[1],e=null,f=[NaN,NaN],g=Infinity,h=[-Infinity,-Infinity,Infinity,Infinity],l=b?b:mf;Lj(this.a,h,function(a){if(l(a)){var b=a.V(),m=g;g=b.Kb(c,d,f,g);g<m&&(e=a,a=Math.sqrt(g),h[0]=c-a,h[1]=d-a,h[2]=c+a,h[3]=d+a)}});return e};k.G=function(a){return this.a.G(a)};k.yh=function(a){a=this.o[a.toString()];return void 0!==a?a:null};k.Mi=function(){return this.C};k.Ni=function(){return this.I};
k.Oi=function(a){a=a.target;var b=w(a).toString(),c=a.V();c?(c=c.G(),b in this.g?(delete this.g[b],this.a&&this.a.Ca(c,a)):this.a&&Hj(this.a,c,a)):b in this.g||(this.a&&this.a.remove(a),this.g[b]=a);c=a.a;void 0!==c?(c=c.toString(),b in this.l?(delete this.l[b],this.o[c]=a):this.o[c]!==a&&(iu(this,a),this.o[c]=a)):b in this.l||(iu(this,a),this.l[b]=a);this.s();this.b(new gu("changefeature",a))};
k.Yd=function(a,b,c){var d=this.R;a=this.fa(a,b);var e;var f=0;for(e=a.length;f<e;++f){var g=a[f];Lj(d,g,function(a){return Va(a.extent,g)})||(this.B.call(this,g,b,c),d.Ca(g,{extent:g.slice()}))}};k.Gb=function(a){var b=w(a).toString();b in this.g?delete this.g[b]:this.a&&this.a.remove(a);this.Ig(a);this.s()};k.Ig=function(a){var b=w(a).toString();this.v[b].forEach(Ec);delete this.v[b];var c=a.a;void 0!==c?delete this.o[c.toString()]:delete this.l[b];this.b(new gu("removefeature",a))};
function iu(a,b){for(var c in a.o)if(a.o[c]===b){delete a.o[c];break}}function gu(a,b){Oc.call(this,a);this.feature=b}v(gu,Oc);function ju(a){Dg.call(this,{handleDownEvent:ku,handleEvent:lu,handleUpEvent:mu});this.T=!1;this.fa=null;this.u=!1;this.Yb=a.source?a.source:null;this.$a=a.features?a.features:null;this.wk=a.snapTolerance?a.snapTolerance:12;this.R=a.type;this.g=nu(this.R);this.Sa=a.minPoints?a.minPoints:this.g===ou?3:2;this.va=a.maxPoints?a.maxPoints:Infinity;this.Cf=a.finishCondition?a.finishCondition:mf;var b=a.geometryFunction;if(!b)if("Circle"===this.R)b=function(a,b){b=b?b:new ys([NaN,NaN]);b.Ng(a[0],Math.sqrt(hf(a[0],
a[1])));return b};else{var c,d=this.g;d===pu?c=C:d===qu?c=O:d===ou&&(c=D);b=function(a,b){b?d===ou?b.ma([a[0].concat([a[0][0]])]):b.ma(a):b=new c(a);return b}}this.Za=b;this.I=this.C=this.a=this.B=this.j=this.l=null;this.ad=a.clickTolerance?a.clickTolerance*a.clickTolerance:36;this.pa=new T({source:new U({useSpatialIndex:!1,wrapX:a.wrapX?a.wrapX:!1}),style:a.style?a.style:ru()});this.xb=a.geometryName;this.vk=a.condition?a.condition:xg;this.Df=a.freehand?mf:a.freehandCondition?a.freehandCondition:
yg;y(this,Vc("active"),this.ri,this)}v(ju,Dg);function ru(){var a=gl();return function(b){return a[b.V().U()]}}k=ju.prototype;k.setMap=function(a){Dg.prototype.setMap.call(this,a);this.ri()};function lu(a){this.u=this.g!==pu&&this.Df(a);var b=!this.u;this.u&&"pointerdrag"===a.type&&null!==this.j?(su(this,a),b=!1):"pointermove"===a.type?b=tu(this,a):"dblclick"===a.type&&(b=!1);return Eg.call(this,a)&&b}
function ku(a){this.T=!this.u;return this.u?(this.fa=a.pixel,this.l||uu(this,a),!0):this.vk(a)?(this.fa=a.pixel,!0):!1}function mu(a){var b=!0;tu(this,a);var c=this.g===vu;this.T?(this.l?this.u||c?this.Pd():wu(this,a)?this.Cf(a)&&this.Pd():su(this,a):(uu(this,a),this.g===pu&&this.Pd()),b=!1):this.u&&(this.l=null,xu(this));return b}
function tu(a,b){if(a.fa&&(!a.u&&a.T||a.u&&!a.T)){var c=a.fa,d=b.pixel,e=c[0]-d[0],c=c[1]-d[1],e=e*e+c*c;a.T=a.u?e>a.ad:e<=a.ad}a.l?(e=b.coordinate,c=a.j.V(),a.g===pu?d=a.a:a.g===ou?(d=a.a[0],d=d[d.length-1],wu(a,b)&&(e=a.l.slice())):(d=a.a,d=d[d.length-1]),d[0]=e[0],d[1]=e[1],a.Za(a.a,c),a.B&&a.B.V().ma(e),c instanceof D&&a.g!==ou?(a.C||(a.C=new H(new O(null))),e=c.Ch(0),b=a.C.V(),b.ba(e.ja,e.ga())):a.I&&(b=a.C.V(),b.ma(a.I)),yu(a)):(b=b.coordinate.slice(),a.B?a.B.V().ma(b):(a.B=new H(new C(b)),
yu(a)));return!0}function wu(a,b){var c=!1;if(a.j){var d=!1,e=[a.l];a.g===qu?d=a.a.length>a.Sa:a.g===ou&&(d=a.a[0].length>a.Sa,e=[a.a[0][0],a.a[0][a.a[0].length-2]]);if(d)for(var d=b.map,f=0,g=e.length;f<g;f++){var h=e[f],l=d.Ja(h),m=b.pixel,c=m[0]-l[0],l=m[1]-l[1];if(c=Math.sqrt(c*c+l*l)<=(a.u?1:a.wk)){a.l=h;break}}}return c}
function uu(a,b){b=b.coordinate;a.l=b;a.g===pu?a.a=b.slice():a.g===ou?(a.a=[[b.slice(),b.slice()]],a.I=a.a[0]):(a.a=[b.slice(),b.slice()],a.g===vu&&(a.I=a.a));a.I&&(a.C=new H(new O(a.I)));b=a.Za(a.a);a.j=new H;a.xb&&a.j.Tc(a.xb);a.j.Ra(b);yu(a);a.b(new zu("drawstart",a.j))}
function su(a,b){b=b.coordinate;var c=a.j.V(),d;if(a.g===qu){a.l=b.slice();var e=a.a;e.length>=a.va&&(a.u?e.pop():d=!0);e.push(b.slice());a.Za(e,c)}else a.g===ou&&(e=a.a[0],e.length>=a.va&&(a.u?e.pop():d=!0),e.push(b.slice()),d&&(a.l=e[0]),a.Za(a.a,c));yu(a);d&&a.Pd()}
k.Op=function(){if(this.j){var a=this.j.V();if(this.g===qu){var b=this.a;b.splice(-2,1);this.Za(b,a);2<=b.length&&(this.l=b[b.length-2].slice())}else if(this.g===ou){b=this.a[0];b.splice(-2,1);var c=this.C.V();c.ma(b);this.Za(this.a,a)}0===b.length&&(this.l=null);yu(this)}};
k.Pd=function(){var a=xu(this),b=this.a,c=a.V();this.g===qu?(b.pop(),this.Za(b,c)):this.g===ou&&(b[0].pop(),this.Za(b,c),b=c.X());"MultiPoint"===this.R?a.Ra(new Q([b])):"MultiLineString"===this.R?a.Ra(new P([b])):"MultiPolygon"===this.R&&a.Ra(new R([b]));this.b(new zu("drawend",a));this.$a&&this.$a.push(a);this.Yb&&this.Yb.yb(a)};function xu(a){a.l=null;var b=a.j;b&&(a.j=null,a.B=null,a.C=null,a.pa.ha().clear(!0));return b}
k.vn=function(a){var b=a.V();this.j=a;this.a=b.X();a=this.a[this.a.length-1];this.l=a.slice();this.a.push(a.slice());yu(this);this.b(new zu("drawstart",this.j))};k.Xc=nf;function yu(a){var b=[];a.j&&b.push(a.j);a.C&&b.push(a.C);a.B&&b.push(a.B);a=a.pa.ha();a.clear(!0);a.cd(b)}k.ri=function(){var a=this.v,b=this.c();a&&b||xu(this);this.pa.setMap(b?a:null)};
function nu(a){var b;"Point"===a||"MultiPoint"===a?b=pu:"LineString"===a||"MultiLineString"===a?b=qu:"Polygon"===a||"MultiPolygon"===a?b=ou:"Circle"===a&&(b=vu);return b}var pu="Point",qu="LineString",ou="Polygon",vu="Circle";function zu(a,b){Oc.call(this,a);this.feature=b}v(zu,Oc);function Au(a){this.a=this.j=null;this.C=!1;this.B=this.l=null;a||(a={});a.extent&&this.g(a.extent);Dg.call(this,{handleDownEvent:Bu,handleDragEvent:Cu,handleEvent:Du,handleUpEvent:Eu});this.u=new T({source:new U({useSpatialIndex:!1,wrapX:!!a.wrapX}),style:a.boxStyle?a.boxStyle:Fu(),updateWhileAnimating:!0,updateWhileInteracting:!0});this.I=new T({source:new U({useSpatialIndex:!1,wrapX:!!a.wrapX}),style:a.pointerStyle?a.pointerStyle:Gu(),updateWhileAnimating:!0,updateWhileInteracting:!0})}v(Au,Dg);
function Du(a){if(!(a instanceof ee))return!0;if("pointermove"==a.type&&!this.D){var b=a.pixel,c=a.map,d=Hu(this,b,c);d||(d=c.Wa(b));Iu(this,d)}Eg.call(this,a);return!1}
function Bu(a){function b(a){var b=null,c=null;a[0]==e[0]?b=e[2]:a[0]==e[2]&&(b=e[0]);a[1]==e[1]?c=e[3]:a[1]==e[3]&&(c=e[1]);return null!==b&&null!==c?[b,c]:null}var c=a.pixel,d=a.map,e=this.G();(a=Hu(this,c,d))&&e?(c=a[0]==e[0]||a[0]==e[2]?a[0]:null,d=a[1]==e[1]||a[1]==e[3]?a[1]:null,null!==c&&null!==d?this.a=Ju(b(a)):null!==c?this.a=Ku(b([c,e[1]]),b([c,e[3]])):null!==d&&(this.a=Ku(b([e[0],d]),b([e[2],d])))):(a=d.Wa(c),this.g([a[0],a[1],a[0],a[1]]),this.a=Ju(a));return!0}
function Cu(a){this.a&&(a=a.coordinate,this.g(this.a(a)),Iu(this,a));return!0}function Eu(){this.a=null;var a=this.G();a&&jb(a)||this.g(null);return!1}function Fu(){var a=gl();return function(){return a.Polygon}}function Gu(){var a=gl();return function(){return a.Point}}function Ju(a){return function(b){return Na([a,b])}}function Ku(a,b){return a[0]==b[0]?function(c){return Na([a,[c[0],b[1]]])}:a[1]==b[1]?function(c){return Na([a,[b[0],c[1]]])}:null}
function Hu(a,b,c){function d(a,b){return kf(e,a)-kf(e,b)}var e=c.Wa(b),f=a.G();if(f){f=[[[f[0],f[1]],[f[0],f[3]]],[[f[0],f[3]],[f[2],f[3]]],[[f[2],f[3]],[f[2],f[1]]],[[f[2],f[1]],[f[0],f[1]]]];f.sort(d);var f=f[0],g=af(e,f),h=c.Ja(g);if(10>=jf(b,h))return b=c.Ja(f[0]),c=c.Ja(f[1]),b=hf(h,b),c=hf(h,c),a.C=10>=Math.sqrt(Math.min(b,c)),a.C&&(g=b>c?f[1]:f[0]),g}return null}function Iu(a,b){var c=a.B;c?c.V().ma(b):(c=new H(new C(b)),a.B=c,a.I.ha().yb(c))}
Au.prototype.setMap=function(a){this.u.setMap(a);this.I.setMap(a);Dg.prototype.setMap.call(this,a)};Au.prototype.G=function(){return this.j};Au.prototype.g=function(a){this.j=a?a:null;var b=this.l;b?a?b.Ra(Yf(a)):b.Ra(void 0):(this.l=b=a?new H(Yf(a)):new H({}),this.u.ha().yb(b));this.b(new Lu(this.j))};function Lu(a){Oc.call(this,Mu);this.b=a}v(Lu,Oc);var Mu="extentchanged";function Nu(a){Dg.call(this,{handleDownEvent:Ou,handleDragEvent:Pu,handleEvent:Qu,handleUpEvent:Ru});this.ad=a.condition?a.condition:Cg;this.$a=function(a){return xg(a)&&wg(a)};this.xb=a.deleteCondition?a.deleteCondition:this.$a;this.Yb=a.insertVertexCondition?a.insertVertexCondition:mf;this.Sa=this.g=null;this.va=[0,0];this.C=this.I=!1;this.a=new Gj;this.fa=void 0!==a.pixelTolerance?a.pixelTolerance:10;this.l=this.pa=!1;this.j=[];this.B=new T({source:new U({useSpatialIndex:!1,wrapX:!!a.wrapX}),style:a.style?
a.style:Su(),updateWhileAnimating:!0,updateWhileInteracting:!0});this.T={Point:this.Dn,LineString:this.ti,LinearRing:this.ti,Polygon:this.En,MultiPoint:this.Bn,MultiLineString:this.An,MultiPolygon:this.Cn,Circle:this.yn,GeometryCollection:this.zn};this.u=a.features;this.u.forEach(this.kg,this);y(this.u,"add",this.wn,this);y(this.u,"remove",this.xn,this);this.R=null}v(Nu,Dg);k=Nu.prototype;
k.kg=function(a){var b=a.V();b&&b.U()in this.T&&this.T[b.U()].call(this,a,b);(b=this.v)&&b.c&&this.c()&&Tu(this,this.va,b);y(a,"change",this.si,this)};function Uu(a,b){a.C||(a.C=!0,a.b(new Vu("modifystart",a.u,b)))}function Wu(a,b){Xu(a,b);a.g&&!a.u.dc()&&(a.B.ha().Gb(a.g),a.g=null);Kc(b,"change",a.si,a)}function Xu(a,b){a=a.a;var c=[];a.forEach(function(a){b===a.feature&&c.push(a)});for(var d=c.length-1;0<=d;--d)a.remove(c[d])}
k.Ha=function(a){this.g&&!a&&(this.B.ha().Gb(this.g),this.g=null);Dg.prototype.Ha.call(this,a)};k.setMap=function(a){this.B.setMap(a);Dg.prototype.setMap.call(this,a)};k.wn=function(a){this.kg(a.element)};k.si=function(a){this.l||(a=a.target,Wu(this,a),this.kg(a))};k.xn=function(a){Wu(this,a.element)};k.Dn=function(a,b){var c=b.X();a={feature:a,geometry:b,la:[c,c]};this.a.Ca(b.G(),a)};
k.Bn=function(a,b){var c=b.X(),d;var e=0;for(d=c.length;e<d;++e){var f=c[e];f={feature:a,geometry:b,depth:[e],index:e,la:[f,f]};this.a.Ca(b.G(),f)}};k.ti=function(a,b){var c=b.X(),d;var e=0;for(d=c.length-1;e<d;++e){var f=c.slice(e,e+2);var g={feature:a,geometry:b,index:e,la:f};this.a.Ca(Na(f),g)}};
k.An=function(a,b){var c=b.X(),d,e;var f=0;for(e=c.length;f<e;++f){var g=c[f];var h=0;for(d=g.length-1;h<d;++h){var l=g.slice(h,h+2);var m={feature:a,geometry:b,depth:[f],index:h,la:l};this.a.Ca(Na(l),m)}}};k.En=function(a,b){var c=b.X(),d,e;var f=0;for(e=c.length;f<e;++f){var g=c[f];var h=0;for(d=g.length-1;h<d;++h){var l=g.slice(h,h+2);var m={feature:a,geometry:b,depth:[f],index:h,la:l};this.a.Ca(Na(l),m)}}};
k.Cn=function(a,b){var c=b.X(),d,e,f;var g=0;for(f=c.length;g<f;++g){var h=c[g];var l=0;for(e=h.length;l<e;++l){var m=h[l];var n=0;for(d=m.length-1;n<d;++n){var p=m.slice(n,n+2);var q={feature:a,geometry:b,depth:[l,g],index:n,la:p};this.a.Ca(Na(p),q)}}}};k.yn=function(a,b){var c=b.wa(),d={feature:a,geometry:b,index:0,la:[c,c]};a={feature:a,geometry:b,index:1,la:[c,c]};d.Pf=a.Pf=[d,a];this.a.Ca(Za(c),d);this.a.Ca(b.G(),a)};
k.zn=function(a,b){var c=b.a;for(b=0;b<c.length;++b)this.T[c[b].U()].call(this,a,c[b])};function Yu(a,b){var c=a.g;c?c.V().ma(b):(c=new H(new C(b)),a.g=c,a.B.ha().yb(c))}function Zu(a,b){return a.index-b.index}
function Ou(a){if(!this.ad(a))return!1;Tu(this,a.pixel,a.map);var b=a.map.Wa(a.pixel);this.j.length=0;this.C=!1;var c=this.g;if(c){var d=[],c=c.V().X(),e=Na([c]),e=Jj(this.a,e),f={};e.sort(Zu);for(var g=0,h=e.length;g<h;++g){var l=e[g],m=l.la,n=w(l.feature),p=l.depth;p&&(n+="-"+p.join("-"));f[n]||(f[n]=Array(2));if("Circle"===l.geometry.U()&&1===l.index)m=$u(b,l),df(m,c)&&!f[n][0]&&(this.j.push([l,0]),f[n][0]=l);else if(df(m[0],c)&&!f[n][0])this.j.push([l,0]),f[n][0]=l;else if(df(m[1],c)&&!f[n][1]){if("LineString"!==
l.geometry.U()&&"MultiLineString"!==l.geometry.U()||!f[n][0]||0!==f[n][0].index)this.j.push([l,1]),f[n][1]=l}else this.Yb(a)&&w(m)in this.Sa&&!f[n][0]&&!f[n][1]&&d.push([l,c])}d.length&&Uu(this,a);for(a=d.length-1;0<=a;--a)this.bm.apply(this,d[a])}return!!this.g}
function Pu(a){this.I=!1;Uu(this,a);a=a.coordinate;for(var b=0,c=this.j.length;b<c;++b){for(var d=this.j[b],e=d[0],f=e.depth,g=e.geometry,h,l=e.la,d=d[1];a.length<g.qa();)a.push(l[d][a.length]);switch(g.U()){case "Point":h=a;l[0]=l[1]=a;break;case "MultiPoint":h=g.X();h[e.index]=a;l[0]=l[1]=a;break;case "LineString":h=g.X();h[e.index+d]=a;l[d]=a;break;case "MultiLineString":h=g.X();h[f[0]][e.index+d]=a;l[d]=a;break;case "Polygon":h=g.X();h[f[0]][e.index+d]=a;l[d]=a;break;case "MultiPolygon":h=g.X();
h[f[1]][f[0]][e.index+d]=a;l[d]=a;break;case "Circle":l[0]=l[1]=a,0===e.index?(this.l=!0,g.ob(a)):(this.l=!0,g.Uc(jf(g.wa(),a))),this.l=!1}h&&(e=g,f=h,this.l=!0,e.ma(f),this.l=!1)}Yu(this,a)}function Ru(a){for(var b,c,d=this.j.length-1;0<=d;--d)if(b=this.j[d][0],c=b.geometry,"Circle"===c.U()){var e=c.wa(),f=b.Pf[0];b=b.Pf[1];f.la[0]=f.la[1]=e;b.la[0]=b.la[1]=e;Hj(this.a,Za(e),f);Hj(this.a,c.G(),b)}else Hj(this.a,Na(b.la),b);this.C&&(this.b(new Vu("modifyend",this.u,a)),this.C=!1);return!1}
function Qu(a){if(!(a instanceof ee))return!0;this.R=a;var b;dg(a.map.Z())[1]||"pointermove"!=a.type||this.D||(this.va=a.pixel,Tu(this,a.pixel,a.map));this.g&&this.xb(a)&&(b="singleclick"==a.type&&this.I?!0:this.hj());"singleclick"==a.type&&(this.I=!1);return Eg.call(this,a)&&!b}
function Tu(a,b,c){function d(a,b){return av(e,a)-av(e,b)}var e=c.Wa(b),f=Qa(Za(e),c.Z().Pa()*a.fa),f=Jj(a.a,f);if(0<f.length){f.sort(d);var g=f[0],h=g.la,l=$u(e,g),m=c.Ja(l),n=jf(b,m);if(n<=a.fa){b={};if("Circle"===g.geometry.U()&&1===g.index)a.pa=!0,Yu(a,l);else for(n=c.Ja(h[0]),g=c.Ja(h[1]),c=hf(m,n),m=hf(m,g),n=Math.sqrt(Math.min(c,m)),a.pa=n<=a.fa,a.pa&&(l=c>m?h[1]:h[0]),Yu(a,l),m=1,c=f.length;m<c;++m)if(l=f[m].la,df(h[0],l[0])&&df(h[1],l[1])||df(h[0],l[1])&&df(h[1],l[0]))b[w(l)]=!0;else break;
b[w(h)]=!0;a.Sa=b;return}}a.g&&(a.B.ha().Gb(a.g),a.g=null)}function av(a,b){var c=b.geometry;return"Circle"===c.U()&&1===b.index?(a=hf(c.wa(),a),c=Math.sqrt(a)-c.pd(),c*c):kf(a,b.la)}function $u(a,b){var c=b.geometry;return"Circle"===c.U()&&1===b.index?c.Ab(a):af(a,b.la)}
k.bm=function(a,b){for(var c=a.la,d=a.feature,e=a.geometry,f=a.depth,g=a.index,h;b.length<e.qa();)b.push(0);switch(e.U()){case "MultiLineString":h=e.X();h[f[0]].splice(g+1,0,b);break;case "Polygon":h=e.X();h[f[0]].splice(g+1,0,b);break;case "MultiPolygon":h=e.X();h[f[1]][f[0]].splice(g+1,0,b);break;case "LineString":h=e.X();h.splice(g+1,0,b);break;default:return}this.l=!0;e.ma(h);this.l=!1;h=this.a;h.remove(a);bv(this,e,g,f,1);a={la:[c[0],b],feature:d,geometry:e,depth:f,index:g};h.Ca(Na(a.la),a);
this.j.push([a,1]);b={la:[b,c[1]],feature:d,geometry:e,depth:f,index:g+1};h.Ca(Na(b.la),b);this.j.push([b,0]);this.I=!0};
k.hj=function(){if(this.R&&"pointerdrag"!=this.R.type){var a=this.R;Uu(this,a);var b=this.j,c={},d,e;for(e=b.length-1;0<=e;--e){var f=b[e];var g=f[0];var h=w(g.feature);g.depth&&(h+="-"+g.depth.join("-"));h in c||(c[h]={});0===f[1]?(c[h].right=g,c[h].index=g.index):1==f[1]&&(c[h].left=g,c[h].index=g.index+1)}for(h in c){var l=c[h].right;var m=c[h].left;e=c[h].index;var n=e-1;g=void 0!==m?m:l;0>n&&(n=0);f=g.geometry;var p=d=f.X();var q=!1;switch(f.U()){case "MultiLineString":2<d[g.depth[0]].length&&
(d[g.depth[0]].splice(e,1),q=!0);break;case "LineString":2<d.length&&(d.splice(e,1),q=!0);break;case "MultiPolygon":p=p[g.depth[1]];case "Polygon":p=p[g.depth[0]],4<p.length&&(e==p.length-1&&(e=0),p.splice(e,1),q=!0,0===e&&(p.pop(),p.push(p[0]),n=p.length-1))}q&&(q=f,this.l=!0,q.ma(d),this.l=!1,d=[],void 0!==m&&(this.a.remove(m),d.push(m.la[0])),void 0!==l&&(this.a.remove(l),d.push(l.la[1])),void 0!==m&&void 0!==l&&(m={depth:g.depth,feature:g.feature,geometry:g.geometry,index:n,la:d},this.a.Ca(Na(m.la),
m)),bv(this,f,e,g.depth,-1),this.g&&(this.B.ha().Gb(this.g),this.g=null),b.length=0)}this.b(new Vu("modifyend",this.u,a));this.C=!1;return!0}return!1};function bv(a,b,c,d,e){Lj(a.a,b.G(),function(a){a.geometry===b&&(void 0===d||void 0===a.depth||pa(a.depth,d))&&a.index>c&&(a.index+=e)})}function Su(){var a=gl();return function(){return a.Point}}function Vu(a,b,c){Oc.call(this,a);this.features=b;this.mapBrowserEvent=c}v(Vu,Oc);function cv(a){ng.call(this,{handleEvent:dv});a=a?a:{};this.C=a.condition?a.condition:wg;this.D=a.addCondition?a.addCondition:nf;this.B=a.removeCondition?a.removeCondition:nf;this.I=a.toggleCondition?a.toggleCondition:yg;this.l=a.multi?a.multi:!1;this.o=a.filter?a.filter:mf;this.j=a.hitTolerance?a.hitTolerance:0;this.g=new T({source:new U({useSpatialIndex:!1,features:a.features,wrapX:a.wrapX}),style:a.style?a.style:ev(),updateWhileAnimating:!0,updateWhileInteracting:!0});if(a.layers)if("function"===
typeof a.layers)a=a.layers;else{var b=a.layers;a=function(a){return ja(b,a)}}else a=mf;this.u=a;this.a={};a=this.g.ha().f;y(a,"add",this.Fn,this);y(a,"remove",this.Jn,this)}v(cv,ng);k=cv.prototype;k.Gn=function(){return this.g.ha().f};k.Hn=function(){return this.j};k.In=function(a){a=w(a);return this.a[a]};
function dv(a){if(!this.C(a))return!0;var b=this.D(a),c=this.B(a),d=this.I(a),e=!b&&!c&&!d,f=a.map,g=this.g.ha().f,h=[],l=[];if(e){ub(this.a);f.we(a.pixel,function(a,b){if(this.o(a,b))return l.push(a),a=w(a),this.a[a]=b,!this.l}.bind(this),{layerFilter:this.u,hitTolerance:this.j});for(e=g.dc()-1;0<=e;--e){var f=g.item(e),m=l.indexOf(f);-1<m?l.splice(m,1):(g.remove(f),h.push(f))}l.length&&g.fg(l)}else{f.we(a.pixel,function(a,e){if(this.o(a,e))return!b&&!d||ja(g.a,a)?(c||d)&&ja(g.a,a)&&(h.push(a),e=
w(a),delete this.a[e]):(l.push(a),a=w(a),this.a[a]=e),!this.l}.bind(this),{layerFilter:this.u,hitTolerance:this.j});for(e=h.length-1;0<=e;--e)g.remove(h[e]);g.fg(l)}(0<l.length||0<h.length)&&this.b(new fv(gv,l,h,a));return vg(a)}k.Kn=function(a){this.j=a};k.setMap=function(a){var b=this.v,c=this.g.ha().f;b&&c.forEach(b.Cj,b);ng.prototype.setMap.call(this,a);this.g.setMap(a);a&&c.forEach(a.xj,a)};
function ev(){var a=gl();la(a.Polygon,a.LineString);la(a.GeometryCollection,a.LineString);return function(b){return b.V()?a[b.V().U()]:null}}k.Fn=function(a){var b=this.v;b&&b.xj(a.element)};k.Jn=function(a){var b=this.v;b&&b.Cj(a.element)};function fv(a,b,c,d){Oc.call(this,a);this.selected=b;this.deselected=c;this.mapBrowserEvent=d}v(fv,Oc);var gv="select";function hv(a){Dg.call(this,{handleEvent:iv,handleDownEvent:mf,handleUpEvent:jv});a=a?a:{};this.l=a.source?a.source:null;this.R=void 0!==a.vertex?a.vertex:!0;this.C=void 0!==a.edge?a.edge:!0;this.j=a.features?a.features:null;this.pa=[];this.B={};this.T={};this.u={};this.I=null;this.g=void 0!==a.pixelTolerance?a.pixelTolerance:10;this.va=kv.bind(this);this.a=new Gj;this.fa={Point:this.Rn,LineString:this.wi,LinearRing:this.wi,Polygon:this.Sn,MultiPoint:this.Pn,MultiLineString:this.On,MultiPolygon:this.Qn,
GeometryCollection:this.Nn,Circle:this.Mn}}v(hv,Dg);k=hv.prototype;k.yb=function(a,b){b=void 0!==b?b:!0;var c=w(a),d=a.V();if(d){var e=this.fa[d.U()];e&&(this.T[c]=d.G(Oa()),e.call(this,a,d))}b&&(this.B[c]=y(a,"change",this.Ln,this))};k.Ak=function(a){this.yb(a)};k.Bk=function(a){this.Gb(a)};k.ui=function(a){if(a instanceof gu)var b=a.feature;else a instanceof bd&&(b=a.element);this.yb(b)};k.vi=function(a){if(a instanceof gu)var b=a.feature;else a instanceof bd&&(b=a.element);this.Gb(b)};
k.Ln=function(a){a=a.target;if(this.D){var b=w(a);b in this.u||(this.u[b]=a)}else this.Dj(a)};k.Gb=function(a,b){b=void 0!==b?b:!0;var c=w(a),d=this.T[c];if(d){var e=this.a,f=[];Lj(e,d,function(b){a===b.feature&&f.push(b)});for(d=f.length-1;0<=d;--d)e.remove(f[d])}b&&(Ec(this.B[c]),delete this.B[c])};
k.setMap=function(a){var b=this.v,c=this.pa,d;this.j?d=this.j:this.l&&(d=this.l.Xe());b&&(c.forEach(Ec),c.length=0,d.forEach(this.Bk,this));Dg.prototype.setMap.call(this,a);a&&(this.j?c.push(y(this.j,"add",this.ui,this),y(this.j,"remove",this.vi,this)):this.l&&c.push(y(this.l,"addfeature",this.ui,this),y(this.l,"removefeature",this.vi,this)),d.forEach(this.Ak,this))};k.Xc=nf;
function lv(a,b,c,d){var e=d.Wa([b[0]-a.g,b[1]+a.g]),f=d.Wa([b[0]+a.g,b[1]-a.g]),e=Na([e,f]),g=Jj(a.a,e);a.R&&!a.C&&(g=g.filter(function(a){return"Circle"!==a.feature.V().U()}));var h=!1,e=!1,l=f=null;if(0<g.length){a.I=c;g.sort(a.va);var m=g[0].la,h="Circle"===g[0].feature.V().U();if(a.R&&!a.C){if(c=d.Ja(m[0]),h=d.Ja(m[1]),c=hf(b,c),b=hf(b,h),h=Math.sqrt(Math.min(c,b)),h=h<=a.g)e=!0,f=c>b?m[1]:m[0],l=d.Ja(f)}else a.C&&(f=h?$e(c,g[0].feature.V()):af(c,m),l=d.Ja(f),jf(b,l)<=a.g&&(e=!0,a.R&&!h&&(c=
d.Ja(m[0]),h=d.Ja(m[1]),c=hf(l,c),b=hf(l,h),h=Math.sqrt(Math.min(c,b)),h=h<=a.g)))&&(f=c>b?m[1]:m[0],l=d.Ja(f));e&&(l=[Math.round(l[0]),Math.round(l[1])])}return{nq:e,vertex:f,wq:l}}k.Dj=function(a){this.Gb(a,!1);this.yb(a,!1)};k.Mn=function(a,b){b=Zf(b).X()[0];var c;var d=0;for(c=b.length-1;d<c;++d){var e=b.slice(d,d+2);var f={feature:a,la:e};this.a.Ca(Na(e),f)}};k.Nn=function(a,b){var c=b.a;for(b=0;b<c.length;++b){var d=this.fa[c[b].U()];d&&d.call(this,a,c[b])}};
k.wi=function(a,b){b=b.X();var c;var d=0;for(c=b.length-1;d<c;++d){var e=b.slice(d,d+2);var f={feature:a,la:e};this.a.Ca(Na(e),f)}};k.On=function(a,b){b=b.X();var c,d;var e=0;for(d=b.length;e<d;++e){var f=b[e];var g=0;for(c=f.length-1;g<c;++g){var h=f.slice(g,g+2);var l={feature:a,la:h};this.a.Ca(Na(h),l)}}};k.Pn=function(a,b){var c=b.X(),d;var e=0;for(d=c.length;e<d;++e){var f=c[e];f={feature:a,la:[f,f]};this.a.Ca(b.G(),f)}};
k.Qn=function(a,b){b=b.X();var c,d,e;var f=0;for(e=b.length;f<e;++f){var g=b[f];var h=0;for(d=g.length;h<d;++h){var l=g[h];var m=0;for(c=l.length-1;m<c;++m){var n=l.slice(m,m+2);var p={feature:a,la:n};this.a.Ca(Na(n),p)}}}};k.Rn=function(a,b){var c=b.X();a={feature:a,la:[c,c]};this.a.Ca(b.G(),a)};k.Sn=function(a,b){b=b.X();var c,d;var e=0;for(d=b.length;e<d;++e){var f=b[e];var g=0;for(c=f.length-1;g<c;++g){var h=f.slice(g,g+2);var l={feature:a,la:h};this.a.Ca(Na(h),l)}}};
function iv(a){var b=lv(this,a.pixel,a.coordinate,a.map);b.nq&&(a.coordinate=b.vertex.slice(0,2),a.pixel=b.wq);return Eg.call(this,a)}function jv(){var a=vb(this.u);a.length&&(a.forEach(this.Dj,this),this.u={});return!1}function kv(a,b){return kf(this.I,a.la)-kf(this.I,b.la)};function mv(a){Dg.call(this,{handleDownEvent:nv,handleDragEvent:ov,handleMoveEvent:pv,handleUpEvent:qv});a=a?a:{};this.a=null;this.j=void 0!==a.features?a.features:null;if(a.layers)if("function"===typeof a.layers)var b=a.layers;else{var c=a.layers;b=function(a){return ja(c,a)}}else b=mf;this.C=b;this.l=a.hitTolerance?a.hitTolerance:0;this.g=null;y(this,Vc("active"),this.u,this)}v(mv,Dg);
function nv(a){this.g=rv(this,a.pixel,a.map);if(!this.a&&this.g){this.a=a.coordinate;pv.call(this,a);var b=this.j||new Yc([this.g]);this.b(new sv("translatestart",b,a.coordinate));return!0}return!1}function qv(a){if(this.a){this.a=null;pv.call(this,a);var b=this.j||new Yc([this.g]);this.b(new sv("translateend",b,a.coordinate));return!0}return!1}
function ov(a){if(this.a){a=a.coordinate;var b=a[0]-this.a[0],c=a[1]-this.a[1],d=this.j||new Yc([this.g]);d.forEach(function(a){var d=a.V();d.translate(b,c);a.Ra(d)});this.a=a;this.b(new sv("translating",d,a))}}function pv(a){var b=a.map.a;rv(this,a.pixel,a.map)?(b.classList.remove(this.a?"ol-grab":"ol-grabbing"),b.classList.add(this.a?"ol-grabbing":"ol-grab")):b.classList.remove("ol-grab","ol-grabbing")}
function rv(a,b,c){return c.we(b,function(a){if(!this.j||ja(this.j.a,a))return a}.bind(a),{layerFilter:a.C,hitTolerance:a.l})}mv.prototype.B=function(){return this.l};mv.prototype.I=function(a){this.l=a};mv.prototype.setMap=function(a){var b=this.v;Dg.prototype.setMap.call(this,a);tv(this,b)};mv.prototype.u=function(){tv(this,null)};function tv(a,b){var c=a.v;a=a.c();c&&a||(c||(c=b),c.a.classList.remove("ol-grab","ol-grabbing"))}
function sv(a,b,c){Oc.call(this,a);this.features=b;this.coordinate=c}v(sv,Oc);function V(a){a=a?a:{};var b=tb({},a);delete b.gradient;delete b.radius;delete b.blur;delete b.shadow;delete b.weight;T.call(this,b);this.j=null;this.R=void 0!==a.shadow?a.shadow:250;this.I=void 0;this.B=null;y(this,Vc(uv),this.Bl,this);this.pj(a.gradient?a.gradient:vv);this.jj(void 0!==a.blur?a.blur:15);this.Uc(void 0!==a.radius?a.radius:8);y(this,Vc(wv),this.cg,this);y(this,Vc(xv),this.cg,this);this.cg();var c=a.weight?a.weight:"weight",d;"string"===typeof c?d=function(a){return a.get(c)}:d=c;this.g(function(a){a=
d(a);a=void 0!==a?Ca(a,0,1):1;var b=255*a|0,c=this.B[b];c||(c=[new bl({image:new eo({opacity:a,src:this.I})})],this.B[b]=c);return c}.bind(this));this.set(Pt,null);y(this,"render",this.Sl,this)}v(V,T);var vv=["#00f","#0ff","#0f0","#ff0","#f00"];k=V.prototype;k.uh=function(){return this.get(wv)};k.Bh=function(){return this.get(uv)};k.yi=function(){return this.get(xv)};
k.Bl=function(){for(var a=this.Bh(),b=jd(1,256),c=b.createLinearGradient(0,0,1,256),d=1/(a.length-1),e=0,f=a.length;e<f;++e)c.addColorStop(e*d,a[e]);b.fillStyle=c;b.fillRect(0,0,1,256);this.j=b.getImageData(0,0,1,256).data};k.cg=function(){var a=this.yi(),b=this.uh(),c=a+b+1,d=2*c,d=jd(d,d);d.shadowOffsetX=d.shadowOffsetY=this.R;d.shadowBlur=b;d.shadowColor="#000";d.beginPath();b=c-this.R;d.arc(b,b,a,0,2*Math.PI,!0);d.fill();this.I=d.canvas.toDataURL();this.B=Array(256);this.s()};
k.Sl=function(a){a=a.context;var b=a.canvas,b=a.getImageData(0,0,b.width,b.height),c=b.data,d,e;var f=0;for(d=c.length;f<d;f+=4)if(e=4*c[f+3])c[f]=this.j[e],c[f+1]=this.j[e+1],c[f+2]=this.j[e+2];a.putImageData(b,0,0)};k.jj=function(a){this.set(wv,a)};k.pj=function(a){this.set(uv,a)};k.Uc=function(a){this.set(xv,a)};var wv="blur",uv="gradient",xv="radius";function yv(a){Gt.call(this,a);this.v=Bh();this.j=null}v(yv,Gt);yv.prototype.S=function(a,b,c){It(this,"precompose",c,a,void 0);var d=this.Y();if(d){var e=b.extent,f=void 0!==e&&!Va(e,a.extent)&&qb(e,a.extent);f&&Ht(c,a,e);var e=this.C(),g=c.globalAlpha;c.globalAlpha=b.opacity;c.drawImage(d,0,0,+d.width,+d.height,Math.round(e[4]),Math.round(e[5]),Math.round(d.width*e[0]),Math.round(d.height*e[3]));c.globalAlpha=g;f&&c.restore()}this.ef(c,a,b)};
yv.prototype.Ea=function(a,b,c,d,e){var f=this.a;return f.ha().Ea(a,b.viewState.resolution,b.viewState.rotation,c,b.skippedFeatureUids,function(a){return d.call(e,a,f)})};
yv.prototype.u=function(a,b,c,d){if(this.Y()){if(this.a.ha().Ea!==ua)return Gt.prototype.u.apply(this,arguments);var e=Gh(this.v,a.slice());gf(e,b.viewState.resolution/this.f);this.j||(this.j=jd(1,1));this.j.clearRect(0,0,1,1);this.j.drawImage(this.Y(),e[0],e[1],1,1,0,0,1,1);e=this.j.getImageData(0,0,1,1).data;if(0<e[3])return c.call(d,this.a,e)}};function zv(a){yv.call(this,a);this.M=null;this.c=Bh()}v(zv,yv);zv.prototype.Y=function(){return this.M?this.M.Y():null};zv.prototype.C=function(){return this.c};
zv.prototype.sd=function(a,b){var c=a.pixelRatio,d=a.size,e=a.viewState,f=e.center,g=e.resolution,h=this.a.ha(),l=a.viewHints,m=a.extent;void 0!==b.extent&&(m=pb(m,b.extent));l[0]||l[1]||kb(m)||(b=h.Y(m,g,c,e.projection))&&At(this,b)&&(this.M=b);if(this.M){b=this.M;var l=b.G(),m=b.resolution,e=b.a,n=c*m/(g*e),l=Kh(this.c,c*d[0]/2,c*d[1]/2,n,n,0,e*(l[0]-f[0])/m,e*(f[1]-l[3])/m);Kh(this.v,c*d[0]/2-l[4],c*d[1]/2-l[5],c/g,-c/g,0,-f[0],-f[1]);Ct(a.attributions,b.f);Dt(a,h);this.f=g*c/e}return!!this.M};function Av(a,b,c,d){var e=gc(c,b,a);c=Sb(b,d,c);b=b.sc();void 0!==b&&(c*=b);b=a.sc();void 0!==b&&(c/=b);a=Sb(a,c,e)/c;isFinite(a)&&0<a&&(c/=a);return c}function Bv(a,b,c,d){a=c-a;b=d-b;var e=Math.sqrt(a*a+b*b);return[Math.round(c+a/e),Math.round(d+b/e)]}
function Cv(a,b,c,d,e,f,g,h,l,m,n){var p=jd(Math.round(c*a),Math.round(c*b));if(!l.length)return p.canvas;p.scale(c,c);var q=Oa();l.forEach(function(a){cb(q,a.extent)});var r=jd(Math.round(c*lb(q)/d),Math.round(c*mb(q)/d)),u=c/d;l.forEach(function(a){r.drawImage(a.image,m,m,a.image.width-2*m,a.image.height-2*m,(a.extent[0]-q[0])*u,-(a.extent[3]-q[3])*u,lb(a.extent)*u,mb(a.extent)*u)});var x=ib(g);h.c.forEach(function(a){var b=a.source,e=a.target,g=b[1][0],h=b[1][1],l=b[2][0],m=b[2][1];a=(e[0][0]-
x[0])/f;var n=-(e[0][1]-x[1])/f,u=(e[1][0]-x[0])/f,B=-(e[1][1]-x[1])/f,da=(e[2][0]-x[0])/f,fb=-(e[2][1]-x[1])/f,e=b[0][0],b=b[0][1],g=g-e,h=h-b,l=l-e,m=m-b;a:{g=[[g,h,0,0,u-a],[l,m,0,0,da-a],[0,0,g,h,B-n],[0,0,l,m,fb-n]];h=g.length;for(l=0;l<h;l++){for(var m=l,ca=Math.abs(g[l][l]),Ub=l+1;Ub<h;Ub++){var uc=Math.abs(g[Ub][l]);uc>ca&&(ca=uc,m=Ub)}if(!ca){g=null;break a}ca=g[m];g[m]=g[l];g[l]=ca;for(m=l+1;m<h;m++)for(ca=-g[m][l]/g[l][l],Ub=l;Ub<h+1;Ub++)g[m][Ub]=l==Ub?0:g[m][Ub]+ca*g[l][Ub]}l=Array(h);
for(m=h-1;0<=m;m--)for(l[m]=g[m][h]/g[m][m],ca=m-1;0<=ca;ca--)g[ca][h]-=g[ca][m]*l[m];g=l}g&&(p.save(),p.beginPath(),l=(a+u+da)/3,m=(n+B+fb)/3,h=Bv(l,m,a,n),u=Bv(l,m,u,B),da=Bv(l,m,da,fb),p.moveTo(u[0],u[1]),p.lineTo(h[0],h[1]),p.lineTo(da[0],da[1]),p.clip(),p.transform(g[0],g[2],g[1],g[3],a,n),p.translate(q[0]-e,q[3]-b),p.scale(d/c,-d/c),p.drawImage(r.canvas,0,0),p.restore())});n&&(p.save(),p.strokeStyle="black",p.lineWidth=1,h.c.forEach(function(a){var b=a.target;a=(b[0][0]-x[0])/f;var c=-(b[0][1]-
x[1])/f,d=(b[1][0]-x[0])/f,e=-(b[1][1]-x[1])/f,g=(b[2][0]-x[0])/f,b=-(b[2][1]-x[1])/f;p.beginPath();p.moveTo(d,e);p.lineTo(a,c);p.lineTo(g,b);p.closePath();p.stroke()}),p.restore());return p.canvas};function Dv(a,b,c,d,e){this.i=a;this.f=b;var f={},g=ec(this.f,this.i);this.a=function(a){var b=a[0]+"/"+a[1];f[b]||(f[b]=g(a));return f[b]};this.g=d;this.v=e*e;this.c=[];this.o=!1;this.l=this.i.i&&!!d&&!!this.i.G()&&lb(d)==lb(this.i.G());this.b=this.i.G()?lb(this.i.G()):null;this.j=this.f.G()?lb(this.f.G()):null;a=ib(c);b=hb(c);d=gb(c);c=eb(c);e=this.a(a);var h=this.a(b),l=this.a(d),m=this.a(c);Ev(this,a,b,d,c,e,h,l,m,10);if(this.o){var n=Infinity;this.c.forEach(function(a){n=Math.min(n,a.source[0][0],
a.source[1][0],a.source[2][0])});this.c.forEach(function(a){if(Math.max(a.source[0][0],a.source[1][0],a.source[2][0])-n>this.b/2){var b=[[a.source[0][0],a.source[0][1]],[a.source[1][0],a.source[1][1]],[a.source[2][0],a.source[2][1]]];b[0][0]-n>this.b/2&&(b[0][0]-=this.b);b[1][0]-n>this.b/2&&(b[1][0]-=this.b);b[2][0]-n>this.b/2&&(b[2][0]-=this.b);Math.max(b[0][0],b[1][0],b[2][0])-Math.min(b[0][0],b[1][0],b[2][0])<this.b/2&&(a.source=b)}},this)}f={}}
function Ev(a,b,c,d,e,f,g,h,l,m){var n=Na([f,g,h,l]),p=a.b?lb(n)/a.b:null,q=a.b,r=a.i.i&&.5<p&&1>p,u=!1;if(0<m){if(a.f.c&&a.j)var x=Na([b,c,d,e]),u=u|.25<lb(x)/a.j;!r&&a.i.c&&p&&(u|=.25<p)}if(u||!a.g||qb(n,a.g)){if(!(u||isFinite(f[0])&&isFinite(f[1])&&isFinite(g[0])&&isFinite(g[1])&&isFinite(h[0])&&isFinite(h[1])&&isFinite(l[0])&&isFinite(l[1])))if(0<m)u=!0;else return;if(0<m&&(u||(n=a.a([(b[0]+d[0])/2,(b[1]+d[1])/2]),q=r?(Ia(f[0],q)+Ia(h[0],q))/2-Ia(n[0],q):(f[0]+h[0])/2-n[0],n=(f[1]+h[1])/2-n[1],
u=q*q+n*n>a.v),u)){Math.abs(b[0]-d[0])<=Math.abs(b[1]-d[1])?(r=[(c[0]+d[0])/2,(c[1]+d[1])/2],q=a.a(r),n=[(e[0]+b[0])/2,(e[1]+b[1])/2],p=a.a(n),Ev(a,b,c,r,n,f,g,q,p,m-1),Ev(a,n,r,d,e,p,q,h,l,m-1)):(r=[(b[0]+c[0])/2,(b[1]+c[1])/2],q=a.a(r),n=[(d[0]+e[0])/2,(d[1]+e[1])/2],p=a.a(n),Ev(a,b,r,n,e,f,q,p,l,m-1),Ev(a,r,c,d,n,q,g,h,p,m-1));return}if(r){if(!a.l)return;a.o=!0}a.c.push({source:[f,h,l],target:[b,d,e]});a.c.push({source:[f,g,h],target:[b,c,d]})}}
function Fv(a){var b=Oa();a.c.forEach(function(a){a=a.source;Pa(b,a[0]);Pa(b,a[1]);Pa(b,a[2])});return b};function Gv(a,b,c,d,e,f){this.v=b;this.l=a.G();var g=b.G(),h=g?pb(c,g):c,g=Av(a,b,nb(h),d);this.j=new Dv(a,b,h,this.l,.5*g);this.c=d;this.i=c;a=Fv(this.j);this.o=(this.Hb=f(a,g,e))?this.Hb.a:1;this.ee=this.g=null;e=2;f=[];this.Hb&&(e=0,f=this.Hb.f);Is.call(this,c,d,this.o,e,f)}v(Gv,Is);Gv.prototype.ka=function(){1==this.state&&(Ec(this.ee),this.ee=null);Is.prototype.ka.call(this)};Gv.prototype.Y=function(){return this.g};
Gv.prototype.de=function(){var a=this.Hb.getState();2==a&&(this.g=Cv(lb(this.i)/this.c,mb(this.i)/this.c,this.o,this.Hb.resolution,0,this.c,this.i,this.j,[{extent:this.Hb.G(),image:this.Hb.Y()}],0));this.state=a;this.s()};Gv.prototype.load=function(){if(0==this.state){this.state=1;this.s();var a=this.Hb.getState();2==a||3==a?this.de():(this.ee=y(this.Hb,"change",function(){var a=this.Hb.getState();if(2==a||3==a)Ec(this.ee),this.ee=null,this.de()},this),this.Hb.load())}};function Hv(a){$t.call(this,{attributions:a.attributions,extent:a.extent,logo:a.logo,projection:a.projection,state:a.state});this.C=void 0!==a.resolutions?a.resolutions:null;this.a=null;this.fa=0}v(Hv,$t);function Iv(a,b){a.C&&(b=a.C[ka(a.C,b,0)]);return b}
Hv.prototype.Y=function(a,b,c,d){var e=this.c;if(e&&d&&!dc(e,d)){if(this.a){if(this.fa==this.i&&dc(this.a.v,d)&&this.a.resolution==b&&this.a.a==c&&bb(this.a.G(),a))return this.a;Nc(this.a);this.a=null}this.a=new Gv(e,d,a,b,c,function(a,b,c){return this.Jc(a,b,c,e)}.bind(this));this.fa=this.i;return this.a}e&&(d=e);return this.Jc(a,b,c,d)};Hv.prototype.o=function(a){a=a.target;switch(a.getState()){case 1:this.b(new Jv(Kv,a));break;case 2:this.b(new Jv(Lv,a));break;case 3:this.b(new Jv(Mv,a))}};
function Nv(a,b){a.Y().src=b}function Jv(a,b){Oc.call(this,a);this.image=b}v(Jv,Oc);var Kv="imageloadstart",Lv="imageloadend",Mv="imageloaderror";function Ov(a){Hv.call(this,{attributions:a.attributions,logo:a.logo,projection:a.projection,resolutions:a.resolutions,state:a.state});this.pa=a.canvasFunction;this.R=null;this.T=0;this.va=void 0!==a.ratio?a.ratio:1.5}v(Ov,Hv);Ov.prototype.Jc=function(a,b,c,d){b=Iv(this,b);var e=this.R;if(e&&this.T==this.i&&e.resolution==b&&e.a==c&&Va(e.G(),a))return e;a=a.slice();rb(a,this.va);(d=this.pa(a,b,c,[lb(a)/b*c,mb(a)/b*c],d))&&(e=new Ks(a,b,c,this.j,d));this.R=e;this.T=this.i;return e};function Pv(a){this.f=a.source;this.$a=Bh();this.g=jd();this.l=[0,0];this.Sa=void 0==a.renderBuffer?100:a.renderBuffer;this.B=null;Ov.call(this,{attributions:a.attributions,canvasFunction:this.tk.bind(this),logo:a.logo,projection:a.projection,ratio:a.ratio,resolutions:a.resolutions,state:this.f.getState()});this.I=null;this.v=void 0;this.Ii(a.style);y(this.f,"change",this.ro,this)}v(Pv,Ov);k=Pv.prototype;
k.tk=function(a,b,c,d,e){var f=new pt(.5*b/c,a,b,this.f.T,this.Sa);this.f.Yd(a,b,e);var g=!1;this.f.$b(a,function(a){var d;if(!(d=g)){var e;(d=a.Lc())?e=d.call(a,b):this.v&&(e=this.v(a,b));if(e){var h,p=!1;Array.isArray(e)||(e=[e]);d=0;for(h=e.length;d<h;++d)p=Mt(f,a,e[d],Lt(b,c),this.qo,this)||p;d=p}else d=!1}g=d},this);tt(f);if(g)return null;this.l[0]!=d[0]||this.l[1]!=d[1]?(this.g.canvas.width=d[0],this.g.canvas.height=d[1],this.l[0]=d[0],this.l[1]=d[1]):this.g.clearRect(0,0,d[0],d[1]);a=Qv(this,
nb(a),b,c,d);f.La(this.g,c,a,0,{});this.B=f;return this.g.canvas};k.Ea=function(a,b,c,d,e,f){if(this.B){var g={};return this.B.Ea(a,b,0,d,e,function(a){var b=w(a).toString();if(!(b in g))return g[b]=!0,f(a)})}};k.no=function(){return this.f};k.oo=function(){return this.I};k.po=function(){return this.v};function Qv(a,b,c,d,e){c=d/c;return Kh(a.$a,e[0]/2,e[1]/2,c,-c,0,-b[0],-b[1])}k.qo=function(){this.s()};k.ro=function(){bu(this,this.f.getState())};
k.Ii=function(a){this.I=void 0!==a?a:fl;this.v=a?dl(this.I):void 0;this.s()};function Rv(a,b){Vt.call(this,a,b);this.o=this.f=this.M=null}v(Rv,Vt);function Sv(a,b){b=b.Y();return Ti(a.c.i,b)}Rv.prototype.Ea=function(a,b,c,d,e){var f=this.a;return f.ha().Ea(a,b.viewState.resolution,b.viewState.rotation,c,b.skippedFeatureUids,function(a){return d.call(e,a,f)})};
Rv.prototype.ng=function(a,b){var c=this.c.i,d=a.pixelRatio,e=a.viewState,f=e.center,g=e.resolution,h=e.rotation,l=this.M,m=this.Ib,n=this.a.ha(),p=a.viewHints,q=a.extent;void 0!==b.extent&&(q=pb(q,b.extent));p[0]||p[1]||kb(q)||(b=n.Y(q,g,d,e.projection))&&At(this,b)&&(l=b,m=Sv(this,b),this.Ib&&a.postRenderFunctions.push(function(a,b){a.isContextLost()||a.deleteTexture(b)}.bind(null,c,this.Ib)));l&&(c=this.c.f.j,Tv(this,c.width,c.height,d,f,g,h,l.G()),this.o=null,d=this.v,Ch(d),Ih(d,1,-1),Jh(d,0,
-1),this.M=l,this.Ib=m,Ct(a.attributions,l.f),Dt(a,n));return!!l};function Tv(a,b,c,d,e,f,g,h){b*=f;c*=f;a=a.S;Ch(a);Ih(a,2*d/b,2*d/c);Hh(a,-g);Jh(a,h[0]-e[0],h[1]-e[1]);Ih(a,(h[2]-h[0])/2,(h[3]-h[1])/2);Jh(a,1,1)}Rv.prototype.Ue=function(a,b){return void 0!==this.Ea(a,b,0,mf,this)};
Rv.prototype.lg=function(a,b,c,d){if(this.M&&this.M.Y())if(this.a.ha()instanceof Pv){var e=Gh(b.pixelToCoordinateTransform,a.slice());if(this.Ea(e,b,0,mf,this))return c.call(d,this.a,null)}else{e=[this.M.Y().width,this.M.Y().height];if(!this.o){var f=b.size;b=Bh();Jh(b,-1,-1);Ih(b,2/f[0],2/f[1]);Jh(b,0,f[1]);Ih(b,1,-1);var f=Lh(this.S.slice()),g=Bh();Jh(g,0,e[1]);Ih(g,1,-1);Ih(g,e[0]/2,e[1]/2);Jh(g,1,1);Eh(g,f);Eh(g,b);this.o=g}a=Gh(this.o,a.slice());if(!(0>a[0]||a[0]>e[0]||0>a[1]||a[1]>e[1])&&(this.f||
(this.f=jd(1,1)),this.f.clearRect(0,0,1,1),this.f.drawImage(this.M.Y(),a[0],a[1],1,1,0,0,1,1),e=this.f.getImageData(0,0,1,1).data,0<e[3]))return c.call(d,this.a,e)}};function Uv(a){wh.call(this,a?a:{})}v(Uv,wh);Uv.prototype.Fd=function(a){var b=null,c=a.U();"canvas"===c?b=new zv(this):"webgl"===c&&(b=new Rv(a,this));return b};function Vv(a){yv.call(this,a);this.c=null===this.c?null:jd();this.o=null;this.g=[];this.l=Oa();this.va=new ya(0,0,0,0);this.B=Bh();this.T=0}v(Vv,yv);function Wv(a,b){b=b.getState();a=a.a.kd();return 2==b||4==b||3==b&&!a}
Vv.prototype.sd=function(a,b){var c=a.pixelRatio,d=a.size,e=a.viewState,f=e.projection,g=e.resolution,e=e.center,h=this.a,l=h.ha(),m=l.i,n=l.Ta(f),p=n.tc(g,this.T),q=n.Da(p),r=Math.round(g/q)||1,u=a.extent;void 0!==b.extent&&(u=pb(u,b.extent));if(kb(u))return!1;var x=rc(n,u,q);var B=n.Pc(p);var E=n.Da(p),A=Ma(n.gb(p),n.j);B=Xa(B[0]+x.ca*A[0]*E,B[1]+x.da*A[1]*E,B[0]+(x.$+1)*A[0]*E,B[1]+(x.ia+1)*A[1]*E,void 0);E=l.nb(c);A={};A[p]={};var L=this.Nf(l,f,A),oa=this.l,ha=this.va,ga=!1,z,M;for(z=x.ca;z<=
x.$;++z)for(M=x.da;M<=x.ia;++M){var ba=l.Nc(p,z,M,c,f);3!=ba.getState()||this.a.kd()||Ns(ba,2);Wv(this,ba)||(ba=Ms(ba));Wv(this,ba)?2==ba.getState()&&(A[p][ba.ta.toString()]=ba,ga||-1!=this.g.indexOf(ba)||(ga=!0)):pc(n,ba.ta,L,ha,oa)||(ba=qc(n,ba.ta,ha,oa))&&L(p+1,ba)}z=a.viewHints;z=z[0]||z[1];if(!(this.f&&16<Date.now()-a.time&&z||!ga&&this.o&&Va(this.o,u)&&this.mf==m&&r==this.R&&(z||q*c/E*r==this.f))){if(z=this.c)M=l.Xd(p,c,f),ba=Math.round((x.$-x.ca+1)*M[0]/r),M=Math.round((x.ia-x.da+1)*M[1]/r),
ga=z.canvas,ga.width!=ba||ga.height!=M?(this.R=r,ga.width=ba,ga.height=M):(z.clearRect(0,0,ba,M),r=this.R);this.g.length=0;ga=Object.keys(A).map(Number);ga.sort(ia);var da,ha=0;for(da=ga.length;ha<da;++ha){z=ga[ha];L=l.Xd(z,c,f);ba=n.Da(z);var fb=ba/q;var ca=E*l.Wf(f);var Ub=A[z];for(var uc in Ub){ba=Ub[uc];M=n.Aa(ba.ta,oa);z=(M[0]-B[0])/q*E/r;M=(B[3]-M[3])/q*E/r;var bc=L[0]*fb/r;var Je=L[1]*fb/r;this.Of(ba,a,b,z,M,bc,Je,ca);this.g.push(ba)}}this.mf=m;this.f=q*c/E*r;this.o=B}b=this.f/g;b=Kh(this.B,
c*d[0]/2,c*d[1]/2,b,b,0,(this.o[0]-e[0])/this.f*c,(e[1]-this.o[3])/this.f*c);Kh(this.v,c*d[0]/2-b[4],c*d[1]/2-b[5],c/g,-c/g,0,-e[0],-e[1]);Et(a.usedTiles,l,p,x);Ft(a,l,n,c,f,u,p,h.Ud());Bt(a,l);Dt(a,l);return 0<this.g.length};Vv.prototype.Of=function(a,b,c,d,e,f,g,h){this.a.ha().Zf(b.viewState.projection)||this.c.clearRect(d,e,f,g);(a=a.Y())&&this.c.drawImage(a,h,h,a.width-2*h,a.height-2*h,d,e,f,g)};Vv.prototype.Y=function(){var a=this.c;return a?a.canvas:null};Vv.prototype.C=function(){return this.B};function Xv(){this.b="precision mediump float;varying vec2 a;uniform sampler2D e;void main(void){gl_FragColor=texture2D(e,a);}"}v(Xv,mi);var Yv=new Xv;function Zv(){this.b="varying vec2 a;attribute vec2 b;attribute vec2 c;uniform vec4 d;void main(void){gl_Position=vec4(b*d.xy+d.zw,0.,1.);a=c;}"}v(Zv,ni);var $v=new Zv;function aw(a,b){this.i=a.getUniformLocation(b,"e");this.c=a.getUniformLocation(b,"d");this.b=a.getAttribLocation(b,"b");this.a=a.getAttribLocation(b,"c")};function bw(a,b){Vt.call(this,a,b);this.I=Yv;this.fa=$v;this.f=null;this.B=new Di([0,0,0,1,1,0,1,1,0,1,0,0,1,1,1,0]);this.D=this.o=null;this.l=-1;this.R=[0,0]}v(bw,Vt);k=bw.prototype;k.ka=function(){Gi(this.c.f,this.B);Vt.prototype.ka.call(this)};k.Nf=function(a,b,c){var d=this.c;return function(e,f){return yt(a,b,e,f,function(a){var b=d.a.b.hasOwnProperty(a.bb());b&&(c[e]||(c[e]={}),c[e][a.ta.toString()]=a);return b})}};k.mg=function(){Vt.prototype.mg.call(this);this.f=null};
k.ng=function(a,b,c){var d=this.c,e=c.b,f=a.viewState,g=f.projection,h=this.a,l=h.ha(),m=l.Ta(g),n=m.tc(f.resolution),p=m.Da(n),q=l.Xd(n,a.pixelRatio,g),r=q[0]/Ma(m.gb(n),this.R)[0],u=p/r,x=l.nb(r)*l.Wf(g),B=f.center,E=a.extent,A=rc(m,E,p);if(this.o&&Aa(this.o,A)&&this.l==l.i)u=this.D;else{var L=[A.$-A.ca+1,A.ia-A.da+1],oa=Ea(Math.max(L[0]*q[0],L[1]*q[1])),L=u*oa,ha=m.Pc(n),ga=ha[0]+A.ca*q[0]*u,u=ha[1]+A.da*q[1]*u,u=[ga,u,ga+L,u+L];Wt(this,a,oa);e.viewport(0,0,oa,oa);e.clearColor(0,0,0,0);e.clear(16384);
e.disable(3042);oa=Hi(c,this.I,this.fa);c.Qc(oa);this.f||(this.f=new aw(e,oa));wi(c,34962,this.B);e.enableVertexAttribArray(this.f.b);e.vertexAttribPointer(this.f.b,2,5126,!1,16,0);e.enableVertexAttribArray(this.f.a);e.vertexAttribPointer(this.f.a,2,5126,!1,16,8);e.uniform1i(this.f.i,0);c={};c[n]={};var z=this.Nf(l,g,c),M=h.kd(),oa=!0,ga=Oa(),ba=new ya(0,0,0,0),da,fb;for(da=A.ca;da<=A.$;++da)for(fb=A.da;fb<=A.ia;++fb){ha=l.Nc(n,da,fb,r,g);if(void 0!==b.extent){var ca=m.Aa(ha.ta,ga);if(!qb(ca,b.extent))continue}ca=
ha.getState();(ca=2==ca||4==ca||3==ca&&!M)||(ha=Ms(ha));ca=ha.getState();if(2==ca){if(d.a.b.hasOwnProperty(ha.bb())){c[n][ha.ta.toString()]=ha;continue}}else if(4==ca||3==ca&&!M)continue;oa=!1;ca=pc(m,ha.ta,z,ba,ga);ca||(ha=qc(m,ha.ta,ba,ga))&&z(n+1,ha)}b=Object.keys(c).map(Number);b.sort(ia);for(var z=new Float32Array(4),Ub,M=0,ba=b.length;M<ba;++M)for(Ub in da=c[b[M]],da)ha=da[Ub],ca=m.Aa(ha.ta,ga),z[0]=2*(ca[2]-ca[0])/L,z[1]=2*(ca[3]-ca[1])/L,z[2]=2*(ca[0]-u[0])/L-1,z[3]=2*(ca[1]-u[1])/L-1,e.uniform4fv(this.f.c,
z),nk(d,ha,q,x*r),e.drawArrays(5,0,4);oa?(this.o=A,this.D=u,this.l=l.i):(this.D=this.o=null,this.l=-1,a.animate=!0)}Et(a.usedTiles,l,n,A);var uc=d.j;Ft(a,l,m,r,g,E,n,h.Ud(),function(a){2!=a.getState()||d.a.b.hasOwnProperty(a.bb())||a.bb()in uc.a||uc.f([a,tc(m,a.ta),m.Da(a.ta[0]),q,x*r])},this);Bt(a,l);Dt(a,l);e=this.v;Ch(e);Jh(e,(Math.round(B[0]/p)*p-u[0])/(u[2]-u[0]),(Math.round(B[1]/p)*p-u[1])/(u[3]-u[1]));f.rotation&&Hh(e,f.rotation);Ih(e,a.size[0]*f.resolution/(u[2]-u[0]),a.size[1]*f.resolution/
(u[3]-u[1]));Jh(e,-.5,-.5);return!0};k.lg=function(a,b,c,d){if(this.g){a=Gh(this.v,[a[0]/b.size[0],(b.size[1]-a[1])/b.size[1]].slice());a=[a[0]*this.j,a[1]*this.j];b=this.c.f.b;b.bindFramebuffer(b.FRAMEBUFFER,this.g);var e=new Uint8Array(4);b.readPixels(a[0],a[1],1,1,b.RGBA,b.UNSIGNED_BYTE,e);if(0<e[3])return c.call(d,this.a,e)}};function cw(a){a=a?a:{};var b=tb({},a);delete b.preload;delete b.useInterimTilesOnError;wh.call(this,b);this.zi(void 0!==a.preload?a.preload:0);this.Ai(void 0!==a.useInterimTilesOnError?a.useInterimTilesOnError:!0)}v(cw,wh);k=cw.prototype;k.Fd=function(a){var b=null,c=a.U();"canvas"===c?b=new Vv(this):"webgl"===c&&(b=new bw(a,this));return b};k.Ud=function(){return this.get("preload")};k.zi=function(a){this.set("preload",a)};k.kd=function(){return this.get("useInterimTilesOnError")};
k.Ai=function(a){this.set("useInterimTilesOnError",a)};function dw(a){this.c=null;Vv.call(this,a);this.I=!1;this.D=Bh();this.T="vector"==a.j?1:0}v(dw,Vv);var ew={image:ji,hybrid:["Polygon","LineString"]},fw={hybrid:["Image","Text"],vector:ji};k=dw.prototype;k.sd=function(a,b){var c=this.a,d=c.i;this.pa!=d&&(this.g.length=0,c=c.j,this.c||"vector"==c||(this.c=jd()),this.c&&"vector"==c&&(this.c=null));this.pa=d;return Vv.prototype.sd.apply(this,arguments)};
k.Of=function(a,b,c,d,e,f,g,h){var l=a,m=this.a,n=b.pixelRatio,p=b.viewState.projection,q=m.i,r=m.get(Pt)||null,u=l.o;if(u.Nd||u.mf!=q||u.Kg!=r){for(var x=0,B=l.a.length;x<B;++x){var E=l.c[l.a[x]];E.S=null;u.Nd=!1;var A=m.ha(),L=A.tileGrid,oa=E.ta,ha=E.a,ga=A.Ta(p),z=ga.Da(l.ta[0]),M=L.Da(E.ta[0]),ga=ga.Aa(l.v),oa=L.Aa(oa),ga=pb(ga,oa);if("tile-pixels"==ha.a)var ba=L=A.nb(),M=Kh(this.D,0,0,1/M*ba,-1/M*ba,0,-oa[0],-oa[3]),M=Gh(M,[ga[0],ga[3]]).concat(Gh(M,[ga[2],ga[1]]));else if(L=z,M=ga,!dc(p,ha)){var da=
!0;E.ig(p)}u.Nd=!1;A=new pt(0,M,L,A.l,m.c);M=Lt(L,n);L=E.g;r&&r!==u.Kg&&L.sort(r);oa=0;for(ga=L.length;oa<ga;++oa){ba=L[oa];da&&ba.V().tb(ha,p);var fb=void 0,ca=ba.Lc();ca?fb=ca.call(ba,z):(ca=m.f)&&(fb=ca(ba,z));if(fb){Array.isArray(fb)||(fb=[fb]);var ca=M,Ub=A;if(fb){var uc=!1;if(Array.isArray(fb))for(var bc=0,Je=fb.length;bc<Je;++bc)uc=Mt(Ub,ba,fb[bc],ca,this.Fi,this)||uc;else uc=Mt(Ub,ba,fb,ca,this.Fi,this)||uc;ba=uc}else ba=!1;this.I=this.I||ba;u.Nd=u.Nd||ba}}tt(A);E.c[l.ta.toString()]=A}u.mf=
q;u.Kg=r}if(this.c){x=b;p=this.a;n=l.o;q=p.i;if((m=ew[p.j])&&n.Lg!==q)for(n.Lg=q,B=l.v,E=B[0],n=x.pixelRatio,z=p.ha(),p=z.tileGrid,ha=z.Ta(x.viewState.projection),q=ha.Da(E),r=z.nb(),l.j||(l.j=jd()),u=l.j,x=z.Xd(E,n,x.viewState.projection),u.canvas.width=x[0],u.canvas.height=x[1],x=ha.Aa(B),B=0,E=l.a.length;B<E;++B)ha=l.c[l.a[B]],A=ha.ta,da=n/q,z=Ch(this.D),"tile-pixels"==ha.a.a?(da=p.Aa(A,this.l),A=p.Da(A[0]),M=n/r*A/q,Ih(z,M,M),Jh(z,Math.round((da[0]-x[0])/A*r),Math.round((x[3]-da[3])/A*r))):(Ih(z,
da,-da),Jh(z,-x[0],-x[3])),ha.c[l.ta.toString()].La(u,n,z,0,{},m);Vv.prototype.Of.apply(this,arguments)}};
k.Ea=function(a,b,c,d,e){var f=b.viewState.resolution,g=b.viewState.rotation;c=void 0==c?0:c;var h=this.a,l={},m=this.g,n=h.ha();b=n.Ta(b.viewState.projection);var p=n.tileGrid,q;var r=0;for(q=m.length;r<q;++r){var u=m[r];var x=u.ta;x=b.Aa(x,this.l);var B=Qa(x,c*f,B);if(Ta(B,a)){x=0;for(var E=u.a.length;x<E;++x){var A=u.c[u.a[x]];if("tile-pixels"===A.a.a){var L=A.ta;f=p.Aa(L,this.l);var oa=ib(f);f=n.nb();L=p.Da(L[0])/f;oa=[(a[0]-oa[0])/L,(oa[1]-a[1])/L]}else oa=a;A=A.c[u.ta];var ha=ha||A.Ea(oa,f,
g,c,{},function(a){var b=w(a).toString();if(!(b in l))return l[b]=!0,d.call(e,a,h)})}}}return ha};k.Fi=function(){zt(this)};
k.ef=function(a,b,c){var d=this.a,e=d.ha(),f=fw[d.j];if(f)for(var g=b.pixelRatio,h=b.viewState.rotation,l=b.size,m=Math.round(g*l[0]/2),l=Math.round(g*l[1]/2),n=this.g,d=d.ha().nb(),p=e.tileGrid,e=e.Ta(b.viewState.projection),q=[],r=[],u=n.length-1;0<=u;--u){var x=n[u];if(5!=x.getState())for(var B=x.ta,E=e.Aa(B)[0]-e.Aa(x.v)[0],A=0,L=x.a.length;A<L;++A){var oa=x.c[x.a[A]],ha=oa.ta[0],ga=p.Da(ha);var z=oa;var M=b;if("tile-pixels"==z.a.a){var ba=this.a.ha(),da=ba.tileGrid,fb=z.ta,ba=da.Da(fb[0])/ba.nb(),
z=M.viewState,ca=M.pixelRatio,Ub=z.resolution/ca,fb=da.Aa(fb,this.l),da=z.center,fb=ib(fb);M=M.size;M=Kh(this.D,Math.round(ca*M[0]/2),Math.round(ca*M[1]/2),ba/Ub,ba/Ub,z.rotation,(fb[0]-da[0])/ba,(da[1]-fb[1])/ba)}else M=Jt(this,M,0);Jh(M,E*d/ga,0);oa=oa.c[B.toString()];ga=vt(oa,M);a.save();a.globalAlpha=c.opacity;Vh(a,-h,m,l);ba=0;for(z=q.length;ba<z;++ba)ca=q[ba],ha<r[ba]&&(a.beginPath(),a.moveTo(ga[0],ga[1]),a.lineTo(ga[2],ga[3]),a.lineTo(ga[4],ga[5]),a.lineTo(ga[6],ga[7]),a.moveTo(ca[6],ca[7]),
a.lineTo(ca[4],ca[5]),a.lineTo(ca[2],ca[3]),a.lineTo(ca[0],ca[1]),a.clip());oa.La(a,g,M,h,{},f);a.restore();q.push(ga);r.push(ha)}}Vv.prototype.ef.apply(this,arguments)};function W(a){a=a?a:{};var b=tb({},a);delete b.preload;delete b.useInterimTilesOnError;T.call(this,b);this.Bi(a.preload?a.preload:0);this.Ci(a.useInterimTilesOnError?a.useInterimTilesOnError:!0);xa(void 0==a.renderMode||"image"==a.renderMode||"hybrid"==a.renderMode||"vector"==a.renderMode,28);this.j=a.renderMode||"hybrid"}v(W,T);k=W.prototype;k.Fd=function(a){var b=null;"canvas"===a.U()&&(b=new dw(this));return b};k.Ud=function(){return this.get("preload")};k.kd=function(){return this.get("useInterimTilesOnError")};
k.Bi=function(a){this.set("preload",a)};k.Ci=function(a){this.set("useInterimTilesOnError",a)};function gw(a,b,c,d){function e(){delete window[g];f.parentNode.removeChild(f)}var f=document.createElement("script"),g="olc_"+w(b);f.async=!0;f.src=a+(-1==a.indexOf("?")?"?":"&")+(d||"callback")+"="+g;var h=setTimeout(function(){e();c&&c()},1E4);window[g]=function(a){clearTimeout(h);e();b(a)};document.getElementsByTagName("head")[0].appendChild(f)};function hw(a,b,c,d,e,f,g,h,l,m,n){Ls.call(this,e,0);this.D=void 0!==n?n:!1;this.S=g;this.u=h;this.v=null;this.c=b;this.j=d;this.o=f?f:e;this.a=[];this.yd=null;this.g=0;f=d.Aa(this.o);h=this.j.G();e=this.c.G();f=h?pb(f,h):f;if(jb(f))if((h=a.G())&&(e?e=pb(e,h):e=h),d=Av(a,c,nb(f),d.Da(this.o[0])),!isFinite(d)||0>=d)this.state=4;else if(this.l=new Dv(a,c,f,e,d*(void 0!==m?m:.5)),this.l.c.length)if(this.g=b.tc(d),c=Fv(this.l),e&&(a.i?(c[1]=Ca(c[1],e[1],e[3]),c[3]=Ca(c[3],e[1],e[3])):c=pb(c,e)),jb(c)){a=
oc(b,c,this.g);for(b=a.ca;b<=a.$;b++)for(c=a.da;c<=a.ia;c++)(m=l(this.g,b,c,g))&&this.a.push(m);this.a.length||(this.state=4)}else this.state=4;else this.state=4;else this.state=4}v(hw,Ls);hw.prototype.ka=function(){1==this.state&&(this.yd.forEach(Ec),this.yd=null);Ls.prototype.ka.call(this)};hw.prototype.Y=function(){return this.v};
hw.prototype.de=function(){var a=[];this.a.forEach(function(b){b&&2==b.getState()&&a.push({extent:this.c.Aa(b.ta),image:b.Y()})},this);this.a.length=0;if(a.length){var b=this.o[0],c=this.j.gb(b),d="number"===typeof c?c:c[0],c="number"===typeof c?c:c[1],b=this.j.Da(b),e=this.c.Da(this.g),f=this.j.Aa(this.o);this.v=Cv(d,c,this.S,e,this.c.G(),b,f,this.l,a,this.u,this.D);this.state=2}else this.state=3;this.s()};
hw.prototype.load=function(){if(0==this.state){this.state=1;this.s();var a=0;this.yd=[];this.a.forEach(function(b){var c=b.getState();if(0==c||1==c){a++;var d=y(b,"change",function(){var c=b.getState();if(2==c||3==c||4==c)Ec(d),a--,a||(this.yd.forEach(Ec),this.yd=null,this.de())},this);this.yd.push(d)}},this);this.a.forEach(function(a){0==a.getState()&&a.load()});a||setTimeout(this.de.bind(this),0)}};function iw(a,b){var c=/\{z\}/g,d=/\{x\}/g,e=/\{y\}/g,f=/\{-y\}/g;return function(g){if(g)return a.replace(c,g[0].toString()).replace(d,g[1].toString()).replace(e,function(){return(-g[2]-1).toString()}).replace(f,function(){var a=b.a?b.a[g[0]]:null;xa(a,55);return(a.ia-a.da+1+g[2]).toString()})}}function jw(a,b){for(var c=a.length,d=Array(c),e=0;e<c;++e)d[e]=iw(a[e],b);return kw(d)}function kw(a){return 1===a.length?a[0]:function(b,c,d){if(b)return a[Ia((b[1]<<b[0])+b[2],a.length)](b,c,d)}}
function lw(){}function mw(a){var b=[],c=/\{([a-z])-([a-z])\}/.exec(a);if(c){var d=c[2].charCodeAt(0),e;for(e=c[1].charCodeAt(0);e<=d;++e)b.push(a.replace(c[0],String.fromCharCode(e)));return b}if(c=c=/\{(\d+)-(\d+)\}/.exec(a)){d=parseInt(c[2],10);for(e=parseInt(c[1],10);e<=d;e++)b.push(a.replace(c[0],e.toString()));return b}b.push(a);return b};function nw(a){lk.call(this);this.highWaterMark=void 0!==a?a:2048}v(nw,lk);function ow(a){return a.c>a.highWaterMark}nw.prototype.fd=function(a){for(var b,c;ow(this);){b=this.a.Yc;c=b.ta[0].toString();var d;if(d=c in a)b=b.ta,d=za(a[c],b[1],b[2]);if(d)break;else Nc(this.pop())}};function pw(a){$t.call(this,{attributions:a.attributions,extent:a.extent,logo:a.logo,projection:a.projection,state:a.state,wrapX:a.wrapX});this.va=void 0!==a.opaque?a.opaque:!1;this.$a=void 0!==a.tilePixelRatio?a.tilePixelRatio:1;this.tileGrid=void 0!==a.tileGrid?a.tileGrid:null;this.a=new nw(a.cacheSize);this.o=[0,0];this.uc=""}v(pw,$t);k=pw.prototype;k.Ki=function(){return ow(this.a)};k.fd=function(a,b){(a=this.Wd(a))&&a.fd(b)};
function yt(a,b,c,d,e){b=a.Wd(b);if(!b)return!1;for(var f=!0,g,h,l=d.ca;l<=d.$;++l)for(var m=d.da;m<=d.ia;++m)g=a.Sb(c,l,m),h=!1,b.b.hasOwnProperty(g)&&(g=b.get(g),(h=2===g.getState())&&(h=!1!==e(g))),h||(f=!1);return f}k.Wf=function(){return 0};function qw(a,b){a.uc!==b&&(a.uc=b,a.s())}k.Sb=function(a,b,c){return a+"/"+b+"/"+c};k.Zf=function(){return this.va};k.ab=function(){return this.tileGrid};k.Ta=function(a){return this.tileGrid?this.tileGrid:vc(a)};
k.Wd=function(a){var b=this.c;return b&&!dc(b,a)?null:this.a};k.nb=function(){return this.$a};k.Xd=function(a,b,c){c=this.Ta(c);b=this.nb(b);a=Ma(c.gb(a),this.o);return 1==b?a:La(a,b,this.o)};function rw(a,b,c){var d=void 0!==c?c:a.c;c=a.Ta(d);if(a.u&&d.c){var e=b;b=e[0];a=tc(c,e);d=zc(d);Ta(d,a)?b=e:(e=lb(d),a[0]+=e*Math.ceil((d[0]-a[0])/e),b=c.bg(a,b))}e=b[0];d=b[1];a=b[2];if(c.minZoom>e||e>c.maxZoom)c=!1;else{var f=c.G();c=(c=f?oc(c,f,e):c.a?c.a[e]:null)?za(c,d,a):!0}return c?b:null}
k.sa=function(){this.a.clear();this.s()};k.Ug=ua;function sw(a,b){Oc.call(this,a);this.tile=b}v(sw,Oc);function tw(a){pw.call(this,{attributions:a.attributions,cacheSize:a.cacheSize,extent:a.extent,logo:a.logo,opaque:a.opaque,projection:a.projection,state:a.state,tileGrid:a.tileGrid,tilePixelRatio:a.tilePixelRatio,wrapX:a.wrapX});this.tileLoadFunction=a.tileLoadFunction;this.tileUrlFunction=this.Fc?this.Fc.bind(this):lw;this.urls=null;a.urls?this.eb(a.urls):a.url&&this.jb(a.url);a.tileUrlFunction&&this.cb(a.tileUrlFunction)}v(tw,pw);k=tw.prototype;k.pb=function(){return this.tileLoadFunction};
k.qb=function(){return this.tileUrlFunction};k.rb=function(){return this.urls};k.Li=function(a){a=a.target;switch(a.getState()){case 1:this.b(new sw("tileloadstart",a));break;case 2:this.b(new sw("tileloadend",a));break;case 3:this.b(new sw("tileloaderror",a))}};k.vb=function(a){this.a.clear();this.tileLoadFunction=a;this.s()};k.cb=function(a,b){this.tileUrlFunction=a;"undefined"!==typeof b?qw(this,b):this.s()};
k.jb=function(a){var b=this.urls=mw(a);this.cb(this.Fc?this.Fc.bind(this):jw(b,this.tileGrid),a)};k.eb=function(a){this.urls=a;var b=a.join("\n");this.cb(this.Fc?this.Fc.bind(this):jw(a,this.tileGrid),b)};k.Ug=function(a,b,c){a=this.Sb(a,b,c);this.a.b.hasOwnProperty(a)&&this.a.get(a)};function X(a){tw.call(this,{attributions:a.attributions,cacheSize:a.cacheSize,extent:a.extent,logo:a.logo,opaque:a.opaque,projection:a.projection,state:a.state,tileGrid:a.tileGrid,tileLoadFunction:a.tileLoadFunction?a.tileLoadFunction:uw,tilePixelRatio:a.tilePixelRatio,tileUrlFunction:a.tileUrlFunction,url:a.url,urls:a.urls,wrapX:a.wrapX});this.crossOrigin=void 0!==a.crossOrigin?a.crossOrigin:null;this.tileClass=a.tileClass?a.tileClass:Os;this.g={};this.v={};this.Sa=a.reprojectionErrorThreshold;this.I=
!1}v(X,tw);k=X.prototype;k.Ki=function(){if(ow(this.a))return!0;for(var a in this.g)if(ow(this.g[a]))return!0;return!1};k.fd=function(a,b){a=this.Wd(a);this.a.fd(this.a==a?b:{});for(var c in this.g){var d=this.g[c];d.fd(d==a?b:{})}};k.Wf=function(a){return this.c&&a&&!dc(this.c,a)?0:this.Xf()};k.Xf=function(){return 0};k.Zf=function(a){return this.c&&a&&!dc(this.c,a)?!1:tw.prototype.Zf.call(this,a)};
k.Ta=function(a){var b=this.c;return!this.tileGrid||b&&!dc(b,a)?(b=w(a).toString(),b in this.v||(this.v[b]=vc(a)),this.v[b]):this.tileGrid};k.Wd=function(a){var b=this.c;if(!b||dc(b,a))return this.a;a=w(a).toString();a in this.g||(this.g[a]=new nw(this.a.highWaterMark));return this.g[a]};function vw(a,b,c,d,e,f,g){b=[b,c,d];e=(c=rw(a,b,f))?a.tileUrlFunction(c,e,f):void 0;e=new a.tileClass(b,void 0!==e?0:4,void 0!==e?e:"",a.crossOrigin,a.tileLoadFunction);e.key=g;y(e,"change",a.Li,a);return e}
k.Nc=function(a,b,c,d,e){if(this.c&&e&&!dc(this.c,e)){var f=this.Wd(e);c=[a,b,c];var g;a=this.Sb.apply(this,c);f.b.hasOwnProperty(a)&&(g=f.get(a));b=this.uc;if(g&&g.key==b)return g;var h=this.c,l=this.Ta(h),m=this.Ta(e),n=rw(this,c,e);d=new hw(h,l,e,m,c,n,this.nb(d),this.Xf(),function(a,b,c,d){return ww(this,a,b,c,d,h)}.bind(this),this.Sa,this.I);d.key=b;g?(d.i=g,f.replace(a,d)):f.set(a,d);return d}return ww(this,a,b,c,d,e)};
function ww(a,b,c,d,e,f){var g=a.Sb(b,c,d),h=a.uc;if(a.a.b.hasOwnProperty(g)){var l=a.a.get(g);if(l.key!=h){var m=l;l=vw(a,b,c,d,e,f,h);0==m.getState()?l.i=m.i:l.i=m;if(l.i){b=l.i;c=l;do{if(2==b.getState()){b.i=null;break}else 1==b.getState()?c=b:0==b.getState()?c.i=b.i:c=b;b=c.i}while(b)}a.a.replace(g,l)}}else l=vw(a,b,c,d,e,f,h),a.a.set(g,l);return l}k.Pb=function(a){if(this.I!=a){this.I=a;for(var b in this.g)this.g[b].clear();this.s()}};
k.Qb=function(a,b){if(a=Tb(a))a=w(a).toString(),a in this.v||(this.v[a]=b)};function uw(a,b){a.Y().src=b};function xw(a){this.B=void 0!==a.hidpi?a.hidpi:!1;X.call(this,{cacheSize:a.cacheSize,crossOrigin:"anonymous",opaque:!0,projection:Tb("EPSG:3857"),reprojectionErrorThreshold:a.reprojectionErrorThreshold,state:"loading",tileLoadFunction:a.tileLoadFunction,tilePixelRatio:this.B?2:1,wrapX:void 0!==a.wrapX?a.wrapX:!0});this.R=void 0!==a.culture?a.culture:"en-us";this.C=void 0!==a.maxZoom?a.maxZoom:-1;this.f=a.key;this.l=a.imagerySet;gw("https://dev.virtualearth.net/REST/v1/Imagery/Metadata/"+this.l+"?uriScheme=https&include=ImageryProviders&key="+
this.f,this.pa.bind(this),void 0,"jsonp")}v(xw,X);var yw=new Ac({html:'<a class="ol-attribution-bing-tos" href="http://www.microsoft.com/maps/product/terms.html">Terms of Use</a>'});xw.prototype.T=function(){return this.f};xw.prototype.fa=function(){return this.l};
xw.prototype.pa=function(a){if(200!=a.statusCode||"OK"!=a.statusDescription||"ValidCredentials"!=a.authenticationResultCode||1!=a.resourceSets.length||1!=a.resourceSets[0].resources.length)bu(this,"error");else{var b=a.brandLogoUri;-1==b.indexOf("https")&&(b=b.replace("http","https"));var c=a.resourceSets[0].resources[0],d=-1==this.C?c.zoomMax:this.C;a=zc(this.c);var e=xc({extent:a,minZoom:c.zoomMin,maxZoom:d,tileSize:(c.imageWidth==c.imageHeight?c.imageWidth:[c.imageWidth,c.imageHeight])/this.nb()});
this.tileGrid=e;var f=this.R,g=this.B;this.tileUrlFunction=kw(c.imageUrlSubdomains.map(function(a){var b=[0,0,0],d=c.imageUrl.replace("{subdomain}",a).replace("{culture}",f);return function(a){if(a)return jc(a[0],a[1],-a[2]-1,b),a=d,g&&(a+="&dpi=d1&device=mobile"),a.replace("{quadkey}",kc(b))}}));if(c.imageryProviders){var h=Vb(Tb("EPSG:4326"),this.c);a=c.imageryProviders.map(function(a){var b=a.attribution,c={};a.coverageAreas.forEach(function(a){var b=a.zoomMin,f=Math.min(a.zoomMax,d);a=a.bbox;
a=sb([a[1],a[0],a[3],a[2]],h);var g;for(g=b;g<=f;++g){var l=g.toString();b=oc(e,a,g);l in c?c[l].push(b):c[l]=[b]}});return new Ac({html:b,tileRanges:c})});a.push(yw);this.ua(a)}this.D=b;bu(this,"ready")}};function zw(a){a=a||{};var b=void 0!==a.projection?a.projection:"EPSG:3857",c=void 0!==a.tileGrid?a.tileGrid:xc({extent:zc(b),maxZoom:a.maxZoom,minZoom:a.minZoom,tileSize:a.tileSize});X.call(this,{attributions:a.attributions,cacheSize:a.cacheSize,crossOrigin:a.crossOrigin,logo:a.logo,opaque:a.opaque,projection:b,reprojectionErrorThreshold:a.reprojectionErrorThreshold,tileGrid:c,tileLoadFunction:a.tileLoadFunction,tilePixelRatio:a.tilePixelRatio,tileUrlFunction:a.tileUrlFunction,url:a.url,urls:a.urls,
wrapX:void 0!==a.wrapX?a.wrapX:!0})}v(zw,X);function Aw(a){this.C=a.account;this.B=a.map||"";this.f=a.config||{};this.l={};zw.call(this,{attributions:a.attributions,cacheSize:a.cacheSize,crossOrigin:a.crossOrigin,logo:a.logo,maxZoom:void 0!==a.maxZoom?a.maxZoom:18,minZoom:a.minZoom,projection:a.projection,state:"loading",wrapX:a.wrapX});Bw(this)}v(Aw,zw);k=Aw.prototype;k.Kk=function(){return this.f};k.tq=function(a){tb(this.f,a);Bw(this)};k.Xp=function(a){this.f=a||{};Bw(this)};
function Bw(a){var b=JSON.stringify(a.f);if(a.l[b])Cw(a,a.l[b]);else{var c="https://"+a.C+".cartodb.com/api/v1/map";a.B&&(c+="/named/"+a.B);var d=new XMLHttpRequest;d.addEventListener("load",a.Dl.bind(a,b));d.addEventListener("error",a.Cl.bind(a));d.open("POST",c);d.setRequestHeader("Content-type","application/json");d.send(JSON.stringify(a.f))}}
k.Dl=function(a,b){b=b.target;if(!b.status||200<=b.status&&300>b.status){try{var c=JSON.parse(b.responseText)}catch(d){bu(this,"error");return}Cw(this,c);this.l[a]=c;bu(this,"ready")}else bu(this,"error")};k.Cl=function(){bu(this,"error")};function Cw(a,b){a.jb("https://"+b.cdn_url.https+"/"+a.C+"/api/v1/map/"+b.layergroupid+"/{z}/{x}/{y}.png")};function Y(a){U.call(this,{attributions:a.attributions,extent:a.extent,logo:a.logo,projection:a.projection,wrapX:a.wrapX});this.resolution=void 0;this.distance=void 0!==a.distance?a.distance:20;this.features=[];this.geometryFunction=a.geometryFunction||function(a){a=a.V();xa(a instanceof C,10);return a};this.source=a.source;this.source.J("change",Y.prototype.sa,this)}v(Y,U);k=Y.prototype;k.$n=function(){return this.distance};k.ao=function(){return this.source};
k.Yd=function(a,b,c){this.source.Yd(a,b,c);b!==this.resolution&&(this.clear(),this.resolution=b,Dw(this),this.cd(this.features))};k.Yp=function(a){this.distance=a;this.sa()};k.sa=function(){this.clear();Dw(this);this.cd(this.features);U.prototype.sa.call(this)};
function Dw(a){if(void 0!==a.resolution){a.features.length=0;for(var b=Oa(),c=a.distance*a.resolution,d=a.source.Xe(),e={},f=0,g=d.length;f<g;f++){var h=d[f];w(h).toString()in e||!(h=a.geometryFunction(h))||(h=h.X(),Za(h,b),Qa(b,c,b),h=a.source.Uf(b),h=h.filter(function(a){a=w(a).toString();return a in e?!1:e[a]=!0}),a.features.push(Ew(a,h)))}}}
function Ew(a,b){for(var c=[0,0],d=b.length-1;0<=d;--d){var e=a.geometryFunction(b[d]);e?Ze(c,e.X()):b.splice(d,1)}gf(c,1/b.length);a=new H(new C(c));a.set("features",b);return a};function Fw(a,b){var c=[];Object.keys(b).forEach(function(a){null!==b[a]&&void 0!==b[a]&&c.push(a+"="+encodeURIComponent(b[a]))});var d=c.join("&");a=a.replace(/[?&]$/,"");a=-1===a.indexOf("?")?a+"?":a+"&";return a+d};function Gw(a){a=a||{};Hv.call(this,{attributions:a.attributions,logo:a.logo,projection:a.projection,resolutions:a.resolutions});this.R=void 0!==a.crossOrigin?a.crossOrigin:null;this.T=void 0!==a.hidpi?a.hidpi:!0;this.f=a.url;this.g=a.imageLoadFunction?a.imageLoadFunction:Nv;this.v=a.params||{};this.M=null;this.l=[0,0];this.I=0;this.B=void 0!==a.ratio?a.ratio:1.5}v(Gw,Hv);k=Gw.prototype;k.co=function(){return this.v};
k.Jc=function(a,b,c,d){if(void 0===this.f)return null;b=Iv(this,b);c=this.T?c:1;var e=this.M;if(e&&this.I==this.i&&e.resolution==b&&e.a==c&&Va(e.G(),a))return e;e={F:"image",FORMAT:"PNG32",TRANSPARENT:!0};tb(e,this.v);a=a.slice();var f=(a[0]+a[2])/2,g=(a[1]+a[3])/2;if(1!=this.B){var h=this.B*lb(a)/2,l=this.B*mb(a)/2;a[0]=f-h;a[1]=g-l;a[2]=f+h;a[3]=g+l}var h=b/c,l=Math.ceil(lb(a)/h),m=Math.ceil(mb(a)/h);a[0]=f-h*l/2;a[2]=f+h*l/2;a[1]=g-h*m/2;a[3]=g+h*m/2;this.l[0]=l;this.l[1]=m;f=a;g=this.l;h=c;d=
d.mb.split(":").pop();e.SIZE=g[0]+","+g[1];e.BBOX=f.join(",");e.BBOXSR=d;e.IMAGESR=d;e.DPI=Math.round(90*h);d=this.f;f=d.replace(/MapServer\/?$/,"MapServer/export").replace(/ImageServer\/?$/,"ImageServer/exportImage");f==d&&xa(!1,50);e=Fw(f,e);this.M=new Js(a,b,c,this.j,e,this.R,this.g);this.I=this.i;y(this.M,"change",this.o,this);return this.M};k.bo=function(){return this.g};k.eo=function(){return this.f};k.fo=function(a){this.M=null;this.g=a;this.s()};
k.ho=function(a){a!=this.f&&(this.f=a,this.M=null,this.s())};k.io=function(a){tb(this.v,a);this.M=null;this.s()};function Hw(a){Hv.call(this,{projection:a.projection,resolutions:a.resolutions});this.R=void 0!==a.crossOrigin?a.crossOrigin:null;this.l=void 0!==a.displayDpi?a.displayDpi:96;this.g=a.params||{};this.I=a.url;this.f=a.imageLoadFunction?a.imageLoadFunction:Nv;this.T=void 0!==a.hidpi?a.hidpi:!0;this.pa=void 0!==a.metersPerUnit?a.metersPerUnit:1;this.v=void 0!==a.ratio?a.ratio:1;this.va=void 0!==a.useOverlay?a.useOverlay:!1;this.M=null;this.B=0}v(Hw,Hv);k=Hw.prototype;k.ko=function(){return this.g};
k.Jc=function(a,b,c){b=Iv(this,b);c=this.T?c:1;var d=this.M;if(d&&this.B==this.i&&d.resolution==b&&d.a==c&&Va(d.G(),a))return d;1!=this.v&&(a=a.slice(),rb(a,this.v));var e=[lb(a)/b*c,mb(a)/b*c];if(void 0!==this.I){var d=this.I,f=nb(a),g=this.pa,h=lb(a),l=mb(a),m=e[0],n=e[1],p=.0254/this.l,e={OPERATION:this.va?"GETDYNAMICMAPOVERLAYIMAGE":"GETMAPIMAGE",VERSION:"2.0.0",LOCALE:"en",CLIENTAGENT:"ol.source.ImageMapGuide source",CLIP:"1",SETDISPLAYDPI:this.l,SETDISPLAYWIDTH:Math.round(e[0]),SETDISPLAYHEIGHT:Math.round(e[1]),
SETVIEWSCALE:n*h>m*l?h*g/(m*p):l*g/(n*p),SETVIEWCENTERX:f[0],SETVIEWCENTERY:f[1]};tb(e,this.g);d=Fw(d,e);d=new Js(a,b,c,this.j,d,this.R,this.f);y(d,"change",this.o,this)}else d=null;this.M=d;this.B=this.i;return d};k.jo=function(){return this.f};k.mo=function(a){tb(this.g,a);this.s()};k.lo=function(a){this.M=null;this.f=a;this.s()};function Iw(a){var b=a.imageExtent,c=void 0!==a.crossOrigin?a.crossOrigin:null,d=a.imageLoadFunction?a.imageLoadFunction:Nv;Hv.call(this,{attributions:a.attributions,logo:a.logo,projection:Tb(a.projection)});this.M=new Js(b,void 0,1,this.j,a.url,c,d);this.f=a.imageSize?a.imageSize:null;y(this.M,"change",this.o,this)}v(Iw,Hv);Iw.prototype.Jc=function(a){return qb(a,this.M.G())?this.M:null};
Iw.prototype.o=function(a){if(2==this.M.getState()){var b=this.M.G(),c=this.M.Y();if(this.f){var d=this.f[0];var e=this.f[1]}else d=c.width,e=c.height;b=Math.ceil(lb(b)/(mb(b)/e));if(b!=d){var b=jd(b,e),f=b.canvas;b.drawImage(c,0,0,d,e,0,0,f.width,f.height);this.M.Og(f)}}Hv.prototype.o.call(this,a)};function Jw(a){a=a||{};Hv.call(this,{attributions:a.attributions,logo:a.logo,projection:a.projection,resolutions:a.resolutions});this.pa=void 0!==a.crossOrigin?a.crossOrigin:null;this.g=a.url;this.v=a.imageLoadFunction?a.imageLoadFunction:Nv;this.f=a.params||{};this.l=!0;Kw(this);this.T=a.serverType;this.va=void 0!==a.hidpi?a.hidpi:!0;this.M=null;this.B=[0,0];this.R=0;this.I=void 0!==a.ratio?a.ratio:1.5}v(Jw,Hv);var Lw=[101,101];k=Jw.prototype;
k.so=function(a,b,c,d){if(void 0!==this.g){var e=ob(a,b,0,Lw),f={SERVICE:"WMS",VERSION:"1.3.0",REQUEST:"GetFeatureInfo",FORMAT:"image/png",TRANSPARENT:!0,QUERY_LAYERS:this.f.LAYERS};tb(f,this.f,d);d=Math.floor((e[3]-a[1])/b);f[this.l?"I":"X"]=Math.floor((a[0]-e[0])/b);f[this.l?"J":"Y"]=d;return Mw(this,e,Lw,1,Tb(c),f)}};k.uo=function(){return this.f};
k.Jc=function(a,b,c,d){if(void 0===this.g)return null;b=Iv(this,b);1==c||this.va&&void 0!==this.T||(c=1);var e=b/c,f=nb(a),g=ob(f,e,0,[Math.ceil(lb(a)/e),Math.ceil(mb(a)/e)]);a=ob(f,e,0,[Math.ceil(this.I*lb(a)/e),Math.ceil(this.I*mb(a)/e)]);if((f=this.M)&&this.R==this.i&&f.resolution==b&&f.a==c&&Va(f.G(),g))return f;g={SERVICE:"WMS",VERSION:"1.3.0",REQUEST:"GetMap",FORMAT:"image/png",TRANSPARENT:!0};tb(g,this.f);this.B[0]=Math.round(lb(a)/e);this.B[1]=Math.round(mb(a)/e);d=Mw(this,a,this.B,c,d,g);
this.M=new Js(a,b,c,this.j,d,this.pa,this.v);this.R=this.i;y(this.M,"change",this.o,this);return this.M};k.to=function(){return this.v};
function Mw(a,b,c,d,e,f){xa(void 0!==a.g,9);f[a.l?"CRS":"SRS"]=e.mb;"STYLES"in a.f||(f.STYLES="");if(1!=d)switch(a.T){case "geoserver":d=90*d+.5|0;f.FORMAT_OPTIONS="FORMAT_OPTIONS"in f?f.FORMAT_OPTIONS+(";dpi:"+d):"dpi:"+d;break;case "mapserver":f.MAP_RESOLUTION=90*d;break;case "carmentaserver":case "qgis":f.DPI=90*d;break;default:xa(!1,8)}f.WIDTH=c[0];f.HEIGHT=c[1];c=e.b;var g;a.l&&"ne"==c.substr(0,2)?g=[b[1],b[0],b[3],b[2]]:g=b;f.BBOX=g.join(",");return Fw(a.g,f)}k.vo=function(){return this.g};
k.wo=function(a){this.M=null;this.v=a;this.s()};k.xo=function(a){a!=this.g&&(this.g=a,this.M=null,this.s())};k.yo=function(a){tb(this.f,a);Kw(this);this.M=null;this.s()};function Kw(a){a.l=0<=Ye(a.f.VERSION||"1.3.0")};function Nw(a){a=a||{};var b;void 0!==a.attributions?b=a.attributions:b=[Ow];zw.call(this,{attributions:b,cacheSize:a.cacheSize,crossOrigin:void 0!==a.crossOrigin?a.crossOrigin:"anonymous",opaque:void 0!==a.opaque?a.opaque:!0,maxZoom:void 0!==a.maxZoom?a.maxZoom:19,reprojectionErrorThreshold:a.reprojectionErrorThreshold,tileLoadFunction:a.tileLoadFunction,url:void 0!==a.url?a.url:"https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",wrapX:a.wrapX})}v(Nw,zw);var Ow=new Ac({html:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors.'});Fj.df={};Fj.df.Af=function(){};
(function(a){function b(a,b,c){if(g)return new ImageData(a,b,c);b=h.createImageData(b,c);b.data.set(a);return b}function c(a){var b=!0;try{new ImageData(10,10)}catch(n){b=!1}return function(c){var d=c.buffers,e=c.meta,f=c.width,g=c.height,h=d.length,l=d[0].byteLength;if(c.imageOps){l=Array(h);for(c=0;c<h;++c){var m=c;var n=new Uint8ClampedArray(d[c]);var L=f,oa=g;n=b?new ImageData(n,L,oa):{data:n,width:L,height:oa};l[m]=n}f=a(l,e).data}else{f=new Uint8ClampedArray(l);g=Array(h);m=Array(h);for(c=0;c<
h;++c)g[c]=new Uint8ClampedArray(d[c]),m[c]=[0,0,0,0];for(d=0;d<l;d+=4){for(c=0;c<h;++c)n=g[c],m[c][0]=n[d],m[c][1]=n[d+1],m[c][2]=n[d+2],m[c][3]=n[d+3];c=a(m,e);f[d]=c[0];f[d+1]=c[1];f[d+2]=c[2];f[d+3]=c[3]}}return f.buffer}}function d(a,b){var d=Object.keys(a.lib||{}).map(function(b){return"var "+b+" = "+a.lib[b].toString()+";"}).concat(["var __minion__ = ("+c.toString()+")(",a.operation.toString(),");",'self.addEventListener("message", function(event) {',"  var buffer = __minion__(event.data);",
"  self.postMessage({buffer: buffer, meta: event.data.meta}, [buffer]);","});"]),d=URL.createObjectURL(new Blob(d,{type:"text/javascript"})),d=new Worker(d);d.addEventListener("message",b);return d}function e(a,b){var d=c(a.operation);return{postMessage:function(a){setTimeout(function(){b({data:{buffer:d(a),meta:a.meta}})},0)}}}function f(a){this.Ff=!!a.$l;var b;0===a.threads?b=0:this.Ff?b=1:b=a.threads||1;var c=[];if(b)for(var f=0;f<b;++f)c[f]=d(a,this.gh.bind(this,f));else c[0]=e(a,this.gh.bind(this,
0));this.qe=c;this.Ed=[];this.fk=a.rp||Infinity;this.oe=0;this.bd={};this.Gf=null}var g=!0;try{new ImageData(10,10)}catch(l){g=!1}var h=document.createElement("canvas").getContext("2d");f.prototype.pp=function(a,b,c){this.dk({inputs:a,Qh:b,callback:c});this.dh()};f.prototype.dk=function(a){for(this.Ed.push(a);this.Ed.length>this.fk;)this.Ed.shift().callback(null,null)};f.prototype.dh=function(){if(0===this.oe&&0<this.Ed.length){var a=this.Gf=this.Ed.shift(),b=a.inputs[0].width,c=a.inputs[0].height,
d=a.inputs.map(function(a){return a.data.buffer}),e=this.qe.length;this.oe=e;if(1===e)this.qe[0].postMessage({buffers:d,meta:a.Qh,imageOps:this.Ff,width:b,height:c},d);else for(var f=4*Math.ceil(a.inputs[0].data.length/4/e),g=0;g<e;++g){for(var h=g*f,B=[],E=0,A=d.length;E<A;++E)B.push(d[g].slice(h,h+f));this.qe[g].postMessage({buffers:B,meta:a.Qh,imageOps:this.Ff,width:b,height:c},B)}}};f.prototype.gh=function(a,b){this.Jq||(this.bd[a]=b.data,--this.oe,0===this.oe&&this.gk())};f.prototype.gk=function(){var a=
this.Gf,c=this.qe.length;if(1===c){var d=new Uint8ClampedArray(this.bd[0].buffer);var e=this.bd[0].meta}else{var f=a.inputs[0].data.length;d=new Uint8ClampedArray(f);e=Array(f);for(var f=4*Math.ceil(f/4/c),g=0;g<c;++g){var h=g*f;d.set(new Uint8ClampedArray(this.bd[g].buffer),h);e[g]=this.bd[g].meta}}this.Gf=null;this.bd={};a.callback(null,b(d,a.inputs[0].width,a.inputs[0].height),e);this.dh()};a["default"]={Af:f};a.Af=f})(Fj.df=Fj.df||{});function Pw(a){this.B=null;this.va=void 0!==a.operationType?a.operationType:"pixel";this.Sa=void 0!==a.threads?a.threads:1;this.g=Qw(a.sources);for(var b=0,c=this.g.length;b<c;++b)y(this.g[b],"change",this.s,this);this.T=new Pe(function(){return 1},this.s.bind(this));for(var b=Rw(this.g),c={},d=0,e=b.length;d<e;++d)c[w(b[d].layer)]=b[d];this.f=null;this.I={animate:!1,attributions:{},coordinateToPixelTransform:Bh(),extent:null,focus:null,index:0,layerStates:c,layerStatesArray:b,logos:{},pixelRatio:1,
pixelToCoordinateTransform:Bh(),postRenderFunctions:[],size:[0,0],skippedFeatureUids:{},tileQueue:this.T,time:Date.now(),usedTiles:{},viewState:{rotation:0},viewHints:[],wantedTiles:{}};Hv.call(this,{});a.operation&&this.v(a.operation,a.lib)}v(Pw,Hv);Pw.prototype.v=function(a,b){this.B=new Fj.df.Af({operation:a,$l:"image"===this.va,rp:1,lib:b,threads:this.Sa});this.s()};
Pw.prototype.Y=function(a,b,c,d){c=!0;for(var e,f=0,g=this.g.length;f<g;++f)if(e=this.g[f].a.ha(),"ready"!==e.getState()){c=!1;break}if(!c)return null;c=tb({},this.I);c.viewState=tb({},c.viewState);e=nb(a);c.extent=a.slice();c.focus=e;c.size[0]=Math.round(lb(a)/b);c.size[1]=Math.round(mb(a)/b);f=c.viewState;f.center=e;f.projection=d;f.resolution=b;this.l=c;Qe(c.tileQueue,16,16);this.f&&(d=this.f.resolution,c=this.f.G(),b===d&&bb(a,c)||(this.f=null));if(!this.f||this.i!==this.R)a:{a=this.l;d=this.g.length;
b=Array(d);for(c=0;c<d;++c){e=this.g[c];f=a;g=a.layerStatesArray[c];if(e.sd(f,g)){var h=f.size[0],l=f.size[1];if(Sw){var m=Sw.canvas;m.width!==h||m.height!==l?Sw=jd(h,l):Sw.clearRect(0,0,h,l)}else Sw=jd(h,l);e.S(f,g,Sw);e=Sw.getImageData(0,0,h,l)}else e=null;if(e)b[c]=e;else break a}d={};this.b(new Tw(Uw,a,d));this.B.pp(b,d,this.pa.bind(this,a))}return this.f};
Pw.prototype.pa=function(a,b,c,d){if(!b&&c){b=a.extent;var e=a.viewState.resolution;if(e===this.l.viewState.resolution&&bb(b,this.l.extent)){if(this.f)var f=this.f.Y().getContext("2d");else f=jd(Math.round(lb(b)/e),Math.round(mb(b)/e)),this.f=new Ks(b,e,1,this.j,f.canvas);f.putImageData(c,0,0);this.s();this.R=this.i;this.b(new Tw(Vw,a,d))}}};var Sw=null;function Rw(a){return a.map(function(a){return th(a.a)})}
function Qw(a){for(var b=a.length,c=Array(b),d=0;d<b;++d){var e=d,f=a[d],g=null;f instanceof pw?(f=new cw({source:f}),g=new Vv(f)):f instanceof Hv&&(f=new Uv({source:f}),g=new zv(f));c[e]=g}return c}function Tw(a,b,c){Oc.call(this,a);this.extent=b.extent;this.resolution=b.viewState.resolution/b.pixelRatio;this.data=c}v(Tw,Oc);Pw.prototype.Jc=function(){return null};var Uw="beforeoperations",Vw="afteroperations";function Ww(a){var b=a.layer.indexOf("-"),b=Xw[-1==b?a.layer:a.layer.slice(0,b)],c=Yw[a.layer];zw.call(this,{attributions:Zw,cacheSize:a.cacheSize,crossOrigin:"anonymous",maxZoom:void 0!=a.maxZoom?a.maxZoom:b.maxZoom,minZoom:void 0!=a.minZoom?a.minZoom:b.minZoom,opaque:c.opaque,reprojectionErrorThreshold:a.reprojectionErrorThreshold,tileLoadFunction:a.tileLoadFunction,url:void 0!==a.url?a.url:"https://stamen-tiles-{a-d}.a.ssl.fastly.net/"+a.layer+"/{z}/{x}/{y}."+c.Lb,wrapX:a.wrapX})}v(Ww,zw);
var Zw=[new Ac({html:'Map tiles by <a href="http://stamen.com/">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>.'}),Ow],Yw={terrain:{Lb:"jpg",opaque:!0},"terrain-background":{Lb:"jpg",opaque:!0},"terrain-labels":{Lb:"png",opaque:!1},"terrain-lines":{Lb:"png",opaque:!1},"toner-background":{Lb:"png",opaque:!0},toner:{Lb:"png",opaque:!0},"toner-hybrid":{Lb:"png",opaque:!1},"toner-labels":{Lb:"png",opaque:!1},"toner-lines":{Lb:"png",opaque:!1},"toner-lite":{Lb:"png",
opaque:!0},watercolor:{Lb:"jpg",opaque:!0}},Xw={terrain:{minZoom:4,maxZoom:18},toner:{minZoom:0,maxZoom:20},watercolor:{minZoom:1,maxZoom:16}};function $w(a){a=a||{};X.call(this,{attributions:a.attributions,cacheSize:a.cacheSize,crossOrigin:a.crossOrigin,logo:a.logo,projection:a.projection,reprojectionErrorThreshold:a.reprojectionErrorThreshold,tileGrid:a.tileGrid,tileLoadFunction:a.tileLoadFunction,url:a.url,urls:a.urls,wrapX:void 0!==a.wrapX?a.wrapX:!0});this.f=a.params||{};this.l=Oa();qw(this,ax(this))}v($w,X);function ax(a){var b=0,c=[],d;for(d in a.f)c[b++]=d+"-"+a.f[d];return c.join("/")}$w.prototype.C=function(){return this.f};
$w.prototype.nb=function(a){return a};
$w.prototype.Fc=function(a,b,c){var d=this.tileGrid;d||(d=this.Ta(c));if(!(d.b.length<=a[0])){var e=d.Aa(a,this.l),f=Ma(d.gb(a[0]),this.o);1!=b&&(f=La(f,b,this.o));d={F:"image",FORMAT:"PNG32",TRANSPARENT:!0};tb(d,this.f);var g=this.urls;g?(c=c.mb.split(":").pop(),d.SIZE=f[0]+","+f[1],d.BBOX=e.join(","),d.BBOXSR=c,d.IMAGESR=c,d.DPI=Math.round(d.DPI?d.DPI*b:90*b),a=(1==g.length?g[0]:g[Ia((a[1]<<a[0])+a[2],g.length)]).replace(/MapServer\/?$/,"MapServer/export").replace(/ImageServer\/?$/,"ImageServer/exportImage"),
a=Fw(a,d)):a=void 0;return a}};$w.prototype.B=function(a){tb(this.f,a);qw(this,ax(this))};function bx(a){pw.call(this,{opaque:!1,projection:a.projection,tileGrid:a.tileGrid,wrapX:void 0!==a.wrapX?a.wrapX:!0})}v(bx,pw);bx.prototype.Nc=function(a,b,c){var d=this.Sb(a,b,c);if(this.a.b.hasOwnProperty(d))return this.a.get(d);var e=Ma(this.tileGrid.gb(a));a=[a,b,c];b=(b=rw(this,a))?rw(this,b).toString():"";e=new cx(a,e,b);this.a.set(d,e);return e};function cx(a,b,c){Ls.call(this,a,2);this.c=b;this.Ia=c;this.a=null}v(cx,Ls);
cx.prototype.Y=function(){if(this.a)return this.a;var a=this.c,b=jd(a[0],a[1]);b.strokeStyle="black";b.strokeRect(.5,.5,a[0]+.5,a[1]+.5);b.fillStyle="black";b.textAlign="center";b.textBaseline="middle";b.font="24px sans-serif";b.fillText(this.Ia,a[0]/2,a[1]/2);return this.a=b.canvas};cx.prototype.load=function(){};function dx(a){this.f=null;X.call(this,{attributions:a.attributions,cacheSize:a.cacheSize,crossOrigin:a.crossOrigin,projection:Tb("EPSG:3857"),reprojectionErrorThreshold:a.reprojectionErrorThreshold,state:"loading",tileLoadFunction:a.tileLoadFunction,wrapX:void 0!==a.wrapX?a.wrapX:!0});if(a.url)if(a.jsonp)gw(a.url,this.og.bind(this),this.Ve.bind(this));else{var b=new XMLHttpRequest;b.addEventListener("load",this.Ao.bind(this));b.addEventListener("error",this.zo.bind(this));b.open("GET",a.url);b.send()}else a.tileJSON?
this.og(a.tileJSON):xa(!1,51)}v(dx,X);k=dx.prototype;k.Ao=function(a){a=a.target;if(!a.status||200<=a.status&&300>a.status){try{var b=JSON.parse(a.responseText)}catch(c){this.Ve();return}this.og(b)}else this.Ve()};k.zo=function(){this.Ve()};k.pl=function(){return this.f};
k.og=function(a){var b=Tb("EPSG:4326"),c=this.c;if(a.bounds){var d=Vb(b,c);var e=sb(a.bounds,d)}var f=a.minzoom||0,d=a.maxzoom||22;this.tileGrid=c=xc({extent:zc(c),maxZoom:d,minZoom:f});this.tileUrlFunction=jw(a.tiles,c);if(void 0!==a.attribution&&!this.j){b=void 0!==e?e:b.G();e={};for(var g;f<=d;++f)g=f.toString(),e[g]=[oc(c,b,f)];this.ua([new Ac({html:a.attribution,tileRanges:e})])}this.f=a;bu(this,"ready")};k.Ve=function(){bu(this,"error")};function ex(a){pw.call(this,{projection:Tb("EPSG:3857"),state:"loading"});this.v=void 0!==a.preemptive?a.preemptive:!0;this.l=lw;this.g=void 0;this.f=a.jsonp||!1;if(a.url)if(this.f)gw(a.url,this.pg.bind(this),this.We.bind(this));else{var b=new XMLHttpRequest;b.addEventListener("load",this.Eo.bind(this));b.addEventListener("error",this.Do.bind(this));b.open("GET",a.url);b.send()}else a.tileJSON?this.pg(a.tileJSON):xa(!1,51)}v(ex,pw);k=ex.prototype;
k.Eo=function(a){a=a.target;if(!a.status||200<=a.status&&300>a.status){try{var b=JSON.parse(a.responseText)}catch(c){this.We();return}this.pg(b)}else this.We()};k.Do=function(){this.We()};k.ml=function(){return this.g};k.zk=function(a,b,c,d,e){this.tileGrid?(b=this.tileGrid.Be(a,b),fx(this.Nc(b[0],b[1],b[2],1,this.c),a,c,d,e)):!0===e?setTimeout(function(){c.call(d,null)},0):c.call(d,null)};k.We=function(){bu(this,"error")};
k.pg=function(a){var b=Tb("EPSG:4326"),c=this.c;if(a.bounds){var d=Vb(b,c);var e=sb(a.bounds,d)}var f=a.minzoom||0,d=a.maxzoom||22;this.tileGrid=c=xc({extent:zc(c),maxZoom:d,minZoom:f});this.g=a.template;var g=a.grids;if(g){this.l=jw(g,c);if(void 0!==a.attribution){b=void 0!==e?e:b.G();for(e={};f<=d;++f)g=f.toString(),e[g]=[oc(c,b,f)];this.ua([new Ac({html:a.attribution,tileRanges:e})])}bu(this,"ready")}else bu(this,"error")};
k.Nc=function(a,b,c,d,e){var f=this.Sb(a,b,c);if(this.a.b.hasOwnProperty(f))return this.a.get(f);a=[a,b,c];b=rw(this,a,e);d=this.l(b,d,e);d=new gx(a,void 0!==d?0:4,void 0!==d?d:"",this.tileGrid.Aa(a),this.v,this.f);this.a.set(f,d);return d};k.Ug=function(a,b,c){a=this.Sb(a,b,c);this.a.b.hasOwnProperty(a)&&this.a.get(a)};function gx(a,b,c,d,e,f){Ls.call(this,a,b);this.o=c;this.a=d;this.v=e;this.c=this.j=this.g=null;this.l=f}v(gx,Ls);k=gx.prototype;k.Y=function(){return null};
k.getData=function(a){if(!this.g||!this.j)return null;var b=this.g[Math.floor((1-(a[1]-this.a[1])/(this.a[3]-this.a[1]))*this.g.length)];if("string"!==typeof b)return null;b=b.charCodeAt(Math.floor((a[0]-this.a[0])/(this.a[2]-this.a[0])*b.length));93<=b&&b--;35<=b&&b--;b-=32;a=null;b in this.j&&(b=this.j[b],this.c&&b in this.c?a=this.c[b]:a=b);return a};
function fx(a,b,c,d,e){0==a.state&&!0===e?(Jc(a,"change",function(){c.call(d,this.getData(b))},a),hx(a)):!0===e?setTimeout(function(){c.call(d,this.getData(b))}.bind(a),0):c.call(d,a.getData(b))}k.bb=function(){return this.o};k.De=function(){this.state=3;this.s()};k.Ji=function(a){this.g=a.grid;this.j=a.keys;this.c=a.data;this.state=4;this.s()};
function hx(a){if(0==a.state)if(a.state=1,a.l)gw(a.o,a.Ji.bind(a),a.De.bind(a));else{var b=new XMLHttpRequest;b.addEventListener("load",a.Co.bind(a));b.addEventListener("error",a.Bo.bind(a));b.open("GET",a.o);b.send()}}k.Co=function(a){a=a.target;if(!a.status||200<=a.status&&300>a.status){try{var b=JSON.parse(a.responseText)}catch(c){this.De();return}this.Ji(b)}else this.De()};k.Bo=function(){this.De()};k.load=function(){this.v&&hx(this)};function ix(a){a=a||{};var b=a.params||{};X.call(this,{attributions:a.attributions,cacheSize:a.cacheSize,crossOrigin:a.crossOrigin,logo:a.logo,opaque:!("TRANSPARENT"in b?b.TRANSPARENT:1),projection:a.projection,reprojectionErrorThreshold:a.reprojectionErrorThreshold,tileGrid:a.tileGrid,tileLoadFunction:a.tileLoadFunction,url:a.url,urls:a.urls,wrapX:void 0!==a.wrapX?a.wrapX:!0});this.C=void 0!==a.gutter?a.gutter:0;this.f=b;this.l=!0;this.B=a.serverType;this.T=void 0!==a.hidpi?a.hidpi:!0;this.R="";
jx(this);this.fa=Oa();kx(this);qw(this,lx(this))}v(ix,X);k=ix.prototype;
k.Fo=function(a,b,c,d){c=Tb(c);var e=this.tileGrid;e||(e=this.Ta(c));b=e.Be(a,b);if(!(e.b.length<=b[0])){var f=e.Da(b[0]),g=e.Aa(b,this.fa),e=Ma(e.gb(b[0]),this.o),h=this.C;h&&(e=Ka(e,h,this.o),g=Qa(g,f*h,g));h={SERVICE:"WMS",VERSION:"1.3.0",REQUEST:"GetFeatureInfo",FORMAT:"image/png",TRANSPARENT:!0,QUERY_LAYERS:this.f.LAYERS};tb(h,this.f,d);d=Math.floor((g[3]-a[1])/f);h[this.l?"I":"X"]=Math.floor((a[0]-g[0])/f);h[this.l?"J":"Y"]=d;return mx(this,b,e,g,1,c,h)}};k.Xf=function(){return this.C};
k.Sb=function(a,b,c){return this.R+X.prototype.Sb.call(this,a,b,c)};k.Go=function(){return this.f};
function mx(a,b,c,d,e,f,g){var h=a.urls;if(h){g.WIDTH=c[0];g.HEIGHT=c[1];g[a.l?"CRS":"SRS"]=f.mb;"STYLES"in a.f||(g.STYLES="");if(1!=e)switch(a.B){case "geoserver":c=90*e+.5|0;g.FORMAT_OPTIONS="FORMAT_OPTIONS"in g?g.FORMAT_OPTIONS+(";dpi:"+c):"dpi:"+c;break;case "mapserver":g.MAP_RESOLUTION=90*e;break;case "carmentaserver":case "qgis":g.DPI=90*e;break;default:xa(!1,52)}f=f.b;a.l&&"ne"==f.substr(0,2)&&(a=d[0],d[0]=d[1],d[1]=a,a=d[2],d[2]=d[3],d[3]=a);g.BBOX=d.join(",");return Fw(1==h.length?h[0]:h[Ia((b[1]<<
b[0])+b[2],h.length)],g)}}k.nb=function(a){return this.T&&void 0!==this.B?a:1};function jx(a){var b=0,c=[];if(a.urls){var d;var e=0;for(d=a.urls.length;e<d;++e)c[b++]=a.urls[e]}a.R=c.join("#")}function lx(a){var b=0,c=[],d;for(d in a.f)c[b++]=d+"-"+a.f[d];return c.join("/")}
k.Fc=function(a,b,c){var d=this.tileGrid;d||(d=this.Ta(c));if(!(d.b.length<=a[0])){1==b||this.T&&void 0!==this.B||(b=1);var e=d.Da(a[0]),f=d.Aa(a,this.fa),d=Ma(d.gb(a[0]),this.o),g=this.C;g&&(d=Ka(d,g,this.o),f=Qa(f,e*g,f));1!=b&&(d=La(d,b,this.o));e={SERVICE:"WMS",VERSION:"1.3.0",REQUEST:"GetMap",FORMAT:"image/png",TRANSPARENT:!0};tb(e,this.f);return mx(this,a,d,f,b,c,e)}};k.eb=function(a){X.prototype.eb.call(this,a);jx(this)};k.Ho=function(a){tb(this.f,a);jx(this);kx(this);qw(this,lx(this))};
function kx(a){a.l=0<=Ye(a.f.VERSION||"1.3.0")};function nx(a,b,c,d,e,f,g,h,l,m,n,p,q,r){Ls.call(this,a,b);this.j=null;this.o={Nd:!1,Kg:null,mf:-1,Lg:-1};this.c=m;this.a=[];this.u=c;this.v=f;this.g=[];this.l=[];if(f){var u=l.Aa(f),x=l.Da(a[0]);h.Rf(u,h.tc(x),function(a){var b=pb(u,h.Aa(a));if(.5<=lb(b)/x&&.5<=mb(b)/x){var b=a.toString(),c=m[b];c||(c=g(a,n,p),c=m[b]=new q(a,void 0==c?4:0,void 0==c?"":c,d,e),this.l.push(y(c,"change",r)));c.j++;this.a.push(b)}}.bind(this))}}v(nx,Ls);
nx.prototype.ka=function(){for(var a=0,b=this.a.length;a<b;++a){var c=this.a[a],d=this.c[c];d.j--;d.j||(delete this.c[c],Nc(d))}this.a.length=0;this.c=null;1==this.state&&(this.g.forEach(Ec),this.g.length=0);this.i&&Nc(this.i);this.state=5;this.s();this.l.forEach(Ec);this.l.length=0;Ls.prototype.ka.call(this)};nx.prototype.Y=function(){return-1==this.o.Lg?null:this.j.canvas};nx.prototype.bb=function(){return this.a.join("/")+"/"+this.u};
nx.prototype.load=function(){var a=0,b=!1;0==this.state&&Ns(this,1);1==this.state&&this.a.forEach(function(c){var d=this.c[c];0==d.state?(d.Pg(this.S),d.load()):3==d.state?b=!0:4==d.state&&ma(this.a,c);if(1==d.state){var e=y(d,"change",function(){var f=d.getState();if(2==f||3==f)--a,Ec(e),ma(this.g,e),3==f&&(ma(this.a,c),b=!0),a||Ns(this,0<this.a.length?2:3)}.bind(this));this.g.push(e);++a}}.bind(this));a||setTimeout(function(){Ns(this,0<this.a.length?2:b?3:4)}.bind(this),0)};
function ox(a,b){a.Pg(Cl(b,a.o,a.$o.bind(a),a.Zo.bind(a)))};function px(a,b,c,d,e){Ls.call(this,a,b);this.j=0;this.o=d;this.g=null;this.c={};this.u=e;this.l=c}v(px,Ls);k=px.prototype;k.ka=function(){this.g=null;this.c={};this.state=5;this.s();Ls.prototype.ka.call(this)};k.Lm=function(){return this.o};k.Km=function(){return this.g};k.bb=function(){return this.l};k.Mm=function(){return this.a};k.load=function(){0==this.state&&(Ns(this,1),this.u(this,this.l),this.v(null,NaN,null))};k.$o=function(a,b){this.ig(b);this.mj(a)};k.Zo=function(){Ns(this,3)};
k.mj=function(a){this.g=a;Ns(this,2)};k.ig=function(a){this.a=a};k.Pg=function(a){this.v=a};function qx(a){tw.call(this,{attributions:a.attributions,cacheSize:void 0!==a.cacheSize?a.cacheSize:128,extent:a.extent,logo:a.logo,opaque:!1,projection:a.projection,state:a.state,tileGrid:a.tileGrid,tileLoadFunction:a.tileLoadFunction?a.tileLoadFunction:ox,tileUrlFunction:a.tileUrlFunction,tilePixelRatio:a.tilePixelRatio,url:a.url,urls:a.urls,wrapX:void 0===a.wrapX?!0:a.wrapX});this.g=a.format?a.format:null;this.v={};this.l=void 0==a.overlaps?!0:a.overlaps;this.tileClass=a.tileClass?a.tileClass:
px;this.f={};this.tileGrid||(this.tileGrid=this.Ta(Tb(a.projection||"EPSG:3857")))}v(qx,tw);qx.prototype.Nc=function(a,b,c,d,e){var f=this.Sb(a,b,c);if(this.a.b.hasOwnProperty(f))return this.a.get(f);a=[a,b,c];c=(b=rw(this,a,e))?this.tileUrlFunction(b,d,e):void 0;d=new nx(a,void 0!==c?0:4,void 0!==c?c:"",this.g,this.tileLoadFunction,b,this.tileUrlFunction,this.tileGrid,this.Ta(e),this.v,d,e,this.tileClass,this.Li.bind(this));this.a.set(f,d);return d};
qx.prototype.Ta=function(a){var b=a.mb,c=this.f[b];c||(c=this.tileGrid,c=this.f[b]=wc(a,void 0,c?c.gb(c.minZoom):void 0));return c};qx.prototype.nb=function(a){return void 0==a?tw.prototype.nb.call(this,a):a};qx.prototype.Xd=function(a,b,c){a=Ma(this.Ta(c).gb(a));return[Math.round(a[0]*b),Math.round(a[1]*b)]};function rx(a){this.o=a.matrixIds;lc.call(this,{extent:a.extent,origin:a.origin,origins:a.origins,resolutions:a.resolutions,tileSize:a.tileSize,tileSizes:a.tileSizes,sizes:a.sizes})}v(rx,lc);rx.prototype.l=function(){return this.o};
function sx(a,b,c){var d=[],e=[],f=[],g=[],h=[],l=void 0!==c?c:[];c=Tb(a.SupportedCRS.replace(/urn:ogc:def:crs:(\w+):(.*:)?(\w+)$/,"$1:$3"));var m=c.sc(),n="ne"==c.b.substr(0,2);a.TileMatrix.sort(function(a,b){return b.ScaleDenominator-a.ScaleDenominator});a.TileMatrix.forEach(function(a){var b;0<l.length?b=na(l,function(b){return a.Identifier==b.TileMatrix}):b=!0;if(b){e.push(a.Identifier);b=2.8E-4*a.ScaleDenominator/m;var c=a.TileWidth,p=a.TileHeight;n?f.push([a.TopLeftCorner[1],a.TopLeftCorner[0]]):
f.push(a.TopLeftCorner);d.push(b);g.push(c==p?c:[c,p]);h.push([a.MatrixWidth,-a.MatrixHeight])}});return new rx({extent:b,origins:f,resolutions:d,matrixIds:e,tileSizes:g,sizes:h})};function Z(a){function b(a){a="KVP"==d?Fw(a,f):a.replace(/\{(\w+?)\}/g,function(a,b){return b.toLowerCase()in f?f[b.toLowerCase()]:a});return function(b){if(b){var c={TileMatrix:e.o[b[0]],TileCol:b[1],TileRow:-b[2]-1};tb(c,g);b=a;return b="KVP"==d?Fw(b,c):b.replace(/\{(\w+?)\}/g,function(a,b){return c[b]})}}}this.fa=void 0!==a.version?a.version:"1.0.0";this.C=void 0!==a.format?a.format:"image/jpeg";this.f=a.dimensions?a.dimensions:{};this.B=a.layer;this.l=a.matrixSet;this.R=a.style;var c=a.urls;void 0===
c&&void 0!==a.url&&(c=mw(a.url));var d=this.T=void 0!==a.requestEncoding?a.requestEncoding:"KVP",e=a.tileGrid,f={layer:this.B,style:this.R,tilematrixset:this.l};"KVP"==d&&tb(f,{Service:"WMTS",Request:"GetTile",Version:this.fa,Format:this.C});var g=this.f,h=c&&0<c.length?kw(c.map(b)):lw;X.call(this,{attributions:a.attributions,cacheSize:a.cacheSize,crossOrigin:a.crossOrigin,logo:a.logo,projection:a.projection,reprojectionErrorThreshold:a.reprojectionErrorThreshold,tileClass:a.tileClass,tileGrid:e,
tileLoadFunction:a.tileLoadFunction,tilePixelRatio:a.tilePixelRatio,tileUrlFunction:h,urls:c,wrapX:void 0!==a.wrapX?a.wrapX:!1});qw(this,tx(this))}v(Z,X);k=Z.prototype;k.Mk=function(){return this.f};k.Io=function(){return this.C};k.Jo=function(){return this.B};k.$k=function(){return this.l};k.kl=function(){return this.T};k.Ko=function(){return this.R};k.rl=function(){return this.fa};function tx(a){var b=0,c=[],d;for(d in a.f)c[b++]=d+"-"+a.f[d];return c.join("/")}
k.uq=function(a){tb(this.f,a);qw(this,tx(this))};function ux(a){a=a||{};var b=a.size,c=b[0],d=b[1],e=[],f=256;switch(void 0!==a.tierSizeCalculation?a.tierSizeCalculation:vx){case vx:for(;c>f||d>f;)e.push([Math.ceil(c/f),Math.ceil(d/f)]),f+=f;break;case wx:for(;c>f||d>f;)e.push([Math.ceil(c/f),Math.ceil(d/f)]),c>>=1,d>>=1;break;default:xa(!1,53)}e.push([1,1]);e.reverse();for(var f=[1],g=[0],d=1,c=e.length;d<c;d++)f.push(1<<d),g.push(e[d-1][0]*e[d-1][1]+g[d-1]);f.reverse();b=[0,-b[1],b[0],0];b=new lc({extent:b,origin:ib(b),resolutions:f});(f=a.url)&&
-1==f.indexOf("{TileGroup}")&&(f+="{TileGroup}/{z}-{x}-{y}.jpg");f=mw(f);f=kw(f.map(function(a){return function(b){if(b){var c=b[0],d=b[1];b=-b[2]-1;var f={z:c,x:d,y:b,TileGroup:"TileGroup"+((d+b*e[c][0]+g[c])/256|0)};return a.replace(/\{(\w+?)\}/g,function(a,b){return f[b]})}}}));X.call(this,{attributions:a.attributions,cacheSize:a.cacheSize,crossOrigin:a.crossOrigin,logo:a.logo,projection:a.projection,reprojectionErrorThreshold:a.reprojectionErrorThreshold,tileClass:xx,tileGrid:b,tileUrlFunction:f})}
v(ux,X);function xx(a,b,c,d,e){Os.call(this,a,b,c,d,e);this.a=null}v(xx,Os);xx.prototype.Y=function(){if(this.a)return this.a;var a=Os.prototype.Y.call(this);if(2==this.state){if(256==a.width&&256==a.height)return this.a=a;var b=jd(256,256);b.drawImage(a,0,0);return this.a=b.canvas}return a};var vx="default",wx="truncated";function yx(a,b){this.b=b;this.a=[{x:0,y:0,width:a,height:a}];this.c={};this.i=jd(a,a);this.f=this.i.canvas}yx.prototype.get=function(a){return this.c[a]||null};
yx.prototype.add=function(a,b,c,d,e){var f;var g=0;for(f=this.a.length;g<f;++g){var h=this.a[g];if(h.width>=b+this.b&&h.height>=c+this.b)return f={offsetX:h.x+this.b,offsetY:h.y+this.b,image:this.f},this.c[a]=f,d.call(e,this.i,h.x+this.b,h.y+this.b),a=g,b+=this.b,d=c+this.b,h.width-b>h.height-d?(c={x:h.x+b,y:h.y,width:h.width-b,height:h.height},b={x:h.x,y:h.y+d,width:b,height:h.height-d},zx(this,a,c,b)):(c={x:h.x+b,y:h.y,width:h.width-b,height:d},b={x:h.x,y:h.y+d,width:h.width,height:h.height-d},
zx(this,a,c,b)),f}return null};function zx(a,b,c,d){b=[b,1];0<c.width&&0<c.height&&b.push(c);0<d.width&&0<d.height&&b.push(d);a.a.splice.apply(a.a,b)};function Ax(a){a=a||{};this.a=void 0!==a.initialSize?a.initialSize:256;this.i=void 0!==a.maxSize?a.maxSize:void 0!==ea?ea:2048;this.b=void 0!==a.space?a.space:1;this.f=[new yx(this.a,this.b)];this.c=this.a;this.g=[new yx(this.c,this.b)]}Ax.prototype.add=function(a,b,c,d,e,f){if(b+this.b>this.i||c+this.b>this.i)return null;d=Bx(this,!1,a,b,c,d,f);if(!d)return null;a=Bx(this,!0,a,b,c,e?e:ua,f);return{offsetX:d.offsetX,offsetY:d.offsetY,image:d.image,Zl:a.image}};
function Bx(a,b,c,d,e,f,g){var h=b?a.g:a.f,l;var m=0;for(l=h.length;m<l;++m){var n=h[m];if(n=n.add(c,d,e,f,g))return n;n||m!==l-1||(b?(n=Math.min(2*a.c,a.i),a.c=n):(n=Math.min(2*a.a,a.i),a.a=n),n=new yx(n,a.b),h.push(n),++l)}return null};wa.prototype.code=wa.prototype.code;t("ol.Attribution",Ac);Ac.prototype.getHTML=Ac.prototype.i;t("ol.Collection",Yc);Yc.prototype.clear=Yc.prototype.clear;Yc.prototype.extend=Yc.prototype.fg;Yc.prototype.forEach=Yc.prototype.forEach;Yc.prototype.getArray=Yc.prototype.tm;Yc.prototype.item=Yc.prototype.item;Yc.prototype.getLength=Yc.prototype.dc;Yc.prototype.insertAt=Yc.prototype.He;Yc.prototype.pop=Yc.prototype.pop;Yc.prototype.push=Yc.prototype.push;Yc.prototype.remove=Yc.prototype.remove;
Yc.prototype.removeAt=Yc.prototype.Hg;Yc.prototype.setAt=Yc.prototype.Wp;bd.prototype.element=bd.prototype.element;t("ol.color.asArray",ed);t("ol.color.asString",gd);t("ol.colorlike.asColorLike",id);t("ol.control.defaults",xd);t("ol.coordinate.add",Ze);t("ol.coordinate.createStringXY",function(a){return function(b){return lf(b,a)}});t("ol.coordinate.format",cf);t("ol.coordinate.rotate",ef);t("ol.coordinate.toStringHDMS",function(a,b){return a?bf("NS",a[1],b)+" "+bf("EW",a[0],b):""});
t("ol.coordinate.toStringXY",lf);t("ol.DeviceOrientation",Rk);Rk.prototype.getAlpha=Rk.prototype.Fk;Rk.prototype.getBeta=Rk.prototype.Ik;Rk.prototype.getGamma=Rk.prototype.Ok;Rk.prototype.getHeading=Rk.prototype.um;Rk.prototype.getTracking=Rk.prototype.Th;Rk.prototype.setTracking=Rk.prototype.gg;t("ol.easing.easeIn",qd);t("ol.easing.easeOut",rd);t("ol.easing.inAndOut",sd);t("ol.easing.linear",td);t("ol.easing.upAndDown",function(a){return.5>a?sd(2*a):1-sd(2*(a-.5))});
t("ol.extent.boundingExtent",Na);t("ol.extent.buffer",Qa);t("ol.extent.containsCoordinate",Ta);t("ol.extent.containsExtent",Va);t("ol.extent.containsXY",Ua);t("ol.extent.createEmpty",Oa);t("ol.extent.equals",bb);t("ol.extent.extend",cb);t("ol.extent.getArea",jb);t("ol.extent.getBottomLeft",eb);t("ol.extent.getBottomRight",gb);t("ol.extent.getCenter",nb);t("ol.extent.getHeight",mb);t("ol.extent.getIntersection",pb);t("ol.extent.getSize",function(a){return[a[2]-a[0],a[3]-a[1]]});
t("ol.extent.getTopLeft",ib);t("ol.extent.getTopRight",hb);t("ol.extent.getWidth",lb);t("ol.extent.intersects",qb);t("ol.extent.isEmpty",kb);t("ol.extent.applyTransform",sb);t("ol.Feature",H);H.prototype.clone=H.prototype.clone;H.prototype.getGeometry=H.prototype.V;H.prototype.getId=H.prototype.wm;H.prototype.getGeometryName=H.prototype.Qk;H.prototype.getStyle=H.prototype.xm;H.prototype.getStyleFunction=H.prototype.Lc;H.prototype.setGeometry=H.prototype.Ra;H.prototype.setStyle=H.prototype.hg;
H.prototype.setId=H.prototype.jc;H.prototype.setGeometryName=H.prototype.Tc;t("ol.featureloader.xhr",Dl);t("ol.Geolocation",xs);xs.prototype.getAccuracy=xs.prototype.Dk;xs.prototype.getAccuracyGeometry=xs.prototype.Ek;xs.prototype.getAltitude=xs.prototype.Gk;xs.prototype.getAltitudeAccuracy=xs.prototype.Hk;xs.prototype.getHeading=xs.prototype.ym;xs.prototype.getPosition=xs.prototype.zm;xs.prototype.getProjection=xs.prototype.Uh;xs.prototype.getSpeed=xs.prototype.ll;xs.prototype.getTracking=xs.prototype.Vh;
xs.prototype.getTrackingOptions=xs.prototype.Gh;xs.prototype.setProjection=xs.prototype.Wh;xs.prototype.setTracking=xs.prototype.Ke;xs.prototype.setTrackingOptions=xs.prototype.wj;t("ol.Graticule",Ds);Ds.prototype.getMap=Ds.prototype.Cm;Ds.prototype.getMeridians=Ds.prototype.al;Ds.prototype.getParallels=Ds.prototype.hl;Ds.prototype.setMap=Ds.prototype.setMap;t("ol.has.DEVICE_PIXEL_RATIO",Sd);t("ol.has.CANVAS",Ud);t("ol.has.DEVICE_ORIENTATION",Vd);t("ol.has.GEOLOCATION",Wd);t("ol.has.TOUCH",Xd);
t("ol.has.WEBGL",Md);Js.prototype.getImage=Js.prototype.Y;Js.prototype.load=Js.prototype.load;Os.prototype.getImage=Os.prototype.Y;t("ol.inherits",v);t("ol.interaction.defaults",qh);t("ol.Kinetic",kg);t("ol.loadingstrategy.all",Zt);t("ol.loadingstrategy.bbox",function(a){return[a]});t("ol.loadingstrategy.tile",function(a){return function(b,c){c=a.tc(c);b=oc(a,b,c);var d=[];c=[c,0,0];for(c[1]=b.ca;c[1]<=b.$;++c[1])for(c[2]=b.da;c[2]<=b.ia;++c[2])d.push(a.Aa(c));return d}});t("ol.Map",G);
G.prototype.addControl=G.prototype.kk;G.prototype.addInteraction=G.prototype.lk;G.prototype.addLayer=G.prototype.ih;G.prototype.addOverlay=G.prototype.jh;G.prototype.forEachFeatureAtPixel=G.prototype.we;G.prototype.forEachLayerAtPixel=G.prototype.Im;G.prototype.hasFeatureAtPixel=G.prototype.Yl;G.prototype.getEventCoordinate=G.prototype.Tf;G.prototype.getEventPixel=G.prototype.xe;G.prototype.getTarget=G.prototype.ag;G.prototype.getTargetElement=G.prototype.jd;G.prototype.getCoordinateFromPixel=G.prototype.Wa;
G.prototype.getControls=G.prototype.Lk;G.prototype.getOverlays=G.prototype.fl;G.prototype.getOverlayById=G.prototype.el;G.prototype.getInteractions=G.prototype.Sk;G.prototype.getLayerGroup=G.prototype.Kc;G.prototype.getLayers=G.prototype.Xh;G.prototype.getPixelFromCoordinate=G.prototype.Ja;G.prototype.getSize=G.prototype.Ob;G.prototype.getView=G.prototype.Z;G.prototype.getViewport=G.prototype.sl;G.prototype.renderSync=G.prototype.Tp;G.prototype.render=G.prototype.render;
G.prototype.removeControl=G.prototype.Mp;G.prototype.removeInteraction=G.prototype.Np;G.prototype.removeLayer=G.prototype.Pp;G.prototype.removeOverlay=G.prototype.Qp;G.prototype.setLayerGroup=G.prototype.qj;G.prototype.setSize=G.prototype.Qg;G.prototype.setTarget=G.prototype.Le;G.prototype.setView=G.prototype.iq;G.prototype.updateSize=G.prototype.Ad;Jd.prototype.originalEvent=Jd.prototype.originalEvent;Jd.prototype.pixel=Jd.prototype.pixel;Jd.prototype.coordinate=Jd.prototype.coordinate;
Jd.prototype.dragging=Jd.prototype.dragging;Id.prototype.map=Id.prototype.map;Id.prototype.frameState=Id.prototype.frameState;t("ol.Object",Tc);Tc.prototype.get=Tc.prototype.get;Tc.prototype.getKeys=Tc.prototype.O;Tc.prototype.getProperties=Tc.prototype.N;Tc.prototype.set=Tc.prototype.set;Tc.prototype.setProperties=Tc.prototype.H;Tc.prototype.unset=Tc.prototype.P;Xc.prototype.key=Xc.prototype.key;Xc.prototype.oldValue=Xc.prototype.oldValue;t("ol.Observable",Sc);
t("ol.Observable.unByKey",function(a){if(Array.isArray(a))for(var b=0,c=a.length;b<c;++b)Ec(a[b]);else Ec(a)});Sc.prototype.changed=Sc.prototype.s;Sc.prototype.dispatchEvent=Sc.prototype.b;Sc.prototype.getRevision=Sc.prototype.L;Sc.prototype.on=Sc.prototype.J;Sc.prototype.once=Sc.prototype.once;Sc.prototype.un=Sc.prototype.K;t("ol.Overlay",sk);sk.prototype.getElement=sk.prototype.Rd;sk.prototype.getId=sk.prototype.Jm;sk.prototype.getMap=sk.prototype.Me;sk.prototype.getOffset=sk.prototype.Dh;
sk.prototype.getPosition=sk.prototype.Yh;sk.prototype.getPositioning=sk.prototype.Eh;sk.prototype.setElement=sk.prototype.lj;sk.prototype.setMap=sk.prototype.setMap;sk.prototype.setOffset=sk.prototype.rj;sk.prototype.setPosition=sk.prototype.Ne;sk.prototype.setPositioning=sk.prototype.uj;t("ol.proj.METERS_PER_UNIT",zb);t("ol.proj.setProj4",function(a){Ab=a});t("ol.proj.getPointResolution",Sb);t("ol.proj.addEquivalentProjections",Wb);t("ol.proj.addProjection",Xb);
t("ol.proj.addCoordinateTransforms",ac);t("ol.proj.fromLonLat",function(a,b){return gc(a,"EPSG:4326",void 0!==b?b:"EPSG:3857")});t("ol.proj.toLonLat",function(a,b){return gc(a,void 0!==b?b:"EPSG:3857","EPSG:4326")});t("ol.proj.get",Tb);t("ol.proj.equivalent",dc);t("ol.proj.getTransform",ec);t("ol.proj.transform",gc);t("ol.proj.transformExtent",hc);
t("ol.render.toContext",function(a,b){var c=a.canvas,d=b?b:{};b=d.pixelRatio||Sd;if(d=d.size)c.width=d[0]*b,c.height=d[1]*b,c.style.width=d[0]+"px",c.style.height=d[1]+"px";c=[0,0,c.width,c.height];d=Ih(Bh(),b,b);return new Xh(a,b,c,d,0)});t("ol.size.toSize",Ma);t("ol.Sphere",xb);xb.prototype.geodesicArea=xb.prototype.a;xb.prototype.haversineDistance=xb.prototype.b;Ls.prototype.getTileCoord=Ls.prototype.f;Ls.prototype.load=Ls.prototype.load;t("ol.tilegrid.createXYZ",xc);px.prototype.getFormat=px.prototype.Lm;
px.prototype.getFeatures=px.prototype.Km;px.prototype.getProjection=px.prototype.Mm;px.prototype.setFeatures=px.prototype.mj;px.prototype.setProjection=px.prototype.ig;px.prototype.setLoader=px.prototype.Pg;t("ol.View",F);F.prototype.animate=F.prototype.animate;F.prototype.getAnimating=F.prototype.Ic;F.prototype.getInteracting=F.prototype.Rk;F.prototype.cancelAnimations=F.prototype.ed;F.prototype.constrainCenter=F.prototype.Ec;F.prototype.constrainResolution=F.prototype.constrainResolution;
F.prototype.constrainRotation=F.prototype.constrainRotation;F.prototype.getCenter=F.prototype.wa;F.prototype.calculateExtent=F.prototype.dd;F.prototype.getMaxResolution=F.prototype.Nm;F.prototype.getMinResolution=F.prototype.Pm;F.prototype.getMaxZoom=F.prototype.Om;F.prototype.setMaxZoom=F.prototype.eq;F.prototype.getMinZoom=F.prototype.Qm;F.prototype.setMinZoom=F.prototype.fq;F.prototype.getProjection=F.prototype.Rm;F.prototype.getResolution=F.prototype.Pa;F.prototype.getResolutions=F.prototype.Sm;
F.prototype.getResolutionForExtent=F.prototype.ze;F.prototype.getRotation=F.prototype.Qa;F.prototype.getZoom=F.prototype.Hh;F.prototype.getZoomForResolution=F.prototype.Ce;F.prototype.fit=F.prototype.Qf;F.prototype.centerOn=F.prototype.uk;F.prototype.rotate=F.prototype.rotate;F.prototype.setCenter=F.prototype.ob;F.prototype.setResolution=F.prototype.Vc;F.prototype.setRotation=F.prototype.Oe;F.prototype.setZoom=F.prototype.lq;t("ol.xml.getAllTextContent",kl);t("ol.xml.parse",pl);
Oi.prototype.getGL=Oi.prototype.Wo;Oi.prototype.useProgram=Oi.prototype.Qc;t("ol.tilegrid.TileGrid",lc);lc.prototype.forEachTileCoord=lc.prototype.Rf;lc.prototype.getMaxZoom=lc.prototype.Ti;lc.prototype.getMinZoom=lc.prototype.Ui;lc.prototype.getOrigin=lc.prototype.Pc;lc.prototype.getResolution=lc.prototype.Da;lc.prototype.getResolutions=lc.prototype.Vi;lc.prototype.getTileCoordExtent=lc.prototype.Aa;lc.prototype.getTileCoordForCoordAndResolution=lc.prototype.Be;
lc.prototype.getTileCoordForCoordAndZ=lc.prototype.bg;lc.prototype.getTileSize=lc.prototype.gb;lc.prototype.getZForResolution=lc.prototype.tc;t("ol.tilegrid.WMTS",rx);rx.prototype.getMatrixIds=rx.prototype.l;t("ol.tilegrid.WMTS.createFromCapabilitiesMatrixSet",sx);t("ol.style.AtlasManager",Ax);t("ol.style.Circle",$k);$k.prototype.setRadius=$k.prototype.Uc;t("ol.style.Fill",al);al.prototype.clone=al.prototype.clone;al.prototype.getColor=al.prototype.i;al.prototype.setColor=al.prototype.c;
t("ol.style.Icon",eo);eo.prototype.clone=eo.prototype.clone;eo.prototype.getAnchor=eo.prototype.Hc;eo.prototype.getColor=eo.prototype.Lo;eo.prototype.getImage=eo.prototype.Y;eo.prototype.getOrigin=eo.prototype.Oc;eo.prototype.getSrc=eo.prototype.Mo;eo.prototype.getSize=eo.prototype.ic;eo.prototype.load=eo.prototype.load;t("ol.style.Image",Xk);Xk.prototype.getOpacity=Xk.prototype.Ze;Xk.prototype.getRotateWithView=Xk.prototype.$e;Xk.prototype.getRotation=Xk.prototype.af;Xk.prototype.getScale=Xk.prototype.bf;
Xk.prototype.getSnapToPixel=Xk.prototype.Ae;Xk.prototype.setOpacity=Xk.prototype.td;Xk.prototype.setRotation=Xk.prototype.cf;Xk.prototype.setScale=Xk.prototype.ud;t("ol.style.RegularShape",Yk);Yk.prototype.clone=Yk.prototype.clone;Yk.prototype.getAnchor=Yk.prototype.Hc;Yk.prototype.getAngle=Yk.prototype.Pi;Yk.prototype.getFill=Yk.prototype.Fa;Yk.prototype.getImage=Yk.prototype.Y;Yk.prototype.getOrigin=Yk.prototype.Oc;Yk.prototype.getPoints=Yk.prototype.Qi;Yk.prototype.getRadius=Yk.prototype.Ri;
Yk.prototype.getRadius2=Yk.prototype.Fh;Yk.prototype.getSize=Yk.prototype.ic;Yk.prototype.getStroke=Yk.prototype.Ga;t("ol.style.Stroke",wj);wj.prototype.clone=wj.prototype.clone;wj.prototype.getColor=wj.prototype.No;wj.prototype.getLineCap=wj.prototype.Vk;wj.prototype.getLineDash=wj.prototype.Oo;wj.prototype.getLineDashOffset=wj.prototype.Wk;wj.prototype.getLineJoin=wj.prototype.Xk;wj.prototype.getMiterLimit=wj.prototype.bl;wj.prototype.getWidth=wj.prototype.Po;wj.prototype.setColor=wj.prototype.Qo;
wj.prototype.setLineCap=wj.prototype.aq;wj.prototype.setLineDash=wj.prototype.setLineDash;wj.prototype.setLineDashOffset=wj.prototype.bq;wj.prototype.setLineJoin=wj.prototype.cq;wj.prototype.setMiterLimit=wj.prototype.gq;wj.prototype.setWidth=wj.prototype.jq;t("ol.style.Style",bl);bl.prototype.clone=bl.prototype.clone;bl.prototype.getGeometry=bl.prototype.V;bl.prototype.getGeometryFunction=bl.prototype.Pk;bl.prototype.getFill=bl.prototype.Fa;bl.prototype.setFill=bl.prototype.pf;
bl.prototype.getImage=bl.prototype.Y;bl.prototype.setImage=bl.prototype.Og;bl.prototype.getStroke=bl.prototype.Ga;bl.prototype.setStroke=bl.prototype.qf;bl.prototype.getText=bl.prototype.Na;bl.prototype.setText=bl.prototype.xd;bl.prototype.getZIndex=bl.prototype.Ba;bl.prototype.setGeometry=bl.prototype.Ra;bl.prototype.setZIndex=bl.prototype.Vb;t("ol.style.Text",fo);fo.prototype.clone=fo.prototype.clone;fo.prototype.getFont=fo.prototype.Nk;fo.prototype.getOffsetX=fo.prototype.cl;
fo.prototype.getOffsetY=fo.prototype.dl;fo.prototype.getFill=fo.prototype.Fa;fo.prototype.getRotateWithView=fo.prototype.Ro;fo.prototype.getRotation=fo.prototype.So;fo.prototype.getScale=fo.prototype.To;fo.prototype.getStroke=fo.prototype.Ga;fo.prototype.getText=fo.prototype.Na;fo.prototype.getTextAlign=fo.prototype.nl;fo.prototype.getTextBaseline=fo.prototype.ol;fo.prototype.setFont=fo.prototype.nj;fo.prototype.setOffsetX=fo.prototype.sj;fo.prototype.setOffsetY=fo.prototype.tj;
fo.prototype.setFill=fo.prototype.pf;fo.prototype.setRotation=fo.prototype.Uo;fo.prototype.setScale=fo.prototype.Si;fo.prototype.setStroke=fo.prototype.qf;fo.prototype.setText=fo.prototype.xd;fo.prototype.setTextAlign=fo.prototype.vj;fo.prototype.setTextBaseline=fo.prototype.hq;t("ol.source.BingMaps",xw);t("ol.source.BingMaps.TOS_ATTRIBUTION",yw);xw.prototype.getApiKey=xw.prototype.T;xw.prototype.getImagerySet=xw.prototype.fa;t("ol.source.CartoDB",Aw);Aw.prototype.getConfig=Aw.prototype.Kk;
Aw.prototype.updateConfig=Aw.prototype.tq;Aw.prototype.setConfig=Aw.prototype.Xp;t("ol.source.Cluster",Y);Y.prototype.getDistance=Y.prototype.$n;Y.prototype.getSource=Y.prototype.ao;Y.prototype.setDistance=Y.prototype.Yp;t("ol.source.Image",Hv);Jv.prototype.image=Jv.prototype.image;t("ol.source.ImageArcGISRest",Gw);Gw.prototype.getParams=Gw.prototype.co;Gw.prototype.getImageLoadFunction=Gw.prototype.bo;Gw.prototype.getUrl=Gw.prototype.eo;Gw.prototype.setImageLoadFunction=Gw.prototype.fo;
Gw.prototype.setUrl=Gw.prototype.ho;Gw.prototype.updateParams=Gw.prototype.io;t("ol.source.ImageCanvas",Ov);t("ol.source.ImageMapGuide",Hw);Hw.prototype.getParams=Hw.prototype.ko;Hw.prototype.getImageLoadFunction=Hw.prototype.jo;Hw.prototype.updateParams=Hw.prototype.mo;Hw.prototype.setImageLoadFunction=Hw.prototype.lo;t("ol.source.ImageStatic",Iw);t("ol.source.ImageVector",Pv);Pv.prototype.getSource=Pv.prototype.no;Pv.prototype.getStyle=Pv.prototype.oo;Pv.prototype.getStyleFunction=Pv.prototype.po;
Pv.prototype.setStyle=Pv.prototype.Ii;t("ol.source.ImageWMS",Jw);Jw.prototype.getGetFeatureInfoUrl=Jw.prototype.so;Jw.prototype.getParams=Jw.prototype.uo;Jw.prototype.getImageLoadFunction=Jw.prototype.to;Jw.prototype.getUrl=Jw.prototype.vo;Jw.prototype.setImageLoadFunction=Jw.prototype.wo;Jw.prototype.setUrl=Jw.prototype.xo;Jw.prototype.updateParams=Jw.prototype.yo;t("ol.source.OSM",Nw);t("ol.source.OSM.ATTRIBUTION",Ow);t("ol.source.Raster",Pw);Pw.prototype.setOperation=Pw.prototype.v;
Tw.prototype.extent=Tw.prototype.extent;Tw.prototype.resolution=Tw.prototype.resolution;Tw.prototype.data=Tw.prototype.data;t("ol.source.Source",$t);$t.prototype.getAttributions=$t.prototype.ya;$t.prototype.getLogo=$t.prototype.xa;$t.prototype.getProjection=$t.prototype.za;$t.prototype.getState=$t.prototype.getState;$t.prototype.refresh=$t.prototype.sa;$t.prototype.setAttributions=$t.prototype.ua;t("ol.source.Stamen",Ww);t("ol.source.Tile",pw);pw.prototype.getTileGrid=pw.prototype.ab;
sw.prototype.tile=sw.prototype.tile;t("ol.source.TileArcGISRest",$w);$w.prototype.getParams=$w.prototype.C;$w.prototype.updateParams=$w.prototype.B;t("ol.source.TileDebug",bx);t("ol.source.TileImage",X);X.prototype.setRenderReprojectionEdges=X.prototype.Pb;X.prototype.setTileGridForProjection=X.prototype.Qb;t("ol.source.TileJSON",dx);dx.prototype.getTileJSON=dx.prototype.pl;t("ol.source.TileUTFGrid",ex);ex.prototype.getTemplate=ex.prototype.ml;ex.prototype.forDataAtCoordinateAndResolution=ex.prototype.zk;
t("ol.source.TileWMS",ix);ix.prototype.getGetFeatureInfoUrl=ix.prototype.Fo;ix.prototype.getParams=ix.prototype.Go;ix.prototype.updateParams=ix.prototype.Ho;tw.prototype.getTileLoadFunction=tw.prototype.pb;tw.prototype.getTileUrlFunction=tw.prototype.qb;tw.prototype.getUrls=tw.prototype.rb;tw.prototype.setTileLoadFunction=tw.prototype.vb;tw.prototype.setTileUrlFunction=tw.prototype.cb;tw.prototype.setUrl=tw.prototype.jb;tw.prototype.setUrls=tw.prototype.eb;t("ol.source.Vector",U);
U.prototype.addFeature=U.prototype.yb;U.prototype.addFeatures=U.prototype.cd;U.prototype.clear=U.prototype.clear;U.prototype.forEachFeature=U.prototype.sh;U.prototype.forEachFeatureInExtent=U.prototype.$b;U.prototype.forEachFeatureIntersectingExtent=U.prototype.th;U.prototype.getFeaturesCollection=U.prototype.Ah;U.prototype.getFeatures=U.prototype.Xe;U.prototype.getFeaturesAtCoordinate=U.prototype.zh;U.prototype.getFeaturesInExtent=U.prototype.Uf;U.prototype.getClosestFeatureToCoordinate=U.prototype.vh;
U.prototype.getExtent=U.prototype.G;U.prototype.getFeatureById=U.prototype.yh;U.prototype.getFormat=U.prototype.Mi;U.prototype.getUrl=U.prototype.Ni;U.prototype.removeFeature=U.prototype.Gb;gu.prototype.feature=gu.prototype.feature;t("ol.source.VectorTile",qx);t("ol.source.WMTS",Z);Z.prototype.getDimensions=Z.prototype.Mk;Z.prototype.getFormat=Z.prototype.Io;Z.prototype.getLayer=Z.prototype.Jo;Z.prototype.getMatrixSet=Z.prototype.$k;Z.prototype.getRequestEncoding=Z.prototype.kl;
Z.prototype.getStyle=Z.prototype.Ko;Z.prototype.getVersion=Z.prototype.rl;Z.prototype.updateDimensions=Z.prototype.uq;
t("ol.source.WMTS.optionsFromCapabilities",function(a,b){var c=na(a.Contents.Layer,function(a){return a.Identifier==b.layer});if(null===c)return null;var d=a.Contents.TileMatrixSet;var e=1<c.TileMatrixSetLink.length?"projection"in b?sa(c.TileMatrixSetLink,function(a){var c=na(d,function(b){return b.Identifier==a.TileMatrixSet}).SupportedCRS.replace(/urn:ogc:def:crs:(\w+):(.*:)?(\w+)$/,"$1:$3"),e=Tb(c),f=Tb(b.projection);return e&&f?dc(e,f):c==b.projection}):sa(c.TileMatrixSetLink,function(a){return a.TileMatrixSet==
b.matrixSet}):0;0>e&&(e=0);var f=c.TileMatrixSetLink[e].TileMatrixSet;var g=c.TileMatrixSetLink[e].TileMatrixSetLimits;var h=c.Format[0];"format"in b&&(h=b.format);e=sa(c.Style,function(a){return"style"in b?a.Title==b.style:a.isDefault});0>e&&(e=0);e=c.Style[e].Identifier;var l={};"Dimension"in c&&c.Dimension.forEach(function(a){var b=a.Identifier,c=a.Default;void 0===c&&(c=a.Value[0]);l[b]=c});var m=na(a.Contents.TileMatrixSet,function(a){return a.Identifier==f});var n="projection"in b?Tb(b.projection):
Tb(m.SupportedCRS.replace(/urn:ogc:def:crs:(\w+):(.*:)?(\w+)$/,"$1:$3"));var p=c.WGS84BoundingBox;if(void 0!==p){var q=Tb("EPSG:4326").G();q=p[0]==q[0]&&p[2]==q[2];var r=hc(p,"EPSG:4326",n);(p=n.G())&&(Va(p,r)||(r=void 0))}g=sx(m,r,g);var u=[],m=b.requestEncoding,m=void 0!==m?m:"";if("OperationsMetadata"in a&&"GetTile"in a.OperationsMetadata)for(a=a.OperationsMetadata.GetTile.DCP.HTTP.Get,r=0,p=a.length;r<p;++r){var x=na(a[r].Constraint,function(a){return"GetEncoding"==a.name}).AllowedValues.Value;
""===m&&(m=x[0]);if("KVP"===m)ja(x,"KVP")&&u.push(a[r].href);else break}u.length||(m="REST",c.ResourceURL.forEach(function(a){"tile"===a.resourceType&&(h=a.format,u.push(a.template))}));return{urls:u,layer:b.layer,matrixSet:f,format:h,projection:n,requestEncoding:m,tileGrid:g,style:e,dimensions:l,wrapX:q,crossOrigin:b.crossOrigin}});t("ol.source.XYZ",zw);t("ol.source.Zoomify",ux);Rh.prototype.vectorContext=Rh.prototype.vectorContext;Rh.prototype.frameState=Rh.prototype.frameState;
Rh.prototype.context=Rh.prototype.context;Rh.prototype.glContext=Rh.prototype.glContext;kq.prototype.get=kq.prototype.get;kq.prototype.getExtent=kq.prototype.G;kq.prototype.getId=kq.prototype.Wn;kq.prototype.getGeometry=kq.prototype.V;kq.prototype.getProperties=kq.prototype.Xn;kq.prototype.getType=kq.prototype.U;t("ol.render.VectorContext",Wh);kk.prototype.setStyle=kk.prototype.rd;kk.prototype.drawGeometry=kk.prototype.zb;kk.prototype.drawFeature=kk.prototype.te;Xh.prototype.drawCircle=Xh.prototype.Zb;
Xh.prototype.setStyle=Xh.prototype.rd;Xh.prototype.drawGeometry=Xh.prototype.zb;Xh.prototype.drawFeature=Xh.prototype.te;t("ol.proj.common.add",ic);t("ol.proj.Projection",Bb);Bb.prototype.getCode=Bb.prototype.Jk;Bb.prototype.getExtent=Bb.prototype.G;Bb.prototype.getUnits=Bb.prototype.Un;Bb.prototype.getMetersPerUnit=Bb.prototype.sc;Bb.prototype.getWorldExtent=Bb.prototype.tl;Bb.prototype.isGlobal=Bb.prototype.dm;Bb.prototype.setGlobal=Bb.prototype.$p;Bb.prototype.setExtent=Bb.prototype.Vn;
Bb.prototype.setWorldExtent=Bb.prototype.kq;Bb.prototype.setGetPointResolution=Bb.prototype.Zp;t("ol.proj.Units.METERS_PER_UNIT",zb);t("ol.layer.Base",sh);sh.prototype.getExtent=sh.prototype.G;sh.prototype.getMaxResolution=sh.prototype.fc;sh.prototype.getMinResolution=sh.prototype.gc;sh.prototype.getOpacity=sh.prototype.hc;sh.prototype.getVisible=sh.prototype.Mb;sh.prototype.getZIndex=sh.prototype.Ba;sh.prototype.setExtent=sh.prototype.vc;sh.prototype.setMaxResolution=sh.prototype.Ac;
sh.prototype.setMinResolution=sh.prototype.Bc;sh.prototype.setOpacity=sh.prototype.wc;sh.prototype.setVisible=sh.prototype.xc;sh.prototype.setZIndex=sh.prototype.Vb;t("ol.layer.Group",uh);uh.prototype.getLayers=uh.prototype.qd;uh.prototype.setLayers=uh.prototype.xi;t("ol.layer.Heatmap",V);V.prototype.getBlur=V.prototype.uh;V.prototype.getGradient=V.prototype.Bh;V.prototype.getRadius=V.prototype.yi;V.prototype.setBlur=V.prototype.jj;V.prototype.setGradient=V.prototype.pj;V.prototype.setRadius=V.prototype.Uc;
t("ol.layer.Image",Uv);Uv.prototype.getSource=Uv.prototype.ha;t("ol.layer.Layer",wh);wh.prototype.getSource=wh.prototype.ha;wh.prototype.setMap=wh.prototype.setMap;wh.prototype.setSource=wh.prototype.Wc;t("ol.layer.Tile",cw);cw.prototype.getPreload=cw.prototype.Ud;cw.prototype.getSource=cw.prototype.ha;cw.prototype.setPreload=cw.prototype.zi;cw.prototype.getUseInterimTilesOnError=cw.prototype.kd;cw.prototype.setUseInterimTilesOnError=cw.prototype.Ai;t("ol.layer.Vector",T);T.prototype.getSource=T.prototype.ha;
T.prototype.getStyle=T.prototype.D;T.prototype.getStyleFunction=T.prototype.C;T.prototype.setStyle=T.prototype.g;t("ol.layer.VectorTile",W);W.prototype.getPreload=W.prototype.Ud;W.prototype.getUseInterimTilesOnError=W.prototype.kd;W.prototype.setPreload=W.prototype.Bi;W.prototype.setUseInterimTilesOnError=W.prototype.Ci;t("ol.interaction.DoubleClickZoom",rg);t("ol.interaction.DoubleClickZoom.handleEvent",sg);t("ol.interaction.DragAndDrop",Rs);t("ol.interaction.DragAndDrop.handleEvent",mf);
Us.prototype.features=Us.prototype.features;Us.prototype.file=Us.prototype.file;Us.prototype.projection=Us.prototype.projection;t("ol.interaction.DragBox",Rg);Rg.prototype.getGeometry=Rg.prototype.V;Wg.prototype.coordinate=Wg.prototype.coordinate;Wg.prototype.mapBrowserEvent=Wg.prototype.mapBrowserEvent;t("ol.interaction.DragPan",Gg);t("ol.interaction.DragRotate",Kg);t("ol.interaction.DragRotateAndZoom",Ys);t("ol.interaction.DragZoom",$g);t("ol.interaction.Draw",ju);
t("ol.interaction.Draw.handleEvent",lu);ju.prototype.removeLastPoint=ju.prototype.Op;ju.prototype.finishDrawing=ju.prototype.Pd;ju.prototype.extend=ju.prototype.vn;t("ol.interaction.Draw.createRegularPolygon",function(a,b){return function(c,d){var e=c[0];c=c[1];var f=Math.sqrt(hf(e,c));d=d?d:Zf(new ys(e),a);$f(d,e,f,b?b:Math.atan((c[1]-e[1])/(c[0]-e[0])));return d}});
t("ol.interaction.Draw.createBox",function(){return function(a,b){a=Na(a);b=b||new D(null);b.ma([[eb(a),gb(a),hb(a),ib(a),eb(a)]]);return b}});zu.prototype.feature=zu.prototype.feature;t("ol.interaction.Extent",Au);Au.prototype.getExtent=Au.prototype.G;Au.prototype.setExtent=Au.prototype.g;Lu.prototype.extent_=Lu.prototype.b;t("ol.interaction.Interaction",ng);ng.prototype.getActive=ng.prototype.c;ng.prototype.getMap=ng.prototype.f;ng.prototype.setActive=ng.prototype.Ha;
t("ol.interaction.KeyboardPan",ah);t("ol.interaction.KeyboardPan.handleEvent",bh);t("ol.interaction.KeyboardZoom",ch);t("ol.interaction.KeyboardZoom.handleEvent",dh);t("ol.interaction.Modify",Nu);t("ol.interaction.Modify.handleEvent",Qu);Nu.prototype.removePoint=Nu.prototype.hj;Vu.prototype.features=Vu.prototype.features;Vu.prototype.mapBrowserEvent=Vu.prototype.mapBrowserEvent;t("ol.interaction.MouseWheelZoom",eh);t("ol.interaction.MouseWheelZoom.handleEvent",fh);eh.prototype.setMouseAnchor=eh.prototype.T;
t("ol.interaction.PinchRotate",ih);t("ol.interaction.PinchZoom",mh);t("ol.interaction.Pointer",Dg);t("ol.interaction.Pointer.handleEvent",Eg);t("ol.interaction.Select",cv);cv.prototype.getFeatures=cv.prototype.Gn;cv.prototype.getHitTolerance=cv.prototype.Hn;cv.prototype.getLayer=cv.prototype.In;t("ol.interaction.Select.handleEvent",dv);cv.prototype.setHitTolerance=cv.prototype.Kn;cv.prototype.setMap=cv.prototype.setMap;fv.prototype.selected=fv.prototype.selected;fv.prototype.deselected=fv.prototype.deselected;
fv.prototype.mapBrowserEvent=fv.prototype.mapBrowserEvent;t("ol.interaction.Snap",hv);hv.prototype.addFeature=hv.prototype.yb;hv.prototype.removeFeature=hv.prototype.Gb;t("ol.interaction.Translate",mv);mv.prototype.getHitTolerance=mv.prototype.B;mv.prototype.setHitTolerance=mv.prototype.I;sv.prototype.features=sv.prototype.features;sv.prototype.coordinate=sv.prototype.coordinate;t("ol.geom.Circle",ys);ys.prototype.clone=ys.prototype.clone;ys.prototype.getCenter=ys.prototype.wa;
ys.prototype.getRadius=ys.prototype.pd;ys.prototype.getType=ys.prototype.U;ys.prototype.intersectsExtent=ys.prototype.Xa;ys.prototype.setCenter=ys.prototype.ob;ys.prototype.setCenterAndRadius=ys.prototype.Ng;ys.prototype.setRadius=ys.prototype.Uc;ys.prototype.transform=ys.prototype.tb;t("ol.geom.Geometry",of);of.prototype.getClosestPoint=of.prototype.Ab;of.prototype.intersectsCoordinate=of.prototype.sb;of.prototype.getExtent=of.prototype.G;of.prototype.rotate=of.prototype.rotate;
of.prototype.scale=of.prototype.scale;of.prototype.simplify=of.prototype.Rb;of.prototype.transform=of.prototype.tb;t("ol.geom.GeometryCollection",tm);tm.prototype.clone=tm.prototype.clone;tm.prototype.getGeometries=tm.prototype.Vf;tm.prototype.getType=tm.prototype.U;tm.prototype.intersectsExtent=tm.prototype.Xa;tm.prototype.setGeometries=tm.prototype.oj;tm.prototype.applyTransform=tm.prototype.Dc;tm.prototype.translate=tm.prototype.translate;t("ol.geom.LinearRing",Jf);Jf.prototype.clone=Jf.prototype.clone;
Jf.prototype.getArea=Jf.prototype.qn;Jf.prototype.getCoordinates=Jf.prototype.X;Jf.prototype.getType=Jf.prototype.U;Jf.prototype.setCoordinates=Jf.prototype.ma;t("ol.geom.LineString",O);O.prototype.appendCoordinate=O.prototype.mk;O.prototype.clone=O.prototype.clone;O.prototype.forEachSegment=O.prototype.Ck;O.prototype.getCoordinateAtM=O.prototype.nn;O.prototype.getCoordinates=O.prototype.X;O.prototype.getCoordinateAt=O.prototype.wh;O.prototype.getLength=O.prototype.pn;O.prototype.getType=O.prototype.U;
O.prototype.intersectsExtent=O.prototype.Xa;O.prototype.setCoordinates=O.prototype.ma;t("ol.geom.MultiLineString",P);P.prototype.appendLineString=P.prototype.nk;P.prototype.clone=P.prototype.clone;P.prototype.getCoordinateAtM=P.prototype.rn;P.prototype.getCoordinates=P.prototype.X;P.prototype.getLineString=P.prototype.Yk;P.prototype.getLineStrings=P.prototype.gd;P.prototype.getType=P.prototype.U;P.prototype.intersectsExtent=P.prototype.Xa;P.prototype.setCoordinates=P.prototype.ma;
t("ol.geom.MultiPoint",Q);Q.prototype.appendPoint=Q.prototype.qk;Q.prototype.clone=Q.prototype.clone;Q.prototype.getCoordinates=Q.prototype.X;Q.prototype.getPoint=Q.prototype.il;Q.prototype.getPoints=Q.prototype.Zd;Q.prototype.getType=Q.prototype.U;Q.prototype.intersectsExtent=Q.prototype.Xa;Q.prototype.setCoordinates=Q.prototype.ma;t("ol.geom.MultiPolygon",R);R.prototype.appendPolygon=R.prototype.rk;R.prototype.clone=R.prototype.clone;R.prototype.getArea=R.prototype.sn;
R.prototype.getCoordinates=R.prototype.X;R.prototype.getInteriorPoints=R.prototype.Uk;R.prototype.getPolygon=R.prototype.jl;R.prototype.getPolygons=R.prototype.Td;R.prototype.getType=R.prototype.U;R.prototype.intersectsExtent=R.prototype.Xa;R.prototype.setCoordinates=R.prototype.ma;t("ol.geom.Point",C);C.prototype.clone=C.prototype.clone;C.prototype.getCoordinates=C.prototype.X;C.prototype.getType=C.prototype.U;C.prototype.intersectsExtent=C.prototype.Xa;C.prototype.setCoordinates=C.prototype.ma;
t("ol.geom.Polygon",D);D.prototype.appendLinearRing=D.prototype.pk;D.prototype.clone=D.prototype.clone;D.prototype.getArea=D.prototype.tn;D.prototype.getCoordinates=D.prototype.X;D.prototype.getInteriorPoint=D.prototype.Tk;D.prototype.getLinearRingCount=D.prototype.Zk;D.prototype.getLinearRing=D.prototype.Ch;D.prototype.getLinearRings=D.prototype.Sd;D.prototype.getType=D.prototype.U;D.prototype.intersectsExtent=D.prototype.Xa;D.prototype.setCoordinates=D.prototype.ma;
t("ol.geom.Polygon.circular",Xf);t("ol.geom.Polygon.fromExtent",Yf);t("ol.geom.Polygon.fromCircle",Zf);t("ol.geom.SimpleGeometry",rf);rf.prototype.getFirstCoordinate=rf.prototype.ac;rf.prototype.getLastCoordinate=rf.prototype.bc;rf.prototype.getLayout=rf.prototype.cc;rf.prototype.applyTransform=rf.prototype.Dc;rf.prototype.translate=rf.prototype.translate;t("ol.format.EsriJSON",Ql);Ql.prototype.readFeature=Ql.prototype.Tb;Ql.prototype.readFeatures=Ql.prototype.Oa;Ql.prototype.readGeometry=Ql.prototype.Sc;
Ql.prototype.readProjection=Ql.prototype.kb;Ql.prototype.writeGeometry=Ql.prototype.$c;Ql.prototype.writeGeometryObject=Ql.prototype.je;Ql.prototype.writeFeature=Ql.prototype.Bd;Ql.prototype.writeFeatureObject=Ql.prototype.Zc;Ql.prototype.writeFeatures=Ql.prototype.Wb;Ql.prototype.writeFeaturesObject=Ql.prototype.he;t("ol.format.Feature",El);t("ol.format.filter.and",rm);
t("ol.format.filter.or",function(a){var b=[null].concat(Array.prototype.slice.call(arguments));return new (Function.prototype.bind.apply(pm,b))});t("ol.format.filter.not",function(a){return new nm(a)});t("ol.format.filter.bbox",sm);t("ol.format.filter.intersects",function(a,b,c){return new hm(a,b,c)});t("ol.format.filter.within",function(a,b,c){return new qm(a,b,c)});t("ol.format.filter.equalTo",function(a,b,c){return new dm(a,b,c)});
t("ol.format.filter.notEqualTo",function(a,b,c){return new om(a,b,c)});t("ol.format.filter.lessThan",function(a,b){return new lm(a,b)});t("ol.format.filter.lessThanOrEqualTo",function(a,b){return new mm(a,b)});t("ol.format.filter.greaterThan",function(a,b){return new em(a,b)});t("ol.format.filter.greaterThanOrEqualTo",function(a,b){return new fm(a,b)});t("ol.format.filter.isNull",function(a){return new km(a)});t("ol.format.filter.between",function(a,b,c){return new im(a,b,c)});
t("ol.format.filter.like",function(a,b,c,d,e,f){return new jm(a,b,c,d,e,f)});t("ol.format.filter.during",function(a,b,c){return new bm(a,b,c)});t("ol.format.GeoJSON",xm);xm.prototype.readFeature=xm.prototype.Tb;xm.prototype.readFeatures=xm.prototype.Oa;xm.prototype.readGeometry=xm.prototype.Sc;xm.prototype.readProjection=xm.prototype.kb;xm.prototype.writeFeature=xm.prototype.Bd;xm.prototype.writeFeatureObject=xm.prototype.Zc;xm.prototype.writeFeatures=xm.prototype.Wb;
xm.prototype.writeFeaturesObject=xm.prototype.he;xm.prototype.writeGeometry=xm.prototype.$c;xm.prototype.writeGeometryObject=xm.prototype.je;t("ol.format.GML",Sm);Sm.prototype.writeFeatures=Sm.prototype.Wb;Sm.prototype.writeFeaturesNode=Sm.prototype.Xb;t("ol.format.GML2",an);t("ol.format.GML3",Sm);Sm.prototype.writeGeometryNode=Sm.prototype.ie;Sm.prototype.writeFeatures=Sm.prototype.Wb;Sm.prototype.writeFeaturesNode=Sm.prototype.Xb;Fm.prototype.readFeatures=Fm.prototype.Oa;t("ol.format.GPX",mn);
mn.prototype.readFeature=mn.prototype.Tb;mn.prototype.readFeatures=mn.prototype.Oa;mn.prototype.readProjection=mn.prototype.kb;mn.prototype.writeFeatures=mn.prototype.Wb;mn.prototype.writeFeaturesNode=mn.prototype.Xb;t("ol.format.IGC",Xn);Xn.prototype.readFeature=Xn.prototype.Tb;Xn.prototype.readFeatures=Xn.prototype.Oa;Xn.prototype.readProjection=Xn.prototype.kb;t("ol.format.KML",go);go.prototype.readFeature=go.prototype.Tb;go.prototype.readFeatures=go.prototype.Oa;go.prototype.readName=go.prototype.Cp;
go.prototype.readNetworkLinks=go.prototype.Dp;go.prototype.readRegion=go.prototype.Gp;go.prototype.readRegionFromNode=go.prototype.lf;go.prototype.readProjection=go.prototype.kb;go.prototype.writeFeatures=go.prototype.Wb;go.prototype.writeFeaturesNode=go.prototype.Xb;t("ol.format.MVT",lq);lq.prototype.readFeatures=lq.prototype.Oa;lq.prototype.readProjection=lq.prototype.kb;lq.prototype.setLayers=lq.prototype.mn;t("ol.format.OSMXML",nq);nq.prototype.readFeatures=nq.prototype.Oa;
nq.prototype.readProjection=nq.prototype.kb;t("ol.format.Polyline",Nq);t("ol.format.Polyline.encodeDeltas",Oq);t("ol.format.Polyline.decodeDeltas",Qq);t("ol.format.Polyline.encodeFloats",Pq);t("ol.format.Polyline.decodeFloats",Rq);Nq.prototype.readFeature=Nq.prototype.Tb;Nq.prototype.readFeatures=Nq.prototype.Oa;Nq.prototype.readGeometry=Nq.prototype.Sc;Nq.prototype.readProjection=Nq.prototype.kb;Nq.prototype.writeGeometry=Nq.prototype.$c;t("ol.format.TopoJSON",Sq);Sq.prototype.readFeatures=Sq.prototype.Oa;
Sq.prototype.readProjection=Sq.prototype.kb;t("ol.format.WFS",Yq);Yq.prototype.readFeatures=Yq.prototype.Oa;Yq.prototype.readTransactionResponse=Yq.prototype.j;Yq.prototype.readFeatureCollectionMetadata=Yq.prototype.g;t("ol.format.WFS.writeFilter",function(a){var b=jl("http://www.opengis.net/ogc","Filter");Bl({node:b},mr,wl(a.kc),[a],[]);return b});Yq.prototype.writeGetFeature=Yq.prototype.l;Yq.prototype.writeTransaction=Yq.prototype.v;Yq.prototype.readProjection=Yq.prototype.kb;
t("ol.format.WKT",sr);sr.prototype.readFeature=sr.prototype.Tb;sr.prototype.readFeatures=sr.prototype.Oa;sr.prototype.readGeometry=sr.prototype.Sc;sr.prototype.writeFeature=sr.prototype.Bd;sr.prototype.writeFeatures=sr.prototype.Wb;sr.prototype.writeGeometry=sr.prototype.$c;t("ol.format.WMSCapabilities",Lr);Lr.prototype.read=Lr.prototype.read;t("ol.format.WMSGetFeatureInfo",hs);hs.prototype.readFeatures=hs.prototype.Oa;t("ol.format.WMTSCapabilities",is);is.prototype.read=is.prototype.read;
t("ol.format.filter.And",Zl);t("ol.format.filter.Bbox",$l);t("ol.format.filter.Comparison",am);t("ol.format.filter.ComparisonBinary",cm);t("ol.format.filter.During",bm);t("ol.format.filter.EqualTo",dm);t("ol.format.filter.Filter",Xl);t("ol.format.filter.GreaterThan",em);t("ol.format.filter.GreaterThanOrEqualTo",fm);t("ol.format.filter.Intersects",hm);t("ol.format.filter.IsBetween",im);t("ol.format.filter.IsLike",jm);t("ol.format.filter.IsNull",km);t("ol.format.filter.LessThan",lm);
t("ol.format.filter.LessThanOrEqualTo",mm);t("ol.format.filter.Not",nm);t("ol.format.filter.NotEqualTo",om);t("ol.format.filter.Or",pm);t("ol.format.filter.Spatial",gm);t("ol.format.filter.Within",qm);t("ol.events.condition.altKeyOnly",function(a){a=a.originalEvent;return a.altKey&&!(a.metaKey||a.ctrlKey)&&!a.shiftKey});t("ol.events.condition.altShiftKeysOnly",tg);t("ol.events.condition.always",mf);t("ol.events.condition.click",function(a){return"click"==a.type});t("ol.events.condition.never",nf);
t("ol.events.condition.pointerMove",vg);t("ol.events.condition.singleClick",wg);t("ol.events.condition.doubleClick",function(a){return"dblclick"==a.type});t("ol.events.condition.noModifierKeys",xg);t("ol.events.condition.platformModifierKeyOnly",function(a){a=a.originalEvent;return!a.altKey&&(Rd?a.metaKey:a.ctrlKey)&&!a.shiftKey});t("ol.events.condition.shiftKeyOnly",yg);t("ol.events.condition.targetNotEditable",Ag);t("ol.events.condition.mouseOnly",Bg);t("ol.events.condition.primaryAction",Cg);
Oc.prototype.type=Oc.prototype.type;Oc.prototype.target=Oc.prototype.target;Oc.prototype.preventDefault=Oc.prototype.preventDefault;Oc.prototype.stopPropagation=Oc.prototype.stopPropagation;t("ol.control.Attribution",nd);t("ol.control.Attribution.render",od);nd.prototype.getCollapsible=nd.prototype.Um;nd.prototype.setCollapsible=nd.prototype.Xm;nd.prototype.setCollapsed=nd.prototype.Wm;nd.prototype.getCollapsed=nd.prototype.Tm;t("ol.control.Control",md);md.prototype.getMap=md.prototype.g;
md.prototype.setMap=md.prototype.setMap;md.prototype.setTarget=md.prototype.f;t("ol.control.FullScreen",yd);t("ol.control.MousePosition",Dd);t("ol.control.MousePosition.render",Ed);Dd.prototype.getCoordinateFormat=Dd.prototype.xh;Dd.prototype.getProjection=Dd.prototype.Zh;Dd.prototype.setCoordinateFormat=Dd.prototype.kj;Dd.prototype.setProjection=Dd.prototype.$h;t("ol.control.OverviewMap",Bk);t("ol.control.OverviewMap.render",Ck);Bk.prototype.getCollapsible=Bk.prototype.$m;
Bk.prototype.setCollapsible=Bk.prototype.cn;Bk.prototype.setCollapsed=Bk.prototype.bn;Bk.prototype.getCollapsed=Bk.prototype.Zm;Bk.prototype.getOverviewMap=Bk.prototype.gl;t("ol.control.Rotate",ud);t("ol.control.Rotate.render",vd);t("ol.control.ScaleLine",Gk);Gk.prototype.getUnits=Gk.prototype.C;t("ol.control.ScaleLine.render",Hk);Gk.prototype.setUnits=Gk.prototype.I;t("ol.control.Zoom",wd);t("ol.control.ZoomSlider",Lk);t("ol.control.ZoomSlider.render",Nk);t("ol.control.ZoomToExtent",Qk);
Tc.prototype.changed=Tc.prototype.s;Tc.prototype.dispatchEvent=Tc.prototype.b;Tc.prototype.getRevision=Tc.prototype.L;Tc.prototype.on=Tc.prototype.J;Tc.prototype.once=Tc.prototype.once;Tc.prototype.un=Tc.prototype.K;Yc.prototype.get=Yc.prototype.get;Yc.prototype.getKeys=Yc.prototype.O;Yc.prototype.getProperties=Yc.prototype.N;Yc.prototype.set=Yc.prototype.set;Yc.prototype.setProperties=Yc.prototype.H;Yc.prototype.unset=Yc.prototype.P;Yc.prototype.changed=Yc.prototype.s;
Yc.prototype.dispatchEvent=Yc.prototype.b;Yc.prototype.getRevision=Yc.prototype.L;Yc.prototype.on=Yc.prototype.J;Yc.prototype.once=Yc.prototype.once;Yc.prototype.un=Yc.prototype.K;bd.prototype.type=bd.prototype.type;bd.prototype.target=bd.prototype.target;bd.prototype.preventDefault=bd.prototype.preventDefault;bd.prototype.stopPropagation=bd.prototype.stopPropagation;Rk.prototype.get=Rk.prototype.get;Rk.prototype.getKeys=Rk.prototype.O;Rk.prototype.getProperties=Rk.prototype.N;Rk.prototype.set=Rk.prototype.set;
Rk.prototype.setProperties=Rk.prototype.H;Rk.prototype.unset=Rk.prototype.P;Rk.prototype.changed=Rk.prototype.s;Rk.prototype.dispatchEvent=Rk.prototype.b;Rk.prototype.getRevision=Rk.prototype.L;Rk.prototype.on=Rk.prototype.J;Rk.prototype.once=Rk.prototype.once;Rk.prototype.un=Rk.prototype.K;H.prototype.get=H.prototype.get;H.prototype.getKeys=H.prototype.O;H.prototype.getProperties=H.prototype.N;H.prototype.set=H.prototype.set;H.prototype.setProperties=H.prototype.H;H.prototype.unset=H.prototype.P;
H.prototype.changed=H.prototype.s;H.prototype.dispatchEvent=H.prototype.b;H.prototype.getRevision=H.prototype.L;H.prototype.on=H.prototype.J;H.prototype.once=H.prototype.once;H.prototype.un=H.prototype.K;xs.prototype.get=xs.prototype.get;xs.prototype.getKeys=xs.prototype.O;xs.prototype.getProperties=xs.prototype.N;xs.prototype.set=xs.prototype.set;xs.prototype.setProperties=xs.prototype.H;xs.prototype.unset=xs.prototype.P;xs.prototype.changed=xs.prototype.s;xs.prototype.dispatchEvent=xs.prototype.b;
xs.prototype.getRevision=xs.prototype.L;xs.prototype.on=xs.prototype.J;xs.prototype.once=xs.prototype.once;xs.prototype.un=xs.prototype.K;Os.prototype.getTileCoord=Os.prototype.f;Os.prototype.load=Os.prototype.load;G.prototype.get=G.prototype.get;G.prototype.getKeys=G.prototype.O;G.prototype.getProperties=G.prototype.N;G.prototype.set=G.prototype.set;G.prototype.setProperties=G.prototype.H;G.prototype.unset=G.prototype.P;G.prototype.changed=G.prototype.s;G.prototype.dispatchEvent=G.prototype.b;
G.prototype.getRevision=G.prototype.L;G.prototype.on=G.prototype.J;G.prototype.once=G.prototype.once;G.prototype.un=G.prototype.K;Id.prototype.type=Id.prototype.type;Id.prototype.target=Id.prototype.target;Id.prototype.preventDefault=Id.prototype.preventDefault;Id.prototype.stopPropagation=Id.prototype.stopPropagation;Jd.prototype.map=Jd.prototype.map;Jd.prototype.frameState=Jd.prototype.frameState;Jd.prototype.type=Jd.prototype.type;Jd.prototype.target=Jd.prototype.target;
Jd.prototype.preventDefault=Jd.prototype.preventDefault;Jd.prototype.stopPropagation=Jd.prototype.stopPropagation;ee.prototype.originalEvent=ee.prototype.originalEvent;ee.prototype.pixel=ee.prototype.pixel;ee.prototype.coordinate=ee.prototype.coordinate;ee.prototype.dragging=ee.prototype.dragging;ee.prototype.preventDefault=ee.prototype.preventDefault;ee.prototype.stopPropagation=ee.prototype.stopPropagation;ee.prototype.map=ee.prototype.map;ee.prototype.frameState=ee.prototype.frameState;
ee.prototype.type=ee.prototype.type;ee.prototype.target=ee.prototype.target;Xc.prototype.type=Xc.prototype.type;Xc.prototype.target=Xc.prototype.target;Xc.prototype.preventDefault=Xc.prototype.preventDefault;Xc.prototype.stopPropagation=Xc.prototype.stopPropagation;sk.prototype.get=sk.prototype.get;sk.prototype.getKeys=sk.prototype.O;sk.prototype.getProperties=sk.prototype.N;sk.prototype.set=sk.prototype.set;sk.prototype.setProperties=sk.prototype.H;sk.prototype.unset=sk.prototype.P;
sk.prototype.changed=sk.prototype.s;sk.prototype.dispatchEvent=sk.prototype.b;sk.prototype.getRevision=sk.prototype.L;sk.prototype.on=sk.prototype.J;sk.prototype.once=sk.prototype.once;sk.prototype.un=sk.prototype.K;nx.prototype.getTileCoord=nx.prototype.f;nx.prototype.load=nx.prototype.load;px.prototype.getTileCoord=px.prototype.f;px.prototype.load=px.prototype.load;F.prototype.get=F.prototype.get;F.prototype.getKeys=F.prototype.O;F.prototype.getProperties=F.prototype.N;F.prototype.set=F.prototype.set;
F.prototype.setProperties=F.prototype.H;F.prototype.unset=F.prototype.P;F.prototype.changed=F.prototype.s;F.prototype.dispatchEvent=F.prototype.b;F.prototype.getRevision=F.prototype.L;F.prototype.on=F.prototype.J;F.prototype.once=F.prototype.once;F.prototype.un=F.prototype.K;rx.prototype.forEachTileCoord=rx.prototype.Rf;rx.prototype.getMaxZoom=rx.prototype.Ti;rx.prototype.getMinZoom=rx.prototype.Ui;rx.prototype.getOrigin=rx.prototype.Pc;rx.prototype.getResolution=rx.prototype.Da;
rx.prototype.getResolutions=rx.prototype.Vi;rx.prototype.getTileCoordExtent=rx.prototype.Aa;rx.prototype.getTileCoordForCoordAndResolution=rx.prototype.Be;rx.prototype.getTileCoordForCoordAndZ=rx.prototype.bg;rx.prototype.getTileSize=rx.prototype.gb;rx.prototype.getZForResolution=rx.prototype.tc;Yk.prototype.getOpacity=Yk.prototype.Ze;Yk.prototype.getRotateWithView=Yk.prototype.$e;Yk.prototype.getRotation=Yk.prototype.af;Yk.prototype.getScale=Yk.prototype.bf;Yk.prototype.getSnapToPixel=Yk.prototype.Ae;
Yk.prototype.setOpacity=Yk.prototype.td;Yk.prototype.setRotation=Yk.prototype.cf;Yk.prototype.setScale=Yk.prototype.ud;$k.prototype.clone=$k.prototype.clone;$k.prototype.getAngle=$k.prototype.Pi;$k.prototype.getFill=$k.prototype.Fa;$k.prototype.getPoints=$k.prototype.Qi;$k.prototype.getRadius=$k.prototype.Ri;$k.prototype.getRadius2=$k.prototype.Fh;$k.prototype.getStroke=$k.prototype.Ga;$k.prototype.getOpacity=$k.prototype.Ze;$k.prototype.getRotateWithView=$k.prototype.$e;
$k.prototype.getRotation=$k.prototype.af;$k.prototype.getScale=$k.prototype.bf;$k.prototype.getSnapToPixel=$k.prototype.Ae;$k.prototype.setOpacity=$k.prototype.td;$k.prototype.setRotation=$k.prototype.cf;$k.prototype.setScale=$k.prototype.ud;eo.prototype.getOpacity=eo.prototype.Ze;eo.prototype.getRotateWithView=eo.prototype.$e;eo.prototype.getRotation=eo.prototype.af;eo.prototype.getScale=eo.prototype.bf;eo.prototype.getSnapToPixel=eo.prototype.Ae;eo.prototype.setOpacity=eo.prototype.td;
eo.prototype.setRotation=eo.prototype.cf;eo.prototype.setScale=eo.prototype.ud;$t.prototype.get=$t.prototype.get;$t.prototype.getKeys=$t.prototype.O;$t.prototype.getProperties=$t.prototype.N;$t.prototype.set=$t.prototype.set;$t.prototype.setProperties=$t.prototype.H;$t.prototype.unset=$t.prototype.P;$t.prototype.changed=$t.prototype.s;$t.prototype.dispatchEvent=$t.prototype.b;$t.prototype.getRevision=$t.prototype.L;$t.prototype.on=$t.prototype.J;$t.prototype.once=$t.prototype.once;
$t.prototype.un=$t.prototype.K;pw.prototype.getAttributions=pw.prototype.ya;pw.prototype.getLogo=pw.prototype.xa;pw.prototype.getProjection=pw.prototype.za;pw.prototype.getState=pw.prototype.getState;pw.prototype.refresh=pw.prototype.sa;pw.prototype.setAttributions=pw.prototype.ua;pw.prototype.get=pw.prototype.get;pw.prototype.getKeys=pw.prototype.O;pw.prototype.getProperties=pw.prototype.N;pw.prototype.set=pw.prototype.set;pw.prototype.setProperties=pw.prototype.H;pw.prototype.unset=pw.prototype.P;
pw.prototype.changed=pw.prototype.s;pw.prototype.dispatchEvent=pw.prototype.b;pw.prototype.getRevision=pw.prototype.L;pw.prototype.on=pw.prototype.J;pw.prototype.once=pw.prototype.once;pw.prototype.un=pw.prototype.K;tw.prototype.getTileGrid=tw.prototype.ab;tw.prototype.refresh=tw.prototype.sa;tw.prototype.getAttributions=tw.prototype.ya;tw.prototype.getLogo=tw.prototype.xa;tw.prototype.getProjection=tw.prototype.za;tw.prototype.getState=tw.prototype.getState;tw.prototype.setAttributions=tw.prototype.ua;
tw.prototype.get=tw.prototype.get;tw.prototype.getKeys=tw.prototype.O;tw.prototype.getProperties=tw.prototype.N;tw.prototype.set=tw.prototype.set;tw.prototype.setProperties=tw.prototype.H;tw.prototype.unset=tw.prototype.P;tw.prototype.changed=tw.prototype.s;tw.prototype.dispatchEvent=tw.prototype.b;tw.prototype.getRevision=tw.prototype.L;tw.prototype.on=tw.prototype.J;tw.prototype.once=tw.prototype.once;tw.prototype.un=tw.prototype.K;X.prototype.getTileLoadFunction=X.prototype.pb;
X.prototype.getTileUrlFunction=X.prototype.qb;X.prototype.getUrls=X.prototype.rb;X.prototype.setTileLoadFunction=X.prototype.vb;X.prototype.setTileUrlFunction=X.prototype.cb;X.prototype.setUrl=X.prototype.jb;X.prototype.setUrls=X.prototype.eb;X.prototype.getTileGrid=X.prototype.ab;X.prototype.refresh=X.prototype.sa;X.prototype.getAttributions=X.prototype.ya;X.prototype.getLogo=X.prototype.xa;X.prototype.getProjection=X.prototype.za;X.prototype.getState=X.prototype.getState;
X.prototype.setAttributions=X.prototype.ua;X.prototype.get=X.prototype.get;X.prototype.getKeys=X.prototype.O;X.prototype.getProperties=X.prototype.N;X.prototype.set=X.prototype.set;X.prototype.setProperties=X.prototype.H;X.prototype.unset=X.prototype.P;X.prototype.changed=X.prototype.s;X.prototype.dispatchEvent=X.prototype.b;X.prototype.getRevision=X.prototype.L;X.prototype.on=X.prototype.J;X.prototype.once=X.prototype.once;X.prototype.un=X.prototype.K;xw.prototype.setRenderReprojectionEdges=xw.prototype.Pb;
xw.prototype.setTileGridForProjection=xw.prototype.Qb;xw.prototype.getTileLoadFunction=xw.prototype.pb;xw.prototype.getTileUrlFunction=xw.prototype.qb;xw.prototype.getUrls=xw.prototype.rb;xw.prototype.setTileLoadFunction=xw.prototype.vb;xw.prototype.setTileUrlFunction=xw.prototype.cb;xw.prototype.setUrl=xw.prototype.jb;xw.prototype.setUrls=xw.prototype.eb;xw.prototype.getTileGrid=xw.prototype.ab;xw.prototype.refresh=xw.prototype.sa;xw.prototype.getAttributions=xw.prototype.ya;
xw.prototype.getLogo=xw.prototype.xa;xw.prototype.getProjection=xw.prototype.za;xw.prototype.getState=xw.prototype.getState;xw.prototype.setAttributions=xw.prototype.ua;xw.prototype.get=xw.prototype.get;xw.prototype.getKeys=xw.prototype.O;xw.prototype.getProperties=xw.prototype.N;xw.prototype.set=xw.prototype.set;xw.prototype.setProperties=xw.prototype.H;xw.prototype.unset=xw.prototype.P;xw.prototype.changed=xw.prototype.s;xw.prototype.dispatchEvent=xw.prototype.b;xw.prototype.getRevision=xw.prototype.L;
xw.prototype.on=xw.prototype.J;xw.prototype.once=xw.prototype.once;xw.prototype.un=xw.prototype.K;zw.prototype.setRenderReprojectionEdges=zw.prototype.Pb;zw.prototype.setTileGridForProjection=zw.prototype.Qb;zw.prototype.getTileLoadFunction=zw.prototype.pb;zw.prototype.getTileUrlFunction=zw.prototype.qb;zw.prototype.getUrls=zw.prototype.rb;zw.prototype.setTileLoadFunction=zw.prototype.vb;zw.prototype.setTileUrlFunction=zw.prototype.cb;zw.prototype.setUrl=zw.prototype.jb;zw.prototype.setUrls=zw.prototype.eb;
zw.prototype.getTileGrid=zw.prototype.ab;zw.prototype.refresh=zw.prototype.sa;zw.prototype.getAttributions=zw.prototype.ya;zw.prototype.getLogo=zw.prototype.xa;zw.prototype.getProjection=zw.prototype.za;zw.prototype.getState=zw.prototype.getState;zw.prototype.setAttributions=zw.prototype.ua;zw.prototype.get=zw.prototype.get;zw.prototype.getKeys=zw.prototype.O;zw.prototype.getProperties=zw.prototype.N;zw.prototype.set=zw.prototype.set;zw.prototype.setProperties=zw.prototype.H;zw.prototype.unset=zw.prototype.P;
zw.prototype.changed=zw.prototype.s;zw.prototype.dispatchEvent=zw.prototype.b;zw.prototype.getRevision=zw.prototype.L;zw.prototype.on=zw.prototype.J;zw.prototype.once=zw.prototype.once;zw.prototype.un=zw.prototype.K;Aw.prototype.setRenderReprojectionEdges=Aw.prototype.Pb;Aw.prototype.setTileGridForProjection=Aw.prototype.Qb;Aw.prototype.getTileLoadFunction=Aw.prototype.pb;Aw.prototype.getTileUrlFunction=Aw.prototype.qb;Aw.prototype.getUrls=Aw.prototype.rb;Aw.prototype.setTileLoadFunction=Aw.prototype.vb;
Aw.prototype.setTileUrlFunction=Aw.prototype.cb;Aw.prototype.setUrl=Aw.prototype.jb;Aw.prototype.setUrls=Aw.prototype.eb;Aw.prototype.getTileGrid=Aw.prototype.ab;Aw.prototype.refresh=Aw.prototype.sa;Aw.prototype.getAttributions=Aw.prototype.ya;Aw.prototype.getLogo=Aw.prototype.xa;Aw.prototype.getProjection=Aw.prototype.za;Aw.prototype.getState=Aw.prototype.getState;Aw.prototype.setAttributions=Aw.prototype.ua;Aw.prototype.get=Aw.prototype.get;Aw.prototype.getKeys=Aw.prototype.O;
Aw.prototype.getProperties=Aw.prototype.N;Aw.prototype.set=Aw.prototype.set;Aw.prototype.setProperties=Aw.prototype.H;Aw.prototype.unset=Aw.prototype.P;Aw.prototype.changed=Aw.prototype.s;Aw.prototype.dispatchEvent=Aw.prototype.b;Aw.prototype.getRevision=Aw.prototype.L;Aw.prototype.on=Aw.prototype.J;Aw.prototype.once=Aw.prototype.once;Aw.prototype.un=Aw.prototype.K;U.prototype.getAttributions=U.prototype.ya;U.prototype.getLogo=U.prototype.xa;U.prototype.getProjection=U.prototype.za;
U.prototype.getState=U.prototype.getState;U.prototype.refresh=U.prototype.sa;U.prototype.setAttributions=U.prototype.ua;U.prototype.get=U.prototype.get;U.prototype.getKeys=U.prototype.O;U.prototype.getProperties=U.prototype.N;U.prototype.set=U.prototype.set;U.prototype.setProperties=U.prototype.H;U.prototype.unset=U.prototype.P;U.prototype.changed=U.prototype.s;U.prototype.dispatchEvent=U.prototype.b;U.prototype.getRevision=U.prototype.L;U.prototype.on=U.prototype.J;U.prototype.once=U.prototype.once;
U.prototype.un=U.prototype.K;Y.prototype.addFeature=Y.prototype.yb;Y.prototype.addFeatures=Y.prototype.cd;Y.prototype.clear=Y.prototype.clear;Y.prototype.forEachFeature=Y.prototype.sh;Y.prototype.forEachFeatureInExtent=Y.prototype.$b;Y.prototype.forEachFeatureIntersectingExtent=Y.prototype.th;Y.prototype.getFeaturesCollection=Y.prototype.Ah;Y.prototype.getFeatures=Y.prototype.Xe;Y.prototype.getFeaturesAtCoordinate=Y.prototype.zh;Y.prototype.getFeaturesInExtent=Y.prototype.Uf;
Y.prototype.getClosestFeatureToCoordinate=Y.prototype.vh;Y.prototype.getExtent=Y.prototype.G;Y.prototype.getFeatureById=Y.prototype.yh;Y.prototype.getFormat=Y.prototype.Mi;Y.prototype.getUrl=Y.prototype.Ni;Y.prototype.removeFeature=Y.prototype.Gb;Y.prototype.getAttributions=Y.prototype.ya;Y.prototype.getLogo=Y.prototype.xa;Y.prototype.getProjection=Y.prototype.za;Y.prototype.getState=Y.prototype.getState;Y.prototype.refresh=Y.prototype.sa;Y.prototype.setAttributions=Y.prototype.ua;
Y.prototype.get=Y.prototype.get;Y.prototype.getKeys=Y.prototype.O;Y.prototype.getProperties=Y.prototype.N;Y.prototype.set=Y.prototype.set;Y.prototype.setProperties=Y.prototype.H;Y.prototype.unset=Y.prototype.P;Y.prototype.changed=Y.prototype.s;Y.prototype.dispatchEvent=Y.prototype.b;Y.prototype.getRevision=Y.prototype.L;Y.prototype.on=Y.prototype.J;Y.prototype.once=Y.prototype.once;Y.prototype.un=Y.prototype.K;Hv.prototype.getAttributions=Hv.prototype.ya;Hv.prototype.getLogo=Hv.prototype.xa;
Hv.prototype.getProjection=Hv.prototype.za;Hv.prototype.getState=Hv.prototype.getState;Hv.prototype.refresh=Hv.prototype.sa;Hv.prototype.setAttributions=Hv.prototype.ua;Hv.prototype.get=Hv.prototype.get;Hv.prototype.getKeys=Hv.prototype.O;Hv.prototype.getProperties=Hv.prototype.N;Hv.prototype.set=Hv.prototype.set;Hv.prototype.setProperties=Hv.prototype.H;Hv.prototype.unset=Hv.prototype.P;Hv.prototype.changed=Hv.prototype.s;Hv.prototype.dispatchEvent=Hv.prototype.b;Hv.prototype.getRevision=Hv.prototype.L;
Hv.prototype.on=Hv.prototype.J;Hv.prototype.once=Hv.prototype.once;Hv.prototype.un=Hv.prototype.K;Jv.prototype.type=Jv.prototype.type;Jv.prototype.target=Jv.prototype.target;Jv.prototype.preventDefault=Jv.prototype.preventDefault;Jv.prototype.stopPropagation=Jv.prototype.stopPropagation;Gw.prototype.getAttributions=Gw.prototype.ya;Gw.prototype.getLogo=Gw.prototype.xa;Gw.prototype.getProjection=Gw.prototype.za;Gw.prototype.getState=Gw.prototype.getState;Gw.prototype.refresh=Gw.prototype.sa;
Gw.prototype.setAttributions=Gw.prototype.ua;Gw.prototype.get=Gw.prototype.get;Gw.prototype.getKeys=Gw.prototype.O;Gw.prototype.getProperties=Gw.prototype.N;Gw.prototype.set=Gw.prototype.set;Gw.prototype.setProperties=Gw.prototype.H;Gw.prototype.unset=Gw.prototype.P;Gw.prototype.changed=Gw.prototype.s;Gw.prototype.dispatchEvent=Gw.prototype.b;Gw.prototype.getRevision=Gw.prototype.L;Gw.prototype.on=Gw.prototype.J;Gw.prototype.once=Gw.prototype.once;Gw.prototype.un=Gw.prototype.K;
Ov.prototype.getAttributions=Ov.prototype.ya;Ov.prototype.getLogo=Ov.prototype.xa;Ov.prototype.getProjection=Ov.prototype.za;Ov.prototype.getState=Ov.prototype.getState;Ov.prototype.refresh=Ov.prototype.sa;Ov.prototype.setAttributions=Ov.prototype.ua;Ov.prototype.get=Ov.prototype.get;Ov.prototype.getKeys=Ov.prototype.O;Ov.prototype.getProperties=Ov.prototype.N;Ov.prototype.set=Ov.prototype.set;Ov.prototype.setProperties=Ov.prototype.H;Ov.prototype.unset=Ov.prototype.P;Ov.prototype.changed=Ov.prototype.s;
Ov.prototype.dispatchEvent=Ov.prototype.b;Ov.prototype.getRevision=Ov.prototype.L;Ov.prototype.on=Ov.prototype.J;Ov.prototype.once=Ov.prototype.once;Ov.prototype.un=Ov.prototype.K;Hw.prototype.getAttributions=Hw.prototype.ya;Hw.prototype.getLogo=Hw.prototype.xa;Hw.prototype.getProjection=Hw.prototype.za;Hw.prototype.getState=Hw.prototype.getState;Hw.prototype.refresh=Hw.prototype.sa;Hw.prototype.setAttributions=Hw.prototype.ua;Hw.prototype.get=Hw.prototype.get;Hw.prototype.getKeys=Hw.prototype.O;
Hw.prototype.getProperties=Hw.prototype.N;Hw.prototype.set=Hw.prototype.set;Hw.prototype.setProperties=Hw.prototype.H;Hw.prototype.unset=Hw.prototype.P;Hw.prototype.changed=Hw.prototype.s;Hw.prototype.dispatchEvent=Hw.prototype.b;Hw.prototype.getRevision=Hw.prototype.L;Hw.prototype.on=Hw.prototype.J;Hw.prototype.once=Hw.prototype.once;Hw.prototype.un=Hw.prototype.K;Iw.prototype.getAttributions=Iw.prototype.ya;Iw.prototype.getLogo=Iw.prototype.xa;Iw.prototype.getProjection=Iw.prototype.za;
Iw.prototype.getState=Iw.prototype.getState;Iw.prototype.refresh=Iw.prototype.sa;Iw.prototype.setAttributions=Iw.prototype.ua;Iw.prototype.get=Iw.prototype.get;Iw.prototype.getKeys=Iw.prototype.O;Iw.prototype.getProperties=Iw.prototype.N;Iw.prototype.set=Iw.prototype.set;Iw.prototype.setProperties=Iw.prototype.H;Iw.prototype.unset=Iw.prototype.P;Iw.prototype.changed=Iw.prototype.s;Iw.prototype.dispatchEvent=Iw.prototype.b;Iw.prototype.getRevision=Iw.prototype.L;Iw.prototype.on=Iw.prototype.J;
Iw.prototype.once=Iw.prototype.once;Iw.prototype.un=Iw.prototype.K;Pv.prototype.getAttributions=Pv.prototype.ya;Pv.prototype.getLogo=Pv.prototype.xa;Pv.prototype.getProjection=Pv.prototype.za;Pv.prototype.getState=Pv.prototype.getState;Pv.prototype.refresh=Pv.prototype.sa;Pv.prototype.setAttributions=Pv.prototype.ua;Pv.prototype.get=Pv.prototype.get;Pv.prototype.getKeys=Pv.prototype.O;Pv.prototype.getProperties=Pv.prototype.N;Pv.prototype.set=Pv.prototype.set;Pv.prototype.setProperties=Pv.prototype.H;
Pv.prototype.unset=Pv.prototype.P;Pv.prototype.changed=Pv.prototype.s;Pv.prototype.dispatchEvent=Pv.prototype.b;Pv.prototype.getRevision=Pv.prototype.L;Pv.prototype.on=Pv.prototype.J;Pv.prototype.once=Pv.prototype.once;Pv.prototype.un=Pv.prototype.K;Jw.prototype.getAttributions=Jw.prototype.ya;Jw.prototype.getLogo=Jw.prototype.xa;Jw.prototype.getProjection=Jw.prototype.za;Jw.prototype.getState=Jw.prototype.getState;Jw.prototype.refresh=Jw.prototype.sa;Jw.prototype.setAttributions=Jw.prototype.ua;
Jw.prototype.get=Jw.prototype.get;Jw.prototype.getKeys=Jw.prototype.O;Jw.prototype.getProperties=Jw.prototype.N;Jw.prototype.set=Jw.prototype.set;Jw.prototype.setProperties=Jw.prototype.H;Jw.prototype.unset=Jw.prototype.P;Jw.prototype.changed=Jw.prototype.s;Jw.prototype.dispatchEvent=Jw.prototype.b;Jw.prototype.getRevision=Jw.prototype.L;Jw.prototype.on=Jw.prototype.J;Jw.prototype.once=Jw.prototype.once;Jw.prototype.un=Jw.prototype.K;Nw.prototype.setRenderReprojectionEdges=Nw.prototype.Pb;
Nw.prototype.setTileGridForProjection=Nw.prototype.Qb;Nw.prototype.getTileLoadFunction=Nw.prototype.pb;Nw.prototype.getTileUrlFunction=Nw.prototype.qb;Nw.prototype.getUrls=Nw.prototype.rb;Nw.prototype.setTileLoadFunction=Nw.prototype.vb;Nw.prototype.setTileUrlFunction=Nw.prototype.cb;Nw.prototype.setUrl=Nw.prototype.jb;Nw.prototype.setUrls=Nw.prototype.eb;Nw.prototype.getTileGrid=Nw.prototype.ab;Nw.prototype.refresh=Nw.prototype.sa;Nw.prototype.getAttributions=Nw.prototype.ya;
Nw.prototype.getLogo=Nw.prototype.xa;Nw.prototype.getProjection=Nw.prototype.za;Nw.prototype.getState=Nw.prototype.getState;Nw.prototype.setAttributions=Nw.prototype.ua;Nw.prototype.get=Nw.prototype.get;Nw.prototype.getKeys=Nw.prototype.O;Nw.prototype.getProperties=Nw.prototype.N;Nw.prototype.set=Nw.prototype.set;Nw.prototype.setProperties=Nw.prototype.H;Nw.prototype.unset=Nw.prototype.P;Nw.prototype.changed=Nw.prototype.s;Nw.prototype.dispatchEvent=Nw.prototype.b;Nw.prototype.getRevision=Nw.prototype.L;
Nw.prototype.on=Nw.prototype.J;Nw.prototype.once=Nw.prototype.once;Nw.prototype.un=Nw.prototype.K;Pw.prototype.getAttributions=Pw.prototype.ya;Pw.prototype.getLogo=Pw.prototype.xa;Pw.prototype.getProjection=Pw.prototype.za;Pw.prototype.getState=Pw.prototype.getState;Pw.prototype.refresh=Pw.prototype.sa;Pw.prototype.setAttributions=Pw.prototype.ua;Pw.prototype.get=Pw.prototype.get;Pw.prototype.getKeys=Pw.prototype.O;Pw.prototype.getProperties=Pw.prototype.N;Pw.prototype.set=Pw.prototype.set;
Pw.prototype.setProperties=Pw.prototype.H;Pw.prototype.unset=Pw.prototype.P;Pw.prototype.changed=Pw.prototype.s;Pw.prototype.dispatchEvent=Pw.prototype.b;Pw.prototype.getRevision=Pw.prototype.L;Pw.prototype.on=Pw.prototype.J;Pw.prototype.once=Pw.prototype.once;Pw.prototype.un=Pw.prototype.K;Tw.prototype.type=Tw.prototype.type;Tw.prototype.target=Tw.prototype.target;Tw.prototype.preventDefault=Tw.prototype.preventDefault;Tw.prototype.stopPropagation=Tw.prototype.stopPropagation;
Ww.prototype.setRenderReprojectionEdges=Ww.prototype.Pb;Ww.prototype.setTileGridForProjection=Ww.prototype.Qb;Ww.prototype.getTileLoadFunction=Ww.prototype.pb;Ww.prototype.getTileUrlFunction=Ww.prototype.qb;Ww.prototype.getUrls=Ww.prototype.rb;Ww.prototype.setTileLoadFunction=Ww.prototype.vb;Ww.prototype.setTileUrlFunction=Ww.prototype.cb;Ww.prototype.setUrl=Ww.prototype.jb;Ww.prototype.setUrls=Ww.prototype.eb;Ww.prototype.getTileGrid=Ww.prototype.ab;Ww.prototype.refresh=Ww.prototype.sa;
Ww.prototype.getAttributions=Ww.prototype.ya;Ww.prototype.getLogo=Ww.prototype.xa;Ww.prototype.getProjection=Ww.prototype.za;Ww.prototype.getState=Ww.prototype.getState;Ww.prototype.setAttributions=Ww.prototype.ua;Ww.prototype.get=Ww.prototype.get;Ww.prototype.getKeys=Ww.prototype.O;Ww.prototype.getProperties=Ww.prototype.N;Ww.prototype.set=Ww.prototype.set;Ww.prototype.setProperties=Ww.prototype.H;Ww.prototype.unset=Ww.prototype.P;Ww.prototype.changed=Ww.prototype.s;Ww.prototype.dispatchEvent=Ww.prototype.b;
Ww.prototype.getRevision=Ww.prototype.L;Ww.prototype.on=Ww.prototype.J;Ww.prototype.once=Ww.prototype.once;Ww.prototype.un=Ww.prototype.K;sw.prototype.type=sw.prototype.type;sw.prototype.target=sw.prototype.target;sw.prototype.preventDefault=sw.prototype.preventDefault;sw.prototype.stopPropagation=sw.prototype.stopPropagation;$w.prototype.setRenderReprojectionEdges=$w.prototype.Pb;$w.prototype.setTileGridForProjection=$w.prototype.Qb;$w.prototype.getTileLoadFunction=$w.prototype.pb;
$w.prototype.getTileUrlFunction=$w.prototype.qb;$w.prototype.getUrls=$w.prototype.rb;$w.prototype.setTileLoadFunction=$w.prototype.vb;$w.prototype.setTileUrlFunction=$w.prototype.cb;$w.prototype.setUrl=$w.prototype.jb;$w.prototype.setUrls=$w.prototype.eb;$w.prototype.getTileGrid=$w.prototype.ab;$w.prototype.refresh=$w.prototype.sa;$w.prototype.getAttributions=$w.prototype.ya;$w.prototype.getLogo=$w.prototype.xa;$w.prototype.getProjection=$w.prototype.za;$w.prototype.getState=$w.prototype.getState;
$w.prototype.setAttributions=$w.prototype.ua;$w.prototype.get=$w.prototype.get;$w.prototype.getKeys=$w.prototype.O;$w.prototype.getProperties=$w.prototype.N;$w.prototype.set=$w.prototype.set;$w.prototype.setProperties=$w.prototype.H;$w.prototype.unset=$w.prototype.P;$w.prototype.changed=$w.prototype.s;$w.prototype.dispatchEvent=$w.prototype.b;$w.prototype.getRevision=$w.prototype.L;$w.prototype.on=$w.prototype.J;$w.prototype.once=$w.prototype.once;$w.prototype.un=$w.prototype.K;
bx.prototype.getTileGrid=bx.prototype.ab;bx.prototype.refresh=bx.prototype.sa;bx.prototype.getAttributions=bx.prototype.ya;bx.prototype.getLogo=bx.prototype.xa;bx.prototype.getProjection=bx.prototype.za;bx.prototype.getState=bx.prototype.getState;bx.prototype.setAttributions=bx.prototype.ua;bx.prototype.get=bx.prototype.get;bx.prototype.getKeys=bx.prototype.O;bx.prototype.getProperties=bx.prototype.N;bx.prototype.set=bx.prototype.set;bx.prototype.setProperties=bx.prototype.H;bx.prototype.unset=bx.prototype.P;
bx.prototype.changed=bx.prototype.s;bx.prototype.dispatchEvent=bx.prototype.b;bx.prototype.getRevision=bx.prototype.L;bx.prototype.on=bx.prototype.J;bx.prototype.once=bx.prototype.once;bx.prototype.un=bx.prototype.K;dx.prototype.setRenderReprojectionEdges=dx.prototype.Pb;dx.prototype.setTileGridForProjection=dx.prototype.Qb;dx.prototype.getTileLoadFunction=dx.prototype.pb;dx.prototype.getTileUrlFunction=dx.prototype.qb;dx.prototype.getUrls=dx.prototype.rb;dx.prototype.setTileLoadFunction=dx.prototype.vb;
dx.prototype.setTileUrlFunction=dx.prototype.cb;dx.prototype.setUrl=dx.prototype.jb;dx.prototype.setUrls=dx.prototype.eb;dx.prototype.getTileGrid=dx.prototype.ab;dx.prototype.refresh=dx.prototype.sa;dx.prototype.getAttributions=dx.prototype.ya;dx.prototype.getLogo=dx.prototype.xa;dx.prototype.getProjection=dx.prototype.za;dx.prototype.getState=dx.prototype.getState;dx.prototype.setAttributions=dx.prototype.ua;dx.prototype.get=dx.prototype.get;dx.prototype.getKeys=dx.prototype.O;
dx.prototype.getProperties=dx.prototype.N;dx.prototype.set=dx.prototype.set;dx.prototype.setProperties=dx.prototype.H;dx.prototype.unset=dx.prototype.P;dx.prototype.changed=dx.prototype.s;dx.prototype.dispatchEvent=dx.prototype.b;dx.prototype.getRevision=dx.prototype.L;dx.prototype.on=dx.prototype.J;dx.prototype.once=dx.prototype.once;dx.prototype.un=dx.prototype.K;ex.prototype.getTileGrid=ex.prototype.ab;ex.prototype.refresh=ex.prototype.sa;ex.prototype.getAttributions=ex.prototype.ya;
ex.prototype.getLogo=ex.prototype.xa;ex.prototype.getProjection=ex.prototype.za;ex.prototype.getState=ex.prototype.getState;ex.prototype.setAttributions=ex.prototype.ua;ex.prototype.get=ex.prototype.get;ex.prototype.getKeys=ex.prototype.O;ex.prototype.getProperties=ex.prototype.N;ex.prototype.set=ex.prototype.set;ex.prototype.setProperties=ex.prototype.H;ex.prototype.unset=ex.prototype.P;ex.prototype.changed=ex.prototype.s;ex.prototype.dispatchEvent=ex.prototype.b;ex.prototype.getRevision=ex.prototype.L;
ex.prototype.on=ex.prototype.J;ex.prototype.once=ex.prototype.once;ex.prototype.un=ex.prototype.K;ix.prototype.setRenderReprojectionEdges=ix.prototype.Pb;ix.prototype.setTileGridForProjection=ix.prototype.Qb;ix.prototype.getTileLoadFunction=ix.prototype.pb;ix.prototype.getTileUrlFunction=ix.prototype.qb;ix.prototype.getUrls=ix.prototype.rb;ix.prototype.setTileLoadFunction=ix.prototype.vb;ix.prototype.setTileUrlFunction=ix.prototype.cb;ix.prototype.setUrl=ix.prototype.jb;ix.prototype.setUrls=ix.prototype.eb;
ix.prototype.getTileGrid=ix.prototype.ab;ix.prototype.refresh=ix.prototype.sa;ix.prototype.getAttributions=ix.prototype.ya;ix.prototype.getLogo=ix.prototype.xa;ix.prototype.getProjection=ix.prototype.za;ix.prototype.getState=ix.prototype.getState;ix.prototype.setAttributions=ix.prototype.ua;ix.prototype.get=ix.prototype.get;ix.prototype.getKeys=ix.prototype.O;ix.prototype.getProperties=ix.prototype.N;ix.prototype.set=ix.prototype.set;ix.prototype.setProperties=ix.prototype.H;ix.prototype.unset=ix.prototype.P;
ix.prototype.changed=ix.prototype.s;ix.prototype.dispatchEvent=ix.prototype.b;ix.prototype.getRevision=ix.prototype.L;ix.prototype.on=ix.prototype.J;ix.prototype.once=ix.prototype.once;ix.prototype.un=ix.prototype.K;gu.prototype.type=gu.prototype.type;gu.prototype.target=gu.prototype.target;gu.prototype.preventDefault=gu.prototype.preventDefault;gu.prototype.stopPropagation=gu.prototype.stopPropagation;qx.prototype.getTileLoadFunction=qx.prototype.pb;qx.prototype.getTileUrlFunction=qx.prototype.qb;
qx.prototype.getUrls=qx.prototype.rb;qx.prototype.setTileLoadFunction=qx.prototype.vb;qx.prototype.setTileUrlFunction=qx.prototype.cb;qx.prototype.setUrl=qx.prototype.jb;qx.prototype.setUrls=qx.prototype.eb;qx.prototype.getTileGrid=qx.prototype.ab;qx.prototype.refresh=qx.prototype.sa;qx.prototype.getAttributions=qx.prototype.ya;qx.prototype.getLogo=qx.prototype.xa;qx.prototype.getProjection=qx.prototype.za;qx.prototype.getState=qx.prototype.getState;qx.prototype.setAttributions=qx.prototype.ua;
qx.prototype.get=qx.prototype.get;qx.prototype.getKeys=qx.prototype.O;qx.prototype.getProperties=qx.prototype.N;qx.prototype.set=qx.prototype.set;qx.prototype.setProperties=qx.prototype.H;qx.prototype.unset=qx.prototype.P;qx.prototype.changed=qx.prototype.s;qx.prototype.dispatchEvent=qx.prototype.b;qx.prototype.getRevision=qx.prototype.L;qx.prototype.on=qx.prototype.J;qx.prototype.once=qx.prototype.once;qx.prototype.un=qx.prototype.K;Z.prototype.setRenderReprojectionEdges=Z.prototype.Pb;
Z.prototype.setTileGridForProjection=Z.prototype.Qb;Z.prototype.getTileLoadFunction=Z.prototype.pb;Z.prototype.getTileUrlFunction=Z.prototype.qb;Z.prototype.getUrls=Z.prototype.rb;Z.prototype.setTileLoadFunction=Z.prototype.vb;Z.prototype.setTileUrlFunction=Z.prototype.cb;Z.prototype.setUrl=Z.prototype.jb;Z.prototype.setUrls=Z.prototype.eb;Z.prototype.getTileGrid=Z.prototype.ab;Z.prototype.refresh=Z.prototype.sa;Z.prototype.getAttributions=Z.prototype.ya;Z.prototype.getLogo=Z.prototype.xa;
Z.prototype.getProjection=Z.prototype.za;Z.prototype.getState=Z.prototype.getState;Z.prototype.setAttributions=Z.prototype.ua;Z.prototype.get=Z.prototype.get;Z.prototype.getKeys=Z.prototype.O;Z.prototype.getProperties=Z.prototype.N;Z.prototype.set=Z.prototype.set;Z.prototype.setProperties=Z.prototype.H;Z.prototype.unset=Z.prototype.P;Z.prototype.changed=Z.prototype.s;Z.prototype.dispatchEvent=Z.prototype.b;Z.prototype.getRevision=Z.prototype.L;Z.prototype.on=Z.prototype.J;Z.prototype.once=Z.prototype.once;
Z.prototype.un=Z.prototype.K;ux.prototype.setRenderReprojectionEdges=ux.prototype.Pb;ux.prototype.setTileGridForProjection=ux.prototype.Qb;ux.prototype.getTileLoadFunction=ux.prototype.pb;ux.prototype.getTileUrlFunction=ux.prototype.qb;ux.prototype.getUrls=ux.prototype.rb;ux.prototype.setTileLoadFunction=ux.prototype.vb;ux.prototype.setTileUrlFunction=ux.prototype.cb;ux.prototype.setUrl=ux.prototype.jb;ux.prototype.setUrls=ux.prototype.eb;ux.prototype.getTileGrid=ux.prototype.ab;
ux.prototype.refresh=ux.prototype.sa;ux.prototype.getAttributions=ux.prototype.ya;ux.prototype.getLogo=ux.prototype.xa;ux.prototype.getProjection=ux.prototype.za;ux.prototype.getState=ux.prototype.getState;ux.prototype.setAttributions=ux.prototype.ua;ux.prototype.get=ux.prototype.get;ux.prototype.getKeys=ux.prototype.O;ux.prototype.getProperties=ux.prototype.N;ux.prototype.set=ux.prototype.set;ux.prototype.setProperties=ux.prototype.H;ux.prototype.unset=ux.prototype.P;ux.prototype.changed=ux.prototype.s;
ux.prototype.dispatchEvent=ux.prototype.b;ux.prototype.getRevision=ux.prototype.L;ux.prototype.on=ux.prototype.J;ux.prototype.once=ux.prototype.once;ux.prototype.un=ux.prototype.K;hw.prototype.getTileCoord=hw.prototype.f;hw.prototype.load=hw.prototype.load;xt.prototype.changed=xt.prototype.s;xt.prototype.dispatchEvent=xt.prototype.b;xt.prototype.getRevision=xt.prototype.L;xt.prototype.on=xt.prototype.J;xt.prototype.once=xt.prototype.once;xt.prototype.un=xt.prototype.K;Vt.prototype.changed=Vt.prototype.s;
Vt.prototype.dispatchEvent=Vt.prototype.b;Vt.prototype.getRevision=Vt.prototype.L;Vt.prototype.on=Vt.prototype.J;Vt.prototype.once=Vt.prototype.once;Vt.prototype.un=Vt.prototype.K;Rv.prototype.changed=Rv.prototype.s;Rv.prototype.dispatchEvent=Rv.prototype.b;Rv.prototype.getRevision=Rv.prototype.L;Rv.prototype.on=Rv.prototype.J;Rv.prototype.once=Rv.prototype.once;Rv.prototype.un=Rv.prototype.K;bw.prototype.changed=bw.prototype.s;bw.prototype.dispatchEvent=bw.prototype.b;bw.prototype.getRevision=bw.prototype.L;
bw.prototype.on=bw.prototype.J;bw.prototype.once=bw.prototype.once;bw.prototype.un=bw.prototype.K;Yt.prototype.changed=Yt.prototype.s;Yt.prototype.dispatchEvent=Yt.prototype.b;Yt.prototype.getRevision=Yt.prototype.L;Yt.prototype.on=Yt.prototype.J;Yt.prototype.once=Yt.prototype.once;Yt.prototype.un=Yt.prototype.K;Gt.prototype.changed=Gt.prototype.s;Gt.prototype.dispatchEvent=Gt.prototype.b;Gt.prototype.getRevision=Gt.prototype.L;Gt.prototype.on=Gt.prototype.J;Gt.prototype.once=Gt.prototype.once;
Gt.prototype.un=Gt.prototype.K;yv.prototype.changed=yv.prototype.s;yv.prototype.dispatchEvent=yv.prototype.b;yv.prototype.getRevision=yv.prototype.L;yv.prototype.on=yv.prototype.J;yv.prototype.once=yv.prototype.once;yv.prototype.un=yv.prototype.K;zv.prototype.changed=zv.prototype.s;zv.prototype.dispatchEvent=zv.prototype.b;zv.prototype.getRevision=zv.prototype.L;zv.prototype.on=zv.prototype.J;zv.prototype.once=zv.prototype.once;zv.prototype.un=zv.prototype.K;Vv.prototype.changed=Vv.prototype.s;
Vv.prototype.dispatchEvent=Vv.prototype.b;Vv.prototype.getRevision=Vv.prototype.L;Vv.prototype.on=Vv.prototype.J;Vv.prototype.once=Vv.prototype.once;Vv.prototype.un=Vv.prototype.K;Ot.prototype.changed=Ot.prototype.s;Ot.prototype.dispatchEvent=Ot.prototype.b;Ot.prototype.getRevision=Ot.prototype.L;Ot.prototype.on=Ot.prototype.J;Ot.prototype.once=Ot.prototype.once;Ot.prototype.un=Ot.prototype.K;dw.prototype.changed=dw.prototype.s;dw.prototype.dispatchEvent=dw.prototype.b;dw.prototype.getRevision=dw.prototype.L;
dw.prototype.on=dw.prototype.J;dw.prototype.once=dw.prototype.once;dw.prototype.un=dw.prototype.K;Rh.prototype.type=Rh.prototype.type;Rh.prototype.target=Rh.prototype.target;Rh.prototype.preventDefault=Rh.prototype.preventDefault;Rh.prototype.stopPropagation=Rh.prototype.stopPropagation;pe.prototype.type=pe.prototype.type;pe.prototype.target=pe.prototype.target;pe.prototype.preventDefault=pe.prototype.preventDefault;pe.prototype.stopPropagation=pe.prototype.stopPropagation;sh.prototype.get=sh.prototype.get;
sh.prototype.getKeys=sh.prototype.O;sh.prototype.getProperties=sh.prototype.N;sh.prototype.set=sh.prototype.set;sh.prototype.setProperties=sh.prototype.H;sh.prototype.unset=sh.prototype.P;sh.prototype.changed=sh.prototype.s;sh.prototype.dispatchEvent=sh.prototype.b;sh.prototype.getRevision=sh.prototype.L;sh.prototype.on=sh.prototype.J;sh.prototype.once=sh.prototype.once;sh.prototype.un=sh.prototype.K;uh.prototype.getExtent=uh.prototype.G;uh.prototype.getMaxResolution=uh.prototype.fc;
uh.prototype.getMinResolution=uh.prototype.gc;uh.prototype.getOpacity=uh.prototype.hc;uh.prototype.getVisible=uh.prototype.Mb;uh.prototype.getZIndex=uh.prototype.Ba;uh.prototype.setExtent=uh.prototype.vc;uh.prototype.setMaxResolution=uh.prototype.Ac;uh.prototype.setMinResolution=uh.prototype.Bc;uh.prototype.setOpacity=uh.prototype.wc;uh.prototype.setVisible=uh.prototype.xc;uh.prototype.setZIndex=uh.prototype.Vb;uh.prototype.get=uh.prototype.get;uh.prototype.getKeys=uh.prototype.O;
uh.prototype.getProperties=uh.prototype.N;uh.prototype.set=uh.prototype.set;uh.prototype.setProperties=uh.prototype.H;uh.prototype.unset=uh.prototype.P;uh.prototype.changed=uh.prototype.s;uh.prototype.dispatchEvent=uh.prototype.b;uh.prototype.getRevision=uh.prototype.L;uh.prototype.on=uh.prototype.J;uh.prototype.once=uh.prototype.once;uh.prototype.un=uh.prototype.K;wh.prototype.getExtent=wh.prototype.G;wh.prototype.getMaxResolution=wh.prototype.fc;wh.prototype.getMinResolution=wh.prototype.gc;
wh.prototype.getOpacity=wh.prototype.hc;wh.prototype.getVisible=wh.prototype.Mb;wh.prototype.getZIndex=wh.prototype.Ba;wh.prototype.setExtent=wh.prototype.vc;wh.prototype.setMaxResolution=wh.prototype.Ac;wh.prototype.setMinResolution=wh.prototype.Bc;wh.prototype.setOpacity=wh.prototype.wc;wh.prototype.setVisible=wh.prototype.xc;wh.prototype.setZIndex=wh.prototype.Vb;wh.prototype.get=wh.prototype.get;wh.prototype.getKeys=wh.prototype.O;wh.prototype.getProperties=wh.prototype.N;wh.prototype.set=wh.prototype.set;
wh.prototype.setProperties=wh.prototype.H;wh.prototype.unset=wh.prototype.P;wh.prototype.changed=wh.prototype.s;wh.prototype.dispatchEvent=wh.prototype.b;wh.prototype.getRevision=wh.prototype.L;wh.prototype.on=wh.prototype.J;wh.prototype.once=wh.prototype.once;wh.prototype.un=wh.prototype.K;T.prototype.setMap=T.prototype.setMap;T.prototype.setSource=T.prototype.Wc;T.prototype.getExtent=T.prototype.G;T.prototype.getMaxResolution=T.prototype.fc;T.prototype.getMinResolution=T.prototype.gc;
T.prototype.getOpacity=T.prototype.hc;T.prototype.getVisible=T.prototype.Mb;T.prototype.getZIndex=T.prototype.Ba;T.prototype.setExtent=T.prototype.vc;T.prototype.setMaxResolution=T.prototype.Ac;T.prototype.setMinResolution=T.prototype.Bc;T.prototype.setOpacity=T.prototype.wc;T.prototype.setVisible=T.prototype.xc;T.prototype.setZIndex=T.prototype.Vb;T.prototype.get=T.prototype.get;T.prototype.getKeys=T.prototype.O;T.prototype.getProperties=T.prototype.N;T.prototype.set=T.prototype.set;
T.prototype.setProperties=T.prototype.H;T.prototype.unset=T.prototype.P;T.prototype.changed=T.prototype.s;T.prototype.dispatchEvent=T.prototype.b;T.prototype.getRevision=T.prototype.L;T.prototype.on=T.prototype.J;T.prototype.once=T.prototype.once;T.prototype.un=T.prototype.K;V.prototype.getSource=V.prototype.ha;V.prototype.getStyle=V.prototype.D;V.prototype.getStyleFunction=V.prototype.C;V.prototype.setStyle=V.prototype.g;V.prototype.setMap=V.prototype.setMap;V.prototype.setSource=V.prototype.Wc;
V.prototype.getExtent=V.prototype.G;V.prototype.getMaxResolution=V.prototype.fc;V.prototype.getMinResolution=V.prototype.gc;V.prototype.getOpacity=V.prototype.hc;V.prototype.getVisible=V.prototype.Mb;V.prototype.getZIndex=V.prototype.Ba;V.prototype.setExtent=V.prototype.vc;V.prototype.setMaxResolution=V.prototype.Ac;V.prototype.setMinResolution=V.prototype.Bc;V.prototype.setOpacity=V.prototype.wc;V.prototype.setVisible=V.prototype.xc;V.prototype.setZIndex=V.prototype.Vb;V.prototype.get=V.prototype.get;
V.prototype.getKeys=V.prototype.O;V.prototype.getProperties=V.prototype.N;V.prototype.set=V.prototype.set;V.prototype.setProperties=V.prototype.H;V.prototype.unset=V.prototype.P;V.prototype.changed=V.prototype.s;V.prototype.dispatchEvent=V.prototype.b;V.prototype.getRevision=V.prototype.L;V.prototype.on=V.prototype.J;V.prototype.once=V.prototype.once;V.prototype.un=V.prototype.K;Uv.prototype.setMap=Uv.prototype.setMap;Uv.prototype.setSource=Uv.prototype.Wc;Uv.prototype.getExtent=Uv.prototype.G;
Uv.prototype.getMaxResolution=Uv.prototype.fc;Uv.prototype.getMinResolution=Uv.prototype.gc;Uv.prototype.getOpacity=Uv.prototype.hc;Uv.prototype.getVisible=Uv.prototype.Mb;Uv.prototype.getZIndex=Uv.prototype.Ba;Uv.prototype.setExtent=Uv.prototype.vc;Uv.prototype.setMaxResolution=Uv.prototype.Ac;Uv.prototype.setMinResolution=Uv.prototype.Bc;Uv.prototype.setOpacity=Uv.prototype.wc;Uv.prototype.setVisible=Uv.prototype.xc;Uv.prototype.setZIndex=Uv.prototype.Vb;Uv.prototype.get=Uv.prototype.get;
Uv.prototype.getKeys=Uv.prototype.O;Uv.prototype.getProperties=Uv.prototype.N;Uv.prototype.set=Uv.prototype.set;Uv.prototype.setProperties=Uv.prototype.H;Uv.prototype.unset=Uv.prototype.P;Uv.prototype.changed=Uv.prototype.s;Uv.prototype.dispatchEvent=Uv.prototype.b;Uv.prototype.getRevision=Uv.prototype.L;Uv.prototype.on=Uv.prototype.J;Uv.prototype.once=Uv.prototype.once;Uv.prototype.un=Uv.prototype.K;cw.prototype.setMap=cw.prototype.setMap;cw.prototype.setSource=cw.prototype.Wc;
cw.prototype.getExtent=cw.prototype.G;cw.prototype.getMaxResolution=cw.prototype.fc;cw.prototype.getMinResolution=cw.prototype.gc;cw.prototype.getOpacity=cw.prototype.hc;cw.prototype.getVisible=cw.prototype.Mb;cw.prototype.getZIndex=cw.prototype.Ba;cw.prototype.setExtent=cw.prototype.vc;cw.prototype.setMaxResolution=cw.prototype.Ac;cw.prototype.setMinResolution=cw.prototype.Bc;cw.prototype.setOpacity=cw.prototype.wc;cw.prototype.setVisible=cw.prototype.xc;cw.prototype.setZIndex=cw.prototype.Vb;
cw.prototype.get=cw.prototype.get;cw.prototype.getKeys=cw.prototype.O;cw.prototype.getProperties=cw.prototype.N;cw.prototype.set=cw.prototype.set;cw.prototype.setProperties=cw.prototype.H;cw.prototype.unset=cw.prototype.P;cw.prototype.changed=cw.prototype.s;cw.prototype.dispatchEvent=cw.prototype.b;cw.prototype.getRevision=cw.prototype.L;cw.prototype.on=cw.prototype.J;cw.prototype.once=cw.prototype.once;cw.prototype.un=cw.prototype.K;W.prototype.getSource=W.prototype.ha;W.prototype.getStyle=W.prototype.D;
W.prototype.getStyleFunction=W.prototype.C;W.prototype.setStyle=W.prototype.g;W.prototype.setMap=W.prototype.setMap;W.prototype.setSource=W.prototype.Wc;W.prototype.getExtent=W.prototype.G;W.prototype.getMaxResolution=W.prototype.fc;W.prototype.getMinResolution=W.prototype.gc;W.prototype.getOpacity=W.prototype.hc;W.prototype.getVisible=W.prototype.Mb;W.prototype.getZIndex=W.prototype.Ba;W.prototype.setExtent=W.prototype.vc;W.prototype.setMaxResolution=W.prototype.Ac;W.prototype.setMinResolution=W.prototype.Bc;
W.prototype.setOpacity=W.prototype.wc;W.prototype.setVisible=W.prototype.xc;W.prototype.setZIndex=W.prototype.Vb;W.prototype.get=W.prototype.get;W.prototype.getKeys=W.prototype.O;W.prototype.getProperties=W.prototype.N;W.prototype.set=W.prototype.set;W.prototype.setProperties=W.prototype.H;W.prototype.unset=W.prototype.P;W.prototype.changed=W.prototype.s;W.prototype.dispatchEvent=W.prototype.b;W.prototype.getRevision=W.prototype.L;W.prototype.on=W.prototype.J;W.prototype.once=W.prototype.once;
W.prototype.un=W.prototype.K;ng.prototype.get=ng.prototype.get;ng.prototype.getKeys=ng.prototype.O;ng.prototype.getProperties=ng.prototype.N;ng.prototype.set=ng.prototype.set;ng.prototype.setProperties=ng.prototype.H;ng.prototype.unset=ng.prototype.P;ng.prototype.changed=ng.prototype.s;ng.prototype.dispatchEvent=ng.prototype.b;ng.prototype.getRevision=ng.prototype.L;ng.prototype.on=ng.prototype.J;ng.prototype.once=ng.prototype.once;ng.prototype.un=ng.prototype.K;rg.prototype.getActive=rg.prototype.c;
rg.prototype.getMap=rg.prototype.f;rg.prototype.setActive=rg.prototype.Ha;rg.prototype.get=rg.prototype.get;rg.prototype.getKeys=rg.prototype.O;rg.prototype.getProperties=rg.prototype.N;rg.prototype.set=rg.prototype.set;rg.prototype.setProperties=rg.prototype.H;rg.prototype.unset=rg.prototype.P;rg.prototype.changed=rg.prototype.s;rg.prototype.dispatchEvent=rg.prototype.b;rg.prototype.getRevision=rg.prototype.L;rg.prototype.on=rg.prototype.J;rg.prototype.once=rg.prototype.once;rg.prototype.un=rg.prototype.K;
Rs.prototype.getActive=Rs.prototype.c;Rs.prototype.getMap=Rs.prototype.f;Rs.prototype.setActive=Rs.prototype.Ha;Rs.prototype.get=Rs.prototype.get;Rs.prototype.getKeys=Rs.prototype.O;Rs.prototype.getProperties=Rs.prototype.N;Rs.prototype.set=Rs.prototype.set;Rs.prototype.setProperties=Rs.prototype.H;Rs.prototype.unset=Rs.prototype.P;Rs.prototype.changed=Rs.prototype.s;Rs.prototype.dispatchEvent=Rs.prototype.b;Rs.prototype.getRevision=Rs.prototype.L;Rs.prototype.on=Rs.prototype.J;
Rs.prototype.once=Rs.prototype.once;Rs.prototype.un=Rs.prototype.K;Us.prototype.type=Us.prototype.type;Us.prototype.target=Us.prototype.target;Us.prototype.preventDefault=Us.prototype.preventDefault;Us.prototype.stopPropagation=Us.prototype.stopPropagation;Dg.prototype.getActive=Dg.prototype.c;Dg.prototype.getMap=Dg.prototype.f;Dg.prototype.setActive=Dg.prototype.Ha;Dg.prototype.get=Dg.prototype.get;Dg.prototype.getKeys=Dg.prototype.O;Dg.prototype.getProperties=Dg.prototype.N;Dg.prototype.set=Dg.prototype.set;
Dg.prototype.setProperties=Dg.prototype.H;Dg.prototype.unset=Dg.prototype.P;Dg.prototype.changed=Dg.prototype.s;Dg.prototype.dispatchEvent=Dg.prototype.b;Dg.prototype.getRevision=Dg.prototype.L;Dg.prototype.on=Dg.prototype.J;Dg.prototype.once=Dg.prototype.once;Dg.prototype.un=Dg.prototype.K;Rg.prototype.getActive=Rg.prototype.c;Rg.prototype.getMap=Rg.prototype.f;Rg.prototype.setActive=Rg.prototype.Ha;Rg.prototype.get=Rg.prototype.get;Rg.prototype.getKeys=Rg.prototype.O;
Rg.prototype.getProperties=Rg.prototype.N;Rg.prototype.set=Rg.prototype.set;Rg.prototype.setProperties=Rg.prototype.H;Rg.prototype.unset=Rg.prototype.P;Rg.prototype.changed=Rg.prototype.s;Rg.prototype.dispatchEvent=Rg.prototype.b;Rg.prototype.getRevision=Rg.prototype.L;Rg.prototype.on=Rg.prototype.J;Rg.prototype.once=Rg.prototype.once;Rg.prototype.un=Rg.prototype.K;Wg.prototype.type=Wg.prototype.type;Wg.prototype.target=Wg.prototype.target;Wg.prototype.preventDefault=Wg.prototype.preventDefault;
Wg.prototype.stopPropagation=Wg.prototype.stopPropagation;Gg.prototype.getActive=Gg.prototype.c;Gg.prototype.getMap=Gg.prototype.f;Gg.prototype.setActive=Gg.prototype.Ha;Gg.prototype.get=Gg.prototype.get;Gg.prototype.getKeys=Gg.prototype.O;Gg.prototype.getProperties=Gg.prototype.N;Gg.prototype.set=Gg.prototype.set;Gg.prototype.setProperties=Gg.prototype.H;Gg.prototype.unset=Gg.prototype.P;Gg.prototype.changed=Gg.prototype.s;Gg.prototype.dispatchEvent=Gg.prototype.b;Gg.prototype.getRevision=Gg.prototype.L;
Gg.prototype.on=Gg.prototype.J;Gg.prototype.once=Gg.prototype.once;Gg.prototype.un=Gg.prototype.K;Kg.prototype.getActive=Kg.prototype.c;Kg.prototype.getMap=Kg.prototype.f;Kg.prototype.setActive=Kg.prototype.Ha;Kg.prototype.get=Kg.prototype.get;Kg.prototype.getKeys=Kg.prototype.O;Kg.prototype.getProperties=Kg.prototype.N;Kg.prototype.set=Kg.prototype.set;Kg.prototype.setProperties=Kg.prototype.H;Kg.prototype.unset=Kg.prototype.P;Kg.prototype.changed=Kg.prototype.s;Kg.prototype.dispatchEvent=Kg.prototype.b;
Kg.prototype.getRevision=Kg.prototype.L;Kg.prototype.on=Kg.prototype.J;Kg.prototype.once=Kg.prototype.once;Kg.prototype.un=Kg.prototype.K;Ys.prototype.getActive=Ys.prototype.c;Ys.prototype.getMap=Ys.prototype.f;Ys.prototype.setActive=Ys.prototype.Ha;Ys.prototype.get=Ys.prototype.get;Ys.prototype.getKeys=Ys.prototype.O;Ys.prototype.getProperties=Ys.prototype.N;Ys.prototype.set=Ys.prototype.set;Ys.prototype.setProperties=Ys.prototype.H;Ys.prototype.unset=Ys.prototype.P;Ys.prototype.changed=Ys.prototype.s;
Ys.prototype.dispatchEvent=Ys.prototype.b;Ys.prototype.getRevision=Ys.prototype.L;Ys.prototype.on=Ys.prototype.J;Ys.prototype.once=Ys.prototype.once;Ys.prototype.un=Ys.prototype.K;$g.prototype.getGeometry=$g.prototype.V;$g.prototype.getActive=$g.prototype.c;$g.prototype.getMap=$g.prototype.f;$g.prototype.setActive=$g.prototype.Ha;$g.prototype.get=$g.prototype.get;$g.prototype.getKeys=$g.prototype.O;$g.prototype.getProperties=$g.prototype.N;$g.prototype.set=$g.prototype.set;
$g.prototype.setProperties=$g.prototype.H;$g.prototype.unset=$g.prototype.P;$g.prototype.changed=$g.prototype.s;$g.prototype.dispatchEvent=$g.prototype.b;$g.prototype.getRevision=$g.prototype.L;$g.prototype.on=$g.prototype.J;$g.prototype.once=$g.prototype.once;$g.prototype.un=$g.prototype.K;ju.prototype.getActive=ju.prototype.c;ju.prototype.getMap=ju.prototype.f;ju.prototype.setActive=ju.prototype.Ha;ju.prototype.get=ju.prototype.get;ju.prototype.getKeys=ju.prototype.O;
ju.prototype.getProperties=ju.prototype.N;ju.prototype.set=ju.prototype.set;ju.prototype.setProperties=ju.prototype.H;ju.prototype.unset=ju.prototype.P;ju.prototype.changed=ju.prototype.s;ju.prototype.dispatchEvent=ju.prototype.b;ju.prototype.getRevision=ju.prototype.L;ju.prototype.on=ju.prototype.J;ju.prototype.once=ju.prototype.once;ju.prototype.un=ju.prototype.K;zu.prototype.type=zu.prototype.type;zu.prototype.target=zu.prototype.target;zu.prototype.preventDefault=zu.prototype.preventDefault;
zu.prototype.stopPropagation=zu.prototype.stopPropagation;Au.prototype.getActive=Au.prototype.c;Au.prototype.getMap=Au.prototype.f;Au.prototype.setActive=Au.prototype.Ha;Au.prototype.get=Au.prototype.get;Au.prototype.getKeys=Au.prototype.O;Au.prototype.getProperties=Au.prototype.N;Au.prototype.set=Au.prototype.set;Au.prototype.setProperties=Au.prototype.H;Au.prototype.unset=Au.prototype.P;Au.prototype.changed=Au.prototype.s;Au.prototype.dispatchEvent=Au.prototype.b;Au.prototype.getRevision=Au.prototype.L;
Au.prototype.on=Au.prototype.J;Au.prototype.once=Au.prototype.once;Au.prototype.un=Au.prototype.K;Lu.prototype.type=Lu.prototype.type;Lu.prototype.target=Lu.prototype.target;Lu.prototype.preventDefault=Lu.prototype.preventDefault;Lu.prototype.stopPropagation=Lu.prototype.stopPropagation;ah.prototype.getActive=ah.prototype.c;ah.prototype.getMap=ah.prototype.f;ah.prototype.setActive=ah.prototype.Ha;ah.prototype.get=ah.prototype.get;ah.prototype.getKeys=ah.prototype.O;ah.prototype.getProperties=ah.prototype.N;
ah.prototype.set=ah.prototype.set;ah.prototype.setProperties=ah.prototype.H;ah.prototype.unset=ah.prototype.P;ah.prototype.changed=ah.prototype.s;ah.prototype.dispatchEvent=ah.prototype.b;ah.prototype.getRevision=ah.prototype.L;ah.prototype.on=ah.prototype.J;ah.prototype.once=ah.prototype.once;ah.prototype.un=ah.prototype.K;ch.prototype.getActive=ch.prototype.c;ch.prototype.getMap=ch.prototype.f;ch.prototype.setActive=ch.prototype.Ha;ch.prototype.get=ch.prototype.get;ch.prototype.getKeys=ch.prototype.O;
ch.prototype.getProperties=ch.prototype.N;ch.prototype.set=ch.prototype.set;ch.prototype.setProperties=ch.prototype.H;ch.prototype.unset=ch.prototype.P;ch.prototype.changed=ch.prototype.s;ch.prototype.dispatchEvent=ch.prototype.b;ch.prototype.getRevision=ch.prototype.L;ch.prototype.on=ch.prototype.J;ch.prototype.once=ch.prototype.once;ch.prototype.un=ch.prototype.K;Nu.prototype.getActive=Nu.prototype.c;Nu.prototype.getMap=Nu.prototype.f;Nu.prototype.setActive=Nu.prototype.Ha;Nu.prototype.get=Nu.prototype.get;
Nu.prototype.getKeys=Nu.prototype.O;Nu.prototype.getProperties=Nu.prototype.N;Nu.prototype.set=Nu.prototype.set;Nu.prototype.setProperties=Nu.prototype.H;Nu.prototype.unset=Nu.prototype.P;Nu.prototype.changed=Nu.prototype.s;Nu.prototype.dispatchEvent=Nu.prototype.b;Nu.prototype.getRevision=Nu.prototype.L;Nu.prototype.on=Nu.prototype.J;Nu.prototype.once=Nu.prototype.once;Nu.prototype.un=Nu.prototype.K;Vu.prototype.type=Vu.prototype.type;Vu.prototype.target=Vu.prototype.target;
Vu.prototype.preventDefault=Vu.prototype.preventDefault;Vu.prototype.stopPropagation=Vu.prototype.stopPropagation;eh.prototype.getActive=eh.prototype.c;eh.prototype.getMap=eh.prototype.f;eh.prototype.setActive=eh.prototype.Ha;eh.prototype.get=eh.prototype.get;eh.prototype.getKeys=eh.prototype.O;eh.prototype.getProperties=eh.prototype.N;eh.prototype.set=eh.prototype.set;eh.prototype.setProperties=eh.prototype.H;eh.prototype.unset=eh.prototype.P;eh.prototype.changed=eh.prototype.s;
eh.prototype.dispatchEvent=eh.prototype.b;eh.prototype.getRevision=eh.prototype.L;eh.prototype.on=eh.prototype.J;eh.prototype.once=eh.prototype.once;eh.prototype.un=eh.prototype.K;ih.prototype.getActive=ih.prototype.c;ih.prototype.getMap=ih.prototype.f;ih.prototype.setActive=ih.prototype.Ha;ih.prototype.get=ih.prototype.get;ih.prototype.getKeys=ih.prototype.O;ih.prototype.getProperties=ih.prototype.N;ih.prototype.set=ih.prototype.set;ih.prototype.setProperties=ih.prototype.H;ih.prototype.unset=ih.prototype.P;
ih.prototype.changed=ih.prototype.s;ih.prototype.dispatchEvent=ih.prototype.b;ih.prototype.getRevision=ih.prototype.L;ih.prototype.on=ih.prototype.J;ih.prototype.once=ih.prototype.once;ih.prototype.un=ih.prototype.K;mh.prototype.getActive=mh.prototype.c;mh.prototype.getMap=mh.prototype.f;mh.prototype.setActive=mh.prototype.Ha;mh.prototype.get=mh.prototype.get;mh.prototype.getKeys=mh.prototype.O;mh.prototype.getProperties=mh.prototype.N;mh.prototype.set=mh.prototype.set;
mh.prototype.setProperties=mh.prototype.H;mh.prototype.unset=mh.prototype.P;mh.prototype.changed=mh.prototype.s;mh.prototype.dispatchEvent=mh.prototype.b;mh.prototype.getRevision=mh.prototype.L;mh.prototype.on=mh.prototype.J;mh.prototype.once=mh.prototype.once;mh.prototype.un=mh.prototype.K;cv.prototype.getActive=cv.prototype.c;cv.prototype.getMap=cv.prototype.f;cv.prototype.setActive=cv.prototype.Ha;cv.prototype.get=cv.prototype.get;cv.prototype.getKeys=cv.prototype.O;
cv.prototype.getProperties=cv.prototype.N;cv.prototype.set=cv.prototype.set;cv.prototype.setProperties=cv.prototype.H;cv.prototype.unset=cv.prototype.P;cv.prototype.changed=cv.prototype.s;cv.prototype.dispatchEvent=cv.prototype.b;cv.prototype.getRevision=cv.prototype.L;cv.prototype.on=cv.prototype.J;cv.prototype.once=cv.prototype.once;cv.prototype.un=cv.prototype.K;fv.prototype.type=fv.prototype.type;fv.prototype.target=fv.prototype.target;fv.prototype.preventDefault=fv.prototype.preventDefault;
fv.prototype.stopPropagation=fv.prototype.stopPropagation;hv.prototype.getActive=hv.prototype.c;hv.prototype.getMap=hv.prototype.f;hv.prototype.setActive=hv.prototype.Ha;hv.prototype.get=hv.prototype.get;hv.prototype.getKeys=hv.prototype.O;hv.prototype.getProperties=hv.prototype.N;hv.prototype.set=hv.prototype.set;hv.prototype.setProperties=hv.prototype.H;hv.prototype.unset=hv.prototype.P;hv.prototype.changed=hv.prototype.s;hv.prototype.dispatchEvent=hv.prototype.b;hv.prototype.getRevision=hv.prototype.L;
hv.prototype.on=hv.prototype.J;hv.prototype.once=hv.prototype.once;hv.prototype.un=hv.prototype.K;mv.prototype.getActive=mv.prototype.c;mv.prototype.getMap=mv.prototype.f;mv.prototype.setActive=mv.prototype.Ha;mv.prototype.get=mv.prototype.get;mv.prototype.getKeys=mv.prototype.O;mv.prototype.getProperties=mv.prototype.N;mv.prototype.set=mv.prototype.set;mv.prototype.setProperties=mv.prototype.H;mv.prototype.unset=mv.prototype.P;mv.prototype.changed=mv.prototype.s;mv.prototype.dispatchEvent=mv.prototype.b;
mv.prototype.getRevision=mv.prototype.L;mv.prototype.on=mv.prototype.J;mv.prototype.once=mv.prototype.once;mv.prototype.un=mv.prototype.K;sv.prototype.type=sv.prototype.type;sv.prototype.target=sv.prototype.target;sv.prototype.preventDefault=sv.prototype.preventDefault;sv.prototype.stopPropagation=sv.prototype.stopPropagation;of.prototype.get=of.prototype.get;of.prototype.getKeys=of.prototype.O;of.prototype.getProperties=of.prototype.N;of.prototype.set=of.prototype.set;
of.prototype.setProperties=of.prototype.H;of.prototype.unset=of.prototype.P;of.prototype.changed=of.prototype.s;of.prototype.dispatchEvent=of.prototype.b;of.prototype.getRevision=of.prototype.L;of.prototype.on=of.prototype.J;of.prototype.once=of.prototype.once;of.prototype.un=of.prototype.K;rf.prototype.getClosestPoint=rf.prototype.Ab;rf.prototype.intersectsCoordinate=rf.prototype.sb;rf.prototype.getExtent=rf.prototype.G;rf.prototype.rotate=rf.prototype.rotate;rf.prototype.scale=rf.prototype.scale;
rf.prototype.simplify=rf.prototype.Rb;rf.prototype.transform=rf.prototype.tb;rf.prototype.get=rf.prototype.get;rf.prototype.getKeys=rf.prototype.O;rf.prototype.getProperties=rf.prototype.N;rf.prototype.set=rf.prototype.set;rf.prototype.setProperties=rf.prototype.H;rf.prototype.unset=rf.prototype.P;rf.prototype.changed=rf.prototype.s;rf.prototype.dispatchEvent=rf.prototype.b;rf.prototype.getRevision=rf.prototype.L;rf.prototype.on=rf.prototype.J;rf.prototype.once=rf.prototype.once;rf.prototype.un=rf.prototype.K;
ys.prototype.getFirstCoordinate=ys.prototype.ac;ys.prototype.getLastCoordinate=ys.prototype.bc;ys.prototype.getLayout=ys.prototype.cc;ys.prototype.rotate=ys.prototype.rotate;ys.prototype.scale=ys.prototype.scale;ys.prototype.getClosestPoint=ys.prototype.Ab;ys.prototype.intersectsCoordinate=ys.prototype.sb;ys.prototype.getExtent=ys.prototype.G;ys.prototype.simplify=ys.prototype.Rb;ys.prototype.get=ys.prototype.get;ys.prototype.getKeys=ys.prototype.O;ys.prototype.getProperties=ys.prototype.N;
ys.prototype.set=ys.prototype.set;ys.prototype.setProperties=ys.prototype.H;ys.prototype.unset=ys.prototype.P;ys.prototype.changed=ys.prototype.s;ys.prototype.dispatchEvent=ys.prototype.b;ys.prototype.getRevision=ys.prototype.L;ys.prototype.on=ys.prototype.J;ys.prototype.once=ys.prototype.once;ys.prototype.un=ys.prototype.K;tm.prototype.getClosestPoint=tm.prototype.Ab;tm.prototype.intersectsCoordinate=tm.prototype.sb;tm.prototype.getExtent=tm.prototype.G;tm.prototype.rotate=tm.prototype.rotate;
tm.prototype.scale=tm.prototype.scale;tm.prototype.simplify=tm.prototype.Rb;tm.prototype.transform=tm.prototype.tb;tm.prototype.get=tm.prototype.get;tm.prototype.getKeys=tm.prototype.O;tm.prototype.getProperties=tm.prototype.N;tm.prototype.set=tm.prototype.set;tm.prototype.setProperties=tm.prototype.H;tm.prototype.unset=tm.prototype.P;tm.prototype.changed=tm.prototype.s;tm.prototype.dispatchEvent=tm.prototype.b;tm.prototype.getRevision=tm.prototype.L;tm.prototype.on=tm.prototype.J;
tm.prototype.once=tm.prototype.once;tm.prototype.un=tm.prototype.K;Jf.prototype.getFirstCoordinate=Jf.prototype.ac;Jf.prototype.getLastCoordinate=Jf.prototype.bc;Jf.prototype.getLayout=Jf.prototype.cc;Jf.prototype.rotate=Jf.prototype.rotate;Jf.prototype.scale=Jf.prototype.scale;Jf.prototype.getClosestPoint=Jf.prototype.Ab;Jf.prototype.intersectsCoordinate=Jf.prototype.sb;Jf.prototype.getExtent=Jf.prototype.G;Jf.prototype.simplify=Jf.prototype.Rb;Jf.prototype.transform=Jf.prototype.tb;
Jf.prototype.get=Jf.prototype.get;Jf.prototype.getKeys=Jf.prototype.O;Jf.prototype.getProperties=Jf.prototype.N;Jf.prototype.set=Jf.prototype.set;Jf.prototype.setProperties=Jf.prototype.H;Jf.prototype.unset=Jf.prototype.P;Jf.prototype.changed=Jf.prototype.s;Jf.prototype.dispatchEvent=Jf.prototype.b;Jf.prototype.getRevision=Jf.prototype.L;Jf.prototype.on=Jf.prototype.J;Jf.prototype.once=Jf.prototype.once;Jf.prototype.un=Jf.prototype.K;O.prototype.getFirstCoordinate=O.prototype.ac;
O.prototype.getLastCoordinate=O.prototype.bc;O.prototype.getLayout=O.prototype.cc;O.prototype.rotate=O.prototype.rotate;O.prototype.scale=O.prototype.scale;O.prototype.getClosestPoint=O.prototype.Ab;O.prototype.intersectsCoordinate=O.prototype.sb;O.prototype.getExtent=O.prototype.G;O.prototype.simplify=O.prototype.Rb;O.prototype.transform=O.prototype.tb;O.prototype.get=O.prototype.get;O.prototype.getKeys=O.prototype.O;O.prototype.getProperties=O.prototype.N;O.prototype.set=O.prototype.set;
O.prototype.setProperties=O.prototype.H;O.prototype.unset=O.prototype.P;O.prototype.changed=O.prototype.s;O.prototype.dispatchEvent=O.prototype.b;O.prototype.getRevision=O.prototype.L;O.prototype.on=O.prototype.J;O.prototype.once=O.prototype.once;O.prototype.un=O.prototype.K;P.prototype.getFirstCoordinate=P.prototype.ac;P.prototype.getLastCoordinate=P.prototype.bc;P.prototype.getLayout=P.prototype.cc;P.prototype.rotate=P.prototype.rotate;P.prototype.scale=P.prototype.scale;
P.prototype.getClosestPoint=P.prototype.Ab;P.prototype.intersectsCoordinate=P.prototype.sb;P.prototype.getExtent=P.prototype.G;P.prototype.simplify=P.prototype.Rb;P.prototype.transform=P.prototype.tb;P.prototype.get=P.prototype.get;P.prototype.getKeys=P.prototype.O;P.prototype.getProperties=P.prototype.N;P.prototype.set=P.prototype.set;P.prototype.setProperties=P.prototype.H;P.prototype.unset=P.prototype.P;P.prototype.changed=P.prototype.s;P.prototype.dispatchEvent=P.prototype.b;
P.prototype.getRevision=P.prototype.L;P.prototype.on=P.prototype.J;P.prototype.once=P.prototype.once;P.prototype.un=P.prototype.K;Q.prototype.getFirstCoordinate=Q.prototype.ac;Q.prototype.getLastCoordinate=Q.prototype.bc;Q.prototype.getLayout=Q.prototype.cc;Q.prototype.rotate=Q.prototype.rotate;Q.prototype.scale=Q.prototype.scale;Q.prototype.getClosestPoint=Q.prototype.Ab;Q.prototype.intersectsCoordinate=Q.prototype.sb;Q.prototype.getExtent=Q.prototype.G;Q.prototype.simplify=Q.prototype.Rb;
Q.prototype.transform=Q.prototype.tb;Q.prototype.get=Q.prototype.get;Q.prototype.getKeys=Q.prototype.O;Q.prototype.getProperties=Q.prototype.N;Q.prototype.set=Q.prototype.set;Q.prototype.setProperties=Q.prototype.H;Q.prototype.unset=Q.prototype.P;Q.prototype.changed=Q.prototype.s;Q.prototype.dispatchEvent=Q.prototype.b;Q.prototype.getRevision=Q.prototype.L;Q.prototype.on=Q.prototype.J;Q.prototype.once=Q.prototype.once;Q.prototype.un=Q.prototype.K;R.prototype.getFirstCoordinate=R.prototype.ac;
R.prototype.getLastCoordinate=R.prototype.bc;R.prototype.getLayout=R.prototype.cc;R.prototype.rotate=R.prototype.rotate;R.prototype.scale=R.prototype.scale;R.prototype.getClosestPoint=R.prototype.Ab;R.prototype.intersectsCoordinate=R.prototype.sb;R.prototype.getExtent=R.prototype.G;R.prototype.simplify=R.prototype.Rb;R.prototype.transform=R.prototype.tb;R.prototype.get=R.prototype.get;R.prototype.getKeys=R.prototype.O;R.prototype.getProperties=R.prototype.N;R.prototype.set=R.prototype.set;
R.prototype.setProperties=R.prototype.H;R.prototype.unset=R.prototype.P;R.prototype.changed=R.prototype.s;R.prototype.dispatchEvent=R.prototype.b;R.prototype.getRevision=R.prototype.L;R.prototype.on=R.prototype.J;R.prototype.once=R.prototype.once;R.prototype.un=R.prototype.K;C.prototype.getFirstCoordinate=C.prototype.ac;C.prototype.getLastCoordinate=C.prototype.bc;C.prototype.getLayout=C.prototype.cc;C.prototype.rotate=C.prototype.rotate;C.prototype.scale=C.prototype.scale;
C.prototype.getClosestPoint=C.prototype.Ab;C.prototype.intersectsCoordinate=C.prototype.sb;C.prototype.getExtent=C.prototype.G;C.prototype.simplify=C.prototype.Rb;C.prototype.transform=C.prototype.tb;C.prototype.get=C.prototype.get;C.prototype.getKeys=C.prototype.O;C.prototype.getProperties=C.prototype.N;C.prototype.set=C.prototype.set;C.prototype.setProperties=C.prototype.H;C.prototype.unset=C.prototype.P;C.prototype.changed=C.prototype.s;C.prototype.dispatchEvent=C.prototype.b;
C.prototype.getRevision=C.prototype.L;C.prototype.on=C.prototype.J;C.prototype.once=C.prototype.once;C.prototype.un=C.prototype.K;D.prototype.getFirstCoordinate=D.prototype.ac;D.prototype.getLastCoordinate=D.prototype.bc;D.prototype.getLayout=D.prototype.cc;D.prototype.rotate=D.prototype.rotate;D.prototype.scale=D.prototype.scale;D.prototype.getClosestPoint=D.prototype.Ab;D.prototype.intersectsCoordinate=D.prototype.sb;D.prototype.getExtent=D.prototype.G;D.prototype.simplify=D.prototype.Rb;
D.prototype.transform=D.prototype.tb;D.prototype.get=D.prototype.get;D.prototype.getKeys=D.prototype.O;D.prototype.getProperties=D.prototype.N;D.prototype.set=D.prototype.set;D.prototype.setProperties=D.prototype.H;D.prototype.unset=D.prototype.P;D.prototype.changed=D.prototype.s;D.prototype.dispatchEvent=D.prototype.b;D.prototype.getRevision=D.prototype.L;D.prototype.on=D.prototype.J;D.prototype.once=D.prototype.once;D.prototype.un=D.prototype.K;Sm.prototype.readFeatures=Sm.prototype.Oa;
an.prototype.readFeatures=an.prototype.Oa;Sm.prototype.readFeatures=Sm.prototype.Oa;md.prototype.get=md.prototype.get;md.prototype.getKeys=md.prototype.O;md.prototype.getProperties=md.prototype.N;md.prototype.set=md.prototype.set;md.prototype.setProperties=md.prototype.H;md.prototype.unset=md.prototype.P;md.prototype.changed=md.prototype.s;md.prototype.dispatchEvent=md.prototype.b;md.prototype.getRevision=md.prototype.L;md.prototype.on=md.prototype.J;md.prototype.once=md.prototype.once;
md.prototype.un=md.prototype.K;nd.prototype.getMap=nd.prototype.g;nd.prototype.setMap=nd.prototype.setMap;nd.prototype.setTarget=nd.prototype.f;nd.prototype.get=nd.prototype.get;nd.prototype.getKeys=nd.prototype.O;nd.prototype.getProperties=nd.prototype.N;nd.prototype.set=nd.prototype.set;nd.prototype.setProperties=nd.prototype.H;nd.prototype.unset=nd.prototype.P;nd.prototype.changed=nd.prototype.s;nd.prototype.dispatchEvent=nd.prototype.b;nd.prototype.getRevision=nd.prototype.L;nd.prototype.on=nd.prototype.J;
nd.prototype.once=nd.prototype.once;nd.prototype.un=nd.prototype.K;yd.prototype.getMap=yd.prototype.g;yd.prototype.setMap=yd.prototype.setMap;yd.prototype.setTarget=yd.prototype.f;yd.prototype.get=yd.prototype.get;yd.prototype.getKeys=yd.prototype.O;yd.prototype.getProperties=yd.prototype.N;yd.prototype.set=yd.prototype.set;yd.prototype.setProperties=yd.prototype.H;yd.prototype.unset=yd.prototype.P;yd.prototype.changed=yd.prototype.s;yd.prototype.dispatchEvent=yd.prototype.b;
yd.prototype.getRevision=yd.prototype.L;yd.prototype.on=yd.prototype.J;yd.prototype.once=yd.prototype.once;yd.prototype.un=yd.prototype.K;Dd.prototype.getMap=Dd.prototype.g;Dd.prototype.setMap=Dd.prototype.setMap;Dd.prototype.setTarget=Dd.prototype.f;Dd.prototype.get=Dd.prototype.get;Dd.prototype.getKeys=Dd.prototype.O;Dd.prototype.getProperties=Dd.prototype.N;Dd.prototype.set=Dd.prototype.set;Dd.prototype.setProperties=Dd.prototype.H;Dd.prototype.unset=Dd.prototype.P;Dd.prototype.changed=Dd.prototype.s;
Dd.prototype.dispatchEvent=Dd.prototype.b;Dd.prototype.getRevision=Dd.prototype.L;Dd.prototype.on=Dd.prototype.J;Dd.prototype.once=Dd.prototype.once;Dd.prototype.un=Dd.prototype.K;Bk.prototype.getMap=Bk.prototype.g;Bk.prototype.setMap=Bk.prototype.setMap;Bk.prototype.setTarget=Bk.prototype.f;Bk.prototype.get=Bk.prototype.get;Bk.prototype.getKeys=Bk.prototype.O;Bk.prototype.getProperties=Bk.prototype.N;Bk.prototype.set=Bk.prototype.set;Bk.prototype.setProperties=Bk.prototype.H;Bk.prototype.unset=Bk.prototype.P;
Bk.prototype.changed=Bk.prototype.s;Bk.prototype.dispatchEvent=Bk.prototype.b;Bk.prototype.getRevision=Bk.prototype.L;Bk.prototype.on=Bk.prototype.J;Bk.prototype.once=Bk.prototype.once;Bk.prototype.un=Bk.prototype.K;ud.prototype.getMap=ud.prototype.g;ud.prototype.setMap=ud.prototype.setMap;ud.prototype.setTarget=ud.prototype.f;ud.prototype.get=ud.prototype.get;ud.prototype.getKeys=ud.prototype.O;ud.prototype.getProperties=ud.prototype.N;ud.prototype.set=ud.prototype.set;
ud.prototype.setProperties=ud.prototype.H;ud.prototype.unset=ud.prototype.P;ud.prototype.changed=ud.prototype.s;ud.prototype.dispatchEvent=ud.prototype.b;ud.prototype.getRevision=ud.prototype.L;ud.prototype.on=ud.prototype.J;ud.prototype.once=ud.prototype.once;ud.prototype.un=ud.prototype.K;Gk.prototype.getMap=Gk.prototype.g;Gk.prototype.setMap=Gk.prototype.setMap;Gk.prototype.setTarget=Gk.prototype.f;Gk.prototype.get=Gk.prototype.get;Gk.prototype.getKeys=Gk.prototype.O;
Gk.prototype.getProperties=Gk.prototype.N;Gk.prototype.set=Gk.prototype.set;Gk.prototype.setProperties=Gk.prototype.H;Gk.prototype.unset=Gk.prototype.P;Gk.prototype.changed=Gk.prototype.s;Gk.prototype.dispatchEvent=Gk.prototype.b;Gk.prototype.getRevision=Gk.prototype.L;Gk.prototype.on=Gk.prototype.J;Gk.prototype.once=Gk.prototype.once;Gk.prototype.un=Gk.prototype.K;wd.prototype.getMap=wd.prototype.g;wd.prototype.setMap=wd.prototype.setMap;wd.prototype.setTarget=wd.prototype.f;wd.prototype.get=wd.prototype.get;
wd.prototype.getKeys=wd.prototype.O;wd.prototype.getProperties=wd.prototype.N;wd.prototype.set=wd.prototype.set;wd.prototype.setProperties=wd.prototype.H;wd.prototype.unset=wd.prototype.P;wd.prototype.changed=wd.prototype.s;wd.prototype.dispatchEvent=wd.prototype.b;wd.prototype.getRevision=wd.prototype.L;wd.prototype.on=wd.prototype.J;wd.prototype.once=wd.prototype.once;wd.prototype.un=wd.prototype.K;Lk.prototype.getMap=Lk.prototype.g;Lk.prototype.setMap=Lk.prototype.setMap;
Lk.prototype.setTarget=Lk.prototype.f;Lk.prototype.get=Lk.prototype.get;Lk.prototype.getKeys=Lk.prototype.O;Lk.prototype.getProperties=Lk.prototype.N;Lk.prototype.set=Lk.prototype.set;Lk.prototype.setProperties=Lk.prototype.H;Lk.prototype.unset=Lk.prototype.P;Lk.prototype.changed=Lk.prototype.s;Lk.prototype.dispatchEvent=Lk.prototype.b;Lk.prototype.getRevision=Lk.prototype.L;Lk.prototype.on=Lk.prototype.J;Lk.prototype.once=Lk.prototype.once;Lk.prototype.un=Lk.prototype.K;Qk.prototype.getMap=Qk.prototype.g;
Qk.prototype.setMap=Qk.prototype.setMap;Qk.prototype.setTarget=Qk.prototype.f;Qk.prototype.get=Qk.prototype.get;Qk.prototype.getKeys=Qk.prototype.O;Qk.prototype.getProperties=Qk.prototype.N;Qk.prototype.set=Qk.prototype.set;Qk.prototype.setProperties=Qk.prototype.H;Qk.prototype.unset=Qk.prototype.P;Qk.prototype.changed=Qk.prototype.s;Qk.prototype.dispatchEvent=Qk.prototype.b;Qk.prototype.getRevision=Qk.prototype.L;Qk.prototype.on=Qk.prototype.J;Qk.prototype.once=Qk.prototype.once;
Qk.prototype.un=Qk.prototype.K;
  return OPENLAYERS.ol;
}));


function Map(type) {}

function InteractiveMap() {
    Map.call(this);
    this.updateMapPositionOnGps = true;
    // Initialize the Map With Controls to change the view
    this.map = this.initMap();
    this.module = null;
    this.GpsManager = null;
    // Initialize the Positions gathering on click on the Map
    this.reversePositionManager = new ReversePositionManager(this); // This is the Overlay that displays informations about a position where the user has clicked. 
}
InteractiveMap.prototype = Object.create(Map.prototype);
InteractiveMap.prototype.constructor = InteractiveMap;

InteractiveMap.prototype.enableGPSManager = function(){
    // Initialize the GPS Module
    this.GpsManager = new GpsManager(this);
}

InteractiveMap.prototype.initMap = function() {
    /**
     * Add prototypes to the map that can convert coordinates
     */
    /**
     * transformToMapCoordinates()
     * Transforms a point [lon, lat] from 'EPSG:4326' (World-Coordinates) to 'EPSG:3857' (Map-Coordinates)
     * @param point  : Input Point in EPSG:4326 format
     * @return point : returns the point in EPSG:3857
     **/
    ol.Map.prototype.transformToMapCoordinates = function(point) {
        return ol.proj.transform(point, 'EPSG:4326', 'EPSG:3857');
    }
    /**
     * transformToWorldCoordinates()
     * Transforms a point [lon, lat] from 'EPSG:3857' (Map-Coordinates) to 'EPSG:4326' (World-Coordinates)
     * @param point  : Input Point in EPSG:3857 format
     * @return point : returns the point in EPSG:4326
     **/
    ol.Map.prototype.transformToWorldCoordinates = function(point) {
        return ol.proj.transform(point, 'EPSG:3857', 'EPSG:4326');
    }
    var source = null;
    if(typeof android === "undefined"){
        // We are not serving this for the app so we'll use our regular Tile-Serve
        source = new ol.source.OSM({
                        attributions: [
                            new ol.Attribution({
                                html: '&copy; ' + '<a href="https://metager.de/">MetaGer.de</a>'
                            }),
                            new ol.Attribution({
                                html: '| <a href="https://metager.de/impressum">Impressum</a>'
                            }),
                            new ol.Attribution({
                                html: '| &copy; ' + '<a href="http://nominatim.openstreetmap.org/">Nominatim</a>'
                            }),
                            ol.source.OSM.ATTRIBUTION,
                        ],
                        //url: 'https://tiles.metager.de/{z}/{x}/{y}.png'
                        url: '/tile_cache/{z}/{x}/{y}.png'
                    });
    }else{
        // This is for our Android App we'll use another Tile-Server that has it's cache Disabled
        // The App will Cache the Tiles for us that's why we don't need the browser to do it.
        source = new ol.source.OSM({
                        attributions: [
                            new ol.Attribution({
                                html: '&copy; ' + '<a href="https://metager.de/">MetaGer.de</a>'
                            }),
                            new ol.Attribution({
                                html: '| <a href="https://metager.de/impressum">Impressum</a>'
                            }),
                            new ol.Attribution({
                                html: '| &copy; ' + '<a href="http://nominatim.openstreetmap.org/">Nominatim</a>'
                            }),
                            ol.source.OSM.ATTRIBUTION,
                        ],
                        //url: 'https://tiles.metager.de/{z}/{x}/{y}.png'
                        url: '/tile_cache/{z}/{x}/{y}.png'
                    });
    }
    var initPos = [9.841943417968748,52.18082778659789];
    var initZoom = 8;
    if(typeof pos != "undefined" && typeof zoom != "undefined"){
        initPos = pos;
        initZoom = zoom;
        pos = null;
        zoom = null;
        this.updateMapPositionOnGps = false;
    }
    var map = new ol.Map({
        layers: [
            new ol.layer.Tile({
                preload: 0,
                source: source
            }),/*
            new ol.layer.Tile({
                source: new ol.source.TileDebug({
                  projection: 'EPSG:3857',
                  tileGrid:  source.getTileGrid()
                })
              })*/
        ],
        target: 'map',
        controls: ol.control.defaults({
            attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
                collapsible: false
            })
        }).extend([
            new ol.control.ScaleLine()
        ]),
        view: new ol.View({
            maxZoom: 18,
            minZoom: 6,
            center: ol.proj.transform(
                //[9.45824, 52.48812], 'EPSG:4326', 'EPSG:3857'),
                initPos, 'EPSG:4326', 'EPSG:3857'),
            zoom: initZoom
        }),
        loadTilesWhileAnimating: true,
        loadTilesWhileInteracting: true
    });
    map.addControl(new ol.control.ZoomSlider());
    return map;
}
InteractiveMap.prototype.switchModule = function(name, args){

    if(this.module !== null){
        // Every Module must implement this method for deinitialization
        this.module.exit();
        this.module = null;
    }
    switch(name){
        case "search":
            // The search Module can be started with or without a search term
            if(typeof args == "string"){
                this.module = new SearchModule(this, args);
            }else{
                this.module = new SearchModule(this);
            }
            break;
        case "route-finding":
            this.module = new RouteFinder(this, args.waypoints, args.vehicle);
            break;
        case "navigatiion":
            break;
        case "offline-karten":
            this.module = new OfflineModule(this);
            break;
        case "navigation":
            this.module = new NavigationModule(this, args);
        default:
            return;
    }
}

function StaticMap() {
    Map.call(this);
}
/**
 * This Class provides Methods to evaluate the Results that Nominatim gives us
 * 
 **/
function NominatimParser(nominatimResult) {
    this.nominatimResult = nominatimResult;
}
/**
 * This function creates a HTML Object with the most important Informations of the Result
 * @param gps - Boolean whether gps in enabled or not (creates)
 **/
NominatimParser.prototype.getHTMLResult = function() {
    var data = this.nominatimResult;
    if (typeof data !== "undefined" && typeof data["address"] !== "undefined") {
        // Success we have an address
        var address = data["address"];
        var road = this.getRoad(address);
        var house_number = this.getHouseNumber(address);
        var city = this.getCity(address);
        var id = data["place_id"];
        var html = "<div class=\"result\">\n";
        html += "<div class=\"result-information\">";
        // Wir extrahieren noch einen Namen
        if (typeof data["namedetails"]["name"] !== "undefined") {
            html += "<div class=\"title\">" + data["namedetails"]["name"] + "</div>\n";
        }
        var road = this.getRoad(address);
        var house_number = this.getHouseNumber(address);
        if (road !== "") {
            html += "<div class=\"address\">" + road;
            if (house_number !== "") {
                html += " " + house_number;
            }
            html += "</div>\n";
        }
        var city = this.getCity(address);
        if (city !== "") {
            html += "<div class=\"city\">" + city + "</div>\n";
        }
        var phone = "";
        if (typeof data["extratags"]["contact:phone"] !== "undefined") {
            phone = data["extratags"]["contact:phone"];
        } else if (typeof data["extratags"]["phone"] !== "undefined") {
            phone = data["extratags"]["phone"];
        }
        if (phone !== "") {
            html += "<div class=\"phone\"><a href=\"tel:" + phone + "\" onclick=\"event.stopPropagation();\" target=_blank><span class=\"glyphicon glyphicon-earphone\"></span> " + phone + "</a></div>\n";
        }
        if (typeof data["extratags"]["website"] !== "undefined") {
            var url = data["extratags"]["website"];
            if (url.lastIndexOf("http", 0) !== 0) {
                url = "http://" + url;
            }
            html += "<div class=\"website\"><a href=\"" + url + "\" onclick=\"event.stopPropagation();\" target=_blank><span class=\"glyphicon glyphicon-globe\"></span> " + url + "</a></div>\n";
        }
        if (typeof data["extratags"]["wikipedia"] !== "undefined") {
            var url = "https://de.wikipedia.org/wiki/" + data["extratags"]["wikipedia"];
            html += "<div class=\"wikipedia\"><a href=\"" + url + "\" onclick=\"event.stopPropagation();\" target=_blank><img src=\"/img/wiki.svg\" alt=\"wikipedia\" width=\"20px\"> Wikipedia</a></div>\n";
        }
        // Add possible Opening Hours:
        if (typeof data["extratags"]["opening_hours"] !== "undefined") {
            html += "<div class=\"opening-hours\">" + data["extratags"]["opening_hours"] + "</div>\n";
        }
        if (typeof data["extratags"]["description"] !== "undefined") {
            html += "<div class=\"description\">" + data["extratags"]["description"] + "</div>\n";
        }
        html += "</div><div class=\"result-actions\">";
        // Update Address details
        lon = parseFloat(data["lon"]);
        lat = parseFloat(data["lat"]);
        // Now the two Links
        var url = "";
        url = "/route/start/foot/" + lon + "," + lat;
        html += '<a class="start-route-service" data-lon="'+lon+'" data-lat="'+lat+'" href="javascript:void(0);" onclick="event.stopPropagation();">Route berechnen</a>';
        // And the Link to the MetaGer Search
        // build the search query
        var query = "";
        if (typeof data["namedetails"]["name"] !== "undefined") {
            query += data["namedetails"]["name"];
        }
        query += " " + road;
        query += " " + city;
        query = query.trim();
        if (query.length > 0) {
            var url = 'https://metager.de/meta/meta.ger3?focus=web&eingabe=' + encodeURIComponent(query) + '&encoding=utf8&lang=all';
            html += '<a href=\"' + url + '\" onclick="event.stopPropagation();" target=_blank>MetaGer Suche</a>';
        }
        html += "</div></div>";
        var popup = $(html);
        return popup;
    } else {
        return null;
    }
}

NominatimParser.prototype.getRouteFinderHtml = function(){
    var data = this.nominatimResult;
    if (typeof data !== "undefined" && typeof data["address"] !== "undefined") {
        // Success we have an address
        var address = data["address"];
        var road = this.getRoad(address);
        var house_number = this.getHouseNumber(address);
        var city = this.getCity(address);
        var id = data["place_id"];
        var html = "<div class=\"result\">\n";
        html += "<div class=\"result-information\">";
        // Wir extrahieren noch einen Namen
        if (typeof data["namedetails"]["name"] !== "undefined") {
            html += "<div class=\"title\">" + data["namedetails"]["name"] + "</div>\n";
        }
        var road = this.getRoad(address);
        var house_number = this.getHouseNumber(address);
        if (road !== "") {
            html += "<div class=\"address\">" + road;
            if (house_number !== "") {
                html += " " + house_number;
            }
            html += "</div>\n";
        }
        var city = this.getCity(address);
        if (city !== "") {
            html += "<div class=\"city\">" + city + "</div>\n";
        }

        if (typeof data["extratags"]["description"] !== "undefined") {
            html += "<div class=\"description\">" + data["extratags"]["description"] + "</div>\n";
        }
        html += "</div></div>";
        var popup = $(html);
        return popup;
    } else {
        return null;
    }
}

NominatimParser.prototype.getHTMLAddressDetails = function(){
    var data = this.nominatimResult;
    if (typeof data !== "undefined" && typeof data["address"] !== "undefined") {
        // Success we have an address
        var address = data["address"];
        var road = this.getRoad(address);
        var house_number = this.getHouseNumber(address);
        var city = this.getCity(address);
        var id = data["place_id"];
        var html = "<div class=\"result\">\n";
        html += "<div class=\"result-information\">";
        // Wir extrahieren noch einen Namen
        if (typeof data["namedetails"]["name"] !== "undefined") {
            html += "<div class=\"title\">" + data["namedetails"]["name"] + "</div>\n";
        }
        var road = this.getRoad(address);
        var house_number = this.getHouseNumber(address);
        if (road !== "") {
            html += "<div class=\"address\">" + road;
            if (house_number !== "") {
                html += " " + house_number;
            }
            html += "</div>\n";
        }
        var city = this.getCity(address);
        if (city !== "") {
            html += "<div class=\"city\">" + city + "</div>\n";
        }
        html += "</div></div>";
        return html;
    }else{
        return null;
    }
}

/**
 * Parsesan OSM-Address-Object for the Road-Name
 * @param {Array} address
 * @return {String} roadname
 */
NominatimParser.prototype.getRoad = function(address) {
    var road = "";
    if (typeof address["road"] !== 'undefined') {
        road = address["road"];
    } else if (typeof address["pedestrian"] !== 'undefined') {
        road = address["pedestrian"];
    } else if (typeof address["path"] !== 'undefined') {
        road = address["path"];
    } else if (typeof address["footway"] !== 'undefined') {
        road = address["footway"];
    }
    return road;
}
/**
 * Parse an OSM-Address-Object for the House Number
 * @param {Array} address
 * @return {String} Housenumber
 */
NominatimParser.prototype.getHouseNumber = function(address) {
    var house_number = typeof address["house_number"] !== 'undefined' ? address["house_number"] : "";
    return house_number;
}
/**
 * Parse an OSM-Address-Object for the City (including Zip-Code)
 * @param {Array} address
 * @return {String} City
 */
NominatimParser.prototype.getCity = function(address) {
    var city = typeof address["postcode"] !== 'undefined' ? address["postcode"] + " " : "";
    if (typeof address["city"] !== "undefined") {
        city += address["city"];
    } else if (typeof address["town"] !== "undefined") {
        city += address["town"];
    } else if (typeof address["village"] !== "undefined") {
        city += address["village"];
    }
    return city;
}
function ReversePositionManager(interactiveMap){
    // Save the Reference to the map Object
    this.interactiveMap = interactiveMap;

    // Create the overlay for the map
    this.positionOverlay = new ol.Overlay( /** @type {olx.OverlayOptions} */ ({
        element: document.getElementById("popup"),
        autoPan: true,
        autoPanAnimation: {
            duration: 250
        }
    }));
    // Add the Overlay to the map
    this.interactiveMap.map.addOverlay(this.positionOverlay);
    // Add the Event Handler for the Click
    this.setActive(true);
    // Add the close event for the Popup
    $("#popup-closer").click({caller: this}, function(event) {
        event.data.caller.positionOverlay.setPosition(undefined);
        $(this).blur();
        return false;
    });

}
ReversePositionManager.prototype = Object.create(ReversePositionManager.prototype);
ReversePositionManager.prototype.constructor = ReversePositionManager;


/**
 * This function sends a request to our Nominatim instance and evaluates the given coordinates to an adress
 * @param {Float} lon
 * @param {Float} lat
 * @return {Array} adress
 */
ReversePositionManager.prototype.getNearest = function(evt){
    var pos = this.interactiveMap.map.transformToWorldCoordinates(evt["coordinate"]);
    var url = "https://maps.metager.de/nominatim/reverse.php?format=json&lat=" + pos[1] + "&lon=" + pos[0] + "&zoom=18&extratags=1&addressdetails=1&namedetails=1";
    var interactiveMap = this.interactiveMap;
    var caller = this;
    // Send the Request
    $.get(url, function(data) {
        var popup = new NominatimParser(data).getHTMLResult();
        $(popup).find("a.start-route-service").click({caller: caller}, function(event){
            event.data.caller.interactiveMap.switchModule("route-finding", {waypoints: [[data["lon"], data["lat"]]]});
        });
        caller.createPopup(interactiveMap.map.transformToMapCoordinates([parseFloat(data["lon"]), parseFloat(data["lat"])]), popup);
    });
}

ReversePositionManager.prototype.createPopup = function(pos, html) {
    $("#popup-content").html(html);

    this.positionOverlay.setPosition(pos);
}

ReversePositionManager.prototype.setActive = function(bool){
    this.interactiveMap.map.un('singleclick', this.getNearest , this);
    if(bool){
        this.interactiveMap.map.on('singleclick', this.getNearest, this);
    }
}
function GpsManager(interactiveMap) {
    this.map = interactiveMap.map;
    this.interactiveMap = interactiveMap;
    this.gps = null // Boolean which declares whether gps is available or not so we don't have to check against the API everytime
    this.location = null; // Array with Position data of the Last Position we retrieved
    this.bearing = null;
    this.lockViewToPosition = true; // Whether the view should be locked when the current Location is shown.
    this.id = null; // ID of the process that follow the Location
    this.userPositionMarker = null; // Marker that displays the user Position
    this.point_geom = null; // Geomatry of the exact Point of the user
    this.circle = null; // Geometry of the accuracy of the user position
    this.options = {
        enableHighAccuracy: true,
        maximumAge: 0
    };
    this.checkGps(); // This function will set the value of "this.gps" it check gps availability asynchronious
    // Add the Event Listeners to enable Location Following on the map
    this.addLocationEventListeners();
    // Be carefull we will not know if we have GPS or not directly after this constructor
    // because the validation is done asynchroniously.
}

GpsManager.prototype.constructor = GpsManager;

GpsManager.prototype.loadingGps = function(){
    // Returns a boolean so you can check whether this Manager is finished loading Gps
    if(this.gps == null)
        return true;
    else
        return false;
}

GpsManager.prototype.checkGps = function() {
    if (navigator.geolocation) {
        var caller = this;
        navigator.geolocation.getCurrentPosition(function(position) {
            caller.toggleGpsLocator(true);
            caller.location = [position.coords.longitude, position.coords.latitude];
            caller.accuracy = position.coords.accuracy;

            caller.gps = true;
            caller.enableGpsFeatures();
        }, function(error) {
            caller.gps = false;
            caller.toggleGpsLocator(false);
            caller.toggleGpsWarning();
            caller.disableGpsFeatures();
        }, {
            enableHighAccuracy: true,
            maximumAge: 0
        });
    } else {
        this.gps = false;
        this.toggleGpsLocator(false);
        this.toggleGpsWarning();
        this.disableGpsFeatures();
    }
}

// The GpsManager can call the predefined Functions of the current module
// If it finishes too fast with fetching the position it can cause troubles thats why we add a timeout
GpsManager.prototype.enableGpsFeatures = function() {
    window.setTimeout($.proxy(function(){
        this.interactiveMap.module.enableGps()
    }, this), 100);
    //setTimeout(this.interactiveMap.module.enableGps(), 10000);
}
GpsManager.prototype.disableGpsFeatures = function() {
    window.setTimeout($.proxy(function(){
        this.interactiveMap.module.disableGps();
    }, this), 100);
}
/**
 * Toggles the Map Feature (GpsLocation)
 * It's a button on the map to display your own Position
 * @param visible - Boolean whether GPS is available or not
 **/
GpsManager.prototype.toggleGpsLocator = function(visible) {
    if (visible) {
        $("#location-tool").removeClass("hidden");
        $("#start-navigation > a").attr("href", "/route/start/foot/gps;");
    } else {
        $("#location-tool").addClass("hidden");
        $("#start-navigation > a").attr("href", "/route/start/foot");
    }
}
/**
 * If the retrieval of GPS Position fails on mobile devices we will show a small warning for a 
 * period of time.
 **/
GpsManager.prototype.toggleGpsWarning = function() {
    $("#gps-error").addClass("visible-xs");
    $("#gps-error").removeClass("hidden");
    setTimeout(function() {
        $("#gps-error").addClass("hidden");
        $("#gps-error").removeClass("visible-xs");
    }, 5000);
}
GpsManager.prototype.addLocationEventListeners = function() {
    $("#follow-location > span.button").click({
        caller: this
    }, function(event) {
        event.data.caller.followLocation();
    });
    $("#lock-location > span.button").click({
        caller: this
    }, function(event) {
        var current = event.data.caller.lockViewToPosition;
        if (current) {
            $("#location-tool #lock-location").removeClass("active");
        } else {
            $("#location-tool #lock-location").addClass("active");
        }
        event.data.caller.lockViewToPosition = !event.data.caller.lockViewToPosition;
    });
}

GpsManager.prototype.stopWatch = function(){
    if(typeof this.followId != "undefined"){
        navigator.geolocation.clearWatch(this.followId);
        this.followId = undefined;
        console.log("Watch stopped");
    }
}

GpsManager.prototype.watchPosition = function(callback, options){
    if(typeof options == "undefined"){
        var options = {
            enableHighAccuracy: true,
            maximumAge: 3000
        };
    }
    if(typeof callback != "function")
        return;
    this.followId = navigator.geolocation.watchPosition($.proxy(function(position){
        // We have a new Position
        var long = parseFloat(position.coords.longitude);
        var lat = parseFloat(position.coords.latitude);
        this.location[0] = long;
        this.location[1] = lat;
        this.accuracy = parseFloat(position.coords.accuracy);
        this.timestamp = Math.floor(position.timestamp / 1000);
        // We can calculate the possible Heading if this is not the first Position we retrieve
        if(typeof this.bearingPos == "object" && this.bearingPos.length == 2 && this.getDistance(this.bearingPos, this.location) > this.accuracy){
            this.bearing = this.getBearing(this.bearingPos, this.location);
            this.bearingPos = [long, lat];
        }else{
            this.bearingPos = [long, lat];
            this.bearing = null;
        }
        callback(position);
    }, this), function(error) {
            // Follow Location couldn't be started. Abort now
            deinitAssistent();
        }, options);
    console.log(this.followId);
}

GpsManager.prototype.followLocation = function() {
    // Element to be displayed at the user-location
    var el = $('<span id="user-position" class="glyphicon glyphicon-record" style="color: #2881cc;"></span>');
    if (this.lockViewToPosition) $("#lock-location").addClass("active");
    else $("#lock-location").removeClass("active");
    if (this.id === null) {
        var caller = this;
        this.id = navigator.geolocation.watchPosition(function(position) {
            var center = caller.map.transformToMapCoordinates([parseFloat(position.coords.longitude), parseFloat(position.coords.latitude)]);
            var accuracy = parseFloat(position.coords.accuracy);
            console.log(accuracy);
            if (caller.userPositionMarker === null) {
                // Create User Position
                caller.point_geom = new ol.geom.Point(center);
                point_feature = new ol.Feature({
                    name: "Position",
                    geometry: caller.point_geom
                });
                // Create the accuracy Circle:
                caller.circle = new ol.geom.Circle(center, accuracy);
                accuracy_feature = new ol.Feature({
                    name: "Accuracy",
                    geometry: caller.circle
                });
                caller.userPositionMarker = new ol.layer.Vector({
                    source: new ol.source.Vector({
                        features: [point_feature, accuracy_feature]
                    })
                });
                caller.map.addLayer(caller.userPositionMarker);
            } else {
                caller.point_geom.setCoordinates(center);
                caller.circle.setCenter(center);
                caller.circle.setRadius(accuracy);
            }
            if (caller.lockViewToPosition) {
                // Fit the Extent of the Map to Fit the new Features Exactly
                caller.map.getView().fit(caller.userPositionMarker.getSource().getExtent(), {
                    padding: [5, 5, 5, 5],
                    duration: 600
                });
            }
            // Change the color of the Icon so the user knows that the position is tracked:
            $("#follow-location").addClass("active");
        }, function(error) {}, this.options);
        // Show the Lock View to Position Button
        $("#lock-location").removeClass("hidden");
        $("#lock-location > span.info").fadeOut(2000);
    } else {
        this.map.removeLayer(this.userPositionMarker);
        this.userPositionMarker = null;
        this.point_geom = null;
        this.circle = null;
        navigator.geolocation.clearWatch(this.id);
        this.id = null;
        // Clear the color of the Icon so the user knows that the position is no longer tracked
        $("#follow-location").removeClass("active");
        // Hide the lock View to Position Button
        $("#lock-location").addClass("hidden");
        $("#lock-location > span.info").css("display", "");
    }
}

GpsManager.prototype.getBearing = function(p1, p2){
    // Takes to Points in World Coordinates and calculates the Bearing of the connection Line
    var p1r = [this.toRadians(p1[0]), this.toRadians(p1[1])];
    var p2r = [this.toRadians(p2[0]), this.toRadians(p2[1])];
    var x = Math.cos(p2r[1]) * Math.sin(p2r[0] - p1r[0]);
    var y = Math.cos(p1r[1]) * Math.sin(p2r[1]) - Math.sin(p1r[1]) * Math.cos(p2r[1]) * Math.cos(p2r[0] - p1r[0]);
    var bearing = Math.atan2(x, y);
    bearing = this.toDegrees(bearing);
    if(bearing < 0){
        bearing += 360;
    }
    return bearing;
}

GpsManager.prototype.toRadians = function(angle) {
    return angle * (Math.PI / 180);
}

GpsManager.prototype.toDegrees = function(radians) {
    return radians * 180 / Math.PI;
}

GpsManager.prototype.getDistance = function(p1, p2){
    var wgs84Sphere = new ol.Sphere(6378137);
    return wgs84Sphere.haversineDistance(p1, p2);
}

function SearchModule(interactiveMap, query){
	this.interactiveMap = interactiveMap;	
	// Initialize History Objects
	this.searchHistory = new LocalHistory("suche");
	this.resultsHistory = new LocalHistory("results");
	// Add the Listener for the routing button
	$("#start-navigation").show();
	$("#start-navigation").click($.proxy(function(){
		this.interactiveMap.switchModule("route-finding", {waypoints: [], vehicle: "car"});
	}, this));
	// Initialize the search Interface
	this.initializeInterface();
	// Add the History Items to the Interface
	this.updatePastSearchContainer();
	// Add the Listeners
	this.addSearchListeners();
	// Add Options Menu
	this.addOptionsMenu();
	// Add the Url Updater
	this.addURLUpdater();
	// Start the Search already if the query variable is defined
	if(typeof query != "undefined"){
		// Update the user Interface with this search
		$("#search input[name=q]").val(query);
		// And trigger the event
		this.startSearch(true);
		this.updatePastSearchContainer();
	}else{
		this.updateURL();
	}
}

SearchModule.prototype.initializeInterface = function(){
	$("#search-addon").show('slow');
}

SearchModule.prototype.addOptionsMenu = function(){
	var caller = this;
	// If this is the App in the correct version we will show the Offline Module
	if(typeof(android) != "undefined" && android.getVersionCode() >= 13){
		$("#search-addon #options").show("slow");
		$("#options > ul > li").click(function(){
			caller.interactiveMap.switchModule('offline-karten');
		});
	}
}

SearchModule.prototype.removeOptionsMenu = function(){
	$("#options > ul > li").off();
	$("#search-addon #options").hide("slow");
}

SearchModule.prototype.addSearchListeners = function(){
	// When the searchfield got focussed
	// Mainly just displays the history
	$("#search-addon").focusin({caller: this}, function(event){
		event.data.caller.focusSearchInput();
	});
	$("#search-addon").focusout({caller: this}, function(event){
		event.data.caller.unfocusSearchInput();
	});

	$("#search").submit({caller: this}, function(event){
		event.data.caller.startSearch();
		return false;
	});
}
 
SearchModule.prototype.removeSearchListeners = function(){
	$("#search-addon").off();
	$("#search").off();
}

SearchModule.prototype.startSearch = function(moveMap){
	this.query = $("#search input[name=q]").val();
	var caller = this;
	// Conditions for not executing the search
	if(this.query == ""){
		$("#search input[name=q]").focus();
		return;
	}

	// Hide every History Item Container
	$("#search-addon .results .history-container .item").hide();

	if(this.results != null && this.results != undefined){
		this.results.deleteSearch();
		this.results = null;
	}

	// Generate the Url for the Search Results
	var map = this.interactiveMap.map;
	var tmpExtent = map.getView().calculateExtent(map.getSize());
	var extent = map.transformToWorldCoordinates([tmpExtent[0], tmpExtent[1]]).concat(map.transformToWorldCoordinates([tmpExtent[2], tmpExtent[3]]));
	var url = '/' + encodeURI(this.query) + '/' + encodeURI(String(extent[0])) + '/' + encodeURI(String(extent[1])) + '/' + encodeURI(String(extent[2])) + '/' + encodeURI(String(extent[3]));
	this.lockSearchFunctions();	
	// Query the Search:
	var timeout = 10; // 10 seconds Timeout for this request
	this.searching = $.ajax({
		url: url,
		dataType: 'json',
		success: $.proxy(function(data){
			if(typeof moveMap == "boolean")
				this.results = new Results(this.interactiveMap, data, this.query, moveMap, this.resultsHistory);
			else
				this.results = new Results(this.interactiveMap, data, this.query, undefined, this.resultsHistory);
			if(data.length > 0){
				this.updateURL();
				// This was a succesfull
				this.searchHistory.addItem({query: this.query});
				$("#search input[name=q]").blur();
			}
			this.unlockSearchFunctions();
		}, this),
		timeout: (timeout*1000),
		error: $.proxy(function(jqxr){
			// We encountered an error while trying to fetch the search results.
			// It can be an abortion error in case the user clicked abort, or a timeout/connection error
			// Only in the latter case we'll retry the search
			if(jqxr.statusText != "abort"){
				// This probably means that either the internet connection is bad or non existent at the moment
				// We'll retry in a second and repeat until either the user aborts searching, or we succeed
				// Show the user informations that we encountered network problems:
				$("#search-addon .results .wait-for-search > p").hide("slow"); // Hide the currently displayed information
				$("#search-addon .results .wait-for-search .no-internet").show("slow");
				$("#search input[name=q]").val(this.query);
				this.retrySearch = window.setTimeout($.proxy(function(){
					this.retrySearch = undefined;
					this.startSearch();
				}, this), 1000);
			}
		}, this)
	}).always($.proxy(function(){
		this.searching = undefined;
	}, this));

}

SearchModule.prototype.lockSearchFunctions = function(){
		if(this.searchFunctionsLocked == undefined || this.searchFunctionsLocked == false){
			this.searchFunctionsLocked = true;
			// Prevent Additional searches until this one finishes
			$("#search button[type=submit]").attr("disabled", true);
			$("#search input[name=q]").attr("readonly", true);

		    // Let's add a Loading animation:
		    $(".results .wait-for-search").show('fast');

		    // Let's make a new input-group-addon to cancel the search if it takes too long
		    var cancelSearch = $('\
		        <div class="input-group-addon" id="cancel-search" title="Suche abbrechen">\
		            X\
		        </div> \
		    ');
		    $(cancelSearch).click($.proxy(function(){
		    	console.log("aborting");
		    	if(this.retrySearch != undefined){
		    		window.clearTimeout(this.retrySearch);	// We retry fetching search results with a window.setTimeout() which needs to get cleared when we abort
		    	}
		    	if(this.searching != undefined){
		    		this.searching.abort();
		    	}
		    	this.unlockSearchFunctions();
		    }, this));
		    $("#search input[name=q]").after(cancelSearch);
		}
	};
SearchModule.prototype.unlockSearchFunctions = function(){
		if(this.searchFunctionsLocked != undefined && this.searchFunctionsLocked == true){
			// Prevent Additional searches until this one finishes
			$("#search button[type=submit]").attr("disabled", false);
			$("#search input[name=q]").attr("readonly", false);

		    // Let's add a Loading animation:
		    $("#search-addon .results .wait-for-search > p").show("fast");
		    $("#search-addon .results .wait-for-search .no-internet").hide("fast");
		    $(".results .wait-for-search").hide('fast');

		    $("#search #cancel-search").remove();
		    this.searchFunctionsLocked = false;
		}
	};

SearchModule.prototype.enableGps = function(){
	if(typeof this.query == "undefined" && this.interactiveMap.updateMapPositionOnGps){
    	this.interactiveMap.map.getView().setCenter(this.interactiveMap.map.transformToMapCoordinates(this.interactiveMap.GpsManager.location));
    	this.interactiveMap.map.getView().setZoom(12);
    }
}

SearchModule.prototype.disableGps = function(){
	
}

SearchModule.prototype.focusSearchInput = function(){
	// Add the Listener for the SearchBox
	$("#search-addon input[name=q]").keyup(function(){
		var value = $(this).val().toLowerCase();
		// Each past search:
		$("#search-addon .history-container .searches > .item").each(function(index, item){
			var query = $(item).find(".search-query").html().toLowerCase();
			if(value.length > 0 && query.indexOf(value) > -1){
				$(this).show();
			}else{
				$(this).hide();
			}
		});
	});
}

SearchModule.prototype.unfocusSearchInput = function(){
	// Add the Listener for the SearchBox
	$("#search-addon input[name=q]").off();
	$("#search-addon .history-container .item").hide();
}

SearchModule.prototype.addURLUpdater = function(){
	// Add the moveend event to the map
	this.interactiveMap.map.on("moveend", this.updateURL, this);
	$(window).on("popstate", $.proxy(this.popUrl, this));
}

SearchModule.prototype.updateURL = function(){
	// Register the Popstate Listener if not already done
		var pos = this.interactiveMap.map.getView().getCenter();
		pos = this.interactiveMap.map.transformToWorldCoordinates(pos);
		var zoom = this.interactiveMap.map.getView().getZoom();

		var results = this.results;
		if(typeof results != "undefined"){
			var data = results.results;
			var query = results.query;
		}
		var currentState = window.history.state;
		if(typeof query != "undefined"){
			if(currentState == null || typeof currentState.pos == "undefined" ||
				(currentState.pos[0] != pos[0] ||
				currentState.pos[1] != pos[1] ||
				currentState.zoom != zoom ||
				typeof currentState.query == "undefined" ||
				currentState.query != query)){
				var url = window.location.origin + "/map/" + query + "/" + pos[0] + "," + pos[1] + "," + zoom;
				window.history.pushState({"pos" : pos, "zoom" : zoom, "query" : query, "data" : data}, "", url);
			}
		}else if(currentState == null || typeof currentState.pos == "undefined" || currentState.query != undefined ||
			(currentState.pos[0] != pos[0] ||
				currentState.pos[1] != pos[1] ||
				currentState.zoom != zoom)){
			var url = window.location.origin + "/map/" + pos[0] + "," + pos[1] + "," + zoom;
			window.history.pushState({"pos" : pos, "zoom" : zoom}, "", url);
		}
}
			

SearchModule.prototype.popUrl = function(e){
	var state = e.originalEvent.state;
	if(state != null){
		// We need to determine if the state was produced by the Route Finder
		// If so, we need to switch to it.
		if(typeof state.waypoints != "undefined" && typeof state.vehicle != "undefined"){
			// Switch to the route finder
			this.interactiveMap.switchModule("route-finding", {waypoints: state.waypoints, vehicle: state.vehicle});
		}else if(typeof state.pos != "undefined" && typeof state.zoom != "undefined"){
			if(this.results !== null && this.results !== undefined){
				this.results.deleteSearch();
				this.results = null;
			}	
			// We will go back to the last Position
			if(typeof state.query != "undefined"){
				this.results = new Results(this.interactiveMap, state.data, state.query, false, this.resultsHistory);
			}
			this.interactiveMap.map.getView().animate({
				center: this.interactiveMap.map.transformToMapCoordinates(state.pos),
				zoom: state.zoom,
				duration: 250
			});
		}
	}
}

SearchModule.prototype.updatePastSearchContainer = function(){
	// Clear current Content
	$("#search-addon .history-container > .searches").html("");
	$.each(this.searchHistory.results, $.proxy(function(index, value){
		var item = $('\
			<div class="item inactive">\
				<div class="icon"><span class="glyphicon glyphicon-time"></span></div>\
				<div class="search-query">' + value.query + '</div>\
			</div>');
		$("#search-addon .history-container > .searches").append(item);
		$(item).mousedown({caller: this}, function(event){
			// Add the query to the Input Field and start a search
			$("#search-addon input[name=q]").val($(this).find(".search-query").html());
			event.data.caller.startSearch();
		});
	}, this));

	$("#search-addon .history-container > .searches > .inactive").hide();
}

SearchModule.prototype.removeURLUpdater = function(){
	// Add the moveend event to the map
	this.interactiveMap.map.un("moveend", this.updateURL, this);
	$(window).off("popstate", $.proxy(this.popUrl, this));
}

SearchModule.prototype.exit = function(){
	if(this.results !== null && this.results !== undefined)	this.results.deleteSearch();
	$("#popup-closer").click();
	$("#start-navigation").hide();
	$("#start-navigation").off();
	this.removeSearchListeners();
	$("#search-addon").hide('slow');
	this.removeOptionsMenu();
	this.removeURLUpdater();
}

/*
 This Class can store retrieve And Update Objects within the local storage
 It cann only be used to store Javascript Objects
 Each stored Object will get two extra items:
        date: the time in milliseconds when the object was last accessed
        hash: a unique hash code which can compare two of the objects
*/

function LocalHistory(type){
    this.MAXSIZE = 10;
    this.type = type;
    this.praefix = type + ":";
    this.results = [];
	this.history = this.readHistory();
    
}

LocalHistory.prototype.readHistory = function(){
    $.each(localStorage, $.proxy(function(key, value){
        if(key.indexOf(this.praefix) == 0){
            this.results.push(JSON.parse(this.b64DecodeUnicode(value)));
        }
    }, this));
    this.sortResults();
}

LocalHistory.prototype.sortResults = function(){
    this.results.sort(function(a,b){
        return b.date-a.date;
    });
}

LocalHistory.prototype.addItem = function(object){
    if(typeof object != "object") return;

    // Create a new Hash Value for this object
    object.hash = this.createHashValue(object);
    object.date = (new Date()).getTime();
    if(!this.contains(object)){
        // The new Object is not already contained
        // We will add the new one and make sure we are not exeeding the maximum size
        while(this.results.length >= this.MAXSIZE){
            this.results.pop();
        }
        this.results.push(object);
    }else{
        // The object is already contained in our result set
        // We will just update the Time for it 
        $.each(this.results, $.proxy(function(index, value){
            if(value.hash == object.hash){
                this.results[index].date = (new Date()).getTime();
                return 0;
            }
        }, this));
    }
    // Also resort the results
    this.sortResults();
    // And save it into the LocalStorage
    this.saveResults();
    
}

LocalHistory.prototype.saveResults = function(){
    // First delete every existing entry 
    $.each(localStorage, $.proxy(function(key, value){
        if(key.indexOf(this.praefix) == 0){
            localStorage.removeItem(key);
        }
    }, this));
    $.each(this.results, $.proxy(function(index, value){
        var stringObject = JSON.stringify(value);
        stringObject = this.b64EncodeUnicode(stringObject);
        localStorage.setItem(this.praefix + index, stringObject);
    }, this));
}

LocalHistory.prototype.createHashValue = function(object){
    var hash = 0;
    var stringObject = JSON.stringify(object);
    if(stringObject.length == 0) return hash;
    for(var i = 0; i < stringObject.length; i++){
        var character = stringObject.charCodeAt(i);
        hash = ((hash<<5)-hash)+character;
        hash = hash & hash;
    }
    return hash;
}

LocalHistory.prototype.contains = function(object){
    var contains = false;
    $.each(this.results, function(index, value){
        // Every Item is a Object which possibly contains more objects
        // Thats why every Items gets the String hash inserted into the object which can compare two items
        if(value.hash == object.hash){
            contains = true;
            return 0;
        }
    });
    return contains;
}

LocalHistory.prototype.b64EncodeUnicode = function(str){
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}

LocalHistory.prototype.b64DecodeUnicode = function(str) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

function Results(map, data, query, moveMap, resultsHistory){
	this.interactiveMap = map;
	this.results = data;
	this.query = query;
	this.resultsHistory = resultsHistory;
	if(typeof moveMap == "boolean"){
		this.moveMap = moveMap;
	}else{
		this.moveMap = true;
	}
	this.markerOverlays = [];
	this.updateInterface();
}

Results.prototype.deleteSearch = function(animationSpeed){
	// Activate Reverse Geocoding
	this.interactiveMap.reversePositionManager.setActive(true);
	if(animationSpeed === null){
		animationSpeed = "slow";
	}
	$("#search-addon .results .results-container").hide(animationSpeed, function(){
		$("#search-addon .results .results-container").html("");
	});
	$("#search-addon #delete-search").remove();
	$("#search-addon #search input[name=q]").val("");
	
	if($(window).outerWidth() <= 767){
			$("#search-addon .results .mobiles-window").remove();
			$("#search-addon #show-list").remove();
			// The Search box got focussed on a mobile Let's get more Space
			$("#search-addon").animate({"margin": "15px 15px 0 15px"}, 'slow');
			$("#search-addon .results").css("border-radius", "0 0 15px 15px");
			$("#search-addon .results").css("max-height", "91vh");
			$("#search-addon .results").css("background-color", "white");
			// Show Zoombar on mobiles in results view
			$(".ol-zoom, .ol-zoomslider").show();
	}
	this.removeResultMarker();
}

Results.prototype.removeResultMarker = function(){
	var map = this.interactiveMap.map;
	$.each(this.markerOverlays, function(index, value){
		map.removeOverlay(value);
	});
	this.markerOverlays = [];
}

/**
 * Updates the User Interface if there are any Search results saved in this Module
 * It prints all Markers and geometries for the search results and updates the results list
**/
Results.prototype.updateInterface = function(){
	if(this.results.length > 0){
		this.deleteSearch(0);
		$("#search input[name=q]").val(this.query);
		// Disable Reverse Geocoding on click
		this.interactiveMap.reversePositionManager.setActive(false);
		// First add those Results to the Results List
		$("#search-addon .results .results-container").html("");
		$("#search-addon .results .mobiles-window").remove();
		var caller = this;
		$.each(this.results, function(index, value){
			var res = (new NominatimParser(value)).getHTMLResult().html();
			var resHtml = $('\
							<div class="container-fluid suggestion" data-resultNumber="'+index+'">\
	                            <div class="flex-container">\
	                                <div class="item history">\
	                                    <span class="marker" style="filter: hue-rotate(' + value["huerotate"] + 'deg); font-size: 16px;">' + (index+1) + '</span>\
	                                </div>\
	                                <div class="item result">\
	                                    ' + res + '\
	                                </div>\
	                            </div>\
	                        </div>\
							');
			$("#search-addon .results .results-container").append(resHtml);
			if(caller.results.length > 1){
				$(resHtml).click({caller: caller}, function(event){
					event.data.caller.focusResult($(this).attr("data-resultNumber"));
				});
			}
		});
		$("#search-addon .results .results-container .start-route-service").each($.proxy(function(index, value){
			$(value).click($.proxy(function(event){
				this.resultsHistory.addItem(this.results[index]);
			}, this));
		}, this));
		$("#search-addon .results .results-container .start-route-service").click({caller: caller}, function(){
			// We will add this result to the Local History 
			caller.interactiveMap.switchModule("route-finding", {waypoints: [[parseFloat($(this).attr("data-lon")), parseFloat($(this).attr("data-lat"))]]});
		});
		$("#search-addon .results .results-container").show('slow', function(){
			$("#search-addon .results .results-container").attr("data-status", "out");
			if($(window).outerWidth() <= 767){
				// On Mobiles we need a window to look through to the map
				$("#search-addon .results .results-container").before("<div class=\"mobiles-window\"></div>");
				$("#search-addon .results .mobiles-window").click({caller: caller}, function(event){
					event.data.caller.mobilesWindowClick();
				});
				// The Search box got focussed on a mobile Let's get more Space
				$("#search-addon").animate({"margin": 0}, 'slow', $.proxy(function(){
					$("#search-addon .results").css("border-radius", 0);
					$("#search-addon .results").css("max-height", "95vh");
					$("#search-addon .results").css("background-color", "transparent");

					// Hide Zoombar on mobiles in results view
					$(".ol-zoom, .ol-zoomslider").hide();

					var height = $(window).outerHeight() - $(".results").outerHeight() - $("#search").outerHeight();
					height = Math.max(height, 175);
					$(".results .mobiles-window").css("height", height + "px");
					this.updateResultMarker();
					this.updateMapExtent();
				}, caller));
			}else{
				caller.updateResultMarker();
					caller.updateMapExtent();
			}
			// Let's make a new input-group-addon to cancel the search if it takes too long
			var cancelSearch = $('\
			    <div class="input-group-addon" id="delete-search" title="Suche abbrechen">\
			        X\
			    </div> \
			');
			$("#search input[name=q]").after(cancelSearch);
			$(cancelSearch).click({caller: caller}, function(event){
				event.data.caller.deleteSearch();
				event.data.caller.interactiveMap.module.results = undefined;
				event.data.caller.interactiveMap.module.results = undefined;
				event.data.caller.interactiveMap.module.updateURL();
			});
		});
	}
}

Results.prototype.focusResult = function(index){
	var results = this.results;
	if(typeof results[index] !== "undefined"){
		var newResults = results[index];
		this.results = [newResults];
		this.updateInterface();
	}
}

Results.prototype.updateResultMarker = function(){
	var caller = this;
	if(this.markerOverlays.length > 0){
		$.each(this.markerOverlays, function(index, overlay){
			caller.interactiveMap.map.removeOverlay(overlay);
		});
		this.markerOverlays = [];
	}
	
	$.each(this.results, function(index, value){
		var el = $('<span id="index" class="marker" data-resultNumber="'+index+'" style="filter: hue-rotate(' + value["huerotate"] + 'deg)">' + (index+1) + '</span>');
		if(caller.results.length > 1){
			$(el).click({caller: caller}, function(event){
				event.data.caller.focusResult($(this).attr("data-resultNumber"));
			});
		}
		var overlay = new ol.Overlay({
			position: caller.interactiveMap.map.transformToMapCoordinates([parseFloat(value.lon), parseFloat(value.lat)]),
			element: el.get(0),
			offset: [-12, -45],
			stopEvent: false,
		});
		caller.interactiveMap.map.addOverlay(overlay);
		caller.markerOverlays.push(overlay);
	});
}



Results.prototype.mobilesWindowClick = function(){
	// Hide the Results Panel
	$(".results .results-container").hide("fast");
	var caller = this;
	$(".results .mobiles-window").hide("fast", function(){
		// Add the Possibility to come back to the list
		var showList = $('\
			<div id="show-list" class="container">\
				Liste anzeigen\
			</div>');
		$("#search-addon .results").append(showList);
		$(showList).click({caller: caller}, function(event){
			$("#show-list").hide('fast', function(){
				$("#show-list").remove();
			});
			$(".results .results-container").show("fast");
			$(".results .mobiles-window").show("fast", function(){
				event.data.caller.updateMapExtent();
			});
		});
		var padding = [
			$("#search-addon").outerHeight(true) + 25,
			25,
			25,
			25
		];
		caller.updateMapExtent(padding);
	});
}

Results.prototype.updateMapExtent = function(initPadding){
	if(this.results.length <= 0 || !this.moveMap){
		return;
	}
	var caller = this;
	var extent = [null, null, null, null];
	var valid = undefined;
	// 1. We try to only zoom into Matching results
	// 2. If no mathing result was found we zoom into all results
	$.each(this.results, function(index, res){
		// We just focus on those results that have all the terms in the search query in it
		var valid = true;
		var words = caller.query.split(/\W+/);
		$.each(words, function(index, value){
			if(res.display_name.toLowerCase().indexOf(value.toLowerCase()) === -1){
				valid = false;
			}
		});
		if(!valid) return true;
		var lon = parseFloat(res.lon);
		var lat = parseFloat(res.lat);
		if(extent[0] === null || extent[0] > lon){
			extent[0] = lon;
		}
		if(extent[1] === null || extent[1] > lat){
			extent[1] = lat;
		}
		if(extent[2] === null || extent[2] < lon){
			extent[2] = lon;
		}
		if(extent[3] === null || extent[3] < lat){
			extent[3] = lat;
		}
	});
	if(extent[0] == null){
		// There is no Result which matches every search term
		// So we will Zoom into every result
		$.each(this.results, function(index, res){
			var lon = parseFloat(res.lon);
			var lat = parseFloat(res.lat);
			if(extent[0] === null || extent[0] > lon){
				extent[0] = lon;
			}
			if(extent[1] === null || extent[1] > lat){
				extent[1] = lat;
			}
			if(extent[2] === null || extent[2] < lon){
				extent[2] = lon;
			}
			if(extent[3] === null || extent[3] < lat){
				extent[3] = lat;
			}
		});
	}

	extent = caller.interactiveMap.map.transformToMapCoordinates([extent[0], extent[1]]).concat(caller.interactiveMap.map.transformToMapCoordinates([extent[2], extent[3]]));

	// Let's find out in what space of the map we need to fit this in:
	// If Screen is not mobile the search results are 
	var padding = [25,25,25,25];
	if(initPadding !== undefined){
		padding = initPadding;
	}else if($(window).outerWidth() <= 767){
		// Padding Top:
		padding[0] = $("#search").outerHeight(true) + 15;
		// Padding Bottom:
		padding[2] = $(window).outerHeight(true) - $("#search").outerHeight(true) - $(".results .mobiles-window").outerHeight(true);
	}else{
		var paddingRight = 0;
		paddingRight += $("#search-addon").outerWidth(true);
		padding[1] = paddingRight;
	}
	caller.interactiveMap.map.getView().fit(extent, {duration: 600, padding: padding});
	
}
/**
 * Class RouteFinder
 * This is a module that enables the map to create a Route with multiple Waypoints and chose the desired vehicle
 * @param interactiveMap - an instance of the current interactiveMap Object
 * @param waypoints - An Array of waypoints [[lon,lat], ...] to start of with
**/
function RouteFinder(interactiveMap, waypoints, vehicle){
	this.interactiveMap = interactiveMap;
	this.waypoints = [];
	this.resultHistory = new LocalHistory("results");
	this.searchHistory = new LocalHistory("suche");
	this.waypointsLength = waypoints.length;
	this.results = null;
	if(typeof vehicle != "undefined")
		this.vehicle = vehicle; // The next calculated Route will use this vehicle
	else
		this.vehicle = null;
	this.addWaypointsOnGps = null;

	$("#route-finder-addon .inactive").hide();

	// Add the Url Updater
	this.addURLUpdater();

	this.appendNewWaypointForm();

	this.addWaypoints(waypoints);

	// Show the interface
	var caller = this;
	$("#route-finder-addon").show('slow', function(){
		caller.adjustMapView();
		caller.updateMobilesWindow();
	});
	// Add the Click Event Handler on the mobiles-window
	$("#route-finder-addon #waypoint-list-container .mobiles-window").click({caller: this}, function(event){
		event.data.caller.mobilesWindowClick();
	});
	// Add the Click Event Handler on the Map
	this.interactiveMap.map.on("singleclick", this.mapClick, this);

	// Disable The Click Event for the map
	this.interactiveMap.reversePositionManager.setActive(false);

	// Enable Click Event for the Exit Button
	$("#route-finder-addon #vehicle-chooser button.close").click({caller: this}, function(event){
		caller.interactiveMap.switchModule("search");
	});

	// Disable The Zoom Bar. We won't need it now
	$(".ol-zoom, .ol-zoomslider").hide();


}

RouteFinder.prototype.addWaypoints = function(waypoints, recalculate){
	var caller = this;

	if(this.addWaypointsOnGps == null){
		// If we need a GPS Location and the GPS Locator is not yet ready we will add the Results when it's ready
		var shouldAddNow = true;
		$.each(waypoints, $.proxy(function(index, value){
				if(typeof value[0] == "string" && value[0] == "gps" && (this.interactiveMap.GpsManager == null || this.interactiveMap.GpsManager.loadingGps())){
					shouldAddNow = false;
					this.addWaypointsOnGps = waypoints;
					return 0;
				}
		}, this));
		if(!shouldAddNow) return;
	}else{
		this.addWaypointsOnGps = null;
	}
	var gpsAdded = false; // We will only add the gps position one time. We'll ignore any other occurences
	$.each(waypoints, function(index, value){
		if(typeof value[0] == "string" && value[0] == "gps"){
			if(!gpsAdded){
				caller.addWaypoint(undefined, undefined, undefined, caller.interactiveMap.GpsManager, true, false);
				gpsAdded = true;
			}
		}else
			caller.addWaypoint(value[0], value[1], undefined, undefined, false, false);
	});	

	if(this.interactiveMap.GpsManager.gps && this.interactiveMap.GpsManager.accuracy < 500 && this.waypoints.length <= 1 && !gpsAdded){
		this.addWaypoint(undefined, undefined, undefined, this.interactiveMap.GpsManager, true, false);
	}

	if((typeof recalculate == "boolean" && recalculate) || typeof recalculate == "undefined"){
		if(this.vehicle != null){
			this.calculateRoute(this.vehicle);
			this.vehicle = null;
		}else{
			this.calculateRoute();
		}
	}
}

/*
 * this methos is Called by the GPS-Mager once it has access to a GPS Position
*/
RouteFinder.prototype.enableGps = function(){
	if(this.addWaypointsOnGps != null){
		this.addWaypoints(this.addWaypointsOnGps);
	}
}

RouteFinder.prototype.disableGps = function(){
	console.log("disable");
	if(this.addWaypointsOnGps != null){
		console.log(this.addWaypointsOnGps);
		this.addWaypoints(this.addWaypointsOnGps);
	}
}

RouteFinder.prototype.adjustMapView = function(padding){
	if(this.waypoints.length === 1){
		// When there is only one Waypoint defined, we're gonna zoom onto it
		var point = [this.waypoints[0].lon, this.waypoints[0].lat];
		// Animate the View change:
		this.interactiveMap.map.getView().animate({center: this.interactiveMap.map.transformToMapCoordinates(point), zoom: 12, rotation: 0, duration: 750});
	}else if(this.route !== undefined){
		this.route.updateMapExtent(padding);
	}
}

/**
 * This Function either takes a lat/lon Position to add a waypoint
 * Or it takes a finished NominatimParser Object which will leave out the Network Request 
 * that would be needed to convert lat/lon into a concrete Waypoint
 * @return is a boolean whether the waypoint was added successfully or not.
**/
RouteFinder.prototype.addWaypoint = function(lon, lat, nominatimParser, gpsManager, autoPosition, recalculate){
	var waypoint = null;
	var index = -1;
	if(autoPosition === undefined) autoPosition = true;
	// We check where to put our new Waypoint
	//  If there is no Waypoint yet we will just push it to the list
	if((this.waypoints.length === 0 || this.waypoints.length === 1) && autoPosition){
		index = 0;
	}else {
		index = this.waypoints.length;
	}
	if(lat !== undefined && lon !== undefined){
		var caller = this;
		waypoint = new Waypoint(lon, lat, nominatimParser, gpsManager, index, this.interactiveMap.map, function(waypoint){
			caller.addWaypointInterface(waypoint);
		});
	}else if(nominatimParser !== undefined){
		var caller = this;
		waypoint = new Waypoint(undefined, undefined, nominatimParser, gpsManager, index, this.interactiveMap.map, function(waypoint){
			caller.addWaypointInterface(waypoint);
		});
	}else if(gpsManager !== undefined){
		var caller = this;
		waypoint = new Waypoint(undefined, undefined, nominatimParser, gpsManager, index, this.interactiveMap.map, function(waypoint){
			caller.addWaypointInterface(waypoint);
		});
	}else{
		return false;
	}
	if(index === 0){
		this.waypoints.unshift(waypoint);
	}else{
		this.waypoints.push(waypoint);
	}
	// So we now have a correct list of Waypoints but we need to tell them their new Index, too
	$.each(this.waypoints, function(index, waypoint){
		waypoint.changeIndex(index);
	});

	// There was a Waypoint added we need to update the screen
	if($("#route-finder-addon > form").length >= 1){
		var caller = this;
		$("#route-finder-addon > form").hide('slow', function(){
			$(this).remove();
			caller.appendNewWaypointForm();
			caller.updateMobilesWindow();
		});
	}

	// If there are more than two Waypoints defined, we can calculate the route
	if((typeof recalculate != "undefined" && recalculate) || typeof recalculate == "undefined")
		this.calculateRoute();

	// Make the List sortable
	var caller = this;
	$("#waypoint-list").sortable({
		handle: ".drag",
		items: "> li.wp",
		axis: "y",
		start: function(event, ui){
			$("#waypoint-list > .route-description").hide("fast", function(){
				caller.updateMobilesWindow();
				caller.adjustMapView();
			});
			
		},
		stop: function(event, ui){
			$("#waypoint-list > .route-description").show("fast", function(){
				caller.updateMobilesWindow();
				caller.adjustMapView();
			});
		},
		update: function( event, ui ){
			caller.waypointsResorted();
		}
	});
}

RouteFinder.prototype.waypointsResorted = function(){
	// The Waypoints got resorted by dragging which means that the ui has changed and we need to apply that to the waypoints in this object
	var newWaypoints = [];
	var caller = this;
	$("#route-finder-addon #waypoint-list > li.wp").each(function(index, value){
		var currentPos = parseInt($(value).attr("data-index"));
		newWaypoints.push(caller.waypoints[currentPos]);
	});
	this.waypoints = newWaypoints;
	// So we now have a correct list of Waypoints but we need to tell them their new Index, too
	$.each(this.waypoints, function(index, waypoint){
		waypoint.changeIndex(index);
	});
	this.calculateRoute();
}

RouteFinder.prototype.calculateRoute = function(vehicle){
	if(typeof this.route !== "undefined"){
		this.route.exit();
		this.route = undefined;
		$("#waypoint-list .route-description").remove();
		this.updateMobilesWindow();
		this.adjustMapView();
	}
	if(this.waypoints.length >= 2){
		var caller = this;
		this.route = new Route(this.waypoints, vehicle, this.interactiveMap, function(){
			caller.addLegDescriptions();
		});
		// Enable the Navigation
		$("#route-finder-addon .start-navigation").show();
		$("#route-finder-addon .start-navigation").off();
		$("#route-finder-addon .start-navigation").click($.proxy(function(){
			// If the first Position is the gps Position we can simply start
			if(this.route.waypoints.length > 1 && GpsManager.prototype.isPrototypeOf(this.route.waypoints[0].data)){
				this.interactiveMap.switchModule("navigation", this.route);
			}else{
				alert("Für dieses Feature muss der Erste Punkt der Route die eigene Position sein!");
			}
		}, this));
	}else{
		$("#route-finder-addon .start-navigation").hide();
		$("#route-finder-addon .start-navigation").off();
	}
	// After every Route Calculation the URL gets updated
	this.updateURL();
}

RouteFinder.prototype.addLegDescriptions = function(){
	$("#waypoint-list > li.route-description").remove();
	var waypoints = $("#waypoint-list > li");
	var caller = this;
	$.each(waypoints, function(index, value){
		if((caller.route.route.routes[caller.route.route.activeRoute].legs.length - 1) >= index){
			var leg = caller.route.legs[index];
			var legHtml = leg.generateRouteDescriptionHtml();
			var descrHtml = $('<li class="route-description"></li>');
			$(descrHtml).append(legHtml);
			$(value).after(descrHtml);
		}
	});
	this.updateMobilesWindow();
	this.adjustMapView();
}

RouteFinder.prototype.addWaypointInterface = function(waypoint){
	var waypointHtml = waypoint.getHtml();
	if(waypoint.index === 0){
		$("#route-finder-addon #waypoint-list").prepend(waypointHtml);
	}else{
		$("#route-finder-addon #waypoint-list").append(waypointHtml);	
	}

	$(waypointHtml).find(".delete-waypoint").click({caller: this}, function(event){
		event.data.caller.removeWaypoint(parseInt($(this).attr("data-index")));
		event.data.caller.calculateRoute();
	});	
	this.interactiveMap.map.addOverlay(waypoint.marker);
	this.updateMobilesWindow();
}

RouteFinder.prototype.removeWaypoint = function(index){
	var waypoint = this.waypoints[index];
	// Remove The Marker from the map
	this.interactiveMap.map.removeOverlay(waypoint.marker);
	// Remove The Waypoint from the Waypoint List (Interface)
	$("#waypoint-list li[data-index=" + index + "]").remove();
	// Remove the Waypoint from the internal list
	this.waypoints.splice(index, 1);
	$.each(this.waypoints, function(index, value){
		value.changeIndex(index);
	});
	this.updateMobilesWindow();
}

RouteFinder.prototype.removeWaypointMarker = function(index){
	var waypoint = this.waypoints[index];
	this.interactiveMap.map.removeOverlay(waypoint.marker);
}

RouteFinder.prototype.mapClick = function(event){
	this.exitSearch();
	$("#route-finder-addon .show-list").remove();
	var pos = this.interactiveMap.map.transformToWorldCoordinates(event.coordinate);
	$("#route-finder-addon #waypoint-list-container").show("slow");
	$("#route-finder-addon #vehicle-chooser").show("slow");
	var caller = this;
	$("#route-finder-addon > form").show("slow", function(){
		caller.updateMobilesWindow();
		caller.addWaypoint(pos[0], pos[1], undefined, undefined, true);
	});	
}

RouteFinder.prototype.mobilesWindowClick = function(){
	// Hide the Interface
	$("#route-finder-addon #waypoint-list-container").hide("slow");
	$("#route-finder-addon #vehicle-chooser").hide("slow");
	var caller = this;
	$("#route-finder-addon > form").hide("slow", function(){
		// Add the Possibility to come back to the list
		var showList = $('\
			<div class="container show-list">\
				Liste anzeigen\
			</div>');
		$("#route-finder-addon").prepend(showList);
		$(showList).click({caller: caller}, function(event){
			$("#route-finder-addon #waypoint-list-container").show("slow");
			$("#route-finder-addon #vehicle-chooser").show("slow");
			$("#route-finder-addon > form").show("slow", function(){
				event.data.caller.updateMobilesWindow();
				event.data.caller.adjustMapView();
			});
			$("#route-finder-addon .show-list").remove();
		});
	});

	this.adjustMapView([25,25,25,25]);
}

RouteFinder.prototype.updateMobilesWindow = function(){
	if($(window).outerWidth() <= 767){
		// On Mobiles we need a window to look through to the map
		var height = $(window).outerHeight() - $("#route-finder-addon #vehicle-chooser").outerHeight() - $("#route-finder-addon > form").outerHeight() - $("#route-finder-addon #waypoint-list-container #waypoint-list").outerHeight() - $("#route-finder-addon #waypoint-list-container .route-information").outerHeight();
		height = Math.max(height, 175);
		$("#route-finder-addon #waypoint-list-container > .mobiles-window").css("height", height + "px");
	}
}

RouteFinder.prototype.appendNewWaypointForm = function(){
	// If there is only one waypoint yet we will make the user define a start point
	if(this.waypoints.length <= 1){
		$("#route-finder-addon .results").before(this.generateNewWaypointForm("Startpunkt angeben:"));
	}else{
		$("#route-finder-addon .results").before(this.generateNewWaypointForm("Wegpunkt hinzufügen:"));
	}
}

RouteFinder.prototype.generateNewWaypointForm = function(text){
	if(text === undefined){
		text = "Neuen Wegpunkt angeben:";
	}
	var startPointHtml = $('\
			<form>\
			<div class="form-group new-waypoint-form">\
                <div class="input-group">\
					<input type="text" class="form-control" id="start-point" autocomplete="off" required placeholder="' + text + '">\
					<span class="input-group-addon"><button type="submit"><span class="glyphicon glyphicon-search"></span></button></span>\
					<span class="input-group-addon"><button type="button"\
						data-html="true"\
                        data-trigger="hover"\
                        data-toggle="popover"\
                        data-placement="bottom"\
                        data-container="body"\
                        title="Wegpunkt definieren" \
                        data-content="Sie können neue Wegpunkte auf 2 Arten definieren:<ol><li>Klicken Sie einfach auf der Karte auf den Punkt, den Sie einfügen möchten.</li><li>Sie können nach Orten Suchen indem Sie ihre Suchworte in das Eingabefeld eintragen und entweder Enter drücken, oder auf das kleine Lupensymbol klicken. Wählen Sie dann einfach das passende Ergebnis durch Klick aus.</li></ol>"\
					><span class="glyphicon glyphicon-question-sign"</button>\
				</div>\
				<div class="history-container">\
                    <div class="results"></div>\
                    <div class="searches"></div>\
                </div>\
			</div>\
			</form>\
			');
		// Enable the search power on the form element
		$($(startPointHtml)[0]).submit({caller: this}, function(event){
			var query = $(this).find("input[type=text]").val();
			event.data.caller.executeSearch(query);
			return false;
		});
		// Enable the History on the Input Element
		$(startPointHtml).find("input[type=text]").off("focusin");
		$(startPointHtml).find("input[type=text]").focusin($.proxy(this.historyEnabled, this));
		$(startPointHtml).find("input[type=text]").focusout(function(event){
			$("#route-finder-addon > form .history-container .results").html("");
			$("#route-finder-addon > form .history-container .searches").html("");

		});
		// Enable the Popover
		$(startPointHtml).find("button[data-toggle=popover]").popover();
		// Make it execute Searches:
		$(startPointHtml).find("input[type=text]").focusin({caller: this}, function(event){
			event.data.caller.enterSearch();
		});
	return startPointHtml;
		
}

RouteFinder.prototype.historyEnabled = function(){
	// Clear the current History
	$("#route-finder-addon > form .history-container .results").html("");
	$("#route-finder-addon > form .history-container .searches").html("");
	// Load the History into the container
	$.each(this.resultHistory.results, $.proxy(function(index, value){
		var html = (new NominatimParser(value)).getRouteFinderHtml().html();
		var resHtml = $('\
							<div class="container-fluid suggestion item" data-resultNumber="'+index+'">\
	                            <div class="flex-container">\
	                                <div class="item history">\
	                                    <span class="marker" style="font-size: 16px;">' + (index+1) + '</span>\
	                                </div>\
	                                <div class="item result">\
	                                    ' + html + '\
	                                </div>\
	                            </div>\
	                        </div>\
							');
		$(resHtml).hide();
		$(resHtml).mousedown($.proxy(function(event){
				// When the suggestion is Clicked we simply add it to the waypoints
				// But we also update the date of the result
				this.resultHistory.addItem(value);
				this.exitSearch(new NominatimParser(value));
		}, this));
		$("#route-finder-addon > form .history-container .results").append(resHtml);
	}, this));
	// Load the recent searches into the container
	$.each(this.searchHistory.results, $.proxy(function(index, value){
		var item = $('\
			<div class="item inactive">\
				<div class="icon"><span class="glyphicon glyphicon-time"></span></div>\
				<div class="search-query">' + value.query + '</div>\
			</div>');
		$(item).hide();
		$(item).mousedown($.proxy(function(event){
			var val = $(item).find(".search-query").html();
			$("#route-finder-addon > form input[type=text]").val(val);
			this.executeSearch(val);
		}, this));
		$("#route-finder-addon > form .history-container .searches").append(item);
	}, this));
	// Add the Listener for the SearchBox
	$("#route-finder-addon > form input[type=text]").keyup(function(){
		var value = $(this).val().toLowerCase();
		// Each past search:
		$("#route-finder-addon > form .history-container .results > .item").each(function(index, item){
			var query = $(item).text().toLowerCase();
			if(value.length > 0 && query.indexOf(value) > -1){
				$(this).show();
			}else{
				$(this).hide();
			}
		});
		$("#route-finder-addon > form .history-container .searches > .item").each(function(index, item){
			var query = $(item).find(".search-query").html().toLowerCase();
			if(value.length > 0 && query.indexOf(value) > -1){
				$(this).show();
			}else{
				$(this).hide();
			}	
		});
	});
}

RouteFinder.prototype.executeSearch = function(query){ 
	// Generate the Url for the Search Results
	$("#route-finder-addon .results .wait-for-search").show('fast');
	var map = this.interactiveMap.map;
	var tmpExtent = map.getView().calculateExtent(map.getSize());
	var extent = map.transformToWorldCoordinates([tmpExtent[0], tmpExtent[1]]).concat(map.transformToWorldCoordinates([tmpExtent[2], tmpExtent[3]]));
	var url = '/' + encodeURI(query) + '/' + encodeURI(String(extent[0])) + '/' + encodeURI(String(extent[1])) + '/' + encodeURI(String(extent[2])) + '/' + encodeURI(String(extent[3]));
	// Query the Search:
	var results = null;
	var caller = this;
	var timeout = 10; // 10 seconds Timeout for this request
	this.searching = $.ajax({
		url: url,
		dataType: 'json',
		success: $.proxy(function(data){
			this.searching = undefined;
			if(this.results !== null && this.results !== undefined) this.results.deleteSearch();
			this.results = new RouteFinderSearchResults(this.interactiveMap, data, query);
			if(data.length > 0){
				caller.searchHistory.addItem({query: query});
			}
			$("#route-finder-addon .results .wait-for-search").hide('fast');
		}, this),
		timeout: (timeout*1000),
		error: $.proxy(function(jqxr){
			// We encountered an error while trying to fetch the search results.
			// It can be an abortion error in case the user clicked abort, or a timeout/connection error
			// Only in the latter case we'll retry the search
			if(jqxr.statusText != "abort"){
				$("#route-finder-addon .results .wait-for-search > p").hide("slow"); // Hide the currently displayed information
				$("#route-finder-addon .results .wait-for-search .no-internet").show("slow");
				this.retrySearch = window.setTimeout($.proxy(function(){
					this.retrySearch = undefined;
					this.executeSearch(query);
				}, this), 1000);
			}
		}, this)
	}).always($.proxy(function(){
		this.searching = undefined;
	}, this));
}

RouteFinder.prototype.enterSearch = function(){
	$("#route-finder-addon #vehicle-chooser").hide("slow");
	$("#route-finder-addon #waypoint-list-container #waypoint-list").hide("slow");
	$("#route-finder-addon #waypoint-list-container .mobiles-window").hide('slow');
	$("#route-finder-addon #waypoint-list-container .route-information").hide("slow");
	var caller = this;

	var cancelSearch = $('\
		<span class="input-group-addon" id="cancel-search" title="Suche abbrechen">X</span>\
	');
	$("#route-finder-addon #cancel-search").remove();
	$("#route-finder-addon input[type=text]").before(cancelSearch);
	$(cancelSearch).click({caller: caller}, function(event){
		event.data.caller.exitSearch();
	});

}

RouteFinder.prototype.exitSearch = function(nominatimParser){
	$("#route-finder-addon .results .wait-for-search").hide('fast');
	$("#route-finder-addon .results .wait-for-search > p").show("slow"); // Hide the currently displayed information
	$("#route-finder-addon .results .wait-for-search .no-internet").hide("slow");
	if(this.retrySearch != undefined){
		window.clearTimeout(this.retrySearch);	// We retry fetching search results with a window.setTimeout() which needs to get cleared when we abort
	}
	if(this.searching != undefined){
		this.searching.abort();
	}
	$("#route-finder-addon #vehicle-chooser").show("slow");
	$("#route-finder-addon #waypoint-list-container .route-information").show("slow");
	$("#route-finder-addon #waypoint-list-container #waypoint-list").show("slow", function(){
		$("#route-finder-addon #cancel-search").remove();
	});
	var caller = this;
	$("#route-finder-addon #waypoint-list-container .mobiles-window").show('slow', function(){
		caller.adjustMapView();
	});
	$("#route-finder-addon .wait-for-search").hide('fast');
	if(this.results !== null){
		this.results.deleteSearch();
		this.results = null;
	}
	$("#route-finder-addon input[type=text]").val("");

	// If this method has a valid Nominatim Parser Object as argument
	// then the Search was successfull and we can remove the Search Box
	if(nominatimParser !== undefined){
		this.addWaypoint(undefined, undefined, nominatimParser);
		this.resultHistory.addItem(nominatimParser.nominatimResult);
	}

	
}

RouteFinder.prototype.addURLUpdater = function(){
	// The URL gets updated everytime a new waypoint is added
	// We just need to register the popstate event
	$(window).on("popstate", $.proxy(this.popUrl, this));
}

RouteFinder.prototype.popUrl = function(event){
	var state = event.originalEvent.state;
	if(state != null){
		// We need to check if the poped event is part of the RouteFinder or part of the SearchModule
		if(typeof state.waypoints != "undefined"){
			// Part of Route Finder
			var waypoints = state.waypoints;
			// Remove the old Waypoints
			while(this.waypoints.length > 0){
				this.removeWaypoint(0);
			}
			// Remove the old Route
			if(this.route !== null && this.route !== undefined){
				this.route.deleteRoute();
				$("#waypoint-list .route-description").remove();
			}
			this.vehicle = state.vehicle;
			this.addWaypoints(waypoints, true);
		}else if(typeof state.pos != "undefined"){
			// Part of Search Addon
			// The Url of the Search can be distinguished between just a map Position and a map position plus search query
			if(typeof state.query != "undefined" && typeof state.pos != "undefined" && typeof state.zoom != "undefined"){
				// The Map will get a new Position and zoom
				// After that we will exit the route finder and execute the search
				this.interactiveMap.map.getView().animate({
					center: this.interactiveMap.map.transformToMapCoordinates(state.pos),
					zoom: state.zoom,
					duration: 250
				}, $.proxy(function(){
					this.interactiveMap.switchModule("search", state.query);
				}, this));
			}else if(typeof state.pos != "undefined" && typeof state.zoom != "undefined"){
				// The Map will get a new Position and then switch to the Search Module without search query
				this.interactiveMap.map.getView().animate({
					center: this.interactiveMap.map.transformToMapCoordinates(state.pos),
					zoom: state.zoom,
					duration: 250
				}, $.proxy(function(){
					this.interactiveMap.switchModule("search");
				}, this));
			}
		}
	}
}

RouteFinder.prototype.updateURL = function(){
	var waypoints = this.waypoints;
	var route = this.route;
	if(typeof route != "undefined"){
		var url = window.location.origin + "/route/start/" + route.vehicle + "/";
		// Sadly we can not store the calculated Route in the history of the browser
		// because the objects are too large to be serialized into it.
		// So we just have the Option to save the Waypoints and recalculate the route when the user presses back.
		var waypointData = [];
		$.each(waypoints, function(index, value){
			if(typeof value.type != "undefined" && value.type == "gps"){
				url += "gps;";
				waypointData.push(["gps"]);
			}else{
				url += value.lon + "," + value.lat + ";";
				waypointData.push([value.lon, value.lat]);
			}
		});
		url = url.substring(0, url.lastIndexOf(";"));
		data = {
			waypoints: waypointData,
			vehicle: route.vehicle
		};
		var currentState = window.history.state;
		// We will only add this state if it's not already the last state
		if( currentState == null || typeof currentState.waypoints == "undefined" || currentState.waypoints.length != waypointData.length || currentState.vehicle != data.vehicle){
			window.history.pushState(data, "", url);
		}else{
			var shouldPush = false;
			// The current states waypoints have the same length as the ones we try to push
			// Let's check if they are exactly the same before pushing
			$.each(waypointData, function(index,value){
				var other = currentState.waypoints[index];
				if((value[0] == "gps" && other[0] != "gps") || value[0] != other[0] || value[1] != other[1]){
					shouldPush = true;
					return 0;
				}
			});
			if(shouldPush){
				window.history.pushState(data, "", url);
			}
		}
	}
}

RouteFinder.prototype.removeURLUpdater = function(){
	$(window).off("popstate", $.proxy(this.popUrl, this));
}

RouteFinder.prototype.exit = function(){
	this.removeURLUpdater();
	$("#route-finder-addon").hide('slow');
	$("#route-finder-addon > form").remove();

	$.each(this.waypoints, $.proxy(function(index, value){
		this.removeWaypointMarker(index);
	}, this));
	// Remove the Waypoints from the Interface
	$("#route-finder-addon #waypoint-list").html("");

	// Remove Route Information
	$("#route-finder-addon #waypoint-list-container .route-information .length").html("");
	$("#route-finder-addon #waypoint-list-container .route-information .duration").html("");

	if(this.route !== null && this.route !== undefined){
		this.route.exit();
	}

	$("#route-finder-addon #waypoint-list-container .mobiles-window").off();
	$("#route-finder-addon #vehicle-chooser button.close").off();
	this.interactiveMap.map.un("singleclick", this.mapClick, this);
	this.interactiveMap.reversePositionManager.setActive(true);
	$(".ol-zoom, .ol-zoomslider").show();
}


/**
 * This Class takes a GeoPosition and a callback in it's constructor
 * It will then evaluate the Position into an Object with a name etc which will require an Ajax call
 * If a callback is given this Class will call it when the Position is evaluated with an Instance of this object as first argument 
**/
function Waypoint(lon, lat, nominatimParser, gpsManager, index, map, callback){
	this.evaluated = false;
	this.callback = callback;
	this.resultHtml = null;
	this.index = index;
	this.charCode = String.fromCharCode(97 + index).toUpperCase();
	if(lon !== undefined && lat !== undefined){
		this.lon = parseFloat(lon);
		this.lat = parseFloat(lat);
	}else if(nominatimParser !== undefined){
		this.lon = parseFloat(nominatimParser.nominatimResult.lon);
		this.lat = parseFloat(nominatimParser.nominatimResult.lat);
		this.data = nominatimParser;
		this.evaluated = true;
	}else if(gpsManager !== undefined){
		this.lon = parseFloat(gpsManager.location[0]);
		this.lat = parseFloat(gpsManager.location[1]);
		this.data = gpsManager;
		this.type = "gps";
		this.evaluated = true;
	}else{
		return;
	}
	this.marker = new ol.Overlay({
			position: map.transformToMapCoordinates([this.lon, this.lat]),
			element: $('<span class="marker" data-resultNumber="'+index+'">' + this.charCode + '</span>').get(0),
			offset: [-12, -45],
			stopEvent: false,
	});
	if(this.callback === undefined){
		this.callback = null;
	}

	if(nominatimParser !== undefined || gpsManager !== undefined){
		if(typeof callback === "function"){
			callback(this);
		} 
	}else{
		this.positionToAdress();
	}
}

Waypoint.prototype.changeIndex = function(newIndex){
	this.index = newIndex;
	this.charCode = String.fromCharCode(97 + newIndex).toUpperCase();
	$(this.resultHtml).find(".marker").html(this.charCode);
	$(this.resultHtml).attr("data-index", newIndex);
	$(this.resultHtml).find(".delete-waypoint").attr("data-index", newIndex);
	this.marker.setElement($('<span class="marker" data-resultNumber="'+this.index+'">' + this.charCode + '</span>').get(0));
}

Waypoint.prototype.positionToAdress = function() {
	var pos = [this.lon, this.lat];
    if (pos === 'gps') {
        //obj.html('Eigener Standort');
        //obj.attr('title', 'Eigener Standort');
    } else {
    	var url = "/reverse/" + pos[0] + "/" + pos[1];
        // Start the ajax call
		var timeout = 10; // 10 seconds Timeout for this request
		this.searching = $.ajax({
			url: url,
			dataType: 'json',
			success: $.proxy(function(data){
				this.data = new NominatimParser(data);
	        	this.evaluated = true;

	        	if(typeof this.callback === "function"){
	        		this.callback(this);
	        	}
			}, this),
			timeout: (timeout*1000),
			error: $.proxy(function(jqxr){
				// We encountered an error while trying to fetch the search results.
				// It can be an abortion error in case the user clicked abort, or a timeout/connection error
				// Only in the latter case we'll retry the search
				if(jqxr.statusText != "abort"){
					$("#route-finder-addon #waypoint-list-container .wait-for-search .no-internet").show("slow");
					this.retrySearch = window.setTimeout($.proxy(function(){
						this.retrySearch = undefined;
						this.positionToAdress();
					}, this), 1000);
				}
			}, this)
		}).always($.proxy(function(){
			this.searching = undefined;
		}, this));
    }
}

Waypoint.prototype.getHtml = function() {
	if(this.evaluated){
		if(this.resultHtml === null){
			var description = typeof this.data.getHTMLAddressDetails === "function" ? this.data.getHTMLAddressDetails() : "Eigene Position";
			this.resultHtml = $('\
			<li class="wp" data-index="' + this.index + '">\
				<div class="waypoint">\
					<div class="drag">\
						<img src="/img/anfasser.png" width="30px" alt="drag here" />\
					</div>\
					<div class="marker">\
						' + this.charCode + '\
					</div>\
					<div class="description">\
						' + description + '\
					</div>\
					<div class="delete-waypoint" data-index="' + this.index + '">\
						<span class="glyphicon glyphicon-trash"></span>\
					</div>\
				</div>\
			</li>\
			');
		}
		
		return this.resultHtml;
	}else{
		return "Not Ready Yet";
	}
}
function RouteFinderSearchResults(map, data, query){
	this.interactiveMap = map;
	this.results = data;
	this.query = query;
	this.markerOverlays = [];
	this.updateInterface();
}

RouteFinderSearchResults.prototype.updateInterface = function(){
	if(this.results.length > 0){

		this.deleteSearch();
		var caller = this;
		$.each(this.results, function(index, value){
			var res = (new NominatimParser(value)).getRouteFinderHtml().html();
			var resHtml = $('\
							<div class="container-fluid suggestion" data-resultNumber="'+index+'">\
	                            <div class="flex-container">\
	                                <div class="item history">\
	                                    <span class="marker" style="filter: hue-rotate(' + value["huerotate"] + 'deg); font-size: 16px;">' + (index+1) + '</span>\
	                                </div>\
	                                <div class="item result">\
	                                    ' + res + '\
	                                </div>\
	                            </div>\
	                        </div>\
							');
			$("#route-finder-addon .results .results-container").append(resHtml);
			$(resHtml).click({caller: caller}, function(event){
				event.data.caller.interactiveMap.module.exitSearch(new NominatimParser(value));
			});
		});
		var caller = this;
		$("#route-finder-addon .results .results-container").show('slow', function(){
			if($(window).outerWidth() <= 767){
				// On Mobiles we need a window to look through to the map
				$("#route-finder-addon .results .results-container").before("<div class=\"mobiles-window\"></div>");
				$("#route-finder-addon .results .mobiles-window").click({caller: caller}, function(event){
					event.data.caller.mobilesWindowClick();
				});

				var height = $(window).outerHeight() - $("#route-finder-addon .results .results-container").outerHeight() - $("#route-finder-addon > form").outerHeight();
				height = Math.max(height, 175);
				$("#route-finder-addon .results .mobiles-window").css("height", height + "px");
			}
			caller.updateResultMarker();
			caller.updateMapExtent();
		});
	}
}

RouteFinderSearchResults.prototype.mobilesWindowClick = function(){
	// Optimize the Interface for Full Screen View
	$("#route-finder-addon .results .mobiles-window").hide("slow");
	var caller = this;
	$("#route-finder-addon .results .results-container").hide("slow", function(){
		// Add the Possibility to come back to the list
		var showList = $('\
			<div id="show-list" class="container">\
				Liste anzeigen\
			</div>');
		$("#route-finder-addon .results").append(showList);
		$(showList).click({caller: caller}, function(event){
			$("#show-list").hide('fast', function(){
				$("#show-list").remove();
			});
			$("#route-finder-addon .results .results-container").show("slow");
			$("#route-finder-addon .results .mobiles-window").show("slow", function(){
				event.data.caller.updateMapExtent();
			});
		});

		var paddingTop = $("#route-finder-addon form").outerHeight() + $("#route-finder-addon #show-list").outerHeight() + 50;
		caller.updateMapExtent([paddingTop, 50, 50, 50]);
	});

}

RouteFinderSearchResults.prototype.deleteSearch = function(){
	$("#route-finder-addon .results .results-container").html("");
	$("#route-finder-addon .results .mobiles-window").remove();
	$("#show-list").remove();
	var caller = this;
	$.each(this.markerOverlays, function(index, value){
		caller.interactiveMap.map.removeOverlay(value);
	});
	this.markerOverlays = [];

}

RouteFinderSearchResults.prototype.updateResultMarker = function(){
	var caller = this;
	if(this.markerOverlays.length > 0){
		$.each(this.markerOverlays, function(index, overlay){
			caller.interactiveMap.map.removeOverlay(overlay);
		});
		this.markerOverlays = [];
	}

	// Rem
	
	$.each(this.results, function(index, value){
		var el = $('<span id="index" class="marker" data-resultNumber="'+index+'" style="filter: hue-rotate(' + value["huerotate"] + 'deg)">' + (index+1) + '</span>');
		$(el).click({caller: caller}, function(event){
			event.data.caller.interactiveMap.module.exitSearch(new NominatimParser(value));
		});
		var overlay = new ol.Overlay({
			position: caller.interactiveMap.map.transformToMapCoordinates([parseFloat(value.lon), parseFloat(value.lat)]),
			element: el.get(0),
			offset: [-12, -45],
			stopEvent: false,
		});
		caller.interactiveMap.map.addOverlay(overlay);
		caller.markerOverlays.push(overlay);
	});
}

RouteFinderSearchResults.prototype.updateMapExtent = function(initPadding){
	if(this.results.length <= 0){
		return;
	}
	var caller = this;
	var extent = [null, null, null, null];
	$.each(this.results, function(index, res){
		// We just focus on those results that have all the terms in the search query in it
		var valid = true;
		var words = caller.query.split(/\W+/);
		$.each(words, function(index, value){
			if(res.display_name.toLowerCase().indexOf(value.toLowerCase()) === -1){
				valid = false;
			}
		});
		if(!valid) return true;
		var lon = parseFloat(res.lon);
		var lat = parseFloat(res.lat);
		if(extent[0] === null || extent[0] > lon){
			extent[0] = lon;
		}
		if(extent[1] === null || extent[1] > lat){
			extent[1] = lat;
		}
		if(extent[2] === null || extent[2] < lon){
			extent[2] = lon;
		}
		if(extent[3] === null || extent[3] < lat){
			extent[3] = lat;
		}
	});

	extent = caller.interactiveMap.map.transformToMapCoordinates([extent[0], extent[1]]).concat(caller.interactiveMap.map.transformToMapCoordinates([extent[2], extent[3]]));

	// Let's find out in what space of the map we need to fit this in:
	// If Screen is not mobile the search results are 
	var padding = [66,25,25,25];
	if(initPadding !== undefined){
		padding = initPadding;
	}else if($(window).outerWidth() <= 767){
		// Padding Top:
		padding[0] += $("#route-finder-addon > form").outerHeight(true);
		// Padding Bottom:
		padding[2] += $(window).outerHeight(true) - $("#route-finder-addon > form").outerHeight(true) - $("#route-finder-addon .results .mobiles-window").outerHeight(true);
	}else{
		var paddingRight = 0;
		paddingRight += $("#route-finder-addon").outerWidth(true);
		padding[1] += paddingRight;
	}
	caller.interactiveMap.map.getView().fit(extent, {duration: 600, padding: padding});
	
}
function Route(waypoints, vehicle, interactiveMap, callback, route){

	this.waypoints = waypoints;
	this.callback = callback;
	this.interactiveMap = interactiveMap;
	this.informationOverlays = [];
	if(vehicle === undefined){
		this.vehicle = this.estimateVehicle();
	}else{
		this.vehicle = vehicle;
	}
	this.legs = [];	// Value is set in calculateRoute()
	this.route = this.calculateRoute();	
	this.addVehicleChangedEvent();
}

Route.prototype.switchActiveRoute = function(index){
	this.route.activeRoute = index;
	this.legs = this.extractLegs();
}

Route.prototype.extractLegs = function(){
	var result = [];
	var caller = this;
	$.each(this.route.routes[this.route.activeRoute].legs, function(index, value){
		result.push(new Leg(value, caller));
	});
	return result;
}

Route.prototype.addVehicleChangedEvent = function(){
	$("#route-finder-addon #vehicle-chooser input").change({caller: this}, function(event){
		event.data.caller.vehicle = $(this).attr("value");
		event.data.caller.deleteRoute();
		event.data.caller.interactiveMap.module.calculateRoute(event.data.caller.vehicle);
	});
}

Route.prototype.estimateVehicle = function(){
	// This Function estimates the required vehicle for the route
	// All Distances < 2km will be by foot
	// All Distances < 10km by bike
	// All Distances >= 10km by car
	// Let's calculate the distance between Waypoints
	var distance = this.estimateRouteDistance();
	if(distance < 2000) return "foot";
	else if(distance < 10000) return "bicycle";
	else return "car";
}

Route.prototype.estimateRouteDistance = function(){
	// We will calculate the distance between every two waypoints
	var wgs84Sphere = new ol.Sphere(6378137);
	var caller= this;
	var distance = 0;
	$.each(this.waypoints, function(index, value){
		if(caller.waypoints[index+1] === undefined) return 0;
		var c1 = [value.lon, value.lat];
		var c2 = [caller.waypoints[index+1].lon, caller.waypoints[index+1].lat];
		distance += wgs84Sphere.haversineDistance(c1,c2);
	});
	return distance;
}

Route.prototype.calculateRoute = function(){
	if(this.waypoints.length >= 2){
		var p = true;
		if(typeof print == "bolean")
			p = print;
		var url = "";
		$.each(this.waypoints, function(index, value){
			url += value.lon + "," + value.lat + ";";
		});
		url = url.replace(/;+$/, '');
		url = "/route/find/" + this.vehicle + "/" + url;

		/*
		* We start calculating the route. Since an internet connection is mandatory for that task
		* We will show the user the information that we currently calculate the route.
		* If the network takes too long or throws an error we show that to the user and retry
		*/
		// Show the loading text
		$("#route-finder-addon #waypoint-list-container .wait-for-search").show("fast");
		// We need to disable the new Waypoint form because the user should not be able to add waypoints while route calculation is active
		$("#route-finder-addon .new-waypoint-form input[type=text], #route-finder-addon .new-waypoint-form button[type=submit]").attr("disabled", true);

		// Start the ajax call
		var timeout = 10; // 10 seconds Timeout for this request
		this.searching = $.ajax({
			url: url,
			dataType: 'json',
			success: $.proxy(function(data){
				this.route = data;
				this.route.activeRoute = 0;
				this.printRoute();
				this.updateVehicle();
				this.updateRouteInformation();
				this.updateMapExtent();
				// Save the legs
				this.legs = this.extractLegs();
				if(typeof this.callback === "function"){
					this.callback();
				}
				this.retrySearch = undefined;
				$("#route-finder-addon #waypoint-list-container .wait-for-search").hide("fast");
				$("#route-finder-addon #waypoint-list-container .wait-for-search .no-internet").hide("slow");
				$("#route-finder-addon .new-waypoint-form input[type=text], #route-finder-addon .new-waypoint-form button[type=submit]").attr("disabled", false);
			}, this),
			timeout: (timeout*1000),
			error: $.proxy(function(jqxr){
				// We encountered an error while trying to fetch the search results.
				// It can be an abortion error in case the user clicked abort, or a timeout/connection error
				// Only in the latter case we'll retry the search
				if(jqxr.statusText != "abort"){
					$("#route-finder-addon #waypoint-list-container .wait-for-search .no-internet").show("slow");
					this.retrySearch = window.setTimeout($.proxy(function(){
						this.retrySearch = undefined;
						this.calculateRoute();
					}, this), 1000);
				}
			}, this)
		}).always($.proxy(function(){
			this.searching = undefined;
		}, this));
	}
}

Route.prototype.updateMapExtent = function(initPadding){
	if(this.geom !== undefined){
		var padding = [66,25,25,25];
		if(initPadding !== undefined){
			padding = initPadding;
		}else if($(window).outerWidth() <= 767){
			// Padding Top:
			padding[0] += $("#route-finder-addon > form").outerHeight(true);
			padding[0] += $("#route-finder-addon > #vehicle-chooser").outerHeight(true);
			// Padding Bottom:
			padding[2] += $(window).outerHeight(true) - $("#route-finder-addon > form").outerHeight(true) - $("#route-finder-addon > #vehicle-chooser").outerHeight(true) - $("#route-finder-addon #waypoint-list-container .mobiles-window").outerHeight(true);
		}else{
			var paddingRight = 0;
			paddingRight += $("#route-finder-addon").outerWidth(true);
			padding[1] += paddingRight;
		}
		this.interactiveMap.map.getView().fit(this.geom, {
			duration: 750,
			padding: padding
		});
	}
}

Route.prototype.updateRouteInformation = function(){
	var length = this.route.routes[this.route.activeRoute].distance;
	var distanceString = this.distanceString(length);
	$("#route-finder-addon #waypoint-list-container .route-information .length").html(distanceString);

	var duration = this.route.routes[this.route.activeRoute].duration;
	var durationString = this.durationString(duration);
	$("#route-finder-addon #waypoint-list-container .route-information .duration").html(durationString);

	this.interactiveMap.module.updateMobilesWindow();
}

Route.prototype.distanceString = function(length){
	var result = "";
	length = Math.floor(length);

	if(length > 10000){
		// We will only display full km
		result = Math.round(length/1000) + " km";
	}else if(length > 2000){
		// We will display every 100m
		result = (Math.round(length/100) / 10) + "km";
	}else if(length > 1000){
		// We will display every 50m
		length /= 10;
		length = Math.ceil(length/5) * 5;
		length /= 100;
		result = length + " km";
	}else if(length > 500){
		// We will display every 50m but in m instead of km
		length /= 10;
		length = Math.ceil(length/5) * 5;
		length *= 10;
		result = length + " m";
	}else{
		// We will display every 10m but in m instead of km
		length = Math.ceil(length / 10) * 10;
		result = length + " m";
	}

	return result;
}

Route.prototype.durationString = function(duration){
	duration = Math.abs(duration);
	duration = Math.floor(duration);
	var result = "";
	if(duration >= 3600){
		var hours = Math.floor(duration / 3600);
		var minutes = Math.round((duration % 3600) / 60);

		result += hours + " Std " + minutes + " Min";
	}else{
		var minutes = Math.round((duration % 3600) / 60);

		result += minutes + " Min";
	}
	return result;
}

Route.prototype.updateVehicle = function(){
	// Uncheck the current vehicle
	$("#vehicle-chooser input[checked]").prop("checked", false);
	// Check the new one
	$("#vehicle-chooser input[value=" + this.vehicle + "]").prop("checked", true);
}

Route.prototype.printRoute = function(){
	this.deleteRoute();

    var vectorS = new ol.source.Vector();
    
    // Geometry of the active route
    var  geojson = this.route.routes[this.route.activeRoute].geometry;
	this.geom = (new ol.format.GeoJSON()).readGeometry(geojson, {
              	'dataProjection': 'EPSG:4326',
                'featureProjection': 'EPSG:3857'
            });


    // Let's print alternative routes, first
    if(this.route.routes.length > 1){
    	var alternativerouteLineStyle = new ol.style.Style({
	        stroke: new ol.style.Stroke({
	            color: 'rgb(121,121,121)',
	            width: 5
	        }),
	        fill: new ol.style.Fill({
	            color: 'rgba(121,121,121,.03)'
	        })
	    });
	    var alternativerouteLineHoverStyle = new ol.style.Style({
	        stroke: new ol.style.Stroke({
	            color: 'rgb(255,0,0)',
	            width: 5
	        }),
	        fill: new ol.style.Fill({
	            color: 'rgba(255,0,0,.03)'
	        })
	    });
    	for(var i = 0; i < this.route.routes.length; i++){
    		if(i === this.route.activeRoute) continue;
    		var  altgeojson = this.route.routes[i].geometry;
    		var geom = (new ol.format.GeoJSON()).readGeometry(altgeojson, {
              	'dataProjection': 'EPSG:4326',
                'featureProjection': 'EPSG:3857'
            });
		    var feature = new ol.Feature({
		        'geometry': geom
		    });
		    feature.setStyle(alternativerouteLineStyle);
		    vectorS.addFeature(feature);

		    // For each alternative Route we will create a popup saying how much longer that route 
		    // would need to drive
		    // The most complicated part about that is to calculate the correct position for this information
		    var pos = this.calculateAlternativeRoutePopupPosition(this.route.routes[i]);
		    var time = this.route.routes[i].duration - this.route.routes[this.route.activeRoute].duration;
		    var timeString = this.durationString(time);
		    var informationOverlay = new ol.Overlay({
		    	element: $('\
		    		<div id="popup" class="ol-popup alternative-route" title="Klicken zum Auswählen der Alternativroute.">\
		    			<div id="popup-content">\
		    				<font color="' + (time > 0 ? "red" : "green") + '">' + (time > 0 ? "+" : "-") + timeString + '</font> <br /> <nobr>' + this.route.routes[i].legs[0].summary + '</nobr>\
		    			</div>\
		    		</div>').get(0),
		    	autopan: false,
		    	position: pos
		    });
		    $(informationOverlay.getElement()).mouseover({feature: feature}, function(event){
		    	event.data.feature.setStyle(alternativerouteLineHoverStyle);
		    });
		    $(informationOverlay.getElement()).mouseout({feature: feature}, function(event){
		    	event.data.feature.setStyle(alternativerouteLineStyle);
		    });
		    $(informationOverlay.getElement()).click({caller: this, index: i}, function(event){
		    	event.data.caller.switchActiveRoute(event.data.index);
		    	event.data.caller.printRoute();	
		    	event.data.caller.updateRouteInformation();	  
		    	event.data.caller.interactiveMap.module.addLegDescriptions(); 
		    });
		    this.interactiveMap.map.addOverlay(informationOverlay);
		    this.informationOverlays.push(informationOverlay);
    	}
    }

    // This is gonna be the main route
	var routeLineStyle = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'rgb(255,128,0)',
            width: 5
        }),
        fill: new ol.style.Fill({
            color: 'rgba(255,128,0,.03)'
        })
    });

	
    var feature = new ol.Feature({
        'geometry': this.geom
    });
    feature.setStyle(routeLineStyle);
    vectorS.addFeature(feature);

    this.vectorLayerRoutePreview = new ol.layer.Vector({
        source: vectorS
    });
    
    this.interactiveMap.map.addLayer(this.vectorLayerRoutePreview);
}

/**
 * This Function takes an alternative Route as an argument.
 * It will then compare that route to the currently active route
 * and determine all parts of the route of the alternative route that are
 * different to the currently active one.
 * From all calculated parts It'll take the longest one and calculate the Point
 * that is exactly in the center of that route part.
 * This will be the Position where we will display the Information for this alternative Route
**/
Route.prototype.calculateAlternativeRoutePopupPosition = function(alternativeRoute){
	var parts = [];
	var tmpLineString = undefined;

	// We will use copies of the array because we will delete a whole ton of waypoints from it.
	// Because that will significantly speed up our process
	var ar1 = alternativeRoute.geometry.coordinates.slice();
	var caller = this;
	var pos = [];
	$.each(ar1, function(index, value){
		if(value[0] !== caller.route.routes[caller.route.activeRoute].geometry.coordinates[index][0] || value[1] !== caller.route.routes[caller.route.activeRoute].geometry.coordinates[index][1] ){
			pos = caller.interactiveMap.map.transformToMapCoordinates(value.slice());
			return false;
		}
	});

	return pos;
}

Route.prototype.deleteRoute = function(){
	// If there is a route calculation pending we need to abort it
	if(this.searching != undefined){
		this.searching.abort();
		this.searching = undefined;
	}
	if(this.retrySearch != undefined){
		window.clearTimeout(this.retrySearch);
		this.retrySearch = undefined;
	}
	if(this.vectorLayerRoutePreview !== undefined){
		this.interactiveMap.map.removeLayer(this.vectorLayerRoutePreview);
		this.vectorLayerRoutePreview = undefined;
		this.geom = undefined;
	}
	if(this.informationOverlays !== undefined && this.informationOverlays.length > 0){
		var caller = this;
		$.each(this.informationOverlays, function(index, value){
			$(value).off();
			caller.interactiveMap.map.removeOverlay(value);
		});
		this.informationOverlays = [];
	}
}

/*
 * This Function does a whole lot of work for the Navigation Module
 * It'll read out the users current Position from the GpsManager 
 * Then it'll commpare that Position to every Step the user has to take on the route to reach his destination.
 * The first Step that Matches the current Gps Location enough to be sure that the user is at that step will be returned.
*/
Route.prototype.calcPointOnRoute = function(){
	var r = this.route.routes[this.route.activeRoute];
    var wgs84Sphere = new ol.Sphere(6378137);
    // Wir Ziehen einen Punkt auf den nächsten 4 Schritten in betracht
    // Wenn der Punkt dort nicht zu finden ist, müssen wir neu berechnen
    var stepCounter = 1;
    var result = null;
    var gpsPoint = this.interactiveMap.GpsManager.location;
    var accuracy = this.interactiveMap.GpsManager.accuracy;
    $.each(r.legs, $.proxy(function(legIndex, leg) {
        if (stepCounter >= 5) {
            return;
        }
        $.each(leg.steps, $.proxy(function(stepIndex, step) {
            var stepGeom = (new ol.format.GeoJSON()).readGeometry(step.geometry, {
                'dataProjection': 'EPSG:4326',
                'featureProjection': 'EPSG:3857'
            });
            var pointOnStep = stepGeom.getClosestPoint(this.interactiveMap.map.transformToMapCoordinates(gpsPoint));
            // We need to calculate the distance between the GPS-Point and the Point on the Route:
            var c1 = gpsPoint;
            var c2 = ol.proj.transform(pointOnStep, 'EPSG:3857', 'EPSG:4326');
            var distance = wgs84Sphere.haversineDistance(c1, c2);
            if (distance > Math.max(accuracy, 30)) {
                // The Distance of the Point is too high to be on this route step
                stepCounter++;
                return;
            } else {
                // The Point is on this Route Step
                if(result == null || (result != null && result.distance > distance)){
                    result = {
                        legIndex: legIndex,
                        stepIndex: stepIndex,
                        point: pointOnStep,
                        distance: distance
                    };
                }

                // We need to know the distance to the end of the step to decide whether we check the next step, too
                var d = wgs84Sphere.haversineDistance(c1, r.legs[legIndex].steps[stepIndex].geometry.coordinates[r.legs[legIndex].steps[stepIndex].geometry.coordinates.length-1]);
                // It could possibly be at the end of this step in that case we will see if we can go on to the next step
                if (d < Math.max(accuracy, 30)) {
                    stepCounter++;
                    return;
                } else {
                    // Otherwise we take that point and return
                    stepCounter = 5;
                    return false;
                }
            }
            stepCounter++;
        }, this));
    }, this));
    return result;
}

Route.prototype.removeLeg = function(){
	// Remove The first Leg of the route
	if(this.legs.length <= 0) return;
	this.legs.shift();
	var route = this.route.routes[this.route.activeRoute];
	while(route.legs[0].stepslength > 0){
		this.shiftStep();
	}
	route.legs.shift();
	this.route.waypoints.shift();
	// The first Waypoint of this route is probably the user Location that gets updated
	// so if there is more then one waypoint left AND the dirst waypoint has a GpsManager as data object.
	// Then we'll remove the second Waypoint to keep the GPS one
	if(this.waypoints.length > 1 && GpsManager.prototype.isPrototypeOf(this.waypoints[0].data)){
		// We need to remove The Waypoint from the Interface if it's there
		this.interactiveMap.map.removeOverlay(this.waypoints[1].marker);
		this.waypoints.splice(1,1);
	}else{
		this.interactiveMap.map.removeOverlay(this.waypoints[0].marker);
		this.waypoints.shift();
	}
}

Route.prototype.shiftStep = function(){
	// This function shifts the first step of this route and edits all necessary parameters
	if(this.legs.length == 0) return;
	this.legs[0].steps.shift();

	var route = this.route.routes[this.route.activeRoute];
	var leg = this.route.routes[this.route.activeRoute].legs[0];
	if(leg.steps.length == 0) return;

	var step = leg.steps.shift();

	// Calculate how many of the annotations need to get removed
	// A step can have multiple Lines. The length of the Waypoints of this step -1 is how many annotations need to get removed
	var count = step.geometry.coordinates.length - 1;
	while(count != 0){
		// We need to remove this step from the json
		var distance = leg.annotation.distance.shift();
		var duration = leg.annotation.duration.shift();
		leg.annotation.datasources.shift();
		leg.annotation.nodes.shift();
		leg.distance -= distance; route.distance -= distance;
		leg.duration -= duration; route.duration -= duration;
		var coordinate = route.geometry.coordinates.shift();
		this.drivenRoute.coordinates.push(coordinate);
		count--;
	}
	console.log(this);
}

Route.prototype.shiftStepStep = function(){
	// This Function will remove only the First Coordinate from the current step if there is a minimum of 3 left
	var route = this.route.routes[this.route.activeRoute];
	var leg = this.route.routes[this.route.activeRoute].legs[0];
	var step = leg.steps[0];
	if(step.geometry.coordinates.length > 2){
		// Update the step itself
		step.geometry.coordinates.shift();
		// Update the Corresponding leg
		var distance = leg.annotation.distance.shift();
		var duration = leg.annotation.duration.shift();
		leg.annotation.datasources.shift();
		leg.annotation.nodes.shift();
		leg.distance -= distance; route.distance -= distance;
		leg.duration -= duration; route.duration -= duration;
		// This will be approximate but since the step will be deleted when passed, it doesn't matter
		step.distance -= distance;
		step.duration -= duration;
		var coordinate = route.geometry.coordinates.shift();
		this.drivenRoute.coordinates.push(coordinate);
	}
	console.log(step);

}

Route.prototype.getFirstPoint = function(){
	var point = this.route.routes[this.route.activeRoute].legs[0].steps[0].geometry.coordinates[0];
	return point;
}

Route.prototype.getNextPoint = function(){
	var point = this.route.routes[this.route.activeRoute].legs[0].steps[0].geometry.coordinates[1];
	return point;
}

Route.prototype.exit = function(){
	this.deleteRoute();
	// Remove the change Listener
	$("#route-finder-addon #vehicle-chooser input").off();
}
function Leg(legJson, route){
	this.route = route;
	this.json = legJson;
	this.hash = md5(JSON.stringify(this.json));
	this.steps = [];
	var caller = this;
	$.each(this.json.steps, function(index, value){
		var nextStreet = undefined;
		if(caller.json.steps.length > (index+1) && caller.json.steps[index+1].name !== undefined) 
			nextStreet = caller.json.steps[index+1].name;
		caller.steps.push(new Step(value, nextStreet));
	});
}

Leg.prototype.getDuration = function(){
	// Returns the approximate duration left for this Leg
	var duration = this.json.duration;
	return duration;
}

Leg.prototype.shiftStep = function(){
	if(this.steps.length == 0) return;
	var step = this.steps.shift();

	// Calculate how many of the annotations need to get removed
	// A step can have multiple Lines. The length of the Waypoints of this step -1 is how many annotations need to get removed
	var count = step.json.geometry.coordinates.length - 1;
	var i = 0;
	while(i != count){
		// We need to remove this step from the json
		var distance = this.json.annotation.distance.shift();
		var duration = this.json.annotation.duration.shift();
		this.json.annotation.datasources.shift();
		this.json.annotation.nodes.shift();
		this.json.distance -= distance;
		this.json.duration -= duration;
		i--;
	}
	return count;
}

Leg.prototype.generateRouteDescriptionHtml = function(){
	var summary = this.json.summary;
	summary = summary.replace(",", " , ");
	sumamry = summary.replace(/\s+/, " ");
	summary = summary.replace(",", "und");
	var result = $('\
		<button class="btn btn-primary leg-description-toggle" type="button" data-toggle="collapse" data-target="#' + this.hash + '" aria-expanded="false" aria-controls="collapseExample">\
		  <div class="summary">\
		  	über ' + summary + '\
		  </div>\
		  <div class="information">\
		  	<div class="dur">\
		  		' + this.route.durationString(this.json.duration) + '\
		  	</div>\
		  	<div class="dist">\
		  		' + this.route.distanceString(this.json.distance) + '\
		  	</div>\
		  </div>\
		</button>\
		<div class="collapse" id="' + this.hash + '">\
		  <ul>\
		  </ul>\
		</div>\
		');
	var caller = this;
	$.each(this.steps, function(index, value){
		$($(result).get(2)).find(">ul").append($('<li><div><img src="' + value.parseImg() + '" alt=" " /></div><div class="step-string">' + value.toString() + '</div><div class="step-length">' + caller.route.distanceString(value.json.distance) + '</div></li>'));
	})
	return result;
}


function Step(stepJson, nextStreet){
	this.json = stepJson;
	this.nextStreet = nextStreet;
}


// Converts this Step into a String(German)
Step.prototype.toString = function(){
	return this.parseManeuver();
}



Step.prototype.parseManeuver = function() {
    var stepString = "";
    var maneuver = this.json.maneuver;
    var type = maneuver["type"];
    var modifier = maneuver["modifier"];

    var targetStreet = "";
    if(typeof this.json.name != "undefined" && typeof this.json.ref != "undefined"){
        targetStreet = this.makeTrafficSigns(this.json.ref + ":" + this.json.name);
    }else if(typeof this.json.ref != "undefined" && typeof this.json.name == "undefined"){
    	targetStreet = this.makeTrafficSigns(this.json.ref + ":");
    }else if(typeof this.json.ref == "undefined" && typeof this.json.name != "undefined"){
        targetStreet = this.json.name;
    }
    if(typeof targetStreet == "undefined"){
        targetStreet = "";
    }

    var destinations = this.json.destinations;
    if(typeof destinations != "undefined"){
        destinations = destinations.trim();
        destinations = this.makeTrafficSigns(destinations);
    }else{
        destinations = "";
    }
    
    switch (type) {
        case "depart":
            var direction = this.parseBearing(maneuver["bearing_after"]);
            var start = this.json.name;

            if(typeof start != "undefined"){
                stepString = "Auf " + start + " nach " + direction;
            }else{
                stepString = "Starte Richtung " + direction;
            }

            var nextStreet = this.nextStreet;
            if (typeof nextStreet != "undefined" && nextStreet != start) {
                stepString += " Richtung " + nextStreet + " starten";
            }
            break;
        case "continue":
            var mod = parseModifier(maneuver["modifier"]);
            if(mod == "Uturn"){
            	stepString = "Einen " + mod + " machen um <<TARGETSTREET>> zu kommen";
            }else{
            	stepString = mod + " einordnen um <<TARGETSTREET>> zu kommen";
            }
            break;
        case "roundabout turn":
        case "end of road":
        case "turn":
            var direction = "";
            if (maneuver["modifier"] == "uturn") {
                stepString = "Bei " + targetStreet + " wenden";
            } else {
                var modifier = parseModifier(maneuver["modifier"]);
                if (modifier != "Weiter") {
                    modifier += " abbiegen";
                }
                stepString = modifier;
                stepString += " <<TARGETSTREET>>"
            }
            break;
        case "roundabout":
        case "rotary":
            stepString = "Im Kreisverkehr ";
            if (maneuver["exit"] != null) {
                stepString += "die ";
                switch (parseInt(maneuver["exit"])) {
                    case 1:
                        stepString += "erste ";
                        break;
                    case 2:
                        stepString += "zweite ";
                        break;
                    case 3:
                        stepString += "dritte ";
                        break;
                    case 4:
                        stepString += "vierte ";
                        break;
                    case 5:
                        stepString += "fünfte ";
                        break;
                    case 6:
                        stepString += "sechste ";
                        break;
                    case 7:
                        stepString += "siebte ";
                        break;
                    case 8:
                        stepString += "achte ";
                        break;
                    case 9:
                        stepString += "neunte ";
                        break;
                }
                stepString += "Ausfahrt nehmen <<TARGETSTREET>>"
            }
            break;
        case "arrive":
            var mod = parseModifier(modifier);
            if (mod == undefined) {
                stepString = "Sie haben das Ziel erreicht";
            } else {
                stepString = "Das Ziel befindet sich " + mod;
            }
            break;
        case "new name":
            stepString = "Weiter <<TARGETSTREET>>";
            break;
        case "merge":
            var mod = parseModifier(modifier);
            stepString = mod + " auffahren <<TARGETSTREET>>";
            break;
        case "off ramp":
        case "fork":
            var mod = parseModifier(modifier);
            stepString = mod + " halten <<TARGETSTREET>>";
            break;
        case "on ramp":
            var mod = parseModifier(modifier);
            stepString = mod + " auffahren <<TARGETSTREET>>";
            break;
        case "use lane":
            switch(modifier){
                case "left":
                    stepString = "Linke ";
                    break;
                case "right":
                    stepString = "Rechte ";
                    break;
                case "middle":
                case "center":
                    stepString = "Mittlere ";
                    break;
                default:
            }
            if(stepString != ""){
                stepString += "Spur verwenden <<TARGETSTREET>>";
            }
            break;
        default:
            console.log(this.json);
            stepString = "Konnte diesen Schritt nicht zu einem String auswerten";
    }

    
    // Die Anweisung kann nun noch erweitert werden, um eine Straße auf der weiter gefahren wird, oder um eine Richtung
    if(typeof targetStreet != "undefined" && targetStreet.length > 0){
    	stepString = stepString.replace("<<TARGETSTREET>>", "auf " + targetStreet);
    }else if(typeof destinations != "undefined" && destinations.length > 0){
    	stepString = stepString.replace("<<TARGETSTREET>>", "Richtung " + destinations);
    }else{
    	stepString = stepString.replace("<<TARGETSTREET>>", "");
    }
	
    return stepString;
}

Step.prototype.parseImg = function() {
	var step = this.json;
    switch (step["maneuver"]["type"]) {
        case "depart":
        case "new name":
            return "/img/straight.png";
        case "roundabout turn":
        case "continue":
        case "end of road":
        case "turn":
            switch (step["maneuver"]["modifier"]) {
                case "left":
                    return "/img/turn-left.png";
                case "sharp left":
                    return "/img/turn-sharp-left.png";
                case "right":
                    return "/img/turn-right.png";
                case "sharp right":
                    return "/img/turn-sharp-right.png";
                case "uturn":
                    return "/img/uturn.png";
                case "slight right":
                    return "/img/fork-slight-right.png";
                case "slight left":
                    return "/img/fork-slight-left.png";
                case "straight":
                    return "/img/straight.png";
                default:
            }
            break;
        case "roundabout":
        case "rotary":
            return "/img/roundabout.png";
        case "on ramp":
            return "/img/auffahren.png";
        case "merge":
        case "off ramp":
        case "fork":
            switch (step["maneuver"]["modifier"]) {
                case "left":
                    return "/img/fork-left.png";
                case "right":
                    return "/img/fork-right.png";
                case "slight right":
                    return "/img/fork-slight-right.png";
                case "slight left":
                    return "/img/fork-slight-left.png";
                case "straight":
                    return "/img/straight.png";
                default:
            }
        default:
    }
    return "";
}

Step.prototype.makeTrafficSigns = function(destinations){
    var tmp = "";
        while(destinations.length > 0){
            // Let's check what kind of destination we have:
            if(destinations.match(/^[^,]+?:/)){
                var track = destinations.substring(0, destinations.indexOf(":")).trim();
                track = track.split(/;/g);
                destinations = destinations.substr(destinations.indexOf(":") + 1);
                // No we get the destinations of this track an make them to a traffic sign
                var tmpDests = [];
                while(destinations.match(/^[^,]+/) != null){
                    if(destinations.indexOf(",") != -1){
                        tmpDests.push(destinations.substring(0, destinations.indexOf(",")));
                        destinations = destinations.substring(destinations.indexOf(",")+1);
                    }else{
                        tmpDests.push(destinations);
                        destinations = "";
                    }
                }
                // Generate Output from the generated data
                var tmpClass = "";
                if(track[0].indexOf("A ") == 0){
                    tmpClass = "autobahn";
                }else if(track[0].trim().match(/^\w{0,3}\s*\d/) != null 
                    || track[0].trim().match(/^Ring\s\d+/) != null)
                    {
                    tmpClass = "landstrasse";
                }
                tmp += "<span class=\"" + tmpClass + " schild\">";
                $.each(track, function(index, value){
                    tmp += "<span class=\"highway-number\">" + value + "</span>";
                });
                tmp += " <span class=\"dests\">" +tmpDests + "</span></span>";
            }else{
                if(destinations.match(/^\w+?,/)){
                    tmp += destinations.substring(0, destinations.indexOf(","));
                    destinations = destinations.substring(destinations.indexOf(",")+1);
                }else if(destinations.match(/^\w+?;/)){
                    tmp += destinations.substring(0, destinations.indexOf(";"));
                    destinations = destinations.substring(destinations.indexOf(";")+1);
                }else{
                    tmp += destinations;
                    destinations = "";
                }
            }
        }
        return tmp;
}

function parseModifier(modifier) {
    var direction = "";
    switch (modifier) {
        case undefined:
            direction = undefined;
            break;
        case "sharp right":
            direction = "Scharf rechts";
            break;
        case "right":
            direction = "Rechts";
            break;
        case "slight right":
            direction = "Leicht rechts";
            break;
        case "straight":
            direction = "Weiter";
            break;
        case "slight left":
            direction = "Leicht links";
            break;
        case "left":
            direction = "Links";
            break;
        case "sharp left":
            direction = "Scharf links";
            break;
        case "uturn":
        	direction = "Uturn";
        	break;
        default:
            direction = "Konnte Richtungs-Modifizierer nicht auswerten: " + modifier;
    }
    return direction;
}

Step.prototype.parseBearing = function(bearing) {
    bearing = parseFloat(bearing);
    if ((bearing >= 0 && bearing < 22.5) || bearing >= 337.5) {
        return "Norden";
    } else if (bearing >= 22.5 && bearing < 67.5) {
        return "Nordosten";
    } else if (bearing >= 67.5 && bearing < 112.5) {
        return "Osten";
    } else if (bearing >= 112.5 && bearing < 157.5) {
        return "Südosten";
    } else if (bearing >= 157.5 && bearing < 202.5) {
        return "Süden";
    } else if (bearing >= 202.5 && bearing < 247.5) {
        return "Südwesten";
    } else if (bearing >= 247.5 && bearing < 292.5) {
        return "Westen";
    } else if (bearing >= 292.5 && bearing < 337.5) {
        return "Nordwesten";
    }
}


Step.prototype.toHTML = function(distTraveled){
    console.log(this.json.distance, distTraveled);
    distTraveled = Math.max(distTraveled, 0);
    var imgSrc = this.parseImg();
    if(imgSrc.length >= 0){
        var html = $('\
            <div class="step">\
                <div class="image">\
                    <img src="' + imgSrc + '" alt="noimage" />\
                </div>\
                <div class="step-string">\
                    ' + this.toString() + '\
                </div>\
                <div class="step-length">\
                    ' + this.distanceString(this.json.distance - distTraveled) + '\
                </div>\
            </div>');
    }else{
        var html = $('\
            <div class="step">\
                <div class="image">\
                </div>\
                <div class="step-string">\
                    ' + this.toString() + '\
                </div>\
                <div class="step-length">\
                    ' + this.distanceString(this.json.distance - distTraveled) + '\
                </div>\
            </div>');
    }
    return html;
}

Step.prototype.getDistance = function(){
    return this.json.distance;
}

Step.prototype.distanceString = function(length){
    var result = "";
    length = Math.floor(length);

    if(length > 10000){
        // We will only display full km
        result = Math.round(length/1000) + " km";
    }else if(length > 2000){
        // We will display every 100m
        result = (Math.round(length/100) / 10) + "km";
    }else if(length > 1000){
        // We will display every 50m
        length /= 10;
        length = Math.ceil(length/5) * 5;
        length /= 100;
        result = length + " km";
    }else if(length > 500){
        // We will display every 50m but in m instead of km
        length /= 10;
        length = Math.ceil(length/5) * 5;
        length *= 10;
        result = length + " m";
    }else{
        // We will display every 10m but in m instead of km
        length = Math.ceil(length / 10) * 10;
        result = length + " m";
    }

    return result;
}
function OfflineManager(interactiveMap){
	this.interactiveMap = interactiveMap;

	this.registerSW();
}

OfflineManager.prototype.registerSW = function(){
	navigator.serviceWorker.register('/cache-sw.js', {
		scope: '/'
	});
}
function OfflineModule(interactiveMap){
	this.interactiveMap = interactiveMap;
	this.areas = [];
	this.vectorSource = new ol.source.Vector();
	this.layer = new ol.layer.Vector({
		source: this.vectorSource
	})
	this.interactiveMap.map.addLayer(this.layer);
	this.initializeInterface();
	this.addListeners();
	this.status = "overview";
	// Recenter the view to get an overview of germany
	this.interactiveMap.map.getView().animate({center: [1139922.2705121872, 6865247.913390023], zoom: 6, duration: 500}, $.proxy(function(){
		// If the user is not in Wireless Lan we won't open this Module
		// because we consume too much data here
		if(typeof android != "undefined" && !android.isWireless()){
			console.log("Kein WLan");
			alert("Dieses Feature läd große Datenmengen herunter. Bitte stellen Sie sicher, dass sie sich in einer nicht getakteten Netzwerkverbindung befinden um fortzufahren.");
			interactiveMap.switchModule("search");
			return;
		}else{
			console.log("WLan");
		}
		// We donwload all available Shapefiles from the server
		// Those show which areas can be downloaded
		this.downloadPolygons();
	}, this));
}

OfflineModule.prototype.addListeners = function(){
	var caller = this;
	$("#offline-addon .exit").off();
	$("#offline-addon .exit").click(function(){
		caller.interactiveMap.switchModule("search")
	});
	$("#offline-addon .add-area").off();
	$("#offline-addon .add-area").click(function(){
		caller.startAreaSelection();
	});
}

OfflineModule.prototype.downloadPolygons = function(){
	var mapFileUrl = "https://maps.metager.de/map_files/";
	var polygons = [];
	var caller = this;
	$.get(mapFileUrl, function(data){
		var regex = /<a.*?>([\w-]+?\.poly)<\/a>/gi;
		var match = regex.exec(data);
		var areas = [];
		var id = 0;
		while(match != null){
			var area = {
				id: id,
				polygonfile: mapFileUrl + match[1],
				mapFile: match[1].substring(0, match[1].indexOf(".poly")) + ".map",
				mapFileUrl: mapFileUrl + match[1].substring(0, match[1].indexOf(".poly")) + ".map"
			}
			$.get(area.polygonfile, $.proxy(function(data){
				var coordinates = [];
				var area = this;
				data.split("\n").forEach(function(line, index){
					if(index == 0){
						var infos = line.split(";");
						area.name = infos[0];
						area.filesize = infos[1];
						area.date = infos[2];
						return 1;
					}else if(line == "none" || line == "END")
						return 1;
					else if(line.match(/^\d+$/g)){
						coordinates.push([]);
					}else{
						var regex = /^\s*(\S+?)\s+(\S+)$/;
						var match = regex.exec(line);
						if(match){
							var point = [parseFloat(parseFloat(match[1]).toFixed(20)), parseFloat(parseFloat(match[2]).toFixed(20))];
							point = caller.interactiveMap.map.transformToMapCoordinates(point);
							coordinates[coordinates.length-1].push(point);
						}
					}

				});
				this.polygon = new ol.geom.Polygon(coordinates);
				caller.areas.push(this);
				caller.updateAreas();
			}, area));
			match = regex.exec(data);
			id++;
		}
	});
}

OfflineModule.prototype.updateAreas = function(){
	// This Function will submit changes in the areas array to the User Interface
	// Since the areas are getting loaded asynchronious we need to be aware of changes at any time
	// First remove everything from the User Interface 
	// 1. Remove all Area Polygons on the map:
	this.interactiveMap.map.removeLayer(this.layer);
	this.vectorSource = new ol.source.Vector();
	this.layer = new ol.layer.Vector({
		source: this.vectorSource
	});
	
	// 2. Remove all Area Elements in the List
	$("#offline-addon .downloaded-areas > div:not(.placeholder)").remove();
	$("#offline-addon .available-areas > div").remove();

	// Now add all areas in the array
	var caller = this;
	$.each(this.areas, function(index, area){
		area.id = index;
		caller.addArea(area);
	});
	switch(this.status){
		case "overview":
			$("#offline-addon .downloaded-areas > div.area").each(function(index, value){
				$(this).show("slow");
			});
			$("#offline-addon .add-area").show('slow');
			break;
		case "area-selection":
			$("#offline-addon .downloaded-areas > div.area").each(function(index, value){
				$(this).hide("slow");
			});
		case "detail":
			$("#offline-addon .downloaded-areas > div.area").each(function(index, value){
				$(this).hide("slow");
			});
	}
}

OfflineModule.prototype.addArea = function(area){
	if( typeof area != "undefined" && typeof area.polygon != "undefined" ){
		var feature = new ol.Feature(area.polygon);
	    if(typeof android != "undefined" && android.hasArea(area.mapFile)){
	    	
		   area.style  = new ol.style.Style({
	            stroke: new ol.style.Stroke({
	                color: 'green',
	                width: 2
	            }),
	            fill: new ol.style.Fill({
	                color: 'rgba(0,255,0,.2)'
	            })
	        });
		   area.downloaded = true;
		   area.filesize = android.getMapFileSize(area.mapFile);
		   area.date = android.getMapFileDate(area.mapFile);
		   this.addToDownloadedInterface(area);
		}else{
			area.style  = new ol.style.Style({
	            stroke: new ol.style.Stroke({
	                color: 'red',
	                width: 2
	            }),
	            fill: new ol.style.Fill({
	                color: 'rgba(255,0,0,.2)'
	            })
	        });
	        // If this area is not downloaded yet, we'll add the Listener to download it now
	        area.downloaded = false;
	        this.addToAvailableInterface(area);
		}
	    feature.setProperties(area);
		feature.setStyle(area.style);
        
		this.vectorSource.addFeature(feature);
		this.select_interaction = new ol.interaction.Select();

		this.select_interaction.getFeatures().on("add", function (e) { 
		     var feature = e.element; //the feature selected
		     if(typeof feature.getProperties().mapFileUrl != "undefined"){
		     	this.areaSelected(feature);
		     //	android.downloadArea(feature.getProperties().mapFileUrl);
		     }
		}, this);
		this.select_interaction.getFeatures().on("remove", function (e) { 
		     var feature = e.element; //the feature selected
		     if(typeof feature.getProperties().mapFileUrl != "undefined"){
		     	this.areaDeSelected(feature);
		     //	android.downloadArea(feature.getProperties().mapFileUrl);
		     }
		}, this);

		this.interactiveMap.map.addInteraction(this.select_interaction);
	}
	
}

OfflineModule.prototype.startAreaSelection = function(){
	$("#offline-addon .add-area").hide("slow");
	$("#offline-addon").animate({margin: 0, width: '100%'}, 'slow');
	$("#offline-addon .downlaoded-areas > .area").hide("slow");
	$("#offline-addon .placeholder:not(.area-selection-info)").hide("slow");
	$("#offline-addon .area-selection-info").show("slow");
	$("#offline-addon .downloaded-areas > div.area").each(function(index, value){
		$(this).hide("slow");
	});
	$("#offline-addon .exit").off();
	$("#offline-addon .exit").click($.proxy(function(){
		this.stopAreaSelection();
	}, this));
	this.interactiveMap.map.addLayer(this.layer);
	this.status = "area-selection";
}

OfflineModule.prototype.stopAreaSelection = function(){
	$("#offline-addon .add-area").show("slow");
	$("#offline-addon").animate({'margin-left': '15px', 'margin-top': '15px', 'margin-right':'15px'}, 'slow', function(){
		$(this).css("width", "calc(100% - 30px)");
	});
	$("#offline-addon .downlaoded-areas > .area").show("slow");
	$("#offline-addon .area-selection-info").hide("slow");
	$("#offline-addon .downloaded-areas > div.area").each(function(index, value){
		$(this).show("slow");
	});
	if(this.countDownloadedAreas() == 0)
		$("#offline-addon .placeholder:not(.area-selection-info)").show("slow");
	this.addListeners();
	this.interactiveMap.map.removeLayer(this.layer);
	this.status = "overview";
}

OfflineModule.prototype.areaSelected = function(feature){
	$("#offline-addon .placeholder.area-selection-info").hide('slow');
	
	if(!feature.getProperties().downloaded){
		var areaStyle  = new ol.style.Style({
		    stroke: new ol.style.Stroke({
		    color: 'rgb(255,165,0)',
		         width: 2
		    }),
		    fill: new ol.style.Fill({
		        color: 'rgba(255,165,0,.2)'
		    })
		});
		feature.setStyle(areaStyle);
	}
	var caller = this;
	$("#offline-addon .area").each(function(index, value){
		if($(this).attr("id") != "area-" + feature.getProperties().id)
			$(this).hide('slow');
		else{
			
			$(this).show('slow', function(){
				$(this).css("display", 'flex');
				caller.interactiveMap.map.getView().fit(feature.getProperties().polygon, {
					duration: 500
				});
			});
		}
	});
	$("#offline-addon .exit").off();
	var caller = this;
	$("#offline-addon .exit").click(function(){
		caller.select_interaction.getFeatures().clear();
	});
	this.status = "detail";
}

OfflineModule.prototype.areaDeSelected = function(feature){
	$("#offline-addon .placeholder.area-selection-info").show('slow');
	feature.setStyle(feature.getProperties().style);
	$("#offline-addon .area").each(function(index, value){
		$(this).hide('slow');
	});
	$("#offline-addon .exit").off();
	var caller = this;
	$("#offline-addon .exit").click(function(){
		caller.stopAreaSelection();
	});
	this.status = "area-selection";
}

OfflineModule.prototype.countDownloadedAreas = function(){
	var result = 0;
	$.each(this.areas, function(index, value){
		if(value.downloaded)
			result++;
	});
	return result;
}

OfflineModule.prototype.addToDownloadedInterface = function(area){
	var newElement = $('\
		<div class="area downloaded" style="display: none;" id="area-' + area.id + '">\
    		<div class="texts">\
        		<div class="name">' + area.name + '</div>\
        		<div class="info">\
            		<div class="size">' + area.filesize + '</div>\
    				<div class="seperator">·</div>\
            		<div class="date">' + area.date + '</div>\
        		</div>\
    		</div>\
    		<div class="remove"><span class="glyphicon glyphicon-trash"></span></div>\
		</div>');
	var caller = this;
	$(newElement).find(".remove").click($.proxy(function(){
			caller.removeArea(this);
	}, area));
	// Hide the placeholder
	$("#offline-addon .downloaded-areas > div.placeholder:not(.area-selection-info)").hide('slow');
	// Add this new Element to the Front of the List
	$("#offline-addon .downloaded-areas").prepend(newElement);
}

OfflineModule.prototype.addToAvailableInterface = function(area){
	var newElement = $('\
		<div class="area available" style="display: none;" id="area-' + area.id + '">\
    		<div class="texts">\
        		<div class="name">' + area.name + '</div>\
        		<div class="info">\
            		<div class="size">' + area.filesize + '</div>\
    				<div class="seperator">·</div>\
            		<div class="date">' + area.date + '</div>\
        		</div>\
    		</div>\
    		<div class="remove"><span class="glyphicon glyphicon-download-alt"></span></div>\
		</div>');
	var caller = this;
	$(newElement).find(".remove").click($.proxy(function(){
		caller.startDownload(this);
	}, area));
	// Add this new Element to the Front of the List
	$("#offline-addon .available-areas").prepend(newElement);
}

OfflineModule.prototype.removeArea = function(area){
	if(window.confirm("Soll das Gebiet " + area.name + " wirklich von Ihrem Gerät gelöscht werden?")){
		android.removeArea(area.mapFile);
		this.select_interaction.getFeatures().clear();
		this.updateAreas();
		this.interactiveMap.map.addLayer(this.layer);
	}
}

OfflineModule.prototype.startDownload = function(area){
	if(this.downloading != null) return;
	var started = android.downloadArea(area.mapFileUrl);
	if(started){
		console.log("Download started");
		// Area download is started
		// Let's add a progress bar and wait for the download to finish
		$("#offline-addon .download-progress").show('slow', function(){
			$(this).css("display", "flex");
		});
		var caller = this;
		$("#offline-addon .download-progress .abort").off();
		$("#offline-addon .download-progress .abort").click(function(){
			$("#offline-addon .download-progress .abort").off();
			caller.stopDownload();
		});

		// Block the Back Button and repalace it with a Loading Gif until the downlaod is either finished or aborted
		$("#offline-addon .exit").before(
			$('<img id="downloading" src="/img/ajax-loader.gif" height="16px" width="16px" alt="downloading..." style="align-self: center;margin-left: 10px;" />')
		);
		$("#offline-addon .exit").hide('slow');

		this.downloading = area.id;
		this.updateDownloadStatus();
	}
}

OfflineModule.prototype.stopDownload = function(){
	if(window.confirm("Soll der Download wirklich abgebrochen werden?")){
		android.stopDownload();
		$("#offline-addon .download-progress").hide('slow');
		$("#offline-addon .progress-bar").attr("aria-valuenow", 0);
		$("#offline-addon .progress-bar").css("width", "0%");
		$("#offline-addon .progress-bar").html("0%");
		$("#offline-addon .download-progress .abort").off();
		$("#offline-addon #downloading").hide('slow', function(){
			$(this).remove();
		});
		$("#offline-addon .exit").show('slow');
		this.downloading = null;
	}
}

OfflineModule.prototype.updateDownloadStatus = function(){
	var error;
	if((error = android.getError()) != ""){
		$("#offline-addon .download-progress").hide('slow');
		$("#offline-addon .progress-bar").attr("aria-valuenow", 0);
		$("#offline-addon .progress-bar").css("width", "0%");
		$("#offline-addon .progress-bar").html("0%");
		$("#offline-addon .download-progress").before($('\
			<div class="download-failed alert alert-danger">' + error + '</div>'));
		window.setTimeout(function(){
			$("#offline-addon .download-failed").remove();
		}, 5000);
		$("#offline-addon #downloading").hide('slow', function(){
			$(this).remove();
		});
		$("#offline-addon .exit").show('slow');
		this.downloading = null;
		return;
	}

	var total = android.getDownloadSize();
	var downloaded = android.getDownloadStatus();
	var caller = this;
	if(total != 0){
		var percent = Math.round((downloaded / total) * 100);
		$("#offline-addon .progress-bar").attr("aria-valuemax", total);
		$("#offline-addon .progress-bar").attr("aria-valuenow", downloaded);
		$("#offline-addon .progress-bar").css("width", percent + "%");
		$("#offline-addon .progress-bar").html(android.getDownloadStatusMessage());
		if(android.getStage() != android.getMaxStage() || downloaded != total){
			window.setTimeout($.proxy(this.updateDownloadStatus, this), 100);
		}else{
			this.areas[this.downloading].downloaded = true;
			$("#offline-addon .download-progress").hide('slow');
			$("#offline-addon .progress-bar").attr("aria-valuenow", 0);
			$("#offline-addon .progress-bar").css("width", "0%");
			$("#offline-addon .progress-bar").html("0%");
			$("#offline-addon #downloading").hide('slow', function(){
				$(this).remove();
			});
			$("#offline-addon .exit").show('slow');
			this.downloading = null;
			this.select_interaction.getFeatures().clear();
			this.updateAreas();
			this.interactiveMap.map.addLayer(this.layer);
			return;
		}
	}else{
		window.setTimeout($.proxy(this.updateDownloadStatus, this), 100);
	}
}

OfflineModule.prototype.downloadFinished = function(area){
	$("#offline-addon .download-progress").hide('slow');
	$("#offline-addon .progress-bar").attr("aria-valuenow", 0);
	$("#offline-addon .progress-bar").css("width", "0%");
	$("#offline-addon .progress-bar").html("0%");
	$("#offline-addon .download-progress .abort").off();
	area.downloaded = true;
	this.select_interaction.getFeatures().clear();
	this.updateAreas();
}

OfflineModule.prototype.initializeInterface = function(){
	// Hide everything from Map that is not needed:
	$(".ol-zoom, .ol-zoomslider").hide("slow");
	this.interactiveMap.reversePositionManager.setActive(false);
	$("#offline-addon").show("slow");
}

OfflineModule.prototype.exit = function(){
	// Show everything again that got hidden on intialization
	$(".ol-zoom, .ol-zoomslider").show("slow");
	$("#offline-addon .add-area").hide('slow');
	$("#offline-addon .placeholder:not(.area-selection-info)").show("slow");
	$("#offline-addon .placeholder.area-selection-info").hide("slow");
	this.interactiveMap.reversePositionManager.setActive(true);
	$("#offline-addon").hide("slow");
	this.interactiveMap.map.removeLayer(this.layer);
	$("#offline-addon .exit").off();
	$("#offline-addon .available-areas").html("");
	$("#offline-addon .downloaded-areas > div:not(.placeholder)").remove();
}

OfflineModule.prototype.enableGps = function(){

}

OfflineModule.prototype.disableGps = function(){

}
function NavigationModule(interactiveMap, route){
	this.interactiveMap = interactiveMap;
	this.route = route;
	this.vectorS = new ol.source.Vector();
	this.vectorLayerRoutePreview = new ol.layer.Vector({
        source: this.vectorS
    });
    $("#navigation .leg-finish").hide('', function(){
    	$(this).css("visibility", "visible");
    });
    this.running = false;
    this.interactiveMap.map.addLayer(this.vectorLayerRoutePreview);
	// Initialize empty driven Route ( With First Point already added)
    this.route.drivenRoute = {
        coordinates: [this.route.getFirstPoint()],
        type: "LineString"
    };
	this.prepareInterface();
	// Disable the Display Timeout
	if(typeof android !== "undefined"){
        android.disableDisplayTimeout();
        android.showToast("Bildschirm Timeout abgeschaltet.");
    }
    this.printRoute();

    this.currentPosition = null;
	this.calculating = false;

	this.lastUpdate = null;
	this.frequency = 3000;   // Frequency in ms in which the Route-Assistent should Update itself

	this.addListeners();

    this.startLocationFollowing();
}

NavigationModule.prototype.prepareInterface = function(){
	// Disable The Zoom Bar. We won't need it now
	$(".ol-zoom, .ol-zoomslider").hide();
	// Disable The Location tool it'll be active anyways
	this.interactiveMap.GpsManager.toggleGpsLocator(false);
	// Hide the Attribution and the Scale line
	$("#map .ol-scale-line, #map .ol-attribution").hide();
	// Show the Navigation Interface
	$("#navigation").show('slow');
	// Fill the Information with the current Step
	this.updateCurrentStep();
	this.updateRouteStats();
}

NavigationModule.prototype.addListeners = function(){
	// Listener for the exit navigation Button 
	$("#navigation .leg-finish .options .abort, #navigation #general-information .exit").click($.proxy(function(event){
		this.cancelNavigation();
	}, this));
	// Listener for the continue navigation Button
	$("#navigation .leg-finish .options .continue").click($.proxy(function(event){
		$("#navigation .leg-finish").hide('slow');
		this.startLocationFollowing();
	}, this));
}

NavigationModule.prototype.removeListeners = function(){
	$("#navigation .leg-finish .options .abort, #navigation #general-information .exit").off();
	$("#navigation .leg-finish .options .continue").off();
}

NavigationModule.prototype.cancelNavigation = function(){
	// We need to decide what screen the user should see next when exiting
	
	if(this.route.route.waypoints.length > 1){
		// If we have multiple (more than one) Waypoints left
		// The user should see the Route for the Remaining Waypoints
		// we guess that the user has already taken at least part of the route
		// so we have to dismiss the first waypoint and exchange it for the gps position of the user
		var waypoints = [];
		$.each(this.route.route.waypoints, $.proxy(function(index, value){
			if(index == 0){
				waypoints.push(["gps"]);
			}else{
				waypoints.push(value.location);
			}
		}, this));
		var vehicle = this.route.vehicle;
		this.interactiveMap.switchModule("route-finding", {waypoints: waypoints, vehicle: vehicle});
	}else if(this.route.route.waypoints.length == 1){
		// There is only one Waypoint Left that will be the desired destination for the user
		// Let's just open the Search Module
		this.interactiveMap.switchModule("search");
	}
}

NavigationModule.prototype.updateCurrentStep = function(distTraveled){
	var traveled = 0;
	if(typeof distTraveled != "undefined")
		traveled = distTraveled;

	// The data structur of osrm is a little absurd here
	// Every step has the manuever of the next step saved
	// That's why we get the correct distance from it
	// But the whole Manuever is wrong because it's the manuever of the start of the step
	// That's why we have to fetch the distance of the current step but the manuever of the next step if possible
	var step = this.route.legs[0].steps[0];
	var distance = step.getDistance() - traveled;
	distance = Math.max(distance, 0);
	var distanceString = step.distanceString(distance);

	if(this.route.legs[0].steps.length >= 2){
		var otherStep = this.route.legs[0].steps[1];
		var image = otherStep.parseImg();
		var stepString = otherStep.toString();
	}else{
		var image = step.parseImg();
		var stepString = step.toString();
	}

	if(image.length > 0){
		var imageHtml = '<img src="' + image + '" alt="noimage" />';
	}else{
		var imageHtml = '';
	}

	var html = $('\
            <div class="step">\
                <div class="image">\
                    ' + imageHtml + '\
                </div>\
                <div class="step-string">\
                    ' + stepString + '\
                </div>\
                <div class="step-length">\
                    ' + distanceString + '\
                </div>\
            </div>');

	$("#navigation #next-step").html(html);
}

NavigationModule.prototype.updateRouteStats = function(distTraveled, durTraveled){
	var dist = 0;
	var dur = 0;
	if(typeof distTraveled == "number")
		dist = distTraveled
	if(typeof durTraveled == "number")
		dur = durTraveled;
	// We will update the displayed information abut route length/duration etc.
	var duration = this.route.legs[0].json.duration -dur;
	var durationString = this.durationString(duration);
	$("#navigation #general-information .duration").html(durationString);

	var distance = this.route.legs[0].json.distance - dist;
	var distanceString = this.distanceString(distance);
	$("#navigation #general-information .length").html(distanceString);

	var timeArival = new Date(new Date().getTime() + duration * 1000);
	$("#navigation #general-information .time").html(timeArival.getHours() + ":" + timeArival.getMinutes());
}

NavigationModule.prototype.distanceString = function(length){
    var result = "";
    length = Math.floor(length);

    if(length > 10000){
        // We will only display full km
        result = Math.round(length/1000) + " km";
    }else if(length > 2000){
        // We will display every 100m
        result = (Math.round(length/100) / 10) + "km";
    }else if(length > 1000){
        // We will display every 50m
        length /= 10;
        length = Math.ceil(length/5) * 5;
        length /= 100;
        result = length + " km";
    }else if(length > 500){
        // We will display every 50m but in m instead of km
        length /= 10;
        length = Math.ceil(length/5) * 5;
        length *= 10;
        result = length + " m";
    }else{
        // We will display every 10m but in m instead of km
        length = Math.ceil(length / 10) * 10;
        result = length + " m";
    }

    return result;
}

NavigationModule.prototype.finishLeg = function(){
	this.running = false;
	this.route.removeLeg();
	this.normalizeView(); // Puts the rotation back to 0
	// In every case will we stop Watching the Position for now
	// Fill the Finish Screen with information
	var target = this.route.route.waypoints[0].name;
	targetText = "Sie haben Ihr Ziel<br>\"" + target + "\"<br>erreicht!";
	$("#navigation .leg-finish > .container > .text").html(targetText);

	var startTime = '<span class="glyphicon glyphicon-time"></span> ' + this.startTime.getHours() + ":" + this.startTime.getMinutes();
	$("#navigation .leg-finish .start-time .time").html(startTime);

	var arivalTime = new Date();
	var arivalTimeString = '<span class="glyphicon glyphicon-time"></span> ' + arivalTime.getHours() + ":" + arivalTime.getMinutes();
	$("#navigation .leg-finish .arrival-time .time").html(startTime);

	// Last but not Least the Duration and the originally estimated duration
	var duration = arivalTime.getTime() - this.startTime.getTime(); // Milliseconds
	duration /= 1000;
	duration = Math.round(duration);
	var durationString = this.durationString(duration);

	var estimatedDuration = this.estimatedArival.getTime() - this.startTime.getTime();
	estimatedDuration /= 1000;
	estimatedDuration = Math.round(estimatedDuration);
	var difference = duration - estimatedDuration;
	var estimatedDurationString = this.durationString(difference);
	if(difference >= 60 ){
		// The User took more time than thought
		estimatedDurationString = '<span class="plus"> (+ ' + estimatedDurationString + ' langsamer als erwartet)</span>';
	}else if(difference < -60){
		// The User was faster than thought
		estimatedDurationString = '<span class="minus"> ( ' + estimatedDurationString + ' schneller als erwartet)</span>';
	}else{
		// The User matched the time exact
		estimatedDurationString = '<span class="minus"> (pünktlich)</span>';
	}
	estimatedDurationString = '<span class="glyphicon glyphicon-time"></span> '+ durationString + estimatedDurationString;
	$("#navigation .leg-finish .duration .time").html(estimatedDurationString);

	if(this.route.legs.length <= 0){
		// There is no waypoint left hide the button to continue
		$("#navigation .leg-finish .options > .continue").hide();
	}else{
		// There is another Leg to continue show the button to continue
		$("#navigation .leg-finish .options > .continue").show();
	}
	// Show the finish Screen
	$("#navigation .leg-finish").show('slow');
}

NavigationModule.prototype.durationString = function(duration){
	duration = Math.abs(duration);
	duration = Math.floor(duration);
	var result = "";
	if(duration >= 3600){
		var hours = Math.floor(duration / 3600);
		var minutes = Math.round((duration % 3600) / 60);

		result += hours + " Std " + minutes + " Min";
	}else{
		var minutes = Math.round((duration % 3600) / 60);

		result += minutes + " Min";
	}
	return result;
}

NavigationModule.prototype.startLocationFollowing = function() {
	if (this.followingId == null) {
        var options = {
            enableHighAccuracy: true,
            maximumAge: 3000
        };
        this.running = true;

        // Set starting informations
        this.startTime = new Date();
        var duration = this.route.legs[0].json.duration;
        this.estimatedArival = new Date(new Date().getTime() + duration * 1000);
        this.interactiveMap.GpsManager.watchPosition($.proxy(this.newPosition, this));
    }
}

NavigationModule.prototype.newPosition = function(position) {
    // We will define an update Interval manually since the maximumAge Paramter doesn't seem to work
    if(this.lastUpdate !== null && (Date.now()-this.lastUpdate) < this.frequency){
        return;
    }
    if(!this.running){
    	// We should not come to this case again because the watch should've been cleared
    	// Let's clear it again
    	this.interactiveMap.GpsManager.stopWatch();
    	this.vectorS.clear();
        this.removeWaypoints();
        this.removeUserPosition();
    	return;
    } 
    this.lastUpdate = Date.now();
    var timestamp = Math.floor(position.timestamp / 1000);
    var lon = parseFloat(position.coords.longitude);
    var lat = parseFloat(position.coords.latitude);
    var accuracy = parseFloat(position.coords.accuracy);
    // We have to decide whether we will retrieve two exact Routes (driven and upcoming)
    // or whether we want to derive a new User Position on the Route of the new GPS Location
    // The latter one would use some mobile Data to make a new HTTP Request
    // The first one could save that data taking the risk that the user could've left the route
    // We calculate the risk in the following way:
    // We derive the perpendicular distance of the GPS Coordinate to the current Route Step (straight line)
    // We get a possible Position of the User on the Route. There could be some possible situations the user is in:
    // 1. The distance of the Point to the Route is higher than the GPS accuracy
    //  => The user has left the route and we need to recalculate
    // 2. The point is beyond the Point where the next step would begin
    //  => The user either has left the route or passed the next waypoint and we need to recalculate
    // 3. The distance of the Point to the Route is less or equal the gps Accuracy AND the Point on the route is before the next waypoitn
    //  => The user is on the route and hasn't passed the next waypoint so no recalculation is needed
    // First thing we do is to check whether the point is the beginning or ending of the Line
    // In that case we would have to recalculate anyways because of 2.
    // 3. is standard and we check for recalc
    var recalc = false;
    var pointOnRoute = this.route.calcPointOnRoute();
    if (pointOnRoute !== null) {
    	// If the user wasn't on the route for a period of time we could've started a Request for a new route
    	// Since we're back on the Route we can simply abort that request 
    	if(this.routeRequest != undefined){
    		this.routeRequest.abort();
    		this.routeRequest = undefined;
    	}
    	if($("#navigation #next-step").css("background-color") != "#ff8000"){
    		$("#navigation #next-step").css("background-color", "#ff8000");
    	}
        // If Leg Index or stepIndex is not 0 Then we need to change the Route Object
        var i = pointOnRoute.legIndex;
        while (i > 0) {
            this.finishLeg();
            return;
        }
        i = pointOnRoute.stepIndex;
        while (i > 0) {
            this.route.shiftStep();
            i--;
        }
        //this.route.printRoute();
        
        // Now we for sure have the current step at position 0
        // Every step has a geometry Object describing the line we need to take.
        // If we can find out at which point of that line we are we can adjust the bearing of the map to
        // follow the bearing of the User
        // In Addition we can then adjust the distance and duration to be at the current state
        // Tolerance how much the bearings may differ to be the same
        var tolerance = 0.03;
        var bearingGps = this.getBearing(this.interactiveMap.map.transformToWorldCoordinates(pointOnRoute.point), this.route.getNextPoint());
        var bearingRoute = this.getBearing(this.route.getFirstPoint(), this.route.getNextPoint());
        while ((bearingGps < (bearingRoute - tolerance) || (bearingRoute + tolerance) < bearingGps) && this.route.route.routes[this.route.route.activeRoute].legs[0].steps[0].geometry.coordinates.length > 2) {
            // The Bearings differ too much
            // Seems like we passed another Point
            // Delete it from route and add it to drivenRoute
            this.route.shiftStepStep();       
            bearingGps = this.getBearing(this.interactiveMap.map.transformToWorldCoordinates(pointOnRoute.point), this.route.getNextPoint());
            bearingRoute = this.getBearing(this.route.getFirstPoint(), this.route.getNextPoint());
        }

        // Calculate the distance we traveled on this step to give even more accurate Updates
        var distTraveled = this.getDistance(this.interactiveMap.map.transformToWorldCoordinates(pointOnRoute.point), this.route.getFirstPoint());
        if((this.route.route.routes[this.route.route.activeRoute].legs[0].distance - distTraveled - accuracy) <= 0){
            this.finishLeg();
            return;
        }

        var durTraveled = 0;
        if(this.route.route.routes[this.route.route.activeRoute].legs[0].distance !== 0){
            durTraveled = (this.route.route.routes[this.route.route.activeRoute].legs[0].duration / this.route.route.routes[this.route.route.activeRoute].legs[0].distance) * distTraveled;
        }
        // Update the Frequency when we are calculating the next Map Update
        this.frequency = this.calcFrequency(durTraveled);
        // We check for finish here too
        this.updateCurrentStep(distTraveled);
        this.updateRouteStats(distTraveled, durTraveled);
        this.printRoute(pointOnRoute.point);
        this.updateView(pointOnRoute.point, bearingGps);
        //updateNextStep(pointOnRoute.point, bearingGps, distTraveled, durTraveled);
        //redrawRoute(pointOnRoute.point);
    } else {
        // We need to recalculate but the user might have 
        // either a good internet connection, or no/a bad one
        // We need to do the right thing for each case to not confuse the user
        // We will start calculating a new Route now but will continue to accept new positions
        // If the user gets back on the correct route we will abort the retrieval of the new route and continue the navigation
        // If the new route gets downloaded we will replace it with the old one
        // If the download aborts with an error or with an timeout (10s) we will retry the download until success

        var pos = position.coords;
        pos = [parseFloat(pos.longitude), parseFloat(pos.latitude)];
        var pointString = "";
        $.each(this.route.route.waypoints, function(index, value) {
            if (index === 0) {
                // The first waypoint always is the gpsLocation
                pointString += pos.toString() + ";";
            } else {
                pointString += value.location.toString() + ";";
            }
        });
        pointString = pointString.replace(/;$/, '');

        var url = '/route/find/' + this.route.vehicle + '/' + pointString;

        // Let's check if we can submit a bearing for the starting point to generate a better route
        if(this.route.drivenRoute.coordinates.length >= 2){
            // We can calculate the current bearing. Let's do so:
            var bearing = this.getBearing(this.route.drivenRoute.coordinates[0], pos);
            bearing = Math.round(bearing);
            url += "/" + bearing;
        }

        // Change the Heading so that the user knows we're recalculating
        $("#navigation #next-step .image").html("");
        var message = '<img src="/img/ajax-loader.gif"></img> Neuberechnung...';
        if(this.routeLoadingerror != undefined && this.routeLoadingerror == true){
        	// We tried loading a new Route but it didn't succeed. We will inform the user about that fact
        	message += ' (<span class="glyphicon glyphicon-warning-sign" style="color:red;"></span> Netzwerkprobleme)';
        }
        $("#navigation #next-step .step-string").html(message);
        $("#navigation #next-step .step-length").html("");
        $("#navigation #next-step").css("background-color", "rgb(154,154,154)");
        // Also we will Update the User Position to the GPS Point and if available update the Bearing of the Map
        // That way the user will of course recognize that he is heading to the wrong direction
        this.updateUserPosition(this.interactiveMap.map.transformToMapCoordinates(pos));
        // We might have a Bearing based on the last two Position Updates in that case we will rotate the map
        if(this.interactiveMap.GpsManager.bearing != null){
        	this.updateMapView(this.interactiveMap.map.transformToMapCoordinates(pos), this.interactiveMap.GpsManager.bearing);
        }

        this.loadNewRoute(url, position);
    }
}

/*
* This function will try to retrieve a new Route
* Mostly this happens when the user has left the calculated Route
* This function won't load two new routes at the same time
* It'll try to download with a timeout of 10 seconds, after that the next Position update will trigger a new download 
* until one of it suceeds
*/
NavigationModule.prototype.loadNewRoute = function(url, position){

	if(this.routeRequest == undefined){
		var timeout = 10; // 10 seconds Timeout for this request
		$.ajax({
			url: url,
			dataType: 'json',
			success: $.proxy(function(response){
				this.routeLoadingerror = undefined;
				this.route.route = response;
				this.route.route.activeRoute = 0;
				this.route.legs = this.route.extractLegs();
				this.route.drivenRoute = {
			        coordinates: [this.route.getFirstPoint()],
			        type: "LineString"
			    };
				$("#navigation #next-step").css("background-color", "#ff8000");
	        	this.updateRouteStats();
	        	this.updateCurrentStep();
	        	// Update initially so that the new route is shown
	        	// Be safe and reset the last update time so it'll update now for sure
	        	this.lastUpdate = Date.now() - this.frequency - 1;
	        	this.newPosition(position);
				}, this),
			timeout: (timeout*1000),
			error: $.proxy(function(){
				this.routeLoadingerror = true;
			}, this)
		}).always($.proxy(function(){
			this.routeRequest = undefined;
		}, this));
	}
}


/*
* This Function updates the view of the map so that:
* 1. The given Point (in Map Coordinates) is in the center
* 2. The given Bearing is set
* The new rotation animation will take the shortest direction
*/
NavigationModule.prototype.updateMapView = function(point, bearing){
	// Point is given in Map Coordinates
	var rotation = bearing;
    rotation = 360 - rotation;
    // The Value needs to be in Radians
    rotation *= Math.PI;
    rotation /= 180;

    var fullRotation = 2 * Math.PI;
    var halfRotation = Math.PI;
    var a = rotation - this.interactiveMap.map.getView().getRotation() + halfRotation;
    var mod = (a % fullRotation + fullRotation) % fullRotation - halfRotation;
    var targetRotation = this.interactiveMap.map.getView().getRotation() + mod;
    this.interactiveMap.map.getView().animate({rotation: targetRotation, duration: 200}, $.proxy(function(){
        setTimeout($.proxy(function(){
            this.interactiveMap.map.getView().setRotation(((2* Math.PI) + (this.interactiveMap.map.getView().getRotation() % (2*Math.PI))) % (2 * Math.PI));
            var paddingTop = $("#navigation #next-step").outerHeight() + 50;
            var paddingBottom = $("#navigation #general-information").outerHeight() + 50;
            this.interactiveMap.map.getView().animate({center: point, duration: 600, padding: [paddingTop, 0, paddingBottom, 0]});
        }, this), 200);

    }, this));
}

NavigationModule.prototype.isBetween = function(point, p1, p2){
	// To determine if a point is on a route we compare min and max lat/lon values with the point
	var minLon = Math.min(p1[0], p2[0]);
	var maxLon = Math.max(p1[0], p2[0]);
	var minLat = Math.min(p1[1], p2[1]);
	var maxLat = Math.max(p1[1], p2[1]);

	if(point[0] >= minLon && point[0] <= maxLon && point[1] >= minLat && point[1] <= maxLat){
		return true;
	}else{
		return false;
	}
}

NavigationModule.prototype.updateView = function(point, bearing){
	// Point is given in Map Coordinates
	var rotation = bearing;
    rotation = 360 - rotation;
    // The Value needs to be in Radians
    rotation *= Math.PI;
    rotation /= 180;

    var limit = 3000; // How many meters are displayed at max
    var route = this.route.route.routes[this.route.route.activeRoute];
    var geojson = route.legs[0].steps[0].geometry;
    // Check whether the step is longer
	if(route.legs[0].steps[0].distance > limit){
	    // Darn we need to remove some of the step-points 
	    // Let's find out at which point we exceed the limit
	    var tmpDistance = 0;
	    var lastIndex = 1;
	    $.each(route.legs[0].annotation.distance, function(index, value){
	        if( (tmpDistance + value) < limit){
	            tmpDistance += value;
	        }else{
	            lastIndex = (index + 1);
	            return false;
	        }
	    });
	    geojson = {
	        coordinates : geojson.coordinates.slice(0,lastIndex),
	        type: "LineString"
	    }
	}
    var geom = (new ol.format.GeoJSON()).readGeometry(geojson, {
        'dataProjection' : 'EPSG:4326',
        'featureProjection' : 'EPSG:3857'
    });
    var fullRotation = 2 * Math.PI;
    var halfRotation = Math.PI;
    var a = rotation - this.interactiveMap.map.getView().getRotation() + halfRotation;
    var mod = (a % fullRotation + fullRotation) % fullRotation - halfRotation;
    var targetRotation = this.interactiveMap.map.getView().getRotation() + mod;
    this.interactiveMap.map.getView().animate({rotation: targetRotation, duration: 200}, $.proxy(function(){
        setTimeout($.proxy(function(){
            this.interactiveMap.map.getView().setRotation(((2* Math.PI) + (this.interactiveMap.map.getView().getRotation() % (2*Math.PI))) % (2 * Math.PI));
            var paddingTop = $("#navigation #next-step").outerHeight() + 50;
            var paddingBottom = $("#navigation #general-information").outerHeight() + 50;
            this.interactiveMap.map.getView().fit(geom, {duration: 600, padding: [paddingTop, 0, paddingBottom, 0]});
        }, this), 200);

    }, this));
}

/*
* This Function sets the rotation of the Map back to 0 with an animation
* It'll calculate the shortest rotation direction to do so.
*/
NavigationModule.prototype.normalizeView = function(){
	var fullRotation = 2 * Math.PI;
    var halfRotation = Math.PI;
    var a = 0 - this.interactiveMap.map.getView().getRotation() + halfRotation;
    var mod = (a % fullRotation + fullRotation) % fullRotation - halfRotation;
    var targetRotation = this.interactiveMap.map.getView().getRotation() + mod;
	this.interactiveMap.map.getView().animate({rotation: targetRotation, duration: 200}, $.proxy(function(){
	    setTimeout($.proxy(function(){
	            this.interactiveMap.map.getView().setRotation(((2* Math.PI) + (this.interactiveMap.map.getView().getRotation() % (2*Math.PI))) % (2 * Math.PI));
	    }, this), 200);
	}, this));
}

NavigationModule.prototype.printRoute = function(point){

	if(typeof this.vectorS != "undefined")
		this.vectorS.clear();
    
    
    // Geometry of the active route
    var  geojson = this.route.route.routes[this.route.route.activeRoute].geometry;
    var geojsonDriven = this.route.drivenRoute;
    if(typeof point != "undefined"){
	    var coordinates = geojson.coordinates.slice();

	    // We'll Add the user Position and the first Point of the current step to the driven Route
	    var coordinatesDrive = geojsonDriven.coordinates.slice();
	    coordinatesDrive.push(coordinates[0].slice());
	    coordinatesDrive.push(this.interactiveMap.map.transformToWorldCoordinates(point));
	    geojsonDriven.coordinates = coordinatesDrive;

	    coordinates[0] = this.interactiveMap.map.transformToWorldCoordinates(point);
	    geojson.coordinates = coordinates;

	}
	this.geom = (new ol.format.GeoJSON()).readGeometry(geojson, {
              	'dataProjection': 'EPSG:4326',
                'featureProjection': 'EPSG:3857'
            });
    // This is gonna be the main route
	var routeLineStyle = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'rgb(255,128,0)',
            width: 5
        }),
        fill: new ol.style.Fill({
            color: 'rgba(255,128,0,.03)'
        })
    });
    var feature = new ol.Feature({
        'geometry': this.geom
    });
    feature.setStyle(routeLineStyle);
    this.vectorS.addFeature(feature);

    if(geojsonDriven.coordinates.length > 1){
    	// Add the driven route, too
    	var geomDriven = (new ol.format.GeoJSON()).readGeometry(geojsonDriven, {
              	'dataProjection': 'EPSG:4326',
                'featureProjection': 'EPSG:3857'
            });
		var routeLineStyleDriven = new ol.style.Style({
	        stroke: new ol.style.Stroke({
	            color: 'rgb(199,199,199)',
	            width: 5
	        }),
	        fill: new ol.style.Fill({
	            color: 'rgba(199,199,199,.03)'
	        })
	    });
	    var featureDriven = new ol.Feature({
	    	'geometry': geomDriven
	    });
	    featureDriven.setStyle(routeLineStyleDriven);
	    this.vectorS.addFeature(featureDriven);
    }

    this.updateUserPosition(point);

    // Add the Waypoints (except the first one)
    if(typeof this.waypointsAdded == "undefined"){
    	$.each(this.route.waypoints, $.proxy(function(index, value){
    		if(index == 0) return 1;
    		this.interactiveMap.map.addOverlay(value.marker);
    	}, this));
    	this.waypointsAdded = true;
    }
}

NavigationModule.prototype.updateUserPosition = function(point){
	// Add the User Position
    if(typeof this.userPosOverlay == "undefined" || this.userPosOverlay == null){
        var el = $('<img src="/img/navigation-arrow.svg" width="30px" />');
        this.userPosOverlay = new ol.Overlay({
            position: point,
            element: el.get(0),
            offset: [-15, -15],
            stopEvent: false,
        });
        this.interactiveMap.map.addOverlay(this.userPosOverlay);
    }else{
    	// The User Position Overlay already exist lets update the position
    	this.userPosOverlay.setPosition(point);
    }
}

NavigationModule.prototype.calcFrequency= function(durTraveled){
    // We decide in which Frequency we gonna update the Map.
    // It depends of the duration the current step will take to Finish:
    // 1s   =>  The Last 15 Seconds of a step will be updated the most frequent
    // 2s   =>  Between 15-19 Seconds
    // 3s   =>  Between 19 and 24 Seconds
    // 4s   =>  Between 24 and 30 Seconds
    // 5s   =>  > 30 Seconds
    var route = this.route.route.routes[this.route.route.activeRoute];
    var duration = route.legs[0].steps[0].duration;
    duration -= durTraveled;
    if(duration < 15){
        return 1000;
    }else if(duration < 19){
        return 2000;
    }else if(duration < 24){
        return 3000;
    }else if(duration < 30){
        return 4000;
    }else{
        return 5000;
    }
}

NavigationModule.prototype.getBearing = function(p1, p2){
	// Takes to Points in World Coordinates and calculates the Bearing of the connection Line
    var p1r = [this.toRadians(p1[0]), this.toRadians(p1[1])];
    var p2r = [this.toRadians(p2[0]), this.toRadians(p2[1])];
    var x = Math.cos(p2r[1]) * Math.sin(p2r[0] - p1r[0]);
    var y = Math.cos(p1r[1]) * Math.sin(p2r[1]) - Math.sin(p1r[1]) * Math.cos(p2r[1]) * Math.cos(p2r[0] - p1r[0]);
    var bearing = Math.atan2(x, y);
    bearing = this.toDegrees(bearing);
    if(bearing < 0){
        bearing += 360;
    }
    return bearing;
}

NavigationModule.prototype.toRadians = function(angle) {
    return angle * (Math.PI / 180);
}

NavigationModule.prototype.toDegrees = function(radians) {
    return radians * 180 / Math.PI;
}

NavigationModule.prototype.getDistance = function(p1, p2){
	var wgs84Sphere = new ol.Sphere(6378137);
    return wgs84Sphere.haversineDistance(p1, p2);
}

NavigationModule.prototype.removeWaypoints = function(){
	if(typeof this.waypointsAdded != "undefined"){
    	$.each(this.route.waypoints, $.proxy(function(index, value){
    		if(index == 0) return 1;
    		this.interactiveMap.map.removeOverlay(value.marker);
    	}, this));
    	this.waypointsAdded = undefined;
    }
}

NavigationModule.prototype.removeUserPosition = function(){
	if(typeof this.userPosOverlay != "undefined"){
		this.interactiveMap.map.removeOverlay(this.userPosOverlay);
	}
}

NavigationModule.prototype.exit = function(){
	// If we're currently following the Location we need to disable that
	this.interactiveMap.GpsManager.stopWatch();
	// Hide the finish screen if visible
	$("#navigation .leg-finish").hide('slow');
	this.removeListeners();
	this.normalizeView();
	this.interactiveMap.map.removeLayer(this.vectorLayerRoutePreview);
	// Remove the Waypoints
    this.removeWaypoints();
    // Remove the User Position
    this.removeUserPosition();
    
	$(".ol-zoom, .ol-zoomslider").show();
	this.interactiveMap.GpsManager.toggleGpsLocator(true);
	$("#map .ol-scale-line, #map .ol-attribution").show();
	$("#navigation").hide('slow');
	$("#navigation #next-step").html("");
}
var map = null;
$(document).ready(function() {
	$(".inactive").hide();
    map = new InteractiveMap();

    var height = (typeof window.outerHeight != 'undefined')?Math.max(window.outerHeight, $(window).height()):$(window).height();

    $("div.map").css("max-height", height);
    $("body").css("max-height", height);
    $("body").css("overflow", "hidden");

    // Start the correct module now:
    if(typeof query != "undefined"){
    	map.switchModule("search", query);
        query = undefined;
    }else if(typeof waypoints != undefined && typeof vehicle != "undefined"){
        map.switchModule("route-finding", {waypoints: waypoints, vehicle: vehicle});
        waypoints = undefined;
        vehicle = undefined;
    }
    else
    	map.switchModule("search");

    map.enableGPSManager();
    if(typeof android != "undefined" && typeof android.pageFinished == "function") android.pageFinished();
});
//# sourceMappingURL=map.js.map
