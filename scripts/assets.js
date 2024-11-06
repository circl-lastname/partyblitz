const assets = {};

assets.images = {};

assets.load = function (callback) {
  const images = [
    "githubLogo",
    "fullscreen"
  ];
  
  let loadedImages = 0;
  
  for (let image of images) {
    this.images[image] = new Image();
    this.images[image].src = `assets/images/${image}.svg`;
    this.images[image].decode().then(() => {
      loadedImages++;
      
      if (loadedImages == images.length) {
        console.log("Loaded assets");
        callback();
      }
    });
  }
};
