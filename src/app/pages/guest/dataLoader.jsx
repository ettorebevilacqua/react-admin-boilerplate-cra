import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useInjectReducer } from 'utils/redux-injectors';
import { guestSlice } from 'app/slice';
import Guest from './guest';

export default function GuestDataLoader() {
  debugger;
  useInjectReducer({ key: guestSlice.name, reducer: guestSlice.slice.reducer });
  const dataSelector = useSelector(guestSlice.selects.dataSelector);
  const [data, setData] = useState();

  useEffect(() => {
    guestSlice.actions.query();
  }, []);

  useEffect(() => {
    dataSelector && setData({ ...dataSelector });
  }, [dataSelector]);

  return <Guest />;
}
