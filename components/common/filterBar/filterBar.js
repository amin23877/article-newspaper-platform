import styles from "styles/common/FilterBar.module.scss";
import Magnifier from "assets/svg/common/magnifier-grey.svg";
import ChevronDown from "assets/svg/common/chevron-down.svg";
import Image from "next/image";
import FilterPanel from "components/common/filterBar/filterPanel";
import { useReducer, useState } from "react";
import FilterTimePanel from "./filterTimePanel";
import Text from "components/common/typography/text";

const filters = {
  paymentType: [
    { name: "همه", value: "" },
    { name: "رایگان", value: "free" },
    { name: "اشتراک", value: "subscribe" },
    { name: "پرداخت", value: "payment" },
  ],
  contentType: [
    { name: "مقاله", value: "article" },
    { name: "ویدیو", value: "video" },
    { name: "مجله", value: "magazine" },
    { name: "پادکست", value: "podcast" },
    { name: "روزنامه", value: "newsletter" },
  ],
};

const initialState = {
  paymentType: "",
  contentType: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "select":
      return {
        ...state,
        [action.name]: action.payload,
      };

    case "unselect":
      return {
        ...state,
        [action.name]: "",
      };

    default:
      throw new Error("invalid action");
  }
};

export default function FilterBar({ handleClick, onFilter, onSearch }) {
  const [activePanel, setActivePanel] = useState(null);
  const [timespan, setTimespan] = useState({ fromDate: "", toDate: "" });
  const [selectedFilters, dispatch] = useReducer(reducer, initialState);

  const closePanel = () => {
    setActivePanel(null);

    onFilter({ ...selectedFilters, ...timespan }); // pass selected filters to parent component with this event
  };

  const handleSelectTime = (time) => {
    setTimespan({
      fromDate: time.start._d,
      toDate: time.end._d,
    });
  };

  // this function get name and value of filter and action type (selected or unselected) and update state
  const handleSelectFilter = (name, value, type) => {
    dispatch({ type, name, payload: value });

    if (type === "unselect" && typeof handleClick === "function") handleClick();
  };

  return (
    <div className={styles.filterBarContainer}>
      <Text weight="bold" size="xxl">
        فیلتر
      </Text>

      <div className={styles.optionsContainer}>
        {/* filter time */}
        <div
          onClick={() => setActivePanel("time")}
          className={styles.optionItem}
        >
          <Text>زمان</Text>

          <div className={styles.icon}>
            <Image src={ChevronDown} alt="" />
          </div>

          <FilterTimePanel
            onSelect={handleSelectTime}
            activePanel={activePanel}
            onClose={closePanel}
          />
        </div>

        {/* filter access */}
        <div
          onClick={() => setActivePanel("paymentType")}
          className={styles.optionItem}
        >
          <Text>دسترسی</Text>

          <div className={styles.icon}>
            <Image src={ChevronDown} alt="" />
          </div>

          <FilterPanel
            name="paymentType"
            activePanel={activePanel}
            filters={filters.paymentType}
            onClose={closePanel}
            selected={selectedFilters.paymentType}
            onSelect={handleSelectFilter}
          />
        </div>

        {/* filter content type */}
        <div
          onClick={() => setActivePanel("contentType")}
          className={styles.optionItem}
        >
          <Text>محتوا</Text>

          <div className={styles.icon}>
            <Image src={ChevronDown} alt="" />
          </div>

          <FilterPanel
            name="contentType"
            activePanel={activePanel}
            filters={filters.contentType}
            onClose={closePanel}
            selected={selectedFilters.contentType}
            onSelect={handleSelectFilter}
          />
        </div>
      </div>

      {/* filter by text */}
      <div className={styles.searchContainer}>
        <input onChange={onSearch} type="text" placeholder="جستجو" />

        <span className={styles.iconContainer}>
          <Image src={Magnifier} alt="" />
        </span>
      </div>
    </div>
  );
}
