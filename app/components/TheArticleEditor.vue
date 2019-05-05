<template>
  <div>
    <MobileEditorMenu
       v-if="$isMobile"
    />
    <div
      class="article-editor"
      :class="!$isMobile ? 'inner' : null"
    >
      <div class="article-editor-titlebody">
      </div>
      <template v-if="!$isMobile">
        <div class="article-editor-metadata">
          <section>
            <h3>アイキャッチ画像</h3>
            <div class="article-icatch-show" />
          </section>
          <section>
            <h3>記事カテゴリー</h3>
            <input
              v-model="inputCategoryName"
              placeholder="追加したいカテゴリーを入力"
            >
            <h4>選択中のカテゴリー</h4>
            <ul class="category-list-selected">
              <li
                v-for="(category, index) in selectedCategories"
                :key="category.id" 
                @click="selectCategory(category)"
                class="category"
              >
                <p>{{ category.name }}</p>
                <button class="remove" @click="deselectCategory(index)">×</button>
              </li>
            </ul>
            <h4>選択できるカテゴリー</h4>
            <ul class="category-options">
              <li
                v-for="(category, index) in allCategories"
                :key="index"
                @click="selectCategory(category)"
              >
                {{ category.name }}
              </li>
            </ul>
          </section>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import MobileEditorMenu from './TheMobileArticleEditorMenubar'

export default {
  components: {
    MobileEditorMenu
  },
  data () {
    return {
      inputCategoryName: '',
      selectedCategories: [],
      // mock
      allCategories: [{name: '技術'}, {name: 'アジャイル'}, {name: 'スクラム'}, {name: '開発委託'}, {name: 'プロジェクト'}]
    }
  },
  methods: {
    selectCategory (category, index) {
      this.selectedCategories.push(category)
      this.allCategories.splice(index, 1)
    },
    deselectCategory (index) {
      this.selectedCategories.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.article-editor {
  @media screen and (min-width: 600px) {
    display: flex;
    margin-top: 32px;
  }
  .article-editor-titlebody {
    @media screen and (min-width: 600px) {
      flex: 1;
    }
    @media screen and (max-width: 599px) {}
  }
  // only pc
  .article-editor-metadata {
    width: 180px;
    section {
      margin-bottom: 24px;
      h3 {}
      h4 {
        padding: 8px 0;
        font-size: 14px;
        font-weight: 600;
        color: #444;
      }
      .article-icatch-show {
        width: 180px;
        height: 135px;
        background-color: whitesmoke;
        cursor: pointer;
      }
      input {
        width: 100%;
        border-bottom: 1px solid rgba(34,34,34,0.2);
        margin-bottom: 16px;
        font-size: 13px;
      }
      ul.category-list-selected {
        margin-bottom: 16px;
        li.category {
          display: inline-flex;
          border: 1px solid rgba(34,34,34,0.2);
          border-radius: 2px;
          padding: 2px 4px;
          margin: 0 4px 4px 0;
          cursor: pointer;
          p {
            font-size: 13px;
          }
          button {
            line-height: 13px;
            font-size: 15px;
            margin-left: 8px;
          }
        }
      }
      ul.category-options {
        border: 1px solid rgba(34,34,34,0.2);
        border-radius: 2px;
        li {
          border-bottom: 1px solid rgba(34,34,34,0.2);
          font-size: 16px;
          padding: 8px 4px;
          cursor: pointer;
          &:last-child {
            border-bottom: 0;
          }
        }
      }
    }
  }
}
</style>
