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
  static setActiveScene(scene,object = null){
    if (Instance.activeScene != null) Instance.activeScene.setActive(false);
    Instance.activeScene = scene;
    if (scene.config.loader != null) scene.config.loader(scene,object);
    scene.setActive(true);
  }
  draw(){
    if (this.config.shouldDraw != false){
      for (let element of this.elements){ element.draw(); }
    }
  }
}
