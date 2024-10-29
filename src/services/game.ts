import Player from './player.ts'

class Game {
  playing:boolean
  player:object

  constructor() {
    this.playing = false
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.player = {};
  }

  create() {
    if (this.playing === true) return
    this.playing = true
    const map = document.getElementById('map');
    const mapRect = map.getBoundingClientRect();
    const mapHeight = mapRect.height
    const mapWidth = mapRect.width
    this.player = new Player()
    this.player.create(mapWidth/2, mapHeight/2)

    window.addEventListener('keydown', this.handleKeyPress);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('click', this.handleClick);
  }

  endGame() {
    window.removeEventListener('keydown', this.handleKeyPress);
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('click', this.handleClick);
  }

  handleKeyPress(event) {
    if(!this.playing) return
    this.player.move(event)
  }

  handleMouseMove(event) {
     if(!this.playing) return
    const posX = event.clientX;
    const posY = event.clientY;
    this.player.pointTurret(posX, posY);
  }

  handleClick(event) {
     if(!this.playing) return
    this.player.fireTurret(event.clientX, event.clientY)
  }

};

export default Game
