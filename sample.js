function getRandomScore(mean, standardDeviation) {
    // Using the Box-Muller transform to generate normally distributed random numbers
    let u = 0, v = 0;
    while (u === 0) u = Math.random(); // Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    let normalRandom = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

    // Scaling and shifting the normal random number to fit the desired distribution
    let randomScore = Math.round(normalRandom * standardDeviation + mean);

    // Make sure the score is within the valid range (0 to 300)
    return Math.max(0, Math.min(300, randomScore));
}
function getRandomWickets(wickets_mean, wickets_standardDeviation) {
    // Using the Box-Muller transform to generate normally distributed random numbers
    let u = 0, v = 0;
    while (u === 0) u = Math.random(); // Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    let normalRandom = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

    // Scaling and shifting the normal random number to fit the desired distribution
    let randomWickets = Math.round(normalRandom * wickets_standardDeviation + wickets_mean);

    // Make sure the score is within the valid range (0 to 10)
    return Math.max(0, Math.min(10, randomWickets));
}

function assignRandomScoresToPlayers(playersData) {
    const totalPlayers = playersData.length;
    const wickets_mean = 5.45;
    const wickets_standardDeviation = 1.76;
    const mean = 160.7;
    const standardDeviation = 30.02;
    let noOfPlayersWithScore = 0;

    let wicketsFalling = getRandomWickets(wickets_mean, wickets_standardDeviation);
    let a = wicketsFalling;


    let totalScore = getRandomScore(mean, standardDeviation);
    if (wicketsFalling < 9) {
        playersData.slice(a + 2).forEach(player => player.runsScored = null);
        noOfPlayersWithScore = wicketsFalling + 2;
    }
    else
        noOfPlayersWithScore = 11;

    let remainingScore = totalScore;
    let playersWithScore = playersData.slice(0, noOfPlayersWithScore);
    playersWithScore.sort(() => Math.random() - 0.5);

    for (let i = 0; i < playersWithScore.length; i++) {
        if (i === playersWithScore.length - 1) {
            playersWithScore[i].runsScored = remainingScore;
        } else {
            let randomPlayerScore = Math.floor(Math.random() * (remainingScore + 1));
            playersWithScore[i].runsScored = randomPlayerScore;
            remainingScore -= randomPlayerScore;
        }
    }



    return playersData;
}

const playersData = [
    { name: 'Shikhar', runsScored: null },
    { name: 'Rohit', runsScored: null },
    { name: 'Virat', runsScored: null },
    { name: 'KL', runsScored: null },
    { name: 'Sky', runsScored: null },
    { name: 'Pandya', runsScored: null },
    { name: 'Pant', runsScored: null },
    { name: 'Jadeja', runsScored: null },
    { name: 'Lord', runsScored: null },
    { name: 'Bumrah', runsScored: null },
    { name: 'Shami', runsScored: null },

];

const playersWithRandomScores = assignRandomScoresToPlayers(playersData);
console.log(playersWithRandomScores);
