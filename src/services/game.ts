import Player from './player'
import Enemy from './enemy'

class Game {
  playing: boolean
  player: object
  enemy: object
  level: number
  enemyDelay: number

  constructor() {
    this.playing = false
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.player = {};
    this.enemy = {};
    this.level = 0
  }

  startGame() {
    if (this.playing === true) return
    this.playing = true
    this.level = 0
    this.enemyDelay = 500
    const map = document.getElementById('map');
    const mapRect = map.getBoundingClientRect();
    const mapHeight = mapRect.height
    const mapWidth = mapRect.width
    this.player = new Player()
    this.enemy = new Enemy()
    this.player.create(mapWidth / 2, mapHeight / 2);
    this.spawnEnemies();
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
    // handle enemy hit
    const enemies = document.querySelectorAll('.enemy');
    for (const enemy of enemies) {
      const enemyRect = enemy.getBoundingClientRect();
      const enemyStyles = window.getComputedStyle(enemy)
      const enemyLeft = parseInt(enemyStyles.left.split('px')[0])
      const enemyTop = parseInt(enemyStyles.top.split('px')[0])
      const enemyRight = enemyLeft + parseInt(enemyRect.width)
      const enemyBottom = enemyTop + parseInt(enemyRect.height)
      if (
        missleX > enemyLeft &&
        missleX < enemyRight &&
        missleY > enemyTop &&
        missleY < enemyBottom
      ) {
        missle.remove()
        enemy.remove()
      }

    }
  }
  spawnEnemies() {
    this.enemy.spawn();
    this.level += 1
    setTimeout(() => {
      if (this.enemyDelay > 500) {
        this.enemyDelay -= 50
      }
      this.spawnEnemies()
    }, this.enemyDelay)
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
