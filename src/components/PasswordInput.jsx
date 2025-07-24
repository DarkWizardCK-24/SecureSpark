import { useState } from 'react';

function PasswordInput({ password, onChange }) {
  const [obscureText, setObscureText] = useState(true);

  return (
    <div className="relative mb-4">
      <div className="bg-gradient-to-br from-black/50 to-black/30 rounded-2xl p-px">
        <div className="relative">
          <i className="fas fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-white/70"></i>
          <input
            type={obscureText ? 'password' : 'text'}
            value={password}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter Password"
            className="w-full bg-transparent pl-10 pr-10 py-3 rounded-2xl text-white placeholder-white/50 focus:outline-none"
          />
          <button
            onClick={() => setObscureText(!obscureText)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
          >
            <i className={`fas ${obscureText ? 'fa-eye-slash' : 'fa-eye'}`}></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PasswordInput;