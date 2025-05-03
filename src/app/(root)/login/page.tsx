import BrandName from "@/app/components/BrandName";
import LoginForm from "./LoginForm";

function LoginPage() {
  return (
    <div className=" p-7">
      <BrandName href="/" />
      <div className="md:w-3/4 mx-auto">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
