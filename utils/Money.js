export default class Money {
  constructor(val){
    this.crncy = val || 0;
  }

  split = (total, n, tax = 0) => {
    if (typeof tax === Number) {
      tax = tax + 1;
    } else {
      tax = 1
    }
    return tax * (total / n);
  }

  toString = (symbol = '$') => {
   return `${symbol}${(this.crncy/100).toFixed(2)}`
  }

  stringToMoney = (mnyStr) => {
    mnyStr = mnyStr.replace(/[$,.]/g, '')
    return Number(mnyStr || 0);
  }

}
