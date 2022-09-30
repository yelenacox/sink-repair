import { getRequests, getPlumbers, getCompletions, saveCompletion } from "./dataAccess.js"

export const Requests = () => {
    const requests = getRequests()
    const plumbers = getPlumbers()

    let html = `
        <ul>
            ${requests.map(request => `<li>${request.description}  
            
            <select class="plumbers" id="plumbers">
            <option value="0">Choose</option>
            ${plumbers.map(
        plumber => {
            return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
        }
    ).join("")
        }
        </select>

            <button class="request__delete"
                id="request--${request.id}">
            Delete
        </button>
        </li>`).join("")
        }
        </ul>
    `

    return html

}

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_completed
            */

            const completion = {
                requestId: parseInt(requestId),
                plumberId: parseInt(plumberId),
                date_completed: new Date().toString()
            }
            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
            saveCompletion(completion)

        }
    }
)

export const Completions = () => {
    const requests = getRequests()
    const completions = getCompletions()

    let html = "<ul>"

    const completedRequests = completions.map(completion => {
        return `<li>
        Request #${completion.requestId} was completed by ${filterCompletionsByPlumber(completion)} on ${completion.date_completed}
        </li>`
    })

    html += completedRequests.join("")
    html+= "</ul>"

    return html
}


const filterCompletionsByPlumber = (completion) => {
    const plumbers = getPlumbers()
    let selectedPlumber = ""
        for (const plumber of plumbers) {
            if (completion.plumberId === plumber.id) {
                selectedPlumber = plumber.name

            }

        
    }
    return selectedPlumber
}
