# 📝 Task Tracker CLI

A simple command-line task manager built with **Node.js**.  
You can add, list, update, delete, and mark tasks as complete — all from your terminal.

---

## 📂 Project Structure
```
.
├── package.json       # Project metadata & dependencies
├── task-cli.js        # Main CLI script
├── .gitignore         # Ignore tasks.json file
└── tasks.json         # (Local) Stores tasks - ignored in Git
```

---

## 🚀 Installation

1️⃣ **Clone the repository**
```
git clone <your-repo-url>
cd <your-repo-folder>
```

2️⃣ **Install Node.js dependencies**
```
npm install
```

3️⃣ **Make the script executable globally**
```
npm link
```
> This will allow you to use the `task-cli` command anywhere in your system.

---

## 📌 Usage

### Add a new task
```
task-cli add "Buy groceries"
```

### List all tasks
```
task-cli list
```

### Update a task
```
task-cli update <task_id> "New description"
```

### Delete a task
```
task-cli delete <task_id>
```

### Mark a task as complete
```
task-cli complete <task_id>
```

---

## 🛠 Development Notes
- **tasks.json** stores your tasks locally and is ignored by Git (see `.gitignore`).
- The project uses **Node.js fs module** to read/write data.
- Uses a **timestamp** and **safe random ID generation** for unique task IDs.

---

## 🧹 Uninstall
If you no longer want the CLI:
```
npm unlink -g
```

---

## 📜 License
This project is open-source and free to use.
