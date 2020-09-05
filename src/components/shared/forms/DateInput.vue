<template>
  <!-- <input
    class="form-control"
    type="text"
    v-model="value"
    :disabled="disabled"
    :maxlength="schema.max"
    :placeholder="schema.placeholder"
    :readonly="schema.readonly"
  /> -->
  <datepicker :placeholder="schema.placeholder" v-model="value"></datepicker>
</template>

<script>
import { abstractField } from "vue-form-generator";
import Datepicker from "vuejs-datepicker";
import moment from "moment";

export default {
  components: {
    Datepicker,
  },
  mixins: [abstractField],
  mounted() {
    if (!this.value) {
      this.value = new Date(moment.now());
    }
  },
};
</script>
