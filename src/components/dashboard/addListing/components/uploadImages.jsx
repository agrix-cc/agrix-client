"use client"
import {toaster} from "../../../ui/toaster";
import {Button} from "../../../ui/button";
import {
    FileUploadRoot,
    FileUploadTrigger,
} from "../../../ui/file-button";
import {HiUpload} from "react-icons/hi";

const UploadImages = (props) => {

    const {files, setFiles} = props;

    const handleChange = (e) => {
        const newFiles = e.acceptedFiles.filter(newFile =>
            !files.some(existingFile => existingFile.name === newFile.name && existingFile.size === newFile.size)
        );

        if (files.length >= 5) {
            toaster.create({
                title: "Error uploading image!",
                type: "error",
                description: "You cannot upload more than 5 images!"
            });
        } else {
            setFiles([...files, ...newFiles]);
        }
    };

    const handleError = (e) => {
        e.files.forEach(file => {
            toaster.create({
                title: file.errors[0] === "FILE_TOO_LARGE" ? "Please select images less than 5mb": file.errors[0],
                type: "error"
            });
        });
    };

    return (
        <div className="content-between">
            <p className="mb-2">Listing images</p>
            <ImagePreview files={files}/>
            <FileUploadRoot
                accept={["image/png", "image/jpeg"]}
                maxFileSize={5242880}
                onFileReject={handleError}
                onFileChange={handleChange}>
                <FileUploadTrigger asChild>
                    <Button variant="outline" size="sm">
                        <HiUpload/> Upload images
                    </Button>
                </FileUploadTrigger>
            </FileUploadRoot>
        </div>
    );
};

const ImagePreview = (props) => {
    const {files = []} = props;
    return (
        <div className="mb-4 grid grid-cols-5 gap-2">
            {
                files.map(file => (
                    <div
                        className="rounded overflow-hidden shadow-lg h-14"
                        key={file.name}>
                        <img src={URL.createObjectURL(file)} alt="" className="object-cover h-full w-full"/>
                    </div>
                ))
            }
        </div>
    )
};

export default UploadImages;