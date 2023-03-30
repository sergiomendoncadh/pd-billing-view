import React from 'react';
import {
    FilterConditionValueType,
    FilterEditor,
    FilterLayout,
    FilterConditionSchemaType,
    FilterEnumConditionType,
    FilterDateConditionType,
} from '@deliveryhero/armor-filter';
import styles from './FilterMenu.module.css';
import { formatExpectedDate } from '@utils/helper';
import { format } from 'date-fns';

interface IFilterMenuProps {
    filterValue: FilterConditionValueType | undefined;
    setFilterValueCommon: (newValue: FilterConditionValueType) => void;
}

const filterSchema: FilterConditionSchemaType = {
    conditions: [
        {
            id: 'search',
            label: 'Order Code',
        },
        {
            id: 'status',
            label: 'Status',
            typeId: 'statusEnum',
            initialValue: 'sent'
        },
        {
            id: 'startDate',
            label: 'Start Date',
            typeId: 'startDate',
            initialValue: formatExpectedDate(new Date().toISOString())
        },
        {
            id: 'endDate',
            label: 'End Date',
            typeId: 'endDate',
            initialValue: formatExpectedDate(new Date().toISOString())
        },
    ]
};

const conditionTypes = [
    FilterEnumConditionType.create('statusEnum', {
        options: [
            { label: 'Received', value: 'received' },
            { label: 'Sent', value: 'sent' },
            { label: 'Cancelled', value: 'cancelled' },
            { label: 'Failed', value: 'failed' },
            { label: 'Skipped', value: 'skipped' },
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
];

const FilterMenu: React.FC<IFilterMenuProps> = ({filterValue, setFilterValueCommon}) => {
    return (
        <div>
            <FilterLayout tall className={styles.filterSection}>
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
    )
}

export default FilterMenu;
