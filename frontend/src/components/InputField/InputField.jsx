import "./InputField.css";

export default function InputField({ type, placeholder, icon }) {
  return (
    <div className="input-field">
      <span className="icon">{icon}</span>
      <input type={type} placeholder={placeholder} />
    </div>
  );
}