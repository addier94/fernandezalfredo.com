<template>
  <img
    class="w-20 h-20 rounded-full nuxt-logo border-6 border-primary"
    src="~/static/icon.png"
    :alt="$t('general.altLogo')"
    loading="lazy"
  />
</template>

<style>
.nuxt-logo {
  animation: 2s appear;
}
</style>
