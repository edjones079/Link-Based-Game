class Engine {

    static load(...args) {
        window.onload = () => new Engine(...args);
    }

    constructor(firstSceneClass, storyDataUrl) {

        this.firstSceneClass = firstSceneClass;
        this.storyDataUrl = storyDataUrl;

        this.header = document.body.appendChild(document.createElement("h1"));
        this.output = document.body.appendChild(document.createElement("div"));
        this.actionsContainer = document.body.appendChild(document.createElement("div"));

        fetch(storyDataUrl).then( (response) => response.json() ).then(
            (json) => {
                this.storyData = json;
                this.gotoScene(firstSceneClass)
            }
        );
        
    }

    gotoScene(sceneClass, data) {
        this.scene = new sceneClass(this);
        this.scene.create(data);
    }

    addChoice(action, data) {
        this.button1 = this.actionsContainer.appendChild(document.createElement("button"));
        this.button1.innerText = action;
        this.button1.onclick = () => {
            while(this.actionsContainer.firstChild) {
                this.actionsContainer.removeChild(this.actionsContainer.firstChild)
            }
            this.scene.handleChoice(data);
        }
    }

    addKey() {
        this.button2 = this.actionsContainer.appendChild(document.createElement("button"));
        this.button2.innerText = "Grab the key!";
        this.button2.onclick = () => {

            this.actionsContainer.removeChild(this.actionsContainer.lastChild)
            let div = document.createElement("div");
            div.innerHTML = "Key obtained!";
            this.output.appendChild(div);
        }

        return true;
    }

    setTitle(title) {
        document.title = title;
        this.header.innerText = title;
    }

    show(msg) {
        let div = document.createElement("div");
        div.innerHTML = msg;
        this.output.appendChild(div);
    }
}

class Scene {
    constructor(engine) {
        this.engine = engine;
    }

    create() { }

    update() { }

    handleChoice(action) {
        console.warn('no choice handler on scene ', this);
    }
}