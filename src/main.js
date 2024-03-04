import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import ImageApiService from './JS/pixabay-api.js';
import createMarkup from './JS/render-functions.js';
import LoadMoreBtn from './JS/btn-load.js';



const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');


const imageApiService = new ImageApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  isHidden: true,
});

form.addEventListener('submit', onSubmit);
loadMoreBtn.button.addEventListener('click', fetchHits);

function onSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const value = form.elements.searchQuery.value.trim();
  imageApiService.search = value;
  if (value === '') {
        iziToast.info({
          messageSize: '16px',
          messageLineHeight: '24px',
          messageColor: '#FFFFFF',
          maxWidth: '432px',
          backgroundColor: '#ca3535',
          position: 'topRight',
          titleSize: '24px',
          message: 'Please formulate a request',
        });
        return;
  }
  imageApiService.resetPage();
  clearList();
  loadMoreBtn.show();
  fetchHits().finally(() => form.reset());
}

async function fetchHits() {
  enabledLoader();
  try {
      const data = await imageApiService.getImage();
      const hits = data.hits;
      const markup = hits.reduce(
        (markup, hit) => createMarkup(hit) + markup,
        ''
      );
    if (hits.length === 0) {
      loader.classList.add('is-hidden');
      iziToast.error({
        messageSize: '16px',
        messageLineHeight: '24px',
        messageColor: '#FFFFFF',
        maxWidth: '432px',
        backgroundColor: '#ea1515',
        position: 'topRight',
        titleSize: '24px',
        message: 'Nothing was found for your request. try again',
      });
      return;
    } 
    if (hits.length < 15) {
      loader.classList.add('is-hidden');
      iziToast.info({
        messageSize: '16px',
        messageLineHeight: '24px',
        messageColor: '#FFFFFF',
        maxWidth: '432px',
        backgroundColor: '#ff1515',
        position: 'topRight',
        titleSize: '24px',
        message: "We're sorry, but you've reached the end of search results.",
      });
      appendToList(markup);
      return
    } 
      appendToList(markup);
      disabledLoader();
      scrollLimitBtn();
    
  } catch (err) {
    onError(err);
  }
}

function appendToList(markup) {
  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}


function clearList() {
  gallery.innerHTML = '';
}

function enabledLoader() {
  loader.classList.remove('is-hidden');
  loadMoreBtn.hide();
};

function disabledLoader() {
  loader.classList.add('is-hidden');
  loadMoreBtn.show();
};

function onError(err) {
  loader.classList.add('is-hidden');
  loadMoreBtn.hide();
  console.error(err);
  
}

function scrollLimitBtn() {
  const elem = gallery.firstChild;
  const pixels = elem.getBoundingClientRect();
  const valueScrl = pixels.height * 2;
window.scrollBy({ top: valueScrl, behavior: 'smooth' });
}

const lightbox = new SimpleLightbox('.gallery a');