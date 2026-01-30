export default function ConfirmModal({ open, onConfirm, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl w-80 shadow-xl">
        <p className="mb-6 text-center font-semibold">
          Bạn có chắc chắn muốn xóa?
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2 bg-gray-200 rounded-lg"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 bg-red-500 text-white rounded-lg"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}
