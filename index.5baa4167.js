// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"2waQk":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "138b6a135baa4167";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets, assetsToDispose, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets); // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                } // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle, id) {
    // Execute the module.
    bundle(id); // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            }); // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"igcvL":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _kiwo202301Jpg = require("./source/gallery/kiwo202301.jpg");
var _kiwo202301JpgDefault = parcelHelpers.interopDefault(_kiwo202301Jpg);
var _kiwo202302Jpg = require("./source/gallery/kiwo202302.jpg");
var _kiwo202302JpgDefault = parcelHelpers.interopDefault(_kiwo202302Jpg);
var _kiwo202303Jpg = require("./source/gallery/kiwo202303.jpg");
var _kiwo202303JpgDefault = parcelHelpers.interopDefault(_kiwo202303Jpg);
var _kiwo202304Jpg = require("./source/gallery/kiwo202304.jpg");
var _kiwo202304JpgDefault = parcelHelpers.interopDefault(_kiwo202304Jpg);
var _kiwo202305Jpg = require("./source/gallery/kiwo202305.jpg");
var _kiwo202305JpgDefault = parcelHelpers.interopDefault(_kiwo202305Jpg);
var _kiwo202306Jpg = require("./source/gallery/kiwo202306.jpg");
var _kiwo202306JpgDefault = parcelHelpers.interopDefault(_kiwo202306Jpg);
var _kiwo202308Jpg = require("./source/gallery/kiwo202308.jpg");
var _kiwo202308JpgDefault = parcelHelpers.interopDefault(_kiwo202308Jpg);
var _kiwo202309Jpg = require("./source/gallery/kiwo202309.jpg");
var _kiwo202309JpgDefault = parcelHelpers.interopDefault(_kiwo202309Jpg);
var _kiwo202310Jpg = require("./source/gallery/kiwo202310.jpg");
var _kiwo202310JpgDefault = parcelHelpers.interopDefault(_kiwo202310Jpg);
var _kiwo202312Jpg = require("./source/gallery/kiwo202312.jpg");
var _kiwo202312JpgDefault = parcelHelpers.interopDefault(_kiwo202312Jpg);
var _kiwo202313Jpg = require("./source/gallery/kiwo202313.jpg");
var _kiwo202313JpgDefault = parcelHelpers.interopDefault(_kiwo202313Jpg);
var _kiwo202314Jpg = require("./source/gallery/kiwo202314.jpg");
var _kiwo202314JpgDefault = parcelHelpers.interopDefault(_kiwo202314Jpg);
var _kiwo202315Jpg = require("./source/gallery/kiwo202315.jpg");
var _kiwo202315JpgDefault = parcelHelpers.interopDefault(_kiwo202315Jpg);
var _kiwo202316Jpg = require("./source/gallery/kiwo202316.jpg");
var _kiwo202316JpgDefault = parcelHelpers.interopDefault(_kiwo202316Jpg);
var _kiwo202317Jpg = require("./source/gallery/kiwo202317.jpg");
var _kiwo202317JpgDefault = parcelHelpers.interopDefault(_kiwo202317Jpg);
var _kiwo202318Jpg = require("./source/gallery/kiwo202318.jpg");
var _kiwo202318JpgDefault = parcelHelpers.interopDefault(_kiwo202318Jpg);
var _kiwo202319Jpg = require("./source/gallery/kiwo202319.jpg");
var _kiwo202319JpgDefault = parcelHelpers.interopDefault(_kiwo202319Jpg);
var _kiwo202320Jpg = require("./source/gallery/kiwo202320.jpg");
var _kiwo202320JpgDefault = parcelHelpers.interopDefault(_kiwo202320Jpg);
var _kiwo202321Jpg = require("./source/gallery/kiwo202321.jpg");
var _kiwo202321JpgDefault = parcelHelpers.interopDefault(_kiwo202321Jpg);
var _kiwo202322Jpg = require("./source/gallery/kiwo202322.jpg");
var _kiwo202322JpgDefault = parcelHelpers.interopDefault(_kiwo202322Jpg);
var _kiwo202323Jpg = require("./source/gallery/kiwo202323.jpg");
var _kiwo202323JpgDefault = parcelHelpers.interopDefault(_kiwo202323Jpg);
var _kiwo202324Jpg = require("./source/gallery/kiwo202324.jpg");
var _kiwo202324JpgDefault = parcelHelpers.interopDefault(_kiwo202324Jpg);
//Page Navigation
document.querySelector(".nav-items").addEventListener("click", function(e) {
    e.preventDefault();
    if (e.target.classList.contains("slide-out")) {
        const id = e.target.getAttribute("href");
        document.querySelector(id).scrollIntoView({
            behavior: "smooth"
        });
    }
});
//Sidebar
const navitems = document.querySelectorAll(".nav-item");
const menuicon = document.querySelector(".menuIcon");
function setNavIcon() {
    if (menuicon.checked == true) menuicon.checked = false;
    else if (menuicon.checked == false) menuicon.checked = true;
}
navitems.forEach((e)=>e.addEventListener("click", function() {
        setNavIcon();
    }));
