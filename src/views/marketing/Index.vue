<template>
  <div :class="marketingTheme + ' ' + marketingColor + ''">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import Header from "@/components/marketing/Header.vue";

@Component({
  components: {},
  computed: {
    ...mapGetters("theme", {
      marketingTheme: "marketingTheme",
      marketingColor: "marketingColor",
    }),
  },
})
export default class MarketingComponent extends Vue {
  private marketingTheme!: string;
  private marketingColor!: string;
  mounted() {
    this.showConversations();
  }
  showConversations() {
    // @ts-ignore
    if (this.$intercom) {
      // @ts-ignore
      // this.$intercom.show();
    }

    // @ts-ignore
    if (this.$drift) {
      // @ts-ignore
      // this.$drift.show();
    }
  }
}
</script>
<style scoped></style>
