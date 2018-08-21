// Config
const api = require('../../../config/settings');

const endpoint = 'subway/status';
// const endpoint = 'subway/status/archive/162'; // 43 (lcl/exp) // 15 (route change) 27 (d/f crazy route change) 74, 117

export default class MtaDelaysApi {
  constructor() {

  }

  getStatus = () => {

    console.log(' ---- The environment is: [', process.env.NODE_ENV, '] ------');

    let e = api[process.env.NODE_ENV];
    let url = e.protocol + e.host + ':' + e.port
      + e.endpoint_prefix + '/' + endpoint;

    console.log(' ---- The environment API: [', url, '] ------');

    return fetch(url)
      .then(res => (res.status == 200) ? res : Promise.reject('Fetch had a non-200 response.'))
      .then(res => res.json())
      .catch(err => Promise.reject(err));
  }
}
