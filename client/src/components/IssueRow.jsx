function IssueRow({issue, style}) {
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
export default IssueRow;