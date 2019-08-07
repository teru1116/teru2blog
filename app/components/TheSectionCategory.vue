<template>
  <section id="category-list">
    <h2>
      カテゴリー
      <hr class="gradation" />
    </h2>
    <clip-loader :loading="isLoading" :color="'#0052A3'" :style="{ marginTop: '24px' }" />
    <ul>
      <li v-for="(categoryName, index) in categories" :key="index">
        <nuxt-link :to="`/categories/${categoryName}`">{{ categoryName }}</nuxt-link>
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
      categories: state => state.categories
    })
  },
  data () {
    return {
      isLoading: false
    }
  },
  async created () {
    this.isLoading = true
    await this.$store.dispatch('categories/fetchCategories')
    this.isLoading = false
  }
}
</script>

<style lang="scss" scoped>
section#category-list {
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
