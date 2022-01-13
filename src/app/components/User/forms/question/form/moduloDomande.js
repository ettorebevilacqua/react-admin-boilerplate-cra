import React from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import GridChilds from '../../component/gridChilds';
// import TagsInput from '../comp/tagInput';
// import { ToFieldArray } from '../../lib/formikWithField';

import TextField from '@material-ui/core/TextField';

import { setMenuList } from 'app/slice/layoutSlice';

import { empityModulo, newDomanda } from 'app/services/question/moduliModel';
import { DomandaForm } from './domanda';
import { AdjustingInterval } from 'app/services/helper';
import { elemStyle } from '../../stylesElement';

import { useInjectReducer } from 'utils/redux-injectors';
import { moduloSlice, actions, getModulo, saveModulo, selector } from 'app/slice/modulo.slice'; // getModulo
import LoadingOverlay from 'app/components/Layout/LoadingOverlay';

const ticker = new AdjustingInterval(null, 100);
sessionStorage.removeItem('currentModuloId');
const toNumberOr = (val, orVal) => (isNaN(parseInt(val + '')) ? orVal : parseInt(val + ''));

function DomandeList({ isDomandeHide, onSave, saveModulo }) {
  const dispatch = useDispatch();
  const modulo = useSelector(selector.selectModulo);
  const [domande, setDomande] = React.useState();
  const selectSaved = useSelector(selector.selectSaved);

  const getDomande = () => [...(domande ? domande : [])];

  React.useEffect(() => {
    // setDomande(getDomande());
  }, [modulo, selectSaved]);

  React.useEffect(() => {
    modulo && modulo.domande && !domande && setDomande(modulo.domande);
  }, [modulo]);

  const onChange = (id, index) => domanda => {
    dispatch(actions.upDateDomanda({ domanda, id, index }));
  };
  const onChangeRisposta = (domandaId, idxDomanda) => (rispostaId, idxRisposta, risposte) => {
    dispatch(actions.changeRisposta({ domandaId, idxDomanda, rispostaId, idxRisposta, risposte }));
  };
  const domandaSave = (id, index) => domanda => {
    onSave(id, index, domanda);
    // dispatch(actions.upDateDomanda({ domanda, id, index }));
    // setIsSaving(true);
    // setTimeout(() => onSave(id, index, domanda), 40);
    // setTimeout(() => setIsSaving(false), 100);

    // dispatch(saveModulo());
    /*
    setTimeout(() => {
      dispatch(saveModulo()).then(res => {
        console.log('gas saved', res);

        if (res && res.payload) {
          setDomande([...res.payload.domande]);
        }
        setTimeout(() => setIsSaving(false), 40);
      });
    }, 30); */
  };

  const onChangeCorrelata = (domandaId, idxDomanda) => (rispostaId, idxRisposta, val) => {
    dispatch(actions.changeCorrelata({ domandaId, idxDomanda, rispostaId, idxRisposta, val }));
    // setTimeout(() => forceUpdate(), 50);
  };

  const deleteDomanda = (domandaId, idxDomanda) => {
    dispatch(actions.deleteDomanda({ domandaId, idxDomanda }));
    setTimeout(() => onSave(), 40);
  };

  const clonaDomanda = (domandaId, idxDomanda) => {
    dispatch(actions.clonaDomanda({ domandaId, idxDomanda }));
    setTimeout(() => onSave(), 40);
  };

  const domandaCommand = (domandaId, idxDomanda) => (op, val) => {
    return op === 'delete'
      ? deleteDomanda(domandaId, idxDomanda)
      : op === 'clone'
      ? clonaDomanda(domandaId, idxDomanda)
      : op === 'add'
      ? actions.addDomanda(newDomanda)
      : () => 1;
  };

  const onchange = (iddomanda, idx) => {
    console.log('domanda on change');
  };

  const renderDomande = () => {
    return modulo.domande.map(
      (domanda, index) =>
        !(isDomandeHide && (isDomandeHide.id === domanda._id || isDomandeHide.index === index)) && (
          <DomandaForm
            key={domanda._id || index}
            idDomanda={domanda._id}
            indexDomanda={index}
            onChange={onChange(domanda._id, index)}
            onChangeRisposta={onChangeRisposta(domanda._id, index)}
            domandaCommand={domandaCommand(domanda._id, index)}
            kkinitialValues={domanda}
            isCorrelata={false}
            onChangeCorrelata={onChangeCorrelata(domanda._id, index)}
            domandaSave={domandaSave(domanda._id, index)}
          />
        ),
    );
  };

  // if (isSaving || !domande) return <span> </span>;

  return <>{renderDomande()}</>;
}

