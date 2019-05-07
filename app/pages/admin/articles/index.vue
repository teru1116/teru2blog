<template>
  <div class="inner">
    <section>
      <nav>
        <div class="articles-nav-left"></div>
        <div class="articles-nav-right">
          <nuxt-link to="new" class="submit">
            + 投稿
          </nuxt-link>
        </div>
      </nav>
      <ul>
        <ListItem
          v-for="(article, index) in articles"
          :article="article"
          :key="index"
        />
      </ul>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ListItem from './../../../components/AdminArticleListItem'

export default {
  components: {
    ListItem
  },
  computed: {
    ...mapState({
      articles: state => state.admin.article.articles
    })
  },
  created () {
    this.$store.dispatch('admin/article/fetchAllArticles')
  },
  layout: 'admin'
}
</script>

<style lang="scss" scoped>
section {
  margin: 40px 0 0;
  nav {
    display: flex;
    justify-content: space-between;
    .articles-nav-left {}
    .articles-nav-right {
      button {
        //
      }
    }
  }
}
</style>

