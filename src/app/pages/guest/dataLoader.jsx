import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useInjectReducer } from 'utils/redux-injectors';
import { guestSlice } from 'app/slice';
import Guest from './guest';

export default function GuestDataLoader() {
  useInjectReducer({ key: guestSlice.name, reducer: guestSlice.slice.reducer });
  const dataSelector = useSelector(guestSlice.selects.dataSelector);

  const params = useParams();
  const token = params.token;
  const [data, setData] = useState();

  useEffect(() => {
    guestSlice.actions.get(token);
  }, []);

  useEffect(() => {
    dataSelector && setData({ ...dataSelector });
  }, [dataSelector]);

  const saveData = value => {
    const dataOut = { token, id: token, risposte: value };
    guestSlice.actions.save(dataOut).then(res => {
      console.log('saved', res);
    });
  };

  return !token ? (
    <h3>Utente non autorizzato</h3>
  ) : data ? (
    <Guest initialValue={data} saveData={saveData} />
  ) : (
    <h3>Loading...</h3>
  );
}
