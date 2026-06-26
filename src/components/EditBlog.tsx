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
      if(!title||!content){
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
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl p-6">
          <h2 className="text-2xl font-bold text-center mb-6">
            Edit Blog
          </h2>

          <div className="flex flex-col gap-4">
            <div>
              <label className="block mb-2 font-medium">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                className="w-full border rounded-lg p-3 outline-none resize-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex justify-end gap-3 mt-2">
              <button
                onClick={handleopen}
                className="px-4 py-2 rounded-lg bg-gray-400 text-white hover:bg-gray-500"
              >
                Cancel
              </button>

              <button
                onClick={updateBlog}
                className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    )}

    <button
      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
      onClick={handleopen}
    >
      Edit
    </button>
  </>
);
}
export default EditBlog;
