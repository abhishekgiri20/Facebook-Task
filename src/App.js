import React from "react"
import "./app.css"
import HeroSection from "./Components/Home/HeroSection";
import PostCard from "./Components/Post/PostCard";

function App() {
 
  return(
  <>
    <HeroSection/>
    <div className="container text-center col-md-8 ">  
        <PostCard/>
    </div>
  </>
  )
  
}

export default App;