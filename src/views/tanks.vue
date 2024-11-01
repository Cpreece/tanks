<script setup lang='ts'>
import { ref, watch, onBeforeUnmount } from 'vue'
import Game from '../services/game.ts'
const game = ref(new Game())

const playing = ref(game.playing)

onBeforeUnmount(() => {
  //:w:w<!--this.game.endGame()-->
})
</script>

<template>
  <div class="game">
    <h1>
      {{ game.playing ? 'Destroy the enemy tanks' : 'This is a tank game' }}
    </h1>
    <button v-if="!game.playing" class="start-game" @click="game.startGame">
      Start Game
    </button>
    <div id="map" :class="{ active: game.playing }"></div>
  </div>
</template>

<style lang="less">
.menu {
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.game {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95vw;
  max-width: 100%;
  height: 90vh;
  max-height: 100%;
  padding: 1rem;

  #map {
    content: '';
    position: relative;
    height: 100%;
    width: 100%;
    margin-top: 20px;

    &.active {
      background: beige;
    }

    #player {
      height: 20px;
      width: 20px;
      position: absolute;
      background-color: blue;
      transition: all 0.1s ease;

      &::before {
        transform-origin: left;
        position: absolute;
        top: 8px;
        left: 10px;
        content: '';
        width: 18px;
        height: 4px;
        background-color: red;
        transform: rotate(var(--turret-angle, 0deg));
      }
    }

    .missle {
      height: 4px;
      transition: all 0.05s linear;
      width: 4px;
      position: absolute;
      background-color: black;
    }
  }
}
</style>
