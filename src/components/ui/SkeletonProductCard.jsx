import "../../styles/ux.css";

const SkeletonProductCard = () => {
  return (
    <div className="skeletonCard" aria-hidden="true">
      <div className="skeletonBlock skeletonImage" />
      <div className="skeletonContent">
        <div className="skeletonBlock skeletonLine skeletonLineShort" />
        <div className="skeletonBlock skeletonLine skeletonLineLong" />
        <div className="skeletonBlock skeletonLine skeletonLineMedium" />
      </div>
    </div>
  );
};

export default SkeletonProductCard;
