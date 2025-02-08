const topologicalSort = require("./toSort").topoSort;

const prioritizeTasks = (tasks) => {
    try {
        // Perform Topological Sorting
        const sortedTasks = topologicalSort(tasks).sortedTasks;

        // Priority Mapping (Convert to Numeric for Sorting)
        const priorityMap = { "HIGH": 1, "MEDIUM": 2, "LOW": 3 };

        // Sort based on priority, maintaining topological order
        const prioritizedTasks = sortedTasks.sort((a, b) => {
            const priorityA = priorityMap[a.priority] || 3; // Default to LOW if missing
            const priorityB = priorityMap[b.priority] || 3;

            return priorityA - priorityB; // Lower number = Higher priority
        });

        return { prioritizedTasks, message: "Tasks prioritized successfully" };
    } catch (error) {
        return { prioritizedTasks: [], message: error.message };
    }
};

module.exports = { prioritizeTasks };
