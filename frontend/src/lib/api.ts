import { getIdToken } from "./auth";

const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL || "http://localhost:5000/api";

async function authHeaders(): Promise<HeadersInit> {
  const token = await getIdToken();
  return {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function handleResponse(res: Response) {
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

// Projects
export async function fetchProjects() {
  const res = await fetch(`${API_URL}/projects`);
  return handleResponse(res);
}

export async function createProject(formData: FormData) {
  const headers = await authHeaders();
  const res = await fetch(`${API_URL}/projects`, {
    method: "POST",
    headers,
    body: formData,
  });
  return handleResponse(res);
}

export async function updateProject(id: string, formData: FormData) {
  const headers = await authHeaders();
  const res = await fetch(`${API_URL}/projects/${id}`, {
    method: "PUT",
    headers,
    body: formData,
  });
  return handleResponse(res);
}

export async function deleteProject(id: string) {
  const headers = await authHeaders();
  const res = await fetch(`${API_URL}/projects/${id}`, {
    method: "DELETE",
    headers,
  });
  return handleResponse(res);
}

// Certificates
export async function fetchCertificates() {
  const res = await fetch(`${API_URL}/certificates`);
  return handleResponse(res);
}

export async function createCertificate(formData: FormData) {
  const headers = await authHeaders();
  const res = await fetch(`${API_URL}/certificates`, {
    method: "POST",
    headers,
    body: formData,
  });
  return handleResponse(res);
}

export async function updateCertificate(id: string, formData: FormData) {
  const headers = await authHeaders();
  const res = await fetch(`${API_URL}/certificates/${id}`, {
    method: "PUT",
    headers,
    body: formData,
  });
  return handleResponse(res);
}

export async function deleteCertificate(id: string) {
  const headers = await authHeaders();
  const res = await fetch(`${API_URL}/certificates/${id}`, {
    method: "DELETE",
    headers,
  });
  return handleResponse(res);
}

// Resume
export async function uploadResume(formData: FormData) {
  const headers = await authHeaders();
  const res = await fetch(`${API_URL}/resume`, {
    method: "PUT",
    headers,
    body: formData,
  });
  return handleResponse(res);
}

// Profile
export async function fetchProfile() {
  const res = await fetch(`${API_URL}/profile`);
  return handleResponse(res);
}

export async function updateProfile(data: Record<string, unknown>) {
  const headers = await authHeaders();
  const res = await fetch(`${API_URL}/profile`, {
    method: "PUT",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}
