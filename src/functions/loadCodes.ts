import ExchangeratesAPI from "../api/ExchangeratesAPI"
import CodesResponse from "../types/CodesResponse"
import ErrorMessage from "../types/ErrorMessage"

async function loadCodes(set: React.Dispatch<React.SetStateAction<string[][]>>): Promise<void> {
    const data: CodesResponse | ErrorMessage = await ExchangeratesAPI.getSupportedCodes()
    if ("error" in data) {
        console.error(data.error)
        return
    }
    set(data.supported_codes)
}

export default loadCodes