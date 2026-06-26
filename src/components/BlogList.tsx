import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

function BlogList() {
  const [blogs, setblogs] = useState<any[]>([]);
  const getBlogs = async () => {
    try {
      const snapshot = await getDocs(collection(db, "blogs"));
      const bloglist = snapshot.docs.map((doc)=>({
        id:doc.id,
        ...doc.data(),
      }))
      setblogs(bloglist)
    } catch (error: any) {
      console.log(error);
    }
  };
      
    useEffect(()=>{
        getBlogs()
    },[])
    
  return(
      <div className="grid gap-4 p-4">
     {blogs.map((blog)=>(
        <div key={blog.id} className="border rounded p-4 shadow">
         <h2 className="text-xl font-bold">{blog.title}</h2>
         <p>{blog.content}</p>
         <small>{blog.authorName}</small>
        </div>
     ))}
    </div>
  );
}
export default BlogList