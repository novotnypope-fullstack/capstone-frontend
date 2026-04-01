import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useData } from '../context/DataContext';

export function FacultyForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { faculty, departments, addFaculty, updateFaculty } = useData();

  const isEdit = id !== 'new';
  const existingFaculty = isEdit ? faculty.find((f) => f.id === id) : null;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    departmentId: '',
    bio: '',
    profileImageUrl: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (existingFaculty) {
      setFormData({
        name: existingFaculty.name,
        email: existingFaculty.email,
        departmentId: existingFaculty.departmentId,
        bio: existingFaculty.bio,
        profileImageUrl: existingFaculty.profileImageUrl,
      });
    }
  }, [existingFaculty]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    } else {
      // Check for duplicate email
      const duplicate = faculty.find(
        (f) => f.email === formData.email && f.id !== id
      );
      if (duplicate) {
        newErrors.email = 'Email already in use';
      }
    }

    if (!formData.departmentId) {
      newErrors.departmentId = 'Department is required';
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
      updateFaculty(id, formData);
      toast.success('Faculty member updated successfully');
    } else {
      addFaculty(formData);
      toast.success('Faculty member added successfully');
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
          {isEdit ? 'Edit Faculty Member' : 'Add New Faculty Member'}
        </h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-8">
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm text-[#1e293b] mb-2">
              Name <span className="text-[#ef4444]">*</span>
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
            <label htmlFor="email" className="block text-sm text-[#1e293b] mb-2">
              Email <span className="text-[#ef4444]">*</span>
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
            <label htmlFor="departmentId" className="block text-sm text-[#1e293b] mb-2">
              Department <span className="text-[#ef4444]">*</span>
            </label>
            <select
              id="departmentId"
              value={formData.departmentId}
              onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-[#0891b2] focus:border-2 ${
                errors.departmentId ? 'border-[#ef4444]' : 'border-[#e2e8f0]'
              }`}
            >
              <option value="">Select a department</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
            {errors.departmentId && (
              <p className="text-sm text-[#ef4444] mt-1">{errors.departmentId}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="bio" className="block text-sm text-[#1e293b] mb-2">
              Bio
            </label>
            <textarea
              id="bio"
              rows={4}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full px-3 py-2 border border-[#e2e8f0] rounded focus:outline-none focus:border-[#0891b2] focus:border-2"
            />
          </div>

          <div className="mb-8">
            <label htmlFor="profileImageUrl" className="block text-sm text-[#1e293b] mb-2">
              Profile Image URL
            </label>
            <input
              type="text"
              id="profileImageUrl"
              value={formData.profileImageUrl}
              onChange={(e) => setFormData({ ...formData, profileImageUrl: e.target.value })}
              className="w-full px-3 py-2 border border-[#e2e8f0] rounded focus:outline-none focus:border-[#0891b2] focus:border-2"
            />
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
              Save Faculty Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
