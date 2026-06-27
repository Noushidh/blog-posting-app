import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { notyf } from "../utils/notyf";

type Props = {
  getBlogs: () => Promise<void>;
};

function CreateBlog({ getBlogs }: Props) {
  const [title, setTitle] = useState("");
  const [blog, setBlog] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const createBlog = async () => {
    try {
      if (!title || !blog) {
        notyf.error("Please fill all fields");
        return;
      }

      await addDoc(collection(db, "blogs"), {
        title,
        content: blog,
        authorId: auth.currentUser?.uid,
        authorName: auth.currentUser?.email,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      await getBlogs();

      setTitle("");
      setBlog("");
      handleOpen();

      notyf.success("Blog created successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
<button
  className="bg-gradient-to-r from-pink-400 via-pink-500 to-rose-500 text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:opacity-90 transition duration-300"
  onClick={handleOpen}
>
  ✍️ Create Blog
</button>


{open && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
    <div className="bg-gradient-to-r from-pink-100 via-rose-100 to-purple-100 p-8 rounded-2xl w-full max-w-md shadow-2xl flex flex-col gap-4">
      
      <h1 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
        ✍️ Create Blog
      </h1>

      <label className="font-semibold text-gray-700">Title</label>
      <input
        className="border border-pink-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label className="font-semibold text-gray-700">Blog</label>
      <textarea
        className="border border-pink-300 rounded-lg p-3 h-32 focus:outline-none focus:ring-2 focus:ring-pink-400"
        value={blog}
        onChange={(e) => setBlog(e.target.value)}
      />

      <div className="flex justify-end gap-4 mt-4">
        <button
          className="bg-gray-300 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-400 transition duration-300"
          onClick={handleOpen}
        >
          Cancel
        </button>

        <button
          className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:opacity-90 transition duration-300"
          onClick={createBlog}
        >
          Create
        </button>
      </div>
    </div>
  </div>
)}

    </>
  );
}

export default CreateBlog;