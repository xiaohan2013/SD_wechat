/**
 * Created by schp-tany on 2015/11/30.
 */
//!function (a) {
//    function b() {
//        var a = location.host.indexOf("jd.com") > -1 ? "jd.com" : "wanggou.com";
//        g.cookie.set("retina", g.device.retina ? 1 : 0, 43200, "/", a);
//        var b = g.device.scene, c = {weixin: 1, qq: 2, jzyc: 4, jxj: 6, mobile: 3};
//        g.cookie.set("cid", c[b] || 3, 43200, "/", a)
//    }
//
    // iframe的通信
    //function c() {
    //    var a = function (a, b) {
    //        this.origin = a,
    //        this.path = b,
    //        this._iframe = null,
    //        this._iframeReady = !1,
    //        this._queue = [],
    //        this._requests = {},
    //        this._id = 0
    //    };
    //    a.prototype = {
    //        op: {WRITE: "W", READ: "R", DEL: "D", CLEAR: "X", GETALLMODULEJS: "M"},
    //        constructor: a,
    //        init: function () {
    //            try {
    //                if (!this._iframe) {
    //                    if (!(window.JSON && window.localStorage && window.postMessage && "localStorage"in window && null !== window.localStorage))
    //                        return this._queue.every(function (a) {a.callback && a.callback(null, null, {errNo: 1})  }), !1;
    //
    //                    this._iframe = document.createElement("iframe"),
    //                    this._iframe.style.cssText = "position:absolute;width:1px;height:1px;left:-9999px;",
    //                    document.body.appendChild(this._iframe),
    //
    //                    window.addEventListener && (this._iframe.addEventListener("load", function () { b._iframeLoaded()}, !1),
    //                    window.addEventListener("message", function (a) { b._handleMessage(a) }, !1))
    //                }
    //                this._iframe.src = this.origin.replace("http:", "") + this.path
    //            } catch (a) {
    //            }
    //            var b = this
    //        },
    //        setHistory: function (a) {
    //            function b() {
    //                wgStorage.set(a)
    //            }
    //
    //            window.wgStorage ? b() : window.wgStorageReady = function () {
    //                b()
    //            }
    //        },
    //        get: function (a, b) {
    //            this._toSend({key: a, op: this.op.READ}, b)
    //        },
    //        getAllModulejs: function (a) {
    //            this._toSend({key: "getmodulejs", op: this.op.GETALLMODULEJS}, a)
    //        },
    //        setValue: function (a, b, c, d) {
    //            c = c || 5;
    //            var e = (new Date).getTime() + 60 * c * 1e3, f = {value: b, expires: e};
    //            this.set(a, f, d)
    //        },
    //        getValue: function (a, b) {
    //            var c = (new Date).getTime(), d = this;
    //            this.get(a, function (a, e) {
    //                e && e.expires ? e.expires < c ? (d.del(a), b && b(a, null, {errNo: 0})) : b && b(a, e.value, {errNo: 0}) : b && b(a, null, {errNo: 0})
    //            })
    //        },
    //        set: function (a, b, c) {
    //            this._toSend({key: a, op: this.op.WRITE, value: b}, c)
    //        },
    //        del: function (a, b, c) {
    //            this._toSend({key: a, op: this.op.DEL, value: b}, c)
    //        },
    //        clear: function (a) {
    //            this._toSend({op: this.op.CLEAR}, a)
    //        },
    //        _toSend: function (a, b) {
    //            if (document.domain == this.origin.replace("http://", ""))try {
    //                if (window.JSON && window.localStorage && window.postMessage && "localStorage"in window && null !== window.localStorage) {
    //                    var c, d = localStorage;
    //                    if ("M" === a.op) {
    //                        var e = [];
    //                        for (var f in localStorage)/^_m_/.test(f) && e.push({
    //                            key: f,
    //                            obj: localStorage.getItem(f)
    //                        });
    //                        b && b(a.key, e, {errNo: 0})
    //                    } else"W" === a.op ? (d.setItem(a.key, JSON.stringify(a.value)), b && b({errNo: 0})) : "D" === a.op ? (d.removeItem(a.key), b && b({errNo: 0})) : "X" === a.op ? (d.clear(), b && b({errNo: 0})) : (c = JSON.parse(d.getItem(a.key)), b && b(a.key, c, {errNo: 0}))
    //                } else b && b(a.key, null, {errNo: 0})
    //            } catch (g) {
    //                b && b(a.key, null, {errNo: 1})
    //            } else {
    //                var h;
    //                if ("R" == a.op || "M" == a.op) {
    //                    var i = function () {
    //                        h = setTimeout(function () {
    //                            b && b(a.key, null, {errNo: 2})
    //                        }, 3e3)
    //                    };
    //                    i(b)
    //                }
    //                var j = {
    //                    request: {key: a.key, id: ++this._id, op: a.op, value: a.value, timer: h},
    //                    callback: b
    //                };
    //                this._iframeReady ? this._sendRequest(j) : this._queue.push(j), this._iframe || this.init()
    //            }
    //        },
    //        _sendRequest: function (a) {
    //            this._requests[a.request.id] = a, this._iframe.contentWindow.postMessage(JSON.stringify(a.request), this.origin)
    //        },
    //        _iframeLoaded: function () {
    //            if (this._iframeReady = !0, this._queue.length) {
    //                for (var a = 0, b = this._queue.length; b > a; a++)this._sendRequest(this._queue[a]);
    //                this._queue = []
    //            }
    //        },
    //        _handleMessage: function (a) {
    //            if (a.origin == this.origin) {
    //                var b = JSON.parse(a.data);
    //                this._requests[b.id] && (b.timer && (console.log("clear timer " + b.timer), clearTimeout(b.timer)), this._requests[b.id].callback && this._requests[b.id].callback(b.key, b.value), delete this._requests[b.id])
    //            }
    //        }
    //    },
    //    g.store = new a("http://wqs.jd.com", "/portal/wx/storageBridge2.shtml?20151127")
    //}
