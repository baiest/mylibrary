import { ApiRoute } from "../models/routes";
import { booksRouter } from "./books.service";

export const routes: ApiRoute[] = [{
  name: 'books',
  path: 'books',
  router: booksRouter
}]