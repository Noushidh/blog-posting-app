import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { notyf } from "../utils/notyf";

type props = {
  blogId: string;
  getBlogs: () => void;
};
function DeleteBlog({ blogId, getBlogs }: props) {
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "blogs", blogId));
      getBlogs();
      notyf.success("Blog deleted succssfully");
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <>
<button
  className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:opacity-90 transition duration-300"
  onClick={handleDelete}
>
  🗑️ Delete
</button>

    </>
  );
}
export default DeleteBlog;
