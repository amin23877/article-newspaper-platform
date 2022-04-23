import { useState } from "react";
import styles from "styles/components/manageAccount/PersonalInfo.module.scss";
import GeneralInfo from "./generalInfo";
import AboutYou from "./aboutYou";
import SocialMedia from "./socialMedia";
import EditProfile from "./editProfile";
import Text from "components/common/typography/text";

/*
 * there are two set of fields based on publisher type
 * actual ==> حقیقی
 * legal ==> حقوقی
 */

export const actual = "ناشر حقیقی";
export const legal = "ناشر حقوقی";

export default function PersonalInfo({ user }) {
  const [providerType, setProviderType] = useState(actual);

  const changeType = (e) => {
    setProviderType(e.target.value);
  };

  return (
    <div className={styles.container}>
      {user && user.isContentProvider && (
        <div className={styles.radioButtons}>
          <div className={styles.realLabel}>
            <Text color="black" component="label" size="l" htmlFor={actual}>
              ناشر حقیقی
            </Text>

            <input
              id={actual}
              type="radio"
              name="type"
              value={actual}
              checked={providerType === actual}
              onChange={changeType}
            />
          </div>

          <div className={styles.realLabel}>
            <Text color="black" component="label" size="l" htmlFor={legal}>
              ناشر حقوقی
            </Text>

            <input
              id={legal}
              type="radio"
              name="type"
              value={legal}
              checked={providerType === legal}
              onChange={changeType}
            />
          </div>
        </div>
      )}

      <GeneralInfo publisherType={providerType} user={user} />

      <EditProfile user={user} />

      <AboutYou user={user} />

      <SocialMedia user={user} />
    </div>
  );
}
