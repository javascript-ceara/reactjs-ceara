import { HomePage } from "@/components/HomePage";
import { InferGetStaticPropsType } from "next";
import { getNextEvent } from "../api/operations/getNextEvent";

export default function Home({
  nextEvent,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <HomePage nextEvent={nextEvent} />
    </div>
  );
}

export async function getStaticProps() {
  const nextEvent = await getNextEvent();
  return {
    props: { nextEvent },
  };
}
