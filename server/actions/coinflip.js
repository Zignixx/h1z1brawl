import config from '../../config'

const { minItems, maxItems, minAmount, itemThreshold } = config.coinflip

export function checkCoinflipGame(data) {
  if (!data || !data.side) {
    throw new Error('A side must be selected')
  } else if (!data.items || !(Array.isArray(data.items))) {
    throw new Error('Items must be an array')
  } else if (!checkItems(data.items)) {
    throw new Error('Incorrect items sent')
  } else if (data.items.length < minItems || data.items.length > maxItems) {
    throw new Error('Incorrect number of items')
  } else if (!checkPrice(data.items)) {
    throw new Error('Coinflip amount is too low')
  }
  return data
}

function isItem(item) {
  return item && item.hasOwnProperty('assetid') && item.hasOwnProperty('price') && item.hasOwnProperty('name') && item.hasOwnProperty('icon_url')
}

function checkPrice(items) {
  let total = 0.00
  for (var key in items) {
    total += Number(items[key].price)
  }
  return total >= minAmount
}

function checkItems(items) {
  for (var key in items) {
    const item = items[key]
    if (!isItem(item)) {
      return false
    } else if (item.price < itemThreshold) {
      return false
    }
  }
  return true;
}
