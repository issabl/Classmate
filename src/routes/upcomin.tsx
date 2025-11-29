import { useState } from "react";
import Upcoming from "../components/Tasks/upcoming";

export default function Page() {
  const [showUpcoming, setShowUpcoming] = useState(true);

  return (
    <>
      {showUpcoming && <Upcoming onClose={() => setShowUpcoming(false)} />}
    </>
  );
}
