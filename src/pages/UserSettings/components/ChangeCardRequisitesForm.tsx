import React from 'react';
import { Input } from '@skbkontur/react-ui';
import classes from '../UserSettings.module.css';
import { Button } from '../../../components/Button/Button';
import { CardRequisites } from '../../../types/domain/User';

interface ChangeCardRequisitesFormProps extends CardRequisites {
  onClickSubmit: (cardRequisites: CardRequisites) => void;
}

export const ChangeCardRequisitesForm: React.FC<ChangeCardRequisitesFormProps> = ({
  number: defaultNumber,
  date: defaultDate,
  cvv: defaultCVV,
  onClickSubmit,
}) => {
  const [number, setNumber] = React.useState(defaultNumber || '');
  const [date, setDate] = React.useState(defaultDate || '');
  const [cvv, setCVV] = React.useState(defaultCVV || '');

  return (
    <form>
      <label className={classes.label} htmlFor="settings-number">
        Карта
      </label>
      <div className={classes.formRow}>
        <Input
          value={number}
          id="settings-number"
          onValueChange={setNumber}
          mask={'9999 9999 9999 9999'}
          placeholder="0000 0000 0000 0000"
        />
      </div>
      <label className={classes.label} htmlFor="settings-date">
        Срок
      </label>
      <div className={classes.formRow}>
        <Input placeholder="ММ/ГГ" id="settings-date" mask="99/99" value={date} onValueChange={setDate} />
      </div>
      <label className={classes.label} htmlFor="settings-cvv">
        CVV
      </label>
      <div className={classes.formRow}>
        <Input mask="999" value={cvv} type="password" placeholder="•••" id="settings-cvv" onValueChange={setCVV} />
      </div>
      <div className={classes.formRow}>
        <Button onClick={() => onClickSubmit({ number, date, cvv })}>Изменить</Button>
      </div>
    </form>
  );
};
