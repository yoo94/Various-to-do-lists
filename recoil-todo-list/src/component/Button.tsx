import { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  color?: string;
  children: ReactNode;
  onClickEvent: MouseEventHandler<HTMLButtonElement>
}

const Button = (props: ButtonProps) => {
  return (
    <>
      <button style={{ background: "aqua", margin: "0.5rem", color: props.color || "black" }} onClick={props.onClickEvent}>{props.children}</button>
    </>
  );
}
export default Button;