//Sticky Nav
const navbar = document.querySelector("nav");
const navigation = document.querySelector(".navigation__container");
const home = document.querySelector("#home");
const doc = document.querySelector("body");
const navHeight = navbar.getBoundingClientRect().height;
const callback = function(entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) {
        navigation.classList.add("sticky");
        home.classList.add("plusmargin");
        home.classList.remove("nomargin");
        document.querySelector("bg-video").classList.remove("minusmargin");
    } else {
        navigation.classList.remove("sticky");
        home.classList.remove("plusmargin");
        home.classList.add("nomargin");
    }
};
const observer = new IntersectionObserver(callback, {
    root: null,
    threshold: 0.01,
    rootMargin: `-${navHeight}px`
});
observer.observe(home);
//Slider
const dots = document.querySelector(".slider-dots");
const sliderCompontents = document.querySelectorAll(".component-content");
sliderCompontents.forEach((slide, i)=>slide.style.transform = `translateX(${100 * i}%)`);
const createDots = function() {
    sliderCompontents.forEach((s, i)=>{
        dots.insertAdjacentHTML("beforeend", `<button class="slider-dot" id="button--${i}" aria-label="slider-buttons" data-slide="${i}"></button>`);
    });
};
createDots();
const activateDots = function(slide) {
    document.querySelectorAll(".slider-dot").forEach((dot)=>dot.classList.remove("slider-dot__active"));
    document.querySelector(`.slider-dot[data-slide="${slide}"]`).classList.add("slider-dot__active");
};
activateDots(0);
let currentSlide = 0;
const maxSlide = sliderCompontents.length;
const goToSlide = function(slide) {
    sliderCompontents.forEach((s, i)=>s.style.transform = `translateX(${110 * (i - slide)}%)`);
};
goToSlide(0);
const nextSlide = function() {
    currentSlide === maxSlide - 1 ? currentSlide = 0 : currentSlide++;
    goToSlide(currentSlide);
    activateDots(currentSlide);
};
const prevSlide = function() {
    if (currentSlide > 0) currentSlide--;
    else currentSlide = maxSlide - 1;
    goToSlide(currentSlide);
    activateDots(currentSlide);
};
const btnRight = document.querySelector(".slider-btn--right");
const btnLeft = document.querySelector(".slider-btn--left");
btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);
document.addEventListener("keydown", function(e) {
    if (e.key === "ArrowRight") nextSlide();
    else if (e.key === "ArrowLeft") prevSlide();
});
dots.addEventListener("click", function(e) {
    if (e.target.classList.contains("slider-dot")) {
        const slide = e.target.dataset.slide;
        goToSlide(slide);
        activateDots(slide);
    }
});
//Gallery
const mainView = document.getElementById("main-view");
const caption = document.getElementById("caption");
const info = document.getElementById("info");
const thumbnails = document.getElementById("thumbnails");
let images = [
    {
        src: (0, _kiwo202301JpgDefault.default)
    },
    {
        src: (0, _kiwo202302JpgDefault.default)
    },
    {
        src: (0, _kiwo202303JpgDefault.default)
    },
    {
        src: (0, _kiwo202304JpgDefault.default)
    },
    {
        src: (0, _kiwo202305JpgDefault.default)
    },
    {
        src: (0, _kiwo202306JpgDefault.default)
    },
    {
        src: (0, _kiwo202308JpgDefault.default)
    },
    {
        src: (0, _kiwo202309JpgDefault.default)
    },
    {
        src: (0, _kiwo202310JpgDefault.default)
    },
    {
        src: (0, _kiwo202312JpgDefault.default)
    },
    {
        src: (0, _kiwo202313JpgDefault.default)
    },
    {
        src: (0, _kiwo202314JpgDefault.default)
    },
    {
        src: (0, _kiwo202315JpgDefault.default)
    },
    {
        src: (0, _kiwo202316JpgDefault.default)
    },
    {
        src: (0, _kiwo202317JpgDefault.default)
    },
    {
        src: (0, _kiwo202318JpgDefault.default)
    },
    {
        src: (0, _kiwo202319JpgDefault.default)
    },
    {
        src: (0, _kiwo202320JpgDefault.default)
    },
    {
        src: (0, _kiwo202321JpgDefault.default)
    },
    {
        src: (0, _kiwo202322JpgDefault.default)
    },
    {
        src: (0, _kiwo202323JpgDefault.default)
    },
    {
        src: (0, _kiwo202324JpgDefault.default)
    }
];
for(let i = 1; i < images.length; i++){
    let image = images[i];
    let img = document.createElement("img");
    img.src = images[i].src;
    img.setAttribute("width", "170px");
    img.setAttribute("height", "170px");
    img.setAttribute("data-index", i);
    img.setAttribute("alt", "img" + i);
    img.addEventListener("click", changeImage);
    thumbnails.appendChild(img);
}
function initGallery() {
    loadImage(0);
}
function slideImage() {
    let currentIndex = parseInt(mainView.getAttribute("data-index"));
    currentIndex = currentIndex + 1 == images.length ? 1 : currentIndex + 1;
    loadImage(currentIndex);
    setTimeout(slideImage, 8000);
}
function changeImage(event) {
    let target = event.currentTarget;
    let index = target.getAttribute("data-index");
    loadImage(index);
}
function loadImage(index) {
    let image = images[index];
    mainView.src = image.src;
    mainView.setAttribute("width", "1000px");
    mainView.setAttribute("height", "1000px");
    mainView.setAttribute("data-index", index);
    mainView.setAttribute("id", "image-" + index);
    mainView.setAttribute("alt", "img" + index);
    mainView.style.opacity = 1;
    caption.textContent = image.caption;
    info.textContent = image.info;
}
function fullScreenImage() {
    toggleFullscreen(mainView);
}
function toggleFullscreen(el) {
    if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();
    } else {
        if (document.documentElement.requestFullscreen) el.requestFullscreen();
        else if (document.documentElement.mozRequestFullScreen) el.mozRequestFullScreen();
        else if (document.documentElement.webkitRequestFullscreen) el.webkitRequestFullscreen();
        else if (document.documentElement.msRequestFullscreen) el.msRequestFullscreen();
    }
}
initGallery();
setTimeout(slideImage, 8000);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./source/gallery/kiwo202301.jpg":"bW57Z","./source/gallery/kiwo202302.jpg":"1hdlI","./source/gallery/kiwo202303.jpg":"3jq7Y","./source/gallery/kiwo202304.jpg":"epLr7","./source/gallery/kiwo202305.jpg":"5NKxd","./source/gallery/kiwo202306.jpg":"hwvyJ","./source/gallery/kiwo202308.jpg":"daCOZ","./source/gallery/kiwo202309.jpg":"2IBdH","./source/gallery/kiwo202310.jpg":"cFGxv","./source/gallery/kiwo202312.jpg":"ejlOL","./source/gallery/kiwo202313.jpg":"27Bpm","./source/gallery/kiwo202314.jpg":"kcRMU","./source/gallery/kiwo202315.jpg":"98dTt","./source/gallery/kiwo202316.jpg":"vxWBV","./source/gallery/kiwo202317.jpg":"2hYEE","./source/gallery/kiwo202318.jpg":"j37tD","./source/gallery/kiwo202319.jpg":"1LyOs","./source/gallery/kiwo202320.jpg":"2ei1m","./source/gallery/kiwo202321.jpg":"t9j8y","./source/gallery/kiwo202322.jpg":"50XDL","./source/gallery/kiwo202323.jpg":"baVEq","./source/gallery/kiwo202324.jpg":"49gZb"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"bW57Z":[function(require,module,exports) {
module.exports = require("e578db1bc71a0b21").getBundleURL("1G2bZ") + "kiwo202301.a5bd04e5.jpg" + "?" + Date.now();

},{"e578db1bc71a0b21":"lgJ39"}],"lgJ39":[function(require,module,exports) {
"use strict";
var bundleURL = {};
function getBundleURLCached(id) {
    var value = bundleURL[id];
    if (!value) {
        value = getBundleURL();
        bundleURL[id] = value;
    }
    return value;
}
function getBundleURL() {
    try {
        throw new Error();
    } catch (err) {
        var matches = ("" + err.stack).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^)\n]+/g);
        if (matches) // The first two stack frames will be this function and getBundleURLCached.
        // Use the 3rd one, which will be a runtime in the original bundle.
        return getBaseURL(matches[2]);
    }
    return "/";
}
function getBaseURL(url) {
    return ("" + url).replace(/^((?:https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/.+)\/[^/]+$/, "$1") + "/";
} // TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.
function getOrigin(url) {
    var matches = ("" + url).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^/]+/);
    if (!matches) throw new Error("Origin not found");
    return matches[0];
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;

},{}],"1hdlI":[function(require,module,exports) {
module.exports = require("4ac41226027f06da").getBundleURL("1G2bZ") + "kiwo202302.62c150da.jpg" + "?" + Date.now();

},{"4ac41226027f06da":"lgJ39"}],"3jq7Y":[function(require,module,exports) {
module.exports = require("7271ed89b314f39").getBundleURL("1G2bZ") + "kiwo202303.598d15e9.jpg" + "?" + Date.now();

},{"7271ed89b314f39":"lgJ39"}],"epLr7":[function(require,module,exports) {
module.exports = require("b191b8addfa263b8").getBundleURL("1G2bZ") + "kiwo202304.03d6625f.jpg" + "?" + Date.now();

},{"b191b8addfa263b8":"lgJ39"}],"5NKxd":[function(require,module,exports) {
module.exports = require("328aa305f26c5ad2").getBundleURL("1G2bZ") + "kiwo202305.ad6e9a4c.jpg" + "?" + Date.now();

},{"328aa305f26c5ad2":"lgJ39"}],"hwvyJ":[function(require,module,exports) {
module.exports = require("3d38782eb5e4be28").getBundleURL("1G2bZ") + "kiwo202306.6a0ceafe.jpg" + "?" + Date.now();

},{"3d38782eb5e4be28":"lgJ39"}],"daCOZ":[function(require,module,exports) {
module.exports = require("e005d71190786506").getBundleURL("1G2bZ") + "kiwo202308.89f33f0e.jpg" + "?" + Date.now();

},{"e005d71190786506":"lgJ39"}],"2IBdH":[function(require,module,exports) {
module.exports = require("8f8d3aee8d2b4565").getBundleURL("1G2bZ") + "kiwo202309.5aeceb68.jpg" + "?" + Date.now();

},{"8f8d3aee8d2b4565":"lgJ39"}],"cFGxv":[function(require,module,exports) {
module.exports = require("b7de880d8975e2cd").getBundleURL("1G2bZ") + "kiwo202310.09231887.jpg" + "?" + Date.now();

},{"b7de880d8975e2cd":"lgJ39"}],"ejlOL":[function(require,module,exports) {
module.exports = require("adccb902d2dc0365").getBundleURL("1G2bZ") + "kiwo202312.f2ef97e2.jpg" + "?" + Date.now();

},{"adccb902d2dc0365":"lgJ39"}],"27Bpm":[function(require,module,exports) {
module.exports = require("c9c5790ffdf7129").getBundleURL("1G2bZ") + "kiwo202313.19483aa5.jpg" + "?" + Date.now();

},{"c9c5790ffdf7129":"lgJ39"}],"kcRMU":[function(require,module,exports) {
module.exports = require("59a6c9f46366bb3b").getBundleURL("1G2bZ") + "kiwo202314.83de4572.jpg" + "?" + Date.now();

},{"59a6c9f46366bb3b":"lgJ39"}],"98dTt":[function(require,module,exports) {
module.exports = require("2276b5cced2f625c").getBundleURL("1G2bZ") + "kiwo202315.7f7a3d8f.jpg" + "?" + Date.now();

},{"2276b5cced2f625c":"lgJ39"}],"vxWBV":[function(require,module,exports) {
module.exports = require("de775b79e2be49a9").getBundleURL("1G2bZ") + "kiwo202316.3e315fc6.jpg" + "?" + Date.now();

},{"de775b79e2be49a9":"lgJ39"}],"2hYEE":[function(require,module,exports) {
module.exports = require("994d9e718cca9228").getBundleURL("1G2bZ") + "kiwo202317.4a54cd31.jpg" + "?" + Date.now();

},{"994d9e718cca9228":"lgJ39"}],"j37tD":[function(require,module,exports) {
module.exports = require("ac38e1439a82b61f").getBundleURL("1G2bZ") + "kiwo202318.df22bd32.jpg" + "?" + Date.now();

},{"ac38e1439a82b61f":"lgJ39"}],"1LyOs":[function(require,module,exports) {
module.exports = require("e382aec5e30edb36").getBundleURL("1G2bZ") + "kiwo202319.08ae0a3c.jpg" + "?" + Date.now();

},{"e382aec5e30edb36":"lgJ39"}],"2ei1m":[function(require,module,exports) {
module.exports = require("7c6fd5f464cd2e1c").getBundleURL("1G2bZ") + "kiwo202320.88a356c0.jpg" + "?" + Date.now();

},{"7c6fd5f464cd2e1c":"lgJ39"}],"t9j8y":[function(require,module,exports) {
module.exports = require("de73ccc0612c1f5e").getBundleURL("1G2bZ") + "kiwo202321.1891926f.jpg" + "?" + Date.now();

},{"de73ccc0612c1f5e":"lgJ39"}],"50XDL":[function(require,module,exports) {
module.exports = require("4716aa5fe05b71c5").getBundleURL("1G2bZ") + "kiwo202322.93fd8ab0.jpg" + "?" + Date.now();

},{"4716aa5fe05b71c5":"lgJ39"}],"baVEq":[function(require,module,exports) {
module.exports = require("e69f25a9e1f9bad6").getBundleURL("1G2bZ") + "kiwo202323.314dee36.jpg" + "?" + Date.now();

},{"e69f25a9e1f9bad6":"lgJ39"}],"49gZb":[function(require,module,exports) {
module.exports = require("8797448ecc013fce").getBundleURL("1G2bZ") + "kiwo202324.150be5a7.jpg" + "?" + Date.now();

},{"8797448ecc013fce":"lgJ39"}]},["2waQk","igcvL"], "igcvL", "parcelRequire054b")

//# sourceMappingURL=index.5baa4167.js.map
