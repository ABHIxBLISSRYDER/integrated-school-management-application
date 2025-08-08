// Number of items to show per page in paginated components (e.g., tables, lists)
export const ITEM_PER_PAGE = 10;

// Type definition for the route access map
// Each key is a route (string), and its value is an array of roles allowed to access that route
type RouteAccessMap = {
  [key: string]: string[];
};

// Role-based access control map for protected routes
// Used by Clerk middleware to determine which roles can access specific routes
export const routeAccessMap: RouteAccessMap = {
  // Dashboard access routes
  "/admin(.*)": ["admin"],       // Only admin users can access /admin and its subroutes
  "/student(.*)": ["student"],   // Only students can access /student routes
  "/teacher(.*)": ["teacher"],   // Only teachers can access /teacher routes
  "/parent(.*)": ["parent"],     // Only parents can access /parent routes

  // Shared resource access
  "/list/teachers": ["admin", "teacher"],     // Visible to admins and teachers
  "/list/students": ["admin", "teacher"],     // Visible to admins and teachers
  "/list/parents": ["admin", "teacher"],      // Visible to admins and teachers
  "/list/subjects": ["admin"],                // Only admin can view/manage subjects
  "/list/classes": ["admin", "teacher"],      // Admins and teachers can access classes

  // Accessible to all user roles
  "/list/exams": ["admin", "teacher", "student", "parent"],
  "/list/assignments": ["admin", "teacher", "student", "parent"],
  "/list/results": ["admin", "teacher", "student", "parent"],
  "/list/attendance": ["admin", "teacher", "student", "parent"],
  "/list/events": ["admin", "teacher", "student", "parent"],
  "/list/announcements": ["admin", "teacher", "student", "parent"],
};
