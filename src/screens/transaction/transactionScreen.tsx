import { FC } from "react";
import Transaction from "../../packages/auth/containers/transaction/transaction";

interface TransactionScreenProps {}

export const TransactionScreen: FC<TransactionScreenProps> = () => {
    return (
        <>
            <Transaction />
        </>
    );
};
