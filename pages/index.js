import { useEffect, useState } from "react";

export default function Home() {
  const [pairs, setPairs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(
          "https://api.dexscreener.com/latest/dex/search?q=solana"
        );

        const data = await res.json();
        setPairs(data.pairs || []);
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    }

    loadData();
  }, []);

  return (
    <div className="container">
      <h1>🚀 Meme Radar Pro</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        pairs.slice(0, 20).map((pair, index) => (
          <div
            key={index}
            className="card"
            style={{ marginBottom: "10px" }}
          >
            <h3>{pair.baseToken?.name}</h3>

            <p>Chain: {pair.chainId}</p>

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
          </div>
        ))
      )}
    </div>
  );
}
