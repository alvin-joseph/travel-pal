import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="container-fluid w-75">
      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
        <div className="container-fluid mt-3">
          <a className="navbar-brand mb-0 h1" href="/">
            <img
              src="../images/travel-app.png"
              alt=""
              width="30"
              height="29"
              className="d-inline-block align-text-top"
            />
            Travel Pal
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle h4"
                  id="navbarDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Get Started
                </button>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" to="/signup">
                      Sign Up
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/login">
                      Login
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="text-center mt-5 text-light welcome">
        <video
          src="/videos/PalmTrees.mp4"
          autoPlay
          loop
          muted
          className="homepage-video"
        />
        <h1>Welcome to Travel Pal</h1>
        <h2>Your one stop place to store and share memories from your trips</h2>
      </div>
      <div className="row mt-5">
        <div className="col-lg-6 p-lg-4">
          <img
            src="https://cdn.pixabay.com/photo/2021/09/07/11/53/car-6603726_960_720.jpg"
            alt="vacation"
            className="w-100 shadow p-1 bg-white rounded img1"
          />
        </div>
        <div className="col-lg-6 p-lg-5 mt-lg-5 mt-3 mt-sm-1 text-center">
          <h2>Create your trip and start uploading pictures</h2>
          <p className="h5">
            First come up with a name for the trip. Then you can upload a cover
            photo. Next upload pictures as you go. You can add captions as well
            to remember each moment.
          </p>
        </div>
        <div className="col-lg-6 p-lg-4 order-lg-2">
          <img
            src="https://cdn.pixabay.com/photo/2014/04/05/11/27/buffet-315691_960_720.jpg"
            alt="vacation"
            className="w-100 mt-4 shadow p-1 bg-white rounded img2"
          />
        </div>
        <div className="col-lg-6 p-lg-5 mt-lg-5 mt-3 order-lg-1 text-center">
          <h2>
            Add restaurants, notes, and anything else you would like to remember
          </h2>
          <p className="h5">
            Photos are just the beginning! Get more detailed about the places
            you have been by adding notes. Found a restaurant you love? Store it
            in your notes for next time! Have a random thought? Store that in
            your notes as well!
          </p>
        </div>
        <div className="col-lg-6 p-lg-4 order-lg-3">
          <img
            src="https://cdn.pixabay.com/photo/2019/07/04/06/41/extended-family-4315966_960_720.jpg"
            alt="vacation"
            className="w-100 mt-4 shadow p-1 bg-white rounded img3"
          />
        </div>
        <div className="col-lg-6 p-lg-5 mt-lg-5 mt-3 order-lg-4 text-center">
          <h2>Share your trips with friends and family</h2>
          <p className="h5">
            Why keep all the fun to yourself? Easily share your experiences with
            your friends and family. They will thank you for giving them the
            inside scoop on future travel destinations!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
