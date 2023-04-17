import { Header } from "@/components/Header";
import { NextEventSection } from "@/components/NextEventSection";
import { Footer } from "@/components/Footer";
import { Event } from "@/types/event";
import { EnumPresentations } from "@/types/presentation";

type Props = {
  nextEvent: Event;
  presentations: EnumPresentations;
};

export const HomePage = ({ nextEvent, presentations }: Props) => {
  return (
    <div>
      <Header />
      <NextEventSection event={nextEvent} presentations={presentations} />
      <section>
        <div className="space-y-16 px-8 py-16 lg:mx-auto lg:max-w-3xl lg:px-0">
          <h2 className="text-center">Eventos anteriores</h2>
        </div>
      </section>
      <section>
        <div className="space-y-16 px-8 py-16 lg:mx-auto lg:max-w-3xl lg:px-0">
          <h2 className="text-center">A comunidade</h2>
        </div>
      </section>
      <section>
        <div className="space-y-16 px-8 py-16 lg:mx-auto lg:max-w-3xl lg:px-0">
          <h2 className="text-center">Parceiros</h2>
        </div>
      </section>
      <Footer />
    </div>
  );
};
