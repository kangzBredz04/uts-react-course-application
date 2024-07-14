import { Course } from "../types";
import { FaUserCircle } from "react-icons/fa";

export default function CourseCard({
  course,
  onEdit,
  onDelete,
}: {
  course: Course;
  onEdit: (course: Course) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="border rounded-lg shadow-lg overflow-hidden">
      <img
        src="https://i.pinimg.com/564x/7e/05/8d/7e058d01d8ee1303f1eeb7d92a7b3c0c.jpg"
        alt=""
      />
      <div className="p-5 flex flex-col justify-between h-72">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold">{course.name}</h3>
          <p className="text-gray-700">{course.description}</p>
        </div>
        <div className="flex gap-3 items-center">
          <FaUserCircle size={24} />
          <p className="text-black text-lg font-bold">{course.instructor}</p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className=" bg-gray-400 py-1 w-36 rounded-2xl flex justify-center">
            <p className="text-black">{course.subject}</p>
          </div>
          <div className=" bg-gray-400 py-1 w-36 rounded-2xl flex justify-center">
            Total meet : {course.numberOfMeets}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(course)}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded  hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={() => {
              if (
                window.confirm(
                  `Apakah Anda yakin akan menghapus course ${course.name}?`
                )
              ) {
                onDelete(course.id!);
              }
            }}
            className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
