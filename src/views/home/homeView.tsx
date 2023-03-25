import React from 'react';
import { IOpsSdk } from '@deliveryhero/opsportal';
import {
    FilterConditionValueType,
    FilterEditor,
    FilterLayout,
    useFilterURLStorage,
    FilterEnumConditionType,
    FilterConditionSchemaType,
    FilterDateConditionType
} from '@deliveryhero/armor-filter';
import { format } from 'date-fns';
import { Container, Flex, Table, TableBody, TableCell, TableHead, TableRow } from '@deliveryhero/armor';

interface IHomeView {
    baseApi: IOpsSdk;
}

const filterSchema: FilterConditionSchemaType = {
    conditions: [
        {
            id: 'search',
            label: 'Search Orders',
        },
        {
            id: 'status',
            label: 'Status',
            typeId: 'statusEnum',
        },
        {
            id: 'startDate',
            label: 'Start Date',
            typeId: 'startDate',
        },
        {
            id: 'endDate',
            label: 'End Date',
            typeId: 'endDate',
        },
    ]
};

// TODO: replace with actual call
const sampleMockCall = {
    "data": {
        "billingViewOrderList": {
            "Orders": [
                {
                    "Status": "sent",
                    "LatestEventType": "billing_order_sending",
                    "OrderCode": "v6yj-3333",
                    "VendorCode": "v6yj",
                    "OrderUpdatedAt": "2023-03-23T09:09:43.135628788Z",
                    "IsBillable": true,
                    "EntityId": "global_entity_id",
                    "OrderPlacedAt": "2023-03-23"
                },
                {
                    "Status": "sent",
                    "LatestEventType": "billing_order_sending",
                    "OrderCode": "v6yj-ztpc",
                    "VendorCode": "v6yj",
                    "OrderUpdatedAt": "2023-03-23T09:09:43.135628788Z",
                    "IsBillable": true,
                    "EntityId": "global_entity_id",
                    "OrderPlacedAt": "2023-03-23"
                },
                {
                    "Status": "sent",
                    "LatestEventType": "billing_order_sending",
                    "OrderCode": "x1ba-l8bn",
                    "VendorCode": "x1ba",
                    "OrderUpdatedAt": "2023-03-23T07:33:55.436036009Z",
                    "IsBillable": true,
                    "EntityId": "global_entity_id",
                    "OrderPlacedAt": "2023-03-23"
                },
                {
                    "Status": "sent",
                    "LatestEventType": "billing_order_sending",
                    "OrderCode": "v6yj-hc4o",
                    "VendorCode": "v6yj",
                    "OrderUpdatedAt": "2023-03-23T08:54:48.122885736Z",
                    "IsBillable": true,
                    "EntityId": "global_entity_id",
                    "OrderPlacedAt": "2023-03-23"
                },
                {
                    "Status": "sent",
                    "LatestEventType": "billing_order_sending",
                    "OrderCode": "x8km-nuiy",
                    "VendorCode": "x8km",
                    "OrderUpdatedAt": "2023-03-24T09:44:10.889835395Z",
                    "IsBillable": true,
                    "EntityId": "global_entity_id",
                    "OrderPlacedAt": "2023-03-24"
                },
                {
                    "Status": "sent",
                    "LatestEventType": "billing_order_sending",
                    "OrderCode": "s6th-pirs",
                    "VendorCode": "s6th",
                    "OrderUpdatedAt": "2023-03-24T09:03:49.43430701Z",
                    "IsBillable": true,
                    "EntityId": "global_entity_id",
                    "OrderPlacedAt": "2023-03-24"
                },
                {
                    "Status": "sent",
                    "LatestEventType": "billing_order_sending",
                    "OrderCode": "di-v3zb-sxvq",
                    "VendorCode": "di-v",
                    "OrderUpdatedAt": "2023-03-24T02:42:43.311468892Z",
                    "IsBillable": true,
                    "EntityId": "global_entity_id",
                    "OrderPlacedAt": "2023-03-24"
                },
                {
                    "Status": "sent",
                    "LatestEventType": "billing_order_sending",
                    "OrderCode": "s9sv-sk9o",
                    "VendorCode": "s9sv",
                    "OrderUpdatedAt": "2023-03-24T09:39:07.454988131Z",
                    "IsBillable": true,
                    "EntityId": "global_entity_id",
                    "OrderPlacedAt": "2023-03-24"
                },
                {
                    "Status": "sent",
                    "LatestEventType": "billing_order_sending",
                    "OrderCode": "x1ba-x1lb",
                    "VendorCode": "x1ba",
                    "OrderUpdatedAt": "2023-03-24T07:06:24.999843798Z",
                    "IsBillable": true,
                    "EntityId": "global_entity_id",
                    "OrderPlacedAt": "2023-03-24"
                }
            ],
            "PagingKey": {
                "flow": "LATEST",
                "orderCode": "s6mu-f0nr",
                "orderPlacedAt": "2023-03-24"
            }
        }
    }
};

