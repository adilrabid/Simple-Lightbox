"use strict";
/**
 * Class to generate and manage dom elements
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Dom = /** @class */ (function () {
    function Dom(tag) {
        this.mainElement = document.createElement('tag');
    }
    Dom.prototype.create = function (tag) {
        return document.createElement('tag');
    };
    Dom.prototype.addAttrs = function (attrs) {
    };
    Dom.prototype.addClass = function (values) {
        var _a;
        (_a = this.el.classList).add.apply(_a, values);
        return this;
    };
    Dom.prototype.addDataset = function (key, value) {
        this.el.dataset[key] = value;
        return this;
    };
    Dom.prototype.append = function (child) {
        this.mainElement.append(child);
        return this;
    };
    return Dom;
}());
var DomLightBox = /** @class */ (function (_super) {
    __extends(DomLightBox, _super);
    function DomLightBox(tag) {
        var _this = _super.call(this, tag) || this;
        _this.isActive = false;
        _this.isActive = true;
        return _this;
    }
    Object.defineProperty(DomLightBox.prototype, "activeStatus", {
        get: function () {
            return this.isActive;
        },
        set: function (status) {
            this.isActive = false;
        },
        enumerable: false,
        configurable: true
    });
    return DomLightBox;
}(Dom));
document.addEventListener("DOMContentLoaded", function () {
    var overlay = new Dom('div');
    document.querySelectorAll('.showcase-item').forEach(function (item) {
        item.addEventListener('click', function (e) {
            console.log(e.target);
        });
    });
});