//
//    function d() {
//        if ("1" == g.cookie.get("webp"))
//            g.device.webp = !0;
//        else if (-1 !== navigator.userAgent.toLowerCase().indexOf("webp"))
//            g.device.webp = !0,
//            g.cookie.set("webp", 0, 5256e3, "/", "jd.com");
//        else {
//            var a = new Image, b = setTimeout(function () {
//                a.onload = a.onerror = null, a = null
//            }, 500);
//            a.onload = function () {
//                clearTimeout(b),
//                g.device.webp = a.width > 0 && a.height > 0,
//                g.cookie.set("webp", g.device.webp ? 1 : 0, 5256e3, "/", "jd.com")
//            }, a.onerror = function () {
//                clearTimeout(b), g.cookie.set("webp", 0, 5256e3, "/", "jd.com"), g.device.webp = !1
//            }, a.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA"
//        }
//    }
//
//    function e() {
//        if ("qq" == g.device.scene) {
//            var a = /(wanggou.com|qq.com|jd.com)$/i.exec(location.host), b = g.url.getUrlParam("sid"), c = g.url.getUrlParam("uk"), d = g.cookie.get("sid"), e = g.cookie.set;
//            a && 2 === a.length && (host = a[1], b && (e("sid", b, 43200, "", host), d != b && (e("wg_skey", "", 60, "", host), e("wg_uin", "", 60, "", host), e("wq_skey", "", 60, "", host), e("wq_uin", "", 60, "", host))), c && e("uk", c, 43200, "", host))
//        }
//    }
//
//    function f() {
//        var a = [].slice.call(document.images);
//        arguments.callee.counter != a.length && (a.forEach(function (a) {
//            a.onerror || (a.onerror = function () {
//                g.report.imageLoadError(this)
//            })
//        }), arguments.callee.counter = a.length), setTimeout(arguments.callee, 33)
//    }
//
//    var g = {},
//        h = [];
//        g.send = function (a) {
//        var b = (new Date).getTime(), c = "_COUNTRD" + b++;
//        try {
//            window[c] = new Image, window[c].src = a
//        } catch (d) {
//        }
//    },
//        g.sendJs = function (a, b) {
//            function c() {
//                d && (d.onload = d.onreadystatechange = d.onerror = null, d.parentNode && d.parentNode.removeChild(d), d = null)
//            }
//
//            var d = document.createElement("script");
//            b = b || {}, d.charset = b.charset || "utf-8", d.onload = d.onreadystatechange = function () {
//                (/loaded|complete/i.test(this.readyState) || -1 == navigator.userAgent.toLowerCase().indexOf("msie")) && (b.onLoad && b.onLoad(), c())
//            }, d.onerror = function () {
//                b.onError && b.onError(), c()
//            }, d.src = a, b.defer && (d.defer = "defer"), b.async && (d.async = "async"), b.crossorigin && d.setAttribute("crossorigin", "true"), document.getElementsByTagName("head")[0].appendChild(d)
//        },
//        g.sendJsByDomain = function (a) {
//            var b = arguments.callee;
//            a.tryTimes = a.tryTimes || 0, a.timeStamp = a.timeStamp || "", g.sendJs([a.url, window.GLOBAL_CROSSORIGIN ? (a.url.indexOf("?") > 0 ? "&" : "?") + "host=" + location.host : "", a.timeStamp].join(""), {
//                onError: function () {
//                    a.tryTimes++;
//                    var c = a.tryTimes;
//                    1 === c ? (a.timeStamp = "&r=" + Date.now(), b(a)) : 2 === c && (a.timeStamp = "", a.crossOrigin = !1, b(a))
//                }, onLoad: a.onLoad, defer: a.defer, async: a.async, crossorigin: a.crossOrigin
//            })
//        },
//        g.device = {
//            retina: window.devicePixelRatio >= 1.5,
//            sticky: function () {
//                var a, b = "-webkit-sticky", c = document.createElement("i");
//                return c.style.position = b, a = c.style.position, c = null, a === b
//            }(),
//            scene: function () {
//                var a = navigator.userAgent.toLowerCase();
//                return a.indexOf("micromessenger") > -1 ? "weixin" : /qq\/([\d\.]+)*/.test(a) ? "qq" : /jzyc\/\d\.\d/.test(a) ? "jzyc" : /jxj\/([.\d])*/.test(a) ? "jxj" : "mobile"
//            }(),
//            webp: !1,
//            getNetwork: function (a) {
//                try {
//                    var b = g.cookie.get("network");
//                    if (b)return a(b);
//                    "qq" == this.scene ? mqq.device.getNetworkType(function (b) {
//                        switch (1 * b) {
//                            case 0:
//                                nt = b;
//                                break;
//                            case 1:
//                                nt = "wifi";
//                                break;
//                            case 2:
//                                nt = "2G";
//                                break;
//                            case 3:
//                                nt = "3G";
//                                break;
//                            case 4:
//                                nt = "4G"
//                        }
//                        g.cookie.set("network", nt, 2, "/", "jd.com"), a(nt)
//                    }) : "weixin" == this.scene ? (console.log("head getNetworkType "), wx.getNetworkType({
//                        success: function (b) {
//                            console.log(b.networkType);
//                            var c = b.networkType;
//                            /wifi/i.test(c) ? c = "wifi" : /4g|3g+/i.test(c) ? c = "4g" : /3g/i.test(c) ? c = "3g" : /2g/i.test(c) && (c = "2g"), console.log(c), g.cookie.set("network", c, 2, "/", "jd.com"), a(c)
//                        }, fail: function () {
//                            a("unknown")
//                        }
//                    })) : a("unknown")
//                } catch (c) {
//                    a("unknown")
//                }
//            }
//        },
//        g.performance = {
//            useScaleImg: function () {
//                var a = g.cookie.get("network"),
//                    b = g.device.retina;
//                return "wifi" != a || !b
//            }, getScaleImg: function (a, b) {
//                var c = g.cookie.get("network"), d = "2G" == c || "3G" == c;
//                b = b || (d ? 60 : 80);
//                var e = a;
//                if (/(m|img\d{2})\.360buyimg\.com/.test(a) && /\.(jpg|jpeg|png)$/.test(a) && (/jfs\//.test(a) || /com\/n\d{1,2}\//.test(a)) && (g.device.webp ? e = a + (d ? "!q" + b + ".jpg.webp" : ".webp") : /\.(jpg|jpeg)$/.test(a) && (e = a + "!q" + b + ".jpg"), h.length)) {
//                    var f = e.match(/img\d{2}\.360buyimg\.com/)[0];
//                    h.indexOf(f) > -1 && (e = e.replace(f, g.url.getValidImageDomain()))
//                }
//                return e ? e.replace(/^http:/, "") : ""
//            }
//        },
//        g.img = {
//            useScaleImg: g.performance.useScaleImg,
//            getScaleImg: g.performance.getScaleImg,
//            getImgUrl: function (a, b, c, d) {
//                if (!/(m|img\d{2})\.360buyimg\.com/.test(a) || !/\.(jpg|jpeg|png|webp)$/.test(a) || !/jfs\//.test(a))return a ? a.replace(/^http:/, "") : "";
//                if (!b && !c)return this.getScaleImg(a, d);
//                b && !c && (c = b), !b && c && (b = c);
//                var e = /\/s\d{1,3}x\d{1,3}_jfs\//.test(a);
//                return a = e ? a.replace(/\/s\d{1,3}x\d{1,3}_jfs\//, "/s" + b + "x" + c + "_jfs/") : a.replace(/\/jfs\//, "/s" + b + "x" + c + "_jfs/"), this.getScaleImg(a, d)
//            }
//        },
//        g.report = {
//            itil: function () {
//                return !1
//            }, rd: function (a) {
//                function b() {
//                    if (d.length) {
//                        var a = d.shift();
//                        c(a), setTimeout(b, 30)
//                    }
//                }
//
//                function c(a) {
//                    a && (a = "[object Object]" == {}.toString.call(a) ? a : {ptag: a}, window.ja.trace(a), ECC.cloud.report.trace(a))
//                }
//
//                var d;
//                !this._rdList && (this._rdList = []), window.ECC_cloud_report_pv ? (c(a), d = this._rdList, b()) : this._rdList.push(a)
//            }, badJs: function (a) {
//                var b = new Image;
//                a && a.stack ? a = a.stack.toString() : "object" == typeof a && window.JSON && window.JSON.stringify && (a = JSON.stringify(a)), b.src = "http://wq.jd.com/webmonitor/collect/badjs.json?Content=" + a + "&t=" + Math.random()
//            }, umpBiz: function (a) {
//                var b, c = window.GLOBAL_UMP_PERCENT;
//                if (void 0 !== c && Math.floor(10 * Math.random()) > c)return !1;
//                if (a instanceof Array) {
//                    b = [];
//                    for (var d = 0; d < a.length; d++)b.push(a.bizid + "|" + a.operation + "|" + a.result + "|" + a.source + "|" + encodeURIComponent(a.message.replace(/,/g, " ")));
//                    b = b.join(",")
//                } else b = a.bizid + "|" + a.operation + "|" + a.result + "|" + a.source + "|" + encodeURIComponent(a.message.replace(/,/g, " "));
//                var e = new Image;
//                e.src = "http://wq.jd.com/webmonitor/collect/biz.json?contents=" + b + "&t=" + Math.random()
//            }, imageLoadError: function (a) {
//                if (a && a.src) {
//                    var b = a.src.match(/img(\d{2})\.360buyimg\.com/);
//                    if (b && b.length) {
//                        var c = b[0], d = b[1], e = {10: 1, 11: 2, 12: 3, 13: 4, 14: 5, 20: 6, 30: 7};
//                        if (this.umpBiz({
//                                bizid: 41,
//                                operation: 1,
//                                result: e[d],
//                                source: 0,
//                                message: a.src + " load error!"
//                            }), !a.getAttribute("data-reload")) {
//                            var f = g.url.getValidImageDomain(c);
//                            f && (a.src = a.src.replace(c, f), a.setAttribute("data-reload", "1"))
//                        }
//                    }
//                }
//            }
//        },
//        g.cookie = {
//            get: function (a) {
//                var b = new RegExp("(^| )" + a + "(?:=([^;]*))?(;|$)"), c = document.cookie.match(b);
//                return c ? c[2] ? unescape(c[2]) : "" : null
//            }, set: function (a, b, c, d, e, f) {
//                var g = new Date,
//                    c = arguments[2] || null,
//                    d = arguments[3] || "/",
//                    e = arguments[4] || null,
//                    f = arguments[5] || !1;
//                c ? g.setMinutes(g.getMinutes() + parseInt(c)) : "",
//                    document.cookie = a + "=" + escape(b) + (c ? ";expires=" + g.toGMTString() : "") + (d ? ";path=" + d : "") + (e ? ";domain=" + e : "") + (f ? ";secure" : "")
//            }, del: function (a, b, c, d) {
//                var e = this.get(a);
//                if (null != e) {
//                    var f = new Date;
//                    f.setMinutes(f.getMinutes() - 1e3), b = b || "/", document.cookie = a + "=;expires=" + f.toGMTString() + (b ? ";path=" + b : "") + (c ? ";domain=" + c : "") + (d ? ";secure" : "")
//                }
//            }
//        },
//        g.preload = {},
//        g.url = {
//            setHash: function (a) {
//                setTimeout(function () {
//                    location.hash = a
//                }, 0)
//            },
//            getHash: function (a) {
//                var b = a || location.hash;
//                return b ? b.replace(/.*#/, "") : ""
//            },
//            getHashParam: function (a) {
//                var b = this.getHash().match(new RegExp("(^|&)" + a + "=([^&]*)(&|$)"), "i");
//                return null != b ? b[2] : ""
//            },
//            getUrlParam: function (a) {
//                var b = arguments[1] || window.location.search, c = new RegExp("(^|&)" + a + "=([^&]*)(&|$)", "i"), d = b.substr(b.indexOf("?") + 1).match(c);
//                return null != d ? d[2] : ""
//            },
//            parseUrl: function (a) {
//                var b = document.createElement("a");
//                return b.href = a, {
//                    source: a,
//                    protocol: b.protocol.replace(":", ""),
//                    host: b.hostname,
//                    port: b.port,
//                    query: b.search,
//                    params: function () {
//                        for (var a, c = {}, d = b.search.replace(/^\?/, "").split("&"), e = d.length, f = 0; e > f; f++)d[f] && (a = d[f].split("="), c[a[0]] = a[1]);
//                        return c
//                    }(),
//                    file: (b.pathname.match(/([^\/?#]+)$/i) || [, ""])[1],
//                    hash: b.hash.replace("#", ""),
//                    path: b.pathname.replace(/^([^\/])/, "/$1"),
//                    relative: (b.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ""])[1],
//                    segments: b.pathname.replace(/^\//, "").split("/")
//                }
//            },
//            addRd: function (a, b) {
//                a = a.replace(/？/g, "?");
//                var c = /ptag[=,]\d+\.\d+\.\d+/i, d = /\?/.test(a);
//                return hasAnchor = a.indexOf("#") > -1, a = c.test(a) ? a.replace(c, "PTAG=" + b) : hasAnchor ? a.replace("#", (d ? "&" : "?") + "PTAG=" + b + "#") : a + (d ? "&" : "?") + "PTAG=" + b
//            },
//            smartboxUrl: "http://wq.360buyimg.com/js/common/dest/jd.smartbox.min.js?t=201511261630",
//            getValidImageDomain: function (a) {
//                var b = ["img10.360buyimg.com", "img11.360buyimg.com", "img12.360buyimg.com", "img13.360buyimg.com", "img14.360buyimg.com", "img20.360buyimg.com", "img30.360buyimg.com"], c = h.concat();
//                a && -1 == c.indexOf(a) && c.push(a);
//                var d = b.filter(function (a) {
//                    return -1 == c.indexOf(a)
//                });
//                return d.length ? d[Math.floor(Math.random() * d.length)] : ""
//            }
//        },
//        g.events = function () {
//            var a, b, c, d, e, f;
//            return
//                b = {},
//                f = this,
//                a = function (a, c) {
//                    var d, e;
//                    return
//                    d = null != (e = b[a]) ? e : b[a] = [],
//                    d.push(c)
//                },
//                c = function (b, c) {
//                    return d(b), a(b, c)
//                },
//                d = function (a) {
//                    var c;
//                    return null != (c = b[a]) ? c.length = 0 : void 0
//                },
//                e = function () {
//                    var a, c, d, e, g, h;
//                    for (h = Array.prototype.shift.call(arguments),
//                             c = null != (g = b[h]) ? g : b[h] = [],
//                             d = 0,
//                             e = c.length; e > d; d++)
//                        if (a = c[d], a.apply(f, arguments) === !1)
//                            return !1
//                },
//                {listen: a, one: c, remove: d, trigger: e}
//        }(),
//        g.sqapi = function () {
//            var a = "sq_api_ready";
//            return {
//                ready: function (b) {
//                    window.mqq ? b && b.call(null) : g.events.listen(a, b)
//                }
//            }
//        }(),
//        g.wxapi = function () {
//            if ("weixin" == g.device.scene) {
//                var a, b = "wx_api_ready", c = "wx_cfg_init", d = "wx_api_error", e = "wx_js_load", f = "wx_sign_get", h = !1;
//                return funcs = [], initSdkCofig = function () {
//                    a && window.wx && g.events.trigger(c, a)
//                }, {
//                    ready: function (c, i, j) {
//                        if (i) {
//                            a && (a = null);
//                            var k = function () {
//                                g.events.trigger(f, !0)
//                            };
//                            window.wx ? k() : g.events.listen(e, k)
//                        }
//                        a && window.wx && h ? c && c.call(null, a) : c && g.events.listen(b, c), j && g.events.listen(d, j)
//                    }, signatureReady: function (b) {
//                        a = b, initSdkCofig()
//                    }, getSignature: function () {
//                        return a
//                    }, jsReady: function (a) {
//                        g.events.listen(c, a), g.events.trigger(e), g.events.remove(e), initSdkCofig()
//                    }, wxReady: function () {
//                        h = !0
//                    }
//                }
//            }
//        }(),
//        g.calendar = {},
//        g.GLOBAL_CONFIG = {
//            CK_GQP: "_ws_nav_gwq",
//            CK_HOMEPAGE: "_ws_home",
//            CK_WX_CURTAINAD: "curtainAdShow",
//            CK_SQ_FOOT_AD: "ckfootAdShow",
//            CK_SQ_HOMEPAGE: "qqmobile_homepage",
//            CK_NETWORK: "network",
//            CK_RETINA: "retina",
//            CK_CID: "cid",
//            CK_WEBP: "webp",
//            CK_TIPSKEY: "jd_newversion_062021",
//            EVENT_SQ_FOOT: "e_s_f",
//            EVENT_WX_FOOT: "e_w_f"
//        },
//        g.log = function () {
//            var a = [];
//            return {
//                add: function (b) {
//                    a.push(b)
//                }, get: function () {
//                    return a
//                }
//            }
//        }(),
//        g.disasterRecovery = function () {
//            function a(a) {
//                switch (a) {
//                    case"mart":
//                        return window._page_cgi_static_mart === !0;
//                    case"cpt":
//                        return window._page_cgi_static_cpt === !0;
//                    case"cpc":
//                        return window._page_cgi_static_cpc === !0;
//                    case"mportal":
//                        return window._page_cgi_static_mportal === !0;
//                    case"materialQuery":
//                        return window._page_cgi_static_materialQuery === !0;
//                    case"multiMart":
//                        return window._page_cgi_static_multiMart === !0
//                }
//                return !0
//            }
//
//            var b = g.cookie.get("visitkey"), c = function (a) {
//                return Math.floor(Math.random() * a)
//            }, d = {}, e = g.cookie.get("whitetag"), f = window._cgiDisasterRecovery ? window._cgiDisasterRecovery[0].whitelist.replace(/\s*/g, "").split(",") : [], h = g.cookie.get("wq_uin");
//            return window._cgiDisasterRecovery && window._cgiDisasterRecovery.forEach(function (g) {
//                var i = 1 * g.percent, j = b ? i > b % 10 : c(10) < i, k = "1" == e || h && f.indexOf(h) > -1 || j || a(g.cgikey);
//                d[g.cgikey] = {percent: i, useStaticUrl: k}
//            }), d
//        }(), b(), d(), e(), f(), c(), window[a] = g
//}("JD");

