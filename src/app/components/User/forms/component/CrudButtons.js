import React from 'react';
import GridChilds from './gridChilds';
import { Box, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

function makeEnum(arr) {
  let obj = {};
  for (let val of arr) {
    obj[val] = Symbol(val);
  }
  return Object.freeze(obj);
}

export const ButtonnType = makeEnum(['add', 'delete', 'blue']);

export const CrudButton = ({ onClick, show, hides, disableds, children }) => {
  const isFoundInList = (list, val) => list && list.indexOf(val) > -1;
  const isFound = val =>
    (!show ? true : isFoundInList(show, val)) && !isFoundInList(hides, val);

  return (
    <>
      {children}
      <GridChilds
        key="1aag"
        justify="space-between"
        alignItems="center"
        spacing={2}
        view={[2, 4, 1, 1, 1]}
      >
        {isFound(ButtonnType.add) && (
          <Box style={{ width: '100%' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={onClick(ButtonnType.add)}
            >
              <span style={{ fontSize: '11px' }}>Add</span>
            </Button>
          </Box>
        )}
        {isFound(ButtonnType.delete) && (
          <Box>
            <DeleteIcon
              style={{ fontSize: '36px' }}
              color="secondary"
              onClick={event => onClick(ButtonnType.delete)}
            />
          </Box>
        )}
        <span> </span>
      </GridChilds>
    </>
  );
};
