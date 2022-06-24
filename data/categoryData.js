import bodyImage from "../assets/icons/body-stroke.png";
import startupImage from "../assets/icons/startup-stroke.png";
import schoolImage from "../assets/icons/school-stroke.png";
import socialImage from "../assets/icons/social-stroke.png";
import wasteImage from "../assets/icons/waste-stroke.png";
import bodyImageSelected from "../assets/icons/body-fill-solid.png";
import startupImageSelected from "../assets/icons/startup-fill-solid.png";
import schoolImageSelected from "../assets/icons/school-fill-solid.png";
import socialImageSelected from "../assets/icons/social-fill-solid.png";
import wasteImageSelected from "../assets/icons/waste-fill-solid.png";


// CONVERT TO DICTIONARY IN FUTURE FOR EASE OF USE & GETCOLOR FUNCTION
const categoryData = [
    {
        "key": "1",
        "name": "Startup",
        "image": require("../assets/icons/startup-icon.png"),
        "color": "#F53DF5",
        "subCategories":["Uncategorized", "Solo Work", "Team Meetings", "Other Meetings"],
    },
    {
        "key": "2",
        "name": "Body",
        "image": require("../assets/icons/body-icon.png"),
        "color": "#F5D63D",
        "subCategories":["Uncategorized", "Sleep", "Eat", "Prep", "Excercise", "Reading"],
    },
    {
        "key": "3",
        "name": "Social",
        "image": require("../assets/icons/social-icon.png.png"),
        "color": "#0DB9F2",
        "subCategories":["Uncategorized", "Meals", "Networking", "Girls", "Party"],
    },
    {
        "key": "4",
        "name": "School",
        "image": require("../assets/icons/school-icon.png"),
        "color": "#F53D3D",
        "subCategories":["Uncategorized", "Lecture", "Section", "School Work"],
    },
    {
        "key": "5",
        "name": "Waste",
        "image": require("../assets/icons/waste-icon.png"),
        "color": "#0CE40C",
        "subCategories":["Uncategorized", "Phone", "Travel", "Misc"],
    },
]

export default categoryData;