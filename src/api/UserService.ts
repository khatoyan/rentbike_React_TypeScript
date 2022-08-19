import { CardRequisites } from 'src/types/domain/User';

interface IUpdateUserInfo {
  login?: string;
  password?: string;
  cardRequisites?: CardRequisites;
}

export class UserService {
  public async getCurrentUser() {
    const res = await fetch('/api/users/current', {
      method: 'GET',
    });
    return res.json();
  }

  public async login(login: string, password: string) {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ login, password }),
    });
    return res.json();
  }

  public async register(login: string, password: string) {
    const res = await fetch('/api/users/current', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ login, password }),
    });
    return res.json();
  }

  public async updateUserInfo(body: IUpdateUserInfo) {
    const res = await fetch('/api/users/current', {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(body),
    });

    return res;
  }
}
