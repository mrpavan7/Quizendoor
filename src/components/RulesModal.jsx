import React from "react";

const RulesModal = ({ onClose, quizData }) => {
  return (
    <div className="fixed inset-0 flex backdrop-blur-2xl items-center justify-center z-50">
      <div className="bg-amber-50 rounded-lg max-w-2xl mx-4 shadow-xl border-4 border-amber-700 animate-scale-in max-h-[90vh] flex flex-col">
        <div className="p-8 pb-4 border-b border-amber-200">
          <h2 className="text-3xl font-medieval text-amber-800 text-center">
            🏰 Welcome to the Kingdom of Quizendoor! ⚔️
          </h2>
        </div>

        <div className="p-8 pt-4 overflow-y-auto custom-scrollbar">
          <div className="space-y-4 text-amber-900">
            <p className="text-lg">
              Brave Knight! The kingdom needs your wisdom to defeat the
              <span className="font-bold text-red-600">
                {" "}
                Dragon of Ignorance
              </span>
              ! 🐉
            </p>

            <ol className="space-y-4 text-lg list-decimal list-inside">
              <li className="flex items-start gap-2">
                <span className="text-2xl">🛡️</span>
                <div>
                  <strong>Health Protection:</strong> You start with
                  <span className="text-red-500"> 3 Hearts</span>. Wrong answers
                  cost 1 heart!
                </div>
              </li>

              <li className="flex items-start gap-2">
                <span className="text-2xl">🔥</span>
                <div>
                  <strong>Streak Bonfire:</strong> Consecutive correct answers
                  build your{" "}
                  <span className="text-orange-500">Fire Streak</span>
                  (50 bonus points per streak!)
                </div>
              </li>

              <li className="flex items-start gap-2">
                <span className="text-2xl">⚡</span>
                <div>
                  <strong>Magic Power-Ups:</strong> Collect scrolls to:
                  <ul className="list-disc list-inside ml-6 mt-2">
                    <li>⏳ +30 Seconds Time Scroll</li>
                    <li>⏩ Question Skip Crystal</li>
                    <li>✨ Double Points Potion</li>
                  </ul>
                </div>
              </li>

              <li className="flex items-start gap-2">
                <span className="text-2xl">⏳</span>
                <div>
                  <strong>Time Challenge:</strong> Answer in
                  <span className="text-blue-500"> 30 seconds</span> or the
                  dragon burns your answer scroll! 🔥
                </div>
              </li>
            </ol>
          </div>

          <p className="text-xl font-medieval text-center mt-6 text-amber-800">
            Survive all {quizData.length} challenges to save the kingdom! 💎
          </p>
        </div>

        <div className="p-8 pt-4 border-t border-amber-200">
          <button
            onClick={onClose}
            className="w-full py-2 cursor-pointer bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            Begin Quest! ⚔️
          </button>
        </div>
      </div>
    </div>
  );
};

export default RulesModal;
