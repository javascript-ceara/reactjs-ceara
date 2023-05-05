import Link from "next/link";

import { ReactJSLogo } from "./ReactJSLogo";
import { Nav } from "./Nav";

export const Header = () => {
  return (
    <header>
      <div>
        <div className="flex justify-center py-8">
          <Link href="/">
            <h1 className="flex items-center space-x-2 font-semibold text-gray-600 sm:flex-col sm:space-y-4 sm:text-lg">
              <ReactJSLogo className="h-8 text-sky-600 sm:h-10" />
              <span>ReactJS Ceará</span>
            </h1>
          </Link>
        </div>
        <Nav />
      </div>
    </header>
  );
};
