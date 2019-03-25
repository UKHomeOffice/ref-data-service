import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// local imports
import Entities from 'Entities';
import Footer from 'Footer';
import Header from 'Header';
import Item from 'Item';
import Items from 'Items';
import Search from 'Search';

export default class Main extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <a href="#main-content" className="govuk-skip-link">Skip to main content</a>
          <Header/>
          <Route exact path='/' component={Entities}/>
          <Route path='/search' component={Search}/>
          <Route exact path='/entities/:name' component={Items}/>
          <Route path='/entities/:name/items/:id' component={Item}/>
          <Footer/>
        </div>
      </Router>
    );
  }
}
