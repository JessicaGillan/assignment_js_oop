ASTEROIDS = ASTEROIDS || {}
ASTEROIDS.Controller = {
  init: function init(){
    this.model = ASTEROIDS.Model;
    this.view = ASTEROIDS.View;
    this.model.init();
    this.view.init({resize: ASTEROIDS.Controller.resize, keyDown: ASTEROIDS.Model.startKey, keyUp: ASTEROIDS.Model.stopKey,});
    this.animationSpeed();
    this.animate()
  },
  resize: function(w, h){
    ASTEROIDS.Model.newSize(w, h);
  },
  animationSpeed: function animationSpeed(){
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
  },
  animate: function animate(){
    requestAnimationFrame(function(){ASTEROIDS.Controller.animate()});
    this.model.moveAsteroids();
    this.view.renderAsteroids(this.model.asteroids);
    this.model.moveShip();
    this.model.checkCollision();
    this.model.ship.setVertices();
    this.view.renderShip(this.model.ship);
  }
}
