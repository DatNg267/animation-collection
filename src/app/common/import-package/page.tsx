"use client";
import { useEffect, useState } from "react";
import Script from "next/script";

const Page = () => {
  const [hlsIsReady, setHlsIsReady] = useState<boolean>(false);

  // Lấy HLS.js từ window sau khi script được tải
  useEffect(() => {
    console.log("RENDER");
    if (window.Hls) {
      console.log("HLS.js đã được khởi tạo:", window.Hls);
    }
  }, []);

  return (
    <>
      {/* Import HLS.js từ CDN */}
      <Script
        src="https://cdn.jsdelivr.net/npm/hls.js@1.5.18"
        strategy="beforeInteractive" // Đảm bảo tải trước các thành phần khác
        onLoad={() => {
          setHlsIsReady(true);
          console.log("HLS.js đã được tải thành công");
        }}
        onError={(e) => console.error("Lỗi khi tải HLS.js:", e)}
      />

      {/* Hiển thị nội dung sau khi HLS.js đã sẵn sàng */}
      {hlsIsReady ? (
        <div>
          <h1>HLS.js đã được tải</h1>
          <p>Bạn có thể bắt đầu sử dụng HLS.js trong ứng dụng của mình.</p>
        </div>
      ) : (
        <div>
          <p>Đang tải HLS.js...</p>
        </div>
      )}
    </>
  );
};

export default Page;
