import OptionType from "./Option.interface";

export default interface ConverterState {
    option: { value: string, label: string }[],
    fromConvertType?: OptionType,
    toConvertType?: OptionType,
    amount: string,
    convertedAmount: string
}