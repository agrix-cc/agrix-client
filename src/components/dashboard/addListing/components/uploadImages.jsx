"use client"
import {toaster} from "../../../ui/toaster";
import {Button} from "../../../ui/button";
import {
    FileUploadList,
    FileUploadRoot,
    FileUploadTrigger,
} from "../../../ui/file-button";
import {HiUpload} from "react-icons/hi";

const UploadImages = (props) => {

    const {
        handleChange = (e) => {setFiles(e.acceptedFiles)},
        files,
        setFiles
    } = props;

    const handleError = (e) => {
        e.files.forEach(file => {
            toaster.create({
                title: file.errors[0],
                type: "error"
            });
        });
    };

    return (
        <div>
            <p className="mb-2">Listing images</p>
            <ImagePreview files={files}/>
            <FileUploadRoot
                maxFiles={5}
                accept={["image/png", "image/jpeg"]}
                maxFileSize={5242880}
                onFileReject={(e) => handleError(e)}
                onFileChange={(e) => handleChange(e)}>
                <FileUploadTrigger asChild>
                    <Button variant="outline" size="sm">
                        <HiUpload/> Upload images
                    </Button>
                </FileUploadTrigger>
                <FileUploadList showSize clearable/>
            </FileUploadRoot>
        </div>
    );
};

const ImagePreview = (props) => {
    const {files = []} = props;
    return(
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