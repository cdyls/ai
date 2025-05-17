document.addEventListener("DOMContentLoaded", function(){


function saveFile(url, filename) {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename || "file-name";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

function get_seed() {
    let seed = ((Math.random() * Math.random() * Math.random()) * (Math.random() * Math.random() * Math.random()) * (Math.random() * Math.random() * Math.random())) * (Math.random() * 999999999)
    return seed
}

async function set_text(prompt,obj) {
    try {
        let url = "https://text.pollinations.ai/answer to: '" + prompt + "' with seed: " + get_seed() + " dont contain seed or any other info in your answer, just an small size answer."
        console.log(url);

        let response = await fetch(url);

        let data = await response.text()

        data.then(obj.innerHTML = data)
    }
    catch(error){
        console.log(error)
    }
}

async function set_decode(prompt,obj) {
    try {
        let url = "https://text.pollinations.ai/decode this: '" + prompt + "' and answer me only the encoding and the decoded data, like this: 'coding: data: if u failder to decode then answer: 'failed'"
        console.log(url);

        let response = await fetch(url);

        let data = await response.text()

        data.then(obj.innerHTML = data)
    }
    catch(error){
        console.log(error)
    }
}

async function set_image(prompt,obj) {
    try {
        let url = "https://image.pollinations.ai/prompt/generate image to user input: '" + prompt + "'."
        console.log(url);

        let response = await fetch(url);

        let data = await response.text()

        data.then(obj.src = url)
    }
    catch(error){
        console.log(error)
    }
}

async function log_audio(url,filename) {
    let notf = new_elem("text")
    notf.innerHTML = "Audio"

    notf.href = url;
    notf.download = filename || "file-name";
    notf.click()
}

async function set_audio(prompt,obj) {
    try {
        let url = "https://text.pollinations.ai/" + prompt + "?model=openai-audio&voice=nova"
        console.log(url);

        let response = await fetch(url);

        let data = await response.text()

        data.then(saveFile(url))
    }
    catch(error){
        console.log(error)
    }
}

async function fire_sets(prompt,type) {
    if (type == "text") {
        let elem = new_elem(type)
        set_text(prompt,elem)
    }

    if (type == "image") {
        let elem = new_elem(type)
        set_image(prompt,elem)
    }

    if (type == "audio") {
        set_audio(prompt)
    }

    if (type == "decode") {
        let elem = new_elem("text")
        set_decode(prompt,elem)
    }
}

async function select_outtype(prompt) {
    try {
        let url = "https://text.pollinations.ai/select what user wants to get: image or text or audio or decode from you, answer with only 1 word, nothing more - ex: 'image', 'text', 'audio', 'decode'. user input: '" + prompt + "'"
        console.log(url);

        let response = await fetch(url);

        let data = await response.text()

        data.then(fire_sets(prompt,data))
    }
    catch(error){
        console.log(error)
    }
}

function new_elem(type) {
    if (type == "text") {
        let elem = document.createElement("h3")
        document.getElementById("list").appendChild(elem)
        elem.style.textShadow = "0px 0px 2px black";
        return elem
    }

    if (type == "image") {
        let elem = document.createElement("img")
        document.getElementById("list").appendChild(elem)
        elem.style.maxHeight = "100%";
        elem.style.maxWidth = "100%";
        return elem
    }
}

document.getElementById("text_gen_button").addEventListener("click", function (event) {
    if (document.getElementById("text_gen_input").value != "" ) {
        let prompt = document.getElementById("text_gen_input").value
        document.getElementById("text_gen_input").value = ""
        select_outtype(prompt)
    }
});

document.getElementById("text_clear_button").addEventListener("click", function (event) {
    document.getElementById("list").remove()
    let new_list = document.createElement("div")
    new_list.id = "list"
    document.getElementById("text_gen").appendChild(new_list);
    document.getElementById("text_gen_input").value = ""
});

});