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
          backgroundColor: 'red',
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
  // loader.classList.remove('is-hidden');
  // loadMoreBtn.disable();
  // loadMoreBtn.hide();
  try {
    const data = await imageApiService.getImage();
    const hits = data.hits;
    if (hits.length === 0) {
      loader.classList.add('is-hidden');
      iziToast.info({
        messageSize: '16px',
        messageLineHeight: '24px',
        messageColor: '#FFFFFF',
        maxWidth: '432px',
        backgroundColor: 'red',
        position: 'topRight',
        titleSize: '24px',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      
      return
    } else if (hits.length < 3) {
      loader.classList.add('is-hidden');
      iziToast.info({
        messageSize: '16px',
        messageLineHeight: '24px',
        messageColor: '#FFFFFF',
        maxWidth: '432px',
        backgroundColor: 'red',
        position: 'topRight',
        titleSize: '24px',
        message: "We're sorry, but you've reached the end of search results.",
      });

      return;
    } else {
      const markup = hits.reduce(
        (markup, hit) => createMarkup(hit) + markup,
        ''
      );
      appendToList(markup);
      // loader.classList.add('is-hidden');
      // loadMoreBtn.show();
      // loadMoreBtn.enable();
      disabledLoader();
    };
    
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

// function endSearchRes() {
// if (data.hits.length < 50) {
//   loader.classList.add('is-hidden');
//   iziToast.info({
//     messageSize: '16px',
//     messageLineHeight: '24px',
//     messageColor: '#FFFFFF',
//     maxWidth: '432px',
//     // backgroundColor: 'red',
//     position: 'topRight',
//     titleSize: '24px',
//     message: "We're sorry, but you've reached the end of search results.",
//   });

//   return;
// }
// }

function enabledLoader() {
  loader.classList.remove('is-hidden');
  loadMoreBtn.disable();
  loadMoreBtn.hide();
};

function disabledLoader() {
  loader.classList.add('is-hidden');
  loadMoreBtn.show();
  loadMoreBtn.enable();
};

function onError(err) {
  loader.classList.add('is-hidden');
  loadMoreBtn.hide();
  console.error(err);
  
}

const lightbox = new SimpleLightbox('.gallery a');