import { Briefcase } from "lucide-react";
import { motion } from "motion/react";

const MOCK_TASKS = [
  {
    emoji: "📞",
    title: "Follow up with 5 new leads",
    priority: "High",
    due: "Today",
    status: "pending",
  },
  {
    emoji: "📋",
    title: "Submit monthly sales report",
    priority: "Medium",
    due: "Apr 8, 2026",
    status: "pending",
  },
  {
    emoji: "🤝",
    title: "Attend weekly team meeting",
    priority: "Low",
    due: "Apr 10, 2026",
    status: "completed",
  },
  {
    emoji: "💰",
    title: "Collect payment from retailer",
    priority: "High",
    due: "Apr 6, 2026",
    status: "pending",
  },
];

export function WorkSection() {
  return (
    <div className="space-y-5 max-w-lg">
      <div className="flex items-center gap-3">
        <div
          className="p-2.5 rounded-xl"
          style={{ background: "rgba(20,184,166,0.1)" }}
        >
          <Briefcase className="h-6 w-6" style={{ color: "#14B8A6" }} />
        </div>
        <div>
          <h1 className="text-xl font-bold" style={{ color: "#142D4A" }}>
            Work Tasks 💼
          </h1>
          <p className="text-sm" style={{ color: "#6B7280" }}>
            Your assigned tasks and work items
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {MOCK_TASKS.map((task) => (
          <motion.div
            key={task.title}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-xl p-4 flex items-center gap-3"
            style={{
              background: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              opacity: task.status === "completed" ? 0.6 : 1,
            }}
          >
            <span className="text-2xl">{task.emoji}</span>
            <div className="flex-1">
              <p
                className="text-sm font-medium"
                style={{
                  color: "#111827",
                  textDecoration:
                    task.status === "completed" ? "line-through" : "none",
                }}
              >
                {task.title}
              </p>
              <div className="flex gap-2 mt-1">
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                  style={{
                    background:
                      task.priority === "High"
                        ? "rgba(239,68,68,0.1)"
                        : task.priority === "Medium"
                          ? "rgba(245,158,11,0.1)"
                          : "rgba(34,197,94,0.1)",
                    color:
                      task.priority === "High"
                        ? "#EF4444"
                        : task.priority === "Medium"
                          ? "#F59E0B"
                          : "#22C55E",
                  }}
                >
                  {task.priority}
                </span>
                <span className="text-[10px]" style={{ color: "#9CA3AF" }}>
                  Due: {task.due}
                </span>
              </div>
            </div>
            {task.status === "completed" && <span className="text-lg">✅</span>}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
