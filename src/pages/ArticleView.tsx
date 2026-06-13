import { useParams, Link } from "react-router-dom";
import { articles } from "../data/articles";
import { ArrowLeft, Calendar } from "lucide-react";
import Markdown from "react-markdown";
import { SEO } from "../components/SEO";

export function ArticleView() {
  const { slug } = useParams();
  const article = articles.find(a => a.slug === slug);

  if (!article) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Article Not Found</h2>
        <Link to="/articles" className="text-blue-600 hover:underline flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Articles
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 md:p-12 shadow-sm">
      <SEO 
        title={article.title} 
        description={article.excerpt}
        url={`${window.location.origin}/article/${article.slug}`}
      />
      <Link to="/articles" className="text-slate-500 hover:text-blue-600 inline-flex items-center text-sm font-medium mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Articles
      </Link>
      
      <div className="mb-10">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-4 font-medium">
          <Calendar className="w-4 h-4" />
          <span>{article.date}</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
          {article.title}
        </h1>
      </div>

      <div className="prose prose-slate prose-blue max-w-none md:prose-lg prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-700">
        <Markdown>{article.content}</Markdown>
      </div>
      
      <div className="mt-16 pt-8 border-t border-slate-200 text-center">
         <Link to="/" className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors">
            Generate a free QR Code now
         </Link>
      </div>
    </div>
  );
}
