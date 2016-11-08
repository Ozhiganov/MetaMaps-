// OpenLayers 3. See http://openlayers.org/
// License: https://raw.githubusercontent.com/openlayers/ol3/master/LICENSE.md
// Version: v3.5.0
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else if (typeof exports === "object") {
        module.exports = factory();
    } else {
        root.ol = factory();
    }
}(this, function() {
    var OPENLAYERS = {};
    var l, aa = aa || {},
        ba = this;

    function m(a) {
        return void 0 !== a
    }

    function v(a, c, d) {
        a = a.split(".");
        d = d || ba;
        a[0] in d || !d.execScript || d.execScript("var " + a[0]);
        for (var e; a.length && (e = a.shift());) !a.length && m(c) ? d[e] = c : d[e] ? d = d[e] : d = d[e] = {}
    }

    function ca() {}

    function da(a) {
        a.Ia = function() {
            return a.jg ? a.jg : a.jg = new a
        }
    }

    function ea(a) {
        var c = typeof a;
        if ("object" == c)
            if (a) {
                if (a instanceof Array) return "array";
                if (a instanceof Object) return c;
                var d = Object.prototype.toString.call(a);
                if ("[object Window]" == d) return "object";
                if ("[object Array]" == d || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";
                if ("[object Function]" == d || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function"
            } else return "null";
        else if ("function" == c && "undefined" == typeof a.call) return "object";
        return c
    }

    function fa(a) {
        return null === a
    }

    function ga(a) {
        return "array" == ea(a)
    }

    function ha(a) {
        var c = ea(a);
        return "array" == c || "object" == c && "number" == typeof a.length
    }

    function ia(a) {
        return "string" == typeof a
    }

    function ja(a) {
        return "number" == typeof a
    }

    function ka(a) {
        return "function" == ea(a)
    }

    function la(a) {
        var c = typeof a;
        return "object" == c && null != a || "function" == c
    }

    function ma(a) {
        return a[na] || (a[na] = ++oa)
    }
    var na = "closure_uid_" + (1E9 * Math.random() >>> 0),
        oa = 0;

    function pa(a, c, d) {
        return a.call.apply(a.bind, arguments)
    }

    function qa(a, c, d) {
        if (!a) throw Error();
        if (2 < arguments.length) {
            var e = Array.prototype.slice.call(arguments, 2);
            return function() {
                var d = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(d, e);
                return a.apply(c, d)
            }
        }
        return function() {
            return a.apply(c, arguments)
        }
    }

    function ra(a, c, d) {
        ra = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? pa : qa;
        return ra.apply(null, arguments)
    }

    function ta(a, c) {
        var d = Array.prototype.slice.call(arguments, 1);
        return function() {
            var c = d.slice();
            c.push.apply(c, arguments);
            return a.apply(this, c)
        }
    }
    var ua = Date.now || function() {
        return +new Date
    };

    function w(a, c) {
        function d() {}
        d.prototype = c.prototype;
        a.S = c.prototype;
        a.prototype = new d;
        a.prototype.constructor = a;
        a.Mo = function(a, d, g) {
            for (var h = Array(arguments.length - 2), k = 2; k < arguments.length; k++) h[k - 2] = arguments[k];
            return c.prototype[d].apply(a, h)
        }
    };
    var va, wa;

    function xa(a) {
        if (Error.captureStackTrace) Error.captureStackTrace(this, xa);
        else {
            var c = Error().stack;
            c && (this.stack = c)
        }
        a && (this.message = String(a))
    }
    w(xa, Error);
    xa.prototype.name = "CustomError";
    var ya;

    function Aa(a, c) {
        var d = a.length - c.length;
        return 0 <= d && a.indexOf(c, d) == d
    }

    function Ba(a, c) {
        for (var d = a.split("%s"), e = "", f = Array.prototype.slice.call(arguments, 1); f.length && 1 < d.length;) e += d.shift() + f.shift();
        return e + d.join("%s")
    }
    var Ca = String.prototype.trim ? function(a) {
        return a.trim()
    } : function(a) {
        return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
    };

    function Da(a) {
        if (!Ea.test(a)) return a; - 1 != a.indexOf("&") && (a = a.replace(Fa, "&amp;")); - 1 != a.indexOf("<") && (a = a.replace(Ha, "&lt;")); - 1 != a.indexOf(">") && (a = a.replace(Ia, "&gt;")); - 1 != a.indexOf('"') && (a = a.replace(Ja, "&quot;")); - 1 != a.indexOf("'") && (a = a.replace(Ka, "&#39;")); - 1 != a.indexOf("\x00") && (a = a.replace(La, "&#0;"));
        return a
    }
    var Fa = /&/g,
        Ha = /</g,
        Ia = />/g,
        Ja = /"/g,
        Ka = /'/g,
        La = /\x00/g,
        Ea = /[\x00&<>"']/;

    function Ma(a) {
        a = m(void 0) ? a.toFixed(void 0) : String(a);
        var c = a.indexOf("."); - 1 == c && (c = a.length);
        c = Math.max(0, 2 - c);
        return Array(c + 1).join("0") + a
    }

    function Na(a, c) {
        for (var d = 0, e = Ca(String(a)).split("."), f = Ca(String(c)).split("."), g = Math.max(e.length, f.length), h = 0; 0 == d && h < g; h++) {
            var k = e[h] || "",
                n = f[h] || "",
                p = RegExp("(\\d*)(\\D*)", "g"),
                q = RegExp("(\\d*)(\\D*)", "g");
            do {
                var r = p.exec(k) || ["", "", ""],
                    t = q.exec(n) || ["", "", ""];
                if (0 == r[0].length && 0 == t[0].length) break;
                d = Pa(0 == r[1].length ? 0 : parseInt(r[1], 10), 0 == t[1].length ? 0 : parseInt(t[1], 10)) || Pa(0 == r[2].length, 0 == t[2].length) || Pa(r[2], t[2])
            } while (0 == d)
        }
        return d
    }

    function Pa(a, c) {
        return a < c ? -1 : a > c ? 1 : 0
    };
    var Qa = Array.prototype;

    function Ra(a, c) {
        return Qa.indexOf.call(a, c, void 0)
    }

    function Sa(a, c, d) {
        Qa.forEach.call(a, c, d)
    }

    function Ta(a, c) {
        return Qa.filter.call(a, c, void 0)
    }

    function Ua(a, c, d) {
        return Qa.map.call(a, c, d)
    }

    function Va(a, c) {
        return Qa.some.call(a, c, void 0)
    }

    function Wa(a, c) {
        var d = Xa(a, c, void 0);
        return 0 > d ? null : ia(a) ? a.charAt(d) : a[d]
    }

    function Xa(a, c, d) {
        for (var e = a.length, f = ia(a) ? a.split("") : a, g = 0; g < e; g++)
            if (g in f && c.call(d, f[g], g, a)) return g;
        return -1
    }

    function Ya(a, c) {
        return 0 <= Ra(a, c)
    }

    function Za(a, c) {
        var d = Ra(a, c),
            e;
        (e = 0 <= d) && Qa.splice.call(a, d, 1);
        return e
    }

    function ab(a) {
        return Qa.concat.apply(Qa, arguments)
    }

    function bb(a) {
        var c = a.length;
        if (0 < c) {
            for (var d = Array(c), e = 0; e < c; e++) d[e] = a[e];
            return d
        }
        return []
    }

    function db(a, c) {
        for (var d = 1; d < arguments.length; d++) {
            var e = arguments[d];
            if (ha(e)) {
                var f = a.length || 0,
                    g = e.length || 0;
                a.length = f + g;
                for (var h = 0; h < g; h++) a[f + h] = e[h]
            } else a.push(e)
        }
    }

    function eb(a, c, d, e) {
        Qa.splice.apply(a, fb(arguments, 1))
    }

    function fb(a, c, d) {
        return 2 >= arguments.length ? Qa.slice.call(a, c) : Qa.slice.call(a, c, d)
    }

    function gb(a, c) {
        a.sort(c || hb)
    }

    function ib(a, c) {
        if (!ha(a) || !ha(c) || a.length != c.length) return !1;
        for (var d = a.length, e = jb, f = 0; f < d; f++)
            if (!e(a[f], c[f])) return !1;
        return !0
    }

    function hb(a, c) {
        return a > c ? 1 : a < c ? -1 : 0
    }

    function jb(a, c) {
        return a === c
    }

    function kb(a) {
        for (var c = [], d = 0; d < arguments.length; d++) {
            var e = arguments[d];
            if (ga(e))
                for (var f = 0; f < e.length; f += 8192)
                    for (var g = kb.apply(null, fb(e, f, f + 8192)), h = 0; h < g.length; h++) c.push(g[h]);
            else c.push(e)
        }
        return c
    };
    var lb;
    a: {
        var mb = ba.navigator;
        if (mb) {
            var nb = mb.userAgent;
            if (nb) {
                lb = nb;
                break a
            }
        }
        lb = ""
    }

    function ob(a) {
        return -1 != lb.indexOf(a)
    };

    function pb(a, c, d) {
        for (var e in a) c.call(d, a[e], e, a)
    }

    function qb(a, c) {
        for (var d in a)
            if (c.call(void 0, a[d], d, a)) return !0;
        return !1
    }

    function rb(a) {
        var c = 0,
            d;
        for (d in a) c++;
        return c
    }

    function sb(a) {
        var c = [],
            d = 0,
            e;
        for (e in a) c[d++] = a[e];
        return c
    }

    function tb(a) {
        var c = [],
            d = 0,
            e;
        for (e in a) c[d++] = e;
        return c
    }

    function ub(a, c) {
        return c in a
    }

    function vb(a, c) {
        for (var d in a)
            if (a[d] == c) return !0;
        return !1
    }

    function wb(a, c) {
        for (var d in a)
            if (c.call(void 0, a[d], d, a)) return d
    }

    function xb(a) {
        for (var c in a) return !1;
        return !0
    }

    function yb(a) {
        for (var c in a) delete a[c]
    }

    function zb(a, c) {
        c in a && delete a[c]
    }

    function Ab(a, c, d) {
        return c in a ? a[c] : d
    }

    function Cb(a, c) {
        var d = [];
        return c in a ? a[c] : a[c] = d
    }

    function Db(a) {
        var c = {},
            d;
        for (d in a) c[d] = a[d];
        return c
    }
    var Eb = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");

    function Fb(a, c) {
        for (var d, e, f = 1; f < arguments.length; f++) {
            e = arguments[f];
            for (d in e) a[d] = e[d];
            for (var g = 0; g < Eb.length; g++) d = Eb[g], Object.prototype.hasOwnProperty.call(e, d) && (a[d] = e[d])
        }
    }

    function Gb(a) {
        var c = arguments.length;
        if (1 == c && ga(arguments[0])) return Gb.apply(null, arguments[0]);
        for (var d = {}, e = 0; e < c; e++) d[arguments[e]] = !0;
        return d
    };
    var Hb = ob("Opera") || ob("OPR"),
        Ib = ob("Trident") || ob("MSIE"),
        Jb = ob("Gecko") && -1 == lb.toLowerCase().indexOf("webkit") && !(ob("Trident") || ob("MSIE")),
        Kb = -1 != lb.toLowerCase().indexOf("webkit"),
        Lb = ob("Macintosh"),
        Mb = ob("Windows"),
        Nb = ob("Linux") || ob("CrOS");

    function Ob() {
        var a = ba.document;
        return a ? a.documentMode : void 0
    }
    var Pb = function() {
            var a = "",
                c;
            if (Hb && ba.opera) return a = ba.opera.version, ka(a) ? a() : a;
            Jb ? c = /rv\:([^\);]+)(\)|;)/ : Ib ? c = /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/ : Kb && (c = /WebKit\/(\S+)/);
            c && (a = (a = c.exec(lb)) ? a[1] : "");
            return Ib && (c = Ob(), c > parseFloat(a)) ? String(c) : a
        }(),
        Qb = {};

    function Rb(a) {
        return Qb[a] || (Qb[a] = 0 <= Na(Pb, a))
    }
    var Sb = ba.document,
        Tb = Sb && Ib ? Ob() || ("CSS1Compat" == Sb.compatMode ? parseInt(Pb, 10) : 5) : void 0;
    var Ub = Ib && !Rb("9.0") && "" !== Pb;

    function Vb(a, c, d) {
        return Math.min(Math.max(a, c), d)
    }

    function Wb(a, c) {
        var d = a % c;
        return 0 > d * c ? d + c : d
    }

    function Xb(a, c, d) {
        return a + d * (c - a)
    }

    function Yb(a) {
        return a * Math.PI / 180
    };

    function Zb(a) {
        return function(c) {
            if (m(c)) return [Vb(c[0], a[0], a[2]), Vb(c[1], a[1], a[3])]
        }
    }

    function $b(a) {
        return a
    };

    function ac(a, c, d) {
        var e = a.length;
        if (a[0] <= c) return 0;
        if (!(c <= a[e - 1]))
            if (0 < d)
                for (d = 1; d < e; ++d) {
                    if (a[d] < c) return d - 1
                } else if (0 > d)
                    for (d = 1; d < e; ++d) {
                        if (a[d] <= c) return d
                    } else
                        for (d = 1; d < e; ++d) {
                            if (a[d] == c) return d;
                            if (a[d] < c) return a[d - 1] - c < c - a[d] ? d - 1 : d
                        }
        return e - 1
    };

    function bc(a) {
        return function(c, d, e) {
            if (m(c)) return c = ac(a, c, e), c = Vb(c + d, 0, a.length - 1), a[c]
        }
    }

    function cc(a, c, d) {
        return function(e, f, g) {
            if (m(e)) return g = 0 < g ? 0 : 0 > g ? 1 : .5, e = Math.floor(Math.log(c / e) / Math.log(a) + g), f = Math.max(e + f, 0), m(d) && (f = Math.min(f, d)), c / Math.pow(a, f)
        }
    };

    function dc(a) {
        if (m(a)) return 0
    }

    function ec(a, c) {
        if (m(a)) return a + c
    }

    function fc(a) {
        var c = 2 * Math.PI / a;
        return function(a, e) {
            if (m(a)) return a = Math.floor((a + e) / c + .5) * c
        }
    }

    function gc() {
        var a = Yb(5);
        return function(c, d) {
            if (m(c)) return Math.abs(c + d) <= a ? 0 : c + d
        }
    };

    function hc(a, c, d) {
        this.center = a;
        this.resolution = c;
        this.rotation = d
    };
    var ic = !Ib || Ib && 9 <= Tb,
        jc = !Ib || Ib && 9 <= Tb,
        kc = Ib && !Rb("9");
    !Kb || Rb("528");
    Jb && Rb("1.9b") || Ib && Rb("8") || Hb && Rb("9.5") || Kb && Rb("528");
    Jb && !Rb("8") || Ib && Rb("9");

    function mc() {
        0 != nc && (oc[ma(this)] = this);
        this.U = this.U;
        this.V = this.V
    }
    var nc = 0,
        oc = {};
    mc.prototype.U = !1;
    mc.prototype.Yc = function() {
        if (!this.U && (this.U = !0, this.O(), 0 != nc)) {
            var a = ma(this);
            delete oc[a]
        }
    };

    function pc(a, c) {
        var d = ta(qc, c);
        a.U ? d.call(void 0) : (a.V || (a.V = []), a.V.push(m(void 0) ? ra(d, void 0) : d))
    }
    mc.prototype.O = function() {
        if (this.V)
            for (; this.V.length;) this.V.shift()()
    };

    function qc(a) {
        a && "function" == typeof a.Yc && a.Yc()
    };

    function rc(a, c) {
        this.type = a;
        this.c = this.target = c;
        this.f = !1;
        this.rh = !0
    }
    rc.prototype.fb = function() {
        this.f = !0
    };
    rc.prototype.preventDefault = function() {
        this.rh = !1
    };

    function sc(a) {
        a.fb()
    }

    function tc(a) {
        a.preventDefault()
    };
    var uc = Ib ? "focusout" : "DOMFocusOut";

    function vc(a) {
        vc[" "](a);
        return a
    }
    vc[" "] = ca;

    function wc(a, c) {
        rc.call(this, a ? a.type : "");
        this.relatedTarget = this.c = this.target = null;
        this.q = this.e = this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0;
        this.l = this.d = this.a = this.i = !1;
        this.state = null;
        this.g = !1;
        this.b = null;
        a && xc(this, a, c)
    }
    w(wc, rc);
    var yc = [1, 4, 2];

    function xc(a, c, d) {
        a.b = c;
        var e = a.type = c.type;
        a.target = c.target || c.srcElement;
        a.c = d;
        if (d = c.relatedTarget) {
            if (Jb) {
                var f;
                a: {
                    try {
                        vc(d.nodeName);
                        f = !0;
                        break a
                    } catch (g) {}
                    f = !1
                }
                f || (d = null)
            }
        } else "mouseover" == e ? d = c.fromElement : "mouseout" == e && (d = c.toElement);
        a.relatedTarget = d;
        Object.defineProperties ? Object.defineProperties(a, {
            offsetX: {
                configurable: !0,
                enumerable: !0,
                get: a.Zf,
                set: a.bo
            },
            offsetY: {
                configurable: !0,
                enumerable: !0,
                get: a.$f,
                set: a.co
            }
        }) : (a.offsetX = a.Zf(), a.offsetY = a.$f());
        a.clientX = void 0 !== c.clientX ? c.clientX : c.pageX;
        a.clientY = void 0 !== c.clientY ? c.clientY : c.pageY;
        a.screenX = c.screenX || 0;
        a.screenY = c.screenY || 0;
        a.button = c.button;
        a.e = c.keyCode || 0;
        a.q = c.charCode || ("keypress" == e ? c.keyCode : 0);
        a.i = c.ctrlKey;
        a.a = c.altKey;
        a.d = c.shiftKey;
        a.l = c.metaKey;
        a.g = Lb ? c.metaKey : c.ctrlKey;
        a.state = c.state;
        c.defaultPrevented && a.preventDefault()
    }

    function zc(a) {
        return (ic ? 0 == a.b.button : "click" == a.type ? !0 : !!(a.b.button & yc[0])) && !(Kb && Lb && a.i)
    }
    l = wc.prototype;
    l.fb = function() {
        wc.S.fb.call(this);
        this.b.stopPropagation ? this.b.stopPropagation() : this.b.cancelBubble = !0
    };
    l.preventDefault = function() {
        wc.S.preventDefault.call(this);
        var a = this.b;
        if (a.preventDefault) {} //a.preventDefault();
        else if (a.returnValue = !1, kc) try {
            if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) a.keyCode = -1
        } catch (c) {}
    };
    l.Qi = function() {
        return this.b
    };
    l.Zf = function() {
        return Kb || void 0 !== this.b.offsetX ? this.b.offsetX : this.b.layerX
    };
    l.bo = function(a) {
        Object.defineProperties(this, {
            offsetX: {
                writable: !0,
                enumerable: !0,
                configurable: !0,
                value: a
            }
        })
    };
    l.$f = function() {
        return Kb || void 0 !== this.b.offsetY ? this.b.offsetY : this.b.layerY
    };
    l.co = function(a) {
        Object.defineProperties(this, {
            offsetY: {
                writable: !0,
                enumerable: !0,
                configurable: !0,
                value: a
            }
        })
    };
    var Ac = "closure_listenable_" + (1E6 * Math.random() | 0);

    function Bc(a) {
        return !(!a || !a[Ac])
    }
    var Cc = 0;

    function Dc(a, c, d, e, f) {
        this.$b = a;
        this.b = null;
        this.src = c;
        this.type = d;
        this.Qc = !!e;
        this.Sd = f;
        this.key = ++Cc;
        this.Hc = this.vd = !1
    }

    function Ec(a) {
        a.Hc = !0;
        a.$b = null;
        a.b = null;
        a.src = null;
        a.Sd = null
    };

    function Fc(a) {
        this.src = a;
        this.b = {};
        this.a = 0
    }
    Fc.prototype.add = function(a, c, d, e, f) {
        var g = a.toString();
        a = this.b[g];
        a || (a = this.b[g] = [], this.a++);
        var h = Gc(a, c, e, f); - 1 < h ? (c = a[h], d || (c.vd = !1)) : (c = new Dc(c, this.src, g, !!e, f), c.vd = d, a.push(c));
        return c
    };
    Fc.prototype.remove = function(a, c, d, e) {
        a = a.toString();
        if (!(a in this.b)) return !1;
        var f = this.b[a];
        c = Gc(f, c, d, e);
        return -1 < c ? (Ec(f[c]), Qa.splice.call(f, c, 1), 0 == f.length && (delete this.b[a], this.a--), !0) : !1
    };

    function Hc(a, c) {
        var d = c.type;
        if (!(d in a.b)) return !1;
        var e = Za(a.b[d], c);
        e && (Ec(c), 0 == a.b[d].length && (delete a.b[d], a.a--));
        return e
    }

    function Jc(a, c, d, e, f) {
        a = a.b[c.toString()];
        c = -1;
        a && (c = Gc(a, d, e, f));
        return -1 < c ? a[c] : null
    }

    function Kc(a, c, d) {
        var e = m(c),
            f = e ? c.toString() : "",
            g = m(d);
        return qb(a.b, function(a) {
            for (var c = 0; c < a.length; ++c)
                if (!(e && a[c].type != f || g && a[c].Qc != d)) return !0;
            return !1
        })
    }

    function Gc(a, c, d, e) {
        for (var f = 0; f < a.length; ++f) {
            var g = a[f];
            if (!g.Hc && g.$b == c && g.Qc == !!d && g.Sd == e) return f
        }
        return -1
    };
    var Lc = "closure_lm_" + (1E6 * Math.random() | 0),
        Mc = {},
        Nc = 0;

    function x(a, c, d, e, f) {
        if (ga(c)) {
            for (var g = 0; g < c.length; g++) x(a, c[g], d, e, f);
            return null
        }
        d = Oc(d);
        return Bc(a) ? a.Ka(c, d, e, f) : Pc(a, c, d, !1, e, f)
    }

    function Pc(a, c, d, e, f, g) {
        if (!c) throw Error("Invalid event type");
        var h = !!f,
            k = Qc(a);
        k || (a[Lc] = k = new Fc(a));
        d = k.add(c, d, e, f, g);
        if (d.b) return d;
        e = Rc();
        d.b = e;
        e.src = a;
        e.$b = d;
        a.addEventListener ? a.addEventListener(c.toString(), e, h) : a.attachEvent(Sc(c.toString()), e);
        Nc++;
        return d
    }

    function Rc() {
        var a = Tc,
            c = jc ? function(d) {
                return a.call(c.src, c.$b, d)
            } : function(d) {
                d = a.call(c.src, c.$b, d);
                if (!d) return d
            };
        return c
    }

    function Uc(a, c, d, e, f) {
        if (ga(c)) {
            for (var g = 0; g < c.length; g++) Uc(a, c[g], d, e, f);
            return null
        }
        d = Oc(d);
        return Bc(a) ? a.ab.add(String(c), d, !0, e, f) : Pc(a, c, d, !0, e, f)
    }

    function Vc(a, c, d, e, f) {
        if (ga(c))
            for (var g = 0; g < c.length; g++) Vc(a, c[g], d, e, f);
        else d = Oc(d), Bc(a) ? a.wf(c, d, e, f) : a && (a = Qc(a)) && (c = Jc(a, c, d, !!e, f)) && Wc(c)
    }

    function Wc(a) {
        if (ja(a) || !a || a.Hc) return !1;
        var c = a.src;
        if (Bc(c)) return Hc(c.ab, a);
        var d = a.type,
            e = a.b;
        c.removeEventListener ? c.removeEventListener(d, e, a.Qc) : c.detachEvent && c.detachEvent(Sc(d), e);
        Nc--;
        (d = Qc(c)) ? (Hc(d, a), 0 == d.a && (d.src = null, c[Lc] = null)) : Ec(a);
        return !0
    }

    function Sc(a) {
        return a in Mc ? Mc[a] : Mc[a] = "on" + a
    }

    function Xc(a, c, d, e) {
        var f = !0;
        if (a = Qc(a))
            if (c = a.b[c.toString()])
                for (c = c.concat(), a = 0; a < c.length; a++) {
                    var g = c[a];
                    g && g.Qc == d && !g.Hc && (g = Yc(g, e), f = f && !1 !== g)
                }
        return f
    }

    function Yc(a, c) {
        var d = a.$b,
            e = a.Sd || a.src;
        a.vd && Wc(a);
        return d.call(e, c)
    }

    function Tc(a, c) {
        if (a.Hc) return !0;
        if (!jc) {
            var d;
            if (!(d = c)) a: {
                d = ["window", "event"];
                for (var e = ba, f; f = d.shift();)
                    if (null != e[f]) e = e[f];
                    else {
                        d = null;
                        break a
                    }
                d = e
            }
            f = d;
            d = new wc(f, this);
            e = !0;
            if (!(0 > f.keyCode || void 0 != f.returnValue)) {
                a: {
                    var g = !1;
                    if (0 == f.keyCode) try {
                        f.keyCode = -1;
                        break a
                    } catch (h) {
                        g = !0
                    }
                    if (g || void 0 == f.returnValue) f.returnValue = !0
                }
                f = [];
                for (g = d.c; g; g = g.parentNode) f.push(g);
                for (var g = a.type, k = f.length - 1; !d.f && 0 <= k; k--) {
                    d.c = f[k];
                    var n = Xc(f[k], g, !0, d),
                        e = e && n
                }
                for (k = 0; !d.f && k < f.length; k++) d.c = f[k],
                n = Xc(f[k], g, !1, d),
                e = e && n
            }
            return e
        }
        return Yc(a, new wc(c, this))
    }

    function Qc(a) {
        a = a[Lc];
        return a instanceof Fc ? a : null
    }
    var Zc = "__closure_events_fn_" + (1E9 * Math.random() >>> 0);

    function Oc(a) {
        if (ka(a)) return a;
        a[Zc] || (a[Zc] = function(c) {
            return a.handleEvent(c)
        });
        return a[Zc]
    };

    function $c() {
        mc.call(this);
        this.ab = new Fc(this);
        this.rc = this;
        this.sa = null
    }
    w($c, mc);
    $c.prototype[Ac] = !0;
    l = $c.prototype;
    l.addEventListener = function(a, c, d, e) {
        x(this, a, c, d, e)
    };
    l.removeEventListener = function(a, c, d, e) {
        Vc(this, a, c, d, e)
    };
    l.dispatchEvent = function(a) {
        var c, d = this.sa;
        if (d)
            for (c = []; d; d = d.sa) c.push(d);
        var d = this.rc,
            e = a.type || a;
        if (ia(a)) a = new rc(a, d);
        else if (a instanceof rc) a.target = a.target || d;
        else {
            var f = a;
            a = new rc(e, d);
            Fb(a, f)
        }
        var f = !0,
            g;
        if (c)
            for (var h = c.length - 1; !a.f && 0 <= h; h--) g = a.c = c[h], f = ad(g, e, !0, a) && f;
        a.f || (g = a.c = d, f = ad(g, e, !0, a) && f, a.f || (f = ad(g, e, !1, a) && f));
        if (c)
            for (h = 0; !a.f && h < c.length; h++) g = a.c = c[h], f = ad(g, e, !1, a) && f;
        return f
    };
    l.O = function() {
        $c.S.O.call(this);
        if (this.ab) {
            var a = this.ab,
                c = 0,
                d;
            for (d in a.b) {
                for (var e = a.b[d], f = 0; f < e.length; f++) ++c, Ec(e[f]);
                delete a.b[d];
                a.a--
            }
        }
        this.sa = null
    };
    l.Ka = function(a, c, d, e) {
        return this.ab.add(String(a), c, !1, d, e)
    };
    l.wf = function(a, c, d, e) {
        return this.ab.remove(String(a), c, d, e)
    };

    function ad(a, c, d, e) {
        c = a.ab.b[String(c)];
        if (!c) return !0;
        c = c.concat();
        for (var f = !0, g = 0; g < c.length; ++g) {
            var h = c[g];
            if (h && !h.Hc && h.Qc == d) {
                var k = h.$b,
                    n = h.Sd || h.src;
                h.vd && Hc(a.ab, h);
                f = !1 !== k.call(n, e) && f
            }
        }
        return f && 0 != e.rh
    }

    function bd(a, c, d) {
        return Kc(a.ab, m(c) ? String(c) : void 0, d)
    };

    function cd() {
        $c.call(this);
        this.b = 0
    }
    w(cd, $c);

    function dd(a) {
        Wc(a)
    }
    l = cd.prototype;
    l.k = function() {
        ++this.b;
        this.dispatchEvent("change")
    };
    l.v = function() {
        return this.b
    };
    l.r = function(a, c, d) {
        return x(this, a, c, !1, d)
    };
    l.A = function(a, c, d) {
        return Uc(this, a, c, !1, d)
    };
    l.u = function(a, c, d) {
        Vc(this, a, c, !1, d)
    };
    l.B = dd;

    function ed(a, c, d) {
        rc.call(this, a);
        this.key = c;
        this.oldValue = d
    }
    w(ed, rc);

    function fd(a) {
        cd.call(this);
        ma(this);
        this.q = {};
        m(a) && this.t(a)
    }
    w(fd, cd);
    var gd = {};

    function hd(a) {
        return gd.hasOwnProperty(a) ? gd[a] : gd[a] = "change:" + a
    }
    l = fd.prototype;
    l.get = function(a) {
        var c;
        this.q.hasOwnProperty(a) && (c = this.q[a]);
        return c
    };
    l.C = function() {
        return tb(this.q)
    };
    l.D = function() {
        var a = {},
            c;
        for (c in this.q) a[c] = this.q[c];
        return a
    };

    function id(a, c, d) {
        var e;
        e = hd(c);
        a.dispatchEvent(new ed(e, c, d));
        a.dispatchEvent(new ed("propertychange", c, d))
    }
    l.set = function(a, c) {
        var d = this.q[a];
        this.q[a] = c;
        id(this, a, d)
    };
    l.t = function(a) {
        for (var c in a) this.set(c, a[c])
    };
    l.I = function(a) {
        if (a in this.q) {
            var c = this.q[a];
            delete this.q[a];
            id(this, a, c)
        }
    };

    function jd(a, c, d) {
        m(d) || (d = [0, 0]);
        d[0] = a[0] + 2 * c;
        d[1] = a[1] + 2 * c;
        return d
    }

    function kd(a, c, d) {
        m(d) || (d = [0, 0]);
        d[0] = a[0] * c + .5 | 0;
        d[1] = a[1] * c + .5 | 0;
        return d
    }

    function ld(a, c) {
        if (ga(a)) return a;
        m(c) ? (c[0] = a, c[1] = a) : c = [a, a];
        return c
    };

    function md(a, c) {
        a[0] += c[0];
        a[1] += c[1];
        return a
    }

    function nd(a, c) {
        var d = a[0],
            e = a[1],
            f = c[0],
            g = c[1],
            h = f[0],
            f = f[1],
            k = g[0],
            g = g[1],
            n = k - h,
            p = g - f,
            d = 0 === n && 0 === p ? 0 : (n * (d - h) + p * (e - f)) / (n * n + p * p || 0);
        0 >= d || (1 <= d ? (h = k, f = g) : (h += d * n, f += d * p));
        return [h, f]
    }

    function od(a, c) {
        var d = Wb(a + 180, 360) - 180,
            e = Math.abs(Math.round(3600 * d));
        return Math.floor(e / 3600) + "\u00b0 " + Math.floor(e / 60 % 60) + "\u2032 " + Math.floor(e % 60) + "\u2033 " + c.charAt(0 > d ? 1 : 0)
    }

    function pd(a, c, d) {
        return m(a) ? c.replace("{x}", a[0].toFixed(d)).replace("{y}", a[1].toFixed(d)) : ""
    }

    function qd(a, c) {
        for (var d = !0, e = a.length - 1; 0 <= e; --e)
            if (a[e] != c[e]) {
                d = !1;
                break
            }
        return d
    }

    function rd(a, c) {
        var d = Math.cos(c),
            e = Math.sin(c),
            f = a[1] * d + a[0] * e;
        a[0] = a[0] * d - a[1] * e;
        a[1] = f;
        return a
    }

    function sd(a, c) {
        var d = a[0] - c[0],
            e = a[1] - c[1];
        return d * d + e * e
    }

    function td(a, c) {
        return sd(a, nd(a, c))
    }

    function ud(a, c) {
        return pd(a, "{x}, {y}", c)
    };

    function vd(a) {
        this.length = a.length || a;
        for (var c = 0; c < this.length; c++) this[c] = a[c] || 0
    }
    vd.prototype.b = 4;
    vd.prototype.set = function(a, c) {
        c = c || 0;
        for (var d = 0; d < a.length && c + d < this.length; d++) this[c + d] = a[d]
    };
    vd.prototype.toString = Array.prototype.join;
    "undefined" == typeof Float32Array && (vd.BYTES_PER_ELEMENT = 4, vd.prototype.BYTES_PER_ELEMENT = vd.prototype.b, vd.prototype.set = vd.prototype.set, vd.prototype.toString = vd.prototype.toString, v("Float32Array", vd, void 0));

    function wd(a) {
        this.length = a.length || a;
        for (var c = 0; c < this.length; c++) this[c] = a[c] || 0
    }
    wd.prototype.b = 8;
    wd.prototype.set = function(a, c) {
        c = c || 0;
        for (var d = 0; d < a.length && c + d < this.length; d++) this[c + d] = a[d]
    };
    wd.prototype.toString = Array.prototype.join;
    if ("undefined" == typeof Float64Array) {
        try {
            wd.BYTES_PER_ELEMENT = 8
        } catch (xd) {}
        wd.prototype.BYTES_PER_ELEMENT = wd.prototype.b;
        wd.prototype.set = wd.prototype.set;
        wd.prototype.toString = wd.prototype.toString;
        v("Float64Array", wd, void 0)
    };

    function yd(a, c, d, e, f) {
        a[0] = c;
        a[1] = d;
        a[2] = e;
        a[3] = f
    };

    function zd() {
        var a = Array(16);
        Ad(a, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        return a
    }

    function Bd() {
        var a = Array(16);
        Ad(a, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        return a
    }

    function Ad(a, c, d, e, f, g, h, k, n, p, q, r, t, u, A, z, D) {
        a[0] = c;
        a[1] = d;
        a[2] = e;
        a[3] = f;
        a[4] = g;
        a[5] = h;
        a[6] = k;
        a[7] = n;
        a[8] = p;
        a[9] = q;
        a[10] = r;
        a[11] = t;
        a[12] = u;
        a[13] = A;
        a[14] = z;
        a[15] = D
    }

    function Cd(a, c) {
        a[0] = c[0];
        a[1] = c[1];
        a[2] = c[2];
        a[3] = c[3];
        a[4] = c[4];
        a[5] = c[5];
        a[6] = c[6];
        a[7] = c[7];
        a[8] = c[8];
        a[9] = c[9];
        a[10] = c[10];
        a[11] = c[11];
        a[12] = c[12];
        a[13] = c[13];
        a[14] = c[14];
        a[15] = c[15]
    }

    function Dd(a) {
        a[0] = 1;
        a[1] = 0;
        a[2] = 0;
        a[3] = 0;
        a[4] = 0;
        a[5] = 1;
        a[6] = 0;
        a[7] = 0;
        a[8] = 0;
        a[9] = 0;
        a[10] = 1;
        a[11] = 0;
        a[12] = 0;
        a[13] = 0;
        a[14] = 0;
        a[15] = 1
    }

    function Ed(a, c, d) {
        var e = a[0],
            f = a[1],
            g = a[2],
            h = a[3],
            k = a[4],
            n = a[5],
            p = a[6],
            q = a[7],
            r = a[8],
            t = a[9],
            u = a[10],
            A = a[11],
            z = a[12],
            D = a[13],
            B = a[14];
        a = a[15];
        var y = c[0],
            K = c[1],
            J = c[2],
            H = c[3],
            P = c[4],
            sa = c[5],
            Oa = c[6],
            N = c[7],
            za = c[8],
            cb = c[9],
            Ga = c[10],
            Bb = c[11],
            $a = c[12],
            Ic = c[13],
            lc = c[14];
        c = c[15];
        d[0] = e * y + k * K + r * J + z * H;
        d[1] = f * y + n * K + t * J + D * H;
        d[2] = g * y + p * K + u * J + B * H;
        d[3] = h * y + q * K + A * J + a * H;
        d[4] = e * P + k * sa + r * Oa + z * N;
        d[5] = f * P + n * sa + t * Oa + D * N;
        d[6] = g * P + p * sa + u * Oa + B * N;
        d[7] = h * P + q * sa + A * Oa + a * N;
        d[8] = e * za + k * cb + r * Ga + z * Bb;
        d[9] = f * za + n * cb + t * Ga + D * Bb;
        d[10] = g * za + p * cb + u * Ga + B * Bb;
        d[11] = h * za + q * cb + A * Ga + a * Bb;
        d[12] = e * $a + k * Ic + r * lc + z * c;
        d[13] = f * $a + n * Ic + t * lc + D * c;
        d[14] = g * $a + p * Ic + u * lc + B * c;
        d[15] = h * $a + q * Ic + A * lc + a * c
    }

    function Fd(a, c) {
        var d = a[0],
            e = a[1],
            f = a[2],
            g = a[3],
            h = a[4],
            k = a[5],
            n = a[6],
            p = a[7],
            q = a[8],
            r = a[9],
            t = a[10],
            u = a[11],
            A = a[12],
            z = a[13],
            D = a[14],
            B = a[15],
            y = d * k - e * h,
            K = d * n - f * h,
            J = d * p - g * h,
            H = e * n - f * k,
            P = e * p - g * k,
            sa = f * p - g * n,
            Oa = q * z - r * A,
            N = q * D - t * A,
            za = q * B - u * A,
            cb = r * D - t * z,
            Ga = r * B - u * z,
            Bb = t * B - u * D,
            $a = y * Bb - K * Ga + J * cb + H * za - P * N + sa * Oa;
        0 != $a && ($a = 1 / $a, c[0] = (k * Bb - n * Ga + p * cb) * $a, c[1] = (-e * Bb + f * Ga - g * cb) * $a, c[2] = (z * sa - D * P + B * H) * $a, c[3] = (-r * sa + t * P - u * H) * $a, c[4] = (-h * Bb + n * za - p * N) * $a, c[5] = (d * Bb - f * za + g * N) * $a, c[6] = (-A * sa + D * J - B * K) * $a, c[7] = (q * sa - t * J + u * K) * $a, c[8] = (h * Ga - k * za + p * Oa) * $a, c[9] = (-d * Ga + e * za - g * Oa) * $a, c[10] = (A * P - z * J + B * y) * $a, c[11] = (-q * P + r * J - u * y) * $a, c[12] = (-h * cb + k * N - n * Oa) * $a, c[13] = (d * cb - e * N + f * Oa) * $a, c[14] = (-A * H + z * K - D * y) * $a, c[15] = (q * H - r * K + t * y) * $a)
    }

    function Gd(a, c, d) {
        var e = a[1] * c + a[5] * d + 0 * a[9] + a[13],
            f = a[2] * c + a[6] * d + 0 * a[10] + a[14],
            g = a[3] * c + a[7] * d + 0 * a[11] + a[15];
        a[12] = a[0] * c + a[4] * d + 0 * a[8] + a[12];
        a[13] = e;
        a[14] = f;
        a[15] = g
    }

    function Hd(a, c, d) {
        Ad(a, a[0] * c, a[1] * c, a[2] * c, a[3] * c, a[4] * d, a[5] * d, a[6] * d, a[7] * d, 1 * a[8], 1 * a[9], 1 * a[10], 1 * a[11], a[12], a[13], a[14], a[15])
    }

    function Id(a, c) {
        var d = a[0],
            e = a[1],
            f = a[2],
            g = a[3],
            h = a[4],
            k = a[5],
            n = a[6],
            p = a[7],
            q = Math.cos(c),
            r = Math.sin(c);
        a[0] = d * q + h * r;
        a[1] = e * q + k * r;
        a[2] = f * q + n * r;
        a[3] = g * q + p * r;
        a[4] = d * -r + h * q;
        a[5] = e * -r + k * q;
        a[6] = f * -r + n * q;
        a[7] = g * -r + p * q
    }
    new Float64Array(3);
    new Float64Array(3);
    new Float64Array(4);
    new Float64Array(4);
    new Float64Array(4);
    new Float64Array(16);

    function Jd(a) {
        for (var c = Kd(), d = 0, e = a.length; d < e; ++d) Ld(c, a[d]);
        return c
    }

    function Md(a, c, d) {
        var e = Math.min.apply(null, a),
            f = Math.min.apply(null, c);
        a = Math.max.apply(null, a);
        c = Math.max.apply(null, c);
        return Nd(e, f, a, c, d)
    }

    function Od(a, c, d) {
        return m(d) ? (d[0] = a[0] - c, d[1] = a[1] - c, d[2] = a[2] + c, d[3] = a[3] + c, d) : [a[0] - c, a[1] - c, a[2] + c, a[3] + c]
    }

    function Pd(a, c) {
        return m(c) ? (c[0] = a[0], c[1] = a[1], c[2] = a[2], c[3] = a[3], c) : a.slice()
    }

    function Qd(a, c, d) {
        c = c < a[0] ? a[0] - c : a[2] < c ? c - a[2] : 0;
        a = d < a[1] ? a[1] - d : a[3] < d ? d - a[3] : 0;
        return c * c + a * a
    }

    function Rd(a, c) {
        return a[0] <= c[0] && c[2] <= a[2] && a[1] <= c[1] && c[3] <= a[3]
    }

    function Sd(a, c, d) {
        return a[0] <= c && c <= a[2] && a[1] <= d && d <= a[3]
    }

    function Td(a, c) {
        var d = a[1],
            e = a[2],
            f = a[3],
            g = c[0],
            h = c[1],
            k = 0;
        g < a[0] ? k = k | 16 : g > e && (k = k | 4);
        h < d ? k |= 8 : h > f && (k |= 2);
        0 === k && (k = 1);
        return k
    }

    function Kd() {
        return [Infinity, Infinity, -Infinity, -Infinity]
    }

    function Nd(a, c, d, e, f) {
        return m(f) ? (f[0] = a, f[1] = c, f[2] = d, f[3] = e, f) : [a, c, d, e]
    }

    function Ud(a, c) {
        var d = a[0],
            e = a[1];
        return Nd(d, e, d, e, c)
    }

    function Vd(a, c) {
        return a[0] == c[0] && a[2] == c[2] && a[1] == c[1] && a[3] == c[3]
    }

    function Wd(a, c) {
        c[0] < a[0] && (a[0] = c[0]);
        c[2] > a[2] && (a[2] = c[2]);
        c[1] < a[1] && (a[1] = c[1]);
        c[3] > a[3] && (a[3] = c[3]);
        return a
    }

    function Ld(a, c) {
        c[0] < a[0] && (a[0] = c[0]);
        c[0] > a[2] && (a[2] = c[0]);
        c[1] < a[1] && (a[1] = c[1]);
        c[1] > a[3] && (a[3] = c[1])
    }

    function Xd(a, c, d, e, f) {
        for (; d < e; d += f) {
            var g = a,
                h = c[d],
                k = c[d + 1];
            g[0] = Math.min(g[0], h);
            g[1] = Math.min(g[1], k);
            g[2] = Math.max(g[2], h);
            g[3] = Math.max(g[3], k)
        }
        return a
    }

    function Yd(a, c) {
        var d;
        return (d = c.call(void 0, Zd(a))) || (d = c.call(void 0, $d(a))) || (d = c.call(void 0, ae(a))) ? d : (d = c.call(void 0, be(a))) ? d : !1
    }

    function Zd(a) {
        return [a[0], a[1]]
    }

    function $d(a) {
        return [a[2], a[1]]
    }

    function ce(a) {
        return [(a[0] + a[2]) / 2, (a[1] + a[3]) / 2]
    }

    function de(a, c) {
        var d;
        "bottom-left" === c ? d = Zd(a) : "bottom-right" === c ? d = $d(a) : "top-left" === c ? d = be(a) : "top-right" === c && (d = ae(a));
        return d
    }

    function ee(a, c, d, e) {
        var f = c * e[0] / 2;
        e = c * e[1] / 2;
        c = Math.cos(d);
        d = Math.sin(d);
        f = [-f, -f, f, f];
        e = [-e, e, -e, e];
        var g, h, k;
        for (g = 0; 4 > g; ++g) h = f[g], k = e[g], f[g] = a[0] + h * c - k * d, e[g] = a[1] + h * d + k * c;
        return Md(f, e, void 0)
    }

    function fe(a) {
        return a[3] - a[1]
    }

    function ge(a, c, d) {
        d = m(d) ? d : Kd();
        he(a, c) && (d[0] = a[0] > c[0] ? a[0] : c[0], d[1] = a[1] > c[1] ? a[1] : c[1], d[2] = a[2] < c[2] ? a[2] : c[2], d[3] = a[3] < c[3] ? a[3] : c[3]);
        return d
    }

    function be(a) {
        return [a[0], a[3]]
    }

    function ae(a) {
        return [a[2], a[3]]
    }

    function ie(a) {
        return a[2] - a[0]
    }

    function he(a, c) {
        return a[0] <= c[2] && a[2] >= c[0] && a[1] <= c[3] && a[3] >= c[1]
    }

    function je(a) {
        return a[2] < a[0] || a[3] < a[1]
    }

    function ke(a, c) {
        var d = (a[2] - a[0]) / 2 * (c - 1),
            e = (a[3] - a[1]) / 2 * (c - 1);
        a[0] -= d;
        a[2] += d;
        a[1] -= e;
        a[3] += e
    }

    function le(a, c, d) {
        a = [a[0], a[1], a[0], a[3], a[2], a[1], a[2], a[3]];
        c(a, a, 2);
        return Md([a[0], a[2], a[4], a[6]], [a[1], a[3], a[5], a[7]], d)
    };
    /*

     Latitude/longitude spherical geodesy formulae taken from
     http://www.movable-type.co.uk/scripts/latlong.html
     Licensed under CC-BY-3.0.
    */
    function me(a) {
        this.radius = a
    }
    me.prototype.a = function(a) {
        for (var c = 0, d = a.length, e = a[d - 1][0], f = a[d - 1][1], g = 0; g < d; g++) var h = a[g][0],
            k = a[g][1],
            c = c + Yb(h - e) * (2 + Math.sin(Yb(f)) + Math.sin(Yb(k))),
            e = h,
            f = k;
        return c * this.radius * this.radius / 2
    };
    me.prototype.b = function(a, c) {
        var d = Yb(a[1]),
            e = Yb(c[1]),
            f = (e - d) / 2,
            g = Yb(c[0] - a[0]) / 2,
            d = Math.sin(f) * Math.sin(f) + Math.sin(g) * Math.sin(g) * Math.cos(d) * Math.cos(e);
        return 2 * this.radius * Math.atan2(Math.sqrt(d), Math.sqrt(1 - d))
    };
    me.prototype.offset = function(a, c, d) {
        var e = Yb(a[1]);
        c /= this.radius;
        var f = Math.asin(Math.sin(e) * Math.cos(c) + Math.cos(e) * Math.sin(c) * Math.cos(d));
        return [180 * (Yb(a[0]) + Math.atan2(Math.sin(d) * Math.sin(c) * Math.cos(e), Math.cos(c) - Math.sin(e) * Math.sin(f))) / Math.PI, 180 * f / Math.PI]
    };
    var ne = new me(6370997);
    var oe = {};
    oe.degrees = 2 * Math.PI * ne.radius / 360;
    oe.ft = .3048;
    oe.m = 1;
    oe["us-ft"] = 1200 / 3937;

    function pe(a) {
        this.b = a.code;
        this.a = a.units;
        this.f = m(a.extent) ? a.extent : null;
        this.g = m(a.worldExtent) ? a.worldExtent : null;
        this.d = m(a.axisOrientation) ? a.axisOrientation : "enu";
        this.c = (this.e = m(a.global) ? a.global : !1) && null !== this.f;
        this.q = m(a.getPointResolution) ? a.getPointResolution : this.rj;
        this.i = null;
        if ("function" == typeof proj4) {
            var c = a.code,
                d = proj4.defs(c);
            if (m(d)) {
                m(d.axis) && !m(a.axisOrientation) && (this.d = d.axis);
                m(a.units) || (a = d.units, !m(a) && m(d.to_meter) && (a = d.to_meter.toString(), oe[a] = d.to_meter), this.a = a);
                a = qe;
                var e, f;
                for (e in a) f = proj4.defs(e), m(f) && (a = re(e), f === d ? se([a, this]) : (f = proj4(e, c), te(a, this, f.forward, f.inverse)))
            }
        }
    }
    l = pe.prototype;
    l.Ri = function() {
        return this.b
    };
    l.G = function() {
        return this.f
    };
    l.Ll = function() {
        return this.a
    };
    l.Gd = function() {
        return oe[this.a]
    };
    l.Cj = function() {
        return this.g
    };

    function ue(a) {
        return a.d
    }
    l.Ml = function() {
        return this.e
    };
    l.Yn = function(a) {
        this.c = (this.e = a) && null !== this.f
    };
    l.Nl = function(a) {
        this.f = a;
        this.c = this.e && null !== a
    };
    l.lo = function(a) {
        this.g = a
    };
    l.Xn = function(a) {
        this.q = a
    };
    l.rj = function(a, c) {
        if ("degrees" == this.a) return a;
        var d = ve(this, re("EPSG:4326")),
            e = [c[0] - a / 2, c[1], c[0] + a / 2, c[1], c[0], c[1] - a / 2, c[0], c[1] + a / 2],
            e = d(e, e, 2),
            d = (ne.b(e.slice(0, 2), e.slice(2, 4)) + ne.b(e.slice(4, 6), e.slice(6, 8))) / 2,
            e = this.Gd();
        m(e) && (d /= e);
        return d
    };
    l.getPointResolution = function(a, c) {
        return this.q(a, c)
    };
    var qe = {},
        we = {};

    function se(a) {
        xe(a);
        Sa(a, function(c) {
            Sa(a, function(a) {
                c !== a && ye(c, a, ze)
            })
        })
    }

    function Ae() {
        var a = Be,
            c = Ce,
            d = De;
        Sa(Ee, function(e) {
            Sa(a, function(a) {
                ye(e, a, c);
                ye(a, e, d)
            })
        })
    }

    function Fe(a) {
        qe[a.b] = a;
        ye(a, a, ze)
    }

    function xe(a) {
        var c = [];
        Sa(a, function(a) {
            c.push(Fe(a))
        })
    }

    function Ge(a) {
        return null != a ? ia(a) ? re(a) : a : re("EPSG:3857")
    }

    function ye(a, c, d) {
        a = a.b;
        c = c.b;
        a in we || (we[a] = {});
        we[a][c] = d
    }

    function te(a, c, d, e) {
        a = re(a);
        c = re(c);
        ye(a, c, He(d));
        ye(c, a, He(e))
    }

    function He(a) {
        return function(c, d, e) {
            var f = c.length;
            e = m(e) ? e : 2;
            d = m(d) ? d : Array(f);
            var g, h;
            for (h = 0; h < f; h += e)
                for (g = a([c[h], c[h + 1]]), d[h] = g[0], d[h + 1] = g[1], g = e - 1; 2 <= g; --g) d[h + g] = c[h + g];
            return d
        }
    }

    function re(a) {
        var c;
        a instanceof pe ? c = a : ia(a) ? (c = qe[a], !m(c) && "function" == typeof proj4 && m(proj4.defs(a)) && (c = new pe({
            code: a
        }), Fe(c))) : c = null;
        return c
    }

    function Ie(a, c) {
        return a === c ? !0 : a.b === c.b ? !0 : a.a != c.a ? !1 : ve(a, c) === ze
    }

    function Je(a, c) {
        var d = re(a),
            e = re(c);
        return ve(d, e)
    }

    function ve(a, c) {
        var d = a.b,
            e = c.b,
            f;
        d in we && e in we[d] && (f = we[d][e]);
        m(f) || (f = Ke);
        return f
    }

    function Ke(a, c) {
        if (m(c) && a !== c) {
            for (var d = 0, e = a.length; d < e; ++d) c[d] = a[d];
            a = c
        }
        return a
    }

    function ze(a, c) {
        var d;
        if (m(c)) {
            d = 0;
            for (var e = a.length; d < e; ++d) c[d] = a[d];
            d = c
        } else d = a.slice();
        return d
    }

    function Le(a, c, d) {
        return Je(c, d)(a, void 0, a.length)
    }

    function Me(a, c, d) {
        c = Je(c, d);
        return le(a, c)
    };

    function Ne(a) {
        fd.call(this);
        a = m(a) ? a : {};
        this.c = [0, 0];
        var c = {};
        c.center = m(a.center) ? a.center : null;
        this.e = Ge(a.projection);
        var d, e, f, g = m(a.minZoom) ? a.minZoom : 0;
        d = m(a.maxZoom) ? a.maxZoom : 28;
        var h = m(a.zoomFactor) ? a.zoomFactor : 2;
        if (m(a.resolutions)) d = a.resolutions, e = d[0], f = d[d.length - 1], d = bc(d);
        else {
            e = Ge(a.projection);
            f = e.G();
            var k = (null === f ? 360 * oe.degrees / oe[e.a] : Math.max(ie(f), fe(f))) / 256 / Math.pow(2, 0),
                n = k / Math.pow(2, 28);
            e = a.maxResolution;
            m(e) ? g = 0 : e = k / Math.pow(h, g);
            f = a.minResolution;
            m(f) || (f = m(a.maxZoom) ? m(a.maxResolution) ? e / Math.pow(h, d) : k / Math.pow(h, d) : n);
            d = g + Math.floor(Math.log(e / f) / Math.log(h));
            f = e / Math.pow(h, d - g);
            d = cc(h, e, d - g)
        }
        this.a = e;
        this.g = f;
        this.d = g;
        g = m(a.extent) ? Zb(a.extent) : $b;
        (m(a.enableRotation) ? a.enableRotation : 1) ? (e = a.constrainRotation, e = m(e) && !0 !== e ? !1 === e ? ec : ja(e) ? fc(e) : ec : gc()) : e = dc;
        this.f = new hc(g, d, e);
        m(a.resolution) ? c.resolution = a.resolution : m(a.zoom) && (c.resolution = this.constrainResolution(this.a, a.zoom - this.d));
        c.rotation = m(a.rotation) ? a.rotation : 0;
        this.t(c)
    }
    w(Ne, fd);
    l = Ne.prototype;
    l.xd = function(a) {
        return this.f.center(a)
    };
    l.constrainResolution = function(a, c, d) {
        return this.f.resolution(a, c || 0, d || 0)
    };
    l.constrainRotation = function(a, c) {
        return this.f.rotation(a, c || 0)
    };
    l.Ca = function() {
        return this.get("center")
    };
    l.Pc = function(a) {
        var c = this.Ca(),
            d = this.ya();
        return [c[0] - d * a[0] / 2, c[1] - d * a[1] / 2, c[0] + d * a[0] / 2, c[1] + d * a[1] / 2]
    };
    l.dl = function() {
        return this.e
    };
    l.ya = function() {
        return this.get("resolution")
    };

    function Oe(a, c) {
        return Math.max(ie(a) / c[0], fe(a) / c[1])
    }

    function Qe(a) {
        var c = a.a,
            d = Math.log(c / a.g) / Math.log(2);
        return function(a) {
            return c / Math.pow(2, a * d)
        }
    }
    l.Da = function() {
        return this.get("rotation")
    };

    function Re(a) {
        var c = a.a,
            d = Math.log(c / a.g) / Math.log(2);
        return function(a) {
            return Math.log(c / a) / Math.log(2) / d
        }
    }

    function Se(a) {
        var c = a.Ca(),
            d = a.e,
            e = a.ya();
        a = a.Da();
        return {
            center: c.slice(),
            projection: m(d) ? d : null,
            resolution: e,
            rotation: a
        }
    }
    l.Ej = function() {
        var a, c = this.ya();
        if (m(c)) {
            var d, e = 0;
            do {
                d = this.constrainResolution(this.a, e);
                if (d == c) {
                    a = e;
                    break
                }++e
            } while (d > this.g)
        }
        return m(a) ? this.d + a : a
    };
    l.Me = function(a, c) {
        if (!je(a)) {
            this.Na(ce(a));
            var d = Oe(a, c),
                e = this.constrainResolution(d, 0, 0);
            e < d && (e = this.constrainResolution(e, -1, 0));
            this.tb(e)
        }
    };
    l.Fi = function(a, c, d) {
        var e = m(d) ? d : {};
        d = m(e.padding) ? e.padding : [0, 0, 0, 0];
        var f = m(e.constrainResolution) ? e.constrainResolution : !0,
            g = m(e.nearest) ? e.nearest : !1,
            h;
        m(e.minResolution) ? h = e.minResolution : m(e.maxZoom) ? h = this.constrainResolution(this.a, e.maxZoom - this.d, 0) : h = 0;
        var k = a.j,
            n = this.Da(),
            e = Math.cos(-n),
            n = Math.sin(-n),
            p = Infinity,
            q = Infinity,
            r = -Infinity,
            t = -Infinity;
        a = a.s;
        for (var u = 0, A = k.length; u < A; u += a) var z = k[u] * e - k[u + 1] * n,
            D = k[u] * n + k[u + 1] * e,
            p = Math.min(p, z),
            q = Math.min(q, D),
            r = Math.max(r, z),
            t = Math.max(t, D);
        c = Oe([p, q, r, t], [c[0] - d[1] - d[3], c[1] - d[0] - d[2]]);
        c = isNaN(c) ? h : Math.max(c, h);
        f && (h = this.constrainResolution(c, 0, 0), !g && h < c && (h = this.constrainResolution(h, -1, 0)), c = h);
        this.tb(c);
        n = -n;
        g = (p + r) / 2 + (d[1] - d[3]) / 2 * c;
        d = (q + t) / 2 + (d[0] - d[2]) / 2 * c;
        this.Na([g * e - d * n, d * e + g * n])
    };
    l.Ai = function(a, c, d) {
        var e = this.Da(),
            f = Math.cos(-e),
            e = Math.sin(-e),
            g = a[0] * f - a[1] * e;
        a = a[1] * f + a[0] * e;
        var h = this.ya(),
            g = g + (c[0] / 2 - d[0]) * h;
        a += (d[1] - c[1] / 2) * h;
        e = -e;
        this.Na([g * f - a * e, a * f + g * e])
    };

    function Te(a) {
        return null != a.Ca() && m(a.ya())
    }
    l.rotate = function(a, c) {
        if (m(c)) {
            var d, e = this.Ca();
            m(e) && (d = [e[0] - c[0], e[1] - c[1]], rd(d, a - this.Da()), md(d, c));
            this.Na(d)
        }
        this.be(a)
    };
    l.Na = function(a) {
        this.set("center", a)
    };

    function Ue(a, c) {
        a.c[1] += c
    }
    l.tb = function(a) {
        this.set("resolution", a)
    };
    l.be = function(a) {
        this.set("rotation", a)
    };
    l.no = function(a) {
        a = this.constrainResolution(this.a, a - this.d, 0);
        this.tb(a)
    };

    function Ve(a) {
        return 1 - Math.pow(1 - a, 3)
    };

    function We(a) {
        return 3 * a * a - 2 * a * a * a
    }

    function Xe(a) {
        return a
    }

    function Ye(a) {
        return .5 > a ? We(2 * a) : 1 - We(2 * (a - .5))
    };

    function Ze(a) {
        var c = a.source,
            d = m(a.start) ? a.start : ua(),
            e = c[0],
            f = c[1],
            g = m(a.duration) ? a.duration : 1E3,
            h = m(a.easing) ? a.easing : We;
        return function(a, c) {
            if (c.time < d) return c.animate = !0, c.viewHints[0] += 1, !0;
            if (c.time < d + g) {
                var p = 1 - h((c.time - d) / g),
                    q = e - c.viewState.center[0],
                    r = f - c.viewState.center[1];
                c.animate = !0;
                c.viewState.center[0] += p * q;
                c.viewState.center[1] += p * r;
                c.viewHints[0] += 1;
                return !0
            }
            return !1
        }
    }

    function $e(a) {
        var c = m(a.rotation) ? a.rotation : 0,
            d = m(a.start) ? a.start : ua(),
            e = m(a.duration) ? a.duration : 1E3,
            f = m(a.easing) ? a.easing : We,
            g = m(a.anchor) ? a.anchor : null;
        return function(a, k) {
            if (k.time < d) return k.animate = !0, k.viewHints[0] += 1, !0;
            if (k.time < d + e) {
                var n = 1 - f((k.time - d) / e),
                    n = (c - k.viewState.rotation) * n;
                k.animate = !0;
                k.viewState.rotation += n;
                if (null !== g) {
                    var p = k.viewState.center;
                    p[0] -= g[0];
                    p[1] -= g[1];
                    rd(p, n);
                    md(p, g)
                }
                k.viewHints[0] += 1;
                return !0
            }
            return !1
        }
    }

    function af(a) {
        var c = a.resolution,
            d = m(a.start) ? a.start : ua(),
            e = m(a.duration) ? a.duration : 1E3,
            f = m(a.easing) ? a.easing : We;
        return function(a, h) {
            if (h.time < d) return h.animate = !0, h.viewHints[0] += 1, !0;
            if (h.time < d + e) {
                var k = 1 - f((h.time - d) / e),
                    n = c - h.viewState.resolution;
                h.animate = !0;
                h.viewState.resolution += k * n;
                h.viewHints[0] += 1;
                return !0
            }
            return !1
        }
    };

    function bf(a, c, d, e) {
        return m(e) ? (e[0] = a, e[1] = c, e[2] = d, e) : [a, c, d]
    }

    function cf(a, c, d) {
        return a + "/" + c + "/" + d
    }

    function df(a) {
        var c = a[0],
            d = Array(c),
            e = 1 << c - 1,
            f, g;
        for (f = 0; f < c; ++f) g = 48, a[1] & e && (g += 1), a[2] & e && (g += 2), d[f] = String.fromCharCode(g), e >>= 1;
        return d.join("")
    }

    function ef(a) {
        return cf(a[0], a[1], a[2])
    };

    function ff(a, c, d, e) {
        this.b = a;
        this.d = c;
        this.c = d;
        this.a = e
    }

    function gf(a, c, d, e, f) {
        return m(f) ? (f.b = a, f.d = c, f.c = d, f.a = e, f) : new ff(a, c, d, e)
    }
    ff.prototype.contains = function(a) {
        return hf(this, a[1], a[2])
    };

    function hf(a, c, d) {
        return a.b <= c && c <= a.d && a.c <= d && d <= a.a
    }

    function jf(a, c) {
        return a.b == c.b && a.c == c.c && a.d == c.d && a.a == c.a
    }

    function kf(a) {
        return a.d - a.b + 1
    }

    function lf(a, c) {
        return a.b <= c.d && a.d >= c.b && a.c <= c.a && a.a >= c.c
    };

    function mf(a) {
        this.a = a.html;
        this.b = m(a.tileRanges) ? a.tileRanges : null
    }
    mf.prototype.c = function() {
        return this.a
    };

    function nf(a, c, d) {
        rc.call(this, a, d);
        this.element = c
    }
    w(nf, rc);

    function of(a) {
        fd.call(this);
        this.a = m(a) ? a : [];
        pf(this)
    }
    w(of, fd);
    l = of.prototype;
    l.clear = function() {
        for (; 0 < this.Ib();) this.pop()
    };
    l.af = function(a) {
        var c, d;
        c = 0;
        for (d = a.length; c < d; ++c) this.push(a[c]);
        return this
    };
    l.forEach = function(a, c) {
        Sa(this.a, a, c)
    };
    l.Hk = function() {
        return this.a
    };
    l.item = function(a) {
        return this.a[a]
    };
    l.Ib = function() {
        return this.get("length")
    };
    l.Td = function(a, c) {
        eb(this.a, a, 0, c);
        pf(this);
        this.dispatchEvent(new nf("add", c, this))
    };
    l.pop = function() {
        return this.tf(this.Ib() - 1)
    };
    l.push = function(a) {
        var c = this.a.length;
        this.Td(c, a);
        return c
    };
    l.remove = function(a) {
        var c = this.a,
            d, e;
        d = 0;
        for (e = c.length; d < e; ++d)
            if (c[d] === a) return this.tf(d)
    };
    l.tf = function(a) {
        var c = this.a[a];
        Qa.splice.call(this.a, a, 1);
        pf(this);
        this.dispatchEvent(new nf("remove", c, this));
        return c
    };
    l.Un = function(a, c) {
        var d = this.Ib();
        if (a < d) d = this.a[a], this.a[a] = c, this.dispatchEvent(new nf("remove", d, this)), this.dispatchEvent(new nf("add", c, this));
        else {
            for (; d < a; ++d) this.Td(d, void 0);
            this.Td(a, c)
        }
    };

    function pf(a) {
        a.set("length", a.a.length)
    };
    var qf = /^#(?:[0-9a-f]{3}){1,2}$/i,
        rf = /^(?:rgb)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2})\)$/i,
        sf = /^(?:rgba)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|1|0\.\d{0,10})\)$/i;

    function tf(a) {
        return ga(a) ? a : uf(a)
    }

    function vf(a) {
        if (!ia(a)) {
            var c = a[0];
            c != (c | 0) && (c = c + .5 | 0);
            var d = a[1];
            d != (d | 0) && (d = d + .5 | 0);
            var e = a[2];
            e != (e | 0) && (e = e + .5 | 0);
            a = "rgba(" + c + "," + d + "," + e + "," + a[3] + ")"
        }
        return a
    }
    var uf = function() {
        var a = {},
            c = 0;
        return function(d) {
            var e;
            if (a.hasOwnProperty(d)) e = a[d];
            else {
                if (1024 <= c) {
                    e = 0;
                    for (var f in a) 0 === (e++ & 3) && (delete a[f], --c)
                }
                var g, h;
                qf.exec(d) ? (h = 3 == d.length - 1 ? 1 : 2, e = parseInt(d.substr(1 + 0 * h, h), 16), f = parseInt(d.substr(1 + 1 * h, h), 16), g = parseInt(d.substr(1 + 2 * h, h), 16), 1 == h && (e = (e << 4) + e, f = (f << 4) + f, g = (g << 4) + g), e = [e, f, g, 1]) : (h = sf.exec(d)) ? (e = Number(h[1]), f = Number(h[2]), g = Number(h[3]), h = Number(h[4]), e = [e, f, g, h], e = wf(e, e)) : (h = rf.exec(d)) ? (e = Number(h[1]), f = Number(h[2]), g = Number(h[3]), e = [e, f, g, 1], e = wf(e, e)) : e = void 0;
                a[d] = e;
                ++c
            }
            return e
        }
    }();

    function wf(a, c) {
        var d = m(c) ? c : [];
        d[0] = Vb(a[0] + .5 | 0, 0, 255);
        d[1] = Vb(a[1] + .5 | 0, 0, 255);
        d[2] = Vb(a[2] + .5 | 0, 0, 255);
        d[3] = Vb(a[3], 0, 1);
        return d
    };

    function xf() {
        this.g = zd();
        this.a = void 0;
        this.b = zd();
        this.d = void 0;
        this.c = zd();
        this.f = void 0;
        this.e = zd();
        this.q = void 0;
        this.i = zd()
    }

    function yf(a, c, d, e, f) {
        var g = !1;
        m(c) && c !== a.a && (g = a.b, Dd(g), g[12] = c, g[13] = c, g[14] = c, g[15] = 1, a.a = c, g = !0);
        if (m(d) && d !== a.d) {
            g = a.c;
            Dd(g);
            g[0] = d;
            g[5] = d;
            g[10] = d;
            g[15] = 1;
            var h = -.5 * d + .5;
            g[12] = h;
            g[13] = h;
            g[14] = h;
            g[15] = 1;
            a.d = d;
            g = !0
        }
        m(e) && e !== a.f && (g = Math.cos(e), h = Math.sin(e), Ad(a.e, .213 + .787 * g - .213 * h, .213 - .213 * g + .143 * h, .213 - .213 * g - .787 * h, 0, .715 - .715 * g - .715 * h, .715 + .285 * g + .14 * h, .715 - .715 * g + .715 * h, 0, .072 - .072 * g + .928 * h, .072 - .072 * g - .283 * h, .072 + .928 * g + .072 * h, 0, 0, 0, 0, 1), a.f = e, g = !0);
        m(f) && f !== a.q && (Ad(a.i, .213 + .787 * f, .213 - .213 * f, .213 - .213 * f, 0, .715 - .715 * f, .715 + .285 * f, .715 - .715 * f, 0, .072 - .072 * f, .072 - .072 * f, .072 + .928 * f, 0, 0, 0, 0, 1), a.q = f, g = !0);
        g && (g = a.g, Dd(g), m(d) && Ed(g, a.c, g), m(c) && Ed(g, a.b, g), m(f) && Ed(g, a.i, g), m(e) && Ed(g, a.e, g));
        return a.g
    };
    var zf = !Ib || Ib && 9 <= Tb;
    !Jb && !Ib || Ib && Ib && 9 <= Tb || Jb && Rb("1.9.1");
    Ib && Rb("9");
    Gb("area base br col command embed hr img input keygen link meta param source track wbr".split(" "));

    function Af(a, c) {
        this.x = m(a) ? a : 0;
        this.y = m(c) ? c : 0
    }
    l = Af.prototype;
    l.clone = function() {
        return new Af(this.x, this.y)
    };
    l.ceil = function() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this
    };
    l.floor = function() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this
    };
    l.round = function() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this
    };
    l.scale = function(a, c) {
        var d = ja(c) ? c : a;
        this.x *= a;
        this.y *= d;
        return this
    };

    function Bf(a, c) {
        this.width = a;
        this.height = c
    }
    l = Bf.prototype;
    l.clone = function() {
        return new Bf(this.width, this.height)
    };
    l.la = function() {
        return !(this.width * this.height)
    };
    l.ceil = function() {
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    };
    l.floor = function() {
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    };
    l.round = function() {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    };
    l.scale = function(a, c) {
        var d = ja(c) ? c : a;
        this.width *= a;
        this.height *= d;
        return this
    };

    function Cf(a) {
        return a ? new Df(Ef(a)) : ya || (ya = new Df)
    }

    function Ff(a) {
        var c = document;
        return ia(a) ? c.getElementById(a) : a
    }

    function Gf(a, c) {
        pb(c, function(c, e) {
            "style" == e ? a.style.cssText = c : "class" == e ? a.className = c : "for" == e ? a.htmlFor = c : e in Hf ? a.setAttribute(Hf[e], c) : 0 == e.lastIndexOf("aria-", 0) || 0 == e.lastIndexOf("data-", 0) ? a.setAttribute(e, c) : a[e] = c
        })
    }
    var Hf = {
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        colspan: "colSpan",
        frameborder: "frameBorder",
        height: "height",
        maxlength: "maxLength",
        role: "role",
        rowspan: "rowSpan",
        type: "type",
        usemap: "useMap",
        valign: "vAlign",
        width: "width"
    };

    function If(a) {
        a = a.document.documentElement;
        return new Bf(a.clientWidth, a.clientHeight)
    }

    function Jf(a, c, d) {
        var e = arguments,
            f = document,
            g = e[0],
            h = e[1];
        if (!zf && h && (h.name || h.type)) {
            g = ["<", g];
            h.name && g.push(' name="', Da(h.name), '"');
            if (h.type) {
                g.push(' type="', Da(h.type), '"');
                var k = {};
                Fb(k, h);
                delete k.type;
                h = k
            }
            g.push(">");
            g = g.join("")
        }
        g = f.createElement(g);
        h && (ia(h) ? g.className = h : ga(h) ? g.className = h.join(" ") : Gf(g, h));
        2 < e.length && Kf(f, g, e, 2);
        return g
    }

    function Kf(a, c, d, e) {
        function f(d) {
            d && c.appendChild(ia(d) ? a.createTextNode(d) : d)
        }
        for (; e < d.length; e++) {
            var g = d[e];
            !ha(g) || la(g) && 0 < g.nodeType ? f(g) : Sa(Lf(g) ? bb(g) : g, f)
        }
    }

    function Mf(a) {
        return document.createElement(a)
    }

    function Nf(a, c) {
        Kf(Ef(a), a, arguments, 1)
    }

    function Of(a) {
        for (var c; c = a.firstChild;) a.removeChild(c)
    }

    function Pf(a, c, d) {
        a.insertBefore(c, a.childNodes[d] || null)
    }

    function Qf(a) {
        a && a.parentNode && a.parentNode.removeChild(a)
    }

    function Rf(a, c) {
        var d = c.parentNode;
        d && d.replaceChild(a, c)
    }

    function Sf(a) {
        if (void 0 != a.firstElementChild) a = a.firstElementChild;
        else
            for (a = a.firstChild; a && 1 != a.nodeType;) a = a.nextSibling;
        return a
    }

    function Tf(a, c) {
        if (a.contains && 1 == c.nodeType) return a == c || a.contains(c);
        if ("undefined" != typeof a.compareDocumentPosition) return a == c || Boolean(a.compareDocumentPosition(c) & 16);
        for (; c && a != c;) c = c.parentNode;
        return c == a
    }

    function Ef(a) {
        return 9 == a.nodeType ? a : a.ownerDocument || a.document
    }

    function Lf(a) {
        if (a && "number" == typeof a.length) {
            if (la(a)) return "function" == typeof a.item || "string" == typeof a.item;
            if (ka(a)) return "function" == typeof a.item
        }
        return !1
    }

    function Df(a) {
        this.b = a || ba.document || document
    }

    function Uf() {
        return !0
    }

    function Wf(a) {
        var c = a.b;
        a = Kb ? c.body || c.documentElement : c.documentElement;
        c = c.parentWindow || c.defaultView;
        return Ib && Rb("10") && c.pageYOffset != a.scrollTop ? new Af(a.scrollLeft, a.scrollTop) : new Af(c.pageXOffset || a.scrollLeft, c.pageYOffset || a.scrollTop)
    }
    Df.prototype.appendChild = function(a, c) {
        a.appendChild(c)
    };
    Df.prototype.contains = Tf;

    function Xf(a) {
        if (a.classList) return a.classList;
        a = a.className;
        return ia(a) && a.match(/\S+/g) || []
    }

    function Yf(a, c) {
        return a.classList ? a.classList.contains(c) : Ya(Xf(a), c)
    }

    function Zf(a, c) {
        a.classList ? a.classList.add(c) : Yf(a, c) || (a.className += 0 < a.className.length ? " " + c : c)
    }

    function $f(a, c) {
        a.classList ? a.classList.remove(c) : Yf(a, c) && (a.className = Ta(Xf(a), function(a) {
            return a != c
        }).join(" "))
    }

    function ag(a, c) {
        Yf(a, c) ? $f(a, c) : Zf(a, c)
    };

    function bg(a, c, d, e) {
        this.top = a;
        this.right = c;
        this.bottom = d;
        this.left = e
    }
    l = bg.prototype;
    l.clone = function() {
        return new bg(this.top, this.right, this.bottom, this.left)
    };
    l.contains = function(a) {
        return this && a ? a instanceof bg ? a.left >= this.left && a.right <= this.right && a.top >= this.top && a.bottom <= this.bottom : a.x >= this.left && a.x <= this.right && a.y >= this.top && a.y <= this.bottom : !1
    };
    l.ceil = function() {
        this.top = Math.ceil(this.top);
        this.right = Math.ceil(this.right);
        this.bottom = Math.ceil(this.bottom);
        this.left = Math.ceil(this.left);
        return this
    };
    l.floor = function() {
        this.top = Math.floor(this.top);
        this.right = Math.floor(this.right);
        this.bottom = Math.floor(this.bottom);
        this.left = Math.floor(this.left);
        return this
    };
    l.round = function() {
        this.top = Math.round(this.top);
        this.right = Math.round(this.right);
        this.bottom = Math.round(this.bottom);
        this.left = Math.round(this.left);
        return this
    };
    l.scale = function(a, c) {
        var d = ja(c) ? c : a;
        this.left *= a;
        this.right *= a;
        this.top *= d;
        this.bottom *= d;
        return this
    };

    function cg(a, c, d, e) {
        this.left = a;
        this.top = c;
        this.width = d;
        this.height = e
    }
    l = cg.prototype;
    l.clone = function() {
        return new cg(this.left, this.top, this.width, this.height)
    };
    l.contains = function(a) {
        return a instanceof cg ? this.left <= a.left && this.left + this.width >= a.left + a.width && this.top <= a.top && this.top + this.height >= a.top + a.height : a.x >= this.left && a.x <= this.left + this.width && a.y >= this.top && a.y <= this.top + this.height
    };

    function dg(a, c) {
        var d = c.x < a.left ? a.left - c.x : Math.max(c.x - (a.left + a.width), 0),
            e = c.y < a.top ? a.top - c.y : Math.max(c.y - (a.top + a.height), 0);
        return d * d + e * e
    }
    l.distance = function(a) {
        return Math.sqrt(dg(this, a))
    };
    l.ceil = function() {
        this.left = Math.ceil(this.left);
        this.top = Math.ceil(this.top);
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    };
    l.floor = function() {
        this.left = Math.floor(this.left);
        this.top = Math.floor(this.top);
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    };
    l.round = function() {
        this.left = Math.round(this.left);
        this.top = Math.round(this.top);
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    };
    l.scale = function(a, c) {
        var d = ja(c) ? c : a;
        this.left *= a;
        this.width *= a;
        this.top *= d;
        this.height *= d;
        return this
    };

    function eg(a, c) {
        var d = Ef(a);
        return d.defaultView && d.defaultView.getComputedStyle && (d = d.defaultView.getComputedStyle(a, null)) ? d[c] || d.getPropertyValue(c) || "" : ""
    }

    function fg(a, c) {
        return eg(a, c) || (a.currentStyle ? a.currentStyle[c] : null) || a.style && a.style[c]
    }

    function gg(a, c, d) {
        var e;
        c instanceof Af ? (e = c.x, c = c.y) : (e = c, c = d);
        a.style.left = hg(e);
        a.style.top = hg(c)
    }

    function ig(a) {
        var c;
        try {
            c = a.getBoundingClientRect()
        } catch (d) {
            return {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            }
        }
        Ib && a.ownerDocument.body && (a = a.ownerDocument, c.left -= a.documentElement.clientLeft + a.body.clientLeft, c.top -= a.documentElement.clientTop + a.body.clientTop);
        return c
    }

    function jg(a) {
        if (1 == a.nodeType) return a = ig(a), new Af(a.left, a.top);
        var c = ka(a.Qi),
            d = a;
        a.targetTouches && a.targetTouches.length ? d = a.targetTouches[0] : c && a.b.targetTouches && a.b.targetTouches.length && (d = a.b.targetTouches[0]);
        return new Af(d.clientX, d.clientY)
    }

    function hg(a) {
        "number" == typeof a && (a = a + "px");
        return a
    }

    function kg(a) {
        var c = lg;
        if ("none" != fg(a, "display")) return c(a);
        var d = a.style,
            e = d.display,
            f = d.visibility,
            g = d.position;
        d.visibility = "hidden";
        d.position = "absolute";
        d.display = "inline";
        a = c(a);
        d.display = e;
        d.position = g;
        d.visibility = f;
        return a
    }

    function lg(a) {
        var c = a.offsetWidth,
            d = a.offsetHeight,
            e = Kb && !c && !d;
        return m(c) && !e || !a.getBoundingClientRect ? new Bf(c, d) : (a = ig(a), new Bf(a.right - a.left, a.bottom - a.top))
    }

    function mg(a, c) {
        a.style.display = c ? "" : "none"
    }

    function ng(a, c, d, e) {
        if (/^\d+px?$/.test(c)) return parseInt(c, 10);
        var f = a.style[d],
            g = a.runtimeStyle[d];
        a.runtimeStyle[d] = a.currentStyle[d];
        a.style[d] = c;
        c = a.style[e];
        a.style[d] = f;
        a.runtimeStyle[d] = g;
        return c
    }

    function og(a, c) {
        var d = a.currentStyle ? a.currentStyle[c] : null;
        return d ? ng(a, d, "left", "pixelLeft") : 0
    }

    function pg(a, c) {
        if (Ib) {
            var d = og(a, c + "Left"),
                e = og(a, c + "Right"),
                f = og(a, c + "Top"),
                g = og(a, c + "Bottom");
            return new bg(f, e, g, d)
        }
        d = eg(a, c + "Left");
        e = eg(a, c + "Right");
        f = eg(a, c + "Top");
        g = eg(a, c + "Bottom");
        return new bg(parseFloat(f), parseFloat(e), parseFloat(g), parseFloat(d))
    }
    var qg = {
        thin: 2,
        medium: 4,
        thick: 6
    };

    function rg(a, c) {
        if ("none" == (a.currentStyle ? a.currentStyle[c + "Style"] : null)) return 0;
        var d = a.currentStyle ? a.currentStyle[c + "Width"] : null;
        return d in qg ? qg[d] : ng(a, d, "left", "pixelLeft")
    }

    function sg(a) {
        if (Ib && !(Ib && 9 <= Tb)) {
            var c = rg(a, "borderLeft"),
                d = rg(a, "borderRight"),
                e = rg(a, "borderTop");
            a = rg(a, "borderBottom");
            return new bg(e, d, a, c)
        }
        c = eg(a, "borderLeftWidth");
        d = eg(a, "borderRightWidth");
        e = eg(a, "borderTopWidth");
        a = eg(a, "borderBottomWidth");
        return new bg(parseFloat(e), parseFloat(d), parseFloat(a), parseFloat(c))
    };

    function tg(a, c, d) {
        rc.call(this, a);
        this.map = c;
        this.frameState = m(d) ? d : null
    }
    w(tg, rc);

    function ug(a) {
        fd.call(this);
        this.element = m(a.element) ? a.element : null;
        this.a = this.L = null;
        this.l = [];
        this.render = m(a.render) ? a.render : ca;
        m(a.target) && this.c(a.target)
    }
    w(ug, fd);
    ug.prototype.O = function() {
        Qf(this.element);
        ug.S.O.call(this)
    };
    ug.prototype.e = function() {
        return this.a
    };
    ug.prototype.setMap = function(a) {
        null === this.a || Qf(this.element);
        0 != this.l.length && (Sa(this.l, Wc), this.l.length = 0);
        this.a = a;
        null !== this.a && ((null === this.L ? a.p : this.L).appendChild(this.element), this.render !== ca && this.l.push(x(a, "postrender", this.render, !1, this)), a.render())
    };
    ug.prototype.c = function(a) {
        this.L = Ff(a)
    };

    function vg() {
        this.c = 0;
        this.d = {};
        this.a = this.b = null
    }
    l = vg.prototype;
    l.clear = function() {
        this.c = 0;
        this.d = {};
        this.a = this.b = null
    };

    function wg(a, c) {
        return a.d.hasOwnProperty(c)
    }
    l.forEach = function(a, c) {
        for (var d = this.b; null !== d;) a.call(c, d.qc, d.Wd, this), d = d.Wa
    };
    l.get = function(a) {
        a = this.d[a];
        if (a === this.a) return a.qc;
        a === this.b ? (this.b = this.b.Wa, this.b.Nb = null) : (a.Wa.Nb = a.Nb, a.Nb.Wa = a.Wa);
        a.Wa = null;
        a.Nb = this.a;
        this.a = this.a.Wa = a;
        return a.qc
    };
    l.Tb = function() {
        return this.c
    };
    l.C = function() {
        var a = Array(this.c),
            c = 0,
            d;
        for (d = this.a; null !== d; d = d.Nb) a[c++] = d.Wd;
        return a
    };
    l.cb = function() {
        var a = Array(this.c),
            c = 0,
            d;
        for (d = this.a; null !== d; d = d.Nb) a[c++] = d.qc;
        return a
    };
    l.pop = function() {
        var a = this.b;
        delete this.d[a.Wd];
        null !== a.Wa && (a.Wa.Nb = null);
        this.b = a.Wa;
        null === this.b && (this.a = null);
        --this.c;
        return a.qc
    };
    l.set = function(a, c) {
        var d = {
            Wd: a,
            Wa: null,
            Nb: this.a,
            qc: c
        };
        null === this.a ? this.b = d : this.a.Wa = d;
        this.a = d;
        this.d[a] = d;
        ++this.c
    };

    function xg(a) {
        vg.call(this);
        this.e = m(a) ? a : 2048
    }
    w(xg, vg);

    function yg(a) {
        return a.Tb() > a.e
    };

    function zg(a, c) {
        $c.call(this);
        this.b = a;
        this.state = c
    }
    w(zg, $c);

    function Ag(a) {
        a.dispatchEvent("change")
    }
    zg.prototype.gb = function() {
        return ma(this).toString()
    };
    zg.prototype.f = function() {
        return this.b
    };

    function Bg(a) {
        fd.call(this);
        this.f = re(a.projection);
        this.d = m(a.attributions) ? a.attributions : null;
        this.L = a.logo;
        this.o = m(a.state) ? a.state : "ready";
        this.H = a.wrapX
    }
    w(Bg, fd);
    l = Bg.prototype;
    l.ge = ca;
    l.ea = function() {
        return this.d
    };
    l.ca = function() {
        return this.L
    };
    l.fa = function() {
        return this.f
    };
    l.ga = function() {
        return this.o
    };

    function Cg(a) {
        return a.H
    }

    function Dg(a, c) {
        a.o = c;
        a.k()
    };

    function Eg(a) {
        return function() {
            return a
        }
    }
    var Fg = Eg(!1),
        Gg = Eg(!0),
        Hg = Eg(null);

    function Ig(a) {
        return a
    }

    function Jg(a) {
        var c;
        c = c || 0;
        return function() {
            return a.apply(this, Array.prototype.slice.call(arguments, 0, c))
        }
    }

    function Kg(a) {
        var c = arguments,
            d = c.length;
        return function() {
            for (var a, f = 0; f < d; f++) a = c[f].apply(this, arguments);
            return a
        }
    }

    function Lg(a) {
        var c = arguments,
            d = c.length;
        return function() {
            for (var a = 0; a < d; a++)
                if (!c[a].apply(this, arguments)) return !1;
            return !0
        }
    };

    function Mg(a) {
        this.minZoom = m(a.minZoom) ? a.minZoom : 0;
        this.b = a.resolutions;
        this.maxZoom = this.b.length - 1;
        this.f = m(a.origin) ? a.origin : null;
        this.i = null;
        m(a.origins) && (this.i = a.origins);
        this.c = null;
        m(a.tileSizes) && (this.c = a.tileSizes);
        this.g = m(a.tileSize) ? a.tileSize : null === this.c ? 256 : null;
        this.a = [0, 0];
        this.d = null;
        m(a.widths) && (this.d = a.widths)
    }
    var Ng = [0, 0, 0];
    l = Mg.prototype;
    l.yb = function() {
        return Ig
    };
    l.Ad = function(a, c, d, e, f) {
        f = Og(this, a, f);
        for (a = a[0] - 1; a >= this.minZoom;) {
            if (c.call(d, a, Pg(this, f, a, e))) return !0;
            --a
        }
        return !1
    };
    l.Fd = function() {
        return this.maxZoom
    };
    l.Hd = function() {
        return this.minZoom
    };
    l.Mb = function(a) {
        return null === this.f ? this.i[a] : this.f
    };
    l.ma = function(a) {
        return this.b[a]
    };
    l.ne = function() {
        return this.b
    };
    l.Ld = function(a, c, d) {
        return a[0] < this.maxZoom ? (d = Og(this, a, d), Pg(this, d, a[0] + 1, c)) : null
    };

    function Qg(a, c, d, e) {
        Rg(a, c[0], c[1], d, !1, Ng);
        var f = Ng[1],
            g = Ng[2];
        Rg(a, c[2], c[3], d, !0, Ng);
        return gf(f, Ng[1], g, Ng[2], e)
    }

    function Pg(a, c, d, e) {
        return Qg(a, c, a.ma(d), e)
    }

    function Sg(a, c) {
        var d = a.Mb(c[0]),
            e = a.ma(c[0]),
            f = ld(a.na(c[0]), a.a);
        return [d[0] + (c[1] + .5) * f[0] * e, d[1] + (c[2] + .5) * f[1] * e]
    }

    function Og(a, c, d) {
        var e = a.Mb(c[0]),
            f = a.ma(c[0]);
        a = ld(a.na(c[0]), a.a);
        var g = e[0] + c[1] * a[0] * f;
        c = e[1] + c[2] * a[1] * f;
        return Nd(g, c, g + a[0] * f, c + a[1] * f, d)
    }
    l.Wb = function(a, c, d) {
        return Rg(this, a[0], a[1], c, !1, d)
    };

    function Rg(a, c, d, e, f, g) {
        var h = Tg(a, e),
            k = e / a.ma(h),
            n = a.Mb(h);
        a = ld(a.na(h), a.a);
        c = k * (c - n[0]) / (e * a[0]);
        d = k * (d - n[1]) / (e * a[1]);
        f ? (c = Math.ceil(c) - 1, d = Math.ceil(d) - 1) : (c = Math.floor(c), d = Math.floor(d));
        return bf(h, c, d, g)
    }
    l.cd = function(a, c, d) {
        return Rg(this, a[0], a[1], this.ma(c), !1, d)
    };

    function Ug(a, c, d) {
        d = Pg(a, Vg(d), c);
        a = Wg(a, c);
        m(a) || (a = kf(d));
        return gf(0, a - 1, 0, d.a - d.c + 1, void 0)
    }
    l.na = function(a) {
        return null === this.g ? this.c[a] : this.g
    };

    function Wg(a, c) {
        if (null !== a.d) return a.d[c]
    }

    function Tg(a, c) {
        var d = ac(a.b, c, 0);
        return Vb(d, a.minZoom, a.maxZoom)
    }

    function Xg(a) {
        var c = a.i;
        if (null === c) {
            for (var c = Vg(a), d = m(void 0) ? ld(void 0) : ld(256), e = m(void 0) ? void 0 : "bottom-left", f = Yg(c, void 0, ld(d)), g = Array(f.length), h = ie(c), k = f.length - 1; 0 <= k; --k) g[k] = h / d[0] / f[k];
            c = new Mg({
                origin: de(c, e),
                resolutions: f,
                tileSize: m(void 0) ? void 0 : 256,
                widths: g
            });
            a.i = c
        }
        return c
    }

    function Yg(a, c, d) {
        c = m(c) ? c : 42;
        var e = fe(a);
        a = ie(a);
        d = m(d) ? d : ld(256);
        d = Math.max(a / d[0], e / d[1]);
        c += 1;
        e = Array(c);
        for (a = 0; a < c; ++a) e[a] = d / Math.pow(2, a);
        return e
    }

    function Vg(a) {
        a = re(a);
        var c = a.G();
        null === c && (a = 180 * oe.degrees / a.Gd(), c = Nd(-a, -a, a, a));
        return c
    };

    function Zg(a) {
        Bg.call(this, {
            attributions: a.attributions,
            extent: a.extent,
            logo: a.logo,
            projection: a.projection,
            state: a.state,
            wrapX: a.wrapX
        });
        this.X = m(a.opaque) ? a.opaque : !1;
        this.ba = m(a.tilePixelRatio) ? a.tilePixelRatio : 1;
        this.tileGrid = m(a.tileGrid) ? a.tileGrid : null;
        this.a = new xg;
        this.c = [0, 0]
    }
    w(Zg, Bg);

    function $g(a, c, d, e) {
        for (var f = !0, g, h, k = d.b; k <= d.d; ++k)
            for (var n = d.c; n <= d.a; ++n) g = a.bb(c, k, n), h = !1, wg(a.a, g) && (g = a.a.get(g), (h = 2 === g.state) && (h = !1 !== e(g))), h || (f = !1);
        return f
    }
    l = Zg.prototype;
    l.Cd = function() {
        return 0
    };
    l.bb = cf;
    l.ua = function() {
        return this.tileGrid
    };

    function ah(a, c) {
        return null === a.tileGrid ? Xg(c) : a.tileGrid
    }
    l.Xb = function(a, c, d) {
        c = ah(this, d);
        return kd(ld(c.na(a), this.c), this.ba, this.c)
    };
    l.yf = ca;

    function bh(a, c) {
        rc.call(this, a);
        this.tile = c
    }
    w(bh, rc);

    function ch(a) {
        a = m(a) ? a : {};
        this.p = Mf("UL");
        this.o = Mf("LI");
        this.p.appendChild(this.o);
        mg(this.o, !1);
        this.d = m(a.collapsed) ? a.collapsed : !0;
        this.g = m(a.collapsible) ? a.collapsible : !0;
        this.g || (this.d = !1);
        var c = m(a.className) ? a.className : "ol-attribution",
            d = m(a.tipLabel) ? a.tipLabel : "Attributions",
            e = m(a.collapseLabel) ? a.collapseLabel : "\u00bb";
        this.H = ia(e) ? Jf("SPAN", {}, e) : e;
        e = m(a.label) ? a.label : "i";
        this.J = ia(e) ? Jf("SPAN", {}, e) : e;
        d = Jf("BUTTON", {
            type: "button",
            title: d
        }, this.g && !this.d ? this.H : this.J);
        x(d, "click", this.gl, !1, this);
        x(d, ["mouseout", uc], function() {
            this.blur()
        }, !1);
        c = Jf("DIV", c + " ol-unselectable ol-control" + (this.d && this.g ? " ol-collapsed" : "") + (this.g ? "" : " ol-uncollapsible"), this.p, d);
        ug.call(this, {
            element: c,
            render: m(a.render) ? a.render : dh,
            target: a.target
        });
        this.n = !0;
        this.i = {};
        this.f = {};
        this.N = {}
    }
    w(ch, ug);

    function dh(a) {
        a = a.frameState;
        if (null === a) this.n && (mg(this.element, !1), this.n = !1);
        else {
            var c, d, e, f, g, h, k, n, p, q, r, t = a.layerStatesArray,
                u = Db(a.attributions),
                A = {},
                z = a.viewState.projection;
            d = 0;
            for (c = t.length; d < c; d++)
                if (h = t[d].layer.da(), null !== h && (q = ma(h).toString(), p = h.d, null !== p))
                    for (e = 0, f = p.length; e < f; e++)
                        if (k = p[e], n = ma(k).toString(), !(n in u)) {
                            g = a.usedTiles[q];
                            if (m(g)) {
                                var D = ah(h, z);
                                a: {
                                    r = k;
                                    var B = z;
                                    if (null === r.b) r = !0;
                                    else {
                                        var y = void 0,
                                            K = void 0,
                                            J = void 0,
                                            H = void 0;
                                        for (H in g)
                                            if (H in r.b)
                                                for (var J = g[H],
                                                        P, y = 0, K = r.b[H].length; y < K; ++y) {
                                                    P = r.b[H][y];
                                                    if (lf(P, J)) {
                                                        r = !0;
                                                        break a
                                                    }
                                                    var sa = Ug(D, parseInt(H, 10), B),
                                                        Oa = kf(sa);
                                                    if (J.b < sa.b || J.d > sa.d)
                                                        if (lf(P, new ff(Wb(J.b, Oa), Wb(J.d, Oa), J.c, J.a)) || kf(J) > Oa && lf(P, sa)) {
                                                            r = !0;
                                                            break a
                                                        }
                                                }
                                        r = !1
                                    }
                                }
                            } else r = !1;
                            r ? (n in A && delete A[n], u[n] = k) : A[n] = k
                        }
            c = [u, A];
            d = c[0];
            c = c[1];
            for (var N in this.i) N in d ? (this.f[N] || (mg(this.i[N], !0), this.f[N] = !0), delete d[N]) : N in c ? (this.f[N] && (mg(this.i[N], !1), delete this.f[N]), delete c[N]) : (Qf(this.i[N]), delete this.i[N], delete this.f[N]);
            for (N in d) e = Mf("LI"), e.innerHTML = d[N].a, this.p.appendChild(e), this.i[N] = e, this.f[N] = !0;
            for (N in c) e = Mf("LI"), e.innerHTML = c[N].a, mg(e, !1), this.p.appendChild(e), this.i[N] = e;
            N = !xb(this.f) || !xb(a.logos);
            this.n != N && (mg(this.element, N), this.n = N);
            N && xb(this.f) ? Zf(this.element, "ol-logo-only") : $f(this.element, "ol-logo-only");
            var za;
            a = a.logos;
            N = this.N;
            for (za in N) za in a || (Qf(N[za]), delete N[za]);
            for (var cb in a) cb in N || (za = new Image, za.src = cb, d = a[cb], "" === d ? d = za : (d = Jf("A", {
                href: d
            }), d.appendChild(za)), this.o.appendChild(d), N[cb] = d);
            mg(this.o, !xb(a))
        }
    }
    l = ch.prototype;
    l.gl = function(a) {
        a.preventDefault();
        eh(this)
    };

    function eh(a) {
        ag(a.element, "ol-collapsed");
        a.d ? Rf(a.H, a.J) : Rf(a.J, a.H);
        a.d = !a.d
    }
    l.fl = function() {
        return this.g
    };
    l.il = function(a) {
        this.g !== a && (this.g = a, ag(this.element, "ol-uncollapsible"), !a && this.d && eh(this))
    };
    l.hl = function(a) {
        this.g && this.d !== a && eh(this)
    };
    l.el = function() {
        return this.d
    };

    function fh(a) {
        a = m(a) ? a : {};
        var c = m(a.className) ? a.className : "ol-rotate",
            d = m(a.label) ? a.label : "\u21e7";
        this.d = null;
        ia(d) ? this.d = Jf("SPAN", "ol-compass", d) : (this.d = d, Zf(this.d, "ol-compass"));
        d = Jf("BUTTON", {
            "class": c + "-reset",
            type: "button",
            title: m(a.tipLabel) ? a.tipLabel : "Reset rotation"
        }, this.d);
        x(d, "click", fh.prototype.o, !1, this);
        x(d, ["mouseout", uc], function() {
            this.blur()
        }, !1);
        c = Jf("DIV", c + " ol-unselectable ol-control", d);
        ug.call(this, {
            element: c,
            render: m(a.render) ? a.render : gh,
            target: a.target
        });
        this.g = m(a.duration) ? a.duration : 250;
        this.f = m(a.autoHide) ? a.autoHide : !0;
        this.i = void 0;
        this.f && Zf(this.element, "ol-hidden")
    }
    w(fh, ug);
    fh.prototype.o = function(a) {
        a.preventDefault();
        a = this.a;
        var c = a.R();
        if (null !== c) {
            for (var d = c.Da(); d < -Math.PI;) d += 2 * Math.PI;
            for (; d > Math.PI;) d -= 2 * Math.PI;
            m(d) && (0 < this.g && a.Ha($e({
                rotation: d,
                duration: this.g,
                easing: Ve
            })), c.be(0))
        }
    };

    function gh(a) {
        a = a.frameState;
        if (null !== a) {
            a = a.viewState.rotation;
            if (a != this.i) {
                var c = "rotate(" + 180 * a / Math.PI + "deg)";
                if (this.f) {
                    var d = this.element;
                    0 === a ? Zf(d, "ol-hidden") : $f(d, "ol-hidden")
                }
                this.d.style.msTransform = c;
                this.d.style.webkitTransform = c;
                this.d.style.transform = c
            }
            this.i = a
        }
    };

    function hh(a) {
        a = m(a) ? a : {};
        var c = m(a.className) ? a.className : "ol-zoom",
            d = m(a.delta) ? a.delta : 1,
            e = m(a.zoomOutLabel) ? a.zoomOutLabel : "\u2212",
            f = m(a.zoomOutTipLabel) ? a.zoomOutTipLabel : "Zoom out",
            g = Jf("BUTTON", {
                "class": c + "-in",
                type: "button",
                title: m(a.zoomInTipLabel) ? a.zoomInTipLabel : "Zoom in"
            }, m(a.zoomInLabel) ? a.zoomInLabel : "+");
        x(g, "click", ta(hh.prototype.f, d), !1, this);
        x(g, ["mouseout", uc], function() {
            this.blur()
        }, !1);
        e = Jf("BUTTON", {
            "class": c + "-out",
            type: "button",
            title: f
        }, e);
        x(e, "click", ta(hh.prototype.f, -d), !1, this);
        x(e, ["mouseout", uc], function() {
            this.blur()
        }, !1);
        c = Jf("DIV", c + " ol-unselectable ol-control", g, e);
        ug.call(this, {
            element: c,
            target: a.target
        });
        this.d = m(a.duration) ? a.duration : 250
    }
    w(hh, ug);
    hh.prototype.f = function(a, c) {
        c.preventDefault();
        var d = this.a,
            e = d.R();
        if (null !== e) {
            var f = e.ya();
            m(f) && (0 < this.d && d.Ha(af({
                resolution: f,
                duration: this.d,
                easing: Ve
            })), d = e.constrainResolution(f, a), e.tb(d))
        }
    };

    function ih(a) {
        a = m(a) ? a : {};
        var c = new of;
        (m(a.zoom) ? a.zoom : 1) && c.push(new hh(a.zoomOptions));
        (m(a.rotate) ? a.rotate : 1) && c.push(new fh(a.rotateOptions));
        (m(a.attribution) ? a.attribution : 1) && c.push(new ch(a.attributionOptions));
        return c
    };
    var jh = Kb ? "webkitfullscreenchange" : Jb ? "mozfullscreenchange" : Ib ? "MSFullscreenChange" : "fullscreenchange";

    function kh() {
        var a = Cf().b,
            c = a.body;
        return !!(c.webkitRequestFullscreen || c.mozRequestFullScreen && a.mozFullScreenEnabled || c.msRequestFullscreen && a.msFullscreenEnabled || c.requestFullscreen && a.fullscreenEnabled)
    }

    function lh(a) {
        a.webkitRequestFullscreen ? a.webkitRequestFullscreen() : a.mozRequestFullScreen ? a.mozRequestFullScreen() : a.msRequestFullscreen ? a.msRequestFullscreen() : a.requestFullscreen && a.requestFullscreen()
    }

    function mh() {
        var a = Cf().b;
        return !!(a.webkitIsFullScreen || a.mozFullScreen || a.msFullscreenElement || a.fullscreenElement)
    };

    function nh(a) {
        a = m(a) ? a : {};
        this.d = m(a.className) ? a.className : "ol-full-screen";
        var c = m(a.label) ? a.label : "\u2194";
        this.f = ia(c) ? document.createTextNode(String(c)) : c;
        c = m(a.labelActive) ? a.labelActive : "\u00d7";
        this.g = ia(c) ? document.createTextNode(String(c)) : c;
        c = m(a.tipLabel) ? a.tipLabel : "Toggle full-screen";
        c = Jf("BUTTON", {
            "class": this.d + "-" + mh(),
            type: "button",
            title: c
        }, this.f);
        x(c, "click", this.n, !1, this);
        x(c, ["mouseout", uc], function() {
            this.blur()
        }, !1);
        x(ba.document, jh, this.i, !1, this);
        var d = this.d + " ol-unselectable ol-control " + (kh() ? "" : "ol-unsupported"),
            c = Jf("DIV", d, c);
        ug.call(this, {
            element: c,
            target: a.target
        });
        this.o = m(a.keys) ? a.keys : !1
    }
    w(nh, ug);
    nh.prototype.n = function(a) {
        a.preventDefault();
        kh() && (a = this.a, null !== a && (mh() ? (a = Cf().b, a.webkitCancelFullScreen ? a.webkitCancelFullScreen() : a.mozCancelFullScreen ? a.mozCancelFullScreen() : a.msExitFullscreen ? a.msExitFullscreen() : a.exitFullscreen && a.exitFullscreen()) : (a = a.df(), a = Ff(a), this.o ? a.mozRequestFullScreenWithKeys ? a.mozRequestFullScreenWithKeys() : a.webkitRequestFullscreen ? a.webkitRequestFullscreen() : lh(a) : lh(a))))
    };
    nh.prototype.i = function() {
        var a = this.d + "-true",
            c = this.d + "-false",
            d = Sf(this.element),
            e = this.a;
        mh() ? (Yf(d, c) && ($f(d, c), Zf(d, a)), Rf(this.g, this.f)) : (Yf(d, a) && ($f(d, a), Zf(d, c)), Rf(this.f, this.g));
        null === e || e.Kc()
    };

    function oh(a) {
        a = m(a) ? a : {};
        var c = Jf("DIV", m(a.className) ? a.className : "ol-mouse-position");
        ug.call(this, {
            element: c,
            render: m(a.render) ? a.render : ph,
            target: a.target
        });
        x(this, hd("projection"), this.jl, !1, this);
        m(a.coordinateFormat) && this.vh(a.coordinateFormat);
        m(a.projection) && this.yg(re(a.projection));
        this.o = m(a.undefinedHTML) ? a.undefinedHTML : "";
        this.i = c.innerHTML;
        this.g = this.f = this.d = null
    }
    w(oh, ug);

    function ph(a) {
        a = a.frameState;
        null === a ? this.d = null : this.d != a.viewState.projection && (this.d = a.viewState.projection, this.f = null);
        qh(this, this.g)
    }
    l = oh.prototype;
    l.jl = function() {
        this.f = null
    };
    l.Uf = function() {
        return this.get("coordinateFormat")
    };
    l.xg = function() {
        return this.get("projection")
    };
    l.$j = function(a) {
        this.g = this.a.Bd(a.b);
        qh(this, this.g)
    };
    l.ak = function() {
        qh(this, null);
        this.g = null
    };
    l.setMap = function(a) {
        oh.S.setMap.call(this, a);
        null !== a && (a = a.a, this.l.push(x(a, "mousemove", this.$j, !1, this), x(a, "mouseout", this.ak, !1, this)))
    };
    l.vh = function(a) {
        this.set("coordinateFormat", a)
    };
    l.yg = function(a) {
        this.set("projection", a)
    };

    function qh(a, c) {
        var d = a.o;
        if (null !== c && null !== a.d) {
            if (null === a.f) {
                var e = a.xg();
                a.f = m(e) ? ve(a.d, e) : Ke
            }
            e = a.a.ka(c);
            null !== e && (a.f(e, e), d = a.Uf(), d = m(d) ? d(e) : e.toString())
        }
        m(a.i) && d == a.i || (a.element.innerHTML = d, a.i = d)
    };

    function rh(a, c, d) {
        mc.call(this);
        this.d = a;
        this.c = d;
        this.b = c || window;
        this.a = ra(this.Pf, this)
    }
    w(rh, mc);
    l = rh.prototype;
    l.$ = null;
    l.zf = !1;
    l.start = function() {
        sh(this);
        this.zf = !1;
        var a = th(this),
            c = uh(this);
        a && !c && this.b.mozRequestAnimationFrame ? (this.$ = x(this.b, "MozBeforePaint", this.a), this.b.mozRequestAnimationFrame(null), this.zf = !0) : this.$ = a && c ? a.call(this.b, this.a) : this.b.setTimeout(Jg(this.a), 20)
    };

    function sh(a) {
        if (null != a.$) {
            var c = th(a),
                d = uh(a);
            c && !d && a.b.mozRequestAnimationFrame ? Wc(a.$) : c && d ? d.call(a.b, a.$) : a.b.clearTimeout(a.$)
        }
        a.$ = null
    }
    l.Pf = function() {
        this.zf && this.$ && Wc(this.$);
        this.$ = null;
        this.d.call(this.c, ua())
    };
    l.O = function() {
        sh(this);
        rh.S.O.call(this)
    };

    function th(a) {
        a = a.b;
        return a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame || a.oRequestAnimationFrame || a.msRequestAnimationFrame || null
    }

    function uh(a) {
        a = a.b;
        return a.cancelAnimationFrame || a.cancelRequestAnimationFrame || a.webkitCancelRequestAnimationFrame || a.mozCancelRequestAnimationFrame || a.oCancelRequestAnimationFrame || a.msCancelRequestAnimationFrame || null
    };

    function vh(a) {
        ba.setTimeout(function() {
            throw a;
        }, 0)
    }

    function wh(a, c) {
        var d = a;
        c && (d = ra(a, c));
        d = xh(d);
        !ka(ba.setImmediate) || ba.Window && ba.Window.prototype.setImmediate == ba.setImmediate ? (yh || (yh = zh()), yh(d)) : ba.setImmediate(d)
    }
    var yh;

    function zh() {
        var a = ba.MessageChannel;
        "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && (a = function() {
            var a = document.createElement("iframe");
            a.style.display = "none";
            a.src = "";
            document.documentElement.appendChild(a);
            var c = a.contentWindow,
                a = c.document;
            a.open();
            a.write("");
            a.close();
            var d = "callImmediate" + Math.random(),
                e = "file:" == c.location.protocol ? "*" : c.location.protocol + "//" + c.location.host,
                a = ra(function(a) {
                    if (("*" == e || a.origin == e) && a.data == d) this.port1.onmessage()
                }, this);
            c.addEventListener("message", a, !1);
            this.port1 = {};
            this.port2 = {
                postMessage: function() {
                    c.postMessage(d, e)
                }
            }
        });
        if ("undefined" !== typeof a && !ob("Trident") && !ob("MSIE")) {
            var c = new a,
                d = {},
                e = d;
            c.port1.onmessage = function() {
                if (m(d.next)) {
                    d = d.next;
                    var a = d.Lf;
                    d.Lf = null;
                    a()
                }
            };
            return function(a) {
                e.next = {
                    Lf: a
                };
                e = e.next;
                c.port2.postMessage(0)
            }
        }
        return "undefined" !== typeof document && "onreadystatechange" in document.createElement("script") ? function(a) {
            var c = document.createElement("script");
            c.onreadystatechange = function() {
                c.onreadystatechange = null;
                c.parentNode.removeChild(c);
                c = null;
                a();
                a = null
            };
            document.documentElement.appendChild(c)
        } : function(a) {
            ba.setTimeout(a, 0)
        }
    }
    var xh = Ig;

    function Ah(a) {
        if ("function" == typeof a.cb) return a.cb();
        if (ia(a)) return a.split("");
        if (ha(a)) {
            for (var c = [], d = a.length, e = 0; e < d; e++) c.push(a[e]);
            return c
        }
        return sb(a)
    }

    function Bh(a, c) {
        if ("function" == typeof a.forEach) a.forEach(c, void 0);
        else if (ha(a) || ia(a)) Sa(a, c, void 0);
        else {
            var d;
            if ("function" == typeof a.C) d = a.C();
            else if ("function" != typeof a.cb)
                if (ha(a) || ia(a)) {
                    d = [];
                    for (var e = a.length, f = 0; f < e; f++) d.push(f)
                } else d = tb(a);
            else d = void 0;
            for (var e = Ah(a), f = e.length, g = 0; g < f; g++) c.call(void 0, e[g], d && d[g], a)
        }
    };

    function Ch(a, c) {
        this.a = {};
        this.b = [];
        this.c = 0;
        var d = arguments.length;
        if (1 < d) {
            if (d % 2) throw Error("Uneven number of arguments");
            for (var e = 0; e < d; e += 2) this.set(arguments[e], arguments[e + 1])
        } else if (a) {
            a instanceof Ch ? (d = a.C(), e = a.cb()) : (d = tb(a), e = sb(a));
            for (var f = 0; f < d.length; f++) this.set(d[f], e[f])
        }
    }
    l = Ch.prototype;
    l.Tb = function() {
        return this.c
    };
    l.cb = function() {
        Dh(this);
        for (var a = [], c = 0; c < this.b.length; c++) a.push(this.a[this.b[c]]);
        return a
    };
    l.C = function() {
        Dh(this);
        return this.b.concat()
    };
    l.la = function() {
        return 0 == this.c
    };
    l.clear = function() {
        this.a = {};
        this.c = this.b.length = 0
    };
    l.remove = function(a) {
        return Eh(this.a, a) ? (delete this.a[a], this.c--, this.b.length > 2 * this.c && Dh(this), !0) : !1
    };

    function Dh(a) {
        if (a.c != a.b.length) {
            for (var c = 0, d = 0; c < a.b.length;) {
                var e = a.b[c];
                Eh(a.a, e) && (a.b[d++] = e);
                c++
            }
            a.b.length = d
        }
        if (a.c != a.b.length) {
            for (var f = {}, d = c = 0; c < a.b.length;) e = a.b[c], Eh(f, e) || (a.b[d++] = e, f[e] = 1), c++;
            a.b.length = d
        }
    }
    l.get = function(a, c) {
        return Eh(this.a, a) ? this.a[a] : c
    };
    l.set = function(a, c) {
        Eh(this.a, a) || (this.c++, this.b.push(a));
        this.a[a] = c
    };
    l.forEach = function(a, c) {
        for (var d = this.C(), e = 0; e < d.length; e++) {
            var f = d[e],
                g = this.get(f);
            a.call(c, g, f, this)
        }
    };
    l.clone = function() {
        return new Ch(this)
    };

    function Eh(a, c) {
        return Object.prototype.hasOwnProperty.call(a, c)
    };

    function Fh() {
        this.b = ua()
    }
    new Fh;
    Fh.prototype.set = function(a) {
        this.b = a
    };
    Fh.prototype.get = function() {
        return this.b
    };

    function Gh(a) {
        $c.call(this);
        this.pd = a || window;
        this.Md = x(this.pd, "resize", this.ik, !1, this);
        this.Nd = If(this.pd || window)
    }
    w(Gh, $c);
    l = Gh.prototype;
    l.Md = null;
    l.pd = null;
    l.Nd = null;
    l.O = function() {
        Gh.S.O.call(this);
        this.Md && (Wc(this.Md), this.Md = null);
        this.Nd = this.pd = null
    };
    l.ik = function() {
        var a = If(this.pd || window),
            c = this.Nd;
        a == c || a && c && a.width == c.width && a.height == c.height || (this.Nd = a, this.dispatchEvent("resize"))
    };

    function Hh(a, c, d, e, f) {
        if (!(Ib || Kb && Rb("525"))) return !0;
        if (Lb && f) return Ih(a);
        if (f && !e) return !1;
        ja(c) && (c = Jh(c));
        if (!d && (17 == c || 18 == c || Lb && 91 == c)) return !1;
        if (Kb && e && d) switch (a) {
            case 220:
            case 219:
            case 221:
            case 192:
            case 186:
            case 189:
            case 187:
            case 188:
            case 190:
            case 191:
            case 192:
            case 222:
                return !1
        }
        if (Ib && e && c == a) return !1;
        switch (a) {
            case 13:
                return !0;
            case 27:
                return !Kb
        }
        return Ih(a)
    }

    function Ih(a) {
        if (48 <= a && 57 >= a || 96 <= a && 106 >= a || 65 <= a && 90 >= a || Kb && 0 == a) return !0;
        switch (a) {
            case 32:
            case 63:
            case 107:
            case 109:
            case 110:
            case 111:
            case 186:
            case 59:
            case 189:
            case 187:
            case 61:
            case 188:
            case 190:
            case 191:
            case 192:
            case 222:
            case 219:
            case 220:
            case 221:
                return !0;
            default:
                return !1
        }
    }

    function Jh(a) {
        if (Jb) a = Kh(a);
        else if (Lb && Kb) a: switch (a) {
            case 93:
                a = 91;
                break a
        }
        return a
    }

    function Kh(a) {
        switch (a) {
            case 61:
                return 187;
            case 59:
                return 186;
            case 173:
                return 189;
            case 224:
                return 91;
            case 0:
                return 224;
            default:
                return a
        }
    };

    function Lh(a, c) {
        $c.call(this);
        a && Mh(this, a, c)
    }
    w(Lh, $c);
    l = Lh.prototype;
    l.Z = null;
    l.Ud = null;
    l.Ye = null;
    l.Vd = null;
    l.Ja = -1;
    l.Hb = -1;
    l.Ge = !1;
    var Nh = {
            3: 13,
            12: 144,
            63232: 38,
            63233: 40,
            63234: 37,
            63235: 39,
            63236: 112,
            63237: 113,
            63238: 114,
            63239: 115,
            63240: 116,
            63241: 117,
            63242: 118,
            63243: 119,
            63244: 120,
            63245: 121,
            63246: 122,
            63247: 123,
            63248: 44,
            63272: 46,
            63273: 36,
            63275: 35,
            63276: 33,
            63277: 34,
            63289: 144,
            63302: 45
        },
        Oh = {
            Up: 38,
            Down: 40,
            Left: 37,
            Right: 39,
            Enter: 13,
            F1: 112,
            F2: 113,
            F3: 114,
            F4: 115,
            F5: 116,
            F6: 117,
            F7: 118,
            F8: 119,
            F9: 120,
            F10: 121,
            F11: 122,
            F12: 123,
            "U+007F": 46,
            Home: 36,
            End: 35,
            PageUp: 33,
            PageDown: 34,
            Insert: 45
        },
        Ph = Ib || Kb && Rb("525"),
        Qh = Lb && Jb;
    Lh.prototype.b = function(a) {
        Kb && (17 == this.Ja && !a.i || 18 == this.Ja && !a.a || Lb && 91 == this.Ja && !a.l) && (this.Hb = this.Ja = -1); - 1 == this.Ja && (a.i && 17 != a.e ? this.Ja = 17 : a.a && 18 != a.e ? this.Ja = 18 : a.l && 91 != a.e && (this.Ja = 91));
        Ph && !Hh(a.e, this.Ja, a.d, a.i, a.a) ? this.handleEvent(a) : (this.Hb = Jh(a.e), Qh && (this.Ge = a.a))
    };
    Lh.prototype.a = function(a) {
        this.Hb = this.Ja = -1;
        this.Ge = a.a
    };
    Lh.prototype.handleEvent = function(a) {
        var c = a.b,
            d, e, f = c.altKey;
        Ib && "keypress" == a.type ? (d = this.Hb, e = 13 != d && 27 != d ? c.keyCode : 0) : Kb && "keypress" == a.type ? (d = this.Hb, e = 0 <= c.charCode && 63232 > c.charCode && Ih(d) ? c.charCode : 0) : Hb ? (d = this.Hb, e = Ih(d) ? c.keyCode : 0) : (d = c.keyCode || this.Hb, e = c.charCode || 0, Qh && (f = this.Ge), Lb && 63 == e && 224 == d && (d = 191));
        var g = d = Jh(d),
            h = c.keyIdentifier;
        d ? 63232 <= d && d in Nh ? g = Nh[d] : 25 == d && a.d && (g = 9) : h && h in Oh && (g = Oh[h]);
        this.Ja = g;
        a = new Rh(g, e, 0, c);
        a.a = f;
        this.dispatchEvent(a)
    };

    function Mh(a, c, d) {
        a.Vd && Sh(a);
        a.Z = c;
        a.Ud = x(a.Z, "keypress", a, d);
        a.Ye = x(a.Z, "keydown", a.b, d, a);
        a.Vd = x(a.Z, "keyup", a.a, d, a)
    }

    function Sh(a) {
        a.Ud && (Wc(a.Ud), Wc(a.Ye), Wc(a.Vd), a.Ud = null, a.Ye = null, a.Vd = null);
        a.Z = null;
        a.Ja = -1;
        a.Hb = -1
    }
    Lh.prototype.O = function() {
        Lh.S.O.call(this);
        Sh(this)
    };

    function Rh(a, c, d, e) {
        wc.call(this, e);
        this.type = "key";
        this.e = a;
        this.q = c
    }
    w(Rh, wc);

    function Th(a, c) {
        $c.call(this);
        var d = this.Z = a;
        (d = la(d) && 1 == d.nodeType ? this.Z : this.Z ? this.Z.body : null) && fg(d, "direction");
        this.b = x(this.Z, Jb ? "DOMMouseScroll" : "mousewheel", this, c)
    }
    w(Th, $c);
    Th.prototype.handleEvent = function(a) {
        var c = 0,
            d = 0,
            e = 0;
        a = a.b;
        if ("mousewheel" == a.type) {
            d = 1;
            if (Ib || Kb && (Mb || Rb("532.0"))) d = 40;
            e = Uh(-a.wheelDelta, d);
            m(a.wheelDeltaX) ? (c = Uh(-a.wheelDeltaX, d), d = Uh(-a.wheelDeltaY, d)) : d = e
        } else e = a.detail, 100 < e ? e = 3 : -100 > e && (e = -3), m(a.axis) && a.axis === a.HORIZONTAL_AXIS ? c = e : d = e;
        ja(this.a) && Vb(c, -this.a, this.a);
        ja(this.c) && (d = Vb(d, -this.c, this.c));
        c = new Vh(e, a, 0, d);
        this.dispatchEvent(c)
    };

    function Uh(a, c) {
        return Kb && (Lb || Nb) && 0 != a % c ? a : a / c
    }
    Th.prototype.O = function() {
        Th.S.O.call(this);
        Wc(this.b);
        this.b = null
    };

    function Vh(a, c, d, e) {
        wc.call(this, c);
        this.type = "mousewheel";
        this.detail = a;
        this.o = e
    }
    w(Vh, wc);

    function Wh(a, c, d) {
        rc.call(this, a);
        this.b = c;
        a = m(d) ? d : {};
        this.buttons = Xh(a);
        this.pressure = Yh(a, this.buttons);
        this.bubbles = Ab(a, "bubbles", !1);
        this.cancelable = Ab(a, "cancelable", !1);
        this.view = Ab(a, "view", null);
        this.detail = Ab(a, "detail", null);
        this.screenX = Ab(a, "screenX", 0);
        this.screenY = Ab(a, "screenY", 0);
        this.clientX = Ab(a, "clientX", 0);
        this.clientY = Ab(a, "clientY", 0);
        this.button = Ab(a, "button", 0);
        this.relatedTarget = Ab(a, "relatedTarget", null);
        this.pointerId = Ab(a, "pointerId", 0);
        this.width = Ab(a, "width", 0);
        this.height = Ab(a, "height", 0);
        this.pointerType = Ab(a, "pointerType", "");
        this.isPrimary = Ab(a, "isPrimary", !1);
        c.preventDefault && (this.preventDefault = function() {
            c.preventDefault()
        })
    }
    w(Wh, rc);

    function Xh(a) {
        if (a.buttons || Zh) a = a.buttons;
        else switch (a.which) {
            case 1:
                a = 1;
                break;
            case 2:
                a = 4;
                break;
            case 3:
                a = 2;
                break;
            default:
                a = 0
        }
        return a
    }

    function Yh(a, c) {
        var d = 0;
        a.pressure ? d = a.pressure : d = c ? .5 : 0;
        return d
    }
    var Zh = !1;
    try {
        Zh = 1 === (new MouseEvent("click", {
            buttons: 1
        })).buttons
    } catch ($h) {};

    function ai(a, c) {
        var d = Mf("CANVAS");
        m(a) && (d.width = a);
        m(c) && (d.height = c);
        return d.getContext("2d")
    }
    var ci = function() {
            var a;
            return function() {
                if (!m(a))
                    if (ba.getComputedStyle) {
                        var c = Mf("P"),
                            d, e = {
                                webkitTransform: "-webkit-transform",
                                OTransform: "-o-transform",
                                msTransform: "-ms-transform",
                                MozTransform: "-moz-transform",
                                transform: "transform"
                            };
                        document.body.appendChild(c);
                        for (var f in e) f in c.style && (c.style[f] = "translate(1px,1px)", d = ba.getComputedStyle(c).getPropertyValue(e[f]));
                        Qf(c);
                        a = d && "none" !== d
                    } else a = !1;
                return a
            }
        }(),
        di = function() {
            var a;
            return function() {
                if (!m(a))
                    if (ba.getComputedStyle) {
                        var c = Mf("P"),
                            d, e = {
                                webkitTransform: "-webkit-transform",
                                OTransform: "-o-transform",
                                msTransform: "-ms-transform",
                                MozTransform: "-moz-transform",
                                transform: "transform"
                            };
                        document.body.appendChild(c);
                        for (var f in e) f in c.style && (c.style[f] = "translate3d(1px,1px,1px)", d = ba.getComputedStyle(c).getPropertyValue(e[f]));
                        Qf(c);
                        a = d && "none" !== d
                    } else a = !1;
                return a
            }
        }();

    function ei(a, c) {
        var d = a.style;
        d.WebkitTransform = c;
        d.MozTransform = c;
        d.b = c;
        d.msTransform = c;
        d.transform = c;
        Ib && !Ub && (a.style.transformOrigin = "0 0")
    }

    function fi(a, c) {
        var d;
        if (di()) {
            if (m(6)) {
                var e = Array(16);
                for (d = 0; 16 > d; ++d) e[d] = c[d].toFixed(6);
                d = e.join(",")
            } else d = c.join(",");
            ei(a, "matrix3d(" + d + ")")
        } else if (ci()) {
            e = [c[0], c[1], c[4], c[5], c[12], c[13]];
            if (m(6)) {
                var f = Array(6);
                for (d = 0; 6 > d; ++d) f[d] = e[d].toFixed(6);
                d = f.join(",")
            } else d = e.join(",");
            ei(a, "matrix(" + d + ")")
        } else a.style.left = Math.round(c[12]) + "px", a.style.top = Math.round(c[13]) + "px"
    };
    var gi = ["experimental-webgl", "webgl", "webkit-3d", "moz-webgl"];

    function hi(a, c) {
        var d, e, f = gi.length;
        for (e = 0; e < f; ++e) try {
            if (d = a.getContext(gi[e], c), null !== d) return d
        } catch (g) {}
        return null
    };
    var ii, ji = ba.devicePixelRatio || 1,
        ki = !1,
        li = function() {
            if (!("HTMLCanvasElement" in ba)) return !1;
            try {
                var a = ai();
                if (null === a) return !1;
                m(a.setLineDash) && (ki = !0);
                return !0
            } catch (c) {
                return !1
            }
        }(),
        mi = "DeviceOrientationEvent" in ba,
        ni = "geolocation" in ba.navigator,
        oi = "ontouchstart" in ba,
        pi = "PointerEvent" in ba,
        qi = !!ba.navigator.msPointerEnabled,
        ri = !1,
        si, ti = [];
    if ("WebGLRenderingContext" in ba) try {
        var ui = hi(Mf("CANVAS"), {
            Ei: !0
        });
        null !== ui && (ri = !0, si = ui.getParameter(ui.MAX_TEXTURE_SIZE), ti = ui.getSupportedExtensions())
    } catch (vi) {}
    ii = ri;
    wa = ti;
    va = si;

    function wi(a, c) {
        this.b = a;
        this.e = c
    };

    function xi(a) {
        wi.call(this, a, {
            mousedown: this.tk,
            mousemove: this.uk,
            mouseup: this.xk,
            mouseover: this.wk,
            mouseout: this.vk
        });
        this.a = a.a;
        this.c = []
    }
    w(xi, wi);

    function yi(a, c) {
        for (var d = a.c, e = c.clientX, f = c.clientY, g = 0, h = d.length, k; g < h && (k = d[g]); g++) {
            var n = Math.abs(f - k[1]);
            if (25 >= Math.abs(e - k[0]) && 25 >= n) return !0
        }
        return !1
    }

    function zi(a) {
        var c = Ai(a, a.b),
            d = c.preventDefault;
        c.preventDefault = function() {
            a.preventDefault();
            d()
        };
        c.pointerId = 1;
        c.isPrimary = !0;
        c.pointerType = "mouse";
        return c
    }
    l = xi.prototype;
    l.tk = function(a) {
        if (!yi(this, a)) {
            (1).toString() in this.a && this.cancel(a);
            var c = zi(a);
            this.a[(1).toString()] = a;
            Bi(this.b, Ci, c, a)
        }
    };
    l.uk = function(a) {
        if (!yi(this, a)) {
            var c = zi(a);
            Bi(this.b, Di, c, a)
        }
    };
    l.xk = function(a) {
        if (!yi(this, a)) {
            var c = this.a[(1).toString()];
            c && c.button === a.button && (c = zi(a), Bi(this.b, Ei, c, a), zb(this.a, (1).toString()))
        }
    };
    l.wk = function(a) {
        if (!yi(this, a)) {
            var c = zi(a);
            Fi(this.b, c, a)
        }
    };
    l.vk = function(a) {
        if (!yi(this, a)) {
            var c = zi(a);
            Gi(this.b, c, a)
        }
    };
    l.cancel = function(a) {
        var c = zi(a);
        this.b.cancel(c, a);
        zb(this.a, (1).toString())
    };

    function Hi(a) {
        wi.call(this, a, {
            MSPointerDown: this.Ck,
            MSPointerMove: this.Dk,
            MSPointerUp: this.Gk,
            MSPointerOut: this.Ek,
            MSPointerOver: this.Fk,
            MSPointerCancel: this.Bk,
            MSGotPointerCapture: this.zk,
            MSLostPointerCapture: this.Ak
        });
        this.a = a.a;
        this.c = ["", "unavailable", "touch", "pen", "mouse"]
    }
    w(Hi, wi);

    function Ii(a, c) {
        var d = c;
        ja(c.b.pointerType) && (d = Ai(c, c.b), d.pointerType = a.c[c.b.pointerType]);
        return d
    }
    l = Hi.prototype;
    l.Ck = function(a) {
        this.a[a.b.pointerId] = a;
        var c = Ii(this, a);
        Bi(this.b, Ci, c, a)
    };
    l.Dk = function(a) {
        var c = Ii(this, a);
        Bi(this.b, Di, c, a)
    };
    l.Gk = function(a) {
        var c = Ii(this, a);
        Bi(this.b, Ei, c, a);
        zb(this.a, a.b.pointerId)
    };
    l.Ek = function(a) {
        var c = Ii(this, a);
        Gi(this.b, c, a)
    };
    l.Fk = function(a) {
        var c = Ii(this, a);
        Fi(this.b, c, a)
    };
    l.Bk = function(a) {
        var c = Ii(this, a);
        this.b.cancel(c, a);
        zb(this.a, a.b.pointerId)
    };
    l.Ak = function(a) {
        this.b.dispatchEvent(new Wh("lostpointercapture", a, a.b))
    };
    l.zk = function(a) {
        this.b.dispatchEvent(new Wh("gotpointercapture", a, a.b))
    };

    function Ji(a) {
        wi.call(this, a, {
            pointerdown: this.nn,
            pointermove: this.pn,
            pointerup: this.sn,
            pointerout: this.qn,
            pointerover: this.rn,
            pointercancel: this.mn,
            gotpointercapture: this.Fj,
            lostpointercapture: this.sk
        })
    }
    w(Ji, wi);
    l = Ji.prototype;
    l.nn = function(a) {
        Ki(this.b, a)
    };
    l.pn = function(a) {
        Ki(this.b, a)
    };
    l.sn = function(a) {
        Ki(this.b, a)
    };
    l.qn = function(a) {
        Ki(this.b, a)
    };
    l.rn = function(a) {
        Ki(this.b, a)
    };
    l.mn = function(a) {
        Ki(this.b, a)
    };
    l.sk = function(a) {
        Ki(this.b, a)
    };
    l.Fj = function(a) {
        Ki(this.b, a)
    };

    function Li(a, c) {
        wi.call(this, a, {
            touchstart: this.so,
            touchmove: this.ro,
            touchend: this.qo,
            touchcancel: this.po
        });
        this.a = a.a;
        this.g = c;
        this.c = void 0;
        this.f = 0;
        this.d = void 0
    }
    w(Li, wi);
    l = Li.prototype;
    l.qh = function() {
        this.f = 0;
        this.d = void 0
    };

    function Mi(a, c, d) {
        c = Ai(c, d);
        c.pointerId = d.identifier + 2;
        c.bubbles = !0;
        c.cancelable = !0;
        c.detail = a.f;
        c.button = 0;
        c.buttons = 1;
        c.width = d.webkitRadiusX || d.radiusX || 0;
        c.height = d.webkitRadiusY || d.radiusY || 0;
        c.pressure = d.webkitForce || d.force || .5;
        c.isPrimary = a.c === d.identifier;
        c.pointerType = "touch";
        c.clientX = d.clientX;
        c.clientY = d.clientY;
        c.screenX = d.screenX;
        c.screenY = d.screenY;
        return c
    }

    function Ni(a, c, d) {
        function e() {
            c.preventDefault()
        }
        var f = Array.prototype.slice.call(c.b.changedTouches),
            g = f.length,
            h, k;
        for (h = 0; h < g; ++h) k = Mi(a, c, f[h]), k.preventDefault = e, d.call(a, c, k)
    }
    l.so = function(a) {
        var c = a.b.touches,
            d = tb(this.a),
            e = d.length;
        if (e >= c.length) {
            var f = [],
                g, h, k;
            for (g = 0; g < e; ++g) {
                h = d[g];
                k = this.a[h];
                var n;
                if (!(n = 1 == h)) a: {
                    n = c.length;
                    for (var p = void 0, q = 0; q < n; q++)
                        if (p = c[q], p.identifier === h - 2) {
                            n = !0;
                            break a
                        }
                    n = !1
                }
                n || f.push(k.ec)
            }
            for (g = 0; g < f.length; ++g) this.He(a, f[g])
        }
        c = rb(this.a);
        if (0 === c || 1 === c && (1).toString() in this.a) this.c = a.b.changedTouches[0].identifier, m(this.d) && ba.clearTimeout(this.d);
        Oi(this, a);
        this.f++;
        Ni(this, a, this.hn)
    };
    l.hn = function(a, c) {
        this.a[c.pointerId] = {
            target: c.target,
            ec: c,
            Zg: c.target
        };
        var d = this.b;
        c.bubbles = !0;
        Bi(d, Pi, c, a);
        d = this.b;
        c.bubbles = !1;
        Bi(d, Qi, c, a);
        Bi(this.b, Ci, c, a)
    };
    l.ro = function(a) {
        a.preventDefault();
        Ni(this, a, this.yk)
    };
    l.yk = function(a, c) {
        var d = this.a[c.pointerId];
        if (d) {
            var e = d.ec,
                f = d.Zg;
            Bi(this.b, Di, c, a);
            e && f !== c.target && (e.relatedTarget = c.target, c.relatedTarget = f, e.target = f, c.target ? (Gi(this.b, e, a), Fi(this.b, c, a)) : (c.target = f, c.relatedTarget = null, this.He(a, c)));
            d.ec = c;
            d.Zg = c.target
        }
    };
    l.qo = function(a) {
        Oi(this, a);
        Ni(this, a, this.to)
    };
    l.to = function(a, c) {
        Bi(this.b, Ei, c, a);
        this.b.ec(c, a);
        var d = this.b;
        c.bubbles = !1;
        Bi(d, Ri, c, a);
        zb(this.a, c.pointerId);
        c.isPrimary && (this.c = void 0, this.d = ba.setTimeout(ra(this.qh, this), 200))
    };
    l.po = function(a) {
        Ni(this, a, this.He)
    };
    l.He = function(a, c) {
        this.b.cancel(c, a);
        this.b.ec(c, a);
        var d = this.b;
        c.bubbles = !1;
        Bi(d, Ri, c, a);
        zb(this.a, c.pointerId);
        c.isPrimary && (this.c = void 0, this.d = ba.setTimeout(ra(this.qh, this), 200))
    };

    function Oi(a, c) {
        var d = a.g.c,
            e = c.b.changedTouches[0];
        if (a.c === e.identifier) {
            var f = [e.clientX, e.clientY];
            d.push(f);
            ba.setTimeout(function() {
                Za(d, f)
            }, 2500)
        }
    };

    function Si(a) {
        $c.call(this);
        this.Z = a;
        this.a = {};
        this.c = {};
        this.b = [];
        pi ? Ti(this, new Ji(this)) : qi ? Ti(this, new Hi(this)) : (a = new xi(this), Ti(this, a), oi && Ti(this, new Li(this, a)));
        a = this.b.length;
        for (var c, d = 0; d < a; d++) c = this.b[d], Ui(this, tb(c.e))
    }
    w(Si, $c);

    function Ti(a, c) {
        var d = tb(c.e);
        d && (Sa(d, function(a) {
            var d = c.e[a];
            d && (this.c[a] = ra(d, c))
        }, a), a.b.push(c))
    }
    Si.prototype.d = function(a) {
        var c = this.c[a.type];
        c && c(a)
    };

    function Ui(a, c) {
        Sa(c, function(a) {
            x(this.Z, a, this.d, !1, this)
        }, a)
    }

    function Vi(a, c) {
        Sa(c, function(a) {
            Vc(this.Z, a, this.d, !1, this)
        }, a)
    }

    function Ai(a, c) {
        for (var d = {}, e, f = 0, g = Wi.length; f < g; f++) e = Wi[f][0], d[e] = a[e] || c[e] || Wi[f][1];
        return d
    }
    Si.prototype.ec = function(a, c) {
        a.bubbles = !0;
        Bi(this, Xi, a, c)
    };
    Si.prototype.cancel = function(a, c) {
        Bi(this, Yi, a, c)
    };

    function Gi(a, c, d) {
        a.ec(c, d);
        var e = c.relatedTarget;
        null !== e && Tf(c.target, e) || (c.bubbles = !1, Bi(a, Ri, c, d))
    }

    function Fi(a, c, d) {
        c.bubbles = !0;
        Bi(a, Pi, c, d);
        var e = c.relatedTarget;
        null !== e && Tf(c.target, e) || (c.bubbles = !1, Bi(a, Qi, c, d))
    }

    function Bi(a, c, d, e) {
        a.dispatchEvent(new Wh(c, e, d))
    }

    function Ki(a, c) {
        a.dispatchEvent(new Wh(c.type, c, c.b))
    }
    Si.prototype.O = function() {
        for (var a = this.b.length, c, d = 0; d < a; d++) c = this.b[d], Vi(this, tb(c.e));
        Si.S.O.call(this)
    };
    var Di = "pointermove",
        Ci = "pointerdown",
        Ei = "pointerup",
        Pi = "pointerover",
        Xi = "pointerout",
        Qi = "pointerenter",
        Ri = "pointerleave",
        Yi = "pointercancel",
        Wi = [
            ["bubbles", !1],
            ["cancelable", !1],
            ["view", null],
            ["detail", null],
            ["screenX", 0],
            ["screenY", 0],
            ["clientX", 0],
            ["clientY", 0],
            ["ctrlKey", !1],
            ["altKey", !1],
            ["shiftKey", !1],
            ["metaKey", !1],
            ["button", 0],
            ["relatedTarget", null],
            ["buttons", 0],
            ["pointerId", 0],
            ["width", 0],
            ["height", 0],
            ["pressure", 0],
            ["tiltX", 0],
            ["tiltY", 0],
            ["pointerType", ""],
            ["hwTimestamp", 0],
            ["isPrimary", !1],
            ["type", ""],
            ["target", null],
            ["currentTarget", null],
            ["which", 0]
        ];

    function Zi(a, c, d, e, f) {
        tg.call(this, a, c, f);
        this.b = d;
        this.originalEvent = d.b;
        this.pixel = c.Bd(this.originalEvent);
        this.coordinate = c.ka(this.pixel);
        this.dragging = m(e) ? e : !1
    }
    w(Zi, tg);
    Zi.prototype.preventDefault = function() {
        Zi.S.preventDefault.call(this);
        this.b.preventDefault()
    };
    Zi.prototype.fb = function() {
        Zi.S.fb.call(this);
        this.b.fb()
    };

    function $i(a, c, d, e, f) {
        Zi.call(this, a, c, d.b, e, f);
        this.a = d
    }
    w($i, Zi);

    function aj(a) {
        $c.call(this);
        this.c = a;
        this.f = 0;
        this.g = !1;
        this.a = this.i = this.d = null;
        a = this.c.a;
        this.o = 0;
        this.l = {};
        this.e = new Si(a);
        this.b = null;
        this.i = x(this.e, Ci, this.dk, !1, this);
        this.q = x(this.e, Di, this.Kn, !1, this)
    }
    w(aj, $c);

    function bj(a, c) {
        var d;
        d = new $i(cj, a.c, c);
        a.dispatchEvent(d);
        0 !== a.f ? (ba.clearTimeout(a.f), a.f = 0, d = new $i(dj, a.c, c), a.dispatchEvent(d)) : a.f = ba.setTimeout(ra(function() {
            this.f = 0;
            var a = new $i(ej, this.c, c);
            this.dispatchEvent(a)
        }, a), 250)
    }

    function fj(a, c) {
        c.type == gj || c.type == hj ? delete a.l[c.pointerId] : c.type == ij && (a.l[c.pointerId] = !0);
        a.o = rb(a.l)
    }
    l = aj.prototype;
    l.fg = function(a) {
        fj(this, a);
        var c = new $i(gj, this.c, a);
        this.dispatchEvent(c);
        !this.g && 0 === a.button && bj(this, this.a);
        0 === this.o && (Sa(this.d, Wc), this.d = null, this.g = !1, this.a = null, qc(this.b), this.b = null)
    };
    l.dk = function(a) {
        fj(this, a);
        var c = new $i(ij, this.c, a);
        this.dispatchEvent(c);
        this.a = a;
        null === this.d && (this.b = new Si(document), this.d = [x(this.b, jj, this.$k, !1, this), x(this.b, gj, this.fg, !1, this), x(this.e, hj, this.fg, !1, this)])
    };
    l.$k = function(a) {
        if (a.clientX != this.a.clientX || a.clientY != this.a.clientY) {
            this.g = !0;
            var c = new $i(kj, this.c, a, this.g);
            this.dispatchEvent(c)
        }
        a.preventDefault()
    };
    l.Kn = function(a) {
        this.dispatchEvent(new $i(a.type, this.c, a, null !== this.a && (a.clientX != this.a.clientX || a.clientY != this.a.clientY)))
    };
    l.O = function() {
        null !== this.q && (Wc(this.q), this.q = null);
        null !== this.i && (Wc(this.i), this.i = null);
        null !== this.d && (Sa(this.d, Wc), this.d = null);
        null !== this.b && (qc(this.b), this.b = null);
        null !== this.e && (qc(this.e), this.e = null);
        aj.S.O.call(this)
    };
    var ej = "singleclick",
        cj = "click",
        dj = "dblclick",
        kj = "pointerdrag",
        jj = "pointermove",
        ij = "pointerdown",
        gj = "pointerup",
        hj = "pointercancel",
        lj = {
            Ko: ej,
            zo: cj,
            Ao: dj,
            Do: kj,
            Go: jj,
            Co: ij,
            Jo: gj,
            Io: "pointerover",
            Ho: "pointerout",
            Eo: "pointerenter",
            Fo: "pointerleave",
            Bo: hj
        };

    function mj(a) {
        fd.call(this);
        var c = Db(a);
        c.brightness = m(a.brightness) ? a.brightness : 0;
        c.contrast = m(a.contrast) ? a.contrast : 1;
        c.hue = m(a.hue) ? a.hue : 0;
        c.opacity = m(a.opacity) ? a.opacity : 1;
        c.saturation = m(a.saturation) ? a.saturation : 1;
        c.visible = m(a.visible) ? a.visible : !0;
        c.maxResolution = m(a.maxResolution) ? a.maxResolution : Infinity;
        c.minResolution = m(a.minResolution) ? a.minResolution : 0;
        this.t(c)
    }
    w(mj, fd);
    l = mj.prototype;
    l.Bb = function() {
        return this.get("brightness")
    };
    l.Cb = function() {
        return this.get("contrast")
    };
    l.Db = function() {
        return this.get("hue")
    };

    function nj(a) {
        var c = a.Bb(),
            d = a.Cb(),
            e = a.Db(),
            f = a.Kb(),
            g = a.Gb(),
            h = a.We(),
            k = a.eb(),
            n = a.G(),
            p = a.Eb(),
            q = a.Fb();
        return {
            layer: a,
            brightness: Vb(c, -1, 1),
            contrast: Math.max(d, 0),
            hue: e,
            opacity: Vb(f, 0, 1),
            saturation: Math.max(g, 0),
            i: h,
            visible: k,
            extent: n,
            maxResolution: p,
            minResolution: Math.max(q, 0)
        }
    }
    l.G = function() {
        return this.get("extent")
    };
    l.Eb = function() {
        return this.get("maxResolution")
    };
    l.Fb = function() {
        return this.get("minResolution")
    };
    l.Kb = function() {
        return this.get("opacity")
    };
    l.Gb = function() {
        return this.get("saturation")
    };
    l.eb = function() {
        return this.get("visible")
    };
    l.gc = function(a) {
        this.set("brightness", a)
    };
    l.hc = function(a) {
        this.set("contrast", a)
    };
    l.ic = function(a) {
        this.set("hue", a)
    };
    l.bc = function(a) {
        this.set("extent", a)
    };
    l.jc = function(a) {
        this.set("maxResolution", a)
    };
    l.kc = function(a) {
        this.set("minResolution", a)
    };
    l.cc = function(a) {
        this.set("opacity", a)
    };
    l.lc = function(a) {
        this.set("saturation", a)
    };
    l.mc = function(a) {
        this.set("visible", a)
    };

    function C(a) {
        var c = Db(a);
        delete c.source;
        mj.call(this, c);
        this.f = null;
        x(this, hd("source"), this.kk, !1, this);
        this.Jc(m(a.source) ? a.source : null)
    }
    w(C, mj);

    function oj(a, c) {
        return a.visible && c >= a.minResolution && c < a.maxResolution
    }
    l = C.prototype;
    l.Ue = function(a) {
        a = m(a) ? a : [];
        a.push(nj(this));
        return a
    };
    l.da = function() {
        var a = this.get("source");
        return m(a) ? a : null
    };
    l.We = function() {
        var a = this.da();
        return null === a ? "undefined" : a.o
    };
    l.Kl = function() {
        this.k()
    };
    l.kk = function() {
        null !== this.f && (Wc(this.f), this.f = null);
        var a = this.da();
        null !== a && (this.f = x(a, "change", this.Kl, !1, this));
        this.k()
    };
    l.Jc = function(a) {
        this.set("source", a)
    };

    function pj(a, c, d, e, f) {
        $c.call(this);
        this.f = f;
        this.extent = a;
        this.e = d;
        this.resolution = c;
        this.state = e
    }
    w(pj, $c);
    pj.prototype.G = function() {
        return this.extent
    };

    function qj(a, c, d, e, f, g, h, k) {
        Dd(a);
        0 === c && 0 === d || Gd(a, c, d);
        1 == e && 1 == f || Hd(a, e, f);
        0 !== g && Id(a, g);
        0 === h && 0 === k || Gd(a, h, k);
        return a
    }

    function rj(a, c) {
        return a[0] == c[0] && a[1] == c[1] && a[4] == c[4] && a[5] == c[5] && a[12] == c[12] && a[13] == c[13]
    }

    function sj(a, c, d) {
        var e = a[1],
            f = a[5],
            g = a[13],
            h = c[0];
        c = c[1];
        d[0] = a[0] * h + a[4] * c + a[12];
        d[1] = e * h + f * c + g;
        return d
    };

    function uj(a) {
        cd.call(this);
        this.a = a
    }
    w(uj, cd);
    l = uj.prototype;
    l.Pa = ca;
    l.dc = function(a, c, d, e) {
        a = a.slice();
        sj(c.pixelToCoordinateMatrix, a, a);
        if (this.Pa(a, c, Gg, this)) return d.call(e, this.a)
    };
    l.ee = Fg;
    l.yd = function(a, c) {
        return function(d, e) {
            return $g(a, d, e, function(a) {
                c[d] || (c[d] = {});
                c[d][a.b.toString()] = a
            })
        }
    };
    l.Ol = function(a) {
        2 === a.target.state && vj(this)
    };

    function wj(a, c) {
        var d = c.state;
        2 != d && 3 != d && x(c, "change", a.Ol, !1, a);
        0 == d && (c.load(), d = c.state);
        return 2 == d
    }

    function vj(a) {
        var c = a.a;
        c.eb() && "ready" == c.We() && a.k()
    }

    function xj(a, c) {
        yg(c.a) && a.postRenderFunctions.push(ta(function(a, c, f) {
            c = ma(a).toString();
            a = a.a;
            f = f.usedTiles[c];
            for (var g; yg(a) && !(c = a.b.qc, g = c.b[0].toString(), g in f && f[g].contains(c.b));) a.pop().Yc()
        }, c))
    }

    function yj(a, c) {
        if (null != c) {
            var d, e, f;
            e = 0;
            for (f = c.length; e < f; ++e) d = c[e], a[ma(d).toString()] = d
        }
    }

    function zj(a, c) {
        var d = c.L;
        m(d) && (ia(d) ? a.logos[d] = "" : la(d) && (a.logos[d.src] = d.href))
    }

    function Aj(a, c, d, e) {
        c = ma(c).toString();
        d = d.toString();
        c in a ? d in a[c] ? (a = a[c][d], e.b < a.b && (a.b = e.b), e.d > a.d && (a.d = e.d), e.c < a.c && (a.c = e.c), e.a > a.a && (a.a = e.a)) : a[c][d] = e : (a[c] = {}, a[c][d] = e)
    }

    function Bj(a, c, d) {
        return [c * (Math.round(a[0] / c) + d[0] % 2 / 2), c * (Math.round(a[1] / c) + d[1] % 2 / 2)]
    }

    function Cj(a, c, d, e, f, g, h, k, n, p) {
        var q = ma(c).toString();
        q in a.wantedTiles || (a.wantedTiles[q] = {});
        var r = a.wantedTiles[q];
        a = a.tileQueue;
        var t = d.minZoom,
            u, A, z, D, B, y;
        for (y = h; y >= t; --y)
            for (A = Pg(d, g, y, A), z = d.ma(y), D = A.b; D <= A.d; ++D)
                for (B = A.c; B <= A.a; ++B) h - y <= k ? (u = c.Vb(y, D, B, e, f), 0 == u.state && (r[ef(u.b)] = !0, u.gb() in a.c || Dj(a, [u, q, Sg(d, u.b), z])), m(n) && n.call(p, u)) : c.yf(y, D, B)
    };

    function Ej(a) {
        this.U = a.opacity;
        this.V = a.rotateWithView;
        this.q = a.rotation;
        this.l = a.scale;
        this.n = a.snapToPixel
    }
    l = Ej.prototype;
    l.ie = function() {
        return this.U
    };
    l.Jd = function() {
        return this.V
    };
    l.je = function() {
        return this.q
    };
    l.ke = function() {
        return this.l
    };
    l.Kd = function() {
        return this.n
    };
    l.le = function(a) {
        this.q = a
    };
    l.me = function(a) {
        this.l = a
    };

    function Fj(a) {
        a = m(a) ? a : {};
        this.e = m(a.anchor) ? a.anchor : [.5, .5];
        this.d = null;
        this.a = m(a.anchorOrigin) ? a.anchorOrigin : "top-left";
        this.g = m(a.anchorXUnits) ? a.anchorXUnits : "fraction";
        this.i = m(a.anchorYUnits) ? a.anchorYUnits : "fraction";
        var c = m(a.crossOrigin) ? a.crossOrigin : null,
            d = m(a.img) ? a.img : null,
            e = m(a.imgSize) ? a.imgSize : null,
            f = a.src;
        m(f) && 0 !== f.length || null === d || (f = d.src);
        var g = m(a.src) ? 0 : 2,
            h = Gj.Ia(),
            k = h.get(f, c);
        null === k && (k = new Hj(d, f, e, c, g), h.set(f, c, k));
        this.b = k;
        this.p = m(a.offset) ? a.offset : [0, 0];
        this.c = m(a.offsetOrigin) ? a.offsetOrigin : "top-left";
        this.f = null;
        this.o = m(a.size) ? a.size : null;
        Ej.call(this, {
            opacity: m(a.opacity) ? a.opacity : 1,
            rotation: m(a.rotation) ? a.rotation : 0,
            scale: m(a.scale) ? a.scale : 1,
            snapToPixel: m(a.snapToPixel) ? a.snapToPixel : !0,
            rotateWithView: m(a.rotateWithView) ? a.rotateWithView : !1
        })
    }
    w(Fj, Ej);
    l = Fj.prototype;
    l.mb = function() {
        if (null !== this.d) return this.d;
        var a = this.e,
            c = this.Xa();
        if ("fraction" == this.g || "fraction" == this.i) {
            if (null === c) return null;
            a = this.e.slice();
            "fraction" == this.g && (a[0] *= c[0]);
            "fraction" == this.i && (a[1] *= c[1])
        }
        if ("top-left" != this.a) {
            if (null === c) return null;
            a === this.e && (a = this.e.slice());
            if ("top-right" == this.a || "bottom-right" == this.a) a[0] = -a[0] + c[0];
            if ("bottom-left" == this.a || "bottom-right" == this.a) a[1] = -a[1] + c[1]
        }
        return this.d = a
    };
    l.Lb = function() {
        return this.b.b
    };
    l.Dd = function() {
        return this.b.a
    };
    l.gd = function() {
        return this.b.c
    };
    l.he = function() {
        var a = this.b;
        if (null === a.e)
            if (a.i) {
                var c = a.a[0],
                    d = a.a[1],
                    e = ai(c, d);
                e.fillRect(0, 0, c, d);
                a.e = e.canvas
            } else a.e = a.b;
        return a.e
    };
    l.rb = function() {
        if (null !== this.f) return this.f;
        var a = this.p;
        if ("top-left" != this.c) {
            var c = this.Xa(),
                d = this.b.a;
            if (null === c || null === d) return null;
            a = a.slice();
            if ("top-right" == this.c || "bottom-right" == this.c) a[0] = d[0] - c[0] - a[0];
            if ("bottom-left" == this.c || "bottom-right" == this.c) a[1] = d[1] - c[1] - a[1]
        }
        return this.f = a
    };
    l.Bm = function() {
        return this.b.f
    };
    l.Xa = function() {
        return null === this.o ? this.b.a : this.o
    };
    l.$e = function(a, c) {
        return x(this.b, "change", a, !1, c)
    };
    l.load = function() {
        this.b.load()
    };
    l.xf = function(a, c) {
        Vc(this.b, "change", a, !1, c)
    };

    function Hj(a, c, d, e, f) {
        $c.call(this);
        this.e = null;
        this.b = null === a ? new Image : a;
        null !== e && (this.b.crossOrigin = e);
        this.d = null;
        this.c = f;
        this.a = d;
        this.f = c;
        this.i = !1
    }
    w(Hj, $c);
    Hj.prototype.g = function() {
        this.c = 3;
        Sa(this.d, Wc);
        this.d = null;
        this.dispatchEvent("change")
    };
    Hj.prototype.q = function() {
        this.c = 2;
        this.a = [this.b.width, this.b.height];
        Sa(this.d, Wc);
        this.d = null;
        var a = ai(1, 1);
        a.drawImage(this.b, 0, 0);
        try {
            a.getImageData(0, 0, 1, 1)
        } catch (c) {
            this.i = !0
        }
        this.dispatchEvent("change")
    };
    Hj.prototype.load = function() {
        if (0 == this.c) {
            this.c = 1;
            this.d = [Uc(this.b, "error", this.g, !1, this), Uc(this.b, "load", this.q, !1, this)];
            try {
                this.b.src = this.f
            } catch (a) {
                this.g()
            }
        }
    };

    function Gj() {
        this.b = {};
        this.a = 0
    }
    da(Gj);
    Gj.prototype.clear = function() {
        this.b = {};
        this.a = 0
    };
    Gj.prototype.get = function(a, c) {
        var d = c + ":" + a;
        return d in this.b ? this.b[d] : null
    };
    Gj.prototype.set = function(a, c, d) {
        this.b[c + ":" + a] = d;
        ++this.a
    };

    function Ij(a, c) {
        mc.call(this);
        this.g = c;
        this.c = null;
        this.f = {};
        this.o = {}
    }
    w(Ij, mc);

    function Jj(a) {
        var c = a.viewState,
            d = a.coordinateToPixelMatrix;
        qj(d, a.size[0] / 2, a.size[1] / 2, 1 / c.resolution, -1 / c.resolution, -c.rotation, -c.center[0], -c.center[1]);
        Fd(d, a.pixelToCoordinateMatrix)
    }
    l = Ij.prototype;
    l.O = function() {
        pb(this.f, qc);
        Ij.S.O.call(this)
    };

    function Kj() {
        var a = Gj.Ia();
        if (32 < a.a) {
            var c = 0,
                d, e;
            for (d in a.b) {
                e = a.b[d];
                var f;
                if (f = 0 === (c++ & 3)) Bc(e) ? e = bd(e, void 0, void 0) : (e = Qc(e), e = !!e && Kc(e, void 0, void 0)), f = !e;
                f && (delete a.b[d], --a.a)
            }
        }
    }
    l.ef = function(a, c, d, e, f, g) {
        function h(a) {
            var c = ma(a).toString();
            if (!(c in r)) return r[c] = !0, d.call(e, a, null)
        }
        var k, n = c.viewState,
            p = n.resolution,
            q = n.rotation,
            r = {},
            t = n.projection,
            n = a;
        if (t.c) {
            var u = t.G(),
                t = ie(u);
            k = a[0];
            if (k < u[0] || k > u[2]) n = Math.ceil((u[0] - k) / t), n = [k + t * n, a[1]]
        }
        if (null !== this.c && (k = this.c.c(n, p, q, {}, h))) return k;
        q = c.layerStatesArray;
        for (t = q.length - 1; 0 <= t; --t)
            if (k = q[t], u = k.layer, oj(k, p) && f.call(g, u) && (k = Lj(this, u).Pa(Cg(u.da()) ? n : a, c, d, e))) return k
    };
    l.Jg = function(a, c, d, e, f, g) {
        var h, k = c.viewState,
            n = k.resolution,
            k = k.rotation;
        if (null !== this.c) {
            var p = this.g.ka(a);
            if (this.c.c(p, n, k, {}, Gg) && (h = d.call(e, null))) return h
        }
        k = c.layerStatesArray;
        for (p = k.length - 1; 0 <= p; --p) {
            h = k[p];
            var q = h.layer;
            if (oj(h, n) && f.call(g, q) && (h = Lj(this, q).dc(a, c, d, e))) return h
        }
    };
    l.Kg = function(a, c, d, e) {
        a = this.ef(a, c, Gg, this, d, e);
        return m(a)
    };

    function Lj(a, c) {
        var d = ma(c).toString();
        if (d in a.f) return a.f[d];
        var e = a.Ke(c);
        a.f[d] = e;
        a.o[d] = x(e, "change", a.Tj, !1, a);
        return e
    }
    l.Tj = function() {
        this.g.render()
    };
    l.ue = ca;
    l.Pn = function(a, c) {
        for (var d in this.f)
            if (!(null !== c && d in c.layerStates)) {
                var e = d,
                    f = this.f[e];
                delete this.f[e];
                Wc(this.o[e]);
                delete this.o[e];
                qc(f)
            }
    };

    function Mj(a, c) {
        for (var d in a.f)
            if (!(d in c.layerStates)) {
                c.postRenderFunctions.push(ra(a.Pn, a));
                break
            }
    };

    function Nj(a, c) {
        this.g = a;
        this.e = c;
        this.b = [];
        this.a = [];
        this.c = {}
    }
    Nj.prototype.clear = function() {
        this.b.length = 0;
        this.a.length = 0;
        yb(this.c)
    };

    function Oj(a) {
        var c = a.b,
            d = a.a,
            e = c[0];
        1 == c.length ? (c.length = 0, d.length = 0) : (c[0] = c.pop(), d[0] = d.pop(), Pj(a, 0));
        c = a.e(e);
        delete a.c[c];
        return e
    }

    function Dj(a, c) {
        var d = a.g(c);
        Infinity != d && (a.b.push(c), a.a.push(d), a.c[a.e(c)] = !0, Qj(a, 0, a.b.length - 1))
    }
    Nj.prototype.Tb = function() {
        return this.b.length
    };
    Nj.prototype.la = function() {
        return 0 === this.b.length
    };

    function Pj(a, c) {
        for (var d = a.b, e = a.a, f = d.length, g = d[c], h = e[c], k = c; c < f >> 1;) {
            var n = 2 * c + 1,
                p = 2 * c + 2,
                n = p < f && e[p] < e[n] ? p : n;
            d[c] = d[n];
            e[c] = e[n];
            c = n
        }
        d[c] = g;
        e[c] = h;
        Qj(a, k, c)
    }

    function Qj(a, c, d) {
        var e = a.b;
        a = a.a;
        for (var f = e[d], g = a[d]; d > c;) {
            var h = d - 1 >> 1;
            if (a[h] > g) e[d] = e[h], a[d] = a[h], d = h;
            else break
        }
        e[d] = f;
        a[d] = g
    }

    function Rj(a) {
        var c = a.g,
            d = a.b,
            e = a.a,
            f = 0,
            g = d.length,
            h, k, n;
        for (k = 0; k < g; ++k) h = d[k], n = c(h), Infinity == n ? delete a.c[a.e(h)] : (e[f] = n, d[f++] = h);
        d.length = f;
        e.length = f;
        for (c = (a.b.length >> 1) - 1; 0 <= c; c--) Pj(a, c)
    };

    function Sj(a, c) {
        Nj.call(this, function(c) {
            return a.apply(null, c)
        }, function(a) {
            return a[0].gb()
        });
        this.i = c;
        this.d = 0
    }
    w(Sj, Nj);
    Sj.prototype.f = function(a) {
        a = a.target;
        var c = a.state;
        if (2 === c || 3 === c || 4 === c) Vc(a, "change", this.f, !1, this), --this.d, this.i()
    };

    function Tj(a, c, d) {
        this.d = a;
        this.c = c;
        this.f = d;
        this.b = [];
        this.a = this.e = 0
    }
    Tj.prototype.update = function(a, c) {
        this.b.push(a, c, ua())
    };

    function Uj(a, c) {
        var d = a.d,
            e = a.a,
            f = a.c - e,
            g = Vj(a);
        return Ze({
            source: c,
            duration: g,
            easing: function(a) {
                return e * (Math.exp(d * a * g) - 1) / f
            }
        })
    }

    function Vj(a) {
        return Math.log(a.c / a.a) / a.d
    };

    function Wj(a) {
        fd.call(this);
        this.l = null;
        this.d(!0);
        this.handleEvent = a.handleEvent
    }
    w(Wj, fd);
    Wj.prototype.c = function() {
        return this.get("active")
    };
    Wj.prototype.d = function(a) {
        this.set("active", a)
    };
    Wj.prototype.setMap = function(a) {
        this.l = a
    };

    function Xj(a, c, d, e, f) {
        if (null != d) {
            var g = c.Da(),
                h = c.Ca();
            m(g) && m(h) && m(f) && 0 < f && (a.Ha($e({
                rotation: g,
                duration: f,
                easing: Ve
            })), m(e) && a.Ha(Ze({
                source: h,
                duration: f,
                easing: Ve
            })));
            c.rotate(d, e)
        }
    }

    function Yj(a, c, d, e, f) {
        var g = c.ya();
        d = c.constrainResolution(g, d, 0);
        Zj(a, c, d, e, f)
    }

    function Zj(a, c, d, e, f) {
        if (null != d) {
            var g = c.ya(),
                h = c.Ca();
            m(g) && m(h) && m(f) && 0 < f && (a.Ha(af({
                resolution: g,
                duration: f,
                easing: Ve
            })), m(e) && a.Ha(Ze({
                source: h,
                duration: f,
                easing: Ve
            })));
            if (null != e) {
                var k;
                a = c.Ca();
                f = c.ya();
                m(a) && m(f) && (k = [e[0] - d * (e[0] - a[0]) / f, e[1] - d * (e[1] - a[1]) / f]);
                c.Na(k)
            }
            c.tb(d)
        }
    };

    function ak(a) {
        a = m(a) ? a : {};
        this.a = m(a.delta) ? a.delta : 1;
        Wj.call(this, {
            handleEvent: bk
        });
        this.e = m(a.duration) ? a.duration : 250
    }
    w(ak, Wj);

    function bk(a) {
        var c = !1,
            d = a.b;
        if (a.type == dj) {
            var c = a.map,
                e = a.coordinate,
                d = d.d ? -this.a : this.a,
                f = c.R();
            Yj(c, f, d, e, this.e);
            a.preventDefault();
            c = !0
        }
        return !c
    };

    function ck(a) {
        a = a.b;
        return a.a && !a.g && a.d
    }

    function dk(a) {
        return "pointermove" == a.type
    }

    function ek(a) {
        return a.type == ej
    }

    function fk(a) {
        a = a.b;
        return !a.a && !a.g && !a.d
    }

    function gk(a) {
        a = a.b;
        return !a.a && !a.g && a.d
    }

    function hk(a) {
        a = a.b.target.tagName;
        return "INPUT" !== a && "SELECT" !== a && "TEXTAREA" !== a
    }

    function ik(a) {
        return 1 == a.a.pointerId
    };

    function jk(a) {
        a = m(a) ? a : {};
        Wj.call(this, {
            handleEvent: m(a.handleEvent) ? a.handleEvent : kk
        });
        this.vb = m(a.handleDownEvent) ? a.handleDownEvent : Fg;
        this.wb = m(a.handleDragEvent) ? a.handleDragEvent : ca;
        this.xb = m(a.handleMoveEvent) ? a.handleMoveEvent : ca;
        this.sc = m(a.handleUpEvent) ? a.handleUpEvent : Fg;
        this.o = !1;
        this.J = {};
        this.e = []
    }
    w(jk, Wj);

    function lk(a) {
        for (var c = a.length, d = 0, e = 0, f = 0; f < c; f++) d += a[f].clientX, e += a[f].clientY;
        return [d / c, e / c]
    }

    function kk(a) {
        if (!(a instanceof $i)) return !0;
        var c = !1,
            d = a.type;
        if (d === ij || d === kj || d === gj) d = a.a, a.type == gj ? delete this.J[d.pointerId] : a.type == ij ? this.J[d.pointerId] = d : d.pointerId in this.J && (this.J[d.pointerId] = d), this.e = sb(this.J);
        this.o && (a.type == kj ? this.wb(a) : a.type == gj && (this.o = this.sc(a)));
        a.type == ij ? (this.o = a = this.vb(a), c = this.nc(a)) : a.type == jj && this.xb(a);
        return !c
    }
    jk.prototype.nc = Ig;

    function mk(a) {
        jk.call(this, {
            handleDownEvent: nk,
            handleDragEvent: ok,
            handleUpEvent: pk
        });
        a = m(a) ? a : {};
        this.a = a.kinetic;
        this.f = this.g = null;
        this.n = m(a.condition) ? a.condition : fk;
        this.i = !1
    }
    w(mk, jk);

    function ok(a) {
        var c = lk(this.e);
        this.a && this.a.update(c[0], c[1]);
        if (null !== this.f) {
            var d = this.f[0] - c[0],
                e = c[1] - this.f[1];
            a = a.map;
            var f = a.R(),
                g = Se(f),
                e = d = [d, e],
                h = g.resolution;
            e[0] *= h;
            e[1] *= h;
            rd(d, g.rotation);
            md(d, g.center);
            d = f.xd(d);
            a.render();
            f.Na(d)
        }
        this.f = c
    }

    function pk(a) {
        a = a.map;
        var c = a.R();
        if (0 === this.e.length) {
            var d;
            if (d = !this.i && this.a)
                if (d = this.a, 6 > d.b.length) d = !1;
                else {
                    var e = ua() - d.f,
                        f = d.b.length - 3;
                    if (d.b[f + 2] < e) d = !1;
                    else {
                        for (var g = f - 3; 0 < g && d.b[g + 2] > e;) g -= 3;
                        var e = d.b[f + 2] - d.b[g + 2],
                            h = d.b[f] - d.b[g],
                            f = d.b[f + 1] - d.b[g + 1];
                        d.e = Math.atan2(f, h);
                        d.a = Math.sqrt(h * h + f * f) / e;
                        d = d.a > d.c
                    }
                }
            d && (d = this.a, d = (d.c - d.a) / d.d, f = this.a.e, g = c.Ca(), this.g = Uj(this.a, g), a.Ha(this.g), g = a.ta(g), d = a.ka([g[0] - d * Math.cos(f), g[1] - d * Math.sin(f)]), d = c.xd(d), c.Na(d));
            Ue(c, -1);
            a.render();
            return !1
        }
        this.f = null;
        return !0
    }

    function nk(a) {
        if (0 < this.e.length && this.n(a)) {
            var c = a.map,
                d = c.R();
            this.f = null;
            this.o || Ue(d, 1);
            c.render();
            null !== this.g && Za(c.H, this.g) && (d.Na(a.frameState.viewState.center), this.g = null);
            this.a && (a = this.a, a.b.length = 0, a.e = 0, a.a = 0);
            this.i = 1 < this.e.length;
            return !0
        }
        return !1
    }
    mk.prototype.nc = Fg;

    function qk(a) {
        a = m(a) ? a : {};
        jk.call(this, {
            handleDownEvent: rk,
            handleDragEvent: sk,
            handleUpEvent: tk
        });
        this.f = m(a.condition) ? a.condition : ck;
        this.a = void 0;
        this.g = m(a.duration) ? a.duration : 250
    }
    w(qk, jk);

    function sk(a) {
        if (ik(a)) {
            var c = a.map,
                d = c.xa();
            a = a.pixel;
            d = Math.atan2(d[1] / 2 - a[1], a[0] - d[0] / 2);
            if (m(this.a)) {
                a = d - this.a;
                var e = c.R(),
                    f = e.Da();
                c.render();
                Xj(c, e, f - a)
            }
            this.a = d
        }
    }

    function tk(a) {
        if (!ik(a)) return !0;
        a = a.map;
        var c = a.R();
        Ue(c, -1);
        var d = c.Da(),
            e = this.g,
            d = c.constrainRotation(d, 0);
        Xj(a, c, d, void 0, e);
        return !1
    }

    function rk(a) {
        return ik(a) && zc(a.b) && this.f(a) ? (a = a.map, Ue(a.R(), 1), a.render(), this.a = void 0, !0) : !1
    }
    qk.prototype.nc = Fg;

    function uk() {
        fd.call(this);
        this.o = Kd();
        this.n = -1;
        this.f = {};
        this.l = this.g = 0
    }
    w(uk, fd);
    uk.prototype.e = function(a, c) {
        var d = m(c) ? c : [NaN, NaN];
        this.Sa(a[0], a[1], d, Infinity);
        return d
    };
    uk.prototype.Jb = Fg;
    uk.prototype.G = function(a) {
        this.n != this.b && (this.o = this.wd(this.o), this.n = this.b);
        var c = this.o;
        m(a) ? (a[0] = c[0], a[1] = c[1], a[2] = c[2], a[3] = c[3]) : a = c;
        return a
    };
    uk.prototype.transform = function(a, c) {
        this.qa(Je(a, c));
        return this
    };

    function vk(a, c, d, e, f, g) {
        var h = f[0],
            k = f[1],
            n = f[4],
            p = f[5],
            q = f[12];
        f = f[13];
        for (var r = m(g) ? g : [], t = 0; c < d; c += e) {
            var u = a[c],
                A = a[c + 1];
            r[t++] = h * u + n * A + q;
            r[t++] = k * u + p * A + f
        }
        m(g) && r.length != t && (r.length = t);
        return r
    };

    function wk() {
        uk.call(this);
        this.a = "XY";
        this.s = 2;
        this.j = null
    }
    w(wk, uk);

    function xk(a) {
        if ("XY" == a) return 2;
        if ("XYZ" == a || "XYM" == a) return 3;
        if ("XYZM" == a) return 4
    }
    l = wk.prototype;
    l.Jb = Fg;
    l.wd = function(a) {
        var c = this.j,
            d = this.j.length,
            e = this.s;
        a = Nd(Infinity, Infinity, -Infinity, -Infinity, a);
        return Xd(a, c, 0, d, e)
    };
    l.ob = function() {
        return this.j.slice(0, this.s)
    };
    l.pb = function() {
        return this.j.slice(this.j.length - this.s)
    };
    l.qb = function() {
        return this.a
    };
    l.Ve = function(a) {
        this.l != this.b && (yb(this.f), this.g = 0, this.l = this.b);
        if (0 > a || 0 !== this.g && a <= this.g) return this;
        var c = a.toString();
        if (this.f.hasOwnProperty(c)) return this.f[c];
        var d = this.xc(a);
        if (d.j.length < this.j.length) return this.f[c] = d;
        this.g = a;
        return this
    };
    l.xc = function() {
        return this
    };

    function yk(a, c, d) {
        a.s = xk(c);
        a.a = c;
        a.j = d
    }

    function zk(a, c, d, e) {
        if (m(c)) d = xk(c);
        else {
            for (c = 0; c < e; ++c) {
                if (0 === d.length) {
                    a.a = "XY";
                    a.s = 2;
                    return
                }
                d = d[0]
            }
            d = d.length;
            c = 2 == d ? "XY" : 3 == d ? "XYZ" : 4 == d ? "XYZM" : void 0
        }
        a.a = c;
        a.s = d
    }
    l.qa = function(a) {
        null !== this.j && (a(this.j, this.j, this.s), this.k())
    };
    l.Oa = function(a, c) {
        var d = this.j;
        if (null !== d) {
            var e = d.length,
                f = this.s,
                g = m(d) ? d : [],
                h = 0,
                k, n;
            for (k = 0; k < e; k += f)
                for (g[h++] = d[k] + a, g[h++] = d[k + 1] + c, n = k + 2; n < k + f; ++n) g[h++] = d[n];
            m(d) && g.length != h && (g.length = h);
            this.k()
        }
    };

    function Ak(a, c, d, e) {
        for (var f = 0, g = a[d - e], h = a[d - e + 1]; c < d; c += e) var k = a[c],
            n = a[c + 1],
            f = f + (h * k - g * n),
            g = k,
            h = n;
        return f / 2
    }

    function Bk(a, c, d, e) {
        var f = 0,
            g, h;
        g = 0;
        for (h = d.length; g < h; ++g) {
            var k = d[g],
                f = f + Ak(a, c, k, e);
            c = k
        }
        return f
    };

    function Ck(a, c, d, e, f, g) {
        var h = f - d,
            k = g - e;
        if (0 !== h || 0 !== k) {
            var n = ((a - d) * h + (c - e) * k) / (h * h + k * k);
            1 < n ? (d = f, e = g) : 0 < n && (d += h * n, e += k * n)
        }
        return Dk(a, c, d, e)
    }

    function Dk(a, c, d, e) {
        a = d - a;
        c = e - c;
        return a * a + c * c
    };

    function Ek(a, c, d, e, f, g, h) {
        var k = a[c],
            n = a[c + 1],
            p = a[d] - k,
            q = a[d + 1] - n;
        if (0 !== p || 0 !== q)
            if (g = ((f - k) * p + (g - n) * q) / (p * p + q * q), 1 < g) c = d;
            else if (0 < g) {
            for (f = 0; f < e; ++f) h[f] = Xb(a[c + f], a[d + f], g);
            h.length = e;
            return
        }
        for (f = 0; f < e; ++f) h[f] = a[c + f];
        h.length = e
    }

    function Fk(a, c, d, e, f) {
        var g = a[c],
            h = a[c + 1];
        for (c += e; c < d; c += e) {
            var k = a[c],
                n = a[c + 1],
                g = Dk(g, h, k, n);
            g > f && (f = g);
            g = k;
            h = n
        }
        return f
    }

    function Gk(a, c, d, e, f) {
        var g, h;
        g = 0;
        for (h = d.length; g < h; ++g) {
            var k = d[g];
            f = Fk(a, c, k, e, f);
            c = k
        }
        return f
    }

    function Hk(a, c, d, e, f, g, h, k, n, p, q) {
        if (c == d) return p;
        var r;
        if (0 === f) {
            r = Dk(h, k, a[c], a[c + 1]);
            if (r < p) {
                for (q = 0; q < e; ++q) n[q] = a[c + q];
                n.length = e;
                return r
            }
            return p
        }
        for (var t = m(q) ? q : [NaN, NaN], u = c + e; u < d;)
            if (Ek(a, u - e, u, e, h, k, t), r = Dk(h, k, t[0], t[1]), r < p) {
                p = r;
                for (q = 0; q < e; ++q) n[q] = t[q];
                n.length = e;
                u += e
            } else u += e * Math.max((Math.sqrt(r) - Math.sqrt(p)) / f | 0, 1);
        if (g && (Ek(a, d - e, c, e, h, k, t), r = Dk(h, k, t[0], t[1]), r < p)) {
            p = r;
            for (q = 0; q < e; ++q) n[q] = t[q];
            n.length = e
        }
        return p
    }

    function Ik(a, c, d, e, f, g, h, k, n, p, q) {
        q = m(q) ? q : [NaN, NaN];
        var r, t;
        r = 0;
        for (t = d.length; r < t; ++r) {
            var u = d[r];
            p = Hk(a, c, u, e, f, g, h, k, n, p, q);
            c = u
        }
        return p
    };

    function Jk(a, c) {
        var d = 0,
            e, f;
        e = 0;
        for (f = c.length; e < f; ++e) a[d++] = c[e];
        return d
    }

    function Kk(a, c, d, e) {
        var f, g;
        f = 0;
        for (g = d.length; f < g; ++f) {
            var h = d[f],
                k;
            for (k = 0; k < e; ++k) a[c++] = h[k]
        }
        return c
    }

    function Lk(a, c, d, e, f) {
        f = m(f) ? f : [];
        var g = 0,
            h, k;
        h = 0;
        for (k = d.length; h < k; ++h) c = Kk(a, c, d[h], e), f[g++] = c;
        f.length = g;
        return f
    };

    function Mk(a, c, d, e, f) {
        f = m(f) ? f : [];
        for (var g = 0; c < d; c += e) f[g++] = a.slice(c, c + e);
        f.length = g;
        return f
    }

    function Nk(a, c, d, e, f) {
        f = m(f) ? f : [];
        var g = 0,
            h, k;
        h = 0;
        for (k = d.length; h < k; ++h) {
            var n = d[h];
            f[g++] = Mk(a, c, n, e, f[g]);
            c = n
        }
        f.length = g;
        return f
    };

    function Ok(a, c, d, e, f, g, h) {
        var k = (d - c) / e;
        if (3 > k) {
            for (; c < d; c += e) g[h++] = a[c], g[h++] = a[c + 1];
            return h
        }
        var n = Array(k);
        n[0] = 1;
        n[k - 1] = 1;
        d = [c, d - e];
        for (var p = 0, q; 0 < d.length;) {
            var r = d.pop(),
                t = d.pop(),
                u = 0,
                A = a[t],
                z = a[t + 1],
                D = a[r],
                B = a[r + 1];
            for (q = t + e; q < r; q += e) {
                var y = Ck(a[q], a[q + 1], A, z, D, B);
                y > u && (p = q, u = y)
            }
            u > f && (n[(p - c) / e] = 1, t + e < p && d.push(t, p), p + e < r && d.push(p, r))
        }
        for (q = 0; q < k; ++q) n[q] && (g[h++] = a[c + q * e], g[h++] = a[c + q * e + 1]);
        return h
    }

    function Pk(a, c, d, e, f, g, h, k) {
        var n, p;
        n = 0;
        for (p = d.length; n < p; ++n) {
            var q = d[n];
            a: {
                var r = a,
                    t = q,
                    u = e,
                    A = f,
                    z = g;
                if (c != t) {
                    var D = A * Math.round(r[c] / A),
                        B = A * Math.round(r[c + 1] / A);
                    c += u;
                    z[h++] = D;
                    z[h++] = B;
                    var y = void 0,
                        K = void 0;
                    do
                        if (y = A * Math.round(r[c] / A), K = A * Math.round(r[c + 1] / A), c += u, c == t) {
                            z[h++] = y;
                            z[h++] = K;
                            break a
                        }
                    while (y == D && K == B);
                    for (; c < t;) {
                        var J, H;
                        J = A * Math.round(r[c] / A);
                        H = A * Math.round(r[c + 1] / A);
                        c += u;
                        if (J != y || H != K) {
                            var P = y - D,
                                sa = K - B,
                                Oa = J - D,
                                N = H - B;
                            P * N == sa * Oa && (0 > P && Oa < P || P == Oa || 0 < P && Oa > P) && (0 > sa && N < sa || sa == N || 0 < sa && N > sa) || (z[h++] = y, z[h++] = K, D = y, B = K);
                            y = J;
                            K = H
                        }
                    }
                    z[h++] = y;
                    z[h++] = K
                }
            }
            k.push(h);
            c = q
        }
        return h
    };

    function Qk(a, c) {
        wk.call(this);
        this.c = this.i = -1;
        this.W(a, c)
    }
    w(Qk, wk);
    l = Qk.prototype;
    l.clone = function() {
        var a = new Qk(null);
        Rk(a, this.a, this.j.slice());
        return a
    };
    l.Sa = function(a, c, d, e) {
        if (e < Qd(this.G(), a, c)) return e;
        this.c != this.b && (this.i = Math.sqrt(Fk(this.j, 0, this.j.length, this.s, 0)), this.c = this.b);
        return Hk(this.j, 0, this.j.length, this.s, this.i, !0, a, c, d, e)
    };
    l.rl = function() {
        return Ak(this.j, 0, this.j.length, this.s)
    };
    l.K = function() {
        return Mk(this.j, 0, this.j.length, this.s)
    };
    l.xc = function(a) {
        var c = [];
        c.length = Ok(this.j, 0, this.j.length, this.s, a, c, 0);
        a = new Qk(null);
        Rk(a, "XY", c);
        return a
    };
    l.M = function() {
        return "LinearRing"
    };
    l.W = function(a, c) {
        null === a ? Rk(this, "XY", null) : (zk(this, c, a, 1), null === this.j && (this.j = []), this.j.length = Kk(this.j, 0, a, this.s), this.k())
    };

    function Rk(a, c, d) {
        yk(a, c, d);
        a.k()
    };

    function E(a, c) {
        wk.call(this);
        this.W(a, c)
    }
    w(E, wk);
    l = E.prototype;
    l.clone = function() {
        var a = new E(null);
        Sk(a, this.a, this.j.slice());
        return a
    };
    l.Sa = function(a, c, d, e) {
        var f = this.j;
        a = Dk(a, c, f[0], f[1]);
        if (a < e) {
            e = this.s;
            for (c = 0; c < e; ++c) d[c] = f[c];
            d.length = e;
            return a
        }
        return e
    };
    l.K = function() {
        return null === this.j ? [] : this.j.slice()
    };
    l.wd = function(a) {
        return Ud(this.j, a)
    };
    l.M = function() {
        return "Point"
    };
    l.ra = function(a) {
        return Sd(a, this.j[0], this.j[1])
    };
    l.W = function(a, c) {
        null === a ? Sk(this, "XY", null) : (zk(this, c, a, 0), null === this.j && (this.j = []), this.j.length = Jk(this.j, a), this.k())
    };

    function Sk(a, c, d) {
        yk(a, c, d);
        a.k()
    };

    function Tk(a, c, d, e, f) {
        return !Yd(f, function(f) {
            return !Uk(a, c, d, e, f[0], f[1])
        })
    }

    function Uk(a, c, d, e, f, g) {
        for (var h = !1, k = a[d - e], n = a[d - e + 1]; c < d; c += e) {
            var p = a[c],
                q = a[c + 1];
            n > g != q > g && f < (p - k) * (g - n) / (q - n) + k && (h = !h);
            k = p;
            n = q
        }
        return h
    }

    function Vk(a, c, d, e, f, g) {
        if (0 === d.length || !Uk(a, c, d[0], e, f, g)) return !1;
        var h;
        c = 1;
        for (h = d.length; c < h; ++c)
            if (Uk(a, d[c - 1], d[c], e, f, g)) return !1;
        return !0
    };

    function Wk(a, c, d, e, f, g, h) {
        var k, n, p, q, r, t = f[g + 1],
            u = [],
            A = d[0];
        p = a[A - e];
        r = a[A - e + 1];
        for (k = c; k < A; k += e) {
            q = a[k];
            n = a[k + 1];
            if (t <= r && n <= t || r <= t && t <= n) p = (t - r) / (n - r) * (q - p) + p, u.push(p);
            p = q;
            r = n
        }
        A = NaN;
        r = -Infinity;
        u.sort();
        p = u[0];
        k = 1;
        for (n = u.length; k < n; ++k) {
            q = u[k];
            var z = Math.abs(q - p);
            z > r && (p = (p + q) / 2, Vk(a, c, d, e, p, t) && (A = p, r = z));
            p = q
        }
        isNaN(A) && (A = f[g]);
        return m(h) ? (h.push(A, t), h) : [A, t]
    };

    function Xk(a, c, d, e, f, g) {
        for (var h = [a[c], a[c + 1]], k = [], n; c + e < d; c += e) {
            k[0] = a[c + e];
            k[1] = a[c + e + 1];
            if (n = f.call(g, h, k)) return n;
            h[0] = k[0];
            h[1] = k[1]
        }
        return !1
    };

    function Yk(a, c, d, e, f) {
        var g = Xd(Kd(), a, c, d, e);
        return he(f, g) ? Rd(f, g) || g[0] >= f[0] && g[2] <= f[2] || g[1] >= f[1] && g[3] <= f[3] ? !0 : Xk(a, c, d, e, function(a, c) {
            var d = !1,
                e = Td(f, a),
                g = Td(f, c);
            if (1 === e || 1 === g) d = !0;
            else {
                var r = f[0],
                    t = f[1],
                    u = f[2],
                    A = f[3],
                    z = c[0],
                    D = c[1],
                    B = (D - a[1]) / (z - a[0]);
                g & 2 && !(e & 2) && (d = z - (D - A) / B, d = d >= r && d <= u);
                d || !(g & 4) || e & 4 || (d = D - (z - u) * B, d = d >= t && d <= A);
                d || !(g & 8) || e & 8 || (d = z - (D - t) / B, d = d >= r && d <= u);
                d || !(g & 16) || e & 16 || (d = D - (z - r) * B, d = d >= t && d <= A)
            }
            return d
        }) : !1
    }

    function Zk(a, c, d, e, f) {
        var g = d[0];
        if (!(Yk(a, c, g, e, f) || Uk(a, c, g, e, f[0], f[1]) || Uk(a, c, g, e, f[0], f[3]) || Uk(a, c, g, e, f[2], f[1]) || Uk(a, c, g, e, f[2], f[3]))) return !1;
        if (1 === d.length) return !0;
        c = 1;
        for (g = d.length; c < g; ++c)
            if (Tk(a, d[c - 1], d[c], e, f)) return !1;
        return !0
    };

    function $k(a, c, d, e) {
        for (var f = 0, g = a[d - e], h = a[d - e + 1]; c < d; c += e) var k = a[c],
            n = a[c + 1],
            f = f + (k - g) * (n + h),
            g = k,
            h = n;
        return 0 < f
    }

    function al(a, c, d, e) {
        var f = 0;
        e = m(e) ? e : !1;
        var g, h;
        g = 0;
        for (h = c.length; g < h; ++g) {
            var k = c[g],
                f = $k(a, f, k, d);
            if (0 === g) {
                if (e && f || !e && !f) return !1
            } else if (e && !f || !e && f) return !1;
            f = k
        }
        return !0
    }

    function bl(a, c, d, e, f) {
        f = m(f) ? f : !1;
        var g, h;
        g = 0;
        for (h = d.length; g < h; ++g) {
            var k = d[g],
                n = $k(a, c, k, e);
            if (0 === g ? f && n || !f && !n : f && !n || !f && n)
                for (var n = a, p = k, q = e; c < p - q;) {
                    var r;
                    for (r = 0; r < q; ++r) {
                        var t = n[c + r];
                        n[c + r] = n[p - q + r];
                        n[p - q + r] = t
                    }
                    c += q;
                    p -= q
                }
            c = k
        }
        return c
    }

    function cl(a, c, d, e) {
        var f = 0,
            g, h;
        g = 0;
        for (h = c.length; g < h; ++g) f = bl(a, f, c[g], d, e);
        return f
    };

    function F(a, c) {
        wk.call(this);
        this.c = [];
        this.p = -1;
        this.H = null;
        this.N = this.J = this.L = -1;
        this.i = null;
        this.W(a, c)
    }
    w(F, wk);
    l = F.prototype;
    l.wi = function(a) {
        null === this.j ? this.j = a.j.slice() : db(this.j, a.j);
        this.c.push(this.j.length);
        this.k()
    };
    l.clone = function() {
        var a = new F(null);
        dl(a, this.a, this.j.slice(), this.c.slice());
        return a
    };
    l.Sa = function(a, c, d, e) {
        if (e < Qd(this.G(), a, c)) return e;
        this.J != this.b && (this.L = Math.sqrt(Gk(this.j, 0, this.c, this.s, 0)), this.J = this.b);
        return Ik(this.j, 0, this.c, this.s, this.L, !0, a, c, d, e)
    };
    l.Jb = function(a, c) {
        return Vk(el(this), 0, this.c, this.s, a, c)
    };
    l.ul = function() {
        return Bk(el(this), 0, this.c, this.s)
    };
    l.K = function(a) {
        var c;
        m(a) ? (c = el(this).slice(), bl(c, 0, this.c, this.s, a)) : c = this.j;
        return Nk(c, 0, this.c, this.s)
    };

    function fl(a) {
        if (a.p != a.b) {
            var c = ce(a.G());
            a.H = Wk(el(a), 0, a.c, a.s, c, 0);
            a.p = a.b
        }
        return a.H
    }
    l.cj = function() {
        return new E(fl(this))
    };
    l.ij = function() {
        return this.c.length
    };
    l.hj = function(a) {
        if (0 > a || this.c.length <= a) return null;
        var c = new Qk(null);
        Rk(c, this.a, this.j.slice(0 === a ? 0 : this.c[a - 1], this.c[a]));
        return c
    };
    l.Ed = function() {
        var a = this.a,
            c = this.j,
            d = this.c,
            e = [],
            f = 0,
            g, h;
        g = 0;
        for (h = d.length; g < h; ++g) {
            var k = d[g],
                n = new Qk(null);
            Rk(n, a, c.slice(f, k));
            e.push(n);
            f = k
        }
        return e
    };

    function el(a) {
        if (a.N != a.b) {
            var c = a.j;
            al(c, a.c, a.s) ? a.i = c : (a.i = c.slice(), a.i.length = bl(a.i, 0, a.c, a.s));
            a.N = a.b
        }
        return a.i
    }
    l.xc = function(a) {
        var c = [],
            d = [];
        c.length = Pk(this.j, 0, this.c, this.s, Math.sqrt(a), c, 0, d);
        a = new F(null);
        dl(a, "XY", c, d);
        return a
    };
    l.M = function() {
        return "Polygon"
    };
    l.ra = function(a) {
        return Zk(el(this), 0, this.c, this.s, a)
    };
    l.W = function(a, c) {
        if (null === a) dl(this, "XY", null, this.c);
        else {
            zk(this, c, a, 2);
            null === this.j && (this.j = []);
            var d = Lk(this.j, 0, a, this.s, this.c);
            this.j.length = 0 === d.length ? 0 : d[d.length - 1];
            this.k()
        }
    };

    function dl(a, c, d, e) {
        yk(a, c, d);
        a.c = e;
        a.k()
    }

    function gl(a, c, d, e) {
        var f = m(e) ? e : 32;
        e = [];
        var g;
        for (g = 0; g < f; ++g) db(e, a.offset(c, d, 2 * Math.PI * g / f));
        e.push(e[0], e[1]);
        a = new F(null);
        dl(a, "XY", e, [e.length]);
        return a
    };

    function hl() {};

    function il(a, c, d, e, f, g, h) {
        rc.call(this, a, c);
        this.vectorContext = d;
        this.b = e;
        this.frameState = f;
        this.context = g;
        this.glContext = h
    }
    w(il, rc);

    function jl(a) {
        this.c = this.a = this.e = this.d = this.b = null;
        this.f = a
    }
    w(jl, mc);

    function kl(a) {
        var c = a.e,
            d = a.a;
        a = Ua([c, [c[0], d[1]], d, [d[0], c[1]]], a.b.ka, a.b);
        a[4] = a[0].slice();
        return new F([a])
    }
    jl.prototype.O = function() {
        this.setMap(null)
    };
    jl.prototype.g = function(a) {
        var c = this.c,
            d = this.f;
        a.vectorContext.tc(Infinity, function(a) {
            a.Aa(d.e, d.c);
            a.Ba(d.a);
            a.Rb(c, null)
        })
    };
    jl.prototype.Q = function() {
        return this.c
    };

    function ll(a) {
        null === a.b || null === a.e || null === a.a || a.b.render()
    }
    jl.prototype.setMap = function(a) {
        null !== this.d && (Wc(this.d), this.d = null, this.b.render(), this.b = null);
        this.b = a;
        null !== this.b && (this.d = x(a, "postcompose", this.g, !1, this), ll(this))
    };

    function ml(a, c) {
        rc.call(this, a);
        this.coordinate = c
    }
    w(ml, rc);

    function nl(a) {
        jk.call(this, {
            handleDownEvent: pl,
            handleDragEvent: ql,
            handleUpEvent: rl
        });
        a = m(a) ? a : {};
        this.f = new jl(m(a.style) ? a.style : null);
        this.a = null;
        this.i = m(a.condition) ? a.condition : Gg
    }
    w(nl, jk);

    function ql(a) {
        if (ik(a)) {
            var c = this.f;
            a = a.pixel;
            c.e = this.a;
            c.a = a;
            c.c = kl(c);
            ll(c)
        }
    }
    nl.prototype.Q = function() {
        return this.f.Q()
    };
    nl.prototype.g = ca;

    function rl(a) {
        if (!ik(a)) return !0;
        this.f.setMap(null);
        var c = a.pixel[0] - this.a[0],
            d = a.pixel[1] - this.a[1];
        64 <= c * c + d * d && (this.g(a), this.dispatchEvent(new ml("boxend", a.coordinate)));
        return !1
    }

    function pl(a) {
        if (ik(a) && zc(a.b) && this.i(a)) {
            this.a = a.pixel;
            this.f.setMap(a.map);
            var c = this.f,
                d = this.a;
            c.e = this.a;
            c.a = d;
            c.c = kl(c);
            ll(c);
            this.dispatchEvent(new ml("boxstart", a.coordinate));
            return !0
        }
        return !1
    };

    function sl() {
        this.a = -1
    };

    function tl() {
        this.a = -1;
        this.a = 64;
        this.b = Array(4);
        this.e = Array(this.a);
        this.d = this.c = 0;
        this.b[0] = 1732584193;
        this.b[1] = 4023233417;
        this.b[2] = 2562383102;
        this.b[3] = 271733878;
        this.d = this.c = 0
    }
    w(tl, sl);

    function ul(a, c, d) {
        d || (d = 0);
        var e = Array(16);
        if (ia(c))
            for (var f = 0; 16 > f; ++f) e[f] = c.charCodeAt(d++) | c.charCodeAt(d++) << 8 | c.charCodeAt(d++) << 16 | c.charCodeAt(d++) << 24;
        else
            for (f = 0; 16 > f; ++f) e[f] = c[d++] | c[d++] << 8 | c[d++] << 16 | c[d++] << 24;
        c = a.b[0];
        d = a.b[1];
        var f = a.b[2],
            g = a.b[3],
            h = 0,
            h = c + (g ^ d & (f ^ g)) + e[0] + 3614090360 & 4294967295;
        c = d + (h << 7 & 4294967295 | h >>> 25);
        h = g + (f ^ c & (d ^ f)) + e[1] + 3905402710 & 4294967295;
        g = c + (h << 12 & 4294967295 | h >>> 20);
        h = f + (d ^ g & (c ^ d)) + e[2] + 606105819 & 4294967295;
        f = g + (h << 17 & 4294967295 | h >>> 15);
        h = d + (c ^ f & (g ^ c)) + e[3] + 3250441966 & 4294967295;
        d = f + (h << 22 & 4294967295 | h >>> 10);
        h = c + (g ^ d & (f ^ g)) + e[4] + 4118548399 & 4294967295;
        c = d + (h << 7 & 4294967295 | h >>> 25);
        h = g + (f ^ c & (d ^ f)) + e[5] + 1200080426 & 4294967295;
        g = c + (h << 12 & 4294967295 | h >>> 20);
        h = f + (d ^ g & (c ^ d)) + e[6] + 2821735955 & 4294967295;
        f = g + (h << 17 & 4294967295 | h >>> 15);
        h = d + (c ^ f & (g ^ c)) + e[7] + 4249261313 & 4294967295;
        d = f + (h << 22 & 4294967295 | h >>> 10);
        h = c + (g ^ d & (f ^ g)) + e[8] + 1770035416 & 4294967295;
        c = d + (h << 7 & 4294967295 | h >>> 25);
        h = g + (f ^ c & (d ^ f)) + e[9] + 2336552879 & 4294967295;
        g = c + (h << 12 & 4294967295 | h >>> 20);
        h = f + (d ^ g & (c ^ d)) + e[10] + 4294925233 & 4294967295;
        f = g + (h << 17 & 4294967295 | h >>> 15);
        h = d + (c ^ f & (g ^ c)) + e[11] + 2304563134 & 4294967295;
        d = f + (h << 22 & 4294967295 | h >>> 10);
        h = c + (g ^ d & (f ^ g)) + e[12] + 1804603682 & 4294967295;
        c = d + (h << 7 & 4294967295 | h >>> 25);
        h = g + (f ^ c & (d ^ f)) + e[13] + 4254626195 & 4294967295;
        g = c + (h << 12 & 4294967295 | h >>> 20);
        h = f + (d ^ g & (c ^ d)) + e[14] + 2792965006 & 4294967295;
        f = g + (h << 17 & 4294967295 | h >>> 15);
        h = d + (c ^ f & (g ^ c)) + e[15] + 1236535329 & 4294967295;
        d = f + (h << 22 & 4294967295 | h >>> 10);
        h = c + (f ^ g & (d ^ f)) + e[1] + 4129170786 & 4294967295;
        c = d + (h << 5 & 4294967295 | h >>> 27);
        h = g + (d ^ f & (c ^ d)) + e[6] + 3225465664 & 4294967295;
        g = c + (h << 9 & 4294967295 | h >>> 23);
        h = f + (c ^ d & (g ^ c)) + e[11] + 643717713 & 4294967295;
        f = g + (h << 14 & 4294967295 | h >>> 18);
        h = d + (g ^ c & (f ^ g)) + e[0] + 3921069994 & 4294967295;
        d = f + (h << 20 & 4294967295 | h >>> 12);
        h = c + (f ^ g & (d ^ f)) + e[5] + 3593408605 & 4294967295;
        c = d + (h << 5 & 4294967295 | h >>> 27);
        h = g + (d ^ f & (c ^ d)) + e[10] + 38016083 & 4294967295;
        g = c + (h << 9 & 4294967295 | h >>> 23);
        h = f + (c ^ d & (g ^ c)) + e[15] + 3634488961 & 4294967295;
        f = g + (h << 14 & 4294967295 | h >>> 18);
        h = d + (g ^ c & (f ^ g)) + e[4] + 3889429448 & 4294967295;
        d = f + (h << 20 & 4294967295 | h >>> 12);
        h = c + (f ^ g & (d ^ f)) + e[9] + 568446438 & 4294967295;
        c = d + (h << 5 & 4294967295 | h >>> 27);
        h = g + (d ^ f & (c ^ d)) + e[14] + 3275163606 & 4294967295;
        g = c + (h << 9 & 4294967295 | h >>> 23);
        h = f + (c ^ d & (g ^ c)) + e[3] + 4107603335 & 4294967295;
        f = g + (h << 14 & 4294967295 | h >>> 18);
        h = d + (g ^ c & (f ^ g)) + e[8] + 1163531501 & 4294967295;
        d = f + (h << 20 & 4294967295 | h >>> 12);
        h = c + (f ^ g & (d ^ f)) + e[13] + 2850285829 & 4294967295;
        c = d + (h << 5 & 4294967295 | h >>> 27);
        h = g + (d ^ f & (c ^ d)) + e[2] + 4243563512 & 4294967295;
        g = c + (h << 9 & 4294967295 | h >>> 23);
        h = f + (c ^ d & (g ^ c)) + e[7] + 1735328473 & 4294967295;
        f = g + (h << 14 & 4294967295 | h >>> 18);
        h = d + (g ^ c & (f ^ g)) + e[12] + 2368359562 & 4294967295;
        d = f + (h << 20 & 4294967295 | h >>> 12);
        h = c + (d ^ f ^ g) + e[5] + 4294588738 & 4294967295;
        c = d + (h << 4 & 4294967295 | h >>> 28);
        h = g + (c ^ d ^ f) + e[8] + 2272392833 & 4294967295;
        g = c + (h << 11 & 4294967295 | h >>> 21);
        h = f + (g ^ c ^ d) + e[11] + 1839030562 & 4294967295;
        f = g + (h << 16 & 4294967295 | h >>> 16);
        h = d + (f ^ g ^ c) + e[14] + 4259657740 & 4294967295;
        d = f + (h << 23 & 4294967295 | h >>> 9);
        h = c + (d ^ f ^ g) + e[1] + 2763975236 & 4294967295;
        c = d + (h << 4 & 4294967295 | h >>> 28);
        h = g + (c ^ d ^ f) + e[4] + 1272893353 & 4294967295;
        g = c + (h << 11 & 4294967295 | h >>> 21);
        h = f + (g ^ c ^ d) + e[7] + 4139469664 & 4294967295;
        f = g + (h << 16 & 4294967295 | h >>> 16);
        h = d + (f ^ g ^ c) + e[10] + 3200236656 & 4294967295;
        d = f + (h << 23 & 4294967295 | h >>> 9);
        h = c + (d ^ f ^ g) + e[13] + 681279174 & 4294967295;
        c = d + (h << 4 & 4294967295 | h >>> 28);
        h = g + (c ^ d ^ f) + e[0] + 3936430074 & 4294967295;
        g = c + (h << 11 & 4294967295 | h >>> 21);
        h = f + (g ^ c ^ d) + e[3] + 3572445317 & 4294967295;
        f = g + (h << 16 & 4294967295 | h >>> 16);
        h = d + (f ^ g ^ c) + e[6] + 76029189 & 4294967295;
        d = f + (h << 23 & 4294967295 | h >>> 9);
        h = c + (d ^ f ^ g) + e[9] + 3654602809 & 4294967295;
        c = d + (h << 4 & 4294967295 | h >>> 28);
        h = g + (c ^ d ^ f) + e[12] + 3873151461 & 4294967295;
        g = c + (h << 11 & 4294967295 | h >>> 21);
        h = f + (g ^ c ^ d) + e[15] + 530742520 & 4294967295;
        f = g + (h << 16 & 4294967295 | h >>> 16);
        h = d + (f ^ g ^ c) + e[2] + 3299628645 & 4294967295;
        d = f + (h << 23 & 4294967295 | h >>> 9);
        h = c + (f ^ (d | ~g)) + e[0] + 4096336452 & 4294967295;
        c = d + (h << 6 & 4294967295 | h >>> 26);
        h = g + (d ^ (c | ~f)) + e[7] + 1126891415 & 4294967295;
        g = c + (h << 10 & 4294967295 | h >>> 22);
        h = f + (c ^ (g | ~d)) + e[14] + 2878612391 & 4294967295;
        f = g + (h << 15 & 4294967295 | h >>> 17);
        h = d + (g ^ (f | ~c)) + e[5] + 4237533241 & 4294967295;
        d = f + (h << 21 & 4294967295 | h >>> 11);
        h = c + (f ^ (d | ~g)) + e[12] + 1700485571 & 4294967295;
        c = d + (h << 6 & 4294967295 | h >>> 26);
        h = g + (d ^ (c | ~f)) + e[3] + 2399980690 & 4294967295;
        g = c + (h << 10 & 4294967295 | h >>> 22);
        h = f + (c ^ (g | ~d)) + e[10] + 4293915773 & 4294967295;
        f = g + (h << 15 & 4294967295 | h >>> 17);
        h = d + (g ^ (f | ~c)) + e[1] + 2240044497 & 4294967295;
        d = f + (h << 21 & 4294967295 | h >>> 11);
        h = c + (f ^ (d | ~g)) + e[8] + 1873313359 & 4294967295;
        c = d + (h << 6 & 4294967295 | h >>> 26);
        h = g + (d ^ (c | ~f)) + e[15] + 4264355552 & 4294967295;
        g = c + (h << 10 & 4294967295 | h >>> 22);
        h = f + (c ^ (g | ~d)) + e[6] + 2734768916 & 4294967295;
        f = g + (h << 15 & 4294967295 | h >>> 17);
        h = d + (g ^ (f | ~c)) + e[13] + 1309151649 & 4294967295;
        d = f + (h << 21 & 4294967295 | h >>> 11);
        h = c + (f ^ (d | ~g)) + e[4] + 4149444226 & 4294967295;
        c = d + (h << 6 & 4294967295 | h >>> 26);
        h = g + (d ^ (c | ~f)) + e[11] + 3174756917 & 4294967295;
        g = c + (h << 10 & 4294967295 | h >>> 22);
        h = f + (c ^ (g | ~d)) + e[2] + 718787259 & 4294967295;
        f = g + (h << 15 & 4294967295 | h >>> 17);
        h = d + (g ^ (f | ~c)) + e[9] + 3951481745 & 4294967295;
        a.b[0] = a.b[0] + c & 4294967295;
        a.b[1] = a.b[1] + (f + (h << 21 & 4294967295 | h >>> 11)) & 4294967295;
        a.b[2] = a.b[2] + f & 4294967295;
        a.b[3] = a.b[3] + g & 4294967295
    }
    tl.prototype.update = function(a, c) {
        m(c) || (c = a.length);
        for (var d = c - this.a, e = this.e, f = this.c, g = 0; g < c;) {
            if (0 == f)
                for (; g <= d;) ul(this, a, g), g += this.a;
            if (ia(a))
                for (; g < c;) {
                    if (e[f++] = a.charCodeAt(g++), f == this.a) {
                        ul(this, e);
                        f = 0;
                        break
                    }
                } else
                    for (; g < c;)
                        if (e[f++] = a[g++], f == this.a) {
                            ul(this, e);
                            f = 0;
                            break
                        }
        }
        this.c = f;
        this.d += c
    };

    function vl(a) {
        a = m(a) ? a : {};
        this.b = m(a.color) ? a.color : null;
        this.d = a.lineCap;
        this.c = m(a.lineDash) ? a.lineDash : null;
        this.e = a.lineJoin;
        this.f = a.miterLimit;
        this.a = a.width;
        this.g = void 0
    }
    l = vl.prototype;
    l.Hm = function() {
        return this.b
    };
    l.ej = function() {
        return this.d
    };
    l.Im = function() {
        return this.c
    };
    l.fj = function() {
        return this.e
    };
    l.lj = function() {
        return this.f
    };
    l.Jm = function() {
        return this.a
    };
    l.Km = function(a) {
        this.b = a;
        this.g = void 0
    };
    l.Zn = function(a) {
        this.d = a;
        this.g = void 0
    };
    l.Lm = function(a) {
        this.c = a;
        this.g = void 0
    };
    l.$n = function(a) {
        this.e = a;
        this.g = void 0
    };
    l.ao = function(a) {
        this.f = a;
        this.g = void 0
    };
    l.ko = function(a) {
        this.a = a;
        this.g = void 0
    };
    l.nb = function() {
        if (!m(this.g)) {
            var a = "s" + (null === this.b ? "-" : vf(this.b)) + "," + (m(this.d) ? this.d.toString() : "-") + "," + (null === this.c ? "-" : this.c.toString()) + "," + (m(this.e) ? this.e : "-") + "," + (m(this.f) ? this.f.toString() : "-") + "," + (m(this.a) ? this.a.toString() : "-"),
                c = new tl;
            c.update(a);
            var d = Array((56 > c.c ? c.a : 2 * c.a) - c.c);
            d[0] = 128;
            for (a = 1; a < d.length - 8; ++a) d[a] = 0;
            for (var e = 8 * c.d, a = d.length - 8; a < d.length; ++a) d[a] = e & 255, e /= 256;
            c.update(d);
            d = Array(16);
            for (a = e = 0; 4 > a; ++a)
                for (var f = 0; 32 > f; f += 8) d[e++] = c.b[a] >>> f & 255;
            if (8192 > d.length) c = String.fromCharCode.apply(null, d);
            else
                for (c = "", a = 0; a < d.length; a += 8192) c += String.fromCharCode.apply(null, fb(d, a, a + 8192));
            this.g = c
        }
        return this.g
    };
    var wl = [0, 0, 0, 1],
        xl = [],
        yl = [0, 0, 0, 1];

    function zl(a) {
        a = m(a) ? a : {};
        this.b = m(a.color) ? a.color : null;
        this.a = void 0
    }
    zl.prototype.c = function() {
        return this.b
    };
    zl.prototype.d = function(a) {
        this.b = a;
        this.a = void 0
    };
    zl.prototype.nb = function() {
        m(this.a) || (this.a = "f" + (null === this.b ? "-" : vf(this.b)));
        return this.a
    };

    function Al(a) {
        a = m(a) ? a : {};
        this.f = this.b = this.e = null;
        this.d = m(a.fill) ? a.fill : null;
        this.a = m(a.stroke) ? a.stroke : null;
        this.c = a.radius;
        this.o = [0, 0];
        this.i = this.p = this.g = null;
        var c = a.atlasManager,
            d, e = null,
            f, g = 0;
        null !== this.a && (f = vf(this.a.b), g = this.a.a, m(g) || (g = 1), e = this.a.c, ki || (e = null));
        var h = 2 * (this.c + g) + 1;
        f = {
            strokeStyle: f,
            md: g,
            size: h,
            lineDash: e
        };
        m(c) ? (h = Math.round(h), (e = null === this.d) && (d = ra(this.Rg, this, f)), g = this.nb(), f = c.add(g, h, h, ra(this.Sg, this, f), d), this.b = f.image, this.o = [f.offsetX, f.offsetY], d = f.image.width, this.f = e ? f.ig : this.b) : (this.b = Mf("CANVAS"), this.b.height = h, this.b.width = h, d = h = this.b.width, c = this.b.getContext("2d"), this.Sg(f, c, 0, 0), null === this.d ? (c = this.f = Mf("CANVAS"), c.height = f.size, c.width = f.size, c = c.getContext("2d"), this.Rg(f, c, 0, 0)) : this.f = this.b);
        this.g = [h / 2, h / 2];
        this.p = [h, h];
        this.i = [d, d];
        Ej.call(this, {
            opacity: 1,
            rotateWithView: !1,
            rotation: 0,
            scale: 1,
            snapToPixel: m(a.snapToPixel) ? a.snapToPixel : !0
        })
    }
    w(Al, Ej);
    l = Al.prototype;
    l.mb = function() {
        return this.g
    };
    l.ym = function() {
        return this.d
    };
    l.he = function() {
        return this.f
    };
    l.Lb = function() {
        return this.b
    };
    l.gd = function() {
        return 2
    };
    l.Dd = function() {
        return this.i
    };
    l.rb = function() {
        return this.o
    };
    l.zm = function() {
        return this.c
    };
    l.Xa = function() {
        return this.p
    };
    l.Am = function() {
        return this.a
    };
    l.$e = ca;
    l.load = ca;
    l.xf = ca;
    l.Sg = function(a, c, d, e) {
        c.setTransform(1, 0, 0, 1, 0, 0);
        c.translate(d, e);
        c.beginPath();
        c.arc(a.size / 2, a.size / 2, this.c, 0, 2 * Math.PI, !0);
        null !== this.d && (c.fillStyle = vf(this.d.b), c.fill());
        null !== this.a && (c.strokeStyle = a.strokeStyle, c.lineWidth = a.md, null === a.lineDash || c.setLineDash(a.lineDash), c.stroke());
        c.closePath()
    };
    l.Rg = function(a, c, d, e) {
        c.setTransform(1, 0, 0, 1, 0, 0);
        c.translate(d, e);
        c.beginPath();
        c.arc(a.size / 2, a.size / 2, this.c, 0, 2 * Math.PI, !0);
        c.fillStyle = wl;
        c.fill();
        null !== this.a && (c.strokeStyle = a.strokeStyle, c.lineWidth = a.md, null === a.lineDash || c.setLineDash(a.lineDash), c.stroke());
        c.closePath()
    };
    l.nb = function() {
        var a = null === this.a ? "-" : this.a.nb(),
            c = null === this.d ? "-" : this.d.nb();
        if (null === this.e || a != this.e[1] || c != this.e[2] || this.c != this.e[3]) this.e = ["c" + a + c + (m(this.c) ? this.c.toString() : "-"), a, c, this.c];
        return this.e[0]
    };

    function Bl(a) {
        a = m(a) ? a : {};
        this.g = null;
        this.d = Cl;
        m(a.geometry) && this.Vg(a.geometry);
        this.e = m(a.fill) ? a.fill : null;
        this.f = m(a.image) ? a.image : null;
        this.c = m(a.stroke) ? a.stroke : null;
        this.a = m(a.text) ? a.text : null;
        this.b = a.zIndex
    }
    l = Bl.prototype;
    l.Q = function() {
        return this.g
    };
    l.Zi = function() {
        return this.d
    };
    l.Mm = function() {
        return this.e
    };
    l.Nm = function() {
        return this.f
    };
    l.Om = function() {
        return this.c
    };
    l.Pm = function() {
        return this.a
    };
    l.Dj = function() {
        return this.b
    };
    l.Vg = function(a) {
        ka(a) ? this.d = a : ia(a) ? this.d = function(c) {
            return c.get(a)
        } : null === a ? this.d = Cl : m(a) && (this.d = function() {
            return a
        });
        this.g = a
    };
    l.mo = function(a) {
        this.b = a
    };

    function Dl(a) {
        ka(a) || (a = ga(a) ? a : [a], a = Eg(a));
        return a
    }

    function El() {
        var a = new zl({
                color: "rgba(255,255,255,0.4)"
            }),
            c = new vl({
                color: "#3399CC",
                width: 1.25
            }),
            d = [new Bl({
                image: new Al({
                    fill: a,
                    stroke: c,
                    radius: 5
                }),
                fill: a,
                stroke: c
            })];
        El = function() {
            return d
        };
        return d
    }

    function Fl() {
        var a = {},
            c = [255, 255, 255, 1],
            d = [0, 153, 255, 1];
        a.Polygon = [new Bl({
            fill: new zl({
                color: [255, 255, 255, .5]
            })
        })];
        a.MultiPolygon = a.Polygon;
        a.LineString = [new Bl({
            stroke: new vl({
                color: c,
                width: 5
            })
        }), new Bl({
            stroke: new vl({
                color: d,
                width: 3
            })
        })];
        a.MultiLineString = a.LineString;
        a.Circle = a.Polygon.concat(a.LineString);
        a.Point = [new Bl({
            image: new Al({
                radius: 6,
                fill: new zl({
                    color: d
                }),
                stroke: new vl({
                    color: c,
                    width: 1.5
                })
            }),
            zIndex: Infinity
        })];
        a.MultiPoint = a.Point;
        a.GeometryCollection = a.Polygon.concat(a.Point);
        return a
    }

    function Cl(a) {
        return a.Q()
    };

    function Gl(a) {
        var c = m(a) ? a : {};
        a = m(c.condition) ? c.condition : gk;
        this.n = m(c.duration) ? c.duration : 200;
        c = m(c.style) ? c.style : new Bl({
            stroke: new vl({
                color: [0, 0, 255, 1]
            })
        });
        nl.call(this, {
            condition: a,
            style: c
        })
    }
    w(Gl, nl);
    Gl.prototype.g = function() {
        var a = this.l,
            c = a.R(),
            d = this.Q().G(),
            e = ce(d),
            f = a.xa(),
            d = Oe(d, f),
            f = this.n,
            d = c.constrainResolution(d, 0, void 0);
        Zj(a, c, d, e, f)
    };

    function Hl(a) {
        Wj.call(this, {
            handleEvent: Il
        });
        a = m(a) ? a : {};
        this.a = m(a.condition) ? a.condition : Lg(fk, hk);
        this.e = m(a.duration) ? a.duration : 100;
        this.f = m(a.pixelDelta) ? a.pixelDelta : 128
    }
    w(Hl, Wj);

    function Il(a) {
        var c = !1;
        if ("key" == a.type) {
            var d = a.b.e;
            if (this.a(a) && (40 == d || 37 == d || 39 == d || 38 == d)) {
                var e = a.map,
                    c = e.R(),
                    f = Se(c),
                    g = f.resolution * this.f,
                    h = 0,
                    k = 0;
                40 == d ? k = -g : 37 == d ? h = -g : 39 == d ? h = g : k = g;
                d = [h, k];
                rd(d, f.rotation);
                f = this.e;
                g = c.Ca();
                m(g) && (m(f) && 0 < f && e.Ha(Ze({
                    source: g,
                    duration: f,
                    easing: Xe
                })), e = c.xd([g[0] + d[0], g[1] + d[1]]), c.Na(e));
                a.preventDefault();
                c = !0
            }
        }
        return !c
    };

    function Jl(a) {
        Wj.call(this, {
            handleEvent: Kl
        });
        a = m(a) ? a : {};
        this.e = m(a.condition) ? a.condition : hk;
        this.a = m(a.delta) ? a.delta : 1;
        this.f = m(a.duration) ? a.duration : 100
    }
    w(Jl, Wj);

    function Kl(a) {
        var c = !1;
        if ("key" == a.type) {
            var d = a.b.q;
            if (this.e(a) && (43 == d || 45 == d)) {
                c = a.map;
                d = 43 == d ? this.a : -this.a;
                c.render();
                var e = c.R();
                Yj(c, e, d, void 0, this.f);
                a.preventDefault();
                c = !0
            }
        }
        return !c
    };

    function Ll(a) {
        Wj.call(this, {
            handleEvent: Ml
        });
        a = m(a) ? a : {};
        this.a = 0;
        this.o = m(a.duration) ? a.duration : 250;
        this.f = null;
        this.g = this.e = void 0
    }
    w(Ll, Wj);

    function Ml(a) {
        var c = !1;
        if ("mousewheel" == a.type) {
            var c = a.map,
                d = a.b;
            this.f = a.coordinate;
            this.a += d.o;
            m(this.e) || (this.e = ua());
            d = Math.max(80 - (ua() - this.e), 0);
            ba.clearTimeout(this.g);
            this.g = ba.setTimeout(ra(this.i, this, c), d);
            a.preventDefault();
            c = !0
        }
        return !c
    }
    Ll.prototype.i = function(a) {
        var c = Vb(this.a, -1, 1),
            d = a.R();
        a.render();
        Yj(a, d, -c, this.f, this.o);
        this.a = 0;
        this.f = null;
        this.g = this.e = void 0
    };

    function Nl(a) {
        jk.call(this, {
            handleDownEvent: Ol,
            handleDragEvent: Pl,
            handleUpEvent: Ql
        });
        a = m(a) ? a : {};
        this.f = null;
        this.g = void 0;
        this.a = !1;
        this.i = 0;
        this.p = m(a.threshold) ? a.threshold : .3;
        this.n = m(a.duration) ? a.duration : 250
    }
    w(Nl, jk);

    function Pl(a) {
        var c = 0,
            d = this.e[0],
            e = this.e[1],
            d = Math.atan2(e.clientY - d.clientY, e.clientX - d.clientX);
        m(this.g) && (c = d - this.g, this.i += c, !this.a && Math.abs(this.i) > this.p && (this.a = !0));
        this.g = d;
        a = a.map;
        d = jg(a.a);
        e = lk(this.e);
        e[0] -= d.x;
        e[1] -= d.y;
        this.f = a.ka(e);
        this.a && (d = a.R(), e = d.Da(), a.render(), Xj(a, d, e + c, this.f))
    }

    function Ql(a) {
        if (2 > this.e.length) {
            a = a.map;
            var c = a.R();
            Ue(c, -1);
            if (this.a) {
                var d = c.Da(),
                    e = this.f,
                    f = this.n,
                    d = c.constrainRotation(d, 0);
                Xj(a, c, d, e, f)
            }
            return !1
        }
        return !0
    }

    function Ol(a) {
        return 2 <= this.e.length ? (a = a.map, this.f = null, this.g = void 0, this.a = !1, this.i = 0, this.o || Ue(a.R(), 1), a.render(), !0) : !1
    }
    Nl.prototype.nc = Fg;

    function Rl(a) {
        jk.call(this, {
            handleDownEvent: Sl,
            handleDragEvent: Tl,
            handleUpEvent: Ul
        });
        a = m(a) ? a : {};
        this.f = null;
        this.i = m(a.duration) ? a.duration : 400;
        this.a = void 0;
        this.g = 1
    }
    w(Rl, jk);

    function Tl(a) {
        var c = 1,
            d = this.e[0],
            e = this.e[1],
            f = d.clientX - e.clientX,
            d = d.clientY - e.clientY,
            f = Math.sqrt(f * f + d * d);
        m(this.a) && (c = this.a / f);
        this.a = f;
        1 != c && (this.g = c);
        a = a.map;
        var f = a.R(),
            d = f.ya(),
            e = jg(a.a),
            g = lk(this.e);
        g[0] -= e.x;
        g[1] -= e.y;
        this.f = a.ka(g);
        a.render();
        Zj(a, f, d * c, this.f)
    }

    function Ul(a) {
        if (2 > this.e.length) {
            a = a.map;
            var c = a.R();
            Ue(c, -1);
            var d = c.ya(),
                e = this.f,
                f = this.i,
                d = c.constrainResolution(d, 0, this.g - 1);
            Zj(a, c, d, e, f);
            return !1
        }
        return !0
    }

    function Sl(a) {
        return 2 <= this.e.length ? (a = a.map, this.f = null, this.a = void 0, this.g = 1, this.o || Ue(a.R(), 1), a.render(), !0) : !1
    }
    Rl.prototype.nc = Fg;

    function Vl(a) {
        a = m(a) ? a : {};
        var c = new of,
            d = new Tj(-.005, .05, 100);
        (m(a.altShiftDragRotate) ? a.altShiftDragRotate : 1) && c.push(new qk);
        (m(a.doubleClickZoom) ? a.doubleClickZoom : 1) && c.push(new ak({
            delta: a.zoomDelta,
            duration: a.zoomDuration
        }));
        (m(a.dragPan) ? a.dragPan : 1) && c.push(new mk({
            kinetic: d
        }));
        (m(a.pinchRotate) ? a.pinchRotate : 1) && c.push(new Nl);
        (m(a.pinchZoom) ? a.pinchZoom : 1) && c.push(new Rl({
            duration: a.zoomDuration
        }));
        if (m(a.keyboard) ? a.keyboard : 1) c.push(new Hl), c.push(new Jl({
            delta: a.zoomDelta,
            duration: a.zoomDuration
        }));
        (m(a.mouseWheelZoom) ? a.mouseWheelZoom : 1) && c.push(new Ll({
            duration: a.zoomDuration
        }));
        (m(a.shiftDragZoom) ? a.shiftDragZoom : 1) && c.push(new Gl);
        return c
    };

    function G(a) {
        var c = m(a) ? a : {};
        a = Db(c);
        delete a.layers;
        c = c.layers;
        mj.call(this, a);
        this.c = [];
        this.a = {};
        x(this, hd("layers"), this.Vj, !1, this);
        null != c ? ga(c) && (c = new of(c.slice())) : c = new of;
        this.Ah(c)
    }
    w(G, mj);
    l = G.prototype;
    l.Qd = function() {
        this.eb() && this.k()
    };
    l.Vj = function() {
        Sa(this.c, Wc);
        this.c.length = 0;
        var a = this.Bc();
        this.c.push(x(a, "add", this.Uj, !1, this), x(a, "remove", this.Wj, !1, this));
        pb(this.a, function(a) {
            Sa(a, Wc)
        });
        yb(this.a);
        var a = a.a,
            c, d, e;
        c = 0;
        for (d = a.length; c < d; c++) e = a[c], this.a[ma(e).toString()] = [x(e, "propertychange", this.Qd, !1, this), x(e, "change", this.Qd, !1, this)];
        this.k()
    };
    l.Uj = function(a) {
        a = a.element;
        var c = ma(a).toString();
        this.a[c] = [x(a, "propertychange", this.Qd, !1, this), x(a, "change", this.Qd, !1, this)];
        this.k()
    };
    l.Wj = function(a) {
        a = ma(a.element).toString();
        Sa(this.a[a], Wc);
        delete this.a[a];
        this.k()
    };
    l.Bc = function() {
        return this.get("layers")
    };
    l.Ah = function(a) {
        this.set("layers", a)
    };
    l.Ue = function(a) {
        var c = m(a) ? a : [],
            d = c.length;
        this.Bc().forEach(function(a) {
            a.Ue(c)
        });
        a = nj(this);
        var e, f;
        for (e = c.length; d < e; d++) f = c[d], f.brightness = Vb(f.brightness + a.brightness, -1, 1), f.contrast *= a.contrast, f.hue += a.hue, f.opacity *= a.opacity, f.saturation *= a.saturation, f.visible = f.visible && a.visible, f.maxResolution = Math.min(f.maxResolution, a.maxResolution), f.minResolution = Math.max(f.minResolution, a.minResolution), m(a.extent) && (f.extent = m(f.extent) ? ge(f.extent, a.extent) : a.extent);
        return c
    };
    l.We = function() {
        return "ready"
    };

    function Wl(a) {
        pe.call(this, {
            code: a,
            units: "m",
            extent: Xl,
            global: !0,
            worldExtent: Yl
        })
    }
    w(Wl, pe);
    Wl.prototype.getPointResolution = function(a, c) {
        var d = c[1] / 6378137;
        return a / ((Math.exp(d) + Math.exp(-d)) / 2)
    };
    var Zl = 6378137 * Math.PI,
        Xl = [-Zl, -Zl, Zl, Zl],
        Yl = [-180, -85, 180, 85],
        Be = Ua("EPSG:3857 EPSG:102100 EPSG:102113 EPSG:900913 urn:ogc:def:crs:EPSG:6.18:3:3857 urn:ogc:def:crs:EPSG::3857 http://www.opengis.net/gml/srs/epsg.xml#3857".split(" "), function(a) {
            return new Wl(a)
        });

    function Ce(a, c, d) {
        var e = a.length;
        d = 1 < d ? d : 2;
        m(c) || (2 < d ? c = a.slice() : c = Array(e));
        for (var f = 0; f < e; f += d) c[f] = 6378137 * Math.PI * a[f] / 180, c[f + 1] = 6378137 * Math.log(Math.tan(Math.PI * (a[f + 1] + 90) / 360));
        return c
    }

    function De(a, c, d) {
        var e = a.length;
        d = 1 < d ? d : 2;
        m(c) || (2 < d ? c = a.slice() : c = Array(e));
        for (var f = 0; f < e; f += d) c[f] = 180 * a[f] / (6378137 * Math.PI), c[f + 1] = 360 * Math.atan(Math.exp(a[f + 1] / 6378137)) / Math.PI - 90;
        return c
    };

    function $l(a, c) {
        pe.call(this, {
            code: a,
            units: "degrees",
            extent: am,
            axisOrientation: c,
            global: !0,
            worldExtent: am
        })
    }
    w($l, pe);
    $l.prototype.getPointResolution = function(a) {
        return a
    };
    var am = [-180, -90, 180, 90],
        Ee = [new $l("CRS:84"), new $l("EPSG:4326", "neu"), new $l("urn:ogc:def:crs:EPSG::4326", "neu"), new $l("urn:ogc:def:crs:EPSG:6.6:4326", "neu"), new $l("urn:ogc:def:crs:OGC:1.3:CRS84"), new $l("urn:ogc:def:crs:OGC:2:84"), new $l("http://www.opengis.net/gml/srs/epsg.xml#4326", "neu"), new $l("urn:x-ogc:def:crs:EPSG:4326", "neu")];

    function bm() {
        se(Be);
        se(Ee);
        Ae()
    };

    function I(a) {
        C.call(this, m(a) ? a : {})
    }
    w(I, C);

    function L(a) {
        a = m(a) ? a : {};
        var c = Db(a);
        delete c.preload;
        delete c.useInterimTilesOnError;
        C.call(this, c);
        this.d(m(a.preload) ? a.preload : 0);
        this.e(m(a.useInterimTilesOnError) ? a.useInterimTilesOnError : !0)
    }
    w(L, C);
    L.prototype.a = function() {
        return this.get("preload")
    };
    L.prototype.d = function(a) {
        this.set("preload", a)
    };
    L.prototype.c = function() {
        return this.get("useInterimTilesOnError")
    };
    L.prototype.e = function(a) {
        this.set("useInterimTilesOnError", a)
    };

    function M(a) {
        a = m(a) ? a : {};
        var c = Db(a);
        delete c.style;
        delete c.renderBuffer;
        delete c.updateWhileAnimating;
        delete c.updateWhileInteracting;
        C.call(this, c);
        this.c = m(a.renderBuffer) ? a.renderBuffer : 100;
        this.g = null;
        this.a = void 0;
        this.e(a.style);
        this.o = m(a.updateWhileAnimating) ? a.updateWhileAnimating : !1;
        this.n = m(a.updateWhileInteracting) ? a.updateWhileInteracting : !1
    }
    w(M, C);
    M.prototype.H = function() {
        return this.g
    };
    M.prototype.J = function() {
        return this.a
    };
    M.prototype.e = function(a) {
        this.g = m(a) ? a : El;
        this.a = null === a ? void 0 : Dl(this.g);
        this.k()
    };

    function cm(a, c, d, e, f) {
        this.U = {};
        this.c = a;
        this.n = c;
        this.e = d;
        this.H = e;
        this.Nc = f;
        this.f = this.b = this.a = this.oa = this.ba = this.X = null;
        this.Ga = this.Fa = this.o = this.N = this.L = this.J = 0;
        this.Ra = !1;
        this.g = this.rc = 0;
        this.vb = !1;
        this.T = 0;
        this.d = "";
        this.q = this.p = this.xb = this.wb = 0;
        this.sa = this.l = this.i = null;
        this.V = [];
        this.sc = zd()
    }

    function dm(a, c, d) {
        if (null !== a.f) {
            c = vk(c, 0, d, 2, a.H, a.V);
            d = a.c;
            var e = a.sc,
                f = d.globalAlpha;
            1 != a.o && (d.globalAlpha = f * a.o);
            var g = a.rc;
            a.Ra && (g += a.Nc);
            var h, k;
            h = 0;
            for (k = c.length; h < k; h += 2) {
                var n = c[h] - a.J,
                    p = c[h + 1] - a.L;
                a.vb && (n = n + .5 | 0, p = p + .5 | 0);
                if (0 !== g || 1 != a.g) {
                    var q = n + a.J,
                        r = p + a.L;
                    qj(e, q, r, a.g, a.g, g, -q, -r);
                    d.setTransform(e[0], e[1], e[4], e[5], e[12], e[13])
                }
                d.drawImage(a.f, a.Fa, a.Ga, a.T, a.N, n, p, a.T, a.N)
            }
            0 === g && 1 == a.g || d.setTransform(1, 0, 0, 1, 0, 0);
            1 != a.o && (d.globalAlpha = f)
        }
    }

    function em(a, c, d, e) {
        var f = 0;
        if (null !== a.sa && "" !== a.d) {
            null === a.i || fm(a, a.i);
            null === a.l || gm(a, a.l);
            var g = a.sa,
                h = a.c,
                k = a.oa;
            null === k ? (h.font = g.font, h.textAlign = g.textAlign, h.textBaseline = g.textBaseline, a.oa = {
                font: g.font,
                textAlign: g.textAlign,
                textBaseline: g.textBaseline
            }) : (k.font != g.font && (k.font = h.font = g.font), k.textAlign != g.textAlign && (k.textAlign = h.textAlign = g.textAlign), k.textBaseline != g.textBaseline && (k.textBaseline = h.textBaseline = g.textBaseline));
            c = vk(c, f, d, e, a.H, a.V);
            for (g = a.c; f < d; f += e) {
                h = c[f] + a.wb;
                k = c[f + 1] + a.xb;
                if (0 !== a.p || 1 != a.q) {
                    var n = qj(a.sc, h, k, a.q, a.q, a.p, -h, -k);
                    g.setTransform(n[0], n[1], n[4], n[5], n[12], n[13])
                }
                null === a.l || g.strokeText(a.d, h, k);
                null === a.i || g.fillText(a.d, h, k)
            }
            0 === a.p && 1 == a.q || g.setTransform(1, 0, 0, 1, 0, 0)
        }
    }

    function hm(a, c, d, e, f, g) {
        var h = a.c;
        a = vk(c, d, e, f, a.H, a.V);
        h.moveTo(a[0], a[1]);
        for (c = 2; c < a.length; c += 2) h.lineTo(a[c], a[c + 1]);
        g && h.lineTo(a[0], a[1]);
        return e
    }

    function im(a, c, d, e, f) {
        var g = a.c,
            h, k;
        h = 0;
        for (k = e.length; h < k; ++h) d = hm(a, c, d, e[h], f, !0), g.closePath();
        return d
    }
    l = cm.prototype;
    l.tc = function(a, c) {
        var d = a.toString(),
            e = this.U[d];
        m(e) ? e.push(c) : this.U[d] = [c]
    };
    l.uc = function(a) {
        if (he(this.e, a.G())) {
            if (null !== this.a || null !== this.b) {
                null === this.a || fm(this, this.a);
                null === this.b || gm(this, this.b);
                var c;
                c = a.j;
                c = null === c ? null : vk(c, 0, c.length, a.s, this.H, this.V);
                var d = c[2] - c[0],
                    e = c[3] - c[1],
                    d = Math.sqrt(d * d + e * e),
                    e = this.c;
                e.beginPath();
                e.arc(c[0], c[1], d, 0, 2 * Math.PI);
                null === this.a || e.fill();
                null === this.b || e.stroke()
            }
            "" !== this.d && em(this, a.dd(), 2, 2)
        }
    };
    l.Le = function(a, c) {
        var d = (0, c.d)(a);
        if (null != d && he(this.e, d.G())) {
            var e = c.b;
            m(e) || (e = 0);
            this.tc(e, function(a) {
                a.Aa(c.e, c.c);
                a.Za(c.f);
                a.Ba(c.a);
                jm[d.M()].call(a, d, null)
            })
        }
    };
    l.zd = function(a, c) {
        var d = a.d,
            e, f;
        e = 0;
        for (f = d.length; e < f; ++e) {
            var g = d[e];
            jm[g.M()].call(this, g, c)
        }
    };
    l.kb = function(a) {
        var c = a.j;
        a = a.s;
        null === this.f || dm(this, c, c.length);
        "" !== this.d && em(this, c, c.length, a)
    };
    l.jb = function(a) {
        var c = a.j;
        a = a.s;
        null === this.f || dm(this, c, c.length);
        "" !== this.d && em(this, c, c.length, a)
    };
    l.zb = function(a) {
        if (he(this.e, a.G())) {
            if (null !== this.b) {
                gm(this, this.b);
                var c = this.c,
                    d = a.j;
                c.beginPath();
                hm(this, d, 0, d.length, a.s, !1);
                c.stroke()
            }
            "" !== this.d && (a = km(a), em(this, a, 2, 2))
        }
    };
    l.vc = function(a) {
        var c = a.G();
        if (he(this.e, c)) {
            if (null !== this.b) {
                gm(this, this.b);
                var c = this.c,
                    d = a.j,
                    e = 0,
                    f = a.c,
                    g = a.s;
                c.beginPath();
                var h, k;
                h = 0;
                for (k = f.length; h < k; ++h) e = hm(this, d, e, f[h], g, !1);
                c.stroke()
            }
            "" !== this.d && (a = lm(a), em(this, a, a.length, 2))
        }
    };
    l.Rb = function(a) {
        if (he(this.e, a.G())) {
            if (null !== this.b || null !== this.a) {
                null === this.a || fm(this, this.a);
                null === this.b || gm(this, this.b);
                var c = this.c;
                c.beginPath();
                im(this, el(a), 0, a.c, a.s);
                null === this.a || c.fill();
                null === this.b || c.stroke()
            }
            "" !== this.d && (a = fl(a), em(this, a, 2, 2))
        }
    };
    l.wc = function(a) {
        if (he(this.e, a.G())) {
            if (null !== this.b || null !== this.a) {
                null === this.a || fm(this, this.a);
                null === this.b || gm(this, this.b);
                var c = this.c,
                    d = mm(a),
                    e = 0,
                    f = a.c,
                    g = a.s,
                    h, k;
                h = 0;
                for (k = f.length; h < k; ++h) {
                    var n = f[h];
                    c.beginPath();
                    e = im(this, d, e, n, g);
                    null === this.a || c.fill();
                    null === this.b || c.stroke()
                }
            }
            "" !== this.d && (a = nm(a), em(this, a, a.length, 2))
        }
    };

    function om(a) {
        var c = Ua(tb(a.U), Number);
        gb(c);
        var d, e, f, g, h;
        d = 0;
        for (e = c.length; d < e; ++d)
            for (f = a.U[c[d].toString()], g = 0, h = f.length; g < h; ++g) f[g](a)
    }

    function fm(a, c) {
        var d = a.c,
            e = a.X;
        null === e ? (d.fillStyle = c.fillStyle, a.X = {
            fillStyle: c.fillStyle
        }) : e.fillStyle != c.fillStyle && (e.fillStyle = d.fillStyle = c.fillStyle)
    }

    function gm(a, c) {
        var d = a.c,
            e = a.ba;
        null === e ? (d.lineCap = c.lineCap, ki && d.setLineDash(c.lineDash), d.lineJoin = c.lineJoin, d.lineWidth = c.lineWidth, d.miterLimit = c.miterLimit, d.strokeStyle = c.strokeStyle, a.ba = {
            lineCap: c.lineCap,
            lineDash: c.lineDash,
            lineJoin: c.lineJoin,
            lineWidth: c.lineWidth,
            miterLimit: c.miterLimit,
            strokeStyle: c.strokeStyle
        }) : (e.lineCap != c.lineCap && (e.lineCap = d.lineCap = c.lineCap), ki && !ib(e.lineDash, c.lineDash) && d.setLineDash(e.lineDash = c.lineDash), e.lineJoin != c.lineJoin && (e.lineJoin = d.lineJoin = c.lineJoin), e.lineWidth != c.lineWidth && (e.lineWidth = d.lineWidth = c.lineWidth), e.miterLimit != c.miterLimit && (e.miterLimit = d.miterLimit = c.miterLimit), e.strokeStyle != c.strokeStyle && (e.strokeStyle = d.strokeStyle = c.strokeStyle))
    }
    l.Aa = function(a, c) {
        if (null === a) this.a = null;
        else {
            var d = a.b;
            this.a = {
                fillStyle: vf(null === d ? wl : d)
            }
        }
        if (null === c) this.b = null;
        else {
            var d = c.b,
                e = c.d,
                f = c.c,
                g = c.e,
                h = c.a,
                k = c.f;
            this.b = {
                lineCap: m(e) ? e : "round",
                lineDash: null != f ? f : xl,
                lineJoin: m(g) ? g : "round",
                lineWidth: this.n * (m(h) ? h : 1),
                miterLimit: m(k) ? k : 10,
                strokeStyle: vf(null === d ? yl : d)
            }
        }
    };
    l.Za = function(a) {
        if (null === a) this.f = null;
        else {
            var c = a.mb(),
                d = a.Lb(1),
                e = a.rb(),
                f = a.Xa();
            this.J = c[0];
            this.L = c[1];
            this.N = f[1];
            this.f = d;
            this.o = a.U;
            this.Fa = e[0];
            this.Ga = e[1];
            this.Ra = a.V;
            this.rc = a.q;
            this.g = a.l;
            this.vb = a.n;
            this.T = f[0]
        }
    };
    l.Ba = function(a) {
        if (null === a) this.d = "";
        else {
            var c = a.b;
            null === c ? this.i = null : (c = c.b, this.i = {
                fillStyle: vf(null === c ? wl : c)
            });
            var d = a.f;
            if (null === d) this.l = null;
            else {
                var c = d.b,
                    e = d.d,
                    f = d.c,
                    g = d.e,
                    h = d.a,
                    d = d.f;
                this.l = {
                    lineCap: m(e) ? e : "round",
                    lineDash: null != f ? f : xl,
                    lineJoin: m(g) ? g : "round",
                    lineWidth: m(h) ? h : 1,
                    miterLimit: m(d) ? d : 10,
                    strokeStyle: vf(null === c ? yl : c)
                }
            }
            var c = a.d,
                e = a.q,
                f = a.l,
                g = a.e,
                h = a.a,
                d = a.c,
                k = a.g;
            a = a.i;
            this.sa = {
                font: m(c) ? c : "10px sans-serif",
                textAlign: m(k) ? k : "center",
                textBaseline: m(a) ? a : "middle"
            };
            this.d = m(d) ? d : "";
            this.wb = m(e) ? this.n * e : 0;
            this.xb = m(f) ? this.n * f : 0;
            this.p = m(g) ? g : 0;
            this.q = this.n * (m(h) ? h : 1)
        }
    };
    var jm = {
        Point: cm.prototype.kb,
        LineString: cm.prototype.zb,
        Polygon: cm.prototype.Rb,
        MultiPoint: cm.prototype.jb,
        MultiLineString: cm.prototype.vc,
        MultiPolygon: cm.prototype.wc,
        GeometryCollection: cm.prototype.zd,
        Circle: cm.prototype.uc
    };
    var pm = ["Polygon", "LineString", "Image", "Text"];

    function qm(a, c, d) {
        this.oa = a;
        this.T = c;
        this.d = null;
        this.e = 0;
        this.resolution = d;
        this.L = this.J = null;
        this.a = [];
        this.coordinates = [];
        this.X = zd();
        this.b = [];
        this.sa = [];
        this.ba = zd()
    }
    w(qm, hl);

    function rm(a, c, d, e, f, g) {
        var h = a.coordinates.length,
            k = a.Pe(),
            n = [c[d], c[d + 1]],
            p = [NaN, NaN],
            q = !0,
            r, t, u;
        for (r = d + f; r < e; r += f) p[0] = c[r], p[1] = c[r + 1], u = Td(k, p), u !== t ? (q && (a.coordinates[h++] = n[0], a.coordinates[h++] = n[1]), a.coordinates[h++] = p[0], a.coordinates[h++] = p[1], q = !1) : 1 === u ? (a.coordinates[h++] = p[0], a.coordinates[h++] = p[1], q = !1) : q = !0, n[0] = p[0], n[1] = p[1], t = u;
        r === d + f && (a.coordinates[h++] = n[0], a.coordinates[h++] = n[1]);
        g && (a.coordinates[h++] = c[d], a.coordinates[h++] = c[d + 1]);
        return h
    }

    function sm(a, c) {
        a.J = [0, c, 0];
        a.a.push(a.J);
        a.L = [0, c, 0];
        a.b.push(a.L)
    }

    function tm(a, c, d, e, f, g, h, k, n) {
        var p;
        rj(e, a.X) ? p = a.sa : (p = vk(a.coordinates, 0, a.coordinates.length, 2, e, a.sa), Cd(a.X, e));
        e = 0;
        var q = h.length,
            r = 0,
            t;
        for (a = a.ba; e < q;) {
            var u = h[e],
                A, z, D, B;
            switch (u[0]) {
                case 0:
                    r = u[1];
                    t = ma(r).toString();
                    m(g[t]) ? e = u[2] : m(n) && !he(n, r.Q().G()) ? e = u[2] : ++e;
                    break;
                case 1:
                    c.beginPath();
                    ++e;
                    break;
                case 2:
                    r = u[1];
                    t = p[r];
                    var y = p[r + 1],
                        K = p[r + 2] - t,
                        r = p[r + 3] - y;
                    c.arc(t, y, Math.sqrt(K * K + r * r), 0, 2 * Math.PI, !0);
                    ++e;
                    break;
                case 3:
                    c.closePath();
                    ++e;
                    break;
                case 4:
                    r = u[1];
                    t = u[2];
                    A = u[3];
                    D = u[4] * d;
                    var J = u[5] * d,
                        H = u[6];
                    z = u[7];
                    var P = u[8],
                        sa = u[9],
                        y = u[11],
                        K = u[12],
                        Oa = u[13],
                        N = u[14];
                    for (u[10] && (y += f); r < t; r += 2) {
                        u = p[r] - D;
                        B = p[r + 1] - J;
                        Oa && (u = u + .5 | 0, B = B + .5 | 0);
                        if (1 != K || 0 !== y) {
                            var za = u + D,
                                cb = B + J;
                            qj(a, za, cb, K, K, y, -za, -cb);
                            c.setTransform(a[0], a[1], a[4], a[5], a[12], a[13])
                        }
                        za = c.globalAlpha;
                        1 != z && (c.globalAlpha = za * z);
                        c.drawImage(A, P, sa, N, H, u, B, N * d, H * d);
                        1 != z && (c.globalAlpha = za);
                        1 == K && 0 === y || c.setTransform(1, 0, 0, 1, 0, 0)
                    }++e;
                    break;
                case 5:
                    r = u[1];
                    t = u[2];
                    D = u[3];
                    J = u[4] * d;
                    H = u[5] * d;
                    y = u[6];
                    K = u[7] * d;
                    A = u[8];
                    for (z = u[9]; r < t; r += 2) {
                        u = p[r] + J;
                        B = p[r + 1] + H;
                        if (1 != K || 0 !== y) qj(a, u, B, K, K, y, -u, -B), c.setTransform(a[0], a[1], a[4], a[5], a[12], a[13]);
                        z && c.strokeText(D, u, B);
                        A && c.fillText(D, u, B);
                        1 == K && 0 === y || c.setTransform(1, 0, 0, 1, 0, 0)
                    }++e;
                    break;
                case 6:
                    if (m(k) && (r = u[1], r = k(r))) return r;
                    ++e;
                    break;
                case 7:
                    c.fill();
                    ++e;
                    break;
                case 8:
                    r = u[1];
                    t = u[2];
                    c.moveTo(p[r], p[r + 1]);
                    for (r += 2; r < t; r += 2) c.lineTo(p[r], p[r + 1]);
                    ++e;
                    break;
                case 9:
                    c.fillStyle = u[1];
                    ++e;
                    break;
                case 10:
                    r = m(u[7]) ? u[7] : !0;
                    t = u[2];
                    c.strokeStyle = u[1];
                    c.lineWidth = r ? t * d : t;
                    c.lineCap = u[3];
                    c.lineJoin = u[4];
                    c.miterLimit = u[5];
                    ki && c.setLineDash(u[6]);
                    ++e;
                    break;
                case 11:
                    c.font = u[1];
                    c.textAlign = u[2];
                    c.textBaseline = u[3];
                    ++e;
                    break;
                case 12:
                    c.stroke();
                    ++e;
                    break;
                default:
                    ++e
            }
        }
    }

    function vm(a) {
        var c = a.b;
        c.reverse();
        var d, e = c.length,
            f, g, h = -1;
        for (d = 0; d < e; ++d)
            if (f = c[d], g = f[0], 6 == g) h = d;
            else if (0 == g) {
            f[2] = d;
            f = a.b;
            for (g = d; h < g;) {
                var k = f[h];
                f[h] = f[g];
                f[g] = k;
                ++h;
                --g
            }
            h = -1
        }
    }

    function wm(a, c) {
        a.J[2] = a.a.length;
        a.J = null;
        a.L[2] = a.b.length;
        a.L = null;
        var d = [6, c];
        a.a.push(d);
        a.b.push(d)
    }
    qm.prototype.de = ca;
    qm.prototype.Pe = function() {
        return this.T
    };

    function xm(a, c, d) {
        qm.call(this, a, c, d);
        this.i = this.N = null;
        this.H = this.p = this.n = this.V = this.U = this.o = this.l = this.q = this.g = this.f = this.c = void 0
    }
    w(xm, qm);
    xm.prototype.kb = function(a, c) {
        if (null !== this.i) {
            sm(this, c);
            var d = a.j,
                e = this.coordinates.length,
                d = rm(this, d, 0, d.length, a.s, !1);
            this.a.push([4, e, d, this.i, this.c, this.f, this.g, this.q, this.l, this.o, this.U, this.V, this.n, this.p, this.H]);
            this.b.push([4, e, d, this.N, this.c, this.f, this.g, this.q, this.l, this.o, this.U, this.V, this.n, this.p, this.H]);
            wm(this, c)
        }
    };
    xm.prototype.jb = function(a, c) {
        if (null !== this.i) {
            sm(this, c);
            var d = a.j,
                e = this.coordinates.length,
                d = rm(this, d, 0, d.length, a.s, !1);
            this.a.push([4, e, d, this.i, this.c, this.f, this.g, this.q, this.l, this.o, this.U, this.V, this.n, this.p, this.H]);
            this.b.push([4, e, d, this.N, this.c, this.f, this.g, this.q, this.l, this.o, this.U, this.V, this.n, this.p, this.H]);
            wm(this, c)
        }
    };
    xm.prototype.de = function() {
        vm(this);
        this.f = this.c = void 0;
        this.i = this.N = null;
        this.H = this.p = this.V = this.U = this.o = this.l = this.q = this.n = this.g = void 0
    };
    xm.prototype.Za = function(a) {
        var c = a.mb(),
            d = a.Xa(),
            e = a.he(1),
            f = a.Lb(1),
            g = a.rb();
        this.c = c[0];
        this.f = c[1];
        this.N = e;
        this.i = f;
        this.g = d[1];
        this.q = a.U;
        this.l = g[0];
        this.o = g[1];
        this.U = a.V;
        this.V = a.q;
        this.n = a.l;
        this.p = a.n;
        this.H = d[0]
    };

    function ym(a, c, d) {
        qm.call(this, a, c, d);
        this.c = {
            Xc: void 0,
            Sc: void 0,
            Tc: null,
            Uc: void 0,
            Vc: void 0,
            Wc: void 0,
            Ze: 0,
            strokeStyle: void 0,
            lineCap: void 0,
            lineDash: null,
            lineJoin: void 0,
            lineWidth: void 0,
            miterLimit: void 0
        }
    }
    w(ym, qm);

    function zm(a, c, d, e, f) {
        var g = a.coordinates.length;
        c = rm(a, c, d, e, f, !1);
        g = [8, g, c];
        a.a.push(g);
        a.b.push(g);
        return e
    }
    l = ym.prototype;
    l.Pe = function() {
        null === this.d && (this.d = Pd(this.T), 0 < this.e && Od(this.d, this.resolution * (this.e + 1) / 2, this.d));
        return this.d
    };

    function Am(a) {
        var c = a.c,
            d = c.strokeStyle,
            e = c.lineCap,
            f = c.lineDash,
            g = c.lineJoin,
            h = c.lineWidth,
            k = c.miterLimit;
        c.Xc == d && c.Sc == e && ib(c.Tc, f) && c.Uc == g && c.Vc == h && c.Wc == k || (c.Ze != a.coordinates.length && (a.a.push([12]), c.Ze = a.coordinates.length), a.a.push([10, d, h, e, g, k, f], [1]), c.Xc = d, c.Sc = e, c.Tc = f, c.Uc = g, c.Vc = h, c.Wc = k)
    }
    l.zb = function(a, c) {
        var d = this.c,
            e = d.lineWidth;
        m(d.strokeStyle) && m(e) && (Am(this), sm(this, c), this.b.push([10, d.strokeStyle, d.lineWidth, d.lineCap, d.lineJoin, d.miterLimit, d.lineDash], [1]), d = a.j, zm(this, d, 0, d.length, a.s), this.b.push([12]), wm(this, c))
    };
    l.vc = function(a, c) {
        var d = this.c,
            e = d.lineWidth;
        if (m(d.strokeStyle) && m(e)) {
            Am(this);
            sm(this, c);
            this.b.push([10, d.strokeStyle, d.lineWidth, d.lineCap, d.lineJoin, d.miterLimit, d.lineDash], [1]);
            var d = a.c,
                e = a.j,
                f = a.s,
                g = 0,
                h, k;
            h = 0;
            for (k = d.length; h < k; ++h) g = zm(this, e, g, d[h], f);
            this.b.push([12]);
            wm(this, c)
        }
    };
    l.de = function() {
        this.c.Ze != this.coordinates.length && this.a.push([12]);
        vm(this);
        this.c = null
    };
    l.Aa = function(a, c) {
        var d = c.b;
        this.c.strokeStyle = vf(null === d ? yl : d);
        d = c.d;
        this.c.lineCap = m(d) ? d : "round";
        d = c.c;
        this.c.lineDash = null === d ? xl : d;
        d = c.e;
        this.c.lineJoin = m(d) ? d : "round";
        d = c.a;
        this.c.lineWidth = m(d) ? d : 1;
        d = c.f;
        this.c.miterLimit = m(d) ? d : 10;
        this.c.lineWidth > this.e && (this.e = this.c.lineWidth, this.d = null)
    };

    function Bm(a, c, d) {
        qm.call(this, a, c, d);
        this.c = {
            Mf: void 0,
            Xc: void 0,
            Sc: void 0,
            Tc: null,
            Uc: void 0,
            Vc: void 0,
            Wc: void 0,
            fillStyle: void 0,
            strokeStyle: void 0,
            lineCap: void 0,
            lineDash: null,
            lineJoin: void 0,
            lineWidth: void 0,
            miterLimit: void 0
        }
    }
    w(Bm, qm);

    function Cm(a, c, d, e, f) {
        var g = a.c,
            h = [1];
        a.a.push(h);
        a.b.push(h);
        var k, h = 0;
        for (k = e.length; h < k; ++h) {
            var n = e[h],
                p = a.coordinates.length;
            d = rm(a, c, d, n, f, !0);
            d = [8, p, d];
            p = [3];
            a.a.push(d, p);
            a.b.push(d, p);
            d = n
        }
        c = [7];
        a.b.push(c);
        m(g.fillStyle) && a.a.push(c);
        m(g.strokeStyle) && (g = [12], a.a.push(g), a.b.push(g));
        return d
    }
    l = Bm.prototype;
    l.uc = function(a, c) {
        var d = this.c,
            e = d.strokeStyle;
        if (m(d.fillStyle) || m(e)) {
            Dm(this);
            sm(this, c);
            this.b.push([9, vf(wl)]);
            m(d.strokeStyle) && this.b.push([10, d.strokeStyle, d.lineWidth, d.lineCap, d.lineJoin, d.miterLimit, d.lineDash]);
            var f = a.j,
                e = this.coordinates.length;
            rm(this, f, 0, f.length, a.s, !1);
            f = [1];
            e = [2, e];
            this.a.push(f, e);
            this.b.push(f, e);
            e = [7];
            this.b.push(e);
            m(d.fillStyle) && this.a.push(e);
            m(d.strokeStyle) && (d = [12], this.a.push(d), this.b.push(d));
            wm(this, c)
        }
    };
    l.Rb = function(a, c) {
        var d = this.c,
            e = d.strokeStyle;
        if (m(d.fillStyle) || m(e)) Dm(this), sm(this, c), this.b.push([9, vf(wl)]), m(d.strokeStyle) && this.b.push([10, d.strokeStyle, d.lineWidth, d.lineCap, d.lineJoin, d.miterLimit, d.lineDash]), d = a.c, e = el(a), Cm(this, e, 0, d, a.s), wm(this, c)
    };
    l.wc = function(a, c) {
        var d = this.c,
            e = d.strokeStyle;
        if (m(d.fillStyle) || m(e)) {
            Dm(this);
            sm(this, c);
            this.b.push([9, vf(wl)]);
            m(d.strokeStyle) && this.b.push([10, d.strokeStyle, d.lineWidth, d.lineCap, d.lineJoin, d.miterLimit, d.lineDash]);
            var d = a.c,
                e = mm(a),
                f = a.s,
                g = 0,
                h, k;
            h = 0;
            for (k = d.length; h < k; ++h) g = Cm(this, e, g, d[h], f);
            wm(this, c)
        }
    };
    l.de = function() {
        vm(this);
        this.c = null;
        var a = this.oa;
        if (0 !== a) {
            var c = this.coordinates,
                d, e;
            d = 0;
            for (e = c.length; d < e; ++d) c[d] = a * Math.round(c[d] / a)
        }
    };
    l.Pe = function() {
        null === this.d && (this.d = Pd(this.T), 0 < this.e && Od(this.d, this.resolution * (this.e + 1) / 2, this.d));
        return this.d
    };
    l.Aa = function(a, c) {
        var d = this.c;
        if (null === a) d.fillStyle = void 0;
        else {
            var e = a.b;
            d.fillStyle = vf(null === e ? wl : e)
        }
        null === c ? (d.strokeStyle = void 0, d.lineCap = void 0, d.lineDash = null, d.lineJoin = void 0, d.lineWidth = void 0, d.miterLimit = void 0) : (e = c.b, d.strokeStyle = vf(null === e ? yl : e), e = c.d, d.lineCap = m(e) ? e : "round", e = c.c, d.lineDash = null === e ? xl : e.slice(), e = c.e, d.lineJoin = m(e) ? e : "round", e = c.a, d.lineWidth = m(e) ? e : 1, e = c.f, d.miterLimit = m(e) ? e : 10, d.lineWidth > this.e && (this.e = d.lineWidth, this.d = null))
    };

    function Dm(a) {
        var c = a.c,
            d = c.fillStyle,
            e = c.strokeStyle,
            f = c.lineCap,
            g = c.lineDash,
            h = c.lineJoin,
            k = c.lineWidth,
            n = c.miterLimit;
        m(d) && c.Mf != d && (a.a.push([9, d]), c.Mf = c.fillStyle);
        !m(e) || c.Xc == e && c.Sc == f && c.Tc == g && c.Uc == h && c.Vc == k && c.Wc == n || (a.a.push([10, e, k, f, h, n, g]), c.Xc = e, c.Sc = f, c.Tc = g, c.Uc = h, c.Vc = k, c.Wc = n)
    }

    function Em(a, c, d) {
        qm.call(this, a, c, d);
        this.p = this.n = this.V = null;
        this.i = "";
        this.U = this.o = this.l = this.q = 0;
        this.g = this.f = this.c = null
    }
    w(Em, qm);
    Em.prototype.lb = function(a, c, d, e, f, g) {
        if ("" !== this.i && null !== this.g && (null !== this.c || null !== this.f)) {
            if (null !== this.c) {
                f = this.c;
                var h = this.V;
                if (null === h || h.fillStyle != f.fillStyle) {
                    var k = [9, f.fillStyle];
                    this.a.push(k);
                    this.b.push(k);
                    null === h ? this.V = {
                        fillStyle: f.fillStyle
                    } : h.fillStyle = f.fillStyle
                }
            }
            null !== this.f && (f = this.f, h = this.n, null === h || h.lineCap != f.lineCap || h.lineDash != f.lineDash || h.lineJoin != f.lineJoin || h.lineWidth != f.lineWidth || h.miterLimit != f.miterLimit || h.strokeStyle != f.strokeStyle) && (k = [10,
                f.strokeStyle, f.lineWidth, f.lineCap, f.lineJoin, f.miterLimit, f.lineDash, !1
            ], this.a.push(k), this.b.push(k), null === h ? this.n = {
                lineCap: f.lineCap,
                lineDash: f.lineDash,
                lineJoin: f.lineJoin,
                lineWidth: f.lineWidth,
                miterLimit: f.miterLimit,
                strokeStyle: f.strokeStyle
            } : (h.lineCap = f.lineCap, h.lineDash = f.lineDash, h.lineJoin = f.lineJoin, h.lineWidth = f.lineWidth, h.miterLimit = f.miterLimit, h.strokeStyle = f.strokeStyle));
            f = this.g;
            h = this.p;
            if (null === h || h.font != f.font || h.textAlign != f.textAlign || h.textBaseline != f.textBaseline) k = [11, f.font, f.textAlign, f.textBaseline], this.a.push(k), this.b.push(k), null === h ? this.p = {
                font: f.font,
                textAlign: f.textAlign,
                textBaseline: f.textBaseline
            } : (h.font = f.font, h.textAlign = f.textAlign, h.textBaseline = f.textBaseline);
            sm(this, g);
            f = this.coordinates.length;
            a = rm(this, a, c, d, e, !1);
            a = [5, f, a, this.i, this.q, this.l, this.o, this.U, null !== this.c, null !== this.f];
            this.a.push(a);
            this.b.push(a);
            wm(this, g)
        }
    };
    Em.prototype.Ba = function(a) {
        if (null === a) this.i = "";
        else {
            var c = a.b;
            null === c ? this.c = null : (c = c.b, c = vf(null === c ? wl : c), null === this.c ? this.c = {
                fillStyle: c
            } : this.c.fillStyle = c);
            var d = a.f;
            if (null === d) this.f = null;
            else {
                var c = d.b,
                    e = d.d,
                    f = d.c,
                    g = d.e,
                    h = d.a,
                    d = d.f,
                    e = m(e) ? e : "round",
                    f = null != f ? f.slice() : xl,
                    g = m(g) ? g : "round",
                    h = m(h) ? h : 1,
                    d = m(d) ? d : 10,
                    c = vf(null === c ? yl : c);
                if (null === this.f) this.f = {
                    lineCap: e,
                    lineDash: f,
                    lineJoin: g,
                    lineWidth: h,
                    miterLimit: d,
                    strokeStyle: c
                };
                else {
                    var k = this.f;
                    k.lineCap = e;
                    k.lineDash = f;
                    k.lineJoin = g;
                    k.lineWidth = h;
                    k.miterLimit = d;
                    k.strokeStyle = c
                }
            }
            var n = a.d,
                c = a.q,
                e = a.l,
                f = a.e,
                h = a.a,
                d = a.c,
                g = a.g,
                k = a.i;
            a = m(n) ? n : "10px sans-serif";
            g = m(g) ? g : "center";
            k = m(k) ? k : "middle";
            null === this.g ? this.g = {
                font: a,
                textAlign: g,
                textBaseline: k
            } : (n = this.g, n.font = a, n.textAlign = g, n.textBaseline = k);
            this.i = m(d) ? d : "";
            this.q = m(c) ? c : 0;
            this.l = m(e) ? e : 0;
            this.o = m(f) ? f : 0;
            this.U = m(h) ? h : 1
        }
    };

    function Fm(a, c, d, e) {
        this.q = a;
        this.d = c;
        this.i = d;
        this.e = e;
        this.a = {};
        this.f = ai(1, 1);
        this.g = zd()
    }

    function Gm(a) {
        for (var c in a.a) {
            var d = a.a[c],
                e;
            for (e in d) d[e].de()
        }
    }
    Fm.prototype.c = function(a, c, d, e, f) {
        var g = this.g;
        qj(g, .5, .5, 1 / c, -1 / c, -d, -a[0], -a[1]);
        var h = this.f;
        h.clearRect(0, 0, 1, 1);
        var k;
        m(this.e) && (k = Kd(), Ld(k, a), Od(k, c * this.e, k));
        return Hm(this, h, g, d, e, function(a) {
            if (0 < h.getImageData(0, 0, 1, 1).data[3]) {
                if (a = f(a)) return a;
                h.clearRect(0, 0, 1, 1)
            }
        }, k)
    };
    Fm.prototype.b = function(a, c) {
        var d = m(a) ? a.toString() : "0",
            e = this.a[d];
        m(e) || (e = {}, this.a[d] = e);
        d = e[c];
        m(d) || (d = new Im[c](this.q, this.d, this.i), e[c] = d);
        return d
    };
    Fm.prototype.la = function() {
        return xb(this.a)
    };

    function Jm(a, c, d, e, f, g) {
        var h = Ua(tb(a.a), Number);
        gb(h);
        var k = a.d,
            n = k[0],
            p = k[1],
            q = k[2],
            k = k[3],
            n = [n, p, n, k, q, k, q, p];
        vk(n, 0, 8, 2, e, n);
        c.save();
        c.beginPath();
        c.moveTo(n[0], n[1]);
        c.lineTo(n[2], n[3]);
        c.lineTo(n[4], n[5]);
        c.lineTo(n[6], n[7]);
        c.closePath();
        c.clip();
        for (var r, t, n = 0, p = h.length; n < p; ++n)
            for (r = a.a[h[n].toString()], q = 0, k = pm.length; q < k; ++q) t = r[pm[q]], m(t) && tm(t, c, d, e, f, g, t.a, void 0);
        c.restore()
    }

    function Hm(a, c, d, e, f, g, h) {
        var k = Ua(tb(a.a), Number);
        gb(k, function(a, c) {
            return c - a
        });
        var n, p, q, r, t;
        n = 0;
        for (p = k.length; n < p; ++n)
            for (r = a.a[k[n].toString()], q = pm.length - 1; 0 <= q; --q)
                if (t = r[pm[q]], m(t) && (t = tm(t, c, 1, d, e, f, t.b, g, h))) return t
    }
    var Im = {
        Image: xm,
        LineString: ym,
        Polygon: Bm,
        Text: Em
    };

    function Km(a) {
        uj.call(this, a);
        this.J = zd()
    }
    w(Km, uj);
    Km.prototype.o = function(a, c, d) {
        Lm(this, "precompose", d, a, void 0);
        var e = this.fe();
        if (null !== e) {
            var f = c.extent,
                g = m(f);
            if (g) {
                var h = a.pixelRatio,
                    k = be(f),
                    n = ae(f),
                    p = $d(f),
                    f = Zd(f);
                sj(a.coordinateToPixelMatrix, k, k);
                sj(a.coordinateToPixelMatrix, n, n);
                sj(a.coordinateToPixelMatrix, p, p);
                sj(a.coordinateToPixelMatrix, f, f);
                d.save();
                d.beginPath();
                d.moveTo(k[0] * h, k[1] * h);
                d.lineTo(n[0] * h, n[1] * h);
                d.lineTo(p[0] * h, p[1] * h);
                d.lineTo(f[0] * h, f[1] * h);
                d.clip()
            }
            h = this.Xf();
            k = d.globalAlpha;
            d.globalAlpha = c.opacity;
            0 === a.viewState.rotation ? (c = h[13], n = e.width * h[0], p = e.height * h[5], d.drawImage(e, 0, 0, +e.width, +e.height, Math.round(h[12]), Math.round(c), Math.round(n), Math.round(p))) : (d.setTransform(h[0], h[1], h[4], h[5], h[12], h[13]), d.drawImage(e, 0, 0), d.setTransform(1, 0, 0, 1, 0, 0));
            d.globalAlpha = k;
            g && d.restore()
        }
        Lm(this, "postcompose", d, a, void 0)
    };

    function Lm(a, c, d, e, f) {
        var g = a.a;
        bd(g, c) && (a = m(f) ? f : Mm(a, e, 0), a = new cm(d, e.pixelRatio, e.extent, a, e.viewState.rotation), g.dispatchEvent(new il(c, g, a, null, e, d, null)), om(a))
    }

    function Mm(a, c, d) {
        var e = c.viewState,
            f = c.pixelRatio;
        return qj(a.J, f * c.size[0] / 2, f * c.size[1] / 2, f / e.resolution, -f / e.resolution, -e.rotation, -e.center[0] + d, -e.center[1])
    }

    function Nm(a, c) {
        var d = [0, 0];
        sj(c, a, d);
        return d
    }
    var Om = function() {
        var a = null,
            c = null;
        return function(d) {
            if (null === a) {
                a = ai(1, 1);
                c = a.createImageData(1, 1);
                var e = c.data;
                e[0] = 42;
                e[1] = 84;
                e[2] = 126;
                e[3] = 255
            }
            var e = a.canvas,
                f = d[0] <= e.width && d[1] <= e.height;
            f || (e.width = d[0], e.height = d[1], e = d[0] - 1, d = d[1] - 1, a.putImageData(c, e, d), d = a.getImageData(e, d, 1, 1), f = ib(c.data, d.data));
            return f
        }
    }();

    function Pm(a, c, d) {
        wk.call(this);
        this.uh(a, m(c) ? c : 0, d)
    }
    w(Pm, wk);
    l = Pm.prototype;
    l.clone = function() {
        var a = new Pm(null);
        yk(a, this.a, this.j.slice());
        a.k();
        return a
    };
    l.Sa = function(a, c, d, e) {
        var f = this.j;
        a -= f[0];
        var g = c - f[1];
        c = a * a + g * g;
        if (c < e) {
            if (0 === c)
                for (e = 0; e < this.s; ++e) d[e] = f[e];
            else
                for (e = this.zg() / Math.sqrt(c), d[0] = f[0] + e * a, d[1] = f[1] + e * g, e = 2; e < this.s; ++e) d[e] = f[e];
            d.length = this.s;
            return c
        }
        return e
    };
    l.Jb = function(a, c) {
        var d = this.j,
            e = a - d[0],
            d = c - d[1];
        return e * e + d * d <= Qm(this)
    };
    l.dd = function() {
        return this.j.slice(0, this.s)
    };
    l.wd = function(a) {
        var c = this.j,
            d = c[this.s] - c[0];
        return Nd(c[0] - d, c[1] - d, c[0] + d, c[1] + d, a)
    };
    l.zg = function() {
        return Math.sqrt(Qm(this))
    };

    function Qm(a) {
        var c = a.j[a.s] - a.j[0];
        a = a.j[a.s + 1] - a.j[1];
        return c * c + a * a
    }
    l.M = function() {
        return "Circle"
    };
    l.pl = function(a) {
        var c = this.s,
            d = a.slice();
        d[c] = d[0] + (this.j[c] - this.j[0]);
        var e;
        for (e = 1; e < c; ++e) d[c + e] = a[e];
        yk(this, this.a, d);
        this.k()
    };
    l.uh = function(a, c, d) {
        if (null === a) yk(this, "XY", null);
        else {
            zk(this, d, a, 0);
            null === this.j && (this.j = []);
            d = this.j;
            a = Jk(d, a);
            d[a++] = d[0] + c;
            var e;
            c = 1;
            for (e = this.s; c < e; ++c) d[a++] = d[c];
            d.length = a
        }
        this.k()
    };
    l.Ag = function(a) {
        this.j[this.s] = this.j[0] + a;
        this.k()
    };

    function Rm(a) {
        uk.call(this);
        this.d = m(a) ? a : null;
        Sm(this)
    }
    w(Rm, uk);

    function Tm(a) {
        var c = [],
            d, e;
        d = 0;
        for (e = a.length; d < e; ++d) c.push(a[d].clone());
        return c
    }

    function Um(a) {
        var c, d;
        if (null !== a.d)
            for (c = 0, d = a.d.length; c < d; ++c) Vc(a.d[c], "change", a.k, !1, a)
    }

    function Sm(a) {
        var c, d;
        if (null !== a.d)
            for (c = 0, d = a.d.length; c < d; ++c) x(a.d[c], "change", a.k, !1, a)
    }
    l = Rm.prototype;
    l.clone = function() {
        var a = new Rm(null);
        a.xh(this.d);
        return a
    };
    l.Sa = function(a, c, d, e) {
        if (e < Qd(this.G(), a, c)) return e;
        var f = this.d,
            g, h;
        g = 0;
        for (h = f.length; g < h; ++g) e = f[g].Sa(a, c, d, e);
        return e
    };
    l.Jb = function(a, c) {
        var d = this.d,
            e, f;
        e = 0;
        for (f = d.length; e < f; ++e)
            if (d[e].Jb(a, c)) return !0;
        return !1
    };
    l.wd = function(a) {
        Nd(Infinity, Infinity, -Infinity, -Infinity, a);
        for (var c = this.d, d = 0, e = c.length; d < e; ++d) Wd(a, c[d].G());
        return a
    };
    l.Vf = function() {
        return Tm(this.d)
    };
    l.Ve = function(a) {
        this.l != this.b && (yb(this.f), this.g = 0, this.l = this.b);
        if (0 > a || 0 !== this.g && a < this.g) return this;
        var c = a.toString();
        if (this.f.hasOwnProperty(c)) return this.f[c];
        var d = [],
            e = this.d,
            f = !1,
            g, h;
        g = 0;
        for (h = e.length; g < h; ++g) {
            var k = e[g],
                n = k.Ve(a);
            d.push(n);
            n !== k && (f = !0)
        }
        if (f) return a = new Rm(null), Um(a), a.d = d, Sm(a), a.k(), this.f[c] = a;
        this.g = a;
        return this
    };
    l.M = function() {
        return "GeometryCollection"
    };
    l.ra = function(a) {
        var c = this.d,
            d, e;
        d = 0;
        for (e = c.length; d < e; ++d)
            if (c[d].ra(a)) return !0;
        return !1
    };
    l.la = function() {
        return 0 == this.d.length
    };
    l.xh = function(a) {
        a = Tm(a);
        Um(this);
        this.d = a;
        Sm(this);
        this.k()
    };
    l.qa = function(a) {
        var c = this.d,
            d, e;
        d = 0;
        for (e = c.length; d < e; ++d) c[d].qa(a);
        this.k()
    };
    l.Oa = function(a, c) {
        var d = this.d,
            e, f;
        e = 0;
        for (f = d.length; e < f; ++e) d[e].Oa(a, c);
        this.k()
    };
    l.O = function() {
        Um(this);
        Rm.S.O.call(this)
    };

    function Vm(a, c, d, e, f) {
        var g = NaN,
            h = NaN,
            k = (d - c) / e;
        if (0 !== k)
            if (1 == k) g = a[c], h = a[c + 1];
            else if (2 == k) g = .5 * a[c] + .5 * a[c + e], h = .5 * a[c + 1] + .5 * a[c + e + 1];
        else {
            var h = a[c],
                k = a[c + 1],
                n = 0,
                g = [0],
                p;
            for (p = c + e; p < d; p += e) {
                var q = a[p],
                    r = a[p + 1],
                    n = n + Math.sqrt((q - h) * (q - h) + (r - k) * (r - k));
                g.push(n);
                h = q;
                k = r
            }
            d = .5 * n;
            for (var t, h = hb, k = 0, n = g.length; k < n;) p = k + n >> 1, q = h(d, g[p]), 0 < q ? k = p + 1 : (n = p, t = !q);
            t = t ? k : ~k;
            0 > t ? (d = (d - g[-t - 2]) / (g[-t - 1] - g[-t - 2]), c += (-t - 2) * e, g = Xb(a[c], a[c + e], d), h = Xb(a[c + 1], a[c + e + 1], d)) : (g = a[c + t * e], h = a[c + t * e + 1])
        }
        return null != f ? (f[0] = g, f[1] = h, f) : [g, h]
    }

    function Wm(a, c, d, e, f, g) {
        if (d == c) return null;
        if (f < a[c + e - 1]) return g ? (d = a.slice(c, c + e), d[e - 1] = f, d) : null;
        if (a[d - 1] < f) return g ? (d = a.slice(d - e, d), d[e - 1] = f, d) : null;
        if (f == a[c + e - 1]) return a.slice(c, c + e);
        c /= e;
        for (d /= e; c < d;) g = c + d >> 1, f < a[(g + 1) * e - 1] ? d = g : c = g + 1;
        d = a[c * e - 1];
        if (f == d) return a.slice((c - 1) * e, (c - 1) * e + e);
        g = (f - d) / (a[(c + 1) * e - 1] - d);
        d = [];
        var h;
        for (h = 0; h < e - 1; ++h) d.push(Xb(a[(c - 1) * e + h], a[c * e + h], g));
        d.push(f);
        return d
    }

    function Xm(a, c, d, e, f, g) {
        var h = 0;
        if (g) return Wm(a, h, c[c.length - 1], d, e, f);
        if (e < a[d - 1]) return f ? (a = a.slice(0, d), a[d - 1] = e, a) : null;
        if (a[a.length - 1] < e) return f ? (a = a.slice(a.length - d), a[d - 1] = e, a) : null;
        f = 0;
        for (g = c.length; f < g; ++f) {
            var k = c[f];
            if (h != k) {
                if (e < a[h + d - 1]) break;
                if (e <= a[k - 1]) return Wm(a, h, k, d, e, !1);
                h = k
            }
        }
        return null
    };

    function O(a, c) {
        wk.call(this);
        this.c = null;
        this.p = this.H = this.i = -1;
        this.W(a, c)
    }
    w(O, wk);
    l = O.prototype;
    l.ui = function(a) {
        null === this.j ? this.j = a.slice() : db(this.j, a);
        this.k()
    };
    l.clone = function() {
        var a = new O(null);
        Ym(a, this.a, this.j.slice());
        return a
    };
    l.Sa = function(a, c, d, e) {
        if (e < Qd(this.G(), a, c)) return e;
        this.p != this.b && (this.H = Math.sqrt(Fk(this.j, 0, this.j.length, this.s, 0)), this.p = this.b);
        return Hk(this.j, 0, this.j.length, this.s, this.H, !1, a, c, d, e)
    };
    l.Ji = function(a, c) {
        return Xk(this.j, 0, this.j.length, this.s, a, c)
    };
    l.ql = function(a, c) {
        return "XYM" != this.a && "XYZM" != this.a ? null : Wm(this.j, 0, this.j.length, this.s, a, m(c) ? c : !1)
    };
    l.K = function() {
        return Mk(this.j, 0, this.j.length, this.s)
    };
    l.Bg = function() {
        var a = this.j,
            c = this.s,
            d = a[0],
            e = a[1],
            f = 0,
            g;
        for (g = 0 + c; g < this.j.length; g += c) var h = a[g],
            k = a[g + 1],
            f = f + Math.sqrt((h - d) * (h - d) + (k - e) * (k - e)),
            d = h,
            e = k;
        return f
    };

    function km(a) {
        a.i != a.b && (a.c = Vm(a.j, 0, a.j.length, a.s, a.c), a.i = a.b);
        return a.c
    }
    l.xc = function(a) {
        var c = [];
        c.length = Ok(this.j, 0, this.j.length, this.s, a, c, 0);
        a = new O(null);
        Ym(a, "XY", c);
        return a
    };
    l.M = function() {
        return "LineString"
    };
    l.ra = function(a) {
        return Yk(this.j, 0, this.j.length, this.s, a)
    };
    l.W = function(a, c) {
        null === a ? Ym(this, "XY", null) : (zk(this, c, a, 1), null === this.j && (this.j = []), this.j.length = Kk(this.j, 0, a, this.s), this.k())
    };

    function Ym(a, c, d) {
        yk(a, c, d);
        a.k()
    };

    function Q(a, c) {
        wk.call(this);
        this.c = [];
        this.i = this.p = -1;
        this.W(a, c)
    }
    w(Q, wk);
    l = Q.prototype;
    l.vi = function(a) {
        null === this.j ? this.j = a.j.slice() : db(this.j, a.j.slice());
        this.c.push(this.j.length);
        this.k()
    };
    l.clone = function() {
        var a = new Q(null);
        Zm(a, this.a, this.j.slice(), this.c.slice());
        return a
    };
    l.Sa = function(a, c, d, e) {
        if (e < Qd(this.G(), a, c)) return e;
        this.i != this.b && (this.p = Math.sqrt(Gk(this.j, 0, this.c, this.s, 0)), this.i = this.b);
        return Ik(this.j, 0, this.c, this.s, this.p, !1, a, c, d, e)
    };
    l.sl = function(a, c, d) {
        return "XYM" != this.a && "XYZM" != this.a || 0 === this.j.length ? null : Xm(this.j, this.c, this.s, a, m(c) ? c : !1, m(d) ? d : !1)
    };
    l.K = function() {
        return Nk(this.j, 0, this.c, this.s)
    };
    l.gj = function(a) {
        if (0 > a || this.c.length <= a) return null;
        var c = new O(null);
        Ym(c, this.a, this.j.slice(0 === a ? 0 : this.c[a - 1], this.c[a]));
        return c
    };
    l.ad = function() {
        var a = this.j,
            c = this.c,
            d = this.a,
            e = [],
            f = 0,
            g, h;
        g = 0;
        for (h = c.length; g < h; ++g) {
            var k = c[g],
                n = new O(null);
            Ym(n, d, a.slice(f, k));
            e.push(n);
            f = k
        }
        return e
    };

    function lm(a) {
        var c = [],
            d = a.j,
            e = 0,
            f = a.c;
        a = a.s;
        var g, h;
        g = 0;
        for (h = f.length; g < h; ++g) {
            var k = f[g],
                e = Vm(d, e, k, a);
            db(c, e);
            e = k
        }
        return c
    }
    l.xc = function(a) {
        var c = [],
            d = [],
            e = this.j,
            f = this.c,
            g = this.s,
            h = 0,
            k = 0,
            n, p;
        n = 0;
        for (p = f.length; n < p; ++n) {
            var q = f[n],
                k = Ok(e, h, q, g, a, c, k);
            d.push(k);
            h = q
        }
        c.length = k;
        a = new Q(null);
        Zm(a, "XY", c, d);
        return a
    };
    l.M = function() {
        return "MultiLineString"
    };
    l.ra = function(a) {
        a: {
            var c = this.j,
                d = this.c,
                e = this.s,
                f = 0,
                g, h;g = 0;
            for (h = d.length; g < h; ++g) {
                if (Yk(c, f, d[g], e, a)) {
                    a = !0;
                    break a
                }
                f = d[g]
            }
            a = !1
        }
        return a
    };
    l.W = function(a, c) {
        if (null === a) Zm(this, "XY", null, this.c);
        else {
            zk(this, c, a, 2);
            null === this.j && (this.j = []);
            var d = Lk(this.j, 0, a, this.s, this.c);
            this.j.length = 0 === d.length ? 0 : d[d.length - 1];
            this.k()
        }
    };

    function Zm(a, c, d, e) {
        yk(a, c, d);
        a.c = e;
        a.k()
    }

    function $m(a, c) {
        var d = "XY",
            e = [],
            f = [],
            g, h;
        g = 0;
        for (h = c.length; g < h; ++g) {
            var k = c[g];
            0 === g && (d = k.a);
            db(e, k.j);
            f.push(e.length)
        }
        Zm(a, d, e, f)
    };

    function an(a, c) {
        wk.call(this);
        this.W(a, c)
    }
    w(an, wk);
    l = an.prototype;
    l.xi = function(a) {
        null === this.j ? this.j = a.j.slice() : db(this.j, a.j);
        this.k()
    };
    l.clone = function() {
        var a = new an(null);
        yk(a, this.a, this.j.slice());
        a.k();
        return a
    };
    l.Sa = function(a, c, d, e) {
        if (e < Qd(this.G(), a, c)) return e;
        var f = this.j,
            g = this.s,
            h, k, n;
        h = 0;
        for (k = f.length; h < k; h += g)
            if (n = Dk(a, c, f[h], f[h + 1]), n < e) {
                e = n;
                for (n = 0; n < g; ++n) d[n] = f[h + n];
                d.length = g
            }
        return e
    };
    l.K = function() {
        return Mk(this.j, 0, this.j.length, this.s)
    };
    l.qj = function(a) {
        var c = null === this.j ? 0 : this.j.length / this.s;
        if (0 > a || c <= a) return null;
        c = new E(null);
        Sk(c, this.a, this.j.slice(a * this.s, (a + 1) * this.s));
        return c
    };
    l.ce = function() {
        var a = this.j,
            c = this.a,
            d = this.s,
            e = [],
            f, g;
        f = 0;
        for (g = a.length; f < g; f += d) {
            var h = new E(null);
            Sk(h, c, a.slice(f, f + d));
            e.push(h)
        }
        return e
    };
    l.M = function() {
        return "MultiPoint"
    };
    l.ra = function(a) {
        var c = this.j,
            d = this.s,
            e, f, g, h;
        e = 0;
        for (f = c.length; e < f; e += d)
            if (g = c[e], h = c[e + 1], Sd(a, g, h)) return !0;
        return !1
    };
    l.W = function(a, c) {
        null === a ? yk(this, "XY", null) : (zk(this, c, a, 1), null === this.j && (this.j = []), this.j.length = Kk(this.j, 0, a, this.s));
        this.k()
    };

    function R(a, c) {
        wk.call(this);
        this.c = [];
        this.p = -1;
        this.H = null;
        this.N = this.J = this.L = -1;
        this.i = null;
        this.W(a, c)
    }
    w(R, wk);
    l = R.prototype;
    l.yi = function(a) {
        if (null === this.j) this.j = a.j.slice(), a = a.c.slice(), this.c.push();
        else {
            var c = this.j.length;
            db(this.j, a.j);
            a = a.c.slice();
            var d, e;
            d = 0;
            for (e = a.length; d < e; ++d) a[d] += c
        }
        this.c.push(a);
        this.k()
    };
    l.clone = function() {
        var a = new R(null);
        bn(a, this.a, this.j.slice(), this.c.slice());
        return a
    };
    l.Sa = function(a, c, d, e) {
        if (e < Qd(this.G(), a, c)) return e;
        if (this.J != this.b) {
            var f = this.c,
                g = 0,
                h = 0,
                k, n;
            k = 0;
            for (n = f.length; k < n; ++k) var p = f[k],
                h = Gk(this.j, g, p, this.s, h),
                g = p[p.length - 1];
            this.L = Math.sqrt(h);
            this.J = this.b
        }
        f = mm(this);
        g = this.c;
        h = this.s;
        k = this.L;
        n = 0;
        var p = m(void 0) ? void 0 : [NaN, NaN],
            q, r;
        q = 0;
        for (r = g.length; q < r; ++q) {
            var t = g[q];
            e = Ik(f, n, t, h, k, !0, a, c, d, e, p);
            n = t[t.length - 1]
        }
        return e
    };
    l.Jb = function(a, c) {
        var d;
        a: {
            d = mm(this);
            var e = this.c,
                f = 0;
            if (0 !== e.length) {
                var g, h;
                g = 0;
                for (h = e.length; g < h; ++g) {
                    var k = e[g];
                    if (Vk(d, f, k, this.s, a, c)) {
                        d = !0;
                        break a
                    }
                    f = k[k.length - 1]
                }
            }
            d = !1
        }
        return d
    };
    l.tl = function() {
        var a = mm(this),
            c = this.c,
            d = 0,
            e = 0,
            f, g;
        f = 0;
        for (g = c.length; f < g; ++f) var h = c[f],
            e = e + Bk(a, d, h, this.s),
            d = h[h.length - 1];
        return e
    };
    l.K = function(a) {
        var c;
        m(a) ? (c = mm(this).slice(), cl(c, this.c, this.s, a)) : c = this.j;
        a = c;
        c = this.c;
        var d = this.s,
            e = 0,
            f = m(void 0) ? void 0 : [],
            g = 0,
            h, k;
        h = 0;
        for (k = c.length; h < k; ++h) {
            var n = c[h];
            f[g++] = Nk(a, e, n, d, f[g]);
            e = n[n.length - 1]
        }
        f.length = g;
        return f
    };

    function nm(a) {
        if (a.p != a.b) {
            var c = a.j,
                d = a.c,
                e = a.s,
                f = 0,
                g = [],
                h, k, n = Kd();
            h = 0;
            for (k = d.length; h < k; ++h) {
                var p = d[h],
                    n = Xd(Nd(Infinity, Infinity, -Infinity, -Infinity, void 0), c, f, p[0], e);
                g.push((n[0] + n[2]) / 2, (n[1] + n[3]) / 2);
                f = p[p.length - 1]
            }
            c = mm(a);
            d = a.c;
            e = a.s;
            f = 0;
            h = [];
            k = 0;
            for (n = d.length; k < n; ++k) p = d[k], h = Wk(c, f, p, e, g, 2 * k, h), f = p[p.length - 1];
            a.H = h;
            a.p = a.b
        }
        return a.H
    }
    l.dj = function() {
        var a = new an(null),
            c = nm(this).slice();
        yk(a, "XY", c);
        a.k();
        return a
    };

    function mm(a) {
        if (a.N != a.b) {
            var c = a.j,
                d;
            a: {
                d = a.c;
                var e, f;e = 0;
                for (f = d.length; e < f; ++e)
                    if (!al(c, d[e], a.s, void 0)) {
                        d = !1;
                        break a
                    }
                d = !0
            }
            d ? a.i = c : (a.i = c.slice(), a.i.length = cl(a.i, a.c, a.s));
            a.N = a.b
        }
        return a.i
    }
    l.xc = function(a) {
        var c = [],
            d = [],
            e = this.j,
            f = this.c,
            g = this.s;
        a = Math.sqrt(a);
        var h = 0,
            k = 0,
            n, p;
        n = 0;
        for (p = f.length; n < p; ++n) {
            var q = f[n],
                r = [],
                k = Pk(e, h, q, g, a, c, k, r);
            d.push(r);
            h = q[q.length - 1]
        }
        c.length = k;
        e = new R(null);
        bn(e, "XY", c, d);
        return e
    };
    l.sj = function(a) {
        if (0 > a || this.c.length <= a) return null;
        var c;
        0 === a ? c = 0 : (c = this.c[a - 1], c = c[c.length - 1]);
        a = this.c[a].slice();
        var d = a[a.length - 1];
        if (0 !== c) {
            var e, f;
            e = 0;
            for (f = a.length; e < f; ++e) a[e] -= c
        }
        e = new F(null);
        dl(e, this.a, this.j.slice(c, d), a);
        return e
    };
    l.Id = function() {
        var a = this.a,
            c = this.j,
            d = this.c,
            e = [],
            f = 0,
            g, h, k, n;
        g = 0;
        for (h = d.length; g < h; ++g) {
            var p = d[g].slice(),
                q = p[p.length - 1];
            if (0 !== f)
                for (k = 0, n = p.length; k < n; ++k) p[k] -= f;
            k = new F(null);
            dl(k, a, c.slice(f, q), p);
            e.push(k);
            f = q
        }
        return e
    };
    l.M = function() {
        return "MultiPolygon"
    };
    l.ra = function(a) {
        a: {
            var c = mm(this),
                d = this.c,
                e = this.s,
                f = 0,
                g, h;g = 0;
            for (h = d.length; g < h; ++g) {
                var k = d[g];
                if (Zk(c, f, k, e, a)) {
                    a = !0;
                    break a
                }
                f = k[k.length - 1]
            }
            a = !1
        }
        return a
    };
    l.W = function(a, c) {
        if (null === a) bn(this, "XY", null, this.c);
        else {
            zk(this, c, a, 3);
            null === this.j && (this.j = []);
            var d = this.j,
                e = this.s,
                f = this.c,
                g = 0,
                f = m(f) ? f : [],
                h = 0,
                k, n;
            k = 0;
            for (n = a.length; k < n; ++k) g = Lk(d, g, a[k], e, f[h]), f[h++] = g, g = g[g.length - 1];
            f.length = h;
            0 === f.length ? this.j.length = 0 : (d = f[f.length - 1], this.j.length = 0 === d.length ? 0 : d[d.length - 1]);
            this.k()
        }
    };

    function bn(a, c, d, e) {
        yk(a, c, d);
        a.c = e;
        a.k()
    }

    function cn(a, c) {
        var d = "XY",
            e = [],
            f = [],
            g, h, k;
        g = 0;
        for (h = c.length; g < h; ++g) {
            var n = c[g];
            0 === g && (d = n.a);
            var p = e.length;
            k = n.c;
            var q, r;
            q = 0;
            for (r = k.length; q < r; ++q) k[q] += p;
            db(e, n.j);
            f.push(k)
        }
        bn(a, d, e, f)
    };

    function dn(a, c) {
        return ma(a) - ma(c)
    }

    function en(a, c) {
        var d = .5 * a / c;
        return d * d
    }

    function fn(a, c, d, e, f, g) {
        var h = !1,
            k, n;
        k = d.f;
        null !== k && (n = k.gd(), 2 == n || 3 == n ? k.xf(f, g) : (0 == n && k.load(), k.$e(f, g), h = !0));
        f = (0, d.d)(c);
        null != f && (e = f.Ve(e), (0, gn[e.M()])(a, e, d, c));
        return h
    }
    var gn = {
        Point: function(a, c, d, e) {
            var f = d.f;
            if (null !== f) {
                if (2 != f.gd()) return;
                var g = a.b(d.b, "Image");
                g.Za(f);
                g.kb(c, e)
            }
            f = d.a;
            null !== f && (a = a.b(d.b, "Text"), a.Ba(f), a.lb(c.K(), 0, 2, 2, c, e))
        },
        LineString: function(a, c, d, e) {
            var f = d.c;
            if (null !== f) {
                var g = a.b(d.b, "LineString");
                g.Aa(null, f);
                g.zb(c, e)
            }
            f = d.a;
            null !== f && (a = a.b(d.b, "Text"), a.Ba(f), a.lb(km(c), 0, 2, 2, c, e))
        },
        Polygon: function(a, c, d, e) {
            var f = d.e,
                g = d.c;
            if (null !== f || null !== g) {
                var h = a.b(d.b, "Polygon");
                h.Aa(f, g);
                h.Rb(c, e)
            }
            f = d.a;
            null !== f && (a = a.b(d.b, "Text"), a.Ba(f), a.lb(fl(c), 0, 2, 2, c, e))
        },
        MultiPoint: function(a, c, d, e) {
            var f = d.f;
            if (null !== f) {
                if (2 != f.gd()) return;
                var g = a.b(d.b, "Image");
                g.Za(f);
                g.jb(c, e)
            }
            f = d.a;
            null !== f && (a = a.b(d.b, "Text"), a.Ba(f), d = c.j, a.lb(d, 0, d.length, c.s, c, e))
        },
        MultiLineString: function(a, c, d, e) {
            var f = d.c;
            if (null !== f) {
                var g = a.b(d.b, "LineString");
                g.Aa(null, f);
                g.vc(c, e)
            }
            f = d.a;
            null !== f && (a = a.b(d.b, "Text"), a.Ba(f), d = lm(c), a.lb(d, 0, d.length, 2, c, e))
        },
        MultiPolygon: function(a, c, d, e) {
            var f = d.e,
                g = d.c;
            if (null !== g || null !== f) {
                var h = a.b(d.b, "Polygon");
                h.Aa(f, g);
                h.wc(c, e)
            }
            f = d.a;
            null !== f && (a = a.b(d.b, "Text"), a.Ba(f), d = nm(c), a.lb(d, 0, d.length, 2, c, e))
        },
        GeometryCollection: function(a, c, d, e) {
            c = c.d;
            var f, g;
            f = 0;
            for (g = c.length; f < g; ++f)(0, gn[c[f].M()])(a, c[f], d, e)
        },
        Circle: function(a, c, d, e) {
            var f = d.e,
                g = d.c;
            if (null !== f || null !== g) {
                var h = a.b(d.b, "Polygon");
                h.Aa(f, g);
                h.uc(c, e)
            }
            f = d.a;
            null !== f && (a = a.b(d.b, "Text"), a.Ba(f), a.lb(c.dd(), 0, 2, 2, c, e))
        }
    };

    function hn(a, c, d, e, f) {
        pj.call(this, a, c, d, 2, e);
        this.a = f
    }
    w(hn, pj);
    hn.prototype.b = function() {
        return this.a
    };

    function jn(a) {
        Bg.call(this, {
            attributions: a.attributions,
            extent: a.extent,
            logo: a.logo,
            projection: a.projection,
            state: a.state
        });
        this.l = m(a.resolutions) ? a.resolutions : null
    }
    w(jn, Bg);

    function kn(a, c) {
        if (null !== a.l) {
            var d = ac(a.l, c, 0);
            c = a.l[d]
        }
        return c
    }
    jn.prototype.i = function(a) {
        a = a.target;
        switch (a.state) {
            case 1:
                this.dispatchEvent(new ln(mn, a));
                break;
            case 2:
                this.dispatchEvent(new ln(nn, a));
                break;
            case 3:
                this.dispatchEvent(new ln(on, a))
        }
    };

    function pn(a, c) {
        a.b().src = c
    }

    function ln(a, c) {
        rc.call(this, a);
        this.image = c
    }
    w(ln, rc);
    var mn = "imageloadstart",
        nn = "imageloadend",
        on = "imageloaderror";

    function qn(a) {
        jn.call(this, {
            attributions: a.attributions,
            logo: a.logo,
            projection: a.projection,
            resolutions: a.resolutions,
            state: m(a.state) ? a.state : void 0
        });
        this.T = a.canvasFunction;
        this.J = null;
        this.N = 0;
        this.X = m(a.ratio) ? a.ratio : 1.5
    }
    w(qn, jn);
    qn.prototype.Cc = function(a, c, d, e) {
        c = kn(this, c);
        var f = this.J;
        if (null !== f && this.N == this.b && f.resolution == c && f.e == d && Rd(f.G(), a)) return f;
        a = a.slice();
        ke(a, this.X);
        e = this.T(a, c, d, [ie(a) / c * d, fe(a) / c * d], e);
        null === e || (f = new hn(a, c, d, this.d, e));
        this.J = f;
        this.N = this.b;
        return f
    };

    function rn(a) {
        a.prototype.then = a.prototype.then;
        a.prototype.$goog_Thenable = !0
    }

    function sn(a) {
        if (!a) return !1;
        try {
            return !!a.$goog_Thenable
        } catch (c) {
            return !1
        }
    };

    function tn(a, c) {
        un || vn();
        wn || (un(), wn = !0);
        xn.push(new yn(a, c))
    }
    var un;

    function vn() {
        if (ba.Promise && ba.Promise.resolve) {
            var a = ba.Promise.resolve();
            un = function() {
                a.then(zn)
            }
        } else un = function() {
            wh(zn)
        }
    }
    var wn = !1,
        xn = [];

    function zn() {
        for (; xn.length;) {
            var a = xn;
            xn = [];
            for (var c = 0; c < a.length; c++) {
                var d = a[c];
                try {
                    d.b.call(d.a)
                } catch (e) {
                    vh(e)
                }
            }
        }
        wn = !1
    }

    function yn(a, c) {
        this.b = a;
        this.a = c
    };

    function An(a, c) {
        this.a = Bn;
        this.f = void 0;
        this.b = this.c = null;
        this.d = this.e = !1;
        try {
            var d = this;
            a.call(c, function(a) {
                Cn(d, Dn, a)
            }, function(a) {
                Cn(d, En, a)
            })
        } catch (e) {
            Cn(this, En, e)
        }
    }
    var Bn = 0,
        Dn = 2,
        En = 3;
    An.prototype.then = function(a, c, d) {
        return Fn(this, ka(a) ? a : null, ka(c) ? c : null, d)
    };
    rn(An);
    An.prototype.cancel = function(a) {
        this.a == Bn && tn(function() {
            var c = new Gn(a);
            Hn(this, c)
        }, this)
    };

    function Hn(a, c) {
        if (a.a == Bn)
            if (a.c) {
                var d = a.c;
                if (d.b) {
                    for (var e = 0, f = -1, g = 0, h; h = d.b[g]; g++)
                        if (h = h.Rc)
                            if (e++, h == a && (f = g), 0 <= f && 1 < e) break;
                    0 <= f && (d.a == Bn && 1 == e ? Hn(d, c) : (e = d.b.splice(f, 1)[0], In(d, e, En, c)))
                }
            } else Cn(a, En, c)
    }

    function Jn(a, c) {
        a.b && a.b.length || a.a != Dn && a.a != En || Kn(a);
        a.b || (a.b = []);
        a.b.push(c)
    }

    function Fn(a, c, d, e) {
        var f = {
            Rc: null,
            Wg: null,
            Yg: null
        };
        f.Rc = new An(function(a, h) {
            f.Wg = c ? function(d) {
                try {
                    var f = c.call(e, d);
                    a(f)
                } catch (p) {
                    h(p)
                }
            } : a;
            f.Yg = d ? function(c) {
                try {
                    var f = d.call(e, c);
                    !m(f) && c instanceof Gn ? h(c) : a(f)
                } catch (p) {
                    h(p)
                }
            } : h
        });
        f.Rc.c = a;
        Jn(a, f);
        return f.Rc
    }
    An.prototype.g = function(a) {
        this.a = Bn;
        Cn(this, Dn, a)
    };
    An.prototype.i = function(a) {
        this.a = Bn;
        Cn(this, En, a)
    };

    function Cn(a, c, d) {
        if (a.a == Bn) {
            if (a == d) c = En, d = new TypeError("Promise cannot resolve to itself");
            else {
                if (sn(d)) {
                    a.a = 1;
                    d.then(a.g, a.i, a);
                    return
                }
                if (la(d)) try {
                    var e = d.then;
                    if (ka(e)) {
                        Ln(a, d, e);
                        return
                    }
                } catch (f) {
                    c = En, d = f
                }
            }
            a.f = d;
            a.a = c;
            Kn(a);
            c != En || d instanceof Gn || Mn(a, d)
        }
    }

    function Ln(a, c, d) {
        function e(c) {
            g || (g = !0, a.i(c))
        }

        function f(c) {
            g || (g = !0, a.g(c))
        }
        a.a = 1;
        var g = !1;
        try {
            d.call(c, f, e)
        } catch (h) {
            e(h)
        }
    }

    function Kn(a) {
        a.e || (a.e = !0, tn(a.q, a))
    }
    An.prototype.q = function() {
        for (; this.b && this.b.length;) {
            var a = this.b;
            this.b = [];
            for (var c = 0; c < a.length; c++) In(this, a[c], this.a, this.f)
        }
        this.e = !1
    };

    function In(a, c, d, e) {
        if (d == Dn) c.Wg(e);
        else {
            if (c.Rc)
                for (; a && a.d; a = a.c) a.d = !1;
            c.Yg(e)
        }
    }

    function Mn(a, c) {
        a.d = !0;
        tn(function() {
            a.d && Nn.call(null, c)
        })
    }
    var Nn = vh;

    function Gn(a) {
        xa.call(this, a)
    }
    w(Gn, xa);
    Gn.prototype.name = "cancel";

    function On(a, c, d) {
        if (ka(a)) d && (a = ra(a, d));
        else if (a && "function" == typeof a.handleEvent) a = ra(a.handleEvent, a);
        else throw Error("Invalid listener argument");
        return 2147483647 < c ? -1 : ba.setTimeout(a, c || 0)
    };
    var Pn = ba.JSON.parse,
        Qn = ba.JSON.stringify;

    function Rn() {}
    Rn.prototype.b = null;

    function Sn(a) {
        var c;
        (c = a.b) || (c = {}, Tn(a) && (c[0] = !0, c[1] = !0), c = a.b = c);
        return c
    };
    var Un;

    function Vn() {}
    w(Vn, Rn);

    function Wn(a) {
        return (a = Tn(a)) ? new ActiveXObject(a) : new XMLHttpRequest
    }

    function Tn(a) {
        if (!a.a && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
            for (var c = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], d = 0; d < c.length; d++) {
                var e = c[d];
                try {
                    return new ActiveXObject(e), a.a = e
                } catch (f) {}
            }
            throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");
        }
        return a.a
    }
    Un = new Vn;
    var Xn = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/;

    function Yn(a) {
        if (Zn) {
            Zn = !1;
            var c = ba.location;
            if (c) {
                var d = c.href;
                if (d && (d = (d = Yn(d)[3] || null) ? decodeURI(d) : d) && d != c.hostname) throw Zn = !0, Error();
            }
        }
        return a.match(Xn)
    }
    var Zn = Kb;

    function $n(a, c) {
        for (var d = a.split("&"), e = 0; e < d.length; e++) {
            var f = d[e].indexOf("="),
                g = null,
                h = null;
            0 <= f ? (g = d[e].substring(0, f), h = d[e].substring(f + 1)) : g = d[e];
            c(g, h ? decodeURIComponent(h.replace(/\+/g, " ")) : "")
        }
    }

    function ao(a) {
        if (a[1]) {
            var c = a[0],
                d = c.indexOf("#");
            0 <= d && (a.push(c.substr(d)), a[0] = c = c.substr(0, d));
            d = c.indexOf("?");
            0 > d ? a[1] = "?" : d == c.length - 1 && (a[1] = void 0)
        }
        return a.join("")
    }

    function bo(a, c, d) {
        if (ga(c))
            for (var e = 0; e < c.length; e++) bo(a, String(c[e]), d);
        else null != c && d.push("&", a, "" === c ? "" : "=", encodeURIComponent(String(c)))
    }

    function co(a, c) {
        for (var d in c) bo(d, c[d], a);
        return a
    };

    function eo(a) {
        $c.call(this);
        this.H = new Ch;
        this.i = a || null;
        this.b = !1;
        this.g = this.Y = null;
        this.e = this.o = "";
        this.a = this.l = this.d = this.q = !1;
        this.f = 0;
        this.c = null;
        this.n = fo;
        this.p = this.J = !1
    }
    w(eo, $c);
    var fo = "",
        go = /^https?$/i,
        ho = ["POST", "PUT"];
    l = eo.prototype;
    l.send = function(a, c, d, e) {
        if (this.Y) throw Error("[goog.net.XhrIo] Object is active with another request=" + this.o + "; newUri=" + a);
        c = c ? c.toUpperCase() : "GET";
        this.o = a;
        this.e = "";
        this.q = !1;
        this.b = !0;
        this.Y = this.i ? Wn(this.i) : Wn(Un);
        this.g = this.i ? Sn(this.i) : Sn(Un);
        this.Y.onreadystatechange = ra(this.Xg, this);
        try {
            this.l = !0, this.Y.open(c, String(a), !0), this.l = !1
        } catch (f) {
            io(this, f);
            return
        }
        a = d || "";
        var g = this.H.clone();
        e && Bh(e, function(a, c) {
            g.set(c, a)
        });
        e = Wa(g.C(), jo);
        d = ba.FormData && a instanceof ba.FormData;
        !Ya(ho, c) || e || d || g.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        g.forEach(function(a, c) {
            this.Y.setRequestHeader(c, a)
        }, this);
        this.n && (this.Y.responseType = this.n);
        "withCredentials" in this.Y && (this.Y.withCredentials = this.J);
        try {
            ko(this), 0 < this.f && ((this.p = lo(this.Y)) ? (this.Y.timeout = this.f, this.Y.ontimeout = ra(this.oc, this)) : this.c = On(this.oc, this.f, this)), this.d = !0, this.Y.send(a), this.d = !1
        } catch (h) {
            io(this, h)
        }
    };

    function lo(a) {
        return Ib && Rb(9) && ja(a.timeout) && m(a.ontimeout)
    }

    function jo(a) {
        return "content-type" == a.toLowerCase()
    }
    l.oc = function() {
        "undefined" != typeof aa && this.Y && (this.e = "Timed out after " + this.f + "ms, aborting", this.dispatchEvent("timeout"), this.Y && this.b && (this.b = !1, this.a = !0, this.Y.abort(), this.a = !1, this.dispatchEvent("complete"), this.dispatchEvent("abort"), mo(this)))
    };

    function io(a, c) {
        a.b = !1;
        a.Y && (a.a = !0, a.Y.abort(), a.a = !1);
        a.e = c;
        no(a);
        mo(a)
    }

    function no(a) {
        a.q || (a.q = !0, a.dispatchEvent("complete"), a.dispatchEvent("error"))
    }
    l.O = function() {
        this.Y && (this.b && (this.b = !1, this.a = !0, this.Y.abort(), this.a = !1), mo(this, !0));
        eo.S.O.call(this)
    };
    l.Xg = function() {
        this.U || (this.l || this.d || this.a ? oo(this) : this.dn())
    };
    l.dn = function() {
        oo(this)
    };

    function oo(a) {
        if (a.b && "undefined" != typeof aa && (!a.g[1] || 4 != po(a) || 2 != qo(a)))
            if (a.d && 4 == po(a)) On(a.Xg, 0, a);
            else if (a.dispatchEvent("readystatechange"), 4 == po(a)) {
            a.b = !1;
            try {
                if (ro(a)) a.dispatchEvent("complete"), a.dispatchEvent("success");
                else {
                    var c;
                    try {
                        c = 2 < po(a) ? a.Y.statusText : ""
                    } catch (d) {
                        c = ""
                    }
                    a.e = c + " [" + qo(a) + "]";
                    no(a)
                }
            } finally {
                mo(a)
            }
        }
    }

    function mo(a, c) {
        if (a.Y) {
            ko(a);
            var d = a.Y,
                e = a.g[0] ? ca : null;
            a.Y = null;
            a.g = null;
            c || a.dispatchEvent("ready");
            try {
                d.onreadystatechange = e
            } catch (f) {}
        }
    }

    function ko(a) {
        a.Y && a.p && (a.Y.ontimeout = null);
        ja(a.c) && (ba.clearTimeout(a.c), a.c = null)
    }

    function ro(a) {
        var c = qo(a),
            d;
        a: switch (c) {
            case 200:
            case 201:
            case 202:
            case 204:
            case 206:
            case 304:
            case 1223:
                d = !0;
                break a;
            default:
                d = !1
        }
        if (!d) {
            if (c = 0 === c) a = Yn(String(a.o))[1] || null, !a && self.location && (a = self.location.protocol, a = a.substr(0, a.length - 1)), c = !go.test(a ? a.toLowerCase() : "");
            d = c
        }
        return d
    }

    function po(a) {
        return a.Y ? a.Y.readyState : 0
    }

    function qo(a) {
        try {
            return 2 < po(a) ? a.Y.status : -1
        } catch (c) {
            return -1
        }
    }

    function so(a) {
        try {
            return a.Y ? a.Y.responseText : ""
        } catch (c) {
            return ""
        }
    };

    function to(a) {
        if ("undefined" != typeof XMLSerializer) return (new XMLSerializer).serializeToString(a);
        if (a = a.xml) return a;
        throw Error("Your browser does not support serializing XML documents");
    };
    var uo;
    a: if (document.implementation && document.implementation.createDocument) uo = document.implementation.createDocument("", "", null);
        else {
            if ("undefined" != typeof ActiveXObject) {
                var vo = new ActiveXObject("MSXML2.DOMDocument");
                if (vo) {
                    vo.resolveExternals = !1;
                    vo.validateOnParse = !1;
                    try {
                        vo.setProperty("ProhibitDTD", !0), vo.setProperty("MaxXMLSize", 2048), vo.setProperty("MaxElementDepth", 256)
                    } catch (wo) {}
                }
                if (vo) {
                    uo = vo;
                    break a
                }
            }
            throw Error("Your browser does not support creating new documents");
        }
    var xo = uo;

    function yo(a, c) {
        return xo.createElementNS(a, c)
    }

    function zo(a, c) {
        null === a && (a = "");
        return xo.createNode(1, c, a)
    }
    var Ao = document.implementation && document.implementation.createDocument ? yo : zo;

    function Bo(a, c) {
        return Co(a, c, []).join("")
    }

    function Co(a, c, d) {
        if (4 == a.nodeType || 3 == a.nodeType) c ? d.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : d.push(a.nodeValue);
        else
            for (a = a.firstChild; null !== a; a = a.nextSibling) Co(a, c, d);
        return d
    }

    function Do(a) {
        return a.localName
    }

    function Eo(a) {
        var c = a.localName;
        return m(c) ? c : a.baseName
    }
    var Fo = Ib ? Eo : Do;

    function Go(a) {
        return a instanceof Document
    }

    function Ho(a) {
        return la(a) && 9 == a.nodeType
    }
    var Io = Ib ? Ho : Go;

    function Jo(a) {
        return a instanceof Node
    }

    function Ko(a) {
        return la(a) && m(a.nodeType)
    }
    var Lo = Ib ? Ko : Jo;

    function Mo(a, c, d) {
        return a.getAttributeNS(c, d) || ""
    }

    function No(a, c, d) {
        var e = "";
        a = Oo(a, c, d);
        m(a) && (e = a.nodeValue);
        return e
    }
    var Po = document.implementation && document.implementation.createDocument ? Mo : No;

    function Qo(a, c, d) {
        return a.getAttributeNodeNS(c, d)
    }

    function Ro(a, c, d) {
        var e = null;
        a = a.attributes;
        for (var f, g, h = 0, k = a.length; h < k; ++h)
            if (f = a[h], f.namespaceURI == c && (g = f.prefix ? f.prefix + ":" + d : d, g == f.nodeName)) {
                e = f;
                break
            }
        return e
    }
    var Oo = document.implementation && document.implementation.createDocument ? Qo : Ro;

    function So(a, c, d, e) {
        a.setAttributeNS(c, d, e)
    }

    function To(a, c, d, e) {
        null === c ? a.setAttribute(d, e) : (c = a.ownerDocument.createNode(2, d, c), c.nodeValue = e, a.setAttributeNode(c))
    }
    var Uo = document.implementation && document.implementation.createDocument ? So : To;

    function Vo(a) {
        return (new DOMParser).parseFromString(a, "application/xml")
    }

    function Wo(a, c) {
        return function(d, e) {
            var f = a.call(c, d, e);
            m(f) && db(e[e.length - 1], f)
        }
    }

    function Xo(a, c) {
        return function(d, e) {
            var f = a.call(m(c) ? c : this, d, e);
            m(f) && e[e.length - 1].push(f)
        }
    }

    function Yo(a, c) {
        return function(d, e) {
            var f = a.call(m(c) ? c : this, d, e);
            m(f) && (e[e.length - 1] = f)
        }
    }

    function Zo(a) {
        return function(c, d) {
            var e = a.call(m(void 0) ? void 0 : this, c, d);
            m(e) && Cb(d[d.length - 1], m(void 0) ? void 0 : c.localName).push(e)
        }
    }

    function S(a, c) {
        return function(d, e) {
            var f = a.call(m(void 0) ? void 0 : this, d, e);
            m(f) && (e[e.length - 1][m(c) ? c : d.localName] = f)
        }
    }

    function T(a, c, d) {
        return $o(a, c, d)
    }

    function U(a, c) {
        return function(d, e, f) {
            a.call(m(c) ? c : this, d, e, f);
            f[f.length - 1].P.appendChild(d)
        }
    }

    function ap(a) {
        var c, d;
        return function(e, f, g) {
            if (!m(c)) {
                c = {};
                var h = {};
                h[e.localName] = a;
                c[e.namespaceURI] = h;
                d = bp(e.localName)
            }
            cp(c, d, f, g)
        }
    }

    function bp(a, c) {
        return function(d, e, f) {
            d = e[e.length - 1].P;
            e = a;
            m(e) || (e = f);
            f = c;
            m(c) || (f = d.namespaceURI);
            return Ao(f, e)
        }
    }
    var dp = bp();

    function ep(a, c) {
        for (var d = c.length, e = Array(d), f = 0; f < d; ++f) e[f] = a[c[f]];
        return e
    }

    function $o(a, c, d) {
        d = m(d) ? d : {};
        var e, f;
        e = 0;
        for (f = a.length; e < f; ++e) d[a[e]] = c;
        return d
    }

    function fp(a, c, d, e) {
        for (c = c.firstElementChild; null !== c; c = c.nextElementSibling) {
            var f = a[c.namespaceURI];
            m(f) && (f = f[c.localName], m(f) && f.call(e, c, d))
        }
    }

    function V(a, c, d, e, f) {
        e.push(a);
        fp(c, d, e, f);
        return e.pop()
    }

    function cp(a, c, d, e, f, g) {
        for (var h = (m(f) ? f : d).length, k, n, p = 0; p < h; ++p) k = d[p], m(k) && (n = c.call(g, k, e, m(f) ? f[p] : void 0), m(n) && a[n.namespaceURI][n.localName].call(g, n, k, e))
    }

    function gp(a, c, d, e, f, g, h) {
        f.push(a);
        cp(c, d, e, f, g, h);
        f.pop()
    };

    function hp(a, c, d) {
        return function(e, f, g) {
            e = new eo;
            e.n = "text";
            x(e, "complete", function(a) {
                a = a.target;
                if (ro(a)) {
                    var e = c.M(),
                        f;
                    if ("json" == e) f = so(a);
                    else if ("text" == e) f = so(a);
                    else if ("xml" == e) {
                        if (!Ib) try {
                            f = a.Y ? a.Y.responseXML : null
                        } catch (p) {
                            f = null
                        }
                        null != f || (f = Vo(so(a)))
                    }
                    null != f && (f = c.ja(f, {
                        featureProjection: g
                    }), d.call(this, f))
                }
                qc(a)
            }, !1, this);
            e.send(a)
        }
    }

    function ip(a, c) {
        return hp(a, c, function(a) {
            this.Oc(a)
        })
    };

    function jp() {
        return [
            [-Infinity, -Infinity, Infinity, Infinity]
        ]
    };
    var kp;
    (function() {
        var a = {
            Qf: {}
        };
        (function() {
            function c(a, d) {
                if (!(this instanceof c)) return new c(a, d);
                this.Fe = Math.max(4, a || 9);
                this.Hf = Math.max(2, Math.ceil(.4 * this.Fe));
                d && this.qi(d);
                this.clear()
            }

            function d(a, c) {
                a.bbox = e(a, 0, a.children.length, c)
            }

            function e(a, c, d, e) {
                for (var g = [Infinity, Infinity, -Infinity, -Infinity], h; c < d; c++) h = a.children[c], f(g, a.wa ? e(h) : h.bbox);
                return g
            }

            function f(a, c) {
                a[0] = Math.min(a[0], c[0]);
                a[1] = Math.min(a[1], c[1]);
                a[2] = Math.max(a[2], c[2]);
                a[3] = Math.max(a[3], c[3])
            }

            function g(a, c) {
                return a.bbox[0] - c.bbox[0]
            }

            function h(a, c) {
                return a.bbox[1] - c.bbox[1]
            }

            function k(a) {
                return (a[2] - a[0]) * (a[3] - a[1])
            }

            function n(a) {
                return a[2] - a[0] + (a[3] - a[1])
            }

            function p(a, c) {
                return a[0] <= c[0] && a[1] <= c[1] && c[2] <= a[2] && c[3] <= a[3]
            }

            function q(a, c) {
                return c[0] <= a[2] && c[1] <= a[3] && c[2] >= a[0] && c[3] >= a[1]
            }

            function r(a, c, d, e, f) {
                for (var g = [c, d], h; g.length;) d = g.pop(), c = g.pop(), d - c <= e || (h = c + Math.ceil((d - c) / e / 2) * e, t(a, c, d, h, f), g.push(c, h, h, d))
            }

            function t(a, c, d, e, f) {
                for (var g, h, k, n, p; d > c;) {
                    600 < d - c && (g = d - c + 1, h = e - c + 1, k = Math.log(g), n = .5 * Math.exp(2 * k / 3), p = .5 * Math.sqrt(k * n * (g - n) / g) * (0 > h - g / 2 ? -1 : 1), k = Math.max(c, Math.floor(e - h * n / g + p)), h = Math.min(d, Math.floor(e + (g - h) * n / g + p)), t(a, k, h, e, f));
                    g = a[e];
                    h = c;
                    n = d;
                    u(a, c, e);
                    for (0 < f(a[d], g) && u(a, c, d); h < n;) {
                        u(a, h, n);
                        h++;
                        for (n--; 0 > f(a[h], g);) h++;
                        for (; 0 < f(a[n], g);) n--
                    }
                    0 === f(a[c], g) ? u(a, c, n) : (n++, u(a, n, d));
                    n <= e && (c = n + 1);
                    e <= n && (d = n - 1)
                }
            }

            function u(a, c, d) {
                var e = a[c];
                a[c] = a[d];
                a[d] = e
            }
            c.prototype = {
                all: function() {
                    return this.Df(this.data, [])
                },
                search: function(a) {
                    var c = this.data,
                        d = [],
                        e = this.Ea;
                    if (!q(a, c.bbox)) return d;
                    for (var f = [], g, h, k, n; c;) {
                        g = 0;
                        for (h = c.children.length; g < h; g++) k = c.children[g], n = c.wa ? e(k) : k.bbox, q(a, n) && (c.wa ? d.push(k) : p(a, n) ? this.Df(k, d) : f.push(k));
                        c = f.pop()
                    }
                    return d
                },
                load: function(a) {
                    if (!a || !a.length) return this;
                    if (a.length < this.Hf) {
                        for (var c = 0, d = a.length; c < d; c++) this.ha(a[c]);
                        return this
                    }
                    a = this.Ff(a.slice(), 0, a.length - 1, 0);
                    this.data.children.length ? this.data.height === a.height ? this.If(this.data, a) : (this.data.height < a.height && (c = this.data, this.data = a, a = c), this.Gf(a, this.data.height - a.height - 1, !0)) : this.data = a;
                    return this
                },
                ha: function(a) {
                    a && this.Gf(a, this.data.height - 1);
                    return this
                },
                clear: function() {
                    this.data = {
                        children: [],
                        height: 1,
                        bbox: [Infinity, Infinity, -Infinity, -Infinity],
                        wa: !0
                    };
                    return this
                },
                remove: function(a) {
                    if (!a) return this;
                    for (var c = this.data, d = this.Ea(a), e = [], f = [], g, h, k, n; c || e.length;) {
                        c || (c = e.pop(), h = e[e.length - 1], g = f.pop(), n = !0);
                        if (c.wa && (k = c.children.indexOf(a), -1 !== k)) {
                            c.children.splice(k, 1);
                            e.push(c);
                            this.pi(e);
                            break
                        }
                        n || c.wa || !p(c.bbox, d) ? h ? (g++, c = h.children[g], n = !1) : c = null : (e.push(c), f.push(g), g = 0, h = c, c = c.children[0])
                    }
                    return this
                },
                Ea: function(a) {
                    return a
                },
                Ie: function(a, c) {
                    return a[0] - c[0]
                },
                Je: function(a, c) {
                    return a[1] - c[1]
                },
                toJSON: function() {
                    return this.data
                },
                Df: function(a, c) {
                    for (var d = []; a;) a.wa ? c.push.apply(c, a.children) : d.push.apply(d, a.children), a = d.pop();
                    return c
                },
                Ff: function(a, c, e, f) {
                    var g = e - c + 1,
                        h = this.Fe,
                        k;
                    if (g <= h) return k = {
                        children: a.slice(c, e + 1),
                        height: 1,
                        bbox: null,
                        wa: !0
                    }, d(k, this.Ea), k;
                    f || (f = Math.ceil(Math.log(g) / Math.log(h)), h = Math.ceil(g / Math.pow(h, f - 1)));
                    k = {
                        children: [],
                        height: f,
                        bbox: null
                    };
                    var g = Math.ceil(g / h),
                        h = g * Math.ceil(Math.sqrt(h)),
                        n, p, q;
                    for (r(a, c, e, h, this.Ie); c <= e; c += h)
                        for (p = Math.min(c + h - 1, e), r(a, c, p, g, this.Je), n = c; n <= p; n += g) q = Math.min(n + g - 1, p), k.children.push(this.Ff(a, n, q, f - 1));
                    d(k, this.Ea);
                    return k
                },
                oi: function(a, c, d, e) {
                    for (var f, g, h, n, p, q, r, t;;) {
                        e.push(c);
                        if (c.wa || e.length - 1 === d) break;
                        r = t = Infinity;
                        f = 0;
                        for (g = c.children.length; f < g; f++) {
                            h = c.children[f];
                            p = k(h.bbox);
                            q = a;
                            var u = h.bbox;
                            q = (Math.max(u[2], q[2]) - Math.min(u[0], q[0])) * (Math.max(u[3], q[3]) - Math.min(u[1], q[1])) - p;
                            q < t ? (t = q, r = p < r ? p : r, n = h) : q === t && p < r && (r = p, n = h)
                        }
                        c = n
                    }
                    return c
                },
                Gf: function(a, c, d) {
                    var e = this.Ea;
                    d = d ? a.bbox : e(a);
                    var e = [],
                        g = this.oi(d, this.data, c, e);
                    g.children.push(a);
                    for (f(g.bbox, d); 0 <= c;)
                        if (e[c].children.length > this.Fe) this.ri(e, c), c--;
                        else break;
                    this.li(d, e, c)
                },
                ri: function(a, c) {
                    var e = a[c],
                        f = e.children.length,
                        g = this.Hf;
                    this.mi(e, g, f);
                    f = {
                        children: e.children.splice(this.ni(e, g, f)),
                        height: e.height
                    };
                    e.wa && (f.wa = !0);
                    d(e, this.Ea);
                    d(f, this.Ea);
                    c ? a[c - 1].children.push(f) : this.If(e, f)
                },
                If: function(a, c) {
                    this.data = {
                        children: [a, c],
                        height: a.height + 1
                    };
                    d(this.data, this.Ea)
                },
                ni: function(a, c, d) {
                    var f, g, h, n, p, q, r;
                    p = q = Infinity;
                    for (f = c; f <= d - c; f++) {
                        g = e(a, 0, f, this.Ea);
                        h = e(a, f, d, this.Ea);
                        var t = g,
                            u = h;
                        n = Math.max(t[0], u[0]);
                        var za = Math.max(t[1], u[1]),
                            cb = Math.min(t[2], u[2]),
                            t = Math.min(t[3], u[3]);
                        n = Math.max(0, cb - n) * Math.max(0, t - za);
                        g = k(g) + k(h);
                        n < p ? (p = n, r = f, q = g < q ? g : q) : n === p && g < q && (q = g, r = f)
                    }
                    return r
                },
                mi: function(a, c, d) {
                    var e = a.wa ? this.Ie : g,
                        f = a.wa ? this.Je : h,
                        k = this.Ef(a, c, d, e);
                    c = this.Ef(a, c, d, f);
                    k < c && a.children.sort(e)
                },
                Ef: function(a, c, d, g) {
                    a.children.sort(g);
                    g = this.Ea;
                    var h = e(a, 0, c, g),
                        k = e(a, d - c, d, g),
                        p = n(h) + n(k),
                        q, r;
                    for (q = c; q < d - c; q++) r = a.children[q], f(h, a.wa ? g(r) : r.bbox), p += n(h);
                    for (q = d - c - 1; q >= c; q--) r = a.children[q], f(k, a.wa ? g(r) : r.bbox), p += n(k);
                    return p
                },
                li: function(a, c, d) {
                    for (; 0 <= d; d--) f(c[d].bbox, a)
                },
                pi: function(a) {
                    for (var c = a.length - 1, e; 0 <= c; c--) 0 === a[c].children.length ? 0 < c ? (e = a[c - 1].children, e.splice(e.indexOf(a[c]), 1)) : this.clear() : d(a[c], this.Ea)
                },
                qi: function(a) {
                    var c = ["return a", " - b", ";"];
                    this.Ie = new Function("a", "b", c.join(a[0]));
                    this.Je = new Function("a", "b", c.join(a[1]));
                    this.Ea = new Function("a", "return [a" + a.join(", a") + "];")
                }
            };
            "function" === typeof define && define.Lo ? define("rbush", function() {
                return c
            }) : "undefined" !== typeof a ? a.Qf = c : "undefined" !== typeof self ? self.b = c : window.b = c
        })();
        kp = a.Qf
    })();

    function lp(a) {
        this.a = kp(a);
        this.b = {}
    }
    l = lp.prototype;
    l.ha = function(a, c) {
        var d = [a[0], a[1], a[2], a[3], c];
        this.a.ha(d);
        this.b[ma(c)] = d
    };
    l.load = function(a, c) {
        for (var d = Array(c.length), e = 0, f = c.length; e < f; e++) {
            var g = a[e],
                h = c[e],
                g = [g[0], g[1], g[2], g[3], h];
            d[e] = g;
            this.b[ma(h)] = g
        }
        this.a.load(d)
    };
    l.remove = function(a) {
        a = ma(a);
        var c = this.b[a];
        zb(this.b, a);
        return null !== this.a.remove(c)
    };
    l.update = function(a, c) {
        var d = ma(c);
        Vd(this.b[d].slice(0, 4), a) || (this.remove(c), this.ha(a, c))
    };

    function mp(a) {
        a = a.a.all();
        return Ua(a, function(a) {
            return a[4]
        })
    }

    function np(a, c) {
        var d = a.a.search(c);
        return Ua(d, function(a) {
            return a[4]
        })
    }
    l.forEach = function(a, c) {
        return op(mp(this), a, c)
    };

    function pp(a, c, d, e) {
        return op(np(a, c), d, e)
    }

    function op(a, c, d) {
        for (var e, f = 0, g = a.length; f < g && !(e = c.call(d, a[f])); f++);
        return e
    }
    l.la = function() {
        return xb(this.b)
    };
    l.clear = function() {
        this.a.clear();
        this.b = {}
    };
    l.G = function() {
        return this.a.data.bbox
    };

    function qp(a) {
        a = m(a) ? a : {};
        Bg.call(this, {
            attributions: a.attributions,
            logo: a.logo,
            projection: void 0,
            state: "ready",
            wrapX: m(a.wrapX) ? a.wrapX : !0
        });
        this.J = ca;
        m(a.loader) ? this.J = a.loader : m(a.url) && (this.J = ip(a.url, a.format));
        this.oa = m(a.strategy) ? a.strategy : jp;
        this.a = new lp;
        this.N = new lp;
        this.c = {};
        this.e = {};
        this.g = {};
        this.i = {};
        m(a.features) && rp(this, a.features)
    }
    w(qp, Bg);
    l = qp.prototype;
    l.jf = function(a) {
        var c = ma(a).toString();
        if (sp(this, c, a)) {
            tp(this, c, a);
            var d = a.Q();
            null != d ? (c = d.G(), this.a.ha(c, a)) : this.c[c] = a;
            this.dispatchEvent(new up("addfeature", a))
        }
        this.k()
    };

    function tp(a, c, d) {
        a.i[c] = [x(d, "change", a.Pg, !1, a), x(d, "propertychange", a.Pg, !1, a)]
    }

    function sp(a, c, d) {
        var e = !0,
            f = d.$;
        m(f) ? f.toString() in a.e ? e = !1 : a.e[f.toString()] = d : a.g[c] = d;
        return e
    }
    l.Oc = function(a) {
        rp(this, a);
        this.k()
    };

    function rp(a, c) {
        var d, e, f, g, h = [],
            k = [],
            n = [];
        e = 0;
        for (f = c.length; e < f; e++) g = c[e], d = ma(g).toString(), sp(a, d, g) && k.push(g);
        e = 0;
        for (f = k.length; e < f; e++) {
            g = k[e];
            d = ma(g).toString();
            tp(a, d, g);
            var p = g.Q();
            null != p ? (d = p.G(), h.push(d), n.push(g)) : a.c[d] = g
        }
        a.a.load(h, n);
        e = 0;
        for (f = k.length; e < f; e++) a.dispatchEvent(new up("addfeature", k[e]))
    }
    l.clear = function(a) {
        if (a) {
            for (var c in this.i) Sa(this.i[c], Wc);
            this.i = {};
            this.e = {};
            this.g = {}
        } else a = this.ph, this.a.forEach(a, this), pb(this.c, a, this);
        this.a.clear();
        this.N.clear();
        this.c = {};
        this.dispatchEvent(new up("clear"));
        this.k()
    };
    l.Rf = function(a, c) {
        return this.a.forEach(a, c)
    };

    function vp(a, c, d) {
        a.$c([c[0], c[1], c[0], c[1]], function(a) {
            if (a.Q().Jb(c[0], c[1])) return d.call(void 0, a)
        })
    }
    l.$c = function(a, c, d) {
        return pp(this.a, a, c, d)
    };
    l.Ab = function(a, c, d, e) {
        return this.$c(a, d, e)
    };
    l.Oe = function(a, c, d) {
        return this.$c(a, function(e) {
            if (e.Q().ra(a) && (e = c.call(d, e))) return e
        })
    };
    l.Dc = function() {
        var a = mp(this.a);
        xb(this.c) || db(a, sb(this.c));
        return a
    };
    l.Re = function(a) {
        var c = [];
        vp(this, a, function(a) {
            c.push(a)
        });
        return c
    };
    l.Se = function(a) {
        return np(this.a, a)
    };
    l.Tf = function(a) {
        var c = a[0],
            d = a[1],
            e = null,
            f = [NaN, NaN],
            g = Infinity,
            h = [-Infinity, -Infinity, Infinity, Infinity];
        pp(this.a, h, function(a) {
            var n = a.Q(),
                p = g;
            g = n.Sa(c, d, f, g);
            g < p && (e = a, a = Math.sqrt(g), h[0] = c - a, h[1] = d - a, h[2] = c + a, h[3] = d + a)
        });
        return e
    };
    l.G = function() {
        return this.a.G()
    };
    l.Qe = function(a) {
        a = this.e[a.toString()];
        return m(a) ? a : null
    };
    l.Pg = function(a) {
        a = a.target;
        var c = ma(a).toString(),
            d = a.Q();
        null != d ? (d = d.G(), c in this.c ? (delete this.c[c], this.a.ha(d, a)) : this.a.update(d, a)) : c in this.c || (this.a.remove(a), this.c[c] = a);
        d = a.$;
        m(d) ? (d = d.toString(), c in this.g ? (delete this.g[c], this.e[d] = a) : this.e[d] !== a && (wp(this, a), this.e[d] = a)) : c in this.g || (wp(this, a), this.g[c] = a);
        this.k();
        this.dispatchEvent(new up("changefeature", a))
    };
    l.la = function() {
        return this.a.la() && xb(this.c)
    };
    l.ac = function(a, c, d) {
        var e = this.N;
        a = this.oa(a, c);
        var f, g;
        f = 0;
        for (g = a.length; f < g; ++f) {
            var h = a[f];
            pp(e, h, function(a) {
                return Rd(a.extent, h)
            }) || (this.J.call(this, h, c, d), e.ha(h, {
                extent: h.slice()
            }))
        }
    };
    l.Qg = function(a) {
        var c = ma(a).toString();
        c in this.c ? delete this.c[c] : this.a.remove(a);
        this.ph(a);
        this.k()
    };
    l.ph = function(a) {
        var c = ma(a).toString();
        Sa(this.i[c], Wc);
        delete this.i[c];
        var d = a.$;
        m(d) ? delete this.e[d.toString()] : delete this.g[c];
        this.dispatchEvent(new up("removefeature", a))
    };

    function wp(a, c) {
        for (var d in a.e)
            if (a.e[d] === c) {
                delete a.e[d];
                break
            }
    }

    function up(a, c) {
        rc.call(this, a);
        this.feature = c
    }
    w(up, rc);

    function xp(a) {
        this.a = a.source;
        this.ba = zd();
        this.c = ai();
        this.e = [0, 0];
        this.n = null;
        qn.call(this, {
            attributions: a.attributions,
            canvasFunction: ra(this.zi, this),
            logo: a.logo,
            projection: a.projection,
            ratio: a.ratio,
            resolutions: a.resolutions,
            state: this.a.o
        });
        this.p = null;
        this.g = void 0;
        this.Mg(a.style);
        x(this.a, "change", this.am, void 0, this)
    }
    w(xp, qn);
    l = xp.prototype;
    l.zi = function(a, c, d, e, f) {
        var g = new Fm(.5 * c / d, a, c);
        this.a.ac(a, c, f);
        var h = !1;
        this.a.Ab(a, c, function(a) {
            var e;
            if (!(e = h)) {
                var f;
                m(a.c) ? f = a.c.call(a, c) : m(this.g) && (f = this.g(a, c));
                if (null != f) {
                    var q, r = !1;
                    e = 0;
                    for (q = f.length; e < q; ++e) r = fn(g, a, f[e], en(c, d), this.$l, this) || r;
                    e = r
                } else e = !1
            }
            h = e
        }, this);
        Gm(g);
        if (h) return null;
        this.e[0] != e[0] || this.e[1] != e[1] ? (this.c.canvas.width = e[0], this.c.canvas.height = e[1], this.e[0] = e[0], this.e[1] = e[1]) : this.c.clearRect(0, 0, e[0], e[1]);
        a = yp(this, ce(a), c, d, e);
        Jm(g, this.c, d, a, 0, {});
        this.n = g;
        return this.c.canvas
    };
    l.ge = function(a, c, d, e, f) {
        if (null !== this.n) {
            var g = {};
            return this.n.c(a, c, 0, e, function(a) {
                var c = ma(a).toString();
                if (!(c in g)) return g[c] = !0, f(a)
            })
        }
    };
    l.Xl = function() {
        return this.a
    };
    l.Yl = function() {
        return this.p
    };
    l.Zl = function() {
        return this.g
    };

    function yp(a, c, d, e, f) {
        return qj(a.ba, f[0] / 2, f[1] / 2, e / d, -e / d, 0, -c[0], -c[1])
    }
    l.$l = function() {
        this.k()
    };
    l.am = function() {
        Dg(this, this.a.o)
    };
    l.Mg = function(a) {
        this.p = m(a) ? a : El;
        this.g = null === a ? void 0 : Dl(this.p);
        this.k()
    };

    function zp(a) {
        Km.call(this, a);
        this.e = null;
        this.f = zd();
        this.c = this.d = null
    }
    w(zp, Km);
    l = zp.prototype;
    l.Pa = function(a, c, d, e) {
        var f = this.a;
        return f.da().ge(a, c.viewState.resolution, c.viewState.rotation, c.skippedFeatureUids, function(a) {
            return d.call(e, a, f)
        })
    };
    l.dc = function(a, c, d, e) {
        if (!fa(this.fe()))
            if (this.a.da() instanceof xp) {
                if (a = a.slice(), sj(c.pixelToCoordinateMatrix, a, a), this.Pa(a, c, Gg, this)) return d.call(e, this.a)
            } else if (null === this.d && (this.d = zd(), Fd(this.f, this.d)), c = Nm(a, this.d), null === this.c && (this.c = ai(1, 1)), this.c.clearRect(0, 0, 1, 1), this.c.drawImage(this.fe(), c[0], c[1], 1, 1, 0, 0, 1, 1), 0 < this.c.getImageData(0, 0, 1, 1).data[3]) return d.call(e, this.a)
    };
    l.fe = function() {
        return null === this.e ? null : this.e.b()
    };
    l.Xf = function() {
        return this.f
    };
    l.ff = function(a, c) {
        var d = a.pixelRatio,
            e = a.viewState,
            f = e.center,
            g = e.resolution,
            h = e.rotation,
            k, n = this.a.da(),
            p = a.viewHints;
        k = a.extent;
        m(c.extent) && (k = ge(k, c.extent));
        p[0] || p[1] || je(k) || (e = e.projection, p = n.f, null === p || (e = p), k = n.Cc(k, g, d, e), null !== k && wj(this, k) && (this.e = k));
        if (null !== this.e) {
            k = this.e;
            var e = k.G(),
                p = k.resolution,
                q = k.e,
                g = d * p / (g * q);
            qj(this.f, d * a.size[0] / 2, d * a.size[1] / 2, g, g, h, q * (e[0] - f[0]) / p, q * (f[1] - e[3]) / p);
            this.d = null;
            yj(a.attributions, k.f);
            zj(a, n)
        }
        return !0
    };

    function Ap(a) {
        Km.call(this, a);
        this.c = this.f = null;
        this.q = !1;
        this.g = null;
        this.l = zd();
        this.e = null;
        this.p = this.H = this.n = NaN;
        this.i = this.d = null;
        this.L = [0, 0]
    }
    w(Ap, Km);
    Ap.prototype.fe = function() {
        return this.f
    };
    Ap.prototype.Xf = function() {
        return this.l
    };
    Ap.prototype.ff = function(a, c) {
        var d = a.pixelRatio,
            e = a.viewState,
            f = e.projection,
            g = this.a,
            h = g.da(),
            k = ah(h, f),
            n = h.Cd(),
            p = Tg(k, e.resolution),
            q = h.Xb(p, a.pixelRatio, f),
            r = q[0] / ld(k.na(p), this.L)[0],
            t = k.ma(p),
            r = t / r,
            u = e.center,
            A;
        t == e.resolution ? (u = Bj(u, t, a.size), A = ee(u, t, e.rotation, a.size)) : A = a.extent;
        m(c.extent) && (A = ge(A, c.extent));
        if (je(A)) return !1;
        var z = Qg(k, A, t),
            D = q[0] * kf(z),
            B = q[1] * (z.a - z.c + 1),
            y, K;
        null === this.f ? (K = ai(D, B), this.f = K.canvas, this.c = [D, B], this.g = K, this.q = !Om(this.c)) : (y = this.f, K = this.g, this.c[0] < D || this.c[1] < B || this.H !== q[0] || this.p !== q[1] || this.q && (this.c[0] > D || this.c[1] > B) ? (y.width = D, y.height = B, this.c = [D, B], this.q = !Om(this.c), this.d = null) : (D = this.c[0], B = this.c[1], (y = p != this.n) || (y = this.d, y = !(y.b <= z.b && z.d <= y.d && y.c <= z.c && z.a <= y.a)), y && (this.d = null)));
        var J, H;
        null === this.d ? (D /= q[0], B /= q[1], J = z.b - Math.floor((D - kf(z)) / 2), H = z.c - Math.floor((B - (z.a - z.c + 1)) / 2), this.n = p, this.H = q[0], this.p = q[1], this.d = new ff(J, J + D - 1, H, H + B - 1), this.i = Array(D * B), B = this.d) : (B = this.d, D = kf(B));
        y = {};
        y[p] = {};
        var P = [],
            sa = this.yd(h, y),
            Oa = g.c(),
            N = Kd(),
            za = new ff(0, 0, 0, 0),
            cb, Ga, Bb;
        for (H = z.b; H <= z.d; ++H)
            for (Bb = z.c; Bb <= z.a; ++Bb) Ga = h.Vb(p, H, Bb, d, f), J = Ga.state, 2 == J || 4 == J || 3 == J && !Oa ? y[p][ef(Ga.b)] = Ga : (cb = k.Ad(Ga.b, sa, null, za, N), cb || (P.push(Ga), cb = k.Ld(Ga.b, za, N), null === cb || sa(p + 1, cb)));
        sa = 0;
        for (cb = P.length; sa < cb; ++sa) Ga = P[sa], H = q[0] * (Ga.b[1] - B.b), Bb = q[1] * (B.a - Ga.b[2]), K.clearRect(H, Bb, q[0], q[1]);
        P = Ua(tb(y), Number);
        gb(P);
        var $a = h.X,
            Ic = be(Og(k, [p, B.b, B.a], N)),
            lc, Pe, tj, bi, Vf, um, sa = 0;
        for (cb = P.length; sa < cb; ++sa)
            if (lc = P[sa], q = h.Xb(lc, d, f), bi = y[lc], lc == p)
                for (tj in bi) Ga = bi[tj], Pe = (Ga.b[2] - B.c) * D + (Ga.b[1] - B.b), this.i[Pe] != Ga && (H = q[0] * (Ga.b[1] - B.b), Bb = q[1] * (B.a - Ga.b[2]), J = Ga.state, 4 != J && (3 != J || Oa) && $a || K.clearRect(H, Bb, q[0], q[1]), 2 == J && K.drawImage(Ga.Ma(), n, n, q[0], q[1], H, Bb, q[0], q[1]), this.i[Pe] = Ga);
            else
                for (tj in lc = k.ma(lc) / t, bi)
                    for (Ga = bi[tj], Pe = Og(k, Ga.b, N), H = (Pe[0] - Ic[0]) / r, Bb = (Ic[1] - Pe[3]) / r, um = lc * q[0], Vf = lc * q[1], J = Ga.state, 4 != J && $a || K.clearRect(H, Bb, um, Vf), 2 == J && K.drawImage(Ga.Ma(), n, n, q[0], q[1], H, Bb, um, Vf), Ga = Pg(k, Pe, p, za), J = Math.max(Ga.b, B.b), Bb = Math.min(Ga.d, B.d), H = Math.max(Ga.c, B.c), Ga = Math.min(Ga.a, B.a); J <= Bb; ++J)
                        for (Vf = H; Vf <= Ga; ++Vf) Pe = (Vf - B.c) * D + (J - B.b), this.i[Pe] = void 0;
        Aj(a.usedTiles, h, p, z);
        Cj(a, h, k, d, f, A, p, g.a());
        xj(a, h);
        zj(a, h);
        qj(this.l, d * a.size[0] / 2, d * a.size[1] / 2, d * r / e.resolution, d * r / e.resolution, e.rotation, (Ic[0] - u[0]) / r, (u[1] - Ic[1]) / r);
        this.e = null;
        return !0
    };
    Ap.prototype.dc = function(a, c, d, e) {
        if (null !== this.g && (null === this.e && (this.e = zd(), Fd(this.l, this.e)), a = Nm(a, this.e), 0 < this.g.getImageData(a[0], a[1], 1, 1).data[3])) return d.call(e, this.a)
    };

    function Bp(a) {
        Km.call(this, a);
        this.d = !1;
        this.q = -1;
        this.i = NaN;
        this.f = Kd();
        this.c = this.g = null;
        this.e = ai()
    }
    w(Bp, Km);
    Bp.prototype.o = function(a, c, d) {
        var e = a.extent,
            f = a.focus,
            g = a.pixelRatio,
            h = a.skippedFeatureUids,
            k = a.viewState,
            n = k.projection,
            k = k.rotation,
            p = n.G(),
            q = this.a.da(),
            r = Mm(this, a, 0);
        Lm(this, "precompose", d, a, r);
        var t = this.c;
        if (null !== t && !t.la()) {
            var u;
            bd(this.a, "render") ? (this.e.canvas.width = d.canvas.width, this.e.canvas.height = d.canvas.height, u = this.e) : u = d;
            var A = u.globalAlpha;
            u.globalAlpha = c.opacity;
            c = {};
            f = f[0];
            if (q.H && n.c && !Rd(p, e)) {
                n = p[0];
                q = p[2];
                Jm(t, u, g, r, k, n <= f && f <= q ? h : c);
                for (var z = e[0], D = ie(p), B = 0, y; z < p[0];) --B, y = D * B, r = Mm(this, a, y), Jm(t, u, g, r, k, n + y <= f && f <= q + y ? h : c), z += D;
                B = 0;
                for (z = e[2]; z > p[2];) ++B, y = D * B, r = Mm(this, a, y), Jm(t, u, g, r, k, n + y <= f && f <= q + y ? h : c), z -= D
            } else Jm(t, u, g, r, k, h);
            u != d && (Lm(this, "render", u, a, r), d.drawImage(u.canvas, 0, 0));
            u.globalAlpha = A
        }
        Lm(this, "postcompose", d, a, r)
    };
    Bp.prototype.Pa = function(a, c, d, e) {
        if (null !== this.c) {
            var f = this.a,
                g = {};
            return this.c.c(a, c.viewState.resolution, c.viewState.rotation, c.skippedFeatureUids, function(a) {
                var c = ma(a).toString();
                if (!(c in g)) return g[c] = !0, d.call(e, a, f)
            })
        }
    };
    Bp.prototype.l = function() {
        vj(this)
    };
    Bp.prototype.ff = function(a) {
        function c(a) {
            var c;
            m(a.c) ? c = a.c.call(a, p) : m(d.a) && (c = (0, d.a)(a, p));
            if (null != c) {
                if (null != c) {
                    var e, f, g = !1;
                    e = 0;
                    for (f = c.length; e < f; ++e) g = fn(t, a, c[e], en(p, q), this.l, this) || g;
                    a = g
                } else a = !1;
                this.d = this.d || a
            }
        }
        var d = this.a,
            e = d.da();
        yj(a.attributions, e.d);
        zj(a, e);
        var f = a.viewHints[0],
            g = a.viewHints[1],
            h = d.o,
            k = d.n;
        if (!this.d && !h && f || !k && g) return !0;
        var n = a.extent,
            f = a.viewState,
            g = f.projection,
            p = f.resolution,
            q = a.pixelRatio,
            h = d.b,
            r = d.c,
            k = d.get("renderOrder");
        m(k) || (k = dn);
        n = Od(n, r * p);
        r = f.projection.G();
        e.H && f.projection.c && !Rd(r, a.extent) && (n[0] = r[0], n[2] = r[2]);
        if (!this.d && this.i == p && this.q == h && this.g == k && Rd(this.f, n)) return !0;
        qc(this.c);
        this.c = null;
        this.d = !1;
        var t = new Fm(.5 * p / q, n, p, d.c);
        e.ac(n, p, g);
        if (null === k) e.Ab(n, p, c, this);
        else {
            var u = [];
            e.Ab(n, p, function(a) {
                u.push(a)
            }, this);
            gb(u, k);
            Sa(u, c, this)
        }
        Gm(t);
        this.i = p;
        this.q = h;
        this.g = k;
        this.f = n;
        this.c = t;
        return !0
    };

    function Cp(a, c) {
        Ij.call(this, 0, c);
        this.d = ai();
        this.b = this.d.canvas;
        this.b.style.width = "100%";
        this.b.style.height = "100%";
        this.b.className = "ol-unselectable";
        Pf(a, this.b, 0);
        this.a = !0;
        this.e = zd()
    }
    w(Cp, Ij);
    Cp.prototype.Ke = function(a) {
        return a instanceof I ? new zp(a) : a instanceof L ? new Ap(a) : a instanceof M ? new Bp(a) : null
    };

    function Dp(a, c, d) {
        var e = a.g,
            f = a.d;
        if (bd(e, c)) {
            var g = d.extent,
                h = d.pixelRatio,
                k = d.viewState,
                n = k.projection,
                p = k.resolution,
                k = k.rotation,
                q = 0;
            if (n.c) {
                var r = n.G(),
                    n = ie(r),
                    t = d.focus[0];
                if (t < r[0] || t > r[2]) q = Math.ceil((r[0] - t) / n), q *= n, g = [g[0] + q, g[1], g[2] + q, g[3]]
            }
            n = d.pixelRatio;
            r = d.viewState;
            t = r.resolution;
            q = qj(a.e, a.b.width / 2, a.b.height / 2, n / t, -n / t, -r.rotation, -r.center[0] - q, -r.center[1]);
            p = new Fm(.5 * p / h, g, p);
            g = new cm(f, h, g, q, k);
            e.dispatchEvent(new il(c, e, g, p, d, f, null));
            Gm(p);
            p.la() || Jm(p, f, h, q, k, {});
            om(g);
            a.c = p
        }
    }
    Cp.prototype.M = function() {
        return "canvas"
    };
    Cp.prototype.ue = function(a) {
        if (null === a) this.a && (mg(this.b, !1), this.a = !1);
        else {
            var c = this.d,
                d = a.size[0] * a.pixelRatio,
                e = a.size[1] * a.pixelRatio;
            this.b.width != d || this.b.height != e ? (this.b.width = d, this.b.height = e) : c.clearRect(0, 0, this.b.width, this.b.height);
            Jj(a);
            Dp(this, "precompose", a);
            var d = a.layerStatesArray,
                e = a.viewState.resolution,
                f, g, h, k;
            f = 0;
            for (g = d.length; f < g; ++f) k = d[f], h = k.layer, h = Lj(this, h), oj(k, e) && "ready" == k.i && h.ff(a, k) && h.o(a, k, c);
            Dp(this, "postcompose", a);
            this.a || (mg(this.b, !0), this.a = !0);
            Mj(this, a);
            a.postRenderFunctions.push(Kj)
        }
    };

    function Ep(a, c) {
        uj.call(this, a);
        this.target = c
    }
    w(Ep, uj);
    Ep.prototype.e = ca;
    Ep.prototype.i = ca;

    function Fp(a) {
        var c = Mf("DIV");
        c.style.position = "absolute";
        Ep.call(this, a, c);
        this.c = null;
        this.d = Bd()
    }
    w(Fp, Ep);
    Fp.prototype.Pa = function(a, c, d, e) {
        var f = this.a;
        return f.da().ge(a, c.viewState.resolution, c.viewState.rotation, c.skippedFeatureUids, function(a) {
            return d.call(e, a, f)
        })
    };
    Fp.prototype.e = function() {
        Of(this.target);
        this.c = null
    };
    Fp.prototype.f = function(a, c) {
        var d = a.viewState,
            e = d.center,
            f = d.resolution,
            g = d.rotation,
            h = this.c,
            k = this.a.da(),
            n = a.viewHints,
            p = a.extent;
        m(c.extent) && (p = ge(p, c.extent));
        n[0] || n[1] || je(p) || (d = d.projection, n = k.f, null === n || (d = n), p = k.Cc(p, f, a.pixelRatio, d), null === p || wj(this, p) && (h = p));
        null !== h && (d = h.G(), n = h.resolution, p = zd(), qj(p, a.size[0] / 2, a.size[1] / 2, n / f, n / f, g, (d[0] - e[0]) / n, (e[1] - d[3]) / n), h != this.c && (e = h.b(this), e.style.maxWidth = "none", e.style.position = "absolute", Of(this.target), this.target.appendChild(e), this.c = h), rj(p, this.d) || (fi(this.target, p), Cd(this.d, p)), yj(a.attributions, h.f), zj(a, k));
        return !0
    };

    function Gp(a) {
        var c = Mf("DIV");
        c.style.position = "absolute";
        Ep.call(this, a, c);
        this.d = !0;
        this.q = 1;
        this.g = 0;
        this.c = {}
    }
    w(Gp, Ep);
    Gp.prototype.e = function() {
        Of(this.target);
        this.g = 0
    };
    Gp.prototype.f = function(a, c) {
        if (!c.visible) return this.d && (mg(this.target, !1), this.d = !1), !0;
        var d = a.pixelRatio,
            e = a.viewState,
            f = e.projection,
            g = this.a,
            h = g.da(),
            k = ah(h, f),
            n = h.Cd(),
            p = Tg(k, e.resolution),
            q = k.ma(p),
            r = e.center,
            t;
        q == e.resolution ? (r = Bj(r, q, a.size), t = ee(r, q, e.rotation, a.size)) : t = a.extent;
        m(c.extent) && (t = ge(t, c.extent));
        var q = Qg(k, t, q),
            u = {};
        u[p] = {};
        var A = this.yd(h, u),
            z = g.c(),
            D = Kd(),
            B = new ff(0, 0, 0, 0),
            y, K, J, H;
        for (J = q.b; J <= q.d; ++J)
            for (H = q.c; H <= q.a; ++H) y = h.Vb(p, J, H, d, f), K = y.state, 2 == K ? u[p][ef(y.b)] = y : 4 == K || 3 == K && !z || (K = k.Ad(y.b, A, null, B, D), K || (y = k.Ld(y.b, B, D), null === y || A(p + 1, y)));
        var P;
        if (this.g != h.b) {
            for (P in this.c) z = this.c[+P], Qf(z.target);
            this.c = {};
            this.g = h.b
        }
        D = Ua(tb(u), Number);
        gb(D);
        var A = {},
            sa;
        J = 0;
        for (H = D.length; J < H; ++J) {
            P = D[J];
            P in this.c ? z = this.c[P] : (z = k.cd(r, P), z = new Hp(k, z), A[P] = !0, this.c[P] = z);
            P = u[P];
            for (sa in P) {
                y = z;
                K = P[sa];
                var Oa = n,
                    N = K.b,
                    za = N[0],
                    cb = N[1],
                    Ga = N[2],
                    N = ef(N);
                if (!(N in y.a)) {
                    var za = ld(y.d.na(za), y.i),
                        Bb = K.Ma(y),
                        $a = Bb.style;
                    $a.maxWidth = "none";
                    var Ic = void 0,
                        lc = void 0;
                    0 < Oa ? (Ic = Mf("DIV"), lc = Ic.style, lc.overflow = "hidden", lc.width = za[0] + "px", lc.height = za[1] + "px", $a.position = "absolute", $a.left = -Oa + "px", $a.top = -Oa + "px", $a.width = za[0] + 2 * Oa + "px", $a.height = za[1] + 2 * Oa + "px", Ic.appendChild(Bb)) : ($a.width = za[0] + "px", $a.height = za[1] + "px", Ic = Bb, lc = $a);
                    lc.position = "absolute";
                    lc.left = (cb - y.c[1]) * za[0] + "px";
                    lc.top = (y.c[2] - Ga) * za[1] + "px";
                    null === y.b && (y.b = document.createDocumentFragment());
                    y.b.appendChild(Ic);
                    y.a[N] = K
                }
            }
            null !== z.b && (z.target.appendChild(z.b), z.b = null)
        }
        n = Ua(tb(this.c), Number);
        gb(n);
        J = zd();
        sa = 0;
        for (D = n.length; sa < D; ++sa)
            if (P = n[sa], z = this.c[P], P in u)
                if (y = z.g, H = z.f, qj(J, a.size[0] / 2, a.size[1] / 2, y / e.resolution, y / e.resolution, e.rotation, (H[0] - r[0]) / y, (r[1] - H[1]) / y), H = z, y = J, rj(y, H.e) || (fi(H.target, y), Cd(H.e, y)), P in A) {
                    for (--P; 0 <= P; --P)
                        if (P in this.c) {
                            H = this.c[P].target;
                            H.parentNode && H.parentNode.insertBefore(z.target, H.nextSibling);
                            break
                        }
                    0 > P && Pf(this.target, z.target, 0)
                } else {
                    if (!a.viewHints[0] && !a.viewHints[1]) {
                        K = Pg(z.d, t, z.c[0], B);
                        P = [];
                        y = H = void 0;
                        for (y in z.a) H = z.a[y],
                            K.contains(H.b) || P.push(H);
                        Oa = K = void 0;
                        K = 0;
                        for (Oa = P.length; K < Oa; ++K) H = P[K], y = ef(H.b), Qf(H.Ma(z)), delete z.a[y]
                    }
                }
        else Qf(z.target), delete this.c[P];
        c.opacity != this.q && (this.q = this.target.style.opacity = c.opacity);
        c.visible && !this.d && (mg(this.target, !0), this.d = !0);
        Aj(a.usedTiles, h, p, q);
        Cj(a, h, k, d, f, t, p, g.a());
        xj(a, h);
        zj(a, h);
        return !0
    };

    function Hp(a, c) {
        this.target = Mf("DIV");
        this.target.style.position = "absolute";
        this.target.style.width = "100%";
        this.target.style.height = "100%";
        this.d = a;
        this.c = c;
        this.f = be(Og(a, c));
        this.g = a.ma(c[0]);
        this.a = {};
        this.b = null;
        this.e = Bd();
        this.i = [0, 0]
    };

    function Ip(a) {
        this.g = ai();
        var c = this.g.canvas;
        c.style.maxWidth = "none";
        c.style.position = "absolute";
        Ep.call(this, a, c);
        this.d = !1;
        this.n = -1;
        this.o = NaN;
        this.q = Kd();
        this.c = this.l = null;
        this.H = zd();
        this.p = zd()
    }
    w(Ip, Ep);
    Ip.prototype.i = function(a, c) {
        var d = a.viewState,
            e = d.center,
            f = d.rotation,
            g = d.resolution,
            d = a.pixelRatio,
            h = a.size[0],
            k = a.size[1],
            n = h * d,
            p = k * d,
            e = qj(this.H, d * h / 2, d * k / 2, d / g, -d / g, -f, -e[0], -e[1]),
            g = this.g;
        g.canvas.width = n;
        g.canvas.height = p;
        h = qj(this.p, 0, 0, 1 / d, 1 / d, 0, -(n - h) / 2 * d, -(p - k) / 2 * d);
        fi(g.canvas, h);
        Jp(this, "precompose", a, e);
        h = this.c;
        null === h || h.la() || (g.globalAlpha = c.opacity, Jm(h, g, d, e, f, a.skippedFeatureUids), Jp(this, "render", a, e));
        Jp(this, "postcompose", a, e)
    };

    function Jp(a, c, d, e) {
        var f = a.g;
        a = a.a;
        bd(a, c) && (e = new cm(f, d.pixelRatio, d.extent, e, d.viewState.rotation), a.dispatchEvent(new il(c, a, e, null, d, f, null)), om(e))
    }
    Ip.prototype.Pa = function(a, c, d, e) {
        if (null !== this.c) {
            var f = this.a,
                g = {};
            return this.c.c(a, c.viewState.resolution, c.viewState.rotation, c.skippedFeatureUids, function(a) {
                var c = ma(a).toString();
                if (!(c in g)) return g[c] = !0, d.call(e, a, f)
            })
        }
    };
    Ip.prototype.J = function() {
        vj(this)
    };
    Ip.prototype.f = function(a) {
        function c(a) {
            var c;
            m(a.c) ? c = a.c.call(a, n) : m(d.a) && (c = (0, d.a)(a, n));
            if (null != c) {
                if (null != c) {
                    var e, f, g = !1;
                    e = 0;
                    for (f = c.length; e < f; ++e) g = fn(q, a, c[e], en(n, p), this.J, this) || g;
                    a = g
                } else a = !1;
                this.d = this.d || a
            }
        }
        var d = this.a,
            e = d.da();
        yj(a.attributions, e.d);
        zj(a, e);
        var f = a.viewHints[0],
            g = a.viewHints[1],
            h = d.o,
            k = d.n;
        if (!this.d && !h && f || !k && g) return !0;
        var g = a.extent,
            h = a.viewState,
            f = h.projection,
            n = h.resolution,
            p = a.pixelRatio;
        a = d.b;
        k = d.c;
        h = d.get("renderOrder");
        m(h) || (h = dn);
        g = Od(g, k * n);
        if (!this.d && this.o == n && this.n == a && this.l == h && Rd(this.q, g)) return !0;
        qc(this.c);
        this.c = null;
        this.d = !1;
        var q = new Fm(.5 * n / p, g, n, d.c);
        e.ac(g, n, f);
        if (null === h) e.Ab(g, n, c, this);
        else {
            var r = [];
            e.Ab(g, n, function(a) {
                r.push(a)
            }, this);
            gb(r, h);
            Sa(r, c, this)
        }
        Gm(q);
        this.o = n;
        this.n = a;
        this.l = h;
        this.q = g;
        this.c = q;
        return !0
    };

    function Kp(a, c) {
        Ij.call(this, 0, c);
        this.a = null;
        this.a = ai();
        var d = this.a.canvas;
        d.style.position = "absolute";
        d.style.width = "100%";
        d.style.height = "100%";
        d.className = "ol-unselectable";
        Pf(a, d, 0);
        this.e = zd();
        this.b = Mf("DIV");
        this.b.className = "ol-unselectable";
        d = this.b.style;
        d.position = "absolute";
        d.width = "100%";
        d.height = "100%";
        x(this.b, "touchstart", tc);
        Pf(a, this.b, 0);
        this.d = !0
    }
    w(Kp, Ij);
    Kp.prototype.O = function() {
        Qf(this.b);
        Kp.S.O.call(this)
    };
    Kp.prototype.Ke = function(a) {
        if (a instanceof I) a = new Fp(a);
        else if (a instanceof L) a = new Gp(a);
        else if (a instanceof M) a = new Ip(a);
        else return null;
        return a
    };

    function Lp(a, c, d) {
        var e = a.g;
        if (bd(e, c)) {
            var f = d.extent,
                g = d.pixelRatio,
                h = d.viewState,
                k = h.resolution,
                n = h.rotation,
                p = a.a,
                q = p.canvas;
            qj(a.e, q.width / 2, q.height / 2, g / h.resolution, -g / h.resolution, -h.rotation, -h.center[0], -h.center[1]);
            h = new cm(p, g, f, a.e, n);
            f = new Fm(.5 * k / g, f, k);
            e.dispatchEvent(new il(c, e, h, f, d, p, null));
            Gm(f);
            f.la() || Jm(f, p, g, a.e, n, {});
            om(h);
            a.c = f
        }
    }
    Kp.prototype.M = function() {
        return "dom"
    };
    Kp.prototype.ue = function(a) {
        if (null === a) this.d && (mg(this.b, !1), this.d = !1);
        else {
            var c;
            c = function(a, c) {
                Pf(this.b, a, c)
            };
            var d = this.g;
            if (bd(d, "precompose") || bd(d, "postcompose")) {
                var d = this.a.canvas,
                    e = a.pixelRatio;
                d.width = a.size[0] * e;
                d.height = a.size[1] * e
            }
            Lp(this, "precompose", a);
            var d = a.layerStatesArray,
                e = a.viewState.resolution,
                f, g, h, k;
            f = 0;
            for (g = d.length; f < g; ++f) k = d[f], h = k.layer, h = Lj(this, h), c.call(this, h.target, f), oj(k, e) && "ready" == k.i ? h.f(a, k) && h.i(a, k) : h.e();
            c = a.layerStates;
            for (var n in this.f) n in c || (h = this.f[n], Qf(h.target));
            this.d || (mg(this.b, !0), this.d = !0);
            Jj(a);
            Mj(this, a);
            a.postRenderFunctions.push(Kj);
            Lp(this, "postcompose", a)
        }
    };

    function Mp(a) {
        this.b = a
    }

    function Np(a) {
        this.b = a
    }
    w(Np, Mp);
    Np.prototype.M = function() {
        return 35632
    };

    function Op(a) {
        this.b = a
    }
    w(Op, Mp);
    Op.prototype.M = function() {
        return 35633
    };

    function Pp() {
        this.b = "precision mediump float;varying vec2 a;varying float b;uniform mat4 k;uniform float l;uniform sampler2D m;void main(void){vec4 texColor=texture2D(m,a);float alpha=texColor.a*b*l;if(alpha==0.0){discard;}gl_FragColor.a=alpha;gl_FragColor.rgb=(k*vec4(texColor.rgb,1.)).rgb;}"
    }
    w(Pp, Np);
    da(Pp);

    function Qp() {
        this.b = "varying vec2 a;varying float b;attribute vec2 c;attribute vec2 d;attribute vec2 e;attribute float f;attribute float g;uniform mat4 h;uniform mat4 i;uniform mat4 j;void main(void){mat4 offsetMatrix=i;if(g==1.0){offsetMatrix=i*j;}vec4 offsets=offsetMatrix*vec4(e,0.,0.);gl_Position=h*vec4(c,0.,1.)+offsets;a=d;b=f;}"
    }
    w(Qp, Op);
    da(Qp);

    function Rp(a, c) {
        this.l = a.getUniformLocation(c, "k");
        this.i = a.getUniformLocation(c, "j");
        this.q = a.getUniformLocation(c, "i");
        this.f = a.getUniformLocation(c, "l");
        this.g = a.getUniformLocation(c, "h");
        this.b = a.getAttribLocation(c, "e");
        this.a = a.getAttribLocation(c, "f");
        this.d = a.getAttribLocation(c, "c");
        this.c = a.getAttribLocation(c, "g");
        this.e = a.getAttribLocation(c, "d")
    };

    function Sp() {
        this.b = "precision mediump float;varying vec2 a;varying float b;uniform float k;uniform sampler2D l;void main(void){vec4 texColor=texture2D(l,a);gl_FragColor.rgb=texColor.rgb;float alpha=texColor.a*b*k;if(alpha==0.0){discard;}gl_FragColor.a=alpha;}"
    }
    w(Sp, Np);
    da(Sp);

    function Tp() {
        this.b = "varying vec2 a;varying float b;attribute vec2 c;attribute vec2 d;attribute vec2 e;attribute float f;attribute float g;uniform mat4 h;uniform mat4 i;uniform mat4 j;void main(void){mat4 offsetMatrix=i;if(g==1.0){offsetMatrix=i*j;}vec4 offsets=offsetMatrix*vec4(e,0.,0.);gl_Position=h*vec4(c,0.,1.)+offsets;a=d;b=f;}"
    }
    w(Tp, Op);
    da(Tp);

    function Up(a, c) {
        this.i = a.getUniformLocation(c, "j");
        this.q = a.getUniformLocation(c, "i");
        this.f = a.getUniformLocation(c, "k");
        this.g = a.getUniformLocation(c, "h");
        this.b = a.getAttribLocation(c, "e");
        this.a = a.getAttribLocation(c, "f");
        this.d = a.getAttribLocation(c, "c");
        this.c = a.getAttribLocation(c, "g");
        this.e = a.getAttribLocation(c, "d")
    };

    function Vp(a) {
        this.b = m(a) ? a : [];
        this.a = m(void 0) ? void 0 : 35044
    };

    function Wp(a, c) {
        this.l = a;
        this.b = c;
        this.a = {};
        this.f = {};
        this.e = {};
        this.i = this.q = this.d = this.g = null;
        (this.c = Ya(wa, "OES_element_index_uint")) && c.getExtension("OES_element_index_uint");
        x(this.l, "webglcontextlost", this.Ym, !1, this);
        x(this.l, "webglcontextrestored", this.Zm, !1, this)
    }

    function Xp(a, c, d) {
        var e = a.b,
            f = d.b,
            g = ma(d);
        if (g in a.a) e.bindBuffer(c, a.a[g].buffer);
        else {
            var h = e.createBuffer();
            e.bindBuffer(c, h);
            var k;
            34962 == c ? k = new Float32Array(f) : 34963 == c && (k = a.c ? new Uint32Array(f) : new Uint16Array(f));
            e.bufferData(c, k, d.a);
            a.a[g] = {
                c: d,
                buffer: h
            }
        }
    }

    function Yp(a, c) {
        var d = a.b,
            e = ma(c),
            f = a.a[e];
        d.isContextLost() || d.deleteBuffer(f.buffer);
        delete a.a[e]
    }
    l = Wp.prototype;
    l.O = function() {
        var a = this.b;
        a.isContextLost() || (pb(this.a, function(c) {
            a.deleteBuffer(c.buffer)
        }), pb(this.e, function(c) {
            a.deleteProgram(c)
        }), pb(this.f, function(c) {
            a.deleteShader(c)
        }), a.deleteFramebuffer(this.d), a.deleteRenderbuffer(this.i), a.deleteTexture(this.q))
    };
    l.Xm = function() {
        return this.b
    };
    l.Te = function() {
        if (null === this.d) {
            var a = this.b,
                c = a.createFramebuffer();
            a.bindFramebuffer(a.FRAMEBUFFER, c);
            var d = Zp(a, 1, 1),
                e = a.createRenderbuffer();
            a.bindRenderbuffer(a.RENDERBUFFER, e);
            a.renderbufferStorage(a.RENDERBUFFER, a.DEPTH_COMPONENT16, 1, 1);
            a.framebufferTexture2D(a.FRAMEBUFFER, a.COLOR_ATTACHMENT0, a.TEXTURE_2D, d, 0);
            a.framebufferRenderbuffer(a.FRAMEBUFFER, a.DEPTH_ATTACHMENT, a.RENDERBUFFER, e);
            a.bindTexture(a.TEXTURE_2D, null);
            a.bindRenderbuffer(a.RENDERBUFFER, null);
            a.bindFramebuffer(a.FRAMEBUFFER, null);
            this.d = c;
            this.q = d;
            this.i = e
        }
        return this.d
    };

    function $p(a, c) {
        var d = ma(c);
        if (d in a.f) return a.f[d];
        var e = a.b,
            f = e.createShader(c.M());
        e.shaderSource(f, c.b);
        e.compileShader(f);
        return a.f[d] = f
    }

    function aq(a, c, d) {
        var e = ma(c) + "/" + ma(d);
        if (e in a.e) return a.e[e];
        var f = a.b,
            g = f.createProgram();
        f.attachShader(g, $p(a, c));
        f.attachShader(g, $p(a, d));
        f.linkProgram(g);
        return a.e[e] = g
    }
    l.Ym = function() {
        yb(this.a);
        yb(this.f);
        yb(this.e);
        this.i = this.q = this.d = this.g = null
    };
    l.Zm = function() {};
    l.oe = function(a) {
        if (a == this.g) return !1;
        this.b.useProgram(a);
        this.g = a;
        return !0
    };

    function bq(a, c, d) {
        var e = a.createTexture();
        a.bindTexture(a.TEXTURE_2D, e);
        a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.LINEAR);
        a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.LINEAR);
        m(c) && a.texParameteri(3553, 10242, c);
        m(d) && a.texParameteri(3553, 10243, d);
        return e
    }

    function Zp(a, c, d) {
        var e = bq(a, void 0, void 0);
        a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, c, d, 0, a.RGBA, a.UNSIGNED_BYTE, null);
        return e
    }

    function cq(a, c) {
        var d = bq(a, 33071, 33071);
        a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, a.RGBA, a.UNSIGNED_BYTE, c);
        return d
    };

    function dq(a, c) {
        this.n = this.V = void 0;
        this.wb = new xf;
        this.q = ce(c);
        this.U = [];
        this.f = [];
        this.J = void 0;
        this.e = [];
        this.d = [];
        this.N = this.L = void 0;
        this.a = [];
        this.H = this.p = this.i = null;
        this.T = void 0;
        this.rc = Bd();
        this.vb = Bd();
        this.X = this.sa = void 0;
        this.xb = Bd();
        this.Fa = this.oa = this.ba = void 0;
        this.Ra = [];
        this.g = [];
        this.b = [];
        this.o = null;
        this.c = [];
        this.l = [];
        this.Ga = void 0
    }
    w(dq, hl);

    function eq(a, c) {
        var d = a.o,
            e = a.i,
            f = a.Ra,
            g = a.g,
            h = c.b;
        return function() {
            if (!h.isContextLost()) {
                var a, n;
                a = 0;
                for (n = f.length; a < n; ++a) h.deleteTexture(f[a]);
                a = 0;
                for (n = g.length; a < n; ++a) h.deleteTexture(g[a])
            }
            Yp(c, d);
            Yp(c, e)
        }
    }

    function fq(a, c, d, e) {
        var f = a.V,
            g = a.n,
            h = a.J,
            k = a.L,
            n = a.N,
            p = a.T,
            q = a.sa,
            r = a.X,
            t = a.ba ? 1 : 0,
            u = a.oa,
            A = a.Fa,
            z = a.Ga,
            D = Math.cos(u),
            u = Math.sin(u),
            B = a.a.length,
            y = a.b.length,
            K, J, H, P, sa, Oa;
        for (K = 0; K < d; K += e) sa = c[K] - a.q[0], Oa = c[K + 1] - a.q[1], J = y / 8, H = -A * f, P = -A * (h - g), a.b[y++] = sa, a.b[y++] = Oa, a.b[y++] = H * D - P * u, a.b[y++] = H * u + P * D, a.b[y++] = q / n, a.b[y++] = (r + h) / k, a.b[y++] = p, a.b[y++] = t, H = A * (z - f), P = -A * (h - g), a.b[y++] = sa, a.b[y++] = Oa, a.b[y++] = H * D - P * u, a.b[y++] = H * u + P * D, a.b[y++] = (q + z) / n, a.b[y++] = (r + h) / k, a.b[y++] = p, a.b[y++] = t, H = A * (z - f),
            P = A * g, a.b[y++] = sa, a.b[y++] = Oa, a.b[y++] = H * D - P * u, a.b[y++] = H * u + P * D, a.b[y++] = (q + z) / n, a.b[y++] = r / k, a.b[y++] = p, a.b[y++] = t, H = -A * f, P = A * g, a.b[y++] = sa, a.b[y++] = Oa, a.b[y++] = H * D - P * u, a.b[y++] = H * u + P * D, a.b[y++] = q / n, a.b[y++] = r / k, a.b[y++] = p, a.b[y++] = t, a.a[B++] = J, a.a[B++] = J + 1, a.a[B++] = J + 2, a.a[B++] = J, a.a[B++] = J + 2, a.a[B++] = J + 3
    }
    dq.prototype.jb = function(a, c) {
        this.c.push(this.a.length);
        this.l.push(c);
        var d = a.j;
        fq(this, d, d.length, a.s)
    };
    dq.prototype.kb = function(a, c) {
        this.c.push(this.a.length);
        this.l.push(c);
        var d = a.j;
        fq(this, d, d.length, a.s)
    };

    function gq(a, c) {
        var d = c.b;
        a.U.push(a.a.length);
        a.f.push(a.a.length);
        a.o = new Vp(a.b);
        Xp(c, 34962, a.o);
        a.i = new Vp(a.a);
        Xp(c, 34963, a.i);
        var e = {};
        hq(a.Ra, a.e, e, d);
        hq(a.g, a.d, e, d);
        a.V = void 0;
        a.n = void 0;
        a.J = void 0;
        a.e = null;
        a.d = null;
        a.L = void 0;
        a.N = void 0;
        a.a = null;
        a.T = void 0;
        a.sa = void 0;
        a.X = void 0;
        a.ba = void 0;
        a.oa = void 0;
        a.Fa = void 0;
        a.b = null;
        a.Ga = void 0
    }

    function hq(a, c, d, e) {
        var f, g, h, k = c.length;
        for (h = 0; h < k; ++h) f = c[h], g = ma(f).toString(), g in d ? f = d[g] : (f = cq(e, f), d[g] = f), a[h] = f
    }

    function iq(a, c, d, e, f, g, h, k, n, p, q, r, t, u, A) {
        var z = c.b;
        Xp(c, 34962, a.o);
        Xp(c, 34963, a.i);
        var D = k || 1 != n || p || 1 != q,
            B, y;
        D ? (B = Pp.Ia(), y = Qp.Ia()) : (B = Sp.Ia(), y = Tp.Ia());
        y = aq(c, B, y);
        D ? null === a.p ? (B = new Rp(z, y), a.p = B) : B = a.p : null === a.H ? (B = new Up(z, y), a.H = B) : B = a.H;
        c.oe(y);
        z.enableVertexAttribArray(B.d);
        z.vertexAttribPointer(B.d, 2, 5126, !1, 32, 0);
        z.enableVertexAttribArray(B.b);
        z.vertexAttribPointer(B.b, 2, 5126, !1, 32, 8);
        z.enableVertexAttribArray(B.e);
        z.vertexAttribPointer(B.e, 2, 5126, !1, 32, 16);
        z.enableVertexAttribArray(B.a);
        z.vertexAttribPointer(B.a, 1, 5126, !1, 32, 24);
        z.enableVertexAttribArray(B.c);
        z.vertexAttribPointer(B.c, 1, 5126, !1, 32, 28);
        y = a.xb;
        qj(y, 0, 0, 2 / (e * g[0]), 2 / (e * g[1]), -f, -(d[0] - a.q[0]), -(d[1] - a.q[1]));
        d = a.vb;
        e = 2 / g[0];
        g = 2 / g[1];
        Dd(d);
        d[0] = e;
        d[5] = g;
        d[10] = 1;
        d[15] = 1;
        g = a.rc;
        Dd(g);
        0 !== f && Id(g, -f);
        z.uniformMatrix4fv(B.g, !1, y);
        z.uniformMatrix4fv(B.q, !1, d);
        z.uniformMatrix4fv(B.i, !1, g);
        z.uniform1f(B.f, h);
        D && z.uniformMatrix4fv(B.l, !1, yf(a.wb, k, n, p, q));
        var K;
        if (m(t)) {
            if (u) a: {
                f = c.c ? 5125 : 5123;c = c.c ? 4 : 2;p = a.c.length - 1;
                for (h = a.g.length - 1; 0 <= h; --h)
                    for (z.bindTexture(3553, a.g[h]), k = 0 < h ? a.f[h - 1] : 0, q = a.f[h]; 0 <= p && a.c[p] >= k;) {
                        n = a.c[p];
                        u = a.l[p];
                        D = ma(u).toString();
                        if (!m(r[D]) && (!m(A) || he(A, u.Q().G())) && (z.clear(z.COLOR_BUFFER_BIT | z.DEPTH_BUFFER_BIT), z.drawElements(4, q - n, f, n * c), q = t(u))) {
                            a = q;
                            break a
                        }
                        q = n;
                        p--
                    }
                a = void 0
            }
            else z.clear(z.COLOR_BUFFER_BIT | z.DEPTH_BUFFER_BIT), jq(a, z, c, r, a.g, a.f), a = (a = t(null)) ? a : void 0;
            K = a
        } else jq(a, z, c, r, a.Ra, a.U);
        z.disableVertexAttribArray(B.d);
        z.disableVertexAttribArray(B.b);
        z.disableVertexAttribArray(B.e);
        z.disableVertexAttribArray(B.a);
        z.disableVertexAttribArray(B.c);
        return K
    }

    function jq(a, c, d, e, f, g) {
        var h = d.c ? 5125 : 5123;
        d = d.c ? 4 : 2;
        if (xb(e)) {
            var k;
            a = 0;
            e = f.length;
            for (k = 0; a < e; ++a) {
                c.bindTexture(3553, f[a]);
                var n = g[a];
                c.drawElements(4, n - k, h, k * d);
                k = n
            }
        } else {
            k = 0;
            var p, n = 0;
            for (p = f.length; n < p; ++n) {
                c.bindTexture(3553, f[n]);
                for (var q = 0 < n ? g[n - 1] : 0, r = g[n], t = q; k < a.c.length && a.c[k] <= r;) {
                    var u = ma(a.l[k]).toString();
                    m(e[u]) ? (t !== q && c.drawElements(4, q - t, h, t * d), q = t = k === a.c.length - 1 ? r : a.c[k + 1]) : q = k === a.c.length - 1 ? r : a.c[k + 1];
                    k++
                }
                t !== q && c.drawElements(4, q - t, h, t * d)
            }
        }
    }
    dq.prototype.Za = function(a) {
        var c = a.mb(),
            d = a.Lb(1),
            e = a.Dd(),
            f = a.he(1),
            g = a.U,
            h = a.rb(),
            k = a.V,
            n = a.q,
            p = a.Xa();
        a = a.l;
        var q;
        0 === this.e.length ? this.e.push(d) : (q = this.e[this.e.length - 1], ma(q) != ma(d) && (this.U.push(this.a.length), this.e.push(d)));
        0 === this.d.length ? this.d.push(f) : (q = this.d[this.d.length - 1], ma(q) != ma(f) && (this.f.push(this.a.length), this.d.push(f)));
        this.V = c[0];
        this.n = c[1];
        this.J = p[1];
        this.L = e[1];
        this.N = e[0];
        this.T = g;
        this.sa = h[0];
        this.X = h[1];
        this.oa = n;
        this.ba = k;
        this.Fa = a;
        this.Ga = p[0]
    };

    function kq(a, c, d) {
        this.e = c;
        this.f = a;
        this.d = d;
        this.a = {}
    }

    function lq(a, c) {
        var d = [],
            e;
        for (e in a.a) d.push(eq(a.a[e], c));
        return Kg.apply(null, d)
    }

    function mq(a, c) {
        for (var d in a.a) gq(a.a[d], c)
    }
    kq.prototype.b = function(a, c) {
        var d = this.a[c];
        m(d) || (d = new nq[c](this.f, this.e), this.a[c] = d);
        return d
    };
    kq.prototype.la = function() {
        return xb(this.a)
    };

    function oq(a, c, d, e, f, g, h, k, n, p, q, r, t, u) {
        var A = pq,
            z, D;
        for (z = pm.length - 1; 0 <= z; --z)
            if (D = a.a[pm[z]], m(D) && (D = iq(D, c, d, e, f, A, g, h, k, n, p, q, r, t, u))) return D
    }
    kq.prototype.c = function(a, c, d, e, f, g, h, k, n, p, q, r, t, u) {
        var A = c.b;
        A.bindFramebuffer(A.FRAMEBUFFER, c.Te());
        var z;
        m(this.d) && (z = Od(Ud(a), e * this.d));
        return oq(this, c, a, e, f, k, n, p, q, r, t, function(a) {
            var c = new Uint8Array(4);
            A.readPixels(0, 0, 1, 1, A.RGBA, A.UNSIGNED_BYTE, c);
            if (0 < c[3] && (a = u(a))) return a
        }, !0, z)
    };

    function qq(a, c, d, e, f, g, h, k, n, p, q) {
        var r = d.b;
        r.bindFramebuffer(r.FRAMEBUFFER, d.Te());
        a = oq(a, d, c, e, f, g, h, k, n, p, q, function() {
            var a = new Uint8Array(4);
            r.readPixels(0, 0, 1, 1, r.RGBA, r.UNSIGNED_BYTE, a);
            return 0 < a[3]
        }, !1);
        return m(a)
    }
    var nq = {
            Image: dq
        },
        pq = [1, 1];

    function rq(a, c, d, e, f, g) {
        this.a = a;
        this.e = c;
        this.d = g;
        this.i = f;
        this.g = e;
        this.f = d;
        this.c = null;
        this.b = {}
    }
    w(rq, hl);
    l = rq.prototype;
    l.tc = function(a, c) {
        var d = a.toString(),
            e = this.b[d];
        m(e) ? e.push(c) : this.b[d] = [c]
    };
    l.uc = function() {};
    l.Le = function(a, c) {
        var d = (0, c.d)(a);
        if (null != d && he(this.d, d.G())) {
            var e = c.b;
            m(e) || (e = 0);
            this.tc(e, function(a) {
                a.Aa(c.e, c.c);
                a.Za(c.f);
                a.Ba(c.a);
                var e = sq[d.M()];
                e && e.call(a, d, null)
            })
        }
    };
    l.zd = function(a, c) {
        var d = a.d,
            e, f;
        e = 0;
        for (f = d.length; e < f; ++e) {
            var g = d[e],
                h = sq[g.M()];
            h && h.call(this, g, c)
        }
    };
    l.kb = function(a, c) {
        var d = this.a,
            e = (new kq(1, this.d)).b(0, "Image");
        e.Za(this.c);
        e.kb(a, c);
        gq(e, d);
        iq(e, this.a, this.e, this.f, this.g, this.i, 1, 0, 1, 0, 1, {}, void 0, !1);
        eq(e, d)()
    };
    l.zb = function() {};
    l.vc = function() {};
    l.jb = function(a, c) {
        var d = this.a,
            e = (new kq(1, this.d)).b(0, "Image");
        e.Za(this.c);
        e.jb(a, c);
        gq(e, d);
        iq(e, this.a, this.e, this.f, this.g, this.i, 1, 0, 1, 0, 1, {}, void 0, !1);
        eq(e, d)()
    };
    l.wc = function() {};
    l.Rb = function() {};
    l.lb = function() {};
    l.Aa = function() {};
    l.Za = function(a) {
        this.c = a
    };
    l.Ba = function() {};
    var sq = {
        Point: rq.prototype.kb,
        MultiPoint: rq.prototype.jb,
        GeometryCollection: rq.prototype.zd
    };

    function tq() {
        this.b = "precision mediump float;varying vec2 a;uniform mat4 f;uniform float g;uniform sampler2D h;void main(void){vec4 texColor=texture2D(h,a);gl_FragColor.rgb=(f*vec4(texColor.rgb,1.)).rgb;gl_FragColor.a=texColor.a*g;}"
    }
    w(tq, Np);
    da(tq);

    function uq() {
        this.b = "varying vec2 a;attribute vec2 b;attribute vec2 c;uniform mat4 d;uniform mat4 e;void main(void){gl_Position=e*vec4(b,0.,1.);a=(d*vec4(c,0.,1.)).st;}"
    }
    w(uq, Op);
    da(uq);

    function vq(a, c) {
        this.g = a.getUniformLocation(c, "f");
        this.c = a.getUniformLocation(c, "g");
        this.d = a.getUniformLocation(c, "e");
        this.f = a.getUniformLocation(c, "d");
        this.e = a.getUniformLocation(c, "h");
        this.b = a.getAttribLocation(c, "b");
        this.a = a.getAttribLocation(c, "c")
    };

    function wq() {
        this.b = "precision mediump float;varying vec2 a;uniform float f;uniform sampler2D g;void main(void){vec4 texColor=texture2D(g,a);gl_FragColor.rgb=texColor.rgb;gl_FragColor.a=texColor.a*f;}"
    }
    w(wq, Np);
    da(wq);

    function xq() {
        this.b = "varying vec2 a;attribute vec2 b;attribute vec2 c;uniform mat4 d;uniform mat4 e;void main(void){gl_Position=e*vec4(b,0.,1.);a=(d*vec4(c,0.,1.)).st;}"
    }
    w(xq, Op);
    da(xq);

    function yq(a, c) {
        this.c = a.getUniformLocation(c, "f");
        this.d = a.getUniformLocation(c, "e");
        this.f = a.getUniformLocation(c, "d");
        this.e = a.getUniformLocation(c, "g");
        this.b = a.getAttribLocation(c, "b");
        this.a = a.getAttribLocation(c, "c")
    };

    function zq(a, c) {
        uj.call(this, c);
        this.c = a;
        this.N = new Vp([-1, -1, 0, 0, 1, -1, 1, 0, -1, 1, 0, 1, 1, 1, 1, 1]);
        this.e = this.Qa = null;
        this.f = void 0;
        this.q = zd();
        this.n = Bd();
        this.T = new xf;
        this.o = this.l = null
    }
    w(zq, uj);

    function Aq(a, c, d) {
        var e = a.c.e;
        if (m(a.f) && a.f == d) e.bindFramebuffer(36160, a.e);
        else {
            c.postRenderFunctions.push(ta(function(a, c, d) {
                a.isContextLost() || (a.deleteFramebuffer(c), a.deleteTexture(d))
            }, e, a.e, a.Qa));
            c = Zp(e, d, d);
            var f = e.createFramebuffer();
            e.bindFramebuffer(36160, f);
            e.framebufferTexture2D(36160, 36064, 3553, c, 0);
            a.Qa = c;
            a.e = f;
            a.f = d
        }
    }
    zq.prototype.Lg = function(a, c, d) {
        Bq(this, "precompose", d, a);
        Xp(d, 34962, this.N);
        var e = d.b,
            f = c.brightness || 1 != c.contrast || c.hue || 1 != c.saturation,
            g, h;
        f ? (g = tq.Ia(), h = uq.Ia()) : (g = wq.Ia(), h = xq.Ia());
        g = aq(d, g, h);
        f ? null === this.l ? this.l = h = new vq(e, g) : h = this.l : null === this.o ? this.o = h = new yq(e, g) : h = this.o;
        d.oe(g) && (e.enableVertexAttribArray(h.b), e.vertexAttribPointer(h.b, 2, 5126, !1, 16, 0), e.enableVertexAttribArray(h.a), e.vertexAttribPointer(h.a, 2, 5126, !1, 16, 8), e.uniform1i(h.e, 0));
        e.uniformMatrix4fv(h.f, !1, this.q);
        e.uniformMatrix4fv(h.d, !1, this.n);
        f && e.uniformMatrix4fv(h.g, !1, yf(this.T, c.brightness, c.contrast, c.hue, c.saturation));
        e.uniform1f(h.c, c.opacity);
        e.bindTexture(3553, this.Qa);
        e.drawArrays(5, 0, 4);
        Bq(this, "postcompose", d, a)
    };

    function Bq(a, c, d, e) {
        a = a.a;
        if (bd(a, c)) {
            var f = e.viewState;
            a.dispatchEvent(new il(c, a, new rq(d, f.center, f.resolution, f.rotation, e.size, e.extent), null, e, null, d))
        }
    }
    zq.prototype.gf = function() {
        this.e = this.Qa = null;
        this.f = void 0
    };

    function Cq(a, c) {
        zq.call(this, a, c);
        this.i = this.g = this.d = null
    }
    w(Cq, zq);

    function Dq(a, c) {
        var d = c.b();
        return cq(a.c.e, d)
    }
    Cq.prototype.Pa = function(a, c, d, e) {
        var f = this.a;
        return f.da().ge(a, c.viewState.resolution, c.viewState.rotation, c.skippedFeatureUids, function(a) {
            return d.call(e, a, f)
        })
    };
    Cq.prototype.hf = function(a, c) {
        var d = this.c.e,
            e = a.pixelRatio,
            f = a.viewState,
            g = f.center,
            h = f.resolution,
            k = f.rotation,
            n = this.d,
            p = this.Qa,
            q = this.a.da(),
            r = a.viewHints,
            t = a.extent;
        m(c.extent) && (t = ge(t, c.extent));
        r[0] || r[1] || je(t) || (f = f.projection, r = q.f, null === r || (f = r), t = q.Cc(t, h, e, f), null !== t && wj(this, t) && (n = t, p = Dq(this, t), null === this.Qa || a.postRenderFunctions.push(ta(function(a, c) {
            a.isContextLost() || a.deleteTexture(c)
        }, d, this.Qa))));
        null !== n && (d = this.c.d.l, Eq(this, d.width, d.height, e, g, h, k, n.G()), this.i = null, e = this.q, Dd(e), Hd(e, 1, -1), Gd(e, 0, -1), this.d = n, this.Qa = p, yj(a.attributions, n.f), zj(a, q));
        return !0
    };

    function Eq(a, c, d, e, f, g, h, k) {
        c *= g;
        d *= g;
        a = a.n;
        Dd(a);
        Hd(a, 2 * e / c, 2 * e / d);
        Id(a, -h);
        Gd(a, k[0] - f[0], k[1] - f[1]);
        Hd(a, (k[2] - k[0]) / 2, (k[3] - k[1]) / 2);
        Gd(a, 1, 1)
    }
    Cq.prototype.ee = function(a, c) {
        var d = this.Pa(a, c, Gg, this);
        return m(d)
    };
    Cq.prototype.dc = function(a, c, d, e) {
        if (null !== this.d && !fa(this.d.b()))
            if (this.a.da() instanceof xp) {
                if (a = a.slice(), sj(c.pixelToCoordinateMatrix, a, a), this.Pa(a, c, Gg, this)) return d.call(e, this.a)
            } else {
                var f = [this.d.b().width, this.d.b().height];
                if (null === this.i) {
                    var g = c.size;
                    c = zd();
                    Dd(c);
                    Gd(c, -1, -1);
                    Hd(c, 2 / g[0], 2 / g[1]);
                    Gd(c, 0, g[1]);
                    Hd(c, 1, -1);
                    g = zd();
                    Fd(this.n, g);
                    var h = zd();
                    Dd(h);
                    Gd(h, 0, f[1]);
                    Hd(h, 1, -1);
                    Hd(h, f[0] / 2, f[1] / 2);
                    Gd(h, 1, 1);
                    var k = zd();
                    Ed(h, g, k);
                    Ed(k, c, k);
                    this.i = k
                }
                c = [0, 0];
                sj(this.i, a, c);
                if (!(0 > c[0] || c[0] > f[0] || 0 > c[1] || c[1] > f[1]) && (null === this.g && (this.g = ai(1, 1)), this.g.clearRect(0, 0, 1, 1), this.g.drawImage(this.d.b(), c[0], c[1], 1, 1, 0, 0, 1, 1), 0 < this.g.getImageData(0, 0, 1, 1).data[3])) return d.call(e, this.a)
            }
    };

    function Fq() {
        this.b = "precision mediump float;varying vec2 a;uniform sampler2D e;void main(void){gl_FragColor=texture2D(e,a);}"
    }
    w(Fq, Np);
    da(Fq);

    function Gq() {
        this.b = "varying vec2 a;attribute vec2 b;attribute vec2 c;uniform vec4 d;void main(void){gl_Position=vec4(b*d.xy+d.zw,0.,1.);a=c;}"
    }
    w(Gq, Op);
    da(Gq);

    function Hq(a, c) {
        this.c = a.getUniformLocation(c, "e");
        this.d = a.getUniformLocation(c, "d");
        this.b = a.getAttribLocation(c, "b");
        this.a = a.getAttribLocation(c, "c")
    };

    function Iq(a, c) {
        zq.call(this, a, c);
        this.J = Fq.Ia();
        this.X = Gq.Ia();
        this.d = null;
        this.H = new Vp([0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0]);
        this.p = this.g = null;
        this.i = -1;
        this.L = [0, 0]
    }
    w(Iq, zq);
    l = Iq.prototype;
    l.O = function() {
        Yp(this.c.d, this.H);
        Iq.S.O.call(this)
    };
    l.yd = function(a, c) {
        var d = this.c;
        return function(e, f) {
            return $g(a, e, f, function(a) {
                var f = wg(d.a, a.gb());
                f && (c[e] || (c[e] = {}), c[e][a.b.toString()] = a);
                return f
            })
        }
    };
    l.gf = function() {
        Iq.S.gf.call(this);
        this.d = null
    };
    l.hf = function(a, c, d) {
        var e = this.c,
            f = d.b,
            g = a.viewState,
            h = g.projection,
            k = this.a,
            n = k.da(),
            p = ah(n, h),
            q = Tg(p, g.resolution),
            r = p.ma(q),
            t = n.Xb(q, a.pixelRatio, h),
            u = t[0] / ld(p.na(q), this.L)[0],
            A = r / u,
            z = n.Cd(),
            D = g.center,
            B;
        r == g.resolution ? (D = Bj(D, r, a.size), B = ee(D, r, g.rotation, a.size)) : B = a.extent;
        r = Qg(p, B, r);
        if (null !== this.g && jf(this.g, r) && this.i == n.b) A = this.p;
        else {
            var y = [kf(r), r.a - r.c + 1],
                y = Math.max(y[0] * t[0], y[1] * t[1]),
                K = Math.pow(2, Math.ceil(Math.log(y) / Math.LN2)),
                y = A * K,
                J = p.Mb(q),
                H = J[0] + r.b * t[0] * A,
                A = J[1] + r.c * t[1] * A,
                A = [H, A, H + y, A + y];
            Aq(this, a, K);
            f.viewport(0, 0, K, K);
            f.clearColor(0, 0, 0, 0);
            f.clear(16384);
            f.disable(3042);
            K = aq(d, this.J, this.X);
            d.oe(K);
            null === this.d && (this.d = new Hq(f, K));
            Xp(d, 34962, this.H);
            f.enableVertexAttribArray(this.d.b);
            f.vertexAttribPointer(this.d.b, 2, 5126, !1, 16, 0);
            f.enableVertexAttribArray(this.d.a);
            f.vertexAttribPointer(this.d.a, 2, 5126, !1, 16, 8);
            f.uniform1i(this.d.c, 0);
            d = {};
            d[q] = {};
            var P = this.yd(n, d),
                sa = k.c(),
                K = !0,
                H = Kd(),
                Oa = new ff(0, 0, 0, 0),
                N, za, cb;
            for (za = r.b; za <= r.d; ++za)
                for (cb = r.c; cb <= r.a; ++cb) {
                    J = n.Vb(q, za, cb, u, h);
                    if (m(c.extent) && (N = Og(p, J.b, H), !he(N, c.extent))) continue;
                    N = J.state;
                    if (2 == N) {
                        if (wg(e.a, J.gb())) {
                            d[q][ef(J.b)] = J;
                            continue
                        }
                    } else if (4 == N || 3 == N && !sa) continue;
                    K = !1;
                    N = p.Ad(J.b, P, null, Oa, H);
                    N || (J = p.Ld(J.b, Oa, H), null === J || P(q + 1, J))
                }
            c = Ua(tb(d), Number);
            gb(c);
            for (var P = new Float32Array(4), Ga, Bb, $a, sa = 0, Oa = c.length; sa < Oa; ++sa)
                for (Ga in Bb = d[c[sa]], Bb) J = Bb[Ga], N = Og(p, J.b, H), za = 2 * (N[2] - N[0]) / y, cb = 2 * (N[3] - N[1]) / y, $a = 2 * (N[0] - A[0]) / y - 1, N = 2 * (N[1] - A[1]) / y - 1, yd(P, za, cb, $a, N), f.uniform4fv(this.d.d, P), Jq(e, J, t, z * u), f.drawArrays(5, 0, 4);
            K ? (this.g = r, this.p = A, this.i = n.b) : (this.p = this.g = null, this.i = -1, a.animate = !0)
        }
        Aj(a.usedTiles, n, q, r);
        var Ic = e.q;
        Cj(a, n, p, u, h, B, q, k.a(), function(a) {
            var c;
            (c = 2 != a.state || wg(e.a, a.gb())) || (c = a.gb() in Ic.c);
            c || Dj(Ic, [a, Sg(p, a.b), p.ma(a.b[0]), t, z * u])
        }, this);
        xj(a, n);
        zj(a, n);
        f = this.q;
        Dd(f);
        Gd(f, (D[0] - A[0]) / (A[2] - A[0]), (D[1] - A[1]) / (A[3] - A[1]));
        0 !== g.rotation && Id(f, g.rotation);
        Hd(f, a.size[0] * g.resolution / (A[2] - A[0]), a.size[1] * g.resolution / (A[3] - A[1]));
        Gd(f, -.5, -.5);
        return !0
    };
    l.dc = function(a, c, d, e) {
        if (null !== this.e) {
            var f = [0, 0];
            sj(this.q, [a[0] / c.size[0], (c.size[1] - a[1]) / c.size[1]], f);
            a = [f[0] * this.f, f[1] * this.f];
            c = this.c.d.b;
            c.bindFramebuffer(c.FRAMEBUFFER, this.e);
            f = new Uint8Array(4);
            c.readPixels(a[0], a[1], 1, 1, c.RGBA, c.UNSIGNED_BYTE, f);
            if (0 < f[3]) return d.call(e, this.a)
        }
    };

    function Kq(a, c) {
        zq.call(this, a, c);
        this.i = !1;
        this.L = -1;
        this.J = NaN;
        this.p = Kd();
        this.g = this.d = this.H = null
    }
    w(Kq, zq);
    l = Kq.prototype;
    l.Lg = function(a, c, d) {
        this.g = c;
        var e = a.viewState,
            f = this.d;
        if (null !== f && !f.la()) {
            var g = e.center,
                h = e.resolution,
                e = e.rotation,
                k = a.size,
                n = c.opacity,
                p = c.brightness,
                q = c.contrast,
                r = c.hue;
            c = c.saturation;
            a = a.skippedFeatureUids;
            var t, u, A;
            t = 0;
            for (u = pm.length; t < u; ++t) A = f.a[pm[t]], m(A) && iq(A, d, g, h, e, k, n, p, q, r, c, a, void 0, !1)
        }
    };
    l.O = function() {
        var a = this.d;
        null !== a && (lq(a, this.c.d)(), this.d = null);
        Kq.S.O.call(this)
    };
    l.Pa = function(a, c, d, e) {
        if (null !== this.d && null !== this.g) {
            var f = c.viewState,
                g = this.a,
                h = this.g,
                k = {};
            return this.d.c(a, this.c.d, f.center, f.resolution, f.rotation, c.size, c.pixelRatio, h.opacity, h.brightness, h.contrast, h.hue, h.saturation, c.skippedFeatureUids, function(a) {
                var c = ma(a).toString();
                if (!(c in k)) return k[c] = !0, d.call(e, a, g)
            })
        }
    };
    l.ee = function(a, c) {
        if (null === this.d || null === this.g) return !1;
        var d = c.viewState,
            e = this.g;
        return qq(this.d, a, this.c.d, d.resolution, d.rotation, e.opacity, e.brightness, e.contrast, e.hue, e.saturation, c.skippedFeatureUids)
    };
    l.dc = function(a, c, d, e) {
        a = a.slice();
        sj(c.pixelToCoordinateMatrix, a, a);
        if (this.ee(a, c)) return d.call(e, this.a)
    };
    l.Rl = function() {
        vj(this)
    };
    l.hf = function(a, c, d) {
        function e(a) {
            var c;
            m(a.c) ? c = a.c.call(a, p) : m(f.a) && (c = (0, f.a)(a, p));
            if (null != c) {
                if (null != c) {
                    var d, e, g = !1;
                    d = 0;
                    for (e = c.length; d < e; ++d) g = fn(t, a, c[d], en(p, q), this.Rl, this) || g;
                    a = g
                } else a = !1;
                this.i = this.i || a
            }
        }
        var f = this.a;
        c = f.da();
        yj(a.attributions, c.d);
        zj(a, c);
        var g = a.viewHints[0],
            h = a.viewHints[1],
            k = f.o,
            n = f.n;
        if (!this.i && !k && g || !n && h) return !0;
        var h = a.extent,
            k = a.viewState,
            g = k.projection,
            p = k.resolution,
            q = a.pixelRatio,
            k = f.b,
            r = f.c,
            n = f.get("renderOrder");
        m(n) || (n = dn);
        h = Od(h, r * p);
        if (!this.i && this.J == p && this.L == k && this.H == n && Rd(this.p, h)) return !0;
        null === this.d || a.postRenderFunctions.push(lq(this.d, d));
        this.i = !1;
        var t = new kq(.5 * p / q, h, f.c);
        c.ac(h, p, g);
        if (null === n) c.Ab(h, p, e, this);
        else {
            var u = [];
            c.Ab(h, p, function(a) {
                u.push(a)
            }, this);
            gb(u, n);
            Sa(u, e, this)
        }
        mq(t, d);
        this.J = p;
        this.L = k;
        this.H = n;
        this.p = h;
        this.d = t;
        return !0
    };

    function Lq(a, c) {
        Ij.call(this, 0, c);
        this.b = Mf("CANVAS");
        this.b.style.width = "100%";
        this.b.style.height = "100%";
        this.b.className = "ol-unselectable";
        Pf(a, this.b, 0);
        this.p = this.H = 0;
        this.J = ai();
        this.l = !0;
        this.e = hi(this.b, {
            antialias: !0,
            depth: !1,
            Ei: !0,
            preserveDrawingBuffer: !1,
            stencil: !0
        });
        this.d = new Wp(this.b, this.e);
        x(this.b, "webglcontextlost", this.Pl, !1, this);
        x(this.b, "webglcontextrestored", this.Ql, !1, this);
        this.a = new vg;
        this.n = null;
        this.q = new Nj(ra(function(a) {
            var c = a[1];
            a = a[2];
            var f = c[0] - this.n[0],
                c = c[1] - this.n[1];
            return 65536 * Math.log(a) + Math.sqrt(f * f + c * c) / a
        }, this), function(a) {
            return a[0].gb()
        });
        this.L = ra(function() {
            if (!this.q.la()) {
                Rj(this.q);
                var a = Oj(this.q);
                Jq(this, a[0], a[3], a[4])
            }
        }, this);
        this.i = 0;
        Mq(this)
    }
    w(Lq, Ij);

    function Jq(a, c, d, e) {
        var f = a.e,
            g = c.gb();
        if (wg(a.a, g)) a = a.a.get(g), f.bindTexture(3553, a.Qa), 9729 != a.lg && (f.texParameteri(3553, 10240, 9729), a.lg = 9729), 9729 != a.mg && (f.texParameteri(3553, 10240, 9729), a.mg = 9729);
        else {
            var h = f.createTexture();
            f.bindTexture(3553, h);
            if (0 < e) {
                var k = a.J.canvas,
                    n = a.J;
                a.H !== d[0] || a.p !== d[1] ? (k.width = d[0], k.height = d[1], a.H = d[0], a.p = d[1]) : n.clearRect(0, 0, d[0], d[1]);
                n.drawImage(c.Ma(), e, e, d[0], d[1], 0, 0, d[0], d[1]);
                f.texImage2D(3553, 0, 6408, 6408, 5121, k)
            } else f.texImage2D(3553, 0, 6408, 6408, 5121, c.Ma());
            f.texParameteri(3553, 10240, 9729);
            f.texParameteri(3553, 10241, 9729);
            f.texParameteri(3553, 10242, 33071);
            f.texParameteri(3553, 10243, 33071);
            a.a.set(g, {
                Qa: h,
                lg: 9729,
                mg: 9729
            })
        }
    }
    l = Lq.prototype;
    l.Ke = function(a) {
        return a instanceof I ? new Cq(this, a) : a instanceof L ? new Iq(this, a) : a instanceof M ? new Kq(this, a) : null
    };

    function Nq(a, c, d) {
        var e = a.g;
        if (bd(e, c)) {
            var f = a.d,
                g = d.extent,
                h = d.size,
                k = d.viewState,
                n = k.resolution,
                p = k.center,
                q = k.rotation,
                k = new rq(f, p, n, q, h, g),
                g = new kq(.5 * n / d.pixelRatio, g);
            e.dispatchEvent(new il(c, e, k, g, d, null, f));
            mq(g, f);
            if (!g.la()) {
                var r = Oq;
                c = r.opacity;
                d = r.brightness;
                var e = r.contrast,
                    t = r.hue,
                    r = r.saturation,
                    u = {},
                    A, z, D;
                A = 0;
                for (z = pm.length; A < z; ++A) D = g.a[pm[A]], m(D) && iq(D, f, p, n, q, h, c, d, e, t, r, u, void 0, !1)
            }
            lq(g, f)();
            f = Ua(tb(k.b), Number);
            gb(f);
            h = 0;
            for (n = f.length; h < n; ++h)
                for (p = k.b[f[h].toString()], q = 0, c = p.length; q < c; ++q) p[q](k);
            a.c = g
        }
    }
    l.O = function() {
        var a = this.e;
        a.isContextLost() || this.a.forEach(function(c) {
            null === c || a.deleteTexture(c.Qa)
        });
        qc(this.d);
        Lq.S.O.call(this)
    };
    l.Ci = function(a, c) {
        for (var d = this.e, e; 1024 < this.a.Tb() - this.i;) {
            e = this.a.b.qc;
            if (null === e)
                if (+this.a.b.Wd == c.index) break;
                else --this.i;
            else d.deleteTexture(e.Qa);
            this.a.pop()
        }
    };
    l.M = function() {
        return "webgl"
    };
    l.Pl = function(a) {
        a.preventDefault();
        this.a.clear();
        this.i = 0;
        pb(this.f, function(a) {
            a.gf()
        })
    };
    l.Ql = function() {
        Mq(this);
        this.g.render()
    };

    function Mq(a) {
        a = a.e;
        a.activeTexture(33984);
        a.blendFuncSeparate(770, 771, 1, 771);
        a.disable(2884);
        a.disable(2929);
        a.disable(3089);
        a.disable(2960)
    }
    l.ue = function(a) {
        var c = this.d,
            d = this.e;
        if (d.isContextLost()) return !1;
        if (null === a) return this.l && (mg(this.b, !1), this.l = !1), !1;
        this.n = a.focus;
        this.a.set((-a.index).toString(), null);
        ++this.i;
        var e = [],
            f = a.layerStatesArray,
            g = a.viewState.resolution,
            h, k, n, p;
        h = 0;
        for (k = f.length; h < k; ++h) p = f[h], oj(p, g) && "ready" == p.i && (n = Lj(this, p.layer), n.hf(a, p, c) && e.push(p));
        f = a.size[0] * a.pixelRatio;
        g = a.size[1] * a.pixelRatio;
        if (this.b.width != f || this.b.height != g) this.b.width = f, this.b.height = g;
        d.bindFramebuffer(36160, null);
        d.clearColor(0, 0, 0, 0);
        d.clear(16384);
        d.enable(3042);
        d.viewport(0, 0, this.b.width, this.b.height);
        Nq(this, "precompose", a);
        h = 0;
        for (k = e.length; h < k; ++h) p = e[h], n = Lj(this, p.layer), n.Lg(a, p, c);
        this.l || (mg(this.b, !0), this.l = !0);
        Jj(a);
        1024 < this.a.Tb() - this.i && a.postRenderFunctions.push(ra(this.Ci, this));
        this.q.la() || (a.postRenderFunctions.push(this.L), a.animate = !0);
        Nq(this, "postcompose", a);
        Mj(this, a);
        a.postRenderFunctions.push(Kj)
    };
    l.ef = function(a, c, d, e, f, g) {
        var h;
        if (this.e.isContextLost()) return !1;
        var k = this.d,
            n = c.viewState;
        if (null !== this.c) {
            var p = {},
                q = Oq;
            if (h = this.c.c(a, k, n.center, n.resolution, n.rotation, c.size, c.pixelRatio, q.opacity, q.brightness, q.contrast, q.hue, q.saturation, {}, function(a) {
                    var c = ma(a).toString();
                    if (!(c in p)) return p[c] = !0, d.call(e, a, null)
                })) return h
        }
        k = c.layerStatesArray;
        for (q = k.length - 1; 0 <= q; --q) {
            h = k[q];
            var r = h.layer;
            if (oj(h, n.resolution) && f.call(g, r) && (h = Lj(this, r).Pa(a, c, d, e))) return h
        }
    };
    l.Kg = function(a, c, d, e) {
        var f = !1;
        if (this.e.isContextLost()) return !1;
        var g = this.d,
            h = c.viewState;
        if (null !== this.c && (f = Oq, f = qq(this.c, a, g, h.resolution, h.rotation, f.opacity, f.brightness, f.contrast, f.hue, f.saturation, {}))) return !0;
        var g = c.layerStatesArray,
            k;
        for (k = g.length - 1; 0 <= k; --k) {
            var n = g[k],
                p = n.layer;
            if (oj(n, h.resolution) && d.call(e, p) && (f = Lj(this, p).ee(a, c))) return !0
        }
        return f
    };
    l.Jg = function(a, c, d, e, f) {
        if (this.e.isContextLost()) return !1;
        var g = this.d,
            h = c.viewState,
            k;
        if (null !== this.c) {
            var n = Oq;
            k = this.g.ka(a);
            if (qq(this.c, k, g, h.resolution, h.rotation, n.opacity, n.brightness, n.contrast, n.hue, n.saturation, {}) && (k = d.call(e, null))) return k
        }
        g = c.layerStatesArray;
        for (n = g.length - 1; 0 <= n; --n) {
            k = g[n];
            var p = k.layer;
            if (oj(k, h.resolution) && f.call(e, p) && (k = Lj(this, p).dc(a, c, d, e))) return k
        }
    };
    var Oq = {
        opacity: 1,
        brightness: 0,
        contrast: 1,
        hue: 0,
        saturation: 1
    };
    var Pq = ["canvas", "webgl", "dom"];

    function W(a) {
        fd.call(this);
        var c = Qq(a);
        this.wb = m(a.loadTilesWhileAnimating) ? a.loadTilesWhileAnimating : !1;
        this.xb = m(a.loadTilesWhileInteracting) ? a.loadTilesWhileInteracting : !1;
        this.Nc = m(a.pixelRatio) ? a.pixelRatio : ji;
        this.sc = c.logos;
        this.o = new rh(this.Qn, void 0, this);
        pc(this, this.o);
        this.Ra = zd();
        this.Ee = zd();
        this.vb = 0;
        this.c = null;
        this.oa = Kd();
        this.g = this.J = null;
        this.a = Jf("DIV", "ol-viewport");
        this.a.style.position = "relative";
        this.a.style.overflow = "hidden";
        this.a.style.width = "100%";
        this.a.style.height = "100%";
        this.a.style.msTouchAction = "none";
        oi && (this.a.className = "ol-touch");
        this.X = Jf("DIV", "ol-overlaycontainer");
        this.a.appendChild(this.X);
        this.p = Jf("DIV", "ol-overlaycontainer-stopevent");
        x(this.p, ["click", "dblclick", "mousedown", "touchstart", "MSPointerDown", ij, Jb ? "DOMMouseScroll" : "mousewheel"], sc);
        this.a.appendChild(this.p);
        a = new aj(this);
        x(a, sb(lj), this.eg, !1, this);
        pc(this, a);
        this.T = c.keyboardEventTarget;
        this.n = new Lh;
        x(this.n, "key", this.dg, !1, this);
        pc(this, this.n);
        a = new Th(this.a);
        x(a, "mousewheel", this.dg, !1, this);
        pc(this, a);
        this.e = c.controls;
        this.d = c.interactions;
        this.f = c.overlays;
        this.i = new c.Sn(this.a, this);
        pc(this, this.i);
        this.Ga = new Gh;
        pc(this, this.Ga);
        this.L = this.l = null;
        this.H = [];
        this.ba = [];
        this.Fa = new Sj(ra(this.zj, this), ra(this.bl, this));
        this.N = {};
        x(this, hd("layergroup"), this.Qj, !1, this);
        x(this, hd("view"), this.mk, !1, this);
        x(this, hd("size"), this.jk, !1, this);
        x(this, hd("target"), this.lk, !1, this);
        this.t(c.values);
        this.e.forEach(function(a) {
            a.setMap(this)
        }, this);
        x(this.e, "add", function(a) {
            a.element.setMap(this)
        }, !1, this);
        x(this.e, "remove", function(a) {
            a.element.setMap(null)
        }, !1, this);
        this.d.forEach(function(a) {
            a.setMap(this)
        }, this);
        x(this.d, "add", function(a) {
            a.element.setMap(this)
        }, !1, this);
        x(this.d, "remove", function(a) {
            a.element.setMap(null)
        }, !1, this);
        this.f.forEach(function(a) {
            a.setMap(this)
        }, this);
        x(this.f, "add", function(a) {
            a.element.setMap(this)
        }, !1, this);
        x(this.f, "remove", function(a) {
            a.element.setMap(null)
        }, !1, this)
    }
    w(W, fd);
    l = W.prototype;
    l.si = function(a) {
        this.e.push(a)
    };
    l.ti = function(a) {
        this.d.push(a)
    };
    l.Jf = function(a) {
        this.Ub().Bc().push(a)
    };
    l.Kf = function(a) {
        this.f.push(a)
    };
    l.Ha = function(a) {
        this.render();
        Array.prototype.push.apply(this.H, arguments)
    };
    l.O = function() {
        Qf(this.a);
        W.S.O.call(this)
    };
    l.Ne = function(a, c, d, e, f) {
        if (null !== this.c) return a = this.ka(a), this.i.ef(a, this.c, c, m(d) ? d : null, m(e) ? e : Gg, m(f) ? f : null)
    };
    l.al = function(a, c, d, e, f) {
        if (null !== this.c) return this.i.Jg(a, this.c, c, m(d) ? d : null, m(e) ? e : Gg, m(f) ? f : null)
    };
    l.ok = function(a, c, d) {
        if (null === this.c) return !1;
        a = this.ka(a);
        return this.i.Kg(a, this.c, m(c) ? c : Gg, m(d) ? d : null)
    };
    l.Ui = function(a) {
        return this.ka(this.Bd(a))
    };
    l.Bd = function(a) {
        if (m(a.changedTouches)) {
            var c = a.changedTouches[0];
            a = jg(this.a);
            return [c.clientX - a.x, c.clientY - a.y]
        }
        c = this.a;
        a = jg(a);
        c = jg(c);
        c = new Af(a.x - c.x, a.y - c.y);
        return [c.x, c.y]
    };
    l.df = function() {
        return this.get("target")
    };
    l.bd = function() {
        var a = this.df();
        return m(a) ? Ff(a) : null
    };
    l.ka = function(a) {
        var c = this.c;
        if (null === c) return null;
        a = a.slice();
        return sj(c.pixelToCoordinateMatrix, a, a)
    };
    l.Si = function() {
        return this.e
    };
    l.oj = function() {
        return this.f
    };
    l.bj = function() {
        return this.d
    };
    l.Ub = function() {
        return this.get("layergroup")
    };
    l.vg = function() {
        return this.Ub().Bc()
    };
    l.ta = function(a) {
        var c = this.c;
        if (null === c) return null;
        a = a.slice(0, 2);
        return sj(c.coordinateToPixelMatrix, a, a)
    };
    l.xa = function() {
        return this.get("size")
    };
    l.R = function() {
        return this.get("view")
    };
    l.Bj = function() {
        return this.a
    };
    l.zj = function(a, c, d, e) {
        var f = this.c;
        if (!(null !== f && c in f.wantedTiles && f.wantedTiles[c][ef(a.b)])) return Infinity;
        a = d[0] - f.focus[0];
        d = d[1] - f.focus[1];
        return 65536 * Math.log(e) + Math.sqrt(a * a + d * d) / e
    };
    l.dg = function(a, c) {
        var d = new Zi(c || a.type, this, a);
        this.eg(d)
    };
    l.eg = function(a) {
        if (null !== this.c) {
            this.L = a.coordinate;
            a.frameState = this.c;
            var c = this.d.a,
                d;
            if (!1 !== this.dispatchEvent(a))
                for (d = c.length - 1; 0 <= d; d--) {
                    var e = c[d];
                    if (e.c() && !e.handleEvent(a)) break
                }
        }
    };
    l.gk = function() {
        var a = this.c,
            c = this.Fa;
        if (!c.la()) {
            var d = 16,
                e = d,
                f = 0;
            null !== a && (f = a.viewHints, f[0] && (d = this.wb ? 8 : 0, e = 2), f[1] && (d = this.xb ? 8 : 0, e = 2), f = rb(a.wantedTiles));
            d *= f;
            e *= f;
            if (c.d < d) {
                Rj(c);
                d = Math.min(d - c.d, e, c.Tb());
                for (e = 0; e < d; ++e) f = Oj(c)[0], x(f, "change", c.f, !1, c), f.load();
                c.d += d
            }
        }
        c = this.ba;
        d = 0;
        for (e = c.length; d < e; ++d) c[d](this, a);
        c.length = 0
    };
    l.jk = function() {
        this.render()
    };
    l.lk = function() {
        var a = this.bd();
        Sh(this.n);
        null === a ? (Qf(this.a), null !== this.l && (Wc(this.l), this.l = null)) : (a.appendChild(this.a), Mh(this.n, null === this.T ? a : this.T), null === this.l && (this.l = x(this.Ga, "resize", this.Kc, !1, this)));
        this.Kc()
    };
    l.bl = function() {
        this.render()
    };
    l.nk = function() {
        this.render()
    };
    l.mk = function() {
        null !== this.J && (Wc(this.J), this.J = null);
        var a = this.R();
        null !== a && (this.J = x(a, "propertychange", this.nk, !1, this));
        this.render()
    };
    l.Rj = function() {
        this.render()
    };
    l.Sj = function() {
        this.render()
    };
    l.Qj = function() {
        if (null !== this.g) {
            for (var a = this.g.length, c = 0; c < a; ++c) Wc(this.g[c]);
            this.g = null
        }
        a = this.Ub();
        null != a && (this.g = [x(a, "propertychange", this.Sj, !1, this), x(a, "change", this.Rj, !1, this)]);
        this.render()
    };
    l.Rn = function() {
        var a = this.o;
        sh(a);
        a.Pf()
    };
    l.render = function() {
        null != this.o.$ || this.o.start()
    };
    l.Ln = function(a) {
        if (m(this.e.remove(a))) return a
    };
    l.Mn = function(a) {
        var c;
        m(this.d.remove(a)) && (c = a);
        return c
    };
    l.Nn = function(a) {
        return this.Ub().Bc().remove(a)
    };
    l.On = function(a) {
        if (m(this.f.remove(a))) return a
    };
    l.Qn = function(a) {
        var c, d, e, f = this.xa(),
            g = this.R(),
            h = null;
        if (m(f) && 0 < f[0] && 0 < f[1] && null !== g && Te(g)) {
            var h = g.c.slice(),
                k = this.Ub().Ue(),
                n = {};
            c = 0;
            for (d = k.length; c < d; ++c) n[ma(k[c].layer)] = k[c];
            e = Se(g);
            h = {
                animate: !1,
                attributions: {},
                coordinateToPixelMatrix: this.Ra,
                extent: null,
                focus: null === this.L ? e.center : this.L,
                index: this.vb++,
                layerStates: n,
                layerStatesArray: k,
                logos: Db(this.sc),
                pixelRatio: this.Nc,
                pixelToCoordinateMatrix: this.Ee,
                postRenderFunctions: [],
                size: f,
                skippedFeatureUids: this.N,
                tileQueue: this.Fa,
                time: a,
                usedTiles: {},
                viewState: e,
                viewHints: h,
                wantedTiles: {}
            }
        }
        if (null !== h) {
            a = this.H;
            c = f = 0;
            for (d = a.length; c < d; ++c) g = a[c], g(this, h) && (a[f++] = g);
            a.length = f;
            h.extent = ee(e.center, e.resolution, e.rotation, h.size)
        }
        this.c = h;
        this.i.ue(h);
        null !== h && (h.animate && this.render(), Array.prototype.push.apply(this.ba, h.postRenderFunctions), 0 !== this.H.length || h.viewHints[0] || h.viewHints[1] || Vd(h.extent, this.oa) || (this.dispatchEvent(new tg("moveend", this, h)), Pd(h.extent, this.oa)));
        this.dispatchEvent(new tg("postrender", this, h));
        wh(this.gk, this)
    };
    l.zh = function(a) {
        this.set("layergroup", a)
    };
    l.vf = function(a) {
        this.set("size", a)
    };
    l.cl = function(a) {
        this.set("target", a)
    };
    l.jo = function(a) {
        this.set("view", a)
    };
    l.Eh = function(a) {
        a = ma(a).toString();
        this.N[a] = !0;
        this.render()
    };
    l.Kc = function() {
        var a = this.bd();
        if (null === a) this.vf(void 0);
        else {
            var c = Ef(a),
                d = Ib && a.currentStyle;
            d && Uf(Cf(c)) && "auto" != d.width && "auto" != d.height && !d.boxSizing ? (c = ng(a, d.width, "width", "pixelWidth"), a = ng(a, d.height, "height", "pixelHeight"), a = new Bf(c, a)) : (d = new Bf(a.offsetWidth, a.offsetHeight), c = pg(a, "padding"), a = sg(a), a = new Bf(d.width - a.left - c.left - c.right - a.right, d.height - a.top - c.top - c.bottom - a.bottom));
            this.vf([a.width, a.height])
        }
    };
    l.Ih = function(a) {
        a = ma(a).toString();
        delete this.N[a];
        this.render()
    };

    function Qq(a) {
        var c = null;
        m(a.keyboardEventTarget) && (c = ia(a.keyboardEventTarget) ? document.getElementById(a.keyboardEventTarget) : a.keyboardEventTarget);
        var d = {},
            e = {};
        if (!m(a.logo) || "boolean" == typeof a.logo && a.logo) e["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAAHGAAABxgEXwfpGAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAhNQTFRF////AP//AICAgP//AFVVQECA////K1VVSbbbYL/fJ05idsTYJFtbbcjbJllmZszWWMTOIFhoHlNiZszTa9DdUcHNHlNlV8XRIVdiasrUHlZjIVZjaMnVH1RlIFRkH1RkH1ZlasvYasvXVsPQH1VkacnVa8vWIVZjIFRjVMPQa8rXIVVkXsXRsNveIFVkIFZlIVVj3eDeh6GmbMvXH1ZkIFRka8rWbMvXIFVkIFVjIFVkbMvWH1VjbMvWIFVlbcvWIFVla8vVIFVkbMvWbMvVH1VkbMvWIFVlbcvWIFVkbcvVbMvWjNPbIFVkU8LPwMzNIFVkbczWIFVkbsvWbMvXIFVkRnB8bcvW2+TkW8XRIFVkIlZlJVloJlpoKlxrLl9tMmJwOWd0Omh1RXF8TneCT3iDUHiDU8LPVMLPVcLPVcPQVsPPVsPQV8PQWMTQWsTQW8TQXMXSXsXRX4SNX8bSYMfTYcfTYsfTY8jUZcfSZsnUaIqTacrVasrVa8jTa8rWbI2VbMvWbcvWdJObdcvUdszUd8vVeJaee87Yfc3WgJyjhqGnitDYjaarldPZnrK2oNbborW5o9bbo9fbpLa6q9ndrL3ArtndscDDutzfu8fJwN7gwt7gxc/QyuHhy+HizeHi0NfX0+Pj19zb1+Tj2uXk29/e3uLg3+Lh3+bl4uXj4ufl4+fl5Ofl5ufl5ujm5+jmySDnBAAAAFp0Uk5TAAECAgMEBAYHCA0NDg4UGRogIiMmKSssLzU7PkJJT1JTVFliY2hrdHZ3foSFhYeJjY2QkpugqbG1tre5w8zQ09XY3uXn6+zx8vT09vf4+Pj5+fr6/P39/f3+gz7SsAAAAVVJREFUOMtjYKA7EBDnwCPLrObS1BRiLoJLnte6CQy8FLHLCzs2QUG4FjZ5GbcmBDDjxJBXDWxCBrb8aM4zbkIDzpLYnAcE9VXlJSWlZRU13koIeW57mGx5XjoMZEUqwxWYQaQbSzLSkYGfKFSe0QMsX5WbjgY0YS4MBplemI4BdGBW+DQ11eZiymfqQuXZIjqwyadPNoSZ4L+0FVM6e+oGI6g8a9iKNT3o8kVzNkzRg5lgl7p4wyRUL9Yt2jAxVh6mQCogae6GmflI8p0r13VFWTHBQ0rWPW7ahgWVcPm+9cuLoyy4kCJDzCm6d8PSFoh0zvQNC5OjDJhQopPPJqph1doJBUD5tnkbZiUEqaCnB3bTqLTFG1bPn71kw4b+GFdpLElKIzRxxgYgWNYc5SCENVHKeUaltHdXx0dZ8uBI1hJ2UUDgq82CM2MwKeibqAvSO7MCABq0wXEPiqWEAAAAAElFTkSuQmCC"] = "http://openlayers.org/";
        else {
            var f = a.logo;
            ia(f) ? e[f] = "" : la(f) && (e[f.src] = f.href)
        }
        f = a.layers instanceof G ? a.layers : new G({
            layers: a.layers
        });
        d.layergroup = f;
        d.target = a.target;
        d.view = m(a.view) ? a.view : new Ne;
        var f = Ij,
            g;
        m(a.renderer) ? ga(a.renderer) ? g = a.renderer : ia(a.renderer) && (g = [a.renderer]) : g = Pq;
        var h, k;
        h = 0;
        for (k = g.length; h < k; ++h) {
            var n = g[h];
            if ("canvas" == n) {
                if (li) {
                    f = Cp;
                    break
                }
            } else if ("dom" == n) {
                f = Kp;
                break
            } else if ("webgl" == n && ii) {
                f = Lq;
                break
            }
        }
        var p;
        m(a.controls) ? p = ga(a.controls) ? new of(a.controls.slice()) : a.controls : p = ih();
        var q;
        m(a.interactions) ? q = ga(a.interactions) ? new of(a.interactions.slice()) : a.interactions : q = Vl();
        a = m(a.overlays) ? ga(a.overlays) ? new of(a.overlays.slice()) : a.overlays : new of;
        return {
            controls: p,
            interactions: q,
            keyboardEventTarget: c,
            logos: e,
            overlays: a,
            Sn: f,
            values: d
        }
    }
    bm();

    function Rq(a) {
        fd.call(this);
        this.g = m(a.insertFirst) ? a.insertFirst : !0;
        this.i = m(a.stopEvent) ? a.stopEvent : !0;
        this.Z = Jf("DIV", {
            "class": "ol-overlay-container"
        });
        this.Z.style.position = "absolute";
        this.f = m(a.autoPan) ? a.autoPan : !1;
        this.d = m(a.autoPanAnimation) ? a.autoPanAnimation : {};
        this.e = m(a.autoPanMargin) ? a.autoPanMargin : 20;
        this.a = {
            ud: "",
            Xd: "",
            ve: "",
            we: "",
            visible: !0
        };
        this.c = null;
        x(this, hd("element"), this.Kj, !1, this);
        x(this, hd("map"), this.Yj, !1, this);
        x(this, hd("offset"), this.ck, !1, this);
        x(this, hd("position"), this.ek, !1, this);
        x(this, hd("positioning"), this.fk, !1, this);
        m(a.element) && this.wh(a.element);
        this.Bh(m(a.offset) ? a.offset : [0, 0]);
        this.Ch(m(a.positioning) ? a.positioning : "top-left");
        m(a.position) && this.uf(a.position)
    }
    w(Rq, fd);
    l = Rq.prototype;
    l.$d = function() {
        return this.get("element")
    };
    l.ae = function() {
        return this.get("map")
    };
    l.Yf = function() {
        return this.get("offset")
    };
    l.wg = function() {
        return this.get("position")
    };
    l.ag = function() {
        return this.get("positioning")
    };
    l.Kj = function() {
        Of(this.Z);
        var a = this.$d();
        null != a && Nf(this.Z, a)
    };
    l.Yj = function() {
        null !== this.c && (Qf(this.Z), Wc(this.c), this.c = null);
        var a = this.ae();
        null != a && (this.c = x(a, "postrender", this.render, !1, this), Sq(this), a = this.i ? a.p : a.X, this.g ? Pf(a, this.Z, 0) : Nf(a, this.Z))
    };
    l.render = function() {
        Sq(this)
    };
    l.ck = function() {
        Sq(this)
    };
    l.ek = function() {
        Sq(this);
        if (m(this.get("position")) && this.f) {
            var a = this.ae();
            if (m(a) && !fa(a.bd())) {
                var c = Tq(a.bd(), a.xa()),
                    d = this.$d(),
                    e = d.offsetWidth,
                    f = d.currentStyle || window.getComputedStyle(d),
                    e = e + (parseInt(f.marginLeft, 10) + parseInt(f.marginRight, 10)),
                    f = d.offsetHeight,
                    g = d.currentStyle || window.getComputedStyle(d),
                    f = f + (parseInt(g.marginTop, 10) + parseInt(g.marginBottom, 10)),
                    h = Tq(d, [e, f]),
                    d = this.e;
                Rd(c, h) || (e = h[0] - c[0], f = c[2] - h[2], g = h[1] - c[1], h = c[3] - h[3], c = [0, 0], 0 > e ? c[0] = e - d : 0 > f && (c[0] = Math.abs(f) + d), 0 > g ? c[1] = g - d : 0 > h && (c[1] = Math.abs(h) + d), 0 === c[0] && 0 === c[1]) || (d = a.R().Ca(), e = a.ta(d), c = [e[0] + c[0], e[1] + c[1]], null !== this.d && (this.d.source = d, a.Ha(Ze(this.d))), a.R().Na(a.ka(c)))
            }
        }
    };
    l.fk = function() {
        Sq(this)
    };
    l.wh = function(a) {
        this.set("element", a)
    };
    l.setMap = function(a) {
        this.set("map", a)
    };
    l.Bh = function(a) {
        this.set("offset", a)
    };
    l.uf = function(a) {
        this.set("position", a)
    };

    function Tq(a, c) {
        var d = Ef(a);
        fg(a, "position");
        var e = new Af(0, 0),
            f;
        f = d ? Ef(d) : document;
        f = !Ib || Ib && 9 <= Tb || Uf(Cf(f)) ? f.documentElement : f.body;
        a != f && (f = ig(a), d = Wf(Cf(d)), e.x = f.left + d.x, e.y = f.top + d.y);
        return [e.x, e.y, e.x + c[0], e.y + c[1]]
    }
    l.Ch = function(a) {
        this.set("positioning", a)
    };

    function Sq(a) {
        var c = a.ae(),
            d = a.wg();
        if (m(c) && null !== c.c && m(d)) {
            var d = c.ta(d),
                e = c.xa(),
                c = a.Z.style,
                f = a.Yf(),
                g = a.ag(),
                h = f[0],
                f = f[1];
            if ("bottom-right" == g || "center-right" == g || "top-right" == g) "" !== a.a.Xd && (a.a.Xd = c.left = ""), h = Math.round(e[0] - d[0] - h) + "px", a.a.ve != h && (a.a.ve = c.right = h);
            else {
                "" !== a.a.ve && (a.a.ve = c.right = "");
                if ("bottom-center" == g || "center-center" == g || "top-center" == g) h -= kg(a.Z).width / 2;
                h = Math.round(d[0] + h) + "px";
                a.a.Xd != h && (a.a.Xd = c.left = h)
            }
            if ("bottom-left" == g || "bottom-center" == g || "bottom-right" == g) "" !== a.a.we && (a.a.we = c.top = ""), d = Math.round(e[1] - d[1] - f) + "px", a.a.ud != d && (a.a.ud = c.bottom = d);
            else {
                "" !== a.a.ud && (a.a.ud = c.bottom = "");
                if ("center-left" == g || "center-center" == g || "center-right" == g) f -= kg(a.Z).height / 2;
                d = Math.round(d[1] + f) + "px";
                a.a.we != d && (a.a.we = c.top = d)
            }
            a.a.visible || (mg(a.Z, !0), a.a.visible = !0)
        } else a.a.visible && (mg(a.Z, !1), a.a.visible = !1)
    };

    function Uq(a) {
        a = m(a) ? a : {};
        this.f = m(a.collapsed) ? a.collapsed : !0;
        this.g = m(a.collapsible) ? a.collapsible : !0;
        this.g || (this.f = !1);
        var c = m(a.className) ? a.className : "ol-overviewmap",
            d = m(a.tipLabel) ? a.tipLabel : "Overview map",
            e = m(a.collapseLabel) ? a.collapseLabel : "\u00ab";
        this.o = ia(e) ? Jf("SPAN", {}, e) : e;
        e = m(a.label) ? a.label : "\u00bb";
        this.n = ia(e) ? Jf("SPAN", {}, e) : e;
        d = Jf("BUTTON", {
            type: "button",
            title: d
        }, this.g && !this.f ? this.o : this.n);
        x(d, "click", this.ml, !1, this);
        x(d, ["mouseout", uc], function() {
            this.blur()
        }, !1);
        var e = Jf("DIV", "ol-overviewmap-map"),
            f = this.d = new W({
                controls: new of,
                interactions: new of,
                target: e
            });
        m(a.layers) && a.layers.forEach(function(a) {
            f.Jf(a)
        }, this);
        var g = Jf("DIV", "ol-overviewmap-box");
        this.i = new Rq({
            position: [0, 0],
            positioning: "bottom-left",
            element: g
        });
        this.d.Kf(this.i);
        c = Jf("DIV", c + " ol-unselectable ol-control" + (this.f && this.g ? " ol-collapsed" : "") + (this.g ? "" : " ol-uncollapsible"), e, d);
        ug.call(this, {
            element: c,
            render: m(a.render) ? a.render : Vq,
            target: a.target
        })
    }
    w(Uq, ug);
    l = Uq.prototype;
    l.setMap = function(a) {
        var c = this.a;
        a !== c && (c && (c = c.R()) && Vc(c, hd("rotation"), this.Rd, !1, this), Uq.S.setMap.call(this, a), a && (this.l.push(x(a, "propertychange", this.Zj, !1, this)), 0 === this.d.vg().Ib() && this.d.zh(a.Ub()), a = a.R())) && (x(a, hd("rotation"), this.Rd, !1, this), Te(a) && (this.d.Kc(), Wq(this)))
    };
    l.Zj = function(a) {
        "view" === a.key && ((a = a.oldValue) && Vc(a, hd("rotation"), this.Rd, !1, this), a = this.a.R(), x(a, hd("rotation"), this.Rd, !1, this))
    };
    l.Rd = function() {
        this.d.R().be(this.a.R().Da())
    };

    function Vq() {
        var a = this.a,
            c = this.d;
        if (null !== a.c && null !== c.c) {
            var d = a.xa(),
                a = a.R().Pc(d),
                e = c.xa(),
                d = c.R().Pc(e),
                f = c.ta(be(a)),
                c = c.ta($d(a)),
                c = new Bf(Math.abs(f[0] - c[0]), Math.abs(f[1] - c[1])),
                f = e[0],
                e = e[1];
            c.width < .1 * f || c.height < .1 * e || c.width > .75 * f || c.height > .75 * e ? Wq(this) : Rd(d, a) || (a = this.d, d = this.a.R(), a.R().Na(d.Ca()))
        }
        Xq(this)
    }

    function Wq(a) {
        var c = a.a;
        a = a.d;
        var d = c.xa(),
            c = c.R().Pc(d),
            d = a.xa();
        a = a.R();
        var e = Math.log(7.5) / Math.LN2;
        ke(c, 1 / (.1 * Math.pow(2, e / 2)));
        a.Me(c, d)
    }

    function Xq(a) {
        var c = a.a,
            d = a.d;
        if (null !== c.c && null !== d.c) {
            var e = c.xa(),
                f = c.R(),
                g = d.R();
            d.xa();
            var c = f.Da(),
                h = a.i,
                d = a.i.$d(),
                f = f.Pc(e),
                e = g.ya(),
                g = Zd(f),
                f = ae(f),
                k;
            a = a.a.R().Ca();
            m(a) && (k = [g[0] - a[0], g[1] - a[1]], rd(k, c), md(k, a));
            h.uf(k);
            null != d && (k = new Bf(Math.abs((g[0] - f[0]) / e), Math.abs((f[1] - g[1]) / e)), c = Uf(Cf(Ef(d))), !Ib || Rb("10") || c && Rb("8") ? (d = d.style, Jb ? d.MozBoxSizing = "border-box" : Kb ? d.WebkitBoxSizing = "border-box" : d.boxSizing = "border-box", d.width = Math.max(k.width, 0) + "px", d.height = Math.max(k.height, 0) + "px") : (a = d.style, c ? (c = pg(d, "padding"), d = sg(d), a.pixelWidth = k.width - d.left - c.left - c.right - d.right, a.pixelHeight = k.height - d.top - c.top - c.bottom - d.bottom) : (a.pixelWidth = k.width, a.pixelHeight = k.height)))
        }
    }
    l.ml = function(a) {
        a.preventDefault();
        Yq(this)
    };

    function Yq(a) {
        ag(a.element, "ol-collapsed");
        a.f ? Rf(a.o, a.n) : Rf(a.n, a.o);
        a.f = !a.f;
        var c = a.d;
        a.f || null !== c.c || (c.Kc(), Wq(a), Uc(c, "postrender", function() {
            Xq(this)
        }, !1, a))
    }
    l.ll = function() {
        return this.g
    };
    l.ol = function(a) {
        this.g !== a && (this.g = a, ag(this.element, "ol-uncollapsible"), !a && this.f && Yq(this))
    };
    l.nl = function(a) {
        this.g && this.f !== a && Yq(this)
    };
    l.kl = function() {
        return this.f
    };

    function Zq(a) {
        a = m(a) ? a : {};
        var c = m(a.className) ? a.className : "ol-scale-line";
        this.g = Jf("DIV", c + "-inner");
        this.Z = Jf("DIV", c + " ol-unselectable", this.g);
        this.o = null;
        this.i = m(a.minWidth) ? a.minWidth : 64;
        this.d = !1;
        this.H = void 0;
        this.n = "";
        this.f = null;
        ug.call(this, {
            element: this.Z,
            render: m(a.render) ? a.render : $q,
            target: a.target
        });
        x(this, hd("units"), this.N, !1, this);
        this.J(a.units || "metric")
    }
    w(Zq, ug);
    var ar = [1, 2, 5];
    Zq.prototype.p = function() {
        return this.get("units")
    };

    function $q(a) {
        a = a.frameState;
        null === a ? this.o = null : this.o = a.viewState;
        br(this)
    }
    Zq.prototype.N = function() {
        br(this)
    };
    Zq.prototype.J = function(a) {
        this.set("units", a)
    };

    function br(a) {
        var c = a.o;
        if (null === c) a.d && (mg(a.Z, !1), a.d = !1);
        else {
            var d = c.center,
                e = c.projection,
                c = e.getPointResolution(c.resolution, d),
                f = e.a,
                g = a.p();
            "degrees" != f || "metric" != g && "imperial" != g && "us" != g && "nautical" != g ? "degrees" != f && "degrees" == g ? (null === a.f && (a.f = ve(e, re("EPSG:4326"))), d = Math.cos(Yb(a.f(d)[1])), e = ne.radius, e /= oe[f], c *= 180 / (Math.PI * d * e)) : a.f = null : (a.f = null, d = Math.cos(Yb(d[1])), c *= Math.PI * d * ne.radius / 180);
            d = a.i * c;
            f = "";
            "degrees" == g ? d < 1 / 60 ? (f = "\u2033", c *= 3600) : 1 > d ? (f = "\u2032", c *= 60) : f = "\u00b0" : "imperial" == g ? .9144 > d ? (f = "in", c /= .0254) : 1609.344 > d ? (f = "ft", c /= .3048) : (f = "mi", c /= 1609.344) : "nautical" == g ? (c /= 1852, f = "nm") : "metric" == g ? 1 > d ? (f = "mm", c *= 1E3) : 1E3 > d ? f = "m" : (f = "km", c /= 1E3) : "us" == g && (.9144 > d ? (f = "in", c *= 39.37) : 1609.344 > d ? (f = "ft", c /= .30480061) : (f = "mi", c /= 1609.3472));
            for (d = 3 * Math.floor(Math.log(a.i * c) / Math.log(10));;) {
                e = ar[d % 3] * Math.pow(10, Math.floor(d / 3));
                g = Math.round(e / c);
                if (isNaN(g)) {
                    mg(a.Z, !1);
                    a.d = !1;
                    return
                }
                if (g >= a.i) break;
                ++d
            }
            c = e + " " + f;
            a.n != c && (a.g.innerHTML = c, a.n = c);
            a.H != g && (a.g.style.width = g + "px", a.H = g);
            a.d || (mg(a.Z, !0), a.d = !0)
        }
    };

    function cr(a) {
        mc.call(this);
        this.a = a;
        this.b = {}
    }
    w(cr, mc);
    var dr = [];
    cr.prototype.Ka = function(a, c, d, e) {
        ga(c) || (c && (dr[0] = c.toString()), c = dr);
        for (var f = 0; f < c.length; f++) {
            var g = x(a, c[f], d || this.handleEvent, e || !1, this.a || this);
            if (!g) break;
            this.b[g.key] = g
        }
        return this
    };
    cr.prototype.wf = function(a, c, d, e, f) {
        if (ga(c))
            for (var g = 0; g < c.length; g++) this.wf(a, c[g], d, e, f);
        else d = d || this.handleEvent, f = f || this.a || this, d = Oc(d), e = !!e, c = Bc(a) ? Jc(a.ab, String(c), d, e, f) : a ? (a = Qc(a)) ? Jc(a, c, d, e, f) : null : null, c && (Wc(c), delete this.b[c.key]);
        return this
    };

    function er(a) {
        pb(a.b, Wc);
        a.b = {}
    }
    cr.prototype.O = function() {
        cr.S.O.call(this);
        er(this)
    };
    cr.prototype.handleEvent = function() {
        throw Error("EventHandler.handleEvent not implemented");
    };

    function fr(a, c, d) {
        $c.call(this);
        this.target = a;
        this.handle = c || a;
        this.b = d || new cg(NaN, NaN, NaN, NaN);
        this.c = Ef(a);
        this.a = new cr(this);
        pc(this, this.a);
        x(this.handle, ["touchstart", "mousedown"], this.cg, !1, this)
    }
    w(fr, $c);
    var gr = Ib || Jb && Rb("1.9.3");
    l = fr.prototype;
    l.clientX = 0;
    l.clientY = 0;
    l.screenX = 0;
    l.screenY = 0;
    l.Fh = 0;
    l.Gh = 0;
    l.yc = 0;
    l.zc = 0;
    l.Zb = !1;
    l.O = function() {
        fr.S.O.call(this);
        Vc(this.handle, ["touchstart", "mousedown"], this.cg, !1, this);
        er(this.a);
        gr && this.c.releaseCapture();
        this.handle = this.target = null
    };
    l.cg = function(a) {
        var c = "mousedown" == a.type;
        if (this.Zb || c && !zc(a)) this.dispatchEvent("earlycancel");
        else if (hr(a), this.dispatchEvent(new ir("start", this, a.clientX, a.clientY))) {
            this.Zb = !0;
            a.preventDefault();
            var c = this.c,
                d = c.documentElement,
                e = !gr;
            this.a.Ka(c, ["touchmove", "mousemove"], this.bk, e);
            this.a.Ka(c, ["touchend", "mouseup"], this.Od, e);
            gr ? (d.setCapture(!1), this.a.Ka(d, "losecapture", this.Od)) : this.a.Ka(c ? c.parentWindow || c.defaultView : window, "blur", this.Od);
            this.e && this.a.Ka(this.e, "scroll", this.en, e);
            this.clientX = this.Fh = a.clientX;
            this.clientY = this.Gh = a.clientY;
            this.screenX = a.screenX;
            this.screenY = a.screenY;
            this.yc = this.target.offsetLeft;
            this.zc = this.target.offsetTop;
            this.d = Wf(Cf(this.c));
            ua()
        }
    };
    l.Od = function(a) {
        er(this.a);
        gr && this.c.releaseCapture();
        if (this.Zb) {
            hr(a);
            this.Zb = !1;
            var c = jr(this, this.yc),
                d = kr(this, this.zc);
            this.dispatchEvent(new ir("end", this, a.clientX, a.clientY, 0, c, d))
        } else this.dispatchEvent("earlycancel")
    };

    function hr(a) {
        var c = a.type;
        "touchstart" == c || "touchmove" == c ? xc(a, a.b.targetTouches[0], a.c) : "touchend" != c && "touchcancel" != c || xc(a, a.b.changedTouches[0], a.c)
    }
    l.bk = function(a) {
        hr(a);
        var c = 1 * (a.clientX - this.clientX),
            d = a.clientY - this.clientY;
        this.clientX = a.clientX;
        this.clientY = a.clientY;
        this.screenX = a.screenX;
        this.screenY = a.screenY;
        if (!this.Zb) {
            var e = this.Fh - this.clientX,
                f = this.Gh - this.clientY;
            if (0 < e * e + f * f)
                if (this.dispatchEvent(new ir("start", this, a.clientX, a.clientY))) this.Zb = !0;
                else {
                    this.U || this.Od(a);
                    return
                }
        }
        d = lr(this, c, d);
        c = d.x;
        d = d.y;
        this.Zb && this.dispatchEvent(new ir("beforedrag", this, a.clientX, a.clientY, 0, c, d)) && (mr(this, a, c, d), a.preventDefault())
    };

    function lr(a, c, d) {
        var e = Wf(Cf(a.c));
        c += e.x - a.d.x;
        d += e.y - a.d.y;
        a.d = e;
        a.yc += c;
        a.zc += d;
        c = jr(a, a.yc);
        a = kr(a, a.zc);
        return new Af(c, a)
    }
    l.en = function(a) {
        var c = lr(this, 0, 0);
        a.clientX = this.clientX;
        a.clientY = this.clientY;
        mr(this, a, c.x, c.y)
    };

    function mr(a, c, d, e) {
        a.target.style.left = d + "px";
        a.target.style.top = e + "px";
        a.dispatchEvent(new ir("drag", a, c.clientX, c.clientY, 0, d, e))
    }

    function jr(a, c) {
        var d = a.b,
            e = isNaN(d.left) ? null : d.left,
            d = isNaN(d.width) ? 0 : d.width;
        return Math.min(null != e ? e + d : Infinity, Math.max(null != e ? e : -Infinity, c))
    }

    function kr(a, c) {
        var d = a.b,
            e = isNaN(d.top) ? null : d.top,
            d = isNaN(d.height) ? 0 : d.height;
        return Math.min(null != e ? e + d : Infinity, Math.max(null != e ? e : -Infinity, c))
    }

    function ir(a, c, d, e, f, g, h) {
        rc.call(this, a);
        this.clientX = d;
        this.clientY = e;
        this.left = m(g) ? g : c.yc;
        this.top = m(h) ? h : c.zc
    }
    w(ir, rc);

    function nr(a) {
        a = m(a) ? a : {};
        this.f = void 0;
        this.g = or;
        this.i = null;
        this.n = !1;
        this.o = m(a.duration) ? a.duration : 200;
        var c = m(a.className) ? a.className : "ol-zoomslider",
            d = Jf("DIV", [c + "-thumb", "ol-unselectable"]),
            c = Jf("DIV", [c, "ol-unselectable", "ol-control"], d);
        this.d = new fr(d);
        pc(this, this.d);
        x(this.d, "start", this.Jj, !1, this);
        x(this.d, "drag", this.Hj, !1, this);
        x(this.d, "end", this.Ij, !1, this);
        x(c, "click", this.Gj, !1, this);
        x(d, "click", sc);
        ug.call(this, {
            element: c,
            render: m(a.render) ? a.render : pr
        })
    }
    w(nr, ug);
    var or = 0;
    l = nr.prototype;
    l.setMap = function(a) {
        nr.S.setMap.call(this, a);
        null === a || a.render()
    };

    function pr(a) {
        if (null !== a.frameState) {
            if (!this.n) {
                var c = this.element,
                    d = kg(c),
                    e = Sf(c),
                    c = pg(e, "margin"),
                    f = new Bf(e.offsetWidth, e.offsetHeight),
                    e = f.width + c.right + c.left,
                    c = f.height + c.top + c.bottom;
                this.i = [e, c];
                e = d.width - e;
                c = d.height - c;
                d.width > d.height ? (this.g = 1, d = new cg(0, 0, e, 0)) : (this.g = or, d = new cg(0, 0, 0, c));
                this.d.b = d || new cg(NaN, NaN, NaN, NaN);
                this.n = !0
            }
            a = a.frameState.viewState.resolution;
            a !== this.f && (this.f = a, a = 1 - Re(this.a.R())(a), d = this.d, c = Sf(this.element), 1 == this.g ? gg(c, d.b.left + d.b.width * a) : gg(c, d.b.left, d.b.top + d.b.height * a))
        }
    }
    l.Gj = function(a) {
        var c = this.a,
            d = c.R(),
            e = d.ya();
        c.Ha(af({
            resolution: e,
            duration: this.o,
            easing: Ve
        }));
        a = qr(this, a.offsetX - this.i[0] / 2, a.offsetY - this.i[1] / 2);
        a = rr(this, a);
        d.tb(d.constrainResolution(a))
    };
    l.Jj = function() {
        Ue(this.a.R(), 1)
    };
    l.Hj = function(a) {
        a = qr(this, a.left, a.top);
        this.f = rr(this, a);
        this.a.R().tb(this.f)
    };
    l.Ij = function() {
        var a = this.a,
            c = a.R();
        Ue(c, -1);
        a.Ha(af({
            resolution: this.f,
            duration: this.o,
            easing: Ve
        }));
        a = c.constrainResolution(this.f);
        c.tb(a)
    };

    function qr(a, c, d) {
        var e = a.d.b;
        return Vb(1 === a.g ? (c - e.left) / e.width : (d - e.top) / e.height, 0, 1)
    }

    function rr(a, c) {
        return Qe(a.a.R())(1 - c)
    };

    function sr(a) {
        a = m(a) ? a : {};
        this.d = m(a.extent) ? a.extent : null;
        var c = m(a.className) ? a.className : "ol-zoom-extent",
            d = Jf("BUTTON", {
                type: "button",
                title: m(a.tipLabel) ? a.tipLabel : "Fit to extent"
            }, m(a.label) ? a.label : "E");
        x(d, "click", this.f, !1, this);
        x(d, ["mouseout", uc], function() {
            this.blur()
        }, !1);
        c = Jf("DIV", c + " ol-unselectable ol-control", d);
        ug.call(this, {
            element: c,
            target: a.target
        })
    }
    w(sr, ug);
    sr.prototype.f = function(a) {
        a.preventDefault();
        var c = this.a;
        a = c.R();
        var d = null === this.d ? a.e.G() : this.d,
            c = c.xa();
        a.Me(d, c)
    };

    function tr(a) {
        fd.call(this);
        a = m(a) ? a : {};
        this.a = null;
        x(this, hd("tracking"), this.Jk, !1, this);
        this.bf(m(a.tracking) ? a.tracking : !1)
    }
    w(tr, fd);
    l = tr.prototype;
    l.O = function() {
        this.bf(!1);
        tr.S.O.call(this)
    };
    l.fn = function(a) {
        a = a.b;
        if (null != a.alpha) {
            var c = Yb(a.alpha);
            this.set("alpha", c);
            "boolean" == typeof a.absolute && a.absolute ? this.set("heading", c) : null != a.webkitCompassHeading && null != a.webkitCompassAccuracy && -1 != a.webkitCompassAccuracy && this.set("heading", Yb(a.webkitCompassHeading))
        }
        null != a.beta && this.set("beta", Yb(a.beta));
        null != a.gamma && this.set("gamma", Yb(a.gamma));
        this.k()
    };
    l.Mi = function() {
        return this.get("alpha")
    };
    l.Pi = function() {
        return this.get("beta")
    };
    l.Yi = function() {
        return this.get("gamma")
    };
    l.Ik = function() {
        return this.get("heading")
    };
    l.og = function() {
        return this.get("tracking")
    };
    l.Jk = function() {
        if (mi) {
            var a = this.og();
            a && null === this.a ? this.a = x(ba, "deviceorientation", this.fn, !1, this) : a || null === this.a || (Wc(this.a), this.a = null)
        }
    };
    l.bf = function(a) {
        this.set("tracking", a)
    };

    function X(a) {
        fd.call(this);
        this.$ = void 0;
        this.a = "geometry";
        this.e = null;
        this.c = void 0;
        this.d = null;
        x(this, hd(this.a), this.Pd, !1, this);
        m(a) && (a instanceof uk || null === a ? this.La(a) : this.t(a))
    }
    w(X, fd);
    l = X.prototype;
    l.clone = function() {
        var a = new X(this.D());
        a.Ic(this.a);
        var c = this.Q();
        null != c && a.La(c.clone());
        c = this.e;
        null === c || a.cf(c);
        return a
    };
    l.Q = function() {
        return this.get(this.a)
    };
    l.aj = function() {
        return this.$
    };
    l.$i = function() {
        return this.a
    };
    l.Qk = function() {
        return this.e
    };
    l.Rk = function() {
        return this.c
    };
    l.Sk = function() {
        this.k()
    };
    l.Pd = function() {
        null !== this.d && (Wc(this.d), this.d = null);
        var a = this.Q();
        null != a && (this.d = x(a, "change", this.Sk, !1, this));
        this.k()
    };
    l.La = function(a) {
        this.set(this.a, a)
    };
    l.cf = function(a) {
        this.e = a;
        null === a ? a = void 0 : ka(a) || (a = ga(a) ? a : [a], a = Eg(a));
        this.c = a;
        this.k()
    };
    l.Qb = function(a) {
        this.$ = a;
        this.k()
    };
    l.Ic = function(a) {
        Vc(this, hd(this.a), this.Pd, !1, this);
        this.a = a;
        x(this, hd(this.a), this.Pd, !1, this);
        this.Pd()
    };

    function ur(a) {
        a = m(a) ? a : {};
        this.g = this.e = this.d = this.a = this.c = this.b = null;
        this.f = void 0;
        this.rg(m(a.style) ? a.style : El);
        m(a.features) ? ga(a.features) ? this.ld(new of(a.features.slice())) : this.ld(a.features) : this.ld(new of);
        m(a.map) && this.setMap(a.map)
    }
    l = ur.prototype;
    l.pg = function(a) {
        this.b.push(a)
    };
    l.Kk = function() {
        return this.b
    };
    l.Lk = function() {
        return this.d
    };
    l.qg = function() {
        vr(this)
    };
    l.Mj = function(a) {
        a = a.element;
        this.a[ma(a).toString()] = x(a, "change", this.qg, !1, this);
        vr(this)
    };
    l.Nj = function(a) {
        a = ma(a.element).toString();
        Wc(this.a[a]);
        delete this.a[a];
        vr(this)
    };
    l.Ok = function() {
        vr(this)
    };
    l.Pk = function(a) {
        if (null !== this.b) {
            var c = this.f;
            m(c) || (c = El);
            var d = a.b;
            a = a.frameState;
            var e = a.viewState.resolution,
                f = en(e, a.pixelRatio),
                g, h, k, n;
            this.b.forEach(function(a) {
                n = a.c;
                k = m(n) ? n.call(a, e) : c(a, e);
                if (null != k)
                    for (h = k.length, g = 0; g < h; ++g) fn(d, a, k[g], f, this.Ok, this)
            }, this)
        }
    };
    l.Yd = function(a) {
        this.b.remove(a)
    };

    function vr(a) {
        null === a.d || a.d.render()
    }
    l.ld = function(a) {
        null !== this.c && (Sa(this.c, Wc), this.c = null);
        null !== this.a && (Sa(sb(this.a), Wc), this.a = null);
        this.b = a;
        null !== a && (this.c = [x(a, "add", this.Mj, !1, this), x(a, "remove", this.Nj, !1, this)], this.a = {}, a.forEach(function(a) {
            this.a[ma(a).toString()] = x(a, "change", this.qg, !1, this)
        }, this));
        vr(this)
    };
    l.setMap = function(a) {
        null !== this.e && (Wc(this.e), this.e = null);
        vr(this);
        this.d = a;
        null !== a && (this.e = x(a, "postcompose", this.Pk, !1, this), a.render())
    };
    l.rg = function(a) {
        this.g = a;
        this.f = Dl(a);
        vr(this)
    };
    l.Mk = function() {
        return this.g
    };
    l.Nk = function() {
        return this.f
    };

    function wr() {
        this.defaultDataProjection = null
    }

    function xr(a, c, d) {
        var e;
        m(d) && (e = {
            dataProjection: m(d.dataProjection) ? d.dataProjection : a.za(c),
            featureProjection: d.featureProjection
        });
        return yr(a, e)
    }

    function yr(a, c) {
        var d;
        m(c) && (d = {
            featureProjection: c.featureProjection,
            dataProjection: null != c.dataProjection ? c.dataProjection : a.defaultDataProjection,
            rightHanded: c.rightHanded
        });
        return d
    }

    function zr(a, c, d) {
        var e = m(d) ? re(d.featureProjection) : null;
        d = m(d) ? re(d.dataProjection) : null;
        return null === e || null === d || Ie(e, d) ? a : a instanceof uk ? (c ? a.clone() : a).transform(c ? e : d, c ? d : e) : Me(c ? a.slice() : a, c ? e : d, c ? d : e)
    };

    function Ar() {
        this.defaultDataProjection = null
    }
    w(Ar, wr);

    function Br(a) {
        return la(a) ? a : ia(a) ? (a = Pn(a), m(a) ? a : null) : null
    }
    l = Ar.prototype;
    l.M = function() {
        return "json"
    };
    l.sb = function(a, c) {
        return this.Fc(Br(a), xr(this, a, c))
    };
    l.ja = function(a, c) {
        return this.of(Br(a), xr(this, a, c))
    };
    l.Gc = function(a, c) {
        return this.hh(Br(a), xr(this, a, c))
    };
    l.za = function(a) {
        return this.nh(Br(a))
    };
    l.qd = function(a, c) {
        return Qn(this.Lc(a, c))
    };
    l.ub = function(a, c) {
        return Qn(this.ze(a, c))
    };
    l.Mc = function(a, c) {
        return Qn(this.Be(a, c))
    };

    function Cr(a) {
        a = m(a) ? a : {};
        this.defaultDataProjection = null;
        this.b = a.geometryName
    }
    w(Cr, Ar);

    function Dr(a, c) {
        if (null === a) return null;
        var d;
        if (ja(a.x) && ja(a.y)) d = "Point";
        else if (null != a.points) d = "MultiPoint";
        else if (null != a.paths) d = 1 === a.paths.length ? "LineString" : "MultiLineString";
        else if (null != a.rings) {
            var e = a.rings,
                f = Er(a),
                g = [];
            d = [];
            var h, k;
            h = 0;
            for (k = e.length; h < k; ++h) {
                var n = kb(e[h]);
                $k(n, 0, n.length, f.length) ? g.push([e[h]]) : d.push(e[h])
            }
            for (; d.length;) {
                e = d.shift();
                f = !1;
                for (h = g.length - 1; 0 <= h; h--)
                    if (Rd((new Qk(g[h][0])).G(), (new Qk(e)).G())) {
                        g[h].push(e);
                        f = !0;
                        break
                    }
                f || g.push([e.reverse()])
            }
            a = Db(a);
            1 === g.length ? (d = "Polygon", a.rings = g[0]) : (d = "MultiPolygon", a.rings = g)
        }
        return zr((0, Fr[d])(a), !1, c)
    }

    function Er(a) {
        var c = "XY";
        !0 === a.hasZ && !0 === a.hasM ? c = "XYZM" : !0 === a.hasZ ? c = "XYZ" : !0 === a.hasM && (c = "XYM");
        return c
    }

    function Gr(a) {
        a = a.a;
        return {
            hasZ: "XYZ" === a || "XYZM" === a,
            hasM: "XYM" === a || "XYZM" === a
        }
    }
    var Fr = {
            Point: function(a) {
                return null != a.m && null != a.z ? new E([a.x, a.y, a.z, a.m], "XYZM") : null != a.z ? new E([a.x, a.y, a.z], "XYZ") : null != a.m ? new E([a.x, a.y, a.m], "XYM") : new E([a.x, a.y])
            },
            LineString: function(a) {
                return new O(a.paths[0], Er(a))
            },
            Polygon: function(a) {
                return new F(a.rings, Er(a))
            },
            MultiPoint: function(a) {
                return new an(a.points, Er(a))
            },
            MultiLineString: function(a) {
                return new Q(a.paths, Er(a))
            },
            MultiPolygon: function(a) {
                return new R(a.rings, Er(a))
            }
        },
        Hr = {
            Point: function(a) {
                var c = a.K();
                a = a.a;
                if ("XYZ" === a) return {
                    x: c[0],
                    y: c[1],
                    z: c[2]
                };
                if ("XYM" === a) return {
                    x: c[0],
                    y: c[1],
                    m: c[2]
                };
                if ("XYZM" === a) return {
                    x: c[0],
                    y: c[1],
                    z: c[2],
                    m: c[3]
                };
                if ("XY" === a) return {
                    x: c[0],
                    y: c[1]
                }
            },
            LineString: function(a) {
                var c = Gr(a);
                return {
                    hasZ: c.hasZ,
                    hasM: c.hasM,
                    paths: [a.K()]
                }
            },
            Polygon: function(a) {
                var c = Gr(a);
                return {
                    hasZ: c.hasZ,
                    hasM: c.hasM,
                    rings: a.K(!1)
                }
            },
            MultiPoint: function(a) {
                var c = Gr(a);
                return {
                    hasZ: c.hasZ,
                    hasM: c.hasM,
                    points: a.K()
                }
            },
            MultiLineString: function(a) {
                var c = Gr(a);
                return {
                    hasZ: c.hasZ,
                    hasM: c.hasM,
                    paths: a.K()
                }
            },
            MultiPolygon: function(a) {
                var c = Gr(a);
                a = a.K(!1);
                for (var d = [], e = 0; e < a.length; e++)
                    for (var f = a[e].length - 1; 0 <= f; f--) d.push(a[e][f]);
                return {
                    hasZ: c.hasZ,
                    hasM: c.hasM,
                    rings: d
                }
            }
        };
    l = Cr.prototype;
    l.Fc = function(a, c) {
        var d = Dr(a.geometry, c),
            e = new X;
        m(this.b) && e.Ic(this.b);
        e.La(d);
        m(c) && m(c.Xe) && m(a.attributes[c.Xe]) && e.Qb(a.attributes[c.Xe]);
        m(a.attributes) && e.t(a.attributes);
        return e
    };
    l.of = function(a, c) {
        var d = m(c) ? c : {};
        if (null != a.features) {
            var e = [],
                f = a.features,
                g, h;
            d.Xe = a.objectIdFieldName;
            g = 0;
            for (h = f.length; g < h; ++g) e.push(this.Fc(f[g], d));
            return e
        }
        return [this.Fc(a, d)]
    };
    l.hh = function(a, c) {
        return Dr(a, c)
    };
    l.nh = function(a) {
        return null != a.spatialReference && null != a.spatialReference.wkid ? re("EPSG:" + a.spatialReference.wkid) : null
    };

    function Ir(a, c) {
        return (0, Hr[a.M()])(zr(a, !0, c), c)
    }
    l.Be = function(a, c) {
        return Ir(a, yr(this, c))
    };
    l.Lc = function(a, c) {
        c = yr(this, c);
        var d = {},
            e = a.Q();
        null != e && (d.geometry = Ir(e, c));
        e = a.D();
        zb(e, a.a);
        d.attributes = xb(e) ? {} : e;
        m(c) && m(c.featureProjection) && (d.spatialReference = {
            wkid: re(c.featureProjection).b.split(":").pop()
        });
        return d
    };
    l.ze = function(a, c) {
        c = yr(this, c);
        var d = [],
            e, f;
        e = 0;
        for (f = a.length; e < f; ++e) d.push(this.Lc(a[e], c));
        return {
            features: d
        }
    };

    function Jr(a) {
        a = m(a) ? a : {};
        this.defaultDataProjection = null;
        this.defaultDataProjection = re(null != a.defaultDataProjection ? a.defaultDataProjection : "EPSG:4326");
        this.b = a.geometryName
    }
    w(Jr, Ar);

    function Kr(a, c) {
        return null === a ? null : zr((0, Lr[a.type])(a), !1, c)
    }

    function Mr(a, c) {
        return (0, Nr[a.M()])(zr(a, !0, c), c)
    }
    var Lr = {
            Point: function(a) {
                return new E(a.coordinates)
            },
            LineString: function(a) {
                return new O(a.coordinates)
            },
            Polygon: function(a) {
                return new F(a.coordinates)
            },
            MultiPoint: function(a) {
                return new an(a.coordinates)
            },
            MultiLineString: function(a) {
                return new Q(a.coordinates)
            },
            MultiPolygon: function(a) {
                return new R(a.coordinates)
            },
            GeometryCollection: function(a, c) {
                var d = Ua(a.geometries, function(a) {
                    return Kr(a, c)
                });
                return new Rm(d)
            }
        },
        Nr = {
            Point: function(a) {
                return {
                    type: "Point",
                    coordinates: a.K()
                }
            },
            LineString: function(a) {
                return {
                    type: "LineString",
                    coordinates: a.K()
                }
            },
            Polygon: function(a, c) {
                var d;
                m(c) && (d = c.rightHanded);
                return {
                    type: "Polygon",
                    coordinates: a.K(d)
                }
            },
            MultiPoint: function(a) {
                return {
                    type: "MultiPoint",
                    coordinates: a.K()
                }
            },
            MultiLineString: function(a) {
                return {
                    type: "MultiLineString",
                    coordinates: a.K()
                }
            },
            MultiPolygon: function(a, c) {
                var d;
                m(c) && (d = c.rightHanded);
                return {
                    type: "MultiPolygon",
                    coordinates: a.K(d)
                }
            },
            GeometryCollection: function(a, c) {
                return {
                    type: "GeometryCollection",
                    geometries: Ua(a.d, function(a) {
                        return Mr(a, c)
                    })
                }
            },
            Circle: function() {
                return {
                    type: "GeometryCollection",
                    geometries: []
                }
            }
        };
    l = Jr.prototype;
    l.Fc = function(a, c) {
        var d = Kr(a.geometry, c),
            e = new X;
        m(this.b) && e.Ic(this.b);
        e.La(d);
        m(a.id) && e.Qb(a.id);
        m(a.properties) && e.t(a.properties);
        return e
    };
    l.of = function(a, c) {
        if ("Feature" == a.type) return [this.Fc(a, c)];
        if ("FeatureCollection" == a.type) {
            var d = [],
                e = a.features,
                f, g;
            f = 0;
            for (g = e.length; f < g; ++f) d.push(this.Fc(e[f], c));
            return d
        }
        return []
    };
    l.hh = function(a, c) {
        return Kr(a, c)
    };
    l.nh = function(a) {
        a = a.crs;
        return null != a ? "name" == a.type ? re(a.properties.name) : "EPSG" == a.type ? re("EPSG:" + a.properties.code) : null : this.defaultDataProjection
    };
    l.Lc = function(a, c) {
        c = yr(this, c);
        var d = {
                type: "Feature"
            },
            e = a.$;
        null != e && (d.id = e);
        e = a.Q();
        null != e && (d.geometry = Mr(e, c));
        e = a.D();
        zb(e, a.a);
        d.properties = xb(e) ? null : e;
        return d
    };
    l.ze = function(a, c) {
        c = yr(this, c);
        var d = [],
            e, f;
        e = 0;
        for (f = a.length; e < f; ++e) d.push(this.Lc(a[e], c));
        return {
            type: "FeatureCollection",
            features: d
        }
    };
    l.Be = function(a, c) {
        return Mr(a, yr(this, c))
    };

    function Or() {
        this.defaultDataProjection = null
    }
    w(Or, wr);
    l = Or.prototype;
    l.M = function() {
        return "xml"
    };
    l.sb = function(a, c) {
        if (Io(a)) return Pr(this, a, c);
        if (Lo(a)) return this.fh(a, c);
        if (ia(a)) {
            var d = Vo(a);
            return Pr(this, d, c)
        }
        return null
    };

    function Pr(a, c, d) {
        a = Qr(a, c, d);
        return 0 < a.length ? a[0] : null
    }
    l.ja = function(a, c) {
        if (Io(a)) return Qr(this, a, c);
        if (Lo(a)) return this.Ob(a, c);
        if (ia(a)) {
            var d = Vo(a);
            return Qr(this, d, c)
        }
        return []
    };

    function Qr(a, c, d) {
        var e = [];
        for (c = c.firstChild; null !== c; c = c.nextSibling) 1 == c.nodeType && db(e, a.Ob(c, d));
        return e
    }
    l.Gc = function(a, c) {
        if (Io(a)) return this.l(a, c);
        if (Lo(a)) {
            var d = this.qe(a, [xr(this, a, m(c) ? c : {})]);
            return m(d) ? d : null
        }
        return ia(a) ? (d = Vo(a), this.l(d, c)) : null
    };
    l.za = function(a) {
        return Io(a) ? this.sf(a) : Lo(a) ? this.te(a) : ia(a) ? (a = Vo(a), this.sf(a)) : null
    };
    l.sf = function() {
        return this.defaultDataProjection
    };
    l.te = function() {
        return this.defaultDataProjection
    };
    l.qd = function(a, c) {
        var d = this.U(a, c);
        return to(d)
    };
    l.ub = function(a, c) {
        var d = this.a(a, c);
        return to(d)
    };
    l.Mc = function(a, c) {
        var d = this.q(a, c);
        return to(d)
    };

    function Rr(a) {
        a = m(a) ? a : {};
        this.featureType = a.featureType;
        this.featureNS = a.featureNS;
        this.srsName = a.srsName;
        this.schemaLocation = "";
        this.b = {};
        this.b["http://www.opengis.net/gml"] = {
            featureMember: Yo(Rr.prototype.jd),
            featureMembers: Yo(Rr.prototype.jd)
        };
        this.defaultDataProjection = null
    }
    w(Rr, Or);
    l = Rr.prototype;
    l.jd = function(a, c) {
        var d = Fo(a),
            e;
        if ("FeatureCollection" == d) "http://www.opengis.net/wfs" === a.namespaceURI ? e = V([], this.b, a, c, this) : e = V(null, this.b, a, c, this);
        else if ("featureMembers" == d || "featureMember" == d) {
            var f = c[0],
                g = f.featureType;
            e = f.featureNS;
            var h, k;
            if (!m(g) && null != a.childNodes) {
                g = [];
                e = {};
                h = 0;
                for (k = a.childNodes.length; h < k; ++h) {
                    var n = a.childNodes[h];
                    if (1 === n.nodeType) {
                        var p = n.nodeName.split(":").pop();
                        if (-1 === Ra(g, p)) {
                            var q;
                            vb(e, n.namespaceURI) ? q = wb(e, function(a) {
                                return a === n.namespaceURI
                            }) : (q = "p" + rb(e), e[q] = n.namespaceURI);
                            g.push(q + ":" + p)
                        }
                    }
                }
                f.featureType = g;
                f.featureNS = e
            }
            ia(e) && (h = e, e = {}, e.p0 = h);
            var f = {},
                g = ga(g) ? g : [g],
                r;
            for (r in e) {
                p = {};
                h = 0;
                for (k = g.length; h < k; ++h)(-1 === g[h].indexOf(":") ? "p0" : g[h].split(":")[0]) === r && (p[g[h].split(":").pop()] = "featureMembers" == d ? Xo(this.nf, this) : Yo(this.nf, this));
                f[e[r]] = p
            }
            e = V([], f, a, c)
        }
        m(e) || (e = []);
        return e
    };
    l.qe = function(a, c) {
        var d = c[0];
        d.srsName = a.firstElementChild.getAttribute("srsName");
        var e = V(null, this.Cf, a, c, this);
        if (null != e) return zr(e, !1, d)
    };
    l.nf = function(a, c) {
        var d, e = a.getAttribute("fid") || Po(a, "http://www.opengis.net/gml", "id"),
            f = {},
            g;
        for (d = a.firstElementChild; null !== d; d = d.nextElementSibling) {
            var h = Fo(d);
            if (0 === d.childNodes.length || 1 === d.childNodes.length && 3 === d.firstChild.nodeType) {
                var k = Bo(d, !1);
                /^[\s\xa0]*$/.test(k) && (k = void 0);
                f[h] = k
            } else "boundedBy" !== h && (g = h), f[h] = this.qe(d, c)
        }
        d = new X(f);
        m(g) && d.Ic(g);
        e && d.Qb(e);
        return d
    };
    l.mh = function(a, c) {
        var d = this.pe(a, c);
        if (null != d) {
            var e = new E(null);
            Sk(e, "XYZ", d);
            return e
        }
    };
    l.kh = function(a, c) {
        var d = V([], this.ai, a, c, this);
        if (m(d)) return new an(d)
    };
    l.jh = function(a, c) {
        var d = V([], this.$h, a, c, this);
        if (m(d)) {
            var e = new Q(null);
            $m(e, d);
            return e
        }
    };
    l.lh = function(a, c) {
        var d = V([], this.bi, a, c, this);
        if (m(d)) {
            var e = new R(null);
            cn(e, d);
            return e
        }
    };
    l.$g = function(a, c) {
        fp(this.ei, a, c, this)
    };
    l.kg = function(a, c) {
        fp(this.Yh, a, c, this)
    };
    l.ah = function(a, c) {
        fp(this.fi, a, c, this)
    };
    l.re = function(a, c) {
        var d = this.pe(a, c);
        if (null != d) {
            var e = new O(null);
            Ym(e, "XYZ", d);
            return e
        }
    };
    l.yn = function(a, c) {
        var d = V(null, this.sd, a, c, this);
        if (null != d) return d
    };
    l.ih = function(a, c) {
        var d = this.pe(a, c);
        if (m(d)) {
            var e = new Qk(null);
            Rk(e, "XYZ", d);
            return e
        }
    };
    l.se = function(a, c) {
        var d = V([null], this.De, a, c, this);
        if (m(d) && null !== d[0]) {
            var e = new F(null),
                f = d[0],
                g = [f.length],
                h, k;
            h = 1;
            for (k = d.length; h < k; ++h) db(f, d[h]), g.push(f.length);
            dl(e, "XYZ", f, g);
            return e
        }
    };
    l.pe = function(a, c) {
        return V(null, this.sd, a, c, this)
    };
    l.ai = Object({
        "http://www.opengis.net/gml": {
            pointMember: Xo(Rr.prototype.$g),
            pointMembers: Xo(Rr.prototype.$g)
        }
    });
    l.$h = Object({
        "http://www.opengis.net/gml": {
            lineStringMember: Xo(Rr.prototype.kg),
            lineStringMembers: Xo(Rr.prototype.kg)
        }
    });
    l.bi = Object({
        "http://www.opengis.net/gml": {
            polygonMember: Xo(Rr.prototype.ah),
            polygonMembers: Xo(Rr.prototype.ah)
        }
    });
    l.ei = Object({
        "http://www.opengis.net/gml": {
            Point: Xo(Rr.prototype.pe)
        }
    });
    l.Yh = Object({
        "http://www.opengis.net/gml": {
            LineString: Xo(Rr.prototype.re)
        }
    });
    l.fi = Object({
        "http://www.opengis.net/gml": {
            Polygon: Xo(Rr.prototype.se)
        }
    });
    l.td = Object({
        "http://www.opengis.net/gml": {
            LinearRing: Yo(Rr.prototype.yn)
        }
    });
    l.Ob = function(a, c) {
        var d = {
            featureType: this.featureType,
            featureNS: this.featureNS
        };
        m(c) && Fb(d, xr(this, a, c));
        return this.jd(a, [d])
    };
    l.te = function(a) {
        return re(m(this.o) ? this.o : a.firstElementChild.getAttribute("srsName"))
    };

    function Sr(a) {
        a = Bo(a, !1);
        return Tr(a)
    }

    function Tr(a) {
        if (a = /^\s*(true|1)|(false|0)\s*$/.exec(a)) return m(a[1]) || !1
    }

    function Ur(a) {
        a = Bo(a, !1);
        if (a = /^\s*(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(Z|(?:([+\-])(\d{2})(?::(\d{2}))?))\s*$/.exec(a)) {
            var c = Date.UTC(parseInt(a[1], 10), parseInt(a[2], 10) - 1, parseInt(a[3], 10), parseInt(a[4], 10), parseInt(a[5], 10), parseInt(a[6], 10)) / 1E3;
            if ("Z" != a[7]) {
                var d = "-" == a[8] ? -1 : 1,
                    c = c + 60 * d * parseInt(a[9], 10);
                m(a[10]) && (c += 3600 * d * parseInt(a[10], 10))
            }
            return c
        }
    }

    function Vr(a) {
        a = Bo(a, !1);
        return Wr(a)
    }

    function Wr(a) {
        if (a = /^\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)\s*$/i.exec(a)) return parseFloat(a[1])
    }

    function Xr(a) {
        a = Bo(a, !1);
        return Yr(a)
    }

    function Yr(a) {
        if (a = /^\s*(\d+)\s*$/.exec(a)) return parseInt(a[1], 10)
    }

    function Y(a) {
        a = Bo(a, !1);
        return Ca(a)
    }

    function Zr(a, c) {
        $r(a, c ? "1" : "0")
    }

    function as(a, c) {
        a.appendChild(xo.createTextNode(c.toPrecision()))
    }

    function bs(a, c) {
        a.appendChild(xo.createTextNode(c.toString()))
    }

    function $r(a, c) {
        a.appendChild(xo.createTextNode(c))
    };

    function cs(a) {
        a = m(a) ? a : {};
        Rr.call(this, a);
        this.i = m(a.surface) ? a.surface : !1;
        this.e = m(a.curve) ? a.curve : !1;
        this.f = m(a.multiCurve) ? a.multiCurve : !0;
        this.g = m(a.multiSurface) ? a.multiSurface : !0;
        this.schemaLocation = m(a.schemaLocation) ? a.schemaLocation : "http://www.opengis.net/gml http://schemas.opengis.net/gml/3.1.1/profiles/gmlsfProfile/1.0.0/gmlsf.xsd"
    }
    w(cs, Rr);
    l = cs.prototype;
    l.Bn = function(a, c) {
        var d = V([], this.Zh, a, c, this);
        if (m(d)) {
            var e = new Q(null);
            $m(e, d);
            return e
        }
    };
    l.Cn = function(a, c) {
        var d = V([], this.ci, a, c, this);
        if (m(d)) {
            var e = new R(null);
            cn(e, d);
            return e
        }
    };
    l.Nf = function(a, c) {
        fp(this.Vh, a, c, this)
    };
    l.Hh = function(a, c) {
        fp(this.ji, a, c, this)
    };
    l.Fn = function(a, c) {
        return V([null], this.di, a, c, this)
    };
    l.Hn = function(a, c) {
        return V([null], this.ii, a, c, this)
    };
    l.Gn = function(a, c) {
        return V([null], this.De, a, c, this)
    };
    l.An = function(a, c) {
        return V([null], this.sd, a, c, this)
    };
    l.rk = function(a, c) {
        var d = V(void 0, this.td, a, c, this);
        m(d) && c[c.length - 1].push(d)
    };
    l.Di = function(a, c) {
        var d = V(void 0, this.td, a, c, this);
        m(d) && (c[c.length - 1][0] = d)
    };
    l.oh = function(a, c) {
        var d = V([null], this.ki, a, c, this);
        if (m(d) && null !== d[0]) {
            var e = new F(null),
                f = d[0],
                g = [f.length],
                h, k;
            h = 1;
            for (k = d.length; h < k; ++h) db(f, d[h]), g.push(f.length);
            dl(e, "XYZ", f, g);
            return e
        }
    };
    l.dh = function(a, c) {
        var d = V([null], this.Wh, a, c, this);
        if (m(d)) {
            var e = new O(null);
            Ym(e, "XYZ", d);
            return e
        }
    };
    l.xn = function(a, c) {
        var d = V([null], this.Xh, a, c, this);
        return Nd(d[1][0], d[1][1], d[2][0], d[2][1])
    };
    l.zn = function(a, c) {
        for (var d = Bo(a, !1), e = /^\s*([+\-]?\d*\.?\d+(?:[eE][+\-]?\d+)?)\s*/, f = [], g; g = e.exec(d);) f.push(parseFloat(g[1])), d = d.substr(g[0].length);
        if ("" === d) {
            d = c[0].srsName;
            e = "enu";
            null === d || (e = ue(re(d)));
            if ("neu" === e)
                for (d = 0, e = f.length; d < e; d += 3) g = f[d], f[d] = f[d + 1], f[d + 1] = g;
            d = f.length;
            2 == d && f.push(0);
            return 0 === d ? void 0 : f
        }
    };
    l.qf = function(a, c) {
        var d = Bo(a, !1).replace(/^\s*|\s*$/g, ""),
            e = c[0].srsName,
            f = a.parentNode.getAttribute("srsDimension"),
            g = "enu";
        null === e || (g = ue(re(e)));
        d = d.split(/\s+/);
        e = 2;
        fa(a.getAttribute("srsDimension")) ? fa(a.getAttribute("dimension")) ? null === f || (e = Yr(f)) : e = Yr(a.getAttribute("dimension")) : e = Yr(a.getAttribute("srsDimension"));
        for (var h, k, n = [], p = 0, q = d.length; p < q; p += e) f = parseFloat(d[p]), h = parseFloat(d[p + 1]), k = 3 === e ? parseFloat(d[p + 2]) : 0, "en" === g.substr(0, 2) ? n.push(f, h, k) : n.push(h, f, k);
        return n
    };
    l.sd = Object({
        "http://www.opengis.net/gml": {
            pos: Yo(cs.prototype.zn),
            posList: Yo(cs.prototype.qf)
        }
    });
    l.De = Object({
        "http://www.opengis.net/gml": {
            interior: cs.prototype.rk,
            exterior: cs.prototype.Di
        }
    });
    l.Cf = Object({
        "http://www.opengis.net/gml": {
            Point: Yo(Rr.prototype.mh),
            MultiPoint: Yo(Rr.prototype.kh),
            LineString: Yo(Rr.prototype.re),
            MultiLineString: Yo(Rr.prototype.jh),
            LinearRing: Yo(Rr.prototype.ih),
            Polygon: Yo(Rr.prototype.se),
            MultiPolygon: Yo(Rr.prototype.lh),
            Surface: Yo(cs.prototype.oh),
            MultiSurface: Yo(cs.prototype.Cn),
            Curve: Yo(cs.prototype.dh),
            MultiCurve: Yo(cs.prototype.Bn),
            Envelope: Yo(cs.prototype.xn)
        }
    });
    l.Zh = Object({
        "http://www.opengis.net/gml": {
            curveMember: Xo(cs.prototype.Nf),
            curveMembers: Xo(cs.prototype.Nf)
        }
    });
    l.ci = Object({
        "http://www.opengis.net/gml": {
            surfaceMember: Xo(cs.prototype.Hh),
            surfaceMembers: Xo(cs.prototype.Hh)
        }
    });
    l.Vh = Object({
        "http://www.opengis.net/gml": {
            LineString: Xo(Rr.prototype.re),
            Curve: Xo(cs.prototype.dh)
        }
    });
    l.ji = Object({
        "http://www.opengis.net/gml": {
            Polygon: Xo(Rr.prototype.se),
            Surface: Xo(cs.prototype.oh)
        }
    });
    l.ki = Object({
        "http://www.opengis.net/gml": {
            patches: Yo(cs.prototype.Fn)
        }
    });
    l.Wh = Object({
        "http://www.opengis.net/gml": {
            segments: Yo(cs.prototype.Hn)
        }
    });
    l.Xh = Object({
        "http://www.opengis.net/gml": {
            lowerCorner: Xo(cs.prototype.qf),
            upperCorner: Xo(cs.prototype.qf)
        }
    });
    l.di = Object({
        "http://www.opengis.net/gml": {
            PolygonPatch: Yo(cs.prototype.Gn)
        }
    });
    l.ii = Object({
        "http://www.opengis.net/gml": {
            LineStringSegment: Yo(cs.prototype.An)
        }
    });

    function ds(a, c, d) {
        d = d[d.length - 1].srsName;
        c = c.K();
        for (var e = c.length, f = Array(e), g, h = 0; h < e; ++h) {
            g = c[h];
            var k = h,
                n = "enu";
            null != d && (n = ue(re(d)));
            f[k] = "en" === n.substr(0, 2) ? g[0] + " " + g[1] : g[1] + " " + g[0]
        }
        $r(a, f.join(" "))
    }
    l.Rh = function(a, c, d) {
        var e = d[d.length - 1].srsName;
        null != e && a.setAttribute("srsName", e);
        e = Ao(a.namespaceURI, "pos");
        a.appendChild(e);
        d = d[d.length - 1].srsName;
        a = "enu";
        null != d && (a = ue(re(d)));
        c = c.K();
        $r(e, "en" === a.substr(0, 2) ? c[0] + " " + c[1] : c[1] + " " + c[0])
    };
    var es = {
        "http://www.opengis.net/gml": {
            lowerCorner: U($r),
            upperCorner: U($r)
        }
    };
    l = cs.prototype;
    l.wo = function(a, c, d) {
        var e = d[d.length - 1].srsName;
        m(e) && a.setAttribute("srsName", e);
        gp({
            P: a
        }, es, dp, [c[0] + " " + c[1], c[2] + " " + c[3]], d, ["lowerCorner", "upperCorner"], this)
    };
    l.Oh = function(a, c, d) {
        var e = d[d.length - 1].srsName;
        null != e && a.setAttribute("srsName", e);
        e = Ao(a.namespaceURI, "posList");
        a.appendChild(e);
        ds(e, c, d)
    };
    l.hi = function(a, c) {
        var d = c[c.length - 1],
            e = d.P,
            f = d.exteriorWritten;
        m(f) || (d.exteriorWritten = !0);
        return Ao(e.namespaceURI, m(f) ? "interior" : "exterior")
    };
    l.Ce = function(a, c, d) {
        var e = d[d.length - 1].srsName;
        "PolygonPatch" !== a.nodeName && null != e && a.setAttribute("srsName", e);
        "Polygon" === a.nodeName || "PolygonPatch" === a.nodeName ? (c = c.Ed(), gp({
            P: a,
            srsName: e
        }, fs, this.hi, c, d, void 0, this)) : "Surface" === a.nodeName && (e = Ao(a.namespaceURI, "patches"), a.appendChild(e), a = Ao(e.namespaceURI, "PolygonPatch"), e.appendChild(a), this.Ce(a, c, d))
    };
    l.xe = function(a, c, d) {
        var e = d[d.length - 1].srsName;
        "LineStringSegment" !== a.nodeName && null != e && a.setAttribute("srsName", e);
        "LineString" === a.nodeName || "LineStringSegment" === a.nodeName ? (e = Ao(a.namespaceURI, "posList"), a.appendChild(e), ds(e, c, d)) : "Curve" === a.nodeName && (e = Ao(a.namespaceURI, "segments"), a.appendChild(e), a = Ao(e.namespaceURI, "LineStringSegment"), e.appendChild(a), this.xe(a, c, d))
    };
    l.Qh = function(a, c, d) {
        var e = d[d.length - 1],
            f = e.srsName,
            e = e.surface;
        null != f && a.setAttribute("srsName", f);
        c = c.Id();
        gp({
            P: a,
            srsName: f,
            surface: e
        }, gs, this.d, c, d, void 0, this)
    };
    l.xo = function(a, c, d) {
        var e = d[d.length - 1].srsName;
        null != e && a.setAttribute("srsName", e);
        c = c.ce();
        gp({
            P: a,
            srsName: e
        }, hs, bp("pointMember"), c, d, void 0, this)
    };
    l.Ph = function(a, c, d) {
        var e = d[d.length - 1],
            f = e.srsName,
            e = e.curve;
        null != f && a.setAttribute("srsName", f);
        c = c.ad();
        gp({
            P: a,
            srsName: f,
            curve: e
        }, is, this.d, c, d, void 0, this)
    };
    l.Sh = function(a, c, d) {
        var e = Ao(a.namespaceURI, "LinearRing");
        a.appendChild(e);
        this.Oh(e, c, d)
    };
    l.Th = function(a, c, d) {
        var e = this.c(c, d);
        m(e) && (a.appendChild(e), this.Ce(e, c, d))
    };
    l.yo = function(a, c, d) {
        var e = Ao(a.namespaceURI, "Point");
        a.appendChild(e);
        this.Rh(e, c, d)
    };
    l.Nh = function(a, c, d) {
        var e = this.c(c, d);
        m(e) && (a.appendChild(e), this.xe(e, c, d))
    };
    l.Ae = function(a, c, d) {
        var e = d[d.length - 1],
            f = Db(e);
        f.P = a;
        var g;
        ga(c) ? m(e.dataProjection) ? g = Me(c, e.featureProjection, e.dataProjection) : g = c : g = zr(c, !0, e);
        gp(f, js, this.c, [g], d, void 0, this)
    };
    l.Lh = function(a, c, d) {
        var e = c.$;
        m(e) && a.setAttribute("fid", e);
        var e = d[d.length - 1],
            f = e.featureNS,
            g = c.a;
        m(e.fc) || (e.fc = {}, e.fc[f] = {});
        var h = c.D();
        c = [];
        var k = [],
            n;
        for (n in h) {
            var p = h[n];
            null !== p && (c.push(n), k.push(p), n == g ? n in e.fc[f] || (e.fc[f][n] = U(this.Ae, this)) : n in e.fc[f] || (e.fc[f][n] = U($r)))
        }
        n = Db(e);
        n.P = a;
        gp(n, e.fc, bp(void 0, f), k, d, c)
    };
    var gs = {
            "http://www.opengis.net/gml": {
                surfaceMember: U(cs.prototype.Th),
                polygonMember: U(cs.prototype.Th)
            }
        },
        hs = {
            "http://www.opengis.net/gml": {
                pointMember: U(cs.prototype.yo)
            }
        },
        is = {
            "http://www.opengis.net/gml": {
                lineStringMember: U(cs.prototype.Nh),
                curveMember: U(cs.prototype.Nh)
            }
        },
        fs = {
            "http://www.opengis.net/gml": {
                exterior: U(cs.prototype.Sh),
                interior: U(cs.prototype.Sh)
            }
        },
        js = {
            "http://www.opengis.net/gml": {
                Curve: U(cs.prototype.xe),
                MultiCurve: U(cs.prototype.Ph),
                Point: U(cs.prototype.Rh),
                MultiPoint: U(cs.prototype.xo),
                LineString: U(cs.prototype.xe),
                MultiLineString: U(cs.prototype.Ph),
                LinearRing: U(cs.prototype.Oh),
                Polygon: U(cs.prototype.Ce),
                MultiPolygon: U(cs.prototype.Qh),
                Surface: U(cs.prototype.Ce),
                MultiSurface: U(cs.prototype.Qh),
                Envelope: U(cs.prototype.wo)
            }
        },
        ks = {
            MultiLineString: "lineStringMember",
            MultiCurve: "curveMember",
            MultiPolygon: "polygonMember",
            MultiSurface: "surfaceMember"
        };
    cs.prototype.d = function(a, c) {
        return Ao("http://www.opengis.net/gml", ks[c[c.length - 1].P.nodeName])
    };
    cs.prototype.c = function(a, c) {
        var d = c[c.length - 1],
            e = d.multiSurface,
            f = d.surface,
            g = d.curve,
            d = d.multiCurve,
            h;
        ga(a) ? h = "Envelope" : (h = a.M(), "MultiPolygon" === h && !0 === e ? h = "MultiSurface" : "Polygon" === h && !0 === f ? h = "Surface" : "LineString" === h && !0 === g ? h = "Curve" : "MultiLineString" === h && !0 === d && (h = "MultiCurve"));
        return Ao("http://www.opengis.net/gml", h)
    };
    cs.prototype.q = function(a, c) {
        c = yr(this, c);
        var d = Ao("http://www.opengis.net/gml", "geom"),
            e = {
                P: d,
                srsName: this.srsName,
                curve: this.e,
                surface: this.i,
                multiSurface: this.g,
                multiCurve: this.f
            };
        m(c) && Fb(e, c);
        this.Ae(d, a, [e]);
        return d
    };
    cs.prototype.a = function(a, c) {
        c = yr(this, c);
        var d = Ao("http://www.opengis.net/gml", "featureMembers");
        Uo(d, "http://www.w3.org/2001/XMLSchema-instance", "xsi:schemaLocation", this.schemaLocation);
        var e = {
            srsName: this.srsName,
            curve: this.e,
            surface: this.i,
            multiSurface: this.g,
            multiCurve: this.f,
            featureNS: this.featureNS,
            featureType: this.featureType
        };
        m(c) && Fb(e, c);
        var e = [e],
            f = e[e.length - 1],
            g = f.featureType,
            h = f.featureNS,
            k = {};
        k[h] = {};
        k[h][g] = U(this.Lh, this);
        f = Db(f);
        f.P = d;
        gp(f, k, bp(g, h), a, e);
        return d
    };

    function ls(a) {
        a = m(a) ? a : {};
        Rr.call(this, a);
        this.b["http://www.opengis.net/gml"].featureMember = Xo(Rr.prototype.jd);
        this.schemaLocation = m(a.schemaLocation) ? a.schemaLocation : "http://www.opengis.net/gml http://schemas.opengis.net/gml/2.1.2/feature.xsd"
    }
    w(ls, Rr);
    l = ls.prototype;
    l.gh = function(a, c) {
        var d = Bo(a, !1).replace(/^\s*|\s*$/g, ""),
            e = c[0].srsName,
            f = a.parentNode.getAttribute("srsDimension"),
            g = "enu";
        null === e || (g = ue(re(e)));
        d = d.split(/[\s,]+/);
        e = 2;
        fa(a.getAttribute("srsDimension")) ? fa(a.getAttribute("dimension")) ? null === f || (e = Yr(f)) : e = Yr(a.getAttribute("dimension")) : e = Yr(a.getAttribute("srsDimension"));
        for (var h, k, n = [], p = 0, q = d.length; p < q; p += e) f = parseFloat(d[p]), h = parseFloat(d[p + 1]), k = 3 === e ? parseFloat(d[p + 2]) : 0, "en" === g.substr(0, 2) ? n.push(f, h, k) : n.push(h, f, k);
        return n
    };
    l.wn = function(a, c) {
        var d = V([null], this.Uh, a, c, this);
        return Nd(d[1][0], d[1][1], d[1][3], d[1][4])
    };
    l.pk = function(a, c) {
        var d = V(void 0, this.td, a, c, this);
        m(d) && c[c.length - 1].push(d)
    };
    l.gn = function(a, c) {
        var d = V(void 0, this.td, a, c, this);
        m(d) && (c[c.length - 1][0] = d)
    };
    l.sd = Object({
        "http://www.opengis.net/gml": {
            coordinates: Yo(ls.prototype.gh)
        }
    });
    l.De = Object({
        "http://www.opengis.net/gml": {
            innerBoundaryIs: ls.prototype.pk,
            outerBoundaryIs: ls.prototype.gn
        }
    });
    l.Uh = Object({
        "http://www.opengis.net/gml": {
            coordinates: Xo(ls.prototype.gh)
        }
    });
    l.Cf = Object({
        "http://www.opengis.net/gml": {
            Point: Yo(Rr.prototype.mh),
            MultiPoint: Yo(Rr.prototype.kh),
            LineString: Yo(Rr.prototype.re),
            MultiLineString: Yo(Rr.prototype.jh),
            LinearRing: Yo(Rr.prototype.ih),
            Polygon: Yo(Rr.prototype.se),
            MultiPolygon: Yo(Rr.prototype.lh),
            Box: Yo(ls.prototype.wn)
        }
    });

    function ms(a) {
        a = m(a) ? a : {};
        this.defaultDataProjection = null;
        this.defaultDataProjection = re("EPSG:4326");
        this.b = a.readExtensions
    }
    w(ms, Or);
    var ns = [null, "http://www.topografix.com/GPX/1/0", "http://www.topografix.com/GPX/1/1"];

    function os(a, c, d) {
        a.push(parseFloat(c.getAttribute("lon")), parseFloat(c.getAttribute("lat")));
        "ele" in d ? (a.push(d.ele), zb(d, "ele")) : a.push(0);
        "time" in d ? (a.push(d.time), zb(d, "time")) : a.push(0);
        return a
    }

    function ps(a, c) {
        var d = c[c.length - 1],
            e = a.getAttribute("href");
        null === e || (d.link = e);
        fp(qs, a, c)
    }

    function rs(a, c) {
        c[c.length - 1].extensionsNode_ = a
    }

    function ss(a, c) {
        var d = c[0],
            e = V({
                flatCoordinates: []
            }, ts, a, c);
        if (m(e)) {
            var f = e.flatCoordinates;
            zb(e, "flatCoordinates");
            var g = new O(null);
            Ym(g, "XYZM", f);
            zr(g, !1, d);
            d = new X(g);
            d.t(e);
            return d
        }
    }

    function us(a, c) {
        var d = c[0],
            e = V({
                flatCoordinates: [],
                ends: []
            }, vs, a, c);
        if (m(e)) {
            var f = e.flatCoordinates;
            zb(e, "flatCoordinates");
            var g = e.ends;
            zb(e, "ends");
            var h = new Q(null);
            Zm(h, "XYZM", f, g);
            zr(h, !1, d);
            d = new X(h);
            d.t(e);
            return d
        }
    }

    function ws(a, c) {
        var d = c[0],
            e = V({}, xs, a, c);
        if (m(e)) {
            var f = os([], a, e),
                f = new E(f, "XYZM");
            zr(f, !1, d);
            d = new X(f);
            d.t(e);
            return d
        }
    }
    var ys = {
            rte: ss,
            trk: us,
            wpt: ws
        },
        zs = T(ns, {
            rte: Xo(ss),
            trk: Xo(us),
            wpt: Xo(ws)
        }),
        qs = T(ns, {
            text: S(Y, "linkText"),
            type: S(Y, "linkType")
        }),
        ts = T(ns, {
            name: S(Y),
            cmt: S(Y),
            desc: S(Y),
            src: S(Y),
            link: ps,
            number: S(Xr),
            extensions: rs,
            type: S(Y),
            rtept: function(a, c) {
                var d = V({}, As, a, c);
                m(d) && os(c[c.length - 1].flatCoordinates, a, d)
            }
        }),
        As = T(ns, {
            ele: S(Vr),
            time: S(Ur)
        }),
        vs = T(ns, {
            name: S(Y),
            cmt: S(Y),
            desc: S(Y),
            src: S(Y),
            link: ps,
            number: S(Xr),
            type: S(Y),
            extensions: rs,
            trkseg: function(a, c) {
                var d = c[c.length - 1];
                fp(Bs, a, c);
                d.ends.push(d.flatCoordinates.length)
            }
        }),
        Bs = T(ns, {
            trkpt: function(a, c) {
                var d = V({}, Cs, a, c);
                m(d) && os(c[c.length - 1].flatCoordinates, a, d)
            }
        }),
        Cs = T(ns, {
            ele: S(Vr),
            time: S(Ur)
        }),
        xs = T(ns, {
            ele: S(Vr),
            time: S(Ur),
            magvar: S(Vr),
            geoidheight: S(Vr),
            name: S(Y),
            cmt: S(Y),
            desc: S(Y),
            src: S(Y),
            link: ps,
            sym: S(Y),
            type: S(Y),
            fix: S(Y),
            sat: S(Xr),
            hdop: S(Vr),
            vdop: S(Vr),
            pdop: S(Vr),
            ageofdgpsdata: S(Vr),
            dgpsid: S(Xr),
            extensions: rs
        });

    function Ds(a, c) {
        null === c && (c = []);
        for (var d = 0, e = c.length; d < e; ++d) {
            var f = c[d];
            if (m(a.b)) {
                var g = f.get("extensionsNode_") || null;
                a.b(f, g)
            }
            f.set("extensionsNode_", void 0)
        }
    }
    ms.prototype.fh = function(a, c) {
        if (!Ya(ns, a.namespaceURI)) return null;
        var d = ys[a.localName];
        if (!m(d)) return null;
        d = d(a, [xr(this, a, c)]);
        if (!m(d)) return null;
        Ds(this, [d]);
        return d
    };
    ms.prototype.Ob = function(a, c) {
        if (!Ya(ns, a.namespaceURI)) return [];
        if ("gpx" == a.localName) {
            var d = V([], zs, a, [xr(this, a, c)]);
            if (m(d)) return Ds(this, d), d
        }
        return []
    };

    function Es(a, c, d) {
        a.setAttribute("href", c);
        c = d[d.length - 1].properties;
        gp({
            P: a
        }, Fs, dp, [c.linkText, c.linkType], d, Gs)
    }

    function Hs(a, c, d) {
        var e = d[d.length - 1],
            f = e.P.namespaceURI,
            g = e.properties;
        Uo(a, null, "lat", c[1]);
        Uo(a, null, "lon", c[0]);
        switch (e.geometryLayout) {
            case "XYZM":
                0 !== c[3] && (g.time = c[3]);
            case "XYZ":
                0 !== c[2] && (g.ele = c[2]);
                break;
            case "XYM":
                0 !== c[2] && (g.time = c[2])
        }
        c = Is[f];
        e = ep(g, c);
        gp({
            P: a,
            properties: g
        }, Js, dp, e, d, c)
    }
    var Gs = ["text", "type"],
        Fs = $o(ns, {
            text: U($r),
            type: U($r)
        }),
        Ks = $o(ns, "name cmt desc src link number type rtept".split(" ")),
        Ls = $o(ns, {
            name: U($r),
            cmt: U($r),
            desc: U($r),
            src: U($r),
            link: U(Es),
            number: U(bs),
            type: U($r),
            rtept: ap(U(Hs))
        }),
        Ms = $o(ns, "name cmt desc src link number type trkseg".split(" ")),
        Ps = $o(ns, {
            name: U($r),
            cmt: U($r),
            desc: U($r),
            src: U($r),
            link: U(Es),
            number: U(bs),
            type: U($r),
            trkseg: ap(U(function(a, c, d) {
                gp({
                    P: a,
                    geometryLayout: c.a,
                    properties: {}
                }, Ns, Os, c.K(), d)
            }))
        }),
        Os = bp("trkpt"),
        Ns = $o(ns, {
            trkpt: U(Hs)
        }),
        Is = $o(ns, "ele time magvar geoidheight name cmt desc src link sym type fix sat hdop vdop pdop ageofdgpsdata dgpsid".split(" ")),
        Js = $o(ns, {
            ele: U(as),
            time: U(function(a, c) {
                var d = new Date(1E3 * c),
                    d = d.getUTCFullYear() + "-" + Ma(d.getUTCMonth() + 1) + "-" + Ma(d.getUTCDate()) + "T" + Ma(d.getUTCHours()) + ":" + Ma(d.getUTCMinutes()) + ":" + Ma(d.getUTCSeconds()) + "Z";
                a.appendChild(xo.createTextNode(d))
            }),
            magvar: U(as),
            geoidheight: U(as),
            name: U($r),
            cmt: U($r),
            desc: U($r),
            src: U($r),
            link: U(Es),
            sym: U($r),
            type: U($r),
            fix: U($r),
            sat: U(bs),
            hdop: U(as),
            vdop: U(as),
            pdop: U(as),
            ageofdgpsdata: U(as),
            dgpsid: U(bs)
        }),
        Qs = {
            Point: "wpt",
            LineString: "rte",
            MultiLineString: "trk"
        };

    function Rs(a, c) {
        var d = a.Q();
        if (m(d)) return Ao(c[c.length - 1].P.namespaceURI, Qs[d.M()])
    }
    var Ss = $o(ns, {
        rte: U(function(a, c, d) {
            var e = d[0],
                f = c.D();
            a = {
                P: a,
                properties: f
            };
            c = c.Q();
            m(c) && (c = zr(c, !0, e), a.geometryLayout = c.a, f.rtept = c.K());
            e = Ks[d[d.length - 1].P.namespaceURI];
            f = ep(f, e);
            gp(a, Ls, dp, f, d, e)
        }),
        trk: U(function(a, c, d) {
            var e = d[0],
                f = c.D();
            a = {
                P: a,
                properties: f
            };
            c = c.Q();
            m(c) && (c = zr(c, !0, e), f.trkseg = c.ad());
            e = Ms[d[d.length - 1].P.namespaceURI];
            f = ep(f, e);
            gp(a, Ps, dp, f, d, e)
        }),
        wpt: U(function(a, c, d) {
            var e = d[0],
                f = d[d.length - 1];
            f.properties = c.D();
            c = c.Q();
            m(c) && (c = zr(c, !0, e), f.geometryLayout = c.a, Hs(a, c.K(), d))
        })
    });
    ms.prototype.a = function(a, c) {
        c = yr(this, c);
        var d = Ao("http://www.topografix.com/GPX/1/1", "gpx");
        gp({
            P: d
        }, Ss, Rs, a, [c]);
        return d
    };

    function Ts(a) {
        a = Us(a);
        return Ua(a, function(a) {
            return a.c.substring(a.a, a.b)
        })
    }

    function Vs(a, c, d) {
        this.c = a;
        this.a = c;
        this.b = d
    }

    function Us(a) {
        for (var c = RegExp("\r\n|\r|\n", "g"), d = 0, e, f = []; e = c.exec(a);) d = new Vs(a, d, e.index), f.push(d), d = c.lastIndex;
        d < a.length && (d = new Vs(a, d, a.length), f.push(d));
        return f
    };

    function Ws() {
        this.defaultDataProjection = null
    }
    w(Ws, wr);
    l = Ws.prototype;
    l.M = function() {
        return "text"
    };
    l.sb = function(a, c) {
        return this.hd(ia(a) ? a : "", yr(this, c))
    };
    l.ja = function(a, c) {
        return this.pf(ia(a) ? a : "", yr(this, c))
    };
    l.Gc = function(a, c) {
        return this.kd(ia(a) ? a : "", yr(this, c))
    };
    l.za = function() {
        return this.defaultDataProjection
    };
    l.qd = function(a, c) {
        return this.ye(a, yr(this, c))
    };
    l.ub = function(a, c) {
        return this.Mh(a, yr(this, c))
    };
    l.Mc = function(a, c) {
        return this.rd(a, yr(this, c))
    };

    function Xs(a) {
        a = m(a) ? a : {};
        this.defaultDataProjection = null;
        this.defaultDataProjection = re("EPSG:4326");
        this.b = m(a.altitudeMode) ? a.altitudeMode : "none"
    }
    w(Xs, Ws);
    var Ys = /^B(\d{2})(\d{2})(\d{2})(\d{2})(\d{5})([NS])(\d{3})(\d{5})([EW])([AV])(\d{5})(\d{5})/,
        Zs = /^H.([A-Z]{3}).*?:(.*)/,
        $s = /^HFDTE(\d{2})(\d{2})(\d{2})/;
    Xs.prototype.hd = function(a, c) {
        var d = this.b,
            e = Ts(a),
            f = {},
            g = [],
            h = 2E3,
            k = 0,
            n = 1,
            p, q;
        p = 0;
        for (q = e.length; p < q; ++p) {
            var r = e[p],
                t;
            if ("B" == r.charAt(0)) {
                if (t = Ys.exec(r)) {
                    var r = parseInt(t[1], 10),
                        u = parseInt(t[2], 10),
                        A = parseInt(t[3], 10),
                        z = parseInt(t[4], 10) + parseInt(t[5], 10) / 6E4;
                    "S" == t[6] && (z = -z);
                    var D = parseInt(t[7], 10) + parseInt(t[8], 10) / 6E4;
                    "W" == t[9] && (D = -D);
                    g.push(D, z);
                    "none" != d && g.push("gps" == d ? parseInt(t[11], 10) : "barometric" == d ? parseInt(t[12], 10) : 0);
                    g.push(Date.UTC(h, k, n, r, u, A) / 1E3)
                }
            } else if ("H" == r.charAt(0))
                if (t = $s.exec(r)) n = parseInt(t[1], 10), k = parseInt(t[2], 10) - 1, h = 2E3 + parseInt(t[3], 10);
                else if (t = Zs.exec(r)) f[t[1]] = Ca(t[2]), $s.exec(r)
        }
        if (0 === g.length) return null;
        e = new O(null);
        Ym(e, "none" == d ? "XYM" : "XYZM", g);
        d = new X(zr(e, !1, c));
        d.t(f);
        return d
    };
    Xs.prototype.pf = function(a, c) {
        var d = this.hd(a, c);
        return null === d ? [] : [d]
    };

    function at(a, c) {
        var d;
        a instanceof at ? (this.Yb = m(c) ? c : a.Yb, bt(this, a.Pb), this.pc = a.pc, this.ib = a.ib, ct(this, a.Ec), this.hb = a.hb, dt(this, a.b.clone()), this.Sb = a.Sb) : a && (d = Yn(String(a))) ? (this.Yb = !!c, bt(this, d[1] || "", !0), this.pc = et(d[2] || ""), this.ib = et(d[3] || "", !0), ct(this, d[4]), this.hb = et(d[5] || "", !0), dt(this, d[6] || "", !0), this.Sb = et(d[7] || "")) : (this.Yb = !!c, this.b = new ft(null, 0, this.Yb))
    }
    l = at.prototype;
    l.Pb = "";
    l.pc = "";
    l.ib = "";
    l.Ec = null;
    l.hb = "";
    l.Sb = "";
    l.Yb = !1;
    l.toString = function() {
        var a = [],
            c = this.Pb;
        c && a.push(gt(c, ht, !0), ":");
        if (c = this.ib) {
            a.push("//");
            var d = this.pc;
            d && a.push(gt(d, ht, !0), "@");
            a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1"));
            c = this.Ec;
            null != c && a.push(":", String(c))
        }
        if (c = this.hb) this.ib && "/" != c.charAt(0) && a.push("/"), a.push(gt(c, "/" == c.charAt(0) ? it : jt, !0));
        (c = this.b.toString()) && a.push("?", c);
        (c = this.Sb) && a.push("#", gt(c, kt));
        return a.join("")
    };
    l.clone = function() {
        return new at(this)
    };

    function bt(a, c, d) {
        a.Pb = d ? et(c, !0) : c;
        a.Pb && (a.Pb = a.Pb.replace(/:$/, ""))
    }

    function ct(a, c) {
        if (c) {
            c = Number(c);
            if (isNaN(c) || 0 > c) throw Error("Bad port number " + c);
            a.Ec = c
        } else a.Ec = null
    }

    function dt(a, c, d) {
        c instanceof ft ? (a.b = c, lt(a.b, a.Yb)) : (d || (c = gt(c, mt)), a.b = new ft(c, 0, a.Yb))
    }

    function nt(a) {
        return a instanceof at ? a.clone() : new at(a, void 0)
    }

    function ot(a, c) {
        a instanceof at || (a = nt(a));
        c instanceof at || (c = nt(c));
        var d = a,
            e = c,
            f = d.clone(),
            g = !!e.Pb;
        g ? bt(f, e.Pb) : g = !!e.pc;
        g ? f.pc = e.pc : g = !!e.ib;
        g ? f.ib = e.ib : g = null != e.Ec;
        var h = e.hb;
        if (g) ct(f, e.Ec);
        else if (g = !!e.hb)
            if ("/" != h.charAt(0) && (d.ib && !d.hb ? h = "/" + h : (d = f.hb.lastIndexOf("/"), -1 != d && (h = f.hb.substr(0, d + 1) + h))), d = h, ".." == d || "." == d) h = "";
            else if (-1 != d.indexOf("./") || -1 != d.indexOf("/.")) {
            for (var h = 0 == d.lastIndexOf("/", 0), d = d.split("/"), k = [], n = 0; n < d.length;) {
                var p = d[n++];
                "." == p ? h && n == d.length && k.push("") : ".." == p ? ((1 < k.length || 1 == k.length && "" != k[0]) && k.pop(), h && n == d.length && k.push("")) : (k.push(p), h = !0)
            }
            h = k.join("/")
        } else h = d;
        g ? f.hb = h : g = "" !== e.b.toString();
        g ? dt(f, et(e.b.toString())) : g = !!e.Sb;
        g && (f.Sb = e.Sb);
        return f
    }

    function et(a, c) {
        return a ? c ? decodeURI(a) : decodeURIComponent(a) : ""
    }

    function gt(a, c, d) {
        return ia(a) ? (a = encodeURI(a).replace(c, pt), d && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), a) : null
    }

    function pt(a) {
        a = a.charCodeAt(0);
        return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
    }
    var ht = /[#\/\?@]/g,
        jt = /[\#\?:]/g,
        it = /[\#\?]/g,
        mt = /[\#\?@]/g,
        kt = /#/g;

    function ft(a, c, d) {
        this.b = a || null;
        this.a = !!d
    }

    function qt(a) {
        a.ia || (a.ia = new Ch, a.va = 0, a.b && $n(a.b, function(c, d) {
            a.add(decodeURIComponent(c.replace(/\+/g, " ")), d)
        }))
    }
    l = ft.prototype;
    l.ia = null;
    l.va = null;
    l.Tb = function() {
        qt(this);
        return this.va
    };
    l.add = function(a, c) {
        qt(this);
        this.b = null;
        a = rt(this, a);
        var d = this.ia.get(a);
        d || this.ia.set(a, d = []);
        d.push(c);
        this.va++;
        return this
    };
    l.remove = function(a) {
        qt(this);
        a = rt(this, a);
        return Eh(this.ia.a, a) ? (this.b = null, this.va -= this.ia.get(a).length, this.ia.remove(a)) : !1
    };
    l.clear = function() {
        this.ia = this.b = null;
        this.va = 0
    };
    l.la = function() {
        qt(this);
        return 0 == this.va
    };

    function st(a, c) {
        qt(a);
        c = rt(a, c);
        return Eh(a.ia.a, c)
    }
    l.C = function() {
        qt(this);
        for (var a = this.ia.cb(), c = this.ia.C(), d = [], e = 0; e < c.length; e++)
            for (var f = a[e], g = 0; g < f.length; g++) d.push(c[e]);
        return d
    };
    l.cb = function(a) {
        qt(this);
        var c = [];
        if (ia(a)) st(this, a) && (c = ab(c, this.ia.get(rt(this, a))));
        else {
            a = this.ia.cb();
            for (var d = 0; d < a.length; d++) c = ab(c, a[d])
        }
        return c
    };
    l.set = function(a, c) {
        qt(this);
        this.b = null;
        a = rt(this, a);
        st(this, a) && (this.va -= this.ia.get(a).length);
        this.ia.set(a, [c]);
        this.va++;
        return this
    };
    l.get = function(a, c) {
        var d = a ? this.cb(a) : [];
        return 0 < d.length ? String(d[0]) : c
    };

    function tt(a, c, d) {
        a.remove(c);
        0 < d.length && (a.b = null, a.ia.set(rt(a, c), bb(d)), a.va += d.length)
    }
    l.toString = function() {
        if (this.b) return this.b;
        if (!this.ia) return "";
        for (var a = [], c = this.ia.C(), d = 0; d < c.length; d++)
            for (var e = c[d], f = encodeURIComponent(String(e)), e = this.cb(e), g = 0; g < e.length; g++) {
                var h = f;
                "" !== e[g] && (h += "=" + encodeURIComponent(String(e[g])));
                a.push(h)
            }
        return this.b = a.join("&")
    };
    l.clone = function() {
        var a = new ft;
        a.b = this.b;
        this.ia && (a.ia = this.ia.clone(), a.va = this.va);
        return a
    };

    function rt(a, c) {
        var d = String(c);
        a.a && (d = d.toLowerCase());
        return d
    }

    function lt(a, c) {
        c && !a.a && (qt(a), a.b = null, a.ia.forEach(function(a, c) {
            var f = c.toLowerCase();
            c != f && (this.remove(c), tt(this, f, a))
        }, a));
        a.a = c
    };

    function ut(a) {
        a = m(a) ? a : {};
        this.d = a.font;
        this.e = a.rotation;
        this.a = a.scale;
        this.c = a.text;
        this.g = a.textAlign;
        this.i = a.textBaseline;
        this.b = m(a.fill) ? a.fill : null;
        this.f = m(a.stroke) ? a.stroke : null;
        this.q = m(a.offsetX) ? a.offsetX : 0;
        this.l = m(a.offsetY) ? a.offsetY : 0
    }
    l = ut.prototype;
    l.Wi = function() {
        return this.d
    };
    l.mj = function() {
        return this.q
    };
    l.nj = function() {
        return this.l
    };
    l.Qm = function() {
        return this.b
    };
    l.Rm = function() {
        return this.e
    };
    l.Sm = function() {
        return this.a
    };
    l.Tm = function() {
        return this.f
    };
    l.Um = function() {
        return this.c
    };
    l.xj = function() {
        return this.g
    };
    l.yj = function() {
        return this.i
    };
    l.Wn = function(a) {
        this.d = a
    };
    l.Vn = function(a) {
        this.b = a
    };
    l.Vm = function(a) {
        this.e = a
    };
    l.Wm = function(a) {
        this.a = a
    };
    l.eo = function(a) {
        this.f = a
    };
    l.fo = function(a) {
        this.c = a
    };
    l.ho = function(a) {
        this.g = a
    };
    l.io = function(a) {
        this.i = a
    };

    function vt(a) {
        function c(a) {
            return ga(a) ? a : ia(a) ? (!(a in e) && "#" + a in e && (a = "#" + a), c(e[a])) : d
        }
        a = m(a) ? a : {};
        this.defaultDataProjection = null;
        this.defaultDataProjection = re("EPSG:4326");
        var d = m(a.defaultStyle) ? a.defaultStyle : wt,
            e = {};
        this.c = m(a.extractStyles) ? a.extractStyles : !0;
        this.b = e;
        this.d = function() {
            var a = this.get("Style");
            if (m(a)) return a;
            a = this.get("styleUrl");
            return m(a) ? c(a) : d
        }
    }
    w(vt, Or);
    var xt = ["http://www.google.com/kml/ext/2.2"],
        yt = [null, "http://earth.google.com/kml/2.0", "http://earth.google.com/kml/2.1", "http://earth.google.com/kml/2.2", "http://www.opengis.net/kml/2.2"],
        zt = [255, 255, 255, 1],
        At = new zl({
            color: zt
        }),
        Bt = [20, 2],
        Ct = [64, 64],
        Dt = new Fj({
            anchor: Bt,
            anchorOrigin: "bottom-left",
            anchorXUnits: "pixels",
            anchorYUnits: "pixels",
            crossOrigin: "anonymous",
            rotation: 0,
            scale: .5,
            size: Ct,
            src: "https://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png"
        }),
        Et = new vl({
            color: zt,
            width: 1
        }),
        Ft = new ut({
            font: "normal 16px Helvetica",
            fill: At,
            stroke: Et,
            scale: 1
        }),
        wt = [new Bl({
            fill: At,
            image: Dt,
            text: Ft,
            stroke: Et,
            zIndex: 0
        })],
        Gt = {
            fraction: "fraction",
            pixels: "pixels"
        };

    function Ht(a) {
        a = Bo(a, !1);
        if (a = /^\s*#?\s*([0-9A-Fa-f]{8})\s*$/.exec(a)) return a = a[1], [parseInt(a.substr(6, 2), 16), parseInt(a.substr(4, 2), 16), parseInt(a.substr(2, 2), 16), parseInt(a.substr(0, 2), 16) / 255]
    }

    function It(a) {
        a = Bo(a, !1);
        for (var c = [], d = /^\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)\s*,\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)(?:\s*,\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?))?\s*/i, e; e = d.exec(a);) c.push(parseFloat(e[1]), parseFloat(e[2]), e[3] ? parseFloat(e[3]) : 0), a = a.substr(e[0].length);
        return "" !== a ? void 0 : c
    }

    function Jt(a) {
        var c = Bo(a, !1);
        return null != a.baseURI ? ot(a.baseURI, Ca(c)).toString() : Ca(c)
    }

    function Kt(a) {
        a = Vr(a);
        if (m(a)) return Math.sqrt(a)
    }

    function Lt(a, c) {
        return V(null, Mt, a, c)
    }

    function Nt(a, c) {
        var d = V({
            j: [],
            Kh: []
        }, Ot, a, c);
        if (m(d)) {
            var e = d.j,
                d = d.Kh,
                f, g;
            f = 0;
            for (g = Math.min(e.length, d.length); f < g; ++f) e[4 * f + 3] = d[f];
            d = new O(null);
            Ym(d, "XYZM", e);
            return d
        }
    }

    function Pt(a, c) {
        var d = V({}, Qt, a, c),
            e = V(null, Rt, a, c);
        if (m(e)) {
            var f = new O(null);
            Ym(f, "XYZ", e);
            f.t(d);
            return f
        }
    }

    function St(a, c) {
        var d = V({}, Qt, a, c),
            e = V(null, Rt, a, c);
        if (m(e)) {
            var f = new F(null);
            dl(f, "XYZ", e, [e.length]);
            f.t(d);
            return f
        }
    }

    function Tt(a, c) {
        var d = V([], Ut, a, c);
        if (!m(d)) return null;
        if (0 === d.length) return new Rm(d);
        var e = !0,
            f = d[0].M(),
            g, h, k;
        h = 1;
        for (k = d.length; h < k; ++h)
            if (g = d[h], g.M() != f) {
                e = !1;
                break
            }
        if (e) {
            if ("Point" == f) {
                g = d[0];
                e = g.a;
                f = g.j;
                h = 1;
                for (k = d.length; h < k; ++h) g = d[h], db(f, g.j);
                g = new an(null);
                yk(g, e, f);
                g.k();
                Vt(g, d);
                return g
            }
            return "LineString" == f ? (g = new Q(null), $m(g, d), Vt(g, d), g) : "Polygon" == f ? (g = new R(null), cn(g, d), Vt(g, d), g) : "GeometryCollection" == f ? new Rm(d) : null
        }
        return new Rm(d)
    }

    function Wt(a, c) {
        var d = V({}, Qt, a, c),
            e = V(null, Rt, a, c);
        if (null != e) {
            var f = new E(null);
            Sk(f, "XYZ", e);
            f.t(d);
            return f
        }
    }

    function Xt(a, c) {
        var d = V({}, Qt, a, c),
            e = V([null], Yt, a, c);
        if (null != e && null !== e[0]) {
            var f = new F(null),
                g = e[0],
                h = [g.length],
                k, n;
            k = 1;
            for (n = e.length; k < n; ++k) db(g, e[k]), h.push(g.length);
            dl(f, "XYZ", g, h);
            f.t(d);
            return f
        }
    }

    function Zt(a, c) {
        var d = V({}, $t, a, c);
        if (!m(d)) return null;
        var e = Ab(d, "fillStyle", At),
            f = d.fill;
        m(f) && !f && (e = null);
        var f = Ab(d, "imageStyle", Dt),
            g = Ab(d, "textStyle", Ft),
            h = Ab(d, "strokeStyle", Et),
            d = d.outline;
        m(d) && !d && (h = null);
        return [new Bl({
            fill: e,
            image: f,
            stroke: h,
            text: g,
            zIndex: void 0
        })]
    }

    function Vt(a, c) {
        var d = c.length,
            e = Array(c.length),
            f = Array(c.length),
            g, h, k, n;
        k = n = !1;
        for (h = 0; h < d; ++h) g = c[h], e[h] = g.get("extrude"), f[h] = g.get("altitudeMode"), k = k || m(e[h]), n = n || m(f[h]);
        k && a.set("extrude", e);
        n && a.set("altitudeMode", f)
    }

    function au(a, c) {
        fp(bu, a, c)
    }
    var cu = T(yt, {
            value: Yo(Y)
        }),
        bu = T(yt, {
            Data: function(a, c) {
                var d = a.getAttribute("name");
                if (null !== d) {
                    var e = V(void 0, cu, a, c);
                    m(e) && (c[c.length - 1][d] = e)
                }
            },
            SchemaData: function(a, c) {
                fp(du, a, c)
            }
        }),
        Qt = T(yt, {
            extrude: S(Sr),
            altitudeMode: S(Y)
        }),
        Mt = T(yt, {
            coordinates: Yo(It)
        }),
        Yt = T(yt, {
            innerBoundaryIs: function(a, c) {
                var d = V(void 0, eu, a, c);
                m(d) && c[c.length - 1].push(d)
            },
            outerBoundaryIs: function(a, c) {
                var d = V(void 0, fu, a, c);
                m(d) && (c[c.length - 1][0] = d)
            }
        }),
        Ot = T(yt, {
            when: function(a, c) {
                var d = c[c.length - 1].Kh,
                    e = Bo(a, !1);
                if (e = /^\s*(\d{4})($|-(\d{2})($|-(\d{2})($|T(\d{2}):(\d{2}):(\d{2})(Z|(?:([+\-])(\d{2})(?::(\d{2}))?)))))\s*$/.exec(e)) {
                    var f = Date.UTC(parseInt(e[1], 10), m(e[3]) ? parseInt(e[3], 10) - 1 : 0, m(e[5]) ? parseInt(e[5], 10) : 1, m(e[7]) ? parseInt(e[7], 10) : 0, m(e[8]) ? parseInt(e[8], 10) : 0, m(e[9]) ? parseInt(e[9], 10) : 0);
                    if (m(e[10]) && "Z" != e[10]) {
                        var g = "-" == e[11] ? -1 : 1,
                            f = f + 60 * g * parseInt(e[12], 10);
                        m(e[13]) && (f += 3600 * g * parseInt(e[13], 10))
                    }
                    d.push(f)
                } else d.push(0)
            }
        }, T(xt, {
            coord: function(a, c) {
                var d = c[c.length - 1].j,
                    e = Bo(a, !1);
                (e = /^\s*([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s+([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s+([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s*$/i.exec(e)) ? d.push(parseFloat(e[1]), parseFloat(e[2]), parseFloat(e[3]), 0): d.push(0, 0, 0, 0)
            }
        })),
        Rt = T(yt, {
            coordinates: Yo(It)
        }),
        gu = T(yt, {
            href: S(Jt)
        }, T(xt, {
            x: S(Vr),
            y: S(Vr),
            w: S(Vr),
            h: S(Vr)
        })),
        hu = T(yt, {
            Icon: S(function(a, c) {
                var d = V({}, gu, a, c);
                return m(d) ? d : null
            }),
            heading: S(Vr),
            hotSpot: S(function(a) {
                var c = a.getAttribute("xunits"),
                    d = a.getAttribute("yunits");
                return {
                    x: parseFloat(a.getAttribute("x")),
                    Af: Gt[c],
                    y: parseFloat(a.getAttribute("y")),
                    Bf: Gt[d]
                }
            }),
            scale: S(Kt)
        }),
        eu = T(yt, {
            LinearRing: Yo(Lt)
        }),
        iu = T(yt, {
            color: S(Ht),
            scale: S(Kt)
        }),
        ju = T(yt, {
            color: S(Ht),
            width: S(Vr)
        }),
        Ut = T(yt, {
            LineString: Xo(Pt),
            LinearRing: Xo(St),
            MultiGeometry: Xo(Tt),
            Point: Xo(Wt),
            Polygon: Xo(Xt)
        }),
        ku = T(xt, {
            Track: Xo(Nt)
        }),
        mu = T(yt, {
            ExtendedData: au,
            Link: function(a, c) {
                fp(lu, a, c)
            },
            address: S(Y),
            description: S(Y),
            name: S(Y),
            open: S(Sr),
            phoneNumber: S(Y),
            visibility: S(Sr)
        }),
        lu = T(yt, {
            href: S(Jt)
        }),
        fu = T(yt, {
            LinearRing: Yo(Lt)
        }),
        nu = T(yt, {
            Style: S(Zt),
            key: S(Y),
            styleUrl: S(function(a) {
                var c = Ca(Bo(a, !1));
                return null != a.baseURI ? ot(a.baseURI, c).toString() : c
            })
        }),
        pu = T(yt, {
            ExtendedData: au,
            MultiGeometry: S(Tt, "geometry"),
            LineString: S(Pt, "geometry"),
            LinearRing: S(St, "geometry"),
            Point: S(Wt, "geometry"),
            Polygon: S(Xt, "geometry"),
            Style: S(Zt),
            StyleMap: function(a, c) {
                var d = V(void 0, ou, a, c);
                if (m(d)) {
                    var e = c[c.length - 1];
                    ga(d) ? e.Style = d : ia(d) && (e.styleUrl = d)
                }
            },
            address: S(Y),
            description: S(Y),
            name: S(Y),
            open: S(Sr),
            phoneNumber: S(Y),
            styleUrl: S(Jt),
            visibility: S(Sr)
        }, T(xt, {
            MultiTrack: S(function(a, c) {
                var d = V([], ku, a, c);
                if (m(d)) {
                    var e = new Q(null);
                    $m(e, d);
                    return e
                }
            }, "geometry"),
            Track: S(Nt, "geometry")
        })),
        qu = T(yt, {
            color: S(Ht),
            fill: S(Sr),
            outline: S(Sr)
        }),
        du = T(yt, {
            SimpleData: function(a, c) {
                var d = a.getAttribute("name");
                if (null !== d) {
                    var e = Y(a);
                    c[c.length - 1][d] = e
                }
            }
        }),
        $t = T(yt, {
            IconStyle: function(a, c) {
                var d = V({}, hu, a, c);
                if (m(d)) {
                    var e = c[c.length - 1],
                        f = Ab(d, "Icon", {}),
                        g;
                    g = f.href;
                    g = m(g) ? g : "https://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png";
                    var h, k, n, p = d.hotSpot;
                    m(p) ? (h = [p.x, p.y], k = p.Af, n = p.Bf) : "https://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png" === g ? (h = Bt, n = k = "pixels") : /^http:\/\/maps\.(?:google|gstatic)\.com\//.test(g) && (h = [.5, 0], n = k = "fraction");
                    var q, p = f.x,
                        r = f.y;
                    m(p) && m(r) && (q = [p, r]);
                    var t, p = f.w,
                        f = f.h;
                    m(p) && m(f) && (t = [p, f]);
                    var u, f = d.heading;
                    m(f) && (u = Yb(f));
                    d = d.scale;
                    "https://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png" == g && (t = Ct);
                    h = new Fj({
                        anchor: h,
                        anchorOrigin: "bottom-left",
                        anchorXUnits: k,
                        anchorYUnits: n,
                        crossOrigin: "anonymous",
                        offset: q,
                        offsetOrigin: "bottom-left",
                        rotation: u,
                        scale: d,
                        size: t,
                        src: g
                    });
                    e.imageStyle = h
                }
            },
            LabelStyle: function(a, c) {
                var d = V({}, iu, a, c);
                m(d) && (c[c.length - 1].textStyle = new ut({
                    fill: new zl({
                        color: Ab(d, "color", zt)
                    }),
                    scale: d.scale
                }))
            },
            LineStyle: function(a, c) {
                var d = V({}, ju, a, c);
                m(d) && (c[c.length - 1].strokeStyle = new vl({
                    color: Ab(d, "color", zt),
                    width: Ab(d, "width", 1)
                }))
            },
            PolyStyle: function(a, c) {
                var d = V({}, qu, a, c);
                if (m(d)) {
                    var e = c[c.length - 1];
                    e.fillStyle = new zl({
                        color: Ab(d, "color", zt)
                    });
                    var f = d.fill;
                    m(f) && (e.fill = f);
                    d = d.outline;
                    m(d) && (e.outline = d)
                }
            }
        }),
        ou = T(yt, {
            Pair: function(a, c) {
                var d = V({}, nu, a, c);
                if (m(d)) {
                    var e = d.key;
                    m(e) && "normal" == e && (e = d.styleUrl, m(e) && (c[c.length - 1] = e), d = d.Style, m(d) && (c[c.length - 1] = d))
                }
            }
        });
    l = vt.prototype;
    l.eh = function(a, c) {
        Fo(a);
        var d = T(yt, {
                Folder: Wo(this.eh, this),
                Placemark: Xo(this.rf, this),
                Style: ra(this.Jn, this),
                StyleMap: ra(this.In, this)
            }),
            d = V([], d, a, c, this);
        if (m(d)) return d
    };
    l.rf = function(a, c) {
        var d = V({
            geometry: null
        }, pu, a, c);
        if (m(d)) {
            var e = new X,
                f = a.getAttribute("id");
            null === f || e.Qb(f);
            f = c[0];
            null != d.geometry && zr(d.geometry, !1, f);
            e.t(d);
            this.c && e.cf(this.d);
            return e
        }
    };
    l.Jn = function(a, c) {
        var d = a.getAttribute("id");
        if (null !== d) {
            var e = Zt(a, c);
            m(e) && (d = null != a.baseURI ? ot(a.baseURI, "#" + d).toString() : "#" + d, this.b[d] = e)
        }
    };
    l.In = function(a, c) {
        var d = a.getAttribute("id");
        if (null !== d) {
            var e = V(void 0, ou, a, c);
            m(e) && (d = null != a.baseURI ? ot(a.baseURI, "#" + d).toString() : "#" + d, this.b[d] = e)
        }
    };
    l.fh = function(a, c) {
        if (!Ya(yt, a.namespaceURI)) return null;
        var d = this.rf(a, [xr(this, a, c)]);
        return m(d) ? d : null
    };
    l.Ob = function(a, c) {
        if (!Ya(yt, a.namespaceURI)) return [];
        var d;
        d = Fo(a);
        if ("Document" == d || "Folder" == d) return d = this.eh(a, [xr(this, a, c)]), m(d) ? d : [];
        if ("Placemark" == d) return d = this.rf(a, [xr(this, a, c)]), m(d) ? [d] : [];
        if ("kml" == d) {
            d = [];
            var e;
            for (e = a.firstElementChild; null !== e; e = e.nextElementSibling) {
                var f = this.Ob(e, c);
                m(f) && db(d, f)
            }
            return d
        }
        return []
    };
    l.Dn = function(a) {
        if (Io(a)) return ru(this, a);
        if (Lo(a)) return su(this, a);
        if (ia(a)) return a = Vo(a), ru(this, a)
    };

    function ru(a, c) {
        var d;
        for (d = c.firstChild; null !== d; d = d.nextSibling)
            if (1 == d.nodeType) {
                var e = su(a, d);
                if (m(e)) return e
            }
    }

    function su(a, c) {
        var d;
        for (d = c.firstElementChild; null !== d; d = d.nextElementSibling)
            if (Ya(yt, d.namespaceURI) && "name" == d.localName) return Y(d);
        for (d = c.firstElementChild; null !== d; d = d.nextElementSibling) {
            var e = Fo(d);
            if (Ya(yt, d.namespaceURI) && ("Document" == e || "Folder" == e || "Placemark" == e || "kml" == e) && (e = su(a, d), m(e))) return e
        }
    }
    l.En = function(a) {
        var c = [];
        Io(a) ? db(c, tu(this, a)) : Lo(a) ? db(c, uu(this, a)) : ia(a) && (a = Vo(a), db(c, tu(this, a)));
        return c
    };

    function tu(a, c) {
        var d, e = [];
        for (d = c.firstChild; null !== d; d = d.nextSibling) 1 == d.nodeType && db(e, uu(a, d));
        return e
    }

    function uu(a, c) {
        var d, e = [];
        for (d = c.firstElementChild; null !== d; d = d.nextElementSibling)
            if (Ya(yt, d.namespaceURI) && "NetworkLink" == d.localName) {
                var f = V({}, mu, d, []);
                e.push(f)
            }
        for (d = c.firstElementChild; null !== d; d = d.nextElementSibling) f = Fo(d), !Ya(yt, d.namespaceURI) || "Document" != f && "Folder" != f && "kml" != f || db(e, uu(a, d));
        return e
    }

    function vu(a, c) {
        var d = tf(c),
            d = [255 * (4 == d.length ? d[3] : 1), d[2], d[1], d[0]],
            e;
        for (e = 0; 4 > e; ++e) {
            var f = parseInt(d[e], 10).toString(16);
            d[e] = 1 == f.length ? "0" + f : f
        }
        $r(a, d.join(""))
    }

    function wu(a, c, d) {
        gp({
            P: a
        }, xu, yu, [c], d)
    }

    function zu(a, c, d) {
        var e = {
            P: a
        };
        null != c.$ && a.setAttribute("id", c.$);
        a = c.D();
        var f = c.c;
        m(f) && (f = f.call(c, 0), null !== f && 0 < f.length && (a.Style = f[0], f = f[0].a, null === f || (a.name = f.c)));
        f = Au[d[d.length - 1].P.namespaceURI];
        a = ep(a, f);
        gp(e, Bu, dp, a, d, f);
        a = d[0];
        c = c.Q();
        null != c && (c = zr(c, !0, a));
        gp(e, Bu, Cu, [c], d)
    }

    function Du(a, c, d) {
        var e = c.j;
        a = {
            P: a
        };
        a.layout = c.a;
        a.stride = c.s;
        gp(a, Eu, Fu, [e], d)
    }

    function Gu(a, c, d) {
        c = c.Ed();
        var e = c.shift();
        a = {
            P: a
        };
        gp(a, Hu, Iu, c, d);
        gp(a, Hu, Ju, [e], d)
    }

    function Ku(a, c) {
        as(a, c * c)
    }
    var Lu = $o(yt, ["Document", "Placemark"]),
        Ou = $o(yt, {
            Document: U(function(a, c, d) {
                gp({
                    P: a
                }, Mu, Nu, c, d)
            }),
            Placemark: U(zu)
        }),
        Mu = $o(yt, {
            Placemark: U(zu)
        }),
        Pu = {
            Point: "Point",
            LineString: "LineString",
            LinearRing: "LinearRing",
            Polygon: "Polygon",
            MultiPoint: "MultiGeometry",
            MultiLineString: "MultiGeometry",
            MultiPolygon: "MultiGeometry"
        },
        Qu = $o(yt, ["href"], $o(xt, ["x", "y", "w", "h"])),
        Ru = $o(yt, {
            href: U($r)
        }, $o(xt, {
            x: U(as),
            y: U(as),
            w: U(as),
            h: U(as)
        })),
        Su = $o(yt, ["scale", "heading", "Icon", "hotSpot"]),
        Uu = $o(yt, {
            Icon: U(function(a, c, d) {
                a = {
                    P: a
                };
                var e = Qu[d[d.length - 1].P.namespaceURI],
                    f = ep(c, e);
                gp(a, Ru, dp, f, d, e);
                e = Qu[xt[0]];
                f = ep(c, e);
                gp(a, Ru, Tu, f, d, e)
            }),
            heading: U(as),
            hotSpot: U(function(a, c) {
                a.setAttribute("x", c.x);
                a.setAttribute("y", c.y);
                a.setAttribute("xunits", c.Af);
                a.setAttribute("yunits", c.Bf)
            }),
            scale: U(Ku)
        }),
        Vu = $o(yt, ["color", "scale"]),
        Wu = $o(yt, {
            color: U(vu),
            scale: U(Ku)
        }),
        Xu = $o(yt, ["color", "width"]),
        Yu = $o(yt, {
            color: U(vu),
            width: U(as)
        }),
        xu = $o(yt, {
            LinearRing: U(Du)
        }),
        Zu = $o(yt, {
            LineString: U(Du),
            Point: U(Du),
            Polygon: U(Gu)
        }),
        Au = $o(yt, "name open visibility address phoneNumber description styleUrl Style".split(" ")),
        Bu = $o(yt, {
            MultiGeometry: U(function(a, c, d) {
                a = {
                    P: a
                };
                var e = c.M(),
                    f, g;
                "MultiPoint" == e ? (f = c.ce(), g = $u) : "MultiLineString" == e ? (f = c.ad(), g = av) : "MultiPolygon" == e && (f = c.Id(), g = bv);
                gp(a, Zu, g, f, d)
            }),
            LineString: U(Du),
            LinearRing: U(Du),
            Point: U(Du),
            Polygon: U(Gu),
            Style: U(function(a, c, d) {
                a = {
                    P: a
                };
                var e = {},
                    f = c.e,
                    g = c.c,
                    h = c.f;
                c = c.a;
                null === h || (e.IconStyle = h);
                null === c || (e.LabelStyle = c);
                null === g || (e.LineStyle = g);
                null === f || (e.PolyStyle = f);
                c = cv[d[d.length - 1].P.namespaceURI];
                e = ep(e, c);
                gp(a, dv, dp, e, d, c)
            }),
            address: U($r),
            description: U($r),
            name: U($r),
            open: U(Zr),
            phoneNumber: U($r),
            styleUrl: U($r),
            visibility: U(Zr)
        }),
        Eu = $o(yt, {
            coordinates: U(function(a, c, d) {
                d = d[d.length - 1];
                var e = d.layout;
                d = d.stride;
                var f;
                "XY" == e || "XYM" == e ? f = 2 : ("XYZ" == e || "XYZM" == e) && (f = 3);
                var g, h = c.length,
                    k = "";
                if (0 < h) {
                    k += c[0];
                    for (e = 1; e < f; ++e) k += "," + c[e];
                    for (g = d; g < h; g += d)
                        for (k += " " + c[g], e = 1; e < f; ++e) k += "," + c[g + e]
                }
                $r(a, k)
            })
        }),
        Hu = $o(yt, {
            outerBoundaryIs: U(wu),
            innerBoundaryIs: U(wu)
        }),
        ev = $o(yt, {
            color: U(vu)
        }),
        cv = $o(yt, ["IconStyle", "LabelStyle", "LineStyle", "PolyStyle"]),
        dv = $o(yt, {
            IconStyle: U(function(a, c, d) {
                a = {
                    P: a
                };
                var e = {},
                    f = c.Xa(),
                    g = c.Dd(),
                    h = {
                        href: c.b.f
                    };
                if (null !== f) {
                    h.w = f[0];
                    h.h = f[1];
                    var k = c.mb(),
                        n = c.rb();
                    null !== n && null !== g && 0 !== n[0] && n[1] !== f[1] && (h.x = n[0], h.y = g[1] - (n[1] + f[1]));
                    null === k || 0 === k[0] || k[1] === f[1] || (e.hotSpot = {
                        x: k[0],
                        Af: "pixels",
                        y: f[1] - k[1],
                        Bf: "pixels"
                    })
                }
                e.Icon = h;
                f = c.l;
                1 !== f && (e.scale = f);
                c = c.q;
                0 !== c && (e.heading = c);
                c = Su[d[d.length - 1].P.namespaceURI];
                e = ep(e, c);
                gp(a, Uu, dp, e, d, c)
            }),
            LabelStyle: U(function(a, c, d) {
                a = {
                    P: a
                };
                var e = {},
                    f = c.b;
                null === f || (e.color = f.b);
                c = c.a;
                m(c) && 1 !== c && (e.scale = c);
                c = Vu[d[d.length - 1].P.namespaceURI];
                e = ep(e, c);
                gp(a, Wu, dp, e, d, c)
            }),
            LineStyle: U(function(a, c, d) {
                a = {
                    P: a
                };
                var e = Xu[d[d.length - 1].P.namespaceURI];
                c = ep({
                    color: c.b,
                    width: c.a
                }, e);
                gp(a, Yu, dp, c, d, e)
            }),
            PolyStyle: U(function(a, c, d) {
                gp({
                    P: a
                }, ev, fv, [c.b], d)
            })
        });

    function Tu(a, c, d) {
        return Ao(xt[0], "gx:" + d)
    }

    function Nu(a, c) {
        return Ao(c[c.length - 1].P.namespaceURI, "Placemark")
    }

    function Cu(a, c) {
        if (null != a) return Ao(c[c.length - 1].P.namespaceURI, Pu[a.M()])
    }
    var fv = bp("color"),
        Fu = bp("coordinates"),
        Iu = bp("innerBoundaryIs"),
        $u = bp("Point"),
        av = bp("LineString"),
        yu = bp("LinearRing"),
        bv = bp("Polygon"),
        Ju = bp("outerBoundaryIs");
    vt.prototype.a = function(a, c) {
        c = yr(this, c);
        var d = Ao(yt[4], "kml");
        Uo(d, "http://www.w3.org/2000/xmlns/", "xmlns:gx", xt[0]);
        Uo(d, "http://www.w3.org/2000/xmlns/", "xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
        Uo(d, "http://www.w3.org/2001/XMLSchema-instance", "xsi:schemaLocation", "http://www.opengis.net/kml/2.2 https://developers.google.com/kml/schema/kml22gx.xsd");
        var e = {
                P: d
            },
            f = {};
        1 < a.length ? f.Document = a : 1 == a.length && (f.Placemark = a[0]);
        var g = Lu[d.namespaceURI],
            f = ep(f, g);
        gp(e, Ou, dp, f, [c], g);
        return d
    };

    function gv() {
        this.defaultDataProjection = null;
        this.defaultDataProjection = re("EPSG:4326")
    }
    w(gv, Or);

    function hv(a, c) {
        c[c.length - 1].od[a.getAttribute("k")] = a.getAttribute("v")
    }
    var iv = [null],
        jv = T(iv, {
            nd: function(a, c) {
                c[c.length - 1].Ac.push(a.getAttribute("ref"))
            },
            tag: hv
        }),
        lv = T(iv, {
            node: function(a, c) {
                var d = c[0],
                    e = c[c.length - 1],
                    f = a.getAttribute("id"),
                    g = [parseFloat(a.getAttribute("lon")), parseFloat(a.getAttribute("lat"))];
                e.ng[f] = g;
                var h = V({
                    od: {}
                }, kv, a, c);
                xb(h.od) || (g = new E(g), zr(g, !1, d), d = new X(g), d.Qb(f), d.t(h.od), e.features.push(d))
            },
            way: function(a, c) {
                for (var d = c[0], e = a.getAttribute("id"), f = V({
                        Ac: [],
                        od: {}
                    }, jv, a, c), g = c[c.length - 1], h = [], k = 0, n = f.Ac.length; k < n; k++) db(h, g.ng[f.Ac[k]]);
                f.Ac[0] == f.Ac[f.Ac.length - 1] ? (k = new F(null), dl(k, "XY", h, [h.length])) : (k = new O(null), Ym(k, "XY", h));
                zr(k, !1, d);
                d = new X(k);
                d.Qb(e);
                d.t(f.od);
                g.features.push(d)
            }
        }),
        kv = T(iv, {
            tag: hv
        });
    gv.prototype.Ob = function(a, c) {
        var d = xr(this, a, c);
        return "osm" == a.localName && (d = V({
            ng: {},
            features: []
        }, lv, a, [d]), m(d.features)) ? d.features : []
    };

    function mv(a) {
        return a.getAttributeNS("http://www.w3.org/1999/xlink", "href")
    };

    function nv() {}
    nv.prototype.c = function(a) {
        return Io(a) ? this.a(a) : Lo(a) ? this.b(a) : ia(a) ? (a = Vo(a), this.a(a)) : null
    };

    function ov() {}
    w(ov, nv);
    ov.prototype.a = function(a) {
        for (a = a.firstChild; null !== a; a = a.nextSibling)
            if (1 == a.nodeType) return this.b(a);
        return null
    };
    ov.prototype.b = function(a) {
        a = V({}, pv, a, []);
        return m(a) ? a : null
    };
    var qv = [null, "http://www.opengis.net/ows/1.1"],
        pv = T(qv, {
            ServiceIdentification: S(function(a, c) {
                return V({}, rv, a, c)
            }),
            ServiceProvider: S(function(a, c) {
                return V({}, sv, a, c)
            }),
            OperationsMetadata: S(function(a, c) {
                return V({}, tv, a, c)
            })
        }),
        uv = T(qv, {
            DeliveryPoint: S(Y),
            City: S(Y),
            AdministrativeArea: S(Y),
            PostalCode: S(Y),
            Country: S(Y),
            ElectronicMailAddress: S(Y)
        }),
        vv = T(qv, {
            Value: Zo(function(a) {
                return Y(a)
            })
        }),
        wv = T(qv, {
            AllowedValues: S(function(a, c) {
                return V({}, vv, a, c)
            })
        }),
        yv = T(qv, {
            Phone: S(function(a, c) {
                return V({}, xv, a, c)
            }),
            Address: S(function(a, c) {
                return V({}, uv, a, c)
            })
        }),
        Av = T(qv, {
            HTTP: S(function(a, c) {
                return V({}, zv, a, c)
            })
        }),
        zv = T(qv, {
            Get: Zo(function(a, c) {
                var d = mv(a);
                return m(d) ? V({
                    href: d
                }, Bv, a, c) : void 0
            }),
            Post: void 0
        }),
        Cv = T(qv, {
            DCP: S(function(a, c) {
                return V({}, Av, a, c)
            })
        }),
        tv = T(qv, {
            Operation: function(a, c) {
                var d = a.getAttribute("name"),
                    e = V({}, Cv, a, c);
                m(e) && (c[c.length - 1][d] = e)
            }
        }),
        xv = T(qv, {
            Voice: S(Y),
            Facsimile: S(Y)
        }),
        Bv = T(qv, {
            Constraint: Zo(function(a, c) {
                var d = a.getAttribute("name");
                return m(d) ? V({
                    name: d
                }, wv, a, c) : void 0
            })
        }),
        Dv = T(qv, {
            IndividualName: S(Y),
            PositionName: S(Y),
            ContactInfo: S(function(a, c) {
                return V({}, yv, a, c)
            })
        }),
        rv = T(qv, {
            Title: S(Y),
            ServiceTypeVersion: S(Y),
            ServiceType: S(Y)
        }),
        sv = T(qv, {
            ProviderName: S(Y),
            ProviderSite: S(mv),
            ServiceContact: S(function(a, c) {
                return V({}, Dv, a, c)
            })
        });

    function Ev(a, c, d, e) {
        var f;
        m(e) ? f = m(void 0) ? void 0 : 0 : (e = [], f = 0);
        var g, h;
        for (g = 0; g < c;)
            for (h = a[g++], e[f++] = a[g++], e[f++] = h, h = 2; h < d; ++h) e[f++] = a[g++];
        e.length = f
    };

    function Fv(a) {
        a = m(a) ? a : {};
        this.defaultDataProjection = null;
        this.defaultDataProjection = re("EPSG:4326");
        this.b = m(a.factor) ? a.factor : 1E5;
        this.a = m(a.geometryLayout) ? a.geometryLayout : "XY"
    }
    w(Fv, Ws);

    function Gv(a, c, d) {
        d = m(d) ? d : 1E5;
        var e, f = Array(c);
        for (e = 0; e < c; ++e) f[e] = 0;
        var g, h;
        g = 0;
        for (h = a.length; g < h;)
            for (e = 0; e < c; ++e, ++g) {
                var k = a[g],
                    n = k - f[e];
                f[e] = k;
                a[g] = n
            }
        return Hv(a, d)
    }

    function Iv(a, c, d) {
        var e = m(d) ? d : 1E5,
            f = Array(c);
        for (d = 0; d < c; ++d) f[d] = 0;
        a = Jv(a, e);
        var g, e = 0;
        for (g = a.length; e < g;)
            for (d = 0; d < c; ++d, ++e) f[d] += a[e], a[e] = f[d];
        return a
    }

    function Hv(a, c) {
        var d = m(c) ? c : 1E5,
            e, f;
        e = 0;
        for (f = a.length; e < f; ++e) a[e] = Math.round(a[e] * d);
        d = 0;
        for (e = a.length; d < e; ++d) f = a[d], a[d] = 0 > f ? ~(f << 1) : f << 1;
        d = "";
        e = 0;
        for (f = a.length; e < f; ++e) {
            for (var g = a[e], h = void 0, k = ""; 32 <= g;) h = (32 | g & 31) + 63, k += String.fromCharCode(h), g >>= 5;
            h = g + 63;
            k += String.fromCharCode(h);
            d += k
        }
        return d
    }

    function Jv(a, c) {
        var d = m(c) ? c : 1E5,
            e = [],
            f = 0,
            g = 0,
            h, k;
        h = 0;
        for (k = a.length; h < k; ++h) {
            var n = a.charCodeAt(h) - 63,
                f = f | (n & 31) << g;
            32 > n ? (e.push(f), g = f = 0) : g += 5
        }
        f = 0;
        for (g = e.length; f < g; ++f) h = e[f], e[f] = h & 1 ? ~(h >> 1) : h >> 1;
        f = 0;
        for (g = e.length; f < g; ++f) e[f] /= d;
        return e
    }
    l = Fv.prototype;
    l.hd = function(a, c) {
        var d = this.kd(a, c);
        return new X(d)
    };
    l.pf = function(a, c) {
        return [this.hd(a, c)]
    };
    l.kd = function(a, c) {
        var d = xk(this.a),
            e = Iv(a, d, this.b);
        Ev(e, e.length, d, e);
        d = Mk(e, 0, e.length, d);
        return zr(new O(d, this.a), !1, yr(this, c))
    };
    l.ye = function(a, c) {
        var d = a.Q();
        return null != d ? this.rd(d, c) : ""
    };
    l.Mh = function(a, c) {
        return this.ye(a[0], c)
    };
    l.rd = function(a, c) {
        a = zr(a, !0, yr(this, c));
        var d = a.j,
            e = a.s;
        Ev(d, d.length, e, d);
        return Gv(d, e, this.b)
    };

    function Kv(a) {
        a = m(a) ? a : {};
        this.defaultDataProjection = null;
        this.defaultDataProjection = re(null != a.defaultDataProjection ? a.defaultDataProjection : "EPSG:4326")
    }
    w(Kv, Ar);

    function Lv(a, c) {
        var d = [],
            e, f, g, h;
        g = 0;
        for (h = a.length; g < h; ++g) e = a[g], 0 < g && d.pop(), 0 <= e ? f = c[e] : f = c[~e].slice().reverse(), d.push.apply(d, f);
        e = 0;
        for (f = d.length; e < f; ++e) d[e] = d[e].slice();
        return d
    }

    function Mv(a, c, d, e, f) {
        a = a.geometries;
        var g = [],
            h, k;
        h = 0;
        for (k = a.length; h < k; ++h) g[h] = Nv(a[h], c, d, e, f);
        return g
    }

    function Nv(a, c, d, e, f) {
        var g = a.type,
            h = Ov[g];
        c = "Point" === g || "MultiPoint" === g ? h(a, d, e) : h(a, c);
        d = new X;
        d.La(zr(c, !1, f));
        m(a.id) && d.Qb(a.id);
        m(a.properties) && d.t(a.properties);
        return d
    }
    Kv.prototype.of = function(a, c) {
        if ("Topology" == a.type) {
            var d, e = null,
                f = null;
            m(a.transform) && (d = a.transform, e = d.scale, f = d.translate);
            var g = a.arcs;
            if (m(d)) {
                d = e;
                var h = f,
                    k, n;
                k = 0;
                for (n = g.length; k < n; ++k)
                    for (var p = g[k], q = d, r = h, t = 0, u = 0, A = void 0, z = void 0, D = void 0, z = 0, D = p.length; z < D; ++z) A = p[z], t += A[0], u += A[1], A[0] = t, A[1] = u, Pv(A, q, r)
            }
            d = [];
            h = sb(a.objects);
            k = 0;
            for (n = h.length; k < n; ++k) "GeometryCollection" === h[k].type ? (p = h[k], d.push.apply(d, Mv(p, g, e, f, c))) : (p = h[k], d.push(Nv(p, g, e, f, c)));
            return d
        }
        return []
    };

    function Pv(a, c, d) {
        a[0] = a[0] * c[0] + d[0];
        a[1] = a[1] * c[1] + d[1]
    }
    Kv.prototype.za = function() {
        return this.defaultDataProjection
    };
    var Ov = {
        Point: function(a, c, d) {
            a = a.coordinates;
            null === c || null === d || Pv(a, c, d);
            return new E(a)
        },
        LineString: function(a, c) {
            var d = Lv(a.arcs, c);
            return new O(d)
        },
        Polygon: function(a, c) {
            var d = [],
                e, f;
            e = 0;
            for (f = a.arcs.length; e < f; ++e) d[e] = Lv(a.arcs[e], c);
            return new F(d)
        },
        MultiPoint: function(a, c, d) {
            a = a.coordinates;
            var e, f;
            if (null !== c && null !== d)
                for (e = 0, f = a.length; e < f; ++e) Pv(a[e], c, d);
            return new an(a)
        },
        MultiLineString: function(a, c) {
            var d = [],
                e, f;
            e = 0;
            for (f = a.arcs.length; e < f; ++e) d[e] = Lv(a.arcs[e], c);
            return new Q(d)
        },
        MultiPolygon: function(a, c) {
            var d = [],
                e, f, g, h, k, n;
            k = 0;
            for (n = a.arcs.length; k < n; ++k) {
                e = a.arcs[k];
                f = [];
                g = 0;
                for (h = e.length; g < h; ++g) f[g] = Lv(e[g], c);
                d[k] = f
            }
            return new R(d)
        }
    };

    function Qv(a) {
        a = m(a) ? a : {};
        this.e = a.featureType;
        this.c = a.featureNS;
        this.b = m(a.gmlFormat) ? a.gmlFormat : new cs;
        this.d = m(a.schemaLocation) ? a.schemaLocation : "http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd";
        this.defaultDataProjection = null
    }
    w(Qv, Or);
    Qv.prototype.Ob = function(a, c) {
        var d = {
            featureType: this.e,
            featureNS: this.c
        };
        Fb(d, xr(this, a, m(c) ? c : {}));
        d = [d];
        this.b.b["http://www.opengis.net/gml"].featureMember = Xo(Rr.prototype.jd);
        d = V([], this.b.b, a, d, this.b);
        m(d) || (d = []);
        return d
    };
    Qv.prototype.g = function(a) {
        if (Io(a)) return Rv(a);
        if (Lo(a)) return V({}, Sv, a, []);
        if (ia(a)) return a = Vo(a), Rv(a)
    };
    Qv.prototype.f = function(a) {
        if (Io(a)) return Tv(this, a);
        if (Lo(a)) return Uv(this, a);
        if (ia(a)) return a = Vo(a), Tv(this, a)
    };

    function Tv(a, c) {
        for (var d = c.firstChild; null !== d; d = d.nextSibling)
            if (1 == d.nodeType) return Uv(a, d)
    }
    var Vv = {
        "http://www.opengis.net/gml": {
            boundedBy: S(Rr.prototype.qe, "bounds")
        }
    };

    function Uv(a, c) {
        var d = {},
            e = Yr(c.getAttribute("numberOfFeatures"));
        d.numberOfFeatures = e;
        return V(d, Vv, c, [], a.b)
    }
    var Wv = {
            "http://www.opengis.net/wfs": {
                totalInserted: S(Xr),
                totalUpdated: S(Xr),
                totalDeleted: S(Xr)
            }
        },
        Xv = {
            "http://www.opengis.net/ogc": {
                FeatureId: Xo(function(a) {
                    return a.getAttribute("fid")
                })
            }
        },
        Yv = {
            "http://www.opengis.net/wfs": {
                Feature: function(a, c) {
                    fp(Xv, a, c)
                }
            }
        },
        Sv = {
            "http://www.opengis.net/wfs": {
                TransactionSummary: S(function(a, c) {
                    return V({}, Wv, a, c)
                }, "transactionSummary"),
                InsertResults: S(function(a, c) {
                    return V([], Yv, a, c)
                }, "insertIds")
            }
        };

    function Rv(a) {
        for (a = a.firstChild; null !== a; a = a.nextSibling)
            if (1 == a.nodeType) return V({}, Sv, a, [])
    }
    var Zv = {
        "http://www.opengis.net/wfs": {
            PropertyName: U($r)
        }
    };

    function $v(a, c) {
        var d = Ao("http://www.opengis.net/ogc", "Filter"),
            e = Ao("http://www.opengis.net/ogc", "FeatureId");
        d.appendChild(e);
        e.setAttribute("fid", c);
        a.appendChild(d)
    }
    var aw = {
            "http://www.opengis.net/wfs": {
                Insert: U(function(a, c, d) {
                    var e = d[d.length - 1],
                        e = Ao(e.featureNS, e.featureType);
                    a.appendChild(e);
                    cs.prototype.Lh(e, c, d)
                }),
                Update: U(function(a, c, d) {
                    var e = d[d.length - 1],
                        f = e.featureType,
                        g = e.featurePrefix,
                        g = m(g) ? g : "feature",
                        h = e.featureNS;
                    a.setAttribute("typeName", g + ":" + f);
                    Uo(a, "http://www.w3.org/2000/xmlns/", "xmlns:" + g, h);
                    f = c.$;
                    if (m(f)) {
                        for (var g = c.C(), h = [], k = 0, n = g.length; k < n; k++) {
                            var p = c.get(g[k]);
                            m(p) && h.push({
                                name: g[k],
                                value: p
                            })
                        }
                        gp({
                            P: a,
                            srsName: e.srsName
                        }, aw, bp("Property"), h, d);
                        $v(a, f)
                    }
                }),
                Delete: U(function(a, c, d) {
                    var e = d[d.length - 1];
                    d = e.featureType;
                    var f = e.featurePrefix,
                        f = m(f) ? f : "feature",
                        e = e.featureNS;
                    a.setAttribute("typeName", f + ":" + d);
                    Uo(a, "http://www.w3.org/2000/xmlns/", "xmlns:" + f, e);
                    c = c.$;
                    m(c) && $v(a, c)
                }),
                Property: U(function(a, c, d) {
                    var e = Ao("http://www.opengis.net/wfs", "Name");
                    a.appendChild(e);
                    $r(e, c.name);
                    null != c.value && (e = Ao("http://www.opengis.net/wfs", "Value"), a.appendChild(e), c.value instanceof uk ? cs.prototype.Ae(e, c.value, d) : $r(e, c.value))
                }),
                Native: U(function(a, c) {
                    m(c.vo) && a.setAttribute("vendorId", c.vo);
                    m(c.Tn) && a.setAttribute("safeToIgnore", c.Tn);
                    m(c.value) && $r(a, c.value)
                })
            }
        },
        bw = {
            "http://www.opengis.net/wfs": {
                Query: U(function(a, c, d) {
                    var e = d[d.length - 1],
                        f = e.featurePrefix,
                        g = e.featureNS,
                        h = e.propertyNames,
                        k = e.srsName;
                    a.setAttribute("typeName", (m(f) ? f + ":" : "") + c);
                    m(k) && a.setAttribute("srsName", k);
                    m(g) && Uo(a, "http://www.w3.org/2000/xmlns/", "xmlns:" + f, g);
                    c = Db(e);
                    c.P = a;
                    gp(c, Zv, bp("PropertyName"), h, d);
                    e = e.bbox;
                    m(e) && (h = Ao("http://www.opengis.net/ogc", "Filter"), c = d[d.length - 1].geometryName, f = Ao("http://www.opengis.net/ogc", "BBOX"), h.appendChild(f), g = Ao("http://www.opengis.net/ogc", "PropertyName"), $r(g, c), f.appendChild(g), cs.prototype.Ae(f, e, d), a.appendChild(h))
                })
            }
        };
    Qv.prototype.i = function(a) {
        var c = Ao("http://www.opengis.net/wfs", "GetFeature");
        c.setAttribute("service", "WFS");
        c.setAttribute("version", "1.1.0");
        m(a) && (m(a.handle) && c.setAttribute("handle", a.handle), m(a.outputFormat) && c.setAttribute("outputFormat", a.outputFormat), m(a.maxFeatures) && c.setAttribute("maxFeatures", a.maxFeatures), m(a.resultType) && c.setAttribute("resultType", a.resultType), m(a.oo) && c.setAttribute("startIndex", a.oo), m(a.count) && c.setAttribute("count", a.count));
        Uo(c, "http://www.w3.org/2001/XMLSchema-instance", "xsi:schemaLocation", this.d);
        var d = a.featureTypes;
        a = [{
            P: c,
            srsName: a.srsName,
            featureNS: m(a.featureNS) ? a.featureNS : this.c,
            featurePrefix: a.featurePrefix,
            geometryName: a.geometryName,
            bbox: a.bbox,
            bh: m(a.bh) ? a.bh : []
        }];
        var e = Db(a[a.length - 1]);
        e.P = c;
        gp(e, bw, bp("Query"), d, a);
        return c
    };
    Qv.prototype.o = function(a, c, d, e) {
        var f = [],
            g = Ao("http://www.opengis.net/wfs", "Transaction");
        g.setAttribute("service", "WFS");
        g.setAttribute("version", "1.1.0");
        var h, k;
        m(e) && (h = m(e.gmlOptions) ? e.gmlOptions : {}, m(e.handle) && g.setAttribute("handle", e.handle));
        Uo(g, "http://www.w3.org/2001/XMLSchema-instance", "xsi:schemaLocation", this.d);
        null != a && (k = {
            P: g,
            featureNS: e.featureNS,
            featureType: e.featureType,
            featurePrefix: e.featurePrefix
        }, Fb(k, h), gp(k, aw, bp("Insert"), a, f));
        null != c && (k = {
            P: g,
            featureNS: e.featureNS,
            featureType: e.featureType,
            featurePrefix: e.featurePrefix
        }, Fb(k, h), gp(k, aw, bp("Update"), c, f));
        null != d && gp({
            P: g,
            featureNS: e.featureNS,
            featureType: e.featureType,
            featurePrefix: e.featurePrefix
        }, aw, bp("Delete"), d, f);
        m(e.nativeElements) && gp({
            P: g,
            featureNS: e.featureNS,
            featureType: e.featureType,
            featurePrefix: e.featurePrefix
        }, aw, bp("Native"), e.nativeElements, f);
        return g
    };
    Qv.prototype.sf = function(a) {
        for (a = a.firstChild; null !== a; a = a.nextSibling)
            if (1 == a.nodeType) return this.te(a);
        return null
    };
    Qv.prototype.te = function(a) {
        if (null != a.firstElementChild && null != a.firstElementChild.firstElementChild)
            for (a = a.firstElementChild.firstElementChild, a = a.firstElementChild; null !== a; a = a.nextElementSibling)
                if (0 !== a.childNodes.length && (1 !== a.childNodes.length || 3 !== a.firstChild.nodeType)) {
                    var c = [{}];
                    this.b.qe(a, c);
                    return re(c.pop().srsName)
                }
        return null
    };

    function cw(a) {
        a = m(a) ? a : {};
        this.defaultDataProjection = null;
        this.b = m(a.splitCollection) ? a.splitCollection : !1
    }
    w(cw, Ws);

    function dw(a) {
        a = a.K();
        return 0 == a.length ? "" : a[0] + " " + a[1]
    }

    function ew(a) {
        a = a.K();
        for (var c = [], d = 0, e = a.length; d < e; ++d) c.push(a[d][0] + " " + a[d][1]);
        return c.join(",")
    }

    function fw(a) {
        var c = [];
        a = a.Ed();
        for (var d = 0, e = a.length; d < e; ++d) c.push("(" + ew(a[d]) + ")");
        return c.join(",")
    }

    function gw(a) {
        var c = a.M();
        a = (0, hw[c])(a);
        c = c.toUpperCase();
        return 0 === a.length ? c + " EMPTY" : c + "(" + a + ")"
    }
    var hw = {
        Point: dw,
        LineString: ew,
        Polygon: fw,
        MultiPoint: function(a) {
            var c = [];
            a = a.ce();
            for (var d = 0, e = a.length; d < e; ++d) c.push("(" + dw(a[d]) + ")");
            return c.join(",")
        },
        MultiLineString: function(a) {
            var c = [];
            a = a.ad();
            for (var d = 0, e = a.length; d < e; ++d) c.push("(" + ew(a[d]) + ")");
            return c.join(",")
        },
        MultiPolygon: function(a) {
            var c = [];
            a = a.Id();
            for (var d = 0, e = a.length; d < e; ++d) c.push("(" + fw(a[d]) + ")");
            return c.join(",")
        },
        GeometryCollection: function(a) {
            var c = [];
            a = a.Vf();
            for (var d = 0, e = a.length; d < e; ++d) c.push(gw(a[d]));
            return c.join(",")
        }
    };
    l = cw.prototype;
    l.hd = function(a, c) {
        var d = this.kd(a, c);
        if (m(d)) {
            var e = new X;
            e.La(d);
            return e
        }
        return null
    };
    l.pf = function(a, c) {
        var d = [],
            e = this.kd(a, c);
        this.b && "GeometryCollection" == e.M() ? d = e.d : d = [e];
        for (var f = [], g = 0, h = d.length; g < h; ++g) e = new X, e.La(d[g]), f.push(e);
        return f
    };
    l.kd = function(a, c) {
        var d;
        d = new iw(new jw(a));
        d.b = kw(d.a);
        d = lw(d);
        return m(d) ? zr(d, !1, c) : null
    };
    l.ye = function(a, c) {
        var d = a.Q();
        return m(d) ? this.rd(d, c) : ""
    };
    l.Mh = function(a, c) {
        if (1 == a.length) return this.ye(a[0], c);
        for (var d = [], e = 0, f = a.length; e < f; ++e) d.push(a[e].Q());
        d = new Rm(d);
        return this.rd(d, c)
    };
    l.rd = function(a, c) {
        return gw(zr(a, !0, c))
    };

    function jw(a) {
        this.a = a;
        this.b = -1
    }

    function mw(a, c) {
        var d = m(c) ? c : !1;
        return "0" <= a && "9" >= a || "." == a && !d
    }

    function kw(a) {
        var c = a.a.charAt(++a.b),
            d = {
                position: a.b,
                value: c
            };
        if ("(" == c) d.type = 2;
        else if ("," == c) d.type = 5;
        else if (")" == c) d.type = 3;
        else if (mw(c) || "-" == c) {
            d.type = 4;
            var e, c = a.b,
                f = !1;
            do "." == e && (f = !0), e = a.a.charAt(++a.b); while (mw(e, f));
            a = parseFloat(a.a.substring(c, a.b--));
            d.value = a
        } else if ("a" <= c && "z" >= c || "A" <= c && "Z" >= c) {
            d.type = 1;
            c = a.b;
            do e = a.a.charAt(++a.b); while ("a" <= e && "z" >= e || "A" <= e && "Z" >= e);
            a = a.a.substring(c, a.b--).toUpperCase();
            d.value = a
        } else {
            if (" " == c || "\t" == c || "\r" == c || "\n" == c) return kw(a);
            if ("" === c) d.type = 6;
            else throw Error("Unexpected character: " + c);
        }
        return d
    }

    function iw(a) {
        this.a = a
    }
    l = iw.prototype;
    l.match = function(a) {
        if (a = this.b.type == a) this.b = kw(this.a);
        return a
    };

    function lw(a) {
        var c = a.b;
        if (a.match(1)) {
            var d = c.value;
            if ("GEOMETRYCOLLECTION" == d) {
                a: {
                    if (a.match(2)) {
                        c = [];
                        do c.push(lw(a)); while (a.match(5));
                        if (a.match(3)) {
                            a = c;
                            break a
                        }
                    } else if (nw(a)) {
                        a = [];
                        break a
                    }
                    throw Error(ow(a));
                }
                return new Rm(a)
            }
            var e = pw[d],
                c = qw[d];
            if (!m(e) || !m(c)) throw Error("Invalid geometry type: " + d);
            a = e.call(a);
            return new c(a)
        }
        throw Error(ow(a));
    }
    l.lf = function() {
        if (this.match(2)) {
            var a = rw(this);
            if (this.match(3)) return a
        } else if (nw(this)) return null;
        throw Error(ow(this));
    };
    l.kf = function() {
        if (this.match(2)) {
            var a = sw(this);
            if (this.match(3)) return a
        } else if (nw(this)) return [];
        throw Error(ow(this));
    };
    l.mf = function() {
        if (this.match(2)) {
            var a = tw(this);
            if (this.match(3)) return a
        } else if (nw(this)) return [];
        throw Error(ow(this));
    };
    l.kn = function() {
        if (this.match(2)) {
            var a;
            if (2 == this.b.type)
                for (a = [this.lf()]; this.match(5);) a.push(this.lf());
            else a = sw(this);
            if (this.match(3)) return a
        } else if (nw(this)) return [];
        throw Error(ow(this));
    };
    l.jn = function() {
        if (this.match(2)) {
            var a = tw(this);
            if (this.match(3)) return a
        } else if (nw(this)) return [];
        throw Error(ow(this));
    };
    l.ln = function() {
        if (this.match(2)) {
            for (var a = [this.mf()]; this.match(5);) a.push(this.mf());
            if (this.match(3)) return a
        } else if (nw(this)) return [];
        throw Error(ow(this));
    };

    function rw(a) {
        for (var c = [], d = 0; 2 > d; ++d) {
            var e = a.b;
            if (a.match(4)) c.push(e.value);
            else break
        }
        if (2 == c.length) return c;
        throw Error(ow(a));
    }

    function sw(a) {
        for (var c = [rw(a)]; a.match(5);) c.push(rw(a));
        return c
    }

    function tw(a) {
        for (var c = [a.kf()]; a.match(5);) c.push(a.kf());
        return c
    }

    function nw(a) {
        var c = 1 == a.b.type && "EMPTY" == a.b.value;
        c && (a.b = kw(a.a));
        return c
    }

    function ow(a) {
        return "Unexpected `" + a.b.value + "` at position " + a.b.position + " in `" + a.a.a + "`"
    }
    var qw = {
            POINT: E,
            LINESTRING: O,
            POLYGON: F,
            MULTIPOINT: an,
            MULTILINESTRING: Q,
            MULTIPOLYGON: R
        },
        pw = {
            POINT: iw.prototype.lf,
            LINESTRING: iw.prototype.kf,
            POLYGON: iw.prototype.mf,
            MULTIPOINT: iw.prototype.kn,
            MULTILINESTRING: iw.prototype.jn,
            MULTIPOLYGON: iw.prototype.ln
        };

    function uw() {
        this.version = void 0
    }
    w(uw, nv);
    uw.prototype.a = function(a) {
        for (a = a.firstChild; null !== a; a = a.nextSibling)
            if (1 == a.nodeType) return this.b(a);
        return null
    };
    uw.prototype.b = function(a) {
        this.version = Ca(a.getAttribute("version"));
        a = V({
            version: this.version
        }, vw, a, []);
        return m(a) ? a : null
    };

    function ww(a, c) {
        return V({}, xw, a, c)
    }

    function yw(a, c) {
        return V({}, zw, a, c)
    }

    function Aw(a, c) {
        var d = ww(a, c);
        if (m(d)) {
            var e = [Yr(a.getAttribute("width")), Yr(a.getAttribute("height"))];
            d.size = e;
            return d
        }
    }

    function Bw(a, c) {
        return V([], Cw, a, c)
    }
    var Dw = [null, "http://www.opengis.net/wms"],
        vw = T(Dw, {
            Service: S(function(a, c) {
                return V({}, Ew, a, c)
            }),
            Capability: S(function(a, c) {
                return V({}, Fw, a, c)
            })
        }),
        Fw = T(Dw, {
            Request: S(function(a, c) {
                return V({}, Gw, a, c)
            }),
            Exception: S(function(a, c) {
                return V([], Hw, a, c)
            }),
            Layer: S(function(a, c) {
                return V({}, Iw, a, c)
            })
        }),
        Ew = T(Dw, {
            Name: S(Y),
            Title: S(Y),
            Abstract: S(Y),
            KeywordList: S(Bw),
            OnlineResource: S(mv),
            ContactInformation: S(function(a, c) {
                return V({}, Jw, a, c)
            }),
            Fees: S(Y),
            AccessConstraints: S(Y),
            LayerLimit: S(Xr),
            MaxWidth: S(Xr),
            MaxHeight: S(Xr)
        }),
        Jw = T(Dw, {
            ContactPersonPrimary: S(function(a, c) {
                return V({}, Kw, a, c)
            }),
            ContactPosition: S(Y),
            ContactAddress: S(function(a, c) {
                return V({}, Lw, a, c)
            }),
            ContactVoiceTelephone: S(Y),
            ContactFacsimileTelephone: S(Y),
            ContactElectronicMailAddress: S(Y)
        }),
        Kw = T(Dw, {
            ContactPerson: S(Y),
            ContactOrganization: S(Y)
        }),
        Lw = T(Dw, {
            AddressType: S(Y),
            Address: S(Y),
            City: S(Y),
            StateOrProvince: S(Y),
            PostCode: S(Y),
            Country: S(Y)
        }),
        Hw = T(Dw, {
            Format: Xo(Y)
        }),
        Iw = T(Dw, {
            Name: S(Y),
            Title: S(Y),
            Abstract: S(Y),
            KeywordList: S(Bw),
            CRS: Zo(Y),
            EX_GeographicBoundingBox: S(function(a, c) {
                var d = V({}, Mw, a, c);
                if (m(d)) {
                    var e = d.westBoundLongitude,
                        f = d.southBoundLatitude,
                        g = d.eastBoundLongitude,
                        d = d.northBoundLatitude;
                    return m(e) && m(f) && m(g) && m(d) ? [e, f, g, d] : void 0
                }
            }),
            BoundingBox: Zo(function(a) {
                var c = [Wr(a.getAttribute("minx")), Wr(a.getAttribute("miny")), Wr(a.getAttribute("maxx")), Wr(a.getAttribute("maxy"))],
                    d = [Wr(a.getAttribute("resx")), Wr(a.getAttribute("resy"))];
                return {
                    crs: a.getAttribute("CRS"),
                    extent: c,
                    res: d
                }
            }),
            Dimension: Zo(function(a) {
                return {
                    name: a.getAttribute("name"),
                    units: a.getAttribute("units"),
                    unitSymbol: a.getAttribute("unitSymbol"),
                    "default": a.getAttribute("default"),
                    multipleValues: Tr(a.getAttribute("multipleValues")),
                    nearestValue: Tr(a.getAttribute("nearestValue")),
                    current: Tr(a.getAttribute("current")),
                    values: Y(a)
                }
            }),
            Attribution: S(function(a, c) {
                return V({}, Nw, a, c)
            }),
            AuthorityURL: Zo(function(a, c) {
                var d = ww(a, c);
                if (m(d)) return d.name = a.getAttribute("name"), d
            }),
            Identifier: Zo(Y),
            MetadataURL: Zo(function(a, c) {
                var d = ww(a, c);
                if (m(d)) return d.type = a.getAttribute("type"),
                    d
            }),
            DataURL: Zo(ww),
            FeatureListURL: Zo(ww),
            Style: Zo(function(a, c) {
                return V({}, Ow, a, c)
            }),
            MinScaleDenominator: S(Vr),
            MaxScaleDenominator: S(Vr),
            Layer: Zo(function(a, c) {
                var d = c[c.length - 1],
                    e = V({}, Iw, a, c);
                if (m(e)) {
                    var f = Tr(a.getAttribute("queryable"));
                    m(f) || (f = d.queryable);
                    e.queryable = m(f) ? f : !1;
                    f = Yr(a.getAttribute("cascaded"));
                    m(f) || (f = d.cascaded);
                    e.cascaded = f;
                    f = Tr(a.getAttribute("opaque"));
                    m(f) || (f = d.opaque);
                    e.opaque = m(f) ? f : !1;
                    f = Tr(a.getAttribute("noSubsets"));
                    m(f) || (f = d.noSubsets);
                    e.noSubsets = m(f) ? f : !1;
                    f = Wr(a.getAttribute("fixedWidth"));
                    m(f) || (f = d.fixedWidth);
                    e.fixedWidth = f;
                    f = Wr(a.getAttribute("fixedHeight"));
                    m(f) || (f = d.fixedHeight);
                    e.fixedHeight = f;
                    Sa(["Style", "CRS", "AuthorityURL"], function(a) {
                        var c = d[a];
                        if (m(c)) {
                            var f = Cb(e, a),
                                f = f.concat(c);
                            e[a] = f
                        }
                    });
                    Sa("EX_GeographicBoundingBox BoundingBox Dimension Attribution MinScaleDenominator MaxScaleDenominator".split(" "), function(a) {
                        m(e[a]) || (e[a] = d[a])
                    });
                    return e
                }
            })
        }),
        Nw = T(Dw, {
            Title: S(Y),
            OnlineResource: S(mv),
            LogoURL: S(Aw)
        }),
        Mw = T(Dw, {
            westBoundLongitude: S(Vr),
            eastBoundLongitude: S(Vr),
            southBoundLatitude: S(Vr),
            northBoundLatitude: S(Vr)
        }),
        Gw = T(Dw, {
            GetCapabilities: S(yw),
            GetMap: S(yw),
            GetFeatureInfo: S(yw)
        }),
        zw = T(Dw, {
            Format: Zo(Y),
            DCPType: Zo(function(a, c) {
                return V({}, Pw, a, c)
            })
        }),
        Pw = T(Dw, {
            HTTP: S(function(a, c) {
                return V({}, Qw, a, c)
            })
        }),
        Qw = T(Dw, {
            Get: S(ww),
            Post: S(ww)
        }),
        Ow = T(Dw, {
            Name: S(Y),
            Title: S(Y),
            Abstract: S(Y),
            LegendURL: Zo(Aw),
            StyleSheetURL: S(ww),
            StyleURL: S(ww)
        }),
        xw = T(Dw, {
            Format: S(Y),
            OnlineResource: S(mv)
        }),
        Cw = T(Dw, {
            Keyword: Xo(Y)
        });

    function Rw() {
        this.c = "http://mapserver.gis.umn.edu/mapserver";
        this.b = new ls;
        this.defaultDataProjection = null
    }
    w(Rw, Or);

    function Sw(a, c, d) {
        c.namespaceURI = a.c;
        var e = Fo(c),
            f = [];
        if (0 === c.childNodes.length) return f;
        "msGMLOutput" == e && Sa(c.childNodes, function(a) {
            if (1 === a.nodeType) {
                var c = d[0],
                    e = a.localName,
                    n = RegExp,
                    p;
                p = "_layer".replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08");
                n = new n(p, "");
                e = e.replace(n, "") + "_feature";
                c.featureType = e;
                c.featureNS = this.c;
                n = {};
                n[e] = Xo(this.b.nf, this.b);
                c = T([c.featureNS, null], n);
                a.namespaceURI = this.c;
                a = V([], c, a, d, this.b);
                m(a) && db(f, a)
            }
        }, a);
        "FeatureCollection" == e && (a = V([], a.b.b, c, [{}], a.b), m(a) && (f = a));
        return f
    }
    Rw.prototype.Ob = function(a, c) {
        var d = {
            featureType: this.featureType,
            featureNS: this.featureNS
        };
        m(c) && Fb(d, xr(this, a, c));
        return Sw(this, a, [d])
    };

    function Tw() {
        this.d = new ov
    }
    w(Tw, nv);
    Tw.prototype.a = function(a) {
        for (a = a.firstChild; null !== a; a = a.nextSibling)
            if (1 == a.nodeType) return this.b(a);
        return null
    };
    Tw.prototype.b = function(a) {
        this.version = Ca(a.getAttribute("version"));
        var c = this.d.b(a);
        if (!m(c)) return null;
        c.version = this.version;
        c = V(c, Uw, a, []);
        return m(c) ? c : null
    };

    function Vw(a) {
        var c = Y(a).split(" ");
        if (m(c) && 2 == c.length) return a = +c[0], c = +c[1], isNaN(a) || isNaN(c) ? void 0 : [a, c]
    }
    var Ww = [null, "http://www.opengis.net/wmts/1.0"],
        Xw = [null, "http://www.opengis.net/ows/1.1"],
        Uw = T(Ww, {
            Contents: S(function(a, c) {
                return V({}, Yw, a, c)
            })
        }),
        Yw = T(Ww, {
            Layer: Zo(function(a, c) {
                return V({}, Zw, a, c)
            }),
            TileMatrixSet: Zo(function(a, c) {
                return V({}, $w, a, c)
            })
        }),
        Zw = T(Ww, {
            Style: Zo(function(a, c) {
                var d = V({}, ax, a, c);
                if (m(d)) {
                    var e = "true" === a.getAttribute("isDefault");
                    d.isDefault = e;
                    return d
                }
            }),
            Format: Zo(Y),
            TileMatrixSetLink: Zo(function(a, c) {
                return V({}, bx, a, c)
            }),
            ResourceURL: Zo(function(a) {
                var c = a.getAttribute("format"),
                    d = a.getAttribute("template");
                a = a.getAttribute("resourceType");
                var e = {};
                m(c) && (e.format = c);
                m(d) && (e.template = d);
                m(a) && (e.resourceType = a);
                return e
            })
        }, T(Xw, {
            Title: S(Y),
            Abstract: S(Y),
            WGS84BoundingBox: S(function(a, c) {
                var d = V([], cx, a, c);
                return 2 != d.length ? void 0 : Jd(d)
            }),
            Identifier: S(Y)
        })),
        ax = T(Ww, {
            LegendURL: Zo(function(a) {
                var c = {};
                c.format = a.getAttribute("format");
                c.href = mv(a);
                return c
            })
        }, T(Xw, {
            Title: S(Y),
            Identifier: S(Y)
        })),
        bx = T(Ww, {
            TileMatrixSet: S(Y)
        }),
        cx = T(Xw, {
            LowerCorner: Xo(Vw),
            UpperCorner: Xo(Vw)
        }),
        $w = T(Ww, {
            WellKnownScaleSet: S(Y),
            TileMatrix: Zo(function(a, c) {
                return V({}, dx, a, c)
            })
        }, T(Xw, {
            SupportedCRS: S(Y),
            Identifier: S(Y)
        })),
        dx = T(Ww, {
            TopLeftCorner: S(Vw),
            ScaleDenominator: S(Vr),
            TileWidth: S(Xr),
            TileHeight: S(Xr),
            MatrixWidth: S(Xr),
            MatrixHeight: S(Xr)
        }, T(Xw, {
            Identifier: S(Y)
        }));
    var ex = new me(6378137);

    function fx(a) {
        fd.call(this);
        a = m(a) ? a : {};
        this.a = null;
        this.d = Ke;
        this.c = void 0;
        x(this, hd("projection"), this.Vk, !1, this);
        x(this, hd("tracking"), this.Wk, !1, this);
        m(a.projection) && this.ug(re(a.projection));
        m(a.trackingOptions) && this.Dh(a.trackingOptions);
        this.Zd(m(a.tracking) ? a.tracking : !1)
    }
    w(fx, fd);
    l = fx.prototype;
    l.O = function() {
        this.Zd(!1);
        fx.S.O.call(this)
    };
    l.Vk = function() {
        var a = this.sg();
        null != a && (this.d = ve(re("EPSG:4326"), a), null === this.a || this.set("position", this.d(this.a)))
    };
    l.Wk = function() {
        if (ni) {
            var a = this.tg();
            a && !m(this.c) ? this.c = ba.navigator.geolocation.watchPosition(ra(this.tn, this), ra(this.vn, this), this.bg()) : !a && m(this.c) && (ba.navigator.geolocation.clearWatch(this.c), this.c = void 0)
        }
    };
    l.tn = function(a) {
        a = a.coords;
        this.set("accuracy", a.accuracy);
        this.set("altitude", null === a.altitude ? void 0 : a.altitude);
        this.set("altitudeAccuracy", null === a.altitudeAccuracy ? void 0 : a.altitudeAccuracy);
        this.set("heading", null === a.heading ? void 0 : Yb(a.heading));
        null === this.a ? this.a = [a.longitude, a.latitude] : (this.a[0] = a.longitude, this.a[1] = a.latitude);
        var c = this.d(this.a);
        this.set("position", c);
        this.set("speed", null === a.speed ? void 0 : a.speed);
        a = gl(ex, this.a, a.accuracy);
        a.qa(this.d);
        this.set("accuracyGeometry", a);
        this.k()
    };
    l.vn = function(a) {
        a.type = "error";
        this.Zd(!1);
        this.dispatchEvent(a)
    };
    l.Ki = function() {
        return this.get("accuracy")
    };
    l.Li = function() {
        return this.get("accuracyGeometry") || null
    };
    l.Ni = function() {
        return this.get("altitude")
    };
    l.Oi = function() {
        return this.get("altitudeAccuracy")
    };
    l.Tk = function() {
        return this.get("heading")
    };
    l.Uk = function() {
        return this.get("position")
    };
    l.sg = function() {
        return this.get("projection")
    };
    l.vj = function() {
        return this.get("speed")
    };
    l.tg = function() {
        return this.get("tracking")
    };
    l.bg = function() {
        return this.get("trackingOptions")
    };
    l.ug = function(a) {
        this.set("projection", a)
    };
    l.Zd = function(a) {
        this.set("tracking", a)
    };
    l.Dh = function(a) {
        this.set("trackingOptions", a)
    };

    function gx(a, c, d) {
        for (var e = [], f = a(0), g = a(1), h = c(f), k = c(g), n = [g, f], p = [k, h], q = [1, 0], r = {}, t = 1E5, u, A, z, D, B; 0 < --t && 0 < q.length;) z = q.pop(), f = n.pop(), h = p.pop(), g = z.toString(), g in r || (e.push(h[0], h[1]), r[g] = !0), D = q.pop(), g = n.pop(), k = p.pop(), B = (z + D) / 2, u = a(B), A = c(u), Ck(A[0], A[1], h[0], h[1], k[0], k[1]) < d ? (e.push(k[0], k[1]), g = D.toString(), r[g] = !0) : (q.push(D, B, B, z), p.push(k, A, A, h), n.push(g, u, u, f));
        return e
    }

    function hx(a, c, d, e, f) {
        var g = re("EPSG:4326");
        return gx(function(e) {
            return [a, c + (d - c) * e]
        }, Je(g, e), f)
    }

    function ix(a, c, d, e, f) {
        var g = re("EPSG:4326");
        return gx(function(e) {
            return [c + (d - c) * e, a]
        }, Je(g, e), f)
    };

    function jx(a) {
        a = m(a) ? a : {};
        this.i = this.g = null;
        this.d = this.c = Infinity;
        this.f = this.e = -Infinity;
        this.n = m(a.targetSize) ? a.targetSize : 100;
        this.U = m(a.maxLines) ? a.maxLines : 100;
        this.b = [];
        this.a = [];
        this.V = m(a.strokeStyle) ? a.strokeStyle : kx;
        this.o = this.q = void 0;
        this.l = null;
        this.setMap(m(a.map) ? a.map : null)
    }
    var kx = new vl({
            color: "rgba(0,0,0,0.2)"
        }),
        lx = [90, 45, 30, 20, 10, 5, 2, 1, .5, .2, .1, .05, .01, .005, .002, .001];

    function mx(a, c, d, e, f) {
        var g = f;
        c = hx(c, a.e, a.c, a.i, d);
        g = m(a.b[g]) ? a.b[g] : new O(null);
        Ym(g, "XY", c);
        he(g.G(), e) && (a.b[f++] = g);
        return f
    }

    function nx(a, c, d, e, f) {
        var g = f;
        c = ix(c, a.f, a.d, a.i, d);
        g = m(a.a[g]) ? a.a[g] : new O(null);
        Ym(g, "XY", c);
        he(g.G(), e) && (a.a[f++] = g);
        return f
    }
    l = jx.prototype;
    l.Xk = function() {
        return this.g
    };
    l.kj = function() {
        return this.b
    };
    l.pj = function() {
        return this.a
    };
    l.gg = function(a) {
        var c = a.vectorContext,
            d = a.frameState;
        a = d.extent;
        var e = d.viewState,
            f = e.center,
            g = e.projection,
            e = e.resolution,
            d = d.pixelRatio,
            d = e * e / (4 * d * d);
        if (null === this.i || !Ie(this.i, g)) {
            var h = g.G(),
                k = g.g,
                n = k[2],
                p = k[1],
                q = k[0];
            this.c = k[3];
            this.d = n;
            this.e = p;
            this.f = q;
            k = re("EPSG:4326");
            this.q = Je(k, g);
            this.o = Je(g, k);
            this.l = this.o(ce(h));
            this.i = g
        }
        for (var g = this.l[0], h = this.l[1], k = -1, r, p = Math.pow(this.n * e, 2), q = [], t = [], e = 0, n = lx.length; e < n; ++e) {
            r = lx[e] / 2;
            q[0] = g - r;
            q[1] = h - r;
            t[0] = g + r;
            t[1] = h + r;
            this.q(q, q);
            this.q(t, t);
            r = Math.pow(t[0] - q[0], 2) + Math.pow(t[1] - q[1], 2);
            if (r <= p) break;
            k = lx[e]
        }
        e = k;
        if (-1 == e) this.b.length = this.a.length = 0;
        else {
            g = this.o(f);
            f = g[0];
            g = g[1];
            h = this.U;
            f = Math.floor(f / e) * e;
            p = Vb(f, this.f, this.d);
            n = mx(this, p, d, a, 0);
            for (k = 0; p != this.f && k++ < h;) p = Math.max(p - e, this.f), n = mx(this, p, d, a, n);
            p = Vb(f, this.f, this.d);
            for (k = 0; p != this.d && k++ < h;) p = Math.min(p + e, this.d), n = mx(this, p, d, a, n);
            this.b.length = n;
            g = Math.floor(g / e) * e;
            f = Vb(g, this.e, this.c);
            n = nx(this, f, d, a, 0);
            for (k = 0; f != this.e && k++ < h;) f = Math.max(f - e, this.e), n = nx(this, f, d, a, n);
            f = Vb(g, this.e, this.c);
            for (k = 0; f != this.c && k++ < h;) f = Math.min(f + e, this.c), n = nx(this, f, d, a, n);
            this.a.length = n
        }
        c.Aa(null, this.V);
        a = 0;
        for (d = this.b.length; a < d; ++a) f = this.b[a], c.zb(f, null);
        a = 0;
        for (d = this.a.length; a < d; ++a) f = this.a[a], c.zb(f, null)
    };
    l.setMap = function(a) {
        null !== this.g && (this.g.u("postcompose", this.gg, this), this.g.render());
        null !== a && (a.r("postcompose", this.gg, this), a.render());
        this.g = a
    };

    function ox(a, c, d, e, f, g, h) {
        pj.call(this, a, c, d, 0, e);
        this.i = f;
        this.a = new Image;
        null !== g && (this.a.crossOrigin = g);
        this.d = {};
        this.c = null;
        this.state = 0;
        this.g = h
    }
    w(ox, pj);
    ox.prototype.b = function(a) {
        if (m(a)) {
            var c = ma(a);
            if (c in this.d) return this.d[c];
            a = xb(this.d) ? this.a : this.a.cloneNode(!1);
            return this.d[c] = a
        }
        return this.a
    };
    ox.prototype.q = function() {
        this.state = 3;
        Sa(this.c, Wc);
        this.c = null;
        this.dispatchEvent("change")
    };
    ox.prototype.l = function() {
        m(this.resolution) || (this.resolution = fe(this.extent) / this.a.height);
        this.state = 2;
        Sa(this.c, Wc);
        this.c = null;
        this.dispatchEvent("change")
    };
    ox.prototype.load = function() {
        0 == this.state && (this.state = 1, this.dispatchEvent("change"), this.c = [Uc(this.a, "error", this.q, !1, this), Uc(this.a, "load", this.l, !1, this)], this.g(this, this.i))
    };

    function px(a, c, d, e, f) {
        zg.call(this, a, c);
        this.g = d;
        this.a = new Image;
        null !== e && (this.a.crossOrigin = e);
        this.c = {};
        this.e = null;
        this.i = f
    }
    w(px, zg);
    l = px.prototype;
    l.O = function() {
        1 == this.state && qx(this);
        px.S.O.call(this)
    };
    l.Ma = function(a) {
        if (m(a)) {
            var c = ma(a);
            if (c in this.c) return this.c[c];
            a = xb(this.c) ? this.a : this.a.cloneNode(!1);
            return this.c[c] = a
        }
        return this.a
    };
    l.gb = function() {
        return this.g
    };
    l.Yk = function() {
        this.state = 3;
        qx(this);
        Ag(this)
    };
    l.Zk = function() {
        this.state = this.a.naturalWidth && this.a.naturalHeight ? 2 : 4;
        qx(this);
        Ag(this)
    };
    l.load = function() {
        0 == this.state && (this.state = 1, Ag(this), this.e = [Uc(this.a, "error", this.Yk, !1, this), Uc(this.a, "load", this.Zk, !1, this)], this.i(this, this.g))
    };

    function qx(a) {
        Sa(a.e, Wc);
        a.e = null
    };

    function rx(a, c, d) {
        return function(e, f, g) {
            return d(a, c, e, f, g)
        }
    }

    function sx() {};

    function tx(a, c) {
        $c.call(this);
        this.b = new cr(this);
        var d = a;
        c && (d = Ef(a));
        this.b.Ka(d, "dragenter", this.$m);
        d != a && this.b.Ka(d, "dragover", this.an);
        this.b.Ka(a, "dragover", this.bn);
        this.b.Ka(a, "drop", this.cn)
    }
    w(tx, $c);
    l = tx.prototype;
    l.Zc = !1;
    l.O = function() {
        tx.S.O.call(this);
        this.b.Yc()
    };
    l.$m = function(a) {
        var c = a.b.dataTransfer;
        (this.Zc = !(!c || !(c.types && (Ya(c.types, "Files") || Ya(c.types, "public.file-url")) || c.files && 0 < c.files.length))) && a.preventDefault()
    };
    l.an = function(a) {
        this.Zc && (a.preventDefault(), a.b.dataTransfer.dropEffect = "none")
    };
    l.bn = function(a) {
        this.Zc && (a.preventDefault(), a.fb(), a = a.b.dataTransfer, a.effectAllowed = "all", a.dropEffect = "copy")
    };
    l.cn = function(a) {
        this.Zc && (a.preventDefault(), a.fb(), a = new wc(a.b), a.type = "drop", this.dispatchEvent(a))
    };
    /*
     Portions of this code are from MochiKit, received by
     The Closure Authors under the MIT license. All other code is Copyright
     2005-2009 The Closure Authors. All Rights Reserved.
    */
    function ux(a, c) {
        this.e = [];
        this.U = a;
        this.o = c || null;
        this.d = this.b = !1;
        this.c = void 0;
        this.q = this.V = this.g = !1;
        this.f = 0;
        this.a = null;
        this.i = 0
    }
    ux.prototype.cancel = function(a) {
        if (this.b) this.c instanceof ux && this.c.cancel();
        else {
            if (this.a) {
                var c = this.a;
                delete this.a;
                a ? c.cancel(a) : (c.i--, 0 >= c.i && c.cancel())
            }
            this.U ? this.U.call(this.o, this) : this.q = !0;
            this.b || (a = new vx, wx(this), xx(this, !1, a))
        }
    };
    ux.prototype.l = function(a, c) {
        this.g = !1;
        xx(this, a, c)
    };

    function xx(a, c, d) {
        a.b = !0;
        a.c = d;
        a.d = !c;
        yx(a)
    }

    function wx(a) {
        if (a.b) {
            if (!a.q) throw new zx;
            a.q = !1
        }
    }

    function Ax(a, c, d, e) {
        a.e.push([c, d, e]);
        a.b && yx(a)
    }
    ux.prototype.then = function(a, c, d) {
        var e, f, g = new An(function(a, c) {
            e = a;
            f = c
        });
        Ax(this, e, function(a) {
            a instanceof vx ? g.cancel() : f(a)
        });
        return g.then(a, c, d)
    };
    rn(ux);

    function Bx(a) {
        return Va(a.e, function(a) {
            return ka(a[1])
        })
    }

    function yx(a) {
        if (a.f && a.b && Bx(a)) {
            var c = a.f,
                d = Cx[c];
            d && (ba.clearTimeout(d.$), delete Cx[c]);
            a.f = 0
        }
        a.a && (a.a.i--, delete a.a);
        for (var c = a.c, e = d = !1; a.e.length && !a.g;) {
            var f = a.e.shift(),
                g = f[0],
                h = f[1],
                f = f[2];
            if (g = a.d ? h : g) try {
                var k = g.call(f || a.o, c);
                m(k) && (a.d = a.d && (k == c || k instanceof Error), a.c = c = k);
                sn(c) && (e = !0, a.g = !0)
            } catch (n) {
                c = n, a.d = !0, Bx(a) || (d = !0)
            }
        }
        a.c = c;
        e && (k = ra(a.l, a, !0), e = ra(a.l, a, !1), c instanceof ux ? (Ax(c, k, e), c.V = !0) : c.then(k, e));
        d && (c = new Dx(c), Cx[c.$] = c, a.f = c.$)
    }

    function zx() {
        xa.call(this)
    }
    w(zx, xa);
    zx.prototype.message = "Deferred has already fired";
    zx.prototype.name = "AlreadyCalledError";

    function vx() {
        xa.call(this)
    }
    w(vx, xa);
    vx.prototype.message = "Deferred was canceled";
    vx.prototype.name = "CanceledError";

    function Dx(a) {
        this.$ = ba.setTimeout(ra(this.a, this), 0);
        this.b = a
    }
    Dx.prototype.a = function() {
        delete Cx[this.$];
        throw this.b;
    };
    var Cx = {};

    function Ex(a, c) {
        m(a.name) ? (this.name = a.name, this.code = Fx[a.name]) : (this.code = a.code, this.name = Gx(a.code));
        xa.call(this, Ba("%s %s", this.name, c))
    }
    w(Ex, xa);

    function Gx(a) {
        var c = wb(Fx, function(c) {
            return a == c
        });
        if (!m(c)) throw Error("Invalid code: " + a);
        return c
    }
    var Fx = {
        AbortError: 3,
        EncodingError: 5,
        InvalidModificationError: 9,
        InvalidStateError: 7,
        NotFoundError: 1,
        NotReadableError: 4,
        NoModificationAllowedError: 6,
        PathExistsError: 12,
        QuotaExceededError: 10,
        SecurityError: 2,
        SyntaxError: 8,
        TypeMismatchError: 11
    };

    function Hx(a, c) {
        rc.call(this, a.type, c)
    }
    w(Hx, rc);

    function Ix() {
        $c.call(this);
        this.Ya = new FileReader;
        this.Ya.onloadstart = ra(this.b, this);
        this.Ya.onprogress = ra(this.b, this);
        this.Ya.onload = ra(this.b, this);
        this.Ya.onabort = ra(this.b, this);
        this.Ya.onerror = ra(this.b, this);
        this.Ya.onloadend = ra(this.b, this)
    }
    w(Ix, $c);
    Ix.prototype.getError = function() {
        return this.Ya.error && new Ex(this.Ya.error, "reading file")
    };
    Ix.prototype.b = function(a) {
        this.dispatchEvent(new Hx(a, this))
    };
    Ix.prototype.O = function() {
        Ix.S.O.call(this);
        delete this.Ya
    };

    function Jx(a) {
        var c = new ux;
        a.Ka("loadend", ta(function(a, c) {
            var f = c.Ya.result,
                g = c.getError();
            null == f || g ? (wx(a), xx(a, !1, g)) : (wx(a), xx(a, !0, f));
            c.Yc()
        }, c, a));
        return c
    };

    function Kx(a) {
        a = m(a) ? a : {};
        Wj.call(this, {
            handleEvent: Gg
        });
        this.f = m(a.formatConstructors) ? a.formatConstructors : [];
        this.o = m(a.projection) ? re(a.projection) : null;
        this.e = null;
        this.a = void 0
    }
    w(Kx, Wj);
    Kx.prototype.O = function() {
        m(this.a) && Wc(this.a);
        Kx.S.O.call(this)
    };
    Kx.prototype.g = function(a) {
        a = a.b.dataTransfer.files;
        var c, d, e;
        c = 0;
        for (d = a.length; c < d; ++c) {
            var f = e = a[c],
                g = new Ix,
                h = Jx(g);
            g.Ya.readAsText(f, "");
            Ax(h, ta(this.i, e), null, this)
        }
    };
    Kx.prototype.i = function(a, c) {
        var d = this.l,
            e = this.o;
        null === e && (e = d.R().e);
        var d = this.f,
            f = [],
            g, h;
        g = 0;
        for (h = d.length; g < h; ++g) {
            var k = new d[g],
                n;
            try {
                n = k.ja(c)
            } catch (p) {
                n = null
            }
            if (null !== n) {
                var k = k.za(c),
                    k = Je(k, e),
                    q, r;
                q = 0;
                for (r = n.length; q < r; ++q) {
                    var t = n[q],
                        u = t.Q();
                    null != u && u.qa(k);
                    f.push(t)
                }
            }
        }
        this.dispatchEvent(new Lx(Mx, this, a, f, e))
    };
    Kx.prototype.setMap = function(a) {
        m(this.a) && (Wc(this.a), this.a = void 0);
        null !== this.e && (qc(this.e), this.e = null);
        Kx.S.setMap.call(this, a);
        null !== a && (this.e = new tx(a.a), this.a = x(this.e, "drop", this.g, !1, this))
    };
    var Mx = "addfeatures";

    function Lx(a, c, d, e, f) {
        rc.call(this, a, c);
        this.features = e;
        this.file = d;
        this.projection = f
    }
    w(Lx, rc);

    function Nx(a, c) {
        this.x = a;
        this.y = c
    }
    w(Nx, Af);
    Nx.prototype.clone = function() {
        return new Nx(this.x, this.y)
    };
    Nx.prototype.scale = Af.prototype.scale;
    Nx.prototype.add = function(a) {
        this.x += a.x;
        this.y += a.y;
        return this
    };
    Nx.prototype.rotate = function(a) {
        var c = Math.cos(a);
        a = Math.sin(a);
        var d = this.y * c + this.x * a;
        this.x = this.x * c - this.y * a;
        this.y = d;
        return this
    };

    function Ox(a) {
        a = m(a) ? a : {};
        jk.call(this, {
            handleDownEvent: Px,
            handleDragEvent: Qx,
            handleUpEvent: Rx
        });
        this.i = m(a.condition) ? a.condition : gk;
        this.a = this.f = void 0;
        this.g = 0;
        this.n = m(a.duration) ? a.duration : 400
    }
    w(Ox, jk);

    function Qx(a) {
        if (ik(a)) {
            var c = a.map,
                d = c.xa();
            a = a.pixel;
            a = new Nx(a[0] - d[0] / 2, d[1] / 2 - a[1]);
            d = Math.atan2(a.y, a.x);
            a = Math.sqrt(a.x * a.x + a.y * a.y);
            var e = c.R(),
                f = Se(e);
            c.render();
            m(this.f) && Xj(c, e, f.rotation - (d - this.f));
            this.f = d;
            m(this.a) && Zj(c, e, f.resolution / a * this.a);
            m(this.a) && (this.g = this.a / a);
            this.a = a
        }
    }

    function Rx(a) {
        if (!ik(a)) return !0;
        a = a.map;
        var c = a.R();
        Ue(c, -1);
        var d = Se(c),
            e = this.g - 1,
            f = d.rotation,
            f = c.constrainRotation(f, 0);
        Xj(a, c, f, void 0, void 0);
        d = d.resolution;
        f = this.n;
        d = c.constrainResolution(d, 0, e);
        Zj(a, c, d, void 0, f);
        this.g = 0;
        return !1
    }

    function Px(a) {
        return ik(a) && this.i(a) ? (Ue(a.map.R(), 1), this.a = this.f = void 0, !0) : !1
    };

    function Sx(a, c) {
        rc.call(this, a);
        this.feature = c
    }
    w(Sx, rc);

    function Tx(a) {
        jk.call(this, {
            handleDownEvent: Ux,
            handleEvent: Vx,
            handleUpEvent: Wx
        });
        this.N = null;
        this.H = !1;
        this.Ga = m(a.source) ? a.source : null;
        this.oa = m(a.features) ? a.features : null;
        this.gi = m(a.snapTolerance) ? a.snapTolerance : 12;
        this.Nc = m(a.minPointsPerRing) ? a.minPointsPerRing : 3;
        var c = this.L = a.type,
            d;
        "Point" === c || "MultiPoint" === c ? d = Xx : "LineString" === c || "MultiLineString" === c ? d = Yx : "Polygon" === c || "MultiPolygon" === c ? d = Zx : "Circle" === c && (d = $x);
        this.a = d;
        this.f = this.n = this.p = this.g = this.i = null;
        this.T = new ur({
            style: m(a.style) ? a.style : ay()
        });
        this.Fa = a.geometryName;
        this.Ee = m(a.condition) ? a.condition : fk;
        this.ba = m(a.freehandCondition) ? a.freehandCondition : gk;
        x(this, hd("active"), this.Ra, !1, this)
    }
    w(Tx, jk);

    function ay() {
        var a = Fl();
        return function(c) {
            return a[c.Q().M()]
        }
    }
    Tx.prototype.setMap = function(a) {
        Tx.S.setMap.call(this, a);
        this.Ra()
    };

    function Vx(a) {
        var c = !this.H;
        this.H && a.type === kj ? (by(this, a), c = !1) : a.type === jj ? c = cy(this, a) : a.type === dj && (c = !1);
        return kk.call(this, a) && c
    }

    function Ux(a) {
        if (this.Ee(a)) return this.N = a.pixel, !0;
        if (this.a !== Yx && this.a !== Zx || !this.ba(a)) return !1;
        this.N = a.pixel;
        this.H = !0;
        null === this.i && dy(this, a);
        return !0
    }

    function Wx(a) {
        this.H = !1;
        var c = this.N,
            d = a.pixel,
            e = c[0] - d[0],
            c = c[1] - d[1],
            d = !0;
        4 >= e * e + c * c && (cy(this, a), null === this.i ? dy(this, a) : (this.a === Xx || this.a === $x) && null !== this.i || ey(this, a) ? this.X() : by(this, a), d = !1);
        return d
    }

    function cy(a, c) {
        if (a.a === Xx && null === a.i) dy(a, c);
        else if (null === a.i) {
            var d = c.coordinate.slice();
            null === a.p ? (a.p = new X(new E(d)), fy(a)) : a.p.Q().W(d)
        } else {
            var d = c.coordinate,
                e = a.g.Q(),
                f, g;
            a.a === Xx ? (g = e.K(), g[0] = d[0], g[1] = d[1], e.W(g)) : (a.a === Yx ? f = e.K() : a.a === Zx ? f = a.f[0] : a.a === $x && (f = e.dd()), ey(a, c) && (d = a.i.slice()), a.p.Q().W(d), g = f[f.length - 1], g[0] = d[0], g[1] = d[1], a.a === Yx ? e.W(f) : a.a === Zx ? (g = a.n.Q(), g.W(f), e.W(a.f)) : a.a === $x && (g = a.n.Q(), g.W([e.dd(), d]), e.Ag(g.Bg())));
            fy(a)
        }
        return !0
    }

    function ey(a, c) {
        var d = !1;
        if (null !== a.g) {
            var e = a.g.Q(),
                f = !1,
                g = [a.i];
            a.a === Yx ? f = 2 < e.K().length : a.a === Zx && (f = e.K()[0].length > a.Nc, g = [a.f[0][0], a.f[0][a.f[0].length - 2]]);
            if (f)
                for (var e = c.map, f = 0, h = g.length; f < h; f++) {
                    var k = g[f],
                        n = e.ta(k),
                        p = c.pixel,
                        d = p[0] - n[0],
                        n = p[1] - n[1],
                        p = a.H && a.ba(c) ? 1 : a.gi;
                    if (d = Math.sqrt(d * d + n * n) <= p) {
                        a.i = k;
                        break
                    }
                }
        }
        return d
    }

    function dy(a, c) {
        var d = c.coordinate;
        a.i = d;
        var e;
        a.a === Xx ? e = new E(d.slice()) : a.a === Yx ? e = new O([d.slice(), d.slice()]) : a.a === Zx ? (a.n = new X(new O([d.slice(), d.slice()])), a.f = [
            [d.slice(), d.slice()]
        ], e = new F(a.f)) : a.a === $x && (e = new Pm(d.slice(), 0), a.n = new X(new O([d.slice(), d.slice()])));
        a.g = new X;
        m(a.Fa) && a.g.Ic(a.Fa);
        a.g.La(e);
        fy(a);
        a.dispatchEvent(new Sx("drawstart", a.g))
    }

    function by(a, c) {
        var d = c.coordinate,
            e = a.g.Q(),
            f;
        a.a === Yx ? (a.i = d.slice(), f = e.K(), f.push(d.slice()), e.W(f)) : a.a === Zx && (a.f[0].push(d.slice()), e.W(a.f));
        fy(a)
    }
    Tx.prototype.X = function() {
        var a = gy(this),
            c, d = a.Q();
        this.a === Xx ? c = d.K() : this.a === Yx ? (c = d.K(), c.pop(), d.W(c)) : this.a === Zx && (this.f[0].pop(), this.f[0].push(this.f[0][0]), d.W(this.f), c = d.K());
        "MultiPoint" === this.L ? a.La(new an([c])) : "MultiLineString" === this.L ? a.La(new Q([c])) : "MultiPolygon" === this.L && a.La(new R([c]));
        this.dispatchEvent(new Sx("drawend", a));
        null === this.oa || this.oa.push(a);
        null === this.Ga || this.Ga.jf(a)
    };

    function gy(a) {
        a.i = null;
        var c = a.g;
        null !== c && (a.g = null, a.p = null, a.n = null, a.T.b.clear());
        return c
    }
    Tx.prototype.nc = Fg;

    function fy(a) {
        var c = [];
        null === a.g || c.push(a.g);
        null === a.n || c.push(a.n);
        null === a.p || c.push(a.p);
        a.T.ld(new of(c))
    }
    Tx.prototype.Ra = function() {
        var a = this.l,
            c = this.c();
        null !== a && c || gy(this);
        this.T.setMap(c ? a : null)
    };
    var Xx = "Point",
        Yx = "LineString",
        Zx = "Polygon",
        $x = "Circle";

    function hy(a) {
        jk.call(this, {
            handleDownEvent: iy,
            handleDragEvent: jy,
            handleEvent: ky,
            handleUpEvent: ly
        });
        this.X = m(a.deleteCondition) ? a.deleteCondition : Lg(fk, ek);
        this.T = this.f = null;
        this.L = [0, 0];
        this.a = new lp;
        this.i = m(a.pixelTolerance) ? a.pixelTolerance : 10;
        this.N = !1;
        this.g = null;
        this.n = new ur({
            style: m(a.style) ? a.style : my()
        });
        this.H = {
            Point: this.Bl,
            LineString: this.Dg,
            LinearRing: this.Dg,
            Polygon: this.Cl,
            MultiPoint: this.zl,
            MultiLineString: this.yl,
            MultiPolygon: this.Al,
            GeometryCollection: this.xl
        };
        this.p = a.features;
        this.p.forEach(this.Cg, this);
        x(this.p, "add", this.vl, !1, this);
        x(this.p, "remove", this.wl, !1, this)
    }
    w(hy, jk);
    l = hy.prototype;
    l.Cg = function(a) {
        var c = a.Q();
        m(this.H[c.M()]) && this.H[c.M()].call(this, a, c);
        a = this.l;
        null === a || ny(this, this.L, a)
    };
    l.setMap = function(a) {
        this.n.setMap(a);
        hy.S.setMap.call(this, a)
    };
    l.vl = function(a) {
        this.Cg(a.element)
    };
    l.wl = function(a) {
        var c = a.element;
        a = this.a;
        var d, e = [];
        pp(a, c.Q().G(), function(a) {
            c === a.feature && e.push(a)
        });
        for (d = e.length - 1; 0 <= d; --d) a.remove(e[d]);
        null !== this.f && 0 === this.p.Ib() && (this.n.Yd(this.f), this.f = null)
    };
    l.Bl = function(a, c) {
        var d = c.K(),
            d = {
                feature: a,
                geometry: c,
                aa: [d, d]
            };
        this.a.ha(c.G(), d)
    };
    l.zl = function(a, c) {
        var d = c.K(),
            e, f, g;
        f = 0;
        for (g = d.length; f < g; ++f) e = d[f], e = {
            feature: a,
            geometry: c,
            depth: [f],
            index: f,
            aa: [e, e]
        }, this.a.ha(c.G(), e)
    };
    l.Dg = function(a, c) {
        var d = c.K(),
            e, f, g, h;
        e = 0;
        for (f = d.length - 1; e < f; ++e) g = d.slice(e, e + 2), h = {
            feature: a,
            geometry: c,
            index: e,
            aa: g
        }, this.a.ha(Jd(g), h)
    };
    l.yl = function(a, c) {
        var d = c.K(),
            e, f, g, h, k, n, p;
        h = 0;
        for (k = d.length; h < k; ++h)
            for (e = d[h], f = 0, g = e.length - 1; f < g; ++f) n = e.slice(f, f + 2), p = {
                feature: a,
                geometry: c,
                depth: [h],
                index: f,
                aa: n
            }, this.a.ha(Jd(n), p)
    };
    l.Cl = function(a, c) {
        var d = c.K(),
            e, f, g, h, k, n, p;
        h = 0;
        for (k = d.length; h < k; ++h)
            for (e = d[h], f = 0, g = e.length - 1; f < g; ++f) n = e.slice(f, f + 2), p = {
                feature: a,
                geometry: c,
                depth: [h],
                index: f,
                aa: n
            }, this.a.ha(Jd(n), p)
    };
    l.Al = function(a, c) {
        var d = c.K(),
            e, f, g, h, k, n, p, q, r, t;
        n = 0;
        for (p = d.length; n < p; ++n)
            for (q = d[n], h = 0, k = q.length; h < k; ++h)
                for (e = q[h], f = 0, g = e.length - 1; f < g; ++f) r = e.slice(f, f + 2), t = {
                    feature: a,
                    geometry: c,
                    depth: [h, n],
                    index: f,
                    aa: r
                }, this.a.ha(Jd(r), t)
    };
    l.xl = function(a, c) {
        var d, e = c.d;
        for (d = 0; d < e.length; ++d) this.H[e[d].M()].call(this, a, e[d])
    };

    function oy(a, c) {
        var d = a.f;
        null === d ? (d = new X(new E(c)), a.f = d, a.n.pg(d)) : d.Q().W(c)
    }

    function py(a, c) {
        return a.index - c.index
    }

    function iy(a) {
        ny(this, a.pixel, a.map);
        this.g = [];
        var c = this.f;
        if (null !== c) {
            a = [];
            var c = c.Q().K(),
                d = Jd([c]),
                d = np(this.a, d),
                e = {};
            d.sort(py);
            for (var f = 0, g = d.length; f < g; ++f) {
                var h = d[f],
                    k = h.aa,
                    n = ma(h.feature),
                    p = h.depth;
                p && (n += "-" + p.join("-"));
                e[n] || (e[n] = Array(2));
                if (qd(k[0], c) && !e[n][0]) this.g.push([h, 0]), e[n][0] = h;
                else if (qd(k[1], c) && !e[n][1]) {
                    if ("LineString" !== h.geometry.M() && "MultiLineString" !== h.geometry.M() || !e[n][0] || 0 !== e[n][0].index) this.g.push([h, 1]), e[n][1] = h
                } else ma(k) in this.T && !e[n][0] && !e[n][1] && a.push([h, c])
            }
            for (f = a.length - 1; 0 <= f; --f) this.qk.apply(this, a[f])
        }
        return null !== this.f
    }

    function jy(a) {
        a = a.coordinate;
        for (var c = 0, d = this.g.length; c < d; ++c) {
            for (var e = this.g[c], f = e[0], g = f.depth, h = f.geometry, k = h.K(), n = f.aa, e = e[1]; a.length < h.s;) a.push(0);
            switch (h.M()) {
                case "Point":
                    k = a;
                    n[0] = n[1] = a;
                    break;
                case "MultiPoint":
                    k[f.index] = a;
                    n[0] = n[1] = a;
                    break;
                case "LineString":
                    k[f.index + e] = a;
                    n[e] = a;
                    break;
                case "MultiLineString":
                    k[g[0]][f.index + e] = a;
                    n[e] = a;
                    break;
                case "Polygon":
                    k[g[0]][f.index + e] = a;
                    n[e] = a;
                    break;
                case "MultiPolygon":
                    k[g[1]][g[0]][f.index + e] = a, n[e] = a
            }
            h.W(k)
        }
        oy(this, a)
    }

    function ly() {
        for (var a, c = this.g.length - 1; 0 <= c; --c) a = this.g[c][0], this.a.update(Jd(a.aa), a);
        return !1
    }

    function ky(a) {
        var c;
        a.map.R().c.slice()[1] || a.type != jj || this.o || (this.L = a.pixel, ny(this, a.pixel, a.map));
        if (null !== this.f && this.X(a)) {
            this.f.Q();
            c = this.g;
            var d = {},
                e, f, g, h, k, n, p, q, r;
            for (k = c.length - 1; 0 <= k; --k)
                if (g = c[k], q = g[0], h = q.geometry, f = h.K(), r = ma(q.feature), q.depth && (r += "-" + q.depth.join("-")), e = p = n = void 0, 0 === g[1] ? (p = q, n = q.index) : 1 == g[1] && (e = q, n = q.index + 1), r in d || (d[r] = [e, p, n]), g = d[r], m(e) && (g[0] = e), m(p) && (g[1] = p), m(g[0]) && m(g[1])) {
                    e = f;
                    r = !1;
                    p = n - 1;
                    switch (h.M()) {
                        case "MultiLineString":
                            f[q.depth[0]].splice(n, 1);
                            r = !0;
                            break;
                        case "LineString":
                            f.splice(n, 1);
                            r = !0;
                            break;
                        case "MultiPolygon":
                            e = e[q.depth[1]];
                        case "Polygon":
                            e = e[q.depth[0]], 4 < e.length && (n == e.length - 1 && (n = 0), e.splice(n, 1), r = !0, 0 === n && (e.pop(), e.push(e[0]), p = e.length - 1))
                    }
                    r && (this.a.remove(g[0]), this.a.remove(g[1]), h.W(f), f = {
                        depth: q.depth,
                        feature: q.feature,
                        geometry: q.geometry,
                        index: p,
                        aa: [g[0].aa[0], g[1].aa[1]]
                    }, this.a.ha(Jd(f.aa), f), qy(this, h, n, q.depth, -1), this.n.Yd(this.f), this.f = null)
                }
            c = !0
        }
        return kk.call(this, a) && !c
    }

    function ny(a, c, d) {
        function e(a, c) {
            return td(f, a.aa) - td(f, c.aa)
        }
        var f = d.ka(c),
            g = d.ka([c[0] - a.i, c[1] + a.i]),
            h = d.ka([c[0] + a.i, c[1] - a.i]),
            g = Jd([g, h]),
            g = np(a.a, g);
        if (0 < g.length) {
            g.sort(e);
            var h = g[0].aa,
                k = nd(f, h),
                n = d.ta(k);
            if (Math.sqrt(sd(c, n)) <= a.i) {
                c = d.ta(h[0]);
                d = d.ta(h[1]);
                c = sd(n, c);
                d = sd(n, d);
                a.N = Math.sqrt(Math.min(c, d)) <= a.i;
                a.N && (k = c > d ? h[1] : h[0]);
                oy(a, k);
                d = {};
                d[ma(h)] = !0;
                c = 1;
                for (n = g.length; c < n; ++c)
                    if (k = g[c].aa, qd(h[0], k[0]) && qd(h[1], k[1]) || qd(h[0], k[1]) && qd(h[1], k[0])) d[ma(k)] = !0;
                    else break;
                a.T = d;
                return
            }
        }
        null !== a.f && (a.n.Yd(a.f), a.f = null)
    }
    l.qk = function(a, c) {
        for (var d = a.aa, e = a.feature, f = a.geometry, g = a.depth, h = a.index, k; c.length < f.s;) c.push(0);
        switch (f.M()) {
            case "MultiLineString":
                k = f.K();
                k[g[0]].splice(h + 1, 0, c);
                break;
            case "Polygon":
                k = f.K();
                k[g[0]].splice(h + 1, 0, c);
                break;
            case "MultiPolygon":
                k = f.K();
                k[g[1]][g[0]].splice(h + 1, 0, c);
                break;
            case "LineString":
                k = f.K();
                k.splice(h + 1, 0, c);
                break;
            default:
                return
        }
        f.W(k);
        k = this.a;
        k.remove(a);
        qy(this, f, h, g, 1);
        var n = {
            aa: [d[0], c],
            feature: e,
            geometry: f,
            depth: g,
            index: h
        };
        k.ha(Jd(n.aa), n);
        this.g.push([n, 1]);
        d = {
            aa: [c, d[1]],
            feature: e,
            geometry: f,
            depth: g,
            index: h + 1
        };
        k.ha(Jd(d.aa), d);
        this.g.push([d, 0])
    };

    function qy(a, c, d, e, f) {
        pp(a.a, c.G(), function(a) {
            a.geometry === c && (!m(e) || ib(a.depth, e)) && a.index > d && (a.index += f)
        })
    }

    function my() {
        var a = Fl();
        return function() {
            return a.Point
        }
    };

    function ry(a, c, d) {
        rc.call(this, a);
        this.selected = c;
        this.deselected = d
    }
    w(ry, rc);

    function sy(a) {
        Wj.call(this, {
            handleEvent: ty
        });
        a = m(a) ? a : {};
        this.o = m(a.condition) ? a.condition : ek;
        this.g = m(a.addCondition) ? a.addCondition : Fg;
        this.H = m(a.removeCondition) ? a.removeCondition : Fg;
        this.L = m(a.toggleCondition) ? a.toggleCondition : gk;
        this.i = m(a.multi) ? a.multi : !1;
        this.e = m(a.filter) ? a.filter : Gg;
        var c;
        if (m(a.layers))
            if (ka(a.layers)) c = a.layers;
            else {
                var d = a.layers;
                c = function(a) {
                    return Ya(d, a)
                }
            }
        else c = Gg;
        this.f = c;
        this.a = new ur({
            style: m(a.style) ? a.style : uy()
        });
        a = this.a.b;
        x(a, "add", this.n, !1, this);
        x(a, "remove", this.J, !1, this)
    }
    w(sy, Wj);
    sy.prototype.p = function() {
        return this.a.b
    };

    function ty(a) {
        if (!this.o(a)) return !0;
        var c = this.g(a),
            d = this.H(a),
            e = this.L(a),
            f = a.map,
            g = this.a.b,
            h = [],
            k = [],
            n = !1;
        if (c || d || e) {
            f.Ne(a.pixel, function(a, f) {
                -1 == Ra(g.a, a) ? (c || e) && this.e(a, f) && k.push(a) : (d || e) && h.push(a)
            }, this, this.f);
            for (f = h.length - 1; 0 <= f; --f) g.remove(h[f]);
            g.af(k);
            if (0 < k.length || 0 < h.length) n = !0
        } else f.Ne(a.pixel, function(a, c) {
            if (this.e(a, c)) return k.push(a), !this.i
        }, this, this.f), 0 < k.length && 1 == g.Ib() && g.item(0) == k[0] || (n = !0, 0 !== g.Ib() && (h = Array.prototype.concat(g.a), g.clear()), g.af(k));
        n && this.dispatchEvent(new ry("select", k, h));
        return dk(a)
    }
    sy.prototype.setMap = function(a) {
        var c = this.l,
            d = this.a.b;
        null === c || d.forEach(c.Ih, c);
        sy.S.setMap.call(this, a);
        this.a.setMap(a);
        null === a || d.forEach(a.Eh, a)
    };

    function uy() {
        var a = Fl();
        db(a.Polygon, a.LineString);
        db(a.GeometryCollection, a.LineString);
        return function(c) {
            return a[c.Q().M()]
        }
    }
    sy.prototype.n = function(a) {
        a = a.element;
        var c = this.l;
        null === c || c.Eh(a)
    };
    sy.prototype.J = function(a) {
        a = a.element;
        var c = this.l;
        null === c || c.Ih(a)
    };

    function vy(a) {
        jk.call(this, {
            handleEvent: wy,
            handleDownEvent: Gg,
            handleUpEvent: xy
        });
        a = m(a) ? a : {};
        this.i = m(a.source) ? a.source : null;
        this.g = m(a.features) ? a.features : null;
        this.X = [];
        this.p = {};
        this.H = {};
        this.N = {};
        this.n = {};
        this.L = null;
        this.f = m(a.pixelTolerance) ? a.pixelTolerance : 10;
        this.ba = ra(yy, this);
        this.a = new lp;
        this.T = {
            Point: this.Il,
            LineString: this.Gg,
            LinearRing: this.Gg,
            Polygon: this.Jl,
            MultiPoint: this.Gl,
            MultiLineString: this.Fl,
            MultiPolygon: this.Hl,
            GeometryCollection: this.El
        }
    }
    w(vy, jk);
    l = vy.prototype;
    l.ed = function(a, c) {
        var d = m(c) ? c : !0,
            e = a.Q(),
            f = this.T[e.M()];
        if (m(f)) {
            var g = ma(a);
            this.N[g] = e.G(Kd());
            f.call(this, a, e);
            d && (this.H[g] = e.r("change", ra(this.Oj, this, a), this), this.p[g] = a.r(hd(a.a), this.Dl, this))
        }
    };
    l.Hi = function(a) {
        this.ed(a)
    };
    l.Ii = function(a) {
        this.fd(a)
    };
    l.Eg = function(a) {
        var c;
        a instanceof up ? c = a.feature : a instanceof nf && (c = a.element);
        this.ed(c)
    };
    l.Fg = function(a) {
        var c;
        a instanceof up ? c = a.feature : a instanceof nf && (c = a.element);
        this.fd(c)
    };
    l.Dl = function(a) {
        a = a.c;
        this.fd(a, !0);
        this.ed(a, !0)
    };
    l.Oj = function(a) {
        if (this.o) {
            var c = ma(a);
            c in this.n || (this.n[c] = a)
        } else this.Jh(a)
    };
    l.fd = function(a, c) {
        var d = m(c) ? c : !0,
            e = ma(a),
            f = this.N[e];
        if (f) {
            var g = this.a,
                h = [];
            pp(g, f, function(c) {
                a === c.feature && h.push(c)
            });
            for (f = h.length - 1; 0 <= f; --f) g.remove(h[f]);
            d && (Wc(this.H[e]), delete this.H[e], Wc(this.p[e]), delete this.p[e])
        }
    };
    l.setMap = function(a) {
        var c = this.l,
            d = this.X,
            e;
        null === this.g ? null === this.i || (e = this.i.Dc()) : e = this.g;
        c && (Sa(d, dd), d.length = 0, e.forEach(this.Ii, this));
        vy.S.setMap.call(this, a);
        a && (null !== this.g ? (d.push(this.g.r("add", this.Eg, this)), d.push(this.g.r("remove", this.Fg, this))) : null !== this.i && (d.push(this.i.r("addfeature", this.Eg, this)), d.push(this.i.r("removefeature", this.Fg, this))), e.forEach(this.Hi, this))
    };
    l.nc = Fg;
    l.Jh = function(a) {
        this.fd(a, !1);
        this.ed(a, !1)
    };
    l.El = function(a, c) {
        var d, e = c.d;
        for (d = 0; d < e.length; ++d) this.T[e[d].M()].call(this, a, e[d])
    };
    l.Gg = function(a, c) {
        var d = c.K(),
            e, f, g, h;
        e = 0;
        for (f = d.length - 1; e < f; ++e) g = d.slice(e, e + 2), h = {
            feature: a,
            aa: g
        }, this.a.ha(Jd(g), h)
    };
    l.Fl = function(a, c) {
        var d = c.K(),
            e, f, g, h, k, n, p;
        h = 0;
        for (k = d.length; h < k; ++h)
            for (e = d[h], f = 0, g = e.length - 1; f < g; ++f) n = e.slice(f, f + 2), p = {
                feature: a,
                aa: n
            }, this.a.ha(Jd(n), p)
    };
    l.Gl = function(a, c) {
        var d = c.K(),
            e, f, g;
        f = 0;
        for (g = d.length; f < g; ++f) e = d[f], e = {
            feature: a,
            aa: [e, e]
        }, this.a.ha(c.G(), e)
    };
    l.Hl = function(a, c) {
        var d = c.K(),
            e, f, g, h, k, n, p, q, r, t;
        n = 0;
        for (p = d.length; n < p; ++n)
            for (q = d[n], h = 0, k = q.length; h < k; ++h)
                for (e = q[h], f = 0, g = e.length - 1; f < g; ++f) r = e.slice(f, f + 2), t = {
                    feature: a,
                    aa: r
                }, this.a.ha(Jd(r), t)
    };
    l.Il = function(a, c) {
        var d = c.K(),
            d = {
                feature: a,
                aa: [d, d]
            };
        this.a.ha(c.G(), d)
    };
    l.Jl = function(a, c) {
        var d = c.K(),
            e, f, g, h, k, n, p;
        h = 0;
        for (k = d.length; h < k; ++h)
            for (e = d[h], f = 0, g = e.length - 1; f < g; ++f) n = e.slice(f, f + 2), p = {
                feature: a,
                aa: n
            }, this.a.ha(Jd(n), p)
    };

    function wy(a) {
        var c, d, e = a.pixel,
            f = a.coordinate;
        c = a.map;
        var g = c.ka([e[0] - this.f, e[1] + this.f]);
        d = c.ka([e[0] + this.f, e[1] - this.f]);
        var g = Jd([g, d]),
            h = np(this.a, g),
            k = !1,
            g = !1,
            n = null;
        d = null;
        0 < h.length && (this.L = f, h.sort(this.ba), h = h[0].aa, n = nd(f, h), d = c.ta(n), Math.sqrt(sd(e, d)) <= this.f && (g = !0, e = c.ta(h[0]), f = c.ta(h[1]), e = sd(d, e), f = sd(d, f), k = Math.sqrt(Math.min(e, f)) <= this.f)) && (n = e > f ? h[1] : h[0], d = c.ta(n), d = [Math.round(d[0]), Math.round(d[1])]);
        c = n;
        g && (a.coordinate = c.slice(0, 2), a.pixel = d);
        return kk.call(this, a)
    }

    function xy() {
        var a = sb(this.n);
        a.length && (Sa(a, this.Jh, this), this.n = {});
        return !1
    }

    function yy(a, c) {
        return td(this.L, a.aa) - td(this.L, c.aa)
    };

    function Z(a) {
        a = m(a) ? a : {};
        var c = Db(a);
        delete c.gradient;
        delete c.radius;
        delete c.blur;
        delete c.shadow;
        delete c.weight;
        M.call(this, c);
        this.d = null;
        this.L = m(a.shadow) ? a.shadow : 250;
        this.p = void 0;
        this.l = null;
        x(this, hd("gradient"), this.Pj, !1, this);
        this.yh(m(a.gradient) ? a.gradient : zy);
        this.th(m(a.blur) ? a.blur : 15);
        this.Ig(m(a.radius) ? a.radius : 8);
        x(this, [hd("blur"), hd("radius")], this.hg, !1, this);
        this.hg();
        var d = m(a.weight) ? a.weight : "weight",
            e;
        ia(d) ? e = function(a) {
            return a.get(d)
        } : e = d;
        this.e(ra(function(a) {
            a = e(a);
            a = m(a) ? Vb(a, 0, 1) : 1;
            var c = 255 * a | 0,
                d = this.l[c];
            m(d) || (d = [new Bl({
                image: new Fj({
                    opacity: a,
                    src: this.p
                })
            })], this.l[c] = d);
            return d
        }, this));
        this.set("renderOrder", null);
        x(this, "render", this.hk, !1, this)
    }
    w(Z, M);
    var zy = ["#00f", "#0ff", "#0f0", "#ff0", "#f00"];
    l = Z.prototype;
    l.Sf = function() {
        return this.get("blur")
    };
    l.Wf = function() {
        return this.get("gradient")
    };
    l.Hg = function() {
        return this.get("radius")
    };
    l.Pj = function() {
        for (var a = this.Wf(), c = ai(1, 256), d = c.createLinearGradient(0, 0, 1, 256), e = 1 / (a.length - 1), f = 0, g = a.length; f < g; ++f) d.addColorStop(f * e, a[f]);
        c.fillStyle = d;
        c.fillRect(0, 0, 1, 256);
        this.d = c.getImageData(0, 0, 1, 256).data
    };
    l.hg = function() {
        var a = this.Hg(),
            c = this.Sf(),
            d = a + c + 1,
            e = 2 * d,
            e = ai(e, e);
        e.shadowOffsetX = e.shadowOffsetY = this.L;
        e.shadowBlur = c;
        e.shadowColor = "#000";
        e.beginPath();
        c = d - this.L;
        e.arc(c, c, a, 0, 2 * Math.PI, !0);
        e.fill();
        this.p = e.canvas.toDataURL();
        this.l = Array(256);
        this.k()
    };
    l.hk = function(a) {
        a = a.context;
        var c = a.canvas,
            c = a.getImageData(0, 0, c.width, c.height),
            d = c.data,
            e, f, g;
        e = 0;
        for (f = d.length; e < f; e += 4)
            if (g = 4 * d[e + 3]) d[e] = this.d[g], d[e + 1] = this.d[g + 1], d[e + 2] = this.d[g + 2];
        a.putImageData(c, 0, 0)
    };
    l.th = function(a) {
        this.set("blur", a)
    };
    l.yh = function(a) {
        this.set("gradient", a)
    };
    l.Ig = function(a) {
        this.set("radius", a)
    };

    function Ay(a, c) {
        var d = c || {},
            e = d.document || document,
            f = Mf("SCRIPT"),
            g = {
                sh: f,
                oc: void 0
            },
            h = new ux(By, g),
            k = null,
            n = null != d.timeout ? d.timeout : 5E3;
        0 < n && (k = window.setTimeout(function() {
            Cy(f, !0);
            var c = new Dy(Ey, "Timeout reached for loading script " + a);
            wx(h);
            xx(h, !1, c)
        }, n), g.oc = k);
        f.onload = f.onreadystatechange = function() {
            f.readyState && "loaded" != f.readyState && "complete" != f.readyState || (Cy(f, d.Bi || !1, k), wx(h), xx(h, !0, null))
        };
        f.onerror = function() {
            Cy(f, !0, k);
            var c = new Dy(Fy, "Error while loading script " + a);
            wx(h);
            xx(h, !1, c)
        };
        Gf(f, {
            type: "text/javascript",
            charset: "UTF-8",
            src: a
        });
        Gy(e).appendChild(f);
        return h
    }

    function Gy(a) {
        var c = a.getElementsByTagName("HEAD");
        return c && 0 != c.length ? c[0] : a.documentElement
    }

    function By() {
        if (this && this.sh) {
            var a = this.sh;
            a && "SCRIPT" == a.tagName && Cy(a, !0, this.oc)
        }
    }

    function Cy(a, c, d) {
        null != d && ba.clearTimeout(d);
        a.onload = ca;
        a.onerror = ca;
        a.onreadystatechange = ca;
        c && window.setTimeout(function() {
            Qf(a)
        }, 0)
    }
    var Fy = 0,
        Ey = 1;

    function Dy(a, c) {
        var d = "Jsloader error (code #" + a + ")";
        c && (d += ": " + c);
        xa.call(this, d);
        this.code = a
    }
    w(Dy, xa);

    function Hy(a, c) {
        this.a = new at(a);
        this.b = c ? c : "callback";
        this.oc = 5E3
    }
    var Iy = 0;
    Hy.prototype.send = function(a, c, d, e) {
        a = a || null;
        e = e || "_" + (Iy++).toString(36) + ua().toString(36);
        ba._callbacks_ || (ba._callbacks_ = {});
        var f = this.a.clone();
        if (a)
            for (var g in a)
                if (!a.hasOwnProperty || a.hasOwnProperty(g)) {
                    var h = f,
                        k = g,
                        n = a[g];
                    ga(n) || (n = [String(n)]);
                    tt(h.b, k, n)
                }
        c && (ba._callbacks_[e] = Jy(e, c), c = this.b, g = "_callbacks_." + e, ga(g) || (g = [String(g)]), tt(f.b, c, g));
        c = Ay(f.toString(), {
            timeout: this.oc,
            Bi: !0
        });
        Ax(c, null, Ky(e, a, d), void 0);
        return {
            $: e,
            Of: c
        }
    };
    Hy.prototype.cancel = function(a) {
        a && (a.Of && a.Of.cancel(), a.$ && Ly(a.$, !1))
    };

    function Ky(a, c, d) {
        return function() {
            Ly(a, !1);
            d && d(c)
        }
    }

    function Jy(a, c) {
        return function(d) {
            Ly(a, !0);
            c.apply(void 0, arguments)
        }
    }

    function Ly(a, c) {
        ba._callbacks_[a] && (c ? delete ba._callbacks_[a] : ba._callbacks_[a] = ca)
    };

    function My(a) {
        var c = /\{z\}/g,
            d = /\{x\}/g,
            e = /\{y\}/g,
            f = /\{-y\}/g;
        return function(g) {
            return null === g ? void 0 : a.replace(c, g[0].toString()).replace(d, g[1].toString()).replace(e, g[2].toString()).replace(f, function() {
                return ((1 << g[0]) - g[2] - 1).toString()
            })
        }
    }

    function Ny(a) {
        return Oy(Ua(a, My))
    }

    function Oy(a) {
        return 1 === a.length ? a[0] : function(c, d, e) {
            return null === c ? void 0 : a[Wb((c[1] << c[0]) + c[2], a.length)](c, d, e)
        }
    }

    function Py() {}

    function Qy(a, c) {
        var d = [0, 0, 0];
        return function(e, f, g) {
            return null === e ? void 0 : c(a(e, g, d), f, g)
        }
    }

    function Ry(a) {
        var c = [],
            d = /\{(\d)-(\d)\}/.exec(a) || /\{([a-z])-([a-z])\}/.exec(a);
        if (d) {
            var e = d[2].charCodeAt(0),
                f;
            for (f = d[1].charCodeAt(0); f <= e; ++f) c.push(a.replace(d[0], String.fromCharCode(f)))
        } else c.push(a);
        return c
    };

    function Sy(a) {
        Zg.call(this, {
            attributions: a.attributions,
            extent: a.extent,
            logo: a.logo,
            opaque: a.opaque,
            projection: a.projection,
            state: m(a.state) ? a.state : void 0,
            tileGrid: a.tileGrid,
            tilePixelRatio: a.tilePixelRatio,
            wrapX: a.wrapX
        });
        this.tileUrlFunction = m(a.tileUrlFunction) ? a.tileUrlFunction : Py;
        this.crossOrigin = m(a.crossOrigin) ? a.crossOrigin : null;
        this.tileLoadFunction = m(a.tileLoadFunction) ? a.tileLoadFunction : Ty;
        this.tileClass = m(a.tileClass) ? a.tileClass : px
    }
    w(Sy, Zg);

    function Ty(a, c) {
        a.Ma().src = c
    }
    l = Sy.prototype;
    l.Vb = function(a, c, d, e, f) {
        var g = this.bb(a, c, d);
        if (wg(this.a, g)) return this.a.get(g);
        a = [a, c, d];
        c = m(f) ? f : this.f;
        d = ah(this, c);
        var h = this.H,
            k;
        if (k = m(h)) {
            k = a[0];
            var n = Wg(d, k);
            if (m(n)) {
                var p = Xg(c),
                    q = c.G();
                k = ld(d.na(k), d.a)[0] * n == p.na(k) * kf(Pg(p, q, k))
            } else k = c.e
        }
        k ? h ? (h = a[0], k = a[1], c = Ug(d, h, c), k < c.b || k > c.d ? (k = Wb(k, kf(c)), c = [h, k, a[2]]) : c = a) : (h = a[1], c = Ug(d, a[0], c), c = h < c.b || h > c.d ? null : a) : c = a;
        e = null === c ? void 0 : this.tileUrlFunction(c, e, f);
        e = new this.tileClass(a, m(e) ? 0 : 4, m(e) ? e : "", this.crossOrigin, this.tileLoadFunction);
        x(e, "change", this.nm, !1, this);
        this.a.set(g, e);
        return e
    };
    l.Ua = function() {
        return this.tileLoadFunction
    };
    l.Va = function() {
        return this.tileUrlFunction
    };
    l.nm = function(a) {
        a = a.target;
        switch (a.state) {
            case 1:
                this.dispatchEvent(new bh("tileloadstart", a));
                break;
            case 2:
                this.dispatchEvent(new bh("tileloadend", a));
                break;
            case 3:
                this.dispatchEvent(new bh("tileloaderror", a))
        }
    };
    l.$a = function(a) {
        this.a.clear();
        this.tileLoadFunction = a;
        this.k()
    };
    l.pa = function(a) {
        this.a.clear();
        this.tileUrlFunction = a;
        this.k()
    };
    l.yf = function(a, c, d) {
        a = this.bb(a, c, d);
        wg(this.a, a) && this.a.get(a)
    };

    function Uy(a) {
        var c = m(a.extent) ? a.extent : Xl,
            d;
        m(a.tileSize) && (d = ld(a.tileSize));
        d = Yg(c, a.maxZoom, d);
        Mg.call(this, {
            minZoom: a.minZoom,
            origin: de(c, "top-left"),
            resolutions: d,
            tileSize: a.tileSize
        })
    }
    w(Uy, Mg);
    Uy.prototype.yb = function(a) {
        a = m(a) ? a : {};
        var c = this.minZoom,
            d = this.maxZoom,
            e = null;
        if (m(a.extent)) {
            var e = Array(d + 1),
                f;
            for (f = 0; f <= d; ++f) e[f] = f < c ? null : Pg(this, a.extent, f)
        }
        return function(a, f, k) {
            f = a[0];
            if (f < c || d < f) return null;
            var n = a[1];
            a = a[2];
            return a < -Math.pow(2, f) || -1 < a || null !== e && !hf(e[f], n, a) ? null : bf(f, n, -a - 1, k)
        }
    };
    Uy.prototype.Ld = function(a, c) {
        if (a[0] < this.maxZoom) {
            var d = 2 * a[1],
                e = 2 * a[2];
            return gf(d, d + 1, e, e + 1, c)
        }
        return null
    };
    Uy.prototype.Ad = function(a, c, d, e) {
        e = gf(0, a[1], 0, a[2], e);
        for (a = a[0] - 1; a >= this.minZoom; --a)
            if (e.b = e.d >>= 1, e.c = e.a >>= 1, c.call(d, a, e)) return !0;
        return !1
    };

    function Vy(a) {
        Sy.call(this, {
            crossOrigin: "anonymous",
            opaque: !0,
            projection: re("EPSG:3857"),
            state: "loading",
            tileLoadFunction: a.tileLoadFunction,
            wrapX: m(a.wrapX) ? a.wrapX : !0
        });
        this.g = m(a.culture) ? a.culture : "en-us";
        this.e = m(a.maxZoom) ? a.maxZoom : -1;
        var c = new at("https://dev.virtualearth.net/REST/v1/Imagery/Metadata/" + a.imagerySet);
        (new Hy(c, "jsonp")).send({
            include: "ImageryProviders",
            uriScheme: "https",
            key: a.key
        }, ra(this.i, this))
    }
    w(Vy, Sy);
    var Wy = new mf({
        html: '<a class="ol-attribution-bing-tos" href="http://www.microsoft.com/maps/product/terms.html">Terms of Use</a>'
    });
    Vy.prototype.i = function(a) {
        if (200 != a.statusCode || "OK" != a.statusDescription || "ValidCredentials" != a.authenticationResultCode || 1 != a.resourceSets.length || 1 != a.resourceSets[0].resources.length) Dg(this, "error");
        else {
            var c = a.brandLogoUri; - 1 == c.indexOf("https") && (c = c.replace("http", "https"));
            var d = a.resourceSets[0].resources[0],
                e = -1 == this.e ? d.zoomMax : this.e,
                f = new Uy({
                    extent: Vg(this.f),
                    minZoom: d.zoomMin,
                    maxZoom: e,
                    tileSize: d.imageWidth == d.imageHeight ? d.imageWidth : [d.imageWidth, d.imageHeight]
                });
            this.tileGrid = f;
            var g = this.g;
            this.tileUrlFunction = Qy(f.yb(), Oy(Ua(d.imageUrlSubdomains, function(a) {
                var c = d.imageUrl.replace("{subdomain}", a).replace("{culture}", g);
                return function(a) {
                    return null === a ? void 0 : c.replace("{quadkey}", df(a))
                }
            })));
            if (d.imageryProviders) {
                var h = ve(re("EPSG:4326"), this.f);
                a = Ua(d.imageryProviders, function(a) {
                    var c = a.attribution,
                        d = {};
                    Sa(a.coverageAreas, function(a) {
                        var c = a.zoomMin,
                            g = Math.min(a.zoomMax, e);
                        a = a.bbox;
                        a = le([a[1], a[0], a[3], a[2]], h);
                        var k, n;
                        for (k = c; k <= g; ++k) n = k.toString(), c = Pg(f, a, k), n in d ? d[n].push(c) : d[n] = [c]
                    });
                    return new mf({
                        html: c,
                        tileRanges: d
                    })
                });
                a.push(Wy);
                this.d = a
            }
            this.L = c;
            Dg(this, "ready")
        }
    };

    function Xy(a) {
        qp.call(this, {
            attributions: a.attributions,
            extent: a.extent,
            logo: a.logo,
            projection: a.projection
        });
        this.p = void 0;
        this.T = m(a.distance) ? a.distance : 20;
        this.n = [];
        this.l = a.source;
        this.l.r("change", Xy.prototype.ba, this)
    }
    w(Xy, qp);
    Xy.prototype.X = function() {
        return this.l
    };
    Xy.prototype.ac = function(a, c, d) {
        c !== this.p && (this.clear(), this.p = c, this.l.ac(a, c, d), Yy(this), this.Oc(this.n))
    };
    Xy.prototype.ba = function() {
        this.clear();
        Yy(this);
        this.Oc(this.n);
        this.k()
    };

    function Yy(a) {
        if (m(a.p)) {
            a.n.length = 0;
            for (var c = Kd(), d = a.T * a.p, e = a.l.Dc(), f = {}, g = 0, h = e.length; g < h; g++) {
                var k = e[g];
                ub(f, ma(k).toString()) || (k = k.Q().K(), Ud(k, c), Od(c, d, c), k = a.l.Se(c), k = Ta(k, function(a) {
                    a = ma(a).toString();
                    return a in f ? !1 : f[a] = !0
                }), a.n.push(Zy(k)))
            }
        }
    }

    function Zy(a) {
        for (var c = a.length, d = [0, 0], e = 0; e < c; e++) {
            var f = a[e].Q().K();
            md(d, f)
        }
        c = 1 / c;
        d[0] *= c;
        d[1] *= c;
        d = new X(new E(d));
        d.set("features", a);
        return d
    };

    function $y(a) {
        jn.call(this, {
            projection: a.projection,
            resolutions: a.resolutions
        });
        this.T = m(a.crossOrigin) ? a.crossOrigin : null;
        this.g = m(a.displayDpi) ? a.displayDpi : 96;
        this.e = m(a.params) ? a.params : {};
        var c;
        m(a.url) ? c = rx(a.url, this.e, ra(this.Ul, this)) : c = sx;
        this.J = c;
        this.a = m(a.imageLoadFunction) ? a.imageLoadFunction : pn;
        this.X = m(a.hidpi) ? a.hidpi : !0;
        this.N = m(a.metersPerUnit) ? a.metersPerUnit : 1;
        this.n = m(a.ratio) ? a.ratio : 1;
        this.ba = m(a.useOverlay) ? a.useOverlay : !1;
        this.c = null;
        this.p = 0
    }
    w($y, jn);
    l = $y.prototype;
    l.Tl = function() {
        return this.e
    };
    l.Cc = function(a, c, d, e) {
        c = kn(this, c);
        d = this.X ? d : 1;
        var f = this.c;
        if (null !== f && this.p == this.b && f.resolution == c && f.e == d && Rd(f.G(), a)) return f;
        1 != this.n && (a = a.slice(), ke(a, this.n));
        e = this.J(a, [ie(a) / c * d, fe(a) / c * d], e);
        m(e) ? (f = new ox(a, c, d, this.d, e, this.T, this.a), x(f, "change", this.i, !1, this)) : f = null;
        this.c = f;
        this.p = this.b;
        return f
    };
    l.Sl = function() {
        return this.a
    };
    l.Wl = function(a) {
        Fb(this.e, a);
        this.k()
    };
    l.Ul = function(a, c, d, e) {
        var f;
        f = this.N;
        var g = ie(d),
            h = fe(d),
            k = e[0],
            n = e[1],
            p = .0254 / this.g;
        f = n * g > k * h ? g * f / (k * p) : h * f / (n * p);
        d = ce(d);
        e = {
            OPERATION: this.ba ? "GETDYNAMICMAPOVERLAYIMAGE" : "GETMAPIMAGE",
            VERSION: "2.0.0",
            LOCALE: "en",
            CLIENTAGENT: "ol.source.ImageMapGuide source",
            CLIP: "1",
            SETDISPLAYDPI: this.g,
            SETDISPLAYWIDTH: Math.round(e[0]),
            SETDISPLAYHEIGHT: Math.round(e[1]),
            SETVIEWSCALE: f,
            SETVIEWCENTERX: d[0],
            SETVIEWCENTERY: d[1]
        };
        Fb(e, c);
        return ao(co([a], e))
    };
    l.Vl = function(a) {
        this.c = null;
        this.a = a;
        this.k()
    };

    function az(a) {
        var c = m(a.attributions) ? a.attributions : null,
            d = a.imageExtent,
            e, f;
        m(a.imageSize) && (e = fe(d) / a.imageSize[1], f = [e]);
        var g = m(a.crossOrigin) ? a.crossOrigin : null,
            h = m(a.imageLoadFunction) ? a.imageLoadFunction : pn;
        jn.call(this, {
            attributions: c,
            logo: a.logo,
            projection: re(a.projection),
            resolutions: f
        });
        this.a = new ox(d, e, 1, c, a.url, g, h);
        x(this.a, "change", this.i, !1, this)
    }
    w(az, jn);
    az.prototype.Cc = function(a) {
        return he(a, this.a.G()) ? this.a : null
    };

    function bz(a) {
        a = m(a) ? a : {};
        jn.call(this, {
            attributions: a.attributions,
            logo: a.logo,
            projection: a.projection,
            resolutions: a.resolutions
        });
        this.X = m(a.crossOrigin) ? a.crossOrigin : null;
        this.e = a.url;
        this.n = m(a.imageLoadFunction) ? a.imageLoadFunction : pn;
        this.c = a.params;
        this.g = !0;
        cz(this);
        this.T = a.serverType;
        this.ba = m(a.hidpi) ? a.hidpi : !0;
        this.a = null;
        this.p = [0, 0];
        this.N = 0;
        this.J = m(a.ratio) ? a.ratio : 1.5
    }
    w(bz, jn);
    var dz = [101, 101];
    l = bz.prototype;
    l.bm = function(a, c, d, e) {
        if (m(this.e)) {
            var f = ee(a, c, 0, dz),
                g = {
                    SERVICE: "WMS",
                    VERSION: "1.3.0",
                    REQUEST: "GetFeatureInfo",
                    FORMAT: "image/png",
                    TRANSPARENT: !0,
                    QUERY_LAYERS: this.c.LAYERS
                };
            Fb(g, this.c, e);
            e = Math.floor((f[3] - a[1]) / c);
            g[this.g ? "I" : "X"] = Math.floor((a[0] - f[0]) / c);
            g[this.g ? "J" : "Y"] = e;
            return ez(this, f, dz, 1, re(d), g)
        }
    };
    l.dm = function() {
        return this.c
    };
    l.Cc = function(a, c, d, e) {
        if (!m(this.e)) return null;
        c = kn(this, c);
        1 == d || this.ba && m(this.T) || (d = 1);
        var f = this.a;
        if (null !== f && this.N == this.b && f.resolution == c && f.e == d && Rd(f.G(), a)) return f;
        f = {
            SERVICE: "WMS",
            VERSION: "1.3.0",
            REQUEST: "GetMap",
            FORMAT: "image/png",
            TRANSPARENT: !0
        };
        Fb(f, this.c);
        a = a.slice();
        var g = (a[0] + a[2]) / 2,
            h = (a[1] + a[3]) / 2;
        if (1 != this.J) {
            var k = this.J * ie(a) / 2,
                n = this.J * fe(a) / 2;
            a[0] = g - k;
            a[1] = h - n;
            a[2] = g + k;
            a[3] = h + n
        }
        var k = c / d,
            n = Math.ceil(ie(a) / k),
            p = Math.ceil(fe(a) / k);
        a[0] = g - k * n / 2;
        a[2] = g + k * n / 2;
        a[1] = h - k * p / 2;
        a[3] = h + k * p / 2;
        this.p[0] = n;
        this.p[1] = p;
        e = ez(this, a, this.p, d, e, f);
        this.a = new ox(a, c, d, this.d, e, this.X, this.n);
        this.N = this.b;
        x(this.a, "change", this.i, !1, this);
        return this.a
    };
    l.cm = function() {
        return this.n
    };

    function ez(a, c, d, e, f, g) {
        g[a.g ? "CRS" : "SRS"] = f.b;
        "STYLES" in a.c || (g.STYLES = new String(""));
        if (1 != e) switch (a.T) {
            case "geoserver":
                e = 90 * e + .5 | 0;
                g.FORMAT_OPTIONS = m(g.FORMAT_OPTIONS) ? g.FORMAT_OPTIONS + (";dpi:" + e) : "dpi:" + e;
                break;
            case "mapserver":
                g.MAP_RESOLUTION = 90 * e;
                break;
            case "carmentaserver":
            case "qgis":
                g.DPI = 90 * e
        }
        g.WIDTH = d[0];
        g.HEIGHT = d[1];
        d = f.d;
        var h;
        a.g && "ne" == d.substr(0, 2) ? h = [c[1], c[0], c[3], c[2]] : h = c;
        g.BBOX = h.join(",");
        return ao(co([a.e], g))
    }
    l.em = function() {
        return this.e
    };
    l.fm = function(a) {
        this.a = null;
        this.n = a;
        this.k()
    };
    l.gm = function(a) {
        a != this.e && (this.e = a, this.a = null, this.k())
    };
    l.hm = function(a) {
        Fb(this.c, a);
        cz(this);
        this.a = null;
        this.k()
    };

    function cz(a) {
        a.g = 0 <= Na(Ab(a.c, "VERSION", "1.3.0"), "1.3")
    };

    function fz(a) {
        var c = m(a.projection) ? a.projection : "EPSG:3857",
            d = new Uy({
                extent: Vg(c),
                maxZoom: a.maxZoom,
                tileSize: a.tileSize
            });
        Sy.call(this, {
            attributions: a.attributions,
            crossOrigin: a.crossOrigin,
            logo: a.logo,
            projection: c,
            tileGrid: d,
            tileLoadFunction: a.tileLoadFunction,
            tilePixelRatio: a.tilePixelRatio,
            tileUrlFunction: Py,
            wrapX: m(a.wrapX) ? a.wrapX : !0
        });
        this.l = d.yb();
        m(a.tileUrlFunction) ? this.pa(a.tileUrlFunction) : m(a.urls) ? this.pa(Ny(a.urls)) : m(a.url) && this.e(a.url)
    }
    w(fz, Sy);
    fz.prototype.pa = function(a) {
        fz.S.pa.call(this, Qy(this.l, a))
    };
    fz.prototype.e = function(a) {
        this.pa(Ny(Ry(a)))
    };

    function gz(a) {
        a = m(a) ? a : {};
        var c;
        m(a.attributions) ? c = a.attributions : c = [hz];
        fz.call(this, {
            attributions: c,
            crossOrigin: m(a.crossOrigin) ? a.crossOrigin : "anonymous",
            opaque: !0,
            maxZoom: m(a.maxZoom) ? a.maxZoom : 19,
            tileLoadFunction: a.tileLoadFunction,
            url: m(a.url) ? a.url : "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            wrapX: a.wrapX
        })
    }
    w(gz, fz);
    var hz = new mf({
        html: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors.'
    });

    function iz(a) {
        a = m(a) ? a : {};
        var c = jz[a.layer];
        this.g = a.layer;
        fz.call(this, {
            attributions: c.attributions,
            crossOrigin: "anonymous",
            logo: "https://developer.mapquest.com/content/osm/mq_logo.png",
            maxZoom: c.maxZoom,
            opaque: !0,
            tileLoadFunction: a.tileLoadFunction,
            url: m(a.url) ? a.url : "https://otile{1-4}-s.mqcdn.com/tiles/1.0.0/" + this.g + "/{z}/{x}/{y}.jpg"
        })
    }
    w(iz, fz);
    var kz = new mf({
            html: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a>'
        }),
        jz = {
            osm: {
                maxZoom: 19,
                attributions: [kz, hz]
            },
            sat: {
                maxZoom: 18,
                attributions: [kz, new mf({
                    html: "Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency"
                })]
            },
            hyb: {
                maxZoom: 18,
                attributions: [kz, hz]
            }
        };
    iz.prototype.i = function() {
        return this.g
    };
    var lz = {
            terrain: {
                Ta: "jpg",
                opaque: !0
            },
            "terrain-background": {
                Ta: "jpg",
                opaque: !0
            },
            "terrain-labels": {
                Ta: "png",
                opaque: !1
            },
            "terrain-lines": {
                Ta: "png",
                opaque: !1
            },
            "toner-background": {
                Ta: "png",
                opaque: !0
            },
            toner: {
                Ta: "png",
                opaque: !0
            },
            "toner-hybrid": {
                Ta: "png",
                opaque: !1
            },
            "toner-labels": {
                Ta: "png",
                opaque: !1
            },
            "toner-lines": {
                Ta: "png",
                opaque: !1
            },
            "toner-lite": {
                Ta: "png",
                opaque: !0
            },
            watercolor: {
                Ta: "jpg",
                opaque: !0
            }
        },
        mz = {
            terrain: {
                minZoom: 4,
                maxZoom: 18
            },
            toner: {
                minZoom: 0,
                maxZoom: 20
            },
            watercolor: {
                minZoom: 3,
                maxZoom: 16
            }
        };

    function nz(a) {
        var c = a.layer.indexOf("-"),
            d = lz[a.layer];
        fz.call(this, {
            attributions: oz,
            crossOrigin: "anonymous",
            maxZoom: mz[-1 == c ? a.layer : a.layer.slice(0, c)].maxZoom,
            opaque: d.opaque,
            tileLoadFunction: a.tileLoadFunction,
            url: m(a.url) ? a.url : "https://stamen-tiles-{a-d}.a.ssl.fastly.net/" + a.layer + "/{z}/{x}/{y}." + d.Ta
        })
    }
    w(nz, fz);
    var oz = [new mf({
        html: 'Map tiles by <a href="http://stamen.com/">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>.'
    }), hz];

    function pz(a) {
        a = m(a) ? a : {};
        var c = m(a.params) ? a.params : {};
        Sy.call(this, {
            attributions: a.attributions,
            logo: a.logo,
            projection: a.projection,
            tileGrid: a.tileGrid,
            tileLoadFunction: a.tileLoadFunction,
            tileUrlFunction: ra(this.lm, this),
            wrapX: m(a.wrapX) ? a.wrapX : !0
        });
        var d = a.urls;
        !m(d) && m(a.url) && (d = Ry(a.url));
        this.g = null != d ? d : [];
        this.e = c;
        this.i = Kd()
    }
    w(pz, Sy);
    l = pz.prototype;
    l.im = function() {
        return this.e
    };
    l.Xb = function(a, c, d) {
        a = pz.S.Xb.call(this, a, c, d);
        return 1 == c ? a : kd(a, c, this.c)
    };
    l.jm = function() {
        return this.g
    };
    l.km = function(a) {
        a = m(a) ? Ry(a) : null;
        this.Ng(a)
    };
    l.Ng = function(a) {
        this.g = null != a ? a : [];
        this.k()
    };
    l.lm = function(a, c, d) {
        var e = this.tileGrid;
        null === e && (e = ah(this, d));
        if (!(e.b.length <= a[0])) {
            var f = Og(e, a, this.i),
                g = ld(e.na(a[0]), this.c);
            1 != c && (g = kd(g, c, this.c));
            e = {
                F: "image",
                FORMAT: "PNG32",
                TRANSPARENT: !0
            };
            Fb(e, this.e);
            var h = this.g;
            0 == h.length ? a = void 0 : (d = d.b.split(":").pop(), e.SIZE = g[0] + "," + g[1], e.BBOX = f.join(","), e.BBOXSR = d, e.IMAGESR = d, e.DPI = 90 * c, a = 1 == h.length ? h[0] : h[Wb((a[1] << a[0]) + a[2], h.length)], Aa(a, "/") || (a += "/"), Aa(a, "MapServer/") ? a += "export" : Aa(a, "ImageServer/") && (a += "exportImage"), a = ao(co([a], e)));
            return a
        }
    };
    l.mm = function(a) {
        Fb(this.e, a);
        this.k()
    };

    function qz(a, c) {
        zg.call(this, a, 2);
        this.c = ld(c.na(a[0]));
        this.a = {}
    }
    w(qz, zg);
    qz.prototype.Ma = function(a) {
        a = m(a) ? ma(a) : -1;
        if (a in this.a) return this.a[a];
        var c = this.c,
            d = ai(c[0], c[1]);
        d.strokeStyle = "black";
        d.strokeRect(.5, .5, c[0] + .5, c[1] + .5);
        d.fillStyle = "black";
        d.textAlign = "center";
        d.textBaseline = "middle";
        d.font = "24px sans-serif";
        d.fillText(ef(this.b), c[0] / 2, c[1] / 2);
        return this.a[a] = d.canvas
    };

    function rz(a) {
        Zg.call(this, {
            opaque: !1,
            projection: a.projection,
            tileGrid: a.tileGrid
        })
    }
    w(rz, Zg);
    rz.prototype.Vb = function(a, c, d) {
        var e = this.bb(a, c, d);
        if (wg(this.a, e)) return this.a.get(e);
        a = new qz([a, c, d], this.tileGrid);
        this.a.set(e, a);
        return a
    };

    function sz(a) {
        Sy.call(this, {
            attributions: a.attributions,
            crossOrigin: a.crossOrigin,
            projection: re("EPSG:3857"),
            state: "loading",
            tileLoadFunction: a.tileLoadFunction,
            wrapX: m(a.wrapX) ? a.wrapX : !0
        });
        (new Hy(a.url)).send(void 0, ra(this.e, this))
    }
    w(sz, Sy);
    sz.prototype.e = function(a) {
        var c = re("EPSG:4326"),
            d = this.f,
            e;
        m(a.bounds) && (e = le(a.bounds, ve(c, d)));
        var f = a.minzoom || 0,
            g = a.maxzoom || 22;
        this.tileGrid = d = new Uy({
            extent: Vg(d),
            maxZoom: g,
            minZoom: f
        });
        this.tileUrlFunction = Qy(d.yb({
            extent: e
        }), Ny(a.tiles));
        if (m(a.attribution) && null === this.d) {
            c = m(e) ? e : c.G();
            e = {};
            for (var h; f <= g; ++f) h = f.toString(), e[h] = [Pg(d, c, f)];
            this.d = [new mf({
                html: a.attribution,
                tileRanges: e
            })]
        }
        Dg(this, "ready")
    };

    function tz(a) {
        Zg.call(this, {
            projection: re("EPSG:3857"),
            state: "loading"
        });
        this.i = m(a.preemptive) ? a.preemptive : !0;
        this.e = Py;
        this.g = void 0;
        (new Hy(a.url)).send(void 0, ra(this.om, this))
    }
    w(tz, Zg);
    l = tz.prototype;
    l.wj = function() {
        return this.g
    };
    l.Gi = function(a, c, d, e, f) {
        null === this.tileGrid ? !0 === f ? wh(function() {
            d.call(e, null)
        }) : d.call(e, null) : (c = this.tileGrid.Wb(a, c), uz(this.Vb(c[0], c[1], c[2], 1, this.f), a, d, e, f))
    };
    l.om = function(a) {
        var c = re("EPSG:4326"),
            d = this.f,
            e;
        m(a.bounds) && (e = le(a.bounds, ve(c, d)));
        var f = a.minzoom || 0,
            g = a.maxzoom || 22;
        this.tileGrid = d = new Uy({
            extent: Vg(d),
            maxZoom: g,
            minZoom: f
        });
        this.g = a.template;
        var h = a.grids;
        if (null != h) {
            this.e = Qy(d.yb({
                extent: e
            }), Ny(h));
            if (m(a.attribution)) {
                c = m(e) ? e : c.G();
                for (e = {}; f <= g; ++f) h = f.toString(), e[h] = [Pg(d, c, f)];
                this.d = [new mf({
                    html: a.attribution,
                    tileRanges: e
                })]
            }
            Dg(this, "ready")
        } else Dg(this, "error")
    };
    l.Vb = function(a, c, d, e, f) {
        var g = this.bb(a, c, d);
        if (wg(this.a, g)) return this.a.get(g);
        a = [a, c, d];
        e = this.e(a, e, f);
        e = new vz(a, m(e) ? 0 : 4, m(e) ? e : "", Og(this.tileGrid, a), this.i);
        this.a.set(g, e);
        return e
    };
    l.yf = function(a, c, d) {
        a = this.bb(a, c, d);
        wg(this.a, a) && this.a.get(a)
    };

    function vz(a, c, d, e, f) {
        zg.call(this, a, c);
        this.g = d;
        this.a = e;
        this.i = f;
        this.d = this.e = this.c = null
    }
    w(vz, zg);
    l = vz.prototype;
    l.Ma = function() {
        return null
    };

    function wz(a, c) {
        if (null === a.c || null === a.e || null == a.d) return null;
        var d = a.c[Math.floor((1 - (c[1] - a.a[1]) / (a.a[3] - a.a[1])) * a.c.length)];
        if (!ia(d)) return null;
        d = d.charCodeAt(Math.floor((c[0] - a.a[0]) / (a.a[2] - a.a[0]) * d.length));
        93 <= d && d--;
        35 <= d && d--;
        d = a.e[d - 32];
        return null != d ? a.d[d] : null
    }

    function uz(a, c, d, e, f) {
        0 == a.state && !0 === f ? (Uc(a, "change", function() {
            d.call(e, wz(this, c))
        }, !1, a), xz(a)) : !0 === f ? wh(function() {
            d.call(e, wz(this, c))
        }, a) : d.call(e, wz(a, c))
    }
    l.gb = function() {
        return this.g
    };
    l.Lj = function() {
        this.state = 3;
        Ag(this)
    };
    l.Xj = function(a) {
        this.c = a.grid;
        this.e = a.keys;
        this.d = a.data;
        this.state = 4;
        Ag(this)
    };

    function xz(a) {
        0 == a.state && (a.state = 1, (new Hy(a.g)).send(void 0, ra(a.Xj, a), ra(a.Lj, a)))
    }
    l.load = function() {
        this.i && xz(this)
    };

    function yz(a) {
        qp.call(this, {
            attributions: a.attributions,
            logo: a.logo,
            projection: void 0,
            state: "ready"
        });
        this.T = a.format;
        this.n = a.tileGrid;
        this.p = Py;
        this.X = this.n.yb();
        this.l = {};
        m(a.tileUrlFunction) ? (this.p = a.tileUrlFunction, this.k()) : m(a.urls) ? (this.p = Ny(a.urls), this.k()) : m(a.url) && (this.p = Ny(Ry(a.url)), this.k())
    }
    w(yz, qp);
    l = yz.prototype;
    l.clear = function() {
        yb(this.l)
    };

    function zz(a, c, d, e) {
        var f = a.l;
        a = a.n.Wb(c, d);
        f = f[a[0] + "/" + a[1] + "/" + a[2]];
        if (m(f))
            for (a = 0, d = f.length; a < d; ++a) {
                var g = f[a];
                if (g.Q().Jb(c[0], c[1]) && e.call(void 0, g)) break
            }
    }
    l.Ab = function(a, c, d, e) {
        var f = this.n,
            g = this.l;
        c = Tg(f, c);
        a = Pg(f, a, c);
        for (var h, f = a.b; f <= a.d; ++f)
            for (h = a.c; h <= a.a; ++h) {
                var k = g[c + "/" + f + "/" + h];
                if (m(k)) {
                    var n, p;
                    n = 0;
                    for (p = k.length; n < p; ++n) {
                        var q = d.call(e, k[n]);
                        if (q) return q
                    }
                }
            }
    };
    l.Dc = function() {
        var a = this.l,
            c = [],
            d;
        for (d in a) db(c, a[d]);
        return c
    };
    l.Vi = function(a, c) {
        var d = [];
        zz(this, a, c, function(a) {
            d.push(a)
        });
        return d
    };
    l.ac = function(a, c, d) {
        function e(a, c) {
            k[a] = c;
            this.k()
        }
        var f = this.X,
            g = this.n,
            h = this.p,
            k = this.l,
            n = Tg(g, c),
            g = Pg(g, a, n),
            p = [n, 0, 0],
            q, r;
        for (q = g.b; q <= g.d; ++q)
            for (r = g.c; r <= g.a; ++r) {
                var t = n + "/" + q + "/" + r;
                if (!(t in k)) {
                    p[0] = n;
                    p[1] = q;
                    p[2] = r;
                    f(p, d, p);
                    var u = h(p, 1, d);
                    m(u) && (k[t] = [], hp(u, this.T, ta(e, t)).call(this, a, c, d))
                }
            }
    };

    function Az(a) {
        a = m(a) ? a : {};
        var c = m(a.params) ? a.params : {};
        Sy.call(this, {
            attributions: a.attributions,
            crossOrigin: a.crossOrigin,
            logo: a.logo,
            opaque: !Ab(c, "TRANSPARENT", !0),
            projection: a.projection,
            tileGrid: a.tileGrid,
            tileLoadFunction: a.tileLoadFunction,
            tileUrlFunction: ra(this.tm, this),
            wrapX: a.wrapX
        });
        var d = a.urls;
        !m(d) && m(a.url) && (d = Ry(a.url));
        this.g = null != d ? d : [];
        this.l = m(a.gutter) ? a.gutter : 0;
        this.e = c;
        this.i = !0;
        this.n = a.serverType;
        this.J = m(a.hidpi) ? a.hidpi : !0;
        this.p = "";
        Bz(this);
        this.N = Kd();
        Cz(this)
    }
    w(Az, Sy);
    l = Az.prototype;
    l.pm = function(a, c, d, e) {
        d = re(d);
        var f = this.tileGrid;
        null === f && (f = ah(this, d));
        c = f.Wb(a, c);
        if (!(f.b.length <= c[0])) {
            var g = f.ma(c[0]),
                h = Og(f, c, this.N),
                f = ld(f.na(c[0]), this.c),
                k = this.l;
            0 !== k && (f = jd(f, k, this.c), h = Od(h, g * k, h));
            k = {
                SERVICE: "WMS",
                VERSION: "1.3.0",
                REQUEST: "GetFeatureInfo",
                FORMAT: "image/png",
                TRANSPARENT: !0,
                QUERY_LAYERS: this.e.LAYERS
            };
            Fb(k, this.e, e);
            e = Math.floor((h[3] - a[1]) / g);
            k[this.i ? "I" : "X"] = Math.floor((a[0] - h[0]) / g);
            k[this.i ? "J" : "Y"] = e;
            return Dz(this, c, f, h, 1, d, k)
        }
    };
    l.Cd = function() {
        return this.l
    };
    l.bb = function(a, c, d) {
        return this.p + Az.S.bb.call(this, a, c, d)
    };
    l.qm = function() {
        return this.e
    };

    function Dz(a, c, d, e, f, g, h) {
        var k = a.g;
        if (0 != k.length) {
            h.WIDTH = d[0];
            h.HEIGHT = d[1];
            h[a.i ? "CRS" : "SRS"] = g.b;
            "STYLES" in a.e || (h.STYLES = new String(""));
            if (1 != f) switch (a.n) {
                case "geoserver":
                    d = 90 * f + .5 | 0;
                    h.FORMAT_OPTIONS = m(h.FORMAT_OPTIONS) ? h.FORMAT_OPTIONS + (";dpi:" + d) : "dpi:" + d;
                    break;
                case "mapserver":
                    h.MAP_RESOLUTION = 90 * f;
                    break;
                case "carmentaserver":
                case "qgis":
                    h.DPI = 90 * f
            }
            g = g.d;
            a.i && "ne" == g.substr(0, 2) && (a = e[0], e[0] = e[1], e[1] = a, a = e[2], e[2] = e[3], e[3] = a);
            h.BBOX = e.join(",");
            return ao(co([1 == k.length ? k[0] : k[Wb((c[1] << c[0]) + c[2], k.length)]], h))
        }
    }
    l.Xb = function(a, c, d) {
        a = Az.S.Xb.call(this, a, c, d);
        return 1 != c && this.J && m(this.n) ? kd(a, c, this.c) : a
    };
    l.rm = function() {
        return this.g
    };

    function Bz(a) {
        var c = 0,
            d = [],
            e, f;
        e = 0;
        for (f = a.g.length; e < f; ++e) d[c++] = a.g[e];
        for (var g in a.e) d[c++] = g + "-" + a.e[g];
        a.p = d.join("#")
    }
    l.sm = function(a) {
        a = m(a) ? Ry(a) : null;
        this.Og(a)
    };
    l.Og = function(a) {
        this.g = null != a ? a : [];
        Bz(this);
        this.k()
    };
    l.tm = function(a, c, d) {
        var e = this.tileGrid;
        null === e && (e = ah(this, d));
        if (!(e.b.length <= a[0])) {
            1 == c || this.J && m(this.n) || (c = 1);
            var f = e.ma(a[0]),
                g = Og(e, a, this.N),
                e = ld(e.na(a[0]), this.c),
                h = this.l;
            0 !== h && (e = jd(e, h, this.c), g = Od(g, f * h, g));
            1 != c && (e = kd(e, c, this.c));
            f = {
                SERVICE: "WMS",
                VERSION: "1.3.0",
                REQUEST: "GetMap",
                FORMAT: "image/png",
                TRANSPARENT: !0
            };
            Fb(f, this.e);
            return Dz(this, a, e, g, c, d, f)
        }
    };
    l.um = function(a) {
        Fb(this.e, a);
        Bz(this);
        Cz(this);
        this.k()
    };

    function Cz(a) {
        a.i = 0 <= Na(Ab(a.e, "VERSION", "1.3.0"), "1.3")
    };

    function Ez(a) {
        this.e = a.matrixIds;
        Mg.call(this, {
            origin: a.origin,
            origins: a.origins,
            resolutions: a.resolutions,
            tileSize: a.tileSize,
            tileSizes: a.tileSizes,
            widths: a.widths
        })
    }
    w(Ez, Mg);
    Ez.prototype.q = function() {
        return this.e
    };

    function Fz(a) {
        var c = [],
            d = [],
            e = [],
            f = [],
            g = [],
            h;
        h = re(a.SupportedCRS.replace(/urn:ogc:def:crs:(\w+):(.*:)?(\w+)$/, "$1:$3"));
        var k = h.Gd(),
            n = "ne" == h.d.substr(0, 2);
        gb(a.TileMatrix, function(a, c) {
            return c.ScaleDenominator - a.ScaleDenominator
        });
        Sa(a.TileMatrix, function(a) {
            d.push(a.Identifier);
            n ? e.push([a.TopLeftCorner[1], a.TopLeftCorner[0]]) : e.push(a.TopLeftCorner);
            c.push(2.8E-4 * a.ScaleDenominator / k);
            var h = a.TileWidth,
                r = a.TileHeight;
            f.push(h == r ? h : [h, r]);
            g.push(a.MatrixWidth)
        });
        return new Ez({
            origins: e,
            resolutions: c,
            matrixIds: d,
            tileSizes: f,
            widths: g
        })
    };

    function Gz(a) {
        function c(a) {
            a = "KVP" == e ? ao(co([a], g)) : a.replace(/\{(\w+?)\}/g, function(a, c) {
                return c.toLowerCase() in g ? g[c.toLowerCase()] : a
            });
            return function(c) {
                if (null !== c) {
                    var d = {
                        TileMatrix: f.e[c[0]],
                        TileCol: c[1],
                        TileRow: c[2]
                    };
                    Fb(d, h);
                    c = a;
                    return c = "KVP" == e ? ao(co([c], d)) : c.replace(/\{(\w+?)\}/g, function(a, c) {
                        return d[c]
                    })
                }
            }
        }
        this.N = m(a.version) ? a.version : "1.0.0";
        this.n = m(a.format) ? a.format : "image/jpeg";
        this.e = m(a.dimensions) ? a.dimensions : {};
        this.l = "";
        Hz(this);
        this.p = a.layer;
        this.i = a.matrixSet;
        this.J = a.style;
        var d = a.urls;
        !m(d) && m(a.url) && (d = Ry(a.url));
        this.g = null != d ? d : [];
        var e = this.T = m(a.requestEncoding) ? a.requestEncoding : "KVP",
            f = a.tileGrid,
            g = {
                layer: this.p,
                style: this.J,
                tilematrixset: this.i
            };
        "KVP" == e && Fb(g, {
            Service: "WMTS",
            Request: "GetTile",
            Version: this.N,
            Format: this.n
        });
        var h = this.e,
            d = 0 < this.g.length ? Oy(Ua(this.g, c)) : Py,
            k = Kd(),
            d = Qy(function(a, c, d) {
                if (f.b.length <= a[0]) return null;
                var e = a[1],
                    g = -a[2] - 1,
                    h = Og(f, a, k);
                c = c.G();
                return !he(h, c) || he(h, c) && (h[0] == c[2] || h[2] == c[0] || h[1] == c[3] || h[3] == c[1]) ? null : bf(a[0], e, g, d)
            }, d);
        Sy.call(this, {
            attributions: a.attributions,
            crossOrigin: a.crossOrigin,
            logo: a.logo,
            projection: a.projection,
            tileClass: a.tileClass,
            tileGrid: f,
            tileLoadFunction: a.tileLoadFunction,
            tilePixelRatio: a.tilePixelRatio,
            tileUrlFunction: d,
            wrapX: m(a.wrapX) ? a.wrapX : !1
        })
    }
    w(Gz, Sy);
    l = Gz.prototype;
    l.Ti = function() {
        return this.e
    };
    l.Xi = function() {
        return this.n
    };
    l.bb = function(a, c, d) {
        return this.l + Gz.S.bb.call(this, a, c, d)
    };
    l.vm = function() {
        return this.p
    };
    l.jj = function() {
        return this.i
    };
    l.uj = function() {
        return this.T
    };
    l.wm = function() {
        return this.J
    };
    l.xm = function() {
        return this.g
    };
    l.Aj = function() {
        return this.N
    };

    function Hz(a) {
        var c = 0,
            d = [],
            e;
        for (e in a.e) d[c++] = e + "-" + a.e[e];
        a.l = d.join("/")
    }
    l.uo = function(a) {
        Fb(this.e, a);
        Hz(this);
        this.k()
    };

    function Iz(a) {
        var c = m(a) ? a : c;
        Mg.call(this, {
            origin: [0, 0],
            resolutions: c.resolutions
        })
    }
    w(Iz, Mg);
    Iz.prototype.yb = function(a) {
        a = m(a) ? a : {};
        var c = this.minZoom,
            d = this.maxZoom,
            e = null;
        if (m(a.extent)) {
            var e = Array(d + 1),
                f;
            for (f = 0; f <= d; ++f) e[f] = f < c ? null : Pg(this, a.extent, f)
        }
        return function(a, f, k) {
            f = a[0];
            if (f < c || d < f) return null;
            var n = Math.pow(2, f),
                p = a[1];
            if (0 > p || n <= p) return null;
            a = a[2];
            return a < -n || -1 < a || null !== e && !hf(e[f], p, -a - 1) ? null : bf(f, p, -a - 1, k)
        }
    };

    function Jz(a) {
        a = m(a) ? a : {};
        var c = a.size,
            d = c[0],
            e = c[1],
            f = [],
            g = 256;
        switch (m(a.tierSizeCalculation) ? a.tierSizeCalculation : "default") {
            case "default":
                for (; d > g || e > g;) f.push([Math.ceil(d / g), Math.ceil(e / g)]), g += g;
                break;
            case "truncated":
                for (; d > g || e > g;) f.push([Math.ceil(d / g), Math.ceil(e / g)]), d >>= 1, e >>= 1
        }
        f.push([1, 1]);
        f.reverse();
        for (var g = [1], h = [0], e = 1, d = f.length; e < d; e++) g.push(1 << e), h.push(f[e - 1][0] * f[e - 1][1] + h[e - 1]);
        g.reverse();
        var g = new Iz({
                resolutions: g
            }),
            k = a.url,
            c = Qy(g.yb({
                extent: [0, 0, c[0], c[1]]
            }), function(a) {
                if (null !== a) {
                    var c = a[0],
                        d = a[1];
                    a = a[2];
                    return k + "TileGroup" + ((d + a * f[c][0] + h[c]) / 256 | 0) + "/" + c + "-" + d + "-" + a + ".jpg"
                }
            });
        Sy.call(this, {
            attributions: a.attributions,
            crossOrigin: a.crossOrigin,
            logo: a.logo,
            tileClass: Kz,
            tileGrid: g,
            tileUrlFunction: c
        })
    }
    w(Jz, Sy);

    function Kz(a, c, d, e, f) {
        px.call(this, a, c, d, e, f);
        this.d = {}
    }
    w(Kz, px);
    Kz.prototype.Ma = function(a) {
        var c = m(a) ? ma(a).toString() : "";
        if (c in this.d) return this.d[c];
        a = Kz.S.Ma.call(this, a);
        if (2 == this.state) {
            if (256 == a.width && 256 == a.height) return this.d[c] = a;
            var d = ai(256, 256);
            d.drawImage(a, 0, 0);
            return this.d[c] = d.canvas
        }
        return a
    };

    function Lz(a) {
        a = m(a) ? a : {};
        this.a = m(a.initialSize) ? a.initialSize : 256;
        this.c = m(a.maxSize) ? a.maxSize : m(va) ? va : 2048;
        this.b = m(a.space) ? a.space : 1;
        this.e = [new Mz(this.a, this.b)];
        this.d = this.a;
        this.f = [new Mz(this.d, this.b)]
    }
    Lz.prototype.add = function(a, c, d, e, f, g) {
        if (c + this.b > this.c || d + this.b > this.c) return null;
        e = Nz(this, !1, a, c, d, e, g);
        if (null === e) return null;
        a = Nz(this, !0, a, c, d, m(f) ? f : Hg, g);
        return {
            offsetX: e.offsetX,
            offsetY: e.offsetY,
            image: e.image,
            ig: a.image
        }
    };

    function Nz(a, c, d, e, f, g, h) {
        var k = c ? a.f : a.e,
            n, p, q;
        p = 0;
        for (q = k.length; p < q; ++p) {
            n = k[p];
            n = n.add(d, e, f, g, h);
            if (null !== n) return n;
            null === n && p === q - 1 && (c ? (n = Math.min(2 * a.d, a.c), a.d = n) : (n = Math.min(2 * a.a, a.c), a.a = n), n = new Mz(n, a.b), k.push(n), ++q)
        }
    }

    function Mz(a, c) {
        this.b = c;
        this.a = [{
            x: 0,
            y: 0,
            width: a,
            height: a
        }];
        this.d = {};
        this.c = Mf("CANVAS");
        this.c.width = a;
        this.c.height = a;
        this.e = this.c.getContext("2d")
    }
    Mz.prototype.get = function(a) {
        return Ab(this.d, a, null)
    };
    Mz.prototype.add = function(a, c, d, e, f) {
        var g, h, k;
        h = 0;
        for (k = this.a.length; h < k; ++h)
            if (g = this.a[h], g.width >= c + this.b && g.height >= d + this.b) return k = {
                offsetX: g.x + this.b,
                offsetY: g.y + this.b,
                image: this.c
            }, this.d[a] = k, e.call(f, this.e, g.x + this.b, g.y + this.b), a = h, c = c + this.b, d = d + this.b, f = e = void 0, g.width - c > g.height - d ? (e = {
                x: g.x + c,
                y: g.y,
                width: g.width - c,
                height: g.height
            }, f = {
                x: g.x,
                y: g.y + d,
                width: c,
                height: g.height - d
            }, Oz(this, a, e, f)) : (e = {
                x: g.x + c,
                y: g.y,
                width: g.width - c,
                height: d
            }, f = {
                x: g.x,
                y: g.y + d,
                width: g.width,
                height: g.height - d
            }, Oz(this, a, e, f)), k;
        return null
    };

    function Oz(a, c, d, e) {
        c = [c, 1];
        0 < d.width && 0 < d.height && c.push(d);
        0 < e.width && 0 < e.height && c.push(e);
        a.a.splice.apply(a.a, c)
    };

    function Pz(a) {
        this.o = this.d = this.e = null;
        this.i = m(a.fill) ? a.fill : null;
        this.J = [0, 0];
        this.b = a.points;
        this.c = m(a.radius) ? a.radius : a.radius1;
        this.f = m(a.radius2) ? a.radius2 : this.c;
        this.g = m(a.angle) ? a.angle : 0;
        this.a = m(a.stroke) ? a.stroke : null;
        this.H = this.L = this.p = null;
        var c = a.atlasManager,
            d = "",
            e = "",
            f = 0,
            g = null,
            h, k = 0;
        null !== this.a && (h = vf(this.a.b), k = this.a.a, m(k) || (k = 1), g = this.a.c, ki || (g = null), e = this.a.e, m(e) || (e = "round"), d = this.a.d, m(d) || (d = "round"), f = this.a.f, m(f) || (f = 10));
        var n = 2 * (this.c + k) + 1,
            d = {
                strokeStyle: h,
                md: k,
                size: n,
                lineCap: d,
                lineDash: g,
                lineJoin: e,
                miterLimit: f
            };
        if (m(c)) {
            var n = Math.round(n),
                e = null === this.i,
                p;
            e && (p = ra(this.Tg, this, d));
            f = this.nb();
            p = c.add(f, n, n, ra(this.Ug, this, d), p);
            this.d = p.image;
            this.J = [p.offsetX, p.offsetY];
            c = p.image.width;
            this.o = e ? p.ig : this.d
        } else this.d = Mf("CANVAS"), this.d.height = n, this.d.width = n, c = n = this.d.width, p = this.d.getContext("2d"), this.Ug(d, p, 0, 0), null === this.i ? (p = this.o = Mf("CANVAS"), p.height = d.size, p.width = d.size, p = p.getContext("2d"), this.Tg(d, p, 0, 0)) : this.o = this.d;
        this.p = [n / 2, n / 2];
        this.L = [n, n];
        this.H = [c, c];
        Ej.call(this, {
            opacity: 1,
            rotateWithView: !1,
            rotation: m(a.rotation) ? a.rotation : 0,
            scale: 1,
            snapToPixel: m(a.snapToPixel) ? a.snapToPixel : !0
        })
    }
    w(Pz, Ej);
    l = Pz.prototype;
    l.mb = function() {
        return this.p
    };
    l.Cm = function() {
        return this.g
    };
    l.Dm = function() {
        return this.i
    };
    l.he = function() {
        return this.o
    };
    l.Lb = function() {
        return this.d
    };
    l.Dd = function() {
        return this.H
    };
    l.gd = function() {
        return 2
    };
    l.rb = function() {
        return this.J
    };
    l.Em = function() {
        return this.b
    };
    l.Fm = function() {
        return this.c
    };
    l.tj = function() {
        return this.f
    };
    l.Xa = function() {
        return this.L
    };
    l.Gm = function() {
        return this.a
    };
    l.$e = ca;
    l.load = ca;
    l.xf = ca;
    l.Ug = function(a, c, d, e) {
        var f;
        c.setTransform(1, 0, 0, 1, 0, 0);
        c.translate(d, e);
        c.beginPath();
        this.f !== this.c && (this.b *= 2);
        for (d = 0; d <= this.b; d++) e = 2 * d * Math.PI / this.b - Math.PI / 2 + this.g, f = 0 === d % 2 ? this.c : this.f, c.lineTo(a.size / 2 + f * Math.cos(e), a.size / 2 + f * Math.sin(e));
        null !== this.i && (c.fillStyle = vf(this.i.b), c.fill());
        null !== this.a && (c.strokeStyle = a.strokeStyle, c.lineWidth = a.md, null === a.lineDash || c.setLineDash(a.lineDash), c.lineCap = a.lineCap, c.lineJoin = a.lineJoin, c.miterLimit = a.miterLimit, c.stroke());
        c.closePath()
    };
    l.Tg = function(a, c, d, e) {
        c.setTransform(1, 0, 0, 1, 0, 0);
        c.translate(d, e);
        c.beginPath();
        this.f !== this.c && (this.b *= 2);
        var f;
        for (d = 0; d <= this.b; d++) f = 2 * d * Math.PI / this.b - Math.PI / 2 + this.g, e = 0 === d % 2 ? this.c : this.f, c.lineTo(a.size / 2 + e * Math.cos(f), a.size / 2 + e * Math.sin(f));
        c.fillStyle = wl;
        c.fill();
        null !== this.a && (c.strokeStyle = a.strokeStyle, c.lineWidth = a.md, null === a.lineDash || c.setLineDash(a.lineDash), c.stroke());
        c.closePath()
    };
    l.nb = function() {
        var a = null === this.a ? "-" : this.a.nb(),
            c = null === this.i ? "-" : this.i.nb();
        if (null === this.e || a != this.e[1] || c != this.e[2] || this.c != this.e[3] || this.f != this.e[4] || this.g != this.e[5] || this.b != this.e[6]) this.e = ["r" + a + c + (m(this.c) ? this.c.toString() : "-") + (m(this.f) ? this.f.toString() : "-") + (m(this.g) ? this.g.toString() : "-") + (m(this.b) ? this.b.toString() : "-"), a, c, this.c, this.f, this.g, this.b];
        return this.e[0]
    };
    v("ol.animation.bounce", function(a) {
        var c = a.resolution,
            d = m(a.start) ? a.start : ua(),
            e = m(a.duration) ? a.duration : 1E3,
            f = m(a.easing) ? a.easing : Ye;
        return function(a, h) {
            if (h.time < d) return h.animate = !0, h.viewHints[0] += 1, !0;
            if (h.time < d + e) {
                var k = f((h.time - d) / e),
                    n = c - h.viewState.resolution;
                h.animate = !0;
                h.viewState.resolution += k * n;
                h.viewHints[0] += 1;
                return !0
            }
            return !1
        }
    }, OPENLAYERS);
    v("ol.animation.pan", Ze, OPENLAYERS);
    v("ol.animation.rotate", $e, OPENLAYERS);
    v("ol.animation.zoom", af, OPENLAYERS);
    v("ol.Attribution", mf, OPENLAYERS);
    mf.prototype.getHTML = mf.prototype.c;
    nf.prototype.element = nf.prototype.element;
    v("ol.Collection", of, OPENLAYERS);
    of.prototype.clear = of.prototype.clear;
    of.prototype.extend = of.prototype.af;
    of.prototype.forEach = of.prototype.forEach;
    of.prototype.getArray = of.prototype.Hk;
    of.prototype.item = of.prototype.item;
    of.prototype.getLength = of.prototype.Ib;
    of.prototype.insertAt = of.prototype.Td;
    of.prototype.pop = of.prototype.pop;
    of.prototype.push = of.prototype.push;
    of.prototype.remove = of.prototype.remove;
    of.prototype.removeAt = of.prototype.tf;
    of.prototype.setAt = of.prototype.Un;
    v("ol.coordinate.add", md, OPENLAYERS);
    v("ol.coordinate.createStringXY", function(a) {
        return function(c) {
            return ud(c, a)
        }
    }, OPENLAYERS);
    v("ol.coordinate.format", pd, OPENLAYERS);
    v("ol.coordinate.rotate", rd, OPENLAYERS);
    v("ol.coordinate.toStringHDMS", function(a) {
        return m(a) ? od(a[1], "NS") + " " + od(a[0], "EW") : ""
    }, OPENLAYERS);
    v("ol.coordinate.toStringXY", ud, OPENLAYERS);
    v("ol.DeviceOrientation", tr, OPENLAYERS);
    tr.prototype.getAlpha = tr.prototype.Mi;
    tr.prototype.getBeta = tr.prototype.Pi;
    tr.prototype.getGamma = tr.prototype.Yi;
    tr.prototype.getHeading = tr.prototype.Ik;
    tr.prototype.getTracking = tr.prototype.og;
    tr.prototype.setTracking = tr.prototype.bf;
    v("ol.easing.easeIn", function(a) {
        return Math.pow(a, 3)
    }, OPENLAYERS);
    v("ol.easing.easeOut", Ve, OPENLAYERS);
    v("ol.easing.inAndOut", We, OPENLAYERS);
    v("ol.easing.linear", Xe, OPENLAYERS);
    v("ol.easing.upAndDown", Ye, OPENLAYERS);
    v("ol.extent.boundingExtent", Jd, OPENLAYERS);
    v("ol.extent.buffer", Od, OPENLAYERS);
    v("ol.extent.containsCoordinate", function(a, c) {
        return Sd(a, c[0], c[1])
    }, OPENLAYERS);
    v("ol.extent.containsExtent", Rd, OPENLAYERS);
    v("ol.extent.containsXY", Sd, OPENLAYERS);
    v("ol.extent.createEmpty", Kd, OPENLAYERS);
    v("ol.extent.equals", Vd, OPENLAYERS);
    v("ol.extent.extend", Wd, OPENLAYERS);
    v("ol.extent.getBottomLeft", Zd, OPENLAYERS);
    v("ol.extent.getBottomRight", $d, OPENLAYERS);
    v("ol.extent.getCenter", ce, OPENLAYERS);
    v("ol.extent.getHeight", fe, OPENLAYERS);
    v("ol.extent.getIntersection", ge, OPENLAYERS);
    v("ol.extent.getSize", function(a) {
        return [a[2] - a[0], a[3] - a[1]]
    }, OPENLAYERS);
    v("ol.extent.getTopLeft", be, OPENLAYERS);
    v("ol.extent.getTopRight", ae, OPENLAYERS);
    v("ol.extent.getWidth", ie, OPENLAYERS);
    v("ol.extent.intersects", he, OPENLAYERS);
    v("ol.extent.isEmpty", je, OPENLAYERS);
    v("ol.extent.applyTransform", le, OPENLAYERS);
    v("ol.Feature", X, OPENLAYERS);
    X.prototype.clone = X.prototype.clone;
    X.prototype.getGeometry = X.prototype.Q;
    X.prototype.getId = X.prototype.aj;
    X.prototype.getGeometryName = X.prototype.$i;
    X.prototype.getStyle = X.prototype.Qk;
    X.prototype.getStyleFunction = X.prototype.Rk;
    X.prototype.setGeometry = X.prototype.La;
    X.prototype.setStyle = X.prototype.cf;
    X.prototype.setId = X.prototype.Qb;
    X.prototype.setGeometryName = X.prototype.Ic;
    v("ol.featureloader.xhr", ip, OPENLAYERS);
    v("ol.FeatureOverlay", ur, OPENLAYERS);
    ur.prototype.addFeature = ur.prototype.pg;
    ur.prototype.getFeatures = ur.prototype.Kk;
    ur.prototype.getMap = ur.prototype.Lk;
    ur.prototype.removeFeature = ur.prototype.Yd;
    ur.prototype.setFeatures = ur.prototype.ld;
    ur.prototype.setMap = ur.prototype.setMap;
    ur.prototype.setStyle = ur.prototype.rg;
    ur.prototype.getStyle = ur.prototype.Mk;
    ur.prototype.getStyleFunction = ur.prototype.Nk;
    v("ol.Geolocation", fx, OPENLAYERS);
    fx.prototype.getAccuracy = fx.prototype.Ki;
    fx.prototype.getAccuracyGeometry = fx.prototype.Li;
    fx.prototype.getAltitude = fx.prototype.Ni;
    fx.prototype.getAltitudeAccuracy = fx.prototype.Oi;
    fx.prototype.getHeading = fx.prototype.Tk;
    fx.prototype.getPosition = fx.prototype.Uk;
    fx.prototype.getProjection = fx.prototype.sg;
    fx.prototype.getSpeed = fx.prototype.vj;
    fx.prototype.getTracking = fx.prototype.tg;
    fx.prototype.getTrackingOptions = fx.prototype.bg;
    fx.prototype.setProjection = fx.prototype.ug;
    fx.prototype.setTracking = fx.prototype.Zd;
    fx.prototype.setTrackingOptions = fx.prototype.Dh;
    v("ol.Graticule", jx, OPENLAYERS);
    jx.prototype.getMap = jx.prototype.Xk;
    jx.prototype.getMeridians = jx.prototype.kj;
    jx.prototype.getParallels = jx.prototype.pj;
    jx.prototype.setMap = jx.prototype.setMap;
    v("ol.has.DEVICE_PIXEL_RATIO", ji, OPENLAYERS);
    v("ol.has.CANVAS", li, OPENLAYERS);
    v("ol.has.DEVICE_ORIENTATION", mi, OPENLAYERS);
    v("ol.has.GEOLOCATION", ni, OPENLAYERS);
    v("ol.has.TOUCH", oi, OPENLAYERS);
    v("ol.has.WEBGL", ii, OPENLAYERS);
    ox.prototype.getImage = ox.prototype.b;
    px.prototype.getImage = px.prototype.Ma;
    v("ol.Kinetic", Tj, OPENLAYERS);
    v("ol.loadingstrategy.all", jp, OPENLAYERS);
    v("ol.loadingstrategy.bbox", function(a) {
        return [a]
    }, OPENLAYERS);
    v("ol.loadingstrategy.tile", function(a) {
        return function(c, d) {
            var e = Tg(a, d),
                f = Pg(a, c, e),
                g = [],
                e = [e, 0, 0];
            for (e[1] = f.b; e[1] <= f.d; ++e[1])
                for (e[2] = f.c; e[2] <= f.a; ++e[2]) g.push(Og(a, e));
            return g
        }
    }, OPENLAYERS);
    v("ol.Map", W, OPENLAYERS);
    W.prototype.addControl = W.prototype.si;
    W.prototype.addInteraction = W.prototype.ti;
    W.prototype.addLayer = W.prototype.Jf;
    W.prototype.addOverlay = W.prototype.Kf;
    W.prototype.beforeRender = W.prototype.Ha;
    W.prototype.forEachFeatureAtPixel = W.prototype.Ne;
    W.prototype.forEachLayerAtPixel = W.prototype.al;
    W.prototype.hasFeatureAtPixel = W.prototype.ok;
    W.prototype.getEventCoordinate = W.prototype.Ui;
    W.prototype.getEventPixel = W.prototype.Bd;
    W.prototype.getTarget = W.prototype.df;
    W.prototype.getTargetElement = W.prototype.bd;
    W.prototype.getCoordinateFromPixel = W.prototype.ka;
    W.prototype.getControls = W.prototype.Si;
    W.prototype.getOverlays = W.prototype.oj;
    W.prototype.getInteractions = W.prototype.bj;
    W.prototype.getLayerGroup = W.prototype.Ub;
    W.prototype.getLayers = W.prototype.vg;
    W.prototype.getPixelFromCoordinate = W.prototype.ta;
    W.prototype.getSize = W.prototype.xa;
    W.prototype.getView = W.prototype.R;
    W.prototype.getViewport = W.prototype.Bj;
    W.prototype.renderSync = W.prototype.Rn;
    W.prototype.render = W.prototype.render;
    W.prototype.removeControl = W.prototype.Ln;
    W.prototype.removeInteraction = W.prototype.Mn;
    W.prototype.removeLayer = W.prototype.Nn;
    W.prototype.removeOverlay = W.prototype.On;
    W.prototype.setLayerGroup = W.prototype.zh;
    W.prototype.setSize = W.prototype.vf;
    W.prototype.setTarget = W.prototype.cl;
    W.prototype.setView = W.prototype.jo;
    W.prototype.updateSize = W.prototype.Kc;
    Zi.prototype.originalEvent = Zi.prototype.originalEvent;
    Zi.prototype.pixel = Zi.prototype.pixel;
    Zi.prototype.coordinate = Zi.prototype.coordinate;
    Zi.prototype.dragging = Zi.prototype.dragging;
    Zi.prototype.preventDefault = Zi.prototype.preventDefault;
    Zi.prototype.stopPropagation = Zi.prototype.fb;
    tg.prototype.map = tg.prototype.map;
    tg.prototype.frameState = tg.prototype.frameState;
    ed.prototype.key = ed.prototype.key;
    ed.prototype.oldValue = ed.prototype.oldValue;
    v("ol.Object", fd, OPENLAYERS);
    fd.prototype.get = fd.prototype.get;
    fd.prototype.getKeys = fd.prototype.C;
    fd.prototype.getProperties = fd.prototype.D;
    fd.prototype.set = fd.prototype.set;
    fd.prototype.setProperties = fd.prototype.t;
    fd.prototype.unset = fd.prototype.I;
    v("ol.Observable", cd, OPENLAYERS);
    v("ol.Observable.unByKey", dd, OPENLAYERS);
    cd.prototype.changed = cd.prototype.k;
    cd.prototype.getRevision = cd.prototype.v;
    cd.prototype.on = cd.prototype.r;
    cd.prototype.once = cd.prototype.A;
    cd.prototype.un = cd.prototype.u;
    cd.prototype.unByKey = cd.prototype.B;
    v("ol.inherits", w, OPENLAYERS);
    v("ol.Overlay", Rq, OPENLAYERS);
    Rq.prototype.getElement = Rq.prototype.$d;
    Rq.prototype.getMap = Rq.prototype.ae;
    Rq.prototype.getOffset = Rq.prototype.Yf;
    Rq.prototype.getPosition = Rq.prototype.wg;
    Rq.prototype.getPositioning = Rq.prototype.ag;
    Rq.prototype.setElement = Rq.prototype.wh;
    Rq.prototype.setMap = Rq.prototype.setMap;
    Rq.prototype.setOffset = Rq.prototype.Bh;
    Rq.prototype.setPosition = Rq.prototype.uf;
    Rq.prototype.setPositioning = Rq.prototype.Ch;
    v("ol.size.toSize", ld, OPENLAYERS);
    zg.prototype.getTileCoord = zg.prototype.f;
    v("ol.View", Ne, OPENLAYERS);
    Ne.prototype.constrainCenter = Ne.prototype.xd;
    Ne.prototype.constrainResolution = Ne.prototype.constrainResolution;
    Ne.prototype.constrainRotation = Ne.prototype.constrainRotation;
    Ne.prototype.getCenter = Ne.prototype.Ca;
    Ne.prototype.calculateExtent = Ne.prototype.Pc;
    Ne.prototype.getProjection = Ne.prototype.dl;
    Ne.prototype.getResolution = Ne.prototype.ya;
    Ne.prototype.getRotation = Ne.prototype.Da;
    Ne.prototype.getZoom = Ne.prototype.Ej;
    Ne.prototype.fitExtent = Ne.prototype.Me;
    Ne.prototype.fitGeometry = Ne.prototype.Fi;
    Ne.prototype.centerOn = Ne.prototype.Ai;
    Ne.prototype.rotate = Ne.prototype.rotate;
    Ne.prototype.setCenter = Ne.prototype.Na;
    Ne.prototype.setResolution = Ne.prototype.tb;
    Ne.prototype.setRotation = Ne.prototype.be;
    Ne.prototype.setZoom = Ne.prototype.no;
    v("ol.xml.getAllTextContent", Bo, OPENLAYERS);
    v("ol.xml.parse", Vo, OPENLAYERS);
    v("ol.webgl.Context", Wp, OPENLAYERS);
    Wp.prototype.getGL = Wp.prototype.Xm;
    Wp.prototype.getHitDetectionFramebuffer = Wp.prototype.Te;
    Wp.prototype.useProgram = Wp.prototype.oe;
    v("ol.tilegrid.TileGrid", Mg, OPENLAYERS);
    Mg.prototype.getMaxZoom = Mg.prototype.Fd;
    Mg.prototype.getMinZoom = Mg.prototype.Hd;
    Mg.prototype.getOrigin = Mg.prototype.Mb;
    Mg.prototype.getResolution = Mg.prototype.ma;
    Mg.prototype.getResolutions = Mg.prototype.ne;
    Mg.prototype.getTileCoordForCoordAndResolution = Mg.prototype.Wb;
    Mg.prototype.getTileCoordForCoordAndZ = Mg.prototype.cd;
    Mg.prototype.getTileSize = Mg.prototype.na;
    v("ol.tilegrid.WMTS", Ez, OPENLAYERS);
    Ez.prototype.getMatrixIds = Ez.prototype.q;
    v("ol.tilegrid.WMTS.createFromCapabilitiesMatrixSet", Fz, OPENLAYERS);
    v("ol.tilegrid.XYZ", Uy, OPENLAYERS);
    v("ol.tilegrid.Zoomify", Iz, OPENLAYERS);
    v("ol.style.AtlasManager", Lz, OPENLAYERS);
    v("ol.style.Circle", Al, OPENLAYERS);
    Al.prototype.getAnchor = Al.prototype.mb;
    Al.prototype.getFill = Al.prototype.ym;
    Al.prototype.getImage = Al.prototype.Lb;
    Al.prototype.getOrigin = Al.prototype.rb;
    Al.prototype.getRadius = Al.prototype.zm;
    Al.prototype.getSize = Al.prototype.Xa;
    Al.prototype.getStroke = Al.prototype.Am;
    v("ol.style.Fill", zl, OPENLAYERS);
    zl.prototype.getColor = zl.prototype.c;
    zl.prototype.setColor = zl.prototype.d;
    v("ol.style.Icon", Fj, OPENLAYERS);
    Fj.prototype.getAnchor = Fj.prototype.mb;
    Fj.prototype.getImage = Fj.prototype.Lb;
    Fj.prototype.getOrigin = Fj.prototype.rb;
    Fj.prototype.getSrc = Fj.prototype.Bm;
    Fj.prototype.getSize = Fj.prototype.Xa;
    v("ol.style.Image", Ej, OPENLAYERS);
    Ej.prototype.getOpacity = Ej.prototype.ie;
    Ej.prototype.getRotateWithView = Ej.prototype.Jd;
    Ej.prototype.getRotation = Ej.prototype.je;
    Ej.prototype.getScale = Ej.prototype.ke;
    Ej.prototype.getSnapToPixel = Ej.prototype.Kd;
    Ej.prototype.setRotation = Ej.prototype.le;
    Ej.prototype.setScale = Ej.prototype.me;
    v("ol.style.RegularShape", Pz, OPENLAYERS);
    Pz.prototype.getAnchor = Pz.prototype.mb;
    Pz.prototype.getAngle = Pz.prototype.Cm;
    Pz.prototype.getFill = Pz.prototype.Dm;
    Pz.prototype.getImage = Pz.prototype.Lb;
    Pz.prototype.getOrigin = Pz.prototype.rb;
    Pz.prototype.getPoints = Pz.prototype.Em;
    Pz.prototype.getRadius = Pz.prototype.Fm;
    Pz.prototype.getRadius2 = Pz.prototype.tj;
    Pz.prototype.getSize = Pz.prototype.Xa;
    Pz.prototype.getStroke = Pz.prototype.Gm;
    v("ol.style.Stroke", vl, OPENLAYERS);
    vl.prototype.getColor = vl.prototype.Hm;
    vl.prototype.getLineCap = vl.prototype.ej;
    vl.prototype.getLineDash = vl.prototype.Im;
    vl.prototype.getLineJoin = vl.prototype.fj;
    vl.prototype.getMiterLimit = vl.prototype.lj;
    vl.prototype.getWidth = vl.prototype.Jm;
    vl.prototype.setColor = vl.prototype.Km;
    vl.prototype.setLineCap = vl.prototype.Zn;
    vl.prototype.setLineDash = vl.prototype.Lm;
    vl.prototype.setLineJoin = vl.prototype.$n;
    vl.prototype.setMiterLimit = vl.prototype.ao;
    vl.prototype.setWidth = vl.prototype.ko;
    v("ol.style.Style", Bl, OPENLAYERS);
    Bl.prototype.getGeometry = Bl.prototype.Q;
    Bl.prototype.getGeometryFunction = Bl.prototype.Zi;
    Bl.prototype.getFill = Bl.prototype.Mm;
    Bl.prototype.getImage = Bl.prototype.Nm;
    Bl.prototype.getStroke = Bl.prototype.Om;
    Bl.prototype.getText = Bl.prototype.Pm;
    Bl.prototype.getZIndex = Bl.prototype.Dj;
    Bl.prototype.setGeometry = Bl.prototype.Vg;
    Bl.prototype.setZIndex = Bl.prototype.mo;
    v("ol.style.Text", ut, OPENLAYERS);
    ut.prototype.getFont = ut.prototype.Wi;
    ut.prototype.getOffsetX = ut.prototype.mj;
    ut.prototype.getOffsetY = ut.prototype.nj;
    ut.prototype.getFill = ut.prototype.Qm;
    ut.prototype.getRotation = ut.prototype.Rm;
    ut.prototype.getScale = ut.prototype.Sm;
    ut.prototype.getStroke = ut.prototype.Tm;
    ut.prototype.getText = ut.prototype.Um;
    ut.prototype.getTextAlign = ut.prototype.xj;
    ut.prototype.getTextBaseline = ut.prototype.yj;
    ut.prototype.setFont = ut.prototype.Wn;
    ut.prototype.setFill = ut.prototype.Vn;
    ut.prototype.setRotation = ut.prototype.Vm;
    ut.prototype.setScale = ut.prototype.Wm;
    ut.prototype.setStroke = ut.prototype.eo;
    ut.prototype.setText = ut.prototype.fo;
    ut.prototype.setTextAlign = ut.prototype.ho;
    ut.prototype.setTextBaseline = ut.prototype.io;
    v("ol.Sphere", me, OPENLAYERS);
    me.prototype.geodesicArea = me.prototype.a;
    me.prototype.haversineDistance = me.prototype.b;
    v("ol.source.BingMaps", Vy, OPENLAYERS);
    v("ol.source.BingMaps.TOS_ATTRIBUTION", Wy, OPENLAYERS);
    v("ol.source.Cluster", Xy, OPENLAYERS);
    Xy.prototype.getSource = Xy.prototype.X;
    v("ol.source.ImageCanvas", qn, OPENLAYERS);
    v("ol.source.ImageMapGuide", $y, OPENLAYERS);
    $y.prototype.getParams = $y.prototype.Tl;
    $y.prototype.getImageLoadFunction = $y.prototype.Sl;
    $y.prototype.updateParams = $y.prototype.Wl;
    $y.prototype.setImageLoadFunction = $y.prototype.Vl;
    v("ol.source.Image", jn, OPENLAYERS);
    ln.prototype.image = ln.prototype.image;
    v("ol.source.ImageStatic", az, OPENLAYERS);
    v("ol.source.ImageVector", xp, OPENLAYERS);
    xp.prototype.getSource = xp.prototype.Xl;
    xp.prototype.getStyle = xp.prototype.Yl;
    xp.prototype.getStyleFunction = xp.prototype.Zl;
    xp.prototype.setStyle = xp.prototype.Mg;
    v("ol.source.ImageWMS", bz, OPENLAYERS);
    bz.prototype.getGetFeatureInfoUrl = bz.prototype.bm;
    bz.prototype.getParams = bz.prototype.dm;
    bz.prototype.getImageLoadFunction = bz.prototype.cm;
    bz.prototype.getUrl = bz.prototype.em;
    bz.prototype.setImageLoadFunction = bz.prototype.fm;
    bz.prototype.setUrl = bz.prototype.gm;
    bz.prototype.updateParams = bz.prototype.hm;
    v("ol.source.MapQuest", iz, OPENLAYERS);
    iz.prototype.getLayer = iz.prototype.i;
    v("ol.source.OSM", gz, OPENLAYERS);
    v("ol.source.OSM.ATTRIBUTION", hz, OPENLAYERS);
    v("ol.source.Source", Bg, OPENLAYERS);
    Bg.prototype.getAttributions = Bg.prototype.ea;
    Bg.prototype.getLogo = Bg.prototype.ca;
    Bg.prototype.getProjection = Bg.prototype.fa;
    Bg.prototype.getState = Bg.prototype.ga;
    v("ol.source.Stamen", nz, OPENLAYERS);
    v("ol.source.TileArcGISRest", pz, OPENLAYERS);
    pz.prototype.getParams = pz.prototype.im;
    pz.prototype.getUrls = pz.prototype.jm;
    pz.prototype.setUrl = pz.prototype.km;
    pz.prototype.setUrls = pz.prototype.Ng;
    pz.prototype.updateParams = pz.prototype.mm;
    v("ol.source.TileDebug", rz, OPENLAYERS);
    v("ol.source.TileImage", Sy, OPENLAYERS);
    Sy.prototype.getTileLoadFunction = Sy.prototype.Ua;
    Sy.prototype.getTileUrlFunction = Sy.prototype.Va;
    Sy.prototype.setTileLoadFunction = Sy.prototype.$a;
    Sy.prototype.setTileUrlFunction = Sy.prototype.pa;
    v("ol.source.TileJSON", sz, OPENLAYERS);
    v("ol.source.Tile", Zg, OPENLAYERS);
    Zg.prototype.getTileGrid = Zg.prototype.ua;
    bh.prototype.tile = bh.prototype.tile;
    v("ol.source.TileUTFGrid", tz, OPENLAYERS);
    tz.prototype.getTemplate = tz.prototype.wj;
    tz.prototype.forDataAtCoordinateAndResolution = tz.prototype.Gi;
    v("ol.source.TileVector", yz, OPENLAYERS);
    yz.prototype.getFeatures = yz.prototype.Dc;
    yz.prototype.getFeaturesAtCoordinateAndResolution = yz.prototype.Vi;
    v("ol.source.TileWMS", Az, OPENLAYERS);
    Az.prototype.getGetFeatureInfoUrl = Az.prototype.pm;
    Az.prototype.getParams = Az.prototype.qm;
    Az.prototype.getUrls = Az.prototype.rm;
    Az.prototype.setUrl = Az.prototype.sm;
    Az.prototype.setUrls = Az.prototype.Og;
    Az.prototype.updateParams = Az.prototype.um;
    v("ol.source.Vector", qp, OPENLAYERS);
    qp.prototype.addFeature = qp.prototype.jf;
    qp.prototype.addFeatures = qp.prototype.Oc;
    qp.prototype.clear = qp.prototype.clear;
    qp.prototype.forEachFeature = qp.prototype.Rf;
    qp.prototype.forEachFeatureInExtent = qp.prototype.$c;
    qp.prototype.forEachFeatureIntersectingExtent = qp.prototype.Oe;
    qp.prototype.getFeatures = qp.prototype.Dc;
    qp.prototype.getFeaturesAtCoordinate = qp.prototype.Re;
    qp.prototype.getFeaturesInExtent = qp.prototype.Se;
    qp.prototype.getClosestFeatureToCoordinate = qp.prototype.Tf;
    qp.prototype.getExtent = qp.prototype.G;
    qp.prototype.getFeatureById = qp.prototype.Qe;
    qp.prototype.removeFeature = qp.prototype.Qg;
    up.prototype.feature = up.prototype.feature;
    v("ol.source.WMTS", Gz, OPENLAYERS);
    Gz.prototype.getDimensions = Gz.prototype.Ti;
    Gz.prototype.getFormat = Gz.prototype.Xi;
    Gz.prototype.getLayer = Gz.prototype.vm;
    Gz.prototype.getMatrixSet = Gz.prototype.jj;
    Gz.prototype.getRequestEncoding = Gz.prototype.uj;
    Gz.prototype.getStyle = Gz.prototype.wm;
    Gz.prototype.getUrls = Gz.prototype.xm;
    Gz.prototype.getVersion = Gz.prototype.Aj;
    Gz.prototype.updateDimensions = Gz.prototype.uo;
    v("ol.source.WMTS.optionsFromCapabilities", function(a, c) {
        var d = Wa(a.Contents.Layer, function(a) {
                return a.Identifier == c.layer
            }),
            e, f, g;
        e = 1 < d.TileMatrixSetLink.length ? Xa(d.TileMatrixSetLink, function(a) {
            return a.TileMatrixSet == c.matrixSet
        }) : m(c.projection) ? Xa(d.TileMatrixSetLink, function(a) {
            return a.TileMatrixSet.SupportedCRS.replace(/urn:ogc:def:crs:(\w+):(.*:)?(\w+)$/, "$1:$3") == c.projection
        }) : 0;
        0 > e && (e = 0);
        f = d.TileMatrixSetLink[e].TileMatrixSet;
        e = d.WGS84BoundingBox;
        m(e) && (g = re("EPSG:4326").G(), g = e[0] == g[0] && e[2] == g[2]);
        var h = d.Format[0];
        m(c.format) && (h = c.format);
        e = Xa(d.Style, function(a) {
            return m(c.style) ? a.Title == c.style : a.isDefault
        });
        0 > e && (e = 0);
        e = d.Style[e].Identifier;
        var k = {};
        m(d.Dimension) && Sa(d.Dimension, function(a) {
            var c = a.Identifier,
                d = a["default"];
            m(d) || (d = a.values[0]);
            k[c] = d
        });
        var n = Wa(a.Contents.TileMatrixSet, function(a) {
                return a.Identifier == f
            }),
            p = Fz(n),
            n = m(c.projection) ? re(c.projection) : re(n.SupportedCRS.replace(/urn:ogc:def:crs:(\w+):(.*:)?(\w+)$/, "$1:$3")),
            q = [],
            r = c.requestEncoding,
            r = m(r) ? r : "";
        if (a.OperationsMetadata.hasOwnProperty("GetTile") && 0 != r.lastIndexOf("REST", 0))
            for (var d = a.OperationsMetadata.GetTile.DCP.HTTP.Get, t = 0, u = d.length; t < u; ++t) {
                var A = Wa(d[t].Constraint, function(a) {
                    return "GetEncoding" == a.name
                }).AllowedValues.Value;
                0 < A.length && Ya(A, "KVP") && (r = "KVP", q.push(d[t].href))
            } else r = "REST", Sa(d.ResourceURL, function(a) {
                "tile" == a.resourceType && (h = a.format, q.push(a.template))
            });
        return {
            urls: q,
            layer: c.layer,
            matrixSet: f,
            format: h,
            projection: n,
            requestEncoding: r,
            tileGrid: p,
            style: e,
            dimensions: k,
            wrapX: g
        }
    }, OPENLAYERS);
    v("ol.source.XYZ", fz, OPENLAYERS);
    fz.prototype.setTileUrlFunction = fz.prototype.pa;
    fz.prototype.setUrl = fz.prototype.e;
    v("ol.source.Zoomify", Jz, OPENLAYERS);
    il.prototype.vectorContext = il.prototype.vectorContext;
    il.prototype.frameState = il.prototype.frameState;
    il.prototype.context = il.prototype.context;
    il.prototype.glContext = il.prototype.glContext;
    v("ol.render.VectorContext", hl, OPENLAYERS);
    rq.prototype.drawAsync = rq.prototype.tc;
    rq.prototype.drawCircleGeometry = rq.prototype.uc;
    rq.prototype.drawFeature = rq.prototype.Le;
    rq.prototype.drawGeometryCollectionGeometry = rq.prototype.zd;
    rq.prototype.drawPointGeometry = rq.prototype.kb;
    rq.prototype.drawLineStringGeometry = rq.prototype.zb;
    rq.prototype.drawMultiLineStringGeometry = rq.prototype.vc;
    rq.prototype.drawMultiPointGeometry = rq.prototype.jb;
    rq.prototype.drawMultiPolygonGeometry = rq.prototype.wc;
    rq.prototype.drawPolygonGeometry = rq.prototype.Rb;
    rq.prototype.drawText = rq.prototype.lb;
    rq.prototype.setFillStrokeStyle = rq.prototype.Aa;
    rq.prototype.setImageStyle = rq.prototype.Za;
    rq.prototype.setTextStyle = rq.prototype.Ba;
    cm.prototype.drawAsync = cm.prototype.tc;
    cm.prototype.drawCircleGeometry = cm.prototype.uc;
    cm.prototype.drawFeature = cm.prototype.Le;
    cm.prototype.drawPointGeometry = cm.prototype.kb;
    cm.prototype.drawMultiPointGeometry = cm.prototype.jb;
    cm.prototype.drawLineStringGeometry = cm.prototype.zb;
    cm.prototype.drawMultiLineStringGeometry = cm.prototype.vc;
    cm.prototype.drawPolygonGeometry = cm.prototype.Rb;
    cm.prototype.drawMultiPolygonGeometry = cm.prototype.wc;
    cm.prototype.setFillStrokeStyle = cm.prototype.Aa;
    cm.prototype.setImageStyle = cm.prototype.Za;
    cm.prototype.setTextStyle = cm.prototype.Ba;
    v("ol.proj.common.add", bm, OPENLAYERS);
    v("ol.proj.METERS_PER_UNIT", oe, OPENLAYERS);
    v("ol.proj.Projection", pe, OPENLAYERS);
    pe.prototype.getCode = pe.prototype.Ri;
    pe.prototype.getExtent = pe.prototype.G;
    pe.prototype.getUnits = pe.prototype.Ll;
    pe.prototype.getMetersPerUnit = pe.prototype.Gd;
    pe.prototype.getWorldExtent = pe.prototype.Cj;
    pe.prototype.isGlobal = pe.prototype.Ml;
    pe.prototype.setGlobal = pe.prototype.Yn;
    pe.prototype.setExtent = pe.prototype.Nl;
    pe.prototype.setWorldExtent = pe.prototype.lo;
    pe.prototype.setGetPointResolution = pe.prototype.Xn;
    pe.prototype.getPointResolution = pe.prototype.getPointResolution;
    v("ol.proj.addEquivalentProjections", se, OPENLAYERS);
    v("ol.proj.addProjection", Fe, OPENLAYERS);
    v("ol.proj.addCoordinateTransforms", te, OPENLAYERS);
    v("ol.proj.fromLonLat", function(a, c) {
        return Le(a, "EPSG:4326", m(c) ? c : "EPSG:3857")
    }, OPENLAYERS);
    v("ol.proj.toLonLat", function(a, c) {
        return Le(a, m(c) ? c : "EPSG:3857", "EPSG:4326")
    }, OPENLAYERS);
    v("ol.proj.get", re, OPENLAYERS);
    v("ol.proj.getTransform", Je, OPENLAYERS);
    v("ol.proj.transform", Le, OPENLAYERS);
    v("ol.proj.transformExtent", Me, OPENLAYERS);
    v("ol.layer.Heatmap", Z, OPENLAYERS);
    Z.prototype.getBlur = Z.prototype.Sf;
    Z.prototype.getGradient = Z.prototype.Wf;
    Z.prototype.getRadius = Z.prototype.Hg;
    Z.prototype.setBlur = Z.prototype.th;
    Z.prototype.setGradient = Z.prototype.yh;
    Z.prototype.setRadius = Z.prototype.Ig;
    v("ol.layer.Image", I, OPENLAYERS);
    I.prototype.getSource = I.prototype.da;
    v("ol.layer.Layer", C, OPENLAYERS);
    C.prototype.getSource = C.prototype.da;
    C.prototype.setSource = C.prototype.Jc;
    v("ol.layer.Base", mj, OPENLAYERS);
    mj.prototype.getBrightness = mj.prototype.Bb;
    mj.prototype.getContrast = mj.prototype.Cb;
    mj.prototype.getHue = mj.prototype.Db;
    mj.prototype.getExtent = mj.prototype.G;
    mj.prototype.getMaxResolution = mj.prototype.Eb;
    mj.prototype.getMinResolution = mj.prototype.Fb;
    mj.prototype.getOpacity = mj.prototype.Kb;
    mj.prototype.getSaturation = mj.prototype.Gb;
    mj.prototype.getVisible = mj.prototype.eb;
    mj.prototype.setBrightness = mj.prototype.gc;
    mj.prototype.setContrast = mj.prototype.hc;
    mj.prototype.setHue = mj.prototype.ic;
    mj.prototype.setExtent = mj.prototype.bc;
    mj.prototype.setMaxResolution = mj.prototype.jc;
    mj.prototype.setMinResolution = mj.prototype.kc;
    mj.prototype.setOpacity = mj.prototype.cc;
    mj.prototype.setSaturation = mj.prototype.lc;
    mj.prototype.setVisible = mj.prototype.mc;
    v("ol.layer.Group", G, OPENLAYERS);
    G.prototype.getLayers = G.prototype.Bc;
    G.prototype.setLayers = G.prototype.Ah;
    v("ol.layer.Tile", L, OPENLAYERS);
    L.prototype.getPreload = L.prototype.a;
    L.prototype.getSource = L.prototype.da;
    L.prototype.setPreload = L.prototype.d;
    L.prototype.getUseInterimTilesOnError = L.prototype.c;
    L.prototype.setUseInterimTilesOnError = L.prototype.e;
    v("ol.layer.Vector", M, OPENLAYERS);
    M.prototype.getSource = M.prototype.da;
    M.prototype.getStyle = M.prototype.H;
    M.prototype.getStyleFunction = M.prototype.J;
    M.prototype.setStyle = M.prototype.e;
    v("ol.interaction.DoubleClickZoom", ak, OPENLAYERS);
    v("ol.interaction.DoubleClickZoom.handleEvent", bk, OPENLAYERS);
    v("ol.interaction.DragAndDrop", Kx, OPENLAYERS);
    v("ol.interaction.DragAndDrop.handleEvent", Gg, OPENLAYERS);
    Lx.prototype.features = Lx.prototype.features;
    Lx.prototype.file = Lx.prototype.file;
    Lx.prototype.projection = Lx.prototype.projection;
    ml.prototype.coordinate = ml.prototype.coordinate;
    v("ol.interaction.DragBox", nl, OPENLAYERS);
    nl.prototype.getGeometry = nl.prototype.Q;
    v("ol.interaction.DragPan", mk, OPENLAYERS);
    v("ol.interaction.DragRotateAndZoom", Ox, OPENLAYERS);
    v("ol.interaction.DragRotate", qk, OPENLAYERS);
    v("ol.interaction.DragZoom", Gl, OPENLAYERS);
    Sx.prototype.feature = Sx.prototype.feature;
    v("ol.interaction.Draw", Tx, OPENLAYERS);
    v("ol.interaction.Draw.handleEvent", Vx, OPENLAYERS);
    Tx.prototype.finishDrawing = Tx.prototype.X;
    v("ol.interaction.Interaction", Wj, OPENLAYERS);
    Wj.prototype.getActive = Wj.prototype.c;
    Wj.prototype.setActive = Wj.prototype.d;
    v("ol.interaction.defaults", Vl, OPENLAYERS);
    v("ol.interaction.KeyboardPan", Hl, OPENLAYERS);
    v("ol.interaction.KeyboardPan.handleEvent", Il, OPENLAYERS);
    v("ol.interaction.KeyboardZoom", Jl, OPENLAYERS);
    v("ol.interaction.KeyboardZoom.handleEvent", Kl, OPENLAYERS);
    v("ol.interaction.Modify", hy, OPENLAYERS);
    v("ol.interaction.Modify.handleEvent", ky, OPENLAYERS);
    v("ol.interaction.MouseWheelZoom", Ll, OPENLAYERS);
    v("ol.interaction.MouseWheelZoom.handleEvent", Ml, OPENLAYERS);
    v("ol.interaction.PinchRotate", Nl, OPENLAYERS);
    v("ol.interaction.PinchZoom", Rl, OPENLAYERS);
    v("ol.interaction.Pointer", jk, OPENLAYERS);
    v("ol.interaction.Pointer.handleEvent", kk, OPENLAYERS);
    ry.prototype.selected = ry.prototype.selected;
    ry.prototype.deselected = ry.prototype.deselected;
    v("ol.interaction.Select", sy, OPENLAYERS);
    sy.prototype.getFeatures = sy.prototype.p;
    v("ol.interaction.Select.handleEvent", ty, OPENLAYERS);
    sy.prototype.setMap = sy.prototype.setMap;
    v("ol.interaction.Snap", vy, OPENLAYERS);
    vy.prototype.addFeature = vy.prototype.ed;
    vy.prototype.removeFeature = vy.prototype.fd;
    v("ol.geom.Circle", Pm, OPENLAYERS);
    Pm.prototype.clone = Pm.prototype.clone;
    Pm.prototype.getCenter = Pm.prototype.dd;
    Pm.prototype.getRadius = Pm.prototype.zg;
    Pm.prototype.getType = Pm.prototype.M;
    Pm.prototype.setCenter = Pm.prototype.pl;
    Pm.prototype.setCenterAndRadius = Pm.prototype.uh;
    Pm.prototype.setRadius = Pm.prototype.Ag;
    Pm.prototype.transform = Pm.prototype.transform;
    v("ol.geom.Geometry", uk, OPENLAYERS);
    uk.prototype.getClosestPoint = uk.prototype.e;
    uk.prototype.getExtent = uk.prototype.G;
    v("ol.geom.GeometryCollection", Rm, OPENLAYERS);
    Rm.prototype.clone = Rm.prototype.clone;
    Rm.prototype.getGeometries = Rm.prototype.Vf;
    Rm.prototype.getType = Rm.prototype.M;
    Rm.prototype.intersectsExtent = Rm.prototype.ra;
    Rm.prototype.setGeometries = Rm.prototype.xh;
    Rm.prototype.applyTransform = Rm.prototype.qa;
    Rm.prototype.translate = Rm.prototype.Oa;
    v("ol.geom.LinearRing", Qk, OPENLAYERS);
    Qk.prototype.clone = Qk.prototype.clone;
    Qk.prototype.getArea = Qk.prototype.rl;
    Qk.prototype.getCoordinates = Qk.prototype.K;
    Qk.prototype.getType = Qk.prototype.M;
    Qk.prototype.setCoordinates = Qk.prototype.W;
    v("ol.geom.LineString", O, OPENLAYERS);
    O.prototype.appendCoordinate = O.prototype.ui;
    O.prototype.clone = O.prototype.clone;
    O.prototype.forEachSegment = O.prototype.Ji;
    O.prototype.getCoordinateAtM = O.prototype.ql;
    O.prototype.getCoordinates = O.prototype.K;
    O.prototype.getLength = O.prototype.Bg;
    O.prototype.getType = O.prototype.M;
    O.prototype.intersectsExtent = O.prototype.ra;
    O.prototype.setCoordinates = O.prototype.W;
    v("ol.geom.MultiLineString", Q, OPENLAYERS);
    Q.prototype.appendLineString = Q.prototype.vi;
    Q.prototype.clone = Q.prototype.clone;
    Q.prototype.getCoordinateAtM = Q.prototype.sl;
    Q.prototype.getCoordinates = Q.prototype.K;
    Q.prototype.getLineString = Q.prototype.gj;
    Q.prototype.getLineStrings = Q.prototype.ad;
    Q.prototype.getType = Q.prototype.M;
    Q.prototype.intersectsExtent = Q.prototype.ra;
    Q.prototype.setCoordinates = Q.prototype.W;
    v("ol.geom.MultiPoint", an, OPENLAYERS);
    an.prototype.appendPoint = an.prototype.xi;
    an.prototype.clone = an.prototype.clone;
    an.prototype.getCoordinates = an.prototype.K;
    an.prototype.getPoint = an.prototype.qj;
    an.prototype.getPoints = an.prototype.ce;
    an.prototype.getType = an.prototype.M;
    an.prototype.intersectsExtent = an.prototype.ra;
    an.prototype.setCoordinates = an.prototype.W;
    v("ol.geom.MultiPolygon", R, OPENLAYERS);
    R.prototype.appendPolygon = R.prototype.yi;
    R.prototype.clone = R.prototype.clone;
    R.prototype.getArea = R.prototype.tl;
    R.prototype.getCoordinates = R.prototype.K;
    R.prototype.getInteriorPoints = R.prototype.dj;
    R.prototype.getPolygon = R.prototype.sj;
    R.prototype.getPolygons = R.prototype.Id;
    R.prototype.getType = R.prototype.M;
    R.prototype.intersectsExtent = R.prototype.ra;
    R.prototype.setCoordinates = R.prototype.W;
    v("ol.geom.Point", E, OPENLAYERS);
    E.prototype.clone = E.prototype.clone;
    E.prototype.getCoordinates = E.prototype.K;
    E.prototype.getType = E.prototype.M;
    E.prototype.intersectsExtent = E.prototype.ra;
    E.prototype.setCoordinates = E.prototype.W;
    v("ol.geom.Polygon", F, OPENLAYERS);
    F.prototype.appendLinearRing = F.prototype.wi;
    F.prototype.clone = F.prototype.clone;
    F.prototype.getArea = F.prototype.ul;
    F.prototype.getCoordinates = F.prototype.K;
    F.prototype.getInteriorPoint = F.prototype.cj;
    F.prototype.getLinearRingCount = F.prototype.ij;
    F.prototype.getLinearRing = F.prototype.hj;
    F.prototype.getLinearRings = F.prototype.Ed;
    F.prototype.getType = F.prototype.M;
    F.prototype.intersectsExtent = F.prototype.ra;
    F.prototype.setCoordinates = F.prototype.W;
    v("ol.geom.Polygon.circular", gl, OPENLAYERS);
    v("ol.geom.Polygon.fromExtent", function(a) {
        var c = a[0],
            d = a[1],
            e = a[2];
        a = a[3];
        c = [c, d, c, a, e, a, e, d, c, d];
        d = new F(null);
        dl(d, "XY", c, [c.length]);
        return d
    }, OPENLAYERS);
    v("ol.geom.SimpleGeometry", wk, OPENLAYERS);
    wk.prototype.getFirstCoordinate = wk.prototype.ob;
    wk.prototype.getLastCoordinate = wk.prototype.pb;
    wk.prototype.getLayout = wk.prototype.qb;
    wk.prototype.applyTransform = wk.prototype.qa;
    wk.prototype.translate = wk.prototype.Oa;
    v("ol.format.EsriJSON", Cr, OPENLAYERS);
    Cr.prototype.readFeature = Cr.prototype.sb;
    Cr.prototype.readFeatures = Cr.prototype.ja;
    Cr.prototype.readGeometry = Cr.prototype.Gc;
    Cr.prototype.readProjection = Cr.prototype.za;
    Cr.prototype.writeGeometry = Cr.prototype.Mc;
    Cr.prototype.writeGeometryObject = Cr.prototype.Be;
    Cr.prototype.writeFeature = Cr.prototype.qd;
    Cr.prototype.writeFeatureObject = Cr.prototype.Lc;
    Cr.prototype.writeFeatures = Cr.prototype.ub;
    Cr.prototype.writeFeaturesObject = Cr.prototype.ze;
    v("ol.format.Feature", wr, OPENLAYERS);
    v("ol.format.GeoJSON", Jr, OPENLAYERS);
    Jr.prototype.readFeature = Jr.prototype.sb;
    Jr.prototype.readFeatures = Jr.prototype.ja;
    Jr.prototype.readGeometry = Jr.prototype.Gc;
    Jr.prototype.readProjection = Jr.prototype.za;
    Jr.prototype.writeFeature = Jr.prototype.qd;
    Jr.prototype.writeFeatureObject = Jr.prototype.Lc;
    Jr.prototype.writeFeatures = Jr.prototype.ub;
    Jr.prototype.writeFeaturesObject = Jr.prototype.ze;
    Jr.prototype.writeGeometry = Jr.prototype.Mc;
    Jr.prototype.writeGeometryObject = Jr.prototype.Be;
    v("ol.format.GPX", ms, OPENLAYERS);
    ms.prototype.readFeature = ms.prototype.sb;
    ms.prototype.readFeatures = ms.prototype.ja;
    ms.prototype.readProjection = ms.prototype.za;
    ms.prototype.writeFeatures = ms.prototype.ub;
    ms.prototype.writeFeaturesNode = ms.prototype.a;
    v("ol.format.IGC", Xs, OPENLAYERS);
    Xs.prototype.readFeature = Xs.prototype.sb;
    Xs.prototype.readFeatures = Xs.prototype.ja;
    Xs.prototype.readProjection = Xs.prototype.za;
    v("ol.format.KML", vt, OPENLAYERS);
    vt.prototype.readFeature = vt.prototype.sb;
    vt.prototype.readFeatures = vt.prototype.ja;
    vt.prototype.readName = vt.prototype.Dn;
    vt.prototype.readNetworkLinks = vt.prototype.En;
    vt.prototype.readProjection = vt.prototype.za;
    vt.prototype.writeFeatures = vt.prototype.ub;
    vt.prototype.writeFeaturesNode = vt.prototype.a;
    v("ol.format.OSMXML", gv, OPENLAYERS);
    gv.prototype.readFeatures = gv.prototype.ja;
    gv.prototype.readProjection = gv.prototype.za;
    v("ol.format.Polyline", Fv, OPENLAYERS);
    v("ol.format.Polyline.encodeDeltas", Gv, OPENLAYERS);
    v("ol.format.Polyline.decodeDeltas", Iv, OPENLAYERS);
    v("ol.format.Polyline.encodeFloats", Hv, OPENLAYERS);
    v("ol.format.Polyline.decodeFloats", Jv, OPENLAYERS);
    Fv.prototype.readFeature = Fv.prototype.sb;
    Fv.prototype.readFeatures = Fv.prototype.ja;
    Fv.prototype.readGeometry = Fv.prototype.Gc;
    Fv.prototype.readProjection = Fv.prototype.za;
    Fv.prototype.writeGeometry = Fv.prototype.Mc;
    v("ol.format.TopoJSON", Kv, OPENLAYERS);
    Kv.prototype.readFeatures = Kv.prototype.ja;
    Kv.prototype.readProjection = Kv.prototype.za;
    v("ol.format.WFS", Qv, OPENLAYERS);
    Qv.prototype.readFeatures = Qv.prototype.ja;
    Qv.prototype.readTransactionResponse = Qv.prototype.g;
    Qv.prototype.readFeatureCollectionMetadata = Qv.prototype.f;
    Qv.prototype.writeGetFeature = Qv.prototype.i;
    Qv.prototype.writeTransaction = Qv.prototype.o;
    Qv.prototype.readProjection = Qv.prototype.za;
    v("ol.format.WKT", cw, OPENLAYERS);
    cw.prototype.readFeature = cw.prototype.sb;
    cw.prototype.readFeatures = cw.prototype.ja;
    cw.prototype.readGeometry = cw.prototype.Gc;
    cw.prototype.writeFeature = cw.prototype.qd;
    cw.prototype.writeFeatures = cw.prototype.ub;
    cw.prototype.writeGeometry = cw.prototype.Mc;
    v("ol.format.WMSCapabilities", uw, OPENLAYERS);
    uw.prototype.read = uw.prototype.c;
    v("ol.format.WMSGetFeatureInfo", Rw, OPENLAYERS);
    Rw.prototype.readFeatures = Rw.prototype.ja;
    v("ol.format.WMTSCapabilities", Tw, OPENLAYERS);
    Tw.prototype.read = Tw.prototype.c;
    v("ol.format.GML2", ls, OPENLAYERS);
    v("ol.format.GML3", cs, OPENLAYERS);
    cs.prototype.writeGeometryNode = cs.prototype.q;
    cs.prototype.writeFeatures = cs.prototype.ub;
    cs.prototype.writeFeaturesNode = cs.prototype.a;
    v("ol.format.GML", cs, OPENLAYERS);
    cs.prototype.writeFeatures = cs.prototype.ub;
    cs.prototype.writeFeaturesNode = cs.prototype.a;
    Rr.prototype.readFeatures = Rr.prototype.ja;
    v("ol.events.condition.altKeyOnly", function(a) {
        a = a.b;
        return a.a && !a.g && !a.d
    }, OPENLAYERS);
    v("ol.events.condition.altShiftKeysOnly", ck, OPENLAYERS);
    v("ol.events.condition.always", Gg, OPENLAYERS);
    v("ol.events.condition.click", function(a) {
        return a.type == cj
    }, OPENLAYERS);
    v("ol.events.condition.never", Fg, OPENLAYERS);
    v("ol.events.condition.pointerMove", dk, OPENLAYERS);
    v("ol.events.condition.singleClick", ek, OPENLAYERS);
    v("ol.events.condition.noModifierKeys", fk, OPENLAYERS);
    v("ol.events.condition.platformModifierKeyOnly", function(a) {
        a = a.b;
        return !a.a && a.g && !a.d
    }, OPENLAYERS);
    v("ol.events.condition.shiftKeyOnly", gk, OPENLAYERS);
    v("ol.events.condition.targetNotEditable", hk, OPENLAYERS);
    v("ol.events.condition.mouseOnly", ik, OPENLAYERS);
    v("ol.control.Attribution", ch, OPENLAYERS);
    v("ol.control.Attribution.render", dh, OPENLAYERS);
    ch.prototype.getCollapsible = ch.prototype.fl;
    ch.prototype.setCollapsible = ch.prototype.il;
    ch.prototype.setCollapsed = ch.prototype.hl;
    ch.prototype.getCollapsed = ch.prototype.el;
    v("ol.control.Control", ug, OPENLAYERS);
    ug.prototype.getMap = ug.prototype.e;
    ug.prototype.setMap = ug.prototype.setMap;
    ug.prototype.setTarget = ug.prototype.c;
    v("ol.control.defaults", ih, OPENLAYERS);
    v("ol.control.FullScreen", nh, OPENLAYERS);
    v("ol.control.MousePosition", oh, OPENLAYERS);
    v("ol.control.MousePosition.render", ph, OPENLAYERS);
    oh.prototype.getCoordinateFormat = oh.prototype.Uf;
    oh.prototype.getProjection = oh.prototype.xg;
    oh.prototype.setMap = oh.prototype.setMap;
    oh.prototype.setCoordinateFormat = oh.prototype.vh;
    oh.prototype.setProjection = oh.prototype.yg;
    v("ol.control.OverviewMap", Uq, OPENLAYERS);
    Uq.prototype.setMap = Uq.prototype.setMap;
    v("ol.control.OverviewMap.render", Vq, OPENLAYERS);
    Uq.prototype.getCollapsible = Uq.prototype.ll;
    Uq.prototype.setCollapsible = Uq.prototype.ol;
    Uq.prototype.setCollapsed = Uq.prototype.nl;
    Uq.prototype.getCollapsed = Uq.prototype.kl;
    v("ol.control.Rotate", fh, OPENLAYERS);
    v("ol.control.Rotate.render", gh, OPENLAYERS);
    v("ol.control.ScaleLine", Zq, OPENLAYERS);
    Zq.prototype.getUnits = Zq.prototype.p;
    v("ol.control.ScaleLine.render", $q, OPENLAYERS);
    Zq.prototype.setUnits = Zq.prototype.J;
    v("ol.control.Zoom", hh, OPENLAYERS);
    v("ol.control.ZoomSlider", nr, OPENLAYERS);
    v("ol.control.ZoomSlider.render", pr, OPENLAYERS);
    v("ol.control.ZoomToExtent", sr, OPENLAYERS);
    v("ol.color.asArray", tf, OPENLAYERS);
    v("ol.color.asString", vf, OPENLAYERS);
    fd.prototype.changed = fd.prototype.k;
    fd.prototype.getRevision = fd.prototype.v;
    fd.prototype.on = fd.prototype.r;
    fd.prototype.once = fd.prototype.A;
    fd.prototype.un = fd.prototype.u;
    fd.prototype.unByKey = fd.prototype.B;
    of.prototype.get = of.prototype.get;
    of.prototype.getKeys = of.prototype.C;
    of.prototype.getProperties = of.prototype.D;
    of.prototype.set = of.prototype.set;
    of.prototype.setProperties = of.prototype.t;
    of.prototype.unset = of.prototype.I;
    of.prototype.changed = of.prototype.k;
    of.prototype.getRevision = of.prototype.v;
    of.prototype.on = of.prototype.r;
    of.prototype.once = of.prototype.A;
    of.prototype.un = of.prototype.u;
    of.prototype.unByKey = of.prototype.B;
    tr.prototype.get = tr.prototype.get;
    tr.prototype.getKeys = tr.prototype.C;
    tr.prototype.getProperties = tr.prototype.D;
    tr.prototype.set = tr.prototype.set;
    tr.prototype.setProperties = tr.prototype.t;
    tr.prototype.unset = tr.prototype.I;
    tr.prototype.changed = tr.prototype.k;
    tr.prototype.getRevision = tr.prototype.v;
    tr.prototype.on = tr.prototype.r;
    tr.prototype.once = tr.prototype.A;
    tr.prototype.un = tr.prototype.u;
    tr.prototype.unByKey = tr.prototype.B;
    X.prototype.get = X.prototype.get;
    X.prototype.getKeys = X.prototype.C;
    X.prototype.getProperties = X.prototype.D;
    X.prototype.set = X.prototype.set;
    X.prototype.setProperties = X.prototype.t;
    X.prototype.unset = X.prototype.I;
    X.prototype.changed = X.prototype.k;
    X.prototype.getRevision = X.prototype.v;
    X.prototype.on = X.prototype.r;
    X.prototype.once = X.prototype.A;
    X.prototype.un = X.prototype.u;
    X.prototype.unByKey = X.prototype.B;
    fx.prototype.get = fx.prototype.get;
    fx.prototype.getKeys = fx.prototype.C;
    fx.prototype.getProperties = fx.prototype.D;
    fx.prototype.set = fx.prototype.set;
    fx.prototype.setProperties = fx.prototype.t;
    fx.prototype.unset = fx.prototype.I;
    fx.prototype.changed = fx.prototype.k;
    fx.prototype.getRevision = fx.prototype.v;
    fx.prototype.on = fx.prototype.r;
    fx.prototype.once = fx.prototype.A;
    fx.prototype.un = fx.prototype.u;
    fx.prototype.unByKey = fx.prototype.B;
    px.prototype.getTileCoord = px.prototype.f;
    W.prototype.get = W.prototype.get;
    W.prototype.getKeys = W.prototype.C;
    W.prototype.getProperties = W.prototype.D;
    W.prototype.set = W.prototype.set;
    W.prototype.setProperties = W.prototype.t;
    W.prototype.unset = W.prototype.I;
    W.prototype.changed = W.prototype.k;
    W.prototype.getRevision = W.prototype.v;
    W.prototype.on = W.prototype.r;
    W.prototype.once = W.prototype.A;
    W.prototype.un = W.prototype.u;
    W.prototype.unByKey = W.prototype.B;
    Zi.prototype.map = Zi.prototype.map;
    Zi.prototype.frameState = Zi.prototype.frameState;
    $i.prototype.originalEvent = $i.prototype.originalEvent;
    $i.prototype.pixel = $i.prototype.pixel;
    $i.prototype.coordinate = $i.prototype.coordinate;
    $i.prototype.dragging = $i.prototype.dragging;
    $i.prototype.preventDefault = $i.prototype.preventDefault;
    $i.prototype.stopPropagation = $i.prototype.fb;
    $i.prototype.map = $i.prototype.map;
    $i.prototype.frameState = $i.prototype.frameState;
    Rq.prototype.get = Rq.prototype.get;
    Rq.prototype.getKeys = Rq.prototype.C;
    Rq.prototype.getProperties = Rq.prototype.D;
    Rq.prototype.set = Rq.prototype.set;
    Rq.prototype.setProperties = Rq.prototype.t;
    Rq.prototype.unset = Rq.prototype.I;
    Rq.prototype.changed = Rq.prototype.k;
    Rq.prototype.getRevision = Rq.prototype.v;
    Rq.prototype.on = Rq.prototype.r;
    Rq.prototype.once = Rq.prototype.A;
    Rq.prototype.un = Rq.prototype.u;
    Rq.prototype.unByKey = Rq.prototype.B;
    Ne.prototype.get = Ne.prototype.get;
    Ne.prototype.getKeys = Ne.prototype.C;
    Ne.prototype.getProperties = Ne.prototype.D;
    Ne.prototype.set = Ne.prototype.set;
    Ne.prototype.setProperties = Ne.prototype.t;
    Ne.prototype.unset = Ne.prototype.I;
    Ne.prototype.changed = Ne.prototype.k;
    Ne.prototype.getRevision = Ne.prototype.v;
    Ne.prototype.on = Ne.prototype.r;
    Ne.prototype.once = Ne.prototype.A;
    Ne.prototype.un = Ne.prototype.u;
    Ne.prototype.unByKey = Ne.prototype.B;
    Ez.prototype.getMaxZoom = Ez.prototype.Fd;
    Ez.prototype.getMinZoom = Ez.prototype.Hd;
    Ez.prototype.getOrigin = Ez.prototype.Mb;
    Ez.prototype.getResolution = Ez.prototype.ma;
    Ez.prototype.getResolutions = Ez.prototype.ne;
    Ez.prototype.getTileCoordForCoordAndResolution = Ez.prototype.Wb;
    Ez.prototype.getTileCoordForCoordAndZ = Ez.prototype.cd;
    Ez.prototype.getTileSize = Ez.prototype.na;
    Uy.prototype.getMaxZoom = Uy.prototype.Fd;
    Uy.prototype.getMinZoom = Uy.prototype.Hd;
    Uy.prototype.getOrigin = Uy.prototype.Mb;
    Uy.prototype.getResolution = Uy.prototype.ma;
    Uy.prototype.getResolutions = Uy.prototype.ne;
    Uy.prototype.getTileCoordForCoordAndResolution = Uy.prototype.Wb;
    Uy.prototype.getTileCoordForCoordAndZ = Uy.prototype.cd;
    Uy.prototype.getTileSize = Uy.prototype.na;
    Iz.prototype.getMaxZoom = Iz.prototype.Fd;
    Iz.prototype.getMinZoom = Iz.prototype.Hd;
    Iz.prototype.getOrigin = Iz.prototype.Mb;
    Iz.prototype.getResolution = Iz.prototype.ma;
    Iz.prototype.getResolutions = Iz.prototype.ne;
    Iz.prototype.getTileCoordForCoordAndResolution = Iz.prototype.Wb;
    Iz.prototype.getTileCoordForCoordAndZ = Iz.prototype.cd;
    Iz.prototype.getTileSize = Iz.prototype.na;
    Al.prototype.getOpacity = Al.prototype.ie;
    Al.prototype.getRotateWithView = Al.prototype.Jd;
    Al.prototype.getRotation = Al.prototype.je;
    Al.prototype.getScale = Al.prototype.ke;
    Al.prototype.getSnapToPixel = Al.prototype.Kd;
    Al.prototype.setRotation = Al.prototype.le;
    Al.prototype.setScale = Al.prototype.me;
    Fj.prototype.getOpacity = Fj.prototype.ie;
    Fj.prototype.getRotateWithView = Fj.prototype.Jd;
    Fj.prototype.getRotation = Fj.prototype.je;
    Fj.prototype.getScale = Fj.prototype.ke;
    Fj.prototype.getSnapToPixel = Fj.prototype.Kd;
    Fj.prototype.setRotation = Fj.prototype.le;
    Fj.prototype.setScale = Fj.prototype.me;
    Pz.prototype.getOpacity = Pz.prototype.ie;
    Pz.prototype.getRotateWithView = Pz.prototype.Jd;
    Pz.prototype.getRotation = Pz.prototype.je;
    Pz.prototype.getScale = Pz.prototype.ke;
    Pz.prototype.getSnapToPixel = Pz.prototype.Kd;
    Pz.prototype.setRotation = Pz.prototype.le;
    Pz.prototype.setScale = Pz.prototype.me;
    Bg.prototype.get = Bg.prototype.get;
    Bg.prototype.getKeys = Bg.prototype.C;
    Bg.prototype.getProperties = Bg.prototype.D;
    Bg.prototype.set = Bg.prototype.set;
    Bg.prototype.setProperties = Bg.prototype.t;
    Bg.prototype.unset = Bg.prototype.I;
    Bg.prototype.changed = Bg.prototype.k;
    Bg.prototype.getRevision = Bg.prototype.v;
    Bg.prototype.on = Bg.prototype.r;
    Bg.prototype.once = Bg.prototype.A;
    Bg.prototype.un = Bg.prototype.u;
    Bg.prototype.unByKey = Bg.prototype.B;
    Zg.prototype.getAttributions = Zg.prototype.ea;
    Zg.prototype.getLogo = Zg.prototype.ca;
    Zg.prototype.getProjection = Zg.prototype.fa;
    Zg.prototype.getState = Zg.prototype.ga;
    Zg.prototype.get = Zg.prototype.get;
    Zg.prototype.getKeys = Zg.prototype.C;
    Zg.prototype.getProperties = Zg.prototype.D;
    Zg.prototype.set = Zg.prototype.set;
    Zg.prototype.setProperties = Zg.prototype.t;
    Zg.prototype.unset = Zg.prototype.I;
    Zg.prototype.changed = Zg.prototype.k;
    Zg.prototype.getRevision = Zg.prototype.v;
    Zg.prototype.on = Zg.prototype.r;
    Zg.prototype.once = Zg.prototype.A;
    Zg.prototype.un = Zg.prototype.u;
    Zg.prototype.unByKey = Zg.prototype.B;
    Sy.prototype.getTileGrid = Sy.prototype.ua;
    Sy.prototype.getAttributions = Sy.prototype.ea;
    Sy.prototype.getLogo = Sy.prototype.ca;
    Sy.prototype.getProjection = Sy.prototype.fa;
    Sy.prototype.getState = Sy.prototype.ga;
    Sy.prototype.get = Sy.prototype.get;
    Sy.prototype.getKeys = Sy.prototype.C;
    Sy.prototype.getProperties = Sy.prototype.D;
    Sy.prototype.set = Sy.prototype.set;
    Sy.prototype.setProperties = Sy.prototype.t;
    Sy.prototype.unset = Sy.prototype.I;
    Sy.prototype.changed = Sy.prototype.k;
    Sy.prototype.getRevision = Sy.prototype.v;
    Sy.prototype.on = Sy.prototype.r;
    Sy.prototype.once = Sy.prototype.A;
    Sy.prototype.un = Sy.prototype.u;
    Sy.prototype.unByKey = Sy.prototype.B;
    Vy.prototype.getTileLoadFunction = Vy.prototype.Ua;
    Vy.prototype.getTileUrlFunction = Vy.prototype.Va;
    Vy.prototype.setTileLoadFunction = Vy.prototype.$a;
    Vy.prototype.setTileUrlFunction = Vy.prototype.pa;
    Vy.prototype.getTileGrid = Vy.prototype.ua;
    Vy.prototype.getAttributions = Vy.prototype.ea;
    Vy.prototype.getLogo = Vy.prototype.ca;
    Vy.prototype.getProjection = Vy.prototype.fa;
    Vy.prototype.getState = Vy.prototype.ga;
    Vy.prototype.get = Vy.prototype.get;
    Vy.prototype.getKeys = Vy.prototype.C;
    Vy.prototype.getProperties = Vy.prototype.D;
    Vy.prototype.set = Vy.prototype.set;
    Vy.prototype.setProperties = Vy.prototype.t;
    Vy.prototype.unset = Vy.prototype.I;
    Vy.prototype.changed = Vy.prototype.k;
    Vy.prototype.getRevision = Vy.prototype.v;
    Vy.prototype.on = Vy.prototype.r;
    Vy.prototype.once = Vy.prototype.A;
    Vy.prototype.un = Vy.prototype.u;
    Vy.prototype.unByKey = Vy.prototype.B;
    qp.prototype.getAttributions = qp.prototype.ea;
    qp.prototype.getLogo = qp.prototype.ca;
    qp.prototype.getProjection = qp.prototype.fa;
    qp.prototype.getState = qp.prototype.ga;
    qp.prototype.get = qp.prototype.get;
    qp.prototype.getKeys = qp.prototype.C;
    qp.prototype.getProperties = qp.prototype.D;
    qp.prototype.set = qp.prototype.set;
    qp.prototype.setProperties = qp.prototype.t;
    qp.prototype.unset = qp.prototype.I;
    qp.prototype.changed = qp.prototype.k;
    qp.prototype.getRevision = qp.prototype.v;
    qp.prototype.on = qp.prototype.r;
    qp.prototype.once = qp.prototype.A;
    qp.prototype.un = qp.prototype.u;
    qp.prototype.unByKey = qp.prototype.B;
    Xy.prototype.addFeature = Xy.prototype.jf;
    Xy.prototype.addFeatures = Xy.prototype.Oc;
    Xy.prototype.clear = Xy.prototype.clear;
    Xy.prototype.forEachFeature = Xy.prototype.Rf;
    Xy.prototype.forEachFeatureInExtent = Xy.prototype.$c;
    Xy.prototype.forEachFeatureIntersectingExtent = Xy.prototype.Oe;
    Xy.prototype.getFeatures = Xy.prototype.Dc;
    Xy.prototype.getFeaturesAtCoordinate = Xy.prototype.Re;
    Xy.prototype.getFeaturesInExtent = Xy.prototype.Se;
    Xy.prototype.getClosestFeatureToCoordinate = Xy.prototype.Tf;
    Xy.prototype.getExtent = Xy.prototype.G;
    Xy.prototype.getFeatureById = Xy.prototype.Qe;
    Xy.prototype.removeFeature = Xy.prototype.Qg;
    Xy.prototype.getAttributions = Xy.prototype.ea;
    Xy.prototype.getLogo = Xy.prototype.ca;
    Xy.prototype.getProjection = Xy.prototype.fa;
    Xy.prototype.getState = Xy.prototype.ga;
    Xy.prototype.get = Xy.prototype.get;
    Xy.prototype.getKeys = Xy.prototype.C;
    Xy.prototype.getProperties = Xy.prototype.D;
    Xy.prototype.set = Xy.prototype.set;
    Xy.prototype.setProperties = Xy.prototype.t;
    Xy.prototype.unset = Xy.prototype.I;
    Xy.prototype.changed = Xy.prototype.k;
    Xy.prototype.getRevision = Xy.prototype.v;
    Xy.prototype.on = Xy.prototype.r;
    Xy.prototype.once = Xy.prototype.A;
    Xy.prototype.un = Xy.prototype.u;
    Xy.prototype.unByKey = Xy.prototype.B;
    jn.prototype.getAttributions = jn.prototype.ea;
    jn.prototype.getLogo = jn.prototype.ca;
    jn.prototype.getProjection = jn.prototype.fa;
    jn.prototype.getState = jn.prototype.ga;
    jn.prototype.get = jn.prototype.get;
    jn.prototype.getKeys = jn.prototype.C;
    jn.prototype.getProperties = jn.prototype.D;
    jn.prototype.set = jn.prototype.set;
    jn.prototype.setProperties = jn.prototype.t;
    jn.prototype.unset = jn.prototype.I;
    jn.prototype.changed = jn.prototype.k;
    jn.prototype.getRevision = jn.prototype.v;
    jn.prototype.on = jn.prototype.r;
    jn.prototype.once = jn.prototype.A;
    jn.prototype.un = jn.prototype.u;
    jn.prototype.unByKey = jn.prototype.B;
    qn.prototype.getAttributions = qn.prototype.ea;
    qn.prototype.getLogo = qn.prototype.ca;
    qn.prototype.getProjection = qn.prototype.fa;
    qn.prototype.getState = qn.prototype.ga;
    qn.prototype.get = qn.prototype.get;
    qn.prototype.getKeys = qn.prototype.C;
    qn.prototype.getProperties = qn.prototype.D;
    qn.prototype.set = qn.prototype.set;
    qn.prototype.setProperties = qn.prototype.t;
    qn.prototype.unset = qn.prototype.I;
    qn.prototype.changed = qn.prototype.k;
    qn.prototype.getRevision = qn.prototype.v;
    qn.prototype.on = qn.prototype.r;
    qn.prototype.once = qn.prototype.A;
    qn.prototype.un = qn.prototype.u;
    qn.prototype.unByKey = qn.prototype.B;
    $y.prototype.getAttributions = $y.prototype.ea;
    $y.prototype.getLogo = $y.prototype.ca;
    $y.prototype.getProjection = $y.prototype.fa;
    $y.prototype.getState = $y.prototype.ga;
    $y.prototype.get = $y.prototype.get;
    $y.prototype.getKeys = $y.prototype.C;
    $y.prototype.getProperties = $y.prototype.D;
    $y.prototype.set = $y.prototype.set;
    $y.prototype.setProperties = $y.prototype.t;
    $y.prototype.unset = $y.prototype.I;
    $y.prototype.changed = $y.prototype.k;
    $y.prototype.getRevision = $y.prototype.v;
    $y.prototype.on = $y.prototype.r;
    $y.prototype.once = $y.prototype.A;
    $y.prototype.un = $y.prototype.u;
    $y.prototype.unByKey = $y.prototype.B;
    az.prototype.getAttributions = az.prototype.ea;
    az.prototype.getLogo = az.prototype.ca;
    az.prototype.getProjection = az.prototype.fa;
    az.prototype.getState = az.prototype.ga;
    az.prototype.get = az.prototype.get;
    az.prototype.getKeys = az.prototype.C;
    az.prototype.getProperties = az.prototype.D;
    az.prototype.set = az.prototype.set;
    az.prototype.setProperties = az.prototype.t;
    az.prototype.unset = az.prototype.I;
    az.prototype.changed = az.prototype.k;
    az.prototype.getRevision = az.prototype.v;
    az.prototype.on = az.prototype.r;
    az.prototype.once = az.prototype.A;
    az.prototype.un = az.prototype.u;
    az.prototype.unByKey = az.prototype.B;
    xp.prototype.getAttributions = xp.prototype.ea;
    xp.prototype.getLogo = xp.prototype.ca;
    xp.prototype.getProjection = xp.prototype.fa;
    xp.prototype.getState = xp.prototype.ga;
    xp.prototype.get = xp.prototype.get;
    xp.prototype.getKeys = xp.prototype.C;
    xp.prototype.getProperties = xp.prototype.D;
    xp.prototype.set = xp.prototype.set;
    xp.prototype.setProperties = xp.prototype.t;
    xp.prototype.unset = xp.prototype.I;
    xp.prototype.changed = xp.prototype.k;
    xp.prototype.getRevision = xp.prototype.v;
    xp.prototype.on = xp.prototype.r;
    xp.prototype.once = xp.prototype.A;
    xp.prototype.un = xp.prototype.u;
    xp.prototype.unByKey = xp.prototype.B;
    bz.prototype.getAttributions = bz.prototype.ea;
    bz.prototype.getLogo = bz.prototype.ca;
    bz.prototype.getProjection = bz.prototype.fa;
    bz.prototype.getState = bz.prototype.ga;
    bz.prototype.get = bz.prototype.get;
    bz.prototype.getKeys = bz.prototype.C;
    bz.prototype.getProperties = bz.prototype.D;
    bz.prototype.set = bz.prototype.set;
    bz.prototype.setProperties = bz.prototype.t;
    bz.prototype.unset = bz.prototype.I;
    bz.prototype.changed = bz.prototype.k;
    bz.prototype.getRevision = bz.prototype.v;
    bz.prototype.on = bz.prototype.r;
    bz.prototype.once = bz.prototype.A;
    bz.prototype.un = bz.prototype.u;
    bz.prototype.unByKey = bz.prototype.B;
    fz.prototype.getTileLoadFunction = fz.prototype.Ua;
    fz.prototype.getTileUrlFunction = fz.prototype.Va;
    fz.prototype.setTileLoadFunction = fz.prototype.$a;
    fz.prototype.getTileGrid = fz.prototype.ua;
    fz.prototype.getAttributions = fz.prototype.ea;
    fz.prototype.getLogo = fz.prototype.ca;
    fz.prototype.getProjection = fz.prototype.fa;
    fz.prototype.getState = fz.prototype.ga;
    fz.prototype.get = fz.prototype.get;
    fz.prototype.getKeys = fz.prototype.C;
    fz.prototype.getProperties = fz.prototype.D;
    fz.prototype.set = fz.prototype.set;
    fz.prototype.setProperties = fz.prototype.t;
    fz.prototype.unset = fz.prototype.I;
    fz.prototype.changed = fz.prototype.k;
    fz.prototype.getRevision = fz.prototype.v;
    fz.prototype.on = fz.prototype.r;
    fz.prototype.once = fz.prototype.A;
    fz.prototype.un = fz.prototype.u;
    fz.prototype.unByKey = fz.prototype.B;
    iz.prototype.setTileUrlFunction = iz.prototype.pa;
    iz.prototype.setUrl = iz.prototype.e;
    iz.prototype.getTileLoadFunction = iz.prototype.Ua;
    iz.prototype.getTileUrlFunction = iz.prototype.Va;
    iz.prototype.setTileLoadFunction = iz.prototype.$a;
    iz.prototype.getTileGrid = iz.prototype.ua;
    iz.prototype.getAttributions = iz.prototype.ea;
    iz.prototype.getLogo = iz.prototype.ca;
    iz.prototype.getProjection = iz.prototype.fa;
    iz.prototype.getState = iz.prototype.ga;
    iz.prototype.get = iz.prototype.get;
    iz.prototype.getKeys = iz.prototype.C;
    iz.prototype.getProperties = iz.prototype.D;
    iz.prototype.set = iz.prototype.set;
    iz.prototype.setProperties = iz.prototype.t;
    iz.prototype.unset = iz.prototype.I;
    iz.prototype.changed = iz.prototype.k;
    iz.prototype.getRevision = iz.prototype.v;
    iz.prototype.on = iz.prototype.r;
    iz.prototype.once = iz.prototype.A;
    iz.prototype.un = iz.prototype.u;
    iz.prototype.unByKey = iz.prototype.B;
    gz.prototype.setTileUrlFunction = gz.prototype.pa;
    gz.prototype.setUrl = gz.prototype.e;
    gz.prototype.getTileLoadFunction = gz.prototype.Ua;
    gz.prototype.getTileUrlFunction = gz.prototype.Va;
    gz.prototype.setTileLoadFunction = gz.prototype.$a;
    gz.prototype.getTileGrid = gz.prototype.ua;
    gz.prototype.getAttributions = gz.prototype.ea;
    gz.prototype.getLogo = gz.prototype.ca;
    gz.prototype.getProjection = gz.prototype.fa;
    gz.prototype.getState = gz.prototype.ga;
    gz.prototype.get = gz.prototype.get;
    gz.prototype.getKeys = gz.prototype.C;
    gz.prototype.getProperties = gz.prototype.D;
    gz.prototype.set = gz.prototype.set;
    gz.prototype.setProperties = gz.prototype.t;
    gz.prototype.unset = gz.prototype.I;
    gz.prototype.changed = gz.prototype.k;
    gz.prototype.getRevision = gz.prototype.v;
    gz.prototype.on = gz.prototype.r;
    gz.prototype.once = gz.prototype.A;
    gz.prototype.un = gz.prototype.u;
    gz.prototype.unByKey = gz.prototype.B;
    nz.prototype.setTileUrlFunction = nz.prototype.pa;
    nz.prototype.setUrl = nz.prototype.e;
    nz.prototype.getTileLoadFunction = nz.prototype.Ua;
    nz.prototype.getTileUrlFunction = nz.prototype.Va;
    nz.prototype.setTileLoadFunction = nz.prototype.$a;
    nz.prototype.getTileGrid = nz.prototype.ua;
    nz.prototype.getAttributions = nz.prototype.ea;
    nz.prototype.getLogo = nz.prototype.ca;
    nz.prototype.getProjection = nz.prototype.fa;
    nz.prototype.getState = nz.prototype.ga;
    nz.prototype.get = nz.prototype.get;
    nz.prototype.getKeys = nz.prototype.C;
    nz.prototype.getProperties = nz.prototype.D;
    nz.prototype.set = nz.prototype.set;
    nz.prototype.setProperties = nz.prototype.t;
    nz.prototype.unset = nz.prototype.I;
    nz.prototype.changed = nz.prototype.k;
    nz.prototype.getRevision = nz.prototype.v;
    nz.prototype.on = nz.prototype.r;
    nz.prototype.once = nz.prototype.A;
    nz.prototype.un = nz.prototype.u;
    nz.prototype.unByKey = nz.prototype.B;
    pz.prototype.getTileLoadFunction = pz.prototype.Ua;
    pz.prototype.getTileUrlFunction = pz.prototype.Va;
    pz.prototype.setTileLoadFunction = pz.prototype.$a;
    pz.prototype.setTileUrlFunction = pz.prototype.pa;
    pz.prototype.getTileGrid = pz.prototype.ua;
    pz.prototype.getAttributions = pz.prototype.ea;
    pz.prototype.getLogo = pz.prototype.ca;
    pz.prototype.getProjection = pz.prototype.fa;
    pz.prototype.getState = pz.prototype.ga;
    pz.prototype.get = pz.prototype.get;
    pz.prototype.getKeys = pz.prototype.C;
    pz.prototype.getProperties = pz.prototype.D;
    pz.prototype.set = pz.prototype.set;
    pz.prototype.setProperties = pz.prototype.t;
    pz.prototype.unset = pz.prototype.I;
    pz.prototype.changed = pz.prototype.k;
    pz.prototype.getRevision = pz.prototype.v;
    pz.prototype.on = pz.prototype.r;
    pz.prototype.once = pz.prototype.A;
    pz.prototype.un = pz.prototype.u;
    pz.prototype.unByKey = pz.prototype.B;
    rz.prototype.getTileGrid = rz.prototype.ua;
    rz.prototype.getAttributions = rz.prototype.ea;
    rz.prototype.getLogo = rz.prototype.ca;
    rz.prototype.getProjection = rz.prototype.fa;
    rz.prototype.getState = rz.prototype.ga;
    rz.prototype.get = rz.prototype.get;
    rz.prototype.getKeys = rz.prototype.C;
    rz.prototype.getProperties = rz.prototype.D;
    rz.prototype.set = rz.prototype.set;
    rz.prototype.setProperties = rz.prototype.t;
    rz.prototype.unset = rz.prototype.I;
    rz.prototype.changed = rz.prototype.k;
    rz.prototype.getRevision = rz.prototype.v;
    rz.prototype.on = rz.prototype.r;
    rz.prototype.once = rz.prototype.A;
    rz.prototype.un = rz.prototype.u;
    rz.prototype.unByKey = rz.prototype.B;
    sz.prototype.getTileLoadFunction = sz.prototype.Ua;
    sz.prototype.getTileUrlFunction = sz.prototype.Va;
    sz.prototype.setTileLoadFunction = sz.prototype.$a;
    sz.prototype.setTileUrlFunction = sz.prototype.pa;
    sz.prototype.getTileGrid = sz.prototype.ua;
    sz.prototype.getAttributions = sz.prototype.ea;
    sz.prototype.getLogo = sz.prototype.ca;
    sz.prototype.getProjection = sz.prototype.fa;
    sz.prototype.getState = sz.prototype.ga;
    sz.prototype.get = sz.prototype.get;
    sz.prototype.getKeys = sz.prototype.C;
    sz.prototype.getProperties = sz.prototype.D;
    sz.prototype.set = sz.prototype.set;
    sz.prototype.setProperties = sz.prototype.t;
    sz.prototype.unset = sz.prototype.I;
    sz.prototype.changed = sz.prototype.k;
    sz.prototype.getRevision = sz.prototype.v;
    sz.prototype.on = sz.prototype.r;
    sz.prototype.once = sz.prototype.A;
    sz.prototype.un = sz.prototype.u;
    sz.prototype.unByKey = sz.prototype.B;
    tz.prototype.getTileGrid = tz.prototype.ua;
    tz.prototype.getAttributions = tz.prototype.ea;
    tz.prototype.getLogo = tz.prototype.ca;
    tz.prototype.getProjection = tz.prototype.fa;
    tz.prototype.getState = tz.prototype.ga;
    tz.prototype.get = tz.prototype.get;
    tz.prototype.getKeys = tz.prototype.C;
    tz.prototype.getProperties = tz.prototype.D;
    tz.prototype.set = tz.prototype.set;
    tz.prototype.setProperties = tz.prototype.t;
    tz.prototype.unset = tz.prototype.I;
    tz.prototype.changed = tz.prototype.k;
    tz.prototype.getRevision = tz.prototype.v;
    tz.prototype.on = tz.prototype.r;
    tz.prototype.once = tz.prototype.A;
    tz.prototype.un = tz.prototype.u;
    tz.prototype.unByKey = tz.prototype.B;
    yz.prototype.forEachFeatureIntersectingExtent = yz.prototype.Oe;
    yz.prototype.getFeaturesAtCoordinate = yz.prototype.Re;
    yz.prototype.getFeatureById = yz.prototype.Qe;
    yz.prototype.getAttributions = yz.prototype.ea;
    yz.prototype.getLogo = yz.prototype.ca;
    yz.prototype.getProjection = yz.prototype.fa;
    yz.prototype.getState = yz.prototype.ga;
    yz.prototype.get = yz.prototype.get;
    yz.prototype.getKeys = yz.prototype.C;
    yz.prototype.getProperties = yz.prototype.D;
    yz.prototype.set = yz.prototype.set;
    yz.prototype.setProperties = yz.prototype.t;
    yz.prototype.unset = yz.prototype.I;
    yz.prototype.changed = yz.prototype.k;
    yz.prototype.getRevision = yz.prototype.v;
    yz.prototype.on = yz.prototype.r;
    yz.prototype.once = yz.prototype.A;
    yz.prototype.un = yz.prototype.u;
    yz.prototype.unByKey = yz.prototype.B;
    Az.prototype.getTileLoadFunction = Az.prototype.Ua;
    Az.prototype.getTileUrlFunction = Az.prototype.Va;
    Az.prototype.setTileLoadFunction = Az.prototype.$a;
    Az.prototype.setTileUrlFunction = Az.prototype.pa;
    Az.prototype.getTileGrid = Az.prototype.ua;
    Az.prototype.getAttributions = Az.prototype.ea;
    Az.prototype.getLogo = Az.prototype.ca;
    Az.prototype.getProjection = Az.prototype.fa;
    Az.prototype.getState = Az.prototype.ga;
    Az.prototype.get = Az.prototype.get;
    Az.prototype.getKeys = Az.prototype.C;
    Az.prototype.getProperties = Az.prototype.D;
    Az.prototype.set = Az.prototype.set;
    Az.prototype.setProperties = Az.prototype.t;
    Az.prototype.unset = Az.prototype.I;
    Az.prototype.changed = Az.prototype.k;
    Az.prototype.getRevision = Az.prototype.v;
    Az.prototype.on = Az.prototype.r;
    Az.prototype.once = Az.prototype.A;
    Az.prototype.un = Az.prototype.u;
    Az.prototype.unByKey = Az.prototype.B;
    Gz.prototype.getTileLoadFunction = Gz.prototype.Ua;
    Gz.prototype.getTileUrlFunction = Gz.prototype.Va;
    Gz.prototype.setTileLoadFunction = Gz.prototype.$a;
    Gz.prototype.setTileUrlFunction = Gz.prototype.pa;
    Gz.prototype.getTileGrid = Gz.prototype.ua;
    Gz.prototype.getAttributions = Gz.prototype.ea;
    Gz.prototype.getLogo = Gz.prototype.ca;
    Gz.prototype.getProjection = Gz.prototype.fa;
    Gz.prototype.getState = Gz.prototype.ga;
    Gz.prototype.get = Gz.prototype.get;
    Gz.prototype.getKeys = Gz.prototype.C;
    Gz.prototype.getProperties = Gz.prototype.D;
    Gz.prototype.set = Gz.prototype.set;
    Gz.prototype.setProperties = Gz.prototype.t;
    Gz.prototype.unset = Gz.prototype.I;
    Gz.prototype.changed = Gz.prototype.k;
    Gz.prototype.getRevision = Gz.prototype.v;
    Gz.prototype.on = Gz.prototype.r;
    Gz.prototype.once = Gz.prototype.A;
    Gz.prototype.un = Gz.prototype.u;
    Gz.prototype.unByKey = Gz.prototype.B;
    Jz.prototype.getTileLoadFunction = Jz.prototype.Ua;
    Jz.prototype.getTileUrlFunction = Jz.prototype.Va;
    Jz.prototype.setTileLoadFunction = Jz.prototype.$a;
    Jz.prototype.setTileUrlFunction = Jz.prototype.pa;
    Jz.prototype.getTileGrid = Jz.prototype.ua;
    Jz.prototype.getAttributions = Jz.prototype.ea;
    Jz.prototype.getLogo = Jz.prototype.ca;
    Jz.prototype.getProjection = Jz.prototype.fa;
    Jz.prototype.getState = Jz.prototype.ga;
    Jz.prototype.get = Jz.prototype.get;
    Jz.prototype.getKeys = Jz.prototype.C;
    Jz.prototype.getProperties = Jz.prototype.D;
    Jz.prototype.set = Jz.prototype.set;
    Jz.prototype.setProperties = Jz.prototype.t;
    Jz.prototype.unset = Jz.prototype.I;
    Jz.prototype.changed = Jz.prototype.k;
    Jz.prototype.getRevision = Jz.prototype.v;
    Jz.prototype.on = Jz.prototype.r;
    Jz.prototype.once = Jz.prototype.A;
    Jz.prototype.un = Jz.prototype.u;
    Jz.prototype.unByKey = Jz.prototype.B;
    uj.prototype.changed = uj.prototype.k;
    uj.prototype.getRevision = uj.prototype.v;
    uj.prototype.on = uj.prototype.r;
    uj.prototype.once = uj.prototype.A;
    uj.prototype.un = uj.prototype.u;
    uj.prototype.unByKey = uj.prototype.B;
    zq.prototype.changed = zq.prototype.k;
    zq.prototype.getRevision = zq.prototype.v;
    zq.prototype.on = zq.prototype.r;
    zq.prototype.once = zq.prototype.A;
    zq.prototype.un = zq.prototype.u;
    zq.prototype.unByKey = zq.prototype.B;
    Cq.prototype.changed = Cq.prototype.k;
    Cq.prototype.getRevision = Cq.prototype.v;
    Cq.prototype.on = Cq.prototype.r;
    Cq.prototype.once = Cq.prototype.A;
    Cq.prototype.un = Cq.prototype.u;
    Cq.prototype.unByKey = Cq.prototype.B;
    Iq.prototype.changed = Iq.prototype.k;
    Iq.prototype.getRevision = Iq.prototype.v;
    Iq.prototype.on = Iq.prototype.r;
    Iq.prototype.once = Iq.prototype.A;
    Iq.prototype.un = Iq.prototype.u;
    Iq.prototype.unByKey = Iq.prototype.B;
    Kq.prototype.changed = Kq.prototype.k;
    Kq.prototype.getRevision = Kq.prototype.v;
    Kq.prototype.on = Kq.prototype.r;
    Kq.prototype.once = Kq.prototype.A;
    Kq.prototype.un = Kq.prototype.u;
    Kq.prototype.unByKey = Kq.prototype.B;
    Ep.prototype.changed = Ep.prototype.k;
    Ep.prototype.getRevision = Ep.prototype.v;
    Ep.prototype.on = Ep.prototype.r;
    Ep.prototype.once = Ep.prototype.A;
    Ep.prototype.un = Ep.prototype.u;
    Ep.prototype.unByKey = Ep.prototype.B;
    Fp.prototype.changed = Fp.prototype.k;
    Fp.prototype.getRevision = Fp.prototype.v;
    Fp.prototype.on = Fp.prototype.r;
    Fp.prototype.once = Fp.prototype.A;
    Fp.prototype.un = Fp.prototype.u;
    Fp.prototype.unByKey = Fp.prototype.B;
    Gp.prototype.changed = Gp.prototype.k;
    Gp.prototype.getRevision = Gp.prototype.v;
    Gp.prototype.on = Gp.prototype.r;
    Gp.prototype.once = Gp.prototype.A;
    Gp.prototype.un = Gp.prototype.u;
    Gp.prototype.unByKey = Gp.prototype.B;
    Ip.prototype.changed = Ip.prototype.k;
    Ip.prototype.getRevision = Ip.prototype.v;
    Ip.prototype.on = Ip.prototype.r;
    Ip.prototype.once = Ip.prototype.A;
    Ip.prototype.un = Ip.prototype.u;
    Ip.prototype.unByKey = Ip.prototype.B;
    Km.prototype.changed = Km.prototype.k;
    Km.prototype.getRevision = Km.prototype.v;
    Km.prototype.on = Km.prototype.r;
    Km.prototype.once = Km.prototype.A;
    Km.prototype.un = Km.prototype.u;
    Km.prototype.unByKey = Km.prototype.B;
    zp.prototype.changed = zp.prototype.k;
    zp.prototype.getRevision = zp.prototype.v;
    zp.prototype.on = zp.prototype.r;
    zp.prototype.once = zp.prototype.A;
    zp.prototype.un = zp.prototype.u;
    zp.prototype.unByKey = zp.prototype.B;
    Ap.prototype.changed = Ap.prototype.k;
    Ap.prototype.getRevision = Ap.prototype.v;
    Ap.prototype.on = Ap.prototype.r;
    Ap.prototype.once = Ap.prototype.A;
    Ap.prototype.un = Ap.prototype.u;
    Ap.prototype.unByKey = Ap.prototype.B;
    Bp.prototype.changed = Bp.prototype.k;
    Bp.prototype.getRevision = Bp.prototype.v;
    Bp.prototype.on = Bp.prototype.r;
    Bp.prototype.once = Bp.prototype.A;
    Bp.prototype.un = Bp.prototype.u;
    Bp.prototype.unByKey = Bp.prototype.B;
    mj.prototype.get = mj.prototype.get;
    mj.prototype.getKeys = mj.prototype.C;
    mj.prototype.getProperties = mj.prototype.D;
    mj.prototype.set = mj.prototype.set;
    mj.prototype.setProperties = mj.prototype.t;
    mj.prototype.unset = mj.prototype.I;
    mj.prototype.changed = mj.prototype.k;
    mj.prototype.getRevision = mj.prototype.v;
    mj.prototype.on = mj.prototype.r;
    mj.prototype.once = mj.prototype.A;
    mj.prototype.un = mj.prototype.u;
    mj.prototype.unByKey = mj.prototype.B;
    C.prototype.getBrightness = C.prototype.Bb;
    C.prototype.getContrast = C.prototype.Cb;
    C.prototype.getHue = C.prototype.Db;
    C.prototype.getExtent = C.prototype.G;
    C.prototype.getMaxResolution = C.prototype.Eb;
    C.prototype.getMinResolution = C.prototype.Fb;
    C.prototype.getOpacity = C.prototype.Kb;
    C.prototype.getSaturation = C.prototype.Gb;
    C.prototype.getVisible = C.prototype.eb;
    C.prototype.setBrightness = C.prototype.gc;
    C.prototype.setContrast = C.prototype.hc;
    C.prototype.setHue = C.prototype.ic;
    C.prototype.setExtent = C.prototype.bc;
    C.prototype.setMaxResolution = C.prototype.jc;
    C.prototype.setMinResolution = C.prototype.kc;
    C.prototype.setOpacity = C.prototype.cc;
    C.prototype.setSaturation = C.prototype.lc;
    C.prototype.setVisible = C.prototype.mc;
    C.prototype.get = C.prototype.get;
    C.prototype.getKeys = C.prototype.C;
    C.prototype.getProperties = C.prototype.D;
    C.prototype.set = C.prototype.set;
    C.prototype.setProperties = C.prototype.t;
    C.prototype.unset = C.prototype.I;
    C.prototype.changed = C.prototype.k;
    C.prototype.getRevision = C.prototype.v;
    C.prototype.on = C.prototype.r;
    C.prototype.once = C.prototype.A;
    C.prototype.un = C.prototype.u;
    C.prototype.unByKey = C.prototype.B;
    M.prototype.setSource = M.prototype.Jc;
    M.prototype.getBrightness = M.prototype.Bb;
    M.prototype.getContrast = M.prototype.Cb;
    M.prototype.getHue = M.prototype.Db;
    M.prototype.getExtent = M.prototype.G;
    M.prototype.getMaxResolution = M.prototype.Eb;
    M.prototype.getMinResolution = M.prototype.Fb;
    M.prototype.getOpacity = M.prototype.Kb;
    M.prototype.getSaturation = M.prototype.Gb;
    M.prototype.getVisible = M.prototype.eb;
    M.prototype.setBrightness = M.prototype.gc;
    M.prototype.setContrast = M.prototype.hc;
    M.prototype.setHue = M.prototype.ic;
    M.prototype.setExtent = M.prototype.bc;
    M.prototype.setMaxResolution = M.prototype.jc;
    M.prototype.setMinResolution = M.prototype.kc;
    M.prototype.setOpacity = M.prototype.cc;
    M.prototype.setSaturation = M.prototype.lc;
    M.prototype.setVisible = M.prototype.mc;
    M.prototype.get = M.prototype.get;
    M.prototype.getKeys = M.prototype.C;
    M.prototype.getProperties = M.prototype.D;
    M.prototype.set = M.prototype.set;
    M.prototype.setProperties = M.prototype.t;
    M.prototype.unset = M.prototype.I;
    M.prototype.changed = M.prototype.k;
    M.prototype.getRevision = M.prototype.v;
    M.prototype.on = M.prototype.r;
    M.prototype.once = M.prototype.A;
    M.prototype.un = M.prototype.u;
    M.prototype.unByKey = M.prototype.B;
    Z.prototype.getSource = Z.prototype.da;
    Z.prototype.getStyle = Z.prototype.H;
    Z.prototype.getStyleFunction = Z.prototype.J;
    Z.prototype.setStyle = Z.prototype.e;
    Z.prototype.setSource = Z.prototype.Jc;
    Z.prototype.getBrightness = Z.prototype.Bb;
    Z.prototype.getContrast = Z.prototype.Cb;
    Z.prototype.getHue = Z.prototype.Db;
    Z.prototype.getExtent = Z.prototype.G;
    Z.prototype.getMaxResolution = Z.prototype.Eb;
    Z.prototype.getMinResolution = Z.prototype.Fb;
    Z.prototype.getOpacity = Z.prototype.Kb;
    Z.prototype.getSaturation = Z.prototype.Gb;
    Z.prototype.getVisible = Z.prototype.eb;
    Z.prototype.setBrightness = Z.prototype.gc;
    Z.prototype.setContrast = Z.prototype.hc;
    Z.prototype.setHue = Z.prototype.ic;
    Z.prototype.setExtent = Z.prototype.bc;
    Z.prototype.setMaxResolution = Z.prototype.jc;
    Z.prototype.setMinResolution = Z.prototype.kc;
    Z.prototype.setOpacity = Z.prototype.cc;
    Z.prototype.setSaturation = Z.prototype.lc;
    Z.prototype.setVisible = Z.prototype.mc;
    Z.prototype.get = Z.prototype.get;
    Z.prototype.getKeys = Z.prototype.C;
    Z.prototype.getProperties = Z.prototype.D;
    Z.prototype.set = Z.prototype.set;
    Z.prototype.setProperties = Z.prototype.t;
    Z.prototype.unset = Z.prototype.I;
    Z.prototype.changed = Z.prototype.k;
    Z.prototype.getRevision = Z.prototype.v;
    Z.prototype.on = Z.prototype.r;
    Z.prototype.once = Z.prototype.A;
    Z.prototype.un = Z.prototype.u;
    Z.prototype.unByKey = Z.prototype.B;
    I.prototype.setSource = I.prototype.Jc;
    I.prototype.getBrightness = I.prototype.Bb;
    I.prototype.getContrast = I.prototype.Cb;
    I.prototype.getHue = I.prototype.Db;
    I.prototype.getExtent = I.prototype.G;
    I.prototype.getMaxResolution = I.prototype.Eb;
    I.prototype.getMinResolution = I.prototype.Fb;
    I.prototype.getOpacity = I.prototype.Kb;
    I.prototype.getSaturation = I.prototype.Gb;
    I.prototype.getVisible = I.prototype.eb;
    I.prototype.setBrightness = I.prototype.gc;
    I.prototype.setContrast = I.prototype.hc;
    I.prototype.setHue = I.prototype.ic;
    I.prototype.setExtent = I.prototype.bc;
    I.prototype.setMaxResolution = I.prototype.jc;
    I.prototype.setMinResolution = I.prototype.kc;
    I.prototype.setOpacity = I.prototype.cc;
    I.prototype.setSaturation = I.prototype.lc;
    I.prototype.setVisible = I.prototype.mc;
    I.prototype.get = I.prototype.get;
    I.prototype.getKeys = I.prototype.C;
    I.prototype.getProperties = I.prototype.D;
    I.prototype.set = I.prototype.set;
    I.prototype.setProperties = I.prototype.t;
    I.prototype.unset = I.prototype.I;
    I.prototype.changed = I.prototype.k;
    I.prototype.getRevision = I.prototype.v;
    I.prototype.on = I.prototype.r;
    I.prototype.once = I.prototype.A;
    I.prototype.un = I.prototype.u;
    I.prototype.unByKey = I.prototype.B;
    G.prototype.getBrightness = G.prototype.Bb;
    G.prototype.getContrast = G.prototype.Cb;
    G.prototype.getHue = G.prototype.Db;
    G.prototype.getExtent = G.prototype.G;
    G.prototype.getMaxResolution = G.prototype.Eb;
    G.prototype.getMinResolution = G.prototype.Fb;
    G.prototype.getOpacity = G.prototype.Kb;
    G.prototype.getSaturation = G.prototype.Gb;
    G.prototype.getVisible = G.prototype.eb;
    G.prototype.setBrightness = G.prototype.gc;
    G.prototype.setContrast = G.prototype.hc;
    G.prototype.setHue = G.prototype.ic;
    G.prototype.setExtent = G.prototype.bc;
    G.prototype.setMaxResolution = G.prototype.jc;
    G.prototype.setMinResolution = G.prototype.kc;
    G.prototype.setOpacity = G.prototype.cc;
    G.prototype.setSaturation = G.prototype.lc;
    G.prototype.setVisible = G.prototype.mc;
    G.prototype.get = G.prototype.get;
    G.prototype.getKeys = G.prototype.C;
    G.prototype.getProperties = G.prototype.D;
    G.prototype.set = G.prototype.set;
    G.prototype.setProperties = G.prototype.t;
    G.prototype.unset = G.prototype.I;
    G.prototype.changed = G.prototype.k;
    G.prototype.getRevision = G.prototype.v;
    G.prototype.on = G.prototype.r;
    G.prototype.once = G.prototype.A;
    G.prototype.un = G.prototype.u;
    G.prototype.unByKey = G.prototype.B;
    L.prototype.setSource = L.prototype.Jc;
    L.prototype.getBrightness = L.prototype.Bb;
    L.prototype.getContrast = L.prototype.Cb;
    L.prototype.getHue = L.prototype.Db;
    L.prototype.getExtent = L.prototype.G;
    L.prototype.getMaxResolution = L.prototype.Eb;
    L.prototype.getMinResolution = L.prototype.Fb;
    L.prototype.getOpacity = L.prototype.Kb;
    L.prototype.getSaturation = L.prototype.Gb;
    L.prototype.getVisible = L.prototype.eb;
    L.prototype.setBrightness = L.prototype.gc;
    L.prototype.setContrast = L.prototype.hc;
    L.prototype.setHue = L.prototype.ic;
    L.prototype.setExtent = L.prototype.bc;
    L.prototype.setMaxResolution = L.prototype.jc;
    L.prototype.setMinResolution = L.prototype.kc;
    L.prototype.setOpacity = L.prototype.cc;
    L.prototype.setSaturation = L.prototype.lc;
    L.prototype.setVisible = L.prototype.mc;
    L.prototype.get = L.prototype.get;
    L.prototype.getKeys = L.prototype.C;
    L.prototype.getProperties = L.prototype.D;
    L.prototype.set = L.prototype.set;
    L.prototype.setProperties = L.prototype.t;
    L.prototype.unset = L.prototype.I;
    L.prototype.changed = L.prototype.k;
    L.prototype.getRevision = L.prototype.v;
    L.prototype.on = L.prototype.r;
    L.prototype.once = L.prototype.A;
    L.prototype.un = L.prototype.u;
    L.prototype.unByKey = L.prototype.B;
    Wj.prototype.get = Wj.prototype.get;
    Wj.prototype.getKeys = Wj.prototype.C;
    Wj.prototype.getProperties = Wj.prototype.D;
    Wj.prototype.set = Wj.prototype.set;
    Wj.prototype.setProperties = Wj.prototype.t;
    Wj.prototype.unset = Wj.prototype.I;
    Wj.prototype.changed = Wj.prototype.k;
    Wj.prototype.getRevision = Wj.prototype.v;
    Wj.prototype.on = Wj.prototype.r;
    Wj.prototype.once = Wj.prototype.A;
    Wj.prototype.un = Wj.prototype.u;
    Wj.prototype.unByKey = Wj.prototype.B;
    ak.prototype.getActive = ak.prototype.c;
    ak.prototype.setActive = ak.prototype.d;
    ak.prototype.get = ak.prototype.get;
    ak.prototype.getKeys = ak.prototype.C;
    ak.prototype.getProperties = ak.prototype.D;
    ak.prototype.set = ak.prototype.set;
    ak.prototype.setProperties = ak.prototype.t;
    ak.prototype.unset = ak.prototype.I;
    ak.prototype.changed = ak.prototype.k;
    ak.prototype.getRevision = ak.prototype.v;
    ak.prototype.on = ak.prototype.r;
    ak.prototype.once = ak.prototype.A;
    ak.prototype.un = ak.prototype.u;
    ak.prototype.unByKey = ak.prototype.B;
    Kx.prototype.getActive = Kx.prototype.c;
    Kx.prototype.setActive = Kx.prototype.d;
    Kx.prototype.get = Kx.prototype.get;
    Kx.prototype.getKeys = Kx.prototype.C;
    Kx.prototype.getProperties = Kx.prototype.D;
    Kx.prototype.set = Kx.prototype.set;
    Kx.prototype.setProperties = Kx.prototype.t;
    Kx.prototype.unset = Kx.prototype.I;
    Kx.prototype.changed = Kx.prototype.k;
    Kx.prototype.getRevision = Kx.prototype.v;
    Kx.prototype.on = Kx.prototype.r;
    Kx.prototype.once = Kx.prototype.A;
    Kx.prototype.un = Kx.prototype.u;
    Kx.prototype.unByKey = Kx.prototype.B;
    jk.prototype.getActive = jk.prototype.c;
    jk.prototype.setActive = jk.prototype.d;
    jk.prototype.get = jk.prototype.get;
    jk.prototype.getKeys = jk.prototype.C;
    jk.prototype.getProperties = jk.prototype.D;
    jk.prototype.set = jk.prototype.set;
    jk.prototype.setProperties = jk.prototype.t;
    jk.prototype.unset = jk.prototype.I;
    jk.prototype.changed = jk.prototype.k;
    jk.prototype.getRevision = jk.prototype.v;
    jk.prototype.on = jk.prototype.r;
    jk.prototype.once = jk.prototype.A;
    jk.prototype.un = jk.prototype.u;
    jk.prototype.unByKey = jk.prototype.B;
    nl.prototype.getActive = nl.prototype.c;
    nl.prototype.setActive = nl.prototype.d;
    nl.prototype.get = nl.prototype.get;
    nl.prototype.getKeys = nl.prototype.C;
    nl.prototype.getProperties = nl.prototype.D;
    nl.prototype.set = nl.prototype.set;
    nl.prototype.setProperties = nl.prototype.t;
    nl.prototype.unset = nl.prototype.I;
    nl.prototype.changed = nl.prototype.k;
    nl.prototype.getRevision = nl.prototype.v;
    nl.prototype.on = nl.prototype.r;
    nl.prototype.once = nl.prototype.A;
    nl.prototype.un = nl.prototype.u;
    nl.prototype.unByKey = nl.prototype.B;
    mk.prototype.getActive = mk.prototype.c;
    mk.prototype.setActive = mk.prototype.d;
    mk.prototype.get = mk.prototype.get;
    mk.prototype.getKeys = mk.prototype.C;
    mk.prototype.getProperties = mk.prototype.D;
    mk.prototype.set = mk.prototype.set;
    mk.prototype.setProperties = mk.prototype.t;
    mk.prototype.unset = mk.prototype.I;
    mk.prototype.changed = mk.prototype.k;
    mk.prototype.getRevision = mk.prototype.v;
    mk.prototype.on = mk.prototype.r;
    mk.prototype.once = mk.prototype.A;
    mk.prototype.un = mk.prototype.u;
    mk.prototype.unByKey = mk.prototype.B;
    Ox.prototype.getActive = Ox.prototype.c;
    Ox.prototype.setActive = Ox.prototype.d;
    Ox.prototype.get = Ox.prototype.get;
    Ox.prototype.getKeys = Ox.prototype.C;
    Ox.prototype.getProperties = Ox.prototype.D;
    Ox.prototype.set = Ox.prototype.set;
    Ox.prototype.setProperties = Ox.prototype.t;
    Ox.prototype.unset = Ox.prototype.I;
    Ox.prototype.changed = Ox.prototype.k;
    Ox.prototype.getRevision = Ox.prototype.v;
    Ox.prototype.on = Ox.prototype.r;
    Ox.prototype.once = Ox.prototype.A;
    Ox.prototype.un = Ox.prototype.u;
    Ox.prototype.unByKey = Ox.prototype.B;
    qk.prototype.getActive = qk.prototype.c;
    qk.prototype.setActive = qk.prototype.d;
    qk.prototype.get = qk.prototype.get;
    qk.prototype.getKeys = qk.prototype.C;
    qk.prototype.getProperties = qk.prototype.D;
    qk.prototype.set = qk.prototype.set;
    qk.prototype.setProperties = qk.prototype.t;
    qk.prototype.unset = qk.prototype.I;
    qk.prototype.changed = qk.prototype.k;
    qk.prototype.getRevision = qk.prototype.v;
    qk.prototype.on = qk.prototype.r;
    qk.prototype.once = qk.prototype.A;
    qk.prototype.un = qk.prototype.u;
    qk.prototype.unByKey = qk.prototype.B;
    Gl.prototype.getGeometry = Gl.prototype.Q;
    Gl.prototype.getActive = Gl.prototype.c;
    Gl.prototype.setActive = Gl.prototype.d;
    Gl.prototype.get = Gl.prototype.get;
    Gl.prototype.getKeys = Gl.prototype.C;
    Gl.prototype.getProperties = Gl.prototype.D;
    Gl.prototype.set = Gl.prototype.set;
    Gl.prototype.setProperties = Gl.prototype.t;
    Gl.prototype.unset = Gl.prototype.I;
    Gl.prototype.changed = Gl.prototype.k;
    Gl.prototype.getRevision = Gl.prototype.v;
    Gl.prototype.on = Gl.prototype.r;
    Gl.prototype.once = Gl.prototype.A;
    Gl.prototype.un = Gl.prototype.u;
    Gl.prototype.unByKey = Gl.prototype.B;
    Tx.prototype.getActive = Tx.prototype.c;
    Tx.prototype.setActive = Tx.prototype.d;
    Tx.prototype.get = Tx.prototype.get;
    Tx.prototype.getKeys = Tx.prototype.C;
    Tx.prototype.getProperties = Tx.prototype.D;
    Tx.prototype.set = Tx.prototype.set;
    Tx.prototype.setProperties = Tx.prototype.t;
    Tx.prototype.unset = Tx.prototype.I;
    Tx.prototype.changed = Tx.prototype.k;
    Tx.prototype.getRevision = Tx.prototype.v;
    Tx.prototype.on = Tx.prototype.r;
    Tx.prototype.once = Tx.prototype.A;
    Tx.prototype.un = Tx.prototype.u;
    Tx.prototype.unByKey = Tx.prototype.B;
    Hl.prototype.getActive = Hl.prototype.c;
    Hl.prototype.setActive = Hl.prototype.d;
    Hl.prototype.get = Hl.prototype.get;
    Hl.prototype.getKeys = Hl.prototype.C;
    Hl.prototype.getProperties = Hl.prototype.D;
    Hl.prototype.set = Hl.prototype.set;
    Hl.prototype.setProperties = Hl.prototype.t;
    Hl.prototype.unset = Hl.prototype.I;
    Hl.prototype.changed = Hl.prototype.k;
    Hl.prototype.getRevision = Hl.prototype.v;
    Hl.prototype.on = Hl.prototype.r;
    Hl.prototype.once = Hl.prototype.A;
    Hl.prototype.un = Hl.prototype.u;
    Hl.prototype.unByKey = Hl.prototype.B;
    Jl.prototype.getActive = Jl.prototype.c;
    Jl.prototype.setActive = Jl.prototype.d;
    Jl.prototype.get = Jl.prototype.get;
    Jl.prototype.getKeys = Jl.prototype.C;
    Jl.prototype.getProperties = Jl.prototype.D;
    Jl.prototype.set = Jl.prototype.set;
    Jl.prototype.setProperties = Jl.prototype.t;
    Jl.prototype.unset = Jl.prototype.I;
    Jl.prototype.changed = Jl.prototype.k;
    Jl.prototype.getRevision = Jl.prototype.v;
    Jl.prototype.on = Jl.prototype.r;
    Jl.prototype.once = Jl.prototype.A;
    Jl.prototype.un = Jl.prototype.u;
    Jl.prototype.unByKey = Jl.prototype.B;
    hy.prototype.getActive = hy.prototype.c;
    hy.prototype.setActive = hy.prototype.d;
    hy.prototype.get = hy.prototype.get;
    hy.prototype.getKeys = hy.prototype.C;
    hy.prototype.getProperties = hy.prototype.D;
    hy.prototype.set = hy.prototype.set;
    hy.prototype.setProperties = hy.prototype.t;
    hy.prototype.unset = hy.prototype.I;
    hy.prototype.changed = hy.prototype.k;
    hy.prototype.getRevision = hy.prototype.v;
    hy.prototype.on = hy.prototype.r;
    hy.prototype.once = hy.prototype.A;
    hy.prototype.un = hy.prototype.u;
    hy.prototype.unByKey = hy.prototype.B;
    Ll.prototype.getActive = Ll.prototype.c;
    Ll.prototype.setActive = Ll.prototype.d;
    Ll.prototype.get = Ll.prototype.get;
    Ll.prototype.getKeys = Ll.prototype.C;
    Ll.prototype.getProperties = Ll.prototype.D;
    Ll.prototype.set = Ll.prototype.set;
    Ll.prototype.setProperties = Ll.prototype.t;
    Ll.prototype.unset = Ll.prototype.I;
    Ll.prototype.changed = Ll.prototype.k;
    Ll.prototype.getRevision = Ll.prototype.v;
    Ll.prototype.on = Ll.prototype.r;
    Ll.prototype.once = Ll.prototype.A;
    Ll.prototype.un = Ll.prototype.u;
    Ll.prototype.unByKey = Ll.prototype.B;
    Nl.prototype.getActive = Nl.prototype.c;
    Nl.prototype.setActive = Nl.prototype.d;
    Nl.prototype.get = Nl.prototype.get;
    Nl.prototype.getKeys = Nl.prototype.C;
    Nl.prototype.getProperties = Nl.prototype.D;
    Nl.prototype.set = Nl.prototype.set;
    Nl.prototype.setProperties = Nl.prototype.t;
    Nl.prototype.unset = Nl.prototype.I;
    Nl.prototype.changed = Nl.prototype.k;
    Nl.prototype.getRevision = Nl.prototype.v;
    Nl.prototype.on = Nl.prototype.r;
    Nl.prototype.once = Nl.prototype.A;
    Nl.prototype.un = Nl.prototype.u;
    Nl.prototype.unByKey = Nl.prototype.B;
    Rl.prototype.getActive = Rl.prototype.c;
    Rl.prototype.setActive = Rl.prototype.d;
    Rl.prototype.get = Rl.prototype.get;
    Rl.prototype.getKeys = Rl.prototype.C;
    Rl.prototype.getProperties = Rl.prototype.D;
    Rl.prototype.set = Rl.prototype.set;
    Rl.prototype.setProperties = Rl.prototype.t;
    Rl.prototype.unset = Rl.prototype.I;
    Rl.prototype.changed = Rl.prototype.k;
    Rl.prototype.getRevision = Rl.prototype.v;
    Rl.prototype.on = Rl.prototype.r;
    Rl.prototype.once = Rl.prototype.A;
    Rl.prototype.un = Rl.prototype.u;
    Rl.prototype.unByKey = Rl.prototype.B;
    sy.prototype.getActive = sy.prototype.c;
    sy.prototype.setActive = sy.prototype.d;
    sy.prototype.get = sy.prototype.get;
    sy.prototype.getKeys = sy.prototype.C;
    sy.prototype.getProperties = sy.prototype.D;
    sy.prototype.set = sy.prototype.set;
    sy.prototype.setProperties = sy.prototype.t;
    sy.prototype.unset = sy.prototype.I;
    sy.prototype.changed = sy.prototype.k;
    sy.prototype.getRevision = sy.prototype.v;
    sy.prototype.on = sy.prototype.r;
    sy.prototype.once = sy.prototype.A;
    sy.prototype.un = sy.prototype.u;
    sy.prototype.unByKey = sy.prototype.B;
    vy.prototype.getActive = vy.prototype.c;
    vy.prototype.setActive = vy.prototype.d;
    vy.prototype.get = vy.prototype.get;
    vy.prototype.getKeys = vy.prototype.C;
    vy.prototype.getProperties = vy.prototype.D;
    vy.prototype.set = vy.prototype.set;
    vy.prototype.setProperties = vy.prototype.t;
    vy.prototype.unset = vy.prototype.I;
    vy.prototype.changed = vy.prototype.k;
    vy.prototype.getRevision = vy.prototype.v;
    vy.prototype.on = vy.prototype.r;
    vy.prototype.once = vy.prototype.A;
    vy.prototype.un = vy.prototype.u;
    vy.prototype.unByKey = vy.prototype.B;
    uk.prototype.get = uk.prototype.get;
    uk.prototype.getKeys = uk.prototype.C;
    uk.prototype.getProperties = uk.prototype.D;
    uk.prototype.set = uk.prototype.set;
    uk.prototype.setProperties = uk.prototype.t;
    uk.prototype.unset = uk.prototype.I;
    uk.prototype.changed = uk.prototype.k;
    uk.prototype.getRevision = uk.prototype.v;
    uk.prototype.on = uk.prototype.r;
    uk.prototype.once = uk.prototype.A;
    uk.prototype.un = uk.prototype.u;
    uk.prototype.unByKey = uk.prototype.B;
    wk.prototype.getClosestPoint = wk.prototype.e;
    wk.prototype.getExtent = wk.prototype.G;
    wk.prototype.get = wk.prototype.get;
    wk.prototype.getKeys = wk.prototype.C;
    wk.prototype.getProperties = wk.prototype.D;
    wk.prototype.set = wk.prototype.set;
    wk.prototype.setProperties = wk.prototype.t;
    wk.prototype.unset = wk.prototype.I;
    wk.prototype.changed = wk.prototype.k;
    wk.prototype.getRevision = wk.prototype.v;
    wk.prototype.on = wk.prototype.r;
    wk.prototype.once = wk.prototype.A;
    wk.prototype.un = wk.prototype.u;
    wk.prototype.unByKey = wk.prototype.B;
    Pm.prototype.getFirstCoordinate = Pm.prototype.ob;
    Pm.prototype.getLastCoordinate = Pm.prototype.pb;
    Pm.prototype.getLayout = Pm.prototype.qb;
    Pm.prototype.applyTransform = Pm.prototype.qa;
    Pm.prototype.translate = Pm.prototype.Oa;
    Pm.prototype.getClosestPoint = Pm.prototype.e;
    Pm.prototype.getExtent = Pm.prototype.G;
    Pm.prototype.get = Pm.prototype.get;
    Pm.prototype.getKeys = Pm.prototype.C;
    Pm.prototype.getProperties = Pm.prototype.D;
    Pm.prototype.set = Pm.prototype.set;
    Pm.prototype.setProperties = Pm.prototype.t;
    Pm.prototype.unset = Pm.prototype.I;
    Pm.prototype.changed = Pm.prototype.k;
    Pm.prototype.getRevision = Pm.prototype.v;
    Pm.prototype.on = Pm.prototype.r;
    Pm.prototype.once = Pm.prototype.A;
    Pm.prototype.un = Pm.prototype.u;
    Pm.prototype.unByKey = Pm.prototype.B;
    Rm.prototype.getClosestPoint = Rm.prototype.e;
    Rm.prototype.getExtent = Rm.prototype.G;
    Rm.prototype.get = Rm.prototype.get;
    Rm.prototype.getKeys = Rm.prototype.C;
    Rm.prototype.getProperties = Rm.prototype.D;
    Rm.prototype.set = Rm.prototype.set;
    Rm.prototype.setProperties = Rm.prototype.t;
    Rm.prototype.unset = Rm.prototype.I;
    Rm.prototype.changed = Rm.prototype.k;
    Rm.prototype.getRevision = Rm.prototype.v;
    Rm.prototype.on = Rm.prototype.r;
    Rm.prototype.once = Rm.prototype.A;
    Rm.prototype.un = Rm.prototype.u;
    Rm.prototype.unByKey = Rm.prototype.B;
    Qk.prototype.getFirstCoordinate = Qk.prototype.ob;
    Qk.prototype.getLastCoordinate = Qk.prototype.pb;
    Qk.prototype.getLayout = Qk.prototype.qb;
    Qk.prototype.applyTransform = Qk.prototype.qa;
    Qk.prototype.translate = Qk.prototype.Oa;
    Qk.prototype.getClosestPoint = Qk.prototype.e;
    Qk.prototype.getExtent = Qk.prototype.G;
    Qk.prototype.get = Qk.prototype.get;
    Qk.prototype.getKeys = Qk.prototype.C;
    Qk.prototype.getProperties = Qk.prototype.D;
    Qk.prototype.set = Qk.prototype.set;
    Qk.prototype.setProperties = Qk.prototype.t;
    Qk.prototype.unset = Qk.prototype.I;
    Qk.prototype.changed = Qk.prototype.k;
    Qk.prototype.getRevision = Qk.prototype.v;
    Qk.prototype.on = Qk.prototype.r;
    Qk.prototype.once = Qk.prototype.A;
    Qk.prototype.un = Qk.prototype.u;
    Qk.prototype.unByKey = Qk.prototype.B;
    O.prototype.getFirstCoordinate = O.prototype.ob;
    O.prototype.getLastCoordinate = O.prototype.pb;
    O.prototype.getLayout = O.prototype.qb;
    O.prototype.applyTransform = O.prototype.qa;
    O.prototype.translate = O.prototype.Oa;
    O.prototype.getClosestPoint = O.prototype.e;
    O.prototype.getExtent = O.prototype.G;
    O.prototype.get = O.prototype.get;
    O.prototype.getKeys = O.prototype.C;
    O.prototype.getProperties = O.prototype.D;
    O.prototype.set = O.prototype.set;
    O.prototype.setProperties = O.prototype.t;
    O.prototype.unset = O.prototype.I;
    O.prototype.changed = O.prototype.k;
    O.prototype.getRevision = O.prototype.v;
    O.prototype.on = O.prototype.r;
    O.prototype.once = O.prototype.A;
    O.prototype.un = O.prototype.u;
    O.prototype.unByKey = O.prototype.B;
    Q.prototype.getFirstCoordinate = Q.prototype.ob;
    Q.prototype.getLastCoordinate = Q.prototype.pb;
    Q.prototype.getLayout = Q.prototype.qb;
    Q.prototype.applyTransform = Q.prototype.qa;
    Q.prototype.translate = Q.prototype.Oa;
    Q.prototype.getClosestPoint = Q.prototype.e;
    Q.prototype.getExtent = Q.prototype.G;
    Q.prototype.get = Q.prototype.get;
    Q.prototype.getKeys = Q.prototype.C;
    Q.prototype.getProperties = Q.prototype.D;
    Q.prototype.set = Q.prototype.set;
    Q.prototype.setProperties = Q.prototype.t;
    Q.prototype.unset = Q.prototype.I;
    Q.prototype.changed = Q.prototype.k;
    Q.prototype.getRevision = Q.prototype.v;
    Q.prototype.on = Q.prototype.r;
    Q.prototype.once = Q.prototype.A;
    Q.prototype.un = Q.prototype.u;
    Q.prototype.unByKey = Q.prototype.B;
    an.prototype.getFirstCoordinate = an.prototype.ob;
    an.prototype.getLastCoordinate = an.prototype.pb;
    an.prototype.getLayout = an.prototype.qb;
    an.prototype.applyTransform = an.prototype.qa;
    an.prototype.translate = an.prototype.Oa;
    an.prototype.getClosestPoint = an.prototype.e;
    an.prototype.getExtent = an.prototype.G;
    an.prototype.get = an.prototype.get;
    an.prototype.getKeys = an.prototype.C;
    an.prototype.getProperties = an.prototype.D;
    an.prototype.set = an.prototype.set;
    an.prototype.setProperties = an.prototype.t;
    an.prototype.unset = an.prototype.I;
    an.prototype.changed = an.prototype.k;
    an.prototype.getRevision = an.prototype.v;
    an.prototype.on = an.prototype.r;
    an.prototype.once = an.prototype.A;
    an.prototype.un = an.prototype.u;
    an.prototype.unByKey = an.prototype.B;
    R.prototype.getFirstCoordinate = R.prototype.ob;
    R.prototype.getLastCoordinate = R.prototype.pb;
    R.prototype.getLayout = R.prototype.qb;
    R.prototype.applyTransform = R.prototype.qa;
    R.prototype.translate = R.prototype.Oa;
    R.prototype.getClosestPoint = R.prototype.e;
    R.prototype.getExtent = R.prototype.G;
    R.prototype.get = R.prototype.get;
    R.prototype.getKeys = R.prototype.C;
    R.prototype.getProperties = R.prototype.D;
    R.prototype.set = R.prototype.set;
    R.prototype.setProperties = R.prototype.t;
    R.prototype.unset = R.prototype.I;
    R.prototype.changed = R.prototype.k;
    R.prototype.getRevision = R.prototype.v;
    R.prototype.on = R.prototype.r;
    R.prototype.once = R.prototype.A;
    R.prototype.un = R.prototype.u;
    R.prototype.unByKey = R.prototype.B;
    E.prototype.getFirstCoordinate = E.prototype.ob;
    E.prototype.getLastCoordinate = E.prototype.pb;
    E.prototype.getLayout = E.prototype.qb;
    E.prototype.applyTransform = E.prototype.qa;
    E.prototype.translate = E.prototype.Oa;
    E.prototype.getClosestPoint = E.prototype.e;
    E.prototype.getExtent = E.prototype.G;
    E.prototype.get = E.prototype.get;
    E.prototype.getKeys = E.prototype.C;
    E.prototype.getProperties = E.prototype.D;
    E.prototype.set = E.prototype.set;
    E.prototype.setProperties = E.prototype.t;
    E.prototype.unset = E.prototype.I;
    E.prototype.changed = E.prototype.k;
    E.prototype.getRevision = E.prototype.v;
    E.prototype.on = E.prototype.r;
    E.prototype.once = E.prototype.A;
    E.prototype.un = E.prototype.u;
    E.prototype.unByKey = E.prototype.B;
    F.prototype.getFirstCoordinate = F.prototype.ob;
    F.prototype.getLastCoordinate = F.prototype.pb;
    F.prototype.getLayout = F.prototype.qb;
    F.prototype.applyTransform = F.prototype.qa;
    F.prototype.translate = F.prototype.Oa;
    F.prototype.getClosestPoint = F.prototype.e;
    F.prototype.getExtent = F.prototype.G;
    F.prototype.get = F.prototype.get;
    F.prototype.getKeys = F.prototype.C;
    F.prototype.getProperties = F.prototype.D;
    F.prototype.set = F.prototype.set;
    F.prototype.setProperties = F.prototype.t;
    F.prototype.unset = F.prototype.I;
    F.prototype.changed = F.prototype.k;
    F.prototype.getRevision = F.prototype.v;
    F.prototype.on = F.prototype.r;
    F.prototype.once = F.prototype.A;
    F.prototype.un = F.prototype.u;
    F.prototype.unByKey = F.prototype.B;
    ls.prototype.readFeatures = ls.prototype.ja;
    cs.prototype.readFeatures = cs.prototype.ja;
    cs.prototype.readFeatures = cs.prototype.ja;
    ug.prototype.get = ug.prototype.get;
    ug.prototype.getKeys = ug.prototype.C;
    ug.prototype.getProperties = ug.prototype.D;
    ug.prototype.set = ug.prototype.set;
    ug.prototype.setProperties = ug.prototype.t;
    ug.prototype.unset = ug.prototype.I;
    ug.prototype.changed = ug.prototype.k;
    ug.prototype.getRevision = ug.prototype.v;
    ug.prototype.on = ug.prototype.r;
    ug.prototype.once = ug.prototype.A;
    ug.prototype.un = ug.prototype.u;
    ug.prototype.unByKey = ug.prototype.B;
    ch.prototype.getMap = ch.prototype.e;
    ch.prototype.setMap = ch.prototype.setMap;
    ch.prototype.setTarget = ch.prototype.c;
    ch.prototype.get = ch.prototype.get;
    ch.prototype.getKeys = ch.prototype.C;
    ch.prototype.getProperties = ch.prototype.D;
    ch.prototype.set = ch.prototype.set;
    ch.prototype.setProperties = ch.prototype.t;
    ch.prototype.unset = ch.prototype.I;
    ch.prototype.changed = ch.prototype.k;
    ch.prototype.getRevision = ch.prototype.v;
    ch.prototype.on = ch.prototype.r;
    ch.prototype.once = ch.prototype.A;
    ch.prototype.un = ch.prototype.u;
    ch.prototype.unByKey = ch.prototype.B;
    nh.prototype.getMap = nh.prototype.e;
    nh.prototype.setMap = nh.prototype.setMap;
    nh.prototype.setTarget = nh.prototype.c;
    nh.prototype.get = nh.prototype.get;
    nh.prototype.getKeys = nh.prototype.C;
    nh.prototype.getProperties = nh.prototype.D;
    nh.prototype.set = nh.prototype.set;
    nh.prototype.setProperties = nh.prototype.t;
    nh.prototype.unset = nh.prototype.I;
    nh.prototype.changed = nh.prototype.k;
    nh.prototype.getRevision = nh.prototype.v;
    nh.prototype.on = nh.prototype.r;
    nh.prototype.once = nh.prototype.A;
    nh.prototype.un = nh.prototype.u;
    nh.prototype.unByKey = nh.prototype.B;
    oh.prototype.getMap = oh.prototype.e;
    oh.prototype.setTarget = oh.prototype.c;
    oh.prototype.get = oh.prototype.get;
    oh.prototype.getKeys = oh.prototype.C;
    oh.prototype.getProperties = oh.prototype.D;
    oh.prototype.set = oh.prototype.set;
    oh.prototype.setProperties = oh.prototype.t;
    oh.prototype.unset = oh.prototype.I;
    oh.prototype.changed = oh.prototype.k;
    oh.prototype.getRevision = oh.prototype.v;
    oh.prototype.on = oh.prototype.r;
    oh.prototype.once = oh.prototype.A;
    oh.prototype.un = oh.prototype.u;
    oh.prototype.unByKey = oh.prototype.B;
    Uq.prototype.getMap = Uq.prototype.e;
    Uq.prototype.setTarget = Uq.prototype.c;
    Uq.prototype.get = Uq.prototype.get;
    Uq.prototype.getKeys = Uq.prototype.C;
    Uq.prototype.getProperties = Uq.prototype.D;
    Uq.prototype.set = Uq.prototype.set;
    Uq.prototype.setProperties = Uq.prototype.t;
    Uq.prototype.unset = Uq.prototype.I;
    Uq.prototype.changed = Uq.prototype.k;
    Uq.prototype.getRevision = Uq.prototype.v;
    Uq.prototype.on = Uq.prototype.r;
    Uq.prototype.once = Uq.prototype.A;
    Uq.prototype.un = Uq.prototype.u;
    Uq.prototype.unByKey = Uq.prototype.B;
    fh.prototype.getMap = fh.prototype.e;
    fh.prototype.setMap = fh.prototype.setMap;
    fh.prototype.setTarget = fh.prototype.c;
    fh.prototype.get = fh.prototype.get;
    fh.prototype.getKeys = fh.prototype.C;
    fh.prototype.getProperties = fh.prototype.D;
    fh.prototype.set = fh.prototype.set;
    fh.prototype.setProperties = fh.prototype.t;
    fh.prototype.unset = fh.prototype.I;
    fh.prototype.changed = fh.prototype.k;
    fh.prototype.getRevision = fh.prototype.v;
    fh.prototype.on = fh.prototype.r;
    fh.prototype.once = fh.prototype.A;
    fh.prototype.un = fh.prototype.u;
    fh.prototype.unByKey = fh.prototype.B;
    Zq.prototype.getMap = Zq.prototype.e;
    Zq.prototype.setMap = Zq.prototype.setMap;
    Zq.prototype.setTarget = Zq.prototype.c;
    Zq.prototype.get = Zq.prototype.get;
    Zq.prototype.getKeys = Zq.prototype.C;
    Zq.prototype.getProperties = Zq.prototype.D;
    Zq.prototype.set = Zq.prototype.set;
    Zq.prototype.setProperties = Zq.prototype.t;
    Zq.prototype.unset = Zq.prototype.I;
    Zq.prototype.changed = Zq.prototype.k;
    Zq.prototype.getRevision = Zq.prototype.v;
    Zq.prototype.on = Zq.prototype.r;
    Zq.prototype.once = Zq.prototype.A;
    Zq.prototype.un = Zq.prototype.u;
    Zq.prototype.unByKey = Zq.prototype.B;
    hh.prototype.getMap = hh.prototype.e;
    hh.prototype.setMap = hh.prototype.setMap;
    hh.prototype.setTarget = hh.prototype.c;
    hh.prototype.get = hh.prototype.get;
    hh.prototype.getKeys = hh.prototype.C;
    hh.prototype.getProperties = hh.prototype.D;
    hh.prototype.set = hh.prototype.set;
    hh.prototype.setProperties = hh.prototype.t;
    hh.prototype.unset = hh.prototype.I;
    hh.prototype.changed = hh.prototype.k;
    hh.prototype.getRevision = hh.prototype.v;
    hh.prototype.on = hh.prototype.r;
    hh.prototype.once = hh.prototype.A;
    hh.prototype.un = hh.prototype.u;
    hh.prototype.unByKey = hh.prototype.B;
    nr.prototype.getMap = nr.prototype.e;
    nr.prototype.setTarget = nr.prototype.c;
    nr.prototype.get = nr.prototype.get;
    nr.prototype.getKeys = nr.prototype.C;
    nr.prototype.getProperties = nr.prototype.D;
    nr.prototype.set = nr.prototype.set;
    nr.prototype.setProperties = nr.prototype.t;
    nr.prototype.unset = nr.prototype.I;
    nr.prototype.changed = nr.prototype.k;
    nr.prototype.getRevision = nr.prototype.v;
    nr.prototype.on = nr.prototype.r;
    nr.prototype.once = nr.prototype.A;
    nr.prototype.un = nr.prototype.u;
    nr.prototype.unByKey = nr.prototype.B;
    sr.prototype.getMap = sr.prototype.e;
    sr.prototype.setMap = sr.prototype.setMap;
    sr.prototype.setTarget = sr.prototype.c;
    sr.prototype.get = sr.prototype.get;
    sr.prototype.getKeys = sr.prototype.C;
    sr.prototype.getProperties = sr.prototype.D;
    sr.prototype.set = sr.prototype.set;
    sr.prototype.setProperties = sr.prototype.t;
    sr.prototype.unset = sr.prototype.I;
    sr.prototype.changed = sr.prototype.k;
    sr.prototype.getRevision = sr.prototype.v;
    sr.prototype.on = sr.prototype.r;
    sr.prototype.once = sr.prototype.A;
    sr.prototype.un = sr.prototype.u;
    sr.prototype.unByKey = sr.prototype.B;
    return OPENLAYERS.ol;
}));