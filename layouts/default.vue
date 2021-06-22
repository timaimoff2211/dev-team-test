<template>
  <div>
    <TopNavBar />
    <div class="container">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import TopNavBar from '@/components/TopNavBar'

export default {
  components: { TopNavBar }
}
</script>

<style>
</style>
