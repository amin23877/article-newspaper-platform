import styles from "styles/components/manageAccount/OrderList.module.scss";
import OrderContainer from "./orderContainer";
import SearchIcon from "assets/svg/common/search.svg";
import Image from "next/image";
import { Spinner } from "components/common/spinner";
import { useOrders } from "hooks/manage-account/useOrders";

export default function OrderList() {
    const { orders, status } = useOrders();
    
    return (
        <div className={styles.container}>
            <div className={styles.searchContainer}>
                <div className={styles.searchIcon}>
                    <Image src={SearchIcon} alt="" />
                </div>

                <input className={styles.searchInput} placeholder="جستجو" />
            </div>

            {status === "loading" && <Spinner style={{ padding: "5rem" }} />}

            {status === "success" &&
                orders.map((order, index) => {
                    return <OrderContainer key={index} order={order} />;
                })}
        </div>
    );
}
