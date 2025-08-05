import { Button } from "../../components/shadcn/button";
import { Input } from "../../components/shadcn/input";
import CallToActionLinks from "./CallToActionLinks";
import WaitlistForm from "./WaitlistForm";

export default function GetStartedSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Lets get you started
        </h2>
        <div className="w-full max-w-md mx-auto space-y-4">
          {/* <WaitlistForm /> */}
          <CallToActionLinks />
        </div>
      </div>
    </section>
  );
}
