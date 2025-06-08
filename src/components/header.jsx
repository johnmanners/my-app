// src/app/Header.js (or src/components/Header.js)
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-200 max-w-7xl mx-auto">
      <ul className="p-5 flex justify-between">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </header>
  );
}
