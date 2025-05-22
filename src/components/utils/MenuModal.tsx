import React, { useState } from "react";
import "./MenuModal.css";

interface MenuModalProps {
	isOpen: boolean;
	onClose: () => void;
	onResize: (height: number) => void;
}

const MenuModal: React.FC<MenuModalProps> = ({ isOpen, onClose, onResize }) => {
	const [customHeight, setCustomHeight] = useState<string>("600");

	if (!isOpen) return null;

	const parsedHeight = parseInt(customHeight);
	const minHeight = 200;
	const isValid = !isNaN(parsedHeight) && parsedHeight > minHeight;

	const handleCustomResize = () => {
		if (isValid) {
			onResize(parsedHeight);
			onClose();
		}
	};

	return (
		<div className="modal-overlay">
			<div className="modal-content">
				<h2 className="modal-title">Canvas Unity Player Options</h2>

				{/* Resizing options */}
				<section className="modal-section">
					<h3 className="section-title">Resizing</h3>
					<div className="modal-buttons">

						<input	
							type="number"
							min={minHeight}
							required
							placeholder={`Enter custom height over ${minHeight}px`}
							value={customHeight}
							onChange={(e) => setCustomHeight(e.target.value)}
							className="custom-input"
						/>

						<button
							onClick={handleCustomResize}
							disabled={!isValid}
						>
							Set Custom Height
						</button>
					</div>
				</section>

				{/* Other options */}
				<section className="modal-section">
					<h3 className="section-title">Other Options</h3>
					<div className="modal-buttons">
						<button onClick={onClose}>
							Other Option
						</button>
					</div>
				</section>

				{/* Footer */}
				<div className="modal-footer">
					<button className="close-btn" onClick={onClose}>
						Close
					</button>
				</div>
			</div>
		</div>
	);
};

export default MenuModal;
