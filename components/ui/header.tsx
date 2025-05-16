import React from "react";
import { Input } from "./input";
import { Search } from "lucide-react";

export function Header() {
  return (
    <div className="w-full p-4 bg-card flex justify-between">
      <div className="w-1/2 border rounded-xl flex items-center px-4 justify-center">
        <Search size={20} />
        <Input
          placeholder="Search datasets..."
          className="border-none focus-visible:ring-0"
        />
      </div>
      <appkit-button />
    </div>
  );
}
