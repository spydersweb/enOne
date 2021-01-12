"use strict";

const defaultColor = () => {
    
    return color.DARK_TEXT; 
}

const color =  Object.freeze({
    BLUE_TEXT: "--primary",
    GRAY_TEXT: "--secondary",
    GREEN_TEXT: "--success",
    RED_TEXT: "--danger",
    YELLOW_TEXT: "--warning",
    LIGHT_BLUE_TEXT: "--info",
    WHITE_TEXT: "--white",
    DARK_TEXT: "--dark",
    MUTED_TEXT: "--muted"
}); 

export default {
    COLOR: color,
    defaultColor: defaultColor,
}