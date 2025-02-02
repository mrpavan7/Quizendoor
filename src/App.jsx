import { useState, useEffect } from "react";
import axios from "axios";
import StartScreen from "./components/StartScreen";
import Quiz from "./components/Quiz";
import ResultScreen from "./components/ResultScreen";
import Loading from "./components/Loading";
import Error from "./components/Error";
import { Howl } from "howler";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import RulesModal from "./components/RulesModal";
import Toast from "./components/Toast";
import SoundToggle from "./SoundToggle ";
import dragon from "/dragon4.png";

// Sound effects
const sounds = {
  correct: new Howl({
    src: ["/sounds/correct.mp3"],
    html5: true,
    preload: true,
    onloaderror: (id, err) => {
      console.error("Error loading correct sound:", err);
    },
  }),
  wrong: new Howl({
    src: ["/sounds/wrong.mp3"],
    html5: true,
    preload: true,
  }),
  powerup: new Howl({
    src: ["/sounds/powerup.mp3"],
    html5: true,
    preload: true,
  }),
  timer: new Howl({
    src: ["/sounds/timer.mp3"],
    html5: true,
    preload: true,
  }),
  victory: new Howl({
    // New sound for final results
    src: ["/sounds/victory.mp3"],
    html5: true,
    preload: true,
  }),
  start: new Howl({
    // New sound for final results
    src: ["/sounds/start.mp3"],
    html5: true,
    preload: true,
  }),
  flip: new Howl({
    // New sound for final results
    src: ["/sounds/flip.mp3"],
    html5: true,
    preload: true,
  }),
};

