/**
 * Configuarations
 */
const lb = {
    /**
     * Defining default class names
     */
    containerClass: 'showcase',
    itemClass: 'showcase-item'
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

    public on(type: string, el: Element, cb: any) {
        el.addEventListener(type, cb);
    }
}

class DomLightBox extends Dom {
    public isActive: boolean = false;
    private activeClassName: string = 'slb-active';
    public showcase: HTMLDivElement;

    constructor(tag: string) {
        super(tag);
        this.isActive = true;
    }

    /**
     * Get lightbox overlay status
     */
    get currentStatus() {
        return this.isActive;
    }

    /**
     * Prepare lightbox overlay
     */
    public prepare() {
        // creating elements
        const closeBtn = this.create('button', 'slb-btn-close', 'slb-btn');
        const closeIcon = this.create('i', null, ['icon-x', 'slb-icon']);

        const displayArea = this.create('div', 'slb-display');
        const prevBtn = this.create('btn', 'slb-prev-btn', ['slb-btn', 'slb-btn-nav']);
        const prevBtnIcon = this.create('i', null, ['icon-chevron-left', 'slb-icon']);
        const nestBtn = this.create('btn', 'slb-next-btn', ['slb-btn', 'slb-btn-nav']);
        const nextBtnIcon = this.create('i', null, ['icon-chevron-right', 'slb-icon']);

        const displayContentArea = this.create('i', null, 'slb-display-content');


        // placing elements
        this.append(closeIcon, closeBtn);
        this.append(nextBtnIcon, nestBtn);
        this.append(prevBtnIcon, prevBtn);

        const mainAreaElements = [
            closeBtn,
            displayArea,
            nestBtn,
            prevBtn,
            displayContentArea
        ];
        this.append(mainAreaElements, this.mainElement);
        // adding event listener
        this.on('click', closeBtn, () => {
            this.close();
        });
    }

    /**
     * Display or hides the lightbox overlay
     */
    public state(status: boolean) {
        this.isActive = status;
        if (this.isActive) {
            this.open();
        } else {
            this.close();
        }
    }

    public manageShowcase(showcase: HTMLElement) {
        console.log(showcase);
        let count = 0;

        showcase.querySelectorAll('.showcase-item').forEach(function (item) {
            console.log(item);
            count++
        })

        console.log('count : ', count);

    }

    private open() {
        this.prepare();
        this.mainElement.classList.add(this.activeClassName);
    }
    private close() {
        this.mainElement.classList.remove(this.activeClassName);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let lightbox = new DomLightBox('div');

    lightbox.addAttrs('id', "slb", lightbox.mainElement);

    document.body.appendChild(lightbox.mainElement);

    let items = document.getElementsByClassName(lb.itemClass);
    for (let i = 0; i < items.length; i++) {
        lightbox.on('click', items[i], (e: Event | null) => {
            lightbox.manageShowcase(e.target.closest(".showcase"));
            lightbox.state(true);
        })
    }
})
