export function generateSprintPlan(req, res) {
  const goal = req.body.goal || "Build feature";
  res.json({
    goal,
    tasks: [
      { title: "Define acceptance criteria", priority: "HIGH", day: 1 },
      { title: "Design data model and API contract", priority: "HIGH", day: 1 },
      { title: "Implement UI and backend endpoints", priority: "HIGH", day: 2 },
      { title: "Add realtime updates and analytics hooks", priority: "MEDIUM", day: 3 },
      { title: "Test, polish, and deploy", priority: "HIGH", day: 4 }
    ],
    risk: "Medium deadline risk if auth and project APIs are not completed first."
  });
}
