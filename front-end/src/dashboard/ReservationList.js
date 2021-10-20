function ReservationList({ reservation }) {
  return (
    <tr key={reservation.reservation_id}>
      <td>{reservation.reservation_id}</td>
      <td>{reservation.first_name}</td>
      <td>{reservation.last_name}</td>
      <td>{reservation.mobile_number}</td>
      <td>{reservation.reservation_date}</td>
      <td>{reservation.reservation_time}</td>
      <td>{reservation.people}</td>
      <td>
        <button type="button" className="btn btn-primary">
          Seat
        </button>
      </td>
    </tr>
  );
}

export default ReservationList