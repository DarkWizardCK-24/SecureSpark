import { toast } from 'react-toastify';

function CopyButton({ password }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    toast.success('Password copied to clipboard!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: true,
    });
  };

  return (
    <button
      onClick={handleCopy}
      disabled={!password}
      className={`w-full py-3 rounded-2xl bg-green-accent text-black font-semibold hover:bg-green-400 transition disabled:opacity-50 disabled:cursor-not-allowed mt-4`}
    >
      <i className="fas fa-copy mr-2"></i>Copy Password
    </button>
  );
}

export default CopyButton;