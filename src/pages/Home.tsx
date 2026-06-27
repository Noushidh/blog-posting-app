import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import Navbar from "../components/Navbar";
import BlogList from "../components/BlogList";

function Home() {
  const [blogs, setBlogs] = useState<any[]>([]);

  const getBlogs = async () => {
    try {
      const snapshot = await getDocs(collection(db, "blogs"));

      const blogList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setBlogs(blogList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

return (
  <div className="min-h-screen bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100">
    <Navbar getBlogs={getBlogs} />

    <h1 className="text-4xl font-extrabold text-center my-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      ✨ All Blogs ✨
    </h1>

    <div className="max-w-5xl mx-auto px-6">
      <BlogList blogs={blogs} getBlogs={getBlogs} />
    </div>
  </div>
);


}

export default Home;