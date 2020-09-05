<template>
  <div>
    <app-layout layout="admin">
      <div>
        <router-view></router-view>
      </div>
    </app-layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import AppLayout from "@/components/layouts/AppLayout.vue";
@Component({
  components: { AppLayout },
})
export default class AdminComponent extends Vue {}
</script>
