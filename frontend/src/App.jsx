import {BrowserRouter ,Route ,Routes} from "react-router-dom";
import { Home } from "./pages/Home";
import { Blogs } from "./pages/Blogs";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { About } from "./pages/About";
import { Navbar } from "./components/Navbar";
import { Toaster } from "../src/components/ui/sonner";
import { RecoilRoot } from "recoil";
import { Dashboard } from "./pages/Dashboard";
import { Profile } from "./pages/Profile";
import { Yourblog } from "./pages/Yourblog";
import { Createblog } from "./pages/Createblog";
import { Updateblog } from "./pages/Updateblog";
import { Blogview } from "./pages/Blogview";

function App(){
  return(
    <RecoilRoot>
    <BrowserRouter>
    <Toaster position="bottom-right" richColors closeButton />
    <Routes>
      <Route path="/" element={<><Navbar></Navbar><Home/></>}/>
      <Route path="/blogs" element={ <><Navbar></Navbar><Blogs/> </>}/>
      <Route path="/signup" element={<><Navbar></Navbar><Signup/></>}/>
      <Route path="/login" element={ <><Navbar></Navbar><Login/> </>}/>
      <Route path="/about" exlement={ <><Navbar></Navbar><About/> </>}/>
      <Route path="/dashboard" element={<><Navbar></Navbar><Dashboard/> </>} >
      <Route path="profile" element={<Profile></Profile>}/>
      <Route path="your-blog" element={<Yourblog></Yourblog>}/>
      <Route path="write-blog" element={<Createblog></Createblog>}/>
      <Route path="write-blog/:blogId" element={<Updateblog></Updateblog>}/>
      </Route>
      <Route path="/blogs/:blogId" element={<><Navbar></Navbar><Blogview></Blogview></>}></Route>

    </Routes>
    </BrowserRouter>
    </RecoilRoot>
  )
}

export default App