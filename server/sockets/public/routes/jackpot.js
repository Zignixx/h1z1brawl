import { JackpotRound } from '../../../db'
import { jackpot } from '../../../managers'

export default function configure(socket, io) {

  socket.on('JACKPOT_LOAD', (data, callback) => {
    const currentRound = jackpot.currentRound ? jackpot.currentRound.toCleanObject() : null
    JackpotRound.getRecentRounds(10).then(rounds => {
      callback({
        currentRound,
        historyRounds: rounds
      })
    }).catch(error => callback({ error: error.message }))
  })

}
