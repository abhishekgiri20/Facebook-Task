import React, { useState, useEffect } from "react";
import "./PostCard.css";
import request from "superagent";
import camera from "../../Assets/camera.png";
import profileImage from "../../Assets/profileImage.jpg";
import PostItems from "../PostItems/PostItems";
import FilterCard from "../Filter/FilterCard";

const PostCard = () => {
  const [data, setData] = useState([]);
  const [image, setImage] = useState([]);
  const [text, setText] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");
  // const [page, setPage] = useState(1);
  // const [loading, setLoading] = useState(true)
  const api_root = "http://139.59.47.49:4004/api/";

  // get data function start from here
  async function fetchData() {
    try {
      const url = `${api_root}posts?limit=40&start=1&orderby=0`;
      const response = await request.get(url);
      setData(response.body);
      // setLoading(false)
      console.log("data", response.body);
    } catch (error) {
      console.log("Error fetching data", error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  //handleScrolling

  // const handleInfiniteScroll =   () => {

  //     if (
  //       window.innerHeight + document.documentElement.scrollTop >=
  //       document.documentElement.scrollHeight
  //     ) {
  //       setLoading(true)
  //       setPage((prev) => prev + 2);
  //     }

  // };
  // useEffect(() => {
  //   window.addEventListener("scroll", handleInfiniteScroll);
  //   return () => window.removeEventListener("scroll", handleInfiniteScroll);
  // }, []);

  const uploadImg = async (File) => {
    debugger;
    let filename = "";
    try {
      const response = await request
        .post(`${api_root}upload/image`)
        .attach("file", File);
      const responseData = response.body;
      filename = responseData.filename;
    } catch (error) {
      return error;
    }
    return filename;
  };

  //handlepost request

  const handlePostRequest = async () => {
    try {
      if (!text || !image.length) {
        alert("Please enter both text and upload an image.");
        return;
      }
      let filename = await uploadImg(image[0]);
      let items = {
        post: text,
        background: filename,
      };
      console.log(items);
      const apiRes = await request
        .post(`${api_root}post`)
        .set("Content-Type", "application/json")
        .send(items);
      const apiResData = apiRes.body;
      console.log(apiResData);
      setText("");
      setImage(null);
      // setErrorMessage("");
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <div className="post-container mt-2">
        <div className="post_item-container">
          <div className="card-image">
            <img src={profileImage} alt="" />
          </div>
          <div className="card-input">
            <input
              type="text"
              placeholder="What's on your mind?"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            />
          </div>
        </div>
      </div>
      <FilterCard setData={setData} />
      {data?.length ? (
        data?.map((value) => {
          return (
            <PostItems data={value} setData={setData} getData={fetchData} />
          );
        })
      ) : (
        <div className="container col-md-8 nodata">
          <p>No data is available for specified date.</p>
        </div>
      )}

      {/* <!--    Post Modal    --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5 text-center"
                id="exampleModalLabel"
              >
                Create Post
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="text-container w-100 ">
              <input
                onChange={(e) => {
                  setText(e.target.value);
                }}
                value={text}
                type="text"
                placeholder="What's on your mind?"
                className="w-100 border-0 p-2 "
              />
            </div>
            <div className="modal-body">
              {image?.length ? (
                <img
                  src={URL.createObjectURL(image[0])}
                  alt="What's on your mind?"
                />
              ) : (
                ""
              )}
            </div>
            <div className="modal-footer">
              <label htmlFor="actual-btn">
                <img src={camera} alt="" />
              </label>
              <input
                type="file"
                id="actual-btn"
                hidden
                onChange={(e) => {
                  setImage(e.target.files);
                }}
              />
              <button
                onClick={handlePostRequest}
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                aria-label="Close"
                disabled={!(text.length > 5) || !image?.length}
              >
                Post
              </button>
            
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;
