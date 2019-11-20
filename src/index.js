import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Show from './components/Show';
import EditStatus from './components/EditStatus';
import App from './App';

ReactDOM.render(
    <Router>
      <div>
        <Route exact path='/' component={App} />
        <Route path='/show/:id' component={Show}/>
        <Route path='/editstatus/:id' component={EditStatus} />
      </div>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();