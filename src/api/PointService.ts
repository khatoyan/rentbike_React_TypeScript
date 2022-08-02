import { RentPoint } from '../types/domain/RentPoint';

export class PointService {
  public async getPoints(): Promise<RentPoint[]> {
    const res = await fetch('/api/point');
    return res.json();
  }
}
