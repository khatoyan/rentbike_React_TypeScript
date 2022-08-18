import { IPagination } from '../types/common/pagination';
import { Bike } from '../types/domain/Bike';

export class CatalogService {
  public async getBikes(page = 1, pointId = ''): Promise<IPagination<Bike>> {
    const res = await fetch(`/api/catalog/${pointId}?page=${page}`);
    return res.json();
  }

  public async getBike(bikeId: string): Promise<Bike> {
    const res = await fetch(`/api/catalog/bike/${bikeId}`);
    return res.json();
  }
}
