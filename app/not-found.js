"use client";
import { useRouter } from "next/navigation";
const NotFound = () => {
  const router = useRouter();
  return (
    <div className="error">
      Oops! The page you are looking for does not exist.
      <button
        onClick={() => {
          router.push("/");
        }}
      >
        Go to Home Page
      </button>
    </div>
  );
};

export default NotFound;
