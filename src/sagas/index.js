import "regenerator-runtime/runtime";
import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects';
import * as api from '../api/main-api';
const getSities = state =>  state.mainState.cities;
function* fetchCities() {
   try {
      let cities = yield call(api.getCities);

      cities = Object.keys(cities)
                     .sort((a, b) => cities[a].localeCompare(cities[b]))
                     .reduce((obj, key) => {
                       obj[key] = cities[key];
                       return obj;
                     }, {});

      const autocomlite = Object.keys(cities)
                                .filter((k,i) => i < 5)
                                .reduce((obj, key) => {
                                  obj[key] = cities[key];
                                  return obj;
                                }, {});

      yield put({type: "CITIES_SUCCEEDED", cities: {autocomlite: autocomlite , cities: cities}});
   } catch (e) {
      yield put({type: "CITIES_FAILED"});
   }
}

function* autoCompleteCities(text){
  try {
    const cities = yield select(getSities)
    const autocomlite = Object.keys(cities)
                              .filter((k,i) => cities[k].toUpperCase().indexOf(text.search.toUpperCase()) !== -1)
                              .reduce((obj, key, i) => {
                                  if(i < 5)
                                  obj[key] = cities[key];
                                  return obj;
                              }, {});

    yield put({type: "AUTOCOMPLETE_SUCCEEDED", autocomlite: autocomlite});

  } catch (e) {
     yield put({type: "AUTOCOMPLETE_FAILED"});
  }
}

function* mySaga() {
  yield  [
    takeEvery("GET_CITIES", fetchCities),
    takeEvery("AUTOCOMPLETE", autoCompleteCities),

  ];
}

export default mySaga;
