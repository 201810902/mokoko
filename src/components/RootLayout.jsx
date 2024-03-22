import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SimpleHeader from "./SimpleHeader";

export default function RootLayout() {
	const location = useLocation();
	const simpleHeaderOn = ["/signup"];
	useLocation;
	const pathSegments = location.pathname.split("/");
	const currentPath = pathSegments[1];

	return (
		<>
			{!simpleHeaderOn.includes("/" + currentPath) ? (
				<Header />
			) : (
				<SimpleHeader />
			)}
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	);
}
