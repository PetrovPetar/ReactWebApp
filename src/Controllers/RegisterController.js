import React, { Component } from 'react';
import RegisterView from '../Views/RegisterView'
import DbRequester from '../Models/dbRequester';
import notifications from '../Notifications/notifications';
import user from '../Models/user';
import $ from 'jquery';
import observer from '../Models/observer';

export default class RegisterController extends Component {
    constructor(props){
        super(props);
        this.state = {
            loggedIn: false,
            username: '',
            email:'',
            password: '',
            confirmPassword: '',
            submitDisabled: false };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.register = this.register.bind(this);
    }

    componentWillMount(){
        observer.errorMessageClear();
        if(sessionStorage.getItem("username"))  this.context.router.push('/');
    }

    render() {

        return(
            <RegisterView
                username={this.state.username}
                email={this.state.email}
                password={this.state.password}
                confirmPassword={this.state.confirmPassword}
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
            case 'email':
                this.setState({ email: event.target.value });
                break;
            case 'password':
                this.setState({ password: event.target.value });
                break;
            case 'confirmPassword':
                this.setState({ confirmPassword: event.target.value });
                break;
            default: break;
        }
    }

    onSubmitHandler(event) {
        event.preventDefault();
        this.setState({ submitDisabled: true });
        this.register(this.state.username, this.state.email, this.state.password, this.state.confirmPassword);
    }

    register(username, email, password, confirmPassword) {
        if (validateRequest.bind(this)()) {
            DbRequester.registerUser(username, email, password)
                .then(successRegister.bind(this));

            function successRegister(userData) {
                user.saveAuthToken(userData);
                this.context.router.push('/');
                notifications.showInfo("Успешно се регистрирахте в GanyoExpress.BG!");
            }
        }

        function validateRequest() {
            if (!/^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z0-9]+$/.test(email)) {
                $('#emailRegister').css("border-color", "red");
                notifications.showError("Невалиден имейл!");
                return false;
            }
            $('#emailRegister').css("border-color", "initial");

            if (password !== confirmPassword) {
                $('#passwordRegister').css("border-color", "red");
                $('#confirmPassRegister').css("border-color", "red");
                notifications.showError("Паролите не съвпадат!");
                return false;
            }

            $('#passwordRegister').css("border-color", "initial");
            $('#confirmPassRegister').css("border-color", "initial");
            return true;
        }
    }

}


RegisterController.contextTypes = {
    router: React.PropTypes.object
};
