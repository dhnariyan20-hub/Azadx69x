/**
 * @author NTKhang
 * ! The source code is written by NTKhang, please don't change the author's name everywhere. Thank you for using
 * ! Official source code: https://github.com/ntkhang03/Goat-Bot-V2
 * ! If you do not download the source code from the above address, you are using an unknown version and at risk of having your account hacked
 *
 * English:
 * ! Please do not change the below code, it is very important for the project.
 * It is my motivation to maintain and develop the project for free.
 * ! If you change it, you will be banned forever
 * Thank you for using
 *
 * Vietnamese:
 * ! Vui lòng không thay đổi mã bên dưới, nó rất quan trọng đối với dự án.
 * Nó là động lực để tôi duy trì và phát triển dự án miễn phí.
 * ! Nếu thay đổi nó, bạn sẽ bị cấm vĩnh viễn
 * Cảm ơn bạn đã sử dụng
 */

const { spawn, exec } = require("child_process");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const log = require("./logger/log.js");

let changeTimer = null;
let fileContents = {};
let pendingChanges = new Set();

function startProject() {
	const child = spawn("node", ["Goat.js"], {
		cwd: __dirname,
		stdio: "inherit",
		shell: true,
	});

	child.on("close", (code) => {
		if (code === 2) {
			log.info("Restarting Project...");
			startProject();
		}
	});
}


/*function setupFileWatcher(dir) {
	const watchDir = (currentDir) => {
		fs.readdir(currentDir, { withFileTypes: true }, (err, files) => {
			if (err) {
				log.error(`Error reading directory: ${currentDir}`, err);
				return;
			}

			files.forEach((file) => {
				if (file.name.startsWith(".")) return;

				const fullPath = path.join(currentDir, file.name);

				if (file.isDirectory()) {
					watchDir(fullPath);
				} else {
					if (!fileContents[fullPath]) {
						fileContents[fullPath] = fs.readFileSync(fullPath, "utf-8");
					}

					fs.watchFile(fullPath, { interval: 500 }, () => {
						const currentContent = fs.readFileSync(fullPath, "utf-8");

						if (currentContent !== fileContents[fullPath]) {
							log.info(`File changed: ${fullPath}`);
							fileContents[fullPath] = currentContent;
							pendingChanges.add(fullPath);

							if (changeTimer) clearTimeout(changeTimer);
							changeTimer = setTimeout(commitAndPushChanges, 60000);
						}
					});
				}
			});
		});
	};

	watchDir(dir);
	log.info("File watcher is running...");
}

function commitAndPushChanges() {
	if (pendingChanges.size === 0) {
		log.info("No changes detected. Skipping Git push.");
		return;
	}

	const filesChanged = [...pendingChanges].join(", ");
	log.info(`Files to commit: ${filesChanged}`);

	const gitEmail = process.env.GIT_EMAIL || "auto-committer@gmail.com";
	const gitName = process.env.GIT_NAME || "Auto Commit Bot";

	const gitCommand = `
		git config user.email "${gitEmail}" &&
		git config user.name "${gitName}" &&
		git add . &&
		git commit -m "Auto commit for changes in: ${filesChanged}" ||
		echo "No changes to commit" &&
		git push https://${process.env.GIT_USER}:${process.env.GIT_TOKEN}@github.com/${process.env.REPO_OWNER}/${process.env.REPO_NAME}.git
	`;

	exec(gitCommand, (err, stdout, stderr) => {
		if (err) {
			log.error(`Git Push Failed: ${stderr}`);
		} else {
			log.success(`Git pushed successfully: ${stdout}`);
			pendingChanges.clear();
		}
	});
}*/

startProject();
// setupFileWatcher(__dirname);