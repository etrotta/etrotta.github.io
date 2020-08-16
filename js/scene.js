class Scene{
  constructor(config,...elements){
    this.config = config;
    this.elements = [...elements];
  }
  addClickable(clickable){
    this.elements.push(clickable);
  }
  setActive(value){
    for (let element of this.elements){
      element.setActive(value);
    }
  }
  reset(){
    while (this.elements.length){ this.elements.pop(); }
  }
  static setActiveScene(scene){
    Instance.activeScene.setActive(false);
    Instance.activeScene = scene;
    scene.setActive(true);
  }
  draw(){
    if (this.config.shouldDraw != false){
      for (let element of this.elements){ element.draw(); }
    }
  }
}
