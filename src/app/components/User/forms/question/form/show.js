import React from 'react';

import {
  Card,
  Paper,
  Box,
  Typography,
  Divider,
  Checkbox,
} from '@material-ui/core';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import RadioButtonChecked from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';

import { makeStyles } from '@material-ui/core/styles';

import GridChilds from '../comp/gridChilds';

import TextField from '@material-ui/core/TextField';

const CompTrueFalse = ({
  value,
  title,
  compProps,
  color,
  key,
  onClickOptions,
  ...props
}) => {
  const Comp = value ? RadioButtonChecked : RadioButtonUnchecked;
  const propComp = {
    color,
    onClick: onClickOptions,
    ...compProps,
  };
  return (
    <Box {...props}>
      <Comp {...propComp} /> <span> {title}</span>
    </Box>
  );
};

const useStyles = makeStyles(theme => ({
  cardFlex: {
    minHeight: 52,
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
    '& a': {
      textDecoration: 'none',
      color: 'inherit',
    },
  },
  cardDomanda: {
    padding: '8px',
  },
  main: props => ({
    overflow: 'inherit',
    padding: 16,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& .icon': {
      color: theme.palette.type === 'dark' ? 'inherit' : '#dc2440',
    },
  }),
  domandaTxt: {},
}));

const resetListVal = (list, index, val) => {
  debugger;
  const ris = list.map((elem, iRis) => (iRis === index ? val : false));
  return ris;
};

export function ShowQuestion(props) {
  const { values } = props;
  const classes = useStyles();
  const [risposte, setRisposte] = React.useState(props.risposte);

  const changeRisposte = (idxDomanda, idxRisposta, val) => {
    const newRisposte = [...risposte];
    newRisposte[idxDomanda][idxRisposta] = val;
    setRisposte(newRisposte);
  };

  const onClickOptions = (tipo, idxDomanda, idxRisposta) => e => {
    console.log('click risposta', idxDomanda, idxRisposta);
    const valBefore = risposte[idxDomanda][idxRisposta];
    const isBool = [2, 3, 4].indexOf(tipo) > -1;
    const valBool = isBool ? !valBefore : valBefore;
    const _risposte = [...risposte];
    const _rispostaOption =
      tipo === 2
        ? resetListVal(_risposte[idxDomanda], idxRisposta, valBefore)
        : _risposte[idxDomanda];
    _risposte[idxDomanda] = _rispostaOption;

    return tipo === 2
      ? setRisposte([_risposte])
      : isBool && changeRisposte(idxDomanda, idxRisposta, valBool);
  };

  const onChangeRiposta = (idxDomanda, idxRisposta) => e => {
    const val = e.target.value;
    console.log('click risposta', idxDomanda, idxRisposta, val);
  };

  const radioTrueFalse = val => (
    <>
      {['Vero', 'Falso'].map((title, index) => (
        <CompTrueFalse
          value={!index ? val : !val}
          title={title}
          color={!index ? 'primary' : 'secondary'}
          onClickOptions={onClickOptions}
        />
      ))}
    </>
  );

  const getValueRiposta = (idxDomanda, idxRisposta) =>
    risposte[idxDomanda][idxRisposta];

  const renderTipoInner = (idxDomanda, idxRisposta, tipo) => {
    const val = risposte[idxDomanda][idxRisposta];
    const onClickInner = onClickOptions(tipo, idxDomanda, idxRisposta);
    // console.log('vals', val);
    return tipo === 2 ? (
      val ? (
        <RadioButtonChecked
          color={val ? 'primary' : 'secondary'}
          onClick={onClickInner}
        />
      ) : (
        <RadioButtonUnchecked color="secondary" onClick={onClickInner} />
      )
    ) : tipo === 3 ? (
      <Checkbox checked={val} onClick={onClickInner} />
    ) : tipo === 1 ? (
      <Box component="fieldset" mb={3} borderColor="transparent"></Box>
    ) : tipo === 4 ? (
      <RadioGroup aria-label="gender" name="gender1">
        {radioTrueFalse(val, [true, false])}
      </RadioGroup>
    ) : tipo === 5 ? (
      <TextField value={val} onChange={onClickInner} />
    ) : (
      <span></span>
    );
  };

  const renderRisposte = (tipo, idxDomanda) => (risposta, idxRisposta) => (
    <GridChilds
      view={[1, 11]}
      className={classes.cardDomanda}
      style={{ marginTop: '12px' }}
    >
      <span> </span>
      <Paper className={classes.cardDomanda}>
        <GridChilds view={[10, 2]} style={{ alignItems: 'center' }}>
          {risposta.risposta}
          {tipo === 5 ? (
            <TextField onChange={onChangeRiposta(idxDomanda, idxRisposta)} />
          ) : (
            renderTipoInner(
              idxDomanda,
              idxRisposta,
              tipo,
              getValueRiposta(idxDomanda, idxRisposta),
            )
          )}
        </GridChilds>
      </Paper>
    </GridChilds>
  );

  const renderDomanda = (domanda, idx) => (
    <>
      <Paper className={classes.cardDomanda}>
        <GridChilds view={[12]} style={{}}>
          <Typography className={classes.domandaTxt} color="textSecondary">
            {domanda.domanda}
          </Typography>
        </GridChilds>
      </Paper>
      {domanda.risposte &&
        domanda.risposte.map &&
        domanda.risposte.map(renderRisposte(domanda.tipo, idx))}
    </>
  );

  return (
    <GridChilds view={[1, 10, 1]} style={{ marginTop: '16px', width: '100%' }}>
      <span> </span>
      {values.domande.map(renderDomanda)}
      <span> </span>
    </GridChilds>
  );
}
