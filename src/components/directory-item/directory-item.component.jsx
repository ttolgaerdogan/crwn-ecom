import { useNavigate } from "react-router-dom";
import {BackgroundImage, Body , DirectoryItemContainer} from "./directory-item.styles.jsx"

const DirectoryItem = ({category}) => {

    const navigate = useNavigate();

    const onNavigateHandler = () =>  navigate(route);

    const {id, title, imageUrl, route} = category;

    return (
        <DirectoryItemContainer onClick={onNavigateHandler} key={id} >
            <BackgroundImage
                imageUrl={imageUrl}
            />
            <Body className="body">
                <h2>{title}</h2>
                <p>Shop Now</p>
            </Body>
        </DirectoryItemContainer>
    )
}
export default DirectoryItem
