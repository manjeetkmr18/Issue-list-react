function IssueFilter() {
    return (
        <div>
            <h3>Welcome to IssueFilter </h3>
        </div>
    )
}
function IssueRow({ issue, style }) {
    return (
        <tr>
            <td style={style}>{issue.Id}</td>
            <td style={style}>{issue.Owner}</td>
            <td style={style}>{issue.Status}</td>
            <td style={style}>{new Date(parseInt(issue.Created)).toLocaleDateString()}</td>
            <td style={style}>{issue.Effort}</td>
            <td style={style}>{new Date(parseInt(issue.Due)).toLocaleDateString()}</td>
            <td style={style}>{issue.Title}</td>
        </tr>
    )
}
function IssueTable({ allIssues }) {
    const style = { border: "1px solid" };

    const allIssueRow = allIssues.map((issue) => (
        <IssueRow issue={issue} style={style} />
    ));

    return (
        <div>
            <h3>Welcome to IssueTable </h3>
            <table style={style}>
                <thead>
                    <tr>
                        <th style={style}>ID</th>
                        <th style={style}>OWNER</th>
                        <th style={style}>STATUS</th>
                        <th style={style}>CREATED</th>
                        <th style={style}>EFFORT</th>
                        <th style={style}>DUE</th>
                        <th style={style}>TITLE</th>
                    </tr>
                </thead>
                <tbody>
                    {allIssueRow}
                </tbody>
            </table>
        </div>
    )
}

function IssueAdd({ AddSingleIssue }) {
    const [errorMessage, setErrorMessage] = React.useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = document.forms.addIssue;
        let newIssue = {
            Status: form.Status.value,
            Owner: form.Owner.value,
            Effort: parseInt(form.Effort.value),
            Title: form.Title.value
        }
        if (form.Owner.value.length < 3) {
            setErrorMessage("Owner's Name can't be less than 3 characters");
        } 
        else if (isNaN(newIssue.Effort) || newIssue.Effort < 1) {
            setErrorMessage("Effort can't be less than 1");
        }
        else {

            AddSingleIssue(newIssue);
        }
        document.forms.addIssue.reset()
    }

    return (
        <div>
            <h3>Welcome to IssueAdd </h3>
            <form name="addIssue" onSubmit={handleSubmit}>
                <select name="Status">
                    <option value="New">New</option>
                    <option value="Assigned">Assigned</option>
                    <option value="Fixed">Fixed</option>
                    <option value="Closed">Closed</option>
                </select>
                <input type="text" name="Owner" placeholder="Owner" />
                <input type="number" name="Effort" placeholder="Effort" />
                <input type="text" name="Title" placeholder="Title" />
                <button type="submit">Submit</button>
            </form>
            <h3 style={{ "color": "Red" }}>{errorMessage}</h3>
        </div>
    )
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

    React.useEffect(function () {
        fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        }).then(async (response) => {
            let tempIssues = await response.json();
            console.log(tempIssues);
            let tempList = tempIssues.data.issueList;
            setAllIssues(tempList)
        })
    }, []);

 
    // React.useEffect(() => {
    //     setTimeout(() => {
    //         setAllIssues(issueList);
    //         console.log("HELLO-1")
    //     }, 2000)
    // }, []);

    const AddSingleIssue = async (newIssue) => {

        let query = `
        mutation AddSingleIssue($addSingleIssueStatus2: String!, $effort: Int!, $addSingleIssueTitle2: String!, $addSingleIssueOwner2: String!) {
        addSingleIssue(Status: $addSingleIssueStatus2, Effort: $effort, Title: $addSingleIssueTitle2, Owner: $addSingleIssueOwner2) {
            Id
            Status
            Owner
            Effort
            Created
            Due
            Title
        }   
        }`;
        fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        }).then(async (response) => {
            
        });

        // const d = new Date();
        // newIssue.Id = allIssues.length + 1;
        // newIssue.Created = d;
        // newIssue.Due = new Date(d.getDate() + newIssue.Effort);// (new Date()).getDate() + newIssue.Effort; //date.getDate() + 1
        // console.log(newIssue);
        // let issues = allIssues.slice();
        // issues.push(newIssue);
        // setAllIssues(issues);
    }

    return (
        <React.StrictMode>
            <IssueFilter />
            <hr />
            <IssueTable allIssues={allIssues} />
            <hr />
            <IssueAdd AddSingleIssue={AddSingleIssue} />
        </React.StrictMode>
    )
}

const element = ReactDOM.createRoot(document.getElementById("root-1"));
element.render(
    <IssueList />
);