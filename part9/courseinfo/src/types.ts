export interface CoursePartBase {
  name: string;
  exerciseCount: number;
  // id: string;
}

// interface CoursePartBaseWithOptionalDescription extends CoursePartBase {
//   name: "Fundamentals";
//   description: string;
// }

interface CoursePartOne extends CoursePartBase {
  name: "Fundamentals";
  description: string;
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBase {
  name: "Deeper type usage";
  description: string;
  exerciseSubmissionLink: string;
}

// interface CoursePartFour extends CoursePartBase {
//   name: "A History of Spam and Eggs";
//   description: string;
//   studentCount: number;
// }

export type CoursePart =
  | CoursePartOne
  | CoursePartTwo
  | CoursePartThree
  // | CoursePartFour;
