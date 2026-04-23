const API = "/api/v1";

const Auth = {
  getToken() {
    return localStorage.getItem("budget_jwt_token");
  },

  getUser() {
    const raw = localStorage.getItem("budget_user");
    return raw ? JSON.parse(raw) : null;
  },

  save(token, user) {
    localStorage.setItem("budget_jwt_token", token);
    localStorage.setItem("budget_user", JSON.stringify(user));
  },

  clear() {
    localStorage.removeItem("budget_jwt_token");
    localStorage.removeItem("budget_user");
  },

  isLoggedIn() {
    return !!this.getToken();
  },

  headers() {
    const token = this.getToken();
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  },

  async hasValidSession() {
    try {
      const res = await fetch(`${API}/auth/profile`, {
        method: "GET",
        headers: this.headers(),
        credentials: "include",
      });

      return res.ok;
    } catch {
      return false;
    }
  },

  requireGuest() {
    this.hasValidSession().then((isValid) => {
      if (isValid) {
        window.location.href = "/dashboard";
        return;
      }

      if (this.isLoggedIn()) {
        this.clear();
      }
    });
  },

  requireAuth() {
    this.hasValidSession().then((isValid) => {
      if (!isValid) {
        this.clear();
        window.location.href = "/login";
      }
    });
  },

  async syncSession() {
    const isValid = await this.hasValidSession();
    if (!isValid && this.isLoggedIn()) {
      this.clear();
    }
  },

  async logout() {
    await fetch("/api/v1/auth/logout", { method: "POST", credentials: "include" }).catch(() => {});
    this.clear();
    window.location.href = "/";
  },
};

async function api(endpoint, options = {}) {
  const res = await fetch(`${API}${endpoint}`, {
    headers: Auth.headers(),
    credentials: "include",
    ...options,
  });

  const data = await res.json();

  if (res.status === 401) {
    Auth.clear();
    window.location.href = "/login";
    throw new Error("Session expired");
  }

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

function updateNav() {
  const navAuth = document.getElementById("nav-auth");
  if (!navAuth) return;

  if (Auth.isLoggedIn()) {
    const user = Auth.getUser();
    navAuth.innerHTML = `
      <a href="/dashboard" class="text-sm font-medium text-slate-600 hover:text-teal-700 transition">Dashboard</a>
      <a href="/budgets" class="text-sm font-medium text-slate-600 hover:text-teal-700 transition">Budgets</a>
      <span class="text-sm text-slate-500 hidden sm:inline">Hi, ${user?.name || "User"}</span>
      <button onclick="Auth.logout()" class="text-sm font-medium text-white bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition">Logout</button>
    `;
  } else {
    navAuth.innerHTML = `
      <a href="/login" class="text-sm font-medium text-slate-600 hover:text-teal-700 transition">Sign In</a>
      <a href="/register" class="text-sm font-medium text-white bg-teal-700 hover:bg-teal-600 px-4 py-2 rounded-lg transition">Sign Up</a>
    `;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  Auth.syncSession().then(updateNav);
});
