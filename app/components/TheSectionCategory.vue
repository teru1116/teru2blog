<template>
  <section id="category-list">
    <h2>
      カテゴリー
      <hr class="gradation" />
    </h2>
    <ul>
      <li v-for="(categoryName, index) in categories" :key="index">
        <nuxt-link :to="`/categories/${categoryName}`">{{ categoryName }}</nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      categories: state => state.category.categories
    })
  },
  created () {
    this.$store.dispatch('category/fetchAllCategory')
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
