import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from 'components/Header';
import Loader from 'components/Loader';
import routes from './routes';

const Routes = () => {

    return (
        <Router>
            <Header/>
            <Suspense fallback={<Loader />}>
                <Switch>
                    {routes.map((route, i)=>
                        <Route
                            exact
                            key={i}
                            path={route.path}
                            component={route.component}
                        />)}
                </Switch>
            </Suspense>
        </Router>
    )
};

export default Routes;
