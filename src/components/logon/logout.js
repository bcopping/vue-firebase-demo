import * as firebase from 'firebase/app';

export default function() {            
    var googleAuth = gapi.auth2.getAuthInstance();
    googleAuth.signOut().then(function() {
        firebase.auth().signOut();
    });
}

