const BASE_URL = "https://pixabay.com/api/?";

const API_KEY = "23625059-9296b74aaab4f5d239dc56ee8";

const fetchAPI = async (query, page) => {
  const url = `${BASE_URL}q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  const response = await fetch(url);
  return await response.json();
};

export default fetchAPI;

///// how to work fetch:
// function fetchImg(query, page) {
//   return fetch(
//     `${BASE_URL}q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
//   ).then((response) => {
//     if (response.ok) {
//       return response.json();
//     }
//     return Promise.reject(new Error(`not found`));
//   });
// }
