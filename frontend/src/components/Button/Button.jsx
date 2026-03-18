import "./Button.css";

export default function Button({ text, onClick }) {
  return <button type="button" className="btn" onClick={onClick}>
    {text}
  </button>;
}