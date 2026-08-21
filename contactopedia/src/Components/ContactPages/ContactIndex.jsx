import { useState } from 'react';
import FavoriteContacts from './FavoriteContacts';
import GeneralContact from './GeneralContact';
import AddContact from './AddContact';

function ContactIndex() {
    const [contactList, setContactList] = useState([
        {
            id: 1,
            name: "Ben Parker",
            phone: "666-666-7770",
            email: "ben@dotnetmastery.com",
            isFavorite: false,
        },
        {
            id: 2,
            name: "Kathy Patrick",
            phone: "111-222-0000",
            email: "kathy@dotnetmastery.com",
            isFavorite: true,
        },
        {
            id: 3,
            name: "Paul Show",
            phone: "999-222-1111",
            email: "paul@dotnetmastery.com",
            isFavorite: true,
        },
    ]);
    const [selectedContact, SetSelectedContact] = useState(null);
    const [isUpdating, SetIsUpdating] = useState(false);

    function handleDeleteAll() {
        setContactList([]);
    }
    function handleUpdateContact(contact) {
        console.log(contact);
        SetSelectedContact(contact);
        SetIsUpdating(true);
    }
    function handleToggleFavorite(contact) {
        setContactList((prevState) => {
            return prevState.map((obj) => {
                if (obj.id == contact.id) {
                    return { ...obj, isFavorite: !obj.isFavorite }
                }
                return obj;
            });
        });
    }
    function handleCancelContact() {
        SetSelectedContact(null);
        SetIsUpdating(false);
    }

    function handleAddContact(newContact) {
        //validation
        const duplicateRecord = contactList.filter((x) => {
            if (x.name == newContact.name && x.phone == newContact.phone) {
                return true;
            }
        });
        if (duplicateRecord.length > 0) {

            return { status: "error", msg: "Duplicate record found." }

        }

        const newContactConcat = {
            ...newContact,
            id: contactList.length > 0 ? contactList[contactList.length - 1].id + 1 : 1,
            isFavorite: false,
        };
        setContactList((prevState) => {
            return prevState.concat([newContactConcat]);
        });
        return { status: "success", msg: "Contact was added successfully." }
    }

    function handleDeleteContact(contactid) {
        setContactList((prevState) => {
            return prevState.filter((obj) => {
                if (obj.id !== contactid) {
                    return true;
                }
                else {
                    return false;
                }
                return obj;
            });
        });
    }
    return (
        <div className="container" style={{ minHeight: "85vh" }}>
            <div className="row py-3">
                <div className="row py-2">
                    <div className="col-6">
                        ADD CONTACT
                    </div>
                    <div className="col-6">
                        <button className="btn btn-danger form-control" onClick={handleDeleteAll}>Remove All</button>
                    </div>
                </div>
                <div className="py-2">
                    <div className="col-6">
                        <AddContact handleCancleContact={handleCancelContact} handleAddContact={handleAddContact} isUpdating={isUpdating} />
                    </div>
                </div>
                <div className="py-2">
                    <div className="col-6">
                        <FavoriteContacts updateClick={handleUpdateContact}
                            deleteClick={handleDeleteContact} favoriteClick={handleToggleFavorite} contacts={contactList.filter((u) => u.isFavorite == true)} />
                    </div>
                </div>
                <div className="py-2">
                    <div className="col-6">
                        <GeneralContact updateClick={handleUpdateContact} deleteClick={handleDeleteContact} favoriteClick={handleToggleFavorite} contacts={contactList.filter((u) => u.isFavorite == false)} />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ContactIndex;