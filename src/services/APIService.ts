import {IResponseSuccess, IResponseError, IResponse} from "../interfaces";
import '../config/dotenv';
import axios from 'axios';

/**
 *
 * The user service,layer of repository pattern
 * @category Services
 * @class APIService
 */
class APIService {

  /**
   * @description get one postcode by point (lon, lat)
   * @param {number} lat latitude
   * @param {number} lon longitude 
   * @returns {Promise<IResponseSuccess | IResponseError>} return de response of the consume postcode.io API
   */
  async getPostCodeByPoint(lat: number, lon: number): Promise<IResponseSuccess | IResponseError> {
    return new Promise<IResponseSuccess | IResponseError>(async (resolve, reject) => {
      axios.get(`${process.env.POSTCODE_API}postcodes?lon=${encodeURIComponent(lon)}&lat=${encodeURIComponent(lat)}&limit=1`)
      .then((response) => {
        const {data} = response;
        if (data.status === 200) {
          const result = data as IResponseSuccess;
          if(!result.result) {
            reject({
              status: 404,
              message: 'PostCode not found'
            });
          }
          resolve({
            status: 200,
            result: result.result[0]
          });
        } else {
          const result = data as IResponseError;
          reject({
            status: result.status,
            message: result.error
          });
        }
      })
      .catch(error => reject(error));
    });
    
  }

  async getNearestPostCode(postcode: string): Promise<IResponseSuccess | IResponseError> {
    return new Promise<IResponseSuccess | IResponseError>(async (resolve, reject) => {
      const econdePostCode = encodeURIComponent(postcode);
      axios.get(`${process.env.POSTCODE_API}postcodes/${econdePostCode}/nearest`)
      .then((response: any) => {
        const data = response.data;
        if (data.status === 200) {
          const result = data as IResponseSuccess;
          const firstNearest = result.result.filter((item: any) => {
            return item.postcode !== postcode
          })[0];
          resolve({
            status: 200,
            result: firstNearest
          });
        } else {
          const result = data as IResponseError;
          
          reject({
            status: result.status,
            message: result.error
          });
        }
      })
      .catch(error => {
        reject({
          status: error.response.status,
          message:'Post code not found'
        })}
        );
    });
    
  }
  
}

export default new APIService();
