function StrengthIndicator({ entropy, strengthInfo }) {
  const progress = Math.min(entropy / 100, 1);

  return (
    <div className="bg-gradient-to-br from-black/50 to-blue-900/50 p-4 rounded-2xl mb-4">
      <div className="text-white/70 mb-2">
        Entropy: {entropy.toFixed(2)} bits
      </div>
      <div className="w-full bg-gray-700/50 rounded-full h-2 mb-2">
        <div
          className="h-2 rounded-full"
          style={{
            width: `${progress * 100}%`,
            backgroundColor: strengthInfo.color,
          }}
        ></div>
      </div>
      <div
        className="text-white font-bold"
        style={{ color: strengthInfo.color }}
      >
        Strength: {strengthInfo.strength || "N/A"}
      </div>
      <div className="text-white/70">
        Crack Time: {strengthInfo.crackTime || "N/A"}
      </div>
    </div>
  );
}

export default StrengthIndicator;
