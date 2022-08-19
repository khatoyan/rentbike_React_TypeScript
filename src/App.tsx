import React from 'react';
import { UserContext } from './context/UserContext';
import { Layout } from './layout';
import { Router } from './Router';
import { BrowserRouter } from 'react-router-dom';
import { RegistrationFormData } from './components/RegistrationModal/RegistrationModal';
import { api } from './api';
import { LoginFormData } from './components/LoginModal/LoginModal';

export const App = () => {
  const [userData, setUserData] = React.useState({
    isLogged: false,
    login: null,
    cardRequisites: null,
  });

  const loadCurrentUser = async () => {
    const data = await api.user.getCurrentUser();
    if (!data.error) {
      setUserData({ isLogged: true, login: data.login, cardRequisites: data.cardRequisites });
    }
  };

  React.useEffect(() => {
    loadCurrentUser();
  }, []);

  const onRegister = async (login: string, password: string) => {
    await api.user.register(login, password);
    loadCurrentUser();
  };
  const onLogin = async (login: string, password: string) => {
    await api.user.login(login, password);
    loadCurrentUser();
  };
  return (
    <UserContext.Provider value={{ ...userData, onLogin, onRegister, update: loadCurrentUser }}>
      <BrowserRouter basename="/">
        <Layout>
          <Router />
        </Layout>
      </BrowserRouter>
    </UserContext.Provider>
  );
};
