import React, { useState } from "react";

const ResultScreen = ({
  score,
  totalQuestions,
  correctAnswers,
  incorrectAnswers,
  skippedQuestions,
  onRestart,
  onHome,
}) => {
  const [showSkippedQuestions, setShowSkippedQuestions] = useState(false);

  //make sure the correct and incorrect answers fall within the valid range
  const validCorrectAnswers = Math.min(correctAnswers, totalQuestions);
  const validIncorrectAnswers = Math.max(
    0,
    totalQuestions - validCorrectAnswers - skippedQuestions.length
  );

  const percentage = (validCorrectAnswers / totalQuestions) * 100;
  const dragonState =
    percentage >= 90 ? "defeated" : percentage >= 70 ? "wounded" : "victorious";

  return (
    <div className="bg-amber-50 rounded-lg p-8 max-w-2xl mx-4 shadow-xl border-4 border-amber-700 animate-fade-in">
      <div className="text-center mb-8">
        <div className="text-8xl mb-4">
          {percentage >= 90 ? "🏆" : percentage >= 70 ? "⚔️" : "🛡️"}
        </div>
        <h2 className="text-3xl font-medieval text-amber-800 mb-2">
          {percentage >= 90
            ? "Dragon Slayer!"
            : percentage >= 70
            ? "Valiant Warrior!"
            : "Brave Apprentice!"}
        </h2>
        <p className="text-lg text-amber-600">The Dragon is {dragonState}!</p>
      </div>

      <div className="bg-amber-100 rounded-lg p-6 mb-8 border-2 border-amber-600">
        <div className="sm:grid sm:grid-cols-3 gap-4 text-center flex flex-col">
          <div className="p-4 sm:border-r-2 border-amber-600">
            <div className="text-4xl font-medieval text-green-700">
              {validCorrectAnswers}
            </div>
            <p className="text-sm text-amber-700">Challenges Conquered</p>
          </div>
          <div className="p-4 sm:border-r-2 border-amber-600">
            <div className="text-4xl font-medieval text-red-700">
              {validIncorrectAnswers}
            </div>
            <p className="text-sm text-amber-700">Dragon's Victories</p>
          </div>
          <div className="p-4">
            <div className="text-4xl font-medieval text-blue-700">
              {skippedQuestions.length}
            </div>
            <p className="text-sm text-amber-700">Skipped Challenges</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t-2 border-amber-600">
          <div className="text-2xl font-medieval text-amber-800">
            🏅 Total Loot: {score} Gold Coins
          </div>
        </div>
      </div>

      {skippedQuestions.length > 0 && (
        <div className="mb-8">
          <button
            onClick={() => setShowSkippedQuestions(!showSkippedQuestions)}
            className="w-full bg-amber-700 hover:bg-amber-800 text-white font-medieval cursor-pointer py-3 px-6 rounded-lg 
            transform transition-all duration-200 hover:scale-105 shadow-lg border-2 border-amber-800"
          >
            {showSkippedQuestions ? "Hide" : "Show"} Skipped Challenges
          </button>

          {showSkippedQuestions && (
            <div className="mt-4 space-y-2">
              {skippedQuestions.map((question, index) => (
                <div
                  key={index}
                  className="bg-amber-200 p-4 rounded-lg border-2 border-amber-600"
                >
                  <h4 className="font-medieval text-amber-900 mb-2">
                    Challenge {index + 1}
                  </h4>
                  <p className="text-amber-800">{question.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="flex gap-4 flex-col sm:flex-row">
        <button
          onClick={onRestart}
          className="flex-1 bg-amber-700 hover:bg-amber-800 text-white cursor-pointer font-medieval py-3 px-6 rounded-lg 
          transform transition-all duration-200 hover:scale-105 shadow-lg border-2 border-amber-800
          flex items-center justify-center gap-2"
        >
          <span>🗡️</span>
          New Quest
        </button>
        <button
          onClick={onHome}
          className="flex-1 bg-amber-700 hover:bg-amber-800 text-white cursor-pointer font-medieval py-3 px-6 rounded-lg 
          transform transition-all duration-200 hover:scale-105 shadow-lg border-2 border-amber-800
          flex items-center justify-center gap-2"
        >
          <span>🏰</span>
          Return Home
        </button>
      </div>

      <div className="mt-6 text-sm text-amber-600 font-medieval">
        {percentage >= 90
          ? "The kingdom sings songs of your victory!"
          : percentage >= 70
          ? "The Dragon still lurks - will you challenge it again?"
          : "The royal armory awaits your return for better gear!"}
      </div>
    </div>
  );
};

export default ResultScreen;
