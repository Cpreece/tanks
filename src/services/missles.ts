class Missles {
  missles: number[]

  constructor() {this.missles = []}

  async moveMissle(missleId: number, missleX: number, missleY: number) {
    const missle = document.getElementById(missleId)
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const xVelocity = parseInt(missle.getAttribute('xVelocity'))
        const yVelocity = parseInt(missle.getAttribute('yVelocity'))
        missleX += xVelocity
        missleY += yVelocity
        missle.style.left = missleX + 'px'
        missle.style.top = missleY + 'px'
      }, 500)
    }
  }

  fireTurret(turretAngle: number, xPlayerPos: number, yPlayerPos: number) {
    // calculate velocity
    // figure out how to deal with exiting the map.
    const map = document.getElementById('map')
    const missle = document.createElement('div')
    missle.classList.add('missle')
    const turret = document.querySelector('#player')
    const turretWidth = parseInt(window.getComputedStyle(turret, ':before').width.split('px')[0])
    const turretHeight = parseInt(window.getComputedStyle(turret, ':before').height.split('px')[0])
    const xVelocity = Math.cos(turretAngle) * (turretWidth)
    const yVelocity = Math.sin(turretAngle) * (turretWidth)
    const missleX = xPlayerPos + Math.cos(turretAngle) * (turretWidth) - turretHeight / 2
    const missleY = yPlayerPos + Math.sin(turretAngle) * (turretWidth) - turretHeight / 2
    missle.setAttribute('xVelocity', xVelocity.toString())
    missle.setAttribute('yVelocity', yVelocity.toString())
    missle.style.left = missleX + 'px'
    missle.style.top = missleY + 'px'
    const missleId = this.missles.length
    missle.id = missleId
    map.appendChild(missle);
    this.missles.push(missle);
    this.moveMissle(missleId, missleX, missleY);
  }
}

export default Missles