function App() {
  const { width, height } = useWindowSize();
  const [quizData, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [powerUps, setPowerUps] = useState({
    extraTime: 1,
    skipQuestion: 1,
    doublePoints: 1,
    doublePointsActive: false,
  });
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [shake, setShake] = useState(false);
  const [isTimerFrozen, setIsTimerFrozen] = useState(false);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [incorrectAnswersCount, setIncorrectAnswersCount] = useState(0);
  const [skippedQuestions, setSkippedQuestions] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [isMuted, setIsMuted] = useState(false);

  const fetchQuizData = async () => {
    const API_URL = "https://api.jsonserve.com/Uw5CrX";
    const CORS_PROXY = "https://api.allorigins.win/get?url=";

    try {
      const response = await axios.get(
        `${CORS_PROXY}${encodeURIComponent(API_URL)}`
      );
      const data = JSON.parse(response.data.contents);
      setQuizData(shuffleArray(data.questions));
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  //fetching the questions for the quiz on app load
  useEffect(() => {
    fetchQuizData();
  }, []);

  //countdown logic
  useEffect(() => {
    let timer;
    if (quizStarted && !quizCompleted && lives > 0 && !isTimerFrozen) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 5 && prev > 0 && !isMuted) sounds.timer.play();
          return prev > 0 ? prev - 1 : 0;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [quizStarted, quizCompleted, lives, isTimerFrozen]);

  //executes when the timer runs out
  useEffect(() => {
    if (timeLeft === 0 && !answerSubmitted) {
      handleWrongAnswer();
      setFeedback("The Dragon's flames consumed your time! ⏰🔥");
      setAnswerSubmitted(true);
    }
  }, [timeLeft]);

  //power-up when the user gives three Consecutive correct answers
  useEffect(() => {
    if (streak > 0 && streak % 3 === 0) {
      setPowerUps((prev) => ({
        ...prev,
        doublePoints: prev.doublePoints + 1,
        extraTime: prev.extraTime + 1,
        skipQuestion: prev.skipQuestion + 1,
      }));
      showToast("The Dragon hoards new power-ups! ✨📜⚡", "powerup");
    }
  }, [streak]);

  const handleError = (err) => {
    setError(
      "The kingdom's scrolls are temporarily unavailable. Try again, brave warrior!"
    );
  };

  const showToast = (message, type = "default") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  //to shuffle the questions each time app loads
  const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

  const handleStartQuiz = () => {
    !isMuted ? sounds.start.play() : null;
    setQuizStarted(true);
    setQuizCompleted(false);
    setCurrentQuestion(0);
    setScore(0);
    setLives(3);
    setStreak(0);
    setTimeLeft(30);
    setPowerUps({
      extraTime: 1,
      skipQuestion: 1,
      doublePoints: 1,
      doublePointsActive: false,
    });
    setAnswerSubmitted(false);
    setIsTimerFrozen(false);
    setFeedback("");
    setShake(false);
    setCorrectAnswersCount(0);
    setIncorrectAnswersCount(0);
    setSkippedQuestions([]);
  };

  const showRules = () => {
    handleStartQuiz();
    setShowRulesModal(true);
    setIsTimerFrozen(true);
  };

  const goBackToHome = () => {
    setQuizStarted(false);
    setQuizCompleted(false);
    setCurrentQuestion(0);
    setScore(0);
    setLives(3);
    setStreak(0);
    setTimeLeft(30);
    setPowerUps({
      extraTime: 1,
      skipQuestion: 1,
      doublePoints: 1,
      doublePointsActive: false,
    });
    setAnswerSubmitted(false);
    setIsTimerFrozen(false);
    setFeedback("");
    setShake(false);
  };

  const handleAnswerSelect = (isCorrect) => {
    if (answerSubmitted) return;
    setAnswerSubmitted(true);
    setIsTimerFrozen(true);

    if (isCorrect) {
      setCorrectAnswersCount((prev) => prev + 1);
      !isMuted ? sounds.correct.play() : null;
      const basePoints = 100 + streak * 50;
      const finalPoints = powerUps.doublePointsActive
        ? basePoints * 2
        : basePoints;
      setScore((prev) => prev + finalPoints);
      setStreak((prev) => prev + 1);
      showToast(`${finalPoints} gold coins earned! 💰`, "success");
    } else {
      handleWrongAnswer();
    }
  };

  const handleWrongAnswer = () => {
    !isMuted ? sounds.wrong.play() : null;
    setShake(true);
    setLives((prev) => prev - 1);
    setStreak(0);
    setIncorrectAnswersCount((prev) => prev + 1);
    showToast("The Dragon's knowledge proves superior! 🐉", "error");
    setTimeout(() => setShake(false), 500);
  };

  const moveToNextQuestion = () => {
    if (currentQuestion < quizData.length - 1 && lives > 0) {
      setCurrentQuestion((prev) => prev + 1);
      setTimeLeft(30);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleNextQuestion = () => {
    setAnswerSubmitted(false);
    setIsTimerFrozen(false);
    setTimeLeft(30);
    if (currentQuestion < quizData.length - 1 && lives > 0) {
      setCurrentQuestion((prev) => prev + 1);
      setTimeLeft(30);
    } else {
      setQuizCompleted(true);
      !isMuted ? sounds.victory.play() : null;
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 4100);
    }
  };

  const usePowerUp = (type) => {
    if (powerUps[type] > 0) {
      !isMuted ? sounds.powerup.play() : null;
      setPowerUps((prev) => ({
        ...prev,
        [type]: prev[type] - 1,
        ...(type === "doublePoints" ? { doublePointsActive: true } : {}),
      }));

      switch (type) {
        case "extraTime":
          setTimeLeft((prev) => prev + 30);
          showToast("⏳ Time magic flows through you!", "powerup");
          break;
        case "skipQuestion":
          setSkippedQuestions((prev) => [...prev, quizData[currentQuestion]]);
          moveToNextQuestion();
          showToast("The mystical portal opens! ⚡", "powerup");
          break;
        case "doublePoints":
          showToast("✨ Golden aura surrounds you!", "powerup");
          setTimeout(() => {
            setPowerUps((prev) => ({
              ...prev,
              doublePointsActive: false,
            }));
          }, 15000);
          break;
      }
    }
  };

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    fetchQuizData();
  };

  const toggleSound = () => {
    setIsMuted(!isMuted);
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={handleRetry} />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-900 to-amber-700 p-4">
      {showConfetti && <Confetti width={width} height={height} />}

      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>

      <div className="max-w-2xl mx-auto py-8">
        {quizStarted && showRulesModal && (
          <RulesModal
            quizData={quizData}
            onClose={() => {
              setShowRulesModal(false);
              setIsTimerFrozen(false);
            }}
          />
        )}
        {!quizStarted ? (
          <StartScreen onStart={showRules} />
        ) : quizCompleted ? (
          <ResultScreen
            score={score}
            totalQuestions={quizData.length}
            correctAnswers={correctAnswersCount}
            incorrectAnswers={incorrectAnswersCount}
            skippedQuestions={skippedQuestions}
            onRestart={handleStartQuiz}
            onHome={goBackToHome}
          />
        ) : lives > 0 ? (
          <div className={`space-y-6 ${shake ? "animate-shake" : ""}`}>
            <div className="w-full flex justify-between px-2">
              <button
                onClick={goBackToHome}
                className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white cursor-pointer font-bold rounded-lg 
                transform transition-all duration-200 hover:scale-105 shadow-lg"
              >
                🏰 Return to Castle
              </button>
              <SoundToggle isMuted={isMuted} toggleSound={toggleSound} />
            </div>
            <div className="flex justify-between flex-col sm:flex-row items-center bg-amber-50 p-4 rounded-lg border-4 border-amber-700">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="bg-red-100 text-red-900 px-4 py-2 rounded-lg font-medieval">
                  {Array.from({ length: lives }).map((_, i) => (
                    <span key={i}>❤️</span>
                  ))}
                </div>
                <div className="bg-amber-100 text-md sm:text-lg text-amber-900 px-4 py-2 rounded-lg font-medieval">
                  🔥 Battle Streak: {streak}
                </div>
                <div className="bg-blue-100 text-blue-900 px-4 py-2 rounded-lg font-medieval">
                  ⏳ {timeLeft}s
                </div>
              </div>
              <div className="text-lg sm:text-2xl pl-0 sm:pl-3 pt-5 sm:pt-0 font-medieval text-amber-900">
                💰 {score} gold
              </div>
            </div>

            <div className="bg-amber-200 h-4 rounded-full overflow-hidden border-2 border-amber-700">
              <div
                className="h-full bg-amber-600 transition-all duration-1000"
                style={{
                  width: `${((currentQuestion + 1) / quizData.length) * 100}%`,
                }}
              />
            </div>

            <div className="flex gap-4 flex-col sm:flex-row w-full items-center justify-center mb-6">
              <button
                onClick={() => usePowerUp("extraTime")}
                disabled={powerUps.extraTime === 0}
                className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg 
             font-medieval disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer
             border-2 border-green-900 hover:scale-105"
              >
                <span className="text-xl">⏳</span>
                Time Scroll ({powerUps.extraTime})
              </button>

              <button
                onClick={() => usePowerUp("skipQuestion")}
                disabled={powerUps.skipQuestion === 0}
                className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg 
             font-medieval disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer
             border-2 border-blue-900 hover:scale-105"
              >
                <span className="text-xl">⚡</span>
                Skip Crystal ({powerUps.skipQuestion})
              </button>

              <button
                onClick={() => usePowerUp("doublePoints")}
                disabled={powerUps.doublePoints === 0}
                className="flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-lg 
             font-medieval disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer
             border-2 border-purple-900 hover:scale-105"
              >
                <span className="text-xl">✨</span>
                Double Gold ({powerUps.doublePoints})
              </button>
            </div>

            <Quiz
              data={quizData[currentQuestion]}
              onAnswerSelect={handleAnswerSelect}
              handleNextQuestion={handleNextQuestion}
              answerSubmitted={answerSubmitted}
              timeLeft={timeLeft}
              setIsTimerFrozen={setIsTimerFrozen}
              handleStartQuiz={handleStartQuiz}
              setFeedback={setFeedback}
              isFinalQuestion={currentQuestion === quizData.length - 1}
              isMuted={isMuted}
              flipSound={sounds.flip}
            />

            {feedback && (
              <div className="text-center text-xl font-medieval text-amber-100 animate-pulse">
                {feedback}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-amber-50 rounded-lg p-8 border-4 border-amber-700 text-center space-y-6">
            <div className="w-full flex justify-center">
              <img src={dragon} className="h-48" alt="" />
            </div>
            <h2 className="text-4xl font-medieval text-red-600">
              The Dragon Prevails! 🐉
            </h2>
            <p className="text-2xl font-medieval text-amber-900">
              You collected {score} gold coins in your quest
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleStartQuiz}
                className="bg-amber-700 hover:bg-amber-800 text-white font-bold cursor-pointer py-3 px-6 rounded-lg 
                  transform transition-all duration-200 hover:scale-105 shadow-lg"
              >
                🗡️ Begin New Quest
              </button>
              <button
                onClick={goBackToHome}
                className="bg-amber-700 hover:bg-amber-800 text-white font-bold cursor-pointer py-3 px-6 rounded-lg 
                  transform transition-all duration-200 hover:scale-105 shadow-lg"
              >
                🏰 Return to Castle
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
