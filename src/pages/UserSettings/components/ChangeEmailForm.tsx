import React from 'react';

import classes from '../UserSettings.module.css';
import { Button } from '../../../components/Button/Button';
import { api } from '../../../api';

interface ChangeEmailFormProps {
  email: string;
  onClickSubmit: (email: string) => void;
}

export const ChangeEmailForm: React.FC<ChangeEmailFormProps> = ({ email: defaultEmail, onClickSubmit }) => {
  const [email, setEmail] = React.useState(defaultEmail);

  return (
    <form className={classes.content}>
      <label className={classes.label} htmlFor="settings-email">
        Электронная почта
      </label>
      <div className={classes.formRow}>
        <input
          type="email"
          className="input"
          value={email}
          id="settings-email"
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
      </div>
      <div className={classes.formRow}>
        <Button onClick={() => onClickSubmit(email)}>Изменить</Button>
      </div>
    </form>
  );
};
