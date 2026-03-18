/**
 * The function `calculatePrices` calculates the sale price based on a regular price and a discount
 * percentage.
 * @param {number} regularPrice - The `regularPrice` parameter represents the original price of an item
 * before any discount is applied. It is a number value that you input into the `calculatePrices`
 * function to calculate the sale price after applying a discount.
 * @param {number} discountPercentage - The `discountPercentage` parameter represents the percentage of
 * discount to be applied to the `regularPrice` in order to calculate the `salePrice`. It should be a
 * number between 0 and 100, where 0 represents no discount and 100 represents a full discount (i.e.,
 * the item
 * @returns The function `calculatePrices` returns an object with two properties: `regularPrice` which
 * is the original regular price passed to the function, and `salePrice` which is the calculated sale
 * price after applying the discount percentage.
 */
export const calculatePricesFromRegularAndSale = (
  regularPrice: number,
  discountPercentage: number
): {regularPrice: number; salePrice: number} => {
  if (discountPercentage < 0 || discountPercentage > 100) {
    throw new Error("Discount percentage must be between 0 and 100.");
  }

  const salePrice = regularPrice - regularPrice * (discountPercentage / 100);

  return {
    regularPrice,
    salePrice: parseFloat(salePrice.toFixed(0)),
  };
};

export const calculatePricesFromRegularAndPercent = (
  regularPrice: number,
  discountPercentage: number
): {regularPrice: number; salePrice: number} => {
  if (discountPercentage < 0 || discountPercentage > 100) {
    throw new Error("Discount percentage must be between 0 and 100.");
  }

  const salePrice = regularPrice - regularPrice * (discountPercentage / 100);

  return {
    regularPrice,
    salePrice: parseFloat(salePrice.toFixed(0)),
  };
};
