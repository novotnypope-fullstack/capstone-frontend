import { useNavigate } from 'react-router';
import { useData } from '../context/DataContext';

export function HomePage() {
  const { departments } = useData();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="bg-[#1e40af] text-white py-16 px-4">
        <div className="max-w-[1200px] mx-auto text-center">
          <h1 className="text-4xl mb-3">Fullstack University</h1>
          <p className="text-xl opacity-90">Department & Faculty Directory</p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => (
            <div
              key={dept.id}
              onClick={() => navigate(`/department/${dept.id}`)}
              className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
            >
              <img
                src={dept.bannerUrl}
                alt={dept.name}
                className="w-full h-[169px] object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl mb-2 text-[#1e293b]">{dept.name}</h2>
                <p className="text-[#64748b] text-sm mb-3 line-clamp-3">
                  {dept.description}
                </p>
                <div className="text-sm text-[#64748b] space-y-1">
                  <p>{dept.email}</p>
                  <p>{dept.phone}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
