<template>
  <div class="box">
    首页
  </div>
</template>

<script setup>
import {reactive} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();
const data = reactive({
  mouseOver: 0
});

</script>

<style lang="scss" scoped>
.box {
  font-size: 60px;
}
</style>
