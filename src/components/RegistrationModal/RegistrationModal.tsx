import React from 'react';
import { Modal } from '../Modal/Modal';
import { Form, Row } from '../Form/Form';
import { Label } from '../Label/Label';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';

export interface RegistrationFormData {
  name?: string;
  email: string;
  password: string;
}

interface Props {
  onClose: () => void;
  onRegister: (data: RegistrationFormData) => void;
}

interface FieldState {
  value: string;
  error?: string;
  warning?: string;
}

interface FormState {
  name: FieldState;
  email: FieldState;
  password1: FieldState;
  password2: FieldState;
}

const hasErrors = (state: FormState) => {
  return Object.values(state).some((field) => !!field.error);
};

export const RegistrationModal = ({ onClose, onRegister }: Props) => {
  const [state, setState] = React.useState<FormState>({
    email: { value: '' },
    name: { value: '' },
    password1: { value: '', warning: 'Минимум 8 символов' },
    password2: { value: '' },
  });

  const getFieldSetter = (field: keyof FormState) => {
    return (value: string) => {
      const newState = { ...state, [field]: { value } };
      const validatedState = validate('change', newState);
      setState(validatedState);
    };
  };

  const validate = (type: 'blur' | 'change' | 'submit', newState: FormState) => {
    const validatedState = { ...newState };
    if (type === 'submit') {
      if (newState.password1.value.length < 8) {
        validatedState.password1.error = 'Минимум 8 символов';
      }
      if (newState.password1.value !== newState.password2.value) {
        validatedState.password2.error = 'Пароли не совпадают';
      }
    }
    return validatedState;
  };

  const handleRegisterClick = () => {
    const validatedState = validate('submit', state);
    if (hasErrors(validatedState)) {
      setState(validatedState);
      return;
    }
    onRegister({
      email: state.email.value,
      password: state.password1.value,
    });
  };

  return (
    <Modal width={400} title={'Регистрация'} onClose={onClose}>
      <Form>
        {/*<Row>
          <Label htmlFor="reg-name">Имя</Label>
          <Input id="reg-name" type={'text'} value={name} onChange={setName}/>
          <Label htmlFor="reg-name" error >Обязательное поле</Label>
        </Row>*/}
        <Row>
          <Label htmlFor="reg-email">Email</Label>
          <Input id="reg-email" type={'email'} value={state.email.value} onChange={getFieldSetter('email')} />
          {state.email.error && (
            <Label htmlFor="reg-email" error>
              {state.email.error}
            </Label>
          )}
          {state.email.warning && (
            <Label htmlFor="reg-email" warning>
              {state.email.warning}
            </Label>
          )}
        </Row>
        <Row>
          <Label htmlFor="reg-password1">Пароль</Label>
          <Input
            id="reg-password1"
            type={'password'}
            value={state.password1.value}
            onChange={getFieldSetter('password1')}
          />
          {state.password1.error && (
            <Label htmlFor="reg-email" error>
              {state.password1.error}
            </Label>
          )}
          {state.password1.warning && (
            <Label htmlFor="reg-email" warning>
              {state.password1.warning}
            </Label>
          )}
        </Row>
        <Row>
          <Label htmlFor="reg-password2">Пароль</Label>
          <Input
            id="reg-password2"
            type={'password'}
            value={state.password2.value}
            onChange={getFieldSetter('password2')}
          />
          {state.password2.error && (
            <Label htmlFor="reg-email" error>
              {state.password2.error}
            </Label>
          )}
          {state.password2.warning && (
            <Label htmlFor="reg-email" warning>
              {state.password2.warning}
            </Label>
          )}
        </Row>
        <Row>
          <Button wide large onClick={handleRegisterClick}>
            Зарегистрироваться
          </Button>
        </Row>
      </Form>
    </Modal>
  );
};
