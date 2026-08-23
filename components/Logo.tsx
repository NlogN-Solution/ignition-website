import Image from "next/image";
import Link from "next/link";
import logo from "@/public/images/logo.png";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="Ignition — home" className={className}>
      <Image
        src={logo}
        alt="Ignition"
        priority
        sizes="176px"
        className="h-[42px] w-auto sm:h-[48px] xl:h-[54px]"
      />
    </Link>
  );
}
