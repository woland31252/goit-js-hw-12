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


// form.addEventListener('submit', onSubmit);


// function onSubmit(event) {
//   event.preventDefault();
//   loader.classList.remove('is-hidden');
//   let inputValue = '';
//   const form = event.target;
//   console.log(form)
//   inputValue = form.elements.searchQuery.value.trim();
//   if (inputValue === '') {
//     loader.classList.add('is-hidden');
//     iziToast.info({
//       messageSize: '16px',
//       messageLineHeight: '24px',
//       messageColor: '#FFFFFF',
//       maxWidth: '432px',
//       backgroundColor: 'red',
//       position: 'topRight',
//       titleSize: '24px',
//       message: 'Please formulate a request',
//     });
//     return;
//   }
//   ImageApiService(inputValue)
//     .then(elem => fetchHits(elem))
//     .catch(err => onError(err))
//     .finally(() => {
//       form.reset()
//       loader.classList.add('is-hidden');
//     });
//   clearList();
// }

// function fetchHits(elem) {

//     const hits = elem.hits;
//   if (hits.length === 0) {
//     loader.classList.add('is-hidden');
//       iziToast.info({
//         messageSize: '16px',
//         messageLineHeight: '24px',
//         messageColor: '#FFFFFF',
//         maxWidth: '432px',
//         backgroundColor: 'red',
//         position: 'topRight',
//         titleSize: '24px',
//         message:
//           'Sorry, there are no images matching your search query. Please try again!',
//       });
//       return
//     } else {
//         const markup = hits.reduce(
//         (markup, hit) => createMarkup(hit) + markup,
//         ''
//       );
//       appendToList(markup);
//     }
// }

// function appendToList(markup) {
//   gallery.insertAdjacentHTML('beforeend', markup);
//   lightbox.refresh();
// }

// function clearList() {
//   gallery.innerHTML = '';
// }

// function onError(err) {
//   loader.classList.add('is-hidden');
//   console.error(err);
// }

const imageApiService = new ImageApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  isHidden: true,
});

form.addEventListener('submit', onSubmit);
loadMoreBtn.button.addEventListener('click', fetchHits);

function onSubmit(event) {
  event.preventDefault();
  loader.classList.remove('is-hidden');
  const form = event.target;
  const value = form.elements.searchQuery.value.trim();
  imageApiService.search = value;
  if (value === '') {
    loader.classList.add('is-hidden');
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
  loader.classList.add('is-hidden');
}

async function fetchHits() {
  loadMoreBtn.disable();
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
    } else {
      const markup = hits.reduce((markup, hit) => createMarkup(hit) + markup, '');
      appendToList(markup);
      loadMoreBtn.enable();
    };
    
  } catch (err) {
    onError(err);
  }
}

function appendToList(markup) {
  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

// function createMarkup({
//   webformatURL,
//   largeImageURL,
//   tags,
//   likes,
//   views,
//   comments,
//   downloads,
// }) {
//   return `<div class="photo-card">
//   <a class = "gallery__link" href="${largeImageURL}">
//   <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes</b>
//       ${likes}
//     </p>
//     <p class="info-item">
//       <b>Views</b>
//       ${views}
//     </p>
//     <p class="info-item">
//       <b>Comments</b>
//       ${comments}
//     </p>
//     <p class="info-item">
//       <b>Downloads</b>
//       ${downloads}
//     </p>
//   </div>
//   </a>
// </div>`;
// }

function clearList() {
  gallery.innerHTML = '';
}

function onError(err) {
  loader.classList.add('is-hidden');
  console.error(err);
  loadMoreBtn.hide();
}

const lightbox = new SimpleLightbox('.gallery a');