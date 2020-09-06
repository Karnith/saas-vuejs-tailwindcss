<template>
  <div
    class="z-40 p-2 fixed left-0 bottom-0 ml-12 mb-10 rounded-lg bg-opacity-75 border-1 border-gray-500"
  >
    <a
      v-for="(color, index) in colors"
      :key="index"
      class="inline-flex cursor-pointer w-5 h-5 rounded-full mx-1 border border-text transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-150"
      :class="
        color === 'indigo'
          ? 'bg-indigo-500'
          : color === 'blue'
          ? 'bg-blue-500'
          : color === 'red'
          ? 'bg-red-500'
          : color === 'orange'
          ? 'bg-orange-500'
          : color === 'yellow'
          ? 'bg-yellow-500'
          : color === 'green'
          ? 'bg-green-500'
          : color === 'teal'
          ? 'bg-teal-500'
          : color === 'purple'
          ? 'bg-purple-500'
          : color === 'pink'
          ? 'bg-pink-500'
          : color === 'gray'
          ? 'bg-gray-500'
          : color === 'dark'
          ? 'bg-dark-500'
          : ''
      "
      @click="setColor(color)"
    ></a>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { mapGetters } from "vuex";

@Component({
  components: {},
  computed: {
    ...mapGetters("theme", {
      marketingTheme: "marketingTheme",
      marketingColor: "marketingColor",
    }),
  },
})
export default class ColorSwitcherComponent extends Vue {
  colors = [
    "indigo",
    "blue",
    "red",
    "orange",
    "yellow",
    "green",
    "teal",
    "purple",
    "pink",
    "gray",
    "dark",
  ];
  setColor(color) {
    this.$store.commit("theme/marketingColor", "theme-" + color);
  }
}
</script>
<style></style>
