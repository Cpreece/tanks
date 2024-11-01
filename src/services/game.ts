import Player from './player'

class Game {
  playing: boolean
  player: object

  constructor() {
    this.playing = false
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.player = {};
  }

  startGame() {
    if (this.playing === true) return
    this.playing = true
    const map = document.getElementById('map');
    const mapRect = map.getBoundingClientRect();
    const mapHeight = mapRect.height
    const mapWidth = mapRect.width
    this.player = new Player()
    this.player.create(mapWidth / 2, mapHeight / 2)
    window.addEventListener('keydown', this.handleKeyPress);
    window.addEventListener('mousemove', this.handleMouseMove);
    setTimeout(() => {
      window.addEventListener('click', this.handleClick);
    }, 100)
    this.moveMissle();
  }

  moveMissle() {
    const missles = document.querySelectorAll('.missle')
    try {
      missles.forEach((missle) => {
        const xVelocity = parseInt(missle.getAttribute('xVelocity'))
        const yVelocity = parseInt(missle.getAttribute('yVelocity'))
        let missleX = parseInt(window.getComputedStyle(missle).left.split('px')[0])
        let missleY = parseInt(window.getComputedStyle(missle).top.split('px')[0]);
        missleX += xVelocity
        missleY += yVelocity
        missle.style.left = missleX + 'px'
        missle.style.top = missleY + 'px'
        this.handleMissleCollision(missle, missleX, missleY);
      })
    } catch (error) {console.error(error)}
    setTimeout(() => {
      this.moveMissle()
    }, 50)
  }

  handleMissleCollision(missle, missleX, missleY) {
    const map = document.getElementById('map');
    const mapRect = map.getBoundingClientRect();
    if (-10 > missleX || missleX > mapRect.width + 10) {
      missle.remove()
    }
    if (-10 > missleY || missleY > mapRect.height + 10) {
      missle.remove()
    }
  }


  endGame() {
    window.removeEventListener('keydown', this.handleKeyPress);
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('click', this.handleClick);
  }

  handleKeyPress(event) {
    if (!this.playing) return
    this.player.move(event)
  }

  handleMouseMove(event) {
    if (!this.playing) return
    const posX = event.clientX;
    const posY = event.clientY;
    this.player.pointTurret(posX, posY);
  }

  handleClick(event) {
    if (!this.playing) return
    this.player.fireTurret(event.clientX, event.clientY)
  }

};

export default Game
