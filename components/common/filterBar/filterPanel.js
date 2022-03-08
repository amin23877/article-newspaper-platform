import React, {useRef} from "react";
import Text from "components/common/text";
import classNames from "classnames";
import styles from "styles/common/FilterBarPanel.module.scss";
import {useWhenClickOutside} from "hooks/useWhenClickOutside";

function FilterPanel({name, activePanel, filters, selected, onSelect, onClose}) {
    const ref = useRef();

    useWhenClickOutside([ref], onClose);

    const detectIsSelected = (filter) => selected.includes(filter);

    const handleClick = (value, isSelected) =>
        onSelect(name, value, isSelected ? "unselect" : "select");

    return name === activePanel ? (
        <div ref={ref} className={styles.container}>
            {filters.map((filter, index) => {
                const isSelected = detectIsSelected(filter.value);

                return (
                    <Text
                        key={index}
                        size="sm"
                        color={isSelected ? "black" : "gray"}
                        weight={isSelected ? "bold" : "normal"}
                        className={classNames(styles.filter, {
                            [styles.selected]: isSelected,
                        })}
                        onClick={() => handleClick(filter.value, isSelected)}
                    >
                        {filter.name}
                    </Text>
                );
            })}
        </div>
    ) : null;
}

export default FilterPanel;
