import { PayTypes } from '../constants/Enums';

export class BillGenerator {
  constructor(host, restaurant, inviteList) {
    // paytype
    this.host = host
    this.inviteList = inviteList || []
    this.restaurant = restaurant
    // I hope you appreciate this ellegance!!!
    this.cost = Array(inviteList.length).fill(0).map(() => (Math.random() * 30) + 5).reduce((a, b) => a + b, 0)
  }

  perPersonBillGen = () => {
    return this.inviteList.filter(it => {
      return it.paytype === PayTypes.self
    }).map(it => {
      return {
        uid: it.uid,
        cost: parseFloat((Math.random() * 30) + 5).toFixed(2)
      }
    })
  }

  shareList = () => {
    return this.inviteList.filter(it => {
      return it.paytype === PayTypes.share ? it.uid : false
    }).map(it => it.uid)
  }

  makeCheck = (sessionId, isBuying) => {
    return {
      cost: this.cost,
      sessionId,
      host: this.host,
      isBuying,
      restaurant: this.restaurant,
      perPerson: this.perPersonBillGen(),
      sharedCost: this.shareList()
    }
  }
}