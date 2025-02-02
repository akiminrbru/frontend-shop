"use client";

import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";
import { useSearchParams } from "next/navigation";

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<>
			{children}
			<Toaster />
			<NextTopLoader />
		</>
	);
};
