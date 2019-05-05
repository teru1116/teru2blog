<template>
  <div>
    <TheHeader />
    <main>
      <nuxt />
    </main>
  </div>
</template>

<script>
import TheHeader from './../components/TheHeader'

export default {
  components: {
    TheHeader
  }
}
</script>
