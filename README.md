# Resizer Script

This script provides a dialog-based interface for resizing images and canvases in Adobe Photoshop. Users can choose between resizing images or canvases, select input and output folders, and specify the dimensions for resizing.

## Features

- **Image Resizer:** Resize images to specified dimensions.
- **Canvas Resizer:** Resize canvas to specified dimensions with anchor position selection.
- **Folder Selection:** Choose input and output folders for batch processing.
- **Dimension Units:** Option to select dimension units (pixels or centimeters).
- **Batch Processing:** Processes all images in the input folder.

## Requirements

- Adobe Photoshop
- JavaScript support in Adobe Photoshop

## Usage

1. **Run the Script:**
   ```javascript
   showResizerDialog();
   ```

2. **Dialog Interface:**
   - **Resizer Type:**
     - Select either "Image Resizer" or "Canvas Resizer" or both.
   - **Folder Selection:**
     - Select the input folder containing the images to be resized.
     - Select the output folder where resized images will be saved.
   - **Resize Image Panel:**
     - Choose the dimension units (Pixels or Centimeters).
     - Enter the desired width and height.
   - **Resize Canvas Panel:**
     - Enter the new canvas width and height.
     - Choose the anchor position for resizing.
   - **Actions:**
     - Click "OK" to start the resizing process.
     - Click "Cancel" to close the dialog without making any changes.

## Code Explanation

The main function `showResizerDialog` creates and displays a dialog window with options to resize images or canvases. Below is a brief explanation of the code structure:

### Dialog Setup

1. **Dialog Window:**
   - Creates a dialog window with the title "Resizer".
   - Sets the preferred width of the dialog.

2. **Resizer Type Group:**
   - Adds checkboxes for "Image Resizer" and "Canvas Resizer".
   - The "Image Resizer" checkbox is selected by default.

3. **Folder Selection Group:**
   - Adds buttons for selecting input and output folders.
   - Displays the selected folder paths.

4. **Resize Image Group:**
   - Adds a panel for resizing images.
   - Allows selection of dimension units and input of width and height.

5. **Resize Canvas Group:**
   - Adds a panel for resizing the canvas.
   - Allows input of new canvas width and height, and selection of anchor position.
   - Initially hidden, made visible based on checkbox selection.

6. **Buttons Group:**
   - Adds "OK" and "Cancel" buttons for user actions.

### Event Handlers

1. **Checkbox Click Handlers:**
   - Updates the visibility of image and canvas resizer panels based on checkbox selections.

2. **Folder Selection Handlers:**
   - Opens folder selection dialogs and updates the displayed folder paths.

3. **OK Button Handler:**
   - Validates input folders and processes each image file in the input folder.
   - Performs image resizing, canvas resizing, or both based on user selections.
   - Saves the resized images to the output folder.

4. **Cancel Button Handler:**
   - Closes the dialog without making any changes.

### Resizing Logic

1. **Image Resizing:**
   - Resizes images to the specified width and height.
   - Converts dimensions from centimeters to pixels if needed.

2. **Canvas Resizing:**
   - Resizes the canvas to the specified width and height.
   - Adjusts the anchor position for resizing.

## License

This script is provided as-is without any warranty. Use at your own risk.
