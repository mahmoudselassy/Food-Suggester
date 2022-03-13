import View from './view.js';
import icons from 'url:../../img/icons.svg';
class BookmarkView extends View {
  _parent = document.querySelector('.bookmarks__list');
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data
      .map(function (data) {
        return ` <li class="preview">
            <a class="preview__link" href="#${data.id}">
              <figure class="preview__fig">
                <img src="${data.image}" alt="${data.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${data.title}</h4>
                <p class="preview__publisher">${data.publisher}</p>
              </div>
            </a>
          </li>`;
      })
      .join('');
  }
}
export default new BookmarkView();