export const DomandeC = ({ onSave, idModulo, isDomandeHide, isSaving, initialValue }) => {
  const classes = elemStyle();
  const history = useHistory();

  // const initialValue = useSelector(selector.selectModulo);
  const dispatch = useDispatch();

  const [modulo, setModulo] = React.useState(initialValue);
  // const [isSaving, setIsSaving] = React.useState(false);

  const [domande, setDomande] = React.useState(modulo && modulo.domande);
  const [title, setTitle] = React.useState(null);
  const [isDocente, setIsDocente] = React.useState(null);
  const [showBtSalva, setShowBtSalva] = React.useState(initialValue.isDocente !== modulo.isDocente);

  const onSaveDomanda = (id, index, domanda) => {
    // dispatch(actions.upDateDomanda({ domanda, id, index }));
    setTimeout(() => onSave(id, index, domanda), 40);
  };

  React.useEffect(() => {
    if (initialValue) {
      setModulo(initialValue);
      setTitle(initialValue.title);
      setIsDocente(initialValue.isDocente);
    }
    // console.log('xxxx', initialValue);
  }, []);

  const changeTitle = _title => {
    setShowBtSalva(modulo.title !== _title);
    if (modulo.title !== _title) {
      setModulo({ ...modulo, title: _title });
      dispatch(actions.setModulo({ title }));
      onSave().then(res => setShowBtSalva(false));
    }
  };

  const handleTitle = React.useCallback(
    val => {
      setTitle(val);
      setShowBtSalva(modulo.title !== val);
    },
    [setTitle],
  );

  const handleDocenteSwitch = e => {
    const val = !isDocente;
    setModulo({ ...modulo, isDocente: val });
    console.log('isdocente', isDocente);
    setIsDocente(val);
    dispatch(actions.setModulo({ isDocente: val }));
    setShowBtSalva(false);
    onSave().then(res => setShowBtSalva(false));
  };

  const renderBtDomanda = formikProps => (
    <Button
      variant="contained"
      color="primary"
      style={{ height: '42px', width: '120px' }}
      onClick={() => {
        const _value = { ...modulo };
        const _domande = domande.map(dom => dom);
        const domandeNew = [..._domande, newDomanda];
        const valueT = { ..._value, domande: domandeNew };
        setModulo(valueT);
        setDomande(domandeNew);
        const tmp = dispatch(actions.addDomanda());
        setTimeout(() => onSave(), 40);
        console.log('xxxx', tmp);
      }}
    >
      <span style={{ fontSize: '11px' }}>Nuova Domanda</span>
    </Button>
  );

  return (
    <div className={classes.root}>
      <GridChilds view={[9, 3]} spacing={3} style={{ marginTop: '16px', width: '100%' }}>
        <TextField
          fullWidth
          name="title"
          value={title}
          label="Start descrizione"
          onChange={e => handleTitle(e.target.value)}
          onBlur={e => changeTitle(title)}
        />
        <FormControlLabel
          control={<Switch checked={isDocente} onClick={handleDocenteSwitch} />}
          label="Docente"
          labelPlacement="start"
        />

        {showBtSalva && (
          <Button
            variant="contained"
            color="primary"
            style={{ height: '42px', width: '180px' }}
            onClick={() => {
              console.log('modulo on savebt ', modulo);
              setTimeout(() => onSave().then(res => setShowBtSalva(false)), 30);
            }}
          >
            Salva
          </Button>
        )}

        {/*
            <TagsInput
              selectedTags={handleSelecetedTags}
              fullWidth
              variant="outlined"
              id="tags"
              name="tags"
              placeholder="add Tags"
              label="tags"
            />
          */}
        {modulo.title && renderBtDomanda()}
      </GridChilds>
      {modulo && modulo.id ? (
        <DomandeList onSave={onSaveDomanda} isSaving={isSaving} modulo={{ ...modulo }} isDomandeHide={isDomandeHide} />
      ) : (
        <span>Salvare il documento prima di proseguire</span>
      )}
      <div
        style={{
          marginTop: '16px',
          marginLeft: '36px',
          marginRight: '36px',
        }}
      >
        <span> </span>
      </div>
      {modulo.id && renderBtDomanda()}
      {1 === 0 && (
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      )}
      <Divider style={{ marginTop: '22px' }} />
    </div>
  );
};

