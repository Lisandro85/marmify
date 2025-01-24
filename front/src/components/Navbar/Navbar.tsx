"use client";
import Link from "next/link";
import React, { useState } from "react";
import Menu from "./Menu";

export default function Navbar() {
  return (
    <>
      {/* Menú para pantallas grandes */}
      <div className="mx-auto justify-center bg-black text-white hidden lg:flex">
        <nav className="space-x-4">
          <Link href={"/"}>Home</Link>
          <Link href={"/about"}>About</Link>
          <Link href={"/contact"}>Contact</Link>
        </nav>
      </div>
      <Menu />
    </>
  );
}
