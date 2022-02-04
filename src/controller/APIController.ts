/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { NextFunction, Response, Request } from 'express';
import { HttpException } from '../exceptions';
import { APIService } from '../services';
import { IResponseSuccess, IResponseError } from '../interfaces';
import {transformData} from '../utils';
/**
 *
 * The API controller
 * @category Controllers
 * @class APIController
 */
class APIController {
  /**
   *
   * @description Get postcode by point (lon, lat)
   * @static
   * @param {Request} req - The request
   * @param {Response} res - The response
   * @param {NextFunction} next - The next middleware in queue
   * @return {JSON} - the transformed data from consume postcode.io API
   * @memberof APIController
   */
  public static async findPostCodeByPoint(req: Request, res: Response, next: NextFunction) {
    try {
      const {lat, lon} = req.params;
      
      const result = await APIService.getPostCodeByPoint(parseFloat(lat), parseFloat(lon));
      if(result.status != 200 )  {
        const error = result as IResponseError
        throw new Error(error.error);
      }

      const PostCode = result as IResponseSuccess;
      const formattedPostCode = transformData(PostCode.result);

      const nearestResult = await APIService.getNearestPostCode(formattedPostCode.postcode);

      if(nearestResult.status != 200)  {
        const error = result as IResponseError
        throw new Error(error.error);
      }

      const nearestPostCode = nearestResult as IResponseSuccess;
      const nearestFormattedPostCode = transformData(nearestPostCode.result);


      res.json({
        postcode:formattedPostCode,
        nearest:nearestFormattedPostCode
      });
    } catch (error: any) {
      return next(new HttpException(error.status || 500, error.message));
    }
  }



  
}
export default APIController;
