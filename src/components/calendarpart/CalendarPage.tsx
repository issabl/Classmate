import Sidebar from "../Home/sidebar";
import WhiteContainer from "../../components/Layout/whitecontainer";
import TopSection from "../../components/Layout/TopPart";

import CalendarSection from "./CalendarSection";
import LeftTaskSection from "./LeftTaskSection";;

export default function CalendarPage() {
  return (
    <div className="flex h-screen w-full home container">
      <Sidebar />

      <WhiteContainer>
        <TopSection />

        <div className="flex gap-6 mt-4">
          <div className="flex flex-col gap-6 w-1/4">
            <LeftTaskSection />
          </div>

          <CalendarSection />
        </div>
      </WhiteContainer>
    </div>
  );
}
