import { useEffect, useState } from "react";

type SizeState = {
	width: number;
	height: number;
};

const DEFAULT_SIZES: SizeState = {
	width: 900,
	height: 600
} as const;

function useCurrentSize(): SizeState {
	const [size, setSize] = useState<SizeState>({
		...DEFAULT_SIZES
	});

	function onResize() {
		setSize({
			width: window.innerWidth,
			height: window.innerHeight
		});
	}

	useEffect(() => {
		onResize();
		window.addEventListener("resize", onResize);
		return () =>
			window.removeEventListener("resize", onResize);
	}, []);

	return size;
}

export default useCurrentSize;
