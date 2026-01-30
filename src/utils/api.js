const BASE_API = import.meta.env.VITE_BASE_API;

export const getTasks = async () => {
  const res = await fetch(`${BASE_API}/api/tasks`);
  return res.json();
};

export const addTask = async (title) => {
  const res = await fetch(`${BASE_API}/api/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  return res.json();
};

export const updateTask = async (id, data) => {
  const res = await fetch(`${BASE_API}/api/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json;
};
export const deleteTask = async (id) => {
  const res = await fetch(`${BASE_API}/api/tasks/${id}`, { method: "DELETE" });
  return res.ok;
};
