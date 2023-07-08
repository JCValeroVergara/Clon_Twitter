
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDlidSVqezKLKeWHSfEVNFIDlU_ZH9NydY',
  authDomain: 'abstract-dragon-390801.firebaseapp.com',
  projectId: 'abstract-dragon-390801',
  storageBucket: 'abstract-dragon-390801.appspot.com',
  messagingSenderId: '1049345306461',
  appId: '1:1049345306461:web:5e74a46aaf20a4210582b4',
  measurementId: 'G-J4ZYJGVFNB',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const mapUserFromFirebaseAuthToUser = (user) => {
    const { displayName, email, photoURL } = user;
    
        
return {
          username: displayName,
          avatar: photoURL,
          email,
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
  


