import React from 'react';
import Table from "components/common/table/Table";
import TableRow from "components/common/table/TableRow";
import TableCell from "components/common/table/tableCell";
import {useInteractionsList} from "hooks/manage-account/useInteractionsList";
import EmptyList from "components/manageAccount/emptyList";

import emptyImage from 'assets/images/manage-account/empty-list.svg'

function Followings() {
    const {list: followings, count, handleLoadMore} = useInteractionsList('followings');

    if (!followings) return 'loading...'

    return (
        <Table
            headers={['دنبال شونده', 'حمایت', 'پرداختی']}
            maxRowsCount={count}
            size={followings.length}
            onLoadMore={handleLoadMore}
            emptyComponent={<EmptyList image={emptyImage} text='شما کسی را دنبال نمی کنید' />}
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