import Image from "next/image";
import Link from "next/link";
import notfound from "@/public/image/404.svg";

export default function NotFound() {
  return (
    <div className="w-full h-full flex items-center justify-center gap-10 flex-col">
      <div className="w-[50%] h-[50%]">
        <Image src={notfound} alt="not-found" />
      </div>
      <Link href={"/"}>
        <button className="w-28 h-11 text-white text-sm text-center p-3 rounded-lg hover:opacity-[0.7] block bg-[var(--primary)]">
          زبان ابزار
        </button>
      </Link>
    </div>
  );
}
