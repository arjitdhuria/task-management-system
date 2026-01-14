function Navbar() {
  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">Task Manager</h1>
      <button className="text-red-600 font-medium hover:underline">
        Logout
      </button>
    </header>
  );
}

export default Navbar;
