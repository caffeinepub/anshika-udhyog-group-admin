import { GitBranch } from "lucide-react";
import { motion } from "motion/react";

const TREE_DATA = {
  name: "You",
  emoji: "👤",
  color: "#C7A24A",
  children: [
    {
      name: "Branch A",
      emoji: "🏭",
      color: "#3B82F6",
      children: [
        { name: "Center A1", emoji: "🏢", color: "#22C55E", members: 8 },
        { name: "Center A2", emoji: "🏢", color: "#22C55E", members: 5 },
      ],
    },
    {
      name: "Branch B",
      emoji: "🏭",
      color: "#8B5CF6",
      children: [
        { name: "Center B1", emoji: "🏢", color: "#EC4899", members: 12 },
        { name: "Center B2", emoji: "🏢", color: "#EC4899", members: 6 },
      ],
    },
  ],
};

function TreeNode({ node, depth = 0 }: { node: any; depth?: number }) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: depth * 0.1 }}
        className="flex flex-col items-center"
      >
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
          style={{
            background: `${node.color}15`,
            border: `2px solid ${node.color}40`,
          }}
        >
          {node.emoji}
        </div>
        <p
          className="text-xs font-semibold mt-1 text-center"
          style={{ color: node.color }}
        >
          {node.name}
        </p>
        {node.members && (
          <p className="text-[10px]" style={{ color: "#9CA3AF" }}>
            {node.members} members
          </p>
        )}
      </motion.div>

      {node.children && node.children.length > 0 && (
        <>
          <div
            className="w-px h-6"
            style={{ background: "rgba(20,45,74,0.2)" }}
          />
          <div className="flex gap-4 relative">
            {/* Horizontal line connector */}
            <div
              className="absolute top-0 left-7 right-7 h-px"
              style={{ background: "rgba(20,45,74,0.15)" }}
            />
            {node.children.map((child: any) => (
              <div key={child.name} className="flex flex-col items-center">
                <div
                  className="w-px h-5"
                  style={{ background: "rgba(20,45,74,0.2)" }}
                />
                <TreeNode node={child} depth={depth + 1} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function TeamTreeSection() {
  return (
    <div className="space-y-5 max-w-2xl">
      <div className="flex items-center gap-3">
        <div
          className="p-2.5 rounded-xl"
          style={{ background: "rgba(34,197,94,0.1)" }}
        >
          <GitBranch className="h-6 w-6" style={{ color: "#22C55E" }} />
        </div>
        <div>
          <h1 className="text-xl font-bold" style={{ color: "#142D4A" }}>
            Branch/Center/Team Tree 🌳
          </h1>
          <p className="text-sm" style={{ color: "#6B7280" }}>
            Your team hierarchy and network
          </p>
        </div>
      </div>

      <div
        className="rounded-xl p-6"
        style={{ background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
      >
        <div className="overflow-x-auto">
          <div className="flex justify-center min-w-max py-4">
            <TreeNode node={TREE_DATA} />
          </div>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            label: "Total Branches",
            value: "2",
            emoji: "🏭",
            color: "#3B82F6",
          },
          { label: "Total Centers", value: "4", emoji: "🏢", color: "#8B5CF6" },
          {
            label: "Total Members",
            value: "31",
            emoji: "👥",
            color: "#22C55E",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl p-4 text-center"
            style={{
              background: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            <div className="text-2xl mb-1">{stat.emoji}</div>
            <p className="text-xl font-bold" style={{ color: stat.color }}>
              {stat.value}
            </p>
            <p className="text-[10px]" style={{ color: "#9CA3AF" }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