const conditionTypes = [
    FilterEnumConditionType.create('statusEnum', {
        options: [
            { label: 'Received', value: 'received' },
            { label: 'Sent', value: 'sent' },
            { label: 'Cancelled', value: 'cancelled' },
            { label: 'Failed', value: 'failed' },
        ],
    }),
    FilterDateConditionType.create('startDate', {
        formatDateTime: (value: unknown) =>
            format(
                value instanceof Date ? value : new Date(value as string),
                'yyyy.MM.dd',
            ),
    }),
    FilterDateConditionType.create('endDate', {
        formatDateTime: (value: unknown) =>
            format(
                value instanceof Date ? value : new Date(value as string),
                'yyyy.MM.dd',
            ),
    }),
]

export const HomeView: React.FC<IHomeView> = () => {
    const [storedValue, setStoredValue] = useFilterURLStorage('filterA');
    const [filterValue, setFilterValue] = React.useState<FilterConditionValueType | undefined>(storedValue);

    const setFilterValueCommon: any = React.useCallback(
        (value: FilterConditionValueType) => {
            setStoredValue(value);
            setFilterValue(value);
        },
        [setStoredValue, setFilterValue],
    );

    return (
        <Container maxWidth={"90%"}>
            <div>Billing View</div>
            <div>
                <div>
                    Orders in Billing
                </div>
                <div>
                    Orders Failed to Be Sent to SAP
                </div>
                <div>
                    Orders Sent to SAP
                </div>
            </div>
            <div>
                <FilterLayout tall>
                    <FilterEditor
                        schema={filterSchema}
                        value={filterValue}
                        types={conditionTypes}
                        onValueChange={setFilterValueCommon}
                        enableCloseButton={false}
                        paddingTop={6}
                        layout="horizontal"
                        nonce
                    />
                </FilterLayout>
            </div>
            <div>
                <Table width={"100%"} marginTop={5} stickyHead>
                    <TableHead>
                        <TableRow>
                            <TableCell>Entity</TableCell>
                            <TableCell>Order Code</TableCell>
                            <TableCell>Vendor Code</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Billable</TableCell>
                            <TableCell>Order Placed At</TableCell>
                            <TableCell>Order Updated At</TableCell>
                            <TableCell>Payload</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sampleMockCall.data.billingViewOrderList.Orders.map(order => {
                            return (
                                <TableRow>
                                    <TableCell>{order.EntityId}</TableCell>
                                    <TableCell>{order.OrderCode}</TableCell>
                                    <TableCell>{order.VendorCode}</TableCell>
                                    <TableCell>{order.Status}</TableCell>
                                    <TableCell>{order.IsBillable.toString()}</TableCell>
                                    <TableCell>{order.OrderPlacedAt}</TableCell>
                                    <TableCell>{order.OrderUpdatedAt}</TableCell>
                                    <TableCell>{'TBD'}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </Container>
    );
};

export default HomeView;
