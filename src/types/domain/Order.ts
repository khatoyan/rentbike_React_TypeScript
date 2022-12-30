export interface Order {
  _id: string;
  userId: string;
  bikeId: string;
  pointId: string;
  start?: string;
  end?: string;
}
