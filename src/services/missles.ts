class Missles {
  missles:array

  constructor() { this.missles = [] }

  fireTurret(turretAngle, xPlayerPos, yPlayerPos) {
    // calculate velocity
    // calculate start position or start from center and z-index it
    // figure out how to deal with exiting the map.
    //
    const map = document.getElementById('map')
    const missle = document.createElement('div')
    missle.classList.add('missle')
    const turret = document.querySelector('#player')
    const turretHeight = parseInt(window.getComputedStyle(turret, ':before').height.split('px')[0])
    console.log(Math.cos(turretAngle)/turretHeight)
    const missleX = xPlayerPos + Math.cos(turretAngle)/turretHeight
    const missleY = yPlayerPos + Math.sin(turretAngle)/turretHeight
    missle.style.left = missleX + 'px'
    missle.style.left = missleY + 'px'
    console.log(`${missleX}, ${missleY} missle position`)
    map.appendChild(missle);
    this.missles.push(missle);
  }
}

export default Missles
