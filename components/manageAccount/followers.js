import React from 'react';
import Table from "components/common/table/Table";
import TableRow from "components/common/table/TableRow";
import TableCell from "components/common/table/tableCell";
import Text from "components/common/text";
import {useInteractionsList} from "hooks/manage-account/useInteractionsList";

function Followers() {
    const {list: followers, count, handleLoadMore} = useInteractionsList('followers');

    if (!followers || followers?.length === 0) return <Text>فالووری ندارید</Text>;

    return (
        <Table
            headers={['دنبال کننده', 'حمایت', 'پرداختی']}
            maxRowsCount={count}
            size={followers.length}
            onLoadMore={handleLoadMore}
        >
            {followers.map(({targetAccount}) => (
                <TableRow key={targetAccount._id}>
                    <TableCell icon={targetAccount.profilePicture}>{targetAccount.username}</TableCell>
                    <TableCell>دیتا از سرور نمیاد</TableCell>
                    <TableCell>دیتا از سرور نمیاد</TableCell>
                </TableRow>
            ))}t
        </Table>
    );
}

export default Followers;