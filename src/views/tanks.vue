<script setup lang='ts'> 
	import { ref } from 'vue'
	import Player from '../services/player.ts'

	let playing:boolean = ref(true)
	let player = new Player()
	player.create;


</script> 

<template>
	<div>
		<div v-if="playing" class="game"> 
			<h1>Destroy the enemy tanks</h1>
			<div class="map"> 	
			</div>			
		</div>
		<div v-else class="menu">
			<h1>This is a tank game</h1>
			<button class="start-game" @click="playing = true">Start Game</button>
		</div>
	</div>
</template>

<style lang="less">
@media (min-width: 1024px) {
  .menu{
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
	.game {
		width: 90vw;
		height: 90vh; 
		.map { 
			position: relative;
			background-color: beige;
			height: calc(100% - 50px);	
			width: 100%;
		}
	}	
}

</style>
