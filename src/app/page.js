"use client";
import useSWR from "swr";
import { ENDPOINTS } from "@/utils/endpoints";
import { getFromAPI } from "@/utils/api";
import { CATS } from "@/data/cats";

export default function Home() {
  // Provide endpoint as key, function as fetcher
  const {
    data: posts,
    error,
    isLoading,
  } = useSWR(ENDPOINTS.DEFAULT_CAT, getFromAPI);

  return (
    <>
      <menu className="max-w-7xl mx-auto mt-20">
        <ul className="flex gap-4 justify-center items-center">
          {CATS.map((cat) => (
            <li key={cat.slug} className="">
              {cat.name}
            </li>
          ))}
        </ul>
      </menu>
      <main className="max-w-7xl mx-auto mt-20">
        <ul className="grid grid-cols-5 gap-4 min-h-[200px]">
          {isLoading && (
            <li className="col-span-5 text-center text-blue-500">Loading...</li>
          )}
          {error && (
            <li className="col-span-5 text-center text-red-500">
              {error.message || "Failed to load."}
            </li>
          )}
          {posts && posts.length === 0 && (
            <li className="col-span-5 text-center text-gray-400">
              No posts found.
            </li>
          )}
          {posts &&
            posts.map((post) => (
              <li key={post.id} className="p-4 border rounded">
                <h3 className="font-bold mb-2">{post.title}</h3>
              </li>
            ))}
        </ul>
      </main>
    </>
  );
}
