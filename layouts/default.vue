<template>
  <div>
    <!-- <UiTheHeader /> -->
    <Header />
    <main>
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
