<template>
  <div class="min-h-screen">
    <!-- <UiTheHeader /> -->
    <Header />
    <main class="pt-4 container px-3">
      <nuxt />
    </main>
    <UiTheFooter />
  </div>
</template>
<script>
import Header from '@/components/ui/TheHeader'
import UiTheFooter from '@/components/ui/TheFooter'

export default {
  components: { Header, UiTheFooter },
}
</script>
