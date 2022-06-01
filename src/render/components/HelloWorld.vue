<template>
  <h1>{{ data.count }}</h1>
  <p>Edit <code>components/HelloWorld.vue</code> to test hot module replacement.</p>
</template>

<script setup>
import {reactive} from "vue"

const data = reactive({
  count: 0
})
const set = () => {
  setInterval(() => {
    data.count++
  }, 800)
}
set()
</script>
