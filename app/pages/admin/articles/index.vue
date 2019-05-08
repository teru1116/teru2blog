<template>
  <div class="inner">
    <section>
      <nav>
        <div class="articles-nav-left"></div>
        <div class="articles-nav-right">
          <button class="submit" @click="onCreateButtonClick">
            + 投稿
          </button>
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
    this.$store.dispatch('admin/article/onExitArticle')
  },
  methods: {
    onCreateButtonClick () {
      this.$store.dispatch('admin/article/refleshArticleId')
      this.$router.push('/admin/articles/new')
    }
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
  ul {
    @media screen and (min-width: 600px) {
      margin-top: 16px;
    }
    @media screen and (max-width: 599px) {
      margin-top: 8px;
    }
  }
}
</style>

