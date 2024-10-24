export class Player {
	constructor() {
		let lives:number = 3
	}

	create(xPlacement:number = 0, yPlacement:number = 0) {
		const map = document.querySelector('.map')
		if (!map) return
		const playerAsset = document.createElement("div")
		playerAsset.id = "player"
		playerAsset.style.top = yPlacement
		playerAsset.style.left = xPlacement
		map.appendChild(playerAsset)	
	}
}
