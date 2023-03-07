import { useState } from "react";

function IssueAdd({AddSingleIssueMethod}) {
    const [errorMessage, setErrorMessage] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = document.forms.addIssue;
        let newIssue = {
            Status: form.Status.value,
            Owner: form.Owner.value,
            Effort: parseInt(form.Effort.value),
            Title: form.Title.value
        }
        if(form.Owner.value.length < 3) {
            setErrorMessage("Owner's Name can't be less than 3 characters");
        } else {
            AddSingleIssueMethod(newIssue);
        }
        //document.forms.addIssue.reset()
    }

    return (
        <div>
            <h3>Welcome to IssueAdd </h3>
            <form name="addIssue" onSubmit={handleSubmit}>
                <input type="text" name="Status" placeholder="Status"/>
                <input type="text" name="Owner" placeholder="Owner"/>
                <input type="number" name="Effort" placeholder="Effort"/>
                <input type="text" name="Title" placeholder="Title"/>
                <button type="submit">Submit</button>
            </form>
            <h3 style={{"color": "Red"}}>{errorMessage}</h3>
        </div>
    )
}
export default IssueAdd;