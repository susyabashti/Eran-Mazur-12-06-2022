interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  text: string;
}

export const Button = ({ text, ...props }: ButtonProps) => (
  <button type="button" {...props}>
    {text}
  </button>
);
