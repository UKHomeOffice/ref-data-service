import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// local imports
import ChangeRequestSubmission from 'ChangeRequestSubmission';
import Entities from 'Entities';
import Entity from 'Entity';
import Footer from 'Footer';
import Header from 'Header';
import Item from 'Item';
import Items from 'Items';
import ItemDeleted from 'ItemDeleted';
import ItemFieldUpdate from 'ItemFieldUpdate';
import ItemNew from 'ItemNew';
import Search from 'Search';

export default class Main extends React.Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <a href="#main-content" className="govuk-skip-link">Skip to main content</a>
          <Header/>
          <Route exact path='/' component={Entities}/>
          <Route exact path='/change_request_submitted' component={ChangeRequestSubmission}/>
          <Route exact path='/entities/:name' component={Items}/>
          <Route exact path='/entities/:name/items/:id' component={Item}/>
          <Route exact path='/entities/:name/items/:id/edit/:field' component={ItemFieldUpdate}/>
          <Route exact path='/entities/:name/items/:id/delete' component={ItemDeleted}/>
          <Route exact path='/entities/:name/new' component={ItemNew}/>
          <Route exact path='/entities/:name/schema' component={Entity}/>
          <Route path='/search' component={Search}/>
          <Footer/>
        </React.Fragment>
      </Router>
    );
  }
}
