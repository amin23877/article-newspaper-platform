import Button from "components/common/button";
import Link from "next/link";

export default function Custom500() {
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        paddingTop: "3rem",
        gap: "1rem",
      }}
    >
      <h1>خطایی سمت سرور رخ داد</h1>

      <Link passHref={true} href="/">
        <Button>بازگشت به صفحه اصلی</Button>
      </Link>
    </div>
  );
}
