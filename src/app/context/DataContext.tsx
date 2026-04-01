import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

const API_BASE = '/api';

export interface Department {
  id: string;
  name: string;
  description: string;
  email: string;
  phone: string;
  bannerUrl: string;
}

export interface Faculty {
  id: string;
  name: string;
  email: string;
  departmentId: string;
  bio: string;
  profileImageUrl: string;
}

interface DataContextType {
  departments: Department[];
  faculty: Faculty[];
  loading: boolean;
  addDepartment: (dept: Omit<Department, 'id'>) => Promise<void>;
  updateDepartment: (id: string, dept: Omit<Department, 'id'>) => Promise<void>;
  deleteDepartment: (id: string) => Promise<void>;
  addFaculty: (fac: Omit<Faculty, 'id'>) => Promise<void>;
  updateFaculty: (id: string, fac: Omit<Faculty, 'id'>) => Promise<void>;
  deleteFaculty: (id: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Map snake_case DB row to camelCase frontend Department
function toDepartment(row: any): Department {
  return {
    id: String(row.id),
    name: row.name,
    description: row.description ?? '',
    email: row.contact_email ?? '',
    phone: row.contact_phone ?? '',
    bannerUrl: row.banner_image_url ?? '',
  };
}

// Map snake_case DB row to camelCase frontend Faculty
function toFaculty(row: any): Faculty {
  return {
    id: String(row.id),
    name: row.name,
    email: row.email,
    departmentId: String(row.department_id),
    bio: row.bio ?? '',
    profileImageUrl: row.profile_image_url ?? '',
  };
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDepartments = useCallback(async () => {
    const res = await fetch(`${API_BASE}/departments`);
    const data = await res.json();
    setDepartments(data.map(toDepartment));
  }, []);

  const fetchFaculty = useCallback(async () => {
    const res = await fetch(`${API_BASE}/faculty`);
    const data = await res.json();
    setFaculty(data.map(toFaculty));
  }, []);

  useEffect(() => {
    Promise.all([fetchDepartments(), fetchFaculty()]).finally(() =>
      setLoading(false)
    );
  }, [fetchDepartments, fetchFaculty]);

  const addDepartment = async (dept: Omit<Department, 'id'>) => {
    const res = await fetch(`${API_BASE}/departments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: dept.name,
        description: dept.description,
        contactEmail: dept.email,
        contactPhone: dept.phone,
        bannerImageUrl: dept.bannerUrl,
      }),
    });
    if (!res.ok) throw new Error('Failed to create department');
    await fetchDepartments();
  };

  const updateDepartment = async (id: string, dept: Omit<Department, 'id'>) => {
    const res = await fetch(`${API_BASE}/departments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: dept.name,
        description: dept.description,
        contactEmail: dept.email,
        contactPhone: dept.phone,
        bannerImageUrl: dept.bannerUrl,
      }),
    });
    if (!res.ok) throw new Error('Failed to update department');
    await fetchDepartments();
  };

  const deleteDepartment = async (id: string) => {
    const res = await fetch(`${API_BASE}/departments/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete department');
    await Promise.all([fetchDepartments(), fetchFaculty()]);
  };

  const addFaculty = async (fac: Omit<Faculty, 'id'>) => {
    const res = await fetch(`${API_BASE}/faculty`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: fac.name,
        bio: fac.bio,
        email: fac.email,
        profileImageUrl: fac.profileImageUrl,
        departmentId: fac.departmentId,
      }),
    });
    if (!res.ok) throw new Error('Failed to create faculty');
    await fetchFaculty();
  };

  const updateFaculty = async (id: string, fac: Omit<Faculty, 'id'>) => {
    const res = await fetch(`${API_BASE}/faculty/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: fac.name,
        bio: fac.bio,
        email: fac.email,
        profileImageUrl: fac.profileImageUrl,
        departmentId: fac.departmentId,
      }),
    });
    if (!res.ok) throw new Error('Failed to update faculty');
    await fetchFaculty();
  };

  const deleteFaculty = async (id: string) => {
    const res = await fetch(`${API_BASE}/faculty/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete faculty');
    await fetchFaculty();
  };

  return (
    <DataContext.Provider
      value={{
        departments,
        faculty,
        loading,
        addDepartment,
        updateDepartment,
        deleteDepartment,
        addFaculty,
        updateFaculty,
        deleteFaculty,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
}
