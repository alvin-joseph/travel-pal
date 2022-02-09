import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { projectFirestore, timestamp } from "../firebase";

const CreateNote = ({ tripId }) => {
  const [count, setCount] = useState(0);
  const initialFormValues = {
    noteTitle: "",
    noteText: "",
  };
  const { currentUser } = useAuth();
  const userId = currentUser.uid;
  const [formValues, setFormValues] = useState(initialFormValues);

  const onChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
    if (e.target.type === "textarea") {
      setCount(e.target.value.length);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const createdAt = timestamp();
    await projectFirestore
      .collection("userData")
      .doc(userId)
      .collection("trips")
      .doc(tripId)
      .collection("notes")
      .add({ ...formValues, createdAt });
    setFormValues(initialFormValues);
    setCount(0);
  }
  return (
    <div
      className="modal fade"
      id="notesModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="notesModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="notesModalLabel">
              Create new note
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group h5">
                <label htmlFor="note-title" className="col-form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="note-title"
                  value={formValues.noteTitle}
                  onChange={onChange}
                  name="noteTitle"
                  maxLength={80}
                  required
                />
              </div>
              <div className="form-group mt-4 h5">
                <label htmlFor="note-text" className="col-form-label">
                  {`Note (${count}/2000 Characters)`}
                </label>
                <textarea
                  className="form-control"
                  id="note-text"
                  value={formValues.noteText}
                  onChange={onChange}
                  name="noteText"
                  maxLength={2000}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-primary mt-3"
                data-bs-dismiss="modal"
              >
                Add Note
              </button>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNote;
