export const truncateText = (text: string, maxLength: number): string =>
  text
    ? text.length <= maxLength
      ? text
      : `${text.substr(0, maxLength)}...`
    : '';

export const capitalize = (text = '') => {
  return text
    ? text
        .split(' ')
        .map(
          item =>
            `${item.charAt(0).toUpperCase()}${item.slice(1).toLowerCase()}`,
        )
        .join(' ')
    : '';
};

export const objectKeys = <Obj extends object>(obj: Obj): (keyof Obj)[] => {
  return Object.keys(obj) as (keyof Obj)[];
};

export const objectValues = <Obj extends object>(
  obj: Obj,
): Obj[keyof Obj][] => {
  return Object.values(obj);
};

export const isCloseToBottom = ({
  layoutMeasurement,
  contentOffset,
  contentSize,
}) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};
