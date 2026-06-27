import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useState } from "react";
import { notyf } from "../utils/notyf";

type props = {
  blog: any;
  getBlogs:()=>void;
};
function EditBlog({ blog ,getBlogs}: props) {
  console.log(blog);
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);
  const [openedit, setopenEdit] = useState(false);

  const handleopen = () => {
    setopenEdit(!openedit);
  };

  const updateBlog = async () => {
    try {
      if(!title.trim()||!content.trim()){
        notyf.error("please fill all fields")
        return;
      }
      const fetch = doc(db, "blogs", blog.id);
      await updateDoc(fetch, { title, content, updatedAt: serverTimestamp() });
      notyf.success("Blog updated successfully");
      getBlogs();
      handleopen()
    } catch (error: any) {
      console.log(error);
    }
  };
return (
  <>
    {openedit && (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-gradient-to-r from-pink-100 via-rose-100 to-purple-100 w-full max-w-lg rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
            ✏️ Edit Blog
          </h2>

          <div className="flex flex-col gap-5">
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-pink-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                className="w-full border border-pink-300 rounded-lg p-3 outline-none resize-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={handleopen}
                className="px-5 py-2 rounded-lg bg-gray-300 text-gray-700 hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>

              <button
                onClick={updateBlog}
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold shadow-md hover:opacity-90 transition duration-300"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    )}

    <button
      className="bg-gradient-to-r from-pink-400 via-pink-500 to-rose-500 text-white px-5 py-2 rounded-lg shadow-md hover:opacity-90 transition duration-300"
      onClick={handleopen}
    >
      Edit
    </button>
  </>
);

}
export default EditBlog;
