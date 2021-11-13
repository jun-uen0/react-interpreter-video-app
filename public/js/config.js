let Config = {
    apiKey: "AIzaSyAHV_4rep4CVX6MRC00QQmdyNlXVS6PmsA",
    authDomain: "video-chat-subtitle.firebaseapp.com",
    databaseURL: "https://video-chat-subtitle-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "video-chat-subtitle",
    storageBucket: "video-chat-subtitle.appspot.com",
    messagingSenderId: "715283950124",
    appId: "1:715283950124:web:26686dcd9f146484d8bf89"
};
firebase.initializeApp(Config);
const ref = firebase.database().ref("/chat-app-test");