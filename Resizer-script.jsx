function showResizerDialog() {
  var dlg = new Window("dialog", "Resizer", undefined, { resizable: false });
  dlg.preferredSize.width = 350;

  var resizerTypeGroup = dlg.add("group");
  resizerTypeGroup.orientation = "column";
  var imageResizerCheckbox = resizerTypeGroup.add(
    "checkbox",
    undefined,
    "Image Resizer"
  );
  var canvasResizerCheckbox = resizerTypeGroup.add(
    "checkbox",
    undefined,
    "Canvas Resizer"
  );
  imageResizerCheckbox.value = true;

  var folderSelectionGroup = dlg.add("group");
  folderSelectionGroup.alignChildren = "left";
  folderSelectionGroup.orientation = "column";
  folderSelectionGroup.add("statictext", undefined, "Select Input Folder:");
  var inputFolderBtn = folderSelectionGroup.add("button", undefined, "Browse");
  var inputFolderPath = folderSelectionGroup.add("statictext", undefined, "");
  folderSelectionGroup.add("statictext", undefined, "Select Output Folder:");
  var outputFolderBtn = folderSelectionGroup.add("button", undefined, "Browse");
  var outputFolderPath = folderSelectionGroup.add("statictext", undefined, "");

  var imageResizeGroup = dlg.add("panel", undefined, "Resize Image");
  imageResizeGroup.alignChildren = "left";
  imageResizeGroup.orientation = "column";

  var dimensionUnitsGroup = imageResizeGroup.add("group");
  var dimensionUnitsOptions = ["Pixels", "Centimeters"];
  var dimensionUnitsDropdown = dimensionUnitsGroup.add(
    "dropdownlist",
    undefined,
    dimensionUnitsOptions
  );
  dimensionUnitsDropdown.selection = 0;

  var dimensionGroup = imageResizeGroup.add("group");
  dimensionGroup.orientation = "column";
  var widthGroup = dimensionGroup.add("group");
  widthGroup.add("statictext", undefined, "Width:", { width: 50 });
  var widthInput = widthGroup.add("edittext", undefined, "", { characters: 5 });
  var heightGroup = dimensionGroup.add("group");
  heightGroup.add("statictext", undefined, "Height:", { width: 50 });
  var heightInput = heightGroup.add("edittext", undefined, "", { characters: 5 });

  var canvasResizeGroup = dlg.add("panel", undefined, "Resize Canvas");
  canvasResizeGroup.alignChildren = "left";
  canvasResizeGroup.orientation = "column";
  canvasResizeGroup.visible = false;

  canvasResizeGroup.add('statictext', undefined, 'New Width (px):');
  var newWidthInput = canvasResizeGroup.add('edittext', undefined, "", { characters: 10 });
  canvasResizeGroup.add('statictext', undefined, 'New Height (px):');
  var newHeightInput = canvasResizeGroup.add('edittext', undefined, "", { characters: 10 });

  canvasResizeGroup.add("statictext", undefined, "Anchor Position:");
  var anchorGroup = canvasResizeGroup.add("group");
  var anchorOptions = [
    "TopLeft",
    "TopCenter",
    "TopRight",
    "MiddleLeft",
    "Center",
    "MiddleRight",
    "BottomLeft",
    "BottomCenter",
    "BottomRight",
  ];
  var anchorDropdown = anchorGroup.add(
    "dropdownlist",
    undefined,
    anchorOptions
  );
  anchorDropdown.selection = 4;

  var btnGroup = dlg.add("group");
  btnGroup.alignment = "right";
  var okBtn = btnGroup.add("button", undefined, "OK", { name: "ok" });
  var cancelBtn = btnGroup.add("button", undefined, "Cancel", {
    name: "cancel",
  });

  function updateResizerSection() {
    imageResizeGroup.visible = imageResizerCheckbox.value;
    canvasResizeGroup.visible = canvasResizerCheckbox.value;
  }

  updateResizerSection();

  imageResizerCheckbox.onClick = updateResizerSection;
  canvasResizerCheckbox.onClick = updateResizerSection;

  inputFolderBtn.onClick = function () {
    var inputFolder = Folder.selectDialog("Select the input folder");
    if (inputFolder) {
      inputFolderPath.text = inputFolder.fsName;
    }
  };

  outputFolderBtn.onClick = function () {
    var outputFolder = Folder.selectDialog("Select the output folder");
    if (outputFolder) {
      outputFolderPath.text = outputFolder.fsName;
    }
  };

  okBtn.onClick = function () {
    var inputFolder = Folder(inputFolderPath.text);
    var outputFolder = Folder(outputFolderPath.text);

    if (!inputFolder.exists) {
      alert("Input folder does not exist.");
      return;
    }
    if (!outputFolder.exists) {
      alert("Output folder does not exist.");
      return;
    }

    var inputFiles = inputFolder.getFiles(/\.(jpg|jpeg|png|tif|tiff)$/i);
    if (inputFiles.length === 0) {
      alert("No image files found in the input folder.");
      return;
    }

    for (var i = 0; i < inputFiles.length; i++) {
      var file = inputFiles[i];
      var doc = open(file);

      doc.trim(TrimType.TOPLEFT);
      if (imageResizerCheckbox.value && canvasResizerCheckbox.value) {
        var newWidth = parseInt(widthInput.text);
        var newHeight = parseInt(heightInput.text);
        var unit = dimensionUnitsDropdown.selection.text.toLowerCase();
  
        if (unit === "centimeters") {
          newWidth = Math.round(newWidth * 28.3465);
          newHeight = Math.round(newHeight * 28.3465);
        }

        doc.resizeImage(newWidth, newHeight);

        var newCanvasWidth = parseInt(newWidthInput.text);
        var newCanvasHeight = parseInt(newHeightInput.text);
        var anchorPosition = anchorDropdown.selection.index;

        var anchorPositions = [
          AnchorPosition.TOPLEFT,
          AnchorPosition.TOPCENTER,
          AnchorPosition.TOPRIGHT,
          AnchorPosition.MIDDLELEFT,
          AnchorPosition.MIDDLECENTER,
          AnchorPosition.MIDDLERIGHT,
          AnchorPosition.BOTTOMLEFT,
          AnchorPosition.BOTTOMCENTER,
          AnchorPosition.BOTTOMRIGHT,
        ];

        var anchorPositionConstant = anchorPositions[anchorPosition];

        if (
          isNaN(newCanvasWidth) ||
          isNaN(newCanvasHeight) ||
          newCanvasWidth <= 0 ||
          newCanvasHeight <= 0
        ) {
          alert(
            "Invalid canvas size input. Please enter positive numerical values."
          );
          doc.close(SaveOptions.DONOTSAVECHANGES);
          return;
        }

        doc.resizeCanvas(newCanvasWidth, newCanvasHeight, anchorPositionConstant);
      } else if (imageResizerCheckbox.value) {

        var newWidth = parseInt(widthInput.text);
        var newHeight = parseInt(heightInput.text);
        var unit = dimensionUnitsDropdown.selection.text.toLowerCase();
  
        if (unit === "centimeters") {
          newWidth = Math.round(newWidth * 28.3465);
          newHeight = Math.round(newHeight * 28.3465);
        }
        if (
          isNaN(newWidth) ||
          isNaN(newHeight) ||
          newWidth <= 0 ||
          newHeight <= 0
        ) {
          alert(
            "Invalid image size input. Please enter positive numerical values."
          );
        }
        doc.resizeImage(newWidth, newHeight);
      } else if (canvasResizerCheckbox.value) {
        var newCanvasWidth = parseInt(newWidthInput.text);
        var newCanvasHeight = parseInt(newHeightInput.text);
        var anchorPosition = anchorDropdown.selection.index;

        var anchorPositions = [
          AnchorPosition.TOPLEFT,
          AnchorPosition.TOPCENTER,
          AnchorPosition.TOPRIGHT,
          AnchorPosition.MIDDLELEFT,
          AnchorPosition.MIDDLECENTER,
          AnchorPosition.MIDDLERIGHT,
          AnchorPosition.BOTTOMLEFT,
          AnchorPosition.BOTTOMCENTER,
          AnchorPosition.BOTTOMRIGHT,
        ];

        var anchorPositionConstant = anchorPositions[anchorPosition];

        if (
          isNaN(newCanvasWidth) ||
          isNaN(newCanvasHeight) ||
          newCanvasWidth <= 0 ||
          newCanvasHeight <= 0
        ) {
          alert(
            "Invalid canvas size input. Please enter positive numerical values."
          );
          doc.close(SaveOptions.DONOTSAVECHANGES);
          return;
        }

        doc.resizeCanvas(newCanvasWidth, newCanvasHeight, anchorPositionConstant);
      }

      var saveOptions = new JPEGSaveOptions();
      saveOptions.quality = 12;
      var outputFile = new File(outputFolder + "/" + file.name);
      doc.saveAs(outputFile, saveOptions, true, Extension.LOWERCASE);
      doc.close(SaveOptions.DONOTSAVECHANGES);
    }
    dlg.close();
  };

  cancelBtn.onClick = function () {
    dlg.close();
  };

  dlg.show();
}

showResizerDialog();
