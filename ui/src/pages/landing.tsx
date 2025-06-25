import { Button } from "@/components/ui/button";
import zustack from "../assets/zustack.webp";

export default function Landing() {
  return (
    <div className="h-[calc(80vh)] flex justify-center items-center">
      <Button>Zustack Template</Button>
      <img src={zustack} className="w-[400px]" alt="Zustack logo" />
    </div>
  );
}
