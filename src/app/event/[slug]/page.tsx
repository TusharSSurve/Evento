import H1 from "@/components/h1";
import prisma from "@/lib/db";
import { ChildrenProps } from "@/lib/types";
import Image from "next/image";
import { notFound } from "next/navigation";

type EventPageProps = {
  params: {
    slug: string;
  }
}

export function generateMetadata({ params }: EventPageProps) {
  const slug = params.slug;
  return {
    title: `Event: ${slug}`
  }
}

export default async function EventPage({ params }: EventPageProps) {
  const slug = params.slug;
  // const response = await fetch(`https://bytegrad.com/course-assets/projects/evento/api/events/${slug}`);
  // const event: EventoEvent = await response.json();
  const event = await prisma.eventoEvent.findUnique({
    where: {
      slug: slug,
    },
  })
  if (!event) {
    return notFound();
  }

  return (
    <main>
      <section className="relative overflow-hidden flex justify-center items-center py-14 md:py-20">
        <Image src={event.imageUrl} className="object-cover blur-3xl z-0" alt="Event background image" fill quality={50} sizes="(max-width: 1280px) 100vw, 1280px" priority />
        <div className="relative z-1 flex gap-6 lg:gap-16 flex-col lg:flex-row">
          <Image src={event.imageUrl} alt={event.name} width={300} height={201} className="rounded-xl border-2 border-white/50 object-cover" />
          <div className="flex flex-col">
            <p className="text-white/75">{new Date(event.date).toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric"
            })}</p>
            <H1 className="mb-2 mt-1 whitespace-nowrap lg:text-5xl">{event.name}</H1>
            <p className="whitespace-nowrap text-xl text-white/75">Organized by <span className="italic">{event.organizerName}</span></p>
            <button className="bg-white/20 text-lg capitalize mt-5 lg:mt-auto bg-blur w-[95vw] sm:w-full py-2 rounded-md border-white/10 border-2 state-effects">Get Tickets</button>
          </div>
        </div>
      </section>
      <div className="text-center min-h-[75vh] px-5 py-16">
        <Section>
          <SectionHeading>About this event</SectionHeading>
          <SectionParaGraph>{event.description}</SectionParaGraph>
        </Section>
        <Section>
          <SectionHeading>Location</SectionHeading>
          <SectionParaGraph>{event.location}</SectionParaGraph>
        </Section>
      </div>
    </main >
  )
}

function Section({ children }: ChildrenProps) {
  return <section className="mb-12">
    {children}
  </section>
}

function SectionHeading({ children }: ChildrenProps) {
  return <h2 className="text-2xl mb-8">{children}</h2>
}

function SectionParaGraph({ children }: ChildrenProps) {
  return <p className="max-w-4xl mx-auto text-lg leading-8 text-white/75">{children}</p>
}
