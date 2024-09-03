import React, { useState, useEffect } from "react";
import "./PostItems.css";
import profileImage from "../../Assets/profileImage.jpg";
import request from "superagent";

const PostItems = ({ data, setData, getData }) => {
  const [editImage, setEditImage] = useState();
  const [editData, setEditdata] = useState([]);
  const [editText, setEditText] = useState(data.post);
  const [isFormValid, setIsFormValid] = useState(false);
  const api_root = "http://139.59.47.49:4004/api/";

  //handle delete
  const handleDelete = async (id) => {
    try {
      const response = await request.delete(`${api_root}/post/delete/${id}`);
      console.log("Post deleted successfully");
      getData();
    } catch (error) {
      console.log("Error deleting post", error);
    }
  };

  const handleEdit = async (id) => {
    debugger;
    try {
      const response = await request.get(`${api_root}/post/${id}`);
      setEditdata(response.body);
      // console.log("edit data", response.body);
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  // useEffect(() => {
  //   console.log("useEffect");
  //   handleEdit();
  // }, []);

  //  image uploadImg

  const uploadImg = async (File) => {
    // debugger
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

  const handleEditPost = async (id) => {
    debugger;
    try {
       if(!editText || !editImage) {
        alert("Please enter text and upload an image.");
        return;

       }
      let filename = await uploadImg(editImage[0]);
      console.log("filename", filename);
      debugger;
      let items = {
        id: id,
        post: editText,
        background: filename,
      };
      // console.log(items);
      const apiRes = await request
        .put(`${api_root}post`)
        .set("Content-Type", "application/json")
        .send(items);
      const apiResData = apiRes.body;
      // console.log(apiResData);
      setEditText("");
      setEditImage();
      getData();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // Update form validity whenever edit text or edit image changes
    setIsFormValid(!!editText && !!editImage);
  }, [editText, editImage]);

  return (
    <>
      <div className="postItem-container mt-5 rounded-4">
        <div className="top-card">
          <div className="left-card">
            <img src={profileImage} alt="" />
            <h4>Jerry Luis</h4>
          </div>
          <div className="right-card">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target={`#staticBackdrop1${data?.id}`}
              onClick={() => handleEdit(data?.id)}
            >
              EDIT
            </button>

            <button
              type="button"
              className=" btn btn-danger"
              data-bs-toggle="modal"
              data-bs-target={`#staticBackdrop2${data?.id}`}
            >
              DELETE
            </button>
          </div>
        </div>
        <div className="bottom-card">
          <img
            src={`http://139.59.47.49:4004/${data?.background}`}
            alt="postImage"
            className="rounded-bottom-4"
          />
          <div className="content_text">
            <p>{data?.post}</p>
          </div>
        </div>
      </div>

      {/*.......Delete Modal...... */}

      <div
        className="modal fade modal-delete"
        id={`staticBackdrop2${data?.id}`}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content  ">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this post?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                id="yes-btn"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => handleDelete(data?.id)}
              >
                YES
              </button>
              <button
                type="button"
                id="no-btn"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                NO
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* {.....Edit modal} */}

      <div
        class="modal fade modal-edit"
        id={`staticBackdrop1${data?.id}`}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">
                Update Post
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="text-container w-100 ">
              <input
                onChange={(e) =>
                  // setEditdata({ ...editData, [e.target.name]: e.target.value })
                  // setData({ ...data, post: e.target.value })
                  setEditText(e.target.value)
                }
                value={editText}
                name="post"
                type="text"
                placeholder="What's on your mind?"
                className="w-100 border-0 p-2 "
              />
            </div>
            <div class="modal-body">
              <img
                src={
                  editImage && editImage.length
                    ? URL.createObjectURL(editImage[0])
                    : `http://139.59.47.49:4004/${data.background}`
                }
                alt="image"
              />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary">
                <label htmlFor="image-input">Select</label>
                <input
                  type="file"
                  id="image-input"
                  name="background"
                  onChange={(e) => {
                    setEditImage(e.target.files);
                  }}
                />
              </button>

              <button
                type="button"
                class="btn btn-success"
                data-bs-dismiss="modal"
                onClick={() => isFormValid && handleEditPost(data.id)}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostItems;
