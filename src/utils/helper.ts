export const verifiedCodePattern = (input: string) => {
  const orderCodePattern = new RegExp('[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}', 'g');
  return input.match(orderCodePattern);
};
