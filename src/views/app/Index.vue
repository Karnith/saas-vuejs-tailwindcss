<template>
  <app-layout layout="app">
    <div>
      <router-view></router-view>
    </div>
  </app-layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import AppLayout from "@/components/layouts/AppLayout.vue";

@Component({
  components: { AppLayout },
})
export default class AppComponent extends Vue {}
</script>
