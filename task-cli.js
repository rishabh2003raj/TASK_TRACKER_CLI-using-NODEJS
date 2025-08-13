#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const crypto = require("crypto"); // For safe ID generation

// Path to tasks.json file
const filePath = path.join(__dirname, "tasks.json");

// Ensure file exists
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]");
}

// Load tasks from file
function loadTasks() {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

// Save tasks to file
function saveTasks(tasks) {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

// Generate a safe unique ID
function generateId() {
    return crypto.randomUUID(); // Universally unique ID
}

// Get command and arguments
const [,, command, ...args] = process.argv;

// Add a new task
function addTask(description) {
    const tasks = loadTasks();
    const newTask = {
        id: generateId(), // Use safe unique ID
        description,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    tasks.push(newTask);
    saveTasks(tasks);
    console.log(`✅ Task added: "${description}"`);
}

// List all tasks
function listTasks() {
    const tasks = loadTasks();
    if (tasks.length === 0) {
        console.log("📂 No tasks found.");
        return;
    }
    tasks.forEach(task => {
        console.log(`${task.id} | ${task.description} [${task.completed ? "✅" : "❌"}] 
  Created: ${task.createdAt} | Updated: ${task.updatedAt}`);
    });
}

// Update a task
function updateTask(id, newDescription) {
    const tasks = loadTasks();
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) {
        console.log("❌ Task not found!");
        return;
    }
    tasks[taskIndex].description = newDescription;
    tasks[taskIndex].updatedAt = new Date().toISOString();
    saveTasks(tasks);
    console.log(`✏️ Task ${id} updated to: "${newDescription}"`);
}

// Delete a task
function deleteTask(id) {
    let tasks = loadTasks();
    const newTasks = tasks.filter(t => t.id !== id);
    if (tasks.length === newTasks.length) {
        console.log("❌ Task not found!");
        return;
    }
    saveTasks(newTasks);
    console.log(`🗑️ Task ${id} deleted`);
}

// Mark a task as complete
function completeTask(id) {
    const tasks = loadTasks();
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) {
        console.log("❌ Task not found!");
        return;
    }
    tasks[taskIndex].completed = true;
    tasks[taskIndex].updatedAt = new Date().toISOString();
    saveTasks(tasks);
    console.log(`✅ Task ${id} marked as completed`);
}

// CLI command handler
switch (command) {
    case "add":
        addTask(args.join(" "));
        break;
    case "list":
        listTasks();
        break;
    case "update":
        updateTask(args[0], args.slice(1).join(" "));
        break;
    case "delete":
        deleteTask(args[0]);
        break;
    case "complete":
        completeTask(args[0]);
        break;
    default:
        console.log(`
📌 Task CLI Commands:
  task-cli add "task description"   → Add a new task
  task-cli list                     → Show all tasks
  task-cli update <id> "new desc"   → Update a task
  task-cli delete <id>              → Delete a task
  task-cli complete <id>            → Mark as complete
        `);
}
