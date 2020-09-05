<template>
  <div>
    <div class="">
      <div
        class="grid gap-5 grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3"
      >
        <div>
          <line-chart />
        </div>
        <div>
          <bar-chart />
        </div>
        <div>
          <doughnut-chart />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "@/components/shared/BaseComponent.vue";

import LineChart from "@/components/app/integrations/charts/LineChart.vue";
import BarChart from "@/components/app/integrations/charts/BarChart.vue";
import DoughnutChart from "@/components/app/integrations/charts/DoughnutChart.vue";

@Component({
  components: { LineChart, BarChart, DoughnutChart },
})
export default class ChartsComponent extends BaseComponent {}
</script>

<style lang="scss" scoped></style>
