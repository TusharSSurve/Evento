import prisma from "@/lib/db";
import EventCard from "./event-card"
import { getEvents } from "@/lib/utils";
import PaginationControls from "./pagination-controls";


type EventsListProps = {
  city: string
  page?: number
}
export default async function EventsList({ city, page = 1 }: EventsListProps) {
  // const response = await fetch(`https://bytegrad.com/course-assets/projects/evento/api/events?city=${city}`, {
  //   next: {
  //     revalidate: 300,
  //   }
  // });
  // const events: EventoEvent[] = await response.json();
  const { events, totalCount } = await getEvents(city, page);
  const previousPath = page > 1 ? `/events/${city}?page=${page - 1}` : ""
  const nextPath = totalCount > 6 * page ? `/events/${city}?page=${page + 1}` : ''
  return (
    <section className="max-w-[1100px] px-[20px] flex flex-wrap gap-10 justify-center">
      {
        events.map(event => (
          <EventCard key={event.id} event={event} />
        ))
      }
      <PaginationControls previousPath={previousPath} nextPath={nextPath} />
    </section>
  )
}
