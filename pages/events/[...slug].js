import { Fragment } from "react";
import { useRouter } from "next/router";

import { getFilteredEvents } from "../../dummy-data";

import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/ResultsTitle";
import ErrorAlert from "../../components/ui/ErrorAlert";
import Button from "../../components/ui/Button";

const FilteredEventsPage = () => {
  const router = useRouter();

  const filteredData = router.query.slug;

  // First render of component
  if (!filteredData) {
    return <p className="center">Loading..</p>;
  }

  // Access the slug values
  const filteredYear = filteredData[0];
  const filteredMonth = filteredData[1];

  // convert string to number
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  // The month or year entered is invalid
  if (isNaN(numYear) || isNaN(numMonth)) {
    return (
      <Fragment>
        <ErrorAlert>
          <p className="center">Invalid Year or Month!</p>
        </ErrorAlert>
        <br />
        <div className="center">
          <Button link="/events">SHOW ALL EVENTS</Button>
        </div>
      </Fragment>
    );
  }

  // Get all the events that lie on that month and year
  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  // No events found for this particular month and year
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p className="center">No Events found!!!</p>
        </ErrorAlert>
        <br />
        <div className="center">
          <Button link="/events">SHOW ALL EVENTS</Button>
        </div>
      </Fragment>
    );
  }

  // To send to the title page
  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList events={filteredEvents} />
    </Fragment>
  );
};

export default FilteredEventsPage;
