import "../../styles/ux.css";

const ProductDetailSkeleton = () => {
  return (
    <div className="detailSkeletonGrid" aria-hidden="true">
      <div className="skeletonBlock detailSkeletonImage" />
      <div className="detailSkeletonInfo">
        <div className="skeletonBlock skeletonLine skeletonLineShort" />
        <div className="skeletonBlock skeletonLine skeletonLineLong" />
        <div className="skeletonBlock skeletonLine skeletonLineLong" />
        <div className="skeletonBlock skeletonLine skeletonLineMedium" />
        <div className="skeletonBlock skeletonLine skeletonLineShort" />
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
