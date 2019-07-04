<template>
  <section id="monthly-list">
    <h2>
      月別
      <hr class="gradation" />
    </h2>
    <clip-loader :loading="isLoading" :color="'#0052A3'" :style="{ marginTop: '24px' }" />
    <ul>
      <li v-for="(month, index) in months" :key="index">
        <nuxt-link :to="`/monthly/${month}`">{{ `${month.substr(0, 4)}年${month.substr(5, 2)}月` }}</nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

export default {
  components: {
    ClipLoader
  },
  computed: {
    ...mapState({
      months: state => state.months
    })
  },
  data () {
    return {
      isLoading: false
    }
  },
  async created () {
    this.isLoading = true
    await this.$store.dispatch('months/fetchMonths')
    this.isLoading = false
  }
}
</script>

<style lang="scss" scoped>
section#monthly-list {
  ul {
    margin: 16px 0 0;
    li {
      a {
        color: #0052A3;
        font-size: 14px;
        padding: 2px 0;
        display: inline-block;
        @media screen and (min-width: 600px) {}
        @media screen and (max-width: 599px) {}
      }
    }
  }
}
</style>

