import Link from "next/link";

import { JavaScriptLogo } from "./JavaScriptLogo";
import { Nav } from "./Nav";

export const Header = () => {
  return (
    <header>
      <div>
        <div className="mx-auto flex max-w-lg flex-col justify-center p-8">
          <Link href="/">
            <h1 className="flex flex-col items-center space-y-2 font-semibold text-gray-600 sm:text-lg">
              <JavaScriptLogo className="h-12 sm:h-16" />
              <span>JavaScript Ceará</span>
            </h1>
          </Link>
          <p className="mt-2 text-center text-sm text-gray-600">
            Comunidade cearense de JavaScript
          </p>
        </div>
        <Nav />
      </div>
    </header>
  );
};
