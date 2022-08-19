import React from 'react';

import classes from '../UserSettings.module.css';
import { Button } from '../../../components/Button/Button';
import { useMode } from '../../../hooks/useMode';
import { api } from '../../../api';

export const PasswordRow = () => {
  const { mode, toggleMode } = useMode('view');
  const [repeatPassword, setRepeatPassword] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onSubmit = () => {
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
        <form className={classes.content}>
          <label className={classes.label} htmlFor="settings-new-pass">
            Новый пароль
          </label>
          <div className={classes.formRow}>
            <input
              type="password"
              className="input"
              value={password}
              id="settings-new-pass"
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </div>
          <label className={classes.label} htmlFor="settings-repeat-pass">
            Повторите пароль
          </label>
          <div className={classes.formRow}>
            <input
              type="password"
              className="input"
              value={repeatPassword}
              id="settings-repeat-pass"
              onChange={(e) => setRepeatPassword(e.currentTarget.value)}
            />
          </div>
          <div className={classes.formRow}>
            <Button onClick={onSubmit}>Изменить</Button>
          </div>
        </form>
      )}
      <a className={classes.editLink} onClick={toggleMode}>
        {mode === 'edit' ? 'Отменить' : 'Изменить'}
      </a>
    </div>
  );
};
