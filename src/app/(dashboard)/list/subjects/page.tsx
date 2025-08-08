import FormContainer from "@/components/FormContainer"; 
import Pagination from "@/components/Pagination"; 
import Table from "@/components/Table"; 
import TableSearch from "@/components/TableSearch"; 

import prisma from "@/lib/prisma"; 
import { ITEM_PER_PAGE } from "@/lib/settings"; 

import { Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server"; 

// Define the shape of the data returned for each row in the table
type SubjectList = Subject & { teachers: Teacher[] };

// Main component
const SubjectListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  // Get current user role from Clerk session
  const { sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  // Table columns config
  const columns = [
    { header: "Subject Name", accessor: "name" },
    {
      header: "Teachers",
      accessor: "teachers",
      className: "hidden md:table-cell", // Hide on smaller screens
    },
    { header: "Actions", accessor: "action" }, // Shown only to admin
  ];

  // Render a single row of the table
  const renderRow = (item: SubjectList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-PurpleLight"
    >
      {/* Subject Name */}
      <td className="flex items-center gap-4 p-4">{item.name}</td>

      {/* List of Teachers (comma-separated) */}
      <td className="hidden md:table-cell">
        {item.teachers.map((teacher) => teacher.name).join(",")}
      </td>

      {/* Action buttons (only for admin) */}
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormContainer table="subject" type="update" data={item} />
              <FormContainer table="subject" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  // Extract page and filters from URL
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  // Build Prisma query based on filters
  const query: Prisma.SubjectWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.name = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }

  // Fetch filtered and paginated subjects with associated teachers
  const [data, count] = await prisma.$transaction([
    prisma.subject.findMany({
      where: query,
      include: {
        teachers: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.subject.count({ where: query }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Subjects</h1>

        {/* Search bar and action buttons */}
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />

          <div className="flex items-center gap-4 self-end">
            {/* Filter and Sort Icons */}
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-Yellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-Yellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>

            {/* Admin-only: Create Subject */}
            {role === "admin" && (
              <FormContainer table="subject" type="create" />
            )}
          </div>
        </div>
      </div>

      {/* TABLE */}
      <Table columns={columns} renderRow={renderRow} data={data} />

      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default SubjectListPage;
