import { useContext, useEffect, useState } from "react"
import css from "../styles/pages/home.module.css"
import loadCodes from "../functions/loadCodes"
import ExchangeratesAPI from "../api/ExchangeratesAPI"
import ConvertResponse from "../types/ConvertResponse"
import ErrorMessage from "../types/ErrorMessage"
import ThemeContext from "../context/Theme.context"
import numberInputMask from "../functions/inputMask/numberInputMask"
import SearchableSelect from "../components/SearchableSelect"
import OptionType from "../types/interfaces/Option.interface"

function Home() {
    const { theme, toggleTheme } = useContext(ThemeContext)

    const [option, setOption] = useState<{value: string, label: string}[]>([])
    const [fromConvertType, setFromConvertType] = useState<OptionType>()
    const [toConvertType, setToConvertType] = useState<OptionType>()
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

        if (!fromConvertType || !toConvertType) {
            alert("Both currencies are required")
            return
        }

        const data: ConvertResponse | ErrorMessage = await ExchangeratesAPI.convertEndpoint(fromConvertType.value, toConvertType.value, amountNumber)
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
        loadCodes(setOption)
    }, [])

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
                        <SearchableSelect 
                            options={option}
                            onChange={(value: any) => setFromConvertType(value)}
                            placeholder={"Select currency"}
                            className={css.select}
                        />
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
                        <SearchableSelect 
                            options={option}
                            onChange={(value: any) => setToConvertType(value)}
                            placeholder={"Select currency"}
                            className={css.select}
                        />
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