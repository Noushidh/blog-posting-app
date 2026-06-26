import { auth } from "../firebase/firebase";
import EditBlog from "./EditBlog";
import DeleteBlog from "./DeleteBlog";

type Props = {
  blogs: any[];
  getBlogs: () => Promise<void>;
};

function BlogList({ blogs, getBlogs }: Props) {
  return (
    <div className="grid gap-4 p-4">
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="border rounded-lg p-4 shadow-lg bg-orange-500"
        >
          <h2 className="text-xl font-bold text-white">
            {blog.title}
          </h2>

          <p className="text-white mt-2">
            {blog.content}
          </p>

          <small className="block mt-3 text-white">
            By {blog.authorName}
          </small>

          {blog.authorId === auth.currentUser?.uid && (
            <div className="flex justify-end gap-3 mt-4">
              <EditBlog blog={blog} getBlogs={getBlogs} />

              <DeleteBlog
                blogId={blog.id}
                getBlogs={getBlogs}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default BlogList;