
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';




const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG);


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

export const loginWithGoogle = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(googleProvider)
};



export const addTweet = ({avatar, content,img, userId, userName}) => {
  return db.collection('tweets').add({
    avatar,
    content,
    img,
    userId,
    userName,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  });
};

const mapTweetsFromFirebaseToTweetsObject = (doc) => {
  const data = doc.data();
  const id = doc.id;
  const { createdAt } = data;

  return {
    ...data,
    id,
    createdAt: +createdAt.toDate(),
  };
};

export const listenLatestTweets = (callback) => {
  return db
    .collection('tweets')
    .orderBy('createdAt', 'desc')
    .limit(20)
    .onSnapshot(({ docs }) => {
      const newTweets = docs.map(mapTweetsFromFirebaseToTweetsObject);
      callback(newTweets);
    });
}


export const uploadImage = (file) => {
  const ref = firebase.storage().ref(`/images/${file.name}`);
  const task = ref.put(file);

  return task;
}


