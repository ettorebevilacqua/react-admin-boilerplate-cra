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

function resize(arr, newSize, defaultValue) {
  return [
    ...arr,
    ...Array(Math.max(newSize - arr.length, 0)).fill(defaultValue),
  ];
}

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
  const ris = list.reduce((acc, elem, iRis, olist) => {
    acc.push(iRis === index ? val : false);
    return acc;
  }, []);

  return ris;
};

const getRisposte = domande =>
  !domande || !domande.map
    ? []
    : domande.map(domanda =>
        (!domanda.risposte || domanda.risposte.length === 0
          ? [null]
          : domanda.risposte
        ).map(risp => null),
      );

export function ShowQuestion(props) {
  const { values } = props;
  const classes = useStyles();
  const risposteProps = getRisposte(values.domande);

  const [risposte, setRisposte] = React.useState(risposteProps);

  const getValueRiposta = (idxDomanda, idxRisposta) =>
    risposte && risposte[idxDomanda] && risposte[idxDomanda][idxRisposta];

  const getDomanda = idx =>
    values &&
    values.domande &&
    values.domande[idx] &&
    values.domande[idx].domanda.trim &&
    values.domande[idx].domanda.trim()
      ? values.domande[idx]
      : null;

  const getRispostaOfValues = (idxDomanda, idxRisposta) => {
    const domanda = getDomanda(idxDomanda);
    return !domanda || !domanda.risposte || !domanda.risposte[idxRisposta]
      ? null
      : domanda.risposte[idxRisposta];
  };

  const getCorrelata = (idxDomanda, idxRisposta) => {
    const domanda = getDomanda(idxDomanda);
    if ([5, 6].indexOf(domanda.tipo) > -1) return null;
    const risposta = getRispostaOfValues(idxDomanda, idxRisposta);
    return risposta && risposta.correlata ? risposta.correlata : null;
  };

  const getUserValCorrelata = (idxDomanda, idxRisposta) => {
    const valRisposta = getValueRiposta(idxDomanda, idxRisposta);
    return valRisposta && valRisposta.correlata ? valRisposta.val : null;
  };
  const getUserVal = (idxDomanda, idxRisposta) => {
    const valRisposta = getValueRiposta(idxDomanda, idxRisposta);
    return valRisposta && valRisposta.correlata ? valRisposta.val : valRisposta;
  };

  const isCorrelata = (idxDomanda, idxRisposta, val) => {
    const correlata = getCorrelata(idxDomanda, idxRisposta);
    if (!correlata) return false;
    debugger;
    const userVal = getUserVal(idxDomanda, idxRisposta);
    const valCur = val === undefined ? userVal : val;
    const valValuesTmp = getRispostaOfValues(idxDomanda, idxRisposta);
    const domanda = getDomanda(idxDomanda);
    const tipo = domanda && domanda.tipo;
    const valValues = tipo === 1 ? valValuesTmp.rating : valValuesTmp.val;
    return correlata && valCur === valValues;
  };

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
          _risposte[idxDomanda][0] = newValue;
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
    const valBefore = getUserVal(idxDomanda, idxRisposta);
    const isBool = [2, 3, 4].indexOf(tipo) > -1;
    const valBoolTmp = isBool ? !valBefore : valBefore;
    const correlata = getCorrelata(idxDomanda, idxRisposta);

    const valBool = correlata ? { val: valBoolTmp, correlata: {} } : valBoolTmp;
    const _risposte = [...risposte];
    const _rispostaOptionTmp = !risposte[idxDomanda][idxRisposta]
      ? resize([], idxRisposta + 1, null)
      : [...risposte[idxDomanda]];

    _rispostaOptionTmp[idxRisposta] = valBool;
    _risposte[idxDomanda] = _rispostaOptionTmp;

    return tipo === 2
      ? setRisposte(_risposte)
      : isBool && changeRisposte(idxDomanda, idxRisposta, valBool);
  };

  const radioTrueFalse = (val, onClickInner) => (
    <>
      {['Vero', 'Falso'].map((title, index) => (
        <CompTrueFalse
          key={index}
          value={
            val === null || val === undefined ? false : !index ? val : !val
          }
          title={title}
          color={!index ? 'primary' : 'secondary'}
          onClickOptions={onClickInner}
        />
      ))}
    </>
  );

  const renderTipoInner = (risposta, idxDomanda, idxRisposta, tipo) => {
    if (!risposta) return <span></span>;
    debugger;
    const val = getUserVal(idxDomanda, idxRisposta);
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
            {radioTrueFalse(val, onClickInner)}
          </RadioGroup>
        ) : tipo === 5 ? (
          <TextField value={val} onChange={onClickInner} />
        ) : (
          <span></span>
        )}
      </div>
    );
  };

  const renderRisposte = (tipo, idxDomanda) => (risposta, idxRisposta) =>
    risposta &&
    (tipo !== 1 ? risposta.risposta : idxRisposta === 0) && (
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
            {isCorrelata(idxDomanda, idxRisposta) &&
              renderDomanda(risposta.correlata, 0, '32px')}
          </GridChilds>
        ) : tipo === 1 ? (
          <>
            {renderScala(idxDomanda, risposta)}
            {isCorrelata(idxDomanda, idxRisposta) && (
              <ShowQuestion
                values={{ domande: [getCorrelata(idxDomanda, idxRisposta)] }}
              />
            )}
          </>
        ) : (
          <span></span>
        )}
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
              const valEvent = e.currentTarget.value;
              const correlata = getCorrelata(idxDomanda, 0);
              const val = correlata
                ? { val: valEvent, correlata: {} }
                : valEvent;
              _risposte[idxDomanda][0] = val;
              setRisposte(_risposte);
            }}
          />
        </GridChilds>
      </>
    );
  };

  const renderDomanda = (domanda, idx, margin) =>
    !getDomanda(idx) || !domanda || !domanda.tipo ? (
      <></>
    ) : domanda.tipo === 6 ? (
      <div
        key={idx}
        className={classes.cardDomanda}
        style={{
          marginLeft: margin || '0px',
          marginBotton: '22px',
          marginTop: '22px',
        }}
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
    <div style={{ marginTop: '16px', marginLeft: '8px', width: '80%' }}>
      <h2>{values.title}</h2>
      <GridChilds
        key="gridChildShowMain2"
        view={[12]}
        style={{ marginTop: '16px', width: '100%' }}
      >
        {values.domande.map(renderDomanda)}
      </GridChilds>

      <GridChilds
        key="gridChildShowMain2"
        view={[1, 4]}
        style={{ marginTop: '16px', width: '100%' }}
      >
        <p> </p>
        <Button
          color="primary"
          variant="contained"
          style={{ fontSize: '11px', width: '200px', maxHeight: '22px' }}
          onClick={e => {}}
        >
          Salva Questionario
        </Button>
      </GridChilds>
    </div>
  );
}
