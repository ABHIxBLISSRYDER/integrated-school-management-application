import prisma from "@/lib/prisma";
import Image from "next/image";

/**
 * Server-side UserCard component that fetches count from database
 * and applies color styling based on user type.
 */
const UserCard = async ({
  type,
}: {
  type: "admin" | "teacher" | "student" | "parent";
}) => {
  // Map the model to its Prisma instance
  const modelMap: Record<typeof type, any> = {
    admin: prisma.admin,
    teacher: prisma.teacher,
    student: prisma.student,
    parent: prisma.parent,
  };

  // Count total users of that type
  const data = await modelMap[type].count();

  // Define background colors per user type
  const colorMap: Record<typeof type, string> = {
    student: "bg-blue-100",
    teacher: "bg-yellow-200",
    parent: "bg-Purple",
    admin: "bg-green-200", // fallback color for admin
  };

  return (
    <div className={`rounded-2xl ${colorMap[type]} p-4 flex-1 min-w-[130px]`}>
      <div className="flex justify-between items-center">
        {/* Static academic year badge */}
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
          2024/25
        </span>
        <Image src="/more.png" alt="more icon" width={20} height={20} />
      </div>

      {/* Count of user type */}
      <h1 className="text-2xl font-semibold my-4">{data.toLocaleString()}</h1>

      {/* Label with capitalized user type */}
      <h2 className="capitalize text-sm font-medium text-gray-500">
        {type}s
      </h2>
    </div>
  );
};

export default UserCard;
