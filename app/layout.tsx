import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MIRA — Mars Intelligent Rover Autonomy",
  description:
    "Real-time autonomous vision & navigation pipeline for a Mars rover. Raspberry Pi + Hailo-8L NPU, custom Mars YOLO, DepthAnything V2, 5× TOF sensors, IMU, and Arduino motor control.",
  openGraph: {
    title: "MIRA — Mars Intelligent Rover Autonomy",
    description:
      "Real-time autonomous vision & navigation pipeline for a Mars rover.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=DM+Mono:wght@300;400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
