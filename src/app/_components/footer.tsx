import Link from "next/link";

export default function Footer() {
  return (
    <>
      <div className="flex-grow"></div>
      <footer className="flex w-full items-center justify-center border-t p-4">
        <div>
          <Link href="https://www.example.com">...</Link>
        </div>
      </footer>
    </>
  );
}
