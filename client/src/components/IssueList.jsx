import IssueFilter from './IssueFilter'
import IssueTable from './IssueTable'
import IssueAdd from './IssueAdd'
import { useState, useEffect } from "react";


const IssueList = () => {
    const [allIssues, setAllIssues] = useState([]);
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

    function fetchData() {
        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ query })
        }).then(async (response)=> {
            let tempIssues = await response.json();
            let tempList = tempIssues.data.issueList;
            //console.log(tempIssues);
            setAllIssues(tempList);
        })
    }
    
    useEffect(function(){
        fetchData();
    },[]);

    const AddSingleIssueMethod = async (newIssue) => {
        console.log(newIssue);
        
        let query = `
            mutation AddSingleIssue($Status: String!, $Owner: String, $Effort: Int, $Title: String) {
                addSingleIssue(Status: $Status, Owner: $Owner, Effort: $Effort, Title: $Title) {
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

        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ query, variables: {Status: newIssue.Status, Owner: newIssue.Owner, Effort: newIssue.Effort, Title: newIssue.Title } })
        }).then(async (response)=> {            
            let temp = await response.json();
            console.log('HELLO', temp);
            fetchData();           
        }) 
       
       
    }

    return(
        <div>
           <IssueFilter />
           <hr />
           <IssueTable allIssues={allIssues}/>
           <hr />
           <IssueAdd AddSingleIssueMethod={AddSingleIssueMethod}/>
        </div>
    )
}
export default IssueList;