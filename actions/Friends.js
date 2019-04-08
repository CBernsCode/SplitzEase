import * as FriendActTypes from '../constants/actions/Friends';

import { friends } from '../firebase';
import * as defaults from '../constants/DefaultObjs';

addFriend = (uid, friend) => {
  return (dispatch) => {
    friend = { ...defaults.defaultFriend, ...friend }
    friends.doc(uid).collection('friends').add({
      ...friend
    }).then((docRef) => {
      dispatch(getFriends(uid))
      console.log("Document written with ID: ", docRef.id);
    })
  }
  // return { type: FriendActTypes.ADD_FRIEND, payload: friend }
}

removeFriend = (uid, friendId) => {
  return (dispatch) => {
    friends.doc(uid).collection('friends').doc(friendId).delete()
      .then(() => console.log(`${friendId} deteled`))
  }
}

getFriends = (uid) => {
  return (dispatch) => {
    friends.doc(uid).collection('friends').get().then((snap) => {
      let payload = [];
      snap.forEach((doc) => {
        // console.log(doc.id + doc.data())
        payload.push({id: doc.id, ...doc.data()})
      });
      dispatch({ type: FriendActTypes.LOAD_FRIENDS, payload })
    })
  }
}

loadFriends = (friendList) => {
  return { type: FriendActTypes.LOAD_FRIENDS, payload: friendList }
}

export default {
  addFriend,
  getFriends,
  loadFriends,
  removeFriend,
}
