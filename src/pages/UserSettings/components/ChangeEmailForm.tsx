import React, { useRef } from 'react';

import classes from '../UserSettings.module.css';
import { Button } from '../../../components/Button/Button';
import { ValidationContainer, ValidationWrapper } from '@skbkontur/react-ui-validations';
import { validateEmail } from '../../../helpers/validators';
import { Input } from '@skbkontur/react-ui';

interface ChangeEmailFormProps {
  email: string;
  onClickSubmit: (email: string) => void;
}

export const ChangeEmailForm: React.FC<ChangeEmailFormProps> = ({ email: defaultEmail, onClickSubmit }) => {
  const validationContainerRef = useRef<ValidationContainer>(null);
  const [email, setEmail] = React.useState(defaultEmail);

  const handleSubmitClick = async () => {
    const isValid = await validationContainerRef.current.validate();

    if (!isValid) {
      return;
    }

    onClickSubmit(email);
  };

  return (
    <form className={classes.content}>
      <label className={classes.label} htmlFor="settings-email">
        Электронная почта
      </label>
      <div className={classes.formRow}>
        <ValidationContainer ref={validationContainerRef}>
          <ValidationWrapper validationInfo={validateEmail(email)}>
            <Input value={email} width={300} size="medium" id="settings-email" onValueChange={setEmail} />
          </ValidationWrapper>
        </ValidationContainer>
      </div>
      <div className={classes.formRow}>
        <Button onClick={handleSubmitClick}>Изменить</Button>
      </div>
    </form>
  );
};
