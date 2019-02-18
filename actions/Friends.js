import * as FriendActTypes from '../constants/actions/Friends';

import { friends } from '../firebase';

addFriend = (id, friend) => {
  friends.doc(id).collection('friends').add({
    ...friend
  })
  return { type: FriendActTypes.ADD_FRIEND, payload: friend }
}

removeFriend = (id, friend) => {
  return { type: FriendActTypes.REMOVE_FRIEND, payload: friend }
}


getFriends = (id) => {
  return (dispatch) => {
    let frnds = [];
    friends.doc(id).collection('friends').get().then((querySnapshot) => {
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
