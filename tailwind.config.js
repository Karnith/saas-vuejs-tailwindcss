module.exports = {
  prefix: "",
  purge: {
    enabled: true,
    content: ["./src/**/*.html", "./src/**/*.vue", "./src/**/*.jsx"],
  },
  theme: {
    extend: {
      textColor: {
        primary: "var(--color-text-primary)",
        secondary: "var(--color-text-secondary)",
        focus: "var(--color-text-focus)",
        inverse: "var(--color-text-inverse)",
        "theme-100": "var(--color-text-theme-100)",
        "theme-200": "var(--color-text-theme-200)",
        "theme-300": "var(--color-text-theme-300)",
        "theme-400": "var(--color-text-theme-400)",
        "theme-500": "var(--color-text-theme-500)",
        "theme-600": "var(--color-text-theme-600)",
        "theme-700": "var(--color-text-theme-700)",
        "theme-800": "var(--color-text-theme-800)",
        "theme-900": "var(--color-text-theme-900)",
      },
      backgroundColor: {
        primary: "var(--color-bg-primary)",
        secondary: "var(--color-bg-secondary)",
        focus: "var(--color-bg-focus)",
        inverse: "var(--color-bg-inverse)",
        "theme-100": "var(--color-bg-theme-100)",
        "theme-200": "var(--color-bg-theme-200)",
        "theme-300": "var(--color-bg-theme-300)",
        "theme-400": "var(--color-bg-theme-400)",
        "theme-500": "var(--color-bg-theme-500)",
        "theme-600": "var(--color-bg-theme-600)",
        "theme-700": "var(--color-bg-theme-700)",
        "theme-800": "var(--color-bg-theme-800)",
        "theme-900": "var(--color-bg-theme-900)",
      },
      borderColor: {
        primary: "var(--color-bg-primary)",
        secondary: "var(--color-bg-secondary)",
        focus: "var(--color-bg-focus)",
        inverse: "var(--color-bg-inverse)",
        "theme-100": "var(--color-bg-theme-100)",
        "theme-200": "var(--color-bg-theme-200)",
        "theme-300": "var(--color-bg-theme-300)",
        "theme-400": "var(--color-bg-theme-400)",
        "theme-500": "var(--color-bg-theme-500)",
        "theme-600": "var(--color-bg-theme-600)",
        "theme-700": "var(--color-bg-theme-700)",
        "theme-800": "var(--color-bg-theme-800)",
        "theme-900": "var(--color-bg-theme-900)",
      },
      gradientColorStops: {
        "theme-100":
          "var(--color-bg-theme-100); --gradient-to-color: var(--color-bg-theme-200);",
        "theme-200":
          "var(--color-bg-theme-200); --gradient-to-color: var(--color-bg-theme-300);",
        "theme-300":
          "var(--color-bg-theme-300); --gradient-to-color: var(--color-bg-theme-400);",
        "theme-400":
          "var(--color-bg-theme-400); --gradient-to-color: var(--color-bg-theme-500);",
        "theme-500":
          "var(--color-bg-theme-500); --gradient-to-color: var(--color-bg-theme-600);",
        "theme-600":
          "var(--color-bg-theme-600); --gradient-to-color: var(--color-bg-theme-700);",
        "theme-700":
          "var(--color-bg-theme-700); --gradient-to-color: var(--color-bg-theme-800);",
        "theme-800":
          "var(--color-bg-theme-800); --gradient-to-color: var(--color-bg-theme-900);",
        "theme-900":
          "var(--color-bg-theme-900); --gradient-to-color: var(--color-bg-theme-900);",
      },
      keyframes: {
        pulse: {
          "0%, 100%": {
            opacity: 1,
          },
          "50%": {
            opacity: 0,
          },
        },
      },
    },
  },
  variants: {},
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
  },
};
