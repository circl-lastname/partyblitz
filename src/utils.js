export function el(name, ...childrenOrAttributes) {
  let element = document.createElement(name);
  
  let attributes = childrenOrAttributes[0];
  
  if (attributes && Object.getPrototypeOf(attributes) === Object.prototype) {
    for (let key in attributes) {
      if (key == "classes") {
        for (let item of attributes.classes) {
          element.classList.add(item);
        }
      } else {
        element[key] = attributes[key];
      }
    }
    
    element.append(...childrenOrAttributes.slice(1));
  } else {
    element.append(...childrenOrAttributes);
  }
  
  return element;
}
