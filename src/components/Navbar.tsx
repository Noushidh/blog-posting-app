import CreateBlog from "./CreateBlog";
import Logout from "./Logout";


type Props = {
  getBlogs: () => Promise<void>;
};

function Navbar({ getBlogs }: Props) {
  return (
    <div className="w-full h-20 bg-red-500 flex justify-end items-center gap-4 px-6">

      <CreateBlog getBlogs={getBlogs} />
      <Logout/>
        
    </div>
  );
}

export default Navbar;