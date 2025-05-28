import './FormButton.css'

interface FormButtonProps {
  label: string
  type: "submit"| "reset" | "button"
}

const FormButton: React.FC<FormButtonProps> = ({ label, type }) => {    
    return (
        <div className='form_button'>
          <button 
            className='_button'
            type={type}
            >
            {label}
          </button>
        </div>
    )
}

export default FormButton