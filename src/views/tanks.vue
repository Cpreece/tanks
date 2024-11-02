<script setup lang='ts'>
import { ref, watch, onBeforeUnmount } from 'vue'
import Game from '../services/game.ts'

const game = ref(new Game())

const user = ''

function submitForm() {
  console.log('submitted')
}

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
    <div class="game-recap-wrapper">
      <div class="game-recap">
        <h2>Game Over</h2>
        <div class="game-meta">
          <div class="meta-row">
            <div class="meta-item">Survived:</div>
            <div class="meta-item">
              <span>{{ Math.floor(game.time / 600) }}</span
              >m
              <span
                >{{ Math.floor((game.time % 600) / 10) }}.{{
                  game.time % 10
                }}</span
              >s
            </div>
          </div>
          <div class="meta-row">
            <div class="meta-item">Tanks destroyed:</div>
            <div class="meta-item">{{ game.tanksDestroyed }}</div>
          </div>
          <div class="meta-row">
            <div class="meta-item">Level:</div>
            <div class="meta-item">{{ game.level }}</div>
          </div>
        </div>
        <div class="form-row">
          <form class="sumbit-record">
            <input v-model="user" type="text" placeholder="name" />
          </form>
          <button @click="submitForm">Sumbit</button>
        </div>
      </div>
    </div>
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
  .game-recap-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #00000050;
    display: flex;
    justify-content: center;
    align-items: center;
    .game-recap {
      width: 320px;
      padding: 40px 10px;
      background-color: #fff;
      border-radius: 20px;
      h2 {
        font-size: 30px;
        font-weight: 600;
        text-align: center;
      }
      .game-meta {
        padding: 20px;
        .meta-row {
          display: flex;
          gap: 20px;
          .meta-item {
            width: 50%;
          }
        }
      }
      .form-row {
        width: 300px;
        margin: 20px auto;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        gap: 5px;
        button {
          height: 22px;
        }
      }
    }
  }
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
      transition: all 0 linear;
      width: 4px;
      position: absolute;
      background-color: black;
    }
  }
}
</style>
