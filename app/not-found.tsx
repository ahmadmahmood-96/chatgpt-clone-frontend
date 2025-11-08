import { Result, Button } from "antd";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function PageNotFound() {
  return (
    <>
      <Result
        className="my-10 flex justify-center items-center flex-col"
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button href="/" type="primary">
            Go back to Home
          </Button>
        }
      />
    </>
  );
}
