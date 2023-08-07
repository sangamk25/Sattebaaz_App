let teams=[];
const statistics = [];
const userTeamStats=[];


export function processSelectedPlayers(selectedPlayers) {
  // Convert selectedPlayers to an array of player objects
  const selectedPlayersObj = selectedPlayers.map(player => ({ name: player }));
  
  // Your further logic here, for example:
  console.log("Selected Players:", selectedPlayersObj);
  teams.push(selectedPlayersObj);
  return;
}

export function gameDatageneration() {
  const teamA = {
    "Virat Kohli": 13.5,
    "Rohit Sharma": 14.2,
    "KL Rahul": 11.6,
    "Shikhar Dhawan": 10.8,
    "Hardik Pandya": 12.3,
    "Ravindra Jadeja": 9.4,
    "Rishabh Pant": 10.9,
    "Jasprit Bumrah": 15.0,
    "Mohammed Shami": 13.1,
    "Bhuvneshwar Kumar": 8.1,
    "Yuzvendra Chahal": 7.4,
    "Shardul Thakur": 8.7,
    "Ishan Kishan": 6.7,
    "Suryakumar Yadav": 7.9,
    "Deepak Chahar ": 6.5
  }

  const teamB = {
    "Aaron Finch": 9.5,
    "David Warner": 11.2,
    "Steve Smith": 14.8,
    "Glenn Maxwell": 10.7,
    "Mitchell Marsh": 8.6,
    "Alex Carey": 7.2,
    "Pat Cummins": 13.4,
    "Mitchell Starc": 12.9,
    "Adam Zampa": 6.3,
    "Josh Hazlewood": 11.5,
    "Ashton Agar": 6.8,
    "Marcus Stoinis": 9.3,
    "Matthew Wade": 8.0,
    "Kane Richardson": 7.7,
    "Jhye Richardson": 10.1
  }

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const selectPlaying11 = (teamName) => {
    const numberOfPlayersToSelect = 11;
    const player = Object.keys(teamName);
    const selectedPlayersForTeam = [];

    while (selectedPlayersForTeam.length < numberOfPlayersToSelect) {
      const randomIndex = Math.floor(Math.random() * player.length);
      const randomPlayer = player[randomIndex];

      if (!selectedPlayersForTeam.includes(randomPlayer)) {
        selectedPlayersForTeam.push(randomPlayer);
      }
    }
    return selectedPlayersForTeam
  }

  
 const generatePlayerStat=(name, maxScore, maxCatch, maxWickets)=> {
    let score = getRandomNumber(0, maxScore);
    let wickets = getRandomNumber(0, maxWickets);
    let catches = getRandomNumber(0, maxCatch);

    return {
      "name": name,
      "score": score,
      "wickets": wickets,
      "catches": catches,
      "duck": null
    };
  }


  const generateStatForTeam = (teamName) => {
    let maxWickets = 10;
    let maxScore = 250;
    let maxCatch = 6;
    for (let player of teamName) {
      const playerStat = generatePlayerStat(player, maxScore, maxCatch, maxWickets);
      statistics.push(playerStat);
      maxWickets -= playerStat.wickets;
      maxCatch -= playerStat.catches;
      maxScore -= playerStat.score;
    }

  }

 
  const selectedPlayersForA = selectPlaying11(teamA);
  const selectedPlayersForB = selectPlaying11(teamB);
  generateStatForTeam(selectedPlayersForA);
  generateStatForTeam(selectedPlayersForB);

  let playerWithZeroScore = statistics.filter((playerObject) => playerObject.score === 0)
  for (let playerObject of statistics) {
    if (playerWithZeroScore.includes(playerObject)) {
      playerObject.duck = getRandomNumber(0, 1)
    }
  }
  console.log(statistics);
  
  return statistics;
}
const battingPoints = {
  duck: -2,
  lessThan50: 2,
  lessThan100: 4,
  centuryAndAbove: 6,
};

const bowlingPoints = {
  wicketless: -2,
  lessThan3Wickets: 2,
  lessThan5Wickets: 4,
  fiverAndAbove: 6,
};

const fieldingPoints = {
  dropCatch: -2,
  lessThan2Catches: 3,
  moreThan2Catches: 6,
};


export function mapStatisticsToTeams() {
  const userSelectedDataWithPoints = teams.map(selectedPlayers => {
    const teamStats = statistics.filter(player => selectedPlayers.some(selectedPlayer => selectedPlayer.name === player.name));
    
    let totalPoints = 0;

    teamStats.forEach(player => {
      if (player.score === 0) {
        totalPoints += battingPoints.duck;
      } else if (player.score < 50) {
        totalPoints += battingPoints.lessThan50;
      } else if (player.score < 100) {
        totalPoints += battingPoints.lessThan100;
      } else if (player.score >= 100) {
        totalPoints += battingPoints.centuryAndAbove;
      }

      if (player.wickets === 0) {
        totalPoints += bowlingPoints.wicketless;
      } else if (player.wickets < 3) {
        totalPoints += bowlingPoints.lessThan3Wickets;
      } else if (player.wickets < 5) {
        totalPoints += bowlingPoints.lessThan5Wickets;
      } else if (player.wickets >= 5) {
        totalPoints += bowlingPoints.fiverAndAbove;
      }

      if (player.catches === 0) {
        totalPoints += 0;
      } else if (player.catches < 2) {
        totalPoints += fieldingPoints.lessThan2Catches;
      } else if (player.catches >= 2) {
        totalPoints += fieldingPoints.moreThan2Catches;
      }
    });

    return {
      team: selectedPlayers,
      stats: teamStats,
      totalPoints: totalPoints,
    };
  });
  console.log(userSelectedDataWithPoints);
  

  return userSelectedDataWithPoints;
}
