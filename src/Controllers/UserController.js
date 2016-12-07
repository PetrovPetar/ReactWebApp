import React, { Component } from 'react';
import UserView from '../Views/UserView'
import DbRequester from '../Models/dbRequester';
import $ from 'jquery';
import observer from '../Models/observer';

export default class UserController extends Component {
    constructor(props){
        super(props);
        this.loadUsers = this.loadUsers.bind(this);
    }

    componentWillMount(){
        observer.errorMessageClear();
        if(!sessionStorage.getItem("username"))
            this.context.router.push('/');
        else
         this.loadUsers();
    }

    loadUsers(){
        DbRequester.loadUsers()
            .then(function (users) {
                let tBody = $('<tbody>');

                for(let user of users){
                    let tr = $('<tr>').attr("id", user._id)
                        .append($('<td>').text(user._id))
                        .append($('<td>').text(user.username))
                        .append($('<td>').text(user.email));

                    $(tBody).append(tr);
                }
                $('#usersTable tbody').empty();
                $('#usersTable').append(tBody);
            });
    }

    render() {
        return(
            <UserView/>
        )
    }
}

UserController.contextTypes = {
    router: React.PropTypes.object
};
