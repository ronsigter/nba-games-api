import yyyymmdd from '../../utils/yyyymmdd'

export default async (req, res) => {
  const date = yyyymmdd()
  const response = await fetch(
    `http://data.nba.net/10s/prod/v1/${date}/scoreboard.json`
  )
  const { games } = await response.json()
  const formatedGames = games.map((game) => {
    return {
      away: {
        name: game.vTeam.triCode,
        score: game.vTeam.score || '0',
      },
      home: {
        name: game.hTeam.triCode,
        score: game.hTeam.score || '0',
      },
    }
  })

  let text = ''
  formatedGames.map((game) => {
    text = `${game.away.name} @ ${game.home.name}\n` + text
  })

  let betDate = new Date()
  betDate.setDate(new Date().getDate() + 1)
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  text =
    `${betDate.toLocaleDateString(undefined, options)}\n\n` +
    text +
    `\nClosing 7am`

  res.status(200).json({
    messages: [{ text }],
  })
}
