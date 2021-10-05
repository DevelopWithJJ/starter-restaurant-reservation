import { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../ErrorAlert";
// import { createReservation } from "../../utils/api";

function TableCreate() {
  const initialState = {
    table_name: "",
    capacity: 1,
  };

  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState(initialState);

  function changeHandler({ target: { name, value } }) {
    setFormData((previousTable) => ({
      ...previousTable,
      [name]: value,
    }));
  }

  function submitHandler(evt) {
    evt.preventDefault();
      history.push(`/dashboard`);
  }

  function cancelHandler() {
    history.push("/");
  }

    function validateTable() {

      const newErrors = []
  }

  const tableErrors = () => {
    return errors.map((error, i) => <ErrorAlert key={i} error={error} />);
  };

  return (
    <main>
      <h1>Assign Table</h1>
      {tableErrors()}
      <form onSubmit={submitHandler} className="reservation-edit">
        <fieldset>
          <div className="form-group">
            <label htmlFor="table_name">Table Name</label>
            <input
              type="text"
              id="tableName"
              name="table_name"
              className="form-control"
              value={formData.table_name}
              required={true}
              placeholder="Table Name"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="capacity">Capacity</label>
            <input
              type="number"
              min="1"
              id="capacity"
              name="capacity"
              className="form-control"
              value={formData.capacity}
              required={true}
              placeholder="Capacity"
              onChange={changeHandler}
            />
          </div>
          <button
            type="button"
            className="btn btn-secondary mr-2"
            onClick={cancelHandler}
          >
            <span className="oi oi-x" /> Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={submitHandler}
          >
            <span className="oi oi-check" /> Submit
          </button>
        </fieldset>
      </form>
    </main>
  );
}

export default TableCreate;
