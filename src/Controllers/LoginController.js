import React, { Component } from 'react';
import LoginView from '../Views/LoginView'
import DbRequester from '../Models/dbRequester';
import notifications from '../Notifications/notifications';
import user from '../Models/user';
import observer from '../Models/observer';

export default class LoginController extends Component {
    constructor(props){
        super(props);
        this.state = { loggedIn: false, username: '', password: '', submitDisabled: false };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.login = this.login.bind(this);
    }

    componentWillMount(){
        observer.errorMessageClear();
        if(sessionStorage.getItem("username"))  this.context.router.push('/');
    }
    render() {
        return(
            <LoginView
                username={this.state.username}
                password={this.state.password}
                repeat={this.state.repeat}
                submitDisabled={this.state.submitDisabled}
                onChangeHandler={this.onChangeHandler}
                onSubmitHandler={this.onSubmitHandler}
            />
        )
    }

    onChangeHandler(event) {
        switch (event.target.name) {
            case 'username':
                this.setState({ username: event.target.value });
                break;
            case 'password':
                this.setState({ password: event.target.value });
                break;
            default: break;
        }
    }

    onSubmitHandler(event) {
        event.preventDefault();
        this.setState({ submitDisabled: true });
        this.login(this.state.username, this.state.password);
    }

    login(username, password) {
        DbRequester.loginUser(username, password)
            .then(successLogin.bind(this))
            .catch(notifications.handleAjaxError);

        function successLogin(userData) {
            user.saveAuthToken(userData);
            this.context.router.push('/');
            notifications.showInfo("Влязохте успешно в профилът си!");
        }
    }
}


LoginController.contextTypes = {
    router: React.PropTypes.object
};
