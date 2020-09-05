import { Doughnut, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Doughnut,
  mixins: [reactiveProp],
  props: ["options"],
  mounted() {
    // @ts-ignore
    this.renderChart(this.chartData, this.options);
  },
};
