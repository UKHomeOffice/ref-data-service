import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// local imports
import DataEntities from 'DataEntities';
import Entities from 'Entities';
import EntityDetail from 'EntityDetail';
import Footer from 'Footer';
import Header from 'Header';
import Search from 'Search';

export default class Main extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <a href="#main-content" className="govuk-skip-link">Skip to main content</a>
          <Header/>
          <Route exact path='/' component={DataEntities}/>
          <Route path='/search' component={Search}/>
          <Route exact path='/entities/:name' component={Entities}/>
          <Route path='/entities/:name/items/:id' component={EntityDetail}/>
          <Footer/>
        </div>
      </Router>
    );
  }
}
