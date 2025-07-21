const readline = require("readline");
const { read, write } = require("./utils");

const filePath = "./demo.js";

function ask(question) {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question(question, (ans) => {
            rl.close();
            resolve(ans);
        });
    });
}

async function main() {
    const tasks = await read(filePath);

    console.log("\n📋 To-Do List:");
    tasks.forEach((task, i) => console.log(`${i + 1}. ${task}`));

    const add = await ask("\nAdd new task? (yes/no): ");
    if (add.toLowerCase() === "yes") {
        const task = await ask("Enter task: ");
        tasks.push(task);
        await write(filePath, tasks);
        console.log("✅ Task added!");
    } else {
        console.log("👋 Bye!");
    }
}

main();