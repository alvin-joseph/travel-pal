import React from "react";

const SelectedImage = ({ clickedId, setClickedId, docs }) => {
  const handleClick = () => {
    setClickedId("");
    Array.from(document.querySelectorAll(".carousel-item.active")).forEach(
      (el) => el.classList.remove("active")
    );
  };

  return (
    <div
      className="modal fade"
      id="trip-img"
      tabIndex="-1"
      aria-hidden="true"
      role="dialog"
      onClick={handleClick}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleClick}
            ></button>
          </div>
          <div className="modal-body">
            <div
              id="trip-carousel"
              className="carousel slide carousel-fade"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                {docs &&
                  docs.map((doc) => (
                    <div
                      className={`carousel-item ${
                        clickedId === doc.id ? "active" : ""
                      }`}
                      key={doc.id}
                    >
                      <img
                        className="d-block w-100"
                        src={doc.url}
                        alt="full-size"
                      />
                    </div>
                  ))}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-slide="prev"
                data-bs-target="#trip-carousel"
              >
                <span
                  className="carousel-control-prev-icon carousel-controls"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-slide="next"
                data-bs-target="#trip-carousel"
              >
                <span
                  className="carousel-control-next-icon carousel-controls"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <div className="modal-footer">
            <p className="mx-auto" id="exampleModalLabel">
              (Place mouse over photo to pause)
            </p>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={handleClick}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedImage;
