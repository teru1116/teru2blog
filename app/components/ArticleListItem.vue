<template>
  <li>
    <nuxt-link :to="`/articles/${article.id}`">
      <div class="article-list-item-left">
        <!-- アイキャッチ画像 -->
        <div class="article-image-icatch" :style="{ backgroundImage: `url(${article.icatchImageDataURL})` }" />
      </div>
      <div class="article-list-item-right">
        <!-- 記事タイトル -->
        <h3>{{ article.title }}</h3>
        <p v-if="!$isMobile">{{ contentString }}</p>
        <div class="metadata">
          <!-- カテゴリー -->
          <ul class="category-list">
            <li v-for="(categoryName, index) in article.categories" :key="index">
              {{ categoryName }}
            </li>
          </ul>
          <!-- 投稿日 -->
          <time>{{ dateString }}</time>
        </div>
      </div>
    </nuxt-link>
    <hr class="gradation" />
  </li>
</template>

<script>
export default {
  props: {
    article: Object
  },
  computed: {
    contentString () {
      return `${this.article.contentHTML.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'').slice(0, 80)}...`
    },
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
      margin-right: 16px;
      @media screen and (min-width: 600px) {
        width: 180px;
      }
      @media screen and (max-width: 599px) {
        width: 30vw;
      }  
      .article-image-icatch {
        @media screen and (min-width: 600px) {
          height: 135px;
        }
        @media screen and (max-width: 599px) {
          height: calc(30vw * 0.75);
        }
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-color: whitesmoke;
      }
    }
    .article-list-item-right {
      flex: 1;
      position: relative;
      h3 {
        font-weight: bold;
        overflow: hidden;
        @media screen and (min-width: 600px) {
          font-size: 18px;
          line-height: 1.4;
          height: 2.8em;
          margin-bottom: 4px;
        }
        @media screen and (max-width: 599px) {
          font-size: 16px;
          line-height: 1.1;
          height: 3.15em;
        }
      }
      p {
        color: #333;
        font-size: 12px;
        line-height: 1.76;
      }
      .metadata {
        display: flex;
        align-items: baseline;
        position: absolute;
        bottom: 0;
        ul.category-list {
          display: flex;
          align-items: baseline;
          @media screen and (min-width: 600px) {}
          @media screen and (max-width: 599px) {}
          li {
            margin-right: 4px;
            color: #0052A3;
            font-size: 14px;
            display: inline-flex;
            &:after {
              content: ",";
              color: #000;
            }
            &:last-child {
              &:after {
                content: "";
              }
            }
          }
          &:after {
            content: " | ";
          }
        }
        time {
          margin-left: 8px;
          color: #555;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
