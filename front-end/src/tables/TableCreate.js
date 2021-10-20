import { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { createTable } from "../utils/api";

function TableCreate({ loadDashboard }) {
  const history = useHistory();
  const initialFormState = {
    table_name: "",
    capacity: "",
  };

  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ ...initialFormState });

  /**
   * Whenever a user makes a change to the form, update the form
   */
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]:
        target.name === "capacity" ? Number(target.value) : target.value,
    });
  };

  /**
   * Whenever a user submits the form, validate and make the API call
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    if (validateFields()) {
      createTable(formData, abortController.signal)
        .then(loadDashboard)
        .then(() => history.push(`/dashboard`))
        .catch(setError);
    }

    return () => abortController.abort();
  };

  /**
   * Make sure all fields are filled in and correct
   */
  function validateFields() {
    let foundError = null;

    if (formData.table_name === "" || formData.capacity === "") {
      foundError = { message: "Please fill out all fields." };
    } else if (formData.table_name.length < 2) {
      foundError = { message: "Table name must be at least 2 characters." };
    }
    setError(foundError);

    return foundError === null;
  }

  return (
    <div>
      <h1>Create Table</h1>
      <form>
        <ErrorAlert error={error} />

        <label className="form-label" htmlFor="table_name">
          Table Name:&nbsp;
        </label>
        <input
          className="form-control"
          name="table_name"
          id="table_name"
          type="text"
          minLength={2}
          onChange={handleChange}
          value={formData.table_name}
          required
        />

        <label className="form-label" htmlFor="capacity">
          Capacity:&nbsp;
        </label>
        <input
          className="form-control"
          name="capacity"
          id="capacity"
          type="number"
          min={1}
          onChange={handleChange}
          value={formData.capacity}
          required
        />

        <button
          className="btn btn-primary m-1"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button
          className="btn btn-danger m-1"
          type="button"
          onClick={history.goBack}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default TableCreate;
