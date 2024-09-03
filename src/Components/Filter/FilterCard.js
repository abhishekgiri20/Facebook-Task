import React, { useState } from "react";
import "./FilterCard.css";
import request from "superagent";
const FilterCard = ({ setData }) => {
  const [date, setDate] = useState();

  const api_root = "http://139.59.47.49:4004/api/posts?limit=50&start=1";

  // get filter post

  const getDatePost = async () => {
    try {
      const response = await request.get(`${api_root}&date=${date}&orderby=0`);
      setData(response.body);
      console.log(response);
      setDate("");
    } catch (error) {
      console.log("Uncaught error", error);
    }
  };
  return (
    <>
      <div className="post-container mt-5">
        <div className="post_item-container">
          <div className="card-text">
            <h3>Posts</h3>
          </div>
          <div className="card-btn">
            <button
              type="button"
              className="btn btn-outline-success"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop3"
            >
              Filters
            </button>
          </div>
        </div>
      </div>
      {/* ........... filter modal................ */}

      <div
        class="modal fade"
        id="staticBackdrop3"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content " id="filter-modal">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">
                Post Filters
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div className="body-title">
                <p id="top-text">Use filter to find posts on your timeline.</p>
                <p id="bottom-text">
                  This will not affect how others see your timeline.
                </p>
              </div>
              <div className="date-container d-flex align-items-center justify-content-center mt-2">
                <p>Go to:</p>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                id="filter-btn"
                class="btn btn-primary "
                data-bs-dismiss="modal"
                onClick={getDatePost}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterCard;
