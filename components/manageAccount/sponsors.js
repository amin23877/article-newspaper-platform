import Table from "components/common/table";
import TableCell from "components/common/table/TableCell";
import TableRow from "components/common/table/TableRow";
import EmptyList from "./emptyList";
import { useSponsors } from "hooks/manage-account/useSponsors";

import emptyImage from "assets/images/manage-account/empty-list.svg";

export default function Sponsors() {
    const { list, handleLoadMore } = useSponsors();

    return (
        <Table
            headers={["حامی", "حمایت", "پرداختی"]}
            data={list}
            onLoadMore={handleLoadMore}
            emptyComponent={<EmptyList image={emptyImage} text="شما هیچ حامی ندارید" />}
        >
            {(data) =>
                data.map((item) => (
                    <TableRow key={item._id}>
                        <TableCell icon={item.profilePicture}>{item.user}</TableCell>
                        <TableCell>دیتا از سرور نمیاد</TableCell>
                        <TableCell>{item.amount} تومان</TableCell>
                    </TableRow>
                ))
            }
        </Table>
    );
}
