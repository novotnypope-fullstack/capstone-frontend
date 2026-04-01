import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';

export function FacultyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { faculty, departments } = useData();

  const facultyMember = faculty.find((f) => f.id === id);
  const department = facultyMember
    ? departments.find((d) => d.id === facultyMember.departmentId)
    : null;

  if (!facultyMember) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-[#1e293b] mb-4">Faculty member not found</h1>
          <button
            onClick={() => navigate('/faculty')}
            className="px-4 py-2 bg-[#1e40af] text-white rounded hover:bg-[#1e3a8a] transition-colors"
          >
            Back to Faculty List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="max-w-[600px] mx-auto px-4 py-12">
        <button
          onClick={() => navigate('/faculty')}
          className="flex items-center gap-2 text-[#0891b2] hover:text-[#0e7490] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Faculty List
        </button>

        <div className="text-center mb-8">
          <img
            src={facultyMember.profileImageUrl}
            alt={facultyMember.name}
            className="w-[250px] h-[250px] rounded-full object-cover mx-auto mb-6"
          />
          <h1 className="text-3xl text-[#1e293b] mb-2">{facultyMember.name}</h1>
          {department && (
            <button
              onClick={() => navigate(`/department/${department.id}`)}
              className="text-[#0891b2] hover:text-[#0e7490] transition-colors mb-2"
            >
              {department.name}
            </button>
          )}
          <p className="text-[#64748b]">{facultyMember.email}</p>
        </div>

        <div className="h-px bg-[#e2e8f0] mb-8" />

        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl text-[#1e293b] mb-4">About</h2>
          <p className="text-[#1e293b] leading-relaxed whitespace-pre-line mb-6">
            {facultyMember.bio}
          </p>

          {department && (
            <button
              onClick={() => navigate(`/department/${department.id}`)}
              className="flex items-center gap-2 px-5 py-2 bg-[#0891b2] text-white rounded hover:bg-[#0e7490] transition-colors"
            >
              View Department
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
