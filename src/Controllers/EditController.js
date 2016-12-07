import React, { Component } from 'react';
import EditView from '../Views/EditView.js'
import DbRequester from '../Models/dbRequester.js';
import notifications from '../Notifications/notifications';
import observer from '../Models/observer';

export default class EditController extends Component {

    constructor(props){
        super(props);
        this.state = {
            title: '',
            author:'',
            body: '',
            price: '',
            phone: '',
            picture: '',
            submitDisabled: false,
            views: 0
        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onLoadSuccess = this.onLoadSuccess.bind(this);
        this.editAd = this.editAd.bind(this);
    }

   

    componentDidMount() {
        observer.errorMessageClear();
        DbRequester.loadAdDetails(this.props.params.adID, this.onLoadSuccess);
    }


    onLoadSuccess(response) {
        this.setState({
            title: response.title,
            body: response.body,
            author: response.author,
            price: response.price,
            phone: response.phone,
            picture: response.picture,
            submitDisabled: false,
            views: response.views
        });

    }



    onChangeHandler(event) {
        event.preventDefault();
        let newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    }

    onSubmitHandler(event) {
        event.preventDefault();

        this.editAd(
            this.props.params.adID,
            this.state.title,
            this.state.author,
            this.state.body,
            this.state.price,
            this.state.phone,
            this.state.picture,
            this.state.views
        );
    }


    editAd(adID, title, author, body, price, phone, picture, views) {
        DbRequester.editAd(adID, title, author, body, price, phone, picture, views)
            .then(successfulEditdAd.bind(this));

        function successfulEditdAd(adData) {
            // Navigate away from create page
            this.context.router.push('/ads');
            notifications.showInfo("Обявата беше успешно редактирана!");
        }
    }

    render() {
        return(
            <EditView
                title={this.state.title}
                author={this.state.author}
                body={this.state.body}
                price={this.state.price}
                phone={this.state.phone}
                picture={this.state.picture}
                submitDisabled={this.state.submitDisabled}
                onChangeHandler={this.onChangeHandler}
                onSubmitHandler={this.onSubmitHandler}
            />
        )
    }

}


EditController.contextTypes = {
    router: React.PropTypes.object
};
