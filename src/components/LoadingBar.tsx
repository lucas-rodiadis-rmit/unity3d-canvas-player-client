import "./LoadingBar.css"

interface LoadingBarProps {
  progress: number;
}

/**
 * 
 * @param param0 - The props for the LoadingBar component.
 * @param param0.progress - The loading progress as a number between 0 and 1.
 * @returns 
 */
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
