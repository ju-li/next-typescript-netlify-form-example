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

  const registerUser = (event: React.FormEvent<HTMLFormElement>) => {

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
        { (!submitted) && <form name="contact" method="POST" data-netlify="true" onSubmit={registerUser}>
        <input type="hidden" name="form-name" value="contact" />
        <div className="flex gap-4 mb-2">
          <div className="relative">
          <input type="text" id="firstname" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-jama-accent2 focus:border-transparent" name="firstname" placeholder="First Name"
          onChange={handleChange} />
          </div>
          <div className="relative">
          <input type="text" id="lastname" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-jama-accent2 focus:border-transparent" name="lastname" placeholder="Last Name"
          onChange={handleChange} />
          </div>
        </div>
        <div className="flex flex-col mb-2">
          <div className=" relative ">
              <input type="text" name="email" id="email" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-jama-accent2 focus:border-transparent" placeholder="Email"
              onChange={handleChange} />
            </div>
        </div>
        <div className="flex w-full my-4">
          <button type="submit" className="py-2 px-4  bg-jama-accent1 hover:bg-jama-accent2 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
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