import * as FriendActTypes from '../constants/actions/Friends';

import { friends } from '../firebase';
import * as defaults from '../constants/DefaultObjs';

addFriend = (uid, friend) => {
  friend = { ...defaults.defaultFriend, ...friend }
  friends.doc(uid).collection('friends').add({
    ...friend
  })
  return { type: FriendActTypes.ADD_FRIEND, payload: friend }
}

removeFriend = (uid, friend) => {
  return { type: FriendActTypes.REMOVE_FRIEND, payload: friend }
}

getFriends = (uid) => {
  return (dispatch) => {
    let frnds = [];
    friends.doc(uid).collection('friends').get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          frnds.push(doc.data())
        });
      })
    dispatch(loadFriends(frnds))
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
