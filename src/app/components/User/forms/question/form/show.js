import React from 'react';

import { Paper, Box, Typography, Checkbox } from '@material-ui/core';

import Rating from '@material-ui/lab/Rating';
import { useLocation, useParams } from 'react-router-dom';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';

import RadioButtonChecked from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';

import useStyles from './showStyle';

import GridChilds from '../../component/gridChilds';

import TextField from '@material-ui/core/TextField';
import { makeRisposte } from 'app/services/question/moduliModel';
import { questionFullSlice } from 'app/slice';
import LoadSliceData from 'app/components/loader';
import ModelQuestion from 'app/services/question/questionModel';

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
  const { values: valIn, partecipante, onChange, data } = props;
  const values = valIn || data ? data.idquestion : null;

  const classes = useStyles();

  const moduliValue = !values || !values.moduli || !values.moduli.map ? [] : values.moduli;
  const moduliRisposte = !!partecipante?.risposte
    ? partecipante?.risposte
    : moduliValue.map(modulo => makeRisposte(modulo.domande));
  /*   const moduliRisposte =  moduliRisposteGenerate.map(modulo => {
    const
  }); */
  const [risposte, setRisposte] = React.useState([]);

  const setterRisposte = val => {
    onChange && onChange(val);
    setRisposte(val);
  };

  const upDateAr = (ar, idx, val) => {
    const newIdx = idx < 0 ? ar.push(val) - 1 : idx;
    ar[newIdx] = val;
    return ar;
  };

  const pushOrUpdate = (ar, finder, val) => {
    const idxFound = ar.findIndex(finder);
    return upDateAr(ar, idxFound, val);
  };

  const finderRisposta = (idmodulo, iddomanda, iddocente, idxRisposta) => risp =>
    risp.idmodulo === idmodulo &&
    iddomanda === risp.iddomanda &&
    idxRisposta === risp.idxRisposta &&
    (iddocente ? risp.iddocente === iddocente : true);

  const finderDomanda = (idmodulo, iddomanda, iddocente) => risp =>
    risp.idmodulo === idmodulo && iddomanda === risp.iddomanda && (iddocente ? risp.iddocente === iddocente : true);

  const findRisposta = (idmodulo, iddomanda, iddocente, idxRisposta) => {
    const idx = risposte.findIndex(finderRisposta(idmodulo, iddomanda, iddocente, idxRisposta));
    return idx < 0 ? [-1, null] : [idx, risposte[idx]];
  };

  const findDomanda = (idmodulo, iddomanda, iddocente) => risposte.find(finderDomanda(idmodulo, iddomanda, iddocente));

  const removeRisposteDomanda = (idmodulo, iddomanda, iddocente) =>
    risposte.filter(risp => !finderDomanda(idmodulo, iddomanda, iddocente)(risp));

  const addRisposta = (idmodulo, iddomanda, idxRisposta, iddocente, risposta, reset) => {
    const tmpRisposte = reset ? removeRisposteDomanda(idmodulo, iddomanda, iddocente) : [...risposte];
    const rispostaObj = { idmodulo, iddomanda, iddocente, idxRisposta, risposta };
    const newIdxRisposta = tmpRisposte.findIndex(finderRisposta(idmodulo, iddomanda, iddocente, idxRisposta));
    const risposteNew = upDateAr(tmpRisposte, newIdxRisposta, rispostaObj);

    console.log('risposte xxx', risposteNew);
    onChange && onChange(risposteNew);
    setRisposte(risposteNew);
  };

  const getIdsDomanda = (idxModulo, idxDomanda) => {
    const modulo = values.moduli && values.moduli[idxModulo];
    if (!modulo) return null;
    return modulo.domande && modulo.domande[idxDomanda] ? [modulo.id, modulo.domande[idxDomanda]._id] : [modulo.id, -1];
  };

  const getValueRiposta = (idxmodulo, idxdomanda, iddocente, idxRisposta) => {
    const [idmodulo, iddomanda] = getIdsDomanda(idxmodulo, idxdomanda) || [];
    if (!idmodulo || !iddomanda) return null;
    const risp = findRisposta(idmodulo, iddomanda, iddocente, idxRisposta);
    return risp[1];
    // risposte && risposte[idxModulo] && risposte[idxModulo][idxDomanda] && risposte[idxModulo][idxDomanda][idxRisposta]
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
    debugger;
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

  const getUserVal = (idxModulo, idxDomanda, idxRisposta, correlata, docente) => {
    const valRisposta = getValueRiposta(idxModulo, idxDomanda, idxRisposta, docente);
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

  const changeRisposta = async (idxModulo, idxDomanda, idxRisposta, newValue, correlata, docente) => {
    const [idmodulo, iddomanda] = getIdsDomanda(idxModulo, idxDomanda) || [];
    if (!idmodulo || !iddomanda) return false;
    addRisposta(idmodulo, iddomanda, idxRisposta);
    await timeout(50);
    return false;
    /*
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
    */
  };

  const onApertaBlur = (idxModulo, idxDomanda, val, correlata) => {
    changeRisposta(idxModulo, idxDomanda, 0, val, correlata);
  };

  const renderScala = (idxModulo, idxDomanda, scalaVal, risposta, docente) => (
    <Box style={{ textAlign: 'center', marginLeft: '16px', marginRight: '16px' }}>
      <span className={classes.domandaTxt}>{scalaVal && scalaVal.ratingStart}</span>

      <Rating
        style={{ marginLeft: '26px', marginRight: '26px' }}
        name="ratingRisposta"
        max={toNumberOr(scalaVal && scalaVal.ratingMax, 2)}
        value={toNumberOr(getUserVal(idxModulo, idxDomanda, 0), 0)}
        onChange={(event, newValue) => changeRisposta(idxModulo, idxDomanda, 0, newValue, false, docente)}
      />
      <span className={classes.domandaTxt}>{scalaVal && scalaVal.ratingEnd}</span>
    </Box>
  );

  const onClickOptions = (tipo, idxModulo, idxDomanda, idxRisposta = 0, docente) => () => {
    console.log('click risposta', idxDomanda, idxRisposta);
    const valBefore = getUserVal(idxModulo, idxDomanda, idxRisposta);
    const isBool = [2, 3, 4].indexOf(tipo) > -1;
    const valBool = isBool ? !valBefore : valBefore;
    //const correlata = getCorrelata(idxModulo, idxDomanda, idxRisposta);
    //const valBool = correlata ? { val: valBoolTmp, correlata: {} } : valBoolTmp;

    const _risposte = risposte.map(el => ({ ...el }));
    const _domandaRisposte = risposte && risposte[idxModulo] && risposte[idxModulo][idxDomanda];
    /* let _rispostaOptionTmp;
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
   */
    // changeRisposta(idxModulo, idxDomanda, idxRisposta, valBool);
    // _rispostaOptionTmp[idxRisposta] = { val: valBool };
    // _risposte[idxModulo][idxDomanda] = _rispostaOptionTmp;
    const [idmodulo, iddomanda] = getIdsDomanda(idxModulo, idxDomanda) || [];

    addRisposta(idmodulo, iddomanda, idxRisposta, docente && docente.id, { val: valBool }, tipo === 2);
    //setterRisposte(_risposte);
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

  const renderTipoInner = (risposta, idxModulo, idxDomanda, idxRisposta, tipo, correlata, docente) => {
    if (!risposta) return <span></span>;
    const val = getUserVal(idxModulo, idxDomanda, idxRisposta);
    const onClickInner = onClickOptions(tipo, idxModulo, idxDomanda, idxRisposta, docente);
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

  const renderRisposte = (idxModulo, domanda, tipo, idxDomanda, correlata, docente) => (risposta, idxRisposta) =>
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
                getValueRiposta(idxModulo, idxDomanda, idxRisposta, correlata, docente),
                docente,
              )}
              {checkRenderDomandaCorrelata(risposta, idxModulo, idxDomanda, idxRisposta, docente)}
            </GridChilds>
          ) : tipo === 1 ? (
            <>
              {renderScala(idxModulo, idxDomanda, domanda, risposta, docente)}
              {checkRenderDomandaCorrelata(risposta, idxModulo, idxDomanda, idxRisposta, docente)}
            </>
          ) : (
            <span></span>
          )}
        </GridChilds>
      </Box>
    );

  const renderDomandaAperta = (domanda, idxModulo, idxDomanda, correlata, docente) => {
    const valRisposta = getValueRiposta(idxModulo, idxDomanda, docente && docente.id, 0);
    return (
      <>
        <GridChilds key={idxModulo + idxDomanda} view={[1, 10]}>
          <span> </span>
          <TextFieldBlur
            style={{ width: '100%' }}
            label="Risposta"
            defaultValue={!valRisposta ? '' : correlata ? valRisposta.correlata || '' : valRisposta.val || ''}
            onChangeBlur={e => onApertaBlur(idxModulo, idxDomanda, e.target.value, correlata, docente)}
            InputProps={{
              onBlur: e => {
                return onApertaBlur(idxModulo, idxDomanda, e.target.value, correlata, docente);
              },
            }}
          />
        </GridChilds>
      </>
    );
  };

  const renderDomanda = (modulo, idxModulo, correlata) => (domanda, idx, margin) => {
    console.log('domanda', domanda);
    if (!domanda || !getDomanda(idxModulo, idx) || !domanda.tipo) return <span></span>;

    const tipo = toNumberOr(domanda.tipo, 0);
    const domandeDocenti = modulo.isDocente
      ? data.docenti.map(doc => ({
          id: doc.id,
          nome: (doc.cognome || '') + ' ' + (doc.nome || ''),
        }))
      : [{}];

    return domandeDocenti.map((docente, idxDomanda) => (
      <div key={idxModulo + idx + (docente.id || 0)}>
        {docente ? (
          <div>
            <h3>{docente.nome}</h3>
          </div>
        ) : (
          <span></span>
        )}
        {tipo === 6 ? (
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
              ? renderDomandaAperta(domanda, idxModulo, idx, correlata, docente)
              : domanda.risposte &&
                domanda.risposte.map &&
                domanda.risposte.map(
                  renderRisposte(idxModulo, domanda, toNumberOr(domanda.tipo, -1), idx, correlata, docente),
                )}
          </div>
        )}
      </div>
    ));
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

