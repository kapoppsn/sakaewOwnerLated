import * as firebase from 'firebase';


const settings = {timestampsInSnapshots: true};

    const config = {
        apiKey: "AIzaSyBRC1tih7dAeenxIRNNgj19TVa6QTrbIQI",
        authDomain: "react-firebase-aafba.firebaseapp.com",
        databaseURL: "https://react-firebase-aafba.firebaseio.com",
        projectId: "react-firebase-aafba",
        storageBucket: "react-firebase-aafba.appspot.com",
        messagingSenderId: "44298673810",
        appId: "1:44298673810:web:6596d93fb1cd5bc1"
      };
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;