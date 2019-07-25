import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// local imports
import ChangeRequestSubmission from './ChangeRequestSubmission';
import Entities from './Entities';
import EntityDelete from './EntityDelete';
import EntityFieldUpdate from './EntityFieldUpdate';
import EntityItem from './EntityItem';
import EntityItemCreate from './EntityItemCreate';
import EntityItemDelete from './EntityItemDelete';
import EntityItemFieldUpdate from './EntityItemFieldUpdate';
import EntityItems from './EntityItems';
import Footer from './Footer';
import Header from './Header';
import RequestSubmittedDelete from './RequestSubmittedDelete';
import Search from './Search';
import ServiceUnavailable from './ServiceUnavailable';

export default class Main extends React.Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <a href='#main-content' className='govuk-skip-link'>Skip to main content</a>
          <Header/>
          <Route exact path='/' component={Entities}/>
          <Route exact path='/change_request_submitted' component={ChangeRequestSubmission}/>
          <Route exact path='/entities/:name' component={EntityItems}/>
          <Route exact path='/entities/:name/delete' component={EntityDelete}/>
          <Route exact path='/entities/:name/items/:id' component={EntityItem}/>
          <Route exact path='/entities/:name/items/:id/edit/:field' component={EntityItemFieldUpdate}/>
          <Route exact path='/entities/:name/items/:id/delete' component={EntityItemDelete}/>
          <Route exact path='/entities/:name/new' component={EntityItemCreate}/>
          <Route exact path='/entities/:name/schema/edit/:field' component={EntityFieldUpdate}/>
          <Route exact path='/delete_request_submitted' component={RequestSubmittedDelete}/>
          <Route exact path='/service_unavailable' component={ServiceUnavailable}/>
          <Route path='/search' component={Search}/>
          <Footer/>
        </React.Fragment>
      </Router>
    );
  }
}
