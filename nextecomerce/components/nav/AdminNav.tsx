import Link from "next/link";
export default function AdminNav() {
  return (
    <>
      <nav className="nav justify-content-center mb-3">
        <Link className="nav-link" href="/dashboard/admin">
          Admin
        </Link>
        <Link className="nav-link" href="/dashboard/admin/category">
          Create Categrory
        </Link>
        <Link className="nav-link" href="/dashboard/admin/product">
          Product
        </Link>
      </nav>
    </>
  );
}
