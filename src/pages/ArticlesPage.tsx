import { Link } from "react-router-dom";
import { articles } from "../data/articles";
import { Calendar, ChevronRight } from "lucide-react";
import { SEO } from "../components/SEO";

export function ArticlesPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <SEO 
        title="Articles & Resources" 
        description="Learn everything you need to know about QR codes, marketing strategies, and productivity tools in our blog."
        keywords="qr code blog, qr code tutorials, qr code marketing"
        url={`${window.location.origin}/articles`}
      />
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Articles & Resources</h1>
        <p className="text-lg text-slate-600">
          Learn everything you need to know about QR codes, marketing strategies, and productivity tools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article) => (
          <Link 
            key={article.slug} 
            to={`/article/${article.slug}`}
            className="group bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:border-blue-300 transition-all block relative"
          >
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
              <Calendar className="w-4 h-4" />
              <span>{article.date}</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
              {article.title}
            </h2>
            <p className="text-slate-600 mb-6 line-clamp-2">
              {article.excerpt}
            </p>
            <div className="flex items-center text-blue-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
              Read Article <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
