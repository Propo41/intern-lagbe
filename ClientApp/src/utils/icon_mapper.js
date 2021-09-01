import BookmarkIcon from "@material-ui/icons/Bookmark";
import MailIcon from "@material-ui/icons/Mail";
import PhoneIcon from "@material-ui/icons/Phone";
import DeleteIcon from "@material-ui/icons/Delete";
import PublishIcon from "@material-ui/icons/Publish";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import BusinessIcon from "@material-ui/icons/Business";
import DescriptionIcon from "@material-ui/icons/Description";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import CategoryIcon from "@material-ui/icons/Category";
import MapIcon from "@material-ui/icons/Map";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

/**
 * A util function that returns the desired Material Icon based on the parameters provided
 * @param iconName bookmark, mail, location, requirements, phone, delete, upload, user, lock, key, company, description
 * @param color ash, black, white, darkash, body-color, purple, green, red, light-purple
 * @example {iconMapper('bookmark', 'purple')}
 * @returns A material icon component
 */
const iconMapper = (iconName, color, parent) => {
  switch (iconName) {
    case "bookmark":
      return <BookmarkIcon style={style(color, parent)} />;
    case "map":
      return <MapIcon style={style(color, parent)} />;
    case "mail":
      return <MailIcon style={style(color, parent)} />;
    case "location":
      return <LocationOnIcon style={style(color, parent)} />;
    case "requirements":
      return <PlaylistAddCheckIcon style={style(color, parent)} />;
    case "phone":
      return <PhoneIcon style={style(color, parent)} />;
    case "delete":
      return <DeleteIcon style={style(color, parent)} />;
    case "upload":
      return <PublishIcon style={style(color, parent)} />;
    case "user":
      return <AccountCircleIcon style={style(color, parent)} />;
    case "lock":
      return <LockIcon style={style(color, parent)} />;
    case "key":
      return <VpnKeyIcon style={style(color, parent)} />;
    case "company":
      return <BusinessIcon style={style(color, parent)} />;
    case "description":
      return <DescriptionIcon style={style(color, parent)} />;
    case "district":
      return <HomeWorkIcon style={style(color, parent)} />;
    case "category":
      return <CategoryIcon style={style(color, parent)} />;
    case "remuneration":
      return <AccountBalanceIcon style={style(color, parent)} />;
    case "money":
      return <AttachMoneyIcon style={style(color, parent)} />;
    default:
      return <BookmarkIcon style={style(color, parent)} />;
  }
};

const style = (color, parent) => {
  if (parent === "textinputlayout") {
    return { color: `var(--${color})`, padding: "10px" };
  } else {
    return { color: `var(--${color})` };
  }
};

export default iconMapper;
