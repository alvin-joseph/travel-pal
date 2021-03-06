import React from "react";

const SelectedImage = ({ clickedId, setClickedId, pics }) => {
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
      data-bs-backdrop="static"
      data-bs-keyboard="false"
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
          <div className="modal-body trip-img-body">
            <div
              id="trip-carousel"
              className="carousel slide carousel-fade"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                {pics &&
                  pics.map((pic) => (
                    <div
                      className={`carousel-item ${
                        clickedId === pic.id ? "active" : ""
                      }`}
                      key={pic.id}
                    >
                      <img
                        className="d-block w-100"
                        src={pic.url}
                        alt="full-size"
                      />
                      <div className="carousel-caption d-block">
                        <h5>{pic.caption}</h5>
                      </div>
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
            {pics.length > 1 ? (
              <p className="mx-auto" id="exampleModalLabel">
                (Place mouse over photo to pause)
              </p>
            ) : null}
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
