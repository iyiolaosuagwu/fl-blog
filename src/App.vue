<script setup>
import { RouterView } from "vue-router";
import NavbarComponent from "./components/NavbarComponent.vue";

</script>

<template>
  <!-- <LoaderComponent /> -->
  <NavbarComponent />
  <RouterView />
</template>

<style lang="scss">
@import "@/assets/scss";
</style>
