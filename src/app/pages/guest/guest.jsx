import React, { useState } from 'react';
// import { useState, useEffect } from 'react';
import { ShowQuestion } from 'app/components/User/forms/question/form/show';
import useStyles from './style';

export default function GuestForm({ initialValue, saveData }) {
  const classes = useStyles();
  const [data, setData] = useState(initialValue);
  const [tmp, setTmp] = useState();

  const question = initialValue?.idquestion && typeof initialValue?.idquestion === 'object' && initialValue.idquestion;

  return (
    <div className={classes.root}>
      <ShowQuestion values={question} partecipante={data && data.partecipanti} guestValue={data} onChange={saveData} />
    </div>
  );
}
