function ConditionIndicator({ condition, isMet, icon }) {
  return (
    <div className="bg-gradient-to-br from-black/50 to-black/30 rounded-2xl p-px">
      <div className="flex items-center p-3 rounded-2xl">
        <i
          className={`fas ${isMet ? 'fa-check-circle' : 'fa-circle'} mr-3 text-sm ${isMet ? 'text-green-accent' : 'text-gray-600'}`}
        ></i>
        <i className={`${icon} mr-3 text-sm ${isMet ? 'text-white' : 'text-gray-600'}`}></i>
        <span className={`text-sm ${isMet ? 'text-white font-bold' : 'text-gray-500'}`}>
          {condition}
        </span>
      </div>
    </div>
  );
}

export default ConditionIndicator;