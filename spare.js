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

function assignRandomScoresToPlayers(playersData) {
    const totalPlayers = playersData.length;
    const mean = 160.7;
    const standardDeviation = 30.02;

    // Generate a random total score
    let totalScore = getRandomScore(mean, standardDeviation);

    // Distribute the total score among players randomly
    let remainingScore = totalScore;
    let playersWithScore = playersData.slice(0); // Clone the array
    playersWithScore.sort(() => Math.random() - 0.5); // Shuffle the players randomly

    for (let i = 0; i < playersWithScore.length; i++) {
        if (i === playersWithScore.length - 1) {
            playersWithScore[i].runsScored = remainingScore; // Assign the remaining score to the last player
        } else {
            let randomPlayerScore = Math.floor(Math.random() * (remainingScore + 1));
            playersWithScore[i].runsScored = randomPlayerScore;
            remainingScore -= randomPlayerScore;
        }
    }

    return playersData;
}

// Usage example
const playersData = [
    { name: 'Kohli', runsScored: null },
    { name: 'Rohit', runsScored: null },
    { name: 'KL', runsScored: null },
    { name: 'Shikhar', runsScored: null },
    { name: 'Pandya', runsScored: null },
    { name: 'Jadeja', runsScored: null },
    { name: 'Pant', runsScored: null },
    { name: 'Bumrah', runsScored: null },
    { name: 'Shami', runsScored: null },
    { name: 'Lord', runsScored: null },
    { name: 'Sky', runsScored: null },
];

const playersWithRandomScores = assignRandomScoresToPlayers(playersData);
console.log(playersWithRandomScores);
