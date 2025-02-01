// components/ProgressBar.jsx
const ProgressBar = ({ current, total }) => {
  const progress = (current / total) * 100;

  return (
    <div className="mb-6">
      <div className="h-2 bg-gray-200 rounded-full">
        <div
          className="h-2 bg-blue-500 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="text-right text-gray-600 mt-1">
        Question {current} of {total}
      </div>
    </div>
  );
};

export default ProgressBar;
