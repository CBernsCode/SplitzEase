import Money from '../utils/Money';

describe('Split Tests', () => {
  let mny = new Money(100);
  it('$1.00 / 1', () => {
    expect(mny.split('100', 1)).toEqual(100);
  })

  it('$2.00 / 2', () => {
    expect(mny.split('200', 2)).toEqual(100);
  })

  it('$10.00 / 3', () => {
    // is this really ok?
    expect(mny.split('1000', 3)).toBeGreaterThanOrEqual(333);
    expect(mny.split('1000', 3)).toBeLessThanOrEqual(334);
  })

  it('$10.00 / 4', () => {
    expect(mny.split('1000', 4)).toEqual(250);
  })
})

describe('Print Value', () => {
  it('Should be $0.00', () =>{
    let mny = new Money(0);
    expect(mny.toString()).toBe("$0.00")
  })

  it('Should be $1.00', () =>{
    let mny = new Money(100);
    expect(mny.toString()).toBe("$1.00")
  })

  it('Should be Ç1.00', () =>{
    let mny = new Money(100);
    expect(mny.toString('Ç')).toBe("Ç1.00")
  })
})

describe('String to Money', () => {
  let mny = new Money(100);
  it('Should be 100', () => {
    expect(mny.stringToMoney("$1.00")).toEqual(100)
  })
  it('Should be 0', () => {
    expect(mny.stringToMoney("$0.00")).toEqual(0)
  })
  it('Should be 1000', () => {
    expect(mny.stringToMoney("$10.00")).toEqual(1000)
  })
  it('Should be 100', () => {
    expect(mny.stringToMoney("1.00")).toEqual(100)
  })
  it('Should be 100', () => {
    expect(mny.stringToMoney("$1.00")).toEqual(100)
  })
  it('Should be 100000000', () => {
    expect(mny.stringToMoney("$1,000,000.00")).toEqual(100000000)
  })
})

