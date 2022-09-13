import { getViewportSizes } from "./getViewportSizes";

export const getResizedBoardSize = () => {
    const [vw, vh] = getViewportSizes();
    const UiHeight = 279;
    let newBoardSize;

    if (vw > vh) {
        newBoardSize = vh - UiHeight;
    } else {
        if (vh - vw <= UiHeight) {
        newBoardSize = vh - UiHeight;
        } else {
        newBoardSize = vw - 52;
        }
    }

    // Min size
    if (newBoardSize < 300) {
        newBoardSize = 300; 
    }

    return newBoardSize;
}
