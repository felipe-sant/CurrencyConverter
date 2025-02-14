import Select from 'react-select';

function SearchableSelect(props: { options: any, onChange: any, placeholder: any, className?: string }) {
    const { options, onChange, placeholder } = props;

    return (
        <Select
            options={options}
            onChange={onChange}
            placeholder={placeholder}
            className={props.className}
            isSearchable
        />
    );
}

export default SearchableSelect;