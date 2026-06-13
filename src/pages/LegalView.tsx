import { legalPages, faqs } from "../data/content";
import { SEO } from "../components/SEO";

interface LegalViewProps {
  page: "about" | "contact" | "privacy" | "terms" | "faq" | "disclaimer";
}

export function LegalView({ page }: LegalViewProps) {
  if (page === "faq") {
    return (
      <div className="max-w-3xl mx-auto space-y-8">
        <SEO 
          title="Frequently Asked Questions" 
          description="Find answers to common questions about our free QR code generator and tools."
          url={`${window.location.origin}/faq`}
          schema={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          }}
        />
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-slate-600">Everything you need to know about our tools.</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-lg text-slate-900 mb-2">{faq.question}</h3>
              <p className="text-slate-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const content = legalPages[page as keyof typeof legalPages];

  return (
    <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl p-8 md:p-12 shadow-sm">
      <SEO 
        title={content.title} 
        description={`${content.title} for QRGenius Tools. Read about our policies and terms.`}
        url={`${window.location.origin}/${page === 'terms' ? 'terms-conditions' : page === 'privacy' ? 'privacy-policy' : page + '-us'}`}
      />
      <h1 className="text-3xl font-bold text-slate-900 mb-8">{content.title}</h1>
      <div className="prose prose-slate max-w-none">
        <p className="text-lg leading-relaxed text-slate-700">{content.content}</p>
        
        {page === "privacy" && (
          <ul className="mt-6 space-y-2 text-slate-700">
            <li><strong>Data Collection:</strong> We do not store input data.</li>
            <li><strong>Cookies:</strong> Analytics tools may set cookies to track behavior.</li>
            <li><strong>Third Party:</strong> We embed some third-party libraries but respect your data.</li>
          </ul>
        )}

        {page === "terms" && (
          <ul className="mt-6 space-y-2 text-slate-700">
            <li>Usage of tools is at your own risk.</li>
            <li>Do not automate requests abusively.</li>
            <li>We have the right to revoke access or block IPs.</li>
          </ul>
        )}
      </div>
    </div>
  );
}
