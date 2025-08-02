import { useDrawerMutations } from "./useDrawerMutations";
import { useEffect, useRef, useState } from "react";
import { Button } from "../shadcn/button";
import { useEditDrawerContext } from "./EditDrawerContext";
import gsap from "gsap";
import Spinner from "../Spinner";

export default function DescriptionForm() {
  const { itemSelected, handleIsOpen } = useEditDrawerContext();
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successStatus, setSuccessStatus] = useState<boolean>(false);
  const [errorStatus, setErrorStatus] = useState<boolean>(false);
  const { updateDescription } = useDrawerMutations();
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (itemSelected?.description?.content) {
      setDescription(itemSelected.description.content);
    }
    return () => setDescription("");
  }, [itemSelected?.description]);

  useEffect(() => {
    if (successStatus || errorStatus) {
      gsap.fromTo(
        notificationRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 60, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [successStatus, errorStatus]);

  return (
    <div className="mt-4">
      <h2>Description:</h2>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setIsLoading(true);
          if (itemSelected) {
            try {
              updateDescription({
                id: itemSelected.id,
                description,
              });
              setSuccessStatus(true);
            } catch (error) {
              console.error("Error updating description:", error);
              setErrorStatus(false);
            } finally {
              setIsLoading(false);
              //   handleIsOpen(null);
              setTimeout(() => {
                gsap.to(notificationRef.current, {
                  opacity: 0,
                  y: -20,
                  duration: 0.3,
                  ease: "power2.out",
                  onComplete: () => {
                    setSuccessStatus(false);
                  },
                });
                setErrorStatus(false);
              }, 2000);
            }
          }
        }}
      >
        <textarea
          rows={5}
          placeholder="Add a description..."
          className="border-2 border-black w-full rounded-md p-2 resize-none mt-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        {isLoading && <Spinner />}
        <Button type="submit" className="mt-2">
          Save
        </Button>
      </form>

      {successStatus && (
        <div
          ref={notificationRef}
          className="px-4 py-2 z-[9999] bg-green-600 text-white fixed top-0 left-1/2 -translate-x-1/2 rounded-md "
        >
          Saved
        </div>
      )}
    </div>
  );
}
