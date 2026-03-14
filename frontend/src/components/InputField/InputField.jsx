import "./InputField.css";

//export default function InputField({ type, placeholder, icon }) {
// return (
// <div className="input-field">
// <span className="icon">{icon}</span>
//<input type={type} placeholder={placeholder} />
//</div>
//);
//}

export default function InputField({
  type = "text",
  placeholder,
  icon: Icon,
  value,
  onChange,
}) {
  return (
    <div className="input-field">
      {Icon && <Icon className="input-icon" />}

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
