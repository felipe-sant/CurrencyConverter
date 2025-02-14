import OptionType from "./Option.interface";

interface SearchableSelectProps {
    options: OptionType[];
    onChange: (selectedOption: OptionType | null) => void;
    placeholder?: string;
}

export default SearchableSelectProps;