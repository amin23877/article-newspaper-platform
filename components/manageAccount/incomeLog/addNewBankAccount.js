import { useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import CustomInput from "components/common/input";
import Button from "components/common/button";

import styles from "styles/components/manageAccount/IncomeLog.module.scss";
import ChevronLeftLight from "assets/images/manage-account/left-arrow.svg";
import TrashIcon from "assets/svg/popup/trash.svg";
import EditIcon from "assets/svg/popup/edit.svg";

export default function AddNewBankAccount({ setAddAccount, banksData }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <>
            <div className={styles.breadcrumb}>
                <span className={styles.before} onClick={() => setAddAccount(false)}>
                    <Link href="/manage-account">گزارش مالی</Link>
                </span>
                &nbsp;&nbsp;
                <div className={styles.before}>
                    <Image src={ChevronLeftLight} alt="" />
                </div>
                &nbsp;&nbsp;
                <span>افزودن حساب جدید</span>
            </div>

            <div className={styles.addAccountContainer}>
                <div>
                    <div className={styles.title}>افزودن حساب جدید</div>
                    {banksData.map((account) => {
                        return (
                            <div key={account._id} className={styles.account}>
                                <div className={styles.title}>
                                    <span>{account.title}</span>&nbsp;&nbsp;&nbsp;
                                    <span>{account.number}</span>
                                </div>

                                <div className={styles.options}>
                                    <div className={styles.item}>
                                        <div className={styles.icon}>
                                            <Image src={EditIcon} alt="" />
                                        </div>
                                        <div className={styles.text}>ویرایش</div>
                                    </div>

                                    <div className={styles.item}>
                                        <div className={styles.icon}>
                                            <Image src={TrashIcon} alt="" />
                                        </div>
                                        <div className={styles.text}>حذف</div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div>
                    <div className={styles.description}>
                        اطلاعات حسابی که میخواهید واریز به آن انجام شود را وارد نمایید.
                    </div>

                    <form
                        onSubmit={handleSubmit((data) => console.log(data))}
                        className={styles.form}
                    >
                        <div className={styles.fieldRow}>
                            <div className={styles.field}>
                                <div className={styles.label}>نام بانک : &nbsp;</div>
                                <CustomInput
                                    register={register}
                                    name="bankName"
                                    validation={{ required: "پر کردن این فیلد الزامی است" }}
                                    error={errors.bankName}
                                />
                            </div>

                            <div className={styles.field}>
                                <div className={styles.label}>شماره حساب : &nbsp;</div>
                                <CustomInput
                                    register={register}
                                    placeholder="شماره حساب را وارد نمایید."
                                    name="number"
                                    validation={{ required: "پر کردن این فیلد الزامی است" }}
                                    error={errors.number}
                                />
                            </div>
                        </div>

                        <div className={styles.fieldRow}>
                            <div className={styles.field}>
                                <div className={styles.label}>نام صاحب حساب : &nbsp;</div>
                                <CustomInput
                                    register={register}
                                    name="owner"
                                    validation={{ required: "پر کردن این فیلد الزامی است" }}
                                    error={errors.owner}
                                />
                            </div>

                            <div className={styles.field}>
                                <div className={styles.label}>شماره شبا : &nbsp;</div>
                                <CustomInput
                                    register={register}
                                    placeholder="شماره شبا را وارد نمایید."
                                    name="shaba"
                                    validation={{ required: "پر کردن این فیلد الزامی است" }}
                                    error={errors.shaba}
                                />
                            </div>
                        </div>

                        <div className={styles.button}>
                            <Button type="submit">تایید نهایی</Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
