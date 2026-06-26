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
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        onClick={handleDelete}
      >
        Delete
      </button>
    </>
  );
}
export default DeleteBlog;
