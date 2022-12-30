import React, { useRef } from 'react';

import classes from '../UserSettings.module.css';
import { Button } from '../../../components/Button/Button';
import { useMode } from '../../../hooks/useMode';
import { api } from '../../../api';
import { ValidationContainer, ValidationWrapper } from '@skbkontur/react-ui-validations';
import { validatePassword, vatidateRepeatedPassword } from '../../../helpers/validators';
import { Input } from '@skbkontur/react-ui';

export const PasswordRow = () => {
  const { mode, toggleMode } = useMode('view');
  const [repeatPassword, setRepeatPassword] = React.useState('');
  const [password, setPassword] = React.useState('');
  const validationContainerRef = useRef<ValidationContainer>(null);

  const onSubmit = async () => {
    const isValid = await validationContainerRef.current.validate();

    if (!isValid) {
      return;
    }

    api.user.updateUserInfo({ password });
    toggleMode();
  };

  return (
    <div className={classes.row}>
      {mode === 'view' && (
        <div className={classes.content}>
          <label className={classes.label}>Пароль</label>
          ••••••••
        </div>
      )}
      {mode === 'edit' && (
        <ValidationContainer ref={validationContainerRef}>
          <form className={classes.content}>
            <label className={classes.label} htmlFor="settings-new-pass">
              Новый пароль
            </label>
            <div className={classes.formRow}>
              <ValidationWrapper validationInfo={validatePassword(password)}>
                <Input
                  width={300}
                  size="medium"
                  type="password"
                  value={password}
                  id="settings-new-pass"
                  onValueChange={setPassword}
                />
              </ValidationWrapper>
            </div>
            <label className={classes.label} htmlFor="settings-repeat-pass">
              Повторите пароль
            </label>
            <div className={classes.formRow}>
              <ValidationWrapper validationInfo={vatidateRepeatedPassword(repeatPassword, password)}>
                <Input
                  width={300}
                  size="medium"
                  type="password"
                  value={repeatPassword}
                  id="settings-repeat-pass"
                  onValueChange={setRepeatPassword}
                />
              </ValidationWrapper>
            </div>
            <div className={classes.formRow}>
              <Button onClick={onSubmit}>Изменить</Button>
            </div>
          </form>
        </ValidationContainer>
      )}
      <a className={classes.editLink} onClick={toggleMode}>
        {mode === 'edit' ? 'Отменить' : 'Изменить'}
      </a>
    </div>
  );
};
