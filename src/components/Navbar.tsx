import CreateBlog from "./CreateBlog";

function Navbar() {
  return (
    <div className="w-full h-20 bg-red-500 flex justify-end items-center gap-4 px-6">
      <CreateBlog />

      <button className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition">
        Logout
      </button>
    </div>
  );
}

export default Navbar;