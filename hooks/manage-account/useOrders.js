import { useEffect, useState } from "react";
import { Endpoints } from "utils/endpoints";
import { api } from "axios/api";

export function useOrders() {
    const [orders, setOrders] = useState(null);
    const [status, setStatus] = useState("idle");

    useEffect(() => {
        setStatus("loading");
        api.get(Endpoints.getPayments, {
            params: {
                transactionType: "payment",
            },
        })
            .then((res) => {
                setOrders(res.data.data.payments);
                setStatus("success");
            })
            .catch(() => {
                setStatus("error");
            });
    }, []);

    return { orders, status };
}
