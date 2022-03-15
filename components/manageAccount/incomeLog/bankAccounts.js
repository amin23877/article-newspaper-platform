import { useState } from "react";
import Button from "components/common/button";
import styles from "styles/components/manageAccount/IncomeLog.module.scss";

export default function BankAccounts({ setAddAccount, banksData }) {
    const [accountIndex, setAccountIndex] = useState();

    const changeType = (index) => {
        setAccountIndex(index);
    };

    return (
        <div className={`${styles.accounts} ${styles.container}`}>
            <div className={styles.header}>حساب های متصل</div>

            <div className={styles.description}>
                اطلاعات حسابی که میخواهید واریز به آن انجام شود را وارد نمایید.
            </div>

            <div className={styles.radioButtons}>
                {banksData.map((account, index) => (
                    <div key={account._id} className={styles.realLabel}>
                        <label>
                            <input
                                type="radio"
                                name="type"
                                value={account.number}
                                checked={accountIndex === index}
                                onChange={() => changeType(index)}
                            />

                            <span></span>
                        </label>
                        <span>{account.title}</span>&nbsp;&nbsp;&nbsp;
                        <span>{account.number}</span>
                    </div>
                ))}

                <div className={styles.addAccount} onClick={() => setAddAccount(true)}>
                    افزودن حساب جدید
                </div>
            </div>

            <div className={styles.buttonContainer}>
                <Button>تسویه حساب</Button>
            </div>
        </div>
    );
}
