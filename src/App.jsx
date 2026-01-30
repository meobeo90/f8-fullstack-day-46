import { useState } from 'react'
import './App.css'
import { Loader2, Pencil, Trash2 } from 'lucide-react';
import useTasks from './hooks/useTask';
import Toast from './components/Toast';
import ConfirmModal from './components/ConfirmModal';




function App() {
  const {
    tasks, isLoading, isSaving, error, add, toggle, updateTitle, remove
  } = useTasks();
 
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const [toast, setToast] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const showToast = (message) => {
    setToast(message)
    setTimeout(()=> setToast(null),3000);
  }

  const handleAdd = async (e)=> {
    e.preventDefault();
    const addSuccess = await add(title);
    if (addSuccess) {
      setTitle("");
      showToast ("Thêm nhiệm vụ mới thành công!")
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 to-slate-100 flex justify-center p-8">

      <Toast message={toast} />
      <ConfirmModal
        open={deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={async () => {
          await remove(deleteId);
          showToast("Đã xóa thành công!");
          setDeleteId(null);
        }}
      />
      
      <div className="w-full max-w-xl bg-white shadow-2xl rounded-3xl p-8">
        <h1 className="text-3xl font-black text-center mb-8 tracking-tight">
          Todo List
        </h1>
        <form onSubmit={handleAdd} className="flex gap-3 mb-6">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 border rounded-xl px-4 py-3"
          />
          <button className="bg-indigo-600 text-white px-5 rounded-xl cursor-pointer">
            {isSaving && <Loader2 className="animate-spin" />}
            Thêm
          </button>
        </form>

        {error && <p className="text-red-500">{error}</p>}

        {isLoading ? (
          <Loader2 className="animate-spin mx-auto" size={40} />
        ) : (
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex gap-3 p-3 bg-slate-50 rounded-xl cursor-pointer"
              >
                <input type="checkbox" checked={task.isCompleted} readOnly onChange={()=> toggle(task)} />

                {editingId === task.id ? (
                  <input
                    autoFocus
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={async () => {
                      await updateTitle(task.id, editValue);
                      setEditingId(null);
                      showToast("Đã cập nhật thành công!");
                    }}
                    className="flex-1"
                  />
                ) : (
                  <span className={`flex-1 ${task.isCompleted ?"line-through text-gray-400" :""}`}>{task.title}</span>
                )}

                {!task.isCompleted && (
                  <Pencil
                    size={18}
                    className="text-blue-500 hover:scale-110 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingId(task.id);
                      setEditValue(task.title);
                    }}
                  />
                )}

                <Trash2
                  size={18}
                  className="text-red-500 hover:scale-110 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteId(task.id);
                  }}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
export default App
