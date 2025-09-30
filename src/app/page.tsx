import Image from "next/image";
import Dashboard from "./pages/dashboard/page";
import Header from "./Globals-Components/Header";

export default function Home() {
  return (
    <div className="flex">

      
      <div className="w-full">
        <Header />
        <Dashboard />
      </div>
      
      
    </div>
  );
}
