import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import {Link} from 'react-router';


export default class HomeView extends Component {


    render() {
        let loggedIn = false;
        if(sessionStorage.getItem("username")) loggedIn = true;

        let Register = null;
        let LogIn = null;
        let SeeAll = null;


        if (!loggedIn) {
            Register = <Link to={"/login"} className="btn btn-default">Влез в профила си.</Link>;
            LogIn = <Link to={"/register"} className="btn btn-default">Регистрирай се.</Link>;
        } else {
            SeeAll = <Link to={"/ads"} className="btn btn-default">Виж всички обяви.</Link>;
        }

        return(
            <div id="home-view">
                <Jumbotron>
                    <h1>Добре дошли в GanyoExpress.bg</h1>
                    <p>Намери това, което търсиш, при нас.</p>
                    {Register}
                    {LogIn}
                    {SeeAll}
                </Jumbotron>
            </div>
        )
    }
}
