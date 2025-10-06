import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import  heroImg   from "../assets/blog2.png"

export function Hero(){
    return(
        <div className="px-30">
            <div className="  items-center flex h-[350px] my-10">

                <div className="max-w-xl">
                    <h1 className="text-4xl font-bold mb-4">Explore latest Tech and web Trends</h1>
                    <p className="text-lg opacity-80 mb-6">Stay ahead with in-depth articles, tutorials and  insights on web development , digital marketing </p>
                
                 <div className="flex space-x-2">
                    <Link to={"/"}><Button className="text-lg px-6 py-3">Get Started</Button></Link>
                    <Link to={"/"}><Button className="text-lg px-6 py-3 border-white" variant="outline">Learn More</Button></Link>
                 </div>
                 </div>
                 <div className="flex justify-center items-center">
                    <img src={heroImg} alt="" className="h-[550px] w-[550px]"></img>

                 </div>

            </div>
            </div>
    )
}