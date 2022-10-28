export class OrderService {
  public async createOrder(bikeId: string) {
    const body = JSON.stringify({ bikeId });

    const res = await fetch('/api/order', {
      body,
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });

    return res.json();
  }

  public async getOrders() {
    const res = await fetch('/api/order');

    return res.json();
  }
}
