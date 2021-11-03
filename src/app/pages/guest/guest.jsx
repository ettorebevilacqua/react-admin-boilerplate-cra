import React, { useState } from 'react';
// import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useStyles from './style';

import { guestSlice } from 'app/slice';

export default function GuestDataLoader({ data }) {
  const classes = useStyles();
  const personaleSelector = useSelector(guestSlice.selects.dataSelector);
  const [tmp, setTmp] = useState();

  return (
    <div className={classes.root}>
      <h3>Data Loader</h3>
    </div>
  );
}
