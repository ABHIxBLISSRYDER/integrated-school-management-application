import { z } from "zod";

/**
 * ======================
 * Subject Schema
 * ======================
 */
export const subjectSchema = z.object({
  id: z.coerce.number().optional(), // Optional for updates
  name: z.string().min(1, { message: "Subject name is required!" }),
  teachers: z.array(z.string()), // Array of teacher IDs (strings)
});

export type SubjectSchema = z.infer<typeof subjectSchema>;

/**
 * ======================
 * Class Schema
 * ======================
 */
export const classSchema = z.object({
  id: z.coerce.number().optional(), // Optional for updates
  name: z.string().min(1, { message: "Subject name is required!" }),
  capacity: z.coerce.number().min(1, { message: "Capacity name is required!" }),
  gradeId: z.coerce.number().min(1, { message: "Grade name is required!" }),
  supervisorId: z.coerce.string().optional(), // Optional supervisor (teacher) ID
});

export type ClassSchema = z.infer<typeof classSchema>;

/**
 * ======================
 * Teacher Schema
 * ======================
 */
export const teacherSchema = z.object({
  id: z.string().optional(), // Optional for updates
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .optional()
    .or(z.literal("")), // Allow optional empty string for update
  name: z.string().min(1, { message: "First name is required!" }),
  surname: z.string().min(1, { message: "Last name is required!" }),
  email: z
    .string()
    .email({ message: "Invalid email address!" })
    .optional()
    .or(z.literal("")), // Optional and can be empty
  phone: z.string().optional(),
  address: z.string(),
  img: z.string().optional(), // Profile image URL
  bloodType: z.string().min(1, { message: "Blood Type is required!" }),
  birthday: z.coerce.date({ message: "Birthday is required!" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
  subjects: z.array(z.string()).optional(), // Array of subject IDs
});

export type TeacherSchema = z.infer<typeof teacherSchema>;

/**
 * ======================
 * Student Schema
 * ======================
 */
export const studentSchema = z.object({
  id: z.string().optional(), // Optional for updates
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .optional()
    .or(z.literal("")), // Optional/empty string for updates
  name: z.string().min(1, { message: "First name is required!" }),
  surname: z.string().min(1, { message: "Last name is required!" }),
  email: z
    .string()
    .email({ message: "Invalid email address!" })
    .optional()
    .or(z.literal("")),
  phone: z.string().optional(),
  address: z.string(),
  img: z.string().optional(),
  bloodType: z.string().min(1, { message: "Blood Type is required!" }),
  birthday: z.coerce.date({ message: "Birthday is required!" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
  gradeId: z.coerce.number().min(1, { message: "Grade is required!" }),
  classId: z.coerce.number().min(1, { message: "Class is required!" }),
  parentId: z.string().min(1, { message: "Parent Id is required!" }),
});

export type StudentSchema = z.infer<typeof studentSchema>;

/**
 * ======================
 * Exam Schema
 * ======================
 */
export const examSchema = z.object({
  id: z.coerce.number().optional(), // Optional for updates
  title: z.string().min(1, { message: "Title name is required!" }),
  startTime: z.coerce.date({ message: "Start time is required!" }),
  endTime: z.coerce.date({ message: "End time is required!" }),
  lessonId: z.coerce.number({ message: "Lesson is required!" }), // Foreign key reference
});

export type ExamSchema = z.infer<typeof examSchema>;
