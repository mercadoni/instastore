import axios from 'axios';

/**
 * get Closest Store
 * @method getStore
 * @param latlng Object
 * @returns 'Store Info' 
**/
export const getStore = async (latlng) => {
    let data
    await axios({
            method: 'post',
            headers: { 'Content-Type': 'application/json'},
            url: `${process.env.REACT_APP_API_URL}/getStore`,
            data: latlng,
          }).then(function (response) {
           data = response
          }).catch(function (error){
              data = error.response.data
          });
  return data;
};
