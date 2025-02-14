import { useContext, useEffect, useState } from "react"
import css from "../styles/pages/home.module.css"
import loadCodes from "../functions/loadCodes"
import ExchangeratesAPI from "../api/ExchangeratesAPI"
import ConvertResponse from "../types/ConvertResponse"
import ErrorMessage from "../types/ErrorMessage"
import ThemeContext from "../context/Theme.context"
import numberInputMask from "../functions/inputMark/numberInputMask"

function Home() {
    const { theme, toggleTheme } = useContext(ThemeContext)

    const [codes, setCodes] = useState<string[][]>([])
    const [fromConvertType, setFromConvertType] = useState<string>("BRL")
    const [toConvertType, setToConvertType] = useState<string>("USD")
    const [amount, setAmount] = useState<string>("")
    const [convertedAmount, setConvertedAmount] = useState<string>("")

    async function convert() {
        if (amount === "") {
            alert("Amount is required")
            return
        }
        const amountNumber = parseFloat(amount.replace(",", "."))
        if (isNaN(amountNumber)) {
            alert("Invalid amount")
            return
        }
        const data: ConvertResponse | ErrorMessage = await ExchangeratesAPI.convertEndpoint(fromConvertType, toConvertType, amountNumber)
        if ("error" in data) {
            alert(data.error)
            return
        }
        setConvertedAmount(data.conversion_result.toString())
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

    function teste() { console.log(theme) }

    return (
        <>
            <nav className={css.nav} />
            <main className={theme === "light" ? css.main + " " + css.mainLight : css.main + " " + css.mainDark}>
                <button onClick={toggleTheme} className={css.toggleTheme} />
                <div className={css.label}>
                    <label>From</label>
                    <div className={css.input}>
                        <input
                            type="text"
                            value={amount}
                            onChange={e => setAmount(numberInputMask(e))}
                            placeholder="Amount"
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
                            type="text"
                            value={convertedAmount}
                            readOnly
                            className={css.readonly}
                            placeholder="Converted amount"
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
            <footer className={theme === "light" ? css.footer + " " + css.footerLight : css.footer + " " + css.footerDark}>
                <p>Developed by <a href="https://github.com/felipe-sant">@felipe-sant</a></p>
            </footer>
        </>
    )
}

export default Home