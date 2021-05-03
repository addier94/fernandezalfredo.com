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
export default {
  components: { Header },
}
</script>
