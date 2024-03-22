import { HelmetProvider } from "react-helmet-async";
import { useState } from "react";

function Home() {
	const [values, setValues] = useState({
		id: "",
		password: "",
	});

	// const LoginForm1 = () => {};

	const handleChange = (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value,
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		alert(JSON.stringify(values, null, 2));
	};

	return (
		<>
			<HelmetProvider>
				<title>Growing Mokoko</title>
			</HelmetProvider>
			<div className="mainPage">
				<h1>자라나는 무코코</h1>
			</div>
			<form onSubmit={handleSubmit}>
				<div className="row">
					<input
						type="text"
						name="id"
						placeholder="아이디"
						value={values.id}
						onChange={handleChange}
					/>
				</div>
				<input
					type="text"
					name="password"
					placeholder="비밀번호"
					value={values.password}
					onChange={handleChange}
				/>
				<button>로그인</button>
			</form>
			{/* <Link to="/signup" className={S.signUp} >
				</Link> */}
				<button type="button" onClick="location.href='./signup'">회원가입 </button>
			<span>
				<button>아이디 찾기</button>
				<button>비밀번호 찾기</button>
				
			</span>
		</>
	);
}

export default Home;
