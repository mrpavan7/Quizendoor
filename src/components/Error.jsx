// components/Error.jsx
const Error = ({ message, onRetry }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-900 to-amber-700 p-4">
      <div className="bg-amber-50 rounded-lg p-8 max-w-md w-full text-center border-4 border-amber-700 shadow-xl">
        <div className="text-6xl mb-4">🐉</div>
        <h2 className="text-2xl font-medieval text-red-700 mb-4">
          The Dragon's Magic Interferes!
        </h2>
        <p className="text-amber-900 mb-6 font-medieval">{message}</p>

        <div className="bg-amber-100 rounded-lg p-4 mb-6 border-2 border-amber-600">
          <p className="text-amber-800 text-sm">
            The royal wizards suggest checking your mystical connection to the
            realm (internet) or summoning a fresh scroll (refreshing the page)
          </p>
        </div>

        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-amber-700 hover:bg-amber-800 text-white font-medieval cursor-pointer py-3 px-6 rounded-lg 
            transform transition-all duration-200 hover:scale-105 shadow-lg border-2 border-amber-800"
          >
            🗡️ Try Another Quest
          </button>
        )}
      </div>
    </div>
  );
};

export default Error;
