const assets = {};

assets.images = {};

assets.load = function () {
  return new Promise((resolve, reject) => {
    const images = [
      "edit",
      "fullscreen",
      "githubLogo"
    ];
    
    let loadedImages = 0;
    
    for (let image of images) {
      assets.images[image] = new Image();
      assets.images[image].src = `assets/images/${image}.svg`;
      assets.images[image].decode().then(() => {
        loadedImages++;
        
        if (loadedImages == images.length) {
          console.log("Loaded assets");
          resolve();
        }
      });
    }
  });
};
