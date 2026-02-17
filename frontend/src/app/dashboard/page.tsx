"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { meApi } from "@/lib/api";

export default function DashboardPage() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
      return;
    }

    (async () => {
      try {
        setLoading(true);
        const res = await meApi(token);
        setUsername(res.username);
      } catch {
        localStorage.removeItem("token");
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  function logout() {
    localStorage.removeItem("token");
    router.replace("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="rounded-2xl bg-white shadow border border-slate-100 p-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-sm text-slate-500 mt-1">
              Protected page (JWT required)
            </p>
          </div>

          <button
            onClick={logout}
            className="rounded-lg border text-slate-700 border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-100"
          >
            Logout
          </button>
        </div>

        <div className="rounded-2xl bg-white shadow border border-slate-100 p-6">
          {loading ? (
            <p className="text-slate-600">Loading...</p>
          ) : (
            <div>
              <p className="text-slate-600 text-sm">Signed in as</p>
              <p className="text-slate-900 text-lg font-semibold">{username}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
