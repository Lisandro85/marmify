"use client";
import Link from "next/link";
import React, { useState } from "react";
import Menu from "./Menu";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const router = usePathname();
  return (
    <>
      <div className="mx-auto justify-center bg-black text-white hidden lg:flex">
        <nav className="space-x-4 m-2">
          <Link
            href={"/"}
            className={`${
              router === "/" ? "bg-amber-300" : ""
            } hover:bg-yellow-500 p-2 rounded`}
          >
            Home
          </Link>
          <Link
            href={"/about"}
            className={`${
              router === "/about" ? "bg-amber-300" : ""
            } hover:bg-yellow-500 p-2 rounded`}
          >
            About
          </Link>
          <Link
            href={"/contact"}
            className={`${
              router === "/contact" ? "bg-amber-300" : ""
            } hover:bg-yellow-500 p-2 rounded`}
          >
            Contact
          </Link>
        </nav>
      </div>
      <Menu />
    </>
  );
}
