import React from "react";
import dragon1 from "/dragon3.png";

const StartScreen = ({ onStart }) => {
  return (
    <div className="bg-amber-50 rounded-lg p-8 max-w-2xl mx-4 shadow-xl border-4 border-amber-700 animate-fade-in">
      <div className="w-full flex justify-center">
        <img src={dragon1} className="h-40" alt="" />
      </div>
      <h1 className="text-3xl font-medieval text-amber-800 mb-6 text-center">
        🏰 Welcome to the Kingdom of Quizendoor! 🗡️
      </h1>

      <div className="space-y-4 text-amber-900">
        <p className="text-lg text-center">
          Brave adventurer! A grand quest awaits you in these mystical lands.
          <br />
          Will you accept the challenge and prove your wisdom?
        </p>

        <div className="bg-amber-100 rounded-lg p-4 mt-10">
          <h2 className="text-xl font-medieval text-amber-800 mb-2">
            📜 Royal Rewards
          </h2>
          <p className="text-amber-900">
            ⚔️ Earn{" "}
            <span className="text-amber-700 font-bold">100 gold coins</span> for
            each correct answer
            <br />
            🏆 Prove yourself worthy of the title "Dragon Slayer!"
          </p>
        </div>
      </div>

      <div className="w-full flex justify-center py-3">
        <button
          onClick={onStart}
          className="mt-8 w-full bg-amber-700 hover:bg-amber-800 cursor-pointer text-white font-bold py-3 px-6 rounded-lg 
          transform transition-all duration-200 hover:scale-105 shadow-lg"
        >
          🗝️ Begin Your Adventure! ⚔️
        </button>
      </div>

      <div className="mt-4 text-amber-700 text-sm text-center font-medieval">
        May fortune favor the brave!
      </div>
    </div>
  );
};

export default StartScreen;
