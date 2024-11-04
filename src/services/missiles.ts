class Missiles {

  constructor() {this.missiles = []}

  fireTurret(turretAngle: number, xPlayerPos: number, yPlayerPos: number) {
    // calculate velocity
    // figure out how to deal with exiting the map.
    const map = document.getElementById('map')
    const missile = document.createElement('div')
    missile.classList.add('missile')
    const turret = document.querySelector('#player')
    const turretWidth = parseInt(window.getComputedStyle(turret, ':before').width.split('px')[0])
    const turretHeight = parseInt(window.getComputedStyle(turret, ':before').height.split('px')[0])
    const xVelocity = Math.cos(turretAngle) * (turretWidth)
    const yVelocity = Math.sin(turretAngle) * (turretWidth)
    const missileX = xPlayerPos + Math.cos(turretAngle) * (turretWidth) - turretHeight / 2
    const missileY = yPlayerPos + Math.sin(turretAngle) * (turretWidth) - turretHeight / 2
    missile.setAttribute('xVelocity', xVelocity.toString())
    missile.setAttribute('yVelocity', yVelocity.toString())
    missile.style.left = missileX + 'px'
    missile.style.top = missileY + 'px'
    map.appendChild(missile);
  }
}

export default Missiles
