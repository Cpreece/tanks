import Missles from './missles'

class Player {
  lives: number
  lastMouseX: number
  lastMouseY: number
  reloading: number
  turretAngle: number
  missles: object

  constructor() {
    this.lives = 3
    this.turretAngle = 0
    this.missles = new Missles
    this.reloading = 0
    this.lastMouseX = 0
    this.lastMouseY = 0
  }

  create(xPlacement: number = 0, yPlacement: number = 0) {
    const map = document.getElementById('map')
    let playerAsset = document.createElement("div")
    playerAsset.id = "player"
    playerAsset.classList.add('tank')
    if (!map) return
    map.appendChild(playerAsset)
    playerAsset = document.getElementById('player')
    const playerRect = playerAsset.getBoundingClientRect();
    const playerWidth = playerRect.width;
    const playerHeight = playerRect.height
    playerAsset.style.left = `${xPlacement - playerWidth / 2}px`;
    playerAsset.style.top = `${yPlacement - playerHeight / 2}px`;
  }

  calcMouseToPlayerAngle(posX: number, posY: number) {

    this.lastMouseX = posX
    this.lastMouseY = posY
    const playerAsset = document.getElementById('player');
    const playerRect = playerAsset.getBoundingClientRect();
    const playerX = playerRect.left + playerRect.height / 2;
    const playerY = playerRect.top + playerRect.height / 2;
    const xDiff = Math.round(posX - playerX)
    const yDiff = Math.round(posY - playerY)
    const radians = Math.atan((yDiff * -1) / xDiff) * -1;
    let degrees = radians * 180 / Math.PI
    const angle = degrees += xDiff >= 0 ? 0 : 180
    degrees += 90
    return angle
  }

  pointTurret(posX: number, posY: number) {
    const playerAsset = document.getElementById('player');
    this.turretAngle = this.calcMouseToPlayerAngle(posX, posY)
    playerAsset.style.setProperty('--turret-angle', `${this.turretAngle}deg`)
  }

  fireTurret(posX: number, posY: number) {
    // if (this.missles.length > 2) return
    // I'm thinking about instead just having a last fired delay
    // and make it so that you can't fire for 2 or 3 seconds
    const playerAsset = document.getElementById('player');
    const playerRect = playerAsset.getBoundingClientRect();
    const playerPosX = playerAsset.offsetLeft + playerRect.width / 2
    const playerPosY = playerAsset.offsetTop + playerRect.height / 2
    console.log(this.calcMouseToPlayerAngle(posX, posY))
    this.turretAngle = this.calcMouseToPlayerAngle(posX, posY)
    const turretAngleRads = this.turretAngle * Math.PI / 180
    this.missles.fireTurret(turretAngleRads, playerPosX, playerPosY);
  }

  move(event: Event) {
    const keyPressed = event.code;
    let xMove = 0
    let yMove = 0
    switch (keyPressed) {
      case 'ArrowLeft':
        xMove = -20
        break;
      case 'ArrowRight':
        xMove = 20
        break;
      case 'ArrowUp':
        yMove = -20
        break;
      case 'ArrowDown':
        yMove = 20
        break;
      default:
        return
    }
    const playerAsset = document.getElementById('player')
    const playerRect = playerAsset.getBoundingClientRect()
    const currentX = playerAsset.offsetLeft
    const currentY = playerAsset.offsetTop
    const playerHeight = playerRect.height
    const playerWidth = playerRect.width
    let xPlacement = currentX + xMove
    let yPlacement = currentY + yMove
    const map = document.getElementById('map');
    const mapRect = map.getBoundingClientRect();
    if (yPlacement - playerHeight / 2 < 0) {
      yPlacement = 0
    }
    if (yPlacement + playerHeight > mapRect.height) {
      yPlacement = mapRect.height - playerHeight
    }
    if (xPlacement - playerWidth / 2 < 0) {
      xPlacement = 0
    }
    if (xPlacement + playerWidth > mapRect.width) {
      xPlacement = mapRect.width - playerWidth
    }
    playerAsset.style.top = `${yPlacement}px`
    playerAsset.style.left = `${xPlacement}px`
    if (this.lastMouseX, this.lastMouseX) {
      this.pointTurret(this.lastMouseX, this.lastMouseY);
    }

  }

}
export default Player
