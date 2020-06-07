// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
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

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
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
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/Map.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
var alltd = [];
var randomx;
var randomy;
var showapple = true;

var Map = /*#__PURE__*/function () {
  function Map(hi, wid) {
    _classCallCheck(this, Map);

    this.height = hi;
    this.width = wid;
  }

  _createClass(Map, [{
    key: "createMap",
    value: function createMap(divName) {
      var elt = document.getElementById(divName);

      for (var index = 0; index < this.height; index++) {
        var tr = elt === null || elt === void 0 ? void 0 : elt.appendChild(document.createElement("tr"));
        var tdarray = [];

        for (var j = 0; j < this.width; j++) {
          var td = tr === null || tr === void 0 ? void 0 : tr.appendChild(document.createElement("td"));
          tdarray[j] = td;
        }

        alltd[index] = tdarray;
      }
    } //产生一个苹果

  }, {
    key: "showFood",
    value: function showFood(snake) {
      var _this = this;

      var length = snake.body.length;
      var random = [];

      var _loop = function _loop(index) {
        var _loop2 = function _loop2(j) {
          if (!snake.body.some(function (item) {
            return item.x === index && item.y === j;
          })) {
            random.push({
              x: index,
              y: j
            });
          }
        };

        for (var j = 0; j < _this.width; j++) {
          _loop2(j);
        }
      };

      for (var index = 0; index < this.height; index++) {
        _loop(index);
      }

      var rondlen = random.length;
      var idx = Math.ceil(rondlen * Math.random());
      randomx = random[idx].x;
      randomy = random[idx].y;
      this.ShowApp = false;
      alltd[randomx][randomy].style.background = "green";
    }
  }, {
    key: "displaySnake",
    //画蛇
    value: function displaySnake(snake) {
      var length = snake.body.length;

      for (var i = 0; i < length; i++) {
        var x = snake.body[i].x;
        var y = snake.body[i].y;

        if (i === 0) {
          alltd[x][y].style.background = "blue";
        } else {
          alltd[x][y].style.background = "red";
        }
      }
    } //之前的蛇去掉

  }, {
    key: "clearSnake",
    value: function clearSnake(snake) {
      alltd.forEach(function (value, i) {
        value.forEach(function (v, j) {
          if (!(i === randomx && j === randomy)) {
            v.style.background = "";
          }
        });
      });
    } //清除食物

  }, {
    key: "clearfood",
    value: function clearfood() {
      alltd[randomx][randomy].style.background = "";
    }
  }, {
    key: "Randomx",
    get: function get() {
      return randomx;
    }
  }, {
    key: "Randomy",
    get: function get() {
      return randomy;
    }
  }, {
    key: "Showapp",
    get: function get() {
      return showapple;
    }
  }, {
    key: "ShowApp",
    set: function set(va) {
      showapple = va;
    }
  }]);

  return Map;
}();

exports.default = Map;
},{}],"src/Snake.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DirectionType = void 0;
var DirectionType;

(function (DirectionType) {
  DirectionType[DirectionType["UP"] = 0] = "UP";
  DirectionType[DirectionType["DOWN"] = 1] = "DOWN";
  DirectionType[DirectionType["LEFT"] = 2] = "LEFT";
  DirectionType[DirectionType["RIGHT"] = 3] = "RIGHT";
})(DirectionType = exports.DirectionType || (exports.DirectionType = {}));

