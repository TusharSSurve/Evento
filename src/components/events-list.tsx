import { EventoEvent } from "@/lib/types"
import EventCard from "./event-card"

type EventsListProps = {
  city: string
}
export default async function EventsList({ city }: EventsListProps) {
  const response = await fetch(`https://bytegrad.com/course-assets/projects/evento/api/events?city=${city}`, {
    next: {
      revalidate: 300,
    }
  });
  const events: EventoEvent[] = await response.json();
  return (
    <section className="max-w-[1100px] px-[20px] flex flex-wrap gap-10 justify-center">
      {
        events.map(event => (
          <EventCard key={event.id} event={event} />
        ))
      }
    </section>
  )
}
