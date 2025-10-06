import ServiceTabSelector from "@/components/page/home/ServiceTabSelector";
import UserInputsContainer from "@/components/page/home/UserInputsContainer";

export default function Home() {
  return (
    <div className="border-primary mx-auto mt-10 flex w-3/5 flex-col rounded-lg border-1">
      <div className="mx-auto mt-5">
        <ServiceTabSelector></ServiceTabSelector>
      </div>
      <hr className="border-primary w-full border-t-1" />
      <UserInputsContainer />
    </div>
  );
}
