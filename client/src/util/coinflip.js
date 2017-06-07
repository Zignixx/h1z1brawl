const RANGE_DELIM = 0.05

export function getCoinflipTotalAndRange(game) {
  const [low, high] = getCoinflipRange(game)
  return [getCoinflipTotal(game), low, high]
}

export function getCoinflipRange(game) {
  const total = parseFloat(getCoinflipTotal(game))
  return [Number(total * (1 - RANGE_DELIM)).toFixed(2), Number(total * (1 + RANGE_DELIM)).toFixed(2)]
}

export function getCoinflipTotal(game) {
  if (!game || !game.creator || !game.joiner || !game.creator.items) {
    return 0.00
  }

  let total = 0.00
  for (const index in game.creator.items) {
    const item = game.creator.items[index]
    if (item && item.price) {
      total += parseFloat(item.price)
    }
  }
  if (game.joiner.items) {
    for (const index in game.joiner.items) {
      const item = game.joiner.items[index]
      if (item && item.price) {
        total += parseFloat(item.price)
      }
    }
  }
  return Number(total).toFixed(2)
}
