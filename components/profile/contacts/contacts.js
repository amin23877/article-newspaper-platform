import Link from "next/link";

import styles from "styles/components/profile/contacts/Contacts.module.scss";
import ContactItem from "./contactItem";
import Text from "components/common/typography/text";

export default function Contacts({
  type = "follower",
  count,
  data = [],
  ...rest
}) {
  console.log(data);
  return (
    <div className={styles.contactsContainer}>
      <Text align="center" weight="bold" className={styles.title}>
        {type === "follower"
          ? `${count ?? "0"} نفر دنبال کننده`
          : `${count ?? 0} نفر را دنبال می کنید`}
      </Text>

      <div className={styles.itemsContainer}>
        {data.map((item, index) => {
          return (
            <Link
              key={index}
              href={`/user/${item.targetAccount?._id || item.user._id}`}
            >
              <a>
                <div className={styles.item}>
                  <ContactItem info={item.targetAccount} />
                </div>
              </a>
            </Link>
          );
        })}
      </div>
      {count > 4 ? (
        <div className={styles.showAll}>
          <Link href="/">
            <a>همه موارد</a>
          </Link>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
