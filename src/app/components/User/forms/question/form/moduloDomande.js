import React from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
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
import { moduloSlice, actions, getModulo, saveModulo, selector } from 'app/slice/modulo.slice';
import LoadingOverlay from 'app/components/Layout/LoadingOverlay';

const ticker = new AdjustingInterval(null, 100);
sessionStorage.removeItem('currentModuloId');
const toNumberOr = (val, orVal) => (isNaN(parseInt(val + '')) ? orVal : parseInt(val + ''));

function DomandeList({ domandeList, saveModulo }) {
  const dispatch = useDispatch();
  const modulo = useSelector(selector.selectModulo);
  const [domande, setDomande] = React.useState();
  const selectSaved = useSelector(selector.selectSaved);
  const [isSaving, setIsSaving] = React.useState(false);

  const getDomande = () => [...(domande ? domande : [])];

  React.useEffect(() => {
    // setDomande(getDomande());
  }, [modulo, selectSaved]);

  React.useEffect(() => {
    modulo && modulo.domande && !domande && setDomande(modulo.domande);
  }, [modulo]);

  const onChange = (id, index) => domanda => dispatch(actions.upDateDomanda({ domanda, id, index }));
  const onChangeRisposta = (domandaId, idxDomanda) => (rispostaId, idxRisposta, risposte) => {
    dispatch(actions.changeRisposta({ domandaId, idxDomanda, rispostaId, idxRisposta, risposte }));
  };
  const domandaSave = (id, index) => domanda => {
    dispatch(actions.upDateDomanda({ domanda, id, index }));
    // setIsSaving(true);
    setTimeout(() => saveModulo(), 40);
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
    setTimeout(() => saveModulo(), 40);
  };

  const domandaCommand = (domandaId, idxDomanda) => (op, val) => {
    return op === 'delete'
      ? deleteDomanda(domandaId, idxDomanda)
      : op === 'clone'
      ? dispatch(actions.cloneDomanda(val))
      : op === 'add'
      ? actions.addDomanda(newDomanda)
      : () => 1;
  };

  const renderDomande = () => {
    return modulo.domande.map((domanda, index) => (
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
    ));
  };

  if (isSaving || !domande) return <span> </span>;

  return <>{renderDomande()}</>;
}

export const DomandeC = () => {
  const classes = elemStyle();
  const history = useHistory();

  const initialValue = useSelector(selector.selectModulo);
  const dispatch = useDispatch();

  const [modulo, setModulo] = React.useState(initialValue);
  const [isSaving, setIsSaving] = React.useState(false);
  const [domande, setDomande] = React.useState(modulo && modulo.domande);
  const [currentId, setCurrentId] = React.useState(initialValue.id);
  const [title, setTitle] = React.useState(null);

  const onSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 3000);
    dispatch(saveModulo()).then(res => {
      console.log('gas saved', res);
      setIsSaving(false);
      if (res && res.payload) {
        const idnew = res.payload.id;
        setModulo(res.payload);
        setCurrentId(idnew);
        dispatch(actions.setModulo(res.payload));
        window.history.replaceState(null, null, `/app/user/moduli/${idnew}`);
      }
    });
  };

  React.useEffect(() => {
    if (initialValue) {
      setModulo(initialValue);
      setTitle(initialValue.title);
    }
    // console.log('xxxx', initialValue);
  }, [initialValue]);

  const changeTitle = _title => {
    if (modulo.title !== _title) {
      setModulo({ ...modulo, title: _title });
      dispatch(actions.setModulo({ title }));
    }
  };

  const handleTitle = React.useCallback(val => setTitle(val), [setTitle]);

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
        dispatch(actions.setModulo(valueT));
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
        {!modulo.id && (
          <Button
            variant="contained"
            color="primary"
            style={{ height: '42px', width: '180px' }}
            onClick={() => onSave()}
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
      {modulo.id ? (
        <>
          {!isSaving && (
            <DomandeList saveModulo={onSave} isSaving={isSaving} modulo={{ ...modulo }} domandeList={[...domande]} />
          )}
        </>
      ) : (
        modulo.title && <span>Salvare il documento prima di proseguire</span>
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
  const stateData = useSelector(selector.selectModulo);
  const isLoading = useSelector(selector.selectLoading);
  const error = useSelector(selector.selectError);
  const history = useHistory();

  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;
  const [modulo, setModulo] = React.useState(null);
  const location = useLocation();

  const upDateModulo = newModulo => {
    setModulo(newModulo);
    dispatch(actions.setModulo(newModulo));
  };

  React.useEffect(() => {
    toNumberOr(params.id, -1) === 0 ? upDateModulo(null) : dispatch(getModulo(params.id));
  }, [dispatch, params.id]);

  React.useEffect(() => {
    if (!isLoading && stateData && !modulo) {
      setModulo(stateData);
      dispatch(actions.setModulo(stateData));
    }
  }, [stateData, isLoading]);

  React.useEffect(() => {
    setMenuList([
      { link: '/app/user/moduli', label: 'Moduli' },
      // { link: '/app/user/questionModuli', label: 'Questionari', data },
      // { link: '/app/user/show/' + id, label: 'Anteprima', data: { moduli: [data], title: data.title } },
    ]);
  }, []);

  const rendereError = () => (
    <>
      <h2>Errrore nel Caricamento</h2>
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
        : modulo && <DomandeC initialValue={{ ...(modulo || empityModulo) }} />}
    </LoadingOverlay>
  );
};
