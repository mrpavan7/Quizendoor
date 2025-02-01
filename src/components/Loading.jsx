// components/Loading.jsx
const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-8 border-amber-200 border-b-amber-700 mx-auto"></div>
        <p className="mt-6 text-amber-800 text-xl font-medieval">
          🏰 Summoning Ancient Knowledge... ✨
        </p>
      </div>
    </div>
  );
};
export default Loading;
