import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import { elemStyle } from '../stylesElement';
import GridChilds from '../component/gridChilds';
import Switch from '@material-ui/core/Switch';

import { ViewWeek, Email } from '@material-ui/icons';

export default function QuestionModuli({
  formProp: { id, data, saved, stateLoad, meta },
  queryValue,
  onSubmit,
  actions,
  ...props
}) {
  const [values, setValues] = React.useState();
  const classes = elemStyle();

  const loadData = () => data && setValues(data.results ? data.resulta : data);
  React.useEffect(loadData, [data]);

  // React.useEffect(init, []);
  // React.useEffect(dataUpdate, [data]);
  console.log('ModuliFormContainer', data);

  const renderButtonActionRecord = id => (
    <GridChilds style={{ textAlign: 'end' }} view={[6, 6]}>
      <IconButton
        style={{ fontSize: '36px' }}
        color="secondary"
        aria-label="delete"
        disabled={true}
      >
        <Email />
      </IconButton>
      <Button
        variant="contained"
        color="primary"
        onClick={e => props.history.push(`/app/user/indagini_edit/${id}`)}
      >
        <span className={classes.buttonAction}>Vai</span>
      </Button>
    </GridChilds>
  );

  const renderTitle = propsFormik => (
    <div className={classes.paperTitle}>
      <GridChilds
        justify="space-between"
        style={{ alignItems: 'center' }}
        view={[9, 3]}
      >
        <div>
          <span className={classes.texth4}>Questionari :</span>
          <span className={`${classes.colorRed} ${classes.texth5}`}>
            {saved && saved.isError && saved.errorMessage}
          </span>
        </div>
      </GridChilds>
    </div>
  );

  const onPublish = (val, idx) => {
    const newValues = values.map(elem => elem);
    const isPublic = newValues && newValues[idx] && newValues[idx].isPublic;
    newValues[idx] = { ...newValues[idx], isPublic: !isPublic };
    setValues(newValues);
  };

  const renderList = (fields, sizes) => (dataTo, index) => (
    <div>
      <Paper className={`${classes.paperRow} ${classes.width95}`} key={index}>
        <GridChilds
          justify="space-between"
          style={{ alignItems: 'center' }}
          view={[...sizes, 2]}
        >
          <div className={classes.paperRowElem}>{dataTo.title || ''}</div>
          <Switch
            checked={dataTo.isPublic}
            onChange={e => onPublish(e.target.value, index)}
            name="isPublic"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        </GridChilds>
      </Paper>
      <div className={`${classes.paperRow} ${classes.width95}`}>
        <span>Moduli :</span>
        {dataTo.moduli &&
          dataTo.moduli.map &&
          dataTo.moduli.map((modulo, idxModulo) => (
            <Paper
              className={`${classes.paperRow} ${classes.width95}`}
              key={idxModulo}
            >
              <GridChilds
                justify="space-between"
                style={{ alignItems: 'center' }}
                view={[...sizes, 2]}
              >
                <div className={classes.paperRowElem}>{modulo.title || ''}</div>
              </GridChilds>
            </Paper>
          ))}
      </div>
    </div>
  );

  const renderHeaderList = (fields, sizes) => {
    return (
      <Paper
        className={`${classes.paperRow} ${classes.width95}`}
        key={'headerFields'}
      >
        <GridChilds
          justify="space-between"
          style={{ alignItems: 'center' }}
          view={sizes}
        >
          {fields.map(field => (
            <div className={`${classes.fieldTitle} ${classes.texth5}`}>
              {field}
            </div>
          ))}
        </GridChilds>
      </Paper>
    );
  };

  return (
    <div className={classes.root}>
      {renderTitle()}
      {renderHeaderList(['Titolo', 'Pubblicato'], [4, 2])}
      {!!values && values.map && values.map(renderList(['title'], [4]))}
    </div>
  );
}