!function(S){
    var g = {};
    g.cookie = {
        /**
         * 根据key来获取cookie中相应的value
         * @param name
         */
        get:function(key) {
            var rCookie = new RegExp("(^| )"+key+"(?:=([^;]*))?(;|$)");
            var res = document.cookie.match(rCookie);
            return res? res[2] ? unescape(res[2]) :"" : null;
        },
        /**
         * 设置Cookie
         * @param key
         * @param value
         * @param expiresDate
         * @param path
         * @param domain
         * @param secure
         */
        set:function(key,value,expiresDate,path,domain,secure){
            var date = new Date,
                expiresDate = arguments[2] || null,
                path = arguments[3] || "/",
                domain = arguments[4] || null,
                secure = arguments[5] || !1;
            expiresDate ? date.setMinutes(date.getMinutes() + parseInt(expiresDate)) : "";
            document.cookie = key + "=" + escape(value) + (expiresDate ? ";expires=" + date.toGMTString() : "") + (path ? ";path=" + path : "") + (domain ? ";domain=" + domain : "") + (secure ? ";secure" : "")
        },
        /**
         * 根据key来删除cookie的内容
         * @param key
         * @param path
         * @param domain
         * @param secure
         */
        del:function(key,path,domain,secure){
            var val = this.get(key);
            if(null != val){
                var expireDate = new Date;
                expireDate.setMinutes(expireDate.getMinutes() - 1000);
                path = path || "/";
                document.cookie = key +"=;expires="+expireDate.toGMTString()+(path?":path="+path:"")+(domain+":domain="+domain+"")+(secure?":secure":"");
            }
        }
    };
    g.events = function(){
        var eventQueue = {},self = this;;
        return {
            listen:function(event,callback){
                var callbackList = eventQueue[event];
                if(callbackList == null){
                    callbackList = (eventQueue[event] = []);
                }
                callbackList.push(callback);
            },
            one:function(event,callback){
                this.remove(event);
                this.listen(event,callback);
            },
            remove:function(event){
                return null != eventQueue[event] ? eventQueue[event].length = 0 : void 0;
            },
            trigger:function(){
                // 第一个参数已经被踢出
                var event = Array.prototype.shift.call(arguments);
                var registedCallbacks = eventQueue[event];
                if(registedCallbacks == null){
                    registedCallbacks = eventQueue[event] = [];
                }
                for(var d = 0;d < registedCallbacks.length;d++){
                    registedCallbacks[d].apply(self,arguments);
                }
                return false;
            }
        }
    }(),
    g.device= function(){
        return{
                getUaPlatform : function(){
                    var ua = navigator.userAgent.toLowerCase(),
                        android = ua.match(/android/),
                        ios = ua.match(/iphone|ipad|ipod/);
                    return android ? 'android' : ios ? 'ios' : '';
                },
                os:(function () {
                        var ua = navigator.userAgent,
                            os = {},
                            android = ua.match(/(Android);?[\s\/]+([\d.]+)?/),
                            ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
                            ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/),
                            iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);

                        if (android) os.android = true, os.version = android[2]
                        if (iphone && !ipod) os.ios = true, os.version = iphone[2].replace(/_/g, '.')
                        if (ipad) os.ios = true, os.version = ipad[2].replace(/_/g, '.')
                        if (ipod) os.ios =  true, os.version = ipod[3] ? ipod[3].replace(/_/g, '.') : null
                        if(!os.android && !os.ios){
                            os.other = '';
                        }
                        var o = '';
                        for (var key in os) {
                            if (key != 'version') {
                                o = key + '/' + (os['version'] || '');
                            }
                        }
                        return o;
                        // var o = /(win|android|linux|nokia|ipad|iphone|ipod|mac|sunos|solaris)/.exec(navigator.platform.toLowerCase());
                        // return o == null ? "other" : o[0];
                })(),
                browser:(function () { //获取浏览器名称、版本号、语言、是否开启java、编码方式
                    var a = { name: "other", version: "0" },
                        ua = navigator.userAgent["toLowerCase"](),
                        n =document.navigator;
                    browserRegExp = {
                        se360: /360se/,
                        se360_2x: /qihu/,
                        ie: /msie[ ]([\w.]+)/,
                        firefox: /firefox[|\/]([\w.]+)/,
                        chrome: /chrome[|\/]([\w.]+)/,
                        safari: /version[|\/]([\w.]+)(\s\w.+)?\s?safari/,
                        opera: /opera[|\/]([\w.]+)/,
                        webkit: /applewebkit\/([\w.]+)/
                    };
                    for (var i in browserRegExp) {
                        var match = browserRegExp[i].exec(ua);
                        if (match) {
                            a.name = i;
                            a.version = match[1] || "0";
                            break;
                        }
                    }
                    a.language = (n && (n.language || n.browserLanguage) || "-")["toLowerCase"]();
                    a.javaEnabled = n && n.javaEnabled() ? 1 : 0;
                    a.characterSet = document.characterSet || document.charset || "-";
                    return a;
                })()
            }
    }()
    window[S] = g;
}("SD");




















