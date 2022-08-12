writeValue = function(ctx, value, pos) {
    var scale = getScalingFactor(getCanvas(), getBackgroundImage());
    pos = {x: pos.x / scale.x, y: pos.y / scale.y };

    ctx.save();
    ctx.scale(scale.x, scale.y);
    ctx.fillText(value, pos.x, pos.y);
    ctx.restore();
}

getScalingFactor = function(canvas, warcryCardOne) {
    return {
        x: canvas.width  / warcryCardOne.width,
        y: canvas.height / warcryCardOne.height
    };
}

getCanvas = function() {
    return document.getElementById("canvas");
}

getContext = function() {
    return getCanvas().getContext("2d");
}

getBackgroundImage = function() {
    if (document.getElementById('select-bg-dark-102').checked) {
        return document.getElementById('bg-dark-102');

    } else if (document.getElementById('select-aeronautica_card_imperial').checked) {
        return document.getElementById('aeronautica_card_imperial');
    }
}

drawBackground = function() {
    getContext().drawImage(
        getBackgroundImage(), 0, 0, getCanvas().width, getCanvas().height);
}

scalePixelPosition = function(pixelPosition) {
    var scalingFactor = getScalingFactor(getCanvas(), getBackgroundImage());
    var scaledPosition = {x: pixelPosition.x * scalingFactor.x, y: pixelPosition.y * scalingFactor.y};
    return scaledPosition;
}

writeScaled = function(value, pixelPos) {
    var scaledPos = scalePixelPosition(pixelPos);
    writeValue(getContext(), value, scaledPos);
}

drawCardElementFromInput = function(inputElement, pixelPosition) {
    var value = inputElement.value;
    writeScaled(value, pixelPosition);
}

drawCardElementFromInputId = function(inputId, pixelPosition) {
    drawCardElementFromInput(document.getElementById(inputId), pixelPosition);
}

// Variables to draw
// FighterName, FighterName2, Points, Structure, Transport, Fuel, Throttle, AceManoveuvres, Handing, MinSpeed, MaxSpeed, MaxAltitude

drawFighterName = function(value) {
    getContext().font = '80px rodchenkoctt';
    getContext().fillStyle = 'white';
    getContext().textAlign = "left";
    getContext().textBaseline = "bottom";
    writeScaled(value, {x: 100, y: 140});
}

drawFighterName2 = function(value) {
    getContext().font = '40px rodchenkoctt';
    getContext().fillStyle = 'white';
    getContext().textAlign = "left";
    getContext().textBaseline = "bottom";
    writeScaled(value, {x: 100, y: 175});
}

drawStructure = function(value) {
    writeScaled(value, {x: 580, y: 670});
}

drawTransport = function(value) {
    if (value == 0){
        value = "-";
    }
    writeScaled(value, {x: 580, y: 720});
}

drawFuel = function(value) {
    if (value == 0){
        value = "-";
    }
    writeScaled(value, {x: 580, y: 770});
}

drawThrottle = function(value) {
    writeScaled(value, {x: 1080, y: 670});
}

drawAceManoeuvres = function(value) {
    writeScaled(value, {x: 1080, y: 720});
}

drawHandling = function(value) {
    value = value + "+";
    writeScaled(value, {x: 1080, y: 770});
}

drawMinSpeed = function(value) {
    writeScaled(value, {x: 1580, y: 670});
}

drawMaxSpeed = function(value) {
    writeScaled(value, {x: 1580, y: 720});
}

drawMaxAltitude = function(value) {
    writeScaled(value, {x: 1580, y: 770});
}

drawPointCost = function(value) {
    getContext().fillStyle = 'black';
    getContext().textAlign = "center";
    writeScaled(value, {x: 1630, y: 85});
}


// Weapon Stats


