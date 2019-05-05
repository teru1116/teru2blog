<template>
  <li>
    <a>
      <div class="article-list-item-left">
        <!-- アイキャッチ画像 -->
        <div class="article-image-icatch" />
      </div>
      <div class="article-list-item-right">
        <!-- 記事タイトル -->
        <h3>{{ article.title }}</h3>
        <!-- 記事本文 -->
        <p>{{ article.body || 'また、ドキュメント スナップショットをクエリカーソルの開始点または終了点としてカーソル句に渡すこともできます。ドキュメント スナップショットの値は、クエリカーソルの値として使用されます。' }}</p>
        <!-- カテゴリー -->
        <small>{{ categoriesString }}</small>
        <!-- 投稿日 -->
        <time>{{ dateString }}</time>
      </div>
    </a>
    <hr />
  </li>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      default: {
        icatchImageURL: '',
        title: '記事タイトル',
        body: '',
        categories: {
          '1qazxsw2': { name: '技術' }
        },
        createdDate: new Date()
      }
    }
  },
  computed: {
    dateString () {
      const createdDate = this.article.createdDate.toDate()
      return `${createdDate.getFullYear()}.${createdDate.getMonth() + 1}.${createdDate.getDate()}`
    },
    categoriesString () {
      if (!this.article.categories) return ''
      let categoriesString = ''
      const categoryIds = Object.keys(this.article.categories)
      categoryIds.forEach(categoryId => {
        const category = this.article.categories[categoryId]
        categoriesString = `${categoriesString}, ${category.name}`
      })
      return categoriesString
    }
  }
}
</script>

<style lang="scss" scoped>
li {
  a {
    display: flex;
    padding: 16px 0;
    .article-list-item-left {
      width: 180px;
      margin-right: 16px;
      .article-image-icatch {
        height: 135px;
        background-color: #0070c9;
        background: linear-gradient(#42a1ec, #0070c9);
      }
    }
    .article-list-item-right {
      flex: 1;
    }
  }
  hr {
    background-color: #0070c9;
    background: linear-gradient(#42a1ec, #0070c9);
    height: 1px;
    border: 0;
  }
}
</style>
