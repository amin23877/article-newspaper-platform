import { useState } from "react";
import AddNewBankAccount from "./addNewBankAccount";
import IncomeChart from "./incomeChart";
import MostLucrativePosts from "./mostLucrativePosts";
import styles from "styles/components/manageAccount/IncomeLog.module.scss";
import BankAccounts from "./bankAccounts";
import { useIncome } from "hooks/manage-account/useIncome";

export default function IncomeLog({banksData}) {
    const incomes = useIncome();

    const [addAccount, setAddAccount] = useState(false);

    return addAccount ? (
        <AddNewBankAccount setAddAccount={setAddAccount} banksData={banksData}/>
    ) : (
        <>
            <div className={styles.statusContainer}>
                <div className={styles.status}>
                    <div>درآمد از اشتراک ها</div>

                    <div className={styles.value}>{`${incomes.subscribe} تومان`}</div>
                </div>

                <div className={styles.status}>
                    <div>درآمد از پرداخت</div>

                    <div className={styles.value}>{`${incomes.buyPost} تومان`}</div>
                </div>

                <div className={styles.status}>
                    <div>کل درآمد ها</div>

                    <div className={styles.value}>{`${incomes.all} تومان`}</div>
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
