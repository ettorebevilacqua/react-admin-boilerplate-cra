import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useInjectReducer } from 'utils/redux-injectors';

import useStyle from './style';
import { corsiSlice } from 'app/slice';

function ListPartecipantiComp({ list }) {
  return (
    <div>
      <p></p>
      <table class="params table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th class="last">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="name">
              <code>from</code>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export function ListPartecipanti(props) {
  useInjectReducer({ key: corsiSlice.name, reducer: corsiSlice.slice.reducer });
  const corsiSelector = useSelector(corsiSlice.selects.dataSelector);
  const [corsi, setCorsi] = useState(null);
  const classes = useStyle();

  useEffect(() => {
    corsiSlice.actions.query({}, true);
  }, []);

  useEffect(() => {
    !!corsiSelector && setCorsi(corsiSelector.results);
  }, [corsiSelector]);

  return (
    <div className={classes.root}>
      <br />
      xxxx
      <ListPartecipantiComp list={[]} />
      {!corsi ? <h3>Loading...</h3> : <ListPartecipantiComp list={corsi} />}
    </div>
  );
}