export const Domande = () => {
  useInjectReducer({
    key: moduloSlice.name,
    reducer: moduloSlice.reducer,
  });
  console.log('xxxxxx', selector, moduloSlice);
  //const moduloSelector = useSelector(selector);
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const location = useLocation();
  const id = params.id;

  const stateDataSelector = useSelector(selector.selectModulo);
  const isLoading = useSelector(selector.selectLoading);
  const error = useSelector(selector.selectError);

  const stateData = toNumberOr(params.id, -1) === 0 ? empityModulo : stateDataSelector;

  const [modulo, setModulo] = React.useState(stateDataSelector || empityModulo);
  const [isSaving, setIsSaving] = React.useState(false);
  const [isDomandeHide, setIsDomandeHide] = React.useState(false);
  const [idModulo, setIdmodulo] = React.useState(null);
  const [hideChild, setHideChild] = React.useState(null);

  React.useEffect(() => {
    setHideChild(true);
    if (!!stateDataSelector && stateDataSelector.id) {
      setModulo(stateDataSelector);
      setIdmodulo(stateDataSelector.id);
      setTimeout(() => setHideChild(false), 30);
    } else {
      setModulo(stateDataSelector);
      setTimeout(() => setHideChild(false), 30);
    }
    console.log('moduloSlice xxxx idselector ', stateDataSelector);
  }, [stateDataSelector]);

  React.useEffect(() => {
    console.log('moduloSlice xxxx ', params.id);
    dispatch(moduloSlice.actions.clearState());
    dispatch(actions.setModulo(empityModulo));
    debugger;
    setMenuList([
      { link: '/app/user/moduli', label: 'Moduli' },
      // { link: '/app/user/questionModuli', label: 'Questionari', data },
      // { link: '/app/user/show/' + id, label: 'Anteprima', data: { moduli: [data], title: data.title } },
    ]);

    if (toNumberOr(params.id, -1) === 0) {
      setModulo(stateDataSelector || empityModulo);
    } else if (params && params.id) {
      dispatch(moduloSlice.actions.clearState());
      dispatch(getModulo(params.id || '0', true));
    } else {
      setModulo(stateDataSelector || empityModulo);
    }
  }, []);

  const upDateModulo = newModulo => {
    setModulo(newModulo);
    newModulo && setIdmodulo(newModulo.id);
    setModulo(newModulo);
    newModulo ? dispatch(actions.setModulo(newModulo)) : !newModulo && dispatch(actions.clearState());
  };

  const onSave = (id, index, domanda) => {
    if (isSaving) return false;
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 3000);
    setTimeout(() => setHideChild(false), 3000);
    !idModulo && setHideChild(true);
    return dispatch(saveModulo()).then(res => {
      console.log('gas saved', res);
      setHideChild(false);
      setIsSaving(false);
      if (res && res.payload) {
        const idnew = res.payload.id;
        setModulo(res.payload);
        console.log('moduloSlice res.payload.id ', res.payload.id);

        // res.payload.domande && setDomande(res.payload.domande);
        dispatch(actions.setModulo({ ...res.payload }));
        window.history.replaceState(null, null, `/app/user/moduli/${idnew}`);
        setIsDomandeHide({ id, index });
        setHideChild(false);
        setTimeout(() => {
          setIsDomandeHide(false);
          setModulo(res.payload);
          idnew && idModulo !== idnew && setIdmodulo(id);
        }, 30);
      }
    });
  };

  const rendereError = () => (
    <>
      <h2>Errore nel Caricamento</h2>
      <p> {error}</p>
      <div>
        <Button color="primary" variant="contained" fullWidth onClick={() => history.push('/app/user')}>
          Torna Indietro
        </Button>
      </div>
    </>
  );

  return (
    <LoadingOverlay active={isLoading || !modulo} spinner text="Loading...">
      {!isLoading && !modulo
        ? error && rendereError()
        : !hideChild &&
          modulo && (
            <DomandeC
              idModulo={idModulo}
              onSave={onSave}
              isDomandeHide={isDomandeHide}
              isSaving={isSaving}
              initialValue={{ ...(modulo || empityModulo) }}
            />
          )}
    </LoadingOverlay>
  );
};
