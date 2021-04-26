export default class Section {
    constructor({items, renderer}, containerSelector){
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
        
    }

addItem(element, toEnd) {
    const method = toEnd ? 'append' : 'prepend';  
    this._container[method](element);
      
}
renderer() {
    this._items.forEach(item => {
        this._renderer(item) });
}
}