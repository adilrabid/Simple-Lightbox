"use strict";
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
/**
 * Configuarations
 */
var lb = {
    /**
     * Defining default class names
     */
    containerClass: 'showcase',
    itemClass: 'showcase-item'
};
/**
 * Class to generate and manage dom elements
 */
var Dom = /** @class */ (function () {
    function Dom(tag) {
        this.mainElement = this.create(tag);
    }
    Dom.prototype.create = function (tag, id, cls) {
        var _a;
        if (id === void 0) { id = null; }
        if (cls === void 0) { cls = null; }
        var createdElement = document.createElement(tag);
        if (id) {
            createdElement.setAttribute('id', id);
        }
        if (cls) {
            if (Array.isArray(cls)) {
                (_a = createdElement.classList).add.apply(_a, cls);
            }
            else {
                createdElement.classList.add(cls);
            }
        }
        return createdElement;
    };
    Dom.prototype.addAttrs = function (key, value, el) {
        el.setAttribute(key, value);
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
    Dom.prototype.append = function (child, parent) {
        if (Array.isArray(child)) {
            parent.append.apply(parent, child);
        }
        else {
            parent.append(child);
        }
        return this;
    };
    Dom.prototype.on = function (type, el, cb) {
        el.addEventListener(type, cb);
    };
    return Dom;
}());
var DomLightBox = /** @class */ (function (_super) {
    __extends(DomLightBox, _super);
    function DomLightBox(tag) {
        var _this = _super.call(this, tag) || this;
        _this.isActive = false;
        _this.activeClassName = 'slb-active';
        _this.isActive = true;
        return _this;
    }
    Object.defineProperty(DomLightBox.prototype, "currentStatus", {
        /**
         * Get lightbox overlay status
         */
        get: function () {
            return this.isActive;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Prepare lightbox overlay
     */
    DomLightBox.prototype.prepare = function () {
        var _this = this;
        // creating elements
        var closeBtn = this.create('button', 'slb-btn-close', 'slb-btn');
        var closeIcon = this.create('i', null, ['icon-x', 'slb-icon']);
        var displayArea = this.create('div', 'slb-display');
        var prevBtn = this.create('btn', 'slb-prev-btn', ['slb-btn', 'slb-btn-nav']);
        var prevBtnIcon = this.create('i', null, ['icon-chevron-left', 'slb-icon']);
        var nestBtn = this.create('btn', 'slb-next-btn', ['slb-btn', 'slb-btn-nav']);
        var nextBtnIcon = this.create('i', null, ['icon-chevron-right', 'slb-icon']);
        var displayContentArea = this.create('i', null, 'slb-display-content');
        // placing elements
        this.append(closeIcon, closeBtn);
        this.append(nextBtnIcon, nestBtn);
        this.append(prevBtnIcon, prevBtn);
        var mainAreaElements = [
            closeBtn,
            displayArea,
            nestBtn,
            prevBtn,
            displayContentArea
        ];
        this.append(mainAreaElements, this.mainElement);
        // adding event listener
        this.on('click', closeBtn, function () {
            _this.close();
        });
    };
    /**
     * Display or hides the lightbox overlay
     */
    DomLightBox.prototype.state = function (status) {
        this.isActive = status;
        if (this.isActive) {
            this.open();
        }
        else {
            this.close();
        }
    };
    DomLightBox.prototype.manageShowcase = function (showcase) {
        console.log(showcase);
        var count = 0;
        showcase.querySelectorAll('.showcase-item').forEach(function (item) {
            console.log(item);
            count++;
        });
        console.log('count : ', count);
    };
    DomLightBox.prototype.open = function () {
        this.prepare();
        this.mainElement.classList.add(this.activeClassName);
    };
    DomLightBox.prototype.close = function () {
        this.mainElement.classList.remove(this.activeClassName);
    };
    return DomLightBox;
}(Dom));
document.addEventListener("DOMContentLoaded", function () {
    var lightbox = new DomLightBox('div');
    lightbox.addAttrs('id', "slb", lightbox.mainElement);
    document.body.appendChild(lightbox.mainElement);
    var items = document.getElementsByClassName(lb.itemClass);
    for (var i = 0; i < items.length; i++) {
        lightbox.on('click', items[i], function (e) {
            lightbox.manageShowcase(e.target.closest(".showcase"));
            lightbox.state(true);
        });
    }
});
