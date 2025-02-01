import { useState, useEffect } from "react";
import Modal from "./Modal";

// Quiz.jsx
const Quiz = ({
  data,
  onAnswerSelect,
  handleNextQuestion,
  answerSubmitted,
  timeLeft,
  setIsTimerFrozen,
  handleStartQuiz,
  setFeedback,
  isFinalQuestion,
  flipSound,
  isMuted,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAnswerClick = (isCorrect) => {
    if (answerSubmitted) return;
    setIsTimerFrozen(true);
    setSelectedAnswer(isCorrect);
    onAnswerSelect(isCorrect);
  };

  return (
    <div className="bg-amber-50 rounded-lg p-8 max-w-2xl mx-4 shadow-xl border-4 border-amber-700 animate-fade-in">
      <h2 className="text-2xl font-medieval text-amber-800 mb-6">
        📜 {data.description}
      </h2>

      <div className="grid gap-4">
        {data.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(option.is_correct)}
            disabled={answerSubmitted || timeLeft <= 0}
            className={`p-4 text-left cursor-pointer text-amber-900 rounded-lg transition-all border-2 ${
              selectedAnswer !== null
                ? option.is_correct
                  ? "bg-green-100 border-green-600"
                  : "bg-red-100 border-red-600"
                : "bg-amber-100 hover:bg-amber-200 border-amber-500 hover:border-amber-600"
            } ${
              answerSubmitted && index === data.correctAnswer
                ? "animate-bounce"
                : ""
            }`}
          >
            {option.description}
          </button>
        ))}
      </div>

      {(answerSubmitted || timeLeft <= 0) && (
        <>
          <div className="flex flex-col gap-4 mt-6 sm:flex-row sm:right-0">
            {timeLeft <= 0 ? (
              <button
                onClick={handleStartQuiz}
                className="w-full bg-amber-700 cursor-pointer hover:bg-amber-800 text-white font-bold py-3 px-6 rounded-lg 
                transform transition-all duration-200 hover:scale-105 shadow-lg"
              >
                🗡️ Try Again
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    setIsModalOpen(true);
                    !isMuted ? flipSound.play() : null;
                  }}
                  className="flex-1 bg-amber-700 hover:bg-amber-800 text-white cursor-pointer font-bold py-3 px-6 rounded-lg 
                  transform transition-all duration-200 hover:scale-105 shadow-lg"
                >
                  📜 Show Explanation
                </button>
                <button
                  onClick={() => {
                    setIsTimerFrozen(false);
                    setSelectedAnswer(null);
                    handleNextQuestion();
                    setFeedback("");
                  }}
                  className="flex-1 bg-amber-700 hover:bg-amber-800 text-white cursor-pointer font-bold py-3 px-6 rounded-lg 
                  transform transition-all duration-200 hover:scale-105 shadow-lg"
                >
                  {isFinalQuestion ? "🏆 Complete Quest" : "⚔️ Next Challenge"}
                </button>
              </>
            )}
          </div>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <div className="bg-amber-50 p-6 rounded-lg border-4 border-amber-700">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  !isMuted ? flipSound.play() : null;
                }}
                className="absolute cursor-pointer right-12 font-bold top-12 text-amber-700 hover:text-amber-800 text-xl"
              >
                ✕
              </button>
              <h3 className="text-2xl font-medieval text-amber-800 mb-4">
                📚 Ancient Knowledge
              </h3>
              <div className="prose prose-lg max-w-none text-amber-900">
                {data.detailed_solution.split("**").map((text, index) => {
                  if (index % 2 === 1) {
                    return <strong key={index}>{text}</strong>;
                  }
                  return (
                    <span key={index}>
                      {text
                        .split("*")
                        .map((item, idx) =>
                          idx % 2 === 1 ? <em key={idx}>{item}</em> : item
                        )}
                    </span>
                  );
                })}
              </div>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};

// ResultScreen.jsx

export default Quiz;
