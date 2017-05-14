const initialState = {
  stats: {
    loaded: false,
    loading: false,
    won: {},
    games: 0
  }
}

export default function reducer(state = initialState, {type, payload}) {
  switch (type) {
    default:
      return state
  }
}
