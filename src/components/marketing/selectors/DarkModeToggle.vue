<template>
  <div
    class="z-40 cursor-pointer transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105"
    @click="toggle()"
  >
    <Moon
      class="h-6 w-6"
      :is="$store.state.theme.marketingTheme == 'theme-bg-light' ? 'Moon' : 'Sun'"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { mapGetters } from "vuex";
// @ts-ignore
import Moon from "@/assets/images/moon.svg";
// @ts-ignore
import Sun from "@/assets/images/sun.svg";

@Component({
  components: { Moon, Sun },
  computed: {
    ...mapGetters("theme", {
      marketingTheme: "marketingTheme",
      marketingColor: "marketingColor",
    }),
  },
})
export default class DarkModeToggleComponent extends Vue {
  toggle() {
    if (this.$store.state.theme.marketingTheme === "theme-bg-dark") {
      this.$store.commit("theme/marketingTheme", "theme-bg-light");
    } else {
      this.$store.commit("theme/marketingTheme", "theme-bg-dark");
    }
  }
}
</script>