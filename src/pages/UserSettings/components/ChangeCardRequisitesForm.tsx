import React, { useRef } from 'react';
import { Input } from '@skbkontur/react-ui';
import classes from '../UserSettings.module.css';
import { Button } from '../../../components/Button/Button';
import { CardRequisites } from '../../../types/domain/User';
import { ValidationContainer, ValidationWrapper } from '@skbkontur/react-ui-validations';
import { validateCardNumber, validateCardDate, validateCardCVV } from '../../../helpers/validators';

interface ChangeCardRequisitesFormProps extends CardRequisites {
  onClickSubmit: (cardRequisites: CardRequisites) => void;
}

export const ChangeCardRequisitesForm: React.FC<ChangeCardRequisitesFormProps> = ({
  number: defaultNumber,
  date: defaultDate,
  cvv: defaultCVV,
  onClickSubmit,
}) => {
  const validationContainerRef = useRef<ValidationContainer>(null);
  const [number, setNumber] = React.useState(defaultNumber || '');
  const [date, setDate] = React.useState(defaultDate || '');
  const [cvv, setCVV] = React.useState(defaultCVV || '');

  const hadnleSubmit = async () => {
    const isValid = await validationContainerRef.current.validate();

    if (!isValid) {
      return;
    }

    onClickSubmit({ number, date, cvv });
  };

  return (
    <ValidationContainer ref={validationContainerRef}>
      <form className={classes.content}>
        <label className={classes.label} htmlFor="settings-number">
          Номер
        </label>
        <div className={classes.formRow}>
          <ValidationWrapper validationInfo={validateCardNumber(number)}>
            <Input
              value={number}
              id="settings-number"
              width={300}
              size="medium"
              onValueChange={setNumber}
              mask={'9999 9999 9999 9999'}
              placeholder="0000 0000 0000 0000"
            />
          </ValidationWrapper>
        </div>
        <label className={classes.label} htmlFor="settings-date">
          Срок
        </label>
        <div className={classes.formRow}>
          <ValidationWrapper validationInfo={validateCardDate(date)}>
            <Input
              width={300}
              size="medium"
              placeholder="ММ/ГГГГ"
              id="settings-date"
              mask="99/9999"
              value={date}
              onValueChange={setDate}
            />
          </ValidationWrapper>
        </div>
        <label className={classes.label} htmlFor="settings-cvv">
          CVV
        </label>
        <div className={classes.formRow}>
          <ValidationWrapper validationInfo={validateCardCVV(cvv)}>
            <Input
              width={300}
              size="medium"
              mask="999"
              value={cvv}
              type="password"
              placeholder="•••"
              id="settings-cvv"
              onValueChange={setCVV}
            />
          </ValidationWrapper>
        </div>
        <div className={classes.formRow}>
          <Button onClick={hadnleSubmit}>Изменить</Button>
        </div>
      </form>
    </ValidationContainer>
  );
};
