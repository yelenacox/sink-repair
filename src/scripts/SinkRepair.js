
import { Requests, Completions } from "./Requests.js"
import { ServiceForm } from "./ServiceForm.js"

export const SinkRepair = () => {
    return `
        <h1>Maude and Merle's Sink Repair</h1>
        <section class="serviceForm">
            ${ServiceForm()}
        </section>

        <section class="serviceRequests">
            <h2>Service Requests</h2>
            <div class="requestList">
            <h4>Description</h4> <h4>Completed By</h4> <h4></h4>
            </div>
            ${Requests()}
        </section>

        <section class="completedRequests">
            <h2>Completions</h2>
            ${Completions()}
            </section>
        `
}
