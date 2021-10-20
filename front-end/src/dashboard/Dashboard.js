import React from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router-dom";
import { previous, today, next } from "../utils/date-time";
import ReservationsList from "./ReservationList";
import TablesList from "./TablesList";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({
  date,
  reservations,
  tables,
  reservationsError,
  tablesError,
}) {
  const history = useHistory();

  const resList = reservations.map((reservation) => (
    <ReservationsList
      key={reservation.reservation_id}
      reservation={reservation}
    />
  ));

  const openTables = tables.map((table) => (
    <TablesList key={tables.table_id} table={table} />
  ));

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date: {date} </h4>
      </div>
      <div className="btn-group" role="group" aria-label="Basic example">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => history.push(`/dashBoard?date=${previous(date)}`)}
        >
          &lt; Previous
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => history.push(`/dashBoard?date=${today()}`)}
        >
          Today
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => history.push(`/dashBoard?date=${next(date)}`)}
        >
          Next &gt;
        </button>
      </div>
      <ErrorAlert error={reservationsError} />
      {/* {JSON.stringify(reservations)} */}
      <div className="table-responsive">
        <table className="table no-wrap">
          <thead>
            <tr>
              <th className="border-top-0">#</th>
              <th className="border-top-0">First Name</th>
              <th className="border-top-0">Last Name</th>
              <th className="border-top-0">Mobile Number</th>
              <th className="border-top-0">Reservation Date</th>
              <th className="border-top-0">Reservation Time</th>
              <th className="border-top-0">People</th>
              <th classname="border-top-0">Seat Table</th>
            </tr>
          </thead>
          <tbody>{resList}</tbody>
        </table>
      </div>
      <ErrorAlert error={tablesError} />
      <div className="table-responsive">
        <table className="table no-wrap">
          <thead>
            <tr>
              <th className="border-top-0">ID</th>
              <th className="border-top-0">Table Name</th>
              <th className="border-top-0">Capacity</th>
              <th className="border-top-0">Status</th>
            </tr>
          </thead>
          <tbody>{openTables}</tbody>
        </table>
      </div>
    </main>
  );
}

export default Dashboard;
