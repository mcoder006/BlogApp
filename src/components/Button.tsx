
interface ButtonProps {
    text: string;
};

const Button = ( { text } : ButtonProps) => {
  return (
    <button type="submit"  className={`py-2 px-3 rounded`}>
        { text }
    </button>
  )
}

export default Button