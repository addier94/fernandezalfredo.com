<template>
  <footer class="container text-center py-16 px-3">
    Copyright ©
    {{ year }}
    <TheLink url="https://twitter.com/addier94">Alfredo Fernandez</TheLink>
    All rights reserved
    <div class="flex justify-center mt-1">
      <UiSocialIcons />
    </div>
  </footer>
</template>

<script>
import UiSocialIcons from '@/components/ui/SocialIcons'
export default {
  name: 'TheFooter',
  components: { UiSocialIcons },
  computed: {
    year() {
      const date = new Date()
      return date.getFullYear()
    },
  },
}
</script>
