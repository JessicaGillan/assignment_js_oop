ASTEROIDS = ASTEROIDS || {}

ASTEROIDS.View = {
  init: function init(cb) {
    this.setHTML();
    this.initCanvas();
    this.listeners(cb);
    this.renderBackground();
  },
  setHTML: function setHTML(){
    this.gameWrapper = document.getElementsByTagName('asteroids')[0] || this.createWrapper();
    this.backgroundCanvas = this.gameWrapper.getElementsByClassName('asteroids-background')[0] || this.createCanvas('asteroids-background');
    this.asteroidCanvas = this.gameWrapper.getElementsByClassName('asteroids-objects')[0] || this.createCanvas('asteroids-objects');
    this.spaceshipCanvas = this.gameWrapper.getElementsByClassName('asteroids-spaceship')[0] || this.createCanvas('asteroids-spaceship');
  },
  initCanvas: function initCanvas() {
    this.bgContext = this.backgroundCanvas.getContext('2d');
    this.bgContext.fillStyle = "black";
    this.astrdContext = this.asteroidCanvas.getContext('2d');
    this.shipContext = this.spaceshipCanvas.getContext('2d');
    this.resize();
  },
  listeners: function listeners(cb){
    cb = cb || {};
    var _this = this;

    if(cb.keyDown){
      document.body.addEventListener("keydown", function(e) {
        cb.keyDown(e.which || e.keyCode || 0)
      });
    }

    if(cb.keyUp){
      document.body.addEventListener("keyup", function(e) {
        cb.keyUp(e.which || e.keyCode || 0)
      });
    }

    window.addEventListener('resize', function() {
      _this.resize();
      if(cb.resize){
        cb.resize(_this.width, _this.height);
      }
    });
  },
  resize: function resize() {
    this.height = window.innerHeight;
    this.width = window.innerWidth;
    this.backgroundCanvas.height = this.height;
    this.backgroundCanvas.width = this.width;
    this.asteroidCanvas.height = this.height;
    this.asteroidCanvas.width = this.width;
    this.spaceshipCanvas.height = this.height;
    this.spaceshipCanvas.width = this.width;

    this.renderBackground();
  },
  createWrapper: function createWrapper() {
    var wrapper = document.createElement('ASTEROIDS');
    document.body.appendChild(wrapper);

    return wrapper;
  },
  createCanvas: function createCanvas(className) {
    var canvas = document.createElement('CANVAS');
    canvas.classList.add(className);
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    this.gameWrapper.appendChild(canvas);

    return canvas;
  },
  renderBackground: function renderBackground() {
    this.bgContext.clearRect(0,0, this.width, this.height);
    this.bgContext.fillRect(0,0, this.backgroundCanvas.width, this.backgroundCanvas.height);
  },
  renderAsteroids: function renderObjects(objects){
    this.astrdContext.strokeStyle = "white";
    this.astrdContext.clearRect(0,0, this.width, this.height);

    for(var i = 0; i < objects.length; i++){
      this.astrdContext.beginPath();
      this.astrdContext.arc(objects[i].x, objects[i].y, objects[i].radius, 0, Math.PI*2);
      this.astrdContext.stroke();
      this.screenWrap(objects[i]);
    }
  },
  renderShip: function renderShip(ship){
    this.shipContext.strokeStyle = "white";
    this.shipContext.clearRect(0,0, this.width, this.height);
    this.shipContext.beginPath();
    this.shipContext.moveTo(ship.vertices[0][0], ship.vertices[0][1]);
    for(var i = 1; i < ship.vertices.length; i++){
      this.shipContext.lineTo(ship.vertices[i][0], ship.vertices[i][1]);
    }
    this.shipContext.closePath();
    this.shipContext.stroke()
  },
  screenWrap: function screenWrap(obj){
    // Bottom right corner
    if(obj.x + obj.radius >= this.width && obj.y + obj.radius >= this.height){
      // console.log("off the bottom right");
      this.astrdContext.beginPath();
      this.astrdContext.arc(obj.x-this.width, obj.y-this.height, obj.radius, 0, Math.PI*2);
      this.astrdContext.stroke();
      // Top right Corner
    } else if(obj.x + obj.radius >= this.width && obj.y - obj.radius <= 0){
      // console.log("off the top right");
      this.astrdContext.beginPath();
      this.astrdContext.arc(obj.x-this.width, obj.y+this.height, obj.radius, 0, Math.PI*2);
      this.astrdContext.stroke();
      // Top Left Corner
    } else if(obj.x - obj.radius <= 0 && obj.y - obj.radius <= 0){
      // console.log("off the top left");
      this.astrdContext.beginPath();
      this.astrdContext.arc(obj.x+this.width, obj.y+this.height, obj.radius, 0, Math.PI*2);
      this.astrdContext.stroke();
      // Bottom Left Corner
    } else if(obj.x - obj.radius <= 0 && obj.y + obj.radius >= this.height){
      // console.log("off the bottom left");
      this.astrdContext.beginPath();
      this.astrdContext.arc(obj.x+this.width, obj.y-this.height, obj.radius, 0, Math.PI*2);
      this.astrdContext.stroke();
      // Right Side
    } else if(obj.x + obj.radius >= this.width){
      // console.log("off the right");
      this.astrdContext.beginPath();
      this.astrdContext.arc(obj.x-this.width, obj.y, obj.radius, 0, Math.PI*2);
      this.astrdContext.stroke();
      // Left Side
    } else if(obj.x - obj.radius <= 0) {
      // console.log("off the left side");
      this.astrdContext.beginPath();
      this.astrdContext.arc(obj.x+this.width, obj.y, obj.radius, 0, Math.PI*2);
      this.astrdContext.stroke();
      // Bottom Side
    } else if(obj.y + obj.radius >= this.height) {
      // console.log("off the bottom");
      this.astrdContext.beginPath();
      this.astrdContext.arc(obj.x, obj.y-this.height, obj.radius, 0, Math.PI*2);
      this.astrdContext.stroke();
      // Top Side
    } else if(obj.y - obj.radius <= 0) {
      // console.log("off the top");
      this.astrdContext.beginPath();
      this.astrdContext.arc(obj.x, obj.y+this.height, obj.radius, 0, Math.PI*2);
      this.astrdContext.stroke();
    }
  },
  gameOver: function gameOver(){
    this.shipContext.font="50vh Verdana";
    this.shipContext.strokeText("Game Over", this.width/4, this.height*.75, this.width/2)
  }
}
