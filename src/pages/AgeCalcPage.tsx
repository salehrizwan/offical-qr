import { useState } from "react";
import { Calendar } from "lucide-react";
import { SEO } from "../components/SEO";

export function AgeCalcPage() {
  const [dob, setDob] = useState("");
  const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);

  const calculateAge = () => {
    if (!dob) return;
    const birthDate = new Date(dob);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setAge({ years, months, days });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-8 max-w-2xl mx-auto">
      <SEO 
        title="Age Calculator" 
        description="Accurately calculate your exact age in years, months, and days online for free."
        keywords="age calculator, calculate age, exact age calculator, check age"
        url={`${window.location.origin}/age-calculator`}
      />
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Age Calculator</h1>
        <p className="text-slate-600">Calculate your exact age in years, months, and days.</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Date of Birth</label>
          <input 
            type="date" 
            value={dob}
            onChange={e => {
              setDob(e.target.value);
              setAge(null);
            }}
            max={new Date().toISOString().split("T")[0]}
            className="w-full px-4 py-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-lg"
          />
        </div>

        <button 
          onClick={calculateAge}
          disabled={!dob}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white rounded-xl font-semibold transition-colors text-lg"
        >
          Calculate
        </button>
      </div>

      {age && (
        <div className="pt-8 border-t border-slate-200 grid grid-cols-3 gap-4 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
            <div className="text-3xl font-bold text-blue-600 mb-1">{age.years}</div>
            <div className="text-sm font-medium text-blue-800">Years</div>
          </div>
          <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
            <div className="text-3xl font-bold text-indigo-600 mb-1">{age.months}</div>
            <div className="text-sm font-medium text-indigo-800">Months</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100">
            <div className="text-3xl font-bold text-purple-600 mb-1">{age.days}</div>
            <div className="text-sm font-medium text-purple-800">Days</div>
          </div>
        </div>
      )}

      <div className="pt-8 border-t border-slate-200 mt-8 prose prose-slate max-w-none text-sm">
        <h2>How to Calculate Your Exact Age</h2>
        <p>Our chronological age calculator evaluates your birth date against today's current date to determine exactly how many years, months, and days you have been alive. This tool handles the nuanced complexities of leap years and varying month lengths automatically to guarantee an accurate result every time.</p>
      </div>
    </div>
  );
}
