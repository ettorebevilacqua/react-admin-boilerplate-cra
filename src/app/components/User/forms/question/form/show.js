import React from 'react';

import { Paper, Box, Typography, Checkbox } from '@material-ui/core';

import Rating from '@material-ui/lab/Rating';
import { useLocation } from 'react-router-dom';
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

const toNumberOr = (val, orVal) => (!val ? orVal : isNaN(parseInt(val + '')) ? orVal : parseInt(val + ''));

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
    padding: '1px',
    paddingLeft: '8px',
    alignItems: 'center',
    display: 'flex',
    marginBottom: '0px',
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
  titleModulo: {
    fontSize: '18px',
    fontWeight: '600',
  },
}));

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function TextFieldBlur({ onChangeBlur, ...rest }) {
  const ref = React.useRef();
  // const [valBuffer, setValBuffer] =

  return (
    <TextField
      {...rest}
      onChange={e => console.log('onChange xxx ', e.target.value)}
      InputProps={{
        ref: ref,
        onBlur: onChangeBlur,
      }}
    />
  );
}

export function ShowQuestion(props) {
  const { values, guestValue, partecipante, onChange } = props;
  const classes = useStyles();

  const moduliValue = !values || !values.moduli || !values.moduli.map ? [] : values.moduli;
  const moduliRisposte = !!partecipante?.risposte
    ? partecipante?.risposte
    : moduliValue.map(modulo => makeRisposte(modulo.domande));

  /*   const moduliRisposte =  moduliRisposteGenerate.map(modulo => {
    const
  }); */
  const [risposte, setRisposte] = React.useState(moduliRisposte);

  const setterRisposte = val => {
    onChange && onChange(val);
    setRisposte(val);
  };

  const getValueRiposta = (idxModulo, idxDomanda, idxRisposta) => {
    return (
      risposte && risposte[idxModulo] && risposte[idxModulo][idxDomanda] && risposte[idxModulo][idxDomanda][idxRisposta]
    );
  };

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

  const getTipoDomanda = (idxModulo, idxDomanda) => {
    const domanda = getDomanda(idxModulo, idxDomanda);
    return !domanda ? 0 : toNumberOr(domanda.tipo, 0);
  };

  const getRispostaOfValues = (idxModulo, idxDomanda, idxRisposta) => {
    const domanda = getDomanda(idxModulo, idxDomanda);
    if (!domanda || !domanda.risposte) return null;
    if (domanda.tipo === 1) return domanda.rating;
    return !domanda.risposte[idxRisposta] || !domanda.risposte[idxRisposta]
      ? null
      : domanda.risposte[idxRisposta].val && domanda.risposte[idxRisposta].val.val
      ? domanda.risposte[idxRisposta].val.val
      : domanda.risposte[idxRisposta].val;
  };

  const getCorrelata = (idxModulo, idxDomanda, idxRisposta) => {
    const domanda = getDomanda(idxModulo, idxDomanda);
    const tipoNum = toNumberOr(domanda?.tipo, -1);
    if ([5, 6].indexOf(tipoNum) > -1) return null;
    if (!domanda || !domanda.risposte || !domanda.risposte[idxRisposta]) return null;
    const risposta = domanda.risposte[idxRisposta];
    return risposta && risposta.correlata ? risposta.correlata : null;
  };

  const getUserVal = (idxModulo, idxDomanda, idxRisposta, correlata) => {
    const valRisposta = getValueRiposta(idxModulo, idxDomanda, idxRisposta);
    return !valRisposta ? null : correlata ? valRisposta.correlata || null : valRisposta.val || null;
  };

  const isCorrelata = (idxModulo, idxDomanda, idxRisposta, val) => {
    const correlata = getCorrelata(idxModulo, idxDomanda, idxRisposta);
    if (!correlata) return false;
    const tipo = getTipoDomanda(idxModulo, idxDomanda);
    const rispostaUser = getValueRiposta(idxModulo, idxDomanda, idxRisposta);
    const valCur = rispostaUser && rispostaUser.val;
    if (!valCur && tipo !== 4) return false;
    const valValues = getRispostaOfValues(idxModulo, idxDomanda, idxRisposta);
    // const ratingVal = toNumberOr(domanda.rating, 0);
    return tipo === 1 ? valValues !== 0 && valCur <= valValues : valCur === valValues;
  };

  const changeRisposta = async (idxModulo, idxDomanda, idxRisposta, newValue, correlata) => {
    const _domandaRisposte = [...risposte[idxModulo][idxDomanda]];
    const _risposte = risposte.map(el => ({ ...el }));
    const _risposteResize =
      _domandaRisposte.length - 1 < idxRisposta
        ? resize([], idxRisposta + 1, null)
        : [...risposte[idxModulo][idxDomanda]];
    _risposte[idxModulo][idxDomanda] = _risposteResize;
    const oldValue = _risposte[idxModulo][idxDomanda][idxRisposta];
    _risposte[idxModulo][idxDomanda][idxRisposta] = correlata
      ? { ...oldValue, correlata: newValue }
      : { ...oldValue, val: newValue };
    setterRisposte(_risposte);
    await timeout(50);
  };

  const onApertaBlur = (idxModulo, idxDomanda, val, correlata) => {
    changeRisposta(idxModulo, idxDomanda, 0, val, correlata);
  };

  const renderScala = (idxModulo, idxDomanda, scalaVal) => (
    <Box style={{ textAlign: 'center', marginLeft: '16px', marginRight: '16px' }}>
      <span className={classes.domandaTxt}>{scalaVal && scalaVal.ratingStart}</span>

      <Rating
        style={{ marginLeft: '26px', marginRight: '26px' }}
        name="ratingRisposta"
        max={toNumberOr(scalaVal && scalaVal.ratingMax, 2)}
        value={toNumberOr(getUserVal(idxModulo, idxDomanda, 0), 0)}
        onChange={(event, newValue) => changeRisposta(idxModulo, idxDomanda, 0, newValue)}
      />
      <span className={classes.domandaTxt}>{scalaVal && scalaVal.ratingEnd}</span>
    </Box>
  );

  const onClickOptions = (tipo, idxModulo, idxDomanda, idxRisposta = 0) => () => {
    console.log('click risposta', idxDomanda, idxRisposta);
    const valBefore = getUserVal(idxModulo, idxDomanda, idxRisposta);
    const isBool = [2, 3, 4].indexOf(tipo) > -1;
    const valBool = isBool ? !valBefore : valBefore;
    //const correlata = getCorrelata(idxModulo, idxDomanda, idxRisposta);
    //const valBool = correlata ? { val: valBoolTmp, correlata: {} } : valBoolTmp;

    const _risposte = risposte.map(el => ({ ...el }));
    const _domandaRisposte = risposte && risposte[idxModulo] && risposte[idxModulo][idxDomanda];
    let _rispostaOptionTmp;
    if (tipo !== 2) {
      _rispostaOptionTmp =
        _domandaRisposte.length - 1 < idxRisposta
          ? resize([], idxRisposta + 1, null)
          : [...risposte[idxModulo][idxDomanda]];
    } else {
      _rispostaOptionTmp = !getValueRiposta(idxModulo, idxDomanda, idxRisposta)
        ? resize([], idxRisposta + 1, null)
        : [...risposte[idxModulo][idxDomanda]];
      _rispostaOptionTmp = _rispostaOptionTmp.map(el => null);
    }

    // changeRisposta(idxModulo, idxDomanda, idxRisposta, valBool);
    _rispostaOptionTmp[idxRisposta] = { val: valBool };
    _risposte[idxModulo][idxDomanda] = _rispostaOptionTmp;
    setterRisposte(_risposte);
    // return tipo === 2 ? setRisposte(_risposte) : isBool && changeRisposte(idxModulo, idxDomanda, idxRisposta, valBool);
  };

  const radioTrueFalse = (val, onClickInner) => (
    <>
      {['Vero', 'Falso'].map((title, index) => (
        <CompTrueFalse
          key={index}
          value={val === null || val === undefined ? (!index ? false : true) : !index ? val : !val}
          title={title}
          color={!index ? 'primary' : 'secondary'}
          onClickOptions={onClickInner}
        />
      ))}
    </>
  );

  const renderTipoInner = (risposta, idxModulo, idxDomanda, idxRisposta, tipo, correlata) => {
    if (!risposta) return <span></span>;
    const val = getUserVal(idxModulo, idxDomanda, idxRisposta);
    const onClickInner = onClickOptions(tipo, idxModulo, idxDomanda, idxRisposta);
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
          <TextFieldBlur
            style={{ width: '100%' }}
            label="Risposta"
            defaultValue={val}
            onChangeBlur={e => onApertaBlur(idxModulo, idxDomanda, e.target.value, correlata)}
            InputProps={{
              onBlur: e => {
                return onApertaBlur(idxModulo, idxDomanda, e.target.value, correlata);
              },
            }}
          />
        ) : (
          <span></span>
        )}
      </div>
    );
  };

  const checkRenderDomandaCorrelata = (risposta, idxModulo, idxDomanda, idxRisposta) => {
    const domandaHtml =
      isCorrelata(idxModulo, idxDomanda, idxRisposta) &&
      renderDomanda(null, idxModulo, true)(risposta.correlata, 0, '32px');
    return domandaHtml;
  };

  const renderRisposte = (idxModulo, domanda, tipo, idxDomanda, correlata) => (risposta, idxRisposta) =>
    risposta &&
    (tipo !== 1 ? risposta.risposta : idxRisposta === 0) && (
      <Box key={idxModulo + idxRisposta} className={classes.cardDomanda}>
        <GridChilds view={[1, 11]}>
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
                getValueRiposta(idxModulo, idxDomanda, idxRisposta, correlata),
              )}
              {checkRenderDomandaCorrelata(risposta, idxModulo, idxDomanda, idxRisposta)}
            </GridChilds>
          ) : tipo === 1 ? (
            <>
              {renderScala(idxModulo, idxDomanda, domanda, risposta)}
              {checkRenderDomandaCorrelata(risposta, idxModulo, idxDomanda, idxRisposta)}
            </>
          ) : (
            <span></span>
          )}
        </GridChilds>
      </Box>
    );

  const renderDomandaAperta = (domanda, idxModulo, idxDomanda, correlata) => {
    return (
      <>
        <GridChilds key={idxModulo + idxDomanda} view={[1, 10]}>
          <span> </span>
          <TextFieldBlur
            style={{ width: '100%' }}
            label="Risposta"
            defaultValue={
              !risposte[idxModulo][idxDomanda][0]
                ? ''
                : correlata
                ? risposte[idxModulo][idxDomanda][0].correlata || ''
                : risposte[idxModulo][idxDomanda][0].val || ''
            }
            onChangeBlur={e => onApertaBlur(idxModulo, idxDomanda, e.target.value, correlata)}
            InputProps={{
              onBlur: e => {
                return onApertaBlur(idxModulo, idxDomanda, e.target.value, correlata);
              },
            }}
          />
        </GridChilds>
      </>
    );
  };

  const renderDomanda = (modulo, idxModulo, correlata) => (domanda, idx, margin) => {
    console.log('domanda', domanda);
    if (!domanda || !domanda.tipo) return <span></span>;
    const tipo = toNumberOr(domanda.tipo, 0);
    return (
      <div key={idxModulo + idx}>
        {!getDomanda(idxModulo, idx) || !domanda || !domanda.tipo ? (
          <div key={idxModulo + idx}></div>
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
            <span style={{ fontSize: '24px', fontWeight: '600' }}> {domanda.domanda} </span>
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
              ? renderDomandaAperta(domanda, idxModulo, idx, correlata)
              : domanda.risposte &&
                domanda.risposte.map &&
                domanda.risposte.map(renderRisposte(idxModulo, domanda, toNumberOr(domanda.tipo, -1), idx, correlata))}
          </div>
        )}
      </div>
    );
  };

  const renderModulo = () => {
    return !values || !values.moduli ? (
      <></>
    ) : (
      values.moduli.map((modulo, idxModulo) => (
        <Box key={idxModulo}>
          <Box>
            <Typography variant={'h2'} className={classes.titleModulo} color="textSecondary">
              {modulo.title}
            </Typography>
            <hr />
          </Box>
          {modulo.domande.map(renderDomanda(modulo, idxModulo))}
        </Box>
      ))
    );
  };

  if (!values) return <h2>Attendere</h2>;

  return (
    <div style={{ marginTop: '16px', marginLeft: '8px', width: '80%' }}>
      <h1>{values.title}</h1>
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

export function ShowQuestionUrl(props) {
  const location = useLocation();
  const values = location.state && location.state.data;
  return <ShowQuestion values={values} onChange={props.onChange} />;
}
