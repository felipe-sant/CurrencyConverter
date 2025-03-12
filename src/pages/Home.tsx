import { useContext, useEffect } from "react"
import css from "../styles/pages/home.module.css"
import ThemeContext from "../context/Theme.context"
import SearchableSelect from "../components/SearchableSelect"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../redux/store"
import { getSupportedCodes } from "../services/asyncThunk/getSuportedCodes"
import { setAmount, setFromConvertType, setToConvertType } from "../redux/slices/converterSlice"
import { convertCodes } from "../services/asyncThunk/convertCodes"

function Home() {
    const { theme, toggleTheme } = useContext(ThemeContext)
    const dispatch = useDispatch<AppDispatch>()
    const {
        amount,
        convertedAmount,
        toConvertType,
        fromConvertType,
        option
    } = useSelector((state: RootState) => state.converter)

    useEffect(() => {
        dispatch(getSupportedCodes())
    }, [dispatch])

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
                            onChange={e => dispatch(setAmount(e.target.value))}
                            placeholder="Amount"
                        />
                        <SearchableSelect 
                            options={option}
                            onChange={(value: any) => dispatch(setFromConvertType(value))}
                            placeholder={"Select currency"}
                            className={css.select}
                        />
                    </div>
                </div>
                <div className={css.buttons}>
                    <button onClick={() => dispatch(convertCodes({ from: fromConvertType, to: toConvertType, amount: amount }))} className={css.button}>Convert</button>
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
                            onChange={(value: any) => dispatch(setToConvertType(value))}
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