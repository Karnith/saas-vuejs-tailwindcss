<template>
  <div>
    <div class="w-full flex justify-center mb-2">
      <div class="rounded-lg bg-gray-300 shadow-inner p-1 flex justify-center">
        <a
          v-for="(option, idx) in options"
          :key="idx"
          @click="select(option)"
          :class="
            selected !== option.value
              ? 'rounded-lg p-1 text-xs px-2 cursor-pointer hover:bg-gray-200 mx-1'
              : 'rounded-lg p-1 text-xs px-2 cursor-pointer bg-white mx-1'
          "
          >{{ option.title }}
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "@/components/shared/BaseComponent.vue";
import { Prop } from "vue-property-decorator";

@Component({
  components: {},
})
export default class ToggleComponent extends BaseComponent {
  @Prop()
  options: any;
  @Prop()
  defaultSelected: any;
  selected: any = {};
  mounted() {
    this.selected = { value: this.defaultSelected };
    if (this.selected === "") {
      this.selected = this.options[0].value;
    }
  }
  select(option) {
    this.selected = option.value;
    this.$emit("selected", option);
  }
}
</script>
