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
    this.missle = new Missles
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

  move(asset, moveX, moveY) {
    const assetRect = asset.getBoundingClientRect();
    const assetHeight = parseInt(assetRect.height)
    const assetWidth = parseInt(assetRect.width)
    const assetStyles = window.getComputedStyle(asset);
    const currentX = parseInt(assetStyles.left.split('px')[0]);
    moveX = currentX + moveX
    const movePrimeX = moveX + assetWidth;
    const currentY = parseInt(assetStyles.top.split('px')[0]);
    moveY = currentY + moveY
    const movePrimeY = moveY + assetHeight
    //don't leave screen
    const map = document.getElementById('map');
    const mapRect = map.getBoundingClientRect();
    if (moveY < 0) {
      moveY = 0
    }
    if (moveY > mapRect.height - assetHeight) {
      moveY = mapRect.height - assetHeight
    }
    if (moveX < 0) {
      moveX = 0
    }
    if (moveX >= mapRect.width - assetWidth) {
      moveX = mapRect.width - assetWidth
    }
    //// don't run over player
    const player = document.getElementById('player')
    const playerRect = player.getBoundingClientRect();
    const playerStyles = window.getComputedStyle(player);
    const playerWidth = parseInt(playerRect.width);
    const playerHeight = parseInt(playerRect.height);
    const playerMinX = parseInt(playerStyles.left.split('px')[0])
    const playerMinY = parseInt(playerStyles.top.split('px')[0])
    const playerMaxX = playerMinX + playerWidth
    const playerMaxY = playerMinY + playerHeight
    if (!(
      moveX > playerMaxX ||
      movePrimeX < playerMinX ||
      moveY > playerMaxY ||
      movePrimeY < playerMaxY
    )) {
      return
    }
    //// don't run over other enemy
    const enemies = document.querySelectorAll('.enemy')
    let isSafeMove = true
    enemies.forEach((enemy) => {
      if (asset.id = enemy.id) {
        return
      }
      const enemyRect = enemy.getBoundingClientRect();
      const enemyStyles = window.getComputedStyle(enemy);
      const enemyWidth = parseInt(enemyRect.width);
      const enemyHeight = parseInt(enemyRect.height);
      const enemyMinX = parseInt(enemyStyles.left.split('px')[0])
      const enemyMinY = parseInt(enemyStyles.top.split('px')[0])
      const enemyMaxX = enemyMinX + enemyWidth
      const enemyMaxY = enemyMinY + enemyHeight
      if (!(
        moveX > enemyMaxX ||
        movePrimeX < enemyMinX ||
        moveY > enemyMaxY ||
        movePrimeY < enemyMaxY
      )) {
        isSafeMove = false
      }
    })
    if (!isSafeMove) {
      return
    }
    asset.style.left = moveX + 'px'
    asset.style.top = moveY + 'px'
  }

  calcTurretAngle(asset) {
    const playerAsset = document.getElementById('player');
    const playerRect = playerAsset.getBoundingClientRect();
    const playerX = playerRect.left + playerRect.height / 2;
    const playerY = playerRect.top + playerRect.height / 2;
    const assetRect = asset.getBoundingClientRect();
    const assetX = assetRect.left + playerRect.height / 2;
    const assetY = assetRect.top + playerRect.height / 2;
    const xDiff = Math.round(assetX - playerX)
    const yDiff = Math.round(assetY - playerY)
    let radians = Math.atan((yDiff * -1) / xDiff) * -1;
    if (assetX > playerX) {
      radians += Math.PI
    }
    const degrees = radians * 180 / Math.PI + (Math.random() - .5) * 20
    asset.style.setProperty('--turret-angle', `${degrees}deg`)
    return {degrees: degrees, radians: radians}

  }


  fireTurret(asset) {
    const turretAngle = this.calcTurretAngle(asset)
    const assetStyles = window.getComputedStyle(asset);
    const assetRect = asset.getBoundingClientRect();
    const assetHeight = parseInt(assetRect.height);
    const assetWidth = parseInt(assetRect.width);
    const assetLeft = parseInt(assetStyles.left.split('px')[0]) + assetWidth / 2
    const assetTop = parseInt(assetStyles.top.split('px')[0]) + assetHeight / 2
    this.missle.fireTurret(turretAngle.radians, assetLeft, assetTop)
  }

  getSafeSpawnLocation(newEnemyAsset) {
    let is_safe = false;
    const map = document.getElementById('map');
    const mapRect = map.getBoundingClientRect();
    const newEnemyRect = newEnemyAsset.getBoundingClientRect();
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
      const player = document.getElementById('player');
      const playerRect = window.getComputedStyle(player);
      const playerX = parseInt(playerRect.left.split('px')[0]) + parseInt(playerRect.width) / 2;
      const playerY = parseInt(playerRect.top.split('px')[0]) + parseInt(playerRect.width) / 2;
      const enemies = document.querySelectorAll('.enemy')
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
