import React, {Component} from 'react';
import { Modal, Button } from 'react-bootstrap';
import DbRequester from '../Models/dbRequester.js';
import notifications from '../Notifications/notifications';
import $ from 'jquery';
import AdControls from '../Controllers/AdControls.js';

export default class Ad extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            body: '',
            author: '',
            price: '',
            phone: '',
            picture: '',
            submitDisabled: false,
            tableRows: '',
            comment: '',
            showModal: false,
            urlAdID: ''
        };

        this.loadAd = this.loadAd.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.createComment = this.createComment.bind(this);
        this.showComments = this.showComments.bind(this);
        this.deleteClicked = this.deleteClicked.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onDeleteAd = this.onDeleteAd.bind(this);
    }

    componentDidMount() {
        this.loadAd();
        this.showComments(this.props.params.adId);
    }

    // increaseViewCount(adId){
    //     let result = 1;
    //     function increaseViews(request, response, modules) {
    //         let requestBody = request.body; // this gets the JSON body of the request
    //         response.body = request.body;
    //         response.body.views = '1';
    //         response.complete(200);
    //     }
    // }

    // increaseViews(urlAdID, title, author, body, price, phone, picture, oldviews) {
    //     //event.preventDefault();
    //     console.log(oldviews);
    //     console.log(this.props.params.adId);
    //     console.log(urlAdID);
    //     console.log(title);
    //     let newviews = parseInt(oldviews) + 1;
    //     DbRequester.editAd(urlAdID, title, author, body, price, phone, picture, newviews)
    //         .then(increaseViewsAdSuccess.bind(this));
    //
    //     function increaseViewsAdSuccess(response) {
    //         console.log(response);
    //         console.log('New views: ' + response.views);
    //         //this.loadAd();
    //         //this.context.router.push('/ads');
    //         //notifications.showInfo("Обявата беше успешно изтрита!");
    //     }
    // }

    loadAd() {
        DbRequester.loadAdDetails(this.props.params.adId)
            .then(loadAdSuccess.bind(this));

        function loadAdSuccess(ad) {
            //sessionStorage.setItem('currentAdId', ad._id);
            let newState = {
                title: ad.title,
                body: ad.body,
                author: ad.author,
                price: ad.price,
                phone: ad.phone,
                picture: ad.picture,
                submitDisabled: false,
                views: ad.views,
                urlAdID: this.props.params.adId
            };

            if (ad._acl.creator === sessionStorage.getItem('userId') ||
                sessionStorage.getItem("userId") == "58467dea01bde1035e82c073") {
                newState.canEdit = true;
            }

            this.setState(newState);
        }
    }

    // componentWillUnmount() {
    //     //alert("unmount");
    //     //increase view count
    //     this.increaseViews(
    //         this.props.params.adId,
    //         this.state.title,
    //         this.state.author,
    //         this.state.body,
    //         this.state.price,
    //         this.state.phone,
    //         this.state.picture,
    //         this.state.views
    //     );
    // }

    closeModal() {
        this.setState({showModal: false});
    }

    deleteClicked(event) {
        event.preventDefault();
        this.setState({showModal: true});
    }

    onDeleteAd(event) {
        event.preventDefault();
        DbRequester.deleteAd(this.props.params.adId)
            .then(deleteAdSuccess.bind(this));

        function deleteAdSuccess(response) {
            this.context.router.push('/ads');
            notifications.showInfo("Обявата беше успешно изтрита!");
        }
    }



    render() {
        let ad = this.state;

        return (
            <div className="container">

                <div className="row">
                    <div className="panel panel-default center-block">
                        <div className="panel-heading"></div>
                        <div className="panel-body">
                            <h3>{ad.title}</h3>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="panel panel-default center-block">
                        <div className="panel-heading">Снимка:</div>
                        <div className="panel-body">

                            <img src={ad.picture  || "http://i.imgur.com/Rtkn7ex.png"} alt="" className="img-thumbnail"
                                 width="400" height="400"/>

                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="panel panel-default center-block">
                        <div className="panel-heading">Автор:</div>
                        <div className="panel-body">
                            {ad.author}
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="panel panel-default center-block">
                        <div className="panel-heading">Описание:</div>
                        <div className="panel-body">
                            {ad.body}
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="panel panel-default center-block">
                        <div className="panel-heading">Цена:</div>
                        <div className="panel-body">
                            <span>{ad.price} лева.</span>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="panel panel-default center-block">
                        <div className="panel-heading">Телефон:</div>
                        <div className="panel-body">
                            <span>{ad.phone}</span>
                        </div>
                    </div>
                </div>

                <AdControls
                    adId={this.props.params.adId}
                    canEdit={this.state.canEdit}
                    deleteClicked={this.deleteClicked}
                />

                <h2>Коментари</h2>
                <table className="table table-striped" id="commentsTable">
                    <thead>
                    <tr>
                        <th>Автор</th>
                        <th>Коментар</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                </table>

                <form onSubmit={this.createComment}>
                    <label className="control-label">Напишете коментар:</label>
                        <textarea className="form-control"
                                  rows="5" cols="40"
                                  onChange={this.onChangeHandler} required="required"
                                  id="textCreateComment"/>
                    <input type="submit" value="Изпрати" className="btn btn-default"/><br/><br/>
                </form>

                <Modal show={this.state.showModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Потвърждение!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Сигурни ли сте че искате да изтриете обявата?</h4>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.onDeleteAd}>Изтрий!</Button>
                        <Button onClick={this.closeModal}>Затвори</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        );


    }

    createComment(event) {
        event.preventDefault();
        let commentBody = this.state.comment;
        let commentAuthor = sessionStorage.getItem("username");
        let adId = this.props.params.adId;
        let showComments = this.showComments;
        $('#textCreateComment').val("");

        DbRequester.createComment(adId, commentBody, commentAuthor)
            .then(successCommentCreate)
            .catch(notifications.handleAjaxError);

        function successCommentCreate(comment) {
            showComments(comment.adId);
        }
    }

    showComments(adId) {
        let loadComments = this.showComments;
        DbRequester.loadCommentsForAd(adId)
            .then(successLoadComments);

        function successLoadComments(comments) {
            let tableRows = $('<tbody>');
            let sortedDescComments = comments.sort((a,b) => b.date - a.date);
            for (let comment of sortedDescComments) {
                
                if (comment.adId === adId) {
                    let tr = $('<tr>').attr("id", comment._id)
                        .append($('<td>').text(comment.author))
                        .append($('<td class="body">').text(comment.body));

                    if (comment.author === sessionStorage.getItem("username")) {
                        $('<td>')
                            .append($('<button class="btn btn-default">').text("Изтрий").click(()=> {deleteComment(comment._id);}))
                            .append($('<button class="btn btn-default">').text("Редактирарй").click(()=> {editComment(comment._id);})).appendTo(tr);
                    } else {
                        $(tr).append($('<td>'));
                    }

                    $(tableRows).append(tr);
                }

            }


            $('#commentsTable tbody').empty();
            $('#commentsTable').append(tableRows);

            function deleteComment(commentId) {
                DbRequester.deleteComment(commentId)
                    .then(loadComments);
            }

            function editComment(commentId){
                let tdCommentBody = $(`#${commentId} .body`);
                let commentBody = $(tdCommentBody).text();
                let inputBar = $('<input>').val(commentBody);
                let cancelBtn = $('<button class="btn btn-default">Откажи</button>').click(function () {
                    $(tdCommentBody).empty();
                    $(tdCommentBody).text(commentBody);
                });
                let buttonEdit = $('<button class="btn btn-default">Коригирай</button>').click(function () {
                    let inputValue = $(inputBar).val();
                    DbRequester.editComment(commentId, inputValue, sessionStorage.getItem("username"), adId)
                        .then(successEditComment);
                });

                $(tdCommentBody).empty();
                $(tdCommentBody)
                    .append(inputBar)
                    .append(buttonEdit)
                    .append(cancelBtn);

                function successEditComment(comment) {
                    $(tdCommentBody).empty();
                    $(tdCommentBody).text(comment.body);
                }
            }
        }
    }


    onChangeHandler(event) {
        this.setState({comment: event.target.value});
    }
}



Ad.contextTypes = {
    router: React.PropTypes.object
};


