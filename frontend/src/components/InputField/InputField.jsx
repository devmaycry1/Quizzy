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
  error,
  ...rest
}) {
  return (
    
    <div className="input-container">
      
      <div className={`input-field ${error ? "input-field-error" : ""}`}>
        {Icon && <Icon className="input-icon" />}

        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...rest} 
        />
      </div>

      {error && <span className="input-mensagem-erro">{error}</span>}
      
    </div>
  );
}
