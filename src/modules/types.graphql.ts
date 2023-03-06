export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AggregatorApiRequest = {
  geid: Scalars['String'];
  id: Scalars['String'];
  orderCodes: Array<Scalars['String']>;
};

export type AggregatorApiResponse = {
  __typename?: 'AggregatorApiResponse';
  GlobalOrderCodes: Array<Scalars['String']>;
  status: Scalars['String'];
};

export type AppPermissions = {
  appName: Scalars['String'];
  permissions: Array<Permissions>;
};

export type CalculationConfigResponse = {
  __typename?: 'CalculationConfigResponse';
  containerFixedValue?: Maybe<Scalars['Float']>;
  serviceFeeRate?: Maybe<Scalars['Float']>;
  taxValueId?: Maybe<Scalars['ID']>;
  templateId?: Maybe<Scalars['ID']>;
};

export type CalculationTemplate = {
  __typename?: 'CalculationTemplate';
  content?: Maybe<Scalars['String']>;
  gId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

/** ConfirmPayment input definition */
export type ConfirmPaymentInput = {
  documentNumber: Scalars['String'];
  invoiceDate: Scalars['String'];
  invoiceNumber: Scalars['String'];
  legalName: Scalars['String'];
  period: PeriodStrictInput;
  receivableId: Scalars['String'];
};

export type CreateCalculationTemplateInput = {
  content: Scalars['String'];
  name: Scalars['String'];
};

export type CreateTaxValueInput = {
  name: Scalars['String'];
  value: Scalars['Float'];
};

/** DataPage input definition */
export type DataPage = {
  first?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['Int']>;
};

/** DataSort input definition */
export type DataSort = {
  sort?: InputMaybe<SortDirection>;
  sortBy?: InputMaybe<SortableReceivableField>;
};

/** FilterQuery input definition */
export type FilterQueryInput = {
  endDate: Scalars['String'];
  isBillable: Scalars['Boolean'];
  isReceiptable: Scalars['Boolean'];
  isWastage: Scalars['Boolean'];
  pageLimit: Scalars['Int'];
  pageNumber: Scalars['Int'];
  searchTerm?: InputMaybe<Scalars['String']>;
  startDate: Scalars['String'];
  status: Scalars['String'];
  summarizedDataType?: InputMaybe<Scalars['String']>;
};

/** Invoice type definition */
export type Invoice = {
  __typename?: 'Invoice';
  companyCode: Scalars['String'];
  createdAt: Scalars['String'];
  currency: Scalars['String'];
  documentDate: Scalars['String'];
  documentLine: Scalars['String'];
  documentNo: Scalars['String'];
  documentType: Scalars['String'];
  invoiceNo: Scalars['String'];
  mainTransactionNo: Scalars['String'];
  subTransactionNo: Scalars['String'];
  totalAmount: Scalars['String'];
  vendorCode: Scalars['String'];
  vendorCodeSecond: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  confirmPayment: Receivable;
  createAggregatorApiRequest: ParentAggregatorApiResponse;
  createCalculationTemplate: CalculationTemplate;
  createReprocessRequest: ReprocessRequestStatus;
  createTaxValue: TaxValue;
  deleteTaxValue?: Maybe<Scalars['ID']>;
  toggleOrderBillableFlag: ToggleOrderBillableResponse;
  updateCountryCalculationConfig: UpdateCalculationConfigResponse;
  updateTaxValue: TaxValue;
  updateVendorCalculationConfig: UpdateCalculationConfigResponse;
};

export type MutationConfirmPaymentArgs = {
  input: ConfirmPaymentInput;
};

export type MutationCreateAggregatorApiRequestArgs = {
  input: AggregatorApiRequest;
};

export type MutationCreateCalculationTemplateArgs = {
  input: CreateCalculationTemplateInput;
};

export type MutationCreateReprocessRequestArgs = {
  input: ReprocessRequest;
};

export type MutationCreateTaxValueArgs = {
  input?: InputMaybe<CreateTaxValueInput>;
};

export type MutationDeleteTaxValueArgs = {
  id: Scalars['ID'];
};

export type MutationToggleOrderBillableFlagArgs = {
  input?: InputMaybe<ToggleOrderBillableInput>;
};

export type MutationUpdateCountryCalculationConfigArgs = {
  input?: InputMaybe<UpdateCountryCalculationConfigInput>;
};

export type MutationUpdateTaxValueArgs = {
  input?: InputMaybe<UpdateTaxValueInput>;
};

export type MutationUpdateVendorCalculationConfigArgs = {
  input?: InputMaybe<UpdateVendorCalculationConfigInput>;
};

/** Order type definition */
export type Order = {
  __typename?: 'Order';
  calcConfig?: Maybe<Scalars['String']>;
  code: Scalars['String'];
  info?: Maybe<OrderInfo>;
  receipts?: Maybe<Array<Maybe<Receipt>>>;
};

/** OrderInfo type definition */
export type OrderInfo = {
  __typename?: 'OrderInfo';
  isBillable?: Maybe<Scalars['Boolean']>;
  isWastage?: Maybe<Scalars['Boolean']>;
};

/** OrderItem type definition */
export type OrderItem = {
  __typename?: 'OrderItem';
  EntityId?: Maybe<Scalars['String']>;
  IsBillable?: Maybe<Scalars['Boolean']>;
  IsReceiptable?: Maybe<Scalars['Boolean']>;
  IsWastage?: Maybe<Scalars['Boolean']>;
  LatestEventType?: Maybe<Scalars['String']>;
  OrderCode: Scalars['String'];
  OrderPlacedAt?: Maybe<Scalars['String']>;
  OrderSource?: Maybe<Scalars['String']>;
  OrderUpdatedAt?: Maybe<Scalars['String']>;
  StatusCode?: Maybe<Scalars['Int']>;
  VendorCode: Scalars['String'];
  Vertical?: Maybe<Scalars['String']>;
};

/**  PaginatedReceivableList type definition  */
export type PaginatedReceivableList = {
  __typename?: 'PaginatedReceivableList';
  nodes?: Maybe<Array<Receivable>>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type ParentAggregatorApiResponse = {
  __typename?: 'ParentAggregatorApiResponse';
  id: Scalars['String'];
  response: AggregatorApiResponse;
};

/** Period type definition */
export type Period = {
  __typename?: 'Period';
  half: Scalars['String'];
  month: Scalars['String'];
  year: Scalars['String'];
};

/** Period input definition */
export type PeriodInput = {
  half?: InputMaybe<Scalars['String']>;
  month?: InputMaybe<Scalars['String']>;
  year?: InputMaybe<Scalars['String']>;
};

/** PeriodStrict input definition */
export type PeriodStrictInput = {
  half: Scalars['String'];
  month: Scalars['String'];
  year: Scalars['String'];
};

export enum Permissions {
  Admin = 'ADMIN',
  Any = 'ANY',
  CalcConfigManage = 'CALC_CONFIG_MANAGE',
  CalcConfigView = 'CALC_CONFIG_VIEW',
  CalcTemplateManage = 'CALC_TEMPLATE_MANAGE',
  OrderManage = 'ORDER_MANAGE',
  OrderResend = 'ORDER_RESEND',
  OrderView = 'ORDER_VIEW',
  ReceivablesManage = 'RECEIVABLES_MANAGE',
  TaxManage = 'TAX_MANAGE',
  TaxView = 'TAX_VIEW'
}

export type Query = {
  __typename?: 'Query';
  billingViewOrderList: Array<Maybe<OrderItem>>;
  calculationConfig: CalculationConfigResponse;
  calculationTemplates: Array<CalculationTemplate>;
  invoices: Array<Maybe<Invoice>>;
  order: Order;
  receivables: PaginatedReceivableList;
  recentRequests: Array<Request>;
  requests: Array<Request>;
  summarizedData: SummarizedData;
  taxValues: Array<TaxValue>;
  templateContent: TemplateContent;
  totalOpenBalance: Scalars['Float'];
  vendor: Vendor;
  vendors: Array<Maybe<Vendor>>;
};

export type QueryBillingViewOrderListArgs = {
  filter: FilterQueryInput;
};

export type QueryCalculationConfigArgs = {
  vendorCode?: InputMaybe<Scalars['String']>;
};

export type QueryOrderArgs = {
  orderCode: Scalars['String'];
};

export type QueryReceivablesArgs = {
  filter?: InputMaybe<ReceivableFilterInput>;
  paging?: InputMaybe<DataPage>;
  sorting?: InputMaybe<DataSort>;
};

export type QueryRecentRequestsArgs = {
  entity: Scalars['String'];
};

export type QuerySummarizedDataArgs = {
  filter: SummarizedDataInput;
};

export type QueryTemplateContentArgs = {
  templateId: Scalars['String'];
};

export type QueryTotalOpenBalanceArgs = {
  filter?: InputMaybe<TotalOpenBalanceFilterInput>;
};

export type QueryVendorArgs = {
  vendorCode: Scalars['String'];
};

export type QueryVendorsArgs = {
  filter?: InputMaybe<VendorsFilterInput>;
};

/** Receipt type definition */
export type Receipt = {
  __typename?: 'Receipt';
  name: Scalars['String'];
  path?: Maybe<Scalars['String']>;
  type?: Maybe<ReceiptType>;
};

/** Receivable status enum */
export enum ReceiptType {
  Adjustment = 'ADJUSTMENT',
  Cancellation = 'CANCELLATION',
  New = 'NEW'
}

/** Receivable type definition */
export type Receivable = {
  __typename?: 'Receivable';
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  period?: Maybe<Period>;
  receivableIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  status?: Maybe<ReceivableStatus>;
  totalAmount?: Maybe<Scalars['Float']>;
  updatedAt?: Maybe<Scalars['String']>;
  vatRate?: Maybe<Scalars['Float']>;
  vendor?: Maybe<Vendor>;
};

/** Receivable input definition */
export type ReceivableFilterInput = {
  period?: InputMaybe<PeriodInput>;
  status?: InputMaybe<ReceivableStatus>;
  vendorChainId?: InputMaybe<Scalars['String']>;
  vendorLegalName?: InputMaybe<Scalars['String']>;
  vendorsCode?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

/** Receivable status enum */
export enum ReceivableStatus {
  Invoiced = 'INVOICED',
  Open = 'OPEN'
}

export type ReprocessRequest = {
  email: Scalars['String'];
  entity: Scalars['String'];
  orderCount: Scalars['Int'];
  orders: Scalars['String'];
};

export type ReprocessRequestStatus = {
  __typename?: 'ReprocessRequestStatus';
  error: Scalars['Boolean'];
  id: Scalars['ID'];
  message: Scalars['String'];
};

export type Request = {
  __typename?: 'Request';
  creationTimestamp: Scalars['String'];
  email: Scalars['String'];
  entity: Scalars['String'];
  id: Scalars['ID'];
  orderCount: Scalars['Int'];
  orders: Scalars['String'];
  status: Scalars['String'];
};

/** SortDirection enum */
export enum SortDirection {
  Ascending = 'ASCENDING',
  Descending = 'DESCENDING'
}

/** Receivable status enum */
export enum SortableReceivableField {
  TotalAmount = 'TotalAmount',
  CreatedAt = 'createdAt'
}

/** SummarizedData type definition */
export type SummarizedData = {
  __typename?: 'SummarizedData';
  ordersFailedPercentage?: Maybe<Scalars['Float']>;
  ordersSentCount?: Maybe<Scalars['Int']>;
  ordersTotalCount?: Maybe<Scalars['Int']>;
};

/** SummarizedData input definition */
export type SummarizedDataInput = {
  endDate: Scalars['String'];
  startDate: Scalars['String'];
};

export type TaxValue = {
  __typename?: 'TaxValue';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  status?: Maybe<TaxValueStatus>;
  value?: Maybe<Scalars['Float']>;
};

export enum TaxValueStatus {
  Active = 'ACTIVE',
  Deleted = 'DELETED',
  New = 'NEW'
}

export type TemplateContent = {
  __typename?: 'TemplateContent';
  content: Scalars['String'];
  templateId: Scalars['ID'];
};

/** ChangeOrderBillableInput type definition */
export type ToggleOrderBillableInput = {
  billableFlag: Scalars['Boolean'];
  orderCode: Scalars['String'];
};

/** ToggleOrderBillableResponse type definition */
export type ToggleOrderBillableResponse = {
  __typename?: 'ToggleOrderBillableResponse';
  billableFlag: Scalars['Boolean'];
  orderCode: Scalars['String'];
};

/** Receivable input definition */
export type TotalOpenBalanceFilterInput = {
  period?: InputMaybe<PeriodInput>;
  vendorChainId?: InputMaybe<Scalars['String']>;
  vendorLegalName?: InputMaybe<Scalars['String']>;
  vendorsCode?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UpdateCalculationConfigResponse = {
  __typename?: 'UpdateCalculationConfigResponse';
  containerFixedValue?: Maybe<Scalars['Float']>;
  defaultTemplateId?: Maybe<Scalars['ID']>;
  defaultVatId?: Maybe<Scalars['ID']>;
  serviceFeeRate?: Maybe<Scalars['Float']>;
  vendorCode?: Maybe<Scalars['String']>;
};

export type UpdateCountryCalculationConfigInput = {
  containerFixedValue?: InputMaybe<Scalars['Float']>;
  templateContent: Scalars['String'];
  templateId: Scalars['ID'];
  vatId: Scalars['ID'];
};

export type UpdateTaxValueInput = {
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['Float']>;
};

export type UpdateVendorCalculationConfigInput = {
  containerFixedValue?: InputMaybe<Scalars['Float']>;
  serviceFeeRate?: InputMaybe<Scalars['Float']>;
  templateContent: Scalars['String'];
  templateId: Scalars['ID'];
  vatId: Scalars['ID'];
  vendorCode: Scalars['String'];
};

/** Vendor type definition */
export type Vendor = {
  __typename?: 'Vendor';
  chainId?: Maybe<Scalars['String']>;
  code: Scalars['String'];
  legalName?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

/** Vendors input definition */
export type VendorsFilterInput = {
  legalName?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  vendorsCode?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};
