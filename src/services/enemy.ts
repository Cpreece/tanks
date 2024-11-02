import Missles from './missles'

class Enemy {
  lives: number
  reloading: number
  turretAngle: number
  missles: object
  id: number

  constructor() {
    this.lives = 1
    this.turretAngle = 0
    this.missles = new Missles
    this.reloading = 0
    this.id = 1
  }

  spawn() {
    const map = document.getElementById('map')
    let enemyAsset = document.createElement("div")
    enemyAsset.classList.add('enemy', 'tank')
    enemyAsset.id = 'enemy' + this.id
    if (!map) return
    map.appendChild(enemyAsset)
    enemyAsset = document.getElementById('enemy' + this.id)
    const enemyRect = enemyAsset.getBoundingClientRect();
    const enemyWidth = enemyRect.width;
    const enemyHeight = enemyRect.height;
    const safeEnemyLocation = this.getSafeSpawnLocation(enemyAsset);
    const enemyX = safeEnemyLocation.x
    const enemyY = safeEnemyLocation.y
    enemyAsset.style.left = `${enemyX - enemyWidth / 2}px`
    enemyAsset.style.top = `${enemyY - enemyHeight / 2}px`
    this.id += 1
  }

  getSafeSpawnLocation(newEnemyAsset) {
    let is_safe = false;
    const map = document.getElementById('map');
    const mapRect = map.getBoundingClientRect();
    const player = document.getElementById('player');
    const playerRect = window.getComputedStyle(player);
    const playerX = playerRect.left.split('px')[0] + parseInt(playerRect.width) / 2;
    const playerY = playerRect.top.split('px')[0] + parseInt(playerRect.width) / 2;
    const newEnemyRect = newEnemyAsset.getBoundingClientRect();
    const enemies = document.querySelectorAll('.enemy')
    let safeX
    let safeY
    while (!is_safe) {
      safeX = Math.random() * mapRect.width
      safeY = Math.random() * mapRect.height
      // check if too close to edge
      if (
        safeX < newEnemyRect.width / 2 ||
        safeX > mapRect.width - newEnemyRect.height / 2 ||
        safeY < newEnemyRect.height / 2 ||
        safeY > mapRect.height - newEnemyRect.height / 2) {
        continue
      }
      // check if too close to player
      const playerDist = this.getObjectDistance(safeX, safeY, playerX, playerY)
      if (playerDist < 100) {continue}

      // check if too close other enemy
      let passedEnemyCheck = true
      for (const enemy of enemies) {
        const enemyStyle = window.getComputedStyle(enemy);
        const enemyRect = enemy.getBoundingClientRect();
        const enemyX = parseInt(enemyStyle.left.split('px')[0]) + parseInt(enemyRect.width) / 2;
        const enemyY = parseInt(enemyStyle.top.split('px')[0]) + parseInt(enemyRect.height) / 2;
        const enemyDist = this.getObjectDistance(safeX, safeY, enemyX, enemyY)
        if (enemyDist < Math.min(parseInt(enemyRect.width), parseInt(enemyRect.height))) {
          passedEnemyCheck = false
        }
      };
      if (!passedEnemyCheck) {
        continue
      }
      const missles = document.querySelectorAll('.missle')
      let passedMissleCheck = true
      for (const missle of missles) {
        const missleStyle = window.getComputedStyle(missle);
        const missleRect = missle.getBoundingClientRect();
        const missleX = parseInt(missleStyle.left.split('px')[0]) - missleRect.width / 2;
        const missleY = parseInt(missleStyle.top.split('px')[0]) - missleRect.height / 2;
        const missleDist = this.getObjectDistance(safeX, safeY, missleX, missleY)
        if (missleDist < 30) {
          passedMissleCheck = false
        }
      }
      if (!passedMissleCheck) {continue}
      is_safe = true
    }
    return {
      x: safeX, y: safeY
    }
  }

  getObjectDistance(newX, newY, existingX, existingY) {
    const xDiff = existingX - newX
    const yDiff = existingY - newY
    const distance = parseInt(Math.sqrt(xDiff ** 2 + yDiff ** 2))
    return distance
  }
}
export default Enemy
