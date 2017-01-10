ASTEROIDS = ASTEROIDS || {}
ASTEROIDS.Model = {
  init: function init(options) {
    options = options || {};

    this.gameLevel = options.gameLevel || 0.1;
    this.minSpeed = options.minSpeed || 0.5;
    this.width = options.width || window.innerWidth;
    this.height = options.height || window.innerHeight;
    this.ship = new this.Ship();
    this.asteroids = [];
    this.initAsteroids(options.num);
  },
  keys: [],
  initAsteroids: function initAsteroids(num) {
    num = Math.max((num || 3), 1);

    for(var i=0; i < num; i++){
      this.addAsteroid();
    }
  },
  addAsteroid: function addAsteroid(options){
    this.asteroids.push( new this.Asteroid(options));
  },
  newSize: function newSize(w, h){
    this.height = h;
    this.width = w;
  },
  moveAsteroids: function moveAsteroids(){
    for(var i = 0; i < this.asteroids.length; i++){
      if(this.asteroids[i].dirty){
        this.asteroids[i].tic();
        this.screenWrap(this.asteroids[i]);
      }
    }
  },
  startKey: function startKey(key){
    ASTEROIDS.Model.keys[key] = true;
  },
  stopKey: function stopKey(key){
    ASTEROIDS.Model.keys[key] = false;
  },
  moveShip: function moveShip(){
    if (this.keys[38]) {
      // up arrow
      this.ship.vx += this.ship.dx(this.ship.direction)
      this.ship.vy += this.ship.dy(this.ship.direction)
    }
    if (this.keys[39]) {
      // right arrow
      this.ship.direction += (Math.PI/30)
    }
    if (this.keys[37]) {
      // left arrow
      this.ship.direction -= (Math.PI/30)
    }
    if(this.keys[32]){
      // spacebar
    }
    this.ship.tic()
    this.screenWrap(this.ship)
  },
  screenWrap: function screenWrap(obj){
    // Right Side
    if(obj.x - obj.radius >= this.width){
      console.log("off the right");
      obj.x -= this.width;

      // Left Side
    } else if(obj.x + obj.radius <= 0) {
      console.log("off the left side");
      obj.x += this.width;
    }
    // Bottom Side
    if(obj.y - obj.radius >= this.height) {
      console.log("off the bottom");
      obj.y -= this.height;
      // Top Side
    } else if(obj.y + obj.radius <= 0) {
      console.log("off the top");
      obj.y += this.height;
    }
  }
}

var _AM = ASTEROIDS.Model

_AM.Moveable = function Moveable(coords) {
  coords = coords || {};
  this.x = coords.x || _AM.height/2;
  this.y = coords.y || _AM.width/2;
  this.vx = coords.vx || 0;
  this.vy = coords.vy || 0;
  this.dirty = true;

}

_AM.Moveable.prototype.tic = function(){
  this.x += this.vx;
  this.y += this.vy;
  this.dirty = true;

  return this.x + ", " + this.y;
}

_AM.Asteroid = function Asteroid(coords){
  coords = coords || {};

  coords.x = coords.x || Math.random() * ASTEROIDS.Model.width;
  coords.y = coords.y || Math.random() * ASTEROIDS.Model.height;
  coords.vx = coords.vx || ((Math.random() * _AM.gameLevel) + _AM.minSpeed) * (Math.random() > .5 ? -1 : 1);
  coords.vy = coords.vy || ((Math.random() * _AM.gameLevel) + _AM.minSpeed) * (Math.random() > .5 ? -1 : 1);
  this.radius = (Math.random() * 30) + 10;
  _AM.Moveable.call(this, coords);
}

_AM.Asteroid.prototype = Object.create(_AM.Moveable.prototype);
_AM.Asteroid.prototype.constructor = _AM.Asteroid;

_AM.Ship = function Ship(coords){
  coords = coords || {};

  coords.x = coords.x || _AM.width/2;
  coords.y = coords.y || _AM.height/2;
  coords.vx = coords.vx || 0;
  coords.vy = coords.vy || 0;
  this.direction = Math.PI*3/2;
  this.radius = 20;
  _AM.Moveable.call(this, coords);

  this.dx = function(theta, radius){
    return (radius || this.radius) * Math.cos(theta)
  }

  this.dy = function(theta, radius){
    return (radius || this.radius) * Math.sin(theta)
  }

  this.setVertices = function() {
    this.vertices = [
      [this.x + this.dx(this.direction), this.y + this.dy(this.direction)],
      [this.x + this.dx(this.direction + 3*Math.PI/4), this.y + this.dy(this.direction + 3*Math.PI/4)],
      [this.x + this.dx(this.direction + Math.PI, this.radius*2/5), this.y + this.dy(this.direction + Math.PI,this.radius*2/5)],
      [this.x + this.dx(this.direction - 3*Math.PI/4), this.y + this.dy(this.direction - 3*Math.PI/4)]
    ]
  }
}

_AM.Ship.prototype = Object.create(_AM.Moveable.prototype);
_AM.Ship.prototype.constructor = _AM.Ship;
