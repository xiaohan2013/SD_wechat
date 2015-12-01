/**
 * Created by schp-tany on 2015/11/30.
 */
var modulejs, require, define;
(function (global) {
    var mod, cfg, _modulejs, _define, _require;
    var version = "1.0.2";
    var isCache = true;
    var cacheTime = 60 * 60 * 24 * 30 * 1000;
    cfg = {
        debug: location.href.indexOf("mdebug=1") != -1 ? true : false,
        alias: {},
        cssAlias: {},
        moduleURI: {},
        vars: {},
        uris: {},
        modules: {},
        callback: [],
        actModules: {},
        cacheLoad: {},
        cacheDel: {},
        deps: {},
        events: {},
        timing: {}
    };
    _modulejs.config = config;
    config(global["_moduleConfig"] ? global._moduleConfig : cfg);
    global["_moduleConfig"] = cfg;
    require = _require;
    define = _define;
    modulejs = _modulejs;
    on("module_ready", function (id, fromeCache) {
        try {
            cfg.callback = cleanArray(cfg.callback);
            var init = cfg.callback, l = init.length;
            for (var i = 0; i < l; i++) {
                if (init[i] && checkDeps(init[i].dependencies)) {
                    var cb = init[i].factory;
                    var deps = init[i].dependencies;
                    var mods = [];
                    var allDeps = [];
                    var m;
                    for (var j = 0; j < deps.length; j++) {
                        var m = _require(deps[j]);
                        allDeps.push(m.dependencies);
                        mods.push(m);
                    }
                    debug("callback_is_run=start", cb.toString(), cfg.callback);
                    init[i] = null;
                    cb.apply(null, mods);
                    cfg.debug && emit("callback_is_run", cb.toString().replace(/[\r\n]/g, ""));
                }
            }
        } catch (e) {
            window.onerror('', '', '', '', e);
            window.console && window.console.error(e);
        }
    });
    on("module_require", function (id) {
        cfg.actModules[id] = cfg.actModules[id] ? (cfg.actModules[id] + 1) : 1;
    });
    on("module_cacheDel", function (id) {
        cfg.cacheDel[id] = 1;
    });
    on("cache_load", function (m) {
    });
    on("module_loss_alias", function (id) {
        console.error("module_loss_alias:" + id);
    });
    var cacheNow = new Date();
    _loadCache();
    cfg.timing['loadcache'] = new Date() - cacheNow;
    function _loadCache() {
        if (!_useCache()) {
            return false;
        }
        if (window.JD && JD.GLOBAL_CONFIG && JD.GLOBAL_CONFIG.MODULEJS_CROSS_LOCALSTORAGE) {
            JD.store.del("_modules", "value", function () {
                console.log(11);
            })
            JD.store.getAllModulejs(function (key, value) {
                var mStorage = {};
                for (var i = 0, j = value.length; i < j; i++) {
                    var item = value[i];
                    mStorage[item.key] = item.obj;
                }
                checkStorage(mStorage);
            })
            function checkStorage(mStorage) {
                for (var key in mStorage) {
                    if (/^_m_/.test(key)) {
                        var store = mStorage[key];
                        var i = key.substr(3);
                        var now = (new Date()).getTime();
                        var oneDay = 24 * 3600 * 1000;
                        if (cfg.alias[i]) {
                            if (_getModuleURI(i) != store.path || store.deps.join(",").indexOf("{") > -1) {
                                emit("module_cacheDel", i);
                                JD.store.del(key);
                                continue;
                            }
                        } else {
                            if (now > store.cacheTime) {
                                emit("module_cacheDel", i);
                                JD.store.del(key);
                                continue;
                            }
                        }
                        if (store.cacheTime - now < oneDay) {
                            store.cacheTime = (new Date()).getTime() + cacheTime;
                            try {
                                JD.store.del(key, function () {
                                    JD.store.set(key, store);
                                });
                            } catch (e) {
                            }
                        }
                        cfg.cacheLoad[store.id] = store;
                        emit("cache_load", store);
                    }
                }
            }
        } else {
            localStorage.removeItem("_modules");
            for (var key in localStorage) {
                if (/^_m_/.test(key)) {
                    var store = JSON.parse(localStorage.getItem(key));
                    var i = key.substr(3);
                    var now = (new Date()).getTime();
                    var oneDay = 24 * 3600 * 1000;
                    if (cfg.alias[i]) {
                        if (_getModuleURI(i) != store.path || store.deps.join(",").indexOf("{") > -1) {
                            emit("module_cacheDel", i);
                            localStorage.removeItem(key);
                            continue;
                        }
                    } else {
                        if (now > store.cacheTime) {
                            emit("module_cacheDel", i);
                            localStorage.removeItem(key);
                            continue;
                        }
                    }
                    if (store.cacheTime - now < oneDay) {
                        store.cacheTime = (new Date()).getTime() + cacheTime;
                        try {
                            localStorage.removeItem(key);
                            localStorage.setItem(key, JSON.stringify(store));
                        } catch (e) {
                        }
                    }
                    cfg.cacheLoad[store.id] = store;
                    emit("cache_load", store);
                }
            }
        }
    }

    function _getModuleURI(id) {
        return cfg.moduleURI[id] ? cfg.moduleURI[id] : cfg.alias[id];
    }

    function _useCache(id, deps, factory) {
        if (typeof(JSON) == "undefined") {
            return false;
        }
        if (!isCache) {
            return false;
        }
        if (!(JSON && window.localStorage)) {
            return false;
        }
        if (cfg.debug) {
            return false;
        }
        var agent = navigator.userAgent.toLowerCase();
        if (agent.indexOf("msie") > 0) {
            var m = agent.match(/msie\s([\d\.]+);/i);
            if (m && m.length >= 2 && parseInt(m[1]) <= 6) {
                return false;
            }
        }
        if (id && id.indexOf("_") == 0) {
            return false;
        }
        if (factory && factory.toString().indexOf("_cacheThisModule_") < 0) {
            return false;
        }
        return true;
    }

    function _cacheModule(id, deps, factory) {
        var key = "_m_" + id;
        var _t = localStorage.getItem(key);
        if (window.JD && JD.GLOBAL_CONFIG && JD.GLOBAL_CONFIG.MODULEJS_CROSS_LOCALSTORAGE) {
            var ms = {
                "id": id,
                "deps": deps,
                "factory": factory.toString(),
                "path": _getModuleURI(id),
                "cacheTime": (new Date()).getTime() + cacheTime
            };
            try {
                JD.store.set(key, ms, function (a) {
                    emit("module_cached", id);
                });
            } catch (e) {
            }
        } else {
            var ms = _t ? JSON.parse(_t) : {};
            ms = {
                "id": id,
                "deps": deps,
                "factory": factory.toString(),
                "path": _getModuleURI(id),
                "cacheTime": (new Date()).getTime() + cacheTime
            };
            try {
                localStorage.removeItem(key);
                localStorage.setItem(key, JSON.stringify(ms));
                emit("module_cached", id);
            } catch (e) {
            }
        }
    }

    function _define(id, deps, factory) {
        if (!id || (typeof(id) != "string"))
            return;
        if (id != "_init" && typeof(cfg.modules[id]) != "undefined") {
            emit("module_ready", id);
            return true;
        }
        if (arguments.length === 2) {
            factory = deps;
            deps = null;
        }
        deps = isType("Array", deps) ? deps : (deps ? [deps] : []);
        if (isType("Function", factory)) {
            var _deps = parseDependencies(factory.toString());
        }
        _useCache(id, deps, factory) && _cacheModule(id, deps, factory);
        deps = mergeArray(deps, _deps);
        var mod = new Module(id);
        mod.dependencies = deps || [];
        for (var i = mod.dependencies.length - 1; i >= 0; i--) {
            mod.dependencies[i] = parseVars(mod.dependencies[i]);
        }
        mod.factory = factory;
        if (id == "_init") {
            cfg.callback.push(mod);
        } else {
            cfg.modules[id] = mod;
        }
        emit("module_ready", id);
    }

    function _require(id) {
        id = parseVars(id);
        var module = cfg.modules[id];
        emit("module_require", id);
        if (!module) {
            emit("module_error", id);
            return null
        }
        if (module.exports) {
            return module.exports;
        }
        var now = new Date();
        var factory = module.factory;
        var exports = isType("Function", factory) ? factory(require, module.exports = {}, module) : factory;
        module.exports = exports === undefined ? module.exports : exports;
        cfg.timing[id] = new Date() - now;
        return module.exports;
    }

    _require.async = _modulejs;
    _require.css = function (path) {
        path = cfg.cssAlias && cfg.cssAlias[path] ? cfg.cssAlias[path] : path;
        if (!path) {
            return;
        }
        var l;
        if (!window["_loadCss"] || window["_loadCss"].indexOf(path) < 0) {
            l = document.createElement('link');
            l.setAttribute('type', 'text/css');
            l.setAttribute('rel', 'stylesheet');
            l.setAttribute('href', path);
            l.setAttribute("id", "loadCss" + Math.random());
            document.getElementsByTagName("head")[0].appendChild(l);
            window["_loadCss"] ? (window["_loadCss"] += "|" + path) : (window["_loadCss"] = "|" + path);
        }
        l && (typeof callback == "function") && (l.onload = callback);
        return true;
    }
    function _modulejs(deps, factory) {
        _define("_init", deps, factory);
    }

    function checkDeps(deps) {
        var list = {}, flag = true;
        for (var i = 0; i < deps.length; i++)list[deps[i]] = 1;
        getDesps(deps, list);
        for (var i in list) {
            if (!cfg.modules[i]) {
                loadModule(i);
                flag = false;
            }
        }
        return flag;
        function getDesps(deps, list) {
            for (var i = 0; i < deps.length; i++) {
                if (!list[deps[i]]) {
                    list[deps[i]] = 1;
                }
                if (cfg.modules[deps[i]] && list[deps[i]] != 2) {
                    list[deps[i]] = 2;
                    getDesps(cfg.modules[deps[i]].dependencies, list);
                }
            }
        }
    }

    function parseVars(id) {
        var VARS_RE = /{([^{]+)}/g
        var vars = cfg.vars
        if (vars && id.indexOf("{") > -1) {
            id = id.replace(VARS_RE, function (m, key) {
                return isType("String", vars[key]) ? vars[key] : key
            })
        }
        return id
    }

    function mergeObject(a, b) {
        for (var i in b) {
            if (!b.hasOwnProperty(i)) {
                continue;
            }
            if (!a[i]) {
                a[i] = b[i];
            } else if (Object.prototype.toString.call(b[i]) == "[object Object]") {
                mergeObject(a[i], b[i]);
            } else {
                a[i] = b[i];
            }
        }
        return a;
    }

    function config(obj) {
        return cfg = mergeObject(cfg, obj);
    }

    function Module(id) {
        this.id = id;
        this.dependencies = [];
        this.exports = null;
        this.uri = "";
    }

    function loadModule(id) {
        var m;
        if (m = cfg.cacheLoad[id]) {
            return _define(m.id, m.deps, eval("a = " + m.factory));
        }
        if (cfg.modules[id]) {
            emit("module_ready", id);
            return;
        }
        var url = cfg.alias[id] ? cfg.alias[id] : "";
        if (!url) {
            emit("module_loss_alias", id);
            return;
        }
        if (cfg.uris[url]) {
            return;
        }
        cfg.uris[url] = 1;
        if (window.GLOBAL_CROSSORIGIN) {
            var reloadTimes = 0;
            var crossorigin = true;
            var timestamp = "?host=" + location.host;
            var handler = function () {
                var callee = arguments.callee
                cfg.timing[callee.uri] = new Date() - callee.time;
            };
            handler.time = new Date();
            handler.uri = url;
            function getModuleJs() {
                JD.sendJs(url + timestamp, {
                    onLoad: handler, onError: function () {
                        reloadTimes++;
                        JD.report.umpBiz({
                            bizid: '55',
                            operation: '18',
                            result: '1',
                            source: '0',
                            message: "legos_load_error_times:" + reloadTimes
                        });
                        if (reloadTimes === 1) {
                            timestamp = "?t=" + Date.now();
                            getModuleJs();
                        } else if (reloadTimes === 2) {
                            timestamp = "";
                            crossorigin = false;
                            getModuleJs();
                        }
                    }, async: true, crossorigin: crossorigin
                });
            }

            getModuleJs();
        } else {
            var head = document.getElementsByTagName("head")[0] || document.documentElement;
            var baseElement = head.getElementsByTagName("base")[0];
            var node = document.createElement("script");
            node.charset = "utf-8";
            node.async = true;
            node.src = url;
            var handler = function () {
                var callee = arguments.callee
                cfg.timing[callee.uri] = new Date() - callee.time;
            };
            handler.time = new Date();
            handler.uri = url;
            node.onload = handler;
            baseElement ? head.insertBefore(node, baseElement) : head.appendChild(node);
        }
        cfg.debug && emit("file_loading", url);
    }

    function on(name, cb) {
        var cbs = cfg.events[name];
        if (!cbs) {
            cbs = cfg.events[name] = [];
        }
        cbs.push(cb);
    }

    function emit(name, evt) {
        debug(name, evt);
        if (!cfg.events[name] || cfg.events[name].length == 0) {
            return;
        }
        for (var i = 0, l = cfg.events[name].length; i < l; i++) {
            cfg.events[name][i](evt);
        }
        if (name === 'error') {
            delete cfg.events[name];
        }
    }

    function cleanArray(a) {
        var n = [];
        for (var i = 0; i < a.length; i++) {
            a[i] && n.push(a[i]);
        }
        return n;
    }

    function mergeArray(a, b) {
        for (var i = 0; i < b.length; i++) {
            (("," + a + ",").indexOf("," + b[i] + ",") < 0) && a.push(b[i]);
        }
        return a;
    }

    function isType(type, obj) {
        return Object.prototype.toString.call(obj) === "[object " + type + "]"
    }

    function parseDependencies(code) {
        var commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg;
        var cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g;
        var ret = [];
        code.replace(commentRegExp, "").replace(cjsRequireRegExp, function (match, dep) {
            dep && ret.push(parseVars(dep));
        })
        return ret;
    }

    function debug() {
        if (!cfg.debug) {
            return true;
        }
        var a = [], l = arguments.length;
        for (var i = 0; i < l; i++) {
            a.push(arguments[i]);
        }
        try {
            console.log.apply(console, a);
        } catch (e) {
        }
    }
}(this));