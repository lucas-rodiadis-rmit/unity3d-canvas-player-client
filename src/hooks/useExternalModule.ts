/*
import { useEffect, useRef } from "react";

interface Props {
	moduleName: string;
	url: string;
	onLoad?: () => void | Promise<void>;
}

function useExternalModule({
	moduleName,
	url,
	onLoad
}: Props) {
	const script = useRef<HTMLScriptElement | null>(null);
	useEffect(() => {
		const script = document.createElement("script");
		script.type = "module";
		script.textContent = `
      import * as ${moduleName} from '${url}';
      window['${moduleName}'] = ${moduleName};
    `;
		scriptRef.current = script;

		return () => {
			// Cleanup on unmount
			script.removeEventListener("load", handleLoad);
			script.removeEventListener(
				"error",
				handleError
			);
			if (scriptRef.current) {
				document.body.removeChild(
					scriptRef.current
				);
				scriptRef.current = null;
			}
		};
	}, []);

	var script = document.createElement("script");
	script.src = url;
	if (onLoad) {
		script.onload = onLoad;
	}

	document.body.appendChild(script);

	return script;
}

export default useExternalModule;
*/
