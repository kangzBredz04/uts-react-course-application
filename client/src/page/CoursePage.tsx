/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { Course } from "../types";
import CourseCard from "../component/CourseCard";
import CourseForm from "../component/CourseForm";
import { FiSearch } from "react-icons/fi";

export default function CoursePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [category, setCategory] = useState("Semua");
  const [sortBy, setSortBy] = useState<keyof Course>("id"); // Gunakan keyof Course di sini
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // Hanya 'asc' atau 'desc'
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | undefined>(
    undefined
  );

  useEffect(() => {
    fetchSandals();
  }, []);

  const fetchSandals = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/courses");
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  console.log(category);
  const filteredSortedCourse = courses
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return (a[sortBy] ?? "")
          .toString()
          .localeCompare((b[sortBy] ?? "").toString());
      } else {
        return (b[sortBy] ?? "")
          .toString()
          .localeCompare((a[sortBy] ?? "").toString());
      }
    })
    .filter(
      (course) =>
        course.name.toLowerCase().includes(keyword.toLowerCase()) ||
        course.description.toLowerCase().includes(keyword.toLowerCase()) ||
        (course.instructor.toLowerCase().includes(keyword.toLowerCase()) &&
          (category === "Semua" || course.subject === category))
    );

  const handleAddClick = () => {
    setSelectedCourse(undefined);
    setShowModal(true);
  };

  function handleEditClick(course: Course) {
    setSelectedCourse(course);
    setShowModal(true);
  }

  const handleSaveCourse = async (newCourse: Course) => {
    try {
      let response;
      if (selectedCourse) {
        response = await fetch(
          `http://localhost:8080/api/courses/${selectedCourse.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newCourse),
          }
        );
      } else {
        response = await fetch("http://localhost:8080/api/courses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCourse),
        });
      }
      if (!response.ok) {
        throw new Error(
          selectedCourse ? "Failed to update course" : "Failed to add course"
        );
      }
      fetchSandals();
    } catch (error) {
      console.error("Error saving couse:", error);
    }
  };

  async function handleDeleteCourse(id: number) {
    try {
      const response = await fetch(`http://localhost:8080/api/courses/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete course");
      }
      fetchSandals();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  }
  return (
    <div className="container mx-auto">
      <div className="my-7 flex items-center">
        <h1 className="text-3xl font-semibold w-1/4">Dashboard</h1>
        <div className="flex justify-between w-3/4">
          <div>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search..."
              className="p-2 border border-gray-300 rounded-l-md focus:outline-none"
            />
            <button className="bg-indigo-500 p-3 text-white  rounded-r-md">
              <FiSearch />
            </button>
          </div>
          <div className="flex gap-2 items-center">
            <p>Sorting:</p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as keyof Course)}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="id">Normal</option>
              <option value="name">Nama</option>
              <option value="instructor">Instructor</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
          <button
            onClick={handleAddClick}
            className="ml-4 bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Add Course
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {filteredSortedCourse.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onEdit={handleEditClick}
            onDelete={handleDeleteCourse}
          />
        ))}
      </div>
      {showModal && (
        <CourseForm
          onSave={handleSaveCourse}
          onClose={() => setShowModal(false)}
          initialCourse={selectedCourse}
        />
      )}
    </div>
  );
}
