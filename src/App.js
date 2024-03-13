// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Logged from './Logged';
import SelectedMovie from './SelectedMovie';
import Seats from './Seats';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/logged" exact component={Logged}/>
        <Route path="/logged/movie" exact component={SelectedMovie}/>
        <Route path="/logged/movie/seats" exact component={Seats}/>
        {/* Add more routes if needed */}
        
      </Switch>
    </Router>
  );
};

export default App;
