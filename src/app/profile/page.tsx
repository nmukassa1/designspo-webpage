import Sidebar from "../components/Sidebar";
import PasswordForm from "../features/profilePage/components/PasswordForm";
import PersonalInfoForm from "../features/profilePage/components/PersonalInfoForm";

// type Props = {
//   params: { id: string };
// };

export default function Profile() {
  return (
    <div className="flex flex-col gap-4">
      <div className="lg:hidden">
        <Sidebar />
      </div>
      <PasswordForm />
    </div>
  );
}
