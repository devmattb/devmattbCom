import React from 'react';
import { Router, Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

// Import Pages
import QAPage from '../../ui/pages/QAPage.jsx';

const browserHistory = createBrowserHistory();

/**
*  Set up all Routes:
**/
export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" component={QAPage}/>
    </Switch>
  </Router>
);

/*
<Route exact path="/case" component={Case}/>
<Route exact path="/videos" component={Videos}/>
<Route exact path="/questions" component={Questions}/>
<Route exact path="/admin/questions" component={QuestionsAdmin}/>
<Route exact path="/flow" component={Flow}/>
<Route component={NotFoundPage}/>
*/
