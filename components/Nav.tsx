import Link from "next/link";

export const Nav = () => {
  return (
    <nav className="sm:flex sm:items-center sm:justify-center sm:border-b sm:border-t sm:border-slate-200">
      <ul className="list-none divide-y-2 divide-slate-100 sm:flex sm:divide-y-0">
        <li>
          <Link
            href="#events"
            className="block rounded-md px-4 py-4 text-center text-slate-600"
          >
            Eventos
          </Link>
        </li>

        <li>
          <Link
            href="#community"
            className="block rounded-md px-4 py-4 text-center text-slate-600"
          >
            A comunidade
          </Link>
        </li>
      </ul>
    </nav>
  );
};
