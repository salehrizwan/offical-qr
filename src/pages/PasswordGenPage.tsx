import { useState } from "react";
import { Copy, RefreshCw, Check } from "lucide-react";
import { SEO } from "../components/SEO";

export function PasswordGenPage() {
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    let charset = "";
    if (useUpper) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useLower) charset += "abcdefghijklmnopqrstuvwxyz";
    if (useNumbers) charset += "0123456789";
    if (useSymbols) charset += "!@#$%^&*()_+~|}{[]:;?><,./-=";

    if (!charset) {
      setPassword("Please select at least one option.");
      return;
    }

    let newPass = "";
    for (let i = 0; i < length; i++) {
      newPass += charset[Math.floor(Math.random() * charset.length)];
    }
    setPassword(newPass);
    setCopied(false);
  };

  const copyToClipboard = () => {
    if (!password || password.startsWith("Please")) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-8 max-w-2xl mx-auto">
      <SEO 
        title="Secure Password Generator" 
        description="Create strong, random passwords to keep your accounts secure. Customize password length, uppercase, lowercase, numbers, and symbols."
        keywords="password generator, strong passwords, random password creator, secure password maker"
        url={`${window.location.origin}/password-generator`}
      />
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Secure Password Generator</h1>
        <p className="text-slate-600">Create strong, random passwords to keep your accounts secure.</p>
      </div>

      <div className="bg-slate-50 p-4 sm:p-6 rounded-xl border border-slate-200">
        <div className="flex items-center justify-between gap-4">
          <div className="font-mono text-xl sm:text-2xl text-slate-800 break-all w-full min-h-[40px]">
            {password || "Click generate to create..."}
          </div>
          <button 
            onClick={copyToClipboard}
            className="p-2 sm:p-3 bg-white text-slate-600 rounded-lg hover:bg-slate-100 border border-slate-200"
            title="Copy"
          >
            {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-slate-700">Password Length</label>
            <span className="font-semibold text-blue-600">{length}</span>
          </div>
          <input 
            type="range" 
            min="6" max="64" 
            value={length} 
            onChange={e => setLength(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50">
            <input type="checkbox" checked={useUpper} onChange={e => setUseUpper(e.target.checked)} className="w-4 h-4" />
            <span className="text-sm font-medium">Uppercase (A-Z)</span>
          </label>
          <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50">
            <input type="checkbox" checked={useLower} onChange={e => setUseLower(e.target.checked)} className="w-4 h-4" />
            <span className="text-sm font-medium">Lowercase (a-z)</span>
          </label>
          <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50">
            <input type="checkbox" checked={useNumbers} onChange={e => setUseNumbers(e.target.checked)} className="w-4 h-4" />
            <span className="text-sm font-medium">Numbers (0-9)</span>
          </label>
          <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50">
            <input type="checkbox" checked={useSymbols} onChange={e => setUseSymbols(e.target.checked)} className="w-4 h-4" />
            <span className="text-sm font-medium">Symbols (!@#)</span>
          </label>
        </div>

        <button 
          onClick={generate}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors text-lg"
        >
          <RefreshCw className="w-5 h-5" /> Generate Password
        </button>
      </div>

      <div className="pt-8 border-t border-slate-200 mt-8 prose prose-slate max-w-none text-sm">
        <h2>Why You Need a Secure Password Generator</h2>
        <p>In today's digital landscape, using the same password across multiple accounts is a significant security risk. Our random password generator creates complex, hard-to-crack passphrases utilizing a mix of uppercase letters, lowercase letters, numbers, and special symbols natively in your browser.</p>
        <p><strong>Is this tool safe?</strong> Yes! All passphrases are generated entirely on your device using client-side JavaScript. We do not store, send, or monitor the passwords generated here.</p>
      </div>
    </div>
  );
}
