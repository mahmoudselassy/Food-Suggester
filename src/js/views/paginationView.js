import View from './view.js';
import icons from 'url:../../img/icons.svg';
class PaginationView extends View {
  _parent = document.querySelector('.pagination');

  _generateMarkup() {
    //first page only
    if (this._data.page === 1) {
      return `<button data-goto="${this._data.page + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${this._data.page + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
          `;
    }
    //first page and other
    else if (this._data.results.length > this._data.resultsPerPage * this._data.page) {
      return `<button data-goto="${this._data.page - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.page - 1}</span>
          </button>
          <button data-goto="${this._data.page + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${this._data.page + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
          `;
    } else if (this._data.results.length < this._data.resultsPerPage * this._data.page) {
      return `<button data-goto="${this._data.page - 1} "class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.page - 1}</span>
          </button>
          `;
    }
  }
  addHandlerPages(handler) {
    this._parent.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goto = Number(btn.dataset.goto);
      handler(goto);
    });
  }
}
export default new PaginationView();
