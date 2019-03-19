import React from 'react';
import { Route } from 'react-router-dom';
import AccountRoutes from './AccountRoutes';

export default _ => {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Route exact path="/" component={() => <p>欢迎使用芒果电单车运营平台！</p>}/>
      <Route path="/account" render={AccountRoutes}/>
    </div>
  );
}
