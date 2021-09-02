import React from 'react';

import { Paper, Box, Typography, Checkbox } from '@material-ui/core';

import Rating from '@material-ui/lab/Rating';

import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';

import RadioButtonChecked from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';

import { makeStyles } from '@material-ui/core/styles';

import GridChilds from '../../component/gridChilds';

import TextField from '@material-ui/core/TextField';
import { makeRisposte } from 'app/services/question/moduliModel';

function resize(arr, newSize, defaultValue) {
  return [...arr, ...Array(Math.max(newSize - arr.length, 0)).fill(defaultValue)];
}

const toNumberOr = (val, orVal) => (!val ? 2 : isNaN(parseInt(val + '')) ? orVal : parseInt(val + ''));

const CompTrueFalse = ({ value, title, compProps, color, onClickOptions, ...props }) => {
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
    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
  },
  main: () => ({
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

export function ShowQuestion(props) {
  const { values } = props;
  const classes = useStyles();
  const moduliRisposte =
    !values || !values.moduli || !values.moduli.map ? [] : values.moduli.map(modulo => makeRisposte(modulo.domande));

  const [risposte, setRisposte] = React.useState(moduliRisposte);

  const getValueRiposta = (idxModulo, idxDomanda, idxRisposta) =>
    risposte && risposte[idxModulo][idxDomanda] && risposte[idxModulo][idxDomanda][idxRisposta];

  const getDomanda = (idxModulo, idx) =>
    values &&
    values.moduli &&
    values.moduli[idxModulo] &&
    values.moduli[idxModulo].domande &&
    values.moduli[idxModulo].domande[idx] &&
    values.moduli[idxModulo].domande[idx].domanda.trim &&
    values.moduli[idxModulo].domande[idx].domanda.trim()
      ? values.moduli[idxModulo].domande[idx]
      : null;

  const getRispostaOfValues = (idxModulo, idxDomanda, idxRisposta) => {
    const domanda = getDomanda(idxModulo, idxDomanda);
    return !domanda || !domanda.risposte || !domanda.risposte[idxRisposta] ? null : domanda.risposte[idxRisposta];
  };

  const getCorrelata = (idxModulo, idxDomanda, idxRisposta) => {
    const domanda = getDomanda(idxModulo, idxDomanda);
    const tipoNum = toNumberOr(domanda.tipo, -1);
    if ([5, 6].indexOf(tipoNum) > -1) return null;
    const risposta = getRispostaOfValues(idxModulo, idxDomanda, idxRisposta);
    return risposta && risposta.correlata ? risposta.correlata : null;
  };

  /* const getUserValCorrelata = (idxModulo, idxDomanda, idxRisposta) => {
    const valRisposta = getValueRiposta(idxModulo, idxDomanda, idxRisposta);
    return valRisposta && valRisposta.correlata ? valRisposta.val : null;
  }; */

  const getUserVal = (idxModulo, idxDomanda, idxRisposta) => {
    const valRisposta = getValueRiposta(idxModulo, idxDomanda, idxRisposta);
    return valRisposta && valRisposta.correlata ? valRisposta.val : valRisposta;
  };

  const isCorrelata = (idxModulo, idxDomanda, idxRisposta, val) => {
    const correlata = getCorrelata(idxModulo, idxDomanda, idxRisposta);
    if (!correlata) return false;
    const userVal = getUserVal(idxModulo, idxDomanda, idxRisposta);
    const valCur = val === undefined ? userVal : val;
    const valValuesTmp = getRispostaOfValues(idxModulo, idxDomanda, idxRisposta);
    const domanda = getDomanda(idxModulo, idxDomanda);
    const tipo = toNumberOr(domanda && domanda.tipo, 0);
    const valValues = tipo === 1 ? toNumberOr(valValuesTmp.rating, 1) : toNumberOr(valValuesTmp.val, 1);
    return correlata && valCur === valValues;
  };

  /* const onChangeRating = (idxDomanda, idxRisposta) => e => {
    const val = e.target.value;
    const valRisp = risposte[idxDomanda];
    const _risposte = [...risposte];
    console.log('click risposta', idxDomanda, idxRisposta, valRisp);
  }; */

  const renderScala = (idxModulo, idxDomanda, scalaVal) => (
    <Box style={{ textAlign: 'center', marginLeft: '16px', marginRight: '16px' }}>
      <Typography variant={'span'} className={classes.domandaTxt}>
        {scalaVal && scalaVal.ratingStart}
      </Typography>

      <Rating
        style={{ marginLeft: '26px', marginRight: '26px' }}
        name="ratingRisposta"
        max={toNumberOr(scalaVal && scalaVal.ratingMax, 2)}
        value={toNumberOr(risposte[idxModulo][idxDomanda], 0)}
        onChange={(event, newValue) => {
          console.log('risposta rating ', scalaVal, newValue);
          const _risposte = [...risposte];
          _risposte[idxModulo][idxDomanda][0] = newValue;
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

  const onClickOptions = (tipo, idxModulo, idxDomanda, idxRisposta) => () => {
    console.log('click risposta', idxDomanda, idxRisposta);
    const valBefore = getUserVal(idxModulo, idxDomanda, idxRisposta);
    const isBool = [2, 3, 4].indexOf(tipo) > -1;
    const valBoolTmp = isBool ? !valBefore : valBefore;
    const correlata = getCorrelata(idxModulo, idxDomanda, idxRisposta);

    const valBool = correlata ? { val: valBoolTmp, correlata: {} } : valBoolTmp;
    const _risposte = [...risposte];
    const _rispostaOptionTmp = !risposte[idxModulo][idxDomanda][idxRisposta]
      ? resize([], idxRisposta + 1, null)
      : [...risposte[idxDomanda]];

    _rispostaOptionTmp[idxModulo][idxRisposta] = valBool;
    _risposte[idxModulo][idxDomanda] = _rispostaOptionTmp;

    return tipo === 2 ? setRisposte(_risposte) : isBool && changeRisposte(idxModulo, idxDomanda, idxRisposta, valBool);
  };

  const radioTrueFalse = (val, onClickInner) => (
    <>
      {['Vero', 'Falso'].map((title, index) => (
        <CompTrueFalse
          key={index}
          value={val === null || val === undefined ? false : !index ? val : !val}
          title={title}
          color={!index ? 'primary' : 'secondary'}
          onClickOptions={onClickInner}
        />
      ))}
    </>
  );

  const renderTipoInner = (risposta, idxModulo, idxDomanda, idxRisposta, tipo) => {
    if (!risposta) return <span></span>;
    const val = getUserVal(idxModulo, idxDomanda, idxRisposta);
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

  const renderRisposte = (idxModulo, tipo, idxDomanda) => (risposta, idxRisposta) =>
    risposta &&
    (tipo !== 1 ? risposta.risposta : idxRisposta === 0) && (
      <GridChilds
        key={idxModulo + idxRisposta}
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
              idxModulo,
              idxDomanda,
              idxRisposta,
              tipo,
              getValueRiposta(idxModulo, idxDomanda, idxRisposta),
            )}
            {isCorrelata(idxModulo, idxDomanda, idxRisposta) && renderDomanda(risposta.correlata, 0, '32px')}
          </GridChilds>
        ) : tipo === 1 ? (
          <>
            {renderScala(idxModulo, idxDomanda, risposta)}
            {isCorrelata(idxModulo, idxDomanda, idxRisposta) && (
              <ShowQuestion
                values={{
                  domande: [getCorrelata(idxModulo, idxDomanda, idxRisposta)],
                }}
              />
            )}
          </>
        ) : (
          <span></span>
        )}
      </GridChilds>
    );

  const renderDomandaAperta = (idxModulo, idxDomanda) => {
    const risposta = risposte[idxModulo][idxDomanda];
    return (
      <>
        <GridChilds key={idxModulo + idxDomanda} view={[1, 10]}>
          <span> </span>
          <TextField
            style={{ width: '100%' }}
            label="Risposta"
            value={risposte[idxDomanda][0] || ''}
            onChange={e => {
              const _risposte = [...risposte];
              const valEvent = e.currentTarget.value;
              const correlata = getCorrelata(idxDomanda, 0);
              const val = correlata ? { val: valEvent, correlata: {} } : valEvent;
              risposta[0] = val;
              setRisposte(_risposte);
            }}
          />
        </GridChilds>
      </>
    );
  };

  const renderDomanda = (modulo, idxModulo) => (domanda, idx, margin) => {
    console.log('domanda', domanda);
    const tipo = toNumberOr(domanda.tipo, 0);
    return !getDomanda(idxModulo, idx) || !domanda || !domanda.tipo ? (
      <></>
    ) : tipo === 6 ? (
      <div
        key={idxModulo + idx}
        className={classes.cardDomanda}
        style={{
          marginLeft: margin || '0px',
          marginBotton: '22px',
          marginTop: '22px',
        }}
      >
        <Typography variant={domanda.tipo === 6 ? 'h3' : 'span'} className={classes.domandaTxt} color="textSecondary">
          {domanda.domanda}
        </Typography>
      </div>
    ) : (
      <div key={idxModulo + idx}>
        <Paper style={{ marginTop: '26px', marginBottom: '12px' }}>
          <GridChilds className={classes.cardDomanda} view={[12]} style={{ height: '48px' }}>
            <Typography variant={tipo === 6 ? 'h3' : 'body1'} className={classes.domandaTxt} color="textSecondary">
              {domanda.domanda}
            </Typography>
          </GridChilds>
        </Paper>
        {domanda.tipo !== 6 && domanda.tipo === 5
          ? renderDomandaAperta(idxModulo, idx)
          : domanda.risposte &&
            domanda.risposte.map &&
            domanda.risposte.map(renderRisposte(idxModulo, toNumberOr(domanda.tipo, -1), idx))}
      </div>
    );
  };

  const renderModulo = () => {
    return !values || !values.moduli ? (
      <></>
    ) : (
      values.moduli.map((modulo, idxModulo) => {
        return modulo.domande.map(renderDomanda(modulo, idxModulo));
      })
    );
  };

  if (!values) return <h2>Attendere</h2>;

  return (
    <div style={{ marginTop: '16px', marginLeft: '8px', width: '80%' }}>
      <h2>{values.title}</h2>
      <GridChilds key="gridChildShowMain2" view={[12]} style={{ marginTop: '16px', width: '100%' }}>
        {renderModulo()}
      </GridChilds>

      <GridChilds key="gridChildShowMain3" view={[1, 4]} style={{ marginTop: '16px', width: '100%' }}>
        <p> </p>
        {/* <Button
          color="primary"
          variant="contained"
          style={{ fontSize: '11px', width: '200px', maxHeight: '22px' }}
          onClick={e => onSend && onSend(risposte)}
        >
          Salva Questionario
        </Button> */}
      </GridChilds>
    </div>
  );
}
