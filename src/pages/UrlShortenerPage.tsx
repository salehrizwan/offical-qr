import { useState } from "react";
import { Link2, Copy, Check, Scissors } from "lucide-react";
import { SEO } from "../components/SEO";

export function UrlShortenerPage() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const shorten = () => {
    if (!longUrl || !longUrl.startsWith("http")) {
      alert("Please enter a valid URL starting with http:// or https://");
      return;
    }
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const hash = Math.random().toString(36).substring(2, 8);
      setShortUrl(`https://qrg.link/${hash}`);
      setLoading(false);
    }, 800);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-8 max-w-2xl mx-auto">
      <SEO 
        title="URL Shortener" 
        description="Instantly generate short, shareable links from long URLs. Simple and free URL shortener tool."
        keywords="url shortener, link shortener, shorten link, create short url"
        url={`${window.location.origin}/url-shortener`}
      />
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Scissors className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">URL Shortener</h1>
        <p className="text-slate-600">Paste your long URLs below to instantly generate a short, shareable link.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Paste Long URL</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Link2 className="h-5 w-5 text-slate-400" />
            </div>
            <input 
              type="url" 
              value={longUrl} 
              onChange={e => setLongUrl(e.target.value)}
              className="w-full pl-11 pr-4 py-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-lg"
              placeholder="https://your-very-long-url.com/path"
            />
          </div>
        </div>

        <button 
          onClick={shorten}
          disabled={loading || !longUrl}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white rounded-xl font-semibold transition-colors flex justify-center items-center gap-2 text-lg"
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </button>
      </div>

      {shortUrl && (
        <div className="pt-8 border-t border-slate-200 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <label className="block text-sm font-medium text-green-700 font-semibold">Your shortened link is ready!</label>
          <div className="flex items-center justify-between gap-4 bg-green-50 p-4 border border-green-200 rounded-xl">
            <span className="font-medium text-green-900 truncate flex-1">{shortUrl}</span>
            <button 
              onClick={copyToClipboard}
              className="px-4 py-2 bg-white border border-green-300 text-green-700 rounded-lg font-medium hover:bg-green-100 flex items-center gap-2 shrink-0 transition-colors"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}

      <div className="pt-8 border-t border-slate-200 mt-8 prose prose-slate max-w-none text-sm">
        <h2>Free Clean URL Shortener Tool</h2>
        <p>Long, messy URLs are difficult to share and look unprofessional in emails or social media. Paste any extended website link into our URL shortener to instantly generate a compact, clean hyperlink. By using short links, you optimize your click-through rates and preserve valuable character limits on platforms like Twitter and SMS.</p>
      </div>
    </div>
  );
}
