document.addEventListener("DOMContentLoaded", function () {

    // generating lightbox structures
    generate_slbStructure();

    generate_closeBtn();
    generate_displayControls();

    let slbItemsArr = [];
    let lastDisplayed;
    let theShowcase;
    let displayRotation = 0;
    let displayZoom = 1;

    document.querySelectorAll(".showcase-item").forEach((showcaseItem) => {
        showcaseItem.addEventListener("click", function (e) {
            e.preventDefault();
            theShowcase = e.target.closest(".showcase");
            theShowcase.querySelectorAll('.showcase-item').forEach(function (item) {
                let itemObj = {};
                itemObj.src = item.dataset.src;
                itemObj.thumbSrc = item.children[0].src;
                itemObj.title = item.children[0].dataset.title;
                itemObj.desc = item.children[0].dataset.desc;
                itemObj.type = item.dataset.type.includes('/') ? item.dataset.type.split('/')[0] : item.dataset.type;
                itemObj.category = item.dataset.type.includes('/') ? item.dataset.type.split('/')[1] : null;
                slbItemsArr.push(itemObj);
            })

            let showCaseItem = e.target.closest('.showcase-item');
            lastDisplayed = slbItemsArr.find(function (obj) {
                return obj.src === showCaseItem.dataset.src;
            })

            appendOnlyElement(lastDisplayed);

            if (slbItemsArr.length > 1) {
                generate_displayNavBtn();
                generate_nav(theShowcase.dataset.nav);
            }

            document.getElementById('slb').classList.add("slb-active");
        });
    });

    document.getElementById('slb').addEventListener('click', function (e) {
        if (e.target === e.currentTarget) {
            close_slb();
        }
    })
    document.getElementById('slb-display').addEventListener('click', function (e) {
        if (e.target === e.currentTarget) {
            close_slb();
        }
    })

    function generate_slbStructure() {
        let SLB = document.createElement('div');
        SLB.id = 'slb';
        let SLB_DISPLAY = document.createElement('div');
        SLB_DISPLAY.id = 'slb-display';
        let SLB_DISPLAY_CONTENT = document.createElement('div');
        SLB_DISPLAY_CONTENT.id = 'slb-display-content';
        SLB_DISPLAY.appendChild(SLB_DISPLAY_CONTENT);
        SLB.appendChild(SLB_DISPLAY);

        document.body.appendChild(SLB);
    }

    function generate_closeBtn() {
        let SLB_CLOSE_BTN = document.createElement('button');
        SLB_CLOSE_BTN.id = 'slb-btn-close';
        SLB_CLOSE_BTN.classList.add('slb-btn');
        let SLB_CLOSE_BTN_ICON = document.createElement('i');
        SLB_CLOSE_BTN_ICON.classList.add('icon-x', 'slb-icon');
        SLB_CLOSE_BTN.appendChild(SLB_CLOSE_BTN_ICON);
        SLB_CLOSE_BTN.addEventListener("click", function (e) {
            close_slb();
        });

        document.getElementById('slb').appendChild(SLB_CLOSE_BTN);
    }

    function generate_displayNavBtn() {
        let SLB_PREV_BTN = document.createElement('button');
        SLB_PREV_BTN.id = "slb-prev-btn";
        SLB_PREV_BTN.classList.add('slb-btn', 'slb-btn-nav');
        let SLB_PREV_BTN_INNER_EL = document.createElement('i');
        SLB_PREV_BTN_INNER_EL.classList.add('slb-icon', 'icon-chevron-left');
        SLB_PREV_BTN.appendChild(SLB_PREV_BTN_INNER_EL);
        SLB_PREV_BTN.addEventListener('click', slb_showPrev);

        let SLB_NEXT_BTN = document.createElement('button');
        SLB_NEXT_BTN.id = "slb-next-btn";
        SLB_NEXT_BTN.classList.add('slb-btn', 'slb-btn-nav');
        let SLB_NEXT_BTN_INNER_EL = document.createElement('i');
        SLB_NEXT_BTN_INNER_EL.classList.add('slb-icon', 'icon-chevron-right');
        SLB_NEXT_BTN.appendChild(SLB_NEXT_BTN_INNER_EL);
        SLB_NEXT_BTN.addEventListener('click', slb_showNext);

        document.getElementById('slb-display').prepend(SLB_PREV_BTN);
        document.getElementById('slb-display').appendChild(SLB_NEXT_BTN);

    }

    // renders the media control buttons
    function generate_displayControls() {
        var DISPLAY_CONTROLS = document.createElement('div');
        DISPLAY_CONTROLS.id = 'slb-controls';

        // zoon in
        var SLB_ZOOM_IN = document.createElement('button');
        SLB_ZOOM_IN.id = "slb-zoom-in-btn";
        SLB_ZOOM_IN.classList.add('slb-btn', 'slb-btn-control');
        var SLB_ZOOM_IN_ICON = document.createElement('i');
        SLB_ZOOM_IN_ICON.classList.add('slb-icon', 'icon-zoom-in');
        SLB_ZOOM_IN.appendChild(SLB_ZOOM_IN_ICON);

        // zoom out
        var SLB_ZOOM_OUT = document.createElement('button');
        SLB_ZOOM_OUT.id = "slb-zoom-out-btn";
        SLB_ZOOM_OUT.classList.add('slb-btn', 'slb-btn-control');
        var SLB_ZOOM_OUT_ICON = document.createElement('i');
        SLB_ZOOM_OUT_ICON.classList.add('slb-icon', 'icon-zoom-out');
        SLB_ZOOM_OUT.appendChild(SLB_ZOOM_OUT_ICON);

        // rotate left
        var SLB_ROTATE_LEFT = document.createElement('button');
        SLB_ROTATE_LEFT.id = "slb-rotate-left-btn";
        SLB_ROTATE_LEFT.classList.add('slb-btn', 'slb-btn-control');
        var SLB_ROTATE_LEFT_ICON = document.createElement('i');
        SLB_ROTATE_LEFT_ICON.classList.add('slb-icon', 'icon-arrow-counterclockwise');
        SLB_ROTATE_LEFT.appendChild(SLB_ROTATE_LEFT_ICON);

        // rotate right
        var SLB_ROTATE_RIGHT = document.createElement('button');
        SLB_ROTATE_RIGHT.id = "slb-rotate-right-btn";
        SLB_ROTATE_RIGHT.classList.add('slb-btn', 'slb-btn-control');
        var SLB_ROTATE_RIGHT_ICON = document.createElement('i');
        SLB_ROTATE_RIGHT_ICON.classList.add('slb-icon', 'icon-arrow-clockwise');
        SLB_ROTATE_RIGHT.appendChild(SLB_ROTATE_RIGHT_ICON);

        // fullscreen enter
        var SLB_FULLSCREEN_TOGGLE = document.createElement('button');
        SLB_FULLSCREEN_TOGGLE.id = "slb-fullscreen-btn";
        SLB_FULLSCREEN_TOGGLE.classList.add('slb-btn', 'slb-btn-control');
        var SLB_FULLSCREEN_TOGGLE_ICON = document.createElement('i');
        SLB_FULLSCREEN_TOGGLE_ICON.classList.add('slb-icon', 'icon-fullscreen');
        SLB_FULLSCREEN_TOGGLE.appendChild(SLB_FULLSCREEN_TOGGLE_ICON);

        SLB_ZOOM_IN.addEventListener('click', slb_zoomIn);
        SLB_ZOOM_OUT.addEventListener('click', slb_zoonOut);
        SLB_ROTATE_LEFT.addEventListener('click', slb_rotateLeft);
        SLB_ROTATE_RIGHT.addEventListener('click', slb_rotateRight);
        SLB_FULLSCREEN_TOGGLE.addEventListener('click', slb_toggleFullscreen);

        DISPLAY_CONTROLS.appendChild(SLB_ZOOM_IN);
        DISPLAY_CONTROLS.appendChild(SLB_ZOOM_OUT);
        DISPLAY_CONTROLS.appendChild(SLB_ROTATE_LEFT);
        DISPLAY_CONTROLS.appendChild(SLB_ROTATE_RIGHT);
        DISPLAY_CONTROLS.appendChild(SLB_FULLSCREEN_TOGGLE);

        document.getElementById('slb').appendChild(DISPLAY_CONTROLS);
    }

    function generate_nav(type = 'dot') {
        let SLB_NAV_WRAP = document.createElement('div');
        SLB_NAV_WRAP.id = "slb-navigation-" + type + "s";
        SLB_NAV_WRAP.classList.add('slb-navigation');
        slbItemsArr.forEach(function (item, index) {
            let SLB_NAV_BTN = document.createElement('div');
            let className = "slb-nav-" + type;
            SLB_NAV_BTN.dataset.index = index;
            SLB_NAV_BTN.classList.add(className);

            let el = type === "thumb" ? 'img' : 'span';

            let SLB_NAV_BTN_INNER_EL = document.createElement(el);
            SLB_NAV_BTN_INNER_EL.classList.add("slb-nav-" + type + "-btn");
            if (el === 'img') {
                SLB_NAV_BTN_INNER_EL.src = item.thumbSrc;
            }
            SLB_NAV_BTN.appendChild(SLB_NAV_BTN_INNER_EL);
            SLB_NAV_BTN.addEventListener('click', appearContent)
            SLB_NAV_WRAP.appendChild(SLB_NAV_BTN);
        })
        document.getElementById('slb').appendChild(SLB_NAV_WRAP);
    }

    function appearContent(e) {
        let actualSource;
        if (e.target.tagName.toLowerCase() === 'div') {
            actualSource = slbItemsArr[e.target.dataset.index].src;
            slb_showNewItem(actualSource);
        } else {
            actualSource = e.target.dataset.src;
            slb_showNewItem(actualSource);
        }
        console.log("appearContent", actualSource);
    }

    function appendOnlyElement() {
        let contentObj = lastDisplayed;
        let parent = document.getElementById('slb-display-content');
        let child;
        if (contentObj.type.includes('image')) {
            child = document.createElement('img');
        } else if (contentObj.type.includes('video')) {
            child = document.createElement('video');
        }
        child.src = contentObj.src;
        child.classList.add('slb-display-media');
        removeAllChild(parent)
        parent.appendChild(child);
    }

    function removeAllChild(parent) {
        let lastChild = parent.lastElementChild;
        while (lastChild) {
            parent.removeChild(lastChild);
            lastChild = parent.lastElementChild;
        }
    }

    function close_slb() {
        document.getElementById('slb').classList.remove("slb-active");
        if (document.getElementById('slb-prev-btn')) {
            document.getElementById('slb-prev-btn').remove();
        }
        if (document.getElementById('slb-next-btn')) {
            document.getElementById('slb-next-btn').remove();
        }
        if (document.getElementById('slb-navigation-' + theShowcase.dataset.nav + 's')) {
            document.getElementById('slb-navigation-' + theShowcase.dataset.nav + 's').remove();
        }
        slbItemsArr = [];
        lastDisplayed = null;
        theShowcase = null;
        displayRotation = 0;
    }

    // display media control functions
    function slb_showNewItem(itemSrc = null, isNext = true) {
        displayRotation = 0;
        displayZoom = 0;
        let toShowNextIndex;
        // detect what I clicked
        if (itemSrc) {
            // its from navigation dots/thumbs
            // find its index
            toShowNextIndex = slbItemsArr.findIndex(function (obj) {
                return obj.src === itemSrc;
            })
        } else {
            // its from prev/next btn
            let lastItemIndex = slbItemsArr.findIndex(function (obj) {
                return obj.src === lastDisplayed.src;
            })

            if (isNext) {
                // try to show the next
                let hasNext = lastItemIndex !== slbItemsArr.length - 1 ? true : false;
                toShowNextIndex = hasNext ? lastItemIndex + 1 : 0;
            } else {
                // try to show the previous
                let hasNext = lastItemIndex !== 0 ? true : false;
                toShowNextIndex = hasNext ? lastItemIndex - 1 : slbItemsArr.length - 1;
            }
        }

        lastDisplayed = slbItemsArr[toShowNextIndex];
        appendOnlyElement();

    }
    function slb_showPrev() {
        console.log("Show nect");
        slb_showNewItem(null, false);
    }
    function slb_showNext() {
        console.log("Show nect");
        slb_showNewItem(null, true);
    }
    function slb_zoomIn() {
        if (displayZoom >= 3) return;
        displayZoom += 0.5;
        
        let theDisplayNode = document.querySelector('.slb-display-media');
        theDisplayNode.style.transform = "scale("+displayZoom+")";
        console.log("zoom in", displayZoom);
    }
    function slb_zoonOut() {
        if (displayZoom <= 1) return;
        displayZoom -= 0.5;
        
        let theDisplayNode = document.querySelector('.slb-display-media');
        theDisplayNode.style.transform = "scale("+displayZoom+")";
        console.log("zoom out", displayZoom);
    }
    function slb_rotateLeft() {
        console.log("rotate left");
        rotateDisplay(-90)
    }
    function slb_rotateRight() {
        console.log("rotate right");
        rotateDisplay(90)
    }

    function slb_toggleFullscreen() {
        let isOnFullscreen = document.fullscreenElement;
        let fullscreenBtnIcon = document.querySelector('.icon-fullscreen') || document.querySelector('.icon-fullscreen-exit');
        console.log(fullscreenBtnIcon);

        if (!isOnFullscreen) {
            console.log("was not is fullscreen");
            fullscreenBtnIcon.classList.replace('icon-fullscreen', 'icon-fullscreen-exit');
            document.documentElement.requestFullscreen();
        } else {
            console.log("was in fullscreen");
            fullscreenBtnIcon.classList.replace('icon-fullscreen-exit', 'icon-fullscreen');
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
        console.log(fullscreenBtnIcon);
    }

    function rotateDisplay(deg) {
        displayRotation += deg;
        let transitionSpeed = 300;
        let theDisplayNode = document.querySelector('.slb-display-media');
        theDisplayNode.style.opacity = 0.5;
        setTimeout(function () {
            theDisplayNode.style.opacity = 1;
        }, transitionSpeed / 2)
        theDisplayNode.style.transform = "rotate(" + displayRotation + "deg)";
    }

    
    /**
     * generate a invisible layer over videos
     */
    function generateInvisibleVideoLayer(params) {
        
    }
















});

