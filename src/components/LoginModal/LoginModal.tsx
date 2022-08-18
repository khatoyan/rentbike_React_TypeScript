import React from 'react';
import { Modal } from '../Modal/Modal';
import { Row } from '../Form/Form';
import { Label } from '../Label/Label';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';

export interface LoginFormData {
  email: string;
  password: string;
}

interface Props {
  onLogin: (data: LoginFormData) => void;
  onClose: () => void;
}

export const LoginModal = ({ onLogin, onClose }: Props) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLoginClick = () => {
    onLogin({ email, password });
  };
  return (
    <Modal width={400} title={'Вход'} onClose={onClose}>
      <Row>
        <Label htmlFor="login-email">Email</Label>
        <Input id="login-email" type={'email'} value={email} onChange={setEmail} />
      </Row>
      <Row>
        <Label htmlFor="login-password">Пароль</Label>
        <Input id="login-password" type={'password'} value={password} onChange={setPassword} />
      </Row>
      <Row>
        <Button wide large onClick={handleLoginClick}>
          Войти
        </Button>
      </Row>
    </Modal>
  );
};