export function saveData(value) {
  const idEnte = value.id;
  questionFullSlice.actions.save(value).then(res => {
    if (!res || !res.payload) return false;
    const savedData = { ...res.payload };
    // if (!data.id) { }
    // !idEnte && setIsMailSent(true);
    // setEditValue(savedData);
  });
}

export function ShowQuestionUrl(props) {
  const location = useLocation();
  const values = location.state && location.state.data;
  return <ShowQuestion values={values} onChange={saveData} />;
}

export function ShowQuestionById(props) {
  const params = useParams();
  const paramId = params?.idQuestion || '0';
  return (
    <LoadSliceData slice={questionFullSlice} onChange={saveData} actionPayload={paramId} Component={ShowQuestion} />
  );
}

/*   constexport function ShowQuestionById(props) {
  const params = useParams();
  const questionSelector = useSelector(questionFullSlice.selects.dataSelector);
  const [question, setQuestion] = useState();


  useEffect(() => {
    if (!paramId) return false;
    questionFullSlice.actions.get(paramId, true);
  }, []);

  useEffect(() => {
    !!questionSelector && questionSelector.id && setQuestion(questionSelector);
  }, [questionSelector]);

  const rendereError = () => (
    <div style={{ margin: 'auto', width: '85%' }}>
      <h2>Errore nel Caricamento</h2>
      <p> {errorMessage}</p>
      <div>
        <Button color="primary" variant="contained" fullWidth onClick={() => history.push('/app/user')}>
          Torna Indietro
        </Button>
      </div>
    </div>
  );

  return <ShowQuestion values={question} onChange={props.onChange} />;
}
*/
