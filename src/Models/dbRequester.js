import $ from 'jquery';

let DbRequester = (function () {

    // DataBase parameters
    const baseUrl = "https://baas.kinvey.com/";
    const appId = "kid_rkFDPl2fg";
    const appSecret = "0f7a9ce0b6a14257b9c3b3f249a7ce27";
    const base64auth = btoa(appId + ":" + appSecret);
    const dbAuthHeaders = {"Authorization": "Basic " + base64auth};


    function getUserAuthHeaders() {
        return {"Authorization": "Kinvey " + sessionStorage.getItem("authToken")}
    }

    // User request

    function loadUsers() {
        return $.ajax({
            method: "GET",
            url: baseUrl + "user/" + appId,
            headers: getUserAuthHeaders()
        })
    }


    function loginUser(username, password) {
        return $.ajax({
            method: "POST",
            url: baseUrl + "user/" + appId + "/login",
            headers: dbAuthHeaders,
            data: {
                username: username,
                password: password
            }
        })
    }

    function registerUser(username, email, password) {
        return $.ajax({
            method: "POST",
            url: baseUrl + "user/" + appId,
            headers: dbAuthHeaders,
            contentType: "application/json",
            data: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        })
    }

    function logoutUser() {
        return $.ajax({
            method: "POST",
            url: baseUrl + "user/" + appId + "/_logout",
            headers: getUserAuthHeaders()
        });
    }

    // Ads request

    function createAd(title, author, body, price, phone, picture, views) {
        return $.ajax({
            method: "POST",
            url: baseUrl + "appdata/" + appId + "/ads",
            headers: getUserAuthHeaders(),
            contentType: "application/json",
            data: JSON.stringify({
                title: title,
                author: author,
                body: body,
                price: price,
                phone: phone,
                picture: picture,
                views: views
            })
        })
    }

    function editAd(adID, title, author, body, price, phone, picture, views) {
        return $.ajax({
            method: "PUT",
            url: baseUrl + "appdata/" + appId + "/ads/" + adID,
            headers: getUserAuthHeaders(),
            data: {
                title: title,
                author: author,
                body: body,
                price: price,
                phone: phone,
                picture: picture,
                views: views
            }
        })
    }


    function loadAdDetails(adID) {
        return $.ajax({
            method: "GET",
            url: baseUrl + "appdata/" + appId + "/ads/" + adID,
            headers: getUserAuthHeaders()
        });

    }

    function showAds() {
        return $.ajax({
            method: "GET",
            url: baseUrl + "appdata/" + appId + "/ads",
            headers: getUserAuthHeaders()
        })
    }

    function getUserInfo(id) {
        return $.ajax({
            method: "GET",
            url: baseUrl + "user/" + appId + "/" + id,
            headers: getUserAuthHeaders()
        })
    }

    function getAd(adId) {
        return $.ajax({
            method: "GET",
            url: baseUrl + "appdata/" + appId + "/ads/" + adId,
            headers: getUserAuthHeaders()
        })
    }


    function createComment(adId, body, author) {
        return $.ajax({
            method: "POST",
            url: baseUrl + "appdata/" + appId + "/comments",
            headers: getUserAuthHeaders(),
            contentType: "application/json",
            data: JSON.stringify({
                adId: adId,
                author: author,
                body: body,
                date: new Date().getTime()
            })
        })
    }

    function loadCommentsForAd(adId) {
        return $.ajax({
            method: "GET",
            url: baseUrl + "appdata/" + appId + "/comments?=query=" + adId,
            headers: getUserAuthHeaders()
        })
    }

    function deleteComment(commentId) {
        return $.ajax({
            method: "DELETE",
            url: baseUrl + "appdata/" + appId + "/comments/" + commentId,
            headers: getUserAuthHeaders()
        })
    }

    function editComment(commentId, body, author, adId) {
        return $.ajax({
            method: "PUT",
            url: baseUrl + "appdata/" + appId + "/comments/" + commentId,
            headers: getUserAuthHeaders(),
            contentType: "application/json",
            data: JSON.stringify({
                body: body,
                author: author,
                adId: adId
            })
        })
    }

    function deleteAd(adId) {
        console.log(adId);
        return $.ajax({
            method: "DELETE",
            url: baseUrl + "appdata/" + appId + "/ads/" + adId,
            headers: getUserAuthHeaders()
        });
    }

    return {loginUser,
            logoutUser,
            registerUser,
            createAd,
            editAd,
            loadAdDetails,
            showAds,
            getAd,
            getUserInfo,
            createComment,
            loadCommentsForAd,
            deleteComment,
            editComment,
            deleteAd,
            loadUsers};
})();

export default DbRequester
