import styles from "styles/common/Tab.module.scss";
import Text from "components/common/typography/text";

export default function Tab({
  items = [{ name: "" }],
  activeTab,
  setActiveTab,
  ...rest
}) {
  return (
    <div>
      <div className={styles.tabs}>
        {items.map((item, itemIndex) => {
          return (
            <Text
              align="center"
              color="black"
              weight="bold"
              size="l"
              key={itemIndex}
              className={`${styles.tabItem} ${
                activeTab === item.name ? styles.active : ""
              }`}
              onClick={() => setActiveTab(item.name)}
            >
              {item.text}
            </Text>
          );
        })}
      </div>
    </div>
  );
}
