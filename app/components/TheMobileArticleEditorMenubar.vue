<template>
  <div>
    <editor-menu-bar :editor="editor">
      <div slot-scope="{ commands, getMarkAttrs }">
        <nav>
          <div class="style-menu">
            <ul>
              <!-- 元に戻す -->
              <li class="undo">
                <button @click="commands.undo">
                  <i class="material-icons">undo</i>
                </button>
              </li>
              <!-- 見出し -->
              <li>
                <button @click="commands.heading({ level: 1 })">
                  <i class="material-icons">title</i>
                </button>
              </li>
              <!-- 太字 -->
              <li>
                <button @click="commands.bold">
                  <i class="material-icons">format_bold</i>
                </button>
              </li>
              <!-- リンク -->
              <li>
                <button @click="showLinkMenu(getMarkAttrs('link'))">
                  <i class="material-icons">link</i>
                </button>
              </li>
              <!-- 引用 -->
              <li>
                <button @click="commands.blockquote">
                  <i class="material-icons">format_quote</i>
                </button>
              </li>
              <!-- 写真 -->
              <li>
                <button @click="onPhotoButtonClick(commands.image)">
                  <i class="material-icons">add_photo_alternate</i>
                </button>
              </li>
              <!-- YouTube動画埋め込み -->
              <li>
                <button @click="showVideoMenu">
                  <i class="material-icons">play_circle_filled</i>
                </button>
              </li>
            </ul>
          </div>
          <div class="artycle-config-menu">
            <ul>
              <!-- アイキャッチ画像 -->
              <li>
                <button @click="showsIcatchImageModal = !showsIcatchImageModal">
                  <i class="material-icons">photo</i>
                </button>
              </li>
              <!-- カテゴリ -->
              <li>
                <button @click="showsCategoryModal = !showsCategoryModal">
                  <i class="material-icons">label</i>
                </button>
              </li>
            </ul>
          </div>
        </nav>
        <!-- リンクURL入力欄 -->
        <form v-if="linkMenuIsActive" @submit.prevent="setLinkUrl(commands.link, linkUrl)">
          <input type="text" v-model="linkUrl" placeholder="https://" ref="linkInput" @keydown.esc="hideLinkMenu"/>
          <button class="clear" @click="hideLinkMenu" type="button">
            <i class="material-icons">clear</i>
          </button>
        </form>
        <!-- YouTubeURL入力欄 -->
        <form v-if="videoMenuIsActive" @submit.prevent="insertVideo(commands.iframe)">
          <input type="text" v-model="videoId" placeholder="xBy4G2QW6uI" ref="videoUrlInput" @keydown.esc="hideVideoMenu"/>
          <button class="clear" @click="hideVideoMenu" type="button">
            <i class="material-icons">clear</i>
          </button>
        </form>
      </div>
    </editor-menu-bar>
    <!-- ダミーInput要素 画像アップロード用 -->
    <input
      type="file"
      ref="input"
      :style="{ display: 'none' }"
      @change="onFileSelect"
    />
    <!-- アイキャッチ画像設定モーダル -->
    <Modal v-if="showsIcatchImageModal" v-on:onClose="showsIcatchImageModal = false" >
      <h3>アイキャッチ画像</h3>
      <ImagePicker
        :width="180"
        :height="135"
        v-on:onSelect="onIcatchImageUpdate"
      />
    </Modal>
    <!-- カテゴリー設定モーダル -->
    <Modal v-if="showsCategoryModal" v-on:onClose="showsCategoryModal = false" >
      <CategoryEditor />
    </Modal>
  </div>
</template>

<script>
import { EditorMenuBar } from 'tiptap'
import Modal from './Modal'
import ImagePicker from './ImagePicker'
import CategoryEditor from './TheArticleEditorCategory'

export default {
  components: {
    EditorMenuBar,
    Modal,
    ImagePicker,
    CategoryEditor
  },
  props: {
    editor: Object
  },
  data () {
    return {
      linkUrl: null,
      linkMenuIsActive: false,
      videoId: null,
      videoMenuIsActive: false,
      showsIcatchImageModal: false,
      showsCategoryModal: false,
      command: null
    }
  },
  methods: {
    showLinkMenu (attrs) {
      this.linkUrl = attrs.href
      this.linkMenuIsActive = true
      this.$nextTick(() => {
        this.$refs.linkInput.focus()
      })
    },
    hideLinkMenu() {
      this.linkUrl = null
      this.linkMenuIsActive = false
    },
    setLinkUrl(command, url) {
      command({ href: url })
      this.hideLinkMenu()
      this.editor.focus()
    },
    showVideoMenu () {
      this.videoMenuIsActive = true
      this.$nextTick(() => {
        this.$refs.videoUrlInput.focus()
      })
    },
    hideVideoMenu() {
      this.videoId = null
      this.videoMenuIsActive = false
    },
    insertVideo(command) {
      command({ src: this.videoId })
      this.hideLinkMenu()
      this.editor.focus()
    },
    onPhotoButtonClick (command) {
      this.command = command
      this.$refs.input.click()
    },
    onFileSelect (e) {
      e.preventDefault()
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = () => {
        const src = reader.result
        this.command({ src })
        this.command = null
      }
      reader.readAsDataURL(file)
    }
  }
}
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  position: fixed;
  left: 0px;
  top: 48px;
  width: 100vw;
  height: 44px;
  border-bottom: 1px solid rgba(34,34,34,0.2);
  background-color: #fff;
  z-index: 8;
  ul {
    display: inline-flex;
    li {
      width: 44px;
      height: 44px;
      &.undo {
        position: relative;
        &:before {
          content: "";
          display: block;
          height: 75%;
          width: 1px;
          background-color: #222;
          position: absolute;
          right: 0;
          top: 50%;
          -webkit-transform: translate(0, -50%);
          transform: translate(0, -50%);
          opacity: 0.2;
        }
      }

      button {
        width: 100%;
        height: 100%;
      }
    }
  }
  .style-menu {
    width: calc(100% - 88px);
    overflow-x: scroll;
    overflow-y: hidden;
  }
  .artycle-config-menu {
    width: 88px;
    border-left: 1px solid rgba(34, 34, 34, 0.2);
  }
}

form {
  display: flex;
  position: fixed;
  left: 0px;
  top: 48px;
  width: calc(100vw - 32px);
  padding: 0 16px;
  height: 44px;
  border-bottom: 1px solid rgba(34, 34, 34, 0.2);
  background-color: #fff;
  z-index: 9;

  input {
    border: 0;
    font-size: 14px;
  }
}
</style>
