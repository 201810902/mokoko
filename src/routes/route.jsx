import { lazy } from "react";
import {
	createHashRouter,
	createRoutesFromElements,
	Route,
} from "react-router-dom";
// const RootLayout = lazy(() => import("./../components/RootLayout"));
const Home = lazy(() => import("../pages/Home"));
const SignUp = lazy(() => import("../pages/SignUp"));

const router = createHashRouter(
	createRoutesFromElements(
		<Route path="/" element={<Home />}>
			<Route index element={<Home />} />

			<Route path="/signup" element={<SignUp />} />
		

		</Route>
	)
);
export default router;
