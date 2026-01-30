export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="fixed top-6 right-6 bg-black text-white px-4 py-2 rounded-xl shadow-lg z-50">
      {message}
    </div>
  );
}
