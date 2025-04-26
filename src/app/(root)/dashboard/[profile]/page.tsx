// type Props = {
//   params: { id: string };
// };

import Sidebar from "@/app/components/Sidebar";
import PasswordForm from "@/app/features/profilePage/components/PasswordForm";

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
