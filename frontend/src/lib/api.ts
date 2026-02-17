export interface LoginResponse {
  token: string;
  type: string;
  username: string;
}

export async function loginApi(username: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Login failed");

  return data;
}

export async function meApi(token: string): Promise<{ username: string }> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/user/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Unauthorized");

  return res.json();
}
