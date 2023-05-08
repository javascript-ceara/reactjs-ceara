import Image from "next/image";

import { Partner } from "@/types/partner";
type Props = {
  partners: Partner[];
};

export const PartnersSection = ({ partners }: Props) => {
  return (
    <section className="bg-gray-100">
      <div className="px-8 py-16 lg:mx-auto lg:max-w-3xl lg:px-0">
        <h2 className="mb-8 text-center text-2xl text-sky-700">Parceiros</h2>
        <ul className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {partners.map((partner) => (
            <li key={partner.id}>
              {partner.logo?.url && (
                <Image
                  src={partner.logo?.url || ""}
                  alt={partner.name || ""}
                  title={partner.name}
                  width={180}
                  height={180}
                  className="object-cover"
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
