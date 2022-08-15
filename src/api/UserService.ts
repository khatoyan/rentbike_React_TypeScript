
export class UserService {
  public async getCurrentUser() {
    const res = await fetch('/api/users/current', {
      method: 'GET',
    })
    return res.json();
  }

  public async login(login: string, password: string) {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({login, password})
    })
    return res.json();
  }

  public async register(login: string, password: string) {
    const res = await fetch('/api/users/current', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({login, password})
    })
    return res.json();
  }
}
