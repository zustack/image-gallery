import { useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadImage({ src, cn }: { src: string; cn: string }) {
  const [loading, setLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  return (
    <>
      <Skeleton
        style={{ display: !loading ? "none" : "block" }}
        className={cn}
      />
      <div style={{ position: "relative", paddingTop: "56.25%" }}>
        <iframe
ref={iframeRef}
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
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          allowFullScreen
          onLoad={() => setLoading(false)}
        />
      </div>
    </>
  );
}
