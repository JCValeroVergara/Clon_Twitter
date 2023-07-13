
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDlidSVqezKLKeWHSfEVNFIDlU_ZH9NydY',
  authDomain: 'abstract-dragon-390801.firebaseapp.com',
  databaseURL: 'https://abstract-dragon-390801.firebaseio.com',
  projectId: 'abstract-dragon-390801',
  storageBucket: 'abstract-dragon-390801.appspot.com',
  messagingSenderId: '1049345306461',
  appId: '1:1049345306461:web:5e74a46aaf20a4210582b4',
  measurementId: 'G-J4ZYJGVFNB',
};

!firebase.apps.length && firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const mapUserFromFirebaseAuthToUser = (user) => {
    const { displayName, email, photoURL,uid } = user;
    
        
return {
    username: displayName,
    avatar: photoURL,
    email,
    uid,
  };
};

export const onAuthStateChanged = (onChange) => {
  return firebase
    .auth()
    .onAuthStateChanged((user) => {
      const normalizedUser = user ?
      mapUserFromFirebaseAuthToUser(user) : null;
      onChange(normalizedUser);
  });
};


  export const loginWithGithub =() =>{
    const githubProvider = new firebase.auth.GithubAuthProvider();
    return firebase
      .auth()
      .signInWithPopup(githubProvider)
};
      
export const addTweet = ({avatar, content, userId, userName}) => {
  return db.collection('tweets').add({
    avatar,
    content,
    userId,
    userName,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  });
};


export const fetchLatestTweets = () => {
  return db
    .collection('tweets')
    .get()
    .then(({ docs }) => {
      return docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        const { createdAt } = data;
        const date = new Date(createdAt.seconds * 1000);
        const normalizedCreatedAt = new Intl.DateTimeFormat('es-ES').format(
          date
        );
        return {
          ...data,
          id,
          createdAt: normalizedCreatedAt,
        };
      });
    }
  );
};


