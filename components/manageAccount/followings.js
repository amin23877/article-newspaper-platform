import React from "react";
import Table from "components/common/table";
import TableRow from "components/common/table/TableRow";
import TableCell from "components/common/table/TableCell";
import { useInteractionsList } from "hooks/manage-account/useInteractionsList";
import EmptyList from "components/manageAccount/emptyList";

import emptyImage from "assets/images/manage-account/empty-list.svg";
import Text from "components/common/typography/text";

function Followings() {
  const {
    list: followings,
    count,
    handleLoadMore,
  } = useInteractionsList("followings");

  return (
    <Table
      headers={["دنبال شونده", "حمایت", "پرداختی"]}
      maxRowsCount={count}
      data={followings}
      onLoadMore={handleLoadMore}
      emptyComponent={
        <EmptyList image={emptyImage} text="شما کسی را دنبال نمی کنید" />
      }
    >
      {(data) =>
        data.map(({ targetAccount }) => (
          <TableRow key={targetAccount._id}>
            <TableCell icon={targetAccount.profilePicture}>
              <Text color="black">{targetAccount.username}</Text>
            </TableCell>
            <TableCell>
              <Text color="black">دیتا از سرور نمیاد</Text>
            </TableCell>
            <TableCell>
              <Text color="black">دیتا از سرور نمیاد</Text>
            </TableCell>
          </TableRow>
        ))
      }
    </Table>
  );
}

export default Followings;
