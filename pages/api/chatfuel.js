import yyyymmdd from '../../utils/yyyymmdd'

export default async (req, res) => {
  const date = yyyymmdd('02/19/2021')

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

  res.status(200).json({
    messages: [
      { text: 'Welcome to the Chatfuel Rockets!' },
      { text: 'What are you up to?' },
    ],
  })
}
