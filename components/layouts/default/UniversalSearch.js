import Image from "next/image";

import styles from "styles/components/layouts/default/UniversalSearch.module.scss";
import SearchIcon from "assets/svg/common/search.svg";
import SearchConfigIcon from "assets/svg/common/search-config.svg";

export default function UniversalSearch() {
  return (
    <div className={styles.universalSearchContainer}>
      <div className={styles.searchIcon}>
        <Image src={SearchIcon} alt="" />
      </div>

      <input placeholder="جستجو" type="text" className={styles.searchInput} />
    </div>
  );
}
