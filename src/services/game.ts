import Player from './player'
import Enemy from './enemy'

class Game {
  playing: boolean
  player: object
  enemy: object
  level: number
  tanksDestroyed: number
  enemyDelay: number
  enemyActionDelay: number
  time: number
  showRecap: boolean
  missilesFired: number

  constructor() {
    this.playing = false
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.player = {};
    this.enemy = {};
    this.level = 0
    this.time = 0
    this.missilesFired = 0
    this.tanksDestroyed = 0
    this.showRecap = false
  }

  startGame() {
    if (this.playing === true) return
    this.showRecap = false
    this.playing = true
    this.level = 0
    this.tanksDestroyed = 0
    this.missilesFired = 0
    this.enemyDelay = 3000
    this.enemyActionDelay = 750
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
    this.moveMissile();
    this.time = 0;
    this.tickClock();
    setTimeout(() => {
      this.actionEnemy();
    }, 500)
  }

  moveMissile() {
    if (!this.playing) return
    const missiles = document.querySelectorAll('.missile')
    try {
      missiles.forEach((missile) => {
        const xVelocity = parseInt(missile.getAttribute('xVelocity'))
        const yVelocity = parseInt(missile.getAttribute('yVelocity'))
        let missileX = parseInt(window.getComputedStyle(missile).left.split('px')[0])
        let missileY = parseInt(window.getComputedStyle(missile).top.split('px')[0]);
        missileX += xVelocity / 2
        missileY += yVelocity / 2
        missile.style.left = missileX + 'px'
        missile.style.top = missileY + 'px'
        this.handleMissileCollision(missile, missileX, missileY);
      })
    } catch (error) {console.error(error)}
    setTimeout(() => {
      this.moveMissile()
    }, 25)
  }

  handleMissileCollision(missile, missileX, missileY) {
    const map = document.getElementById('map');
    const mapRect = map.getBoundingClientRect();
    if (-10 > missileX || missileX > mapRect.width + 10) {
      missile.remove()
    }
    if (-10 > missileY || missileY > mapRect.height + 10) {
      missile.remove()
    }
    // handle enemy hit
    const enemies = document.querySelectorAll('.enemy');
    for (const enemy of enemies) {
      const enemyRect = enemy.getBoundingClientRect();
      const enemyStyles = window.getComputedStyle(enemy)
      const enemyLeft = parseInt(enemyStyles.left.split('px')[0]) - 5
      const enemyTop = parseInt(enemyStyles.top.split('px')[0]) - 5
      const enemyRight = enemyLeft + parseInt(enemyRect.width) + 10
      const enemyBottom = enemyTop + parseInt(enemyRect.height) + 10
      if (
        missileX > enemyLeft &&
        missileX < enemyRight &&
        missileY > enemyTop &&
        missileY < enemyBottom
      ) {
        missile.remove()
        enemy.remove()
        this.tanksDestroyed += 1
      }
    }
    // handle player hit
    const player = document.getElementById('player')
    const playerRect = player.getBoundingClientRect();
    const playerStyles = window.getComputedStyle(player)
    const playerLeft = parseInt(playerStyles.left.split('px')[0])
    const playerTop = parseInt(playerStyles.top.split('px')[0])
    const playerRight = playerLeft + parseInt(playerRect.width)
    const playerBottom = playerTop + parseInt(playerRect.height)
    if (
      missileX > playerLeft &&
      missileX < playerRight &&
      missileY > playerTop &&
      missileY < playerBottom
    ) {
      missile.remove()
      this.player.lives -= 1
      if (this.player.lives === 0) {
        this.endGame()
      }
    }
  }


  spawnEnemies() {
    if (!this.playing) return
    this.enemy.spawn();
    this.level += 1
    setTimeout(() => {
      if (this.enemyDelay > 500) {
        this.enemyDelay -= 50
      }
      this.spawnEnemies()
    }, this.enemyDelay)
  }

  async actionEnemy() {
    if (!this.playing) return
    const enemies = document.querySelectorAll('.enemy')
    enemies.forEach((enemy) => {
      const moveX = (Math.random() - .5) * 40
      const moveY = (Math.random() - .5) * 40
      const fireAttempt = Math.random() * 2
      this.enemy.move(enemy, moveX, moveY)
      if (fireAttempt > 1) {
        this.enemy.fireTurret(enemy)
      }
    })
    if (this.enemyActionDelay > 250) {
      this.enemyactionDelay -= 10
    }
    setTimeout(() => {
      this.actionEnemy()
    }, this.enemyActionDelay)
  }

  endGame() {
    const gameObjects = document.querySelectorAll('#map > div')
    gameObjects.forEach((obj) => {obj.remove()})
    window.removeEventListener('keydown', this.handleKeyPress);
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('click', this.handleClick);
    this.playing = false
    this.showRecap = true
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
    this.missilesFired += 1
  }

  async tickClock() {
    setTimeout(() => {
      if (this.player.lives === 0) {
        this.endGame()
      }
      if (this.playing) {
        this.time += 1
        this.tickClock();
      }
    }, 100)
  }

};

export default Game
