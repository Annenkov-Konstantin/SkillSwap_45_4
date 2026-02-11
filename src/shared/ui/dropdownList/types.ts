export interface IDropdownList {
    filteredList: {_id: string, name: string}[];
    showNotFound: boolean;
    highlightedIndex: number;
    inputValue: string;
    handleValueSelect: (value: string) => void;
    setHighlightedIndex: (index: number) => void;
}
