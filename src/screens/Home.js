import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
export default function Home() {
  const [search, setSearch] = useState("");
  const [FoodData, setFoodData] = useState([]);
  const [foodCategory, setFoodCategory] = useState([]);
  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setFoodData(response[0]);
    setFoodCategory(response[1]);
  };
  useEffect(() => {
    loadData();
  }, []);
  const onTyping = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div>
          <div
            id="carouselExampleFade"
            className="carousel slide carousel-fade"
            style={{ objectFit: "contain !important" }}
          >
            <div className="carousel-inner" id="carousel">
              <div className="carousel-caption" style={{ zIndex: "10" }}>
                <form className="d-flex justify-content-center">
                  <input
                    className="form-control mr-sm-2"
                    type="search"
                    name="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={search}
                    onChange={onTyping}
                  />
                  {/* <button
                    className="btn btn-outline-success my-2 my-sm-0 text-white bg-success"
                    type="submit"
                  >
                    Search
                  </button> */}
                </form>
              </div>
              <div className="carousel-item active">
                <img
                  src="https://source.unsplash.com/random/900×700/?Burger"
                  className="d-block w-100"
                  alt="..."
                  style={{ filter: "brightness(40%)" }}
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://source.unsplash.com/random/900×700/?fries"
                  className="d-block w-100"
                  alt="..."
                  style={{ filter: "brightness(40%)" }}
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://source.unsplash.com/random/900×700/?Ramen"
                  className="d-block w-100"
                  alt="..."
                  style={{ filter: "brightness(40%)" }}
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://source.unsplash.com/random/900×700/?kebab"
                  className="d-block w-100"
                  alt="..."
                  style={{ filter: "brightness(40%)" }}
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        {foodCategory !== []
          ? foodCategory.map((data) => {
              return (
                <div className="row mb-3">
                  <div key={data._id} className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr />
                  {FoodData !== []
                    ? FoodData.filter(
                        (item) =>
                          data.CategoryName === item.CategoryName &&
                          item.name
                            .toLowerCase()
                            .includes(search.toLocaleLowerCase())
                      ).map((filterItems) => {
                        return (
                          <div
                            key={filterItems._id}
                            className="col-12 col-md-6 col-lg-4"
                          >
                            <Card
                              // img={filterItems.img}
                              // key={filterItems._id}
                              // name={filterItems.name}
                              foodItem={filterItems}
                              options={filterItems.options[0]}
                            />
                          </div>
                        );
                      })
                    : "No such data found"}
                </div>
              );
            })
          : ""}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
