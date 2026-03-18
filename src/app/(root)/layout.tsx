import { HomeLayout as GlobalHomeLayout } from "@/layouts/page-layouts";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <GlobalHomeLayout>{children}</GlobalHomeLayout>;
}
