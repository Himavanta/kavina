<template>
  <ClientOnly>
    <Design
      :class="$style.Component"
      v-model:views="views"
      v-model:dark="isDark"
      :widgets="packages"
    />
  </ClientOnly>
</template>

<script setup lang="ts">
import Design from "kavina/design";
import * as example from "kavina/packages/example";
import { ref } from "vue";
import { useData } from "vitepress";

const { isDark } = useData();
const packages = Object.values(example);
const views = ref([]);
</script>

<style lang="scss" module>
.Component {
  height: min(60vw, 80vh);
  margin: 5vw 7vw;
}
</style>
