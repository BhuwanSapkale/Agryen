from PIL import Image
import sys

def make_transparent(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    
    # Get the color of the top-left pixel to use as background color
    bg_color = data[0]
    
    new_data = []
    # threshold for similarity
    threshold = 30
    for item in data:
        # Check if the pixel color is similar to the background color
        if abs(item[0] - bg_color[0]) < threshold and abs(item[1] - bg_color[1]) < threshold and abs(item[2] - bg_color[2]) < threshold:
            # Change the background pixel to transparent
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path, "PNG")

if __name__ == "__main__":
    make_transparent("G:/Agryen/public/chatgpt-logo.png", "G:/Agryen/public/chatgpt-logo-transparent.png")
