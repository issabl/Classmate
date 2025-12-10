import { useState, useEffect } from "react";
import Sidebar from "./sidebar"; 
import WhiteContainer from "../Layout/whitecontainer";
import SearchBar from "../Layout/TopPart";
import WelcomeBanner from "../Layout/welcomebanner";
import Calendar from "./calendar";
import HomeFolders from "./homefolders";

import TaskFilter from "../Tasks/taskfilter";
import TaskCards from "../Tasks/taskcard";
import Upcoming from "../Tasks/upcoming";

export default function Home() {
  const [selected, setSelected] = useState("today"); // track tab
  const [showUpcoming, setShowUpcoming] = useState(false); // modal visibility

  // Watch selected tab
  useEffect(() => {
    if (selected === "upcoming") setShowUpcoming(true);
    else setShowUpcoming(false);
  }, [selected]);

  return (
    <div className="flex h-screen w-full linear-gradient(to bottom, #160F0A, #7C5138)">
      <Sidebar />

      <WhiteContainer>
        <SearchBar />

        <main className="overflow-y-auto w-full flex flex-col gap-4 pb-6">
          <WelcomeBanner />

          {/* Pass actual setSelected to TaskFilter */}
          <TaskFilter setSelected={setSelected} />

          <Calendar />

          <div className="flex flex-row gap-4 w-full">
            <TaskCards />
            <HomeFolders />
          </div>
        </main>

        {/* Upcoming Modal */}
        {showUpcoming && <Upcoming onClose={() => setShowUpcoming(false)} />}
      </WhiteContainer>
    </div>
  );
}
