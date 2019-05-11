<template>
  <div>
    <header class="page-header">
      <div class="inner">
        <div class="header-left-wrapper">
          <h1>Noilan</h1>
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
    </main>
  </div>
</template>

<style lang="scss" scoped>
header.page-header {
  background-color: #000;
  box-shadow: 0 0 4px rgba(0,0,0,.14), 0 4px 8px rgba(0,0,0,.28);
  .inner {
    .header-left-wrapper {
      h1 {
        color: #fff;
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
</style>
