import { EnvelopeOpenIcon } from "@radix-ui/react-icons";
import { Button } from "./components/ui/button";

function App() {
  return (
    <>
      <div className="m-10">
        <Button>
          <EnvelopeOpenIcon className="mr-2 h-4 w-4" /> Login with Email
        </Button>
      </div>
    </>
  );
}

export default App;
