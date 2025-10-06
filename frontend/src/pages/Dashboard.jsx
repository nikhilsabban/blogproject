
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

export function Dashboard(){

    return(
        <div className="flex">
            <Sidebar></Sidebar>
            <div className="flex-1"><Outlet></Outlet></div>
        </div>
    )
}