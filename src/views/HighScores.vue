<script setup lang='ts'>
import { ref, onBeforeMount } from 'vue'
import Scores from '../services/apiCalls.ts'

let tableData = ref({})
const order = ref('level')

function getScores(order: string = 'level') {
  Scores.get(`-${order}`)
    .then((resp) => {
      tableData.value = resp
    })
    .catch((err) => {
      console.error('Error getting scores ' + err)
    })
}

onBeforeMount(() => {
  getScores()
})
</script>

<template>
  <div class="highscores">
    <h1>High Scores</h1>
    <div class="sort">
      <div class="subheader">Order by</div>
      <form>
        <select v-model="order" id="order">
          <option value="level">Level</option>
          <option value="seconds_survived">Seconds Survived</option>
          <option value="tanks_destroyed">Tanks Destroyed</option>
          <option value="missiles_fired">Missiles Fired</option>
        </select>
        <button @click.prevent="getScores(order)">Go</button>
      </form>
    </div>
    <div class="scores">
      <table>
        <thead>
          <tr>
            <th key="index"></th>
            <th v-for="key in Object.keys(tableData[0])" :key="key">
              {{ key.replace('_', ' ') }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in tableData" :key="index">
            <td key="index">{{ index + 1 }}</td>
            <td key="user">{{ row['user'] }}</td>
            <td key="level">{{ row['level'] }}</td>
            <td key="seconds_survived">{{ row['seconds_survived'] }}</td>
            <td key="missiles_fired">{{ row['missiles_fired'] }}</td>
            <td key="tanks_destroyed">{{ row['tanks_destroyed'] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <a href="/">Back to Game</a>
  </div>
</template>

<style lang='less'>
.highscores {
  display: flex;
  flex-direction: column;
  align-items: center;
  .sort {
    display: flex;
    align-items: center;
    gap: 5px;
    form {
      display: flex;
      align-items: center;
      select {
        height: 21px;
      }
      button {
        height: 21px;
      }
    }
  }
  .scores {
    margin-top: 20px;
    padding: 10px;
    border-radius: 5px;
    width: 100vw;
    max-width: 700px;
    background: #00000020;
    @media (prefers-color-scheme: dark) {
      background: #ffffff20;
    }
  }
  table {
    width: 100%;
    border-collapse: collapse;
    thead {
      text-align: center;
      font-size: 20px;
      th {
        font-weight: 600;
        text-transform: capitalize;
      }
    }
    tbody {
      text-align: center;
      td {
        border: 1px solid gray;
        font-size: 18px;
        padding: 0 3px;
      }
    }
  }
  a {
    margin-top: 30px;
  }
}
</style>
