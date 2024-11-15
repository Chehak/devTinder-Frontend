import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Body from "./components/Body"
import Feed from "./components/Feed"
import Profile from "./components/Profile"
import Login from "./components/Login"
import Connections from "./components/Connections"



function App() {

  return (
    <>
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Body />}>
      <Route path="/" element={<Feed />}/>
      <Route path="/profile" element={<Profile />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/connections" element={<Connections />}/>
</Route>
     
    </Routes>
   </BrowserRouter>
    </>
  )
}

export default App
