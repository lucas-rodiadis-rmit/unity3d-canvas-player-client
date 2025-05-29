import "./LoadingBar.css";

interface LoadingBarProps {
  progress: number;
}

const LoadingBar: React.FC<LoadingBarProps> = ({ progress }) => {
  return (
    <div className="loading-bar-wrapper">
      <div className="loading-bar-container">
        <div
          className="loading-bar-fill"
          style={{ width: `${Math.min(progress * 100, 100)}%` }}
        />
      </div>
      <div className="loading-bar-text">{Math.round(progress * 100)}%</div>
    </div>
  );
};

export default LoadingBar;
