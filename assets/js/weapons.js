writeValue = function (ctx, value, pos) {
    var scale = getScalingFactor(getCanvas(), getBackgroundImage());
    pos = { x: pos.x / scale.x, y: pos.y / scale.y };

    ctx.save();
    ctx.scale(scale.x, scale.y);
    ctx.fillText(value, pos.x, pos.y);
    ctx.restore();
}

getScalingFactor = function (canvas, warcryCardOne) {
    return {
        x: canvas.width / warcryCardOne.width,
        y: canvas.height / warcryCardOne.height
    };
}

getCanvas = function () {
    return document.getElementById("canvas");
}

getContext = function () {
    return getCanvas().getContext("2d");
}

getBackgroundImage = function () {
    if (document.getElementById('select_aeronautica_weapon_imperial').checked) {
        return document.getElementById('aeronautica_weapon_imperial');
    }

}

drawBackground = function () {
    getContext().drawImage(
        getBackgroundImage(), 0, 0, getCanvas().width, getCanvas().height);
}

scalePixelPosition = function (pixelPosition) {
    var scalingFactor = getScalingFactor(getCanvas(), getBackgroundImage());
    var scaledPosition = { x: pixelPosition.x * scalingFactor.x, y: pixelPosition.y * scalingFactor.y };
    return scaledPosition;
}

writeScaled = function (value, pixelPos) {
    var scaledPos = scalePixelPosition(pixelPos);
    writeValue(getContext(), value, scaledPos);
}

drawCardElementFromInput = function (inputElement, pixelPosition) {
    var value = inputElement.value;
    writeScaled(value, pixelPosition);
}

drawCardElementFromInputId = function (inputId, pixelPosition) {
    drawCardElementFromInput(document.getElementById(inputId), pixelPosition);
}

drawweaponTitle = function (value) {
    getContext().font = '9px rodchenkoctt';
    getContext().fillStyle = "#E0DDDC";
    getContext().textAlign = 'left';
    writeScaled(value, { x: 20, y: 140 });
}

drawweaponName = function (value) {
    getContext().font = '14px rodchenkoctt';
    getContext().fillStyle = "#E0DDDC";
    getContext().textAlign = 'center';
    writeScaled(value, { x: 88, y: 153 });
}


// Weapon Stats


drawWeapon = function (weaponData, pixelPosition) {

    var statsPosY = pixelPosition.y + 95;

    writeScaled(
        weaponData.weaponName,
        { x: pixelPosition.x + 0, y: statsPosY });

    writeScaled(
        weaponData.fireArc,
        { x: pixelPosition.x + 450, y: statsPosY });

    if (weaponData.fbrShort == 0 && weaponData.fbrMed == 0 && weaponData.fbrLong == 0) {
        fbr = " ";
    }
    else {
        fbr = weaponData.fbrShort + "-" + weaponData.fbrMed + "-" + weaponData.fbrLong;
    }
    writeScaled(
        fbr,
        { x: pixelPosition.x + 720, y: statsPosY });

    if (weaponData.damage == 0) {
        dmg = " ";
    }
    else {
        dmg = weaponData.damage + "+";
    }
    writeScaled(
        dmg,
        { x: pixelPosition.x + 870, y: statsPosY });

    writeScaled(
        weaponData.ammo,
        { x: pixelPosition.x + 1005, y: statsPosY });

    writeScaled(
        weaponData.special,
        { x: pixelPosition.x + 1100, y: statsPosY });


    //var position = scalePixelPosition({x: pixelPosition.x + 20, y: pixelPosition.y + 30});
    //var size = scalePixelPosition({x: 120, y: 120});
}

function getWeapon(weaponId) {
    return $(weaponId).find("#weaponEnabled")[0].checked ? $(weaponId) : null;
}

function getWeapon1() {
    return getWeapon("#weapon1");
}

// End Weapons



function getLabel(element) {
    return $(element).prop("labels")[0];
}

function getImage(element) {
    return $(element).find("img")[0];
}


function drawImage(scaledPosition, scaledSize, image) {
    if (image != null) {
        if (image.complete) {
            getContext().drawImage(image, scaledPosition.x, scaledPosition.y, scaledSize.x, scaledSize.y);
        }
        else {
            image.onload = function () { drawImage(scaledPosition, scaledSize, image); };
        }
    }
}

function drawImageSrc(scaledPosition, scaledSize, imageSrc) {
    if (imageSrc != null) {
        var image = new Image();
        image.onload = function () { drawImage(scaledPosition, scaledSize, image); };
        image.src = imageSrc;
    }
}



