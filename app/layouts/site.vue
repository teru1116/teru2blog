<template>
  <div>
    <header class="page-header">
      <div class="inner">
        <div class="header-left-wrapper">
          <h1>
            <nuxt-link to="/">
              プロジェクトマネジメントBlog
            </nuxt-link>
          </h1>
        </div>
        <div class="header-right-wrapper">
          <nav>
            <ul>
              <li>
                <nuxt-link to="/about">ABOUT</nuxt-link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
    <main>
      <nuxt />
      <div class="chatwidget-parent">
        <ChatWidget/>
      </div>
    </main>
    <footer>
      <div class="inner">
        <small class="copylight">
          Copyright © Teruya Kusumoto
        </small>
      </div>
    </footer>
  </div>
</template>

<script>
import ChatWidget from './../components/ChatWidget'

export default {
  components: {
    ChatWidget
  }
}
</script>

<style lang="scss" scoped>
header.page-header {
  background-color: #000;
  box-shadow: 0 0 4px rgba(0,0,0,.14), 0 4px 8px rgba(0,0,0,.28);
  .inner {
    .header-left-wrapper {
      h1 {
        color: #fff;
        a {
          color: #fff;
          display: flex;
          align-items: center;
          @media screen and (min-width: 600px) {
            font-size: 20px;
          }
          @media screen and (max-width: 599px) {
            font-size: 15px;
          }
        }
        i {
          font-size: 28px;
          margin-right: 8px;
        }
      }
    }
    .header-right-wrapper {
      nav {
        ul {
          ///
          li {
            //
            a {
              color: #fff;
            }
          }
        }
      }
    }
  }
}
main {
  min-height: calc(100vh - 48px);
}
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
footer {
  padding: 16px 0 48px;
  background-color: #e6e6e6;
  small.copylight {
    font-size: 13px;
    color: #333;
  }
}
</style>
