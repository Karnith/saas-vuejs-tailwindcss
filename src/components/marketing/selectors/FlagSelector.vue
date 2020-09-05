<template>
  <div>
    <div class="flex items-center md:ml-6">
      <!-- Profile dropdown -->
      <div class="relative" v-click-outside="closeDropDownFlags">
        <div>
          <div
            v-if="!open"
            v-on:click="dropDownFlags = !dropDownFlags"
            class="cursor-pointer p-1 text-theme-600 hover:text-theme-500"
          >
            <span
              v-if="!showFlagInsteadOfLocale"
              class="inline-flex items-center justify-center h-8 w-8 rounded-full bg-theme-500"
            >
              <span
                class="text-xs font-normal leading-none text-white"
              >{{ getCurrentLocale(false) }}</span>
            </span>
            <country-flag v-else :country="getCurrentLocale(true)" size="normal" />
            <!-- <i class="fa fa-user rounded-full" /> -->
          </div>
        </div>
        <!--
              Profile dropdown panel, show/hide based on dropdown state.

              Entering: "transition ease-out duration-100"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
        -->
        <div
          v-if="dropDownFlags || open"
          :class="
            !open
              ? 'z-40 transition duration-500 ease-in-out origin-top-right absolute right-0 mt-2 w-64 rounded-md '
              : 'z-40 transition duration-500 ease-in-out  mt-2 w-64 rounded-md '
          "
        >
          <div
            class="py-1 rounded-lg bg-secondary"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
          >
            <a
              v-for="(language, index) in supportedLocales"
              v-on:click="changedLocale(language.lang)"
              :key="index"
              class="cursor-pointer truncate group flex items-center px-2 text-sm text-primary font-medium hover:bg-primary transition ease-in-out duration-150"
              role="menuitem"
            >
              <country-flag :country="language.flag" size="normal" />
              {{ $t("shared.locales." + language.lang) }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import CountryFlag from "vue-country-flag";
import supportedLocales from "../../../locale/supportedLocales";
import { Prop } from "vue-property-decorator";
import { faLevelDownAlt } from "@fortawesome/free-solid-svg-icons";

@Component({
  components: {
    CountryFlag,
  },
})
export default class FlagSelector extends Vue {
  @Prop() open!: boolean;
  dropDownFlags: boolean = false;
  showFlagInsteadOfLocale: boolean = true;
  supportedLocales = supportedLocales;
  mounted() {
    this.dropDownFlags = this.open;
  }
  closeDropDownFlags() {
    this.dropDownFlags = false;
  }
  changedLocale(value) {
    this.closeDropDownFlags();
    this.$store.commit("locale/updateLocale", value);
    this.$i18n.locale = value;
  }
  getCurrentLocale(flag: boolean) {
    const current = this.supportedLocales.find(
      (f) => f.lang === this.$i18n.locale
    );
    if (current) {
      return flag ? current.flag : current.lang_short;
    }
    return flag ? "us" : "en";
  }
}
</script>

<style lang="scss" scoped></style>
