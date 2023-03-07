function IssueFilter() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "Welcome to IssueFilter "));
}
function IssueRow({
  issue,
  style
}) {
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    style: style
  }, issue.Id), /*#__PURE__*/React.createElement("td", {
    style: style
  }, issue.Owner), /*#__PURE__*/React.createElement("td", {
    style: style
  }, issue.Status), /*#__PURE__*/React.createElement("td", {
    style: style
  }, new Date(parseInt(issue.Created)).toLocaleDateString()), /*#__PURE__*/React.createElement("td", {
    style: style
  }, issue.Effort), /*#__PURE__*/React.createElement("td", {
    style: style
  }, new Date(parseInt(issue.Due)).toLocaleDateString()), /*#__PURE__*/React.createElement("td", {
    style: style
  }, issue.Title));
}
function IssueTable({
  allIssues
}) {
  const style = {
    border: "1px solid"
  };
  const allIssueRow = allIssues.map(issue => /*#__PURE__*/React.createElement(IssueRow, {
    issue: issue,
    style: style
  }));
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "Welcome to IssueTable "), /*#__PURE__*/React.createElement("table", {
    style: style
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    style: style
  }, "ID"), /*#__PURE__*/React.createElement("th", {
    style: style
  }, "OWNER"), /*#__PURE__*/React.createElement("th", {
    style: style
  }, "STATUS"), /*#__PURE__*/React.createElement("th", {
    style: style
  }, "CREATED"), /*#__PURE__*/React.createElement("th", {
    style: style
  }, "EFFORT"), /*#__PURE__*/React.createElement("th", {
    style: style
  }, "DUE"), /*#__PURE__*/React.createElement("th", {
    style: style
  }, "TITLE"))), /*#__PURE__*/React.createElement("tbody", null, allIssueRow)));
}
function IssueAdd({
  AddSingleIssue
}) {
  const [errorMessage, setErrorMessage] = React.useState("");
  const handleSubmit = e => {
    e.preventDefault();
    const form = document.forms.addIssue;
    let newIssue = {
      Status: form.Status.value,
      Owner: form.Owner.value,
      Effort: parseInt(form.Effort.value),
      Title: form.Title.value
    };
    if (form.Owner.value.length < 3) {
      setErrorMessage("Owner's Name can't be less than 3 characters");
    } else if (isNaN(newIssue.Effort) || newIssue.Effort < 1) {
      setErrorMessage("Effort can't be less than 1");
    } else {
      AddSingleIssue(newIssue);
    }
    document.forms.addIssue.reset();
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "Welcome to IssueAdd "), /*#__PURE__*/React.createElement("form", {
    name: "addIssue",
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement("select", {
    name: "Status"
  }, /*#__PURE__*/React.createElement("option", {
    value: "New"
  }, "New"), /*#__PURE__*/React.createElement("option", {
    value: "Assigned"
  }, "Assigned"), /*#__PURE__*/React.createElement("option", {
    value: "Fixed"
  }, "Fixed"), /*#__PURE__*/React.createElement("option", {
    value: "Closed"
  }, "Closed")), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "Owner",
    placeholder: "Owner"
  }), /*#__PURE__*/React.createElement("input", {
    type: "number",
    name: "Effort",
    placeholder: "Effort"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "Title",
    placeholder: "Title"
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit"
  }, "Submit")), /*#__PURE__*/React.createElement("h3", {
    style: {
      "color": "Red"
    }
  }, errorMessage));
}
const IssueList = () => {
  let query = `
        query  {
            issueList {
                Id
                Status
                Owner
                Effort
                Created
                Due
                Title
            }
      }
    `;
  const [allIssues, setAllIssues] = React.useState([]);
  function fetchData() {
    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query
      })
    }).then(async response => {
      let tempIssues = await response.json();
      let tempList = tempIssues.data.issueList;
      setAllIssues(tempList);
    });
  }
  React.useEffect(function () {
    fetchData();
  }, []);
  const AddSingleIssue = async newIssue => {
    let query = `
       mutation AddSingleIssue($Status: String!, $Title: String!, $Effort: Int!, $Owner: String!) {
        addSingleIssue(Status: $Status, Title: $Title, Effort: $Effort, Owner: $Owner) {
            Id
            Status
            Owner
            Effort
            Created
            Due
            Title
        }
    }`;
    console.log(newIssue);
    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query,
        variables: {
          Status: newIssue.Status,
          Owner: newIssue.Owner,
          Effort: newIssue.Effort,
          Title: newIssue.Title
        }
      })
    }).then(async response => {
      console.log(response);
      fetchData();
    });
  };
  return /*#__PURE__*/React.createElement(React.StrictMode, null, /*#__PURE__*/React.createElement(IssueFilter, null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(IssueTable, {
    allIssues: allIssues
  }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(IssueAdd, {
    AddSingleIssue: AddSingleIssue
  }));
};
const element = ReactDOM.createRoot(document.getElementById("root-1"));
element.render( /*#__PURE__*/React.createElement(IssueList, null));