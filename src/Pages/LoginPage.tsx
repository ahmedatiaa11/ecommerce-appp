import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLogin } from "../ProductsHooks/UseLogin";
import { useAppDispatch } from "../Redux/ReduxHooks";
import { setRefreshToken, setToken } from "../Redux/AuthSlice";
import { showSuccess } from "../Utlies/ToastMsg";
import type { LoginData } from "../Types/Product";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();
  const { mutate, isPending, isError, error } = useLogin();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/products";
  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100";

  const onSubmit = (data: LoginData) => {
    mutate(data, {
      onSuccess: (response) => {
        showSuccess("Login successful");
        dispatch(setToken(response.accessToken));
        dispatch(setRefreshToken(response.refreshToken));
        navigate(from, { replace: true });
      },
    });
  };

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center px-4 py-12 sm:px-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-9"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">Welcome back</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Log in to your account</h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          Sign in to access your cart and saved favorites.
        </p>

        <label className="mt-7 block text-sm font-medium text-slate-700">
          Username
          <input
            autoComplete="username"
            placeholder="Your username"
            className={inputClass}
            {...register("username", { required: "Username is required." })}
          />
          {errors.username && <span className="mt-1 block text-xs text-rose-700">{errors.username.message}</span>}
        </label>
        <label className="mt-5 block text-sm font-medium text-slate-700">
          Password
          <input
            type="password"
            autoComplete="current-password"
            placeholder="Your password"
            className={inputClass}
            {...register("password", {
              required: "Password is required.",
              minLength: { value: 6, message: "Password must be at least 6 characters." },
            })}
          />
          {errors.password && <span className="mt-1 block text-xs text-rose-700">{errors.password.message}</span>}
        </label>

        {isError && (
          <p role="alert" className="mt-4 rounded-xl bg-rose-50 p-3 text-sm text-rose-800">
            {error.message || "We couldn’t log you in. Check your details and try again."}
          </p>
        )}
        <button
          type="submit"
          disabled={isPending}
          className="mt-7 w-full rounded-full bg-slate-900 px-6 py-3.5 font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Signing in…" : "Log in"}
        </button>
        <p className="mt-5 text-center text-sm text-slate-500">
          Just browsing?{" "}
          <Link to="/products" className="font-semibold text-emerald-800 hover:underline">Continue shopping</Link>
        </p>
      </form>
    </main>
  );
}
