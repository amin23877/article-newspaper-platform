import React from 'react';
import Table from "components/common/table/Table";
import TableRow from "components/common/table/TableRow";
import TableCell from "components/common/table/tableCell";

import MockAvatar from "assets/images/mock-avatar.png";

function Followers() {
    return (
        <Table headers={['دنبال کننده', 'حمایت', 'پرداختی']}>
            <TableRow>
                <TableCell icon={MockAvatar}>اسم</TableCell>
                <TableCell>اشتراک طلایی</TableCell>
                <TableCell>100 هزار تومان</TableCell>
            </TableRow>

            <TableRow>
                <TableCell icon={MockAvatar}>اسم</TableCell>
                <TableCell>اشتراک طلایی</TableCell>
                <TableCell>100 هزار تومان</TableCell>
            </TableRow>

            <TableRow>
                <TableCell icon={MockAvatar}>اسم</TableCell>
                <TableCell>اشتراک طلایی</TableCell>
                <TableCell>100 هزار تومان</TableCell>
            </TableRow>

            <TableRow>
                <TableCell icon={MockAvatar}>اسم</TableCell>
                <TableCell>اشتراک طلایی</TableCell>
                <TableCell>100 هزار تومان</TableCell>
            </TableRow>
        </Table>
    );
}

export default Followers;