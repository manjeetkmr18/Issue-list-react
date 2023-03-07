import IssueRow from './IssueRow'

function IssueTable({allIssues}) {
    const style = {border: "1px solid"};
   
    const allIssueRow = allIssues.map((issue) => (
            <IssueRow issue={issue} style={style}/>
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
export default IssueTable;