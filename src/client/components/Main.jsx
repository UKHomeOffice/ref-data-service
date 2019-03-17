import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// local imports
import Footer from 'Footer';
import Header from 'Header';
import Home from 'Home';

export default class Main extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <a href="#main-content" className="govuk-skip-link">Skip to main content</a>
          <Header/>
          <Route exact path='/' component={Home}/>
          <Footer/>
        </div>
      </Router>
    );
  }
}
