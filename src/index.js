import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const boxEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const infoEl = document.querySelector('.country-info');

const handleSearchContry = event => {
  let valueInput = event.target.value.toLowerCase().trim();
  makeInner();
  if (valueInput === '') {
    return;
  }

  fetchCountries(valueInput)
    .then(makeConntry)
    .catch(err => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
};

const debounceFunction = debounce(handleSearchContry, DEBOUNCE_DELAY);
boxEl.addEventListener('input', debounceFunction);

function makeConntry(data) {
  if (data.length >= 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (data.length === 1) {
    infoEl.insertAdjacentHTML('beforeend', makeAllAboutOneCountry(data));
  } else {
    listEl.insertAdjacentHTML('beforeend', makeCountries(data));
  }
}

function makeInner() {
  listEl.innerHTML = '';
  infoEl.innerHTML = '';
}

function makeCountries(data) {
  const сountry = data
    .map(({ name, flags }) => {
      return `<li class="country" ><img src="${flags.svg}" alt="${name.official} with="100" height="100">
        <h2>${name.official}</h2></li>`;
    })
    .join('');

  return сountry;
}

function makeAllAboutOneCountry(data) {
  let сountry = data
    .map(({ name, population, capital, flags, languages }) => {
      return `<div><img class="flags-list" src="${
        flags.svg
      }" alt="Country width="50" height="50">
        <h3>${
          name.official
        }</h3></div><p>Population:"${population}"</p><p>Capital:"${capital}"</p><p>Language:"${Object.values(
        languages
      )}"</p>`;
    })
    .join('');
  return сountry;
}
