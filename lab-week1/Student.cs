using System;

public class Student
{
	string firstName;
	string lastName;
	int courseId;
	
	public Student(string firstName, string lastName, int courseId )
	{
		this.firstName = firstName;
		this.lastName = lastName;
		this.courseId = courseId;
	}
	
	// Return a formatted string with students firstname, last name and course
	public string getFormattedName()
	{
		// code that returns the first name, last name and course id for the student.
		return $"Student: {this.firstName} {this.lastName} is in course {this.courseId}";
	}
}