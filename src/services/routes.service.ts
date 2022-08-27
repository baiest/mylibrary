import { ApiRoute } from "../models/routes";
import { booksRouter } from "./books.service";

/**
 * @param path is route's name of the service and @example 'api/users-with-name-path'
 * @param router it's a router of express
 */
export const routes: ApiRoute[] = [{
  path: 'books',
  router: booksRouter
}]