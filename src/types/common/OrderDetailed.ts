import { Bike } from '../domain/Bike';
import { RentPoint } from '../domain/RentPoint';

export interface OrderDetailed {
  _id: string;
  bike: Bike;
  start?: string;
  end?: string;
  rentPoint: RentPoint;
  userId: string;
}
