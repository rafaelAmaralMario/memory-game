import React from "react";
import { Switch, Route } from 'react-router-dom';

import HomePage from './Home/Home';
import GamePage from './Game/Game'


const Routes = () => (
  <Switch>
    <Route path="/" exact component={HomePage}></Route>
    <Route path="/game" exact component={GamePage}></Route>
  </Switch>
);

export default Routes;
