export default (({ from, route, store }) => {
  if (route.name === 'admin-articles-new' && from.name !== 'admin-articles-articleId-preview') {
    store.dispatch('admin/editingArticle/initializeEditingArticle')
  }
})