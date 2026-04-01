import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useData } from '../context/DataContext';
import { ConfirmDialog } from '../components/ConfirmDialog';

type Tab = 'departments' | 'faculty';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('departments');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: string; name: string; type: Tab } | null>(
    null
  );

  const { departments, faculty, deleteDepartment, deleteFaculty } = useData();
  const navigate = useNavigate();

  const handleDeleteClick = (id: string, name: string, type: Tab) => {
    setItemToDelete({ id, name, type });
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!itemToDelete) return;

    if (itemToDelete.type === 'departments') {
      deleteDepartment(itemToDelete.id);
      toast.success('Department deleted successfully');
    } else {
      deleteFaculty(itemToDelete.id);
      toast.success('Faculty member deleted successfully');
    }

    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <h1 className="text-3xl text-[#1e293b] mb-8">Admin Panel</h1>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('departments')}
            className={`px-6 py-3 rounded transition-colors ${
              activeTab === 'departments'
                ? 'bg-[#1e40af] text-white'
                : 'bg-white text-[#1e293b] hover:bg-[#f8fafc]'
            }`}
          >
            Manage Departments
          </button>
          <button
            onClick={() => setActiveTab('faculty')}
            className={`px-6 py-3 rounded transition-colors ${
              activeTab === 'faculty'
                ? 'bg-[#1e40af] text-white'
                : 'bg-white text-[#1e293b] hover:bg-[#f8fafc]'
            }`}
          >
            Manage Faculty
          </button>
        </div>

        {activeTab === 'departments' ? (
          <div>
            <button
              onClick={() => navigate('/admin/department/new')}
              className="flex items-center gap-2 px-5 py-3 bg-[#22c55e] text-white rounded hover:bg-[#16a34a] transition-colors mb-6"
            >
              <Plus className="w-5 h-5" />
              Add New Department
            </button>

            <div className="space-y-4">
              {departments.map((dept) => (
                <div
                  key={dept.id}
                  className="bg-white rounded-lg shadow-sm p-5 flex items-center justify-between hover:shadow-md transition-shadow border border-[#e2e8f0]"
                >
                  <div>
                    <h3 className="text-lg text-[#1e293b] mb-1">{dept.name}</h3>
                    <p className="text-sm text-[#64748b]">{dept.email}</p>
                    <p className="text-sm text-[#64748b]">{dept.phone}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/admin/department/${dept.id}`)}
                      className="px-4 py-2 bg-[#f8fafc] text-[#1e293b] rounded hover:bg-[#e2e8f0] transition-colors flex items-center gap-2"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(dept.id, dept.name, 'departments')}
                      className="px-4 py-2 bg-[#f8fafc] text-[#ef4444] rounded hover:bg-[#fee2e2] transition-colors flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}

              {departments.length === 0 && (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                  <p className="text-[#64748b]">No departments available. Add one to get started!</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <button
              onClick={() => navigate('/admin/faculty/new')}
              className="flex items-center gap-2 px-5 py-3 bg-[#22c55e] text-white rounded hover:bg-[#16a34a] transition-colors mb-6"
            >
              <Plus className="w-5 h-5" />
              Add New Faculty Member
            </button>

            <div className="space-y-4">
              {faculty.map((fac) => {
                const dept = departments.find((d) => d.id === fac.departmentId);
                return (
                  <div
                    key={fac.id}
                    className="bg-white rounded-lg shadow-sm p-5 flex items-center justify-between hover:shadow-md transition-shadow border border-[#e2e8f0]"
                  >
                    <div>
                      <h3 className="text-lg text-[#1e293b] mb-1">{fac.name}</h3>
                      <p className="text-sm text-[#64748b]">{fac.email}</p>
                      <p className="text-sm text-[#0891b2]">{dept?.name}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/admin/faculty/${fac.id}`)}
                        className="px-4 py-2 bg-[#f8fafc] text-[#1e293b] rounded hover:bg-[#e2e8f0] transition-colors flex items-center gap-2"
                      >
                        <Pencil className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(fac.id, fac.name, 'faculty')}
                        className="px-4 py-2 bg-[#f8fafc] text-[#ef4444] rounded hover:bg-[#fee2e2] transition-colors flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}

              {faculty.length === 0 && (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                  <p className="text-[#64748b]">
                    No faculty members available. Add one to get started!
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        description={`Are you sure you want to delete ${itemToDelete?.name}? This action cannot be undone.`}
      />
    </div>
  );
}
