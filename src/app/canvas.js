const DEFAULT_WIDTH = 640;
const DEFAULT_HEIGHT = 480;

export default class Canvas {
  constructor(id) {
    this.canvas = document.getElementById(id);
    this.context = null;
  }

  initialize(options = {}) {
    this.context = this.canvas.getContext('2d');
    this.canvas.setAttribute('width', `${options.width || DEFAULT_WIDTH}px`);
    this.canvas.setAttribute('height', `${options.height || DEFAULT_HEIGHT}px`);
    this.width = options.width || DEFAULT_WIDTH;
    this.height = options.height || DEFAULT_HEIGHT;
    return this;
  }
}
