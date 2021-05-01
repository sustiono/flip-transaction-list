import React from "react";
import { Router, Switch, Route, Link } from "react-router-dom";
import history from "./history";

import { Transactions, TransactionDetail } from "../pages";

const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path='/'>
          <Transactions />
        </Route>

        <Route exact path='/transaksi/:transactionId'>
          <TransactionDetail />
        </Route>

        <Route>
          <div className='not-found-page'>
            <h1>404 - Not Found!</h1>
            <Link to='/'>Kembali ke Beranda</Link>
          </div>
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
