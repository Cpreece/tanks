<script setup lang='ts'>
import { ref, watch, onBeforeUnmount } from 'vue'
import Game from '../services/game.ts'

const game = ref(new Game())

const minutes = ref()
const seconds = ref()
const tenthSeconds = ref(game.time % 6000)

onBeforeUnmount(() => {
  this.game.endGame()
})
</script>

<template>
  <div class="game">
    <template v-if="!game.playing">
      <h1>This is a tank game</h1>
      <button class="start-game" @click="game.startGame">Start Game</button>
    </template>
    <template v-else>
      <div class="game-info">
        <div class="game-info-left">
          <div class="lives">Lives: {{ game.player?.lives }}</div>
          <div class="level">Level: {{ game.level }}</div>
        </div>
        <div class="game-info-right">
          <span>{{ Math.floor(game.time / 600) }}</span
          >m
          <span
            >{{ Math.floor((game.time % 600) / 10) }}.{{ game.time % 10 }}</span
          >s
        </div>
      </div>
      <h1>Destroy the enemy tanks</h1>
    </template>
    <div id="map" :class="{ active: game.playing }"></div>
  </div>
</template>

<style lang="less">
.game {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95vw;
  max-width: 100%;
  height: 90vh;
  max-height: 100%;
  padding: 1rem;

  .game-info {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-left {
      display: flex;
      gap: 20px;
      font-size: 20px;
      font-weight: 600;
    }
    &-right {
      span {
        font-size: 20px;
        font-weight: 600;
        font-family: 'Space Mono';
      }
    }
  }
  #map {
    content: '';
    position: relative;
    height: 100%;
    width: 100%;
    margin-top: 20px;

    &.active {
      background: beige;
    }

    .tank {
      height: 20px;
      width: 20px;
      position: absolute;
      background-color: blue;
      transition: all 0.1s ease;
      &.enemy {
        background-color: green;
        &::before {
          background-color: purple;
        }
      }
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
      transition: all 0.025s linear;
      width: 4px;
      position: absolute;
      background-color: black;
    }
  }
}
</style>
