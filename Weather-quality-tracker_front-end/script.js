const apiKey = 'YOUR_API_KEY'; 6804ed952c000ec48b9ebc1728be030ae1542e65b4844e65675e0c3124e6ce4a
const baseUrl = 'https://api.football-data.org/v4';  // API endpoint

document.getElementById('load-stats').addEventListener('click', loadFootballStats);

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Loads football statistics for the selected league.
 * Fetches live matches, team rankings, and populates team selection
 * for displaying player stats. Updates the UI with the retrieved data.
 */
/******  f5f54101-e03c-4ba5-9b18-cdceee036126  *******/
async function loadFootballStats() {
    const leagueCode = document.getElementById('league').value;

    // Load Live Matches
    const liveMatches = await fetchLiveMatches(leagueCode);
    displayLiveMatches(liveMatches);

    // Load Team Rankings
    const teamRankings = await fetchTeamRankings(leagueCode);
    displayTeamRankings(teamRankings);

    // Load Team Selection for Player Stats
    const teams = teamRankings.standings[0].table.map(team => team.team.name);
    populateTeamSelect(teams);
}

async function fetchLiveMatches(leagueCode) {
    const url = `${baseUrl}/competitions/${leagueCode}/matches`;
    const response = await fetch(url, {
        headers: { 'X-Auth-Token': apiKey }
    });
    const data = await response.json();
    return data.matches;
}

async function fetchTeamRankings(leagueCode) {
    const url = `${baseUrl}/competitions/${leagueCode}/standings`;
    const response = await fetch(url, {
        headers: { 'X-Auth-Token': apiKey }
    });
    const data = await response.json();
    return data;
}

function displayLiveMatches(matches) {
    const liveMatchesList = document.getElementById('live-matches-list');
    liveMatchesList.innerHTML = '';

    matches.forEach(match => {
        const listItem = document.createElement('li');
        listItem.textContent = `${match.homeTeam.name} vs ${match.awayTeam.name} - ${match.score.fullTime.homeTeam}:${match.score.fullTime.awayTeam}`;
        liveMatchesList.appendChild(listItem);
    });
}

function displayTeamRankings(rankings) {
    const teamRankingsList = document.getElementById('team-rankings-list');
    teamRankingsList.innerHTML = '';

    rankings.standings[0].table.forEach(team => {
        const listItem = document.createElement('li');
        listItem.textContent = `${team.position}. ${team.team.name} - ${team.points} points`;
        teamRankingsList.appendChild(listItem);
    });
}

function populateTeamSelect(teams) {
    const teamSelect = document.getElementById('team-select');
    teamSelect.innerHTML = '<option value="">Select a team</option>';  // Reset options

    teams.forEach(team => {
        const option = document.createElement('option');
        option.value = team;
        option.textContent = team;
        teamSelect.appendChild(option);
    });
}

document.getElementById('team-select').addEventListener('change', async function () {
    const teamName = this.value;
    if (teamName) {
        const playerStats = await fetchPlayerStats(teamName);
        displayPlayerStats(playerStats);
    }
});

async function fetchPlayerStats(teamName) {
    const url = `${baseUrl}/teams/${teamName}/players`;
    const response = await fetch(url, {
        headers: { 'X-Auth-Token': apiKey }
    });
    const data = await response.json();
    return data.squad;
}

function displayPlayerStats(players) {
    const playerStatsList = document.getElementById('player-stats-list');
    playerStatsList.innerHTML = '';

    players.forEach(player => {
        const listItem = document.createElement('li');
        listItem.textContent = `${player.name} - ${player.position}`;
        playerStatsList.appendChild(listItem);
    });
}