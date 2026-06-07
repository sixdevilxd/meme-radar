import { useState } from "react";

export default function Home() {
  const [chain, setChain] = useState("SOL");

  const tokens = [
    {
      name: "PEPEAI",
      score: 94,
      mc: "24K",
      liq: "11K",
      age: "4m",
      buy: "91%"
    },
    {
      name: "DOGEX",
      score: 88,
      mc: "41K",
      liq: "18K",
      age: "11m",
      buy: "84%"
    },
    {
      name: "CATSOL",
      score: 82,
      mc: "19K",
      liq: "9K",
      age: "7m",
      buy: "78%"
    }
  ];

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
        {["SOL","BASE","BSC"].map(c => (
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

      {tokens.map((token,index)=>(
        <div
          key={index}
          className="card"
        >
          <div className="top">
            <h2>{token.name}</h2>

            <div className="score">
              {token.score}
            </div>
          </div>

          <div className="stats">
            <span>MC ${token.mc}</span>
            <span>Liq ${token.liq}</span>
          </div>

          <div className="stats">
            <span>Age {token.age}</span>
            <span>Buy {token.buy}</span>
          </div>
        </div>
      ))}

    </div>
  );
}
