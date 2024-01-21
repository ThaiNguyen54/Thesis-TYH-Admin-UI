const Input = (props) => {
    return(
        <>
            <label for={props.inputId}>{props.label}:</label>
            <input id={props.inputId} name={props.inputName} type="text" />
        </>
    )
};

const RegistrationForm = () => {
    return(
        <form>
            <Input inputId="name" inputName="name" label="First Name"/>
            <Input inputId="address" inputName="address" label="Address"/>
        </form>
    )
}

const Input = (props) => {
    const handleClick = () => {
        alert('Input changed')
    }

    return(
        <>
            <label for={props.inputId}>{props.label}:</label>
            <input id={props.inputId} name={props.inputName} type="text" onClick={handleClick} />
        </>
    )
}

