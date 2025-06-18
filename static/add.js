
const api =  "https://job-application-yzyu.onrender.com/api/jobs"


const jobForm = document.getElementById("jobForm");

jobForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const jobData = {
    company: jobForm.company.value,
    role: jobForm.role.value,
    status: jobForm.status.value,
    dateApplied: jobForm.dateApplied.value,
    deadline: jobForm.deadline.value,
    notes: jobForm.notes.value, // Fixed: was `note` before
  };

  const res = await fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobData),
  });

  if (res.ok) {
    showMessage("Job added successfully!");
    jobForm.reset();
  } else {
    showMessage("Failed to add job.", true);
  }
});

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
