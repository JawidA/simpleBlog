import React, { useState } from "react";
import supabase from "../supabase-config";
import { useNavigate } from "react-router-dom";

function Create() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState("");

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("blogPosts")
      .insert([{ title, method, rating }])
      .select();

    if (error) {
      setError("Error occured while inserting data: ", error.message);
    }
    if (data) {
      setError(null);
      navigate("/");
    }
  };

  return (
    <div className="m-auto lg:px-40 p-5">
      <div className="container mx-auto">
        <div>
          {error && (
            <div className="w-full min-h-14 text-center text-lg md:text-2xl font-bold border-2 border-red-900 text-gray-200 my-5 p-5 bg-red-500 flex items-center justify-center rounded-md">
              {error}
            </div>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="sm:p-10 flex flex-col gap-4 mx-auto sm:w-3/5 xl:w-2/5"
        >
          <label>
            Title <br />
            <input
              type="text"
              required
              className="bg-gray-100 rounded-sm font-bold capitalize outline-0 p-2 w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <label>
            Method <br />
            <textarea
              required
              className="bg-gray-100 rounded-sm outline-0 p-2 w-full min-h-30"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            />
          </label>

          <label>
            Rating <br />
            <input
              type="number"
              required
              min={0}
              max={5}
              className="bg-gray-100 rounded-sm outline-0 p-2 w-full"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </label>

          <button className="bg-blue-500 text-white rounded-md p-2 text-lg font-bold">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default Create;
