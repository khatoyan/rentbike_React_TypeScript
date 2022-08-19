import React from 'react';

import { UserContext } from '../../../context/UserContext';
import { useMode } from '../../../hooks/useMode';

import classes from '../UserSettings.module.css';
import { api } from '../../../api';
import { ChangeCardRequisitesForm } from './ChangeCardRequisitesForm';
import { CardRequisites } from '../../../types/domain/User';

export const CardRequisitesRow: React.FC = () => {
  const { cardRequisites, update } = React.useContext(UserContext);
  const { mode, toggleMode } = useMode('view');

  const onClickSubmit = async (cardRequisites: CardRequisites) => {
    await api.user.updateUserInfo({ cardRequisites });
    await update();

    toggleMode();
  };

  return (
    <div className={classes.row}>
      {mode === 'view' && (
        <div className={classes.content}>
          <label className={classes.label}>Карта</label>
          {cardRequisites?.number ? (
            <>•••• •••• •••• {cardRequisites.number.split('').slice(-4).join('')}</>
          ) : (
            'Не заполнено'
          )}
        </div>
      )}
      {mode === 'edit' && <ChangeCardRequisitesForm onClickSubmit={onClickSubmit} {...cardRequisites} />}
      <a className={classes.editLink} onClick={toggleMode}>
        {mode === 'edit' ? 'Отменить' : 'Изменить'}
      </a>
    </div>
  );
};
