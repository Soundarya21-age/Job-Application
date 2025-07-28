const api = "https://job-application-cend.onrender.com/api/jobs";


async function fetchJobs() {
  const res = await fetch(`${api}?t=${Date.now()}`); // Added timestamp
  const jobs = await res.json();

  const jobList = document.getElementById("jobList");
  jobList.innerHTML = "";
  jobList.style.display = "flex";
  jobList.style.flexWrap = "wrap";
  jobList.style.gap = "20px";

  jobs.forEach((job) => {
    const jobDiv = document.createElement("div");
    jobDiv.className = "job-card";
    jobDiv.innerHTML = `
      <p><strong>Company:</strong> ${job.company}</p>
      <p><strong>Role:</strong> ${job.role}</p>
      <p><strong>Status:</strong> ${job.status}</p>
      <p><strong>Date Applied:</strong> ${job.dateApplied}</p>
      <p><strong>Deadline:</strong> ${job.deadline}</p>
      <p><strong>Notes:</strong> ${job.notes}</p>
      <div>
        <a href="/update?id=${job.jobId}" class="btn btn-update">Update</a>
        <button onclick="deleteJob('${job.jobId}')" class="btn btn-delete">Delete</button>
      </div>
    `;
    jobList.appendChild(jobDiv);
  });
}


async function deleteJob(id) {
  const res = await fetch(`${api}/${id}`, { method: "DELETE" });

  if (res.ok) {
    showMessage("Job deleted successfully!");
    fetchJobs();
  } else {
    showMessage("Failed to delete job.", true);
  }
}
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
window.onload = fetchJobs;

