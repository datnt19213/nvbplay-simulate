type CombinerProps = {
  address: string;
  district: string;
  city: string;
};
export const Combiner = ({address, district, city}: CombinerProps) => {
  return `${address ? address : ""}${district ? ", " + district : ""}${city ? ", " + city : ""}`;
};
