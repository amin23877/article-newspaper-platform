import React, { useRef } from "react";
import styles from "../../../styles/common/FilterBar.module.scss";
import { RangeDatePicker } from "jalali-react-datepicker";
import { useWhenClickOutside } from "../../../hooks/useWhenClickOutside";

const datePickerTheme = {
  backColor: "#fff",

  // header
  headBackColor: "#155a61",
  headTitleColor: "#fff",
  headArrowColor: "#fff",
  headRangeBackColor: "#D6D6D6",
  headRangeColor: "#000",

  // weekdays color
  weekDaysColor: "#3F3F3F",

  // days
  daysColor: "#000",
  daysBackColor: "#FFFFFF",
  holidaysColor: "#F50057",
  holidaysBackColor: "#FFFFFF",
  daysRound: "50%",

  // start end
  startRangeBackColor: "#D6D6D6",
  startRangeColor: "#000",
  endRangeBackColor: "#D6D6D6",
  endRangeColor: "#000",
  continueRangeBackColor: "#f3f3f3",
  continueRangeColor: "#000",
  sameRangeBackColor: "#fff",
  sameRangeColor: "#2979ff",

  // buttons
  submitBackColor: "#D6D6D6",
  submitHoverBackColor: "#f3f3f3",
  submitColor: "#000",
  submitHoverColor: "#000",
  cancelBackColor: "#fff",
  cancelHoverBackColor: "#D6D6D6",
  cancelColor: "#000",
  cancelHoverColor: "#000",
};

function FilterTimePanel({ activePanel, onClose }) {
  const ref = useRef();

  useWhenClickOutside([ref], () => {
    onClose();
  });

  return (
    <div
      ref={ref}
      className={styles.datePicker}
      hidden={activePanel !== "time"}
    >
      <RangeDatePicker
        onClickSubmitButton={(value) => console.log(value)}
        theme={datePickerTheme}
      />
    </div>
  );
}

export default FilterTimePanel;
