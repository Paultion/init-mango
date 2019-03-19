import React from 'react';
import { Route } from 'react-router-dom';
import asyncComponent from '../utils/AsyncComponent';

export default _ => {
  return (
    <div className="App-main-padded">
      <Route exact path="/account/user" component={asyncComponent(() => import('../pages/account/user/Detail'))}/>
    </div>
  );
}
