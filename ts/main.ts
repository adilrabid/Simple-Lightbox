/**
 * Class to generate and manage dom elements
 */

class Dom {
    public mainElement:HTMLElement;
    protected el: any;
    constructor(tag: string) {
        this.mainElement = document.createElement('tag');
    }
    
    public create(tag: string) {
        return document.createElement('tag');
    }

    public addAttrs(attrs: object){
        
    }

    public addClass(values: string[]){
        this.el.classList.add(...values);
        return this;
    }

    public addDataset(key: string, value: string){
        this.el.dataset[key] = value;
        return this;
    }

    public append(child: HTMLElement) {
        this.mainElement.append(child);
        return this;
    }
}

class DomLightBox extends Dom{
    public isActive : boolean =  false;

    constructor(tag: string){
        super(tag);
        this.isActive = true;
    }
    get activeStatus(){
        return this.isActive;
    }

    set activeStatus(status: boolean){
        this.isActive = false;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let overlay = new Dom('div');
    document.querySelectorAll('.showcase-item').forEach((item) => {
        item.addEventListener('click', (e) => {
            
            console.log(e.target);
            
        })
    })
})