function setModelImage(image) {
    var imageSelect = $("#imageSelect")[0];

    if (image != null) {
        // TODO: Not sure how to do this. It might not even be possible! Leave it for now...
        // imageSelect.files[0] = image;
    }
    else {
        imageSelect.value = null;
    }
}

function getDefaultModelImageProperties() {
    return {
        offsetX: 0,
        offsetY: 0,
        scalePercent: 100
    };
}

function getModelImageProperties() {
    return {
        offsetX: $("#imageOffsetX")[0].valueAsNumber,
        offsetY: $("#imageOffsetY")[0].valueAsNumber,
        scalePercent: $("#imageScalePercent")[0].valueAsNumber
    };
}

function setModelImageProperties(modelImageProperties) {
    $("#imageOffsetX")[0].value = modelImageProperties.offsetX;
    $("#imageOffsetY")[0].value = modelImageProperties.offsetY;
    $("#imageScalePercent")[0].value = modelImageProperties.scalePercent;
}


function drawModel(imageUrl, imageProps) {
    if (imageUrl != null) {
        var image = new Image();
        image.onload = function () {
            var position = scalePixelPosition({ x: imageProps.offsetX, y: imageProps.offsetY });
            var scale = imageProps.scalePercent / 100.0;
            var width = image.width * scale;
            var height = image.height * scale;
            getContext().drawImage(image, position.x, position.y, width, height);

            URL.revokeObjectURL(image.src);
        };
        image.src = imageUrl;
    }
}

function getName() {
    var textInput = $("#saveNameInput")[0];
    return textInput.value;
}

function setName(name) {
    var textInput = $("#saveNameInput")[0];
    textInput.value = name;
}

function getModelImage() {
    var imageSelect = $("#imageSelect")[0];

    if (imageSelect.files.length > 0) {
        return URL.createObjectURL(imageSelect.files[0]);
    }

    return null;
}




function setModelImage(image) {
    var imageSelect = $("#imageSelect")[0];

    if (image != null) {
        // TODO: Not sure how to do this. It might not even be possible! Leave it for now...
        // imageSelect.files[0] = image;
    }
    else {
        imageSelect.value = null;
    }
}

function getDefaultModelImageProperties() {
    return {
        offsetX: 0,
        offsetY: 0,
        scalePercent: 100
    };
}

function getModelImageProperties() {
    return {
        offsetX: $("#imageOffsetX")[0].valueAsNumber,
        offsetY: $("#imageOffsetY")[0].valueAsNumber,
        scalePercent: $("#imageScalePercent")[0].valueAsNumber
    };
}

function setModelImageProperties(modelImageProperties) {
    $("#imageOffsetX")[0].value = modelImageProperties.offsetX;
    $("#imageOffsetY")[0].value = modelImageProperties.offsetY;
    $("#imageScalePercent")[0].value = modelImageProperties.scalePercent;
}



// begin weapons


function getDefaultWeaponData() {
    var weaponData = new Object;
    weaponData.enabled = true;
    weaponData.weaponName = " ";
    weaponData.fireArc = "Front";
    weaponData.fbrShort = 1;
    weaponData.fbrMed = 2;
    weaponData.fbrLong = 3;
    weaponData.damage = 2;
    weaponData.ammo = "UL";
    weaponData.special = " ";
    return weaponData;
}

function getDefaultWeaponData1() {
    var data = getDefaultWeaponData();
    data.enabled = true;
    return data;
}

function getDefaultWeaponData2() {
    var data = getDefaultWeaponData();
    data.enabled = false;
    return data;
}


function getDefaultWeaponData3() {
    var data = getDefaultWeaponData();
    data.enabled = false;
    return data;
}

function getDefaultWeaponData4() {
    var data = getDefaultWeaponData();
    data.enabled = false;
    return data;
}


function readWeaponControls(weaponId) {
    var weaponData = new Object;
    var weaponDiv = $(weaponId);
    weaponData.enabled = weaponDiv.find("#weaponEnabled")[0].checked;
    weaponData.weaponName = weaponDiv.find("#weaponName")[0].value;
    weaponData.fireArc = weaponDiv.find("#fireArc")[0].value;
    weaponData.fbrShort = weaponDiv.find("#fbrShort")[0].value;
    weaponData.fbrMed = weaponDiv.find("#fbrMed")[0].value;
    weaponData.fbrLong = weaponDiv.find("#fbrLong")[0].value;
    weaponData.damage = weaponDiv.find("#damage")[0].value;
    weaponData.ammo = weaponDiv.find("#ammo")[0].value;
    weaponData.special = weaponDiv.find("#special")[0].value;
    return weaponData;
}