drawWeapon = function(weaponData, pixelPosition) {

    var statsPosY = pixelPosition.y + 95;

    writeScaled(
        weaponData.weaponName,
        {x: pixelPosition.x + 0, y: statsPosY});

    writeScaled(
        weaponData.fireArc,
        {x: pixelPosition.x + 200, y: statsPosY});

    writeScaled(
        weaponData.fbrShort + "/" + weaponData.fbrMed + "/" + weaponData.fbrLong,
        {x: pixelPosition.x + 300, y: statsPosY});

    writeScaled(
        weaponData.damage,
        {x: pixelPosition.x + 400, y: statsPosY});    

    writeScaled(
        weaponData.ammo,
        {x: pixelPosition.x + 500, y: statsPosY});    
    
    writeScaled(
        weaponData.special,
        {x: pixelPosition.x + 600, y: statsPosY});    
        
   
    //var position = scalePixelPosition({x: pixelPosition.x + 20, y: pixelPosition.y + 30});
    //var size = scalePixelPosition({x: 120, y: 120});
}

function getWeapon(weaponId) {
    return $(weaponId).find("#weaponEnabled")[0].checked ? $(weaponId) : null;
}

function getWeapon1() {
    return getWeapon("#weapon1");
}

function getWeapon2() {
    return getWeapon("#weapon2");
}

// End Weapons


function getLabel(element)
{
    return $(element).prop("labels")[0];
}

function getImage(element)
{
    return $(element).find("img")[0];
}

function drawImage(scaledPosition, scaledSize, image)
{
    if (image != null)
    {
        if (image.complete)
        {
            getContext().drawImage(image, scaledPosition.x, scaledPosition.y, scaledSize.x, scaledSize.y);
        }
        else
        {
            image.onload = function(){ drawImage(scaledPosition, scaledSize, image); };
        }
    }
}

function drawImageSrc(scaledPosition, scaledSize, imageSrc)
{
    if (imageSrc != null)
    {
        var image = new Image();
        image.onload = function(){ drawImage(scaledPosition, scaledSize, image); };
        image.src = imageSrc;
    }
}

function drawModel(imageUrl, imageProps)
{
    if (imageUrl != null)
    {
        var image = new Image();
        image.onload = function(){
            var position = scalePixelPosition({x: 250 + imageProps.offsetX, y: 250 + imageProps.offsetY});
            var scale = imageProps.scalePercent/100.0;
            var width = image.width * scale;
            var height = image.height * scale;
            getContext().drawImage(image, position.x, position.y, width, height);

            URL.revokeObjectURL(image.src);
        };
        image.src = imageUrl;
    }
}

function getName()
{
    var textInput = $("#saveNameInput")[0];
    return textInput.value;
}

function setName(name)
{
    var textInput = $("#saveNameInput")[0];
    textInput.value = name;
}

function getModelImage()
{
    var imageSelect = $("#imageSelect")[0];

    if (imageSelect.files.length > 0)
    {
        return URL.createObjectURL(imageSelect.files[0]);
    }

    return null;
}

function setModelImage(image)
{
    var imageSelect = $("#imageSelect")[0];

    if (image != null)
    {
        // TODO: Not sure how to do this. It might not even be possible! Leave it for now...
        // imageSelect.files[0] = image;
    }
    else
    {
        imageSelect.value = null;
    }
}

function getDefaultModelImageProperties()
{
    return {
        offsetX: 0,
        offsetY: 0,
        scalePercent: 100
    };
}

function getModelImageProperties()
{
    return {
        offsetX: $("#imageOffsetX")[0].valueAsNumber,
        offsetY: $("#imageOffsetY")[0].valueAsNumber,
        scalePercent: $("#imageScalePercent")[0].valueAsNumber
    };
}

function setModelImageProperties(modelImageProperties)
{
    $("#imageOffsetX")[0].value = modelImageProperties.offsetX;
    $("#imageOffsetY")[0].value = modelImageProperties.offsetY;
    $("#imageScalePercent")[0].value = modelImageProperties.scalePercent;
}

