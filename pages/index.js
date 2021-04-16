import { getFeaturedEvents } from "../dummy-data";
import EventList from "../components/events/EventList";

const Home = () => {
  const featuredEvents = getFeaturedEvents();
  return (
    <div>
      <EventList events={featuredEvents} />
    </div>
  );
};

export default Home;
