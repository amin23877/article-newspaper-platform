import { api } from "axios/api";
import { useEffect, useState } from "react";
import { Endpoints } from "utils/endpoints";

const initialIncomes = { all: 0, buyPost: 0, subscribe: 0 };

export function useIncome() {
    const [incomes, setIncomes] = useState(initialIncomes);

    useEffect(() => {
        api.get(Endpoints.getPayments, {
            params: {
                transactionType: "income",
            },
        }).then(({ data: { data } }) => {
            let incomesObject = initialIncomes;

            data.payments.forEach((element) => {
                incomesObject.all += element.amount;

                if (element.incomeMethod === "buyPost") incomesObject.buyPost += element.amount;

                if (element.incomeMethod === "subscribe") incomesObject.subscribe += element.amount;
            });

            setIncomes(incomesObject);
        });
    }, []);

    return incomes;
}
