class Scene{
  constructor(config,...elements){
    this.config = config;
    this.elements = [...elements];
  }
  addElement(element){
    this.elements.push(element);
  }
  setActive(value){
    for (let element of this.elements){
      element.setActive(value);
    }
    if (this.config.resetOnClose && value === false) this.reset();
  }
  reset(){
    while (this.elements.length){ this.elements.pop(); }
  }
  getElementByText(text){
    for (let element of this.elements){
      if (element.text != null && element.text.text === text){
        return element;
      }
    }
    return null;
  }
  static setActiveScene(scene,...args){ //object passed to loaders, if any
    if (Instance.activeScene != null) Instance.activeScene.setActive(false);
    Instance.activeScene = scene;
    if (scene.config.loader != null) scene.config.loader(scene,...args);
    scene.setActive(true);
  }
  static addPopup(popup,...args){
    Instance.popups.push(popup);
    if (popup.config.loader != null) popup.config.loader(popup,...args);
    popup.setActive(true);
  }
  static removePopup(popup){
    Instance.popups.remove(popup);
    popup.setActive(false);
  }
  draw(){
    if (this.config.shouldDraw != false){
      for (let element of this.elements){ element.draw(); }
    }
  }
}
