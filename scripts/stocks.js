document.addEventListener("DOMContentLoaded", () => {
  const stockSymbols = [
    'RELIANCE.NS', 'TCS.NS', 'INFY.NS', 'HDFCBANK.NS', 'ICICIBANK.NS', 'SBIN.NS', 'AXISBANK.NS', 'KOTAKBANK.NS',
    'LT.NS', 'ITC.NS', 'HINDUNILVR.NS', 'HCLTECH.NS', 'WIPRO.NS', 'ASIANPAINT.NS', 'BHARTIARTL.NS', 'MARUTI.NS',
    'BAJFINANCE.NS', 'BAJAJFINSV.NS', 'SUNPHARMA.NS', 'NTPC.NS', 'TITAN.NS', 'ULTRACEMCO.NS', 'TECHM.NS',
    'ADANIENT.NS', 'ADANIPORTS.NS', 'POWERGRID.NS', 'HDFCLIFE.NS', 'NESTLEIND.NS', 'SBILIFE.NS', 'EICHERMOT.NS',
    'JSWSTEEL.NS', 'GRASIM.NS', 'ONGC.NS', 'COALINDIA.NS', 'DRREDDY.NS', 'TATASTEEL.NS', 'BRITANNIA.NS', 'BPCL.NS',
    'CIPLA.NS', 'DIVISLAB.NS', 'HEROMOTOCO.NS', 'INDUSINDBK.NS', 'BAJAJ-AUTO.NS', 'SHREECEM.NS', 'HINDALCO.NS',
    'M&M.NS', 'UPL.NS', 'APOLLOHOSP.NS', 'ICICIPRULI.NS', 'VEDL.NS', 'AMBUJACEM.NS', 'DABUR.NS', 'PIDILITIND.NS',
    'PEL.NS', 'SRF.NS', 'GODREJCP.NS', 'DMART.NS', 'ZOMATO.NS', 'PAYTM.NS', 'NAUKRI.NS', 'YESBANK.NS', 'BANDHANBNK.NS',
    'IDEA.NS', 'GAIL.NS', 'INDIGO.NS', 'IRCTC.NS', 'LICI.NS', 'CANBK.NS', 'PNB.NS', 'BANKBARODA.NS', 'IDFCFIRSTB.NS',
    'FEDERALBNK.NS', 'RBLBANK.NS', 'CHOLAFIN.NS', 'L&TFH.NS', 'MANAPPURAM.NS', 'MFSL.NS', 'MUTHOOTFIN.NS',
    'AUBANK.NS', 'IIFL.NS', 'BAJAJHLDNG.NS', 'HDFCAMC.NS', 'ICICIGI.NS', 'ICICISGI.NS', 'IBULHSGFIN.NS', 'BOSCHLTD.NS',
    'TORNTPHARM.NS', 'BIOCON.NS', 'GLENMARK.NS', 'LUPIN.NS', 'PFIZER.NS', 'ABBOTINDIA.NS'
  ];

  const container = document.getElementById('predictionCard');

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

  stockSymbols.forEach(symbol => {
    const btn = document.querySelector(`button[data-symbol="${symbol}"]`);
    btn.onclick = async () => {
      container.innerHTML = 'Loading...';
      container.classList.remove('hidden');
      try {
        const res = await fetch(`https://devonai.in/stock/predict?symbol=${symbol}`);
        const data = await res.json();
        container.innerHTML = createCard(data);
      } catch (err) {
        container.innerHTML = `<p style="color:red;">Failed to load prediction. Please try again.</p>`;
      }
    };
  });
});
