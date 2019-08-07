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
                <button @click="signOut">ログアウト</button>
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

<script>
export default {
  methods: {
    async signOut () {
      await this.$firebase.auth().signOut()
      this.$router.push('/admin/auth')
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  background-color: #fff;
  box-shadow: 0 0 4px rgba(0,0,0,.14), 0 4px 8px rgba(0,0,0,.28);
  .inner {
    .header-left-wrapper {
      h1 {
        color: #333;
      }
    }
    .header-right-wrapper {
      nav {
        ul {
          li {
            a, button {
              color: #757575;
            }
          }
        }
      }
    }
  }
}
</style>
