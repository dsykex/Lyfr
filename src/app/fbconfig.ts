import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDvL64xmS2wkPgZoWciOe2BjiLjzp9f780",
    authDomain: "lyfr-d2f3d.firebaseapp.com",
    databaseURL: "https://lyfr-d2f3d.firebaseio.com",
    projectId: "lyfr-d2f3d",
    storageBucket: "lyfr-d2f3d.appspot.com",
    messagingSenderId: "249663250644",
    appId: "1:249663250644:web:34825efab8f58ace"
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();