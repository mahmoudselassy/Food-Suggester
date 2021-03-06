import icons from 'url:../../img/icons.svg';
import { Fraction } from 'fractional';
export default class View {
  _data;
  render(data) {
    this._data = data;
    const Markup = this._generateMarkup();
    this._clear();
    this._parent.insertAdjacentHTML('afterbegin', Markup);
  }
  _clear() {
    this._parent.innerHTML = '';
  }
  renderSpinner() {
    const spinner = ` <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`;
    this._clear();
    this._parent.insertAdjacentHTML('afterbegin', spinner);
  }
  renderError(message = this._errorMessage) {
    const html = `<div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
    this._clear();
    this._parent.insertAdjacentHTML('afterbegin', html);
  }
  renderMessage(message = this._normalMessage) {
    const html = `<div class="message">
          <div>
            <svg>
              <use href="${icons}icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>`;
    this._clear();
    this._parent.insertAdjacentHTML('afterbegin', html);
  }
}
