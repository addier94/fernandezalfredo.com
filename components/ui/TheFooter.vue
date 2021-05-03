<template>
  <footer class="container text-center py-16 px-3">
    Hecho por
    <TheLink url="https://twitter.com/fernandezfle">Alfredo Fernandez</TheLink>
    ©
    {{ year }}
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
