<template>
  <footer class="container text-center py-16 px-3">
    Hecho por
    <TheLink url="https://twitter.com/addier94">Alfredo Fernandez</TheLink>
    ©
    {{ year }}
    <div class="flex justify-center mt-1">
      <UiSocialIcons />
    </div>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter',
  computed: {
    year() {
      const date = new Date()
      return date.getFullYear()
    },
  },
}
</script>
