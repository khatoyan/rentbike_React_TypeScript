import React from 'react';

import { UserContext } from '../../../context/UserContext';
import { useMode } from '../../../hooks/useMode';

import { ChangeEmailForm } from './ChangeEmailForm';
import classes from '../UserSettings.module.css';
import { api } from '../../../api';

export const EmailRow = () => {
  const currentUser = React.useContext(UserContext);
  const { mode, toggleMode } = useMode('view');

  const onClickSubmit = async (email: string) => {
    await api.user.updateUserInfo({ login: email });
    await currentUser.update();

    toggleMode();
  };

  return (
    <div className={classes.row}>
      {mode === 'view' && (
        <div className={classes.content}>
          <label className={classes.label}>Электронная почта</label>
          {currentUser.login}
        </div>
      )}
      {mode === 'edit' && <ChangeEmailForm onClickSubmit={onClickSubmit} email={currentUser.login} />}
      <a className={classes.editLink} onClick={toggleMode}>
        {mode === 'edit' ? 'Отменить' : 'Изменить'}
      </a>
    </div>
  );
};
