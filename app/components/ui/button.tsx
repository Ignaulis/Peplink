import { CustomButtonProps } from "@/app/types/button";
// custom button
export default function CustomButton({
  click,
  text,
  color,
  type,
}: CustomButtonProps) {
  return (
    <button
      className="transform cursor-pointer rounded-lg px-3 py-1.5 text-lg text-black transition duration-200 hover:scale-102 hover:opacity-85 active:scale-98 active:opacity-100"
      type={type ? "submit" : "button"}
      style={{ backgroundColor: color }}
      onClick={!type && click ? click : undefined}
    >
      {text}
    </button>
  );
}
