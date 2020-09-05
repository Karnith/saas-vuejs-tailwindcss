<template>
  <component
    :is="tag"
    :type="type"
    v-on="$listeners"
    :disabled="disableButton"
    :class="[btnClass, colorVariants]"
    :variant="variant"
    :variant-type="variantType"
    :size="size"
    :href="to"
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: "LoadingButton",
  props: {
    tag: {
      type: String,
      default: "button",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: "primary",
    },
    variantType: {
      type: String,
      default: "normal",
    },
    size: {
      type: String,
      default: "small",
    },
    rounded: {
      type: String,
      default: "medium",
    },
    type: {
      type: String,
      default: "",
    },
    to: {
      type: String,
    },
  },
  data() {
    return {
      loading: false,
      disableButton: this.disabled,
    };
  },

  methods: {
    start() {
      this.loading = true;
      this.disableButton = true;
    },
    stop() {
      this.loading = false;
      this.disableButton = false;
    },
  },

  computed: {
    btnClass() {
      return {
        "base-spinner": this.loading === true,
        "cursor-not-allowed": this.disableButton === true,
        "relative py-2 px-3 border border-transparent rounded-md text-white font-semibold bg-theme-700 hover:bg-theme-600 focus:bg-theme-500 focus:outline-none focus:shadow-outline sm:text-sm sm:leading-5 ": true,

        "rounded-lg": this.rounded === "medium",
        "rounded-full": this.rounded === "large",

        "px-6 py-3": this.size === "normal",
        "px-4 py-2": this.size === "small",
      };
    },

    colorVariants() {
      switch (this.variant) {
        case "primary":
          switch (this.variantType) {
            case "normal":
              switch (this.disableButton) {
                case true:
                  return "border-theme-300 bg-theme-300 text-white";
                  break;
                default:
                  break;
              }
              return "border-theme-600 bg-theme-600 hover:bg-theme-700 hover:border-theme-700 text-white";
              break;
            case "outline":
              return "border-gray-200 text-theme-500 hover:text-theme-700";
              break;
            default:
              break;
          }
          break;
        case "danger":
          switch (this.variantType) {
            case "normal":
              switch (this.disableButton) {
                case true:
                  return "border-red-300 bg-red-300 text-white";
                  break;
                default:
                  break;
              }
              return "border-red-600 bg-red-600 hover:bg-red-700 hover:border-red-700 text-white";
              break;
            case "outline":
              return "border-gray-200 text-red-500 hover:text-red-600";
              break;
            default:
              break;
          }
          break;

        case "warning":
          switch (this.variantType) {
            case "normal":
              return "border-orange-600 bg-orange-600 hover:bg-orange-700 hover:border-orange-700 text-white";
              break;
            default:
              break;
          }
          break;

        case "success":
          switch (this.variantType) {
            case "normal":
              switch (this.disableButton) {
                case true:
                  return "border-green-300 bg-green-300 text-white";
                  break;
                default:
                  break;
              }
              return "border-green-600 bg-green-600 hover:bg-green-700 hover:border-green-700 text-white";
              break;
            case "outline":
              return "border-2 border-gray-200 text-green-500 hover:text-green-700";
              break;
            default:
              break;
          }
          break;

        case "white":
          switch (this.variantType) {
            case "normal":
              return "border-white bg-white text-blue-600 hover:text-blue-800";
              break;
            default:
              break;
          }
          break;

        case "secondary":
          switch (this.variantType) {
            case "outline":
              return "border-gray-300 text-gray-500 hover:text-blue-500";
              break;
            default:
              break;
          }
          break;

        default:
          break;
      }
    },
  },
};
</script>

<style>
.base-button + .base-button {
  margin-left: 1em;
}

@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}

.base-spinner {
  position: relative;
  overflow: hidden;
}

.base-spinner:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  background-color: inherit;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 1;
  top: 0;
  left: 0;
}

.base-spinner:after {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin-top: -10px;
  margin-left: -10px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.45);
  border-top-color: inherit;
  animation: spinner 0.6s linear infinite;
  z-index: 2;
}
</style>