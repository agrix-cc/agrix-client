import {MdDeleteForever, MdModeEdit} from "react-icons/md";
import {IoIosEye} from "react-icons/io";
import {useNavigate} from "react-router-dom";
import {useMediaQuery} from "@mui/material";
import axios from "axios";
import {toaster} from "../ui/toaster";
import {
    DialogActionTrigger,
    DialogBody, DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot, DialogTitle,
    DialogTrigger
} from "../ui/dialog";

const ListingTable = (props) => {

    const isDesktop = useMediaQuery('(min-width: 768px)')

    const {listings} = props;

    return (
        <div>
            {isDesktop &&
                <div className="grid grid-cols-5 text-gray-500 mb-4">
                    <p className="grid place-content-center">ID</p>
                    <p className="grid place-content-center">Title</p>
                    <p className="grid place-content-center">Description</p>
                    <p className="grid place-content-center">Created</p>
                    <p className="grid place-content-center">Actions</p>
                </div>
            }
            {listings &&
                listings.map(listing => <ListingRow listing={listing} key={listing.id}/>)
            }
        </div>
    )
};

const ListingRow = (props) => {

    const {listing} = props;

    return (
        <div className="md:grid md:grid-cols-5 bg-white shadow-xl py-4 px-4 md:px-0 rounded-lg md:shadow-none mb-2 md:mb-0">
            <p className="md:grid md:place-content-center flex justify-between">
                <span className="md:hidden">ID: </span> {listing.id}</p>
            <p className="md:grid md:place-content-center flex justify-between">
                <span className="md:hidden">Title: </span> {listing.title}</p>
            <p className="md:grid md:place-content-center flex justify-between">
                <span className="md:hidden">Description: </span> {listing.description}</p>
            <p className="md:grid md:place-content-center flex justify-between">
                <span className="md:hidden">Created at: </span> {new Date(listing.createdAt).toLocaleDateString()}</p>
            <div className="flex justify-end pt-4 md:pt-0 md:grid md:place-content-center"><ActionButtons id={listing.id}/></div>
        </div>
    )
};

const ActionButtons = (props) => {

    const {id} = props;

    const navigate = useNavigate();

    const handleDelete = async () => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
        await axios.delete(`${process.env.REACT_APP_SERVER_URL}/delete/${id}`)
            .then(res => {
                if (res.data.status === "success") {
                    toaster.create({
                        title: 'Listing deleted successfully!',
                        type: 'success',
                        duration: 1500,
                        onStatusChange({status}) {
                            if (status === "unmounted") {
                                navigate('/dashboard');
                            }
                        }
                    })
                }
            })
            .catch(err => {
                if (err.response) {
                    toaster.create({
                        title: err.response.data.message,
                        type: 'error',
                        duration: 1500,
                    })
                } else {
                    toaster.create({
                        title: err.message,
                        type: 'error',
                        duration: 1500,
                    })
                }
            })
    }

    return (
        <div className="flex gap-4 md:gap-2 items-center text-2xl">
            <button
                onClick={() => navigate(`/product/${id}`)}>
                <IoIosEye/>
            </button>
            <button onClick={() => navigate(`/edit/${id}`)}>
                <MdModeEdit/>
            </button>
            <DeleteButton handleDelete={handleDelete}/>
        </div>
    )
};

const DeleteButton = (props) => {
    const {handleDelete} = props;
    return(
        <DialogRoot>
            <DialogTrigger asChild>
                <button className="text-red-500">
                    <MdDeleteForever/>
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirm Delete</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <p>Do you really want to delete this listing!</p>
                </DialogBody>
                <DialogFooter>
                    <DialogActionTrigger asChild>
                        <button
                            onClick={handleDelete}
                            className="text-red-500"> Confirm
                        </button>
                    </DialogActionTrigger>
                    <DialogActionTrigger asChild>
                        <button>Cancel</button>
                    </DialogActionTrigger>
                </DialogFooter>
                <DialogCloseTrigger/>
            </DialogContent>
        </DialogRoot>
    );
}

export default ListingTable;