const initialState = {
  cities: [],
  autocomlite: []
}

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CITIES_SUCCEEDED':
      return Object.assign({}, state, {autocomlite: action.cities.autocomlite, cities: action.cities.cities});
    case 'AUTOCOMPLETE_SUCCEEDED':
      return Object.assign({}, state, {autocomlite: action.autocomlite});
    default:
      return state;
  }
}

export default mainReducer;
