// main.js
import { processSelectedPlayers, gameDatageneration, mapStatisticsToTeams} from "./teamLogic.js";



document.addEventListener("DOMContentLoaded", function () {
  const buyButtons = document.querySelectorAll(".buy-btn");
  const selectedPlayers = [];
  let totalBudget = 0;
  const budgetLimit = 100;
  let confirmedTeamsCount = 0; // Counter for confirmed teams

  function updateBudgetDisplay() {
    const budgetDisplay = document.getElementById("budget-display");
    budgetDisplay.textContent = `Budget Remaining: ${budgetLimit - totalBudget} million`;
  }

  function enableBuyButtons() {
    buyButtons.forEach(button => {
      button.disabled = false;
    });
  }

  function disableBuyButtons() {
    buyButtons.forEach(button => {
      button.disabled = true;
    });
  }

  function resetPlayerGridItems() {
    const gridItems = document.querySelectorAll(".grid-item");
    gridItems.forEach(item => {
      item.classList.remove("selected");
    });
  }

  buyButtons.forEach(button => {
    button.addEventListener("click", () => {
      const gridItem = button.closest(".grid-item");
      const playerName = gridItem.querySelector(".player-name").textContent;
      const playerPrice = parseFloat(gridItem.querySelector(".player-price").textContent.slice(1, -1));

      if (selectedPlayers.includes(playerName)) {
        const playerIndex = selectedPlayers.indexOf(playerName);
        if (playerIndex !== -1) {
          selectedPlayers.splice(playerIndex, 1);
          totalBudget -= playerPrice;
          console.log(playerName + " has been removed from the selection.");
          updateBudgetDisplay();
          gridItem.classList.remove("selected");
        }
      } else {
        if (selectedPlayers.length >= 11) {
          console.log("You have already selected 11 players.");
          return;
        }

        if (totalBudget + playerPrice > budgetLimit) {
          console.log("Budget limit exceeded. Cannot select " + playerName + ".");
          return;
        }

        selectedPlayers.push(playerName);
        totalBudget += playerPrice;

        console.log(playerName + " has been selected.");
        updateBudgetDisplay();
        gridItem.classList.add("selected");

        if (selectedPlayers.length === 11) {
          const confirmTeamButton = document.getElementById("confirm-team");
          confirmTeamButton.disabled = false;
        }
      }
    });
  });

  const confirmTeamButton = document.getElementById("confirm-team");
  confirmTeamButton.addEventListener("click", () => {
    if (selectedPlayers.length !== 11) {
      console.log("You must select exactly 11 players to confirm the team.");
      return;
    }

    processSelectedPlayers(selectedPlayers);

    // Increment the confirmedTeamsCount and check if it's 2 or more
    confirmedTeamsCount++;
    if (confirmedTeamsCount >= 2) {
      // Enable the "Play Game" button if at least two teams are confirmed
      document.getElementById("play-game").disabled = false;
    }

    // Reset selection and budget for the next team
    selectedPlayers.length = 0;
    totalBudget = 0;
    updateBudgetDisplay();
    enableBuyButtons();
    resetPlayerGridItems(); // Revert player grid items to their original color

    // Disable the "Confirm Team" button after confirming the team
    confirmTeamButton.disabled = true;
  });

  // Add click event listener to the "Play Game" button
  const playGameButton = document.getElementById("play-game");
  playGameButton.addEventListener("click", () => {
    // Check if at least two teams are confirmed before playing the game
    if (confirmedTeamsCount >= 2) {
      // Simulated play game logic (Replace this with your actual game calculation)
      const statistics=gameDatageneration();
      const userSelectedData = mapStatisticsToTeams();
      localStorage.setItem('userSelectedDataWithPoints', JSON.stringify(userSelectedData));
      window.location.href = "./leaderBoard.html"; 
      
      
    } else {
      console.log("You must confirm at least two teams before playing the game.");
    }
  });
});
