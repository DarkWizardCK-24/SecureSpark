import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { Player } from '@lottiefiles/react-lottie-player';
import PasswordInput from './components/PasswordInput';
import StrengthIndicator from './components/StrengthIndicator';
import ConditionIndicator from './components/ConditionIndicator';
import CopyButton from './components/CopyButton';
import { calculateEntropy, getStrengthInfo, checkConditions } from './utils/passwordEntropy';

function App() {
  const [password, setPassword] = useState('');
  const [entropy, setEntropy] = useState(0);
  const [strengthInfo, setStrengthInfo] = useState({});
  const [conditions, setConditions] = useState({
    lowercase: false,
    uppercase: false,
    digit: false,
    special: false,
    extended: false,
  });
  const [isSplash, setIsSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handlePasswordChange = (value) => {
    setPassword(value);
    const entropyValue = calculateEntropy(value);
    setEntropy(entropyValue);
    setStrengthInfo(getStrengthInfo(entropyValue));
    setConditions(checkConditions(value));
  };

  if (isSplash) {
    return (
      <div className="min-h-screen bg-cover bg-center bg-[url('./assets/lock_background.png')] bg-opacity-30 flex items-center justify-center">
        <div className=" p-8 rounded-2xl text-center">
          <h1 className="text-5xl font-bold text-white mt-4">🔒SecureSpark</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cover bg-center bg-[url('./assets/background.png')] bg-opacity-60 flex items-center justify-center p-4">
      <div className="bg-black/40 backdrop-blur-lg p-6 rounded-2xl w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        <Player
          autoplay
          loop
          src="/src/assets/lock.json"
          className="w-1/3 max-w-[150px] mx-auto mb-4"
        />
        <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6">Secure Your Password</h1>
        <PasswordInput password={password} onChange={handlePasswordChange} />
        <StrengthIndicator entropy={entropy} strengthInfo={strengthInfo} />
        <h2 className="text-lg sm:text-xl font-semibold text-white mt-6 mb-2">Password Requirements</h2>
        <div className="space-y-2">
          <ConditionIndicator condition="Lowercase Letters" isMet={conditions.lowercase} icon="fas fa-a" />
          <ConditionIndicator condition="Uppercase Letters" isMet={conditions.uppercase} icon="fas fa-font" />
          <ConditionIndicator condition="Numbers" isMet={conditions.digit} icon="fas fa-hashtag" />
          <ConditionIndicator condition="Special Characters" isMet={conditions.special} icon="fas fa-star" />
          <ConditionIndicator condition="Extended Characters" isMet={conditions.extended} icon="fas fa-copyright" />
        </div>
        <CopyButton password={password} />
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar
          theme="dark"
          toastStyle={{ backgroundColor: '#2ECC71', color: '#000' }}
        />
      </div>
    </div>
  );
}

export default App;
