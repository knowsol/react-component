import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { FormItemsRow, Column } from "@/styles/Common";
import { FieldControl, FieldGroup } from "../Field/FieldGroup";
import Button from "../Button/Button";
import RefreshButton from "../Button/RefreshButton";
import Dropbox from "../Dropbox/Dropbox";
import InputButton from "../Input/InputButton";
import Search from "../Searchbox/Search";
import Radio from "../Radio/Radio";
import Timepicker from "../Timepicker/Timepicker";
import Datepicker from "../DatePicker/Datepicker";

const SearchFilterStyle = styled.div`
    background-color: ${({ theme }) => theme.color.secondary.c50};
    border: 1px solid ${({ theme }) => theme.color.neutral[300]};
    border-radius: 6px;
    padding: ${({ theme }) => theme.spacing[16]} ${({ theme }) => theme.spacing[12]};
    width: 100%;
    min-width: 1326px;
    display: flex;
    align-items: stretch;
`;
const SearchFilterGroup = styled(Column)`
    flex: 1;
    min-width: 0;
    gap: ${({ theme }) => theme.spacing[24]};
`;

const FilterFieldBox = styled.div`
    flex: 0 0 ${({ $width }) => $width};
    min-width: 0;
`;

const FilterControlGroup = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[8]};
    width: 100%;
    min-width: 0;
`;

const SearchActionGroup = styled.div`
    display: flex;
    align-items: stretch;
    flex: 0 0 auto;
    gap: ${({ theme }) => theme.spacing[8]};
    margin-left: ${({ theme }) => theme.spacing[24]};
`;

const SearchActionButton = styled(Button)`
    height: auto;
`;

const SearchRefreshButton = styled(RefreshButton)`
    height: auto;
`;

const dropOptions = ["가나다", "나다라", "다라마"];

function FilterField({ label, required, width, state, helptext, children }) {
    return (
        <FilterFieldBox $width={width}>
            <FieldGroup label={label} required={required} direction="column">
                <FieldControl state={state} helptext={helptext} minWidth="0">
                    {children}
                </FieldControl>
            </FieldGroup>
        </FilterFieldBox>
    );
}

const SearchFilter = ({ onSearch, onReset, actionsTheme }) => {
    const [resetKey, setResetKey] = useState(0);

    const resetFilters = (event) => {
        setResetKey((current) => current + 1);
        onReset?.(event);
    };

    const searchActions = (
        <SearchActionGroup>
            <SearchActionButton variant="secondary" kind="outlineBlue" width="66px" onClick={onSearch}>
                검색
            </SearchActionButton>
            <SearchRefreshButton onClick={resetFilters} />
        </SearchActionGroup>
    );

    return (
        <SearchFilterStyle>
            <SearchFilterGroup key={resetKey}>
                <FormItemsRow $gap={24}>
                    <FilterField label="타이틀" required width="360px">
                        <Dropbox defaultValue="가나다" options={dropOptions} />
                    </FilterField>
                    <FilterField label="타이틀" width="360px">
                        <Search defaultValue="가나다" />
                    </FilterField>
                    <FilterField label="타이틀" width="397px">
                        <InputButton />
                    </FilterField>
                </FormItemsRow>
                <FormItemsRow $gap={24} $align="center">
                    <Radio options={["전체", "옵션1", "옵션2"]} defaultValue="전체" />
                    <Button variant="secondary" minWidth="auto" kind="solid" height="36px">
                        버튼
                    </Button>
                </FormItemsRow>
                <FormItemsRow $gap={24}>
                    <FilterField label="타이틀" width="360px">
                        <Datepicker range />
                    </FilterField>

                    <FilterField label="타이틀" width="292px">
                        <FilterControlGroup>
                            <Timepicker range width="216px" />
                            <Button variant="secondary" kind="solid" minWidth="auto" height="36px">
                                버튼
                            </Button>
                        </FilterControlGroup>
                    </FilterField>
                </FormItemsRow>
            </SearchFilterGroup>
            {actionsTheme ? <ThemeProvider theme={actionsTheme}>{searchActions}</ThemeProvider> : searchActions}
        </SearchFilterStyle>
    );
};

export default SearchFilter;
