async function fetchEarningsData() {
  try {
    const response = await fetch('http://localhost:3000/data');
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    displayData(data);
  } catch (error) {
    console.error("Error fetching earnings data:", error);
  }
}

function displayData(data) {
  const container = document.getElementById('earningsContainer');
  container.innerHTML = ''; // Clear previous content

  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';

    // Construct a potential logo URL using Clearbit Logo API
    const logoUrl = `https://logo.clearbit.com/${item.name.replace(/\s+/g, '').toLowerCase()}.com`;

    card.innerHTML = `
      <div class="card-header">
        <img src="${logoUrl}" alt="${item.name}" onerror="this.onerror=null;this.src='https://via.placeholder.com/40'">
        <h2>${item.name} (${item.ticker})</h2>
      </div>
      <div class="card-content">
        <p><strong>EPS:</strong> ${item.eps}</p>
        <p><strong>Revenue:</strong> $${item.revenue.toFixed(2)} million</p>
        <p><strong>Quarter:</strong> ${item.quarter}</p>
        <p>${item.subject}</p>
      </div>
      <div class="card-footer">
        <span class="price">$${(item.revenue / 1000).toFixed(2)} billion</span>
        <button>Continue</button>
      </div>
    `;

    container.appendChild(card);
  });
}

// Fetch data on load
fetchEarningsData();
setInterval(fetchEarningsData, 600000); // Update every 10 minutes
