import React from 'react';

import {
  Card,
  Paper,
  Box,
  Typography,
  Divider,
  Checkbox,
} from '@material-ui/core';

import Rating from '@material-ui/lab/Rating';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';

import RadioButtonChecked from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';

import { makeStyles } from '@material-ui/core/styles';

import GridChilds from '../comp/gridChilds';

import TextField from '@material-ui/core/TextField';

const log = (msg, val) => {
  console.log(msg, val);
  return true;
};

const toNumberOr = (val, orVal) =>
  !val ? 2 : isNaN(parseInt(val + '')) ? orVal : parseInt(val + '');

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
    padding: '4px',
    paddingLeft: '8px',
    alignItems: 'center',
    display: 'flex',
  },
  boxDomanda: {
    background: 'white',
    padding: '8px',
    backGround: 'white',
    borderRadius: '6px',
    boxShadow:
      '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
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
  domandaTxt: {
    fontSize: '16px',
    fontWeight: '500',
  },
}));

const resetListVal = (list, index, val) => {
  const ris = list.reduce((acc, elem, iRis) => {
    acc.push(iRis === index ? val : false);
    return acc;
  }, []);

  return ris;
};

export function ShowQuestion(props) {
  const { values } = props;
  const classes = useStyles();
  const [risposte, setRisposte] = React.useState(props.risposte);

  const getValueRiposta = (idxDomanda, idxRisposta) =>
    risposte && risposte[idxDomanda] && risposte[idxDomanda][idxRisposta];

  const onChangeRating = (idxDomanda, idxRisposta) => e => {
    const val = e.target.value;
    const valRisp = risposte[idxDomanda];
    const _risposte = [...risposte];
    console.log('click risposta', idxDomanda, idxRisposta, valRisp);
  };

  const renderScala = (idxDomanda, scalaVal) => (
    <Box
      style={{ textAlign: 'center', marginLeft: '16px', marginRight: '16px' }}
    >
      <Typography variant={'span'} className={classes.domandaTxt}>
        {scalaVal && scalaVal.ratingStart}
      </Typography>

      <Rating
        style={{ marginLeft: '26px', marginRight: '26px' }}
        name="ratingRisposta"
        max={toNumberOr(scalaVal && scalaVal.ratingMax, 2)}
        value={toNumberOr(risposte[idxDomanda], 0)}
        onChange={(event, newValue) => {
          console.log('risposta rating ', scalaVal, newValue);
          const _risposte = [...risposte];
          _risposte[idxDomanda] = newValue;
          setRisposte(_risposte);
        }}
      />
      <Typography variant={'span'} className={classes.domandaTxt}>
        {scalaVal && scalaVal.ratingEnd}
      </Typography>
    </Box>
  );

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
        ? resetListVal(_risposte[idxDomanda], idxRisposta, valBool)
        : _risposte[idxDomanda];
    _risposte[idxDomanda] = _rispostaOption;

    return tipo === 2
      ? setRisposte(_risposte)
      : isBool && changeRisposte(idxDomanda, idxRisposta, valBool);
  };

  const radioTrueFalse = val => (
    <>
      {['Vero', 'Falso'].map((title, index) => (
        <CompTrueFalse
          key={index}
          value={!index ? val : !val}
          title={title}
          color={!index ? 'primary' : 'secondary'}
          onClickOptions={onClickOptions}
        />
      ))}
    </>
  );

  const renderTipoInner = (risposta, idxDomanda, idxRisposta, tipo) => {
    if (!risposta || !risposte[idxRisposta] || !('0' in risposte[idxDomanda]))
      return <span></span>;

    const val = risposte[idxDomanda][idxRisposta];
    const onClickInner = onClickOptions(tipo, idxDomanda, idxRisposta);
    console.log('vals', val);
    return (
      <div key={idxRisposta}>
        {tipo === 2 ? (
          val ? (
            <Button onClick={onClickInner}>
              <RadioButtonChecked color={val ? 'primary' : 'secondary'} />
            </Button>
          ) : (
            <Button onClick={onClickInner}>
              <RadioButtonUnchecked color="secondary" />
            </Button>
          )
        ) : tipo === 3 ? (
          <Checkbox checked={val} onClick={onClickInner} />
        ) : tipo === 4 ? (
          <RadioGroup aria-label="gender" name="gender1">
            {radioTrueFalse(val, [true, false])}
          </RadioGroup>
        ) : tipo === 5 ? (
          <TextField value={val} onChange={onClickInner} />
        ) : (
          <span></span>
        )}{' '}
      </div>
    );
  };

  const renderRisposte = (tipo, idxDomanda) => (risposta, idxRisposta) =>
    risposta && (
      <GridChilds
        key={idxRisposta}
        view={[1, 11]}
        className={classes.cardDomanda}
        style={{ marginTop: '-1px', marginBotton: '-1px' }}
      >
        <span> </span>
        {[1].indexOf(tipo) < 0 ? (
          <GridChilds view={[10, 2]} style={{ alignItems: 'center' }}>
            <Box className={classes.boxDomanda}>{risposta.risposta || ''}</Box>
            {renderTipoInner(
              risposta,
              idxDomanda,
              idxRisposta,
              tipo,
              getValueRiposta(idxDomanda, idxRisposta),
            )}
          </GridChilds>
        ) : tipo === 1 ? (
          renderScala(idxDomanda, risposta)
        ) : (
          <span></span>
        )}

        {risposta.correlata && renderDomanda(risposta.correlata, 0)}
      </GridChilds>
    );

  const renderDomandaAperta = idxDomanda => {
    const risposta = risposte[idxDomanda];
    return (
      <>
        <GridChilds view={[1, 10]}>
          <span> </span>
          <TextField
            style={{ width: '100%' }}
            label="Risposta"
            value={risposte[idxDomanda][0] || ''}
            onChange={e => {
              const _risposte = [...risposte];
              _risposte[idxDomanda][0] = e.currentTarget.value;
              setRisposte(_risposte);
            }}
          />
        </GridChilds>
      </>
    );
  };

  const renderDomanda = (domanda, idx) =>
    !(
      domanda &&
      domanda.domanda &&
      domanda.domanda.trim &&
      domanda.domanda.trim()
    ) ? (
      <></>
    ) : domanda.tipo === 6 ? (
      <div
        key={idx}
        className={classes.cardDomanda}
        style={{ marginBotton: '22px', marginTop: '22px' }}
      >
        <Typography
          variant={domanda.tipo === 6 ? 'h3' : 'span'}
          className={classes.domandaTxt}
          color="textSecondary"
        >
          {domanda.domanda}
        </Typography>
      </div>
    ) : (
      <div key={idx}>
        <Paper style={{ marginTop: '26px', marginBottom: '12px' }}>
          <GridChilds
            className={classes.cardDomanda}
            view={[12]}
            style={{ height: '48px' }}
          >
            <Typography
              variant={domanda.tipo === 6 ? 'h3' : 'body1'}
              className={classes.domandaTxt}
              color="textSecondary"
            >
              {domanda.domanda}
            </Typography>
          </GridChilds>
        </Paper>
        {domanda.tipo !== 6 && domanda.tipo === 5
          ? renderDomandaAperta(idx)
          : domanda.risposte &&
            domanda.risposte.map &&
            domanda.risposte.map(renderRisposte(domanda.tipo, idx))}
      </div>
    );

  return (
    <>
      <GridChilds
        key="gridChildShowMain2"
        view={[1, 10, 1]}
        style={{ marginTop: '16px', width: '100%' }}
      >
        <span> </span>
        {values.domande.map(renderDomanda)}
        <span> </span>
      </GridChilds>
      <p> </p>
      <p> </p>
    </>
  );
}
