class SearchView {
  _parent = document.querySelector('.search');
  getQuery() {
    const query = this._parent.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }
  _clearInput() {
    this._parent.querySelector('.search__field').value = '';
  }
  addHandlerSearch(handleSearch) {
    this._parent.addEventListener('submit', function (e) {
      e.preventDefault();
      handleSearch();
    });
  }
}
export default new SearchView();
