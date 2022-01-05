// DEBUG: User Router

/**
 * react route for state and history management : https://blog.logrocket.com/react-router-with-redux-navigation-state/
 *
 *
 *
 */

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; // Import UI Generator

// import configureStore, { history } from './store/configureStore';

// import restProvider from 'ra-data-simple-rest';

import MenuCard from './menuCard';
import Plane from './section/plane';
import IndaginiMenu from './section/indagini/menuIndagini';

import {
  ModuliForm,
  QuestionToForm,
  GuestQuestionForm,
  ModuloDomandeForm,
  CorsiList,
  CorsiDataForm,
  PersonaleList,
  DocentiActivity,
} from './forms/';

import report from './report';
import verifiche from './verifiche';

import { ShowQuestionUrl } from 'app/components/User/forms/question/form/show';
import { IndaginiList, QuestionList, QuestionModuliForm } from './forms/question';
import { EnteForm } from 'app/components/User/section/plane/ente';

const Soddisfazione = report.Soddisfazione;
const GraphQuestion = report.GraphQuestion;
const QuestionResponce = report.QuestionResponce;
const StatoIndagine = report.StatoIndagine;
const RelazioneIndagine = report.RelazioneIndagine;
const GrezziIndagine = report.GrezziIndagine;

const ModuliVerifiche = verifiche.ModuliVerifiche;

const buttonData = [
  { name: 'Verifica degli apprendiimenti', link: '/app/user/indagini' },
  { name: 'Customer satisfaction', link: '/app/user/indaginiMenu' },
  {
    name: 'gestione docenti e professionisti',
    link: '/#/risorse',
    hardLink: true,
  },
  { name: 'Servizio 4' /*, link: ''*/ },
];

const helmetRender = () => (
  <Helmet titleTemplate="%s - Smart" defaultTitle="Smart">
    <meta name="description" content="Smart service" />
  </Helmet>
);

export const GuestRoute = () => (
  <>
    {helmetRender()}

    <Switch>
      <Route path="/guest/compile/:token" component={GuestQuestionForm} />
    </Switch>
  </>
);

export default function UserComp() {
  return (
    <div style={{ marginTop: '80px', height: '100%' }}>
      {helmetRender()} {/* place ConnectedRouter under Provider */}
      <Switch>
        <Route exact path="/app/user/" component={() => <IndaginiMenu />} />
        <Route exact path="/app/user/ente" component={() => <EnteForm />} />
        <Route exact path="/app/user/indagini" component={() => <IndaginiList />} />
        <Route exact path="/app/user/questionModuli" component={() => <QuestionModuliForm />} />
        <Route exact path="/app/user/indaginiMenu" component={() => <IndaginiMenu />} />
        <Route exact path="/app/user/moduli/:id" component={() => <ModuloDomandeForm />} />
        <Route exact path="/app/user/moduli" component={() => <ModuliForm />} />
        <Route exact path="/app/user/indagini_question/:id" component={() => <IndaginiMenu />} />
        <Route exact path="/app/user/indagini_invio/:idquestion/" component={QuestionToForm} />
        <Route exact path="/app/user/indagini_edit/:id" component={QuestionToForm} />
        <Route exact path="/app/user/indagini/list/:state" component={QuestionList} />
        <Route exact path="/app/user/indagini/graph/:id" component={GraphQuestion} />
        <Route exact path="/app/user/indagini/stato/:id" component={() => StatoIndagine} />
        <Route exact path="/app/user/indagini/grezzi/:id" component={() => GrezziIndagine} />
        <Route exact path="/app/user/indagini/relazione/:id" component={() => RelazioneIndagine} />
        <Route exact path="/app/user/indagini/responce/:id" component={QuestionResponce} />
        <Route exact path="/app/user/indagine" component={() => <IndaginiMenu />} />
        <Route exact path="/app/user/show" component={() => <ShowQuestionUrl />} />
        <Route exact path="/app/user/corsi" component={CorsiList} />
        <Route exact path="/app/user/docentiActivity" component={DocentiActivity} />
        <Route exact path="/app/user/personale" component={PersonaleList} />
        <Route exact path="/app/user/corsi/:id" component={() => <CorsiDataForm />} />
        <Route exact path="/app/user/verify" component={() => <MenuCard items={buttonData} />} />
        {/*<Route exact path="/app/user/partecipanti/rowverify" component={() => <ListPartecipanti />} /> */}
        <Route exact path="/app/user/plane" component={() => <Plane />} />
        <Route exact path="/app/user/indagini/report/:id" component={() => <Soddisfazione />} />
        <Route exact path="/app/user/verifiche/moduli" component={ModuliForm} />
        <Route exact path="/app/user/verifiche/questionModuli" component={QuestionModuliForm} />
        <Route exact path="/app/user/verifiche/indagini_invio" component={QuestionToForm} />
        <Redirect from="/app/user" to="/app/user" exact />
      </Switch>
      {/* data.content && <ContentEx /> */}
    </div>
  );
}
