package com.course.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.course.server.model.Course;
import com.course.server.repository.CourseRepository;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/courses")
public class CourseController {

    @Autowired
    private CourseRepository courseRepository;

    // Get All Data
    @GetMapping
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    // Create Data
    @PostMapping
    public Course createCourse(@RequestBody Course course) {
        return courseRepository.save(course);
    }

    // Update Data
    @PutMapping("/{id}")
    public Course updateCourse(@PathVariable Long id, @RequestBody Course courseDetails) {
        return courseRepository.findById(id)
                .map(course -> {
                    course.setName(courseDetails.getName());
                    course.setInstructor(courseDetails.getInstructor());
                    course.setDescription(courseDetails.getDescription());
                    course.setSubject(courseDetails.getSubject());
                    course.setNumberOfMeets(courseDetails.getNumberOfMeets());
                    return courseRepository.save(course);
                })
                .orElseThrow(() -> new RuntimeException("Sandal not found with id " + id));
    }

    // Delete Data
    @DeleteMapping("/{id}")
    public void deleteCourse(@PathVariable Long id) {
        courseRepository.deleteById(id);
    }
}
