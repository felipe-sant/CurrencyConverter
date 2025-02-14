import { useEffect, useState } from "react"
import css from "../styles/pages/home.module.css"
import loadCodes from "../functions/loadCodes"
import ExchangeratesAPI from "../api/ExchangeratesAPI"
import ConvertResponse from "../types/ConvertResponse"
import ErrorMessage from "../types/ErrorMessage"
import swap from "../assets/swap.svg"

function Home() {
    const [codes, setCodes] = useState<string[][]>([])
    const [fromConvertType, setFromConvertType] = useState<string>("BRL")
    const [toConvertType, setToConvertType] = useState<string>("USD")
    const [amount, setAmount] = useState<number>(0)
    const [convertedAmount, setConvertedAmount] = useState<number>(0)

    async function convert() {
        const data: ConvertResponse | ErrorMessage = await ExchangeratesAPI.convertEndpoint(fromConvertType, toConvertType, amount)
        if ("error" in data) {
            alert(data.error)
            return
        }
        setConvertedAmount(data.conversion_result)
    }

    function invertTypes() {
        const type = fromConvertType
        setFromConvertType(toConvertType)
        setToConvertType(type)

        const value = amount
        setAmount(convertedAmount)
        setConvertedAmount(value)
    }

    useEffect(() => {
        loadCodes(setCodes)
    }, [])

    return (
        <>
            <nav className={css.nav} />
            <main className={css.main}>
                <div className={css.label}>
                    <label>From</label>
                    <div className={css.input}>
                        <input
                            type="number"
                            value={amount}
                            onChange={e => setAmount(Number(e.target.value))}
                        />
                        <select
                            onChange={e => setFromConvertType(e.target.value)}
                            value={fromConvertType}
                            className={css.select}
                        >
                            {codes.map((code, index) => <option key={index} value={code[0]}>{code[0]} - {code[1]}</option>)}
                        </select>
                    </div>
                </div>
                <div className={css.buttons}>
                    <button onClick={convert} className={css.button}>Convert</button>
                    <button onClick={invertTypes} className={css.invert} />
                </div>
                <div className={css.label}>
                    <label>To</label>
                    <div className={css.input}>
                        <input
                            type="number"
                            value={convertedAmount}
                            readOnly
                            className={css.readonly}
                        />
                        <select
                            onChange={e => setToConvertType(e.target.value)}
                            value={toConvertType}
                            className={css.select}
                        >
                            {codes.map((code, index) => <option key={index} value={code[0]}>{code[0]} - {code[1]}</option>)}
                        </select>
                    </div>
                </div>
            </main>
            <footer className={css.footer}>
                <p>Developed by <a href="https://github.com/felipe-sant">@felipe-sant</a></p>
            </footer>
        </>
    )
}

export default Home