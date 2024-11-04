<script setup lang='ts'>
import { ref, onBeforeMount } from 'vue'
import Scores from '../services/apiCalls.ts'

let tableData = ref({})
const order = ref('level')

function getScores(order: string = 'level') {
  Scores.get(`-${order}`)
    .then((resp) => {
      tableData.value = resp
      console.log(tableData.value)
    })
    .catch((err) => {
      console.error('Error getting scores ' + err)
    })
}

onBeforeMount(() => {
  //getScores()
})
</script>

<template>
  <div>
    <h1>HighScores</h1>
    <div class="sort">
      <div class="subheader">Order by</div>
      <select v-model="order" id="order">
        <option value="level">Level</option>
        <option value="seconds_survived">Seconds Survived</option>
        <option value="tanks_destroyed">Tanks Destroyed</option>
        <option value="missiles_fired">Missiles Fired</option>
      </select>
      <button @click="getScores(`-{order}`)">Go</button>
    </div>
    <div class="scores">
      <table>
        <thead>
          <th v-for="key in Object.keys(tableData[0])" :key="key">{{ key }}</th>
        </thead>
        <tbody>
          <tr v-for="(row, index) in tableData" :key="index">
            <!--<td v-for"(index, value, key) in row)" :key="index">{{value}}</td>-->
            <td key="user">{{ row['user'] }}</td>
            <td key="level">{{ row['level'] }}</td>
            <td key="seconds_survived">{{ row['seconds_survived'] }}</td>
            <td key="missiles_fired">{{ row['missiles_fired'] }}</td>
            <td key="tanks_destroyed">{{ row['tanks_destroyed'] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
</style>
