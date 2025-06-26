import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadImage({ src, cn }: { src: string; cn: string }) {
  const [loading, setLoading] = useState(true);

  console.log(src)
  // https://assets.zustack.com/private/enam/f1092047-1279-42df-8109-6a930e7c8bba/dc9fdd92-35e0-4689-9b2f-5ec947b2e97f.webp?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJidWNrZXRfaWQiOiIiLCJleHAiOjE3NTA5Njk3MzQsImlhdCI6MTc1MDk2NjEzNCwibmJmIjoxNzUwOTY2MTM0LCJzY29wZSI6IlJlYWQiLCJ1c2VyX2lkIjoiIn0.WUtDoOLtcEgR_d9uj5rF6z-nUHYG7UJM3BZZ1XihoBo
  return (
    <>
      <Skeleton
        style={{ display: !loading ? "none" : "block" }}
        className={cn}
      />
      <div style={{ position: "relative", paddingTop: "56.25%" }}>
        <iframe
          src={src}

          style={{
            display: loading ? "none" : "block",
            border: "none",
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
          }}
          allow=""
          allowFullScreen
          onLoad={() => setLoading(false)}
        />
      </div>
    </>
  );
}
