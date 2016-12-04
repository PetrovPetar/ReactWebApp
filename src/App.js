import React, { Component } from 'react';
import './App.css';
import NavigationBar from './Components/NavigationBar';
import $ from 'jquery';

// Import requester
import DbRequester from './Models/dbRequester';
import { Link } from 'react-router'
import Header from './Components/Header';
import observer from './Models/observer';
import notifications  from './Notifications/notifications';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = { loggedIn: false, username: '', userId: '' };
        this.onSessionUpdate = this.onSessionUpdate.bind(this);
    }

    componentDidMount(){
        observer.onSessionUpdate = this.onSessionUpdate;

        // Bind the info / error boxes: hide on click
        $("#infoBox, #errorBox").click(function() {
            $(this).fadeOut();
        });

        // Attach AJAX "loading" event listener
        $(document).on({
            ajaxStart: function() { $("#loadingBox").show() },
            ajaxStop: function() { $("#loadingBox").hide() }
        });

        $(document).ajaxError(notifications.handleAjaxError);
    }

    onSessionUpdate() {
        if (sessionStorage.getItem("username")) {
            this.setState({ loggedIn: true, username: sessionStorage.getItem("username"), userId: sessionStorage.getItem("userId")});
        } else {
            this.setState({ loggedIn: false, username: '', userId:'' });
        }
    }

    render() {
        let navBar = {};
        if(this.state.loggedIn){
            navBar = (
                <NavigationBar>
                    <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
                        <div className="container">
                            <div className="collapse navbar-collapse navbar-ex1-collapse">
                                <ul className="nav navbar-nav">
                                    <li>
                                        <Link to="/">Начало</Link>
                                    </li>
                                    <li>
                                        <Link to="/ads">Всички обяви</Link>
                                    </li>
                                    <li>
                                        <Link to="/create-ad">Създай обява</Link>
                                    </li>
                                    <li>
                                        <Link to="/" onClick={this.logout.bind(this)}>Излез</Link>
                                    </li>
                                    <li><Link to="/">Здравей, {this.state.username}</Link></li>
                                </ul>
                            </div>
                        </div>
                    </nav>

                </NavigationBar>
            );
        } else {
            navBar = (
                <NavigationBar>
                    <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
                        <div className="container">
                            <div className="collapse navbar-collapse navbar-ex1-collapse">
                                <ul className="nav navbar-nav">

                                    <li>
                                        <Link to="/"  className="page-scroll">Начало</Link>
                                    </li>
                                    <li>
                                        <Link to="/login" className="page-scroll">Вход</Link>
                                    </li>
                                    <li>
                                        <Link to="/register" className="page-scroll">Регистрация</Link>
                                    </li>
                                </ul>
                                </div>
                            </div>
                        </nav>
                </NavigationBar>
            );
        }
        return (
            <div className="App">
                <Header loggedIn={this.state.loggedIn} user={this.state.username}>
                    {navBar}
                </Header>
                <div id="loadingBox">Loading...</div>
                <div id="infoBox"></div>
                <div id="errorBox"></div>
                {this.props.children}
            </div>
        );
    }

    logout(){
        DbRequester.logoutUser(sessionStorage.getItem("authToken"))
            .then(logoutSuccess.bind(this));

        function logoutSuccess() {
            this.setState({
                username: '',
                userId: '',
                loggedIn: false
            });
            sessionStorage.clear();
            notifications.showInfo("Излязохте успешно от профилът си.");
        }
    }
}

