import ShowCard from "./ShowCard";

// ShowGrid renders a responsive grid of ShowCard components
export default function ShowGrid({ shows }) {
  return (
    <section
      aria-label="Shows grid"
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 lg:grid-cols-5"
    >
      {shows.map((show) => (
        <ShowCard key={show.id} show={show} />
      ))}
    </section>
  );
}
