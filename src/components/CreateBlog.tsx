import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { notyf } from "../utils/notyf";

function CreateBlog() {
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
      console.log(auth.currentUser);
      await addDoc(collection(db, "blogs"), {
        title,
        content: blog,
        autorId: auth.currentUser?.uid,
        authorName: auth.currentUser?.email,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      setTitle("");
      setBlog("");
      notyf.success("Blog created successfully");
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={handleOpen}
      >
        Create Blog
      </button>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md flex flex-col gap-3 shadow-xl">
            <h1 className="text-2xl font-bold text-center">Create Blog</h1>

            <label>Title</label>
            <input
              type="text"
              placeholder="Title"
              className="border rounded p-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label>Blog</label>
            <textarea
              className="border rounded p-2 h-32"
              placeholder="Write your blog..."
              value={blog}
              onChange={(e) => setBlog(e.target.value)}
            />

            <div className="flex justify-end gap-3 mt-3">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={handleOpen}
              >
                Cancel
              </button>

              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
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
