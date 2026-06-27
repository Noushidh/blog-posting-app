import CreateBlog from "./CreateBlog";
import Logout from "./Logout";


type Props = {
  getBlogs: () => Promise<void>;
};

function Navbar({ getBlogs }: Props) {
return (
  <div className="w-full h-20 bg-gradient-to-r from-pink-300 via-pink-400 to-rose-400 flex justify-end items-center gap-6 px-8 shadow-md">
    <CreateBlog getBlogs={getBlogs} />
    <Logout />
  </div>
);


}

export default Navbar;