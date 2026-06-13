import { useState, useRef } from "react";
import Barcode from "react-barcode";
import { Download } from "lucide-react";
import { SEO } from "../components/SEO";

export function BarcodePage() {
  const [value, setValue] = useState("123456789012");
  const [format, setFormat] = useState("CODE128");
  const [lineColor, setLineColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const barcodeRef = useRef<HTMLDivElement>(null);

  const downloadBarcode = () => {
    const svg = barcodeRef.current?.querySelector("svg");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `barcode.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-8">
      <SEO 
        title="Free Barcode Generator" 
        description="Generate standard barcodes instantly for products, inventory, and packaging. Download high-quality SVG codes for free."
        keywords="free barcode generator, create barcode, product barcode, code128 generator"
        url={`${window.location.origin}/barcode-generator`}
      />
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Barcode Generator</h1>
        <p className="text-slate-600">Create standard barcodes instantly for products, inventory, and packaging.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Barcode Value</label>
            <input 
              type="text" 
              value={value} 
              onChange={e => setValue(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-50"
              placeholder="Enter barcode characters..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Line Color</label>
              <div className="flex items-center gap-3">
                <input type="color" value={lineColor} onChange={e => setLineColor(e.target.value)} className="h-10 w-10 cursor-pointer" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Background Color</label>
              <div className="flex items-center gap-3">
                <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="h-10 w-10 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-8 rounded-2xl flex flex-col items-center justify-center border border-slate-200 min-h-[300px]">
          <div ref={barcodeRef} className="bg-white p-4 rounded-xl shadow-sm overflow-hidden mb-6 max-w-full">
            {value ? (
              <Barcode 
                value={value} 
                format={format as any} 
                lineColor={lineColor}
                background={bgColor}
                width={2}
                height={100}
                displayValue={true}
              />
            ) : (
              <p className="text-slate-400 py-8 text-center px-4">Enter a value to generate barcode</p>
            )}
          </div>
          
          <button 
            onClick={downloadBarcode}
            disabled={!value}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-xl font-medium flex items-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4" /> Download SVG
          </button>
        </div>
      </div>

      <div className="pt-8 border-t border-slate-200 mt-8 prose prose-slate max-w-none">
        <h2>Free Barcode Generator Online</h2>
        <p>Use our advanced barcode generator to create standard 1D barcodes instantly. Whether you are managing inventory, creating product packaging, or setting up a retail system, our tool supports CODE128 and other general barcode specifications perfectly suited for standard barcode scanners.</p>
        
        <h3>Why use our generator?</h3>
        <ul>
          <li><strong>Instant Creation:</strong> Type your characters and instantly see your barcode preview.</li>
          <li><strong>Customization:</strong> Change the line color and background to ensure contrast fits your brand label.</li>
          <li><strong>High Quality Export:</strong> Download in scalable SVG format so your prints stay perfectly crisp, which is critical for scanners to read.</li>
        </ul>
      </div>
    </div>
  );
}
