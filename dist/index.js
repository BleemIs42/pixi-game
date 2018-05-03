'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AnimatedSprite = exports.State = exports.Game = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _pixi = require('pixi.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __game = void 0;
var __assets = (0, _create2.default)(null);

var stateContainer = {
    __states: (0, _create2.default)(null),
    active: {
        name: '',
        state: (0, _create2.default)(null),
        update: null
    },
    add: function add(name, state) {
        if (this.__states[name]) console.warn(name + ' state has registered, please rename it');
        this.__states[name] = state;
    },
    start: function start(name) {
        var _this = this;

        setTimeout(function () {
            if (_this.active.update) __game.ticker.remove(_this.active.update);

            if (_this.active.state.parent) __game.stage.removeChild(_this.active.state);

            var ActiveState = _this.__states[name];
            if (!ActiveState) throw new Error(name + ' state is not exist');

            var activeState = new ActiveState();
            __game.stage.addChildAt(activeState, 0);

            var update = function update() {
                if (!activeState.__isCreated) return;
                activeState.update();
            };
            __game.ticker.add(update);

            _this.active.name = name;
            _this.active.state = activeState;
            _this.active.update = update;
        });
    }
};

var Game = function (_Application) {
    (0, _inherits3.default)(Game, _Application);

    function Game() {
        var _ref;

        (0, _classCallCheck3.default)(this, Game);

        for (var _len = arguments.length, opt = Array(_len), _key = 0; _key < _len; _key++) {
            opt[_key] = arguments[_key];
        }

        var _this2 = (0, _possibleConstructorReturn3.default)(this, (_ref = Game.__proto__ || (0, _getPrototypeOf2.default)(Game)).call.apply(_ref, [this].concat(opt)));

        __game = _this2;
        _this2.state = stateContainer;
        return _this2;
    }

    return Game;
}(_pixi.Application);

var State = function (_Container) {
    (0, _inherits3.default)(State, _Container);

    function State() {
        (0, _classCallCheck3.default)(this, State);

        var _this3 = (0, _possibleConstructorReturn3.default)(this, (State.__proto__ || (0, _getPrototypeOf2.default)(State)).call(this));

        _this3.game = __game;
        _this3.stage = __game.renderer;
        _this3.state = stateContainer;
        _this3.assets = __assets;
        _this3.__isCreated = false;

        _this3.rerender = function () {
            _this3.removeChildren();
            _this3.init();
            _this3.preload();
            _this3.create();
        };

        _this3.add = function (name, parent) {
            parent = parent || _this3;
            if (typeof name === 'string') {
                var sprite = new _pixi.Sprite(__assets[name].texture);
                parent.addChild(sprite);
                return sprite;
            }
            parent.addChild(name);
            return name;
        };
        _this3.remove = function (child, parent) {
            parent = parent || _this3;
            parent.removeChild(child);
            return child;
        };

        _this3.init();

        var __hasResourceNeedLoade = false;
        var loaderAdd = _pixi.loader.add;
        _pixi.loader.add = function (name, path, option, cb) {
            if (__assets[name]) return;

            __hasResourceNeedLoade = true;
            loaderAdd.call(_pixi.loader, name, path, option, cb);
        };
        _this3.loader = _pixi.loader;

        _this3.preload();

        if (__hasResourceNeedLoade) {
            _this3.loader.load(function (loaders, resources) {
                _this3.__isCreated = true;
                __assets = (0, _assign2.default)({}, __assets, resources);

                (0, _keys2.default)(__assets).forEach(function (name) {
                    Object.defineProperty(__assets[name], 'sprite', {
                        get: function get() {
                            return new _pixi.Sprite(__assets[name].texture);
                        }
                    });
                });
                _this3.assets = __assets;

                _this3.create(loaders, resources);
            });
        }

        if (!__hasResourceNeedLoade) {
            _this3.create();
            _this3.__isCreated = true;
        }

        return _this3;
    }

    (0, _createClass3.default)(State, [{
        key: 'init',
        value: function init() {}
    }, {
        key: 'preload',
        value: function preload() {}
    }, {
        key: 'create',
        value: function create(loaders, resources) {}
    }, {
        key: 'update',
        value: function update() {}
    }]);
    return State;
}(_pixi.Container);

var AnimatedSprite = function AnimatedSprite(baseTexture, spriteSheetJson) {
    (0, _classCallCheck3.default)(this, AnimatedSprite);

    var spritesheet = new _pixi.Spritesheet(baseTexture, spriteSheetJson);
    var frames = [];
    spritesheet.parse(function (textures) {
        (0, _keys2.default)(textures).forEach(function (key) {
            return frames.push(_pixi.Texture.fromFrame(key));
        });
    });
    return new _pixi.extras.AnimatedSprite(frames);
};

exports.Game = Game;
exports.State = State;
exports.AnimatedSprite = AnimatedSprite;
