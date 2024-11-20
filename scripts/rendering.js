const rendering = {};

rendering.canvas = document.getElementById("canvas");
rendering.ctx = rendering.canvas.getContext("2d");

rendering.scale = undefined;
rendering.originX = undefined;
rendering.originY = undefined;
rendering.canvasWidth = undefined;
rendering.canvasHeight = undefined;

rendering.renderScheduled = false;

rendering.init = function () {
  window.addEventListener("resize", () => {
    rendering.initCanvas();
    rendering.scheduleRender();
  });
  
  this.initCanvas();
};

rendering.initCanvas = function () {
  this.canvas.style.width = `${window.innerWidth}px`;
  this.canvas.style.height = `${window.innerHeight}px`;
  
  this.canvas.width = Math.ceil(window.innerWidth * window.devicePixelRatio);
  this.canvas.height = Math.ceil(window.innerHeight * window.devicePixelRatio);
  
  let horizontalScale = this.canvas.width/1280;
  let optimalHeight = horizontalScale*720;
  
  if (this.canvas.height >= optimalHeight) {
    this.scale = horizontalScale;
    this.originX = 0;
    this.originY = (this.canvas.height/2 - optimalHeight/2) / this.scale;
  } else {
    this.scale = this.canvas.height/720;
    let optimalWidth = this.scale*1280;
    this.originX = (this.canvas.width/2 - optimalWidth/2) / this.scale;
    this.originY = 0;
  }
  
  this.canvasWidth = this.canvas.width / this.scale;
  this.canvasHeight = this.canvas.height / this.scale;
  
  this.ctx.scale(this.scale, this.scale);
  this.ctx.translate(this.originX, this.originY);
  this.ctx.font = "72px Grandstander, sans-serif";
  this.ctx.textBaseline = "top";
};

rendering.fillBackground = function () {
  this.ctx.fillRect(-this.originX, -this.originY, this.canvasWidth, this.canvasHeight);
};

rendering.scheduleRender = function () {
  if (!this.renderScheduled) {
    this.renderScheduled = true;
    
    requestAnimationFrame(() => {
      this.renderScheduled = false;
      
      states[state].render();
      
      if (overlay) {
        this.ctx.fillStyle = "#00000080";
        this.fillBackground();
        
        overlays[overlay].render();
      }
    });
  }
};
