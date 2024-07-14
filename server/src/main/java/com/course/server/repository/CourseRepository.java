package com.course.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.course.server.model.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {
}
