import React, {Component} from 'react';
import DbRequester from '../Models/dbRequester.js';

export default class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: ''
        };

        this.loadUserInfo = this.loadUserInfo.bind(this);
    }

    componentDidMount() {
        if(!sessionStorage.getItem("username")) this.context.router.push('/');
            this.loadUserInfo();
        //this.showComments(this.props.params.adId);
    }

    loadUserInfo() {
        DbRequester.getUserInfo(sessionStorage.getItem('userId'))
            .then(loadUserInfoSuccess.bind(this));

        function loadUserInfoSuccess(profile) {

            let newState = {
                username: profile.username,
                email: profile.email
            };

            this.setState(newState);
        }
    }


    render() {
        let profile = this.state;

        return (
            <div className="container">

                <div className="row">
                    <div className="panel panel-default center-block">
                        <div className="panel-heading">Потребителско име:</div>
                        <div className="panel-body">
                            <h3>{sessionStorage.getItem('username')}</h3>
                        </div>
                    </div>
                </div>


                <div className="row">
                    <div className="panel panel-default center-block">
                        <div className="panel-heading">E-mail:</div>
                        <div className="panel-body">
                            {profile.email}
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="panel panel-default center-block">
                        <div className="panel-heading">Обяви:</div>
                        <div className="panel-body">
                            <span>list all personals ads</span>
                        </div>
                    </div>
                </div>
                </div>
                );
    }

}

Profile.contextTypes = {
    router: React.PropTypes.object
};



