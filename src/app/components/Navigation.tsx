import { Link, useLocation } from 'react-router';

export function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#1e40af] text-white shadow-md">
      <div className="max-w-[1200px] mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          FSU
        </Link>
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className={`hover:underline transition-all ${
              isActive('/') && !location.pathname.includes('admin') && !location.pathname.includes('faculty')
                ? 'underline font-semibold'
                : ''
            }`}
          >
            Departments
          </Link>
          <Link
            to="/faculty"
            className={`hover:underline transition-all ${
              isActive('/faculty') && !location.pathname.includes('admin')
                ? 'underline font-semibold'
                : ''
            }`}
          >
            Faculty
          </Link>
          <Link
            to="/admin"
            className={`hover:underline transition-all ${
              isActive('/admin') ? 'underline font-semibold' : ''
            }`}
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}
