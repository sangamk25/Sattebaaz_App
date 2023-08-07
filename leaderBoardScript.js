//import { mapStatisticsToTeams } from "./teamLogic";

// Function to create the leaderboard table rows
function createLeaderboardRows(leaderboardData) {
    const leaderboardBody = document.getElementById('leaderboard-body');
    leaderboardBody.innerHTML = ''; // Clear the existing data
  
    leaderboardData.forEach((entry, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>Team ${index + 1}</td>
        <td>${formatPlayerNames(entry.team)}</td>
        <td>${entry.totalPoints}</td>
      `;
      leaderboardBody.appendChild(row);
    });
  }
  
function formatPlayerNames(teamData) {
    return teamData.map(player => player.name).join(', ');
}
  
  // Function to sort the data in descending order based on totalPoints
  function sortLeaderboardData(data) {    
    return data.slice().sort((a, b) => b.totalPoints - a.totalPoints);
  }
  
document.addEventListener('DOMContentLoaded', function () {
    // Retrieve the userSelectedDataWithPoints from localStorage
    const userSelectedDataWithPoints = JSON.parse(localStorage.getItem('userSelectedDataWithPoints'));

    if (userSelectedDataWithPoints) {
        // Sort the data in descending order based on totalPoints
        const sortedLeaderboardData = sortLeaderboardData(userSelectedDataWithPoints);

        // Create the leaderboard table rows
        createLeaderboardRows(sortedLeaderboardData);
    } else {
        console.log('No data available for the leaderboard.');
    }
});
  