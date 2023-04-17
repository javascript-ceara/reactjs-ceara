import Link from "next/link";

export const Nav = () => {
  return (
    <nav className="border-b border-t sm:flex sm:items-center sm:justify-center">
      <ul className="list-none divide-y sm:flex sm:divide-y-0">
        <li>
          <Link href="#" className="block rounded-md px-4 py-4 text-center">
            Início
          </Link>
        </li>
        <li>
          <Link href="#" className="block rounded-md px-4 py-4 text-center">
            Eventos
          </Link>
        </li>
        <li>
          <Link href="#" className="block rounded-md px-4 py-4 text-center">
            Blog
          </Link>
        </li>
        <li>
          <Link href="#" className="block rounded-md px-4 py-4 text-center">
            A comunidade
          </Link>
        </li>
      </ul>
    </nav>
  );
};
