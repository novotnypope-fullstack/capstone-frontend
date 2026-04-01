import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Search } from 'lucide-react';
import { useData } from '../context/DataContext';

export function FacultyList() {
  const [searchQuery, setSearchQuery] = useState('');
  const { faculty, departments } = useData();
  const navigate = useNavigate();

  const filteredFaculty = faculty.filter((fac) => {
    const dept = departments.find((d) => d.id === fac.departmentId);
    const searchLower = searchQuery.toLowerCase();
    return (
      fac.name.toLowerCase().includes(searchLower) ||
      dept?.name.toLowerCase().includes(searchLower) ||
      fac.email.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <h1 className="text-3xl text-[#1e293b] mb-8">Faculty Directory</h1>

        <div className="mb-8 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748b]" />
          <input
            type="text"
            placeholder="Search by name or department"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-[#e2e8f0] rounded focus:outline-none focus:border-[#0891b2] focus:border-2"
          />
        </div>

        <div className="space-y-4">
          {filteredFaculty.map((fac) => {
            const dept = departments.find((d) => d.id === fac.departmentId);
            return (
              <div
                key={fac.id}
                onClick={() => navigate(`/faculty/${fac.id}`)}
                className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow cursor-pointer p-5 flex items-center gap-5 border-b border-[#e2e8f0] last:border-b-0"
              >
                <img
                  src={fac.profileImageUrl}
                  alt={fac.name}
                  className="w-[80px] h-[80px] rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg text-[#1e293b] mb-1">{fac.name}</h3>
                  <p className="text-sm text-[#64748b] mb-1">{fac.email}</p>
                  <p className="text-sm text-[#0891b2] mb-2">{dept?.name}</p>
                  <p className="text-sm text-[#64748b] line-clamp-2">{fac.bio}</p>
                </div>
              </div>
            );
          })}
        </div>

        {filteredFaculty.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <p className="text-[#64748b]">
              {searchQuery
                ? 'No faculty members found matching your search.'
                : 'No faculty members available.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
