<template>
  <div class="bg-white overflow-hidden shadow rounded-lg p-4">
    <div class="">
      <bar-chart :chart-data="datacollection"></bar-chart>
    </div>
    <div class="bg-gray-100 -mx-4 -mb-4 p-4">
      <div class="text-sm leading-5">
        <button
          class="font-medium text-theme-600 hover:text-theme-900 transition ease-in-out duration-150"
          @click="fillData()"
        >
          {{ $t("shared.reload") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import BarChart from "@/plugins/charts/BarChart";
import Component from "vue-class-component";

@Component({ components: { BarChart } })
export default class BarChartComponent extends Vue {
  datacollection: any = {};

  mounted() {
    this.fillData();
  }

  fillData() {
    this.datacollection = {
      labels: [this.getRandomInt(), this.getRandomInt()],
      datasets: [
        {
          label: "Data One",
          backgroundColor: "#9AE6B4",
          data: [this.getRandomInt(), this.getRandomInt()],
        },
        {
          label: "Data Two",
          backgroundColor: "#81E6D9",
          data: [this.getRandomInt(), this.getRandomInt()],
        },
      ],
    };
  }
  getRandomInt() {
    return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
  }
}
</script>
