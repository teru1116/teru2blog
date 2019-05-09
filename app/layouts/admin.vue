<template>
  <div>
    <header class="page-header">
      <div class="inner">
        <div class="header-left-wrapper">
          <h1>管理画面</h1>
        </div>
        <div class="header-right-wrapper" v-if="$route.name !== 'admin-auth'">
          <nav>
            <ul>
              <li>
                <nuxt-link to="/admin/articles">記事</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/admin/rooms">チャット</nuxt-link>
              </li>
              <li>
                <button>ログアウト</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
    <main>
      <nuxt />
    </main>
  </div>
</template>

<style lang="scss" scoped>
header {
  .inner {
    display: flex;
    justify-content: space-between;
    .header-left-wrapper {
      h1 {
        color: #333;
      }
    }
    .header-right-wrapper {
      nav {
        ul {
          display: flex;
          align-items: center;
          height: 48px;
          li {
            margin-left: 16px;
            a, button {
              color: #757575;
              font-size: 14px;
              font-weight: 400;
            }
          }
        }
      }
    }
  }
}
</style>
