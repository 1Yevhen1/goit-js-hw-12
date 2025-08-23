import "loaders.css/loaders.min.css";
import { getImagesByQuery } from "./js/pixabay-api.js";
import { 
  createGallery, 
  clearGallery, 
  showLoader, 
  hideLoader, 
  showLoadMoreButton, 
  hideLoadMoreButton 
} from "./js/render-functions.js";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const input = form.querySelector('input[name="search-text"]');

let query = "";
let page = 1;
const perPage = 15;
let totalHits = 0;

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  query = input.value.trim();
  page = 1;

  if (!query) {
    iziToast.warning({
      title: "Warning",
      message: "Please enter a search term!",
      position: "topRight",
    });
    return;
  }

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page, perPage);
    totalHits = data.totalHits;

    if (!data.hits.length) {
      iziToast.error({
        title: "Error",
        message: "Sorry, there are no images matching your search query. Please try again!",
        position: "topRight",
      });
      return;
    }

    createGallery(data.hits);

    if (page * perPage >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        title: "Info",
        message: "We're sorry, but you've reached the end of search results.",
        position: "topRight",
      });
    } else {
      showLoadMoreButton();
    }

  } catch (error) {
    iziToast.error({
      title: "Error",
      message: "Something went wrong. Please try again later.",
      position: "topRight",
    });
    console.error(error);
  } finally {
    hideLoader();
  }
});

document.addEventListener("click", async (e) => {
  if (!e.target.classList.contains("load-more")) return;

  page += 1;
  showLoader();

  try {
    const data = await getImagesByQuery(query, page, perPage);
    createGallery(data.hits);

    if (page * perPage >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        title: "Info",
        message: "We're sorry, but you've reached the end of search results.",
        position: "topRight",
      });
    }
    const galleryEl = document.querySelector(".gallery");
    if (galleryEl.firstElementChild) {
      const { height: cardHeight } = galleryEl.firstElementChild.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
      });
    }

  } catch (error) {
    iziToast.error({
      title: "Error",
      message: "Something went wrong while loading more images.",
      position: "topRight",
    });
    console.error(error);
  } finally {
    hideLoader();
  }
});