function writeWeaponControls(weaponId, weaponData, weaponName) {
    weaponDiv = $(weaponId);
    weaponDiv.find("#weaponEnabled")[0].checked = weaponData.enabled;
    weaponDiv.find("#weaponInputs")[0].style.display = weaponData.enabled ? "block" : "none";

    weaponDiv.find("#weaponName")[0].value = weaponData.weaponName;
    weaponDiv.find("#fireArc")[0].value = weaponData.fireArc;
    weaponDiv.find("#fbrShort")[0].value = weaponData.fbrShort;
    weaponDiv.find("#fbrMed")[0].value = weaponData.fbrMed;
    weaponDiv.find("#fbrLong")[0].value = weaponData.fbrLong;
    weaponDiv.find("#damage")[0].value = weaponData.damage;
    weaponDiv.find("#ammo")[0].value = weaponData.ammo;
    weaponDiv.find("#special")[0].value = weaponData.special;
}


// end weapons


function readControls() {
    var data = new Object;
    data.name = getName();
    data.imageUrl = getModelImage();
    data.imageProperties = getModelImageProperties();

    data.weaponTitle = document.getElementById('weapon-title').value;
    data.weaponName = document.getElementById('weapon-name').value;
    data.weapon1 = readWeaponControls("#weapon1");
    return data;
}



render = function (cardData) {
    drawBackground();

    if (cardData.imageUrl != null) {
        var image = new Image();
        image.onload = function () {
            var position = scalePixelPosition({ x: cardData.imageProperties.offsetX, y: cardData.imageProperties.offsetY });
            var scale = cardData.imageProperties.scalePercent / 100.0;
            var width = image.width * scale;
            var height = image.height * scale;
            getContext().drawImage(image, position.x, position.y, width, height);

            // These are the texts to overlay

            URL.revokeObjectURL(image.src);
        };
        image.src = cardData.imageUrl;
    }


    drawweaponTitle(cardData.weaponTitle);
    drawweaponName(cardData.weaponName);

    if (fighterData.weapon1.enabled) {
        drawWeapon(fighterData.weapon1, { x: 100, y: 820 });
    }

};

function writeControls(cardData) {
    setName(cardData.name);
    setModelImage(cardData.imageUrl);
    setModelImageProperties(cardData.imageProperties);

    $('#weapon-title').value = cardData.weaponTitle;
    $('#weapon-name').value = cardData.weaponName;
}

function defaultCardData() {
    var cardData = new Object;
    cardData.name = 'Default';
    cardData.imageUrl = null;
    cardData.imageProperties = getDefaultModelImageProperties();

    cardData.weaponName = 'Lord Flashheart';
    cardData.weaponTitle = 'Wing Commander';

    return cardData;
}

function saveCardDataMap(newMap) {
    window.localStorage.setItem("cardDataMap", JSON.stringify(newMap));
}

function loadCardDataMap() {
    var storage = window.localStorage.getItem("cardDataMap");
    if (storage != null) {
        return JSON.parse(storage);
    }
    // Set up the map.
    var map = new Object;
    map["Default"] = defaultCardData();
    saveCardDataMap(map);
    return map;
}

function loadLatestCardData() {
    var latestFighterName = window.localStorage.getItem("latestFighterName");
    if (latestFighterName == null) {
        latestFighterName = "Default";
    }

    console.log("Loading '" + latestFighterName + "'...");

    var data = loadCardData(latestFighterName);

    if (data) {
        console.log("Loaded data:");
        console.log(data);
    }
    else {
        console.log("Failed to load a fighter data.");
    }

    return data;
}

function saveLatestCardData() {
    var cardData = readControls();
    if (!cardData.name) {
        return;
    }

    window.localStorage.setItem("latestFighterName", cardData.name);
    saveCardData(cardData);
}

function loadCardData(cardDataName) {
    if (!cardDataName) {
        return null;
    }

    var map = loadCardDataMap();
    if (map[cardDataName]) {
        return map[cardDataName];
    }

    return null;
}

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL;
}

function onload2promise(obj) {
    return new Promise((resolve, reject) => {
        obj.onload = () => resolve(obj);
        obj.onerror = reject;
    });
}

