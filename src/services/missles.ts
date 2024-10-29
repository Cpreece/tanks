class Missles {
  missles: array

  constructor() {this.missles = []}

  fireTurret(turretAngle, xPlayerPos, yPlayerPos) {
    // calculate velocity
    // calculate start position or start from center and z-index it
    // figure out how to deal with exiting the map.
    //
    const map = document.getElementById('map')
    const missle = document.createElement('div')
    missle.classList.add('missle')
    const missleRect = missle.getBoundingClientRect();
    const turret = document.querySelector('#player')
    const turretWidth = parseInt(window.getComputedStyle(turret, ':before').width.split('px')[0])
    console.log(missleRect)
    const missleX = xPlayerPos + Math.cos(turretAngle) * (turretWidth)
    const missleY = yPlayerPos + Math.sin(turretAngle) * (turretWidth)
    missle.style.left = missleX + 'px'
    missle.style.top = missleY + 'px'
    console.log(`${missleX}, ${missleY} missle position`)
    map.appendChild(missle);
    this.missles.push(missle);
  }
}

export default Missles
