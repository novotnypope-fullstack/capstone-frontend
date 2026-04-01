import { useNavigate } from 'react-router';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl text-[#1e40af] mb-4">404</h1>
        <h2 className="text-2xl text-[#1e293b] mb-4">Page Not Found</h2>
        <p className="text-[#64748b] mb-8">
          The page you're looking for doesn't exist.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-5 py-3 bg-[#1e40af] text-white rounded hover:bg-[#1e3a8a] transition-colors"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
}
