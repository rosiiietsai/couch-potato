export default function Skeleton({
  times,
  className = '',
  itemsClassName = '',
  itemClassName = '',
}) {
  // create array with specific length (times)
  const skeletonItems = Array(times)
    .fill(0)
    .map((_, i) => (
      <div key={i} className={`skeleton__item ${itemClassName}`} />
    ));

  return (
    <div className={`skeleton ${className}`}>
      <div className={itemsClassName}>{skeletonItems}</div>
    </div>
  );
}
