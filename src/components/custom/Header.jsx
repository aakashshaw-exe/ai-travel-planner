import React from "react";
import { Button } from "@/components/ui/button";
import Hero from "./Hero"; // Adjust as needed

function Header() {
  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <div className="flex items-center">
        <img src="/images/logo.png" alt="Logo" className="h-12 w-28 " />
      </div>
      <div>
        <Button variant="black">Sign In</Button>
      </div>
    </div>
  );
}

export default Header;
