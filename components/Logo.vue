<template>
  <img
    class="w-16 h-16 my-2 rounded-full nuxt-logo border-4 border-primary"
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
