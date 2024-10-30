class Missles {
  missles: number[]

  constructor() {this.missles = []}

  fireTurret(turretAngle: number, xPlayerPos: number, yPlayerPos:number) {
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
    const turretHeight = parseInt(window.getComputedStyle(turret, ':before').height.split('px')[0])
    console.log(missleRect)
    const xVelocity = Math.cos(turretAngle) * (turretWidth)
    const yVelocity = Math.sin(turretAngle) * (turretWidth)
    const missleX = xPlayerPos + Math.cos(turretAngle) * (turretWidth) - turretHeight/2
    const missleY = yPlayerPos + Math.sin(turretAngle) * (turretWidth) - turretHeight/2
    missle.setAttribute('xVelocity', xVelocity.toString())
    missle.setAttribute('yVelocity', yVelocity.toString())
    missle.style.left = missleX + 'px'
    missle.style.top = missleY + 'px'
    console.log(`${missleX}, ${missleY} missle position`)
    map.appendChild(missle);
    this.missles.push(missle);
  }
}

export default Missles
