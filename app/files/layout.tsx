// app/files/layout.tsx
import Nav from "@/components/Nav";
import Header from "@/components/Header";

export default function FilesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen flex flex-row-reverse gap-0.5">
      {/* Nav */}
      <div className="w-[250px] hidden lg:block">
        <Nav />
      </div>
      {/* Content */}
      <div className=" lg:w-[85.3%] w-full h-full flex flex-col gap-1">
        <Header />
        {children}
      </div>
    </div>
  );
}
