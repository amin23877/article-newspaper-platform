import React from 'react';
import Table from "components/common/table/Table";
import TableRow from "components/common/table/TableRow";
import TableCell from "components/common/table/tableCell";
import EmptyList from "components/manageAccount/emptyList";
import {useInteractionsList} from "hooks/manage-account/useInteractionsList";

import emptyImage from 'assets/images/manage-account/empty-list.svg'

function Followers() {
    const {list: followers, count, handleLoadMore} = useInteractionsList('followers');

    return (
        <Table
            headers={['دنبال کننده', 'حمایت', 'پرداختی']}
            maxRowsCount={count}
            data={followers}
            onLoadMore={handleLoadMore}
            emptyComponent={<EmptyList image={emptyImage} text='شما هیچ فالووری ندارید'/>}
        >
            {(data) =>
                data.map(({targetAccount}) => (
                    <TableRow key={targetAccount._id}>
                        <TableCell icon={targetAccount.profilePicture}>{targetAccount.username}</TableCell>
                        <TableCell>دیتا از سرور نمیاد</TableCell>
                        <TableCell>دیتا از سرور نمیاد</TableCell>
                    </TableRow>
                ))
            }
        </Table>
    );
}

export default Followers;