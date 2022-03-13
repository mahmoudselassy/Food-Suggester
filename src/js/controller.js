import * as model from './model.js';
import recipeView from './views/recipeView.js';
import resultView from './views/resultView.js';
import searchView from './views/searchView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}
const recipeContainer = document.querySelector('.recipe');

const showRecipe = async function () {
  const id = window.location.hash.slice(1);
  if (!id) return;
  try {
    recipeView.renderSpinner();
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};
const showSearchResults = async function () {
  try {
    resultView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;
    await model.loadSearchResults(query);
    /* resultView.render(model.state.search.results);*/
    resultView.render(model.loadSearchResultsPerPage(1));
    paginationView.render(model.state.search);
  } catch (err) {
    resultView.renderError();
  }
};
const controlPagination = function (goto) {
  resultView.render(model.loadSearchResultsPerPage(goto));
  paginationView.render(model.state.search);
};
const controlServings = function (newServing) {
  model.updateServings(newServing);
  recipeView.render(model.state.recipe);
};
const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe);
  recipeView.render(model.state.recipe);
  bookmarkView.render(model.state.bookmarks);
  console.log(model.state.bookmarks);
};
const controlRenderBookmark = function () {
  bookmarkView.render(model.state.bookmarks);
};
const init = function () {
  recipeView.addHandlerRender(showRecipe);
  recipeView.addHandlerServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  bookmarkView.addHandlerRender(controlRenderBookmark);
  searchView.addHandlerSearch(showSearchResults);
  paginationView.addHandlerPages(controlPagination);
};
init();
/*model.loadSearchResults('pizza');*/
