import {IResponseSuccess, IResponseError, IResponse} from "../interfaces";
import '../config/dotenv';

/**
 *
 * The user service,layer of repository pattern
 * @category Services
 * @class APIService
 */
class APIService {

  async getPostCodeByPoint(lat: number, lon: number): Promise<IResponseSuccess | IResponseError> {
    return new Promise<IResponseSuccess | IResponseError>(async (resolve, reject) => {
      fetch(`${process.env.POSTCODE_API}/postcodes?lon=${lon}&lat=${lat}`)
      .then(response => response.json())
      .then((data: IResponse) => {
        if (data.status === 200) {
          const result = data as IResponseSuccess;
          resolve({
            status: 200,
            result: result.result
          });
        } else {
          const result = data as IResponseError;
          resolve({
            status: result.status,
            error: result.error
          });
        }
      })
      .catch(error => reject(error));
    });
    
  }

  async getNearestPostCode(postcode: string): Promise<IResponseSuccess | IResponseError> {
    return new Promise<IResponseSuccess | IResponseError>(async (resolve, reject) => {
      const econdePostCode = encodeURIComponent(postcode);
      fetch(`${process.env.POSTCODE_API}/postcodes/${econdePostCode}/nearest`)
      .then(response => response.json())
      .then((data: IResponse) => {
        if (data.status === 200) {
          const result = data as IResponseSuccess;
          resolve({
            status: 200,
            result: result.result
          });
        } else {
          const result = data as IResponseError;
          reject({
            status: result.status,
            error: result.error
          });
        }
      })
      .catch(error => reject(error));
    });
    
  }
  
}

export default new APIService();
