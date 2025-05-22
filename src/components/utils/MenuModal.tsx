import React from "react";
import "./MenuModal.css";

interface MenuModalProps {
	isOpen: boolean;
	onClose: () => void;
	onResize: (height: number) => void;
}

const MenuModal: React.FC<MenuModalProps> = ({ isOpen, onClose, onResize }) => {
	if (!isOpen) return null;

	return (
		<div className="modal-overlay">
			<div className="modal-content">
				<h2 className="modal-title">Canvas Unity Player Options</h2>

				{/* Resizing options */}
				<section className="modal-section">
					<h3 className="section-title">Resizing</h3>
					<div className="modal-buttons">
						<button onClick={() => { onResize(200); onClose(); }}>
							Height: 200px
						</button>
						<button onClick={() => { onResize(400); onClose(); }}>
							Height: 400px
						</button>
						<button onClick={() => { onResize(600); onClose(); }}>
							Height: 600px
						</button>
						<button onClick={() => { onResize(800); onClose(); }}>
							Height: 800px
						</button>
					</div>
				</section>

				{/* Other options */}
				<section className="modal-section">
					<h3 className="section-title">Other Options</h3>
					<div className="modal-buttons">
						<button onClick={() => { onClose(); }}>
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
