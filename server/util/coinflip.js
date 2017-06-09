export function getCoinflipTotal(game) {
  const joiner = getJoinerTotal(game), creator = getCreatorTotal(game)
  return joiner + creator
}

export function getJoinerTotal(game) {
  if (!game || !game.joiner || !game.joiner.items) {
    return 0.00
  }

  let total = 0.00
  for (const index in game.joiner.items) {
    const item = game.joiner.items[index]
    if (item && item.price) {
      total += parseFloat(item.price)
    }
  }
  return total
}

export function getUserTotal(user) {
  if (!user || !user.items) {
    return 0.00
  }

  let total = 0.00
  for (const index in user.items) {
    const item = user.items[index]
    if (item && item.price) {
      total += parseFloat(item.price)
    }
  }
  return total
}

export function getCreatorTotal(game) {
  if (!game || !game.creator || !game.creator.items) {
    return 0.00
  }

  let total = 0.00
  for (const index in game.creator.items) {
    const item = game.creator.items[index]
    if (item && item.price) {
      total += parseFloat(item.price)
    }
  }
  return total
}
