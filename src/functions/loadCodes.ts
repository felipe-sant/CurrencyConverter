import ExchangeratesAPI from "../api/ExchangeratesAPI"
import CodesResponse from "../types/CodesResponse"
import ErrorMessage from "../types/ErrorMessage"

async function loadCodes(set: React.Dispatch<React.SetStateAction<{ value: string; label: string; }[]>>) {
    const data: CodesResponse | ErrorMessage = await ExchangeratesAPI.getSupportedCodes()
    if ("error" in data) {
        console.error(data.error)
        return
    }
    const options: { value: string, label: string }[] = []
    data.supported_codes.forEach(code => {
        options.push({ value: code[0], label: code[0] + " - " + code[1] })
    }) 
    set(options)
}

export default loadCodes