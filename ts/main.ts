/**
 * Configuarations
 */
const lb = {
    /**
     * Defining default class names
     */
    containerClass: 'showcase',
    itemClass: 'showcase-item',
    prefix: 'slb'
}

/**
 * Class to generate and manage dom elements
 */

class Dom {
    public mainElement: HTMLElement;
    protected el: any;
    constructor(tag: string) {
        this.mainElement = this.create(tag);
    }

    public create(tag: string, id: string | null = null, cls: string | string[] | null = null) {
        let createdElement = document.createElement(tag);
        if (id) {
            createdElement.setAttribute('id', id);
        }
        if (cls) {
            if (Array.isArray(cls)) {
                createdElement.classList.add(...cls)
            } else {
                createdElement.classList.add(cls)
            }
        }
        return createdElement
    }

    public addAttrs(key: string, value: string, el: HTMLElement) {
        el.setAttribute(key, value);
    }

    public addClass(values: string[]) {
        this.el.classList.add(...values);
        return this;
    }

    public addDataset(key: string, value: string) {
        this.el.dataset[key] = value;
        return this;
    }

    public append(child: HTMLElement | HTMLElement[], parent: HTMLElement) {
        if (Array.isArray(child)) {
            parent.append(...child);
        } else {
            parent.append(child);
        }
        return this;
    }

    protected appendTo(elements: HTMLElement[], containner: HTMLElement) {
        this.append(elements, containner);
    }

    public on(type: string, el: Element, cb: any) {
        el.addEventListener(type, cb);
    }

    public parent(ele: any, parentClass = "showcase") {
        let element = ele;
        while (!element.classList.contains(parentClass)) {
            element = element.parentElement;
        }
        return element;
    }
}



class DomLightBox extends Dom {
    public isActive: boolean = false;
    private activeClassName: string = 'slb-active';
    public count: number = 0;
    public content: Array<object> = [];
    public nav: HTMLElement | null = null;
    public navType: String | null = null;
    private clickedItem: number = 0;
    protected displayArea: HTMLElement;
    constructor(tag: string) {
        super(tag);
        this.isActive = true;
    }

    // Get lightbox overlay status
    get currentStatus() {
        return this.isActive;
    }

    // Prepare lightbox overlay
    public prepare() {
        // creating elements
        const closeBtn = this.create('button', 'slb-btn-close', 'slb-btn');
        const closeIcon = this.create('i', null, ['icon-x', 'slb-icon']);

        const displayArea = this.create('div', 'slb-display');
        this.displayArea = displayArea;

        const screen = this.create('div', 'slb-display-content', null);
        this.append(screen, displayArea);
        console.log("The target content to display: ");
        console.table(this.content[this.clickedItem].tag);

        const media = this.create(this.content[this.clickedItem].tag, null, 'slb-display-media')
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
        this.on('click', closeBtn, () => {
            this.close();
        });
        this.isClickedOutside();
    }

    private generateNavBtns() {
        const prevBtn = this.create('btn', 'slb-prev-btn', ['slb-btn', 'slb-btn-nav']);
        const prevBtnIcon = this.create('i', null, ['icon-chevron-left', 'slb-icon']);
        const nestBtn = this.create('btn', 'slb-next-btn', ['slb-btn', 'slb-btn-nav']);
        const nextBtnIcon = this.create('i', null, ['icon-chevron-right', 'slb-icon']);

        this.append(nextBtnIcon, nestBtn);
        this.append(prevBtnIcon, prevBtn);

        // this.appendTo([
        //     prevBtn,
        //     nestBtn
        // ], this.displayArea)

        this.displayArea.prepend(prevBtn)
        this.displayArea.append(nestBtn)
    }

    //Controls lightbox's visibility
    public state(status: boolean) {
        this.isActive = status;
        if (this.isActive) {
            this.open();
        } else {
            this.close();
        }
    }

    private generate_nav(type: String = 'dot') {
        let self = this;
        let navID = "slb-navigation-" + type + "s";
        let nav = this.create('div', navID, 'slb-navigation');
        this.content.forEach(obj => {
            let navBtn = self.create('div', null, "slb-nav-" + type);

            let el = type === "thumb" ? 'img' : 'span';

            let navBtnELement: HTMLImageElement | HTMLSpanElement = self.create(el, null, "slb-nav-" + type + "-btn");

            if (navBtnELement.nodeName.toLowerCase() === 'img') {
                navBtnELement.src = obj.thumb;
            }

            navBtn.appendChild(navBtnELement);
            // navBtn.addEventListener('click', appearContent)
            nav.appendChild(navBtn);
        })
        this.nav = nav;
        this.mainElement.appendChild(nav);
    }
    public manageShowcase(target: Element) {
        let showcase = this.parent(target, lb.containerClass);
        this.navType = showcase.dataset.nav;
        let showcaseItems = showcase.querySelectorAll('.showcase-item')!;
        let totalChilds = showcaseItems.length;
        for (let i = 0; i < totalChilds; i++) {
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

    }
    private open() {
        this.prepare();
        this.mainElement.classList.add(this.activeClassName);
    }
    private close() {
        this.mainElement.classList.remove(this.activeClassName);
        this.reset();
    }

    public isClickedOutside() {
        let self = this;
        // this.mainElement.addEventListener('click', function (e) {
        // })
        this.on('click', this.mainElement, (e: Event) => {
            if (e.target === e.currentTarget) {
                self.close();
            }
        });

        this.on('click', this.displayArea, (e: Event) => {
            if (e.target === e.currentTarget) {
                self.close();
            }
        });
    }
    protected removeAllChild(parent: HTMLElement) {
        let lastChild = parent.lastElementChild;
        while (lastChild) {
            parent.removeChild(lastChild);
            lastChild = parent.lastElementChild;
        }
    }
    private reset() {
        this.count = 0;
        this.removeAllChild(this.displayArea);
        this.content = [];
        this.navType = null;
        if (this.nav) {
            this.nav.remove();
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let lightbox = new DomLightBox('div');

    lightbox.addAttrs('id', "slb", lightbox.mainElement);

    document.body.appendChild(lightbox.mainElement);

    let items = document.getElementsByClassName(lb.itemClass);
    for (let i = 0; i < items.length; i++) {
        lightbox.on('click', items[i], (e: any) => {
            lightbox.manageShowcase(e.target);
            lightbox.state(true);
        })
    }
})
