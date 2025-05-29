// LoadingBar.tsx
interface LoadingBarProps {
  progress: number;
}

const LoadingBar: React.FC<LoadingBarProps> = ({ progress }) => {
  return (
    <div className="loading-bar-wrapper">
      <div className="loading-bar">
        <div
          className="loading-bar-fill"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
};

export default LoadingBar;
