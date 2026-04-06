export const SkeletonCard = () => {
  return (
    <div className="article-item">
      <div className="skeleton-item skeleton-img"></div>
      <div className="data">
        <div className="skeleton-item skeleton-title"></div>
        <div className="skeleton-item skeleton-text"></div>
        <div className="skeleton-item skeleton-text" style={{width: '60%'}}></div>
        <div className="skeleton-item skeleton-btn"></div>
      </div>
    </div>
  );
};