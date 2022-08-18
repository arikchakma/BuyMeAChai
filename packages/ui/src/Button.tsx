import * as React from "react";

export const Button = ({ children }: { children: React.ReactNode }) => {
  return <div className="rounded-md">{children}</div>;
};
