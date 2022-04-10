import styles from "styles/common/FilterBar.module.scss";
import Magnifier from "assets/svg/common/magnifier-grey.svg";
import ChevronDown from "assets/svg/common/chevron-down.svg";
import Image from "next/image";
import FilterPanel from "components/common/filterBar/filterPanel";
import {useReducer, useState} from "react";

const filters = {
    access: [
        {name: "همه", value: "all"},
        {name: "رایگان", value: "free"},
        {name: "اشتراک VIP", value: "vip"},
    ],
    type: [
        {name: "مقاله", value: "article"},
        {name: "ویدیو", value: "video"},
        {name: "مجله", value: "magazine"},
        {name: "پادکست", value: "podcast"},
        {name: "روزنامه", value: "newspaper"},
    ],
};

const initialState = {
    access: [],
    label: [],
    type: [],
};

const reducer = (state, action) => {
    switch (action.type) {
        case "select":
            return {
                ...state,
                [action.name]: [...state[action.name], action.payload],
            };

        case "unselect":
            return {
                ...state,
                [action.name]: state[action.name].filter((item) => item !== action.payload),
            };

        default:
            throw new Error("invalid action");
    }
};

export default function FilterBar({handleClick}) {
    const [activePanel, setActivePanel] = useState(null);
    const [selectedFilters, dispatch] = useReducer(reducer, initialState);

    const closePanel = () => {
        setActivePanel(null);
    }

    // this function get name and value of filter and action type (selected or unselected) and update state
    const handleSelect = (name, value, type) => {
        dispatch({type, name, payload: value});

        if (type === 'unselect' && typeof handleClick === 'function') handleClick();
    };

    return (
        <div className={styles.filterBarContainer}>
            <div className={styles.title}>فیلتر</div>

            <div className={styles.optionsContainer}>
                <div onClick={() => setActivePanel("time")} className={styles.optionItem}>
                    <div className={styles.text}>زمان</div>

                    <div className={styles.icon}>
                        <Image src={ChevronDown} alt=""/>
                    </div>
                </div>

                <div onClick={() => setActivePanel("access")} className={styles.optionItem}>
                    <div className={styles.text}>دسترسی</div>

                    <div className={styles.icon}>
                        <Image src={ChevronDown} alt=""/>
                    </div>

                    <FilterPanel
                        name="access"
                        activePanel={activePanel}
                        filters={filters.access}
                        onClose={closePanel}
                        selected={selectedFilters.access}
                        onSelect={handleSelect}
                    />
                </div>

                <div onClick={() => setActivePanel("type")} className={styles.optionItem}>
                    <div className={styles.text}>نوع محتوا</div>

                    <div className={styles.icon}>
                        <Image src={ChevronDown} alt=""/>
                    </div>

                    <FilterPanel
                        name="type"
                        activePanel={activePanel}
                        filters={filters.type}
                        onClose={closePanel}
                        selected={selectedFilters.type}
                        onSelect={handleSelect}
                    />
                </div>
            </div>

            <div className={styles.searchContainer}>
                <input type="text" placeholder="جستجو"/>

                <span className={styles.iconContainer}>
                    <Image src={Magnifier} alt=""/>
                </span>
            </div>
        </div>
    );
}
