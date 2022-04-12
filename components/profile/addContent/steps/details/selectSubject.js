import { useState } from "react";
import Image from "next/image";
import arrowDown from "assets/svg/common/arrow-down.svg";
import styles from "styles/components/profile/addContent/steps/SelectSubject.module.scss";

export function SelectSubject({ initialSubjects, onSelect }) {
  const [subjects, setSubjects] = useState(initialSubjects);
  const [showList, setShowList] = useState(false);

  const openList = () => setShowList(true);
  const hideList = () => setShowList(false);
  const toggleList = () => setShowList((p) => !p);

  const handleFilterSubjects = (e) => {
    let val = e.target.value;

    // reset list to initial value if input is empty
    if (!val) setSubjects(initialSubjects);

    // filter subjects by value
    setSubjects(
      initialSubjects.filter((subject) => subject.title.includes(val))
    );
  };

  const handleSelectSubject = (subject) => {
    onSelect(subject);
    hideList();
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <span className={styles.arrow} onClick={toggleList}>
          <Image src={arrowDown} width={10} height={10} alt="" />
        </span>

        <input
          className={styles.input}
          onFocus={openList}
          onChange={handleFilterSubjects}
        />
      </div>

      {showList && subjects.length > 0 && (
        <div className={styles.list}>
          {subjects.map((subject, index) => (
            <div
              className={styles.listItem}
              onClick={() => handleSelectSubject(subject)}
              key={index}
            >
              {subject.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
