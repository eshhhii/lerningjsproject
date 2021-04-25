export default class Section {
    constructor({items, renderer}, containerSelector){
        this._items = items;
        this._renderer = renderer;
        this._containerSelector = document.querySelector(containerSelector);
        
    }

addItem(element, toEnd) {
    const method = toEnd ? 'append' : 'prepend';  
    this._containerSelector[method](element);
      
}
renderer() {
    this._items.forEach(item => {
        this._renderer(item) });
}
}