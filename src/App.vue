
<template>  
  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<style>




@import url('https://fonts.googleapis.com/css2?family=Fascinate&family=Syne&display=swap');

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Fascinate', cursive;
  font-family: 'Syne', sans-serif;
  font-weight: normal;
}
input, textarea { 
  border-radius: 5px;
  border: 1px solid #4a4a4a
}
button {
  background: #313541;
  padding: 6px;
  border: none;
  color: #fff;
  font-size: 16px;
  line-height: 24px;
  border-radius: 5px;
  width: 200px;
  cursor: pointer;
}
button:hover {
  background: #595c66;
}
button:active {
  background: #DF6969;
}
</style>
