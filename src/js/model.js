import { async } from 'regenerator-runtime';
import { getJSON } from './helper.js';
import { API_URL } from './config.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: 10,
    page: 1,
  },
  bookmarks: [],
};
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    if (state.bookmarks.some(bookmark => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
  } catch (err) {
    throw err;
  }
};
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map(function (rec) {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
  } catch (err) {
    throw err;
  }
};
export const loadSearchResultsPerPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};
export const updateServings = function (newServingsNum) {
  state.recipe.ingredients.forEach(ing => (ing.quantity = (newServingsNum * ing.quantity) / state.recipe.servings));
  state.recipe.servings = newServingsNum;
};
export const addBookmarksToLocalStorage = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};
export const addBookmark = function (recipe) {
  if (recipe.id === state.recipe.id && state.bookmarks.every(bookmark => bookmark.id !== recipe.id)) {
    state.recipe.bookmarked = true;
    state.bookmarks.push(recipe);
  }
  addBookmarksToLocalStorage();
};
export const deleteBookmark = function (recipe) {
  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = false;
    state.bookmarks.forEach(function (rec, i) {
      if (rec.id === recipe.id) {
        state.bookmarks.splice(i, 1);
      }
    });
  }
  addBookmarksToLocalStorage();
};
const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();
