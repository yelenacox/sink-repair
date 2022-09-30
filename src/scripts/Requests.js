import { getRequests, getPlumbers, getCompletions, saveCompletion } from "./dataAccess.js"

export const Requests = () => {
    const requests = getRequests()
    const plumbers = getPlumbers()
    const completions = getCompletions()
    
    //function to see if the request id is present in the completions array (completion.requestId)
    const isRequestCompleted = (request) => {
        //the function will be placed inside the requests.map, so it takes request as a parameter (no need to iterate through requests array because the map function will be doing that)
        for (const completion of completions){
                //function iterates through completions array
                if (request.id === completion.requestId){
                    //if request.id exists in competion.requestId, return false
                    return false
                }
                //otherwise, return true
            } return true
    }

    let html = `
        <ul>
            ${requests.map(request => isRequestCompleted(request) ? 
                /* invoke isRequestCompleted function with 'request' as parameter. Use ternary operator "?" to return the HTML if the function returns true. */ 
                `<li class="requests">${request.description}  
            
            <select class="plumbers" id="plumbers">
            <option value="0">Choose</option>
            ${plumbers.map(
        plumber => {
            return `<option value="${request.id}--${plumber.id}" class="requests">${plumber.name}</option>`
        }
    ).join("")
        }
        </select>

            <button class="request__delete" "requests"
                id="request--${request.id}">
            Delete
        </button>
        </li>` 
        //ternary operator if "false", return empty string. Then "join" whatever comes from the map array
        : "").join("")
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
    html += "</ul>"

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
