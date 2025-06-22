document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".button-grid button");
  const container = document.getElementById("predictionCard");

  function createCard(data) {
    return `
      <div class="overlay-container">
        <div class="prediction-card">
          <button class="close-card" onclick="this.closest('.overlay-container').remove()">✕</button>
          <h2>${data.symbol} - ₹${data.live_price}</h2>
          <h3>📈 Direction: <span class="${data.prediction.includes('UP') ? 'up' : 'down'}">
            ${data.prediction.includes('UP') ? 'UP' : 'DOWN'}</span></h3>
          <div class="card-grid">
            <div class="section">
              <h4>🧠 Justification:</h4>
              <p>${data.prediction.split("Justification:")[1].split("Summary:")[0]}</p>
            </div>
            <div class="section">
              <h4>📊 Indicators</h4>
              <ul>
                <li>RSI: ${data.indicators.RSI.toFixed(2)}</li>
                <li>MACD: ${data.indicators.MACD.toFixed(2)}</li>
                <li>Signal: ${data.indicators.Signal.toFixed(2)}</li>
                <li>ADX: ${data.indicators.ADX.toFixed(2)}</li>
                <li>VWAP: ${data.indicators.VWAP.toFixed(2)}</li>
              </ul>
              <h4>🧮 Pivot Levels</h4>
              <ul>
                <li>Pivot: ${data.pivot_levels.pivot.toFixed(2)}</li>
                <li>R1: ${data.pivot_levels.r1.toFixed(2)}</li>
                <li>R2: ${data.pivot_levels.r2.toFixed(2)}</li>
                <li>S1: ${data.pivot_levels.s1.toFixed(2)}</li>
                <li>S2: ${data.pivot_levels.s2.toFixed(2)}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  buttons.forEach(button => {
    button.addEventListener("click", async () => {
      const symbol = button.getAttribute("data-symbol");
      container.innerHTML = `<p style="color: #aaa;">Fetching ${symbol} data...</p>`;
      try {
        const res = await fetch(`https://devonai.in/crypto/predict?symbol=${symbol}`);
        const data = await res.json();
        container.innerHTML = createCard(data);
        container.classList.remove("hidden");
      } catch (err) {
        container.innerHTML = `<p style="color:red;">Failed to load prediction.</p>`;
      }
    });
  });
});
