<template>
  <div></div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class LangComponent extends Vue {
  mounted() {
    const lang = this.$route.params.lang;
    if (lang) {
      let changeLangTo = "en-US";
      let changeCurrencyTo = "usd";
      switch (lang.toString().toLowerCase()) {
        case "mx":
        case "es":
        case "es-mx":
          changeLangTo = "es-MX";
          changeCurrencyTo = "mxn";
          break;
        case "in":
        case "hi-in":
        case "hi":
          changeLangTo = "hi-IN";
          changeCurrencyTo = "usd";
          break;
        default:
          break;
      }

      console.log("changeLangTo: " + changeLangTo);
      console.log("changeCurrencyTo: " + changeCurrencyTo);
      this.$i18n.locale = changeLangTo;
      this.$store.commit("locale/updateLocale", changeLangTo);
      this.$store.commit("pricing/currency", changeCurrencyTo);
    }
    this.$router.push("/product");
  }
}
</script>

<style lang="scss" scoped>
</style>