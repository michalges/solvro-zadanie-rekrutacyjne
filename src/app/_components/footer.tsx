import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <>
      <div className="flex-grow"></div>
      <footer className="flex w-full items-center justify-center border-t p-6 sm:p-8">
        <p className="text-xs">
          made by&nbsp;
          <Link
            href="https://github.com/michalges"
            className="inline-flex items-center underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Michał Gęs&nbsp;</span>
            <Image
              src="/github.svg"
              alt="asfsd"
              width={64}
              height={64}
              className="h-[1.4em] w-[1.4em] dark:invert"
            />
          </Link>
        </p>
      </footer>
    </>
  );
}
