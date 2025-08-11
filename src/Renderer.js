// Do not destroy this class
export class Renderer {
  element;
  ctx;
  width;
  height;
  
  fps = 0;
  #fpsCounter = 0;
  
  frameCallback;
  
  constructor() {
    this.element = document.querySelector("canvas");
    this.ctx = this.element.getContext("2d");
    this.#handleResize();
    
    window.addEventListener("resize", () => this.#handleResize());
    requestAnimationFrame((t) => this.#handleFrame(t));
    setInterval(() => {
      this.fps = this.#fpsCounter;
      this.#fpsCounter = 0;
    }, 1000);
  }
  
  #handleResize() {
    this.element.style.width = `${window.innerWidth}px`;
    this.element.style.height = `${window.innerHeight}px`;
    
    this.element.width = Math.round(window.innerWidth * window.devicePixelRatio);
    this.element.height = Math.round(window.innerHeight * window.devicePixelRatio);
    
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    
    this.ctx.font = "16px sans-serif";
  }
  
  #handleFrame(t) {
    if (!this.frameCallback) {
      this.ctx.fillStyle = "#ff8000";
      this.ctx.fillRect(0, 0, this.width, this.height);
    } else {
      this.frameCallback(t);
    }
    
    this.#fpsCounter++;
    requestAnimationFrame((t) => this.#handleFrame(t));
  }
}
