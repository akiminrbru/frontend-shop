import React from "react";
import { cn } from "../lib/utils";

interface Props {
	className?: string;
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({ children, className }) => {
	return <div className={cn("m-auto max-w-[1464px] px-6", className)}>{children}</div>;
};
