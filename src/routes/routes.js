import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../utils';
import Layout from '../components/Layout';
import LoginPage from '../containers/Login';
import SignUpPage from '../containers/Signup';
import Dashboard from '../containers/Dashboard';

const checkAuth = (userType) => {
    return isLoggedIn(userType);
}

const PublicRoute = ({ component: Component, userType, ...rest }) => (
    <Route {...rest} render={props => {
        return checkAuth("admin-session") ? <Redirect to={{ pathname: `/dashboard` }} /> :
            <Component {...props} />
    }} />
)

const ProtectedRoute = ({ component: Component, userType, ...rest }) => (
    <Route {...rest} render={props => {
        return (checkAuth(userType)) ?
            <Layout {...props}>
                <Component {...props} />
            </Layout>
            :
            <React.Fragment>
                <Redirect to={{ pathname: `/` }} />
            </React.Fragment>
    }}
    />
)

const Routes = () => {
    return (
        <Fragment>
            <BrowserRouter >
                <Switch>
                    <PublicRoute exact userType="admin-session" path="/" component={LoginPage} />
                    <PublicRoute exact userType="admin-session" path="/signup" component={SignUpPage} />
                    <ProtectedRoute exact userType="admin-session" path="/dashboard" component={Dashboard} />
                </Switch>
            </BrowserRouter>
        </Fragment>
    )
}

export default Routes;