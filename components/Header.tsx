import Link from "next/link";

import { ReactJSLogo } from "./ReactJSLogo";
import { Nav } from "./Nav";

export const Header = () => {
  return (
    <header>
      <div>
        <div className="mx-auto flex max-w-lg flex-col justify-center p-8">
          <Link href="/">
            <h1 className="flex flex-col items-center space-y-2 font-semibold text-gray-600 sm:text-lg">
              <ReactJSLogo className="h-12 text-sky-600 sm:h-16" />
              <span>React Ceará</span>
            </h1>
          </Link>
          <p className="mt-2 text-center text-sm text-gray-600">
            Comunidade cearense de React
          </p>
        </div>
        <Nav />
      </div>
    </header>
  );
};
