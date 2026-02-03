import type { ReactNode } from "react";
import "./ThreeColumnLayout.scss";

type Props = {
  left: ReactNode;
  center: ReactNode;
  right: ReactNode;
};

export function ThreeColumnLayout({ left, center, right }: Props) {
  return (
    <div className="three-column-layout">
      <aside className="left-column">{left}</aside>
      <main className="center-column">{center}</main>
      <aside className="right-column">{right}</aside>
    </div>
  );
}
