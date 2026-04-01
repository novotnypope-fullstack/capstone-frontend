import { useParams, useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { useData } from '../context/DataContext';

export function DepartmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { departments, faculty } = useData();

  const department = departments.find((d) => d.id === id);
  const departmentFaculty = faculty.filter((f) => f.departmentId === id);

  if (!department) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-[#1e293b] mb-4">Department not found</h1>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-[#1e40af] text-white rounded hover:bg-[#1e3a8a] transition-colors"
          >
            Back to Departments
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="max-w-[1200px] mx-auto px-4 py-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-[#0891b2] hover:text-[#0e7490] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Departments
        </button>

        <img
          src={department.bannerUrl}
          alt={department.name}
          className="w-full h-[400px] object-cover rounded-lg mb-6"
        />

        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h1 className="text-3xl text-[#1e293b] mb-2">{department.name}</h1>
          <div className="text-[#64748b] mb-6 space-y-1">
            <p>{department.email}</p>
            <p>{department.phone}</p>
          </div>
          <p className="text-[#1e293b] leading-relaxed whitespace-pre-line">
            {department.description}
          </p>
        </div>

        <h2 className="text-2xl text-[#1e293b] mb-6">
          Faculty Members ({departmentFaculty.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departmentFaculty.map((fac) => (
            <div
              key={fac.id}
              onClick={() => navigate(`/faculty/${fac.id}`)}
              className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow cursor-pointer p-6 text-center"
            >
              <img
                src={fac.profileImageUrl}
                alt={fac.name}
                className="w-[120px] h-[120px] rounded-full object-cover mx-auto mb-4"
              />
              <h3 className="text-lg text-[#1e293b] mb-1">{fac.name}</h3>
              <p className="text-sm text-[#64748b] mb-2">{fac.email}</p>
              <p className="text-sm text-[#64748b] line-clamp-2">{fac.bio}</p>
            </div>
          ))}
        </div>

        {departmentFaculty.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <p className="text-[#64748b]">No faculty members in this department yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
