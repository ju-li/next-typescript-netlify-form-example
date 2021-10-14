import {useState} from 'react';

interface FormPost {
  firstname?: string
  lastname?: string
  email?: string
}

const Form = () => {
  const encode = (data: any) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
  };

  const [state, setState] = useState<FormPost>();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...state })
    })
      .then(() => console.log("Success!"))
      .catch(error => console.log(error));

    event.preventDefault();
    setSubmitted(true);
  }

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  return (
     <div>
        { (!submitted) && <form name="contact" method="POST" data-netlify="true" onSubmit={onSubmit}>
        <input type="hidden" name="form-name" value="contact" />
        <div>
          <div>
          <input type="text" id="firstname" name="firstname" placeholder="First Name"
          onChange={handleChange} />
          </div>
          <div>
          <input type="text" id="lastname" name="lastname" placeholder="Last Name"
          onChange={handleChange} />
          </div>
        </div>
        <div>
            <input type="text" name="email" id="email" placeholder="Email"
            onChange={handleChange} />
        </div>
        <div>
          <button type="submit">
              Get Access
          </button>
        </div>
      </form>}
      { submitted && 
        <h5>Thanks for submitting! We&apos;ll reach out ASAP!</h5>
      }
    </div>
  )

}

export { Form };