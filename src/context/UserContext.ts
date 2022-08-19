import { createContext } from 'react';
import { CardRequisites } from 'src/types/domain/User';

export interface UserData {
  isLogged: boolean;
  login: string;
  cardRequisites: CardRequisites;
  onRegister: (login: string, password: string) => Promise<void>;
  onLogin: (login: string, password: string) => Promise<void>;
  update: () => Promise<void>;
}

export const UserContext = createContext<UserData>({
  isLogged: false,
  login: null,
  onLogin: () => null,
  onRegister: () => null,
  cardRequisites: null,
  update: () => null,
});
