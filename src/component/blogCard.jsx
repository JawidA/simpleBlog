import React, {useContext} from "react";
import { Link } from "react-router-dom";
import supabase from "../supabase-config";
import { ThemeContext } from "./useContext";

function BlogCard({ blogs, handleDeleteUI }) {

  const {themeColor} = useContext(ThemeContext);

  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("blogPosts")
      .delete()
      .eq("id", blogs.id)
      .select();

    if (error) {
      alert(error.message);
    }
    if (data) {
      handleDeleteUI(blogs.id);
    }
  };

  return (
    <div className="bg-gray-100 rounded-md px-7 py-4 relative border-gray-200 border-2 cursor-pointer">
      <h1 className="font-bold my-1 text-xl">{blogs.title.substr(0, 25)}...</h1>
      <p className="text-neutral-700">{blogs.method.substr(0, 120)}...</p>
      <div className={`${themeColor} absolute -top-3 -right-3 w-8 h-8 flex justify-center items-center text-white rounded-md`}>
        <p>{blogs.rating}</p>
      </div>
      <div className="mt-3 text-xl bg-neutral-300 rounded-full inline-block p-1 ml-auto">
        <Link className="" to={`/${blogs.id}`}>
          🖋️
        </Link>
      </div>
      <label
        onClick={handleDelete}
        className="bg-neutral-300 p-2 rounded-full ml-2"
      >
        🪣
      </label>
    </div>
  );
}

export default BlogCard;
