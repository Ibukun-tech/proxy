const StatsD = require('node-statsd');

const statsd = new StatsD({
  host: 'localhost',  // StatsD is exposed on localhost
  port: 8125,         // The UDP port we exposed
  prefix: 'myapp.'    // Prefix all metrics with "myapp."
});

// Track player latency
function handlePlayerAction(latency) {
  // Send timing metric
  statsd.timing('player.latency', latency);
  
  // Increment action counter
  statsd.increment('player.actions');
}

// Track players online
function updatePlayerCount(count) {
  statsd.gauge('players.online', count);
}

// Example usage
setInterval(() => {
  const latency = Math.random() * 100; // Simulate latency
  handlePlayerAction(latency);
  console.log("working")
  
  const playersOnline = Math.floor(Math.random() * 1000);
  updatePlayerCount(playersOnline);
}, 50);
