// import axios from 'axios';
const ENDPOINT = 'https://pixabay.com/api/';
const KEY = '33796051-1e422d07d8c9fc912bc2a7eb4';
const param =
  'per_page=18&image_type=photo&orientation=horyzontal&safesearch=true';


export default function ImageApiService(search) {
  const URL = `${ENDPOINT}?key=${KEY}&q=${search}&${param}`;
  return fetch(URL).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
