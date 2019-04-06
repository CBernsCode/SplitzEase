export const defaultFriend = {
  uid: "",
  name: "anon",
  added: "unknown"
}

export const defaultCheck = {
  id: 0,
  ts: Date.now(),
  price: parseFloat(0),
}

export const defaultInvite = {
  host: "test-12345",
  restaurant: "Default",
  ts: Date.now(),
  accepted: false,
}

export default {
  defaultFriend,
  defaultCheck,
  defaultInvite,
}