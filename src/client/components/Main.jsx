import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// local imports
import Entities from 'Entities';
import Entity from 'Entity';
import Footer from 'Footer';
import Header from 'Header';
import Item from 'Item';
import Items from 'Items';
import ItemCreated from 'ItemCreated';
import ItemNew from 'ItemNew';
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
          <Route path='/entities/:name/schema' component={Entity}/>
          <Route path='/entities/:name/created' component={ItemCreated}/>
          <Route path='/entities/:name/new' component={ItemNew}/>
          <Route path='/entities/:name/items/:id' component={Item}/>
          <Footer/>
        </div>
      </Router>
    );
  }
}
