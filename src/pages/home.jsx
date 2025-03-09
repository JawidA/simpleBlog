import React, { useEffect, useState, useContext } from "react";
import supabase from "../supabase-config";
import BlogCard from "../component/blogCard";

import { ThemeContext } from "../component/useContext";

function Home() {
  const [error, setError] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const [blogs, setBlogs] = useState(null);
  const [orderBy, setOrderBy] = useState('created_at')

  const {themeColor} = useContext(ThemeContext)

  const handleDeleteUI = (id) => {
    setBlogs((prevBlogs) => {
      return prevBlogs.filter((item) => {
        return item.id !== id;
      });
    });
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const { error, data } = await supabase.from("blogPosts").select().order(orderBy, {ascending : false});

      if (error) {
        setError("Error while fetching data: " + error.message);
        setIsLoading(false);
      } else {
        setBlogs(data);
        setError(null);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [orderBy]);

  return (
    <div className="m-auto lg:px-40 p-5">
      <div>
        {isloading && (
          <div className="w-full h-14 text-lg md:text-2xl font-bold border-2 border-gray-300 bg-gray-200 flex my-5 p-5 items-center justify-center rounded-md">
            loading
          </div>
        )}
      </div>
      <div>
        {error && (
          <div className="w-full min-h-14 text-center text-lg md:text-2xl font-bold border-2 border-red-900 text-gray-200 my-5 p-5 bg-red-500 flex items-center justify-center rounded-md">
            {error}
          </div>
        )}
      </div>

      <div className="mb-5 py-5">
        <h2 className="text-xl font-semibold">Order By:</h2>
        <div className="flex items-center gap-2 mt-2 border-b-2 border-gray-200 pb-2">
          <button onClick={() => {setOrderBy('created_at')}} className={`${themeColor} px-3 py-1 text-lg rounded-md cursor-pointer text-white`}>Date</button>
          <button onClick={() => {setOrderBy('title')}} className={`${themeColor} px-3 py-1 text-lg rounded-md cursor-pointer text-white`}>Title</button>
          <button onClick={() => {setOrderBy('rating')}} className={`${themeColor} px-3 py-1 text-lg rounded-md cursor-pointer text-white`}>Rating</button>
          {orderBy}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
        {blogs &&
          blogs.map((item) => (
            <BlogCard
              key={item.id}
              blogs={item}
              handleDeleteUI={handleDeleteUI}
            />
          ))}
      </div>
    </div>
  );
}

export default Home;
