import useOnClickOutside from "@/hooks/useOnClickOutside";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from 'react';

interface AppProps {
  openMenu: boolean
}

export default function Dashboard({ openMenu }: AppProps) {
  const router = useRouter();
  const ref = useRef(null);
  const currentRoute = router.pathname;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  useOnClickOutside(ref, () => setIsSidebarOpen(false));

  return (
    <>
      <nav ref={ref} className={`fixed top-0 left-0 z-20 h-full pb-10 overflow-x-hidden overflow-y-auto transition origin-left transform bg-white border-r w-60 md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} `}>
        <Link href="https://kutty.netlify.app/" className="flex items-center px-4 py-5">
          <svg className="hidden w-auto h-6 md:block" width="86" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 335 93" aria-hidden="true"><path d="M134.71 45.7599c1.32-1.44 2.67-2.94 4.05-4.5 1.44-1.56 2.82-3.09 4.14-4.59 1.32-1.56 2.55-3.03 3.69-4.41 1.2-1.38 2.22-2.58 3.06-3.6h15.93c-3.18 3.66-6.3 7.17-9.36 10.53-3 3.3-6.3 6.72-9.9 10.26 1.8 1.62 3.66 3.57 5.58 5.85 1.92 2.22 3.78 4.53 5.58 6.93 1.8 2.4 3.45 4.8 4.95 7.2s2.76 4.59 3.78 6.57h-15.39c-.96-1.56-2.07-3.27-3.33-5.13-1.2-1.92-2.49-3.81-3.87-5.67-1.38-1.92-2.85-3.75-4.41-5.49-1.5-1.74-3-3.21-4.5-4.41v20.7H121.3V8.31991l13.41-2.16V45.7599zm74.64 28.62c-2.28.66-5.22 1.26-8.82 1.8-3.6.6-7.38.9-11.34.9-4.02.0-7.38-.54-10.08-1.62-2.64-1.08-4.74-2.58-6.3-4.5-1.56-1.98-2.67-4.32-3.33-7.02-.66-2.7-.99-5.67-.99-8.91v-26.37h13.41v24.75c0 4.32.57 7.44 1.71 9.36 1.14 1.92 3.27 2.88 6.39 2.88.96.0 1.98-.03 3.06-.09 1.08-.12 2.04-.24 2.88-.36v-36.54h13.41v45.72zM217.888 16.8699l13.41-2.16v13.95h16.11v11.16h-16.11v16.65c0 2.82.48 5.07 1.44 6.75 1.02 1.68 3.03 2.52 6.03 2.52 1.44.0 2.91-.12 4.41-.36 1.56-.3 2.97-.69 4.23-1.17l1.89 10.44c-1.62.66-3.42 1.23-5.4 1.71-1.98.48-4.41.72-7.29.72-3.66.0-6.69-.48-9.09-1.44-2.4-1.02-4.32-2.4-5.76-4.14-1.44-1.8-2.46-3.96-3.06-6.48-.54-2.52-.81-5.31-.81-8.37v-39.78zm36.391.0 13.409-2.16v13.95h16.11v11.16h-16.11v16.65c0 2.82.48 5.07 1.44 6.75 1.02 1.68 3.03 2.52 6.03 2.52 1.44.0 2.91-.12 4.41-.36 1.56-.3 2.97-.69 4.23-1.17l1.891 10.44c-1.62.66-3.421 1.23-5.401 1.71s-4.409.72-7.289.72c-3.66.0-6.691-.48-9.091-1.44-2.4-1.02-4.32-2.4-5.76-4.14-1.44-1.8-2.459-3.96-3.059-6.48-.54-2.52-.81-5.31-.81-8.37v-39.78zm79.749 11.79c-2.7 9.12-5.52 17.67-8.46 25.65-2.94 7.98-6.15 15.72-9.63 23.22-1.26 2.7-2.52 4.98-3.78 6.84-1.26 1.92-2.64 3.48-4.14 4.68-1.5 1.26-3.21 2.16-5.13 2.7-1.86.6-4.05.9-6.57.9-2.1.0-4.05-.21-5.85-.63-1.74-.36-3.18-.78-4.32-1.26l2.34-10.71c1.38.48 2.61.81 3.69.99 1.08.18 2.22.27 3.42.27 2.4.0 4.23-.66 5.49-1.98 1.32-1.26 2.43-3.03 3.33-5.31-3.06-6-6.12-12.72-9.18-20.16-3.06-7.5-5.94-15.9-8.64-25.2h14.22c.6 2.34 1.29 4.89 2.07 7.65.84 2.7 1.71 5.46 2.61 8.28.9 2.76 1.8 5.46 2.7 8.1.96 2.64 1.86 5.04 2.7 7.2.78-2.16 1.59-4.56 2.43-7.2.84-2.64 1.65-5.34 2.43-8.1.84-2.82 1.62-5.58 2.34-8.28.78-2.76 1.47-5.31 2.07-7.65h13.86z" fill="#1a202c"></path><path d="M5.61825.4114C24.3953-2.95442 43.4551 21.1695 51.21 34.8757v29.6906c-4.8347 14.2497-12.952 19.1401-20.8473 19.362-12.7347.358-22.758-14.27-17.6881-25.9574 2.926-6.7451 8.905-10.1655 13.0016-11.2189C5.61473 45.9161.32294 23.2628.01461 7.98884-.05756 4.41366 2.09844 1.04233 5.61825.4114z" fill="#9e58e9"></path><path d="M96.8018.4114C78.0247-2.95442 58.9649 21.1695 51.21 34.8757v29.6906c4.8347 14.2497 12.952 19.1401 20.8474 19.362 12.7346.358 22.7579-14.27 17.688-25.9574-2.9259-6.7451-8.905-10.1655-13.0015-11.2189 20.0614-.8359 25.3531-23.4892 25.6611-38.76316.073-3.57518-2.083-6.94651-5.6032-7.57744z" fill="#7629c8"></path></svg>
        </Link>
        <nav className="text-sm font-medium text-gray-500" aria-label="Main Navigation">
          <Link className={`flex items-center px-4 py-3 transition cursor-pointer group hover:bg-gray-100 hover:text-gray-900 ${currentRoute === '/profile' ? "text-gray-900 bg-gray-100" : ""} `} href="/profile"><svg className="shrink-0 w-5 h-5 mr-2 text-gray-400 transition group-hover:text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentcolor"><path d="M10.707 2.293a1 1 0 00-1.414.0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
            <span>Home</span>
          </Link>
          <Link className={`flex items-center px-4 py-3 transition cursor-pointer group hover:bg-gray-100 hover:text-gray-900 ${currentRoute === '/' ? "text-gray-900 bg-gray-100" : ""} `} href="#"><svg className="shrink-0 w-5 h-5 mr-2 text-gray-400 transition group-hover:text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentcolor"><path d="M5 3a1 1 0 000 2c5.523.0 10 4.477 10 10a1 1 0 102 0C17 8.373 11.627 3 5 3z"></path><path d="M4 9a1 1 0 011-1 7 7 0 017 7 1 1 0 11-2 0 5 5 0 00-5-5A1 1 0 014 9zM3 15a2 2 0 114 0 2 2 0 01-4 0z"></path></svg>
            <span>Articles</span>
          </Link>
          <Link className={`flex items-center px-4 py-3 transition cursor-pointer group hover:bg-gray-100 hover:text-gray-900 ${currentRoute === '/' ? "text-gray-900 bg-gray-100" : ""} `} href="#"><svg className="shrink-0 w-5 h-5 mr-2 text-gray-300 transition group-hover:text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentcolor"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5A1 1 0 014 7zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path></svg>
            <span>Collections</span>
          </Link>
          <Link className={`flex items-center px-4 py-3 transition cursor-pointer group hover:bg-gray-100 hover:text-gray-900 ${currentRoute === '/' ? "text-gray-900 bg-gray-100" : ""} `} href="#"><svg className="shrink-0 w-5 h-5 mr-2 text-gray-400 transition group-hover:text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentcolor"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414.0l4-4z" clipRule="evenodd"></path></svg>
            <span>Checklists</span>
          </Link>
          <Link className={`flex items-center px-4 py-3 transition cursor-pointer group hover:bg-gray-100 hover:text-gray-900 ${currentRoute === '/' ? "text-gray-900 bg-gray-100" : ""} `} href="#"><svg className="shrink-0 w-5 h-5 mr-2 text-gray-400 transition group-hover:text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentcolor"><path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9A1 1 0 109 9v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5A1 1 0 108 6h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd"></path><path d="M9 11H3v5a2 2 0 002 2h4v-7zm2 7h4a2 2 0 002-2v-5h-6v7z"></path></svg>
            <span>Changelog</span>
          </Link>
          <Link className={`flex items-center px-4 py-3 transition cursor-pointer group hover:bg-gray-100 hover:text-gray-900 ${currentRoute === '/' ? "text-gray-900 bg-gray-100" : ""} `} href="#"><svg className="shrink-0 w-5 h-5 mr-2 text-gray-400 transition group-hover:text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentcolor"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98.0a1.532 1.532.0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6.0 2.978a1.532 1.532.0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532.0 012.287.947c.379 1.561 2.6 1.561 2.978.0a1.533 1.533.0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533.0 01.947-2.287c1.561-.379 1.561-2.6.0-2.978a1.532 1.532.0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532.0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path></svg>
            <span>Settings</span>
          </Link>
        </nav>
      </nav>
    </>
  )
}