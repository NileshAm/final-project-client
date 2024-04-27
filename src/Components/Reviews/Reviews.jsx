import ErrorField from "Components/ErrorField/ErrorField";
import StarRating from "Components/StarRating/StarRating";
import getServerURL from "Utils/getServerURL";
import axios from "axios";
import React, { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  const id = useParams().id;

  useLayoutEffect(() => {
    axios
      .get(getServerURL(`/product/reviews?id=${id}`))
      .then((res) => {
        setReviews(res.data[0]);
      });
    //eslint-disable-next-line
  }, []);
  return (
    <div className="m-2 mx-3 p-2 px-3 border rounded rounded-2 shadow-sm">
      {
        <>
          <ReviewBox id={id}/>
          <hr />
        </>
      }
      <div>
        {reviews.length === 0 ? (
          <div className="text-secondary text-align-center">
            No reviews yet for this product. <br /> Write a review.
          </div>
        ) : (
          reviews.map((v, k) => {
            return <Review data={v} key={k} />;
          })
        )}
      </div>
    </div>
  );
};

const ReviewBox = ({id}) => {
  const itr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [stars, setStars] = useState(0);
  const [starsSet, setStarsSet] = useState(false);
  const [error, setError] = useState("");

  const addReview = (id) => {
    const details = document.getElementById("Description").value;
    if (stars === 0) {
      setError("Give a score rating by clicking on the stars");
    } else if (details === "") {
      setError("Give a description for the review");
    } else {
      const form = new FormData();
      form.append("ID", id);
      form.append("Rating", stars);
      form.append("Description", details);

      axios.post(getServerURL("/product/reviews/add"), form).then((res) => {
        if (res.data.code === 403) {
          alert("Please Log in to review Products");
        } else if (res.data.code === 200) {
          alert("Product review added successfully");
        }
      });
    }
  };

  return (
    <>
      <div className="fs-3">Write a Review ......</div>
      <div className="row col-1 position-absolute">
        {itr.map((v, k) => {
          return (
            <div
              className="bg-dangr text-transparent col cursor-pointer"
              onClick={(event) => {
                setError("");
                setStarsSet(!starsSet);
                setStars((event.target.innerText * 1 + 1) / 2);
              }}
              onMouseOver={(event) => {
                if (!starsSet) {
                  setStars((event.target.innerText * 1 + 1) / 2);
                }
              }}
              onMouseOut={() => {
                if (!starsSet) {
                  setStars(0);
                }
              }}
            >
              {v}
            </div>
          );
        })}
      </div>
      <StarRating Rating={stars} starSize={15} className="col-1 position-" />
      <input
        type="text"
        className="form-control mt-2"
        placeholder="Write a review here ......."
        id="Description"
        name="Description"
        onChange={() => {
          setError("");
        }}
      />
      <ErrorField>{error}</ErrorField>
      <button
        className="btn btn-outline-success mt-2 col-12 offset-0 col-md-3 offset-md-9"
        onClick={() => {
          addReview(id);
        }}
        disabled={error !== ""}
      >
        Submit review
      </button>
    </>
  );
};

const Review = ({ data }) => {
  return (
    <div className="border p-1 px-2 rounded mb-2">
      <div className="fs-4">{data.Name}</div>
      <div className="row">
        <StarRating
          Rating={data.Rating}
          starSize={15}
          className="col col-md-1 col-4 ms-1"
        />
        <div className="col mt-1 fs-7 ms-3 text-secondary">
          {data.Date.replace("T", " ")}
        </div>
      </div>
      <div className="mt-1">{data.Description}</div>
    </div>
  );
};

export default Reviews;
