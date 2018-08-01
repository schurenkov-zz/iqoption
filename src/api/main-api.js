import axios from 'axios';

export function getCities(){
  return axios.get('../data/data.json')
              .then(result=> { return result.data })
}
