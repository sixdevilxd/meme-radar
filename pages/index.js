import { useState, useEffect } from "react";

export default function Home() {
  const [chain, setChain] = useState("SOL");
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(
          "https://api.dexscreener.com/latest/dex/search?q=solana"
        );

        const data = await res.json();

        const filtered = (data.pairs || [])
          .filter((pair) => {
            const liq = pair.liquidity?.usd || 0;
            const mc = pair.fdv || 0;

            return liq > 5000 && mc < 1000000;
          })
          .slice(0, 20);

        setTokens(filtered);
      } catch (err) {
        console.error(err);
      }
    }

    loadData();

    const timer = setInterval(loadData, 10000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="app">
      <div className="header">
        🚀 Meme Radar Pro
      </div>

      <input
        className="search"
        placeholder="Search token..."
      />

      <div className="chains">
        {["SOL", "BASE", "BSC"].map((c) => (
          <button
            key={c}
            className={
              chain === c
                ? "chain active"
                : "chain"
            }
            onClick={() => setChain(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="tabs">
        <div>🔥 Trending</div>
        <div>🚀 New Pair</div>
        <div>🐳 Whale</div>
        <div>💎 Early Gem</div>
      </div>

      {tokens.map((token, index) => (
        <div
          key={index}
          className="card"
        >
          <div className="top">
            <h2>
              {token.baseToken?.symbol}
            </h2>

            <div className="score">
              {Math.min(
                99,
                Math.round(
                  (token.liquidity?.usd || 0) /
                    1000
                )
              )}
            </div>
          </div>

          <div className="stats">
            <span>
              MC $
              {Math.round(
                token.fdv || 0
              ).toLocaleString()}
            </span>

            <span>
              Liq $
              {Math.round(
                token.liquidity?.usd || 0
              ).toLocaleString()}
            </span>
          </div>

          <div className="stats">
            <span>
              Vol $
              {Math.round(
                token.volume?.h24 || 0
              ).toLocaleString()}
            </span>

            <span>
              {token.chainId}
            </span>
          </div>

          <div className="stats">
            <span>
              Price $
              {token.priceUsd}
            </span>

            <span>
              {token.dexId}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
