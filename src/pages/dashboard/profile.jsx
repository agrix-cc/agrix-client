import {IoChevronBack} from "react-icons/io5";
import {Avatar} from "../../components/ui/avatar";
import {MdEdit} from "react-icons/md";
import TextInput from "../../components/dashboard/addListing/components/textInput";
import TextArea from "../../components/dashboard/addListing/components/testArea";
import {Group, InputAddon} from "@chakra-ui/react";
import SelectInput from "../../components/dashboard/addListing/components/selectInput";
import {citiesByDistrict, districts} from "../../assets/citiesByDistrict";
import Spacer from "../../components/spacer";
import {useEffect, useState} from "react";
import axios from "axios";
import {toaster} from "../../components/ui/toaster";
import {useLocation, useNavigate} from "react-router-dom";

const Profile = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {user} = location.state;
    const [profilePic, setProfilePic] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [newUser, setNewUser] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const handleSave = async () => {
        setIsProcessing(true);

        const phoneRegX = /^\d{10}$/;

        if (newUser.contact_number && !phoneRegX.test(newUser.contact_number)) {
            toaster.create({
                title: "Please enter a valid 10 digit mobile number",
                type: "error",
                duration: 30000,
            });
            setIsProcessing(false);
            return;
        }

        const formData = new FormData();
        formData.append("newUser", JSON.stringify(newUser));
        formData.append("image", profilePic);

        axios.defaults.headers.common["Authorization"] =
            "Bearer " + localStorage.getItem("jwtToken");

        await axios
            .put(`${process.env.REACT_APP_SERVER_URL}/profile/edit`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                localStorage.setItem("jwtToken", res.data.result);
                toaster.create({
                    title: "Profile updated successfully!",
                    type: "success",
                    duration: 30000,
                });
            })
            .catch((err) => {
                toaster.create({
                    title: err.response ? err.response.data.message : err.message,
                    type: "error",
                    duration: 30000,
                });
            });
        setIsProcessing(false);
    };

    useEffect(() => {
        setNewUser(user);
        if (user && user.image) {
            setPreviewImage(user.image);
        }
    }, [user]);

    useEffect(() => {
        if (profilePic) {
            setPreviewImage(URL.createObjectURL(profilePic));
        }
    }, [profilePic]);

    return (
        newUser && (
            <div className="p-4 md:max-w-md">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="md:invisible md:hidden"
                    >
                        <IoChevronBack className="text-2xl"/>
                    </button>
                    <p className="text-xl font-medium">Profile</p>
                </div>
                <div className="my-4 flex items-center justify-center">
                    <div className="relative w-fit">
                        <Avatar
                            src={previewImage}
                            size="2xl"
                            name={newUser.first_name + " " + newUser.last_name}
                        />
                        <input
                            type="file"
                            hidden
                            id="profile-pic"
                            onChange={(e) => setProfilePic(e.target.files[0])}
                        />
                        <label
                            htmlFor="profile-pic"
                            className="absolute -right-4 bottom-0 rounded-full bg-primary-green p-1"
                        >
                            <MdEdit className="text-2xl text-white"/>
                        </label>
                    </div>
                </div>
                <div className="my-4">
                    <div className="my-4 flex gap-4">
                        <TextInput
                            id="first-name"
                            error={false}
                            required
                            value={newUser.first_name || ""}
                            onChange={(value) =>
                                setNewUser({...newUser, first_name: value})
                            }
                            label="First name"
                            placeholder="Your first name"
                        />
                        <TextInput
                            id="last-name"
                            error={false}
                            required
                            value={newUser.last_name || ""}
                            onChange={(value) => setNewUser({...newUser, last_name: value})}
                            label="Last name"
                            placeholder="Your last name"
                        />
                    </div>
                    <div className="my-4">
                        <TextInput
                            id="email"
                            disabled={true}
                            error={false}
                            value={newUser.email || ""}
                            label="Email"
                            placeholder="Your email address"
                        />
                    </div>
                    <div className="my-4">
                        <TextArea
                            id="bio"
                            error={false}
                            value={newUser.bio || ""}
                            onChange={(value) => setNewUser({...newUser, bio: value})}
                            label="Bio"
                            placeholder="Enter a simple biography of you"
                        />
                    </div>
                    <div className="my-4">
                        <p className="mb-2">Phone</p>
                        <Group attached className="w-full">
                            <InputAddon>+94</InputAddon>
                            <TextInput
                                id="contact-number"
                                error={false}
                                value={newUser.contact_number || ""}
                                onChange={(value) =>
                                    setNewUser({...newUser, contact_number: value})
                                }
                                placeholder="Your phone number"
                            />
                        </Group>
                    </div>
                    <div className="my-4">
                        <TextInput
                            id="address"
                            error={false}
                            value={newUser.address || ""}
                            onChange={(value) => setNewUser({...newUser, address: value})}
                            label="Address"
                            placeholder="Enter your address"
                        />
                    </div>
                    <div className="my-4">
                        <SelectInput
                            value={newUser.profile_type}
                            onChange={(value) =>
                                setNewUser({...newUser, profile_type: value})
                            }
                            title="Select a profile type"
                            label="Profile type"
                        />
                    </div>
                    <div className="grid gap-2">
                        <SelectInput
                            id="profile-district"
                            items={districts.map((district) => ({
                                label: district,
                                value: district,
                            }))}
                            value={newUser.district}
                            onChange={(value) => setNewUser({...newUser, district: value})}
                            placeholder="Select district"
                            label="District"
                            required
                            error={false}
                        />
                        {newUser.district && (
                            <SelectInput
                                id="profile-city"
                                value={newUser.city}
                                onChange={(value) => setNewUser({...newUser, city: value})}
                                items={citiesByDistrict[newUser.district].cities.map(
                                    (city) => ({
                                        label: city,
                                        value: city,
                                    })
                                )}
                                placeholder="Select district"
                                label="City"
                                error={false}
                            />
                        )}
                    </div>
                </div>
                <button
                    disabled={isProcessing}
                    type="submit"
                    className="w-full translate-y-0 rounded bg-primary-green px-4 py-2 text-lg text-white shadow-lg transition-all duration-300 active:translate-y-0.5 active:shadow-md disabled:opacity-25"
                    onClick={handleSave}
                >
                    Save
                </button>
                <Spacer/>
            </div>
        )
    );
};

export default Profile;