var Snake = /*#__PURE__*/function () {
  function Snake(height, width, direction, map) {
    _classCallCheck(this, Snake);

    this.body = [];
    this.body.push({
      x: Math.floor(height / 2),
      y: Math.floor(width / 2)
    });
    this.body.push({
      x: Math.floor(height / 2 + 1),
      y: Math.floor(width / 2)
    });
    this.body.push({
      x: Math.floor(height / 2 + 2),
      y: Math.floor(width / 2)
    });
    this.direction = direction;
    this.map = map;
  }

  _createClass(Snake, [{
    key: "move",
    value: function move() {
      var length = this.body.length;
      var x;
      var y;

      switch (this.direction) {
        case DirectionType.UP:
          x = this.body[0].x - 1;
          y = this.body[0].y;
          break;

        case DirectionType.DOWN:
          x = this.body[0].x + 1;
          y = this.body[0].y;
          break;

        case DirectionType.LEFT:
          x = this.body[0].x;
          y = this.body[0].y - 1;
          break;

        case DirectionType.RIGHT:
          x = this.body[0].x;
          y = this.body[0].y + 1;
          break;
      }

      if (x === this.map.Randomx && y === this.map.Randomy) {
        this.body.unshift({
          x: x,
          y: y
        });
        this.map.ShowApp = true;
      } else {
        this.body.pop();
        this.body.unshift({
          x: x,
          y: y
        });
      }
    }
  }, {
    key: "turnLeft",
    value: function turnLeft() {
      if ([DirectionType.LEFT, DirectionType.RIGHT].includes(this.direction)) return;
      this.direction = DirectionType.LEFT;
    }
  }, {
    key: "turnup",
    value: function turnup() {
      if ([DirectionType.UP, DirectionType.DOWN].includes(this.direction)) return;
      this.direction = DirectionType.UP;
    }
  }, {
    key: "turndown",
    value: function turndown() {
      if ([DirectionType.UP, DirectionType.DOWN].includes(this.direction)) return;
      this.direction = DirectionType.DOWN;
    }
  }, {
    key: "turnright",
    value: function turnright() {
      if ([DirectionType.LEFT, DirectionType.RIGHT].includes(this.direction)) return;
      this.direction = DirectionType.RIGHT;
    }
  }]);

  return Snake;
}();

exports.default = Snake;
},{}],"src/Game.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Map_1 = __importDefault(require("./Map"));

var Snake_1 = __importStar(require("./Snake"));

var Game = function Game() {
  var _this = this;

  _classCallCheck(this, Game);

  this._start = false;

  this.move = function () {
    _this.map.clearSnake(_this.snake);

    if (_this.map.Showapp) _this.map.showFood(_this.snake);

    _this.snake.move();

    _this._gameover(_this.snake);

    _this.map.displaySnake(_this.snake);
  };

  this._gameover = function (snake) {
    var x = snake.body[0].x;
    var y = snake.body[0].y;
    var newsnake = snake.body.slice(1);

    if (x < 0 || y < 0 || x > _this.map.height - 1 || y > _this.map.width - 1 || newsnake.some(function (item) {
      return item.x === x && item.y === y;
    })) {
      alert("gameover");
      _this.snake = new Snake_1.default(_this.map.height, _this.map.width, Snake_1.DirectionType.UP, _this.map);
      clearInterval(_this._timer);
      _this._start = false;

      _this.map.clearfood();
    }
  };

  this.keydown = function (event) {
    if (!_this._start) {
      _this._timer = setInterval(_this.move, 200);
      _this._start = true;
    }

    switch (event.keyCode) {
      case 37:
        //左
        _this.snake.turnLeft();

        break;

      case 38:
        //上
        _this.snake.turnup();

        break;

      case 39:
        //右
        _this.snake.turnright();

        break;

      case 40:
        //下
        _this.snake.turndown();

        break;
    }
  };

  this.map = new Map_1.default(20, 20);
  this.map.createMap("map");
  this.snake = new Snake_1.default(8, 8, Snake_1.DirectionType.UP, this.map);
  this.map.displaySnake(this.snake);
  window.addEventListener("keydown", this.keydown, false);
};

new Game();
},{"./Map":"src/Map.ts","./Snake":"src/Snake.ts"}],"node_modules/_parcel@1.12.4@parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63953" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/_parcel@1.12.4@parcel/src/builtins/hmr-runtime.js","src/Game.ts"], null)
//# sourceMappingURL=/Game.e71ebd4e.js.map