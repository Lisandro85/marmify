import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div ref={menuRef} className="block  lg:hidden relative  ">
        <button
          onClick={toggleMenu}
          className="text-white absolute top-0  p-4 bg-black w-full"
        >
          <span className="block w-6 h-0.5 bg-white mb-1"></span>
          <span className="block w-6 h-0.5 bg-white mb-1"></span>
          <span className="block w-6 h-0.5 bg-white "></span>
        </button>

        {isMenuOpen && (
          <div className="absolute top-10   left-4 bg-black text-white w-auto p-4 shadow-md flex flex-col space-y-4">
            <Link
              href={"/"}
              onClick={closeMenu}
              className={`${
                router === "/" ? "bg-amber-300" : ""
              } hover:bg-yellow-500 p-2 rounded`}
            >
              Home
            </Link>
            <Link
              href={"/about"}
              onClick={closeMenu}
              className={`${
                router === "/about" ? "bg-amber-300" : ""
              } hover:bg-yellow-500 p-2 rounded`}
            >
              About
            </Link>
            <Link
              href={"/contact"}
              onClick={closeMenu}
              className={`${
                router === "/contact" ? "bg-amber-300" : ""
              } hover:bg-yellow-500 p-2 rounded`}
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default Menu;
