import { FilterConditionValueElementOrGroupType } from "@deliveryhero/armor-filter";

export const verifiedCodePattern = (input: string) => {
  const orderCodePattern = new RegExp('[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}', 'g');
  return input.match(orderCodePattern);
};


export const getConditionValue = (conditions: FilterConditionValueElementOrGroupType[] | undefined, filterId: string): string => {
  let conditionMap: any = {};

  if (!conditions) return '';

  conditions.map((ctd: FilterConditionValueElementOrGroupType) => {
      if (ctd.id?.indexOf('Date') !== -1) {
          ctd.value = formatExpectedDate(ctd.value as string)
      }

      conditionMap[ctd?.id ?? ''] = ctd.value;
  });

  return conditionMap[filterId];
}

export const formatExpectedDate = (date: string) => {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}
