module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { __MODS__[modId].m.exports.__proto__ = m.exports.__proto__; Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; Object.defineProperty(m.exports, k, { set: function(val) { __MODS__[modId].m.exports[k] = val; }, get: function() { return __MODS__[modId].m.exports[k]; } }); }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1570588158932, function(require, module, exports) {
const originPage = Page;
const originComponent = Component;

const originProperties = ['data', 'properties', 'options'];
const originMethods = [
  'onLoad',
  'onReady',
  'onShow',
  'onHide',
  'onUnload',
  'onPullDownRefresh',
  'onReachBottom',
  'onShareAppMessage',
  'onPageScroll',
  'onTabItemTap'
];

function merge(mixins, config) {
  if (!Array.isArray(mixins)) return;
  mixins.forEach(mixinItem => {
    if (Object.prototype.toString.call(mixinItem) !== '[object Object]') {
      throw new Error(`mixin type must be Object`);
    }
    for (let [key, value] of Object.entries(mixinItem)) {
      if (originProperties.includes(key)) {
        config[key] = { ...value, ...config[key] };
      } else if (originMethods.includes(key)) {
        const originFunction = config[key];
        config[key] = function(...args) {
          value.call(this, ...args);
          return originFunction && originFunction.call(this, ...args);
        };
      } else {
        config = { ...config, ...mixinItem };
      }
    }
  });
  return config;
}

Page = config => {
  const { mixins } = config;
  if (Array.isArray(mixins)) {
    delete config.mixins;
    config = merge(mixins, config);
  }
  originPage(config);
};

Component = config => {
  if (!config.methods) {
    config.methods = {};
  }
  originComponent(config);
};

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1570588158932);
})()
//# sourceMappingURL=index.js.map