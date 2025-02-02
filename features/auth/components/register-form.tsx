"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Input } from "@/shared/components/ui";
import Link from "next/link";
import { apiInstance } from "@/shared/services";
import useSWRMutation from "swr/mutation";
import toast from "react-hot-toast";

interface IRegister {
	email: string;
	password: string;
}

const register = async (url: string, { arg }: { arg: IRegister }) => {
	return apiInstance
		.post(url, {
			...arg,
		})
		.then((response) => response.data);
};

export const RegisterForm = () => {
	const { data, trigger, isMutating, error } = useSWRMutation("/auth/register", register, {
		onSuccess: (data) => {
			console.log(data.message);
			toast.success(data.message);
		},
		onError: (err) => {
			toast.error(err.response.data.message);
		},
	});

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email("Неверный адрес электронной почты")
				.required("Обязательное поле"),
			password: Yup.string()
				.min(6, "Пароль должен содержать минимум 6 символов")
				.required("Обязательное поле"),
		}),
		onSubmit: async (values) => {
			try {
				await trigger(values);
			} catch (e) {
				console.log(e);
			}
		},
	});

	return (
		<div className="flex justify-center">
			<form onSubmit={formik.handleSubmit} className="space-y-4 w-[360px]">
				<h2 className="text-5xl font-bold text-center mb-5">Регистрация</h2>
				<div>
					<label htmlFor="email" className="block text-sm font-medium text-gray-700">
						Email
					</label>
					<Input
						id="email"
						name="email"
						type="email"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.email}
						className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 ${
							formik.touched.email && formik.errors.email ? "border-red-500" : ""
						}`}
					/>
					{formik.touched.email && formik.errors.email ? (
						<div className="text-red-500 text-sm">{formik.errors.email}</div>
					) : null}
				</div>

				<div>
					<label htmlFor="password" className="block text-sm font-medium text-gray-700">
						Пароль
					</label>
					<Input
						id="password"
						name="password"
						type="password"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.password}
						className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 ${
							formik.touched.password && formik.errors.password
								? "border-red-500"
								: ""
						}`}
					/>
					{formik.touched.password && formik.errors.password ? (
						<div className="text-red-500 text-sm">{formik.errors.password}</div>
					) : null}
				</div>

				<div>
					<Button type="submit" className="w-full">
						Зарегистироваться
					</Button>
				</div>
				<div className="text-center">
					<Link className="text-center" href="/login">
						Вход
					</Link>
				</div>
			</form>
		</div>
	);
};
