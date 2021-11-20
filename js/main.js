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
    itemClass: 'showcase-item',
    prefix: 'slb'
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
    Dom.prototype.appendTo = function (elements, containner) {
        this.append(elements, containner);
    };
    Dom.prototype.on = function (type, el, cb) {
        el.addEventListener(type, cb);
    };
    Dom.prototype.parent = function (ele, parentClass) {
        if (parentClass === void 0) { parentClass = "showcase"; }
        var element = ele;
        while (!element.classList.contains(parentClass)) {
            element = element.parentElement;
        }
        return element;
    };
    return Dom;
}());
var DomLightBox = /** @class */ (function (_super) {
    __extends(DomLightBox, _super);
    function DomLightBox(tag) {
        var _this = _super.call(this, tag) || this;
        _this.isActive = false;
        _this.activeClassName = 'slb-active';
        _this.count = 0;
        _this.content = [];
        _this.nav = null;
        _this.navType = null;
        _this.clickedItem = 0;
        _this.isActive = true;
        return _this;
    }
    Object.defineProperty(DomLightBox.prototype, "currentStatus", {
        // Get lightbox overlay status
        get: function () {
            return this.isActive;
        },
        enumerable: false,
        configurable: true
    });
    // Prepare lightbox overlay
    DomLightBox.prototype.prepare = function () {
        var _this = this;
        // creating elements
        var closeBtn = this.create('button', 'slb-btn-close', 'slb-btn');
        var closeIcon = this.create('i', null, ['icon-x', 'slb-icon']);
        var displayArea = this.create('div', 'slb-display');
        this.displayArea = displayArea;
        var screen = this.create('div', 'slb-display-content', null);
        this.append(screen, displayArea);
        console.log("The target content to display: ");
        console.table(this.content[this.clickedItem].tag);
        var media = this.create(this.content[this.clickedItem].tag, null, 'slb-display-media');
        media.src = this.content[this.clickedItem].src;
        this.append(media, screen);
        // placing elements
        this.append(closeIcon, closeBtn);
        this.appendTo([
            closeBtn,
            displayArea
        ], this.mainElement);
        if (this.count > 1) {
            this.generateNavBtns();
        }
        if (this.navType) {
            this.generate_nav(this.navType);
        }
        // adding event listener
        this.on('click', closeBtn, function () {
            _this.close();
        });
        this.isClickedOutside();
    };
    DomLightBox.prototype.generateNavBtns = function () {
        var prevBtn = this.create('btn', 'slb-prev-btn', ['slb-btn', 'slb-btn-nav']);
        var prevBtnIcon = this.create('i', null, ['icon-chevron-left', 'slb-icon']);
        var nestBtn = this.create('btn', 'slb-next-btn', ['slb-btn', 'slb-btn-nav']);
        var nextBtnIcon = this.create('i', null, ['icon-chevron-right', 'slb-icon']);
        this.append(nextBtnIcon, nestBtn);
        this.append(prevBtnIcon, prevBtn);
        // this.appendTo([
        //     prevBtn,
        //     nestBtn
        // ], this.displayArea)
        this.displayArea.prepend(prevBtn);
        this.displayArea.append(nestBtn);
    };
    //Controls lightbox's visibility
    DomLightBox.prototype.state = function (status) {
        this.isActive = status;
        if (this.isActive) {
            this.open();
        }
        else {
            this.close();
        }
    };
    DomLightBox.prototype.generate_nav = function (type) {
        if (type === void 0) { type = 'dot'; }
        var self = this;
        var navID = "slb-navigation-" + type + "s";
        var nav = this.create('div', navID, 'slb-navigation');
        this.content.forEach(function (obj) {
            var navBtn = self.create('div', null, "slb-nav-" + type);
            var el = type === "thumb" ? 'img' : 'span';
            var navBtnELement = self.create(el, null, "slb-nav-" + type + "-btn");
            if (navBtnELement.nodeName.toLowerCase() === 'img') {
                navBtnELement.src = obj.thumb;
            }
            navBtn.appendChild(navBtnELement);
            // navBtn.addEventListener('click', appearContent)
            nav.appendChild(navBtn);
        });
        this.nav = nav;
        this.mainElement.appendChild(nav);
    };
    DomLightBox.prototype.manageShowcase = function (target) {
        var showcase = this.parent(target, lb.containerClass);
        this.navType = showcase.dataset.nav;
        var showcaseItems = showcase.querySelectorAll('.showcase-item');
        var totalChilds = showcaseItems.length;
        for (var i = 0; i < totalChilds; i++) {
            this.content.push({
                serial: i,
                src: showcaseItems[i].dataset.src,
                type: showcaseItems[i].dataset.type,
                thumb: showcaseItems[i].firstElementChild.src,
                title: showcaseItems[i].firstElementChild.dataset.title,
                desc: showcaseItems[i].firstElementChild.dataset.desc,
                tag: showcaseItems[i].firstElementChild.tagName.toLowerCase(),
            });
            if (target.src === showcaseItems[i].firstElementChild.src) {
                this.clickedItem = i;
            }
            this.count++;
        }
        console.table(this.content);
        console.log(this.clickedItem);
    };
    DomLightBox.prototype.open = function () {
        this.prepare();
        this.mainElement.classList.add(this.activeClassName);
    };
    DomLightBox.prototype.close = function () {
        this.mainElement.classList.remove(this.activeClassName);
        this.reset();
    };
    DomLightBox.prototype.isClickedOutside = function () {
        var self = this;
        // this.mainElement.addEventListener('click', function (e) {
        // })
        this.on('click', this.mainElement, function (e) {
            if (e.target === e.currentTarget) {
                self.close();
            }
        });
        this.on('click', this.displayArea, function (e) {
            if (e.target === e.currentTarget) {
                self.close();
            }
        });
    };
    DomLightBox.prototype.removeAllChild = function (parent) {
        var lastChild = parent.lastElementChild;
        while (lastChild) {
            parent.removeChild(lastChild);
            lastChild = parent.lastElementChild;
        }
    };
    DomLightBox.prototype.reset = function () {
        this.count = 0;
        this.removeAllChild(this.displayArea);
        this.content = [];
        this.navType = null;
        if (this.nav) {
            this.nav.remove();
        }
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
            lightbox.manageShowcase(e.target);
            lightbox.state(true);
        });
    }
});
