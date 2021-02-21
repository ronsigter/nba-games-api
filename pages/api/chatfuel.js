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
    text = `HOME: ${game.home.name} \nAWAY: ${game.away.name} \n\n` + text
  })

  res.status(200).json({
    messages: [{ text }],
  })
}
