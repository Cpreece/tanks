class Player {
	lives: number

  constructor() {
    this.lives = 3

  }

	create(xPlacement:number = 0, yPlacement:number = 0) {

	  let playerAsset = document.createElement("div")
		playerAsset.id = "player"
		map.appendChild(playerAsset)
    playerAsset = document.getElementById('player')
    const playerRect = playerAsset.getBoundingClientRect();
    const playerWidth = playerRect.width;
    const playerHeight = playerRect.height
		playerAsset.style.top = `${yPlacement - playerHeight/2}px`;
		playerAsset.style.left = `${xPlacement - playerWidth/2}px`;
	}

  pointTurret(posX, posY) {
    const playerAsset = document.getElementById('player');
    const turret = document.querySelector('#player::before');
    console.log(`${posX}, ${posY} mousePosition`);
    console.log(playerAsset.getBoundingClientRect());
  }

  move(event) {
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
    if (yPlacement - playerHeight/2 < 0) {
      yPlacement = 0
    }
      if (yPlacement + playerHeight > mapRect.height) {
      yPlacement = mapRect.height - playerHeight
    }
    if (xPlacement - playerWidth/2 < 0) {
      xPlacement = 0
    }
    if (xPlacement + playerWidth > mapRect.width) {
      xPlacement = mapRect.width - playerWidth
    }
    playerAsset.style.top = `${yPlacement}px`
    playerAsset.style.left = `${xPlacement}px`
  }

}
export default Player
