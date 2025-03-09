import React, { useEffect, useState } from "react";
import { replace, useNavigate, useParams } from "react-router-dom";
import supabase from "../supabase-config";

function Update() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSingleBlog = async () => {
      const { data, error } = await supabase
        .from("blogPosts")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        navigate("/", { replace: true });
      }
      if (data) {
        setTitle(data.title);
        setMethod(data.method);
        setRating(data.rating);
      }
    };
    fetchSingleBlog();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title && method && rating) {
      const { data, error } = await supabase
        .from("blogPosts")
        .update({ title, method, rating })
        .eq("id", id).select()
      if (error) {
        setError("Error while updating data.", error.message);
      }
      if (data) {
        navigate("/");
        console.log(data)
      }
    }
  };
  return (
    <div>
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
          className="p-3 sm:p-10 flex flex-col gap-4 mx-auto sm:w-3/5 xl:w-2/5"
        >
          <label>
            Title <br />
            <input
              type="text"
              required
              className="bg-neutral-100 border-2 border-gray-200 rounded-sm font-bold capitalize outline-0 p-2 w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <label>
            Method <br />
            <textarea
              required
              className="bg-neutral-100 border-2 border-gray-200 rounded-sm outline-0 p-2 w-full min-h-60"
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
              className="bg-neutral-100 border-2 border-gray-200 rounded-sm outline-0 p-2 w-full"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </label>

          <button className="bg-blue-500 text-white rounded-md p-2 text-lg font-bold">
            Update Blog Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default Update;
