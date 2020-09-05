<template>
  <div class="relative" v-click-outside="closeDropdown">
    <span class="inline-block w-full rounded-md shadow-sm">
      <button
        v-on:click="droppedDown = !droppedDown"
        type="button"
        aria-haspopup="listbox"
        aria-expanded="true"
        aria-labelledby="listbox-label"
        class="cursor-default relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
      >
        <span class="block truncate">
          {{
          translate(chosen)
          ? translate(chosen)
          : "- " + $t("shared.selectOption") + " - "
          }}
        </span>
        <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor">
            <path
              d="M7 7l3-3 3 3m0 6l-3 3-3-3"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </button>
    </span>

    <!-- Select popover, show/hide based on select state. -->
    <div v-if="droppedDown" class="absolute object-top mt-1 w-full rounded-md bg-white shadow-lg">
      <ul
        tabindex="-1"
        role="listbox"
        aria-labelledby="listbox-label"
        aria-activedescendant="listbox-item-3"
        class="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
      >
        <!--
                        Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

                        Highlighted: "text-white bg-indigo-600", Not Highlighted: "text-gray-900"
        -->
        <li
          v-for="(option, index) in options"
          :key="index"
          id="listbox-option-0"
          role="option"
          class="text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-orange-100"
        >
          <a v-on:click="setValue(option)">
            <!-- Selected: "font-semibold", Not Selected: "font-normal" -->
            <span class="font-normal block truncate">
              {{
              translate(option)
              }}
            </span>

            <!--
                          Checkmark, only display for selected option.

                          Highlighted: "text-white", Not Highlighted: "text-indigo-600"
            -->
            <span
              v-if="chosen && chosen == option"
              class="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4"
            >
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </a>
        </li>

        <!-- More options... -->
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "TailwindSelect",
  props: {
    options: {
      type: [Array, Object],
      required: true,
    },
    selected: "",
    translatePath: "",
  },
  data() {
    return {
      dropdown: {
        visible: false,
      },
      droppedDown: false,
      chosen: this.selected,
    };
  },
  methods: {
    toggle() {
      this.dropdown.visible = !this.dropdown.visible;
    },
    setValue(option) {
      this.closeDropdown();
      this.chosen = option;
      this.toggle();
      this.$emit("selected", option);
    },
    closeDropdown() {
      this.droppedDown = false;
    },
    translate(value) {
      if (!this.translatePath || this.translatePath === "") {
        return value;
      }
      if (value) {
        const translated = this.$t(this.translatePath + "." + value);
        if (translated) {
          return translated;
        } else {
          return value;
        }
      }
      return value;
    },
  },
};
</script>
