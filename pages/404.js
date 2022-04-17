import Button from "components/common/button";
import Link from "next/link";

export default function Custom404() {
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        paddingTop: "3rem",
        gap: "1rem",
      }}
    >
      <h1>صفحه مورد نظر پیدا نشد</h1>

      <Link passHref={true} href="/">
        <Button>بازگشت به صفحه اصلی</Button>
      </Link>
    </div>
  );
}
