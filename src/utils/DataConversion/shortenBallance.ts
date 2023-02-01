const shortenBalance = (balance: number | null) =>
  typeof balance === 'number' ? balance.toFixed(2) : balance

export default shortenBalance
