
// when babel transform jsx into js it generate 'h' object which generate html element
const { h } = require('jsx-dom');

const { existsSync } = require('fs');
const manager = require(__dirname + '/../src/manager');
const { toast } = require(__dirname + '/../src/notification');
const { generateDefaultUserdataFile, checkLatestVersion } = require(__dirname + '/../src/util');

const ROOT_DIRECTORY = __dirname + "/..";

const setup = () => {

    getAndSetBackgroundImage();

    const CONFIG_PATH = ROOT_DIRECTORY + "/config.json";

    if (!existsSync(CONFIG_PATH)){
        toast.error("Can't find configuration file!");
        return;
    }

    const configuration = require(CONFIG_PATH);
    
    const USERDATA_PATH = ROOT_DIRECTORY + configuration.userdataPath;
    
    if (!existsSync(USERDATA_PATH)) {
        generateDefaultUserdataFile(USERDATA_PATH);
    }
    
    checkLatestVersion(require(ROOT_DIRECTORY + "/package.json").version);
    
    const userdata = require(USERDATA_PATH);

    manager.setUserdata(userdata);
    
    manager.loadAndInitiateWidgets();   
    
    document.getElementById("manageWidgetsButton").onclick = () => populateWidgetManagerModal();
}

const setBackgroundImage = (src) => {

    const imageURL = "url('" + src + "')";
    document.body.style.backgroundImage = imageURL;
}

const getAndSetBackgroundImage = () => {

    const backgroundImageSrc = localStorage.getItem("background-image");

    if (backgroundImageSrc)
        setBackgroundImage(backgroundImageSrc);
}

const populateWidgetManagerModal = () => {

    const manageWidgetsListELement = document.getElementById("manageWidgetsList");

    manageWidgetsListELement.innerHTML = "";

    manager.userdata.widgets.forEach(widget => {

        const liElement = document.createElement('li');
        liElement.className = "list-group-item mng-item";

        const widgetName = document.createTextNode(widget.directoryName);

        liElement.appendChild(widgetName);

        const buttonElement = document.createElement("button");
        buttonElement.className = "btn ml-1 mr-1 float-right";

        const iElement = document.createElement("i");
        
        if (widget.disabled) 
            iElement.className = "fa fa-plus fa-xs";
        else if (manager.loadingStatsWidgets[widget.directoryName])
            iElement.className = "fa fa-circle-o-notch fa-spin";
        else
            iElement.className = "fa fa-trash-o fa-xs";

        buttonElement.onclick = () => {
            if (widget.disabled){

                manager.loadingStatsWidgets[widget.directoryName] = true;

                manager.add(widget.directoryName, () => { 
                    delete manager.loadingStatsWidgets[widget.directoryName];
                    populateWidgetManagerModal();
                });

            } else 
                manager.remove(widget.directoryName);

            populateWidgetManagerModal();
        }

        buttonElement.appendChild(iElement);

        liElement.appendChild(buttonElement);

        manageWidgetsListELement.appendChild(liElement);
    });
}

window.onload = () => {

    setup();

    document.getElementById("refreshGridButton").onclick = () => refreshGrid();

    document.querySelectorAll('.prf-img').forEach(element => element.onclick = () => {
        
        localStorage.setItem("background-image", element.src);
        setBackgroundImage(element.src);
    });
}