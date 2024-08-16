interface TitleProps {
  text: string;
}
export default function Title({ text }: TitleProps) {
  return (
    <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-sm text-opacity-90">
      {text}
    </h6>
  );
}
