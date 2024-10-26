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

  move(xMove, yMove) {
    const playerAsset = document.getElementById('player')
    const playerRect = playerAsset.getBoundingClientRect()
    const currentX = playerAsset.offsetLeft
    const currentY = playerAsset.offsetTop
    const playerHeight = playerRect.height
    const playerWidth = playerRect.width
    console.log(currentX, playerWidth, xMove)
    console.log(currentY, playerHeight, yMove)
    playerAsset.style.left = `${currentX + xMove}px`
    playerAsset.style.top = `${currentY + yMove}px`
  }
}

export default Player
