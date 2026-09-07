/**
 * Full-page loading skeleton reused by every route-group loading.js.
 *
 * Uses the existing .preload-container / .spinner classes from main.css
 * so the loader matches the site's established spinner style.
 */
export default function PageLoader() {
  return (
    <div className="preload preload-container">
      <div className="preload-logo">
        <div className="spinner"></div>
      </div>
    </div>
  );
}
