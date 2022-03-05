import { useEffect } from "react";

/*
 * 	this hook get an array of refs that applied to nodes
 * 	and invoked callback when click outside these nodes
 * */
export const useWhenClickOutside = (refs, callback) => {
	useEffect(() => {
		const handleEvent = (e) => {
			for (const ref of refs) {
				// Do nothing if clicking ref's element or descendent elements
				if (!ref.current || ref.current.contains(e.target)) {
					return;
				}
			}

			callback();
		};

		document.addEventListener("mouseup", handleEvent);
		document.addEventListener("touchend", handleEvent);

		return () => {
			document.removeEventListener("mouseup", handleEvent);
			document.removeEventListener("touchend", handleEvent);
		};
	}, [callback, refs]);
};
