### Task: Contribute Your Reflection to the Live Class Web Application

1. Fork the repo: `https://github.com/<your-username>/bioinfo-msc-2026-reflections`
2. Clone your fork:
   git clone https://github.com/<your-github-username>/bioinfo-msc-2026-reflections.git
   cd bioinfo-msc-2026-reflections

3. Create a branch named with your student ID:
   git checkout -b add-reflection-<your-id>

4. ## Create your file inside `src/reflections/` named `<your-id>.md`:

   name: "Your Full Name"
   studentId: "Your Student ID"
   githubUsername: "your-github-handle"
   favoriteTopic: "Your Favorite Linux/C++ Topic"
   quote: "One short quote about your experience"

   ***

   ### Course Reflection

   Write 2-3 sentences here about what you learned in Unit 1 and Unit 2.

5. Stage, commit, and push:
   git add src/reflections/<your-id>.md
   git commit -m "docs: Add reflection for <Your Name>"
   git push -u origin add-reflection-<your-id>

6. Go to GitHub, click "Compare & pull request", and submit!
7. Once merged by the instructor, check your contribution live at:
   https://bioinfo-msc-2026-reflections.vercel.app