async function getBase64ImgFromUrl(imgUrl) {
    let img = new Image();
    let imgpromise = onload2promise(img); // see comment of T S why you should do it this way.
    img.src = imgUrl;
    await imgpromise;
    var imgData = getBase64Image(img);
    return imgData;
}

async function handleImageUrlFromDisk(imageUrl) {
    if (imageUrl &&
        imageUrl.startsWith("blob:")) {
        // The image was loaded from disk. So we can load it later, we need to stringify it.
        imageUrl = await getBase64ImgFromUrl(imageUrl);
    }

    return imageUrl;
}

async function saveCardData(cardData) {
    var finishSaving = function () {
        var map = loadCardDataMap();
        map[cardData.name] = cardData;
        window.localStorage.setItem("cardDataMap", JSON.stringify(map));
    };

    if (cardData != null &&
        cardData.name) {
        // handle images we may have loaded from disk...
        cardData.imageUrl = await handleImageUrlFromDisk(cardData.imageUrl);


        finishSaving();
    }
}

function getLatestCardDataName() {
    return "latestCardData";
}

window.onload = function () {
    //window.localStorage.clear();
    var cardData = loadLatestCardData();
    writeControls(cardData);
    render(cardData);
    refreshSaveSlots();
}

onAnyChange = function () {
    var cardData = readControls();
    render(cardData);
    saveLatestCardData();
}


addToImageRadioSelector = function (imageSrc, imageSelector, radioGroupName, bgColor) {
    var div = document.createElement('div');
    div.setAttribute('class', 'mr-0');
    div.innerHTML = `
        <label for="${radioGroupName}-${imageSrc}"><img src="${imageSrc}" width="50" height="50" alt="" style="background-color:${bgColor};"></label>
        <input type="radio" style="display:none;" name="${radioGroupName}" id="${radioGroupName}-${imageSrc}" onchange="onRunemarkSelectionChanged(this, '${bgColor}')">
    `;
    imageSelector.appendChild(div);
    return div;
}


function addToImageCheckboxSelector(imgSrc, grid, bgColor) {
    var div = document.createElement('div');
    div.setAttribute('class', 'mr-0');
    div.innerHTML = `
    <label for="checkbox-${imgSrc}">
        <img src="${imgSrc}" width="50" height="50" alt="" style="background-color:${bgColor};">
    </label>
    <input type="checkbox" style="display:none;" id="checkbox-${imgSrc}" onchange="onTagRunemarkSelectionChanged(this, '${bgColor}')">
    `;
    // grid.appendChild(div);
    return div;
}


function onClearCache() {
    window.localStorage.clear();
    location.reload();
    return false;
}

function onResetToDefault() {
    var cardData = defaultCardData();
    writeControls(cardData);
    render(cardData);
}

function refreshSaveSlots() {
    // Remove all
    $('select').children('option').remove();

    var cardDataName = readControls().name;

    var map = loadCardDataMap();

    for (let [key, value] of Object.entries(map)) {
        var selected = false;
        if (cardDataName &&
            key == cardDataName) {
            selected = true;
        }
        var newOption = new Option(key, key, selected, selected);
        $('#saveSlotsSelect').append(newOption);
    }
}

function onSaveClicked() {
    var cardData = readControls();
    console.log("Saving '" + cardData.name + "'...");
    saveCardData(cardData);
    refreshSaveSlots();
}

function onLoadClicked() {
    var cardDataName = $('#saveSlotsSelect').find(":selected").text();
    console.log("Loading '" + cardDataName + "'...");
    cardData = loadCardData(cardDataName);
    writeControls(cardData);
    render(cardData);
    refreshSaveSlots();
}

function onDeleteClicked() {
    var cardDataName = $('#saveSlotsSelect').find(":selected").text();

    console.log("Deleting '" + cardDataName + "'...");

    var map = loadCardDataMap();
    delete map[cardDataName];

    saveCardDataMap(map);

    refreshSaveSlots();
}

// …
// …
// …

function saveCardAsImage() {
    var element = document.createElement('a');
    element.setAttribute('href', document.getElementById('canvas').toDataURL('image/png'));
    element.setAttribute('download', 'aeronautica-weapon-card.png');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

$(document).ready(function () {
    var c = document.getElementById('canvas');
    var ctx = c.getContext('2d');
    ctx.beginPath();
    ctx.arc(95, 50, 40, 0, 2 * Math.PI);
    // ctx.stroke();
});
