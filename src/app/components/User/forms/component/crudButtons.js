import React from 'react';
import GridChilds from './gridChilds';
import { Box, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

function makeEnum(arr) {
  let obj = {};
  for (let val of arr) {
    obj[val] = Symbol(val);
  }
  return Object.freeze(obj);
}

export const ButtonType = makeEnum(['add', 'delete', 'blue']);

export const CrudButton = props => {
  const { onClick, show, disableds, children } = props;
  const isFoundInList = (list, val) => list && list.indexOf(val) > -1;
  const isFound = val => (!show ? true : isFoundInList(show, val)); //&& !isFoundInList(hides, val);
  const isDisable = val => (!disableds ? false : isFoundInList(disableds, val));
  const numElem = !show ? 2 : show.length;
  const numToFill = Math.floor(12 / numElem);
  const viewSizes = Array(numElem).fill(numToFill);

  isFound('add') && viewSizes.push(2);
  isFound('add') && viewSizes.push(2);
  return (
    <>
      {children}
      <GridChilds
        key="1aag"
        justify="space-between"
        alignItems="center"
        spacing={2}
        view={viewSizes}
        style={{ textAlign: 'end' }}
      >
        {isFound('add') && (
          <Box style={{ width: '100%' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={onClick && onClick(ButtonType.add)}
            >
              <span style={{ fontSize: '11px' }}>Add</span>
            </Button>
          </Box>
        )}
        {isFound('delete') && (
          <Box>
            <IconButton
              style={{ fontSize: '36px' }}
              color="secondary"
              aria-label="delete"
              disabled={isDisable('delete')}
              onClick={() => onClick && onClick(ButtonType.delete)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
        <span> </span>
      </GridChilds>
    </>
  );
};
