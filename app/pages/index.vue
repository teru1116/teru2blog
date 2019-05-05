<template>
  <div>
    <!-- 最新記事 -->
    <section id="article-list-recent">
      <div class="inner">
        <h2>
          最新記事
          <hr/>
        </h2>
        <ol>
          <ArticleListItem
            v-for="(article, index) in article.recentArticles"
            :key="index"
            :article="article"
          />
        </ol>
      </div>
    </section>
    <!-- チャットでお問い合わせ -->
    <div class="chatwidget-parent">
      <ChatWidget/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ArticleListItem from './../components/ArticleListItem'
import ChatWidget from './../components/ChatWidget'

export default {
  components: {
    ArticleListItem,
    ChatWidget
  },
  computed: {
    ...mapState([
      'article'
    ]),
  },
  async created () {
    // ブラウザ識別
    const userCredential = await this.$firebase.auth().signInAnonymously()
    this.$store.dispatch('user/updateUser', userCredential)

    // 記事取得
    this.$store.dispatch('article/fetchRecentArticles')
  }
}
</script>

<style lang="scss" scoped>
.chatwidget-parent {
  position: fixed;
  bottom: 0;
  @media screen and (min-width: 600px) {
    width: 1000px;
    margin: 0 auto;
    left: 0;
    right: 0;
  }
  @media screen and (max-width: 599px) {
    left: 15px;
    right: 15px;
  }
}
</style>
