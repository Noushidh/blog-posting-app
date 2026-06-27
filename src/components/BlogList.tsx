import { auth } from "../firebase/firebase";
import EditBlog from "./EditBlog";
import DeleteBlog from "./DeleteBlog";

type Props = {
  blogs: any[];
  getBlogs: () => Promise<void>;
};

function BlogList({ blogs, getBlogs }: Props) {
return (
  <div className="grid gap-6 p-6">
    {blogs.map((blog) => (
      <div
        key={blog.id}
        className="rounded-xl p-6 shadow-md bg-gradient-to-r from-pink-200 via-pink-100 to-rose-100 hover:shadow-lg transition-shadow duration-300"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {blog.title}
        </h2>

        <p className="text-gray-700 leading-relaxed">
          {blog.content}
        </p>

        <small className="block mt-4 text-gray-500 italic">
          By {blog.authorName}
        </small>

        {blog.authorId === auth.currentUser?.uid && (
          <div className="flex justify-end gap-4 mt-6">
            <EditBlog blog={blog} getBlogs={getBlogs} />
            <DeleteBlog blogId={blog.id} getBlogs={getBlogs} />
          </div>
        )}
      </div>
    ))}
  </div>
);

}

export default BlogList;