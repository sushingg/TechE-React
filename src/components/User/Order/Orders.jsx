import React from "react";
import { Link } from "react-router-dom";
import { Table, Icon, Label } from "semantic-ui-react";
import moment from "moment";
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'THB',
  minimumFractionDigits: 2
})
const Product = props => {
  moment.locale("th");
  return (
    <Table.Row>
      <Table.Cell>
        <Label basic as={Link} to={"/my/order/" + props.order.id}>
          <Icon name="file outline" />
          View Order
        </Label>
      </Table.Cell>
      <Table.Cell>
        <Label basic>
          {moment.unix((props.order.createdAt)/1000).format("llll")}
        </Label>
        
      </Table.Cell>
      <Table.Cell>
        <Label tag>{formatter.format(props.order.total)}</Label>
      </Table.Cell>
      <Table.Cell>
        {(() => {
          switch (props.order.status) {
            case null:
              return <Label color="yellow">รอชำระเงิน</Label>;
            case "successful":
              return <Label color="green">ชำระเงินแล้ว</Label>;
            case "failed":
              return <Label color="red">ล้มเหลว</Label>;
            case "cancel":
              return <Label color="red">ยกเลิก</Label>;
            default:
              return <Label color="yellow">รอชำระเงิน</Label>;
          }
        })()}
      </Table.Cell>
    </Table.Row>
  );
};

export default Product;
