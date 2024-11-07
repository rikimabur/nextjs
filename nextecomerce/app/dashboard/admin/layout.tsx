import Link from "next/link";
import AdminNav from "@/components/nav/AdminNav";
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AdminNav />
      {children}
    </>
  );
}
