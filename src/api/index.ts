import { CatalogService } from './CatalogService';
import { PointService } from './PointService';

class Api {
  public catalog: CatalogService = null;

  public point: PointService = null;

  constructor() {
    this.catalog = new CatalogService();
    this.point = new PointService();
  }
}

export const api = new Api();
