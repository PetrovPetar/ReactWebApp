import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {IndexRoute, Router, Route, hashHistory} from 'react-router';
import Login from './Controllers/LoginController';
import Register from './Controllers/RegisterController';
import Ads from './Controllers/AdsController'
import EditController from './Controllers/EditController.js'
import Home from './Views/HomeView';
import Ad from './Views/CurrentAdView';
import CreateController from './Controllers/CreateController.js';
import Users from './Controllers/UserController'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import MyProfile from './Views/MyProfile';



ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="login" component={Login}/>
            <Route path="register" component={Register}/>
            <Route path="ads" component={Ads} />
            <Route path="ads/:adId" component={Ad}/>
            <Route path="create-ad" component={CreateController}/>
            <Route path="edit/:adID" component={EditController}/>
            <Route path="users" component={Users}/>
            <Route path="profile" component={MyProfile}/>
        </Route>
    </Router>
), document.getElementById('root'));

