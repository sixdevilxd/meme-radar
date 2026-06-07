import { useEffect, useState } from "react";
import "../styles/globals.css";

export default function Home() {
  const [pairs, setPairs] = useState([]);
  const [loading, setLoading] = useState(true);

  function calculateScore(pair) {
    let score = 0;

    const liq = pair.liquidity?.usd || 0;
    const vol = pair.volume?.h24 || 0;
    const buys = pair.txns?.h24?.buys || 0;
    const sells = pair.txns?.h24?.sells || 0;

    if (liq > 5000) score += 20;
    if (liq > 10000) score += 10;

    if (vol > 10000) score += 20;
    if (vol > 50000) score += 10;

    if (buys > sells) score += 20;

    if ((pair.priceChange?.h24 || 0) > 0)
      score += 20;

    if ((pair.fdv || 0) < 1000000)
      score += 10;

    return Math.min(score, 100);
  }

  async function loadData() {
    try {
      const res = await fetch(
        "https://api.dexscreener.com/latest/dex/search?q=solana"
      );

      const data = await res.json();

      const sorted = (data.pairs || [])
        .sort(
          (a, b) =>
            (b.liquidity?.usd || 0) -
            (a.liquidity?.usd || 0)
        )
        .slice(0, 20);

      setPairs(sorted);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadData();

    const timer = setInterval(loadData, 10000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h1>🚀 Meme Radar Pro</h1>
      </div>

      {loading && <p>Scanning market...</p>}

      <div className="grid">
        {pairs.map((pair, index) => {
          const score = calculateScore(pair);

          let color = "bad";

          if (score >= 80) color = "good";
          else if (score >= 50) color = "medium";

          return (
            <div
              key={index}
              className="card"
            >
              <h2>{pair.baseToken?.name}</h2>

              <div
                className={`score ${color}`}
              >
                {score}/100
              </div>

              <p>
                Chain: {pair.chainId}
              </p>

              <p>
                Price: $
                {pair.priceUsd}
              </p>

              <p>
                Liquidity: $
                {Math.round(
                  pair.liquidity?.usd || 0
                )}
              </p>

              <p>
                Volume: $
                {Math.round(
                  pair.volume?.h24 || 0
                )}
              </p>

              <p>
                Market Cap: $
                {Math.round(
                  pair.fdv || 0
                )}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
