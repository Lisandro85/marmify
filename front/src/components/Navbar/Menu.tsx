import { useState } from "react";
import Link from "next/link";

export function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="block lg:hidden">
      <button onClick={toggleMenu} className="text-white">
        <span className="block w-6 h-0.5 bg-black mb-1"></span>
        <span className="block w-6 h-0.5 bg-black mb-1"></span>
        <span className="block w-6 h-0.5 bg-black"></span>
      </button>

      {isMenuOpen && (
        <div className="absolute top-5 left-0 bg-black text-white w-full p-4 shadow-md flex flex-col space-y-4">
          <Link href={"/"}>Home</Link>
          <Link href={"/about"}>About</Link>
          <Link href={"/contact"}>Contact</Link>
        </div>
      )}
    </div>
  );
}

export default Menu;
