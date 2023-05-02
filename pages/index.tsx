import { getAuthorsById } from "@/api/operations/getAuthorsById";
import { InferGetStaticPropsType } from "next";
import { getNextEvent } from "@/api/operations/getNextEvent";
import { getPresentationsByIds } from "@/api/operations/getPresentationsByIds";
import { HomePage } from "@/components/HomePage";

export default function Home({
  nextEvent,
  presentations,
}: InferGetStaticPropsType<typeof getStaticProps>) {

  return (
    <div>
      <HomePage nextEvent={nextEvent} presentations={presentations} />
    </div>
  );
}

export async function getStaticProps() {
  const nextEvent = await getNextEvent();
  const presentationsIds: String[] = nextEvent.presentationCollection.items.map(
    (item) => item.sys.id
  );

  const getPresentationWithAuthor = async () => {
    const presentations = await getPresentationsByIds(presentationsIds);
    return Promise.all(
      presentations.map(async (item) => {
        const author = await getAuthorsById(item.author.sys.id);
        return {
          ...item,
          author,
        };
      })
    );
  };

  const presentations = await getPresentationWithAuthor();

  return {
    props: { nextEvent, presentations },
  };
}
