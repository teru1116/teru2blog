<template>
  <header class="admin">
    <div class="inner">
      <div class="header-left-wrapper">
        <h1>
          <nuxt-link to="/admin/articles">管理画面</nuxt-link>
        </h1>
      </div>
      <div class="header-right-wrapper">
        <nav>
          <ul>
            <li>
              <nuxt-link to="preview">プレビュー</nuxt-link>
            </li>
            <li v-if="$route.name === 'admin-articles-new'">
              <button>下書き</button>
            </li>
            <li>
              <button class="submit">投稿</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  .inner {
    .header-left-wrapper {}
    .header-right-wrapper {
      nav {
        ul {
          li {
            @media screen and (min-width: 600px) {}
            @media screen and (max-width: 599px) {
              font-size: 14px;
            }
            button.submit {
              color: #fff;
              padding: 2px 8px;
            }
          }
        }
      }
    }
  }
}
</style>
