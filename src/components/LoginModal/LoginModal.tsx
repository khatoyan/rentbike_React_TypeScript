import React, { useRef } from 'react';
import { Modal } from '../Modal/Modal';
import { Row } from '../Form/Form';
import { Label } from '../Label/Label';
import { Button } from '../Button/Button';
import { ValidationContainer, ValidationWrapper } from '@skbkontur/react-ui-validations';
import { validateEmail, validatePassword } from '../../helpers/validators';
import { Input } from '@skbkontur/react-ui';

export interface LoginFormData {
  email: string;
  password: string;
}

interface Props {
  onLogin: (data: LoginFormData) => void;
  onClose: () => void;
}

export const LoginModal = ({ onLogin, onClose }: Props) => {
  const validationContainerRef = useRef<ValidationContainer>(null);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLoginClick = async () => {
    const isValid = await validationContainerRef.current.validate();

    if (!isValid) {
      return;
    }

    onLogin({ email, password });
  };
  return (
    <Modal width={400} title={'Вход'} onClose={onClose}>
      <ValidationContainer ref={validationContainerRef}>
        <Row>
          <Label htmlFor="login-email">Email</Label>
          <ValidationWrapper validationInfo={validateEmail(email)}>
            <Input id="login-email" value={email} onValueChange={setEmail} />
          </ValidationWrapper>
        </Row>
        <Row>
          <Label htmlFor="login-password">Пароль</Label>
          <ValidationWrapper validationInfo={validatePassword(password)}>
            <Input id="login-password" type={'password'} value={password} onValueChange={setPassword} />
          </ValidationWrapper>
        </Row>
        <Row>
          <Button wide large onClick={handleLoginClick}>
            Войти
          </Button>
        </Row>
      </ValidationContainer>
    </Modal>
  );
};
