import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout() {
  return (
      <div className="flex h-screen">
          
          {/* fixed sidebar */}
      <Sidebar />
          <div className="flex flex-col flex-1">
              
              {/* fixed navbar */}
        <Navbar />
              <main className="flex-1 p-4">
                  
                  {/* outlet for nested routes */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
