import { useState } from "react";
import AddNewBankAccount from "./addNewBankAccount";
import IncomeChart from "./incomeChart";
import MostLucrativePosts from "./mostLucrativePosts";
import styles from "styles/components/manageAccount/IncomeLog.module.scss";
import BankAccounts from "./bankAccounts";
import { useIncome } from "hooks/manage-account/useIncome";
import Text from "components/common/typography/text";

export default function IncomeLog({ banksData }) {
  const incomes = useIncome();

  const [addAccount, setAddAccount] = useState(false);

  return addAccount ? (
    <AddNewBankAccount setAddAccount={setAddAccount} banksData={banksData} />
  ) : (
    <>
      <div className={styles.statusContainer}>
        <div className={styles.status}>
          <Text color="black" weight="bold">
            درآمد از اشتراک ها
          </Text>

          <Text
            color="primary"
            className={styles.value}
          >{`${incomes.subscribe} تومان`}</Text>
        </div>

        <div className={styles.status}>
          <Text color="black" weight="bold">
            درآمد از پرداخت
          </Text>

          <Text
            color="primary"
            className={styles.value}
          >{`${incomes.buyPost} تومان`}</Text>
        </div>

        <div className={styles.status}>
          <Text color="black" weight="bold">
            کل درآمد ها
          </Text>

          <Text
            color="primary"
            className={styles.value}
          >{`${incomes.all} تومان`}</Text>
        </div>
      </div>

      <IncomeChart />

      <div className={styles.bottom}>
        <MostLucrativePosts />

        <BankAccounts banksData={banksData} setAddAccount={setAddAccount} />
      </div>
    </>
  );
}
