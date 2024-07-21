import Link from "next/link";
import { IntegratedIdentitiesIcon } from "../components/icons/integrated-identities";

export default function NavBar() {
  return (
    <nav className="flex w-full justify-between my-2 sticky px-4">
      <div className="flex items-center gap-x-4">
        <Link href="/">
          <div className="rounded-lg m-1">
            <IntegratedIdentitiesIcon size={30} />
          </div>
        </Link>
        <div className="flex gap-x-4">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </div>
      </div>
      <div className="flex items-center items-end gap-x-4">
        <a href="/login">Login</a>
        <a href="/signup">Sign Up</a>
      </div>
    </nav>
  );
}