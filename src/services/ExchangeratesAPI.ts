import getRequest from "../functions/connection/getRequest"
import CodesResponse from "../types/CodesResponse"
import ConvertResponse from "../types/ConvertResponse"
import ErrorMessage from "../types/ErrorMessage"

class ExchangeratesAPI {
    private static acessKey = "87a045f7e294743a0d70d977"

    public static async getSupportedCodes(): Promise<CodesResponse | ErrorMessage> {
        try {
            const url = "https://v6.exchangerate-api.com/v6/" + this.acessKey + "/codes"
            const response = await getRequest<CodesResponse>(url)
            return response
        } catch (error: any) {
            return { error: error.message }
        }
    }

    public static async convertEndpoint(from: string, to: string, amount: number, date?: Date): Promise<ConvertResponse | ErrorMessage> {
        try {
            const url = "https://v6.exchangerate-api.com/v6/" + this.acessKey + "/pair/" + from + "/" + to + "/" + amount
            const response = await getRequest<ConvertResponse>(url)
            return response
        } catch (error: any) {
            return { error: error.message }
        }
    }
}

export default ExchangeratesAPI