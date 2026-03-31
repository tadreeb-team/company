// Company task variables
const taskForm = document.querySelector("#taskForm");
const trainingType = document.querySelector("#trainingType");
const taskNotes = document.querySelector("#taskNotes");
const taskAmount = document.querySelector("#taskAmount");
const taskLocation = document.querySelector("#taskLocation");
const taskTime = document.querySelector("#taskTime");
const taskDuration = document.querySelector("#taskDuration");

const previewTraining = document.querySelector("#previewTraining");
const previewNotes = document.querySelector("#previewNotes");
const previewAmount = document.querySelector("#previewAmount");
const previewLocation = document.querySelector("#previewLocation");
const previewTime = document.querySelector("#previewTime");
const previewDuration = document.querySelector("#previewDuration");

function formatDateTime(value) {
  if (!value) return "Not set";
  return value.replace("T", " ");
}

function renderTaskPreview() {
  previewTraining.textContent = trainingType.value;
  previewNotes.textContent =
    (taskNotes.value || "").trim() ||
    "No notes provided yet.";
  previewAmount.textContent = `${taskAmount.value || 0} JOD`;
  previewLocation.textContent =
    (taskLocation.value || "").trim() || "Location not set";
  previewTime.textContent = formatDateTime(taskTime.value);
  previewDuration.textContent =
    (taskDuration.value || "").trim() || "Not set";
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  renderTaskPreview();
  alert("Task variables saved. You can update them anytime.");
});

renderTaskPreview();

// IT Job titles management
const jobTitleInput = document.querySelector("#jobTitleInput");
const addJobBtn = document.querySelector("#addJobBtn");
const saveEditBtn = document.querySelector("#saveEditBtn");
const cancelEditBtn = document.querySelector("#cancelEditBtn");
const jobList = document.querySelector("#jobList");
const jobCount = document.querySelector("#jobCount");

let jobs = [
  "Junior Frontend Developer",
  "Junior Backend Developer",
  "Full‑Stack Developer Intern",
  "Mobile App Developer Intern",
  "DevOps Engineer Intern",
  "Data Analyst Intern",
  "Cybersecurity Analyst Intern",
  "QA / Testing Intern",
  "UI/UX Designer Intern",
  "IT Support Intern",
  "Cloud Engineer Intern",
  "Network Engineer Intern",
];

let editingIndex = null;

function updateJobCount() {
  const count = jobs.length;
  jobCount.textContent = `${count} ${count === 1 ? "title" : "titles"}`;
}

function renderJobs() {
  jobList.innerHTML = "";
  jobs.forEach((title, index) => {
    const li = document.createElement("li");
    li.className = "job-item";

    const span = document.createElement("span");
    span.className = "job-title-text";
    span.textContent = title;

    const btns = document.createElement("div");
    btns.className = "job-item-buttons";

    const editBtn = document.createElement("button");
    editBtn.className = "btn-edit";
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => startEditJob(index));

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn-delete";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteJob(index));

    btns.appendChild(editBtn);
    btns.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(btns);
    jobList.appendChild(li);
  });
  updateJobCount();
}

function clearInput() {
  jobTitleInput.value = "";
}

function addJob() {
  const value = (jobTitleInput.value || "").trim();
  if (!value) return;
  jobs.push(value);
  clearInput();
  renderJobs();
}

function startEditJob(index) {
  editingIndex = index;
  jobTitleInput.value = jobs[index];
  jobTitleInput.focus();
  saveEditBtn.disabled = false;
  cancelEditBtn.disabled = false;
  addJobBtn.disabled = true;
}

function saveEditJob() {
  if (editingIndex === null) return;
  const value = (jobTitleInput.value || "").trim();
  if (!value) return;
  jobs[editingIndex] = value;
  editingIndex = null;
  clearInput();
  addJobBtn.disabled = false;
  saveEditBtn.disabled = true;
  cancelEditBtn.disabled = true;
  renderJobs();
}

function cancelEditJob() {
  editingIndex = null;
  clearInput();
  addJobBtn.disabled = false;
  saveEditBtn.disabled = true;
  cancelEditBtn.disabled = true;
}

function deleteJob(index) {
  jobs.splice(index, 1);
  if (editingIndex === index) {
    cancelEditJob();
  }
  renderJobs();
}

addJobBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addJob();
});

saveEditBtn.addEventListener("click", (e) => {
  e.preventDefault();
  saveEditJob();
});

cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault();
  cancelEditJob();
});

jobTitleInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    if (editingIndex === null) {
      addJob();
    } else {
      saveEditJob();
    }
  }
});

renderJobs();

