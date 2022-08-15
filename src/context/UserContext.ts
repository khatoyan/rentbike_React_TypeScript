import {createContext} from 'react'

interface UserData {
  isLogged: boolean;
  login: string
  onRegister: (login: string, password: string) => Promise<void>
  onLogin: (login: string, password: string) => Promise<void>
}

export const UserContext = createContext<UserData>({
  isLogged: false,
  login: null,
  onLogin: () => null,
  onRegister: () => null
});
