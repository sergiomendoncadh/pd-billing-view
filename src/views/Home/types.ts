import { IOpsSdk } from "@deliveryhero/opsportal";
import { OrderItem, PagingKey } from "@modules/types.graphql";
import { formatExpectedDate } from "@utils/helper";

export interface IHomeView {
    baseApi: IOpsSdk;
};

export interface IOrderSet {
    orders: OrderItem[];
    pagingKey: PagingKey;
};

export const initialOrderSet: IOrderSet = {
    orders: [],
    pagingKey: {},
};

export const initialFilterValue = {
    conditions: [
        {
            id: "startDate",
            name: "startDate",
            value: formatExpectedDate(new Date().toISOString()),
        },
        {
            id: "endDate",
            name: "endDate",
            value: formatExpectedDate(new Date().toISOString()),
        },
        {
            id: "status",
            name: "status",
            value: 'sent',
        }
    ]
};
