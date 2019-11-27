"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
function create(name) {
    var Base = react_1.default[name];
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.componentDidMount = function () {
            this.$isMounted = true;
        };
        class_1.prototype.componentWillUnmount = function () {
            this.$isMounted = false;
        };
        class_1.prototype.setState = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (this.$isMounted !== false)
                _super.prototype.setState.apply(this, args);
        };
        class_1.prototype.forceUpdate = function () {
            if (this.$isMounted === true)
                _super.prototype.forceUpdate.call(this);
            if (this.$isMounted === undefined) {
                if (this.forceUpdateTimer)
                    clearTimeout(this.forceUpdateTimer);
                this.forceUpdateTimer = setTimeout(this.forceUpdate.bind(this));
            }
        };
        return class_1;
    }(Base));
}
exports.Component = create('Component');
exports.PureComponent = create('PureComponent');
