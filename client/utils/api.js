import axios from 'axios';



const callApi = ({method='GET', path, data, params}) =>{
  if (process.browser) {
    const url = `${window.location.origin}/api/`;
    const apiUrl = `${url}${path}`;
    return axios({
      method, 
      url:apiUrl,
      data, 
      params,
    }).then((doc)=>{
      return doc.data;
    });
  }
  return Promise.resolve();
};

export {callApi};