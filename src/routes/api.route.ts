import {
  NextFunction, Request, Response, Router,
} from 'express';
import { APIControler } from '../controller';


/**
 *
 * @description The API router
 * @category Routes
 * @class APIRouter
 */
class APIRouter {
  public router = Router();


  constructor() {
    this.createRoutes();
  }

  createRoutes(): void {

    this.router.get('/point/:lat/:lon', 
    (req: Request, res: Response, next: NextFunction) => APIControler.findPostCodeByPoint(req, res, next)
    );
  }
}
export default new APIRouter().router;
