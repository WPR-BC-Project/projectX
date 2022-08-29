function submitIssue(e) {
  const getInputValue = (id) => document.getElementById(id).value;

  const description = getInputValue("issueDescription");
  const severity = getInputValue("issueSeverity");
  const assignedTo = getInputValue("issueAssignedTo");
  const id = Math.floor(Math.random() * 100000000) + "";
  const openList = document.getElementById("progress-issue");
  const backLogList = document.getElementById("backlog-issue");

  const status = "Open";
  // Checking type of progress its been added to
  if (openList) {
    status = "Overdue";
  } else if (backLogList) {
    status = "In-Progress";
  } else status;

  // /Create issue using Javascript DOM module
  if (description.length == 0 || assignedTo.length == 0) {
    //alert about open fields
    alert("Please fill all fields with required data.");

    //Buttom Add issue
    document.getElementById("add-issue").setAttribute("data-toggle", "modal");
    document
      .getElementById("add-issue")
      .setAttribute("data-target", "#emptyField");

    //Add issue
    document
      .getElementById("backlog-issue")
      .setAttribute("data-toggle", "modal");
    document
      .getElementById("backlog-issue")
      .setAttribute("data-target", "#emptyField");

    //Add issue
    document.getElementById("add-issue").setAttribute("data-toggle", "modal");
    document
      .getElementById("progress-issue")
      .setAttribute("data-target", "#emptyField");
  } else {
    //Else remove attributes
    document
      .getElementById("add-issue")
      .removeAttribute("data-toggle", "modal");

    document
      .getElementById("add-issue")
      .removeAttribute("data-target", "#emptyField");

    const issue = { id, description, severity, assignedTo, status };
    let issues = [];

    if (localStorage.getItem("issues")) {
      issues = JSON.parse(localStorage.getItem("issues"));
    }

    issues.push(issue);
    localStorage.setItem("issues", JSON.stringify(issues));

    fetchIssues();
  }
}

// end function of fetching issue
const closeIssue = (id) => {
  const issues = JSON.parse(localStorage.getItem("issues"));
  const currentIssue = issues.find((issue) => issue.id == id);
  currentIssue.status = "Closed";
  currentIssue.description = `<strike>${currentIssue.description}</strike>`;
  localStorage.setItem("issues", JSON.stringify(issues));
  fetchIssues();
};

//
const backLogIssue = (id) => {
  const issues = JSON.parse(localStorage.getItem("issues"));
  const remainingIssues = issues.filter((issue) => issue.id != id);
  currentIssue.status = `in-backlog`;
  localStorage.setItem("issues", JSON.stringify(remainingIssues));
  fetchIssues();
};

//Delete Issue
const deleteIssue = (id) => {
  const issues = JSON.parse(localStorage.getItem("issues"));
  const remainingIssues = issues.filter((issue) => issue.id != id);
  localStorage.removeItem("issues");
  localStorage.setItem("issues", JSON.stringify(remainingIssues));
  fetchIssues();
};

// List of issues
const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem("issues"));
  const issuesList = document.getElementById("issuesList");
  issuesList.innerHTML = "";

  for (var i = 0; i < issues.length; i++) {
    const { id, description, severity, assignedTo, status } = issues[i];

    issuesList.innerHTML += `<div class="well">
      <h6>Issue ID: ${id} </h6>
      <p><span class="label label-info"> ${status} </span></p>
      <h3> ${description} </h3>
      <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
      <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
      <button onclick="closeIssue(${id})" class="btn btn-warning">Close</button>
      <button onclick="deleteIssue(${id})" class="btn btn-danger">Delete</button>
      </div>`;
  }
};

fetchIssues();
