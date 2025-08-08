"use client"; // Enables client-side interactivity (e.g., useRouter)

import Image from "next/image";
import { useRouter } from "next/navigation";

const TableSearch = () => {
  const router = useRouter(); // Router for programmatic navigation

  // Handles form submission for search input
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default page reload

    // Extract value from the first form element (input field)
    const value = (e.currentTarget[0] as HTMLInputElement).value;

    // Preserve existing query parameters and add/update the 'search' param
    const params = new URLSearchParams(window.location.search);
    params.set("search", value);

    // Push the updated URL with the new search param
    router.push(`${window.location.pathname}?${params}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2"
    >
      {/* Search Icon */}
      <Image src="/search.png" alt="" width={14} height={14} />
      
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        className="w-[200px] p-2 bg-transparent outline-none"
      />
    </form>
  );
};

export default TableSearch;
