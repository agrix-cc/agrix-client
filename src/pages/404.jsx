import {Link} from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";

const PageNotFound = () => {
    return (
        <>
            <p className="absolute top-0 left-0 p-4 text-primary-green text-2xl font-bold">AgriX</p>
            <div className="w-dvw h-dvh bg-mint-green p-4 md:flex md:w-full md:h-dvh overflow-hidden">
                <div className="md:w-full mt-6">
                    <img src="assets/404.png" alt="page not found"/>
                </div>
                <div className="flex flex-col justify-center items-center md:w-full md:items-start">
                    <p className="text-6xl mb-4">Oopss...!</p>
                    <p className="text-2xl mb-4">It looks like you are lost</p>
                    <Link to="/">
                        <div
                            className="bg-primary-green text-white text-lg w-fit px-4 py-2 rounded-full shadow-lg flex gap-2 justify-center items-center">
                            <IoArrowBackOutline/>
                            <p>Go back to home</p>
                        </div>
                    </Link>
                </div>
            </div>
        </>

    )
}

export default PageNotFound;