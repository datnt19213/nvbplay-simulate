export function sortByDefaultShipping(items: any[]) {
  return items.sort((a, b) => {
    if (a.is_default_shipping && !b.is_default_shipping) return -1;
    if (!a.is_default_shipping && b.is_default_shipping) return 1;
    return 0;
  });
}