function getDefaultWeaponData()
{
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

function getDefaultWeaponData1()
{
    var data = getDefaultWeaponData();
    data.enabled = true;
    return data;
}

function getDefaultWeaponData2()
{
    var data = getDefaultWeaponData();
    data.enabled = false;
    return data;
}

function readWeaponControls(weaponId)
{
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

function writeWeaponControls(weaponId, weaponData, weaponName)
{
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


function readControls()
{
    var data = new Object;
    data.name = getName();
    data.imageUrl = getModelImage();
    data.imageProperties = getModelImageProperties();
    data.fighterName = document.getElementById("fighterName").value;
    data.fighterName2 = document.getElementById("fighterName2").value;
    data.pstructure = document.getElementById("structure").value;
    data.transport = document.getElementById("transport").value;
    data.fuel = document.getElementById("fuel").value;
    data.throttle = document.getElementById("throttle").value;
    data.aceManoeuvres = document.getElementById("aceManoeuvres").value;
    data.handling = document.getElementById("handling").value;
    data.minSpeed = document.getElementById("minSpeed").value;
    data.maxSpeed = document.getElementById("maxSpeed").value;
    data.maxAltitude = document.getElementById("maxAltitude").value;    
    
    data.pointCost = document.getElementById("pointCost").value;
    data.weapon1 = readWeaponControls("#weapon1");
    data.weapon2 = readWeaponControls("#weapon2");

    return data;
}


render = function(fighterData) {
    drawBackground();

   // drawModel(fighterData.imageUrl, fighterData.imageProperties);
    
   // Section added below to try have text above uploaded image
    
    if (fighterData.imageUrl != null)
    {
        var image = new Image();
        image.onload = function(){
            var position = scalePixelPosition({x: 590 + fighterData.imageProperties.offsetX, y: fighterData.imageProperties.offsetY});
            var scale = fighterData.imageProperties.scalePercent/100.0;
            var width = image.width * scale;
            var height = image.height * scale;
            getContext().drawImage(image, position.x, position.y, width, height);

            // These are the texts to overlay
            drawFighterName(fighterData.fighterName);
            drawFighterName2(fighterData.fighterName2);

            URL.revokeObjectURL(image.src);
        };
        image.src = fighterData.imageUrl;
    } else {
        drawFighterName(fighterData.fighterName);
        drawFighterName2(fighterData.fighterName2);
    }
    
    // section added above
    
    

    getContext().font = "50px rodchenkoctt";
    getContext().fillStyle = "black";
    getContext().textBaseline = "middle";
    getContext().textAlign = "left";

    
    drawTransport(fighterData.transport);
    drawStructure(fighterData.pstructure);
    drawFuel(fighterData.fuel);
    drawThrottle(fighterData.throttle);
    drawAceManoeuvres(fighterData.aceManoeuvres);
    drawHandling(fighterData.handling);
    drawMinSpeed(fighterData.minSpeed);
    drawMaxSpeed(fighterData.maxSpeed);
    drawMaxAltitude(fighterData.maxAltitude);    
    
    

    getContext().font = "70px rodchenkoctt";
    getContext().textBaseline = "top";
    getContext().textAlign = "left";
    getContext().fillStyle = "black";
   
    drawPointCost(fighterData.pointCost);

    getContext().font = "40px rodchenkoctt";
    getContext().textBaseline = "top";
    getContext().textAlign = "left";
    getContext().fillStyle = "black";
    
    
    if (fighterData.weapon1.enabled && fighterData.weapon2.enabled)
    {
        drawWeapon(fighterData.weapon1, {x: 0, y: 820}); // Default was x:29, y:397
        drawWeapon(fighterData.weapon2, {x: 0, y: 870}); // Default was x:29, y:564
    }
    else if (fighterData.weapon1.enabled)
    {
        drawWeapon(fighterData.weapon1, {x: 0, y: 820}); // Default was x:29, y:463
    }
    else if (fighterData.weapon2.enabled)
    {
        drawWeapon(fighterData.weapon2, {x: 0, y: 820}); // Default was x:29, y:463
    }
}

function writeControls(fighterData)
{
    setName(fighterData.name);
    setModelImage(fighterData.imageUrl);
    setModelImageProperties(fighterData.imageProperties);
    $("#fighterName")[0].value = fighterData.fighterName;
    $("#fighterName2")[0].value = fighterData.fighterName2;
    $("#structure")[0].value = fighterData.pstructure;
    $("#transport")[0].value = fighterData.transport;
    $("#fuel")[0].value = fighterData.fuel;
    $("#throttle")[0].value = fighterData.throttle;
    $("#aceManoeuvres")[0].value = fighterData.aceManoeuvres;
    $("#handling")[0].value = fighterData.handling;
    $("#minSpeed")[0].value = fighterData.minSpeed;
    $("#maxSpeed")[0].value = fighterData.maxSpeed;
    $("#maxAltitude")[0].value = fighterData.maxAltitude;
    $("#pointCost")[0].value = fighterData.pointCost;
    writeWeaponControls("#weapon1", fighterData.weapon1, "weapon1");
    writeWeaponControls("#weapon2", fighterData.weapon2, "weapon2");
}

function defaultFighterData() {
    var fighterData = new Object;
    fighterData.name = 'Default';
    fighterData.imageUrl = null;
    fighterData.imageProperties = getDefaultModelImageProperties();
    fighterData.fighterName = "Name";
    fighterData.fighterName2 = "subtitle";
    
    fighterData.pstructure = 0;
    fighterData.transport = 0;
    fighterData.fuel = 0;
    fighterData.throttle = 0;
    fighterData.aceManoeuvres = 0;
    fighterData.handling = 0;
    fighterData.minSpeed = 0;
    fighterData.maxSpeed = 0;
    fighterData.maxAltitude = 0;
    
    fighterData.pointCost = 125;
    fighterData.weapon1 = getDefaultWeaponData1();
    fighterData.weapon2 = getDefaultWeaponData2();
    return fighterData;
}

function saveFighterDataMap(newMap)
{
    window.localStorage.setItem("fighterDataMap", JSON.stringify(newMap));
}

function loadFighterDataMap()
{
    var storage = window.localStorage.getItem("fighterDataMap");
    if (storage != null)
    {
        return JSON.parse(storage);
    }
    // Set up the map.
    var map = new Object;
    map["Default"] = defaultFighterData();
    saveFighterDataMap(map);
    return map;
}

function loadLatestFighterData()
{
    var latestFighterName = window.localStorage.getItem("latestFighterName");
    if (latestFighterName == null)
    {
        latestFighterName = "Default";
    }

    console.log("Loading '" + latestFighterName + "'...");

    var data = loadFighterData(latestFighterName);

    if (data)
    {
        console.log("Loaded data:");
        console.log(data);
    }
    else
    {
        console.log("Failed to load a fighter data.");
    }

    return data;
}

function saveLatestFighterData()
{
    var fighterData = readControls();
    if (!fighterData.name)
    {
        return;
    }

    window.localStorage.setItem("latestFighterName", fighterData.name);
    saveFighterData(fighterData);
}

function loadFighterData(fighterDataName)
{
    if (!fighterDataName)
    {
        return null;
    }

    var map = loadFighterDataMap();
    if (map[fighterDataName])
    {
        return map[fighterDataName];
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

function onload2promise(obj){
    return new Promise((resolve, reject) => {
        obj.onload = () => resolve(obj);
        obj.onerror = reject;
    });
}

async function getBase64ImgFromUrl(imgUrl){
    let img = new Image();
    let imgpromise = onload2promise(img); // see comment of T S why you should do it this way.
    img.src = imgUrl;
    await imgpromise;
    var imgData = getBase64Image(img);
    return imgData;
}

async function handleImageUrlFromDisk(imageUrl)
{
    if (imageUrl &&
        imageUrl.startsWith("blob:"))
    {
        // The image was loaded from disk. So we can load it later, we need to stringify it.
        imageUrl = await getBase64ImgFromUrl(imageUrl);
    }

    return imageUrl;
}

async function saveFighterData(fighterData)
{
    var finishSaving = function()
    {
        var map = loadFighterDataMap();
        map[fighterData.name] = fighterData;
        window.localStorage.setItem("fighterDataMap", JSON.stringify(map));
    };

    if (fighterData != null &&
        fighterData.name)
    {
        // handle images we may have loaded from disk...
        fighterData.imageUrl = await handleImageUrlFromDisk(fighterData.imageUrl);

        finishSaving();
    }
}

function getLatestFighterDataName()
{
    return "latestFighterData";
}

window.onload = function() {
    //window.localStorage.clear();
    var fighterData = loadLatestFighterData();
    writeControls(fighterData);
    render(fighterData);
    refreshSaveSlots();
}

onAnyChange = function() {
    var fighterData = readControls();
    render(fighterData);
    saveLatestFighterData();
}

function onWeaponControlsToggled(weaponCheckbox) {
    var controlsDiv = $(weaponCheckbox.parentNode).find("#weaponInputs")[0];
    controlsDiv.style.display = weaponCheckbox.checked ? "block" : "none";

    onAnyChange();
}

onWeaponMinRangeChanged = function(minRange) {
    var maxRange = $(minRange.parentNode).find("#rangeMax")[0];
    maxRange.value = Math.max(minRange.value, maxRange.value);

    onAnyChange();
}

onWeaponMaxRangeChanged = function(maxRange) {
    var minRange = $(maxRange.parentNode).find("#rangeMin")[0];
    minRange.value = Math.min(maxRange.value, minRange.value);

    onAnyChange();
}

function onClearCache()
{
    window.localStorage.clear();
    location.reload();
    return false;
}

function onResetToDefault()
{
    var fighterData = defaultFighterData();
    writeControls(fighterData);
    render(fighterData);
}

function refreshSaveSlots()
{
    // Remove all
    $('select').children('option').remove();

    var fighterDataName = readControls().name;

    var map = loadFighterDataMap();

    for (let [key, value] of Object.entries(map)) {
        var selected = false;
        if (fighterDataName &&
            key == fighterDataName)
        {
            selected = true;
        }
        var newOption = new Option(key, key, selected, selected);
        $('#saveSlotsSelect').append(newOption);
    }
}

function onSaveClicked()
{
    var fighterData = readControls();
    console.log("Saving '" + fighterData.name + "'...");
    saveFighterData(fighterData);
    refreshSaveSlots();
}

function onLoadClicked()
{
    var fighterDataName = $('#saveSlotsSelect').find(":selected").text();
    console.log("Loading '" + fighterDataName + "'...");
    fighterData = loadFighterData(fighterDataName);
    writeControls(fighterData);
    render(fighterData);
    refreshSaveSlots();
}

function onDeleteClicked()
{
    var fighterDataName = $('#saveSlotsSelect').find(":selected").text();

    console.log("Deleting '" + fighterDataName + "'...");

    var map = loadFighterDataMap();
    delete map[fighterDataName];

    saveFighterDataMap(map);

    refreshSaveSlots();
}

// …
// …
// …

function saveCardAsImage() {
    var element = document.createElement('a');
    element.setAttribute('href', document.getElementById('canvas').toDataURL('image/png'));
    element.setAttribute('download', 'aeronautica-card.png');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

$(document).ready(function() {
    var c=document.getElementById('canvas');
    var ctx=c.getContext('2d');
    ctx.beginPath();
    ctx.arc(95,50,40,0,2*Math.PI);
    // ctx.stroke();
});
