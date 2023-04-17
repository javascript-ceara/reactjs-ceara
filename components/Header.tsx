import Link from "next/link";

import { ReactJSLogo } from "./ReactJSLogo";
import { Nav } from "./Nav";

export const Header = () => {
  return (
    <header>
      <div>
        <div className="flex items-center justify-center px-8 py-12">
          <Link href="#">
            <h1 className="flex flex-1 flex-col space-y-4 text-lg font-semibold text-slate-600">
              <ReactJSLogo className="h-14" />
              <span>ReactJS Ceará</span>
            </h1>
          </Link>
        </div>
        <Nav />
      </div>
    </header>
  );
};
