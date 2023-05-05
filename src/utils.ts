// Function to convert an image to JPG format using canvas
export const convertToJPG = (file: any, maxWidth = 800, maxHeight = 800) => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const image = new Image();
    image.onload = () => {
      // Resize the image to fit within the maximum dimensions while preserving aspect ratio
      const ratio = Math.min(maxWidth / image.width, maxHeight / image.height);
      const width = Math.floor(image.width * ratio);
      const height = Math.floor(image.height * ratio);
      canvas.width = width;
      canvas.height = height;
      context!.drawImage(image, 0, 0, width, height);

      // Convert the canvas image to a JPG Blob
      canvas.toBlob(
        (blob) => {
          resolve(blob);
        },
        "image/jpeg",
        0.9 // Adjust the quality of the JPG image if necessary
      );
    };
    image.onerror = (error) => {
      reject(error);
    };
    image.src = URL.createObjectURL(file);
  });
};
