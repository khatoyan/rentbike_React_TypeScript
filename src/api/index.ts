import { CatalogService } from './CatalogService';
import { OrderService } from './OrderService';
import { PointService } from './PointService';
import { UserService } from './UserService';

class Api {
  public catalog: CatalogService = null;
  public point: PointService = null;
  public user: UserService = null;
  public order: OrderService = null;

  constructor() {
    this.catalog = new CatalogService();
    this.point = new PointService();
    this.user = new UserService();
    this.order = new OrderService();
  }
}

export const api = new Api();
