"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigacija() {
  const pathName = usePathname();

  const activePage = (path: string) =>
    pathName === path
      ? "p-2 rounded bg-blue-300 shadow"
      : "p-2 rounded text-gray-600 transition duration-200 hover:bg-blue-100";

  return (
    <nav className="w-full flex justify-center my-4">
      <div className="flex gap-6 bg-[#FBFEF9] p-6 rounded-2xl shadow ">
        <Link href="/" className={activePage("/")}>
          Sarašas
        </Link>
        <Link href="/juokeliai" className={activePage("/juokeliai")}>
          Juokeliai
        </Link>
      </div>
    </nav>
  );
}
