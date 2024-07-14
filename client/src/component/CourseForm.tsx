import { useState } from "react";
import { Course } from "../types";

const subjects = [
  "Logika Algoritma",
  "Struktur data",
  "Basis data",
  "Web fundamental",
  "Java Fundamental",
  "C# Fundamental",
  "React Fundamental",
  "Java Advance",
  "C# Advance",
  "React Advance",
  "React Java With Typescript",
];

export default function CourseForm({
  initialCourse,
  onSave,
  onClose,
}: {
  initialCourse: Course | undefined;
  onSave: (course: Course) => void;
  onClose: () => void;
}) {
  const [course, setCourse] = useState<Course>(
    initialCourse || {
      id: 0,
      name: "",
      instructor: "",
      description: "",
      subject: "",
      numberOfMeets: 0,
    }
  );

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    onSave(course);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg mx-10">
        <h2 className="text-2xl mb-4">
          {course.id ? "Edit Course" : "Add Course"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={course.name}
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
            placeholder="Name"
            className="w-full mb-4 p-2 border rounded"
          />
          <input
            type="text"
            value={course.instructor}
            onChange={(e) =>
              setCourse({ ...course, instructor: e.target.value })
            }
            placeholder="Instructor"
            className="w-full mb-4 p-2 border rounded"
          />
          <select
            value={course.subject}
            onChange={(e) => setCourse({ ...course, subject: e.target.value })}
            className="w-full mb-4 p-2 border rounded"
          >
            {subjects.map((subj) => (
              <option key={subj} value={subj}>
                {subj}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={course.numberOfMeets}
            onChange={(e) =>
              setCourse({ ...course, numberOfMeets: parseInt(e.target.value) })
            }
            placeholder="Number of Meets"
            className="w-full mb-4 p-2 border rounded"
          />
          <textarea
            value={course.description}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
            placeholder="Description"
            className="w-full mb-4 p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
