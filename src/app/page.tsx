import ServiceTabSelector from "@/components/page/home/ServiceTabSelector";
import UserInputsContainer from "@/components/page/home/UserInputsContainer";

export default function Home() {
  return (
    <div className="flex flex-col w-3/5 mx-auto border-1 border-primary rounded-lg mt-10">
      <div className="mx-auto mt-5">
        <ServiceTabSelector></ServiceTabSelector>
      </div>
      <hr className="w-full  border-t-1 border-primary" />

      <UserInputsContainer />
    </div>
  );
}
