
const api ="https://job-application-cend.onrender.com"; 

// Get jobId from URL
function getJobIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// Show message
function showMessage(msg, isError = false) {
  const messageDiv = document.getElementById("message");
  messageDiv.textContent = msg;

  messageDiv.style.display = "block";
  messageDiv.style.position = "fixed";
  messageDiv.style.top = "20px";
  messageDiv.style.left = "50%";
  messageDiv.style.transform = "translateX(-50%)";
  messageDiv.style.padding = "12px 24px";
  messageDiv.style.borderRadius = "6px";
  messageDiv.style.fontWeight = "bold";
  messageDiv.style.fontSize = "16px";
  messageDiv.style.backgroundColor = isError ? "#ffe0e0" : "#d4edda";
  messageDiv.style.color = isError ? "#b00020" : "#155724";
  messageDiv.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
  messageDiv.style.zIndex = "1000";

  setTimeout(() => {
    messageDiv.style.display = "none";
  }, 3000);
}


// Load job data
async function loadJobData() {
  const jobId = getJobIdFromURL();
  if (!jobId) {
    showMessage("Invalid job ID", true);
    return;
  }

  try {
    const res = await fetch(api);
    const jobs = await res.json();
    const job = jobs.find((j) => j.jobId === jobId);

    if (!job) {
      showMessage("Job not found", true);
      return;
    }

    document.getElementById("company").value = job.company;
    document.getElementById("role").value = job.role;
    document.getElementById("status").value = job.status;
    document.getElementById("dateApplied").value = job.dateApplied;
    document.getElementById("deadline").value = job.deadline;
    document.getElementById("notes").value = job.notes;
  } catch (error) {
    showMessage("Failed to load job.", true);
  }
}

// Submit update
async function handleUpdate(e) {
  e.preventDefault();

  const jobId = getJobIdFromURL();
  if (!jobId) {
    showMessage("Invalid job ID", true);
    return;
  }

  const data = {
    company: document.getElementById("company").value,
    role: document.getElementById("role").value,
    status: document.getElementById("status").value,
    dateApplied: document.getElementById("dateApplied").value,
    deadline: document.getElementById("deadline").value,
    notes: document.getElementById("notes").value
  };

  const res = await fetch(`${api}/${jobId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (res.ok) {
    showMessage("Job updated successfully!");
  } else {
    showMessage("Failed to update job.", true);
  }
}

document.getElementById("jobForm").addEventListener("submit", handleUpdate);
window.onload = loadJobData;

