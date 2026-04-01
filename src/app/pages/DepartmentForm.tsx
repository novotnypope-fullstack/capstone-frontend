import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useData, Department } from '../context/DataContext';

export function DepartmentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { departments, addDepartment, updateDepartment } = useData();

  const isEdit = id !== 'new';
  const existingDept = isEdit ? departments.find((d) => d.id === id) : null;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    email: '',
    phone: '',
    bannerUrl: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (existingDept) {
      setFormData({
        name: existingDept.name,
        description: existingDept.description,
        email: existingDept.email,
        phone: existingDept.phone,
        bannerUrl: existingDept.bannerUrl,
      });
    }
  }, [existingDept]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Department name is required';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    if (isEdit && id) {
      updateDepartment(id, formData);
      toast.success('Department updated successfully');
    } else {
      addDepartment(formData);
      toast.success('Department created successfully');
    }

    navigate('/admin');
  };

  const handleCancel = () => {
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="max-w-[500px] mx-auto px-4 py-12">
        <h1 className="text-3xl text-[#1e293b] mb-8">
          {isEdit ? 'Edit Department' : 'Add New Department'}
        </h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-8">
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm text-[#1e293b] mb-2">
              Department Name <span className="text-[#ef4444]">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-[#0891b2] focus:border-2 ${
                errors.name ? 'border-[#ef4444]' : 'border-[#e2e8f0]'
              }`}
            />
            {errors.name && <p className="text-sm text-[#ef4444] mt-1">{errors.name}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block text-sm text-[#1e293b] mb-2">
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-[#e2e8f0] rounded focus:outline-none focus:border-[#0891b2] focus:border-2"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-sm text-[#1e293b] mb-2">
              Contact Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-[#0891b2] focus:border-2 ${
                errors.email ? 'border-[#ef4444]' : 'border-[#e2e8f0]'
              }`}
            />
            {errors.email && <p className="text-sm text-[#ef4444] mt-1">{errors.email}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="phone" className="block text-sm text-[#1e293b] mb-2">
              Contact Phone
            </label>
            <input
              type="text"
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 border border-[#e2e8f0] rounded focus:outline-none focus:border-[#0891b2] focus:border-2"
            />
          </div>

          <div className="mb-8">
            <label htmlFor="bannerUrl" className="block text-sm text-[#1e293b] mb-2">
              Banner Image URL
            </label>
            <input
              type="text"
              id="bannerUrl"
              value={formData.bannerUrl}
              onChange={(e) => setFormData({ ...formData, bannerUrl: e.target.value })}
              className="w-full px-3 py-2 border border-[#e2e8f0] rounded focus:outline-none focus:border-[#0891b2] focus:border-2"
            />
            <p className="text-xs text-[#64748b] mt-1">Enter image URL (JPG/PNG)</p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="px-5 py-2 bg-[#f8fafc] text-[#1e293b] rounded hover:bg-[#e2e8f0] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#22c55e] text-white rounded hover:bg-[#16a34a] transition-colors"
            >
              Save Department
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
