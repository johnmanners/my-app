'use client';
import { useState } from 'react';
import useSWR from 'swr';
import { ENDPOINTS } from '@/utils/endpoints';
import { getFromAPI } from '@/utils/api';
import { CATS } from '@/data/cats';
import { TAGS } from '@/data/tags';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function getCatEndpoint(slug) {
  if (!slug) return ENDPOINTS.DEFAULT_CAT;
  return ENDPOINTS.CATEGORY(slug);
}

export default function Home({ slug }) {
  const [showTags, setShowTags] = useState(false); // <--- state
  const endpoint = getCatEndpoint(slug);
  const { data: posts, error, isLoading } = useSWR(endpoint, getFromAPI);
  const pathname = usePathname();

  // Get the highlighted slug for categories
  const activeCatSlug = pathname.startsWith('/categories/') ? pathname.split('/')[2] : null;
  // ...or for tags/counties
  const activeTagSlug = pathname.startsWith('/counties/') ? pathname.split('/')[2] : null;

  function activateTags() {
    setShowTags(true);
  }

  function activateCats() {
    setShowTags(false);
  }

  const list = showTags ? TAGS : CATS;

  return (
    <div className="max-w-7xl mx-auto mt-5">
      <div className="flex gap-2">
        <button className={`px-3 py-1 ${showTags ? 'bg-gray-200' : 'bg-yellow-300'}`} onClick={activateCats}>
          Categories
        </button>
        <button className={`px-3 py-1 ${showTags ? 'bg-yellow-300' : 'bg-gray-200'}`} onClick={activateTags}>
          Counties
        </button>
      </div>
      <menu className="mt-20">
        <ul className="flex gap-4 justify-center items-center flex-wrap">
          {list.map(item => (
            <li
              key={item.slug}
              className={
                showTags
                  ? item.slug === activeTagSlug
                    ? 'font-bold'
                    : ''
                  : item.slug === activeCatSlug
                  ? 'font-bold'
                  : ''
              }
            >
              <Link href={showTags ? `/counties/${item.slug}` : `/categories/${item.slug}`}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </menu>
      <main className="mt-20">
        <ul className="grid grid-cols-5 gap-4 min-h-[200px]">
          {isLoading && <li className="col-span-5 text-center text-blue-500">Loading...</li>}
          {error && <li className="col-span-5 text-center text-red-500">{error.message || 'Failed to load.'}</li>}
          {posts && posts.length === 0 && <li className="col-span-5 text-center text-gray-400">No posts found.</li>}
          {posts &&
            posts.map(post => (
              <li key={post.id} className="p-4 border rounded">
                <h3 className="font-bold mb-2">{post.title}</h3>
              </li>
            ))}
        </ul>
      </main>
    </div>
  );
}
