<template>
  <div>
    <router-link to="/product">
      <img
        v-if="$store.state.theme.marketingTheme==='theme-bg-light'"
        class="mx-auto h-16 w-auto"
        src="@/assets/img/logo.png"
        alt="logo"
      />
      <img v-else class="mx-auto h-16 w-auto" src="@/assets/img/logo-dark.png" alt="logo" />
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>