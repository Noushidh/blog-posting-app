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
    <>
      <Navbar getBlogs={getBlogs} />

      <h1 className="text-3xl font-bold text-center my-5">
        All Blogs
      </h1>

      <BlogList blogs={blogs} getBlogs={getBlogs} />
    </>
  );
}

export default Home;