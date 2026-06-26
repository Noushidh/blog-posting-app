import BlogList from "../components/BlogList"
import Navbar from "../components/Navbar"

function Home(){
    
    return(
    <>
    <Navbar/>
    <h1>All Blogs</h1>
     <BlogList/>
    </>
    )
}
export default Home