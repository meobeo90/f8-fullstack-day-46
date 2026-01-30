import { addTask, deleteTask, getTasks, updateTask } from "@/utils/api";
import { sanitizeInput } from "@/utils/sanitize";
import { useEffect, useState } from "react";

export default function useTasks() {
  const [tasks, setTasks] = useState(() => {
    try {
      const cached = localStorage.getItem("tasks");
      return cached ? JSON.parse(cached) : [];
    } catch {
      return [];
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const syncTasks = (newTasks) => {
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  // Load Data
  const loadTasks = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await getTasks();
      if (Array.isArray(data)) syncTasks(data);
    } catch {
      setError("Không tải được danh sách nhiệm vụ!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // ADD TASK
  const add = async (title) => {
    const trimTitle = title.trim();
    if (!trimTitle) return;
    setIsSaving(true);
    try {
      const safeTitle = sanitizeInput(trimTitle);
      const res = await addTask(safeTitle);
      const newTask = res.data;
      syncTasks([newTask, ...tasks]);
      return true;
    } catch {
      setError("Không thể thêm nhiệm vụ!");
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  // Toggle
  const toggle = async (task) => {
    const updated = tasks.map((t) =>
      t.id === task.id ? { ...t, isCompleted: !t.isCompleted } : t,
    );
    syncTasks(updated);
    try {
      await updateTask(task.id, { isCompleted: !task.isCompleted });
    } catch {
      setError("Lỗi: Không thể cập nhật trạng thái.");
      loadTasks();
    }
  };

  // Update Title
  const updateTitle = async (taskId, title) => {
    const safeTitle = sanitizeInput(title.trim());

    const updatedTask = tasks.map((t) =>
      t.id === taskId ? { ...t, title: safeTitle } : t,
    );
    syncTasks(updatedTask);
    try {
      await updateTask(taskId, { title: safeTitle });
    } catch {
      setError("Không thể cập nhật tiêu đề!");
      loadTasks();
      return false;
    }
  };

  //   Delete Task
  const remove = async (taskId) => {
    const updated = tasks.filter((t) => t.id !== taskId);
    syncTasks(updated);
    try {
      await deleteTask(taskId);
      return true;
    } catch {
      setError("Không thể xóa nhiệm vụ!");
      loadTasks();
      return false;
    }
  };

  return {
    tasks,
    isLoading,
    isSaving,
    error,
    add,
    toggle,
    updateTitle,
    remove,
  };
}
