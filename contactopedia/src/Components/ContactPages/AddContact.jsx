import { useState } from "react";

function AddContact(props) {

    const [messages, SetMessages] = useState({
        errorMessage: "",
        successMessage: "",
    });

    const [formData, SetFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });

    function handleFormInputChange(e) {
        const { name, value } = e.target;
        SetFormData({
            ...formData,
            [name]: value,
        });
    }

    function handleAddContactForm(formData) {
        const ContactData = {
            name: formData.get("name"),
            email: formData.get("email"),
            phone: formData.get("phone"),
        };
        try {
            console.log(ContactData);
            const response = props.handleAddContact(ContactData);
            if (response.status = "success") {
                SetMessages({ errorMessage: undefined, successMessage: response.msg })
            }
            else {
                SetMessages({ errorMessage: response.msg, successMessage: undefined })
            }
        }
        catch (error) {
            SetMessages({ errorMessage: response.msg, successMessage: undefined })
        }
    }

    return (
        <div className="border col-12 text-white p-2">
            <form action={handleAddContactForm}>
                <div className="row p-2">
                    <div className="col-12 text-white-50 text-center h5">
                        {props.isUpdating ? "Update" : "Add a new contact"}
                    </div>
                    <div className="col-12 col-md-4 p-1">
                        <input
                            name="name"
                            placeholder="Name..."
                            value={formData.name}
                            onChange={handleFormInputChange}
                            className="form-control form-control-sm" />
                    </div>
                    <div className="col-12 col-md-4 p-1">
                        <input
                            name="email"
                            placeholder="Email..."
                            value={formData.email}
                            onChange={handleFormInputChange}
                            className="form-control form-control-sm" />
                    </div>
                    <div className="col-12 col-md-4 p-1">
                        <input
                            name="phone"
                            placeholder="Phone..."
                            value={formData.phone}
                            onChange={handleFormInputChange}
                            className="form-control form-control-sm" />
                    </div>
                    {messages.successMessage && <div className="col-12 text-center text-success">{messages.successMessage}</div>}
                    {messages.errorMessage && <div className="col-12 text-center text-danger">{messages.errorMessage}</div>}
                    <div className={`${props.isUpdating ? "col-6" : "col-12"}`}>
                        <button className="btn btn-primary btn-sm form-control">
                            {props.isUpdating ? "Update" : "Create"}
                        </button>
                    </div>
                    {props.isUpdating && <div className="col-6">
                        <button className="btn btn-danger btn-sm form-control" onClick={props.handleCancleContact}>
                            Cancel
                        </button>
                    </div>}
                </div>
            </form>
        </div>
    );
}

export default AddContact;