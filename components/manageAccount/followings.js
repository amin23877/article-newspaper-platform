import React from 'react';
import Table from "components/common/table/Table";
import TableRow from "components/common/table/TableRow";
import TableCell from "components/common/table/tableCell";
import Text from "components/common/text";
import {useInteractionsList} from "hooks/manage-account/useInteractionsList";

function Followings() {
    const {list: followings, count, handleLoadMore} = useInteractionsList('followings');

    if (!followings || followings?.length === 0) return <Text>کسی را دنبال نمی کنید</Text>;

    return (
        <Table
            headers={['دنبال شونده', 'حمایت', 'پرداختی']}
            maxRowsCount={count}
            size={followings.length}
            onLoadMore={handleLoadMore}
        >
            <tbody>
                {followings.map(({targetAccount}) => (
                    <TableRow key={targetAccount._id}>
                        <TableCell icon={targetAccount.profilePicture}>{targetAccount.username}</TableCell>
                        <TableCell>دیتا از سرور نمیاد</TableCell>
                        <TableCell>دیتا از سرور نمیاد</TableCell>
                    </TableRow>
                ))}
            </tbody>
        </Table>
    );
}

export default Followings;