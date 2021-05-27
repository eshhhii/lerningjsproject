export default class Section {
  constructor({ renderer }, containerSelector) {
    /*this._items = items;*/
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  addItem(element, toEnd) {
    const method = toEnd ? "append" : "prepend";
    this._container[method](element);
  }

  renderItems(arr) {
    arr.forEach((item) => {
      this._renderer(item);
    });
  }
}
