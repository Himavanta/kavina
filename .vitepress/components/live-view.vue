<template>
  <ClientOnly>
    <Design :class="$style.Component" v-model:views="views" :widgets="packages" />
  </ClientOnly>
</template>

<script setup lang="ts">
import Design from "kavina/design";
import * as example from "kavina/packages/example";
import { ref } from "vue";

const packages = Object.values(example);

const views = ref([]);
</script>

<style lang="scss" module>
.Component {
  height: 60vw;
  margin: 5vw 7vw;
}
</style>
