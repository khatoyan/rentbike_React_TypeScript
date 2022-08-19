import React from 'react';
import { Button } from '../../../components/Button/Button';

import { Input } from '../../../components/Input/Input';
import classes from '../UserSettings.module.css';
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
        <Input type="text" placeholder="0000 0000 0000 0000" value={number} id="settings-number" onChange={setNumber} />
      </div>
      <label className={classes.label} htmlFor="settings-date">
        Срок
      </label>
      <div className={classes.formRow}>
        <Input type="month" value={date} placeholder="ММ/ГГ" id="settings-date" isShort onChange={setDate} />
      </div>
      <label className={classes.label} htmlFor="settings-cvv">
        CVV
      </label>
      <div className={classes.formRow}>
        <Input type="password" placeholder="•••" value={cvv} isShort id="settings-cvv" onChange={setCVV} />
      </div>
      <div className={classes.formRow}>
        <Button onClick={() => onClickSubmit({ number, date, cvv })}>Изменить</Button>
      </div>
    </form>
  );
};
