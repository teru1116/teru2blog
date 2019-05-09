<template>
  <section>
    <h2>認証</h2>
    <form @submit.prevent="signIn">
      <input type="email" v-model="email" placeholder="管理者メールアドレス">
      <input type="password" v-model="password" placeholder="パスワード">
      <small>{{ errorMessage }}</small>
      <button class="submit">ログイン</button>
    </form>
  </section>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      errorMessage: ''
    }
  },
  methods: {
    signIn () {
      //
    }
  },
  layout: 'admin'
}
</script>

<style lang="scss" scoped>
section {
  position: absolute;
  border: 1px solid rgba(34,34,34,0.2);
  border-radius: 8px;
  @media screen and (min-width: 600px) {
    top: 120px;
    left: 0;
    right: 0;
    width: 360px;
    padding: 8px 24px 40px;
    margin: 0 auto;
  }
  @media screen and (max-width: 599px) {
    top: 80px;
    left: 16px;
    right: 16px;
    padding: 8px 16px 40px;
  }
  h2 {
    font-size: 18px;
    font-weight: bold;
    color: #555;
    margin-bottom: 24px;
    @media screen and (min-width: 600px) {}
    @media screen and (max-width: 599px) {}
  }
  form {
    @media screen and (min-width: 600px) {}
    @media screen and (max-width: 599px) {}
   input[type=email], input[type=password] {
      margin-bottom: 16px;
      font-size: 14px;
      padding: 4px 2px;
      @media screen and (min-width: 600px) {}
      @media screen and (max-width: 599px) {}
   }
   small {
     @media screen and (min-width: 600px) {}
     @media screen and (max-width: 599px) {}
   }
   button.submit {
     width: 100%;
     margin-top: 24px;
     @media screen and (min-width: 600px) {}
     @media screen and (max-width: 599px) {}
   }
  }
}
</style>
